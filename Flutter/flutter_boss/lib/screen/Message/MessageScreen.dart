import 'package:flutter/material.dart';

class MessageScreen extends StatefulWidget {
  @override
  _MessageScreenState createState() => _MessageScreenState();
}

class _MessageScreenState extends State<MessageScreen> {
  @override
  Widget build(BuildContext context) {
    return Material(
      color: Color.fromARGB(255, 0, 215, 198),
      child: Center(
        child: RichText(
          text: TextSpan(
            text: "company.inccompany.inccompany.inccompany.inccompany.inc",
            style: TextStyle(fontSize: 13.0, color: Colors.black),
            children: <TextSpan>[
              TextSpan(
                  text: '文本内容一',
                  style: TextStyle(fontSize: 16.0, color: Colors.red)),
              TextSpan(
                  text: '文本内容二',
                  style: TextStyle(fontSize: 16.0, color: Colors.grey)),
              TextSpan(
                  text: '文本内容一',
                  style: TextStyle(fontSize: 10.0, color: Colors.red)),
              TextSpan(
                  text: '文本内容一',
                  style: TextStyle(fontSize: 9.0, color: Colors.red))
            ],
          ),
        ),
      ),
    );
  }
}
