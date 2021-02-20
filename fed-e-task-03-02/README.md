## 简答题
### 1、请简述 Vue 首次渲染的过程。
Vue首次渲染前先初始化Vue的静态成员，实例成员。
初始化结束后调用Vue的构造函数。

构造函数中首先要将模板编译成render函数。判断是否传递了render，如果没有就要通过compileToFunctions函数将template或el中传递的模板编译成render渲染函数，记录在options中。

然后触发beforeMount生命周期的钩子函数。

定义updateComponent函数，它里面定义了render函数和update函数，分别用于渲染虚拟DOM和将虚拟DOM转换成真实DOM并挂载到页面。

然后创建Watcher实力，将updateComponent传递进来。随后调用Watcher的get方法，在get方法中会调用updateComponent。

最后触发mounted生命周期的钩子函数，返回Vue实例。

### 2、请简述 Vue 响应式原理。
Vue在初始化过程中执行init方法时调用initState方法初始化Vue实例的状态，initState中调用了initData初始化data数据，为data的每个成员执行observe方法转换成响应式对象。

在observe方法中，首先判断传入的值是否是对象，如果不是直接返回，如果存在__ob__属性，说明已经处理成响应式数据了，也返回。否则的话创建并返回observe对象。

在Observe的构造函数中，为处理的值添加一个不可枚举的__ob__属性，用来记录当前的observe对象。然后分别处理数组与对象两种情况。

如果当前处理的值是数组，修改数组的几个会改变数组的方法，在调用这些方法时出发通知。对数组的所有子元素也进行响应式处理。

如果是对象的话，为对象的每个属性创建dep对象，如果属性是对象，则继续调用observe将其做响应式处理。然后为属性定义getter和setter，getter中收集依赖（把属性对应的watcher对象添加到dep的subs数组中，childOb手机子对象的依赖，用于子对象增删时派发通知）并返回属性的值。setter保存新值，（如果新值是对象，observe转换成响应式）然后派发通知（调用dep的notify方法）。

派发通知时，dep的notify方法会调用watcher对象的update方法，watcher被放入队列中依次执行（beforeUpdate，watcher.run(),清空上次的依赖，actived，updated）。
### 3、请简述虚拟 DOM 中 Key 的作用和好处。
Key用来做拥有相同父元素的子元素的唯一标识，设置Key值，在Vue对比新旧节点时有利于节点的比较和重用，减少Dom操作次数。

### 4、请简述 Vue 中模板编译的过程。
首先将模板解析成抽象语法树结构的数据，然后基于AST进行优化，判断节点中是否是纯静态节点，如果是，则提升为常量，重新渲染的时候不再重新创建节点。根据优化后的AST生成纯文本形式的编译函数，最后转换成函数返回。