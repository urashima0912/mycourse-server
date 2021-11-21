const bcrypt = require("bcrypt");

async function encrypt(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function compare(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  encrypt,
  compare,
};
