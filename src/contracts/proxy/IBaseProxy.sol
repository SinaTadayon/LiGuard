// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15 <0.9.0;

interface IBaseProxy {
  event Upgraded(address indexed sender, address indexed proxy, address indexed newImplementation);
}
