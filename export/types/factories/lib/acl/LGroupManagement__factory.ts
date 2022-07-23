/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  LGroupManagement,
  LGroupManagementInterface,
} from "../../../lib/acl/LGroupManagement";

const _abi = [
  {
    inputs: [],
    name: "LIB_NAME",
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
    inputs: [],
    name: "LIB_VERSION",
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
];

const _bytecode =
  "0x612762610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100875760003560e01c8063745311f811610065578063745311f81461010a5780637c95bcdf1461013b578063bec9475114610178578063f728a0f51461019657610087565b806313ee73021461008c5780632466209b146100bc5780634ba84563146100da575b600080fd5b6100a660048036038101906100a19190611a68565b6101d3565b6040516100b39190611b66565b60405180910390f35b6100c4610281565b6040516100d19190611b97565b60405180910390f35b6100f460048036038101906100ef9190611bb2565b6102a9565b6040516101019190611c20565b60405180910390f35b610124600480360381019061011f9190611a68565b610393565b604051610132929190611cd4565b60405180910390f35b81801561014757600080fd5b50610162600480360381019061015d9190611d30565b6104f0565b60405161016f9190611c20565b60405180910390f35b610180610f00565b60405161018d9190611b97565b60405180910390f35b8180156101a257600080fd5b506101bd60048036038101906101b89190611de8565b610f28565b6040516101ca9190611b97565b60405180910390f35b60606102017f50473cf38afd4ee2fae51c5ec36e73644c7ecf5c3ce9af93e4534984452b949860001b611679565b61022d7fd01f6184f958c9cf6eba82d40f8825fcd6481547c4bdeff200a1c518e559cf4660001b611679565b6102597f6720148e8ece932baf0bcc638861c2979e46ddd5a4c82c292c9a75bfb6ad51e660001b611679565b61027983600401600084815260200190815260200160002060020161167c565b905092915050565b60405160200161029090611eb3565b6040516020818303038152906040528051906020012081565b60006102d77f7d49a1db0491562a4492e8127d5cbcd25e793f22010b06e0a87cc9b8c82d9c2160001b611679565b6103037f0d57481f024d03c9ef4e30d5ef133a4453aef94aceeb608f1a39914e7865f67f60001b611679565b61032f7f85646f75437ed328a55bbf25e0595344da6486c7be826e191e2200b5af6b4bf560001b611679565b6000846004016000858152602001908152602001600020600001805461035490611ef7565b90501415801561038a57506103898285600401600086815260200190815260200160002060020161171590919063ffffffff16565b5b90509392505050565b606060006103c37ff9b7184219a65abe85ae16ec946b0ea2b8000b28689b646e53a8288f0029d99360001b611679565b6103ef7ff77a0fed789a6b779b0727f7e14b3b623da5bec5cf86bd6037a1d9fbf640535060001b611679565b61041b7f62b19dbbd0b6cf0928a4eeddbb5585cce35c7e1aee41ee098c3b42decada7e5c60001b611679565b83600401600084815260200190815260200160002060000184600401600085815260200190815260200160002060010160009054906101000a900460ff1681805461046590611ef7565b80601f016020809104026020016040519081016040528092919081815260200182805461049190611ef7565b80156104de5780601f106104b3576101008083540402835291602001916104de565b820191906000526020600020905b8154815290600101906020018083116104c157829003601f168201915b50505050509150915091509250929050565b600061051e7f1aea5713fa77acc8873840c9cfc0cf730abdd5543083d81e80a9e1ba2471bb9e60001b611679565b61054a7f1662880086e90404343cb3d347700f7502eee84ff3debef2f2958d9c44d5692160001b611679565b6105767fca9aa10ffd09d95307c5615587197c85c6d4d70b20b8697a7ce425fd2428df9960001b611679565b6105a27fa890a95f243598c21a9b2bf855319e0cc667232ec059ab3635f8b1a750d6619660001b611679565b3073ffffffffffffffffffffffffffffffffffffffff1663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105ed573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106119190611f3d565b15610651576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064890611fc7565b60405180910390fd5b61067d7f2cda379eb599b9b828d966d89d6e34d4b6b00c7959d291692e16048aaafaf1a160001b611679565b6106a97fd1dd7e5fb8c0ed3cd5e14d33c2914bb7f4e8b3d4771a550c6214a65da411dd8e60001b611679565b6106d57fd0b2840fe7d6c14b469465e0dbcb031522348b82e2927b1cc079f772a9e431d460001b611679565b6040516020016106e490612033565b604051602081830303815290604052805190602001208303610b555761072c7f8399657b8449bb9e3ed4dbab20deca462bbf2eed0bff8090344eb220d105f10460001b611679565b6107587f501ee94215cb75373569e6e867a9ccc60df3ef294ef14cf1d52814e8e3ac87d360001b611679565b6107847f81f3d790a37511199fa81d13a248af613a30b8ce9ffe9352ddaa45a61eedbf0d60001b611679565b600061078f306117b0565b90506107bd7f3814942508b5c48322174b4091244630affb81805a857295b6db229653b99b7660001b611679565b6107e97fa0dc425d66a322572ef5b443cd605effa45364c2d37d60d332e7bc18288f341e60001b611679565b6000638b7dbd6c60e01b90506108217fdc1321f1b259a040fc032b12b1d76eb390cf0582ec9949f9ca5c27481ea16ddc60001b611679565b61084d7fe59a291eb06e626c867e4885f9ba8de32ea51fe3fa83a5128b337844f9c1112f60001b611679565b60008660010160008481526020019081526020016000206002016000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019081526020016000206000015490506108e87f8c237f940b3fd894e083409f397d31a985c51d852600cee29e60bf3f9603bdd060001b611679565b6109147f2f7c347a2d81d99fdd9a8dd993cce738c8f61dc58fe018c16a5f71512087df5a60001b611679565b6109407f500d3ca15b35a37603b2fd9a90422cd944b568d3998c2c468f48c7c51edbe37a60001b611679565b86600101600084815260200190815260200160002060010160149054906101000a900460ff168015610a0d57506001600281111561098157610980612048565b5b8760010160008581526020019081526020016000206002016000847bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060010160009054906101000a900460ff166002811115610a0b57610a0a612048565b5b145b8015610a53575086600301600088600101600086815260200190815260200160002060000154815260200190815260200160002060010160009054906101000a900460ff165b8015610ae2575060016002811115610a6e57610a6d612048565b5b8760000160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002060009054906101000a900460ff166002811115610ae057610adf612048565b5b145b610b21576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b18906120c3565b60405180910390fd5b610b4d7ffa8d26e25378fd99511bd2b3a20d03e4e145bf91d194984d721a45a3f2cee94660001b611679565b505050610cfe565b610b817f941334fdeb59e1bfdc73a17c8322181dda5e76d59e93c96b0893133f7b130d3e60001b611679565b610bad7f773648ae8944172db83887929e3132f3c775f1e8b432ed1248c83fa5e6cb5a4a60001b611679565b610bd97f0873fb42cfa9176fa31fc9ba613bf94c446e7343d8660d4e2fb2a419ea08e5f160001b611679565b610c057ff4dce9ed7b54bc1e11d46039b41fc953be793bdf29da9cbf0ce9145c8c14e18560001b611679565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c696085610c29306117b0565b3363b6c03f0360e01b6040518563ffffffff1660e01b8152600401610c519493929190612166565b602060405180830381865af4158015610c6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c929190611f3d565b610cd1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cc8906120c3565b60405180910390fd5b610cfd7fcbc90814b754118647e2226e8d5b3e3cc45a5f54deb4ef31ec8fd42a4527329a60001b611679565b5b610d2a7f01089e93d12c0936388929b90ab10595c7b665a1ea4593d557df6e7614af10c060001b611679565b610d567f29899de5abbfbd4b334bf7396614310f47bfcdbe3a70bfef687396d161f1890260001b611679565b610d827f84f6b9ec37e06e760310e9649e0ad26639460acf98a6b707f11ca4697c2fd7e060001b611679565b60008460040160008581526020019081526020016000206000018054610da790611ef7565b905003610de9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610de0906121f7565b60405180910390fd5b610e157f5d3910f3e5bdf09aae1d19c0956ca360bdc0cc0b0b51b474bee46a93470a4eb860001b611679565b610e417f1805338c365937ae83093d5125e87a743bec8937ee68d22907a3c3202e543aa160001b611679565b610e6d7f22f0985502cdf0f6c763d443e94592368dad787a39504aeb70e5869ad9c7388260001b611679565b8184600401600085815260200190815260200160002060010160006101000a81548160ff021916908315150217905550610ec97fd2addedb8c299831b44992b050b960df718a2eeff8f07b4f6ef7c35bdb7aca4160001b611679565b610ef57f9271af451ef4d9024d796b21613ba1357f6d620801006d067a1f50a3b26f623360001b611679565b600190509392505050565b604051602001610f0f90612263565b6040516020818303038152906040528051906020012081565b6000610f567f0c00b5a2d0f72caadb4ef79ebb505361ec4a7a199a7ef97dd2ead70ae607146560001b611679565b610f827f913183619300563fa54d00c1f17e9067d5385984f6947c2ce84846fff0c8d41660001b611679565b610fae7fdd540db4b6eae7c6491cbbee0fc1b17cb3571874ea332a462e2e659e347cdc1b60001b611679565b610fda7f846b982a312bc7a64dc1b6f6cde80e5a8f022f006e5f1f70ad9fa48beb619eb160001b611679565b3073ffffffffffffffffffffffffffffffffffffffff1663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611025573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110499190611f3d565b15611089576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161108090611fc7565b60405180910390fd5b6110b57f26f0030f61aa9e51f5bd8f4b461e9e76ab460ef363aa8a336b3d0ff907c59ce960001b611679565b6110e17f867896f2f4c7ec2fa906def5fae41121f4f498c48206d2070e6750dc7788155b60001b611679565b61110d7fd8d6abf66dcd94be52910d392a8a5ba052dac0907d47e71581ebd5587673297a60001b611679565b6111397f9dfe17d2fa39c716df2a190555fa626dcedb3840dd5b9942a6826fa6e8ea26d660001b611679565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608661115d306117b0565b33633f4c99b860e01b6040518563ffffffff1660e01b81526004016111859493929190612166565b602060405180830381865af41580156111a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111c69190611f3d565b611205576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111fc906122c4565b60405180910390fd5b6112317ffb5e0497270451052adc49519d475307fc252bf23350d37abfddb3008f1af0cf60001b611679565b61125d7fee71a7946e5e0337850423959c88ae542febc5c960a78ba87b736d29f58d0f1c60001b611679565b6112897fe91420caea010b86706318120f8d310ab321c0d7020fbf6d3e12e0c0dc3d144a60001b611679565b6112b57f68e22d1202795e13ba6c93889c1a9b470adf6a9ff1c1355c62678f1025408dfb60001b611679565b600084849050036112fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112f290612330565b60405180910390fd5b6113277f8baddac53a138141aa33f0eaad02bb22c474d5a96ed9f89f1ca6d49baa5b3afe60001b611679565b6113537f1368048a3000b18f275d119a0becbcc60343e5009195367583f1b10f77be6fe260001b611679565b61137f7f08fe1bbc109307efa3469cb5e41eb4ab9ab1c9d0157d3e417b453122ff9a312760001b611679565b60008484604051602001611394929190612384565b6040516020818303038152906040528051906020012090506113d87f4384de6c80c2b92a49334c3d61d8305627170c99f3c4ce16233b1f9b334cebf660001b611679565b6114047f8246c81d42d55e0f39f645df6049ade056ac0f5d6017fd53c6a995008dde0dda60001b611679565b6114307fde3a9f84ee6a29f855724c8da6fffb6df80bb01ccd45c5c20c9cc208eeba559c60001b611679565b6000866004016000838152602001908152602001600020600001805461145590611ef7565b905014611497576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161148e906123e9565b60405180910390fd5b6114c37f62f2a86876d238eee5f14450bc836351a272cd35a8a814ea70b9c1e9f790a74d60001b611679565b6114ef7f99e0a61fd51145c53cdcbb25c3181a036f5a90b82f85e46def372aa0cd015e6a60001b611679565b61151b7fcedd06bf3750e0090339bb4fedcf48d13e4b841d52fdcb07719f9e11f1a281a860001b611679565b600086600401600083815260200190815260200160002090506115607f045c9c085cdf976a7dd32f7c13f3264649b345a9a9c8c0f4f9484a632d44c25660001b611679565b61158c7f7fe30b8a5e0be72c3395d612447de3145502e8605b37a36ef30b5ef2dd6a25cc60001b611679565b858582600001918261159f9291906125f9565b506115cc7f0e95d40908f29b964525df2b8ffe1c4464e4a2f354c583623bc3ae2391a4030060001b611679565b6115f87fa5f4fd10107bff054bb20bce7bfebd8ebcf8c6be290b72294d4e0fcd9f2e65c660001b611679565b838160010160006101000a81548160ff0219169083151502179055506116407f48e8ea1097372a1c2fd1da6715c9f0000818644ee35dd5a4d7684dad54fdc30760001b611679565b61166c7f3a22423c0542d00fea61373cbc89f4ab53c1f8e05f95518eff76ad5bf4ffa15260001b611679565b8192505050949350505050565b50565b60606116aa7fa76f9081705c09b40c5bb258641a059b5edb1b369e94c5910cb913ad447c2daf60001b611864565b6116d67f2d791472c96d5477567ab34b9319743a172f4487fdab393572f0a103487c26f660001b611864565b6117027f2ddb3421b1a5cd417c9c5ce922ce49f690a812e7cef705dc8d1f23741226728760001b611864565b61170e82600001611867565b9050919050565b60006117437fa701fa91585bd09ffe7f93af08c6165f82bec0fc59466e927dde1dbae5c307a760001b611864565b61176f7f35ed0fcca8a0eeb56ae9c7249452624f578230dea92688664e06e57c6419d79c60001b611864565b61179b7f0192864fd4053cdbe7919f30b0502d475d0a2a5c7c8bbb4d798412f42bf8824f60001b611864565b6117a88360000183611947565b905092915050565b60006117de7f7d0a77d1412e418bdea6c7f139982fabb409ba7514006c1501b9f70d9f01612060001b6119ef565b61180a7fdbd8e6eebd3063b161d109dbb67c94cbacefa8e2b8e8b6c9c7f2d92bdf8ba1e360001b6119ef565b6118367fe386ce31128070ddde557064dcaa5ca226526fadde834636cfb9ade9360f722b60001b6119ef565b816040516020016118479190612711565b604051602081830303815290604052805190602001209050919050565b50565b60606118957f59903436ca438b77c84438d2d51e0d44e6bcddc59d391b1336019288c112da2b60001b611864565b6118c17f0f58450b97108082236266dd393605c64c9d2a40244817c36f3acae7b2e9b1ac60001b611864565b6118ed7f61b5b1eb4ac652eed9752156ae49a84e09dcbe032cfb0bbf7e79ae6d41bb02ea60001b611864565b8160000180548060200260200160405190810160405280929190818152602001828054801561193b57602002820191906000526020600020905b815481526020019060010190808311611927575b50505050509050919050565b60006119757fc221a598bc00c6bc8058b42b8590bb41c54d851cd882acf7d38a096d0f5d0e0560001b611864565b6119a17f8844ceeb186457af4a27dfa6a592dc06964f240cac441c138067cff08bd884d660001b611864565b6119cd7f5403c1ee6b530a4159ed2facd19b46a4674e8bb421931c8bb212ff2491a06e4260001b611864565b6000836001016000848152602001908152602001600020541415905092915050565b50565b600080fd5b600080fd5b6000819050919050565b611a0f816119fc565b8114611a1a57600080fd5b50565b600081359050611a2c81611a06565b92915050565b6000819050919050565b611a4581611a32565b8114611a5057600080fd5b50565b600081359050611a6281611a3c565b92915050565b60008060408385031215611a7f57611a7e6119f2565b5b6000611a8d85828601611a1d565b9250506020611a9e85828601611a53565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611add81611a32565b82525050565b6000611aef8383611ad4565b60208301905092915050565b6000602082019050919050565b6000611b1382611aa8565b611b1d8185611ab3565b9350611b2883611ac4565b8060005b83811015611b59578151611b408882611ae3565b9750611b4b83611afb565b925050600181019050611b2c565b5085935050505092915050565b60006020820190508181036000830152611b808184611b08565b905092915050565b611b9181611a32565b82525050565b6000602082019050611bac6000830184611b88565b92915050565b600080600060608486031215611bcb57611bca6119f2565b5b6000611bd986828701611a1d565b9350506020611bea86828701611a53565b9250506040611bfb86828701611a53565b9150509250925092565b60008115159050919050565b611c1a81611c05565b82525050565b6000602082019050611c356000830184611c11565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611c75578082015181840152602081019050611c5a565b83811115611c84576000848401525b50505050565b6000601f19601f8301169050919050565b6000611ca682611c3b565b611cb08185611c46565b9350611cc0818560208601611c57565b611cc981611c8a565b840191505092915050565b60006040820190508181036000830152611cee8185611c9b565b9050611cfd6020830184611c11565b9392505050565b611d0d81611c05565b8114611d1857600080fd5b50565b600081359050611d2a81611d04565b92915050565b600080600060608486031215611d4957611d486119f2565b5b6000611d5786828701611a1d565b9350506020611d6886828701611a53565b9250506040611d7986828701611d1b565b9150509250925092565b600080fd5b600080fd5b600080fd5b60008083601f840112611da857611da7611d83565b5b8235905067ffffffffffffffff811115611dc557611dc4611d88565b5b602083019150836001820283011115611de157611de0611d8d565b5b9250929050565b60008060008060608587031215611e0257611e016119f2565b5b6000611e1087828801611a1d565b945050602085013567ffffffffffffffff811115611e3157611e306119f7565b5b611e3d87828801611d92565b93509350506040611e5087828801611d1b565b91505092959194509250565b600081905092915050565b7f312e302e30000000000000000000000000000000000000000000000000000000600082015250565b6000611e9d600583611e5c565b9150611ea882611e67565b600582019050919050565b6000611ebe82611e90565b9150819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611f0f57607f821691505b602082108103611f2257611f21611ec8565b5b50919050565b600081519050611f3781611d04565b92915050565b600060208284031215611f5357611f526119f2565b5b6000611f6184828501611f28565b91505092915050565b600082825260208201905092915050565b7f536166654d6f64653a2043616c6c2052656a6563746564000000000000000000600082015250565b6000611fb1601783611f6a565b9150611fbc82611f7b565b602082019050919050565b60006020820190508181036000830152611fe081611fa4565b9050919050565b7f4c4956454c595f47454e4552414c5f47524f5550000000000000000000000000600082015250565b600061201d601483611e5c565b915061202882611fe7565b601482019050919050565b600061203e82612010565b9150819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f53657447726f7570537461747573204163636573732044656e69656400000000600082015250565b60006120ad601c83611f6a565b91506120b882612077565b602082019050919050565b600060208201905081810360008301526120dc816120a0565b9050919050565b8082525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000612115826120ea565b9050919050565b6121258161210a565b82525050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6121608161212b565b82525050565b600060808201905061217b60008301876120e3565b6121886020830186611b88565b612195604083018561211c565b6121a26060830184612157565b95945050505050565b7f47726f7570204e6f7420466f756e640000000000000000000000000000000000600082015250565b60006121e1600f83611f6a565b91506121ec826121ab565b602082019050919050565b60006020820190508181036000830152612210816121d4565b9050919050565b7f4c47726f75704d616e6167656d656e7400000000000000000000000000000000600082015250565b600061224d601083611e5c565b915061225882612217565b601082019050919050565b600061226e82612240565b9150819050919050565b7f526567697374657247726f7570204163636573732044656e6965640000000000600082015250565b60006122ae601b83611f6a565b91506122b982612278565b602082019050919050565b600060208201905081810360008301526122dd816122a1565b9050919050565b7f47726f7570204e616d6520496e76616c69640000000000000000000000000000600082015250565b600061231a601283611f6a565b9150612325826122e4565b602082019050919050565b600060208201905081810360008301526123498161230d565b9050919050565b82818337600083830152505050565b600061236b8385611e5c565b9350612378838584612350565b82840190509392505050565b600061239182848661235f565b91508190509392505050565b7f47726f757020416c726561647920526567697374657265640000000000000000600082015250565b60006123d3601883611f6a565b91506123de8261239d565b602082019050919050565b60006020820190508181036000830152612402816123c6565b9050919050565b600082905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026124a57fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612468565b6124af8683612468565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006124f66124f16124ec846124c7565b6124d1565b6124c7565b9050919050565b6000819050919050565b612510836124db565b61252461251c826124fd565b848454612475565b825550505050565b600090565b61253961252c565b612544818484612507565b505050565b5b818110156125685761255d600082612531565b60018101905061254a565b5050565b601f8211156125ad5761257e81612443565b61258784612458565b81016020851015612596578190505b6125aa6125a285612458565b830182612549565b50505b505050565b600082821c905092915050565b60006125d0600019846008026125b2565b1980831691505092915050565b60006125e983836125bf565b9150826002028217905092915050565b6126038383612409565b67ffffffffffffffff81111561261c5761261b612414565b5b6126268254611ef7565b61263182828561256c565b6000601f831160018114612660576000841561264e578287013590505b61265885826125dd565b8655506126c0565b601f19841661266e86612443565b60005b8281101561269657848901358255600182019150602085019450602081019050612671565b868310156126b357848901356126af601f8916826125bf565b8355505b6001600288020188555050505b50505050505050565b60008160601b9050919050565b60006126e1826126c9565b9050919050565b60006126f3826126d6565b9050919050565b61270b6127068261210a565b6126e8565b82525050565b600061271d82846126fa565b6014820191508190509291505056fea2646970667358221220f21bd173c4c298de1b91b176eb23ca47759702b0f7e89db1c538d469fccf2ae364736f6c634300080f0033";

type LGroupManagementConstructorParams =
  | [linkLibraryAddresses: LGroupManagementLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LGroupManagementConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class LGroupManagement__factory extends ContractFactory {
  constructor(...args: LGroupManagementConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(
        _abi,
        LGroupManagement__factory.linkBytecode(linkLibraryAddresses),
        signer
      );
    }
  }

  static linkBytecode(
    linkLibraryAddresses: LGroupManagementLibraryAddresses
  ): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$c43b1d7058274a71a9734d16e6b6586431\\$__", "g"),
      linkLibraryAddresses[
        "src/contracts/lib/acl/LAccessControl.sol:LAccessControl"
      ]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LGroupManagement> {
    return super.deploy(overrides || {}) as Promise<LGroupManagement>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LGroupManagement {
    return super.attach(address) as LGroupManagement;
  }
  override connect(signer: Signer): LGroupManagement__factory {
    return super.connect(signer) as LGroupManagement__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LGroupManagementInterface {
    return new utils.Interface(_abi) as LGroupManagementInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LGroupManagement {
    return new Contract(address, _abi, signerOrProvider) as LGroupManagement;
  }
}

export interface LGroupManagementLibraryAddresses {
  ["src/contracts/lib/acl/LAccessControl.sol:LAccessControl"]: string;
}
