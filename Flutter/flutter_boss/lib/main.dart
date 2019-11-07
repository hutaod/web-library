import 'package:flutter/material.dart';
import 'package:flutter_boss/welcome.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Boss',
      theme: ThemeData(
        // primarySwatch: Colors.amber,
        primaryIconTheme: IconThemeData(color: Colors.white),
        primaryColor: Color.fromARGB(255, 0, 215, 198),
        accentColor: Colors.cyan[300],
        // primaryTextTheme: TextTheme(
        //   subhead: TextStyle(
        //     color: Colors.red,
        //   ),
        // ),
        // textTheme: TextTheme(
        //   subhead: TextStyle(
        //     color: Colors.red,
        //   ),
        // ),
      ),
      home: WelcomePage(),
    );
  }
}
