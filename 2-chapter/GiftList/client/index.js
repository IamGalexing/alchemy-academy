const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const prompt = require("prompt-sync")();

const serverUrl = "http://localhost:1225";
const merkleTree = new MerkleTree(niceList);

async function main() {
  const checkGift = prompt("Enter your name:");

  const index = niceList.findIndex((n) => n === checkGift);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    checkGift,
  });

  console.log({ gift });
}

main();
