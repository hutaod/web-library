import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Icon, Popconfirm } from "antd";
import { types, compsMap } from "./config";
import ComponentList from "./ComponentList";
import styles from "./styles.scss";

export default class Editor extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataInfo: {
        [types.IMAGE]: {
          url: "https://test-cimg.akulaku.net/activity/banner/AGusKNU7pIpvsLsJPhpRVwnCOfZLtyJKXsF6oh6lhrg.png",
        },
      },
      editInfos: [],
      // 当前选中的组件信息
      activeItem: {},
      offsetTop: 0,
      warpPaddingBottom: 0,
      insertCompOption: null,
    };
    this.wrapRef = React.createRef();
    this.configRef = React.createRef();
    // 所有显示组件的ref
    this.compRefs = {};
  }

  handleAddComp = type => {
    const { editInfos, insertCompOption } = this.state;
    const current = compsMap[type];
    const CompStruct = current.comp.Struct;
    const addComp = {
      comp: current.comp,
      dataInfo: new CompStruct().dataInfo,
    };
    // 判断是插入组件还是新增组件
    if (insertCompOption) {
      const { index, method } = insertCompOption;
      // 判断是向前插入组件还是向后
      if (method === "prepend") {
        editInfos.splice(index, 0, addComp);
      } else {
        editInfos.splice(index + 1, 0, addComp);
      }
    } else {
      editInfos.push(addComp);
    }
    this.setState(
      {
        editInfos: [...editInfos],
        activeItem: addComp.dataInfo,
        insertCompOption: null,
      },
      () => {
        const element = this.compRefs[addComp.dataInfo.id];
        this.handleSetConfigPosition(element);
      }
    );
  };

  handleClickComp = item => {
    const element = this.compRefs[item.dataInfo.id];
    this.setState({
      activeItem: item.dataInfo,
      insertCompOption: null,
    });
    this.handleSetConfigPosition(element);
  };

  handleRemoveComp = compId => {
    const editInfos = this.state.editInfos.filter(item => item.dataInfo.id !== compId);
    let activeItem = this.state.activeItem;
    if (compId === activeItem.id) {
      activeItem = {};
    }

    this.setState({
      editInfos: [...editInfos],
      activeItem: {},
      insertCompOption: null,
    });
  };

  // 排序
  handleSort = (e, item, index, sortType) => {
    e.stopPropagation();
    const { editInfos } = this.state;
    if (sortType === "up") {
      let pre = editInfos[index - 1];
      editInfos[index - 1] = item;
      editInfos[index] = pre;
    } else {
      let next = editInfos[index + 1];
      editInfos[index + 1] = item;
      editInfos[index] = next;
    }
    this.setState({ editInfos: [...editInfos] }, () => {
      const element = this.compRefs[this.state.activeItem.id];
      this.handleSetConfigPosition(element);
    });
  };

  handleShownCompList(e, id, index, method) {
    e.stopPropagation();
    this.setState({
      insertCompOption: {
        id,
        index,
        method,
      },
    });
    this.handleSetConfigPosition(e.target, -16);
  }

  handleSetConfigPosition = (element, offset = 0) => {
    const { top } = element.getBoundingClientRect();
    const wrapPos = this.wrapRef.current.getBoundingClientRect();
    // 获取配置区的top值
    const offsetTop = top - wrapPos.top + offset;
    this.setState(
      {
        offsetTop,
      },
      () => {
        const wrapPos = this.wrapRef.current.getBoundingClientRect();
        const configPos = this.configRef.current.getBoundingClientRect();
        // 获取配置区的top值
        const offsetTop = top - wrapPos.top + offset;
        let warpPaddingBottom = configPos.height + offsetTop - wrapPos.height;
        this.setState({
          warpPaddingBottom: warpPaddingBottom >= 0 ? warpPaddingBottom : 0,
        });
      }
    );
  };

  renderComp(item) {
    return (
      <div style={{ pointerEvents: "none" }}>
        <item.comp.View key={item.dataInfo.id} data={item.dataInfo.data} />
      </div>
    );
  }

  renderCompConfig() {
    if (this.state.insertCompOption) {
      return <ComponentList onClick={this.handleAddComp} />;
    }

    const { editInfos, activeItem } = this.state;
    const { id, type } = activeItem;
    if (!id) {
      return null;
    }
    const Comp = compsMap[type].comp;

    return (
      <Comp.Config
        key={id}
        data={this.state.activeItem.data}
        onChange={(key, val) => {
          // 数据改变
          const newEditInfos = editInfos.map(item => {
            if (item.dataInfo.id === id) {
              item.dataInfo.data = {
                ...item.dataInfo.data,
                [key]: val,
              };
              return item;
            }
            return item;
          });
          this.setState({
            editInfos: [...newEditInfos],
          });
        }}
      />
    );
  }

  render() {
    const { editInfos, activeItem, offsetTop, warpPaddingBottom } = this.state;

    return (
      <div className={styles.wrap} ref={this.wrapRef} style={{ paddingBottom: warpPaddingBottom }}>
        <div className={styles.container}>
          {editInfos.map((item, index) => (
            <div
              key={item.dataInfo.id}
              ref={ref => {
                this.compRefs[item.dataInfo.id] = ref;
              }}
              className={classNames(styles.component, {
                [styles.active]: item.dataInfo.id === activeItem.id,
              })}
              onClick={() => this.handleClickComp(item)}
            >
              {this.renderComp(item)}
              {/* 在上方新增 */}
              <Icon
                type="plus-circle"
                theme="twoTone"
                onClick={e => this.handleShownCompList(e, item.dataInfo.id, index, "prepend")}
                className={classNames(styles.icon, styles.prepend)}
              />
              {/* 在下方新增 */}
              <Icon
                type="plus-circle"
                theme="twoTone"
                onClick={e => this.handleShownCompList(e, item.dataInfo.id, index, "append")}
                className={classNames(styles.icon, styles.append)}
              />
              {/* 上移 */}
              {index > 0 ? (
                <Icon
                  type="up-circle"
                  theme="twoTone"
                  onClick={e => this.handleSort(e, item, index, "up")}
                  className={classNames(styles.icon, styles.moveUp)}
                />
              ) : null}
              {/* 下移 */}
              {index < editInfos.length - 1 ? (
                <Icon
                  type="down-circle"
                  theme="twoTone"
                  onClick={e => this.handleSort(e, item, index, "down")}
                  className={classNames(styles.icon, styles.moveDown)}
                />
              ) : null}
              <Popconfirm
                title="确定删除该模块吗？"
                onConfirm={e => {
                  e.stopPropagation();
                  this.handleRemoveComp(item.dataInfo.id);
                }}
              >
                <Icon
                  type="close-circle"
                  theme="twoTone"
                  twoToneColor="#bfbfbf"
                  className={classNames(styles.icon, styles.remove)}
                />
              </Popconfirm>
            </div>
          ))}
          <div style={{ padding: 8 }}>
            <ComponentList onClick={this.handleAddComp} />
          </div>
        </div>
        {activeItem.id ? (
          <div className={styles.config} style={{ top: offsetTop }} ref={this.configRef}>
            <div className={styles.configContent}>{this.renderCompConfig()}</div>
          </div>
        ) : null}
      </div>
    );
  }
}
