# LiGuard  

Lively Guard is a centralized on-chain authorization framework. It offers a comprehensive centralized access control list (ACL) solution on the blockchain.
In any system, the access control manager is regarded as one of the most critical components. Given the scope of the Lively ecosystem, we have chosen to develop an access control manager from the ground up to align with Lively's specific requirements.
The fundamental concept behind this design is centered around a decentralized, on-chain structure that is tailored to the blockchain platform for the access control manager. The LiGuard Entity-Relationship Diagram (ERD) is depicted below, necessitating definitions for the concepts considered in the design.
<figure><img src="LiGuard-arch.svg" alt=""><figcaption></figcaption></figure>

We have 4 sections in lively Guard as a blow:

- **Scope** is the operational zone that corresponds to system functionality entities.It includes Universe, Domain, Realm, Context, and Function entities.
- **Agent** is the subject who can make actions in Scope. It contains Type (Department), Role, and Member entities.
- **Policy** is an operational access level that applies over Role entities and it is related to one of the scope entities.
- **Profile** is an ACL entity that provides profiles for business owners or customers that would like to have authorization service from the Lively Guard. It has Scopes, Agents, and Policies sections.

## Scope

### Universe
Universe is a scope type entity. The Lively Guard defines only one universe entity by default. It base scope of all other fundamental Types and Roles. It also includes all Domain (DApp) entities that will be defined in the ACL.
Universe can include the maximum number of 2^16 Domain (Dapp) entities. It also has some attributes such as unique name, ID, admin ID, activity status, and alterability status.

### Domain (DApp)

Domain is a scope type entity that logically corresponds to Dapp which includes smart contracts and services. When the ACL of Dapp is assigned to Lively Guard, a Domain entity must be created that is equivalent to Dapp.
Each Domain entity can include a maximum number of 2^16 Realm (Service) entities. It also has some attributes such as a unique name, ID, admin ID, activity status, and alterability status.

### Realm (Service)

Realm is a scope type entity that logically corresponds to the service of Dapp which includes smart contracts. When ACL of Service is assigned to Lively Guard, a Realm entity must be created that is equivalent to Dapp’s Service.
Each Realm could have a maximum number of 2^32 Context entities. It also has some attributes such as unique name, ID, admin ID, activity status, and alterability status.

### Context (Smart Contract)

Context is a scope type entity that logically corresponds to Smart Contracts of Dapp which includes functions. When ACL of Smart Contract would be assigned to Lively Guard, a Context entity must be created that is equivalent to Smart Contract of Dapp
Each context entity has a unique address which is equivalent to deployed smart contract address and could have 256 Function entities. It also has some attributes such as name, ID, admin ID, activity status, and alterability status.

### Function

Function is a scope type entity that logically corresponds to the function of a Smart Contract. When the ACL of the Smart Contract function is assigned to Lively Guard, a Function entity must be created that is equivalent to the function of the Smart Contract.
Each Function entity has an Agent ID which allows a specific Type or Role can call it. It has a unique selector ID which equals the function selector in the smart contract and also has some attributes such as name, ID, admin ID, activity status, alterability status, and policy code which is related to ACL policy management.


## Agent

### Type (Department)

Type is an agent type entity that logically corresponds to the department in an organization or corporation. When the ACL of the organization department is assigned to Lively Guard, a Type entity must be created that is equivalent to it.
Each Type entity can have a maximum 2^16  number of Role entities.
It also has some attributes such as ID, a unique name, admin ID, activity status, alterability status, and Scope ID which defines its operation zone.

### Role

Role is an agent type entity that logically corresponds to the organization department role which contains members. When a department role is assigned to Lively Guard, a Role entity must be created that is equivalent to it.
Each Role entity can have a maximum 2^24  number of Member entities.
It also has some attributes such as ID, a unique name, admin ID, activity status, alterability status, and Scope ID which defines its operation zone

### Member

Member is an agent type entity that logically corresponds to the department role member or smart contract. When a member of a role is assigned to Lively Guard, a Member entity must be created that is equivalent to it. Member entity has a unique role in each department (type) and also, and they can have different roles in different departments.
Each Member entity can join to a maximum 2^16 Type entity and also it has a unique address that is equivalent to EOA or smart contract address. It also has some attributes such as ID, name, admin ID, limits, activity status, and alterability status.


## Policy

Policy is an ACL entity that limits the Role entity access level on the specific Scope. the Lively Guard will check the Role entity access level on the function call used by the policy code that is defined in the Policy entity and Function entity if the Role entity has included in the Policy entity and also Function entity must be a subset of the scope reference of it.
Each Policy entity can have a maximum 2^16 number of Role entities.
It also has some attributes such as a scope Id which shows the scope referred by it, unique name, ID, admin ID, activity status, alterability status,  and policy code, Policy code is a number between 0 to 255 and these codes will be described as below:
- 0: (Unlock) Role can do any actions in referred scopes
- 1-63:(Soft Lock)  Role can do soft limitations actions in referred scopes
- 64-127: (Medium lock) Limitations and accesses are at the medium level in referred scopes
- 128-191: (Restrict Lock) Limitations and accesses are at the restricted level in referred scopes
- 192-254:(Hard Lock) Limitations and accesses to do any actions are very low in referred scopes
- 255:(Lock) Limitations are at maximum level and the role can’t do any action in referred scopes


## Profile

Profile is an ACL entity to provide ACL(authorization) service to business owners or customers. When a customer requests ACL service from the Lively Guard, after the registration process, the Profile entity is created for the customer to keep ACL info.
Each Profile entity contains three sections Scope, Agent, and Policy whose definitions same as those already have been defined except for the Member entity which will be defined in this section. It has also a unique name, ID, admin ID, owner address, registration limits, profile limits,
activity status and alterability status. The Profile Entity-Relationship Diagram (ERD) is depicted below:

<figure><img src="LiGuard-profile-arch.svg" alt=""><figcaption></figcaption></figure>

### ProfileMember

ProfileMember is an Agent type entity that logically corresponds to the department role member or smart contract. When a member of a role is assigned to a profile, a ProfieMember entity must be created that is equivalent to it. ProfileMember entity has a unique role in each department (type) and also, and they can have different roles in different departments.
Each ProfileMember entity can join to a maximum 2^16 Type entity and also it has a unique address that is equivalent to EOA or smart contract address. It also has some attributes such as ID, name, admin ID, call limit, register limit, activity status, and alterability status.

### ACL Default Types

- **LivelyMaster type (LIVELY_VERSE_LIVELY_MASTER_TYPE_ID):** defines super admin type which is related to the administration of the whole the Lively Guard
- **SystemMaster type (LIVELY_VERSE_SYSTEM_MASTER_TYPE_ID):** defines system admins type which is related to the registration of any new Context and Function entity. Any member of this type can register new scope (Context or Function) in the Lively Guard
- **Anonymous type (LIVELY_VERSE_ANONYMOUS_TYPE_ID):** defines Anonymous type which is related to anyone who is not in the Lively Guard
- **Any type (LIVELY_VERSE_ANY_TYPE_ID):** defines Any type which is related to anyone who exists in the Lively Guard
- **ScopeMaster type (LIVELY_VERSE_SCOPE_MASTER_TYPE_ID):** defines ScopeMaster type which is related to new scope registration. Any members of this type can register a new domain or realm scope in the Lively Guard
- **MemberMaster type (LIVELY_VERSE_MEMBER_MASTER_TYPE_ID):** defines MemberMaster type which is related to when a new member is registered to the Lively Guard, any member of this type will become an admin of the new member by default.
- **TypeMaster type (LIVELY_VERSE_TYPE_MASTER_TYPE_ID):** defines TypeMaster type which is related to the registration of any new type. Any member of this type can register new types in the Lively Guard.
- **PolicyMaster type (LIVELY_VERSE_POLICY_MASTER_TYPE_ID):** defines PolicyMaster type which is related to the registration of any new policy. Any member of this type can register new policies in the Lively Guard.
- **ProfileMaster type (LIVELY_VERSE_PROFILE_MASTER_TYPE_ID):** defines ProfileMaster type which is related to the registration of any new profile. Any member of this type can register new profiles in the Lively Guard.
- **LivelyGuardMaster type (LIVELY_VERSE_LIVELY_GUARD_MASTER_TYPE_ID):** defines LivelyGuardMaster which is related to the administration of ACL scopes itself in the Lively Guard.


### ACL Default Roles

- **LivelyMasterAdmin role (LIVELY_VERSE_LIVELY_MASTER_ADMIN_ROLE_ID):** is defined in LiveyMaster type which is related to administration without any policies in the Lively Guard.
- **SystemMasterAdmin role (LIVELY_VERSE_SYSTEM_MASTER_ADMIN_ROLE_ID):** is defined in SystemMaster type which is related to the registration of contexts and functions entities without any policies in the Lively Guard.
- **ScopeMasterAdmin role (LIVELY_VERSE_SCOPE_MASTER_ADMIN_ROLE_ID):** is defined in ScopeMaster type which is related to the registration of any domain and realm scopes without any policies in the Lively Guard.
- **MemberMasterAdmin role (LIVELY_VERSE_MEMBER_MASTER_ADMIN_ROLE_ID):** is defined in MemberMaster type which is related to the administration of any members without any policies in the Lively Guard.
- **TypeMasterAdmin role (LIVELY_VERSE_TYPE_MASTER_ADMIN_ROLE_ID):** is defined in TypeMaster type which is related to the registration of any new types without any policies in the Lively Guard.
- **PolicyMasterAdmin role (LIVELY_VERSE_POLICY_MASTER_ADMIN_ROLE_ID):** is defined in PolicyMaster type which is related to the registration of any new policy entities without any policies in the Lively Guard.
- **ProfileMasterAdmin role (LIVELY_VERSE_PROFILE_MASTER_ADMIN_ROLE_ID):** is defined in ProfileMaster type which is related to the registration of any new profiles without any policies in the Lively Guard.

### ACL Default Scopes

- **Universe scope (LIVELY_VERSE_LIVELY_UNIVERSE_SCOPE_ID):** is the base of other scopes and only one exists in the Lively Guard. all ACL default Types and Roles have been referred to it.

### Profile Default Types

- **ProfileLivelyMaster type (LIVELY_PROFILE_LIVELY_MASTER_TYPE_ID):** defines profile super admin type which is related to the administration of the Scopes, Agents, and Policies in the Profile entity. by default the profile owner will be a member of this type.
- **ProfileSystemMaster type (LIVELY_PROFILE_SYSTEM_MASTER_TYPE_ID):** defines profile system admin type which is related to the registration of any new Context and Function entities. Any member of this type can register new scope (Context or Function) in the Profile entity.
- **ProfileAny type (LIVELY_PROFILE_ANY_TYPE_ID):** defines Any type which is related to anyone (Member) who exists in the Profile entity.


### Profile Default Roles

- **ProfileLivelyMasterAdmin role (LIVELY_PROFILE_LIVELY_MASTER_ADMIN_ROLE_ID):** is defined in ProfileLiveyMaster type which is related to administration without any policies in the Profile entity.
- **ProfileSystemMasterAdmin role (LIVELY_PROFILE_SYSTEM_MASTER_ADMIN_ROLE_ID):** is defined in ProfileSystemMaster type which is related to registration of contexts and functions entities without any policies in the Profile entity.

### Profile Default Scopes

- **Profile Universe scope (LIVELY_PROFILE_LIVELY_UNIVERSE_SCOPE_ID):** is the base of other scopes and only one exists in the Profile entity. all Profile default Types and Roles have been referred to it.

## Scope Actions

### Universe Management Interface (IUniverseManagement)
- **universeUpdateActivityStatus():** update activity status of Universe entity
- **universeUpdateAlterabilityStatus():** update the alterability status of the Universe entity
- **universeUpdateAdmin():** update admin ID of Universe entity who is referred to specific Type or Role entity
- **universeUpdateDomainLimit():** update the number of Domain (DApp) entities that can register in the universe entity.
- **universeCheckAdmin():** check admin of Universe entity by account address
- **universeHasFunction():** check Function ID exists in the Universe entity
- **universeHasContext():** check Context ID exists in Universe entity
- **universeHasRealm():** check Realm ID exists in the Universe entity
- **universeHasDomain():** check Domain ID exists in the Universe entity
- **universeGetDomains():** get registered domains ID from universe entity
- **universeGetInfo():** get universe entity information


### Domain Management Interface (IDomainManagement)
- **domainRegister():** register new Domains (DApp) entity in the Universe entity
- **domainUpdateActivityStatus():** update the activity status of the Domain entity
- **domainUpdateAlterabilityStatus():** update the alterability status of the Domain entity
- **domainUpdateAdmin():** update admin of Domain entity who is referred to specific Type or Role entity
- **domainMoveRealm():** move the Realm entity to another Context entity. A successful move occurs if the Realm entity hasn’t been referred by any agent.
- **domainUpdateRealmLimit():** update the number of Realm (Service) entities that can register in the Domain entity.
- **domainRemove():** the Domain entity will be removed according to these conditions, firstly, it mustn't have any Realm entity, secondly, if it is referred by any Agent entity, the Domain entity will be removed softly, and also if it  isn't referred by any Agent entity, the Domain entity will be removed from blockchain node (storage)
- **domainCheckId():** check Domain entity exists by ID
- **domainCheckName():** check Domain entity exists by Name
- **domainCheckAdmin():** check Domain entity admin by account address
- **domainHasFunction():** check Function ID exists in the Domain entity
- **domainHasContext():** check Context ID exists in the Domain entity
- **domainHasRealm():** check Realm ID exists in the Domain entity
- **domainGetRealms():** get whole realms IDs in the Domain entity
- **domainGetInfo():** get Domain entity information

### Realm Management Interface (IRealmManagement)
- **realmRegister():** register new Realms (Service) entity in the Domain entity
- **realmUpdateAdmin():** update admin of Realm entity who is referred to specific Type or Role entity
- **realmMoveContext():** move the Context entity to another Realm entity. A successful move occurs if the Context entity hasn’t been referred by any agent.
- **realmUpdateActivityStatus():** update activity status of Realm entity
- **realmUpdateAlterabilityStatus():** update the alterability status of Realm entity
- **realmUpdateContextLimit():** update the number of Context (Contract) entities that can register in the Realm entity.
- **realmRemove():** the Realm entity will be removed according to these conditions, firstly, it mustn't have any Context entity, secondly, if it is referred by any Agent entity, the Realm entity will be removed softly, and also if it isn't referred by any Agent entity, the Realm entity will be removed from blockchain node (storage)
- **realmCheckId():** check Realm entity exists by ID
- **realmCheckName():** check Realm entity exists by Name
- **realmCheckAdmin():** check admin of Realm entity by account address
- **realmHasFunction():** check Function ID exists in the Realm entity
- **realmHasContext():** check Context ID exists in Realm entity
- **realmGetContexts():** get whole contexts IDs in Realm entity
- **realmGetInfo():** get Realm entity information

### Context Management Interface (IContextManagement)
- **contextRegister():** register new Context (Contract) entity in Realm entity
- **contextUpdateActivityStatus():** update activity status of Context entity
- **contextUpdateAlterabilityStatus():** update alterability status of Context entity
- **contextUpdateAdmin():** update admin of Context entity who is referred to specific Type or Role entity
- **contextUpdateFunctionLimit():** update the number of Function entities that can register in the Context entity.
- **contextRemove():** the Context entity will be removed according to these conditions, firstly, it mustn't have any Function entity, secondly, if it is referred by any Agent entity, the Context entity will be removed softly, and also if it isn't referred by any Agent entity, the Context entity will be removed from blockchain node (storage)
- **contextCheckId():** check Context entity exists by ID
- **contextCheckAccount():** check Context entity exists by contract address
- **contextCheckAdmin():** check admin of Context entity by account address
- **contextHasFunction():** check Function ID exists in Context entity
- **contextHasSelector():** check function selector ID exists in the Context entity
- **contextGetFunctions():** get whole Functions IDs in Context entity
- **contextGetInfo():** get Context entity information

### Function Management Interface (IFunctionManagement)
- **functionRegister():** register new Function entity in Context entity
- **functionUpdateAdmin():** update admin of Function entity who is referred to specific Type or Role entity
- **functionUpdateAgent():** update agent of Function entity who is referred to specific Type or Role entity
- **functionUpdateActivityStatus():** update activity status of Function entity
- **functionUpdateAlterabilityStatus():** update the alterability status of the Function entity
- **functionUpdatePolicyCode():** update the policy code of the Function entity
- **functionRemove():** the Function entity will be removed if it is referred by any Agent entity, the Function entity will be removed softly, and also if it isn't referred by any Agent entity, the Function entity will be removed from blockchain node (storage)
- **functionCheckId():** check Function entity exists by ID
- **functionCheckSelector():** check Function entity exists by function selector ID
- **functionCheckAdmin():** check admin of Function entity by account address
- **functionCheckAgent():** check agent of Function entity by account address
- **functionGetInfo():** get Function entity information

## Agent Actions

### Type Management Interface (ITypeManagement)
- **typeRegister():** register new Types (Departement) entity in Lively Guard
- **typeUpdateAdmin():** update admin of Type entity who is referred to specific Type or Role entity or itself.
- **typeUpdateScope():** update Scope reference of Type entity who is referred to specific Scope entity.
- **typeUpdateActivityStatus():** update activity status of Type entity
- **typeUpdateAlterabilityStatus():** update alterability status of Type entity
- **typeUpdateRoleLimit():** update the number of Role entities that can register in the Type entity.
- **typeRemove():** the Type entity will be removed from the blockchain node (storage) if it mustn't have any Role entity.
- **typeCheckId():** check Type entity exists by ID
- **typeCheckName():** check Type entity exists by Name
- **typeCheckAdmin():** check admin of Type entity by account address
- **typeHasAccount():** check the account address of the member that exists in the Type entity
- **typeHasRole():** check Role entity ID exists in the Type entity
- **typeGetRoles():** get whole Role IDs in the Type entity
- **typeGetInfo():** get information of Type entity

### Role Management Interface (IRoleManagement)
- **roleRegister():** register new Role entity in Type entity
- **roleGrantMembers():** granting the Member entity to the Role entity
- **roleRevokeMembers():** revoking the Member entity from the Role entity
- **roleUpdateAdmin():** update admin of Role entity who is referred to specific Type or Role entity or itself.
- **roleUpdateScope():** update Scope reference of Role entity who is referred to specific Scope entity.
- **roleUpdateActivityStatus():** update the activity status of the Role entity
- **roleUpdateAlterabilityStatus():** update the alterability status of the Role entity
- **roleUpdateMemberLimit():** update the number of Member entities that can register in the Role entity.
- **roleRemove():** the Role entity will be removed from the blockchain node (storage) if it mustn't have any Member entity.
- **roleCheckId():** check Role entity exists by ID
- **roleCheckName():** check Role entity exists by Name
- **roleCheckAdmin():** check admin of Type entity by account address
- **roleHasAccount():** check the account address of the member that exists in the Role entity
- **roleGetInfo():** get information of Role entity


### Member Management Interface (IMemberManagement)
- **memberRegister():** register new Members entity in the Role entity of the Type entity, in such a way it can register in only one Role of each Type entity.
- **memberUpdateActivityStatus():** update activity status of Member entity
- **memberUpdateAlterabilityStatus():** update alterability status of Member entity
- **memberUpdateAdmin():** update admin of Member entity who is referred to specific Type or Role entity.
- **memberUpdateGeneralLimit():** update general limitations of Member entity which is related to actions member can do in the Lively Guard
- **memberRemove():** remove the Member entity from the blockchain node (storage)
- **memberCheckId():** check Member entity exists by ID
- **memberCheckAccount():** check Member entity exists by account address
- **memberCheckAdmin():** check admin of Member entity by account address
- **memberHasType():** check Member entity exists in Type entity
- **memberGetTypes():** get whole Type IDs in the Member entity
- **memberGetInfo():** get Member entity information

## Policy Actions

### Policy Management Interface (IPolicyManagement)
- **policyRegister():** register new Policies entity in Lively Guard
- **policyAddRoles():** adding the Role entity to the Policy entity. Note: Policy entity can't be included Role entity at that same time it is the admin of Policy
- **policyRemoveRoles():** removing the Role entity from the Policy entity
- **policyUpdateCodes():** update the policy code of the Policy entity
- **policyUpdateAdmin():** update admin of Policy entity who is referred to specific Type or Role entity.
- **policyUpdateScope():** update Scope reference of Policy entity who is referred to specific Scope entity.
- **policyUpdateActivityStatus():** update the activity status of the Policy entity
- **policyUpdateAlterabilityStatus():** update the alterability status of the Policy entity
- **policyUpdateRoleLimit():** update the number of Role entities that can register in the Policy entity.
- **policyRemove():** the Policy entity will be removed from the blockchain node (storage) if it mustn't have any Role entity.
- **policyCheckId():** check Policy entity exists by ID
- **policyCheckName():** check Policy entity exists by Name
- **policyCheckAdmin():** check admin of Policy entity by account address
- **policyCheckRole():** check Role entity has been included by the Policy entity
- **policyCheckAccess():** check specific Policy entity access to specific Function entity
- **policyCheckRoleAccess():** check specific Role entity access to specific Function entity
- **policyHasRole():** check Role entity exists in the Policy entity
- **policyGetInfoByRole():** get Policy entity information by is included specific Role entity
- **policyGetInfo():** get Policy entity information by ID
- **policyGetRoles():** get whole Role IDs in the Policy entity

## Profile Management Actions

### Profile Management Interface (IProfileManagement)
- **profileRegister():** register a new Profile entity in Lively Guard
- **profileUpdateLimits():** update limitations of the Profile entity
- **profileUpdateOwnerAccount():** check the owner of the Profile entity by account address
- **profileUpdateActivityStatus():** update the activity status of the Profile entity
- **profileUpdateAlterabilityStatus():** update the alterability status of the Profile entity
- **profileUpdateAdmin():** update admin of Profile entity who is referred to specific Type or Role entity.
- **profileCheckId():** check Profile entity exists by ID
- **profileCheckName():** check Profile entity exists by Name
- **profileCheckOwner():** check the owner of the Profile entity by account address
- **profileCheckProfileAdmin():** check admin member exists in the Profile entity by account address
- **profileCheckProfileSystemAdmin():** check system admin member exists in the Profile entity by account address
- **profileCheckAdmin():** check admin of Profile entity by account address
- **profileGetProfileAccount():** get the whole of Profile entities that belong to someone by account address
- **profileGetAdmins():** get the all admins of the Profile entity
- **profileGetInfo():** get the Profile entity information

## ACL Actions

### ACL General Interface (IACLGenerals)

- **isAgentExist():** check the Agent ID (which is one of the Type, Role, or Member entities) that exists in the Lively Guard
- **isScopeExist():** check the Scope ID (which is one of the Function, Context, Realm, Domain, or Universe entities) that exists in the Lively Guard
- **isPolicyExist():** check the Policy ID that exists in the Lively Guard
- **isProfileExist():** check the Profile ID that exists in the Lively Guard
- **scopeBaseInfo():** get Scope basic information by Scope ID in the Lively Guard
- **agentBaseInfo():** get Agent basic information by Agent ID in the Lively Guard
- **checkScopesCompatibility():** check scope compatibility between two scope IDs. It means two scopes have been put on a common path into the Scope hierarchy of the Lively Guard.

### ACL Interface (IACL)

- **hasAccess():** check authorization by the Function ID and message sender in the Lively Guard
- **hasMemberAccess():** check authorization by the Function and Member ID in the Lively Guard
- **hasCSAccess():** check authorization by the contract address and Function selector ID in the Lively Guard
- **hasAccountAccess():** check authorization by the contract address, Function selector ID, and account address in the Lively Guard


## Profile Scope Actions

### Profile Universe Management Interface (IProfileUniverseManagement)

- **profileUniverseUpdateActivityStatus():** update activity status of Universe entity
- **profileUniverseUpdateAlterabilityStatus():** update alterability status of universe entity
- **profileUniverseUpdateAdmin():** update admin ID of Universe entity who is referred to specific Type or Role entity
- **profileUniverseUpdateDomainLimit():** update the number of Domain (DApp) entities that can register in the Universe entity.
- **profileUniverseCheckAdmin():** check admin of Universe entity by account address
- **profileUniverseHasFunction():** check Function ID exists in the Universe entity
- **profileUniverseHasContext():** check Context ID exists in Universe entity
- **profileUniverseHasRealm():** check Realm ID exists in the Universe entity
- **profileUniverseHasDomain():** check Domain ID exists in the Universe entity
- **profileUniverseGetDomains():** get registered domains ID from universe entity
- **profileUniverseGetInfo():** get universe entity information

### Profile Domain Management Interface (IProfileDomianManagement)

- **profileDomainRegister():** register new Domains (DApps) entity in universe entity
- **profileDomainUpdateActivityStatus():** update the activity status of the Domain entity
- **profileDomainUpdateAlterabilityStatus():** update the alterability status of the Domain entity
- **profileDomainUpdateAdmin():** update admin of Domain entity who is referred to specific Type or Role entity
- **profileDomainMoveRealm():** move the Realm entity to another Context entity. A successful move occurs if the Realm entity hasn’t been referred by any agent.
- **profileDomainUpdateRealmLimit():** update the number of Realm (Service) entities that can register in the Domain entity.
- **profileDomainRemove():** the Domain entity will be removed according to these conditions, firstly, it mustn't have any Realm entity, secondly, if it is referred by any Agent entity, the Domain entity will be removed softly, and also if it  isn't referred by any Agent entity, the Domain entity will be removed from blockchain node (storage)
- **profileDomainCheckId():** check Domain entity exists by ID
- **profileDomainCheckName():** check Domain entity exists by Name
- **profileDomainCheckAdmin():** check Domain entity admin by account address
- **profileDomainHasFunction():** check Function ID exists in the Domain entity
- **profileDomainHasContext():** check Context ID exists in the Domain entity
- **profileDomainHasRealm():** check Realm ID exists in the Domain entity
- **profileDomainGetRealms():** get whole realms IDs in the Domain entity
- **profileDomainGetInfo():** get Domain entity information

### Profile Realm Management Interface (IProfileRealmManagement)

- **profileRealmRegister():** register new Realms (Services) entity in the Domain entity
- **profileRealmUpdateAdmin():** update admin of Realm entity who is referred to specific Type or Role entity
- **profileRealmMoveContext():** move the Context entity to another Realm entity. A successful move occurs if the Context entity hasn’t been referred by any agent.
- **profileRealmUpdateActivityStatus():** update activity status of Realm entity
- **profileRealmUpdateAlterabilityStatus():** update the alterability status of the Realm entity
- **profileRealmUpdateContextLimit():** update the number of Contexts (Contract) entities that can register in the Realm entity.
- **profileRealmRemove():** the Realm entity will be removed according to these conditions, firstly, it mustn't have any Context entity, secondly, if it is referred by any Agent entity, the Realm entity will be removed softly, and also if it isn't referred by any Agent entity, the Realm entity will be removed from blockchain node (storage)
- **profileRealmCheckId():** check Realm entity exists by ID
- **profileRealmCheckName():** check Realm entity exists by Name
- **profileRealmCheckAdmin():** check admin of Realm entity by account address
- **profileRealmHasFunction():** check Function ID exists in the Realm entity
- **profileRealmHasContext():** check Context ID exists in the Realm entity
- **profileRealmGetContexts():** get whole contexts IDs in the Realm entity
- **profileRealmGetInfo():** get the Realm entity information

### Profile Context Management Interface (IProfileContextManagement)

- **profileContextRegister():** register new Context (Contract) entity in Realm entity
- **profileContextUpdateActivityStatus():** update activity status of Context entity
- **profileContextUpdateAlterabilityStatus():** update alterability status of Context entity
- **profileContextUpdateAdmin():** update admin of Context entity who is referred to specific Type or Role entity
- **profileContextUpdateFunctionLimit():** update the number of Function entities that can register in the Context entity.
- **profileContextRemove():** the Context entity will be removed according to these conditions, firstly, it mustn't have any Function entity, secondly, if it is referred by any Agent entity, the Context entity will be removed softly, and also if it isn't referred by any Agent entity, the Context entity will be removed from blockchain node (storage)
- **profileContextCheckId():** check the Context entity exists by ID
- **profileContextCheckAccount():** check the Context entity exists by contract address
- **profileContextCheckAdmin():** check admin of the Context entity by account address
- **profileContextHasFunction():** check Function ID exists in the Context entity
- **profileContextHasSelector():** check function selector ID exists in the Context entity
- **profileContextGetFunctions():** get whole Functions IDs in Context entity
- **profileContextGetInfo():** get the Context entity information


### Profile Function Management Interface (IProfileFunctionManagement)

- **profileFunctionRegister():** register new Function entity in Context entity
- **profileFunctionUpdateAdmin():** update admin of Function entity who is referred to specific Type or Role entity
- **profileFunctionUpdateAgent():** update agent of Function entity who is referred to specific Type or Role entity
- **profileFunctionUpdateActivityStatus():** update activity status of Function entity
- **profileFunctionUpdateAlterabilityStatus():** update alterability status of Function entity
- **profileFunctionUpdatePolicyCode():** update policy code of Function entity
- **profileFunctionRemove():** the Function entity will be removed if it is referred by any Agent entity, the Function entity will be removed softly, and also if it isn't referred by any Agent entity, the Function entity will be removed from blockchain node (storage)
- **profileFunctionCheckId():** check Function entity exists by ID
- **profileFunctionCheckSelector():** check Function entity exists by function selector ID
- **profileFunctionCheckAdmin():** check admin of Function entity by account address
- **profileFunctionCheckAgent():** check agent of Function entity by account address
- **profileFunctionGetInfo():** get Function entity Information

## Profile Agent Actions

### Profile Type Management Interface (IProfileTypeManagement)

- **profileTypeRegister():** register new Types (Departement) entity in Lively Guard
- **profileTypeUpdateAdmin():** update admin of Type entity who is referred to specific Type or Role entity or itself.
- **profileTypeUpdateScope():** update Scope reference of Type entity who is referred to specific Scope entity.
- **profileTypeUpdateActivityStatus():** update activity status of Type entity
- **profileTypeUpdateAlterabilityStatus():** update alterability status of Type entity
- **profileTypeUpdateRoleLimit():** update the number of Role entities that can register in the Type entity.
- **profileTypeRemove():** the Type entity will be removed from the blockchain node (storage) if it mustn't have any Role entity.
- **profileTypeCheckId():** check Type entity exists by ID
- **profileTypeCheckName():** check Type entity exists by Name
- **profileTypeCheckAdmin():** check admin of Type entity by account address
- **profileTypeHasAccount():** check the account address of the member exists in the Type entity
- **profileTypeHasRole():** check Role entity ID exists in the Type entity
- **profileTypeGetRoles():** get whole Role IDs in the Type entity
- **profileTypeGetInfo():** get Type entity information


### Profile Role Management Interface (IProfileRoleManagement)

- **profileRoleRegister():** register new Role entity in Type entity
- **profileRoleGrantMembers():** granting the Member entity to the Role entity
- **profileRoleRevokeMembers():** revoking the Member entity from the Role entity
- **profileRoleUpdateAdmin():** update admin of Role entity who is referred to specific Type or Role entity or itself.
- **profileRoleUpdateScope():** update Scope reference of Role entity who is referred to specific Scope entity.
- **profileRoleUpdateActivityStatus():** update the activity status of the Role entity
- **profileRoleUpdateAlterabilityStatus():** update the alterability status of the Role entity
- **profileRoleUpdateMemberLimit():** update the number of Member entities that can register in the Role entity.
- **profileRoleRemove():** the Role entity will be removed from the blockchain node (storage) if it mustn't have any Member entity.
- **profileRoleCheckId():** check Role entity exists by ID
- **profileRoleCheckName():** check Role entity exists by Name
- **profileRoleCheckAdmin():** check admin of Type entity by account address
- **profileRoleHasAccount():** check the account address of the member that exists in the Role entity
- **profileRoleGetInfo():** get Role entity information

### Profile Member Management Interface (IProfileMemberManagement)

- **profileMemberRegister():** register a new Member entity in the Role entity of the Type entity, in such a way it can register in only one Role of each Type entity.
- **profileMemberUpdateTypeLimit():** update the number of Type entities that Member entity can join those.
- **profileMemberUpdateRegisterLimit():** update register limitations of Member entity which is related to actions member can do in the specific Profile entity.
- **profileMemberUpdateCallLimit():** update the number of call functions that the Member entity can do.
- **profileMemberUpdateActivityStatus():** update activity status of Member entity
- **profileMemberUpdateAlterabilityStatus():** update alterability status of Member entity
- **profileMemberUpdateAdmin():** update admin of Member entity who is referred to specific Type or Role entity.
- **profileMemberRemove():** remove the Member entity from the blockchain node (storage)
- **profileMemberCheckId():** check Member entity exists by ID
- **profileMemberCheckAccount():** check Member entity exists by account address
- **profileMemberCheckAdmin():** check admin of Member entity by account address
- **profileMemberHasType():** check Member entity exists in Type entity
- **profileMemberGetTypes():** get whole Type IDs in the Member entity
- **profileMemberGetInfo():** get Member entity information


## Profile Policy Actions

### Profile Policy Management Interface (IProfilePolicyManagement)

- **profilePolicyRegister():** register a new Policy entity in the Profile entity
- **profilePolicyAddRoles():** adding the Role entity to the Policy entity. Note: Policy entity can't be included Role entity at that same time it is the admin of Policy
- **profilePolicyRemoveRoles():** removing the Role entity from the Policy entity
- **profilePolicyUpdateCodes():** update the policy code of the Policy entity
- **profilePolicyUpdateAdmin():** update admin of Policy entity who is referred to specific Type or Role entity.
- **profilePolicyUpdateScope():** update Scope reference of Policy entity who is referred to specific Scope entity.
- **profilePolicyUpdateActivityStatus():** update activity status of Policy entity
- **profilePolicyUpdateAlterabilityStatus():** update the alterability status of the Policy entity
- **profilePolicyUpdateRoleLimit():** update the number of Role entities that can register in the Policy entity.
- **profilePolicyRemove():** the Policy entity will be removed from the blockchain node (storage) if it mustn't have any Role entity.
- **profilePolicyCheckId():** check Policy entity exists by ID
- **profilePolicyCheckName():** check Policy entity exists by Name
- **profilePolicyCheckAdmin():** check admin of Policy entity by account address
- **profilePolicyCheckRole():** check Role entity has been included by the Policy entity
- **profilePolicyCheckAccess():** check specific Policy entity access to specific Function entity
- **profilePolicyCheckRoleAccess():** check specific Role entity access to specific Function entity
- **profilePolicyHasRole():** check Role entity exists in the Policy entity
- **profilePolicyGetInfoByRole():** get Policy entity information by is included specific Role entity
- **profilePolicyGetInfo():** get Policy entity information by ID
- **profilePolicyGetRoles():** get whole Role IDs in the Policy entity


## Profile ACL Actions

### Profile ACL General Interface (IProfileACLGenerals)

- **profileIsAgentExist():** check the Agent ID (which is one of the Type, Role, Member entities) that exists in the Profile entity
- **profileIsScopeExist():** check the Scope ID (which is one of the Function, Context, Realm, Domain, Universe entities) that exists in the Profile entity
- **profileIsPolicyExist():** check the Policy ID that exists in the Profile entity
- **profileScopeBaseInfo():** get Scope basic information by Scope ID in the Profile entity
- **profileAgentBaseInfo():** get Agent basic information by Agent ID in the Profile entity
- **profileCheckScopesCompatibility():** check scope compatibility between two scope IDs. It means two scopes have been put on a common path into the Scope hierarchy of the Profile entity.

### Profile ACL Interface (IProfileACL)

- **profileHasAccess():** check authorization by the Function ID and message sender in the Profile entity
- **profileHasMemberAccess():** check authorization by the Function and Member ID in the Profile entity
- **profileHasCSAccess():** check authorization by the contract address and Function selector ID in the Profile entity
- **profileHasAccountAccess():** check authorization by the contract address, Function selector ID, and account address in the Profile entity

## Proxy Commons

It’s common interface of proxy used in all contracts.

### Proxy Interface (IProxy)

- **upgradeTo():** Upgrade the implementation of the proxy
- **setSafeModeStatus():** Update the safe mode status of the proxy
- **setUpdatabilityStatus():** Set the update ability status of the proxy
- **setLocalAdmin():** Update the local administration address of the proxy
- **setAccessControlManager():** Update the ACL address of the proxy
- **withdrawBalance():** Withdraw the whole amount of the balance of the proxy
- **contractName():** Get the contract name of the proxy
- **contractVersion():** Get the contract version of the proxy
- **accessControlManager():** Get the ACL address of the proxy
- **subjectAddress():** Get the implementation contract address of the proxy
- **safeModeStatus():** Get the safe mode status of the proxy
- **updatabilityStatus():** Get the update ability status of the proxy
- **localAdmin():** Get the local administrator address of the proxy
- **domainSeparator():** Returns the domain separator used in the encoding of the signature, as defined by EIP712
- **initVersion():** Get the initialized version of the proxy

### Note
For the sake of functionality, the Lively Token along with its asset manager has been integrated into the project, serving as a practical example of its usage. 

## Lively Token ERC20 (LIV)

### ERC20 Interface (IERC20)

- **transfer():** Transfers the number of tokens to the destination address.
- **transferFrom():** Transfers the number of tokens from the source address to the destination address. The transferFrom method is used for a withdraw workflow, allowing contracts to transfer tokens on your behalf. This can be used for example to allow a contract to transfer tokens on your behalf and/or to charge fees in sub-currencies.
- **approve():** Allows spender to withdraw from your account multiple times, up to the value amount.
- **allowance():** Returns the amount which the spender is still allowed to withdraw from the owner
- **name():** Returns the name of the token
- **symbol():** Returns the symbol of the token
- **decimals():** Returns the number of decimals the token uses
- **totalSupply():** Returns the total token supply.
- **balanceOf():** Returns the account balance of another account with the address


### ERC20 Extra Interface (IERC20Extra)

- **increaseAllowance():** Atomically increases the allowance granted to the spender by the caller.
- **decreaseAllowance():** Atomically decreases the allowance granted to the spender by the caller.
- **burn():** Destroys amount tokens from the caller.
- **mint():** Creates amount tokens and assigns them to account, increasing the total supply
- **batchTransfer():** Batch transfers the number of tokens to the destination addresses.
- **batchTransferFrom():** Batch transfers the number of tokens from the source addresses to the destination addresses.
- **updateTaxRate():**	Update the tax rate percentage in the token
- **updateTaxWhitelist():** Update the tax whitelist in the token whose addresses exclude from the tax
- **permit():** Sets value as the allowance of spender over owner's tokens, given owner's signed approval.
- **taxRate():** Get the tax rate percentage from the token
- **taxTreasury():** Get the tax treasury address
- **taxWhitelist():** Get the tax whitelist addresses from the token
- **nonce():** Returns the current nonce for the owner. This value must be included whenever a signature is generated for the permit.

### ERC20 Lock Interface (IERC20Lock)

- **lockToken():** Locks the number of tokens for a period of time from the specific source address. It returns a lock ID that could be tracked and it’s put in the custody of the new owner (account address). After release time, the locked tokens withdraw to the new account address.
- **unlockToken():** Unlocks the number of tokens under release time by lock ID and returns it to the source address.
- **claimToken():** Claims (release) the number of tokens after release time to withdraw to the new account address. It can only call by the new owner.
- **lockInfo():** Get the Lock information by ID
- **totalBalanceOf():** Get adding the result of the account balance and account lock balance by account address
- **lockBalanceOf():** Get account lock balance by account address


### ERC20 Pause Interface (IERC20Pause)

- **pause():** suspends (freeze) an account address in the token
- **unpause():** unsuspends (unfreeze) an account address in the token
- **pauseAll():** suspends Token contract
- **unpauseAll():** unsuspends Token contract
- **isPaused():**	checks the account address that suspends in the token
- **isPausedAll():** checks token that is suspended
- **pausedAccounts():** returns suspended accounts


## Asset Manager ERC20

Asset management is very important when distributing tokens according to the tokenomics.
the AssetManagerERC20 can manage distributed tokens safe and secure by asset entity contracts that are compatible, and bind to specific ERC20 token. It substitutes external of accounts (EOA) with smart contracts in the tokens distribution process.

### ERC20 Asset Manager Interface (IAssetManagerERC20)

- **createAsset():** creates ERC20 asset entity that the subject (asset) contract has registered in the asset manager
- **registerAsset():** registers ERC20 asset entity that it’s already created
- **removeAsset():** removes ERC20 asset entity from assetManager
- **registerToken():** registers new ERC20 token along with its subject (asset) implementation and system admin signature
- **updateToken():** updates subject (asset) implementation or system admin signature that is related to ERC20 token address
- **setSafeModeAssets():** updates safe mode status of asset entity
- **getSafeModeAsset():** gets safe mode status of asset entity
- **getAllTokens():** gets all registered ERC20 token addresses in the asset manager
- **getTokenInfo():** gets subject (asset) implementation address and system admin signature that are related to ERC20 token
- **isAssetExists():** checks asset entity exists by Address
- **isTokenExists():** checks erc20 token exists by Address
- **predictAddress():** calculate address by create2 feature



## Asset

It’s a general interface for asset basic functionality. Any asset (subject) implementations have to implement it. The AssetManager only register asset who has implemented IAssetEntity.

### Common Asset Entity Interface (IAssetEntity)

- **assetInitialize():** initialize asset by required data
- **assetSetSafeMode():** update asset safe mode status
- **assetSafeMode():** get the safe mode status of the asset
- **assetType():** get token type of asset
- **assetToken():** get token address of asset
- **assetName():** get asset name
- **assetVersion():** get asset version
- **assetAccessControl():** get ACL of asset
- **assetInitVersion():** get initialize version of asset
- **assetBalance():** get asset balance
- **assetInfo():** get asset information

## Asset ERC20 (Lively)

It’s an interface for the Lively ERC20 asset. ERC20 asset (subject) has to implement it to support the Lively token functionalities.

### ERC20 Asset Interface (IAssetERC20)

- **tokenLock():** calls lockToken() of Lively token with requested data by the authorized account
- **tokenTransfer():** calls transfer() of Lively token with requested data by the authorized account
- **tokenBatchTransfer():** calls batchTransfer() of Lively token with requested data by the authorized account
- **tokenTransferFrom():** calls transferFrom() of Lively token with requested data by the authorized account
- **tokenBatchTransferFrom():** calls batchTransferFrom() of Lively token with requested data by the authorized account
- **tokenApprove():** calls approve() of Lively token with requested data by the authorized account
- **tokenIncreaseAllowance():** calls increaseAllowance() of Lively token with requested data by the authorized account
- **tokenDecreaseAllowance():** calls decreaseAllowance() of Lively token with requested data by the authorized account


## Installation
1. Clone this repository:
```console
git clone https://github.com/SinaTadayon/Acl-on-chain.git 
```

2. Install NPM packages:
```console
cd Acl-on-chain
yarn install
``` 

## Run tests:
```console
yarn test
```

## Deployment scripts:
The SYSTEM_ADMIN_KEY, LIVELY_ADMIN_KEY, ASSET_ADMIN_KEY keys should be found in the .env file before deploying to the Polygon network. 

- Local deployment
```console
yarn deploy:local
```

- Polygon Mumbai deployment (testnet)
```console
yarn deploy:mumbai
```

- Polygon deployment (mainnet)
```console
yarn deploy:polygon
```


## Author

This implementation was written by Sina Tadadyon.


## License

MIT license. See the license file.
Anyone can use or modify this software for their purposes.
