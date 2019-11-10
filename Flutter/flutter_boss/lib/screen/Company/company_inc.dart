import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_boss/model/company.dart';

class CompanyInc extends StatelessWidget {
  final Company company;

  CompanyInc(this.company);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        top: 10.0,
        left: 10.0,
        right: 10.0,
        bottom: 10.0,
      ),
      child: Container(
        color: Colors.white,
        child: Padding(
          padding: EdgeInsets.all(15.0),
          child: Column(
            children: <Widget>[
              Row(
                children: <Widget>[
                  Container(
                    margin: EdgeInsets.only(bottom: 10.0),
                    child: Text('公司介绍', style: TextStyle(fontSize: 15.0)),
                  )
                ],
              ),
              RichText(
                text: TextSpan(
                  text: company.inc,
                  style: TextStyle(fontSize: 13.0, color: Colors.black),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
