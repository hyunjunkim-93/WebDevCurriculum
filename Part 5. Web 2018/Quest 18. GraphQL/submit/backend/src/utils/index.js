const crypto = require('crypto');

module.exports = {
    createSalt() {
        return crypto.randomBytes(64).toString('base64');
    },
    
    getScryptHash(pw, salt) {
        const hash = crypto.scryptSync(pw, salt, 64);
        return hash.toString('base64');
    },
    
    isSameAB(A, B) {
        if (A === B) {
            return true
        } else {
            return false
        };
    },  
};
