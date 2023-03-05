// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IDomainManagementTest.sol";
import "../../acl/IACL.sol";
import "../../acl/ACLStorage.sol";
import "../../acl/IACLManager.sol";
import "../../acl/scope/IContextManagement.sol";
import "../../acl/scope/IFunctionManagement.sol";
import "../../acl/scope/IRealmManagement.sol";
import "../../acl/scope/IUniverseManagement.sol";
import "../../acl/agent/IMemberManagement.sol";
import "../../acl/agent/IRoleManagement.sol";
import "../../acl/agent/ITypeManagement.sol";
import "../../acl/policy/IPolicyManagement.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../lib/acl/LACLStorage.sol";
import "../../test/acl/LACLManagerTest.sol";
import "../../proxy/Initializable.sol";
import "../../proxy/BaseUUPSProxy.sol";

/**
 * @title Access Control Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract ACLManagerTest is ACLStorage, BaseUUPSProxy, IACLManager {
  using LACLStorage for DataCollection;
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  constructor() {}

  function reInitialize(string calldata contractVersion) public onlyProxy onlyLocalAdmin reinitializer(2) {
    _contractVersion = contractVersion;
  }

  function getFirstInit() public view returns (bool) {
    return _firstInit;
  }

  function aclGetFacet(bytes4 selector) external view returns (address) {
    return _data.selectors[selector];
  }

  function aclHasSelector(bytes4 selector) external view returns (bool) {
    return _data.selectors[selector] != address(0);
  }

  function aclGetFacetInfo(address facetId) external view returns (FacetInfo memory) {
    FacetEntity storage facetEntity = _data.facets[facetId];
    return
      FacetInfo({
        subjectId: facetEntity.subjectId
        // interfaceId: facetEntity.interfaceId
      });
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
    return
      interfaceId == type(IACL).interfaceId ||
      interfaceId == type(IACLGenerals).interfaceId ||
      interfaceId == type(IACLManager).interfaceId ||
      interfaceId == type(IPolicyManagement).interfaceId ||
      interfaceId == type(IFunctionManagement).interfaceId ||
      interfaceId == type(IContextManagement).interfaceId ||
      interfaceId == type(IRealmManagement).interfaceId ||
      interfaceId == type(IDomainManagementTest).interfaceId ||
      interfaceId == type(IUniverseManagement).interfaceId ||
      interfaceId == type(IMemberManagement).interfaceId ||
      interfaceId == type(IRoleManagement).interfaceId ||
      interfaceId == type(ITypeManagement).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function aclRegisterFacet(FacetRegisterRequest[] calldata requests) external onlyProxy returns (bool) {
    if (_firstInit) {
      require(_getLocalAdmin() == _msgSender(), "Forbidden");
      return _doAclRegisterFacet(requests);
    } else {
      require(_hasPermission(this.aclRegisterFacet.selector) == IACL.AuthorizationStatus.PERMITTED, "Access Denied");
      return _doAclRegisterFacet(requests);
    }
  }

  function _doAclRegisterFacet(FacetRegisterRequest[] calldata requests) internal returns (bool) {
    for (uint256 i = 0; i < requests.length; i++) {
      LACLManagerTest.aclRegisterFacet(_data, requests[i]);
      emit ACLFacetRegistered(
        _msgSender(),
        requests[i].facetId,
        requests[i].subjectId
        // requests[i].interfaceId
      );
    }
    if (_data.facetSet.length() >= 11) _firstInit = false;
    return true;
  }

  function aclUpgradeFacet(FacetUpgradeRequest[] calldata requests)
    external
    onlyProxy
    aclCheck(this.aclUpgradeFacet.selector)
    returns (bool)
  {
    for (uint256 i = 0; i < requests.length; i++) {
      require(_data.facetSet.contains(requests[i].facetId), "Facet Not Found");

      FacetEntity storage facetEntity = _data.facets[requests[i].facetId];
      require(requests[i].subjectId != address(0) && facetEntity.subjectId != requests[i].subjectId, "Illegal Upgrade");

      facetEntity.subjectId = requests[i].subjectId;
      // if(requests[i].interfaceId != bytes4(0) && facetEntity.interfaceId != requests[i].interfaceId) {
      //   require(IERC165(requests[i].facetId).supportsInterface(requests[i].interfaceId), "Illegal Interface");
      //   facetEntity.interfaceId = requests[i].interfaceId;
      // }

      for (uint256 j = 0; j < requests[i].functions.length; j++) {
        if (requests[i].functions[j].action == ActionType.REMOVE) {
          for (uint256 z = 0; z < requests[i].functions[j].selectors.length; z++) {
            require(_data.selectors[requests[i].functions[j].selectors[z]] != address(0), "Selector Not Found");
            delete _data.selectors[requests[i].functions[j].selectors[z]];
            emit ACLFacetFunctionUpgraded(
              msg.sender,
              requests[i].facetId,
              requests[i].functions[j].selectors[z],
              ActionType.REMOVE
            );
          }
        } else if (requests[i].functions[j].action == ActionType.ADD) {
          for (uint256 z = 0; z < requests[i].functions[j].selectors.length; z++) {
            require(_data.selectors[requests[i].functions[j].selectors[z]] == address(0), "Illegal Selector");
            _data.selectors[requests[i].functions[j].selectors[z]] = requests[i].facetId;
            emit ACLFacetFunctionUpgraded(
              msg.sender,
              requests[i].facetId,
              requests[i].functions[j].selectors[z],
              ActionType.ADD
            );
          }
        }
      }
      emit ACLFacetUpgraded(_msgSender(), requests[i].facetId, requests[i].subjectId);
    }
    return true;
  }

  function aclGetFacets() public view returns (address[] memory) {
    return _data.facetSet.values();
  }

  function getLibrary() external pure returns (address) {
    return address(LACLManagerTest);
  }
}
