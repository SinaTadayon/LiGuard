// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.2)

pragma solidity 0.8.17;

import "./IAccessControl.sol";
import "./AclStorage.sol";

import "./scope/IContextManagement.sol";
import "./scope/IFunctionManagement.sol";
import "./scope/IRealmManagement.sol";
import "./scope/IDomainManagement.sol";
import "./scope/IGlobalManagement.sol";
import "./agent/IMemberManagement.sol";
import "./agent/IRoleManagement.sol";
import "./agent/ITypeManagement.sol";
import "./IPolicyManagement.sol";

import "../lib/struct/LEnumerableSet.sol";
// import "../lib/acl/LContextManagement.sol";
// import "../lib/acl/LRoleManagement.sol";
// import "../lib/acl/LGroupManagement.sol";
// import "../lib/acl/LRealmManagement.sol";
import "../lib/acl/LAccessControl.sol";
import "../proxy/Initializable.sol";
import "../proxy/BaseUUPSProxy.sol";

/**
 * @title Access Control Manager Contract
 * @author Sina Tadayon, https://github.com/SinaTadayon
 * @dev
 *
 */
contract AclManager is AclStorage, BaseUUPSProxy {
  using LEnumerableSet for LEnumerableSet.AddressSet;
  using LEnumerableSet for LEnumerableSet.Bytes32Set;

  constructor() {}

  function initialize(
    string calldata contractName,
    string calldata contractVersion,
    string calldata contractRealm,
    address accessControlManager
  ) public onlyProxy onlyLocalAdmin initializer {
    bytes32 realm = keccak256(abi.encodePacked(contractRealm));

    // LAccessControl.initializeContext(_data);    

    __BASE_UUPS_init(contractName, contractVersion, accessControlManager);

    // register proxy facet and aclManager contract functions
    LAccessControl.registerProxyFacet(_data);
    _data.selectors[this.initialize.selector] = address(this);
    _data.selectors[IERC165.supportsInterface.selector] = address(this);
    _data.selectors[this.aclRegisterFacet.selector] = address(this);
    _data.selectors[this.aclUpgradeFacet.selector] = address(this);
    // __data.selectors[aclFirstPostInit.selector] = address(this);
    _data.selectors[this.aclGetFacets.selector] = address(this);
    _data.selectors[IERC1822Proxiable.proxiableUUID.selector] = address(this);
    _data.selectors[withdrawBalance.selector] = address(this);
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
    return
      interfaceId == type(IAccessControl).interfaceId ||
      interfaceId == type(IPolicyManagement).interfaceId ||
      interfaceId == type(IFunctionManagement).interfaceId ||
      interfaceId == type(IContextManagement).interfaceId ||
      interfaceId == type(IFunctionManagement).interfaceId ||
      interfaceId == type(IRealmManagement).interfaceId ||
      interfaceId == type(IDomainManagement).interfaceId ||
      interfaceId == type(IGlobalManagement).interfaceId ||
      interfaceId == type(IMemberManagement).interfaceId ||
      interfaceId == type(IRoleManagement).interfaceId ||
      interfaceId == type(ITypeManagement).interfaceId ||      
      super.supportsInterface(interfaceId);
  }

  event AclFacetRegistered(address indexed sender, address indexed facetId, bytes4 interfaceId);

  // event aclFacetMigrated(
  //   address indexed sender, 
  //   address indexed facetId, 
  //   address indexed newFacetId,
  //   bytes4 interfaceId,
  //   bytes4 newInterfaceId
  // );

  function aclRegisterFacet(FacetRegisterRequest[] calldata requests) public onlyProxy returns (bool) {
    if(_firstInit) {
      require(_getLocalAdmin() == _msgSender(), "Caller Not Authorized");      
      _firstInit = false;
      return _doAclRegisterFacet(requests);
    } else {
      require(_hasPermission(this.aclRegisterFacet.selector), "Access Denied");
      return _doAclRegisterFacet(requests);
    }
  }

  function _doAclRegisterFacet(FacetRegisterRequest[] calldata requests) internal returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      // require(_data.interfaces[requets[i].interfaceId], "Interface Already Exist");
      require(_data.facets.contains(requests[i].facetId), "Facet Already Exist");
      for(uint j = 0; j < requests[i].selectors.length; j++) {
        require(_data.selectors[requests[i].selectors[j]] == address(0), "Illegal Selector");
        _data.selectors[requests[i].selectors[j]] = requests[i].facetId;
      }
      // _data.interfaces[requets[i].interfaceId];
      _data.facets.add(requests[i].facetId);
      emit AclFacetRegistered(_msgSender(), requests[i].facetId, requests[i].interfaceId);
    }
    return true;      
  }

  function aclUpgradeFacet(FacetUpgradeRequest[] calldata requests) public onlyProxy aclCheck(this.aclUpgradeFacet.selector) returns (bool) {
    for(uint i = 0; i < requests.length; i++) {
      require(_data.facets.contains(requests[i].facetId), "Facet Not Found");
      for(uint j = 0; j < requests[i].functions.length; j++) {
        if (requests[i].functions[j].action == ActionType.REMOVE) {
          for(uint z = 0; z < requests[i].functions[j].selectors.length; z++) {
            require(_data.selectors[requests[i].functions[j].selectors[z]] != address(0), "Selector Not Found");
            delete _data.selectors[requests[i].functions[j].selectors[z]];
          }
        } else if (requests[i].functions[j].action == ActionType.ADD) {
          for(uint z = 0; z < requests[i].functions[j].selectors.length; z++) {
            require(_data.selectors[requests[i].functions[j].selectors[z]] == address(0), "Illegal Selector");
          }
        } 
      }
      // IAclFacet(requets[i].newFacetId).
      // emit aclFacetMigrated(_msgSender(), requests[i].facetId, requests[i].newFacetId);
    }
  }

  // TODO 
  // function aclFirstPostInit() public onlyProxy onlyLocalAdmin returns (bool) {
  //   require(_firstInit, "FirstPostInit Already Called");

  //   // create acl request context
  //   RequestRegisterContext[] memory rc = LAccessControl.createRequestContext();
  //   LContextManagement.registerAccessControlManagerContext(__data, address(this), realm, rc);

  //   _firstInit = true;
  //   emit Initialized(
  //     _msgSender(),
  //     address(this),
  //     _implementation(),
  //     contractName,
  //     contractVersion,
  //     realm,
  //     _getInitializedCount()
  //   );
  // }

  function aclGetFacets() public returns (address[] memory) {
    return _data.facets.values();
  }

  // function createFacetRegisterRequest() public returns (FacetRegisterRequest) {}

  // function createFacetUpgradeRequest() public returns (FacetMigrateRequest) {}

  // function createContextRegisterFacetRequest() public returns (ContextRegisterFunctionRequest) {}

  // function createContextUpgradeFacetRequest() public returns (ContextUpgradeFunctionRequest) {}


  // function getLibraries() external pure returns (address[] memory) {
  //   address[] memory libs = new address[](5);
  //   libs[0] = address(LAccessControl);
  //   libs[1] = address(LContextManagement);
  //   libs[2] = address(LRealmManagement);
  //   libs[3] = address(LRoleManagement);
  //   libs[4] = address(LGroupManagement);
  //   return libs;
  // }
}
