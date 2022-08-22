/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  UUPSUpgradeableTest,
  UUPSUpgradeableTestInterface,
} from "../../../test/proxy/UUPSUpgradeableTest";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523073ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff1681525034801561004357600080fd5b5060805161265861007b60003960008181610291015281816103cf015281816106ac015281816107ea0152610a7e01526126586000f3fe60806040526004361061003f5760003560e01c806301ffc9a7146100445780633659cfe6146100815780634f1ef286146100aa57806352d1902d146100c6575b600080fd5b34801561005057600080fd5b5061006b60048036038101906100669190611e25565b6100f1565b6040516100789190611e6d565b60405180910390f35b34801561008d57600080fd5b506100a860048036038101906100a39190611ee6565b6101df565b005b6100c460048036038101906100bf9190612059565b6105fa565b005b3480156100d257600080fd5b506100db6109ca565b6040516100e891906120ce565b60405180910390f35b600061011f7f89258237c7236f77b670f606ec0a6c52fd1033e73c5acb211bad5fb60731f32960001b610c0f565b61014b7f424a628b8a6f1cec67275af95f0cc5be6cc79e047575e5d41b3c5f808a016adb60001b610c0f565b6101777fe551b2f62fb56daf21fe8b82311430e9dd970a3b0d4a3d564359888d7491ffc960001b610c0f565b7f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b61020b7f2eef4069001a739395124d7e58e70e963adf007619c29b081fc7277256aec5cf60001b610c12565b6102377fbb5b4632a873c1f375290720d2805f946971871beb1f7a45009941618de843c260001b610c12565b6102637f58fae5a99d24f0d74583d4b985488498a40d8754d12cb1631b475451a3a707b360001b610c12565b61028f7f57790454a89fd57f64be5803d4e2d72e7fd2ab2040268a82b1a53ea9c375fcad60001b610c12565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff160361031d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103149061216c565b60405180910390fd5b6103497febd7b103d310ebea833d836aa33ba70d41334382971ca60e96a2652dcca1f5c460001b610c12565b6103757f319ff171841fb2524c707193b88ca5f03c1e2e455e8933c915e9801cfaffaf3a60001b610c12565b6103a17f90797dbedccfc2a383ff494f63861b8d18bf8432f58fab1248b97e6df03aaaec60001b610c12565b6103cd7f9232da03da2932a0e34eb607f2ba848fe941375fd026572be88ec887a40c121160001b610c12565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1661040c610c15565b73ffffffffffffffffffffffffffffffffffffffff1614610462576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610459906121fe565b60405180910390fd5b61048e7f2adc3e3a41173ae153ab3bd63d46ee32e6d69eca8be5f399c2c83d0b9730bc0d60001b610c12565b6104ba7f8de1a1fa83be614658d5cd5db2f1474cba3dcc09430db8abfd56468e43b4c5d760001b610c12565b6104e67f748256796570870eb261eb07fc9e55bfb95e1c201a806f5c40ee86cd14f3e8ff60001b610c12565b6105127f01f5c29be60ff6be4153943ae0b4ef1908e75750bb1ca6ab06e3f81582f8e7cb60001b610c12565b61053d7eee77be90a1447af9322a088ad97eb6c9a3b039a2c1d6bbd1f5147b419cfcef60001b610c12565b61054681610cf0565b6105727f38cd1d156744b0c1bc82ba19491a8e3785c5a203f98cdf2a75787e5bcc47e8ea60001b610c12565b61059e7f4b60de0f1e04081a7bc9c1db6308278857e57acc027bb5ec0965ef786b2a866b60001b610c12565b6105f781600067ffffffffffffffff8111156105bd576105bc611f2e565b5b6040519080825280601f01601f1916602001820160405280156105ef5781602001600182028036833780820191505090505b506000610d1f565b50565b6106267f2eef4069001a739395124d7e58e70e963adf007619c29b081fc7277256aec5cf60001b610c12565b6106527fbb5b4632a873c1f375290720d2805f946971871beb1f7a45009941618de843c260001b610c12565b61067e7f58fae5a99d24f0d74583d4b985488498a40d8754d12cb1631b475451a3a707b360001b610c12565b6106aa7f57790454a89fd57f64be5803d4e2d72e7fd2ab2040268a82b1a53ea9c375fcad60001b610c12565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1603610738576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161072f9061216c565b60405180910390fd5b6107647febd7b103d310ebea833d836aa33ba70d41334382971ca60e96a2652dcca1f5c460001b610c12565b6107907f319ff171841fb2524c707193b88ca5f03c1e2e455e8933c915e9801cfaffaf3a60001b610c12565b6107bc7f90797dbedccfc2a383ff494f63861b8d18bf8432f58fab1248b97e6df03aaaec60001b610c12565b6107e87f9232da03da2932a0e34eb607f2ba848fe941375fd026572be88ec887a40c121160001b610c12565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16610827610c15565b73ffffffffffffffffffffffffffffffffffffffff161461087d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610874906121fe565b60405180910390fd5b6108a97f2adc3e3a41173ae153ab3bd63d46ee32e6d69eca8be5f399c2c83d0b9730bc0d60001b610c12565b6108d57f8de1a1fa83be614658d5cd5db2f1474cba3dcc09430db8abfd56468e43b4c5d760001b610c12565b6109017fda5be3e4dd74637dd0528a5b03e83b232da38d912950705967e36b295380f13b60001b610c12565b61092d7f854021a9ec51c8181eae8642c1ee6b8b61054887503b0c9ac3bdf85938203ac060001b610c12565b6109597fd8242751f0672b20c4de323f42c377e30bcdd7d5212ea884731b5c4a583af24660001b610c12565b61096282610cf0565b61098e7fd402bbc8c6008364371959aa74bdfe017ffed3792897d454d71e48ad4ccfa88360001b610c12565b6109ba7ffd76cbb7af4142d98f95f8ddfaa46647afaab2c739c7b8e3f8ffa7ae59c070dd60001b610c12565b6109c682826001610d1f565b5050565b60006109f87f70a654a6e99c3ea4e2b18e98c18b8711106a57d25affa9b53b94c05fe1fb28e460001b610c12565b610a247fee515c9e77de2c41fb9f3eca4e8caeec07185761527a4fa4b36fe6cba72b932b60001b610c12565b610a507ff14274f0250a32c385bb67c31dc864e3c523dcbc62e861995e754e90b49c5df260001b610c12565b610a7c7fb69724e42222fd86afef1fd3f357f2486f651d87fce5d16442d4e95270e368f260001b610c12565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610b0a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0190612290565b60405180910390fd5b610b367f064c8087a9b1d95655ef5d8e45f5c6e0384ee81456c481a5fff82ac1f00586ae60001b610c12565b610b627f5a2d297fd403a59e52a3f2b38977f54d66453f1e9d65616142aae2e6099eb33e60001b610c12565b610b8e7f78a85a606e2915242e0efd3510006a2d45dc18814c0cc5f1e985d15058aae32560001b610c12565b610bba7ffbb8298f95f2930a6c9ba1ec5a3d0e0f9dd23987cfb3e98566c317b16bff704f60001b610c12565b610be67f2fcddae6897ffeec14b37ab043cf77ff2406d37fdce5cb8972e6ed57ba78079c60001b610c12565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b50565b50565b6000610c437f5fb075de28c79c56d0c7bed9d20d861b3411eaf55e4c9cb67e7226e18758ecca60001b611179565b610c6f7f6552cc4616c5bedb7b73244787d55b0ec50bfe7a645a1041971848a20c5dc33e60001b611179565b610c9b7f873478c9a0d8f604287fc90e3ae4fa086e0f2d207656fbdcef765fc1918e249160001b611179565b610cc77f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61117c565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610d1c7fb2c4138d9a94d0ff9767b5c2194da5d2b60a2a33e6765b3385bff27608aa73b560001b610c12565b50565b610d4b7f5acc0514ca4bea9326ef5fa96cbce51ee3d47045af2a250ee69521d872ad63bc60001b611179565b610d777f7bb831f5a066359ff6a20d7a61f81c9409bb523e01f9829a7b4a01aef0c2933b60001b611179565b610da37fbd51c58fda8aa747f2f820e50b4afdc19007be6d4e7f4ae63ab6ca086c42b98760001b611179565b610dcf7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd914360001b6111de565b60000160009054906101000a900460ff1615610e7757610e117fcb4bc807af1842e6b3f591eff3352dc758a08fed3f1f26c27d6a3cb2c693f75f60001b611179565b610e3d7f018ebd6699ccb99ad0246c78bb36bc10c279b6e1ecf2dc4c74cb5edf46d6e8c060001b611179565b610e697f6f848f6f94fc5fae60adcb32467471f6ff5df9f926ebff6df29e187b6063a67060001b611179565b610e7283611240565b611174565b610ea37f7a4afc4adf0e39a6ae4853cb4e8e22474800d20661ab5430a5867d9dd6a0cb1c60001b611179565b610ecf7f98c77bd479784c8ed22062f3c7c10890d3759fb1e2af5d02502ff222148c764160001b611179565b610efb7fd8ca4030a98cb3119886db8f795740ebc136ab0486f3ccb5ad371b40df385e5c60001b611179565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610f6357506040513d601f19601f82011682018060405250810190610f6091906122dc565b60015b610ffa57610f937f860034dc35daa80caa3e60e29c3c5d17152ca17f8b4de02c0d4bf90574f27cf160001b611179565b610fbf7f60454660a94855aea38c4b02693273801e7ae62a081f303139871ed752adabf360001b611179565b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ff19061237b565b60405180910390fd5b6110267f2bfc7981e82e8476f5f7daa18ad003a41c46f6a5cdb58dc8ddf6400372dd26c860001b611179565b6110527f6b2c04cd23d33a72353611415108857d6d4c850c3c3dc533f89615f394a32b9060001b611179565b61107e7f8838a7978f6a1ceabe5d354a50208ec37811b509df993f59b32143b3a0bcadb560001b611179565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b81146110e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110da9061240d565b60405180910390fd5b61110f7f7c0df76647d2bf60a357e54ad50f3382f1bd6087bd791305d85a6a5d4d00082b60001b611179565b5061113c7f43f6fa206d22da56d726536e76d9e876d31e58198609285938b2cd5949bbaa8460001b611179565b6111687f43422f929d9c46c13d212f37e8301eb94815f6bdabf835366ad4ce464f8f079260001b611179565b61117383838361142d565b5b505050565b50565b60006111aa7fe74c5dc1c19d4a6b0371f2e2bb20f64521aef0451400e76a1362409adce93aee60001b6115ea565b6111d67f668b8edd3df71881891ced11c92dbe318d69a52f4c0eef0fc6e6390d99495c6860001b6115ea565b819050919050565b600061120c7f3ac2f6e3d88261386b7f46e23d609984cbbf5fc0929b5c598cd9902223f6400360001b6115ea565b6112387f864bebb2216298d2ded4b0ada90e405acf0e9a1e4b17d2f456f65ae3feb223c860001b6115ea565b819050919050565b61126c7ffce46beeb0fbe8f5fdca7d9770995d238e08799ce5ebcb39384ac8b82749112560001b611179565b6112987ff75b9273a238d8b53f0e84ea3278724e37d09fdff38c90ac7edb317437a30dd560001b611179565b6112c47f667d10edb46c1502a240a607ed604659a219e7de68d38c07f5c0d5f7d87f734560001b611179565b6112f07fd21148b0d063c484204e2515cc71b4b592ae20912559aa497e525d0b7a5cafd260001b611179565b6112f9816115ed565b611338576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161132f9061249f565b60405180910390fd5b6113647f4b4343fe0814b61bc7e82eefeab210f4dee033cb3e41380702e267d1cd6202cb60001b611179565b6113907f3a23530c1440ed8182f70bb590d86e7bf511f9465335d174be4ceaa5ad8cd7b260001b611179565b6113bc7f247f7c8592c26dea16fb2f49480968939fb59a4a1c0694cfd72ab6f4871d84f360001b611179565b806113e97f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61117c565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6114597f17cdda9385977c0fcec772d3d0611f534b712d039aa82039a7f379a7c2121d3960001b611179565b6114857fbbc1b77bc4b3140614f2aab5cd566ac1a1ef9c07c9ddefb7c1114690cc6199a560001b611179565b6114b17fd969e44bb8b7d8c4a8eb1d3c6f6b0310276895921cf28da63832101ceaaa752560001b611179565b6114ba83611695565b6114e67f1210447c498d2668ea88f1367cef541aaf29092971be39c4cf8359f36f14061e60001b611179565b6115127f7d606a9ea090827620d8fcfbf692acafbd9c16e837ae22d1370c555c5b12877a60001b611179565b60008251118061151f5750805b156115b8576115507fe2f5ecf4c0335d8c5c8590159fa5c5aea8505a05a0a19bacca00216f513b458560001b611179565b61157c7ff30dfc17619c157483868623facabc6ad62c28e394aa90fb09addc3a475826de60001b611179565b6115a87f7683b6b73368564aeed65c644a00cc44b5bd2417c9b18518956ec296bf012fc460001b611179565b6115b283836117c0565b506115e5565b6115e47f791855e58d2edcce75613268003b41e8ecae05ef6a0900a1b23d4f80068a816760001b611179565b5b505050565b50565b600061161b7f8cc02c191dd07233f23952ad6ae30ad7f043ea03b013b720cb66c56918e663fd60001b61188e565b6116477fe2dd8074e7245e9f5c778414396094e3baa7d7068a90b79fcca0c7c79674cd7060001b61188e565b6116737fe43a2b67156b914aaa515c21a3b9a53fea5e88c5aa0897f91c36ef5c68145b4460001b61188e565b60008273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6116c17f0d58f5708f3cfe7ba5750c2e2ed0604d2c91122e736a08919ada2bc616da3a0560001b611179565b6116ed7f6eaf218dd47b13324b3b3a793c86340e441469b80a1fe37fcb6297db781e544860001b611179565b6117197f4b7b75b45be5cef2f3ddf591924ce15f59e0f3da02b5d05800749858c9bfc1f560001b611179565b61172281611240565b61174e7f170bffe09ce2a1173da41e5d6d3a7e5d160bae70406f530475a1f811f916cd0b60001b611179565b61177a7ff7205794f8bcde4fd5994c3dd86171c22bf25c77a684120b6616f913fb85002a60001b611179565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b60606117ee7f24228ce5b335e3064b3a0fc5be7b2350ad810339a49a7f0146e4aa3c3e40222a60001b61188e565b61181a7feefd1c1f317e5afddab3ac17b82cf4cb4cea9fa683b3691a6f5bc65cfe9b1dc660001b61188e565b6118467fda9c99cbea2e9838dd2e3d6a5e6b50152583d0fe082147864d461ef126f3c96860001b61188e565b61188683836040518060400160405280601481526020017f44656c65676174652043616c6c204661696c6564000000000000000000000000815250611891565b905092915050565b50565b60606118bf7f58806cac68bafbd658f7f58e49c64ee0b5a9ba9775004f36eeffb95f0e2c153360001b61188e565b6118eb7fce2889c0d5ba608733cdd6f4e6783e92b3d19981b72396750f39710d791b2a5e60001b61188e565b6119177f09714055d1ecc483dd960dfc62f192e0305f2ddeb90a1212bd86e7af6f2ffcb560001b61188e565b6119437fd5198ca226af0dee0a5057034dda42ad30da65119fa9149225ca2b0fc2fab1b660001b61188e565b61194c846115ed565b61198b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119829061250b565b60405180910390fd5b6119b77f5738641fac8811b46410eb1eeefe31ef9c66f6c0c751162bc476a1a4a1d5722960001b61188e565b6119e37f2393bd7553b8d42377cbf91e728b4cc862e9c33fc58daa076750ff472ae68f9160001b61188e565b611a0f7f15cf450be8d49212fb9bffffc187261322de8caf9a5443bee396ac2cb297d0b460001b61188e565b6000808573ffffffffffffffffffffffffffffffffffffffff1685604051611a3791906125a5565b600060405180830381855af49150503d8060008114611a72576040519150601f19603f3d011682016040523d82523d6000602084013e611a77565b606091505b5091509150611aa87fe8848ba89c4c1818efb56a3b3ef79cca9bd96f085c9148a5b66f797933f61e9260001b61188e565b611ad47f74b445b0fa40293ce722fcd68709cc059c1e3f6ac7cd622cf887fada021e560760001b61188e565b611adf828286611aea565b925050509392505050565b6060611b187f674f2dbbac7dc7edd00610248beea465f13d24d05df9687d443107bd716715d760001b61188e565b611b447fb101e8e5e38593a5ce9823b651856ada6143f9b16160bd34ff7716374e3329df60001b61188e565b611b707f9fa4ba49a7d735b4ed3f15d940e043ce0b3ecff40e4d38b6943a217054df74a160001b61188e565b8315611c0257611ba27fd25e7b4ee9b706507ad513f4687c4a2248d38baf22a7ef83dbf279365ce87cf060001b61188e565b611bce7ff443a78326b93e9218a7153a7ab527f5c6ac89a34426192f9eba85ea3a49c06860001b61188e565b611bfa7f5ea15a4331f10c9ca5bc38c9537d6ec35061aa0075381f3b53a054324f551d8660001b61188e565b829050611db2565b611c2e7f89dcfa1c72a918207f365f863513fdd7d82d0cebaaaa9a863b6410b8ce5753a960001b61188e565b611c5a7f533002a8dc8c6119414837a5f531b84a1aa6baccb0a475fbade9f8beddbe328760001b61188e565b611c867f3b1fee95721c1b2ad71ceea80447b81fd34e807c6ad7ac12c1c728e2242c2c5660001b61188e565b600083511115611cf157611cbc7f4d44caef20781ed08c817c86e107c96c6e1083b9d24c1be8b9da294b19646dac60001b61188e565b611ce87f93e4641db52938e0a16e91fdca617940b6756454f76c39056ce3328adef9ea8460001b61188e565b82518084602001fd5b611d1d7fa599e8ebff2134ffd329123bdafb99dcfef26b054ef1a89732866f112d316b1f60001b61188e565b611d497fb879bf1993e58d27b3d61fcd1d205ef6d0a16f9d975e477584bdd6bcf83072b460001b61188e565b611d757f0d58fe06c0961247c4ada1ce26adb127997fb26ed336f06f66d82955e631b7b460001b61188e565b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611da99190612600565b60405180910390fd5b9392505050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611e0281611dcd565b8114611e0d57600080fd5b50565b600081359050611e1f81611df9565b92915050565b600060208284031215611e3b57611e3a611dc3565b5b6000611e4984828501611e10565b91505092915050565b60008115159050919050565b611e6781611e52565b82525050565b6000602082019050611e826000830184611e5e565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611eb382611e88565b9050919050565b611ec381611ea8565b8114611ece57600080fd5b50565b600081359050611ee081611eba565b92915050565b600060208284031215611efc57611efb611dc3565b5b6000611f0a84828501611ed1565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611f6682611f1d565b810181811067ffffffffffffffff82111715611f8557611f84611f2e565b5b80604052505050565b6000611f98611db9565b9050611fa48282611f5d565b919050565b600067ffffffffffffffff821115611fc457611fc3611f2e565b5b611fcd82611f1d565b9050602081019050919050565b82818337600083830152505050565b6000611ffc611ff784611fa9565b611f8e565b90508281526020810184848401111561201857612017611f18565b5b612023848285611fda565b509392505050565b600082601f8301126120405761203f611f13565b5b8135612050848260208601611fe9565b91505092915050565b600080604083850312156120705761206f611dc3565b5b600061207e85828601611ed1565b925050602083013567ffffffffffffffff81111561209f5761209e611dc8565b5b6120ab8582860161202b565b9150509250929050565b6000819050919050565b6120c8816120b5565b82525050565b60006020820190506120e360008301846120bf565b92915050565b600082825260208201905092915050565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f64656c656761746563616c6c0000000000000000000000000000000000000000602082015250565b6000612156602c836120e9565b9150612161826120fa565b604082019050919050565b6000602082019050818103600083015261218581612149565b9050919050565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f6163746976652070726f78790000000000000000000000000000000000000000602082015250565b60006121e8602c836120e9565b91506121f38261218c565b604082019050919050565b60006020820190508181036000830152612217816121db565b9050919050565b7f555550535570677261646561626c653a206d757374206e6f742062652063616c60008201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000602082015250565b600061227a6038836120e9565b91506122858261221e565b604082019050919050565b600060208201905081810360008301526122a98161226d565b9050919050565b6122b9816120b5565b81146122c457600080fd5b50565b6000815190506122d6816122b0565b92915050565b6000602082840312156122f2576122f1611dc3565b5b6000612300848285016122c7565b91505092915050565b7f45524331393637557067726164653a206e657720696d706c656d656e7461746960008201527f6f6e206973206e6f742055555053000000000000000000000000000000000000602082015250565b6000612365602e836120e9565b915061237082612309565b604082019050919050565b6000602082019050818103600083015261239481612358565b9050919050565b7f45524331393637557067726164653a20756e737570706f727465642070726f7860008201527f6961626c65555549440000000000000000000000000000000000000000000000602082015250565b60006123f76029836120e9565b91506124028261239b565b604082019050919050565b60006020820190508181036000830152612426816123ea565b9050919050565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b6000612489602d836120e9565b91506124948261242d565b604082019050919050565b600060208201905081810360008301526124b88161247c565b9050919050565b7f496c6c6567616c20436f6e747261637420416464726573730000000000000000600082015250565b60006124f56018836120e9565b9150612500826124bf565b602082019050919050565b60006020820190508181036000830152612524816124e8565b9050919050565b600081519050919050565b600081905092915050565b60005b8381101561255f578082015181840152602081019050612544565b8381111561256e576000848401525b50505050565b600061257f8261252b565b6125898185612536565b9350612599818560208601612541565b80840191505092915050565b60006125b18284612574565b915081905092915050565b600081519050919050565b60006125d2826125bc565b6125dc81856120e9565b93506125ec818560208601612541565b6125f581611f1d565b840191505092915050565b6000602082019050818103600083015261261a81846125c7565b90509291505056fea2646970667358221220a747ee414a82bcf62f72a02632ee7987d0f9ea5a5716c06b082210fdb336a00864736f6c634300080f0033";

type UUPSUpgradeableTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UUPSUpgradeableTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UUPSUpgradeableTest__factory extends ContractFactory {
  constructor(...args: UUPSUpgradeableTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UUPSUpgradeableTest> {
    return super.deploy(overrides || {}) as Promise<UUPSUpgradeableTest>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): UUPSUpgradeableTest {
    return super.attach(address) as UUPSUpgradeableTest;
  }
  override connect(signer: Signer): UUPSUpgradeableTest__factory {
    return super.connect(signer) as UUPSUpgradeableTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UUPSUpgradeableTestInterface {
    return new utils.Interface(_abi) as UUPSUpgradeableTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UUPSUpgradeableTest {
    return new Contract(address, _abi, signerOrProvider) as UUPSUpgradeableTest;
  }
}
