import 'package:flutter/material.dart';

class CompanyHotJob extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding:
          EdgeInsets.only(top: 10.0, left: 10.0, right: 10.0, bottom: 10.0),
      child: Row(
        children: <Widget>[
          RichText(
            text: TextSpan(
              text: '敬请期待',
              style: TextStyle(fontSize: 16.0, color: Colors.black),
            ),
          )
        ],
      ),
    );
  }
}
