#           				react-notes

## 一、react知识简介

    1.关于react和vue在项目应用上的区别知识点，react相对于vue更适合于大型项目，react是不遵循mvc思想的，因为react组件化，让每个组件都有自己的c，从而减轻了大型项目中controller的压力，提高项目的性能，但是使用react项目的开发成本相对大一点
    
    2.如何使用体验React
    (1)单个文件使用react   需要三个基本文件  react.js --react的顶级库 提供api
                                           react-dom.js --ReactDom适用于渲染组件到视图
                                           babel-loader --用于解析jsx
    (2)通过脚手架来构建React项目      官方：create-react-app --CRA
                                    国内：阿里的 --dva
                                               --umi
                                    自主基于webpack构架（所有的脚手架都可以通过webpack来构建）
    
    3.React版本
        创作时间：2011年前后
        开源时间：2013年5月
        React初期版本 2013-2015   --React15版本
        React当前使用版本 2016    --React16版本
        React未来版本     2020    --React17版本

    4.类组价的render()函数，渲染函数，通过render函数解析jsx语法，渲染页面

    5.react元素是react的最小砖块，用于构建组件

##  二、项目基础-CRA构建

### 1、cra构建项目基础
    1.构建的项目中默认使用yarn，yarn的使用一定要配置国内镜像源

    2.项目构建后有个yarn eject 其作用是配置文件抽离 将webpack的相关配置从node-modules的react-script中的config和script文件抽离到项目的根目录中，这样我们可以随时去更改和操作webpack配置，此操作不可逆
    
    3.读项目目录
        config：webpack的配置文件也是项目的配置文件，可以配置反向代理，路径别名等
        scripts：项目的启动脚本
        node-modules: 项目的依赖包
        package.json: ---version 项目的版本
                      ---scripts 项目的一些运行命令
                      ---dependencies  生产环境下需要的插件
                      ---devDependencies 开发环境下需要的插件
        public： 放静态资源的地方
                 ---manifest.json 是app的配置文件 配置离线缓存等
        src: 是放源代码的地方，也是开发的地方，里面的index.js是项目的入口文件