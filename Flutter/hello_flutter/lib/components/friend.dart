import 'dart:convert';
import 'package:flutter/foundation.dart';

class Friend {
  @required
  final String awatar;
  @required
  final String name;
  @required
  final String email;

  // 构造函数
  Friend({this.awatar, this.name, this.email});

  static List<Friend> reslveDataFromResponse(String responseData) {
    var resData = jsonDecode(responseData);
    var results = resData['results'];

    var listresult =
        results.map((obj) => Friend.fromMap(obj)).toList().cast<Friend>();
    return listresult;
  }

  // 数据转Friend
  static Friend fromMap(Map map) {
    var name = map['name'];
    return new Friend(
      awatar: map['picture']['large'],
      name: '${name['first']} ${name['last']}',
      email: map['email'],
    );
  }
}
