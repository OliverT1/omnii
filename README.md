# Omnii

Omnii is a flexible oracle that uses real-time satellite and other environmental data to scale the verification of carbon credit awards.

## Setup
- Set up a .env file with an alchemy endpoint `MUMBAI_URL` and a private key for the server `PRIVATE_KEY` (change the public address in the contracts if necessary).
- Change into the blockchain_contracts folder, `npm install`, then compile the contracts using `npx hardhat compile`.
- Change into the server folder, `pip install -r requirements.txt`, then start the server using `flask run`.
- Change into the front-end folder, `npm install`, then start the front-end using `npm start`

## Backend

Python Flask server with API for computing the verification protocol using satellite data from [dClimate](https://www.dclimate.net/). Queries the Verra registry for location and size info for a particular project given its ID. 

API Schema:
`GET /carbon_density/<verraId>`:
- Param: verraId (int): ID of Verra Project
- Returns a json 
  - baselineBiomass5Year (float): average biomass of project site 
  - satelliteDelta1Year (float): computed difference in biomass over 1 year.
  - projectedDelta1Year (float): promised reduction in CO2 (~biomass) in Verra contract. 


## Contracts

- `OmiiCertificate.sol`
 ERC721 token for verification of Toucan Vintage Project
- `CertificateData.sol`
Struct for use in ERC721, allows storage of IPFS metadata as well as verificatin and Toucan vintageTokeID varialbes.

## Front end

Verification NFT minting. Built with React/Chakra UI.
