import {base64Encode} from "./base64";

// eslint-disable-next-line import/no-commonjs
const JSEncrypt = require('./jsencrypt')

const PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCMjWqEvk5KTQzdMfeR3dRJe6N1JBlICHr2qq/ed1lub1a1P0xJM9lspKdodLTzjVAtiZJg6vdvyO5wfR/SXu4+vD6dHyk8FErt42t/I+TPX7wQemoapLVSwmAOJjrwfzn2kMuH4904SzL2W5RNasz+0N1J/FqfNtrJVj8dBQB3BQIDAQAB'
const encrypt = new JSEncrypt({default_key_size:1024});
encrypt.setPublicKey(PUBLIC_KEY);

export function encryptStr(val: string) {
  return encrypt.encrypt(base64Encode(val))
}
