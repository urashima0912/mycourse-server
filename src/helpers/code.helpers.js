function generate(max = 5) {
  let code = "";
  const letters = "abcdefghijklnmñopqrstuvxywzABCDEFGHIJKLN091234678";

  for (let i = 0; i < max; i++) {
    const index = Math.floor(Math.random() * letters.length);
    code += letters[index];
  }

  return code;
}

module.exports = {
  generate,
};
