// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.9;

import "./test.sol";
import "../contracts/CLG20.sol";

contract CLG20Test is DSTest {

    CLG20 internal clg20;

    /// Contract state is reset before each test.
    /// this function is called each time after deployment
    function setUp() public {
        clg20 = new CLG20();
    }

    function testMint() public {
        clg20.mint(address(this), 500);
        assertEq0(clg20.balanceOf(address(this)), 500);
    }
}