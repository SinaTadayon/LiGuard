// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)

pragma solidity 0.8.17;

/**
 * @title Domain Management Interface
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */

import "./IACLCommons.sol";

interface IDomainManagement is IACLCommons {

  struct RequestRegisterDomain {
    string name;
    ActivityStatus astat;
    UpgradabilityStatus ustat;
    bytes32[] realms;
    bytes32[] groups;
  }

  struct RequestUpdateDomain {
    bytes32 domain;
    ActionType action;
    bytes32[] realms;
    bytes32[] groups;
  }

  struct DomainInfo {
    string name;
    ActivityStatus astat;
    UpgradabilityStatus ustat;
    bytes32[] realms;
    bytes32[] groups;
  }

  event DomainRegistered(address indexed sender, bytes32 indexed domain, string name);

  event DomainActivityChanged(address indexed sender, bytes32 indexed domain, ActivityStatus astat);

  event DomainUpgradabilityChanged(address indexed sender, bytes32 indexed domain, UpgradabilityStatus ustat);

  event DomainUpdated(address indexed sender, bytes32 indexed domain, ActionType action, bytes32[] realms, bytes32[] groups);

  function registerDomain(RequestRegisterDomain calldata registerRequest) external returns (bytes32);

  function updateDomain(RequestUpdateDomain[] calldata updateRequests) external returns (bool);

  function setDomainActivityStatus(bytes32 domain, ActivityStatus astat) external returns (bool);

  function setDomainUpgradabilityStatus(bytes32 domain, UpgradabilityStatus astat) external returns (bool);

  function hasDomainGroup(bytes32 domain, bytes32 group) external view returns (bool);

  function hasDomainRealm(bytes32 domain, bytes32 realm) external view returns (bool);

  function getDomainInfo(bytes32 domain) external view returns (DomainInfo memory);
}