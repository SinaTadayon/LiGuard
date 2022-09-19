// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IBaseProxy {
  event Upgraded(address indexed sender, address indexed proxy, address indexed newImplementation);
}
