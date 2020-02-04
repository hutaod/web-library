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

## Mac 下多个 Xcode 版本切换

首先安装安装其他版本，[xcode 版本下载地址](https://xcodereleases.com/)

### 1、显示当前使用的 Xcode

```bash
xcode-select -p
```

### 2、切换 Xcode 版本

在 shell 中, 输入(后面的路径为已安装的且要切换到得 Xcode 路径):

```bash
sudo xcode-select -s /Applications/Xcode10.app/Contents/Developer
```

查看当前版本:

```bash
gcc --version
# 输出
Configured with: --prefix=/Applications/Xcode10.app/Contents/Developer/usr --with-gxx-include-dir=/Applications/Xcode10.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/usr/include/c++/4.2.1
Apple LLVM version 10.0.0 (clang-1000.11.45.5)
Target: x86_64-apple-darwin19.3.0
Thread model: posix
InstalledDir: /Applications/Xcode10.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin
```
