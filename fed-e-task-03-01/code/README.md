# 简答题
### 第一题
不是响应式数据，在程序初始化的时候会遍历data中的所有成员，并将它们转化成响应式数据，初始化后新增的数据不会被设置成响应式数据，要设置成响应式数据需要重新遍历data并执行转化响应式的操作。
vue中可调用set方法设置新成员为响应式，但不支持data下一级成员。
### 第二题
Diff算法是在Dom需要更新时，先通过比较虚拟Dom，计算出真实Dom需要更新的最小操作时使用的比较算法。减少比较次数与操作Dom产生的开销。

比较虚拟Dom节点时首先通过比较唯一标识与选择器是否相同，如果不同说明是新节点，需要创建新节点并删除老节点，如果相同则比较节点的内容。

节点内容存在两种情况，内容是text文本或子元素，对应的更新操作是修改textContent内容或修改子节点。

如果新老节点都有子节点，则需要比较子节点的不同，Diff算法默认比较同级别的子元素以减少比较次数。通过四种规则依次比较新老子节点数组的元素：新开始节点与新开始节点、新结束节点与老结束节点、新结束节点与老开始节点（若相同需要将老开始节点移动到末尾）、新开始节点与老结束节点（老结束节点移动到最前），四种规则比较结束仍不匹配，则在新节点数组中遍历匹配老节点，没有匹配的节点就是新创建的节点，直接创建并插入Dom树。上述比较匹配时，比较匹配新老节点的内容并做对应的更新操作，然后更新索引继续比较。

匹配结束，如果新节点有剩余，则在后面创建并插入新节点；如果老节点有剩余，则移除对应的老节点。

在创建或删除节点的时候，还会触发对应的钩子函数，执行对应的生命周期方法。

通过这种方式，我们减少了新老节点的比较的次数，并且只在必要的时候创建新节点，更多时候只是更新老节点的内容，当内容不变时，还会保留原节点，以此优化了更新Dom产生的开销。

# 编程题
### 第一题
01-vue-router-basic-usage

### 第二题
minivue

### 第三题
snabbdom-demo