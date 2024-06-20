// async
// execution time:2.8
// const fs = require('node:fs/promises');
// (async() => {
//     console.time("writeMany");
//     const fileHandle = await fs.open("text.txt","w");
//     for(let i = 0; i<100000;i++){
//         await fileHandle.write(`${i}`);//2.88s
//     }
//     console.timeEnd("writeMany")
// })()

// execution time:27.8
const fs = require("node:fs/promises");
(async () => {
  console.time("writeMany");
 const fileHandler =await  fs.open("test.txt", "w");
 
  for (let i = 0; i < 100000000; i++) {
    const buff = Buffer.from(` ${i} `, "utf-8");
   await fileHandler.write(buff);
  }

  console.timeEnd("writeMany");
 
})();

// sync
// execution time:1.2
// const fs = require("node:fs");
// (async() => {
//     console.time("writeMany");
//     fs.open("text.txt","w",(err,fd) => {
//         for(let i = 0;i<100000;i++){
//             const buff = Buffer.from(`${i}`,"utf-8");
//             fs.writeSync(fd,buff)//sync fd is the id of text.txt
//         }
//         console.timeEnd("writeMany")
//     })
// })()