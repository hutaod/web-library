import 'package:flutter/material.dart';
import 'package:flutter_boss/components/DotsIndicator.dart';
import 'package:flutter_boss/model/company.dart';

import 'company_hot_job.dart';
import 'company_inc.dart';

class CompanyDetail extends StatefulWidget {
  final Company _company;

  CompanyDetail(this._company);

  @override
  _CompanyDetailState createState() => _CompanyDetailState();
}

class _CompanyDetailState extends State<CompanyDetail>
    with TickerProviderStateMixin {
  List<String> _urls = [
    'https://img.bosszhipin.com/beijin/mcs/chatphoto/20170725/861159df793857d6cb984b52db4d4c9c.jpg',
    'https://img2.bosszhipin.com/mcs/chatphoto/20151215/a79ac724c2da2a66575dab35384d2d75532b24d64bc38c29402b4a6629fcefd6_s.jpg',
    'https://img.bosszhipin.com/beijin/mcs/chatphoto/20180207/c15c2fc01c7407b98faf4002e682676b.jpg'
  ];
  List<Widget> _imagePages = <Widget>[];

  List<Tab> _tabs;
  TabController _controller;
  VoidCallback onChanged;
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _urls.forEach((String url) {
      _imagePages.add(Container(
        color: Colors.black.withAlpha(900),
        child: ConstrainedBox(
          constraints: BoxConstraints.expand(),
          child: Image.network(
            url,
            fit: BoxFit.cover,
            height: 256,
          ),
        ),
      ));
    });

    _tabs = [
      Tab(text: "公司概况"),
      Tab(text: "热招职位"),
    ];
    _controller = TabController(length: _tabs.length, vsync: this);
    onChanged = () {
      setState(() {
        _currentIndex = _controller.index;
      });
    };
    _controller.addListener(onChanged);
  }

  @override
  void dispose() {
    _controller.removeListener(onChanged);
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // print(widget._company);
    Company _company = widget._company;
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 242, 242, 245),
      // appBar: AppBar(
      //   title: Text("公司详情"),
      // ),
      body: Column(
        children: <Widget>[
          Stack(
            children: <Widget>[
              SizedBox.fromSize(
                size: Size.fromHeight(256),
                child: IndicatorViewPager(
                  pages: _imagePages,
                ),
              ),
              Positioned(
                left: 0,
                top: 30,
                child: BackButton(
                  color: Colors.white,
                ),
              ),
            ],
          ),
          Padding(
            padding: EdgeInsets.all(10),
            child: Row(
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.only(
                      top: 10, left: 15.0, right: 15.0, bottom: 0),
                  child: Image.network(
                    _company.logo,
                    width: 80,
                    height: 80,
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Container(
                      padding: EdgeInsets.only(top: 10.0, bottom: 2.0),
                      child: Text(
                        _company.name,
                        style: TextStyle(
                          fontSize: 18,
                          color: Colors.black,
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(
                          top: 5.0, left: 0.0, right: 5.0, bottom: 5.0),
                      child: Text(
                        _company.location,
                        style: TextStyle(fontSize: 13.0, color: Colors.grey),
                      ),
                    ),
                    Padding(
                        padding: EdgeInsets.only(
                            top: 5.0, left: 0.0, right: 5.0, bottom: 5.0),
                        child: Text(
                          _company.type +
                              ' | ' +
                              _company.size +
                              ' | ' +
                              _company.employee,
                          style: TextStyle(fontSize: 13.0, color: Colors.grey),
                        ))
                  ],
                )
              ],
            ),
          ),
          Divider(
            color: Colors.red,
            // indent: 20,
            // endIndent: 20,
          ),
          TabBar(
            tabs: _tabs,
            controller: _controller,
            indicatorWeight: 5.0,
            indicatorSize: TabBarIndicatorSize.tab,
            indicatorColor: Theme.of(context).primaryColor,
            labelStyle: TextStyle(fontSize: 16.0),
          ),
          Container(
            child: _currentIndex == 0 ? CompanyInc(_company) : CompanyHotJob(),
          )
        ],
      ),
    );
  }
}
