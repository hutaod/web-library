import 'dart:convert';

import 'package:flutter/material.dart';
import 'dart:io';

import 'package:hello_flutter/components/friend.dart';

class FriendListPage extends StatefulWidget {
  @override
  _FriendListPageState createState() => _FriendListPageState();
}

class _FriendListPageState extends State<FriendListPage> {
  List<Friend> _friends = [];
  var url = 'https://randomuser.me/api/?results=30';
  // (1) 创建httpClient
  var httpClient = new HttpClient();

  @override
  void initState() {
    super.initState();

    // 网络加载
    _loadFriendsData();
  }

  _loadFriendsData() async {
    // （2）打开http链接，设置请求头
    // httpClient.get(host, port, path)
    // httpClient.post(host, port, path)
    HttpClientRequest request = await httpClient.getUrl(Uri.parse(url));
    // request.headers.add(name, value)

    // （3）等待链接服务器
    HttpClientResponse response = await request.close();

    if (response.statusCode == 200) {
      var jsonString = await response.transform(utf8.decoder).join();
      setState(() {
        _friends = Friend.reslveDataFromResponse(jsonString);
      });
    }

    // (4) 请求结束，关闭httpClient
    httpClient.close();
  }

  Widget _buildFriendCell(BuildContext context, int index) {
    // 获取数据
    var friend = _friends[index];
    return ListTile(
      leading: CircleAvatar(
        backgroundImage: NetworkImage(friend.awatar),
      ),
      title: Text(friend.name),
      subtitle: Text(friend.email),
    );
  }

  _buildContent() {
    var content;

    if (_friends.isEmpty) {
      content = new CircularProgressIndicator();
    } else {
      content = ListView.builder(
        itemCount: _friends.length,
        itemBuilder: _buildFriendCell,
      );
    }

    return content;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("好友列表"),
      ),
      body: new Center(
        child: _buildContent(),
      ),
    );
  }
}
