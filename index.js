const { ethers } = require("ethers");
const http = require('http'); 

// 1. Environment Variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const RPC_URL = process.env.RPC_URL;
const NFT_THREAD_ID = process.env.NFT_THREAD_ID;

// 2. Provider Setup (Chain ID 4663 fixed)
const provider = new ethers.JsonRpcProvider(RPC_URL, 4663);

// 3. Aapke Wallets (Yahan apne poore wallets daal lijiye)
const targetWallets = [
    "0x00179a311d6b239f2d367372b0dd7799946e6ab6",
"0xcd800c0869b4cfe1ac243923dc8caf56fa112d44",
"0xb85d7931ab76e10a5745bc43b5dc89173d88dd85",
"0xa9962d8614d6fefd1160a775e01d72e9c8efc807",
"0xdc053eb590db975870cf20e13c894cd5a96ca045",
"0x5e811646c53fddbe05c7c534cdb307e72168dd71",
"0x3030a655afe64a2c9f1dfdac06ccc7824da7638d",
"0x4b4e96215d6a00ed54da78962ea9d5dd848a2259",
"0x7562f42f9e673bc6b49d4a4d5d4e543d7c98cc5c",
"0xc2c76331f5742599ca42c6d1edc1493f76890f90",
"0x4502a7566361fc12b6af55da2c903d7538b8001a",
"0x76d98dcd70b572d249973392607085b2104dbeaf",
"0xfdbe8e062fd9a036b4e0e3d31af1e7dd477e27e1",
"0x285adb531f697c62b7098fd7dc113f9a4bce7ba3",
"0xdd0ebda7a0cbc63157df1449cbb6aad515bca0fa",
"0x8fb42d618af190987561f23e542528bac6fe969e",
"0xe376705caacc70a5a1b040d024c8a331ff8a66ca",
"0x6f2c6bb6f6ae4ad67772806a1ff43e333cec6324",
"0x7f9e0e31e6d986224ec13a42d02e9174b2a835ef",
"0x14e72e18d2a53902d91d43459831dc7c8a37a6fe",
"0xa76420a75c85ef237a74682836c87811d9bc11b0",
"0x89bfaf83cbd202f53f94900da8c86646ddbfa022",
"0x0dbb4cd6a761543c41d156462f552805e2b1a106",
"0x6ab1ac5c79193579ad7365b1f852c12ef45bd921",
"0xaa92eea9843a6c63873b0956ce3ca61fbb85037b",
"0xac8bf8a7cd58f4e51168ff5728f9430e6d4b9c37",
"0xec7b6493b3db61192b1d679050cfa1f6098a16a9",
"0xc40dcad571ee3f4cb423fe5cf80bc897ffe3909f",
"0x7435a9d165dec083f4d61d572c65e6d898e6b606",
"0xe3ff6e7653b02a994b7cee8927b194ffed251a6f",
"0xfc2db268200257a52585377ed45d0ef002be80ae",
"0x3d7daf20c1b2159737ef7db88941ba1e9768a534",
"0xef8d3b6b54959c2fb74d5205d036e0b4107045c3",
"0xe908ba570259e4bb1e1fdd2edd9b15e092b13211",
"0x6f85bbd20810e7f70f6a99f78dd7174b3a2f1c22",
"0xb4be85887d68a3dfdd5e9826a5b7744379fd34e4",
"0x5b6c16a960f6e7b1603b3d4c420e0c0a5f6e2afb",
"0x7a245aa5278b5d62707fd3376ceb36131c4d4e0e",
"0xcbc415ba5ad03f04c5f3010da4beda5e0f7e81c9",
"0xadfa18e47a362ad034486ad5a7f815557a0070aa",
"0x397dbac914ad31a36fe60678a2fda01e9add7faf",
"0xa3cab8278ba8501422582cc5c2e844fa57448296",
"0xdb511b38c784ce65858d20c5e37da8865b36f9f2",
"0xdf4f2bf9461b623dfde4e888da2bf3caee50e22e",
"0x33c9518894f83865ca2dd1b6259b5dcc20c87651",
"0x0938fda6dc5c25bc55c92489f0b2565a2a96c07d",
"0xe9a456945ad82cb3156d42b435d17ccacd15f164",
"0x083bf51f9f4db577cbd0c8e70e342fb7e9266e60",
"0x440579d874b3229ef8e8138dc75babb6a03711df",
"0xdfdd47255c55850925ed85fdf106061c392b0e0a",
"0x5ab2d1f5069dd2f9aeec3b0a8e923b1cdbe7fc44",
"0x01e2db782eee4d164217129922446786d73cd4c1",
"0xcd9aa0f51ae128575af8b62e14c5b2e2baf8a153",
"0xc47316a2708ff27f75592eec0ae30b205b44dc2f",
"0x9f528e1dd7f389c57bddc9e904a146c2b25e9855",
"0x28057c5f0ed7f0e20f88a877baf676bff649622d",
"0x312a6a80c3c8c5b35cec17f190c6de0dff2352ca",
"0x2591fb2aba015adf5aa7a79d8d5b632a058e52e6",
"0x508f3e2b63f3750841c8bddbf93ac29f5c668148",
"0xa5038fe26ae625147889fee1850490e7504a28ec",
"0x5f4ce2fe1d6e1a273889038f47ee68f4418e5f24",
"0x4ffa66a441f667450a34435117bc7e6e5cb3a49c",
"0x00058c5151b462eb26663dd1da40d7c89efeb463",
"0x960f387ad70b663cec1b1d52cfe1269716acf196",
"0xb426cacd2485cfd59dc5bd9aa875bbb15ccfdba8",
"0x6a6536a9a883fc0f575fd0ee88957130f004dcd5",
"0x78aae117011eb35fb42959096e77f5b0f79064d4",
"0xb0444cd886b6a72daaf6a5b304ec4284cec9384f",
"0xdc44816d18c1fa71d895a9cef9ee899fc5a2666b",
"0xaf791402cd9170c3eed200687e0cac8b5e8b0fce",
"0x7102ee4a64d1909a4ed928d8e252028c33e23c0b",
"0x10dc0417835bace30dd4afb05aa7590532a874e6",
"0xcdea19e6d247619ed5fefe47b4992ea577ad2142",
"0x539886fd5c9a30b8e4a2a0203d99f7202dbd3528",
"0xaafb164259d27122530aef535dcd059f5b3dc844",
"0xe48970a96b3162712477547bb416650c339869c4",
"0x7082ee6bb34a072a2fb0f46180d10bcc9a9c07d3",
"0x3e8ee7f508465840236e468354b28c62c7eeda57",
"0x2ef1b2567aa33e1ba07f4fbd1a297223df28bafa",
"0xbbf73287c2a446b3531848b3ee200c9bf0af803e",
"0x535faa541252d9650f1f8a8bbd88709fb8b55a1b",
"0x2aebd48a41ac9061b8e5f119ed477fb6168eb4e0",
"0x8c8248bc7f45ace05df27a739ee62e698070a1cf",
"0x2532f17705c241d66478fda4c20afa57f779124d",
"0x69423c543d5b3df3989acd1b4e848157187005a0",
"0xf2fcb326dedc26daf9330c8b8258ce2efffdd163",
"0x115a3d0034e153216d8a5a8e76e370fd749c2360",
"0x72769b82f5d29fade4bfda1c9f707d0322a17ed3",
"0x931a34ae3288fc0f8719875b6b3ef4440e1f6c52",
"0x73ff94a3809ad151162de2efc6ebf2552028bbc6",
"0x7ab7e6a777696e404b53260da72c57b31551ce98",
"0x9e8f85e5456e4e2cc27e6ae89cee31aa9b3e76a0",
"0x1795011ea0d47f3dbd757b77fdaa3f0366208237",
"0xb4b412db8183dcd05ee2a60b4b146a3ea3ccd853",
"0x73c923f810256cfee9fc7c26f544686e5e0fab5e",
"0xed64f2eff377e9b1d8df0b1d516e2fdff759f513",
"0x3433ee8c5b00b5a2e0d88dc02aa6961d245aeaa7",
"0x2f0d2f200fddc65835cb52a3a1259918e627289a",
"0xafa0adb782345aaa73d9341f6b5c0da0afcedec6",
"0xc62705eef429d15896b8022b43a9b9919b348f55",
"0xf6a36ea0ed1b8c6a570153c5bda9990101230da7",
"0xbd8a2ca4076d1b71153f5b6200dda354ff896c76",
"0xcd211569a108fdac74d729ba7358a743a3c2e08d",
"0x22a676b52392591bc6c7caf51c14b38f5e0f3716",
"0x3869d9abbdaf6644623cf42631591aa019bd29ab",
"0x5ad6fa3f35a6eaaf9c86f3f13b644dc7617f135f",
"0xf54711eb8bd9321ae38e3ffbc401848f168f128f",
"0xf287afb007dcd3032048d65fbd93b5d246fc18ac",
"0xbffa316d6430bce0ba92c9996e488319a06d7f6f",
"0x0db3d4d38008934612ae68be39927a2161e9a1ea"
    // ... APNE BAAKI WALLETS YAHAN DAALEIN ...
].map(address => address.toLowerCase()); // Aakhri wale ke baad comma nahi aayega

// NFT Transfer Topic 
const TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

// Telegram Alert Function (With Detailed Error Logging)
async function sendTelegramMessage(text) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: "HTML"
            })
        });
        
        const data = await response.json();
        
        if (!data.ok) {
            console.error("❌ TELEGRAM ERROR:", data.description);
        } else {
            console.log("✅ Telegram par message successfully chala gaya!");
        }
    } catch (error) {
        console.error("Telegram network error:", error);
    }
}

// 4. 1-Minute Polling System with Smart Lock & Progress Tracking
let lastCheckedBlock = 0;
let isChecking = false; // TRAFFIC JAM ROKNE WALA LOCK

async function checkNFTs() {
    if (isChecking) return; // Agar purana check chal raha hai, toh naya mat shuru karo
    isChecking = true; // Lock laga diya

    try {
        const latestBlock = await provider.getBlockNumber();
        
        if (lastCheckedBlock === 0) {
            lastCheckedBlock = latestBlock; 
            console.log("🎨 NFT Tracker Shuru Ho Gaya Hai... (Har 1 Minute me check karega)");
            isChecking = false;
            return; 
        }

        if (latestBlock > lastCheckedBlock) {
            console.log(`\n🔍 Naya Scan Shuru: Blocks ${lastCheckedBlock} se ${latestBlock}...`);
            
            let currentFrom = lastCheckedBlock;

            while (currentFrom <= latestBlock) {
                let currentTo = currentFrom + 9; 
                if (currentTo > latestBlock) {
                    currentTo = latestBlock;
                }

                // SCREEN PAR PROGRESS DIKHAYEGA (Ki bot atak nahi gaya hai)
                console.log(`⏳ Checking chunk: ${currentFrom} to ${currentTo}...`);

                const logs = await provider.getLogs({
                    fromBlock: currentFrom,
                    toBlock: currentTo,
                    topics: [TRANSFER_TOPIC]
                });

                // NAYA LOOP: Sirf Asli NFTs (4 topics) ko pakdega aur Swaps (3 topics) ko ignore karega
                for (let log of logs) {
                    if (log.topics.length === 4) { 
                        const fromAddress = ethers.dataSlice(log.topics[1], 12).toLowerCase();
                        const toAddress = ethers.dataSlice(log.topics[2], 12).toLowerCase();
                        
                        // NFT Collection ka Address
                        const contractAddress = log.address.toLowerCase();
                        
                        // Hexadecimal Token ID ko normal number mein badalna
                        const tokenId = BigInt(log.topics[3]).toString();

                        if (targetWallets.includes(fromAddress) || targetWallets.includes(toAddress)) {
                            console.log(`🎨 Asli NFT Found (Token ID: ${tokenId})! Telegram par bhej raha hu...`);
                            
                            const msg = `🚨 <b>NFT Transfer Detected!</b>\n\n` + 
                                        `<b>Collection:</b> <code>${contractAddress}</code>\n` +
                                        `<b>Token ID:</b> #${tokenId}\n\n` +
                                        `<b>From:</b> <code>${fromAddress}</code>\n` +
                                        `<b>To:</b> <code>${toAddress}</code>\n\n` +
                                        `<b>Tx:</b> <code>${log.transactionHash}</code>`;
                                        
                            await sendTelegramMessage(msg);
                        }
                    }
                }

                currentFrom = currentTo + 1;
                
                // Alchemy ko spam se bachane ke liye ab 1 second ka thoda bada delay
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            console.log(`🏁 Scan Poora Hua! Waiting for next minute...`);
            lastCheckedBlock = latestBlock; 
        }
    } catch (error) {
        console.error("Block check karne mein error:", error.message);
    }
    
    isChecking = false; // Scan poora hote hi Lock khol diya
}

// Har 1 Minute mein check
setInterval(checkNFTs, 60000);
checkNFTs();

// 5. Render Server (Port 10000 / 3000)
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('NFT Bot is perfectly running!');
    res.end();
}).listen(port, () => {
    console.log(`Dummy server started on port ${port}`);
    sendTelegramMessage("✅ <b>Boss, NFT Tracker Bot successfully chalu ho gaya hai!</b>");
});
