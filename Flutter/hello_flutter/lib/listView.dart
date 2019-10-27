import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.green,
      ),
      home: MyHomePage(title: "ListView 的使用"),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  var _dataList = [11, 12, 13];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        // centerTitle: true,
      ),
      body: Center(
        // child: getListView1(),
        // child: getListView2(),
        child: getListView3(),
      ),
    );
  }

  getListView1() {
    return ListView(
      padding: EdgeInsets.all(20),
      children: <Widget>[
        Text('hello1'),
        Text('hello2'),
        Text('hello3'),
        Text('hello4'),
      ],
    );
  }

  getListView2() {
    return ListView.builder(
      itemCount: _dataList.length,
      itemBuilder: (BuildContext context, int index) {
        // print(index);
        var item = _dataList[index];
        return ListTile(
          title: Text("$item"),
          subtitle: Text("这是一篇文章的副标题"),
          leading: Icon(Icons.toys),
        );
      },
    );
  }

  getListView3() {
    return ListView.separated(
      separatorBuilder: (context, index) {
        return Divider(
          height: 1,
          color: Colors.grey,
        );
      },
      itemCount: 20,
      itemBuilder: (BuildContext context, int index) {
        // print(index);
        // var item = _dataList[index] ?? 'hello';
        return ListTile(
          title: Text("标题$index"),
          subtitle: Text("这是一篇文章的副标题"),
          leading: Icon(Icons.toys),
        );
      },
    );
  }
}
