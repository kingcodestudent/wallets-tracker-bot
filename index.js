const { ethers } = require("ethers");

// 1. Environment Variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const RPC_URL = process.env.RPC_URL;
const NFT_THREAD_ID = process.env.NFT_THREAD_ID;

// 2. Provider Setup (Chain ID 4663 fixed)
const provider = new ethers.JsonRpcProvider(RPC_URL, 4663);

// 3. Aapke 11 Wallets (Yahan apne wallets daal lijiye)
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
].map(address => address.toLowerCase()); // Aakhri wale ke baad comma nahi aayega

// NFT Transfer Topic (Screenshot ke hisaab se)
const TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

// Telegram Alert Function
async function sendTelegramMessage(text) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    try {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                message_thread_id: NFT_THREAD_ID,
                text: text,
                parse_mode: "HTML"
            })
        });
    } catch (error) {
        console.error("Telegram error:", error);
    }
}

// 4. 1-Minute Polling System (Speed Breaker)
let lastCheckedBlock = 0;

async function checkNFTs() {
    try {
        const latestBlock = await provider.getBlockNumber();
        
        if (lastCheckedBlock === 0) {
            lastCheckedBlock = latestBlock; 
            console.log("🎨 NFT Tracker Shuru Ho Gaya Hai... (Har 1 Minute me check karega)");
            return; 
        }

        if (latestBlock > lastCheckedBlock) {
            console.log(`Checking blocks from ${lastCheckedBlock} to ${latestBlock}...`);
            
            // Ek sath saare blocks ka data 1 hi request mein nikalega
            const logs = await provider.getLogs({
                fromBlock: lastCheckedBlock,
                toBlock: latestBlock,
                topics: [TRANSFER_TOPIC]
            });

            for (let log of logs) {
                if (log.topics.length >= 3) {
                    const fromAddress = ethers.dataSlice(log.topics[1], 12).toLowerCase();
                    const toAddress = ethers.dataSlice(log.topics[2], 12).toLowerCase();

                    if (targetWallets.includes(fromAddress) || targetWallets.includes(toAddress)) {
                        console.log("Match Found! Telegram par bhej raha hu...");
                        const msg = `🚨 <b>NFT Transfer Detected!</b>\n\n<b>From:</b> <code>${fromAddress}</code>\n<b>To:</b> <code>${toAddress}</code>\n<b>Tx:</b> <code>${log.transactionHash}</code>`;
                        await sendTelegramMessage(msg);
                    }
                }
            }
            lastCheckedBlock = latestBlock; 
        }
    } catch (error) {
        console.error("Block check karne mein error (Ignore if it happens rarely):", error.message);
    }
}

// Yahan set kiya hai 60000 milliseconds (1 Minute) ka timer
setInterval(checkNFTs, 60000);

// Bot shuru hone par pehli check
checkNFTs();
