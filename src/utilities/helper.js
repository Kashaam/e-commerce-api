const fs = require("fs");

const randomStringGenerator = (length = 100) => {
  const char = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const len = char.length;
  let result = "";

  for (let i = 1; i <= len; i++) {
    let pos = Math.ceil(Math.random() * (len - 1));
    result += char[pos];
  }
  return result;
};

deleteFile = (filepath) => {
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
};

module.exports = { 
    randomStringGenerator, 
    deleteFile };
