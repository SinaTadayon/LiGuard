import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeployOptions, DeployResult } from "hardhat-deploy/types";
import {
  AccessControl, AccessControl__factory,
  ACLManager, ACLManager__factory,
  ContextManager, ContextManager__factory,
  DomainManager, DomainManager__factory,
  FunctionManager, FunctionManager__factory, IACLManager, IContextManagement, IFunctionManagement,
  LACLCommons,
  LProfileCommons,
  LProfileRolePolicy,
  MemberManager, MemberManager__factory,
  PolicyManager, PolicyManager__factory,
  ProfileAccessControl, ProfileAccessControl__factory,
  ProfileContextManager, ProfileContextManager__factory,
  ProfileDomainManager, ProfileDomainManager__factory,
  ProfileFunctionManager, ProfileFunctionManager__factory,
  ProfileManager, ProfileManager__factory,
  ProfileMemberManager, ProfileMemberManager__factory,
  ProfilePolicyManager, ProfilePolicyManager__factory,
  ProfileRealmManager, ProfileRealmManager__factory,
  ProfileRoleManager, ProfileRoleManager__factory,
  ProfileTypeManager, ProfileTypeManager__factory,
  ProfileUniverseManager, ProfileUniverseManager__factory,
  RealmManager, RealmManager__factory,
  RoleManager, RoleManager__factory,
  TypeManager, TypeManager__factory,
  UniverseManager, UniverseManager__factory
} from "../../typechain/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/src/signers";
import { ethers } from "ethers";
import {
  ActivityStatus,
  AlterabilityStatus,
  LIVELY_PROFILE_ANY_TYPE_ID,
  LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
  LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID,
  LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
  LIVELY_VERSE_ACL_REALM_ID,
  LIVELY_VERSE_ACL_TYPE_ID,
  LIVELY_VERSE_ANY_TYPE_ID,
  LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
  LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
  LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
  LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
  LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
  LIVELY_VERSE_TYPE_MASTER_TYPE_ID
} from "../utils/Utils";
import { IACLCommons } from "../../typechain/types/acl/scope/FunctionManager";

// main acl contracts name
const MEMBER_MANAGER_CONTRACT_NAME_SUBJECT = "MemberManagerSubject";
const MEMBER_MANAGER_CONTRACT_NAME_PROXY = "MemberManagerProxy";
const MEMBER_MANAGER_CONTRACT_NAME = "MemberManager";

const ROLE_MANAGER_CONTRACT_NAME_SUBJECT = "RoleManagerSubject";
const ROLE_MANAGER_CONTRACT_NAME_PROXY = "RoleManagerProxy";
const ROLE_MANAGER_CONTRACT_NAME = "RoleManager";

const TYPE_MANAGER_CONTRACT_NAME_SUBJECT = "TypeManagerSubject";
const TYPE_MANAGER_CONTRACT_NAME_PROXY = "TypeManagerProxy";
const TYPE_MANAGER_CONTRACT_NAME = "TypeManager";

const FUNCTION_MANAGER_CONTRACT_NAME_SUBJECT = "FunctionManagerSubject";
const FUNCTION_MANAGER_CONTRACT_NAME_PROXY = "FunctionManagerProxy";
const FUNCTION_MANAGER_CONTRACT_NAME = "FunctionManager";

const CONTEXT_MANAGER_CONTRACT_NAME_SUBJECT = "ContextManagerSubject";
const CONTEXT_MANAGER_CONTRACT_NAME_PROXY = "ContextManagerProxy";
const CONTEXT_MANAGER_CONTRACT_NAME = "ContextManager";

const REALM_MANAGER_CONTRACT_NAME_SUBJECT = "RealmManagerSubject";
const REALM_MANAGER_CONTRACT_NAME_PROXY = "RealmManagerProxy";
const REALM_MANAGER_CONTRACT_NAME = "RealmManager";

const DOMAIN_MANAGER_CONTRACT_NAME_SUBJECT = "DomainManagerSubject";
const DOMAIN_MANAGER_CONTRACT_NAME_PROXY = "DomainManagerProxy";
const DOMAIN_MANAGER_CONTRACT_NAME = "DomainManager";

const UNIVERSE_MANAGER_CONTRACT_NAME_SUBJECT = "UniverseManagerSubject";
const UNIVERSE_MANAGER_CONTRACT_NAME_PROXY = "UniverseManagerProxy";
const UNIVERSE_MANAGER_CONTRACT_NAME = "UniverseManager";

const POLICY_MANAGER_CONTRACT_NAME_SUBJECT = "PolicyManagerSubject";
const POLICY_MANAGER_CONTRACT_NAME_PROXY = "PolicyManagerProxy";
const POLICY_MANAGER_CONTRACT_NAME = "PolicyManager";

const PROFILE_MANAGER_CONTRACT_NAME_SUBJECT = "ProfileManagerSubject";
const PROFILE_MANAGER_CONTRACT_NAME_PROXY = "ProfileManagerProxy";
const PROFILE_MANAGER_CONTRACT_NAME = "ProfileManager";

const ACCESS_CONTROL_CONTRACT_NAME_SUBJECT = "AccessControlSubject";
const ACCESS_CONTROL_CONTRACT_NAME_PROXY = "AccessControlProxy";
const ACCESS_CONTROL_CONTRACT_NAME = "AccessControl";

// profile acl contracts name
const PROFILE_MEMBER_MANAGER_CONTRACT_NAME_SUBJECT = "ProfileMemberManagerSubject";
const PROFILE_MEMBER_MANAGER_CONTRACT_NAME_PROXY = "ProfileMemberManagerProxy";
const PROFILE_MEMBER_MANAGER_CONTRACT_NAME = "ProfileMemberManager";

const PROFILE_ROLE_MANAGER_CONTRACT_NAME_SUBJECT = "ProfileRoleManagerSubject";
const PROFILE_ROLE_MANAGER_CONTRACT_NAME_PROXY = "ProfileRoleManagerProxy";
const PROFILE_ROLE_MANAGER_CONTRACT_NAME = "ProfileRoleManager";

const PROFILE_TYPE_MANAGER_CONTRACT_NAME_SUBJECT = "ProfileTypeManagerSubject";
const PROFILE_TYPE_MANAGER_CONTRACT_NAME_PROXY = "ProfileTypeManagerProxy";
const PROFILE_TYPE_MANAGER_CONTRACT_NAME = "ProfileTypeManager";

const PROFILE_FUNCTION_MANAGER_CONTRACT_NAME_SUBJECT = "ProfileFunctionManagerSubject";
const PROFILE_FUNCTION_MANAGER_CONTRACT_NAME_PROXY = "ProfileFunctionManagerProxy";
const PROFILE_FUNCTION_MANAGER_CONTRACT_NAME = "ProfileFunctionManager";

const PROFILE_CONTEXT_MANAGER_CONTRACT_NAME_SUBJECT = "ProfileContextManagerSubject";
const PROFILE_CONTEXT_MANAGER_CONTRACT_NAME_PROXY = "ProfileContextManagerProxy";
const PROFILE_CONTEXT_MANAGER_CONTRACT_NAME = "ProfileContextManager";

const PROFILE_REALM_MANAGER_CONTRACT_NAME_SUBJECT = "ProfileRealmManagerSubject";
const PROFILE_REALM_MANAGER_CONTRACT_NAME_PROXY = "ProfileRealmManagerProxy";
const PROFILE_REALM_MANAGER_CONTRACT_NAME = "ProfileRealmManager";

const PROFILE_DOMAIN_MANAGER_CONTRACT_NAME_SUBJECT = "ProfileDomainManagerSubject";
const PROFILE_DOMAIN_MANAGER_CONTRACT_NAME_PROXY = "ProfileDomainManagerProxy";
const PROFILE_DOMAIN_MANAGER_CONTRACT_NAME = "ProfileDomainManager";

const PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME_SUBJECT = "ProfileUniverseManagerSubject";
const PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME_PROXY = "ProfileUniverseManagerProxy";
const PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME = "ProfileUniverseManager";

const PROFILE_POLICY_MANAGER_CONTRACT_NAME_SUBJECT = "ProfilePolicyManagerSubject";
const PROFILE_POLICY_MANAGER_CONTRACT_NAME_PROXY = "ProfilePolicyManagerProxy";
const PROFILE_POLICY_MANAGER_CONTRACT_NAME = "ProfilePolicyManager";

const PROFILE_ACCESS_CONTROL_CONTRACT_NAME_SUBJECT = "ProfileAccessControlSubject";
const PROFILE_ACCESS_CONTROL_CONTRACT_NAME_PROXY = "ProfileAccessControlProxy";
const PROFILE_ACCESS_CONTROL_CONTRACT_NAME = "ProfileAccessControl";

const ACL_MANAGER_CONTRACT_NAME_SUBJECT = "ACLManagerSubject";
const ACL_MANAGER_CONTRACT_NAME_PROXY = "ACLManagerProxy";
const ACL_MANAGER_CONTRACT_NAME = "ACLManager";

const CONTRACTS_VERSION = "3.0.0";

const TESTNET_TX_WAIT_BLOCK_COUNT = 1;
const MAINNET_TX_WAIT_BLOCK_COUNT = 7;

const EMPTY_MEMBER_SIGNATURE: IACLCommons.MemberSignatureStruct = {
  account: ethers.constants.AddressZero,
  expiredAt: 0,
  signature: new Int8Array(0)
}

// Lively Guard Libraries
let lACLCommons: DeployResult;
let lProfileCommons;
let lProfileRolePolicy;

// Lively Guard contracts
let memberManagerSubjectDeployed: DeployResult;
let memberManagerProxyDeployed: DeployResult;
let roleManagerSubjectDeployed: DeployResult;
let roleManagerProxyDeployed: DeployResult;
let typeManagerSubjectDeployed: DeployResult;
let typeManagerProxyDeployed: DeployResult;
let functionManagerSubjectDeployed: DeployResult;
let functionManagerProxyDeployed: DeployResult;
let functionManagerDelegateProxy: FunctionManager;
let contextManagerSubjectDeployed: DeployResult;
let contextManagerProxyDeployed: DeployResult;
let contextManagerDelegateProxy: ContextManager;
let realmManagerSubjectDeployed: DeployResult;
let realmManagerProxyDeployed: DeployResult;
let domainManagerSubjectDeployed: DeployResult;
let domainManagerProxyDeployed: DeployResult;
let universeManagerSubjectDeployed: DeployResult;
let universeManagerProxyDeployed: DeployResult;
let policyManagerSubjectDeployed: DeployResult;
let policyManagerProxyDeployed: DeployResult;
let profileManagerSubjectDeployed: DeployResult;
let profileManagerProxyDeployed: DeployResult;
let accessControlSubjectDeployed: DeployResult;
let accessControlProxyDeployed: DeployResult;

// profile acl contracts
let profileMemberManagerSubjectDeployed: DeployResult;
let profileMemberManagerProxyDeployed: DeployResult;
let profileRoleManagerSubjectDeployed: DeployResult;
let profileRoleManagerProxyDeployed: DeployResult;
let profileTypeManagerSubjectDeployed: DeployResult;
let profileTypeManagerProxyDeployed: DeployResult;
let profileFunctionManagerSubjectDeployed: DeployResult;
let profileFunctionManagerProxyDeployed: DeployResult;
let profileContextManagerSubjectDeployed: DeployResult;
let profileContextManagerProxyDeployed: DeployResult;
let profileRealmManagerSubjectDeployed: DeployResult;
let profileRealmManagerProxyDeployed: DeployResult;
let profileDomainManagerSubjectDeployed: DeployResult;
let profileDomainManagerProxyDeployed: DeployResult;
let profileUniverseManagerSubjectDeployed: DeployResult;
let profileUniverseManagerProxyDeployed: DeployResult;
let profilePolicyManagerSubjectDeployed: DeployResult;
let profilePolicyManagerProxyDeployed: DeployResult;
let profileAccessControlSubjectDeployed: DeployResult;
let profileAccessControlProxyDeployed: DeployResult;

// acl manager contract
let aclManagerSubjectDeployed: DeployResult;
let aclManagerProxyDeployed: DeployResult;
let aclManagerProxy: ACLManager;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getChainId } = hre;
  const { deploy } = deployments;
  const [systemAdmin, livelyAdmin, assetAdmin] = await ethers.getSigners();
  const chainId = await getChainId();
  console.log(`livelyAdmin address: ${livelyAdmin.address}`);
  console.log(`systemAdmin address: ${systemAdmin.address}`);
  console.log(`assetAdmin address: ${assetAdmin.address}`);
  console.log(`network name: ${hre.network.name}`);
  console.log(`network chainId: ${chainId}`);

  lACLCommons = await deploy("LACLCommons", {
    contract: "LACLCommons",
    from: systemAdmin.address,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  lProfileCommons = await deploy("LProfileCommons", {
    contract: "LProfileCommons",
    from: systemAdmin.address,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  lProfileRolePolicy = await deploy("LProfileRolePolicy", {
    contract: "LProfileRolePolicy",
    from: systemAdmin.address,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy aclManager subject
  aclManagerSubjectDeployed = await deploy(ACL_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: ACL_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });


  // @ts-ignore
  await deployACLSubjects(systemAdmin, deploy);

  // @ts-ignore
  await deployProfileSubjects(systemAdmin, deploy);


  // @ts-ignore
  await deployACLProxies(systemAdmin, deploy);

  // @ts-ignore
  await deployProfileProxies(systemAdmin, deploy);

  // Acl Manager Init
  await aclManagerProxy.getFirstInit();
  await aclManagerProxy.connect(systemAdmin).initACL(
    contextManagerProxyDeployed.address,
    functionManagerProxyDeployed.address,
    livelyAdmin.address,
    systemAdmin.address
  );

  // attach proxies to function and context manager
  functionManagerDelegateProxy = FunctionManager__factory.connect(aclManagerProxy.address, systemAdmin);
  contextManagerDelegateProxy = ContextManager__factory.connect(aclManagerProxy.address, systemAdmin);

  // @ts-ignore
  await registerACLFacets(hre, systemAdmin);

  // @ts-ignore
  await registerProfileFacets(hre, systemAdmin);

  // @ts-ignore
  await registerACLContexts(hre, systemAdmin);

  // @ts-ignore
  await registerProfileContexts(hre, systemAdmin);

  // @ts-ignore
  await registerAclFunctions(hre, systemAdmin);

  // @ts-ignore
  await registerProfileFunctions(hre, systemAdmin);
};

async function deployACLSubjects(systemAdmin: SignerWithAddress, deploy: (name: string, options: DeployOptions) => Promise<DeployResult>) {
  // deploy memberManager subject
  memberManagerSubjectDeployed = await deploy(MEMBER_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: MEMBER_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy roleManager subject
  roleManagerSubjectDeployed = await deploy(ROLE_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: ROLE_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy typeManager subject
  typeManagerSubjectDeployed = await deploy(TYPE_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: TYPE_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy functionManager subject
  functionManagerSubjectDeployed = await deploy(FUNCTION_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: FUNCTION_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy contextManager subject
  contextManagerSubjectDeployed = await deploy(CONTEXT_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: CONTEXT_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy realmManager subject
  realmManagerSubjectDeployed = await deploy(REALM_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: REALM_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy domainManager subject
  domainManagerSubjectDeployed = await deploy(DOMAIN_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: DOMAIN_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy universeManager subject
  universeManagerSubjectDeployed = await deploy(UNIVERSE_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: UNIVERSE_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy profileManager subject
  profileManagerSubjectDeployed = await deploy(PROFILE_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: PROFILE_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy policyManager subject
  policyManagerSubjectDeployed = await deploy(POLICY_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: POLICY_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy accessControl subject
  accessControlSubjectDeployed = await deploy(ACCESS_CONTROL_CONTRACT_NAME_SUBJECT, {
    contract: ACCESS_CONTROL_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });
}

async function deployProfileSubjects(systemAdmin: SignerWithAddress, deploy: (name: string, options: DeployOptions) => Promise<DeployResult>) {
  // deploy profileMemberManager subject
  profileMemberManagerSubjectDeployed = await deploy(PROFILE_MEMBER_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: PROFILE_MEMBER_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy profileRoleManager subject
  profileRoleManagerSubjectDeployed = await deploy(PROFILE_ROLE_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: PROFILE_ROLE_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy profileTypeManager subject
  profileTypeManagerSubjectDeployed = await deploy(PROFILE_TYPE_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: PROFILE_TYPE_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy profileFunctionManager subject
  profileFunctionManagerSubjectDeployed = await deploy(PROFILE_FUNCTION_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: PROFILE_FUNCTION_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy profileContextManager subject
  profileContextManagerSubjectDeployed = await deploy(PROFILE_CONTEXT_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: PROFILE_CONTEXT_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy profileRealmManager subject
  profileRealmManagerSubjectDeployed = await deploy(PROFILE_REALM_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: PROFILE_REALM_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy profileDomainManager subject
  profileDomainManagerSubjectDeployed = await deploy(PROFILE_DOMAIN_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: PROFILE_DOMAIN_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy profileUniverseManager subject
  profileUniverseManagerSubjectDeployed = await deploy(PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy policyUniverseManager subject
  profilePolicyManagerSubjectDeployed = await deploy(PROFILE_POLICY_MANAGER_CONTRACT_NAME_SUBJECT, {
    contract: PROFILE_POLICY_MANAGER_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });

  // deploy profileAccessControl subject
  profileAccessControlSubjectDeployed = await deploy(PROFILE_ACCESS_CONTROL_CONTRACT_NAME_SUBJECT, {
    contract: PROFILE_ACCESS_CONTROL_CONTRACT_NAME,
    from: systemAdmin.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
    libraries: {
      LACLCommons: lACLCommons.address,
    },
  });
}

async function deployACLProxies(systemAdmin: SignerWithAddress, deploy: (name: string, options: DeployOptions) => Promise<DeployResult>) {
  // deploy aclManager proxy
  let iface = new ethers.utils.Interface(aclManagerSubjectDeployed.abi);
  let data = iface.encodeFunctionData("initialize", [
    ACL_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
  ]);
  aclManagerProxyDeployed = await deploy(ACL_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLManagerProxy",
    from: systemAdmin.address,
    args: [aclManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });
  aclManagerProxy = ACLManager__factory.connect(aclManagerProxyDeployed.address, systemAdmin);

  // deploy memberManager proxy
  iface = new ethers.utils.Interface(memberManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    MEMBER_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  memberManagerProxyDeployed = await deploy(MEMBER_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [memberManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy roleManager proxy
  iface = new ethers.utils.Interface(roleManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    ROLE_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  roleManagerProxyDeployed = await deploy(ROLE_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [roleManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy typeManager proxy
  iface = new ethers.utils.Interface(typeManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    TYPE_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  typeManagerProxyDeployed = await deploy(TYPE_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [typeManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy functionManager proxy
  iface = new ethers.utils.Interface(functionManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    FUNCTION_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  functionManagerProxyDeployed = await deploy(FUNCTION_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [functionManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy contextManager proxy
  iface = new ethers.utils.Interface(contextManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    CONTEXT_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  contextManagerProxyDeployed = await deploy(CONTEXT_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [contextManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy realmManager proxy
  iface = new ethers.utils.Interface(realmManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    REALM_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  realmManagerProxyDeployed = await deploy(REALM_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [realmManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy domainManager proxy
  iface = new ethers.utils.Interface(domainManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    DOMAIN_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  domainManagerProxyDeployed = await deploy(DOMAIN_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [domainManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy universeManager proxy
  iface = new ethers.utils.Interface(universeManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    UNIVERSE_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  universeManagerProxyDeployed = await deploy(UNIVERSE_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [universeManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy profileManager proxy
  iface = new ethers.utils.Interface(profileManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    PROFILE_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  profileManagerProxyDeployed = await deploy(PROFILE_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [profileManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy policyManager proxy
  iface = new ethers.utils.Interface(policyManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    POLICY_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  policyManagerProxyDeployed = await deploy(POLICY_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [policyManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy accessControl proxy
  iface = new ethers.utils.Interface(accessControlSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    ACCESS_CONTROL_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  accessControlProxyDeployed = await deploy(ACCESS_CONTROL_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [accessControlSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });
}

async function deployProfileProxies(systemAdmin: SignerWithAddress, deploy: (name: string, options: DeployOptions) => Promise<DeployResult>) {
  // deploy profileMemberManager proxy
  let iface = new ethers.utils.Interface(profileMemberManagerSubjectDeployed.abi);
  let data = iface.encodeFunctionData("initialize", [
    PROFILE_MEMBER_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  profileMemberManagerProxyDeployed = await deploy(PROFILE_MEMBER_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [profileMemberManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy profileRoleManager proxy
  iface = new ethers.utils.Interface(profileRoleManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    PROFILE_ROLE_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  profileRoleManagerProxyDeployed = await deploy(PROFILE_ROLE_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [profileRoleManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy profileTypeManager proxy
  iface = new ethers.utils.Interface(profileTypeManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    PROFILE_TYPE_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  profileTypeManagerProxyDeployed = await deploy(PROFILE_TYPE_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [profileTypeManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy profileFunctionManager proxy
  iface = new ethers.utils.Interface(profileFunctionManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    PROFILE_FUNCTION_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  profileFunctionManagerProxyDeployed = await deploy(PROFILE_FUNCTION_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [profileFunctionManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy profileContextManager proxy
  iface = new ethers.utils.Interface(profileContextManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    PROFILE_CONTEXT_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  profileContextManagerProxyDeployed = await deploy(PROFILE_CONTEXT_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [profileContextManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy profileRealmManager proxy
  iface = new ethers.utils.Interface(profileRealmManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    PROFILE_REALM_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  profileRealmManagerProxyDeployed = await deploy(PROFILE_REALM_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [profileRealmManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy profileDomainManager proxy
  iface = new ethers.utils.Interface(profileDomainManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    PROFILE_DOMAIN_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  profileDomainManagerProxyDeployed = await deploy(PROFILE_DOMAIN_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [profileDomainManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy profileUniverseManager proxy
  iface = new ethers.utils.Interface(profileUniverseManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  profileUniverseManagerProxyDeployed = await deploy(PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [profileUniverseManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy profilePolicyManager proxy
  iface = new ethers.utils.Interface(profilePolicyManagerSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    PROFILE_POLICY_MANAGER_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  profilePolicyManagerProxyDeployed = await deploy(PROFILE_POLICY_MANAGER_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [profilePolicyManagerSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // deploy profileAccessControl proxy
  iface = new ethers.utils.Interface(profileAccessControlSubjectDeployed.abi);
  data = iface.encodeFunctionData("initialize", [
    PROFILE_ACCESS_CONTROL_CONTRACT_NAME,
    CONTRACTS_VERSION,
    aclManagerProxyDeployed.address,
  ]);
  profileAccessControlProxyDeployed = await deploy(PROFILE_ACCESS_CONTROL_CONTRACT_NAME_PROXY, {
    contract: "ACLProxy",
    from: systemAdmin.address,
    args: [profileAccessControlSubjectDeployed.address, data],
    log: true,
    skipIfAlreadyDeployed: true,
  });
}

async function registerACLFacets(hre: HardhatRuntimeEnvironment, systemAdmin: SignerWithAddress) {
  // acl facets
  const memberIface = new ethers.utils.Interface(MemberManager__factory.abi);
  const roleIface = new ethers.utils.Interface(RoleManager__factory.abi);
  const typeIface = new ethers.utils.Interface(TypeManager__factory.abi);
  const functionIface = new ethers.utils.Interface(FunctionManager__factory.abi);
  const contextIface = new ethers.utils.Interface(ContextManager__factory.abi);
  const realmIface = new ethers.utils.Interface(RealmManager__factory.abi);
  const domainIface = new ethers.utils.Interface(DomainManager__factory.abi);
  const universeIface = new ethers.utils.Interface(UniverseManager__factory.abi);
  const policyIface = new ethers.utils.Interface(PolicyManager__factory.abi);
  const profileIface = new ethers.utils.Interface(ProfileManager__factory.abi);
  const accessControlIface = new ethers.utils.Interface(AccessControl__factory.abi);
  const facetRequests: IACLManager.FacetRegisterRequestStruct[] = [
    {
      facetId: memberManagerProxyDeployed.address,
      subjectId: memberManagerSubjectDeployed.address,
      selectors: [
        memberIface.getSighash("memberRegister"),
        memberIface.getSighash("memberUpdateActivityStatus"),
        memberIface.getSighash("memberUpdateAlterabilityStatus"),
        memberIface.getSighash("memberUpdateAdmin"),
        memberIface.getSighash("memberUpdateGeneralLimit"),
        memberIface.getSighash("memberCheckId"),
        memberIface.getSighash("memberCheckAccount"),
        memberIface.getSighash("memberCheckAdmin"),
        memberIface.getSighash("memberHasType"),
        memberIface.getSighash("memberGetTypes"),
        memberIface.getSighash("memberGetInfo"),
      ]
    },
    {
      facetId: roleManagerProxyDeployed.address,
      subjectId: roleManagerSubjectDeployed.address,
      selectors: [
        roleIface.getSighash("roleRegister"),
        roleIface.getSighash("roleGrantMembers"),
        roleIface.getSighash("roleRevokeMembers"),
        roleIface.getSighash("roleUpdateAdmin"),
        roleIface.getSighash("roleUpdateScope"),
        roleIface.getSighash("roleUpdateActivityStatus"),
        roleIface.getSighash("roleUpdateAlterabilityStatus"),
        roleIface.getSighash("roleUpdateMemberLimit"),
        roleIface.getSighash("roleCheckId"),
        roleIface.getSighash("roleCheckName"),
        roleIface.getSighash("roleCheckAdmin"),
        roleIface.getSighash("roleHasAccount"),
        roleIface.getSighash("roleGetInfo"),
      ]
    },
    {
      facetId: typeManagerProxyDeployed.address,
      subjectId: typeManagerSubjectDeployed.address,
      selectors: [
        typeIface.getSighash("typeRegister"),
        typeIface.getSighash("typeUpdateAdmin"),
        typeIface.getSighash("typeUpdateScope"),
        typeIface.getSighash("typeUpdateActivityStatus"),
        typeIface.getSighash("typeUpdateAlterabilityStatus"),
        typeIface.getSighash("typeUpdateRoleLimit"),
        typeIface.getSighash("typeCheckId"),
        typeIface.getSighash("typeCheckName"),
        typeIface.getSighash("typeCheckAdmin"),
        typeIface.getSighash("typeHasAccount"),
        typeIface.getSighash("typeHasRole"),
        typeIface.getSighash("typeGetRoles"),
        typeIface.getSighash("typeGetInfo"),
      ]
    },
    {
      facetId: policyManagerProxyDeployed.address,
      subjectId: policyManagerSubjectDeployed.address,
      selectors: [
        policyIface.getSighash("policyRegister"),
        policyIface.getSighash("policyAddRoles"),
        policyIface.getSighash("policyRemoveRoles"),
        policyIface.getSighash("policyUpdateCodes"),
        policyIface.getSighash("policyUpdateAdmin"),
        policyIface.getSighash("policyUpdateScope"),
        policyIface.getSighash("policyUpdateActivityStatus"),
        policyIface.getSighash("policyUpdateAlterabilityStatus"),
        policyIface.getSighash("policyUpdateRoleLimit"),
        policyIface.getSighash("policyCheckId"),
        policyIface.getSighash("policyCheckName"),
        policyIface.getSighash("policyCheckAdmin"),
        policyIface.getSighash("policyCheckRole"),
        policyIface.getSighash("policyCheckAccess"),
        policyIface.getSighash("policyCheckRoleAccess"),
        policyIface.getSighash("policyHasRole"),
        policyIface.getSighash("policyGetInfoByRole"),
        policyIface.getSighash("policyGetInfo"),
        policyIface.getSighash("policyGetRoles"),
      ]
    },
    {
      facetId: profileManagerProxyDeployed.address,
      subjectId: profileManagerSubjectDeployed.address,
      selectors: [
        profileIface.getSighash("profileRegister"),
        profileIface.getSighash("profileUpdateLimits"),
        profileIface.getSighash("profileUpdateOwnerAccount"),
        profileIface.getSighash("profileUpdateActivityStatus"),
        profileIface.getSighash("profileUpdateAlterabilityStatus"),
        profileIface.getSighash("profileUpdateAdmin"),
        profileIface.getSighash("profileCheckId"),
        profileIface.getSighash("profileCheckName"),
        profileIface.getSighash("profileCheckOwner"),
        profileIface.getSighash("profileCheckProfileAdmin"),
        profileIface.getSighash("profileCheckProfileSystemAdmin"),
        profileIface.getSighash("profileCheckAdmin"),
        profileIface.getSighash("profileGetProfileAccount"),
        profileIface.getSighash("profileGetAdmins"),
        profileIface.getSighash("profileGetInfo"),
      ]
    },
    {
      facetId: functionManagerProxyDeployed.address,
      subjectId: functionManagerSubjectDeployed.address,
      selectors: [
        functionIface.getSighash("functionRegister"),
        functionIface.getSighash("functionUpdateAdmin"),
        functionIface.getSighash("functionUpdateAgent"),
        functionIface.getSighash("functionUpdateActivityStatus"),
        functionIface.getSighash("functionUpdateAlterabilityStatus"),
        functionIface.getSighash("functionUpdatePolicyCode"),
        functionIface.getSighash("functionCheckId"),
        functionIface.getSighash("functionCheckSelector"),
        functionIface.getSighash("functionCheckAdmin"),
        functionIface.getSighash("functionCheckAgent"),
        functionIface.getSighash("functionGetInfo"),
      ]
    },
    {
      facetId: contextManagerProxyDeployed.address,
      subjectId: contextManagerSubjectDeployed.address,
      selectors: [
        contextIface.getSighash("contextRegister"),
        contextIface.getSighash("contextUpdateActivityStatus"),
        contextIface.getSighash("contextUpdateAlterabilityStatus"),
        contextIface.getSighash("contextUpdateAdmin"),
        contextIface.getSighash("contextUpdateFunctionLimit"),
        contextIface.getSighash("contextCheckId"),
        contextIface.getSighash("contextCheckAccount"),
        contextIface.getSighash("contextCheckAdmin"),
        contextIface.getSighash("contextHasFunction"),
        contextIface.getSighash("contextHasSelector"),
        contextIface.getSighash("contextGetFunctions"),
        contextIface.getSighash("contextGetInfo"),
      ]
    },
    {
      facetId: realmManagerProxyDeployed.address,
      subjectId: realmManagerSubjectDeployed.address,
      selectors: [
        realmIface.getSighash("realmRegister"),
        realmIface.getSighash("realmUpdateAdmin"),
        realmIface.getSighash("realmMoveContext"),
        realmIface.getSighash("realmUpdateActivityStatus"),
        realmIface.getSighash("realmUpdateAlterabilityStatus"),
        realmIface.getSighash("realmUpdateContextLimit"),
        realmIface.getSighash("realmCheckId"),
        realmIface.getSighash("realmCheckName"),
        realmIface.getSighash("realmCheckAdmin"),
        realmIface.getSighash("realmHasFunction"),
        realmIface.getSighash("realmHasContext"),
        realmIface.getSighash("realmGetContexts"),
        realmIface.getSighash("realmGetInfo"),
      ]
    },
    {
      facetId: domainManagerProxyDeployed.address,
      subjectId: domainManagerSubjectDeployed.address,
      selectors: [
        domainIface.getSighash("domainRegister"),
        domainIface.getSighash("domainUpdateActivityStatus"),
        domainIface.getSighash("domainUpdateAlterabilityStatus"),
        domainIface.getSighash("domainUpdateAdmin"),
        domainIface.getSighash("domainMoveRealm"),
        domainIface.getSighash("domainUpdateRealmLimit"),
        domainIface.getSighash("domainCheckId"),
        domainIface.getSighash("domainCheckName"),
        domainIface.getSighash("domainCheckAdmin"),
        domainIface.getSighash("domainHasFunction"),
        domainIface.getSighash("domainHasContext"),
        domainIface.getSighash("domainHasRealm"),
        domainIface.getSighash("domainGetRealms"),
        domainIface.getSighash("domainGetInfo"),
      ]
    },
    {
      facetId: universeManagerProxyDeployed.address,
      subjectId: universeManagerSubjectDeployed.address,
      selectors: [
        universeIface.getSighash("universeUpdateActivityStatus"),
        universeIface.getSighash("universeUpdateAlterabilityStatus"),
        universeIface.getSighash("universeUpdateAdmin"),
        universeIface.getSighash("universeUpdateDomainLimit"),
        universeIface.getSighash("universeCheckAdmin"),
        universeIface.getSighash("universeGetDomains"),
        universeIface.getSighash("universeGetInfo"),
      ]
    },
    {
      facetId: accessControlProxyDeployed.address,
      subjectId: accessControlSubjectDeployed.address,
      selectors: [
        accessControlIface.getSighash("hasAccess"),
        accessControlIface.getSighash("hasMemberAccess"),
        accessControlIface.getSighash("hasCSAccess"),
        accessControlIface.getSighash("hasAccountAccess"),
        accessControlIface.getSighash("getAnonymousType"),
        accessControlIface.getSighash("getAnyType"),
        accessControlIface.getSighash("getScopeMasterType"),
        accessControlIface.getSighash("getTypeMasterType"),
        accessControlIface.getSighash("getMemberMasterType"),
        accessControlIface.getSighash("getSystemMasterType"),
        accessControlIface.getSighash("getLivelyMasterType"),
        accessControlIface.getSighash("getPolicyMasterType"),
        accessControlIface.getSighash("getProfileMasterType"),
        accessControlIface.getSighash("getUniverseScope"),
        accessControlIface.getSighash("isAgentExist"),
        accessControlIface.getSighash("isScopeExist"),
        accessControlIface.getSighash("getScopeBaseInfo"),
        accessControlIface.getSighash("getAgentBaseInfo"),
        accessControlIface.getSighash("isScopesCompatible"),
      ]
    }
  ]

  let txReceipt;
  console.log(`[ Register ACL Facets ]`);
  const tx = await aclManagerProxy.connect(systemAdmin).aclRegisterFacet(facetRequests);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();
}

async function registerProfileFacets(hre: HardhatRuntimeEnvironment, systemAdmin: SignerWithAddress) {

  // profile facets
  const profileMemberIface = new ethers.utils.Interface(ProfileMemberManager__factory.abi);
  const profileRoleIface = new ethers.utils.Interface(ProfileRoleManager__factory.abi);
  const profileTypeIface = new ethers.utils.Interface(ProfileTypeManager__factory.abi);
  const profileFunctionIface = new ethers.utils.Interface(ProfileFunctionManager__factory.abi);
  const profileContextIface = new ethers.utils.Interface(ProfileContextManager__factory.abi);
  const profileRealmIface = new ethers.utils.Interface(ProfileRealmManager__factory.abi);
  const profileDomainIface = new ethers.utils.Interface(ProfileDomainManager__factory.abi);
  const profileUniverseIface = new ethers.utils.Interface(ProfileUniverseManager__factory.abi);
  const profilePolicyIface = new ethers.utils.Interface(ProfilePolicyManager__factory.abi);
  const profileAccessControlIface = new ethers.utils.Interface(ProfileAccessControl__factory.abi);
  const profileFacetRequests: IACLManager.FacetRegisterRequestStruct[] = [
    {
      facetId: profileMemberManagerProxyDeployed.address,
      subjectId: profileMemberManagerSubjectDeployed.address,
      selectors: [
        profileMemberIface.getSighash("profileMemberRegister"),
        profileMemberIface.getSighash("profileMemberUpdateTypeLimit"),
        profileMemberIface.getSighash("profileMemberUpdateRegisterLimit"),
        profileMemberIface.getSighash("profileMemberUpdateCallLimit"),
        profileMemberIface.getSighash("profileMemberUpdateActivityStatus"),
        profileMemberIface.getSighash("profileMemberUpdateAlterabilityStatus"),
        profileMemberIface.getSighash("profileMemberUpdateAdmin"),
        profileMemberIface.getSighash("profileMemberCheckId"),
        profileMemberIface.getSighash("profileMemberCheckAccount"),
        profileMemberIface.getSighash("profileMemberCheckAdmin"),
        profileMemberIface.getSighash("profileMemberHasType"),
        profileMemberIface.getSighash("profileMemberGetTypes"),
        profileMemberIface.getSighash("profileMemberGetInfo")
      ]
    },
    {
      facetId: profileRoleManagerProxyDeployed.address,
      subjectId: profileRoleManagerSubjectDeployed.address,
      selectors: [
        profileRoleIface.getSighash("profileRoleRegister"),
        profileRoleIface.getSighash("profileRoleGrantMembers"),
        profileRoleIface.getSighash("profileRoleRevokeMembers"),
        profileRoleIface.getSighash("profileRoleUpdateAdmin"),
        profileRoleIface.getSighash("profileRoleUpdateScope"),
        profileRoleIface.getSighash("profileRoleUpdateActivityStatus"),
        profileRoleIface.getSighash("profileRoleUpdateAlterabilityStatus"),
        profileRoleIface.getSighash("profileRoleUpdateMemberLimit"),
        profileRoleIface.getSighash("profileRoleCheckId"),
        profileRoleIface.getSighash("profileRoleCheckName"),
        profileRoleIface.getSighash("profileRoleCheckAdmin"),
        profileRoleIface.getSighash("profileRoleHasAccount"),
        profileRoleIface.getSighash("profileRoleGetInfo")
      ]
    },
    {
      facetId: profileTypeManagerProxyDeployed.address,
      subjectId: profileTypeManagerSubjectDeployed.address,
      selectors: [
        profileTypeIface.getSighash("profileTypeRegister"),
        profileTypeIface.getSighash("profileTypeUpdateAdmin"),
        profileTypeIface.getSighash("profileTypeUpdateScope"),
        profileTypeIface.getSighash("profileTypeUpdateActivityStatus"),
        profileTypeIface.getSighash("profileTypeUpdateAlterabilityStatus"),
        profileTypeIface.getSighash("profileTypeUpdateRoleLimit"),
        profileTypeIface.getSighash("profileTypeCheckId"),
        profileTypeIface.getSighash("profileTypeCheckName"),
        profileTypeIface.getSighash("profileTypeCheckAdmin"),
        profileTypeIface.getSighash("profileTypeHasAccount"),
        profileTypeIface.getSighash("profileTypeHasRole"),
        profileTypeIface.getSighash("profileTypeGetRoles"),
        profileTypeIface.getSighash("profileTypeGetInfo"),
      ]
    },
    {
      facetId: profilePolicyManagerProxyDeployed.address,
      subjectId: profilePolicyManagerSubjectDeployed.address,
      selectors: [
        profilePolicyIface.getSighash("profilePolicyRegister"),
        profilePolicyIface.getSighash("profilePolicyAddRoles"),
        profilePolicyIface.getSighash("profilePolicyRemoveRoles"),
        profilePolicyIface.getSighash("profilePolicyUpdateCodes"),
        profilePolicyIface.getSighash("profilePolicyUpdateAdmin"),
        profilePolicyIface.getSighash("profilePolicyUpdateScope"),
        profilePolicyIface.getSighash("profilePolicyUpdateActivityStatus"),
        profilePolicyIface.getSighash("profilePolicyUpdateAlterabilityStatus"),
        profilePolicyIface.getSighash("profilePolicyUpdateRoleLimit"),
        profilePolicyIface.getSighash("profilePolicyCheckId"),
        profilePolicyIface.getSighash("profilePolicyCheckName"),
        profilePolicyIface.getSighash("profilePolicyCheckAdmin"),
        profilePolicyIface.getSighash("profilePolicyCheckRole"),
        profilePolicyIface.getSighash("profilePolicyCheckAccess"),
        profilePolicyIface.getSighash("profilePolicyCheckRoleAccess"),
        profilePolicyIface.getSighash("profilePolicyHasRole"),
        profilePolicyIface.getSighash("profilePolicyGetInfoByRole"),
        profilePolicyIface.getSighash("profilePolicyGetInfo"),
        profilePolicyIface.getSighash("profilePolicyGetRoles")
      ]
    },
    {
      facetId: profileFunctionManagerProxyDeployed.address,
      subjectId: profileFunctionManagerSubjectDeployed.address,
      selectors: [
        profileFunctionIface.getSighash("profileFunctionRegister"),
        profileFunctionIface.getSighash("profileFunctionUpdateAdmin"),
        profileFunctionIface.getSighash("profileFunctionUpdateAgent"),
        profileFunctionIface.getSighash("profileFunctionUpdateActivityStatus"),
        profileFunctionIface.getSighash("profileFunctionUpdateAlterabilityStatus"),
        profileFunctionIface.getSighash("profileFunctionUpdatePolicyCode"),
        profileFunctionIface.getSighash("profileFunctionCheckId"),
        profileFunctionIface.getSighash("profileFunctionCheckSelector"),
        profileFunctionIface.getSighash("profileFunctionCheckAdmin"),
        profileFunctionIface.getSighash("profileFunctionCheckAgent"),
        profileFunctionIface.getSighash("profileFunctionGetInfo"),
      ]
    },
    {
      facetId: profileContextManagerProxyDeployed.address,
      subjectId: profileContextManagerSubjectDeployed.address,
      selectors: [
        profileContextIface.getSighash("profileContextRegister"),
        profileContextIface.getSighash("profileContextUpdateActivityStatus"),
        profileContextIface.getSighash("profileContextUpdateAlterabilityStatus"),
        profileContextIface.getSighash("profileContextUpdateAdmin"),
        profileContextIface.getSighash("profileContextUpdateFunctionLimit"),
        profileContextIface.getSighash("profileContextCheckId"),
        profileContextIface.getSighash("profileContextCheckAccount"),
        profileContextIface.getSighash("profileContextCheckAdmin"),
        profileContextIface.getSighash("profileContextHasFunction"),
        profileContextIface.getSighash("profileContextHasSelector"),
        profileContextIface.getSighash("profileContextGetFunctions"),
        profileContextIface.getSighash("profileContextGetInfo")
      ]
    },
    {
      facetId: profileRealmManagerProxyDeployed.address,
      subjectId: profileRealmManagerSubjectDeployed.address,
      selectors: [
        profileRealmIface.getSighash("profileRealmRegister"),
        profileRealmIface.getSighash("profileRealmUpdateAdmin"),
        profileRealmIface.getSighash("profileRealmMoveContext"),
        profileRealmIface.getSighash("profileRealmUpdateActivityStatus"),
        profileRealmIface.getSighash("profileRealmUpdateAlterabilityStatus"),
        profileRealmIface.getSighash("profileRealmUpdateContextLimit"),
        profileRealmIface.getSighash("profileRealmCheckId"),
        profileRealmIface.getSighash("profileRealmCheckName"),
        profileRealmIface.getSighash("profileRealmCheckAdmin"),
        profileRealmIface.getSighash("profileRealmHasFunction"),
        profileRealmIface.getSighash("profileRealmHasContext"),
        profileRealmIface.getSighash("profileRealmGetContexts"),
        profileRealmIface.getSighash("profileRealmGetInfo")
      ]
    },
    {
      facetId: profileDomainManagerProxyDeployed.address,
      subjectId: profileDomainManagerSubjectDeployed.address,
      selectors: [
        profileDomainIface.getSighash("profileDomainRegister"),
        profileDomainIface.getSighash("profileDomainUpdateActivityStatus"),
        profileDomainIface.getSighash("profileDomainUpdateAlterabilityStatus"),
        profileDomainIface.getSighash("profileDomainUpdateAdmin"),
        profileDomainIface.getSighash("profileDomainMoveRealm"),
        profileDomainIface.getSighash("profileDomainUpdateRealmLimit"),
        profileDomainIface.getSighash("profileDomainCheckId"),
        profileDomainIface.getSighash("profileDomainCheckName"),
        profileDomainIface.getSighash("profileDomainCheckAdmin"),
        profileDomainIface.getSighash("profileDomainHasFunction"),
        profileDomainIface.getSighash("profileDomainHasContext"),
        profileDomainIface.getSighash("profileDomainHasRealm"),
        profileDomainIface.getSighash("profileDomainGetRealms"),
        profileDomainIface.getSighash("profileDomainGetInfo")
      ]
    },
    {
      facetId: profileUniverseManagerProxyDeployed.address,
      subjectId: profileUniverseManagerSubjectDeployed.address,
      selectors: [
        profileUniverseIface.getSighash("profileUniverseUpdateActivityStatus"),
        profileUniverseIface.getSighash("profileUniverseUpdateAlterabilityStatus"),
        profileUniverseIface.getSighash("profileUniverseUpdateAdmin"),
        profileUniverseIface.getSighash("profileUniverseUpdateDomainLimit"),
        profileUniverseIface.getSighash("profileUniverseCheckAdmin"),
        profileUniverseIface.getSighash("profileUniverseGetDomains"),
        profileUniverseIface.getSighash("profileUniverseGetInfo")
      ]
    },
    {
      facetId: profileAccessControlProxyDeployed.address,
      subjectId: profileAccessControlSubjectDeployed.address,
      selectors: [
        profileAccessControlIface.getSighash("profileHasAccess"),
        profileAccessControlIface.getSighash("profileHasMemberAccess"),
        profileAccessControlIface.getSighash("profileAclHasMemberAccess"),
        profileAccessControlIface.getSighash("profileHasCSAccess"),
        profileAccessControlIface.getSighash("profileHasAccountAccess"),
        profileAccessControlIface.getSighash("profileAnonymousType"),
        profileAccessControlIface.getSighash("profileAnyType"),
        profileAccessControlIface.getSighash("profileSystemMasterType"),
        profileAccessControlIface.getSighash("profileMasterType"),
        profileAccessControlIface.getSighash("profileUniverseScope"),
        profileAccessControlIface.getSighash("profileIsAgentExist"),
        profileAccessControlIface.getSighash("profileIsScopeExist"),
        profileAccessControlIface.getSighash("profileScopeBaseInfo"),
        profileAccessControlIface.getSighash("profileAgentBaseInfo"),
        profileAccessControlIface.getSighash("profileIsScopesCompatible")
      ]
    }
  ]

  let txReceipt;
  console.log(`[ Register Profile Facets ]`);
  const tx =  await aclManagerProxy.connect(systemAdmin).aclRegisterFacet(profileFacetRequests);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();
}

async function registerACLContexts(hre: HardhatRuntimeEnvironment, systemAdmin: SignerWithAddress) {
  // acl contexts
  const contextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: MEMBER_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: memberManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: ROLE_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: roleManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: TYPE_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: typeManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: REALM_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: realmManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: DOMAIN_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: domainManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: UNIVERSE_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: universeManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: POLICY_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: policyManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: PROFILE_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: profileManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: ACCESS_CONTROL_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: accessControlProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: ACL_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: aclManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
  ];

  let txReceipt;
  console.log(`[ Register ACL Contexts ]`);
  const tx =  await contextManagerDelegateProxy.connect(systemAdmin).contextRegister(EMPTY_MEMBER_SIGNATURE, contextRequests)
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();
}

async function registerProfileContexts(hre: HardhatRuntimeEnvironment, systemAdmin: SignerWithAddress) {
  // acl profile contexts
  const profileContextRequests: IContextManagement.ContextRegisterRequestStruct[] = [
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: PROFILE_MEMBER_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: profileMemberManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: PROFILE_ROLE_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: profileRoleManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: -1,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: PROFILE_TYPE_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: profileTypeManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: PROFILE_FUNCTION_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: profileFunctionManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: PROFILE_CONTEXT_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: profileContextManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: PROFILE_REALM_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: profileRealmManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: PROFILE_DOMAIN_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: profileDomainManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: profileUniverseManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: PROFILE_POLICY_MANAGER_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: profilePolicyManagerProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
    {
      realmId: LIVELY_VERSE_ACL_REALM_ID,
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      salt: ethers.constants.HashZero,
      name: PROFILE_ACCESS_CONTROL_CONTRACT_NAME,
      version: CONTRACTS_VERSION,
      contractId: profileAccessControlProxyDeployed.address,
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      functionLimit: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPGRADABLE,
      signature: new Int8Array(0)
    },
  ];

  let txReceipt;
  console.log(`[ Register Profile Contexts ]`);
  const tx =  await contextManagerDelegateProxy.connect(systemAdmin).contextRegister(EMPTY_MEMBER_SIGNATURE, profileContextRequests)
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();
}

async function registerAclFunctions(hre: HardhatRuntimeEnvironment, systemAdmin: SignerWithAddress) {
  // Member functions
  const memberIface = new ethers.utils.Interface(MemberManager__factory.abi);
  const memberFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: memberIface.getSighash("memberRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: memberIface.getSighash("memberUpdateActivityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: memberIface.getSighash("memberUpdateAlterabilityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: memberIface.getSighash("memberUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: memberIface.getSighash("memberUpdateGeneralLimit"),
      policyCode: 46,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: memberIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: memberIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: memberIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: memberIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: memberIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: memberIface.getSighash("withdrawBalance"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const memberFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: memberManagerProxyDeployed.address,
      functions: memberFunctionRequests
    }
  ]

  let txReceipt;
  console.log(`[ Register Member Functions ]`);
  let tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, memberFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Role functions
  const roleIface = new ethers.utils.Interface(RoleManager__factory.abi);
  const roleFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: roleIface.getSighash("roleRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: roleIface.getSighash("roleGrantMembers"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: roleIface.getSighash("roleRevokeMembers"),
      policyCode: 120,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: roleIface.getSighash("roleUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: roleIface.getSighash("roleUpdateScope"),
      policyCode: 46,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: roleIface.getSighash("roleUpdateActivityStatus"),
      policyCode: 100,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: roleIface.getSighash("roleUpdateAlterabilityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: roleIface.getSighash("roleUpdateMemberLimit"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: roleIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: roleIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: roleIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: roleIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: roleIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: roleIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const roleFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: roleManagerProxyDeployed.address,
      functions: roleFunctionRequests
    }
  ]
  console.log(`[ Register Role Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, roleFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Type functions
  const typeIface = new ethers.utils.Interface(TypeManager__factory.abi);
  const typeFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_TYPE_MASTER_TYPE_ID,
      selector: typeIface.getSighash("typeRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: typeIface.getSighash("typeUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: typeIface.getSighash("typeUpdateScope"),
      policyCode: 56,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: typeIface.getSighash("typeUpdateActivityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: typeIface.getSighash("typeUpdateAlterabilityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: typeIface.getSighash("typeUpdateRoleLimit"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: typeIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: typeIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: typeIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: typeIface.getSighash("setLocalAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: typeIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: typeIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const typeFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: typeManagerProxyDeployed.address,
      functions: typeFunctionRequests
    }
  ]
  console.log(`[ Register Type Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, typeFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Function functions
  const functionIface = new ethers.utils.Interface(FunctionManager__factory.abi);
  const functionFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: functionIface.getSighash("functionUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: functionIface.getSighash("functionUpdateAgent"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: functionIface.getSighash("functionUpdateActivityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: functionIface.getSighash("functionUpdateAlterabilityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: functionIface.getSighash("functionUpdatePolicyCode"),
      policyCode: 56,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: functionIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: functionIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: functionIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: functionIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: functionIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: functionIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const functionFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: functionManagerProxyDeployed.address,
      functions: functionFunctionRequests
    }
  ]
  console.log(`[ Register Function Functions ]`);
  tx =   await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, functionFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Context functions
  const contextIface = new ethers.utils.Interface(ContextManager__factory.abi);
  const contextFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: contextIface.getSighash("contextUpdateActivityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: contextIface.getSighash("contextUpdateAlterabilityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: contextIface.getSighash("contextUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: contextIface.getSighash("contextUpdateFunctionLimit"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: contextIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: contextIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: contextIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: contextIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: contextIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: contextIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const contextFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: contextManagerProxyDeployed.address,
      functions: contextFunctionRequests
    }
  ]
  console.log(`[ Register Context Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, contextFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Realm functions
  const realmIface = new ethers.utils.Interface(RealmManager__factory.abi);
  const realmFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
      selector: realmIface.getSighash("realmRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: realmIface.getSighash("realmUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: realmIface.getSighash("realmUpdateActivityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: realmIface.getSighash("realmUpdateAlterabilityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: realmIface.getSighash("realmUpdateContextLimit"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: realmIface.getSighash("realmMoveContext"),
      policyCode: 36,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: realmIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: realmIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: realmIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: realmIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: realmIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: realmIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const realmFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: realmManagerProxyDeployed.address,
      functions: realmFunctionRequests
    }
  ]
  console.log(`[ Register Realm Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, realmFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Domain functions
  const domainIface = new ethers.utils.Interface(DomainManager__factory.abi);
  const domainFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_SCOPE_MASTER_TYPE_ID,
      selector: domainIface.getSighash("domainRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: domainIface.getSighash("domainUpdateActivityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: domainIface.getSighash("domainUpdateAlterabilityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: domainIface.getSighash("domainUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: domainIface.getSighash("domainUpdateRealmLimit"),
      policyCode: 46,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: domainIface.getSighash("domainMoveRealm"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: domainIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: domainIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: domainIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: domainIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: domainIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: domainIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const domainFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: domainManagerProxyDeployed.address,
      functions: domainFunctionRequests
    }
  ]
  console.log(`[ Register Domain Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, domainFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Universe functions
  const universeIface = new ethers.utils.Interface(UniverseManager__factory.abi);
  const universeFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
      selector: universeIface.getSighash("universeUpdateActivityStatus"),
      policyCode: 48,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
      selector: universeIface.getSighash("universeUpdateAlterabilityStatus"),
      policyCode: 30,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
      selector: universeIface.getSighash("universeUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
      selector: universeIface.getSighash("universeUpdateDomainLimit"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: universeIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
      selector: universeIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
      selector: universeIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: universeIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: universeIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
      selector: universeIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const universeFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: universeManagerProxyDeployed.address,
      functions: universeFunctionRequests
    }
  ]
  console.log(`[ Register Universe Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, universeFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Profile Manager functions
  const profileIface = new ethers.utils.Interface(ProfileManager__factory.abi);
  const profileManagerFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      selector: profileIface.getSighash("profileRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: profileIface.getSighash("profileUpdateLimits"),
      policyCode: 100,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: profileIface.getSighash("profileUpdateOwnerAccount"),
      policyCode: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: profileIface.getSighash("profileUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: profileIface.getSighash("profileUpdateActivityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: profileIface.getSighash("profileUpdateAlterabilityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const profileManagerFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: profileManagerProxyDeployed.address,
      functions: profileManagerFunctionRequests
    }
  ]
  console.log(`[ Register Profile Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, profileManagerFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Policy functions
  const policyIface = new ethers.utils.Interface(PolicyManager__factory.abi);
  const policyFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_POLICY_MASTER_TYPE_ID,
      selector: policyIface.getSighash("policyRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: policyIface.getSighash("policyAddRoles"),
      policyCode: 100,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: policyIface.getSighash("policyRemoveRoles"),
      policyCode: 150,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: policyIface.getSighash("policyUpdateCodes"),
      policyCode: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: policyIface.getSighash("policyUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: policyIface.getSighash("policyUpdateScope"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: policyIface.getSighash("policyUpdateActivityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: policyIface.getSighash("policyUpdateAlterabilityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_TYPE_ID,
      agentId: LIVELY_VERSE_ANY_TYPE_ID,
      selector: policyIface.getSighash("policyUpdateRoleLimit"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: policyIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: policyIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: policyIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: policyIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: policyIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: policyIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const policyFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: policyManagerProxyDeployed.address,
      functions: policyFunctionRequests
    }
  ]
  console.log(`[ Register Policy Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, policyFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Access Control functions
  const accessControlIface = new ethers.utils.Interface(AccessControl__factory.abi);
  const accessControlFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: accessControlIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: accessControlIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: accessControlIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: accessControlIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: accessControlIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: accessControlIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const accessControlFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: accessControlProxyDeployed.address,
      functions: accessControlFunctionRequests
    }
  ]
  console.log(`[ Register AccessControl Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, accessControlFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Acl Manager functions
  const aclManagerIface = new ethers.utils.Interface(ACLManager__factory.abi);
  const aclManagerFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: aclManagerIface.getSighash("aclRegisterFacet"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: aclManagerIface.getSighash("aclUpgradeFacet"),
      policyCode: 255,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: aclManagerIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      selector: aclManagerIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      selector: aclManagerIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: aclManagerIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      selector: aclManagerIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: aclManagerIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const aclManagerFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: aclManagerProxy.address,
      functions: aclManagerFunctionRequests
    }
  ]
  console.log(`[ Register AclManager Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, aclManagerFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();
}

async function registerProfileFunctions(hre: HardhatRuntimeEnvironment, systemAdmin: SignerWithAddress) {

  // Profile Member functions
  const profileMemberIface = new ethers.utils.Interface(ProfileMemberManager__factory.abi);
  const profileMemberFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileMemberIface.getSighash("profileMemberRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileMemberIface.getSighash("profileMemberUpdateTypeLimit"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileMemberIface.getSighash("profileMemberUpdateRegisterLimit"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileMemberIface.getSighash("profileMemberUpdateCallLimit"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileMemberIface.getSighash("profileMemberUpdateActivityStatus"),
      policyCode: 46,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileMemberIface.getSighash("profileMemberUpdateAlterabilityStatus"),
      policyCode: 46,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileMemberIface.getSighash("profileMemberUpdateAdmin"),
      policyCode: 46,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileMemberIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileMemberIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileMemberIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileMemberIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileMemberIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileMemberIface.getSighash("withdrawBalance"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const profileMemberFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: profileMemberManagerProxyDeployed.address,
      functions: profileMemberFunctionRequests
    }
  ]
  let txReceipt;
  console.log(`[ Register Profile Member Functions ]`);
  let tx =   await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, profileMemberFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Profile Role functions
  const profileRoleIface = new ethers.utils.Interface(ProfileRoleManager__factory.abi);
  const profileRoleFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRoleIface.getSighash("profileRoleRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRoleIface.getSighash("profileRoleGrantMembers"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRoleIface.getSighash("profileRoleRevokeMembers"),
      policyCode: 120,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRoleIface.getSighash("profileRoleUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRoleIface.getSighash("profileRoleUpdateScope"),
      policyCode: 46,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRoleIface.getSighash("profileRoleUpdateActivityStatus"),
      policyCode: 100,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRoleIface.getSighash("profileRoleUpdateAlterabilityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRoleIface.getSighash("profileRoleUpdateMemberLimit"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileRoleIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileRoleIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileRoleIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileRoleIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileRoleIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileRoleIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const profileRoleFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: profileRoleManagerProxyDeployed.address,
      functions: profileRoleFunctionRequests
    }
  ]
  console.log(`[ Register Profile Role Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, profileRoleFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Profile Type functions
  const profileTypeIface = new ethers.utils.Interface(ProfileTypeManager__factory.abi);
  const profileTypeFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileTypeIface.getSighash("profileTypeRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileTypeIface.getSighash("profileTypeUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileTypeIface.getSighash("profileTypeUpdateScope"),
      policyCode: 56,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileTypeIface.getSighash("profileTypeUpdateActivityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileTypeIface.getSighash("profileTypeUpdateAlterabilityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileTypeIface.getSighash("profileTypeUpdateRoleLimit"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileTypeIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileTypeIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileTypeIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileTypeIface.getSighash("setLocalAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileTypeIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileTypeIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const profileTypeFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: profileTypeManagerProxyDeployed.address,
      functions: profileTypeFunctionRequests
    }
  ]
  console.log(`[ Register Profile Type Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, profileTypeFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Profile Function funtions
  const profileFunctionIface = new ethers.utils.Interface(ProfileFunctionManager__factory.abi);
  const profileFunctionFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID,
      selector: profileFunctionIface.getSighash("profileFunctionRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileFunctionIface.getSighash("profileFunctionUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileFunctionIface.getSighash("profileFunctionUpdateAgent"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileFunctionIface.getSighash("profileFunctionUpdateActivityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileFunctionIface.getSighash("profileFunctionUpdateAlterabilityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileFunctionIface.getSighash("profileFunctionUpdatePolicyCode"),
      policyCode: 56,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileFunctionIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileFunctionIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileFunctionIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileFunctionIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileFunctionIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileFunctionIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const profileFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: profileFunctionManagerProxyDeployed.address,
      functions: profileFunctionFunctionRequests
    }
  ]
  console.log(`[ Register Profile Function Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, profileFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Profile Context functions
  const profileContextIface = new ethers.utils.Interface(ProfileContextManager__factory.abi);
  const profileContextFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID,
      selector: profileContextIface.getSighash("profileContextRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileContextIface.getSighash("profileContextUpdateActivityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileContextIface.getSighash("profileContextUpdateAlterabilityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileContextIface.getSighash("profileContextUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileContextIface.getSighash("profileContextUpdateFunctionLimit"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileContextIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileContextIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileContextIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileContextIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileContextIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileContextIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const profileContextFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: profileContextManagerProxyDeployed.address,
      functions: profileContextFunctionRequests
    }
  ]
  console.log(`[ Register Profile Context Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, profileContextFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Profile Realm functions
  const profileRealmIface = new ethers.utils.Interface(ProfileRealmManager__factory.abi);
  const profileRealmFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRealmIface.getSighash("profileRealmRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRealmIface.getSighash("profileRealmUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRealmIface.getSighash("profileRealmUpdateActivityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRealmIface.getSighash("profileRealmUpdateAlterabilityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRealmIface.getSighash("profileRealmUpdateContextLimit"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileRealmIface.getSighash("profileRealmMoveContext"),
      policyCode: 36,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileRealmIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileRealmIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileRealmIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileRealmIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileRealmIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileRealmIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const profileRealmFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: profileRealmManagerProxyDeployed.address,
      functions: profileRealmFunctionRequests
    }
  ]
  console.log(`[ Register Profile Realm Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, profileRealmFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Profile Domain functions
  const profileDomainIface = new ethers.utils.Interface(ProfileDomainManager__factory.abi);
  const profileDomainFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileDomainIface.getSighash("profileDomainRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileDomainIface.getSighash("profileDomainUpdateActivityStatus"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileDomainIface.getSighash("profileDomainUpdateAlterabilityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileDomainIface.getSighash("profileDomainUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileDomainIface.getSighash("profileDomainUpdateRealmLimit"),
      policyCode: 46,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profileDomainIface.getSighash("profileDomainMoveRealm"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileDomainIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileDomainIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileDomainIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileDomainIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileDomainIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileDomainIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const profileDomainFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: profileDomainManagerProxyDeployed.address,
      functions: profileDomainFunctionRequests
    }
  ]
  console.log(`[ Register Profile Domain Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, profileDomainFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Profile Universe functions
  const profileUniverseIface = new ethers.utils.Interface(ProfileUniverseManager__factory.abi);
  const profileUniverseFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
      selector: profileUniverseIface.getSighash("profileUniverseUpdateActivityStatus"),
      policyCode: 48,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
      selector: profileUniverseIface.getSighash("profileUniverseUpdateAlterabilityStatus"),
      policyCode: 30,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
      selector: profileUniverseIface.getSighash("profileUniverseUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
      selector: profileUniverseIface.getSighash("profileUniverseUpdateDomainLimit"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileUniverseIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
      selector: profileUniverseIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
      selector: profileUniverseIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileUniverseIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileUniverseIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_LIVELY_MASTER_TYPE_ID,
      selector: profileUniverseIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const profileUniverseFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: profileUniverseManagerProxyDeployed.address,
      functions: profileUniverseFunctionRequests
    }
  ]
  console.log(`[ Register Profile Universe Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, profileUniverseFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Profile Access Control functions
  const profileAccessControlIface = new ethers.utils.Interface(ProfileAccessControl__factory.abi);
  const profileAccessControlFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileAccessControlIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileAccessControlIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileAccessControlIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileAccessControlIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profileAccessControlIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profileAccessControlIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const profileAccessControlFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: profileAccessControlProxyDeployed.address,
      functions: profileAccessControlFunctionRequests
    }
  ]
  console.log(`[ Register Profile AccessControl Functions ]`);
  tx =   await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, profileAccessControlFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();

  // Profile Policy functions
  const profilePolicyIface = new ethers.utils.Interface(ProfilePolicyManager__factory.abi);
  const profilePolicyFunctionRequests: IFunctionManagement.FunctionRequestStruct[] = [
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID,
      selector: profilePolicyIface.getSighash("profilePolicyRegister"),
      policyCode: 250,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profilePolicyIface.getSighash("profilePolicyAddRoles"),
      policyCode: 100,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profilePolicyIface.getSighash("profilePolicyRemoveRoles"),
      policyCode: 150,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profilePolicyIface.getSighash("profilePolicyUpdateCodes"),
      policyCode: 32,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profilePolicyIface.getSighash("profilePolicyUpdateAdmin"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profilePolicyIface.getSighash("profilePolicyUpdateScope"),
      policyCode: 130,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profilePolicyIface.getSighash("profilePolicyUpdateActivityStatus"),
      policyCode: 96,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profilePolicyIface.getSighash("profilePolicyUpdateAlterabilityStatus"),
      policyCode: 24,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_PROFILE_MASTER_TYPE_ID,
      agentId: LIVELY_PROFILE_ANY_TYPE_ID,
      selector: profilePolicyIface.getSighash("profilePolicyUpdateRoleLimit"),
      policyCode: 36,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profilePolicyIface.getSighash("upgradeTo"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profilePolicyIface.getSighash("setSafeModeStatus"),
      policyCode: 16,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profilePolicyIface.getSighash("setUpdatabilityStatus"),
      policyCode: 90,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profilePolicyIface.getSighash("setLocalAdmin"),
      policyCode: 60,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID,
      selector: profilePolicyIface.getSighash("setAccessControlManager"),
      policyCode: 0,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
    {
      adminId: LIVELY_VERSE_ACL_ADMIN_ROLE_ID,
      agentId: LIVELY_VERSE_ACL_TYPE_ID,
      selector: profilePolicyIface.getSighash("withdrawBalance"),
      policyCode: 230,
      acstat: ActivityStatus.ENABLED,
      alstat: AlterabilityStatus.UPDATABLE
    },
  ]
  const profilePolicyFunctionRegisterRequest: IFunctionManagement.FunctionRegisterRequestStruct[] = [
    {
      signature: new Int8Array(0),
      realmId: ethers.constants.HashZero,
      salt: ethers.constants.HashZero,
      name: "",
      version: "",
      subject: ethers.constants.AddressZero,
      deployer: ethers.constants.AddressZero,
      contractId: profilePolicyManagerProxyDeployed.address,
      functions: profilePolicyFunctionRequests
    }
  ]
  console.log(`[ Register Profile Profile Functions ]`);
  tx = await functionManagerDelegateProxy.connect(systemAdmin).functionRegister(EMPTY_MEMBER_SIGNATURE, profilePolicyFunctionRegisterRequest);
  console.log(`txHash: ${tx.hash} . . .`);
  if (hre.network.name === "polygon" || hre.network.name === "bsc") {
    txReceipt = await tx.wait(MAINNET_TX_WAIT_BLOCK_COUNT);
  } else {
    txReceipt = await tx.wait(TESTNET_TX_WAIT_BLOCK_COUNT);
  }
  console.log(`txHash: ${txReceipt.transactionHash}, txBlock: ${txReceipt.blockNumber}, status: ${txReceipt.status}`);
  console.log();
}


func.tags = [
  "LACLCommons",
  "LProfileCommons",
  "LProfileRolePolicy",
  MEMBER_MANAGER_CONTRACT_NAME_SUBJECT,
  MEMBER_MANAGER_CONTRACT_NAME_PROXY,
  ROLE_MANAGER_CONTRACT_NAME_SUBJECT,
  ROLE_MANAGER_CONTRACT_NAME_PROXY,
  TYPE_MANAGER_CONTRACT_NAME_SUBJECT,
  TYPE_MANAGER_CONTRACT_NAME_PROXY,
  FUNCTION_MANAGER_CONTRACT_NAME_SUBJECT,
  FUNCTION_MANAGER_CONTRACT_NAME_PROXY,
  CONTEXT_MANAGER_CONTRACT_NAME_SUBJECT,
  CONTEXT_MANAGER_CONTRACT_NAME_PROXY,
  REALM_MANAGER_CONTRACT_NAME_SUBJECT,
  REALM_MANAGER_CONTRACT_NAME_PROXY,
  DOMAIN_MANAGER_CONTRACT_NAME_SUBJECT,
  DOMAIN_MANAGER_CONTRACT_NAME_PROXY,
  UNIVERSE_MANAGER_CONTRACT_NAME_SUBJECT,
  UNIVERSE_MANAGER_CONTRACT_NAME_PROXY,
  POLICY_MANAGER_CONTRACT_NAME_SUBJECT,
  POLICY_MANAGER_CONTRACT_NAME_PROXY,
  PROFILE_MANAGER_CONTRACT_NAME_SUBJECT,
  PROFILE_MANAGER_CONTRACT_NAME_PROXY,
  ACCESS_CONTROL_CONTRACT_NAME_SUBJECT,
  ACCESS_CONTROL_CONTRACT_NAME_PROXY,
  PROFILE_MEMBER_MANAGER_CONTRACT_NAME_SUBJECT,
  PROFILE_MEMBER_MANAGER_CONTRACT_NAME_PROXY,
  PROFILE_ROLE_MANAGER_CONTRACT_NAME_SUBJECT,
  PROFILE_ROLE_MANAGER_CONTRACT_NAME_PROXY,
  PROFILE_TYPE_MANAGER_CONTRACT_NAME_SUBJECT,
  PROFILE_TYPE_MANAGER_CONTRACT_NAME_PROXY,
  PROFILE_FUNCTION_MANAGER_CONTRACT_NAME_SUBJECT,
  PROFILE_FUNCTION_MANAGER_CONTRACT_NAME_PROXY,
  PROFILE_CONTEXT_MANAGER_CONTRACT_NAME_SUBJECT,
  PROFILE_CONTEXT_MANAGER_CONTRACT_NAME_PROXY,
  PROFILE_REALM_MANAGER_CONTRACT_NAME_SUBJECT,
  PROFILE_REALM_MANAGER_CONTRACT_NAME_PROXY,
  PROFILE_DOMAIN_MANAGER_CONTRACT_NAME_SUBJECT,
  PROFILE_DOMAIN_MANAGER_CONTRACT_NAME_PROXY,
  PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME_SUBJECT,
  PROFILE_UNIVERSE_MANAGER_CONTRACT_NAME_PROXY,
  PROFILE_POLICY_MANAGER_CONTRACT_NAME_SUBJECT,
  PROFILE_POLICY_MANAGER_CONTRACT_NAME_PROXY,
  PROFILE_ACCESS_CONTROL_CONTRACT_NAME_SUBJECT,
  PROFILE_ACCESS_CONTROL_CONTRACT_NAME_PROXY,
  ACL_MANAGER_CONTRACT_NAME_SUBJECT,
  ACL_MANAGER_CONTRACT_NAME_PROXY,
];
export default func;
