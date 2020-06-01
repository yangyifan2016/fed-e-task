# 简答题
### 第一题
* 引用计数工作原理：设置引用数，引用发生变化时更新引用数，当引用数为0时回收
* 优点：发现垃圾立即回收；最大限度减少程序卡顿
* 缺点：无法回收循环引用对象；资源消耗大
### 第二题
标记整理算法工作流程：
* 遍历对象，标记活动对象
* 整理活动对象，移动对象位置
* 清除非活动对象，回收空间
### 第三题
新生代回收采用复制算法和标记整理，新生代内存区等分为使用空间From和空闲空间To,活动对象存储在From空间，标记整理后将活动对象拷贝至To空间，From与To交换空间完成释放。
### 第四题
增量标记算法在回收老生代对象时使用，采用程序执行与回收标记交替执行的方式，使程序在进行垃圾回收处理时也不至于完全暂停，提高整体运行效率。
# 代码题1
### 1
```
fp.flowRight(fp.prop('in_stock'), fp.last)
```
### 2
```
fp.flowRight(fp.prop('name'), fp.first)
```
### 3
```
let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
let averageDollarValue = 
```
### 4
```
const sanitizeNames = fp.flowRight(fp._underscore, fp.toLower, fp.map)
```