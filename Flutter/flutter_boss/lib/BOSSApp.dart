import 'package:flutter/material.dart';
import 'package:flutter_boss/components/tab_item.dart';
import 'package:flutter_boss/screen/Company/CompanyScreen.dart';
import 'package:flutter_boss/screen/Job/JobScreen.dart';
import 'package:flutter_boss/screen/Message/MessageScreen.dart';
import 'package:flutter_boss/screen/Mine/MineScrren.dart';

class ScreenItem {
  String text;
  String icon;
  String activeIcon;
  Widget screen;
  ScreenItem({this.text, this.icon, this.activeIcon, this.screen});
}

class BOSSApp extends StatefulWidget {
  @override
  _BOSSAppState createState() => _BOSSAppState();
}

class _BOSSAppState extends State<BOSSApp> with SingleTickerProviderStateMixin {
  TabController _controller;
  int _currentIndex = 0;
  VoidCallback onChanged;
  List screens = [
    new ScreenItem(
      text: "职位",
      icon: 'assets/images/ic_main_tab_find_nor.png',
      activeIcon: 'assets/images/ic_main_tab_find_pre.png',
      screen: JobScreen(),
    ),
    new ScreenItem(
      text: "公司",
      icon: 'assets/images/ic_main_tab_company_nor.png',
      activeIcon: 'assets/images/ic_main_tab_company_pre.png',
      screen: CompanyScreen(),
    ),
    new ScreenItem(
      text: "消息",
      icon: 'assets/images/ic_main_tab_contacts_nor.png',
      activeIcon: 'assets/images/ic_main_tab_contacts_pre.png',
      screen: MessageScreen(),
    ),
    new ScreenItem(
      text: "我的",
      icon: 'assets/images/ic_main_tab_my_nor.png',
      activeIcon: 'assets/images/ic_main_tab_my_pre.png',
      screen: MineScreen(),
    ),
  ];

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
    print(_currentIndex);
    return Scaffold(
      body: TabBarView(
        controller: _controller,
        physics: NeverScrollableScrollPhysics(),
        children: _getTabBarViews(),
      ),
      bottomNavigationBar: Material(
        color: Colors.white,
        child: TabBar(
          controller: _controller,
          labelStyle: TextStyle(
            fontSize: 11,
          ),
          tabs: _getTabs(),
        ),
      ),
    );
  }

  _getTabBarViews() {
    List<Widget> views = <Widget>[];
    for (var i = 0; i < screens.length; i++) {
      views.add(screens[i].screen);
    }
    return views;
  }

  _getTabs() {
    List<Widget> tabs = <Widget>[];
    for (var i = 0; i < screens.length; i++) {
      tabs.add(new TabItem(
        text: screens[i].text,
        icon: _currentIndex == i ? screens[i].activeIcon : screens[i].icon,
        color:
            _currentIndex == i ? Theme.of(context).primaryColor : Colors.grey,
      ));
    }
    return tabs;
  }
}
