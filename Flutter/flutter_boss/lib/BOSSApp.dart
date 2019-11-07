import 'package:flutter/material.dart';
import 'package:flutter_boss/components/tab_item.dart';
import 'package:flutter_boss/screen/Company/CompanyScreen.dart';
import 'package:flutter_boss/screen/Job/JobScreen.dart';
import 'package:flutter_boss/screen/Message/MessageScreen.dart';
import 'package:flutter_boss/screen/Mine/MineScrren.dart';

const int INDEX_JOB = 0;
const int INDEX_COMPANY = 1;
const int INDEX_MESSAGE = 2;
const int INDEX_MINE = 3;

class BOSSApp extends StatefulWidget {
  @override
  _BOSSAppState createState() => _BOSSAppState();
}

class _BOSSAppState extends State<BOSSApp> with SingleTickerProviderStateMixin {
  TabController _controller;
  int _currentIndex = 0;
  VoidCallback onChanged;

  @override
  void initState() {
    super.initState();
    _controller = new TabController(
      initialIndex: _currentIndex,
      length: 4,
      vsync: this,
    );
    onChanged = () {
      setState(() {
        _currentIndex = this._controller.index;
      });
    };
    _controller.addListener(onChanged);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("BossApp"),
      ),
      body: TabBarView(
        controller: _controller,
        physics: NeverScrollableScrollPhysics(),
        children: <Widget>[
          JobScreen(),
          CompanyScreen(),
          MessageScreen(),
          MineScreen()
        ],
      ),
      bottomNavigationBar: Material(
        color: Colors.white,
        child: TabBar(
          controller: _controller,
          labelStyle: TextStyle(
            fontSize: 11,
          ),
          tabs: <Widget>[
            TabItem(
              text: "职位",
              icon: 'assets/images/ic_main_tab_find_nor.png',
            ),
            TabItem(
              text: "公司",
              icon: 'assets/images/ic_main_tab_company_nor.png',
            ),
            TabItem(
              text: "消息",
              icon: 'assets/images/ic_main_tab_contacts_nor.png',
            ),
            TabItem(
              text: "我的",
              icon: 'assets/images/ic_main_tab_my_nor.png',
            )
          ],
        ),
      ),
    );
  }
}
