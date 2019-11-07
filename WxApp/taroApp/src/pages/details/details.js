import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtFab } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

@inject('counterStore')
@observer
class Books extends Component {
  config = {
    navigationBarTitleText: '详情'
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
        <Text>详情</Text>
        <AtFab
          onClick={(e) => {
            Taro.navigateBack()
          }}
        >
          <Text className='at-fab__icon at-icon at-icon-menu' />
        </AtFab>
      </View>
    )
  }
}

export default Books
