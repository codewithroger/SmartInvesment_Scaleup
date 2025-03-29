require("dotenv").config();
const { ethers } = require("ethers");

async function testProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.API_URL);
    const blockNumber = await provider.getBlockNumber();
    console.log(`Connected to Volta. Latest block: ${blockNumber}`);
}

testProvider().catch(console.error);
