const buffer = require("buffer");
const memoryContainer = Buffer.alloc(4);//分配4个字节 32位 

memoryContainer[0] = 0xf4;
memoryContainer[1] = 0x34;
// 向buffer写入复数
memoryContainer.writeInt8(-32);
memoryContainer[3] = 0xff;


console.log(memoryContainer )//命令行会用十六进制来表示二进制<Buffer e0 34 00 ff>
console.log(memoryContainer.readInt8() )//writeInt8写入的 读取也要通过readInt8读取
console.log(memoryContainer[1] )//命令行会用十进制来表示
console.log(memoryContainer.toString("hex"))//以十六进制表示buffer  e03400ff 而不是数组

