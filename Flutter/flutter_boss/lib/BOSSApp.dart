import 'package:flutter/material.dart';
import 'package:flutter_boss/components/tab_item.dart';

class BOSSApp extends StatefulWidget {
  @override
  _BOSSAppState createState() => _BOSSAppState();
}

class _BOSSAppState extends State<BOSSApp> {
  // TabController _controller;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: TabItem(
          icon: Icons.home,
          text: "首页",
          color: Colors.grey,
        ),
      ),
      // bottomNavigationBar: Material(
      //   color: Colors.white,
      //   child: TabBar(
      //     controller: _controller,
      //     labelStyle: TextStyle(
      //       fontSize: 11,
      //     ),
      //     tabs: <Widget>[

      //     ],
      //   ),
      // ),
    );
  }
}
