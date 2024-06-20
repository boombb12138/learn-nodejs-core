const container = Buffer.alloc(3 );
container[0]=0x48;
container[1]=0x69;
container[2]=0x21;
// 创建字符串的第1种方法
console.log(container.toString("utf-8"))
// 创建字符串的第2种方法
const container2 = Buffer.from(["0x48","0x69","0x21"])
console.log(container2.toString("utf-8"))//Hi!
// 创建字符串的第3种方法
const container3 = Buffer.from("C2A9","hex")
console.log(container3.toString("utf-8"))//©

// 字符串转buffer
const container4 = Buffer.from("Hi!","utf-8")
console.log(container4 )//<Buffer 48 69 21>

const container5 = Buffer.alloc(3,0x48);
console.log("container5",container5)
const container6 = Buffer.allocUnsafe(3).fill(0x48);
console.log("container6",container6)