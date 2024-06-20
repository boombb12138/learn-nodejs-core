const fs = require('fs/promises');
const path = require('path');
//读取一个文件的内容
// 1 首先要打开文件 会得到一个代表文件的id
// 2 然后读取文件内容
(async () => {
  const createFile = async (path) => {
    try {
      // 先检查文件存在吗 如果有就说已经存在
      let existingFIleHandle = await fs.open(path, 'r');
      existingFIleHandle.close();
      return console.log(`the file already exists`);
    } catch (error) {
      // 没有就创建
      const newFielHandler = await fs.open(path, 'w');
      console.log(`the file was created successfully`);
      newFielHandler.close(); //关闭文件
    }
  };

  const deleteFile = async (path) => {
    try {
      // 使用await因为fs.unlink返回一个promise
     await fs.unlink(path, 
      //   (err) => {//这个回调是异步的 所以抛出的错误不能被catch到 trycatch只能捕获同步的错误
      //   if (err) throw err;
      //   console.log(`${path} was deleted`);
      // }
    );
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('no file at this path to remove');
      } else {
        console.log(`deleting the file ${path} ${error}`);
      }
    }
  };

  const renameFile = async (oldFilePath, newFilePath) => {
    try {
     await fs.rename(oldFilePath, newFilePath );
    } catch (error) {
     if(error.code === 'ENOENT'){
      console.log("no file at this path, or the destination doen't exist")
     }else{
      console.log(`renaming the file ${oldFilePath} to ${newFilePath} error`);
     }
    }
  };

  let addedContent ;
  const addToFile = async ( filePath, content ) => {
    if(addedContent == content)return
    console.log(`adding to the file ${filePath} `);
    console.log(`Content: ${content} `);
    try {
    const fileHandle = await fs.open(filePath,"a");
    await fileHandle.write(content);
    addedContent = content;
    console.log("The content was added")
    } catch (error) {
     console.log(`An error occured ${error}`)
    }
  };

  const CREATE_FILE = 'create a file';
  const DELETE_FILE = 'delete a file';
  const RENAME_FILE = 'rename a file';
  const ADD_TO_FILE = 'add to file';
  // 1 首先要打开文件 会得到一个代表文件的id
  const commandFileHandler = await fs.open('./command.txt', 'r'); //'r'代表  Open file for reading
  commandFileHandler.on('change', async () => {
    // 得到文件大小 为了分配大小合适的Buffer
    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);
    const offset = 0;
    const length = buff.byteLength; //要读取的字节数
    const position = 0; //从文件的哪处开始读数据
    // 2 然后读取文件内容并存储在buffer中
    await commandFileHandler.read(buff, offset, length, position);
    //3 将buffer转为utf-8
    const command = buff.toString('utf-8');

    //4 create a file
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // delete file
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // rename file
    // rename file <path> to <path>
    if (command.includes(RENAME_FILE)) {
      const idx = command.indexOf(' to ');
      const oldFilePath = command.substring(RENAME_FILE.length + 1, idx);
      const newFilePath = command.substring(idx + 4);
      renameFile(oldFilePath, newFilePath);
    }

    // add to file
    // add to file <path> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const parts = command.slice(ADD_TO_FILE.length).split(' this content: ');
      if (parts.length === 2) {//parts = ["yes.txt", "Hello World!"]
        const filePath = parts[0].trim();
        const content = parts[1];
        await addToFile(filePath, content);
      } else {
        console.log('Invalid add to file command format');
      }
    }
  });
  // watch方法 Returns an async iterator that watches for changes on filename
  const watcher = fs.watch('./command.txt');
  // for await...of 语句创建一个循环，该循环遍历异步可迭代对象以及同步可迭代对象。
  for await (const event of watcher) {
    if (event.eventType === 'change') {
      console.log('The file was change');
      commandFileHandler.emit('change');
    }
  }
})();
