import 'package:flutter/material.dart';

const double _kTextAndIconHeight = 53;

class TabItem extends StatefulWidget {
  final String text;
  final String icon;
  final Color color;

  // 构造器
  TabItem({
    this.text,
    this.icon,
    this.color,
  });

  @override
  _TabItemState createState() => _TabItemState();
}

class _TabItemState extends State<TabItem> {
  @override
  Widget build(BuildContext context) {
    Widget icon = Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: <Widget>[
        Container(
          // child: Icon(
          //   widget.icon,
          //   size: 30.0,
          // ),
          child: Image(
            image: AssetImage(widget.icon),
            height: 30.0,
            width: 30.0,
          ),
          margin: EdgeInsets.only(bottom: 3.0),
        ),
        Text(
          widget.text,
          softWrap: false,
          style: TextStyle(
            color: widget.color,
          ),
        )
      ],
    );
    return SafeArea(
      child: SizedBox(
        height: _kTextAndIconHeight,
        child: Center(
          child: icon,
        ),
      ),
    );
  }
}
