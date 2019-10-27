import 'package:flutter/material.dart';
import 'package:hello_flutter/components/friend_list.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "安卓应用管理器中显示的标题",
      theme: ThemeData(
        primaryColor: Colors.green,
      ),
      // home: FriendListPage(),
      home: Scaffold(
        appBar: AppBar(
          title: Text('首页'),
        ),
        body: Center(
          child: Text('This is body'),
        ),
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: 0,
          items: [
            BottomNavigationBarItem(icon: Icon(Icons.home), title: Text("首页")),
            BottomNavigationBarItem(
                icon: Icon(Icons.child_friendly), title: Text("朋友列表"))
          ],
        ),
        drawer: Drawer(
          child: SafeArea(
            child: Column(
              children: <Widget>[
                Text('data1'),
                Text('data2'),
                Text('data3'),
                Text('data4'),
              ],
            ),
          ),
        ),
      ),
      routes: {
        './home': (BuildContext context) => HomePage(),
        './detail': (BuildContext context) => DetailPage(),
      },
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.red,
      child: Center(
        child: GestureDetector(
          onTap: () {
            Navigator.pushNamed(context, './detail');
          },
          child: Text(
            "点击跳转详情页",
            style: TextStyle(
              fontSize: 20,
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontStyle: FontStyle.italic,
            ),
            textDirection: TextDirection.rtl,
          ),
        ),
      ),
    );
  }
}

class DetailPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.blue,
      child: Center(
        child: GestureDetector(
          onTap: () {
            // Navigator.pushNamed(context, './home');
            Navigator.pop(context);
          },
          child: Text(
            "点击跳转首页",
            style: TextStyle(
              fontSize: 20,
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontStyle: FontStyle.italic,
            ),
            textDirection: TextDirection.rtl,
          ),
        ),
      ),
    );
  }
}
