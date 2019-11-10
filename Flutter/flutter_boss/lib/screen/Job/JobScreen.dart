import 'package:flutter/material.dart';
import 'package:flutter_boss/components/jod_listItem.dart';
import 'package:flutter_boss/model/job.dart';

class JobScreen extends StatefulWidget {
  @override
  _JobScreenState createState() => _JobScreenState();
}

class _JobScreenState extends State<JobScreen> {
  List<Job> _jobs = [];
  ScrollController _scrollCtrl = ScrollController();

  @override
  void initState() {
    super.initState();
    getCompanyList();
  }

  // 加载数据
  getCompanyList() {
    setState(() {
      _jobs = Job.fromJson(jsonData);
      _scrollCtrl.addListener(() {
        if (_scrollCtrl.position.pixels ==
            _scrollCtrl.position.maxScrollExtent) {
          print("滑倒最后了");
        }
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "工作",
          style: TextStyle(),
        ),
      ),
      body: RefreshIndicator(
        child: ListView.builder(
          controller: _scrollCtrl,
          itemCount: _jobs.length,
          itemBuilder: (context, index) {
            return _buildItem(context, index);
          },
        ),
        onRefresh: _onRefresh,
      ),
    );
  }

  _buildItem(BuildContext context, int index) {
    Job job = _jobs[index];
    return InkWell(
      onTap: () {
        // print(job.name);
      },
      child: JobListItem(job),
    );
  }

  Future<void> _onRefresh() async {
    await Future.delayed(Duration(seconds: 2));
    print("下拉刷新");
  }
}

var jsonData = """
          {
            "list": [
              {
                "name": "架构师（Android）",
                "cname": "蚂蚁金服",
                "size": "B轮",
                "salary": "25k-45k",
                "username": "Claire",
                "title": "HR"
              },
              {
                "name": "资深iOS架构师",
                "cname": "今日头条",
                "size": "D轮",
                "salary": "40k-60k",
                "username": "Kimi",
                "title": "HRBP"
              },
              {
                "name": "架构师（大前端）",
                "cname": "蚂蚁金服",
                "size": "B轮",
                "salary": "25k-45k",
                "username": "Claire",
                "title": "HR"
              },
              {
                "name": "资深Android架构师",
                "cname": "今日头条",
                "size": "D轮",
                "salary": "40k-60k",
                "username": "Kimi",
                "title": "HRBP"
              },
              {
                "name": "架构师（Android）",
                "cname": "蚂蚁金服",
                "size": "B轮",
                "salary": "25k-45k",
                "username": "Claire",
                "title": "HR"
              },
              {
                "name": "Flutter工程师",
                "cname": "今日头条",
                "size": "D轮",
                "salary": "40k-60k",
                "username": "Kimi",
                "title": "HRBP"
              }
            ]
          }
      """;
