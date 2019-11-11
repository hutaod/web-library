import React, { Component } from "react";
import "./style.less";
import { Table, Checkbox } from "antd";

const properties = [
  {
    name: "机身颜色",
    id: "a",
    children: [
      {
        label: "红色",
        value: "a1"
      },
      {
        label: "黄色",
        value: "a2"
      },
      {
        label: "蓝色",
        value: "a3"
      },
      {
        label: "绿色",
        value: "a4"
      }
    ]
  },
  {
    name: "存储容量",
    id: "b",
    children: [
      {
        label: "4G",
        value: "b1"
      },
      {
        label: "8G",
        value: "b2"
      },
      {
        label: "16G",
        value: "b3"
      }
    ]
  },
  {
    name: "屏幕尺寸",
    id: "c",
    children: [
      {
        label: "5.1",
        value: "c1"
      },
      {
        label: "5.5",
        value: "c2"
      },
      {
        label: "6.0",
        value: "c3"
      }
    ]
  }
];

export default class skuTest extends Component {
  state = {
    chooseSkuList: [],
    choosePropsMap: {}
  };

  getSkuList = (propValList = []) => {
    if (!propValList.length) {
      return propValList;
    }
    var results = [],
      result = [];
    function doExchange(arr, depth = 0) {
      for (var i = 0; i < arr[depth].length; i++) {
        result[depth] = arr[depth][i];
        if (depth != arr.length - 1) {
          doExchange(arr, depth + 1);
        } else {
          results.push([...result]);
        }
      }
    }
    doExchange(propValList);
    return results;
  };

  renderTable() {
    const { chooseSkuList, choosePropsMap } = this.state;
    const skuPropKeys = Object.keys(choosePropsMap).sort(
      (a, b) => choosePropsMap[a].index - choosePropsMap[b].index
    );
    const columns = skuPropKeys.map(key => ({
      title: choosePropsMap[key].name,
      dataIndex: choosePropsMap[key].id,
      render: (text, record) => {
        return {
          children: text.label,
          props: {
            rowSpan: text.rowSpan
          }
        };
      }
    }));
    // console.log(columns, chooseSkuList);

    const dataSource = [];
    chooseSkuList.forEach((items, aIndex) => {
      const curItems = items.reduce(
        (result, a, index) => {
          let rowSpan = 1;
          // 最后一个属性不需要行合并
          if (index !== items.length - 1) {
            // aIndex 大于 1时 找之前的
            let start = 1;
            let preItems = dataSource[aIndex - start];
            if (aIndex < 2) {
              if (preItems && preItems[a.pid].value === a.value) {
                preItems[a.pid].rowSpan = 2;
                rowSpan = 0;
              }
            } else {
              // 当行数的值和之前的值一样，并且rowSpan为0的时候，继续往前查找
              while (preItems) {
                if (preItems[a.pid].value === a.value) {
                  if (preItems[a.pid].rowSpan === 0) {
                    start++;
                    preItems = dataSource[aIndex - start];
                  } else {
                    preItems[a.pid].rowSpan = preItems[a.pid].rowSpan + 1;
                    rowSpan = 0;
                    preItems = null;
                  }
                } else {
                  preItems = null;
                }
              }
            }
          }

          result[a.pid] = {
            label: a.label,
            value: a.value,
            rowSpan
          };

          result.key = result.key + (index === 0 ? "" : "-") + a.value;
          return result;
        },
        {
          key: ""
        }
      );
      dataSource.push(curItems);
    });
    // console.log(columns, dataSource);

    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={false}
      />
    );
  }

  render() {
    return (
      <div>
        <h3>探索sku排列组合</h3>
        <div>
          {properties.map((property, index) => (
            <div key={property.id}>
              <div>{property.name}</div>
              <Checkbox.Group
                options={property.children || []}
                onChange={checkArr => {
                  const checkData = checkArr.map(val => {
                    return {
                      ...property.children.find(a => a.value === val),
                      pid: property.id
                    };
                  });

                  const choosePropsMap = {
                    ...this.state.choosePropsMap
                  };
                  console.log(choosePropsMap);

                  if (checkData && checkData.length > 0) {
                    choosePropsMap[property.id] = {
                      name: property.name,
                      id: property.id,
                      data: checkData,
                      index: index
                    };
                  } else {
                    delete choosePropsMap[property.id];
                  }
                  const skuPropList = Object.keys(choosePropsMap).map(
                    key => choosePropsMap[key].data
                  );
                  // console.log(skuPropList);

                  const chooseSkuList = this.getSkuList(skuPropList);
                  // console.log(choosePropsMap, chooseSkuList);

                  this.setState({
                    chooseSkuList,
                    choosePropsMap
                  });
                }}
              />
            </div>
          ))}
        </div>
        {this.renderTable()}
      </div>
    );
  }
}
