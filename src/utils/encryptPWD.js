const crypto = require('crypto');

module.exports = function encryptPWD(pwdPar) {
    return crypto.createHash('sha256').update(pwdPar).digest('hex');
}
