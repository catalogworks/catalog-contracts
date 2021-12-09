// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
--------------------------------------------------------------------------------------------------------------------

  oooooooo8 ooooo         ooooooo8   ooooooo     ooooooo   
o888     88  888        o888    88 o88     888 o888  o888o 
888          888        888    oooo      o888  888  8  888 
888o     oo  888      o 888o    88    o888   o 888o8  o888 
 888oooo88  o888ooooo88  888ooo888 o8888oooo88   88ooo88   

"oh yeah money time" - this contract
---------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                           
TESTNET ERC-20 TOKEN
"CLG20"                     :   extremely basic and open erc-20 token for testing purposes
@author                     :   @bretth18 (computerdata) 
@title                      :   CLG20
@dev                        :   lol
 */
contract CLG20 is ERC20, Ownable {

    event OhYeahMoneyTime(address indexed receiver, uint256 amount, string memo);

    constructor() ERC20("CLG20TestToken", "CLG20") {}

    function mint(address _to, uint256 _amount) public {
        emit OhYeahMoneyTime(_to, _amount, "oh yeah money time");
        _mint(_to, _amount);
    }

}
