const crypto = require('crypto');
export class CryptHelper {
    private publickey: string;
    constructor() {
        this.publickey = "-----BEGIN PUBLIC KEY-----\n" +
            "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJgmDnxap+ffqi+85JI1gORWBM\n" +
            "qFWjtUy+m6V3mUyI72wo123123123123123123123123123c7ZmyOgmwfSXgE0ec\n" +
            "/QNt+CkzQOyfNE49alxOZoF4eHAcRaTR8E4kUwSY2ryZKKq6eYV+iP3lmiKjHLIj\n" +
            "vnAURDBnzTqIwDgnEQIDAQAB\n" +
            "-----END PUBLIC KEY-----\n";
    }
    public EncryptByKey(str: string) {
        const cipher = crypto.createCipher('aes192', this.publickey);
        let crypted = cipher.update(str, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }
    public DecryptByKey(str: string) {
        const decipher = crypto.createDecipher('aes192', this.publickey);
        let decrypted = decipher.update(str, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
