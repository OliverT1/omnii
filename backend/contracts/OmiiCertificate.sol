pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./CertificateData.sol";


contract OmiiCertificate is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => CertificateData) public certificateData;

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(
            ERC721, AccessControl
        )
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    constructor() ERC721("Omii Certificate", "OMII") {
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function awardCertificate(address to, uint256 vintageTokenId, 
                                string memory uri,
                                bool verified) public returns(uint256){
        require(
            hasRole(MINTER_ROLE, msg.sender),
            "Omii Certificate: account does not have minter role"
        );
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        certificateData[newItemId].vintageTokenId = vintageTokenId;
        certificateData[newItemId].uri = uri;
        certificateData[newItemId].verified = verified;
        return newItemId;
    } 

}