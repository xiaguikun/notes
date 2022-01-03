# git配置ssh配置
git工具是我们平常开发中不可缺少的，本文将讲解git的一些基本的配置

首先拿到一台新的电脑，要区分Mac本还是Windows本，如果是Mac本则不需要下载git工具，因为Mac自带的xcode集成了git，如果是Windows本，我们一般需要下载git bash(官网可以下载)

当git工具下载完成后我们只需要进行以下几步简单的操作

#####	1.	配置用户名和邮箱(在提交代码时用到)
仅仅在本git-repo生效的局部配置
```
git config user.name "name"
git config user.email "email"
```
全局配置
```
git config --global user.name "name"
git config --global user.email "email"
```
```
git config –lis  查看配置信息
```
当使用全局配置来配置我们的用户名和邮箱的时，我们只能配置一次，之后就不能修改了

#####	2. 再次修改git配置的用户名和邮箱
使用我们的命令工具，Windows可以使用git bash Mac可以使用item（电脑自带的工具也可以），输入以下命令
```
git config --global --replace-all user.name "name"
git config --global --replace-all user.email "email"
```
或者直接修改.gitconfig文件，找到.gitconfig文件直接修改里面的用户名和邮箱

##### 3. 修改本次commit提交的用户名和邮箱
这条指令可以更新最近的一次commit的用户名邮箱
```
git commit --amend --author="name <email>"
```

##### 4. ssh配置
（1）首先我们可以查看一下我们之前是否已经执行配置过ssh，如果之前配置过我们只需要找到之前的公钥文件，将公钥配置到我们的代码仓库中就可以了使用,一般情况下我们可以通过以下命令查看到
```
cd ~/ .ssh
ls
```
其中_pub 结尾的就是我们的公钥文件
（2）初次配置ssh
生成公钥私钥命令
```
ssh-keygen -t rsa
```
中间会提示你是否需要设置密码，如果设置了每次使用Git都会用到密码，一般都是直接不写为空，直接回车就可以
然后找到生成公钥和私钥的文件，如上，将公钥内容复制到代码仓库的设置秘钥上就可以了。