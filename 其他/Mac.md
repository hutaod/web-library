## 进程查询和删除

```bash
lsof -i tcp:端口
kill -9 对应的PID
```

## vi 常用命令

i 进入编辑模式
Esc 退出编辑模式，输入以下命令：
:wq 保存后退出 vi，若为 :wq! 则为强制储存后退出（常用）
:w 保存但不退出（常用）
:w! 若文件属性为『只读』时，强制写入该档案
:q 离开 vi （常用）
:q! 若曾修改过档案，又不想储存，使用 ! 为强制离开不储存档案。
:e! 将档案还原到最原始的状态！

## brew 更换镜像源

[Mac 下更换 Homebrew 镜像源](https://blog.csdn.net/lwplwf/article/details/79097565)

[参考链接](https://www.runoob.com/linux/linux-vim.html)
