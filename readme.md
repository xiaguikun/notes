#   notes

##  笔记

###  生命周期![生命周期](F:\浩鲸新智能\学习\notes\images\生命周期.png)

###  数组方法
1. .push方法:在数组的后面添加元素，返回值是添加元素后数组的长度
```js
    // 改变原数组，当push的对象是数组时，直接push进去一个数组
    let length=arr.push(1);
    // length为数组长度
    // arr数组的最后追加1这个元素
```
2.  .pop方法：删除并并返回数组的最后一个元素
```js
    // 改变原数组
    let arr=[1,2,3];
    let num=arr.pop();
    // num=1,arr=[1,2]
```
3.  .concat方法， 添加元素，并返回一个新数组
```js
    // 不改变原数组，返回新的合并后的数组，与push不同的是，如果push是一个数组，会直接push进去，而concat会展开数组，在合并起来，组成一个新的数组返回
    let arr=[1,2,3];
    let arr2=arr.concat([4,5,6]);//[1,2,3,4,5,6]
    console.log(arr2);
    let arr3=arr.concat(4);//[1,2,3,4]
    console.log(arr3);
```