const existingContractAddr = "0x877E6e6236c0c02C91edBAc7cC6191cFAAa4cB0d";

async function main() {
  const nft = await hre.ethers.getContractAt("OmiiCertificate", existingContractAddr);

  const signer0 = await ethers.provider.getSigner(0);
  const nonce = await signer0.getTransactionCount();
    
  const tokenURI = "https://gateway.ipfs.io/ipfs/QmcnG9VcMuumREednndN28LjzvPjHPDwh2s7nYW9ynckPk";
  await nft.awardCertificate('0xAfBf7206Fcf7134D96eE2FF271dAf8249eb09Eb5', 2, 2, 2, 's', {nonce: nonce});
  

  console.log("Minting is complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });