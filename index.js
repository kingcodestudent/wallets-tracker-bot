require('dotenv').config();
const { ethers } = require('ethers');
const axios = require('axios');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const RPC_URL = process.env.RPC_URL;
const NFT_THREAD_ID = process.env.NFT_THREAD_ID;

const provider = new ethers.JsonRpcProvider(RPC_URL);
provider.pollingInterval = 20000;

// Aapke 50-100 Wallets ki list (Lowercase mein rakhna zaroori hai)
const targetWallets = [
    "0x2ef1b2567aa33e1ba07f4fbd1a297223df28bafa",
"0xe908ba570259e4bb1e1fdd2edd9b15e092b13211",
"0xcd211569a108fdac74d729ba7358a743a3c2e08d",
"0xcdea19e6d247619ed5fefe47b4992ea577ad2142",
"0x1795011ea0d47f3dbd757b77fdaa3f0366208237",
"0x2532f17705c241d66478fda4c20afa57f779124d",
"0xc47316a2708ff27f75592eec0ae30b205b44dc2f",
"0x5ab2d1f5069dd2f9aeec3b0a8e923b1cdbe7fc44",
"0xdc053eb590db975870cf20e13c894cd5a96ca045",
"0x00179a311d6b239f2d367372b0dd7799946e6ab6",
"0x535faa541252d9650f1f8a8bbd88709fb8b55a1b",
"0x10dc0417835bace30dd4afb05aa7590532a874e6",
"0xbffa316d6430bce0ba92c9996e488319a06d7f6f",
"0x7082ee6bb34a072a2fb0f46180d10bcc9a9c07d3"
].map(address => address.toLowerCase());

// ERC-721 (NFT) ka standard Transfer Event signature
const transferEventSignature = ethers.id("Transfer(address,address,uint256)");

async function sendTelegramMessage(text) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    try {
        await axios.post(url, {
            chat_id: CHAT_ID,
            message_thread_id: NFT_THREAD_ID,
            text: text,
            parse_mode: "HTML"
        });
    } catch (error) {
        console.log("Telegram Error:", error.message);
    }
}

console.log("🎨 NFT Tracker Shuru Ho Gaya Hai...");

// Har naye block par sirf 'Logs' (Smart Contract Events) check karna
provider.on("block", async (blockNumber) => {
    try {
        // Hum provider se bol rahe hain ki is block mein sirf NFT Transfers dhoondo
        const logs = await provider.getLogs({
            fromBlock: blockNumber,
            toBlock: blockNumber,
            topics: [transferEventSignature]
        });

        for (let log of logs) {
            // Topics se Sender aur Receiver nikalna (Address 24 characters extra padding ke sath aate hain)
            const from = ethers.dataSlice(log.topics[1], 12).toLowerCase();
            const to = ethers.dataSlice(log.topics[2], 12).toLowerCase();
            const tokenId = ethers.toBigInt(log.topics[3] || log.data).toString();

            // Agar bhejne wala ya receive karne wala humari list mein hai
            if (targetWallets.includes(from) || targetWallets.includes(to)) {
                
                // Pata lagana ki humare wallet ne kharida hai ya becha
                const action = targetWallets.includes(to) ? "🟩 BOUGHT / RECEIVED" : "🟥 SOLD / SENT";
                const ourWallet = targetWallets.includes(to) ? to : from;

                let msg = `🎨 <b>NFT Activity Detected!</b>\n\n` +
                          `<b>Action:</b> ${action}\n` +
                          `<b>Wallet:</b> <code>${ourWallet}</code>\n` +
                          `<b>NFT Token ID:</b> ${tokenId}\n` +
                          `<b>Contract:</b> <code>${log.address}</code>\n` +
                          `<b>Tx Hash:</b> ${log.transactionHash}`;
                
                sendTelegramMessage(msg);
                console.log(`NFT Transaction mili! Token ID: ${tokenId}`);
            }
        }
    } catch (error) {
        console.log("Block check karne mein error:", error.message);
    }
});
