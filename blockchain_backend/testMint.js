const existingContractAddr = "0xfA3d6F540D355239C57d9eC68905FC9C5afCf211";

async function main() {
  const nft = await hre.ethers.getContractAt("OmiiCertificate", existingContractAddr);

  const signer0 = await ethers.provider.getSigner(0);
  const nonce = await signer0.getTransactionCount();
    
  await nft.awardCertificate('0x9c3a0bde02a2e32e0a6beac9013fecc9f5648748', 19, 'ipfs://QmbF3Ffq6Dh23WFuAcJWzrqzjfuw5KGzTZfhkPSjHJPUXr', true, {nonce: nonce});
  

  console.log("Minting is complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });