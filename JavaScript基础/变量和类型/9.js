/**
 * 可能发生隐式类型转换的场景以及转换原则，应如何避免或巧妙应用
 * 
 * 转化规则：
 *  toString
 *    undefined	"undefined"
      null	"null"
      boolean	"true" 或者 "false"
      number	数字作为字符串。比如，"1.765"
      string	无需转换
      []	""
      [5,2]	"5,2"
      {}	"[object Object]"
      Symbol()	"Symbol()"
    
    toInt
      undefined	NaN
      null	+0
      boolean	true被转换为1,false转换为+0
      number	无需转换
      string	由字符串解析为数字。例如，"324"被转换为324
      []	+0
      [5]	5
      {}	NaN
      Symbol	报错
    
    toBoolean
      undefined	false
      null	false
      boolean	无需转换
      number	+0,-0转换为false,其他为true
      string	''为false,其他为true
      []	true
      {}	true
      Symbol	true
 */

//1.字符串拼接时，将值转化成string
1+'2' //12
undefined + '2' //undefined2

//2.==判断时，将值转化成boolean

//if判断时

//计算时