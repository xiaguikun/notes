#  react-notes

## react知识简介
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

## react基础知识
    1.类组价的render()函数，渲染函数，通过render函数解析jsx语法，渲染页面
    2.react元素是react的最小砖块，用于构建组件