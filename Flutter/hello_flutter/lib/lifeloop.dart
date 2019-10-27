import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.green,
      ),
      home: MyHomePage(title: "Hello world"),
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
  var _counter = 0;

  void _incrementCounter() {
    // print(widget.title);
    setState(() {
      _counter++;
    });
  }

  // 类似构造器
  // 一般用于初始化state，只会走一次
  // 类似Android Fragment的onCreateView函数
  @override
  void initState() {
    print("initState");
    print(_counter);
    super.initState();
  }

  // 1、在初始化initState后执行； 2、显示/关闭其它widget。 3、可执行多次；
  @override
  void didChangeDependencies() {
    print("didChangeDependencies");
    print(_counter);
    super.didChangeDependencies();
  }

  // 上级节点rebuild widget时， 即上级组件状态发生变化时会触发子widget执行didUpdateWidget
  @override
  void didUpdateWidget(MyHomePage oldWidget) {
    print("didUpdateWidget");
    print(_counter);
    super.didUpdateWidget(oldWidget);
  }

  // 有点像Android的onStop函数，在打开新的Widget或回到这个widget时会执行
  @override
  void deactivate() {
    print("deactivate");
    print(_counter);
    super.deactivate();
  }

  // 类似于Android的onDestroy， 在执行Navigator.pop后会调用该办法， 表示组件已销毁；
  @override
  void dispose() {
    print("dispose");
    print(_counter);
    super.dispose();
  }

  // 点击闪电会执行，只用于调试时的hot reload。 release版本不会执行该函数。
  @override
  void reassemble() {
    print("reassemble");
    print(_counter);
    super.reassemble();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text("1"),
            Text("2"),
            Text("$_counter"),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: "Increment",
        child: Icon(Icons.add),
      ),
    );
  }
}
