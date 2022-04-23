const ethers = require('ethers');

async function main() {

    

    // woah, we just cut out the whole compile.js flow with this!
    let artifacts = await hre.artifacts.readArtifact("OmiiCertificate");
  
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/70BFPO5DVGnoRbOg_4IdQG9_szJjCp6S");
  
    let privateKey = process.env.PRIVATE_KEY;
  
    let wallet = new ethers.Wallet(privateKey, provider);
  
    // Create an instance of a Faucet Factory
    let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
  
    let token = await factory.deploy();
  
    console.log("Faucet address:", token.address);
  
    await token.deployed();
 
//    const OmiiCertificateToken = await hre.ethers.getContractFactory("OmiiCertificate");
//    console.log('Deploying OmiiCertificate ERC721 token...');
//    const token = await OmiiCertificateToken.deploy('BadgeToken','Badge');

//    await token.deployed();
//    console.log("OmiiCerticate deployed to:", token.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch((error) => {
     console.error(error);
     process.exit(1);
   });