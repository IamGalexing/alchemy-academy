const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { getEthAddress } = require("../utils/generateAddress");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);

console.log("privateKey:", toHex(privateKey));
console.log("publicKey:", toHex(publicKey));
console.log("EthAddress:", getEthAddress(publicKey));
