// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/**
--------------------------------------------------------------------------------------------------------------------
                                                                                        
 ______  __     ______                                   __             __       ___
/\  _  \/\ \   /\__  _\                                 /\ \__         /\ \     /\_ \
\ \ \L\ \ \ \  \/_/\ \/     ___ ___     ___ ___   __  __\ \ ,_\    __  \ \ \____\//\ \      __
 \ \  __ \ \ \  __\ \ \   /' __` __`\ /' __` __`\/\ \/\ \\ \ \/  /'__`\ \ \ '__`\ \ \ \   /'__`\
  \ \ \/\ \ \ \L\ \\_\ \__/\ \/\ \/\ \/\ \/\ \/\ \ \ \_\ \\ \ \_/\ \L\.\_\ \ \L\ \ \_\ \_/\  __/
   \ \_\ \_\ \____//\_____\ \_\ \_\ \_\ \_\ \_\ \_\ \____/ \ \__\ \__/.\_\\ \_,__/ /\____\ \____\
    \/_/\/_/\/___/ \/_____/\/_/\/_/\/_/\/_/\/_/\/_/\/___/   \/__/\/__/\/_/ \/___/  \/____/\/____/

"heute nicht" - Angela Merkel                                                                                                                                                                                                                                                                                                                                                                                                                                       
---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
TESTNET WIP
"ALImmutable"               :   Allowlist utility merkle proof contract (non upgradeable)
@author                     :   @bretth18 (computerdata) 
@title                      :   AngelaList
@dev                        :   n/a
 */

contract ALImmutable {
    /// State variable containing merkle root
    /// see {IAngelaList}
    bytes32 public merkleRoot;

    /// Events
    event merkleRootUpdated(bytes32 _merkleRoot);

    /// update merkle root
    function updateMerkleRoot(bytes32 _newRoot) internal {
        merkleRoot = _newRoot;
        emit merkleRootUpdated(merkleRoot);
    }

    /// return leaf
    function leaf(address _account) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_account));
    }

    /// verify proof
    function verify(bytes32 _leaf, bytes32[] memory _proof) internal view returns (bool) {
        return MerkleProof.verify(_proof, merkleRoot, _leaf);
    }
}
