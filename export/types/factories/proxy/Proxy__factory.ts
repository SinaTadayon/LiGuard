/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BytesLike,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Proxy, ProxyInterface } from "../../proxy/Proxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "logic",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60a06040523073ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff1681525060405162002b5d38038062002b5d83398181016040528101906200005c919062001b1e565b620000907fe1e2c9dc5a6be5756e885bd363cfdabf1e38154a3f579c5b912292755edc2c5660001b6200041f60201b60201c565b620000c47fa75450e050e7ac506f53aa446da682e5237478a9dbe7d1200cdaa2145061663160001b6200041f60201b60201c565b620000f87faa72a52099dd24eb88117195e57b5ea3a8ec75a9982839cae9184c30a51d6d9e60001b6200041f60201b60201c565b60017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd60001c6200012a919062001bbd565b60001b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b1462000162576200016162001bf8565b5b620001967fa72544e4437926a6023857742db5b83799054bbee7577aa7344e9d951fb71a9760001b6200041f60201b60201c565b620001ca7fe5b5a090ddf8cac85f90ebf9e6acc1fb32529901431a4d4ffbca834f182ca88360001b6200041f60201b60201c565b60017fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610460001c620001fc919062001bbd565b60001b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b1462000234576200023362001bf8565b5b620002687fa9d050cb0b2b1246ee50c015126a7a6c9eb64b1601025bf2b210a85c7c46a4ea60001b6200041f60201b60201c565b6200029c7fb2c091c908a19130a18c763904e8eb89b4641039734d3eb9cc9017235f6b72bb60001b6200041f60201b60201c565b33620002d67fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b6200042260201b620001c61760201c565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200034b7f82e836e7e5281d874ee5645fc72d8d482575c47e4bca072ad511df282e0457e760001b6200041f60201b60201c565b6200037f7f9e3b3f4ba611bdc17efdbf9d78f186e726bb2d810b1bcd34fd1fd716f2b9a56460001b6200041f60201b60201c565b6001600460006101000a81548160ff021916908315150217905550620003ce7f94e3f624a687a9412563a9990c33ac8f75b11451e487fa81d0cdde05aeed581e60001b6200041f60201b60201c565b620004027fe388eac11f0c48917ddd79821b56bb9893b976452ddf13c27eaf9e6531b065a360001b6200041f60201b60201c565b62000416828260006200049460201b60201c565b50505062001ed1565b50565b6000620004587f2543f25c241403ad7af702c8d0bb3b6e69f022c512d84e45f26215c77f15de8460001b62000a6060201b60201c565b6200048c7f77ace90cf234404a7a212508f3e2c69436905f6b9fdfae89240a05ac41bd2ed960001b62000a6060201b60201c565b819050919050565b6060620004ca7f27bd4e5fb2286b7fd835781b1412d39f061b915c341ff6c7fc10291cde35026660001b6200041f60201b60201c565b620004fe7fae5db5a1a903e32fdd5d87b9cb03b3a326bd93293126af6264a8e82ab2dd1a2060001b6200041f60201b60201c565b620005327f6c9c9d3312878098dbdd8f8c30cf6678a2003437b1be9123cf169a55d655a53e60001b6200041f60201b60201c565b6200056b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd914360001b62000a6360201b620002281760201c565b60000160009054906101000a900460ff1615620006f157620005b67fb10c7b8df027e7b04299a86dc08752236008bc663e738b6c8fc895bc4fff3b9b60001b6200041f60201b60201c565b620005ea7fc4a18ac664a2b719c6786e103a7a5821f2069febabe4b81828f77f52748ba51e60001b6200041f60201b60201c565b6200061e7fc9eac6383d532190d43cccc619c1113765a064fece95375d8a32845d2a56fab760001b6200041f60201b60201c565b6200062f8462000ad560201b60201c565b620006637f316a85afa1b7221f7ba679468a27840c9d417519faa3ce905a517954377857ad60001b6200041f60201b60201c565b620006977fde1f59605d8a13fdb45ad55d9273eeb7c2a71dd10d5c3efa588c7bfb5720d1e060001b6200041f60201b60201c565b600067ffffffffffffffff811115620006b557620006b4620019b0565b5b6040519080825280601f01601f191660200182016040528015620006e85781602001600182028036833780820191505090505b50905062000a59565b620007257f47c2f8e3762df33f19fc83d66f995f9888ee3a144c308ba2fad678cbd4c5843560001b6200041f60201b60201c565b620007597f69b9ff91cc086633378873590bbf3caa591a99b80ddd9b7878a4f8c1d7f45bde60001b6200041f60201b60201c565b6200078d7fcc8215dfd09d4a3ff86f4693299cffe0087d1245e5f2d8be5b88231db402724760001b6200041f60201b60201c565b8373ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015620007f857506040513d601f19601f82011682018060405250810190620007f5919062001c62565b60015b620008a257620008317f89acd173a8bebca6ad4afb2cd54c398318170ccc3f9b080825184eeaa4d1e86660001b6200041f60201b60201c565b620008657f3b0c1c3a1f9075236c74ac06beeb5762762d04c9bbb5bd2c5b756aecf3690b7460001b6200041f60201b60201c565b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620008999062001cf5565b60405180910390fd5b620008d67f5d26f005fea9524b3ba4c2de589d4517b6dd664b6c2c19bcb1af2fef1e0f0a1d60001b6200041f60201b60201c565b6200090a7f01836a06f4dc0109ea9f2c2bd56edfbca73d2e740c4a569ac59b28a13e95505160001b6200041f60201b60201c565b6200093e7fc19459a049388ba90460b167062fecd3f469a7d6e740df0dde469c157a6db4e560001b6200041f60201b60201c565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b8114620009a6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200099d9062001d67565b60405180910390fd5b620009da7f0dfbca86ced9e97b008f15bae2c6b9e635bb1d7995d70ebc6d2c1c759900460560001b6200041f60201b60201c565b5062000a0f7fdab0e86b7334fa2449b0b21967e0caf6f87a21a50aa253304e45e9178703565160001b6200041f60201b60201c565b62000a437f1dbc5be8788579762b85852b981f5780715829043ae7e218dcfa70e6494860a260001b6200041f60201b60201c565b62000a5684848462000bef60201b60201c565b90505b9392505050565b50565b600062000a997f428e37f0b78a9584bb08882e92623826034d8fbaf46ae6d1cb3ebacfeb82d24c60001b62000a6060201b60201c565b62000acd7fbb2620e5506c384497bae02cb58c0d890e574995fdc041b53866d64fc40de30f60001b62000a6060201b60201c565b819050919050565b62000b097f8dd5ca9f944151095f1ae44a1a892a73084659656100fc59c1525a7f30a6c26060001b6200041f60201b60201c565b62000b3d7fce8a1355f04aa87e546679f57f57471cf87fa4722428f41deec9d4d0d378b49f60001b6200041f60201b60201c565b62000b717f8e8ed65fa051cb9f45bb30be9e2e8ffd0e9c95fa476650429807a2b8799aad7f60001b6200041f60201b60201c565b8062000bab7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b6200042260201b620001c61760201c565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b606062000c257f60ba64c62c6d7fba48f5dfb6acec24698c345a4043dbb6a8cc2871654c0ed54e60001b6200041f60201b60201c565b62000c597f915181f59aeef79361e0cb6ff8606eef819b541b087a2f84c3e39e82fc20a59660001b6200041f60201b60201c565b62000c8d7f3a81c138e9e4195f9fdf828546bc4ad2927811f7a72151c537ec01cacdc0fa3c60001b6200041f60201b60201c565b62000c9e8462000ecd60201b60201c565b62000cd27fd98e3b0bf5477f277dcce3e869bc7be2bff3f8ec8b87fef47295ce9bf2e7740760001b6200041f60201b60201c565b62000d067f2a98060d2728ae84e9b25fbabe0f38fb8b3d224e8e452604b8af6c3e789ef6ea60001b6200041f60201b60201c565b60008351118062000d145750815b1562000dd55762000d4e7f1e92f8992c28883262ce1acde329dd2e271411f26fe9a7e25ac49485392a5bd060001b6200041f60201b60201c565b62000d827f65d7bee59c67610bbd29accc0914f1b835749abe236ea39d1a6066665a44bda060001b6200041f60201b60201c565b62000db67fb4c93217b08a35647fd911e8bdc8e62006e22524e437ad180a43646b9738198560001b6200041f60201b60201c565b62000dcd84846200106560201b6200028a1760201c565b905062000ec6565b62000e097fd17af5f56496609638bf6925475391a8b6adc4e416c1e24a25a35d58bcc48d0c60001b6200041f60201b60201c565b62000e3d7fcc23e4f6f951fecf9e9c756f73b7e93fe967c1b9e4a86b3ddc804f8687c76d3760001b6200041f60201b60201c565b62000e717f4aca91a4241ace15d2689d01d42a98ab3a4c251fac76631bcadf6c64c39bb3cc60001b6200041f60201b60201c565b600067ffffffffffffffff81111562000e8f5762000e8e620019b0565b5b6040519080825280601f01601f19166020018201604052801562000ec25781602001600182028036833780820191505090505b5090505b9392505050565b62000f017fa174e4f30c4c4b120a741ccfa46196e248a514bff106ec0a01ae3b8b6230885960001b6200041f60201b60201c565b62000f357f85a66fa507c1c425dba7feb936da48b78ce11feec99d8aa1efbad287864925d560001b6200041f60201b60201c565b62000f697f820f7672fb0e719027ca121af255a059cb7262855a4fd759195b87b5beb67e8e60001b6200041f60201b60201c565b62000f7a8162000ad560201b60201c565b62000fae7f7bbf9b54eed91cf1219444d54d614247f4658e5380efbad5072f147fe8e05a7960001b6200041f60201b60201c565b62000fe27fdf2bb960e22ffac9c795b4c712c03869fc503f338113fe2f85041c507524d58760001b6200041f60201b60201c565b62000ff26200115360201b60201c565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f354bd4b6eb65d64e6c79c53fa4f983a5e6bec4824ce4627c71be0b2722f4917e60405160405180910390a450565b60606200109b7f4aefb3a5c5185a52e82a64b9afa2629413625054bb9e29d1e94a0d7ec3ba13c160001b6200125360201b60201c565b620010cf7f4761417868a810b61f5da6305cd0fa8002f8d2c1bf16ee5c6869a2f57ea5467260001b6200125360201b60201c565b620011037f30d5b55c208fd93288018bbb1d20cc115a79dd12a47965daef1ee37b7415a2a060001b6200125360201b60201c565b6200114b83836040518060400160405280601481526020017f44656c65676174652043616c6c204661696c65640000000000000000000000008152506200125660201b60201c565b905092915050565b6000620011897fa294c087509866ccc62d7a47735e364921f5fe243bb788a6db5ee3b6f6bd42f460001b6200041f60201b60201c565b620011bd7f771993e004d2025f516791683df8e66afd14790ecb99d063b67cc3d1a1fab39a60001b6200041f60201b60201c565b620011f17f89fc436bc8ec48bd080ee56ee12040f4173bdf0b43a7402102b43b991c9275bb60001b6200041f60201b60201c565b6200122a7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b6200042260201b620001c61760201c565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b50565b60606200128c7f24228ce5b335e3064b3a0fc5be7b2350ad810339a49a7f0146e4aa3c3e40222a60001b6200125360201b60201c565b620012c07feefd1c1f317e5afddab3ac17b82cf4cb4cea9fa683b3691a6f5bc65cfe9b1dc660001b6200125360201b60201c565b620012f47fda9c99cbea2e9838dd2e3d6a5e6b50152583d0fe082147864d461ef126f3c96860001b6200125360201b60201c565b620013287f58806cac68bafbd658f7f58e49c64ee0b5a9ba9775004f36eeffb95f0e2c153360001b6200125360201b60201c565b6200133e846200151860201b620003581760201c565b62001380576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620013779062001dd9565b60405180910390fd5b620013b47fce2889c0d5ba608733cdd6f4e6783e92b3d19981b72396750f39710d791b2a5e60001b6200125360201b60201c565b620013e87f09714055d1ecc483dd960dfc62f192e0305f2ddeb90a1212bd86e7af6f2ffcb560001b6200125360201b60201c565b6200141c7fd5198ca226af0dee0a5057034dda42ad30da65119fa9149225ca2b0fc2fab1b660001b6200125360201b60201c565b6000808573ffffffffffffffffffffffffffffffffffffffff168560405162001446919062001e48565b600060405180830381855af49150503d806000811462001483576040519150601f19603f3d011682016040523d82523d6000602084013e62001488565b606091505b5091509150620014c17f5738641fac8811b46410eb1eeefe31ef9c66f6c0c751162bc476a1a4a1d5722960001b6200125360201b60201c565b620014f57f2393bd7553b8d42377cbf91e728b4cc862e9c33fc58daa076750ff472ae68f9160001b6200125360201b60201c565b6200150d828286620015d860201b620004001760201c565b925050509392505050565b60006200154e7fb586f9134f8caa5bb6c04be9856d56ad59e1f0bc696bbcdc52e5987009d3bac960001b6200125360201b60201c565b620015827f3e1aa4f98c2a5845841eecc0a7f439a47898469141b0960a4bab38992f659ab660001b6200125360201b60201c565b620015b67f61a99b0ad833d162cd9ec44a14dffbdcdffc0c72cf42495aadd0bdf11624254a60001b6200125360201b60201c565b60008273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60606200160e7f15cf450be8d49212fb9bffffc187261322de8caf9a5443bee396ac2cb297d0b460001b6200125360201b60201c565b620016427fe8848ba89c4c1818efb56a3b3ef79cca9bd96f085c9148a5b66f797933f61e9260001b6200125360201b60201c565b620016767f74b445b0fa40293ce722fcd68709cc059c1e3f6ac7cd622cf887fada021e560760001b6200125360201b60201c565b83156200172257620016b17f674f2dbbac7dc7edd00610248beea465f13d24d05df9687d443107bd716715d760001b6200125360201b60201c565b620016e57fb101e8e5e38593a5ce9823b651856ada6143f9b16160bd34ff7716374e3329df60001b6200125360201b60201c565b620017197f9fa4ba49a7d735b4ed3f15d940e043ce0b3ecff40e4d38b6943a217054df74a160001b6200125360201b60201c565b82905062001915565b620017567fd25e7b4ee9b706507ad513f4687c4a2248d38baf22a7ef83dbf279365ce87cf060001b6200125360201b60201c565b6200178a7ff443a78326b93e9218a7153a7ab527f5c6ac89a34426192f9eba85ea3a49c06860001b6200125360201b60201c565b620017be7f5ea15a4331f10c9ca5bc38c9537d6ec35061aa0075381f3b53a054324f551d8660001b6200125360201b60201c565b6000835111156200183a57620017fd7f89dcfa1c72a918207f365f863513fdd7d82d0cebaaaa9a863b6410b8ce5753a960001b6200125360201b60201c565b620018317f533002a8dc8c6119414837a5f531b84a1aa6baccb0a475fbade9f8beddbe328760001b6200125360201b60201c565b82518084602001fd5b6200186e7f3b1fee95721c1b2ad71ceea80447b81fd34e807c6ad7ac12c1c728e2242c2c5660001b6200125360201b60201c565b620018a27f4d44caef20781ed08c817c86e107c96c6e1083b9d24c1be8b9da294b19646dac60001b6200125360201b60201c565b620018d67f93e4641db52938e0a16e91fdca617940b6756454f76c39056ce3328adef9ea8460001b6200125360201b60201c565b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200190c919062001ead565b60405180910390fd5b9392505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200195d8262001930565b9050919050565b6200196f8162001950565b81146200197b57600080fd5b50565b6000815190506200198f8162001964565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620019ea826200199f565b810181811067ffffffffffffffff8211171562001a0c5762001a0b620019b0565b5b80604052505050565b600062001a216200191c565b905062001a2f8282620019df565b919050565b600067ffffffffffffffff82111562001a525762001a51620019b0565b5b62001a5d826200199f565b9050602081019050919050565b60005b8381101562001a8a57808201518184015260208101905062001a6d565b8381111562001a9a576000848401525b50505050565b600062001ab762001ab18462001a34565b62001a15565b90508281526020810184848401111562001ad65762001ad56200199a565b5b62001ae384828562001a6a565b509392505050565b600082601f83011262001b035762001b0262001995565b5b815162001b1584826020860162001aa0565b91505092915050565b6000806040838503121562001b385762001b3762001926565b5b600062001b48858286016200197e565b925050602083015167ffffffffffffffff81111562001b6c5762001b6b6200192b565b5b62001b7a8582860162001aeb565b9150509250929050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062001bca8262001b84565b915062001bd78362001b84565b92508282101562001bed5762001bec62001b8e565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b6000819050919050565b62001c3c8162001c27565b811462001c4857600080fd5b50565b60008151905062001c5c8162001c31565b92915050565b60006020828403121562001c7b5762001c7a62001926565b5b600062001c8b8482850162001c4b565b91505092915050565b600082825260208201905092915050565b7f496c6c6567616c205555505320436f6e74726163740000000000000000000000600082015250565b600062001cdd60158362001c94565b915062001cea8262001ca5565b602082019050919050565b6000602082019050818103600083015262001d108162001cce565b9050919050565b7f496e76616c6964205555505320436f6e74726163740000000000000000000000600082015250565b600062001d4f60158362001c94565b915062001d5c8262001d17565b602082019050919050565b6000602082019050818103600083015262001d828162001d40565b9050919050565b7f496c6c6567616c20436f6e747261637420416464726573730000000000000000600082015250565b600062001dc160188362001c94565b915062001dce8262001d89565b602082019050919050565b6000602082019050818103600083015262001df48162001db2565b9050919050565b600081519050919050565b600081905092915050565b600062001e1e8262001dfb565b62001e2a818562001e06565b935062001e3c81856020860162001a6a565b80840191505092915050565b600062001e56828462001e11565b915081905092915050565b600081519050919050565b600062001e798262001e61565b62001e85818562001c94565b935062001e9781856020860162001a6a565b62001ea2816200199f565b840191505092915050565b6000602082019050818103600083015262001ec9818462001e6c565b905092915050565b608051610c7362001eea60003960005050610c736000f3fe60806040523661003f576100357f85a05d998bb8cebf41fccd207a0baab721606fa007f409c40bfc4ae956c60c0860001b6100cd565b61003d6100d0565b005b61006b7fc569d0b0f325e320c75e5e384f8dec8ae993c16c96db9dcce429ad0c5eef719160001b6100cd565b6100977f76e0b13ea910b7d59623474a072e47c0e595ca2bd4afa63bc39d8787c72ee9ad60001b6100cd565b6100c37f103275ddbe5f593ed0b80923a62f5fe5d249ed59a5e04992a8834b294d3a396560001b6100cd565b6100cb6100d0565b005b50565b6100fc7fe01ef22390a0ec8e3048cc2d36ffffc51343ae1ff5509316cd571c9256ac0b3660001b6100cd565b6101287fe42a3caca90b864960c93fd1429bc5c4a838d836edc0fac46ec1c39c46954f3a60001b6100cd565b6101547f19affa8a08b5bbeeead6bf695588a5c206fc5b5697f19ab1f78abcaf40a24b3760001b6100cd565b61015c6106cf565b6101887f91ffae2414a35287e7aa9c6968cdf5575fb7a39eda399deeef31120047c9f13560001b6100cd565b6101b47f35ea19239e0fbc0f06fa1ccb217ac57f174a580b10c396ff2b8af438220ca9c660001b6100cd565b6101c46101bf6106fd565b6107d8565b565b60006101f47f2543f25c241403ad7af702c8d0bb3b6e69f022c512d84e45f26215c77f15de8460001b610856565b6102207f77ace90cf234404a7a212508f3e2c69436905f6b9fdfae89240a05ac41bd2ed960001b610856565b819050919050565b60006102567f428e37f0b78a9584bb08882e92623826034d8fbaf46ae6d1cb3ebacfeb82d24c60001b610856565b6102827fbb2620e5506c384497bae02cb58c0d890e574995fdc041b53866d64fc40de30f60001b610856565b819050919050565b60606102b87f4aefb3a5c5185a52e82a64b9afa2629413625054bb9e29d1e94a0d7ec3ba13c160001b610859565b6102e47f4761417868a810b61f5da6305cd0fa8002f8d2c1bf16ee5c6869a2f57ea5467260001b610859565b6103107f30d5b55c208fd93288018bbb1d20cc115a79dd12a47965daef1ee37b7415a2a060001b610859565b61035083836040518060400160405280601481526020017f44656c65676174652043616c6c204661696c656400000000000000000000000081525061085c565b905092915050565b60006103867fb586f9134f8caa5bb6c04be9856d56ad59e1f0bc696bbcdc52e5987009d3bac960001b610859565b6103b27f3e1aa4f98c2a5845841eecc0a7f439a47898469141b0960a4bab38992f659ab660001b610859565b6103de7f61a99b0ad833d162cd9ec44a14dffbdcdffc0c72cf42495aadd0bdf11624254a60001b610859565b60008273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b606061042e7f15cf450be8d49212fb9bffffc187261322de8caf9a5443bee396ac2cb297d0b460001b610859565b61045a7fe8848ba89c4c1818efb56a3b3ef79cca9bd96f085c9148a5b66f797933f61e9260001b610859565b6104867f74b445b0fa40293ce722fcd68709cc059c1e3f6ac7cd622cf887fada021e560760001b610859565b8315610518576104b87f674f2dbbac7dc7edd00610248beea465f13d24d05df9687d443107bd716715d760001b610859565b6104e47fb101e8e5e38593a5ce9823b651856ada6143f9b16160bd34ff7716374e3329df60001b610859565b6105107f9fa4ba49a7d735b4ed3f15d940e043ce0b3ecff40e4d38b6943a217054df74a160001b610859565b8290506106c8565b6105447fd25e7b4ee9b706507ad513f4687c4a2248d38baf22a7ef83dbf279365ce87cf060001b610859565b6105707ff443a78326b93e9218a7153a7ab527f5c6ac89a34426192f9eba85ea3a49c06860001b610859565b61059c7f5ea15a4331f10c9ca5bc38c9537d6ec35061aa0075381f3b53a054324f551d8660001b610859565b600083511115610607576105d27f89dcfa1c72a918207f365f863513fdd7d82d0cebaaaa9a863b6410b8ce5753a960001b610859565b6105fe7f533002a8dc8c6119414837a5f531b84a1aa6baccb0a475fbade9f8beddbe328760001b610859565b82518084602001fd5b6106337f3b1fee95721c1b2ad71ceea80447b81fd34e807c6ad7ac12c1c728e2242c2c5660001b610859565b61065f7f4d44caef20781ed08c817c86e107c96c6e1083b9d24c1be8b9da294b19646dac60001b610859565b61068b7f93e4641db52938e0a16e91fdca617940b6756454f76c39056ce3328adef9ea8460001b610859565b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106bf9190610b51565b60405180910390fd5b9392505050565b6106fb7f9db93acdb6ea0ff5758412467199e5e9dd81ea11a48fca13b92557ed66de012160001b6100cd565b565b600061072b7fa294c087509866ccc62d7a47735e364921f5fe243bb788a6db5ee3b6f6bd42f460001b610ab5565b6107577f771993e004d2025f516791683df8e66afd14790ecb99d063b67cc3d1a1fab39a60001b610ab5565b6107837f89fc436bc8ec48bd080ee56ee12040f4173bdf0b43a7402102b43b991c9275bb60001b610ab5565b6107af7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b6101c6565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6108047fc7812d4a390fbda37fee612d18ad552a532ce5e25c7a8aa081cbeb9ce3d4c3ad60001b6100cd565b6108307f3bb7ae69bcbcb46aad6bd2208d751f0de1ccdfe170302be0d7e51f0f0646ec2060001b6100cd565b3660008037600080366000845af43d6000803e8060008114610851573d6000f35b3d6000fd5b50565b50565b606061088a7f24228ce5b335e3064b3a0fc5be7b2350ad810339a49a7f0146e4aa3c3e40222a60001b610859565b6108b67feefd1c1f317e5afddab3ac17b82cf4cb4cea9fa683b3691a6f5bc65cfe9b1dc660001b610859565b6108e27fda9c99cbea2e9838dd2e3d6a5e6b50152583d0fe082147864d461ef126f3c96860001b610859565b61090e7f58806cac68bafbd658f7f58e49c64ee0b5a9ba9775004f36eeffb95f0e2c153360001b610859565b61091784610358565b610956576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094d90610bbf565b60405180910390fd5b6109827fce2889c0d5ba608733cdd6f4e6783e92b3d19981b72396750f39710d791b2a5e60001b610859565b6109ae7f09714055d1ecc483dd960dfc62f192e0305f2ddeb90a1212bd86e7af6f2ffcb560001b610859565b6109da7fd5198ca226af0dee0a5057034dda42ad30da65119fa9149225ca2b0fc2fab1b660001b610859565b6000808573ffffffffffffffffffffffffffffffffffffffff1685604051610a029190610c26565b600060405180830381855af49150503d8060008114610a3d576040519150601f19603f3d011682016040523d82523d6000602084013e610a42565b606091505b5091509150610a737f5738641fac8811b46410eb1eeefe31ef9c66f6c0c751162bc476a1a4a1d5722960001b610859565b610a9f7f2393bd7553b8d42377cbf91e728b4cc862e9c33fc58daa076750ff472ae68f9160001b610859565b610aaa828286610400565b925050509392505050565b50565b600081519050919050565b600082825260208201905092915050565b60005b83811015610af2578082015181840152602081019050610ad7565b83811115610b01576000848401525b50505050565b6000601f19601f8301169050919050565b6000610b2382610ab8565b610b2d8185610ac3565b9350610b3d818560208601610ad4565b610b4681610b07565b840191505092915050565b60006020820190508181036000830152610b6b8184610b18565b905092915050565b7f496c6c6567616c20436f6e747261637420416464726573730000000000000000600082015250565b6000610ba9601883610ac3565b9150610bb482610b73565b602082019050919050565b60006020820190508181036000830152610bd881610b9c565b9050919050565b600081519050919050565b600081905092915050565b6000610c0082610bdf565b610c0a8185610bea565b9350610c1a818560208601610ad4565b80840191505092915050565b6000610c328284610bf5565b91508190509291505056fea2646970667358221220249afb5cb12442ac0c3a12870d4ed6b32f23a61cdc5abf36a62289e991e2d85464736f6c634300080f0033";

type ProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Proxy__factory extends ContractFactory {
  constructor(...args: ProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    logic: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<Proxy> {
    return super.deploy(logic, data, overrides || {}) as Promise<Proxy>;
  }
  override getDeployTransaction(
    logic: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(logic, data, overrides || {});
  }
  override attach(address: string): Proxy {
    return super.attach(address) as Proxy;
  }
  override connect(signer: Signer): Proxy__factory {
    return super.connect(signer) as Proxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProxyInterface {
    return new utils.Interface(_abi) as ProxyInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Proxy {
    return new Contract(address, _abi, signerOrProvider) as Proxy;
  }
}
