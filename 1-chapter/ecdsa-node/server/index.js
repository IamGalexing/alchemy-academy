const express = require("express");
const app = express();
const { getEthAddress } = require("./utils/generateAddress");
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const {
  toHex,
  utf8ToBytes,
  hexToBytes,
} = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
  "0xe8dbe8f6c57b15c807bc4dbe15cc076e7be94973": 100,
  "0x2e4e551a46b6907161abd928387e477d17623c62": 50,
  "0xa8508e563fc5b7ee679db5d21baf593ee8d2453a": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, signature, recoveryBit, senderAddress } = req.body;
  const { recipient, amount } = message;
  const messageHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
  const publicKeyOfSender = secp.recoverPublicKey(
    messageHash,
    hexToBytes(signature),
    recoveryBit
  );
  const sender = getEthAddress(publicKeyOfSender);

  if (sender !== senderAddress) {
    res
      .status(400)
      .send({ message: "Wrong Private Key for your wallet address!" });
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
