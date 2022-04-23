const { create } = require("ipfs-http-client");

const ipfs = create("https://ipfs.infura.io:5001");
const existingContractAddr = "0x877E6e6236c0c02C91edBAc7cC6191cFAAa4cB0d";

// we added two attributes, add as many as you want!
async function run() {
const vintageTokenId = 1;
const verified = true;


  const files = [{
    path: '/',
    content: JSON.stringify({
      name: "A verifed Toucan Project Vintage",
        location :
        {
          latitude: ,
          longitude: "100"
        },
        projectId: ,
        vintageTokenId vintageTokenId,
        baseline: ,
        verified: ,
        delta_c: ,
    })
  }];

  const result = await ipfs.add(files);
  console.log(result);

  const nft = await hre.ethers.getContractAt("OmiiCertificate", existingContractAddr);

  const signer0 = await ethers.provider.getSigner(0);
  const nonce = await signer0.getTransactionCount();

  const tokenURI = "https://gateway.ipfs.io/ipfs/QmcnG9VcMuumREednndN28LjzvPjHPDwh2s7nYW9ynckPk";
  await nft.awardCertificate('0xAfBf7206Fcf7134D96eE2FF271dAf8249eb09Eb5', vintageTokenId, result, verified, {nonce: nonce});
  

  console.log("Minting is complete!");

}

run().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});;