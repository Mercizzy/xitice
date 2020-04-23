/**
 * 如何处理循环的异步操作
 *  一是如何让所有的for循环中的Promise操作结束后执行某个操作
 *  二是循环中如果后一个Promise的执行依赖与前一个Promise的执行结果(例如对于某个数据库操作)
 */

//方法1.初始化一个为0的变量

/* let flag = 0;
let len = 10;
let p = new Promise((res, rej) =>{
  setTimeout(()=> {
    console.log('处理异步操作');
    
    res()
  }, 1000)
})
for(let i=0; i<len; i++) {
  console.log(i);
  
  p.then(()=> {
    flag ++
    if(flag == len) {
      console.log('All Promise finished');
      
    }
  })
} */

//方法2 async await
/* let p = new Promise((res, rej) =>{
  setTimeout(()=> {
    console.log('执行异步操作');
    res()
  }, 1000)
})
let asyncP = async function() {
  for(let i=0; i<10; i++) {
    await p.then(()=> {
      console.log(i);
      
    })
  }
  console.log('All Promise finished');
}
asyncP() */

//方法3.使用promise.all
/* let arr = []
let p = function() {
  return new Promise((res, rej)=> {
    setTimeout(()=> {
      res()
    }, 1000)
  })
}
let promises = [];
for(let i=0; i<10; i++) {
  promises.push(p().then(()=> {
    arr.push(i)
  }))
}
Promise.all(promises).then(()=> {
  console.log(arr);
  
}) */