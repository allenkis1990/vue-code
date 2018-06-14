[TOC]

** 项目整体说明**

```
	项目以vue + vux + less + webpack开发

  其中
    vue = 					vue、vue-router、vuex
    vux =					weui = ui框架
    less = 					样式编写预编译语法
    webpack = 				项目构建所需的构建环境

```

1. vue https://cn.vuejs.org/
2. vux https://vux.li/#/
3. vue-router https://router.vuejs.org/
4. vuex https://vuex.vuejs.org
5. webpack https://webpack.js.org/
6. less http://lesscss.cn/

# 目录结构说明

## root (虚目录)

> 文件列表

```language

    | -- .babelrc                   // es6转es5的写法的构建配置文件
    | -- .editorconfig				// 项目webstorm配置
    | -- .eslintignore				// js ESLint 忽略配置
    | -- .eslintrc.js				// js ESlint 配置文件
    | -- .gitignore					// git 提交的时候忽略文件配置
    | -- .postcssrc.js				// postcss 配置
    | -- index.html					// 项目访问索引页
    | -- package.json				// 项目构建开发环境npm包依赖描述文件
    | -- README.md					// 项目说明文件

```

### build

**_目录说明：项目开发和构建所需要的工程文件集合_**

```language

	| -- build.js					// 项目构建主文件
    | -- check-versions.js			//
    | -- design-server.js			// 美工设计页面启动服务配置
    | -- dev-client.js				// 开发环境热重载配置文件
    | -- dev-server.js				// 开发环境环境配置文件
    | -- utils.js					// 构建和开发所需要的工具集合文件
    | -- vue-loader.conf.js			// 基于vue开发的特殊webpack的loader配置文件
    | -- webpack.base.conf.js		// 项目构建基本配置文件，以下美工、开发、生产构建以这个扩展
    | -- webpack.design.conf.js		// 美工开发的时候构建的配置文件
    | -- webpack.dev.conf.js		// 研发开发的配置构建文件
    | -- webpack.prod.conf.js		// 生产环境配置文件
    | -- webpack.test.conf.js		// 测试环境配置文件

```

### config

**_目录说明：项目开发和构建所需要的配置文件集合_**

> 文件列表

```language

    | -- design.env.js		// **_美工设计环境配置_**
    | -- dev.env.js			// **_研发开发环境配置_**
    | -- index.js			// **_项目开发以及构建所需配置总页_**
    | -- prod.env.js		// **_生产环境配置_**
    | -- test.env.js		// **_测试环境配置_**

```

### datas

**_目录说明：暂无用处，不说明啥_**

### design

**_目录说明：项目开发美工设计页面的文件集合_**

```language

    | -- images			// 项目资源文件存放路径
    | -- styles			// 项目资源样式文件存放路径 以less开发
    | -- views			// 美工提供的样式源vue文件存放路径
    | -- App.vue		// 美工开发所用vue启动应用的主导文件
    | -- main.js		// 同上
    | -- VueMapper.js	// 用来方便访问美工开发页面的效果的映射文件(美工开发中需要频繁修改此文件)

```

`VueMapper: `

```javascript
	import home from './views/01_home.vue'
	import home_noData from './views/01_home_noData.vue'

  export default {home, home_noData}

```

`美工开发执行： npm run design`

```开发页面流程

	例： 创建test.vue

    1. 创建test.vue
    2. 同步在VueMapper 当中需要添加

    import home from './views/01_home.vue'
		import home_noData from './views/01_home_noData.vue'

		---> import test from './views/test.vue'
    export default {home, home_noData, ---> test}

	3. 访问
	   test: localhost:8889?page=test
     home: localhost:8889?page=home

```

### src

**_目录说明：项目开发前端开发的文件集合_**

`开发执行: npm run dev`

`访问: ` http://localhost:80

```language

   | -- assets				// image啥的文件
   | -- common				// 公共类
   | -- components			// vue组件目录，通常放通用的片段
   | -- global				// 工具类
   | -- router				// 前端路由
   | -- services			// 服务暂时没用
   | -- store				// vuex 状态管理存放位置
   | -- views				// vue页面以及逻辑存放位置
   | -- App.vue				// main 启动
   | -- main.js				// main 启动

```

### static

**_目录说明：项目开发静态文件文件存放地址_**

`存放images或者其他被引用的文件，构建的时候webpack将会把文件拷贝到statisc里面去,存放在这里的文件在开发的时候,不会被执行base64或者其他的操作`

### test

**_目录说明：自动化测试文件存放地方_**

### dist

`npm run build`

`生成dist文件目录`

```language

  | -- statics         // css js 等文件被hash过的文件存放 目录
	| -- index.html		 // 索引页

```

## 开发模式
