// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import {MerkleProofUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./interfaces/IAngelaList.sol";

/**
--------------------------------------------------------------------------------------------------------------------
                                                                                        
     o                                         o888             ooooo       o88                o8   
    888     oo oooooo     oooooooo8 ooooooooo8  888   ooooooo    888        oooo   oooooooo8 o888oo 
   8  88     888   888  888    88o 888oooooo8   888   ooooo888   888         888  888ooooooo  888   
  8oooo88    888   888   888oo888o 888          888 888    888   888      o  888          888 888   
o88o  o888o o888o o888o 888     888  88oooo888 o888o 88ooo88 8o o888ooooo88 o888o 88oooooo88   888o 
                         888ooo888       

"heute nicht" - Angela Merkel                                                                                                                                                                                                                                                                                                                                                                                                                                       
---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
TESTNET WIP
"AngelaList"                :   Whitelist utility merkle proof contract
@author                     :   @bretth18 (computerdata) 
@title                      :   AngelaList
@dev                        :   n/a
 */


contract AngelaList is IAngelaList, OwnableUpgradeable {

    /// State variable containing merkle root 
    /// see {IAngelaList}
    bytes32 public override merkleRoot;

    /// Events
    event merkleRootUpdated(bytes32 _merkleRoot);



    /// update merkle root
    function updateMerkleRoot(bytes32 _newRoot) public onlyOwner {
        merkleRoot = _newRoot;
        emit merkleRootUpdated(merkleRoot);
    }

    /// return leaf
    function leaf(address _account) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_account));
    }

    /// verify proof
    function verify(bytes32 _leaf, bytes32[] memory _proof) internal view returns (bool) {
        return MerkleProofUpgradeable.verify(_proof, merkleRoot, _leaf);
    }

}

