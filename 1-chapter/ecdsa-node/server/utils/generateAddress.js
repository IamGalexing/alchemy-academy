const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getEthAddress(publicKey) {
  const hash = keccak256(publicKey.slice(1));
  return "0x" + toHex(hash.slice(-20));
}

module.exports = { getEthAddress };
