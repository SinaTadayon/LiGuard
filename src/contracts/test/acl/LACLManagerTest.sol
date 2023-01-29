// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v3.0.0)

pragma solidity 0.8.17;

import "./IDomainManagementTest.sol";
import "../../lib/struct/LEnumerableSet.sol";
import "../../acl/IACLCommons.sol";
import "../../acl/IACLGenerals.sol";
import "../../acl/IACLManager.sol";
import "../../acl/ACLStorage.sol";
import "../../proxy/IProxy.sol";
import "../../proxy/IERC1822.sol";
import "../../utils/IERC165.sol";
import "../../acl/IACL.sol";
import "../../acl/scope/IContextManagement.sol";
import "../../acl/scope/IFunctionManagement.sol";
import "../../acl/scope/IRealmManagement.sol";
import "../../acl/scope/IGlobalManagement.sol";
import "../../acl/agent/IMemberManagement.sol";
import "../../acl/agent/IRoleManagement.sol";
import "../../acl/agent/ITypeManagement.sol";
import "../../acl/policy/IPolicyManagement.sol";

import "hardhat/console.sol";



/**
 * @title ACL Manager Library
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
library LACLManagerTest {
  // using LEnumerableSet for LEnumerableSet.Bytes32Set;
  using LEnumerableSet for LEnumerableSet.AddressSet;

  string public constant LIB_NAME = "LACLManager";
  string public constant LIB_VERSION = "3.0.1";

   
  function registerProxyFacet(ACLStorage.DataCollection storage data, address implementation) external {
    data.facetSet.add(address(this));
    IACLCommons.FacetEntity storage facetEntity = data.facets[address(this)];
    facetEntity.subjectId = implementation;
    // facetEntity.interfaceId = type(IACLManager).interfaceId;
    data.selectors[IProxy.upgradeTo.selector] = address(this);
    data.selectors[IProxy.setSafeModeStatus.selector] = address(this);
    data.selectors[IProxy.setUpdatabilityStatus.selector] = address(this);
    data.selectors[IProxy.setLocalAdmin.selector] = address(this);
    data.selectors[IProxy.setAccessControlManager.selector] = address(this);
    data.selectors[IProxy.contractName.selector] = address(this);
    data.selectors[IProxy.contractVersion.selector] = address(this);
    data.selectors[IProxy.accessControlManager.selector] = address(this);
    data.selectors[IProxy.subjectAddress.selector] = address(this);
    data.selectors[IProxy.safeModeStatus.selector] = address(this);
    data.selectors[IProxy.updatabilityStatus.selector] = address(this);
    data.selectors[IProxy.localAdmin.selector] = address(this);
    data.selectors[IProxy.domainSeparator.selector] = address(this);
    data.selectors[IProxy.initVersion.selector] = address(this);
    data.selectors[IProxy.withdrawBalance.selector] = address(this);
    data.selectors[IERC165.supportsInterface.selector] = address(this);
    data.selectors[IACLManager.aclRegisterFacet.selector] = address(this);
    data.selectors[IACLManager.aclUpgradeFacet.selector] = address(this);
    data.selectors[IACLManager.aclGetFacets.selector] = address(this);
    data.selectors[IERC1822Proxiable.proxiableUUID.selector] = address(this); 
    data.selectors[bytes4(keccak256("initialize(string,string)"))] = address(this);
    data.selectors[bytes4(keccak256("initACL(address,address,address,address)"))] = address(this);
    data.selectors[bytes4(keccak256("getFirstInit()"))] = address(this);
    data.selectors[bytes4(keccak256("getLibrary()"))] = address(this);
  }

  function aclRegisterFacet(ACLStorage.DataCollection storage data, IACLManager.FacetRegisterRequest calldata request) external returns (bool) {
   
    // require(  
    //   request.interfaceId != type(IACL).interfaceId ||
    //   request.interfaceId != type(IACLGenerals).interfaceId ||
    //   request.interfaceId != type(IACLManager).interfaceId ||
    //   request.interfaceId != type(IPolicyManagement).interfaceId ||
    //   request.interfaceId != type(IFunctionManagement).interfaceId ||
    //   request.interfaceId != type(IContextManagement).interfaceId ||
    //   request.interfaceId != type(IRealmManagement).interfaceId ||
    //   request.interfaceId != type(IDomainManagementTest).interfaceId ||
    //   request.interfaceId != type(IGlobalManagement).interfaceId ||
    //   request.interfaceId != type(IMemberManagement).interfaceId ||
    //   request.interfaceId != type(IRoleManagement).interfaceId ||
    //   request.interfaceId != type(ITypeManagement).interfaceId, 
    //   "Illegal InterfaceId"
    // );

    require(!data.facetSet.contains(request.facetId), "Facet Already Exist");    
    // require(IERC165(request.facetId).supportsInterface(request.interfaceId), "Illegal Interface");
    for(uint j = 0; j < request.selectors.length; j++) {
      require(data.selectors[request.selectors[j]] == address(0), "Illegal Selector");
      data.selectors[request.selectors[j]] = request.facetId;
    }
    data.facetSet.add(request.facetId);
    IACLCommons.FacetEntity storage facetEntity = data.facets[request.facetId];
    facetEntity.subjectId = request.subjectId;
    // facetEntity.interfaceId = request.interfaceId;      

    return true;      
  }
}
