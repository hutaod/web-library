import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtNoticebar, AtCard } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

@inject('counterStore')
@observer
class Books extends Component {
  config = {
    navigationBarTitleText: '图书'
  }

  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }

  render() {
    return (
      <View className='index'>
        <Text>图书</Text>
        <AtButton
          onClick={(e) => {
            Taro.redirectTo({
              url: '/pages/index/index'
            })
          }}
        >
          按钮
        </AtButton>
        <AtNoticebar marquee>
          这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
        </AtNoticebar>
        <AtCard
          title='card'
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/details/details'
            })
          }}
        >
          <text>123</text>
        </AtCard>
      </View>
    )
  }
}

export default Books
