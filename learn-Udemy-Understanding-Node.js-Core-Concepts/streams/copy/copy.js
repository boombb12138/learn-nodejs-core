const fs = require('node:fs/promises');
const { pipeline } = require('node:stream');

// 时间460.353ms 内存30M
// (async() => {
//     console.time("copy");
//     const destFile = await fs.open("text-copy.txt","w");
//     const result = await fs.readFile("test.txt");

//     await destFile.write(result);
//     console.timeEnd("copy");//copy: 460.353ms
// })();

// 时间1.186s 内存10M
// (async () => {
//   console.time('copy');

//   const srcFile = await fs.open('test.txt', 'r');
//   const destFile = await fs.open('text-copy.txt', 'w');

//   let bytesRead = -1;
//   while (bytesRead !== 0) {
//     //这一步是为了去掉空字符串
//     // 有返回值
//     const readResult = await srcFile.read(); //每次只返回1chunk 而不会一下子返回整个文件
//     bytesRead = readResult.bytesRead; //得到返回的chunk大小
//     console.log('readResult', readResult);
//     if (bytesRead !== 16384) {
//       // 说明已经读完了
//       const indexOfNotFilled = readResult.buffer.indexOf(0); //找到第一个为0的元素下标
//       const newBuffer = Buffer.alloc(indexOfNotFilled);
//       readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
//       destFile.write(newBuffer);
//     } else {
//       destFile.write(readResult.buffer); //说明是完整的buffer
//     }
//   }
//     console.timeEnd("copy");//copy: 1.186s

// })();

// 时间: 378.427ms 内存30M
(async () => {
    console.time("copy");
    const srcFile = await fs.open("test.txt","r");
    const destFile = await fs.open("text-copy.txt","w");

     const readStream = srcFile.createReadStream();
     const writeStream = destFile.createWriteStream();

    //  readStream.pipe(writeStream);//只能在可读的stream上调用pipe 然后传入的第一个参数destination只能是writeStream

    //  readStream.on("end",() => {
    //     console.timeEnd("copy")
    //  })
    pipeline(readStream,writeStream,(err) => {
        console.log(err);
        console.timeEnd("copy")
    })
})


