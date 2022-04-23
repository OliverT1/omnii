pragma solidity ^0.8.1;


struct CertificateData {
    uint256 vintageTokenId;
    bool verified; 
    string uri; // IPFS storage of calculation data
}