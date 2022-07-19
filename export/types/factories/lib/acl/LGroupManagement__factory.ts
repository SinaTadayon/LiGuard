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
  "0x612242610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100875760003560e01c8063bec9475111610065578063bec947511461010a578063d6825cba14610128578063f43dcac214610159578063f728a0f51461019657610087565b806313ee73021461008c5780632466209b146100bc5780634ba84563146100da575b600080fd5b6100a660048036038101906100a19190611644565b6101d3565b6040516100b39190611742565b60405180910390f35b6100c4610281565b6040516100d19190611773565b60405180910390f35b6100f460048036038101906100ef919061178e565b6102a9565b60405161010191906117fc565b60405180910390f35b610112610474565b60405161011f9190611773565b60405180910390f35b610142600480360381019061013d9190611644565b61049c565b6040516101509291906118b0565b60405180910390f35b81801561016557600080fd5b50610180600480360381019061017b919061190c565b6105f9565b60405161018d91906117fc565b60405180910390f35b8180156101a257600080fd5b506101bd60048036038101906101b891906119c4565b610b04565b6040516101ca9190611773565b60405180910390f35b60606102017f67f050d44d9b97df399ba4c154e08cd4a2a7c6fe847d567106aa955810d6b9f660001b611255565b61022d7f15a2ce99afe1d9c7915a31fcc4ef35f9421d7468923bcdde9f7d637be660347360001b611255565b6102597f4ec5291212514b3b551061bac1951050a00bc8973fa79169af8d817c9ad1c1b260001b611255565b610279836004016000848152602001908152602001600020600201611258565b905092915050565b60405160200161029090611a8f565b6040516020818303038152906040528051906020012081565b60006102d77f7cc63b2ce9bedf757180d9d734112704fa5efe958db72b67338ca8fdc94f3bc960001b611255565b6103037f35d7f76410c5e77382d143554b0328cb0b6b9a78361736ba3c92a0774e0e956060001b611255565b61032f7f751e6aa2471eed4fa496a255559408b9afa7c0f041dced0f3bcfa7e5d07a5ea260001b611255565b6000846004016000858152602001908152602001600020600001805461035490611ad3565b9050036103bc576103877f6956800d99909fc1e48b199d7163114ce1a42e1c04e80100ea11620cfb328c2360001b611255565b6103b37f20cfa9973b71a04608872bbf21cde15778ddcdcdf073cbe65c0bda8d7254cdd860001b611255565b6000905061046d565b6103e87f70e716e75b963dc5e9672d8c2a646a9690ba206b0cd6dc7b5aceafd8ea9bd80560001b611255565b6104147fd0847132d085f253fecc1387a4dc98275c8c38576e8146b8bd6d6476bd485ca160001b611255565b6104407f66cd27617e352ffee09d4fcaadcf9d510476757b9a559cb755e766d794dcd1e560001b611255565b61046a828560040160008681526020019081526020016000206002016112f190919063ffffffff16565b90505b9392505050565b60405160200161048390611b50565b6040516020818303038152906040528051906020012081565b606060006104cc7f7c49e6eaf663cd5a7955ebc88285cf650cf47cc01cc8301014659e394d9e6f9a60001b611255565b6104f87fbda5a0f02cde2a785a5d48c762d98c389cc088ca39c3cb2a80babb7ce4ca0cb160001b611255565b6105247fbb5f11d3a3357d2666f05549d99b2fd0c9a5c5e5ac448c9341e794e0992cd12760001b611255565b83600401600084815260200190815260200160002060000184600401600085815260200190815260200160002060010160009054906101000a900460ff1681805461056e90611ad3565b80601f016020809104026020016040519081016040528092919081815260200182805461059a90611ad3565b80156105e75780601f106105bc576101008083540402835291602001916105e7565b820191906000526020600020905b8154815290600101906020018083116105ca57829003601f168201915b50505050509150915091509250929050565b60006106277f6c116ea75d132fb6b5324037f7e7518e4cdb70612c343295efeaf827f24770a860001b611255565b6106537fa07218cd5b1ad1dbdee19fdb272801aea60aa697df87c8aa11d41984c15447fc60001b611255565b61067f7ff58db1b3644c3e6f7d6eff9a7968ed7a43a0bd0c1e833e289a16f29d715c19c060001b611255565b6106ab7fb1f25ce18dbf2a755773f2875cc6719b30af3747dedb40c0adfa509ef14e519960001b611255565b3073ffffffffffffffffffffffffffffffffffffffff1663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156106f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061071a9190611b7a565b1561075a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161075190611c04565b60405180910390fd5b6107867f19b8795efff48097b4af0995da11f2fe87bbb20091c0b116fe5f160a5bb87c3d60001b611255565b6107b27f8c944edfc1296f9e208becfe29275cdbf73b00b39c7d031ff2a680f6028787dc60001b611255565b6107de7ff428e525ca02ca5d68e9f0569711c2ed1662b9e97c2c043cdaceff2637225a5160001b611255565b61080a7f6bd8b7b04cd4f788bb8331c9db665d54b3ead125c4251963a80cd008d421ed9a60001b611255565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608561082e3061138c565b3363ae2d44ce60e01b6040518563ffffffff1660e01b81526004016108569493929190611ca7565b602060405180830381865af4158015610873573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108979190611b7a565b6108d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108cd90611d38565b60405180910390fd5b6109027ffefc37dc43cd03697f4e7ebb6725a92b1a70ae6e034d8e14eac250ff75ad1d0360001b611255565b61092e7f634c677aa7f9bbe7a8d3d7c2d758215632544a69f9c736a98f6f02a21760babb60001b611255565b61095a7ffc1d999f39fcc477572570145ba3b7490d933f6d5330026bd69d9814b2773f2c60001b611255565b6109867f934867cddb6e7fcfa0bd6c2aa5e4ab9006ba8fe4defda40a1f236e4272fc831f60001b611255565b600084600401600085815260200190815260200160002060000180546109ab90611ad3565b9050146109ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e490611da4565b60405180910390fd5b610a197fc5b65f65c9e4bd4b98ec205e984ff46850e2eb7a044aa4907c42acf77a08e1cb60001b611255565b610a457f28280b694c479789f83f6efe4187eeae88361d1bc9e020b9a1967168bcdda98360001b611255565b610a717fb6160e1271a7d3dfd571778fc043bc9916be20a1662718aca057a8f71c7fc17a60001b611255565b8184600401600085815260200190815260200160002060010160006101000a81548160ff021916908315150217905550610acd7f6bf7ad2e2f2c8d793fbc7cdef10d5a73ab62dd9c76fba2b88767913405efef4d60001b611255565b610af97f0f5dafef96ce445215d1d258051d36367201c6865ec96d82a0f4d5c1c2d9850c60001b611255565b600190509392505050565b6000610b327f84c7a23435417dfbf1e9b5eaa645f1680322c8f3fc8a0691698dde255df9a90f60001b611255565b610b5e7f6d6cd35b30d974f06cfb6356f80ef23c665c5c9b282d2f00c7f5c2eb68221d5c60001b611255565b610b8a7fc3e37e7766b8dc5b71c16f7a75f73f475c19f4e9310d79b36b436529862452fe60001b611255565b610bb67f3bf5b68b2da1a37e766829530b797589d6fae6c55095408306551d11ebaf2a4460001b611255565b3073ffffffffffffffffffffffffffffffffffffffff1663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610c01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c259190611b7a565b15610c65576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c5c90611c04565b60405180910390fd5b610c917f5a04c244adb7da61a3a8362e1a999b5e915e650814d3e5d4347c6f0eeb8cda9a60001b611255565b610cbd7fd14144812d3d42f04b75a98dbcd337951644e21fb934cc4408c79b0901b1393b60001b611255565b610ce97fc58437ab075e2f27c36b85fab7b901c5c913c3971502d100069cc87614639dac60001b611255565b610d157f528dce3e8cc73b0b068712430bc7b60eae355826518ec40ed5172c1969e6d61560001b611255565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c696086610d393061138c565b33633f4c99b860e01b6040518563ffffffff1660e01b8152600401610d619493929190611ca7565b602060405180830381865af4158015610d7e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da29190611b7a565b610de1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dd890611d38565b60405180910390fd5b610e0d7f9b6e74bffd48179c0a66e009be0da5d02105179dd2600b482d5c01fe6d5f77d060001b611255565b610e397f9254263ef13933a7c6b3408f8ca17b954ca2f3ff5c2525b646478515394eebd460001b611255565b610e657fd1707360c74918a21c1914cc99e49cce23e2570823a4b834c0f198610c330dd160001b611255565b610e917faca68ae0e0135a1cb5b0a7a9ab092e82be541af1b903f7021adfcbd7e62cc08e60001b611255565b60008484905003610ed7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ece90611e10565b60405180910390fd5b610f037f7de22fb32066946fb2c804f626840e94502d6a610ba5326e879329631cf87c9760001b611255565b610f2f7f07528f6118c85f8960ae10be65d9b1d9840b62079da3b45d36605ab69d42a88e60001b611255565b610f5b7fc20cde0cc876136c5cc466e67d7525eead3ecfaaa2a78ea8903df253a47274ee60001b611255565b60008484604051602001610f70929190611e64565b604051602081830303815290604052805190602001209050610fb47f7186cf34dc0d4f3c5e13c36e9e1bfdf08b571ddfa2732912f09dc6b5bc09a53a60001b611255565b610fe07f445f681912dd10c6e28e554e368a282816f9a2b2287bdeda7adae54fef9d467560001b611255565b61100c7f33d68159993d9991d6605717aecb2bc9ba04b08971fa1f26edfec93722d0ec2060001b611255565b6000866004016000838152602001908152602001600020600001805461103190611ad3565b905014611073576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161106a90611ec9565b60405180910390fd5b61109f7fe440ae81d5dd75ae27c5a430f68274a12906b778d2c568d1105f82fe9a371b0860001b611255565b6110cb7f3022d5676b3dc7f6064fbf1f1839fc501a3943758efc1b0e09fba5b99ba2ec4d60001b611255565b6110f77fa97edca585f78f093de0289d79b5dce6bda2c785a170b7ea4696737357f545c860001b611255565b6000866004016000838152602001908152602001600020905061113c7f3e55ab869641c81883b41c6be87264dc2da7b7006aeb1fc342eafaf578d1dd6760001b611255565b6111687f44d220d884c768c13bb2cea3621c45f2bb9624fd6a5d58170d0e06698e1fe75960001b611255565b858582600001918261117b9291906120d9565b506111a87fa7c18937bf8f20aaf45229d2f09a631f3d01fceea9f2a8968854c28f76c78d2660001b611255565b6111d47f8623091271a5ec333fa6aefa5bd4c818f99bc41c48609e87738c40d18d26235460001b611255565b838160010160006101000a81548160ff02191690831515021790555061121c7f667912ca1cd89bcf52038511e8d1cb635eba66bc6b011046efbe6104ef66af5760001b611255565b6112487fcb03742c33b414495ca4b56786ffc1d9df878036fb500c6d2e9cd4892dac5e7b60001b611255565b8192505050949350505050565b50565b60606112867f556c7901f6b6a29ce251a7d53ec1a416ce35a070d26c39e341dabc1b605e2ba060001b611440565b6112b27fa1b6db3704480d4c2eb2a9bc5e54d89073f7bcfb525ef68caeed6662c3e603af60001b611440565b6112de7fabf7905f3ef6311722c03a78c7ded97818695b3fec643e70eacebba56b3d7f8960001b611440565b6112ea82600001611443565b9050919050565b600061131f7f26cab7f76b231dcd76c6b7122756fddb8cd275e9cfd4f959906274c1261b99f160001b611440565b61134b7f4ee0871ab41560123db7ed71cf3b4cfd0ae14538cf8c758cc995ce8e22d4732060001b611440565b6113777f61c4f86cc00b73cb8479df960b0e2a2e1b994c1cf5d1205307ce129faca6789e60001b611440565b6113848360000183611523565b905092915050565b60006113ba7fe1590ef884b267f57f05f28736eaae6814f7e60f6ff23b73d8e84462e0abe3d560001b6115cb565b6113e67f86d9bc4e1f6770eab7db7b4868ac2aeef23612c8eb30e8e002786ffeac6110db60001b6115cb565b6114127fb7d2cbdc7ef6b7ffb2ac7b5ef2f4f15d3b3702d7b5537e0b7002ae8d97bbaf1d60001b6115cb565b8160405160200161142391906121f1565b604051602081830303815290604052805190602001209050919050565b50565b60606114717f0c8aeb20259289e9d1d4ae74684626b54d6093a5345280cdfd79a2bb215c55b960001b611440565b61149d7f71d72b1b83e44fdbcb64df581148525c498210402ae3b685e306a2708cb8b07c60001b611440565b6114c97fbc423baacc1e1b74d443c919843a9ef6452bc2132ca93d3ff5e8bed3ccc4518560001b611440565b8160000180548060200260200160405190810160405280929190818152602001828054801561151757602002820191906000526020600020905b815481526020019060010190808311611503575b50505050509050919050565b60006115517f674f6c08cb242a76adb2b611b18ad331c2f0f60c02fcff6cb80c81624ed9684560001b611440565b61157d7f8d5e6f905041fd2a669380851dd8d916b2c7ca0388e0f8a61bea3d37486253d360001b611440565b6115a97f2b65099da516978e5ba8f0800e57cb7d003febb5c592362afe8a5f3eb5f4305f60001b611440565b6000836001016000848152602001908152602001600020541415905092915050565b50565b600080fd5b600080fd5b6000819050919050565b6115eb816115d8565b81146115f657600080fd5b50565b600081359050611608816115e2565b92915050565b6000819050919050565b6116218161160e565b811461162c57600080fd5b50565b60008135905061163e81611618565b92915050565b6000806040838503121561165b5761165a6115ce565b5b6000611669858286016115f9565b925050602061167a8582860161162f565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6116b98161160e565b82525050565b60006116cb83836116b0565b60208301905092915050565b6000602082019050919050565b60006116ef82611684565b6116f9818561168f565b9350611704836116a0565b8060005b8381101561173557815161171c88826116bf565b9750611727836116d7565b925050600181019050611708565b5085935050505092915050565b6000602082019050818103600083015261175c81846116e4565b905092915050565b61176d8161160e565b82525050565b60006020820190506117886000830184611764565b92915050565b6000806000606084860312156117a7576117a66115ce565b5b60006117b5868287016115f9565b93505060206117c68682870161162f565b92505060406117d78682870161162f565b9150509250925092565b60008115159050919050565b6117f6816117e1565b82525050565b600060208201905061181160008301846117ed565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611851578082015181840152602081019050611836565b83811115611860576000848401525b50505050565b6000601f19601f8301169050919050565b600061188282611817565b61188c8185611822565b935061189c818560208601611833565b6118a581611866565b840191505092915050565b600060408201905081810360008301526118ca8185611877565b90506118d960208301846117ed565b9392505050565b6118e9816117e1565b81146118f457600080fd5b50565b600081359050611906816118e0565b92915050565b600080600060608486031215611925576119246115ce565b5b6000611933868287016115f9565b93505060206119448682870161162f565b9250506040611955868287016118f7565b9150509250925092565b600080fd5b600080fd5b600080fd5b60008083601f8401126119845761198361195f565b5b8235905067ffffffffffffffff8111156119a1576119a0611964565b5b6020830191508360018202830111156119bd576119bc611969565b5b9250929050565b600080600080606085870312156119de576119dd6115ce565b5b60006119ec878288016115f9565b945050602085013567ffffffffffffffff811115611a0d57611a0c6115d3565b5b611a198782880161196e565b93509350506040611a2c878288016118f7565b91505092959194509250565b600081905092915050565b7f312e302e30000000000000000000000000000000000000000000000000000000600082015250565b6000611a79600583611a38565b9150611a8482611a43565b600582019050919050565b6000611a9a82611a6c565b9150819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611aeb57607f821691505b602082108103611afe57611afd611aa4565b5b50919050565b7f4c47726f75704d616e6167656d656e7400000000000000000000000000000000600082015250565b6000611b3a601083611a38565b9150611b4582611b04565b601082019050919050565b6000611b5b82611b2d565b9150819050919050565b600081519050611b74816118e0565b92915050565b600060208284031215611b9057611b8f6115ce565b5b6000611b9e84828501611b65565b91505092915050565b600082825260208201905092915050565b7f536166654d6f64653a2043616c6c2052656a6563746564000000000000000000600082015250565b6000611bee601783611ba7565b9150611bf982611bb8565b602082019050919050565b60006020820190508181036000830152611c1d81611be1565b9050919050565b8082525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611c5682611c2b565b9050919050565b611c6681611c4b565b82525050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611ca181611c6c565b82525050565b6000608082019050611cbc6000830187611c24565b611cc96020830186611764565b611cd66040830185611c5d565b611ce36060830184611c98565b95945050505050565b7f4163636573732044656e69656400000000000000000000000000000000000000600082015250565b6000611d22600d83611ba7565b9150611d2d82611cec565b602082019050919050565b60006020820190508181036000830152611d5181611d15565b9050919050565b7f47726f7570204e6f7420466f756e640000000000000000000000000000000000600082015250565b6000611d8e600f83611ba7565b9150611d9982611d58565b602082019050919050565b60006020820190508181036000830152611dbd81611d81565b9050919050565b7f47726f7570204e616d6520496e76616c69640000000000000000000000000000600082015250565b6000611dfa601283611ba7565b9150611e0582611dc4565b602082019050919050565b60006020820190508181036000830152611e2981611ded565b9050919050565b82818337600083830152505050565b6000611e4b8385611a38565b9350611e58838584611e30565b82840190509392505050565b6000611e71828486611e3f565b91508190509392505050565b7f47726f757020416c726561647920526567697374657265640000000000000000600082015250565b6000611eb3601883611ba7565b9150611ebe82611e7d565b602082019050919050565b60006020820190508181036000830152611ee281611ea6565b9050919050565b600082905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302611f857fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611f48565b611f8f8683611f48565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000611fd6611fd1611fcc84611fa7565b611fb1565b611fa7565b9050919050565b6000819050919050565b611ff083611fbb565b612004611ffc82611fdd565b848454611f55565b825550505050565b600090565b61201961200c565b612024818484611fe7565b505050565b5b818110156120485761203d600082612011565b60018101905061202a565b5050565b601f82111561208d5761205e81611f23565b61206784611f38565b81016020851015612076578190505b61208a61208285611f38565b830182612029565b50505b505050565b600082821c905092915050565b60006120b060001984600802612092565b1980831691505092915050565b60006120c9838361209f565b9150826002028217905092915050565b6120e38383611ee9565b67ffffffffffffffff8111156120fc576120fb611ef4565b5b6121068254611ad3565b61211182828561204c565b6000601f831160018114612140576000841561212e578287013590505b61213885826120bd565b8655506121a0565b601f19841661214e86611f23565b60005b8281101561217657848901358255600182019150602085019450602081019050612151565b86831015612193578489013561218f601f89168261209f565b8355505b6001600288020188555050505b50505050505050565b60008160601b9050919050565b60006121c1826121a9565b9050919050565b60006121d3826121b6565b9050919050565b6121eb6121e682611c4b565b6121c8565b82525050565b60006121fd82846121da565b6014820191508190509291505056fea2646970667358221220996f7303e896337dc23b119cbd5d4f1c373b09880ecc927ecbef577b9a5c831a64736f6c634300080f0033";

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
