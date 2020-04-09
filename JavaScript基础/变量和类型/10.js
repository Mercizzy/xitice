/**
 * 出现小数精度丢计算机的二进制实现和位数限制有些数无法有限表示。
  * 就像一些无理数不能有限表示，如 圆周率 3.1415926...，1.3333... 等。
  * JS 遵循 IEEE 754 规范，采用双精度存储（double precision），占用 64 bit。
  * 
 * JavaScript可以存储的最大数字、最大安全数字，
 *  Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER
 *  (-Math.pow(2, 53)+1,Math.pow(2, 53)-1)
 * 
 * JavaScript处理大数字的方法、避免精度丢失的方法
 *  处理大数字的方法
 *    1.使用bignumber.js
 *    2.使用BigInt  99999n/BigInt(99999)
 *  避免精度丢失的方法
 *    1.将数据的小数点替换成''，并记住是几位小数，最后再除以相应的倍数即可，单纯的先乘也可能导致精度丢失
 */

let a = 9999999999999999999999999999999
console.log(a); //1e+31
let b = 9999999999999999999999999999999n
console.log(b); //原样输出
