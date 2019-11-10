import 'dart:convert';
import 'package:flutter/material.dart';

class Job {
  final String name;
  final String cname;
  final String size;
  final String salary;
  final String username;
  final String title;

  //构造器
  Job(
      {@required this.name,
      @required this.cname,
      @required this.size,
      @required this.salary,
      @required this.username,
      @required this.title});

  //json串转换成json格式数据
  static List<Job> fromJson(String json) {
    List<Job> listModel = new List<Job>();
    List list = jsonDecode(json)['list'];
    list.forEach((v) {
      var model = Job.fromMap(v);
      listModel.add(model);
    });
    return listModel;
  }

  static Job fromMap(Map map) {
    return new Job(
        name: map['name'],
        cname: map['cname'],
        size: map['size'],
        salary: map['salary'],
        username: map['username'],
        title: map['title']);
  }
}
