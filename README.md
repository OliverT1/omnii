# Omnii
Omnii is a flexible oracle that uses real-time satellite and other environmental data to scale the verification of carbon credit awards.

Carbon emissions oracle for verifying Toucan projects.

## Setup
- Set up a .env file with an alchemy endpoint MUMBAI_URL and a private key for the server PRIVATE_KEY (change the public address in the contracts if necessary).
- Change into the backend_contracts folder, npm install, then compile the contracts using npx hardhat compile.
- Change into the back-end folder, npm install, then start the server using nodemon server.js
- Change into the front-end folder, npm install, then start the front-end using npm start

## Backend


## Contracts
- OmiiCertificate.sol
 ERC721 token for verification of Toucan Vintage Project
- CertificateData.sol
Struct for use in ERC721, allows storage of IPFS metadata as well as verificatin and Toucan vintageTokeID varialbes.

## Front end
Built with React/Chakra UI.


