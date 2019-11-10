import 'package:flutter/material.dart';
import 'package:flutter_boss/model/company.dart';

class CompantListItem extends StatelessWidget {
  final Company companyModel;
  final Function onTap;
  CompantListItem({this.companyModel, this.onTap});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: onTap,
      leading: Image.network(companyModel.logo),
      title: Column(
        children: <Widget>[
          Container(
            height: 100,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  margin: EdgeInsets.only(
                    bottom: 8,
                  ),
                  child: Text(
                    companyModel.name,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(
                    bottom: 8,
                  ),
                  child: Text(
                    companyModel.location,
                    style: TextStyle(
                      color: Colors.black54,
                    ),
                  ),
                ),
                Row(
                  children: <Widget>[
                    Container(
                      padding: EdgeInsets.fromLTRB(8, 4, 8, 4),
                      margin: EdgeInsets.only(right: 8),
                      decoration: BoxDecoration(
                        color: Color.fromRGBO(235, 235, 235, 1),
                        borderRadius: BorderRadius.all(Radius.circular(2.0)),
                      ),
                      child: Text(
                        companyModel.size,
                        style: TextStyle(
                          color: Colors.black54,
                        ),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.fromLTRB(8, 4, 8, 4),
                      margin: EdgeInsets.only(right: 8),
                      decoration: BoxDecoration(
                        color: Color.fromRGBO(235, 235, 235, 1),
                        borderRadius: BorderRadius.all(Radius.circular(2.0)),
                      ),
                      child: Text(
                        companyModel.employee,
                        style: TextStyle(
                          color: Colors.black54,
                        ),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.fromLTRB(8, 4, 8, 4),
                      margin: EdgeInsets.only(right: 8),
                      decoration: BoxDecoration(
                        color: Color.fromRGBO(235, 235, 235, 1),
                        borderRadius: BorderRadius.all(Radius.circular(2.0)),
                      ),
                      child: Text(
                        companyModel.type,
                        style: TextStyle(
                          color: Colors.black54,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Divider(),
          Container(
            height: 40,
            child: Row(
              children: <Widget>[
                RichText(
                  text: TextSpan(
                    style: TextStyle(
                      color: Colors.black,
                    ),
                    children: <TextSpan>[
                      TextSpan(text: "热招："),
                      TextSpan(
                        text: companyModel.hot,
                        style: TextStyle(
                          color: Color.fromARGB(255, 0, 215, 198),
                        ),
                      ),
                      TextSpan(text: "等${companyModel.count}个职位"),
                    ],
                  ),
                ),
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                      Icon(Icons.keyboard_arrow_right, color: Colors.grey),
                    ],
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
