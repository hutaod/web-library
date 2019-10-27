import 'package:flutter/material.dart';
import 'dart:math' as math;

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
            ContainerP1()
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

class ContainerP1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      // width: 300,
      height: 300,
      color: Colors.white,
      constraints: BoxConstraints(
        maxHeight: 300,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: <Widget>[
          Container(
            width: 50,
            height: 50,
            color: Colors.red[300],
            // alignment: Alignment.bottomRight,
            alignment: Alignment(0, -1), // 中心点 0,0
            child: Text(
              "123",
              style: TextStyle(color: Colors.white, fontSize: 20),
            ),
          ),
          Opacity(
            opacity: 0.1,
            child: Container(
              width: 50,
              height: 50,
              margin: EdgeInsets.all(20),
              color: Colors.yellow[900],
            ),
          ),
          // Opacity(
          //   opacity: 1,
          //   child: Container(
          //     width: 50,
          //     height: 50,
          //     margin: EdgeInsets.all(20),
          //     color: Colors.orange,
          //   ),
          // ),
          // Opacity(
          //   opacity: 1,
          //   child: Container(
          //     width: 60,
          //     height: 60,
          //     margin: EdgeInsets.all(20),
          //     color: Colors.blue,
          //     child: Container(
          //       // margin: EdgeInsets.all(10),
          //       color: Colors.grey,
          //       child: Text("这是一个字符串"),
          //       constraints: BoxConstraints(
          //         maxWidth: 40,
          //         maxHeight: 20,
          //       ),
          //     ),
          //   ),
          // ),
          // Container(
          //   width: 40,
          //   height: 40,
          //   // margin: EdgeInsets.all(20),
          //   color: Colors.blue,
          //   alignment: Alignment.center,
          //   child: Container(
          //     // margin: EdgeInsets.all(10),
          //     // color: Colors.grey,
          //     child: Text("这是一个字符串"),
          //     // constraints: BoxConstraints(
          //     //   maxWidth: 40,
          //     //   maxHeight: 20,
          //     // ),
          //     constraints: BoxConstraints.expand(),
          //     decoration: BoxDecoration(
          //       boxShadow: [
          //         BoxShadow(
          //           color: Colors.red,
          //           offset: Offset(10, 10),
          //           blurRadius: 5,
          //         ),
          //       ],
          //       gradient: LinearGradient(
          //         colors: [Colors.red, Colors.yellow],
          //       ),
          //       borderRadius: BorderRadius.only(
          //         bottomRight: Radius.circular(10),
          //       ),
          //     ),
          //   ),
          // ),
          Container(
            child: Transform.rotate(
              angle: math.pi,
              child: FlutterLogo(
                size: 50,
              ),
            ),
            // transform: Matrix4.rotationZ(0.5),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [Colors.red, Colors.yellow],
              ),
              borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(10),
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.red,
                  offset: Offset(10, 10),
                  blurRadius: 10,
                ),
              ],
            ),
          ),
          // Container(
          //   height: 100,
          //   width: 50,
          //   child: OverflowBox(
          //     maxHeight: 100,
          //     child: new Container(
          //       color: Colors.deepOrange,
          //       width: 200,
          //       height: 600,
          //     ),
          //   ),
          // ),
          Container(
              width: 100,
              child: Column(
                children: <Widget>[
                  Image.asset(
                    'images/avatar.png',
                    width: 50,
                    height: 50,
                  ),
                  Image.network(
                    'http://www.vanabali.com/Upload/20190415/1555306123444903.jpg?x-oss-process=image/resize,m_fill,w_180,h_270',
                    width: 100,
                    height: 30,
                  ),
                  FadeInImage.assetNetwork(
                    width: 100,
                    // height: 30,
                    fit: BoxFit.fitWidth,
                    placeholder: 'images/avatar.png',
                    image:
                        'http://www.vanabali.com/Upload/20190415/1555306123444903.jpg?x-oss-process=image/resize,m_fill,w_180,h_270',
                  ),
                ],
              ))
        ],
      ),
    );
  }
}
