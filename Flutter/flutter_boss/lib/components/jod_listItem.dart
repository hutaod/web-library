import 'package:flutter/material.dart';
import 'package:flutter_boss/model/job.dart';

class JobListItem extends StatelessWidget {
  final Job job;

  JobListItem(this.job);

  @override
  Widget build(BuildContext conext) {
    return Padding(
      padding: EdgeInsets.only(
        top: 3.0,
        left: 5.0,
        right: 5.0,
        bottom: 3.0,
      ),
      child: SizedBox(
        child: Card(
          elevation: 0.0, //阴影大小
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Row(
                      children: <Widget>[
                        Padding(
                          padding: EdgeInsets.only(
                              top: 10.0, left: 10.0, bottom: 5.0),
                          child: Text(job.name),
                        ),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: <Widget>[
                              Padding(
                                padding: EdgeInsets.only(right: 10.0),
                                child: Text(job.salary,
                                    style: TextStyle(color: Colors.red)),
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                    Container(
                      child: Text(job.cname + ' ' + job.size,
                          textAlign: TextAlign.left,
                          style: TextStyle(fontSize: 15.0, color: Colors.grey)),
                      margin:
                          EdgeInsets.only(top: 5.0, left: 10.0, bottom: 5.0),
                    ),
                    Divider(), //分割线
                    Row(
                      children: <Widget>[
                        Padding(
                          padding: EdgeInsets.only(
                              top: 10.0, left: 10.0, right: 5.0, bottom: 15.0),
                          child: Text(job.username + ' | ' + job.title,
                              style: TextStyle(
                                color: Color.fromARGB(255, 0, 215, 198),
                              )),
                        )
                      ],
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
