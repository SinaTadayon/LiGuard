/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  LTokenERC20,
  LTokenERC20Interface,
} from "../../../lib/token/LTokenERC20";

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
  {
    inputs: [],
    name: "LIVELY_ADMIN_ROLE",
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
    name: "LIVELY_ANONYMOUS_ROLE",
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
    name: "LIVELY_ASSET_MANAGER_ROLE",
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
    name: "LIVELY_COMMUNITY_DAO_EXECUTOR_ROLE",
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
    name: "LIVELY_SYSTEM_ADMIN_ROLE",
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
        internalType: "bytes32",
        name: "domainName",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "domainVersion",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "realm",
        type: "bytes32",
      },
    ],
    name: "createRequestContext",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "name",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "version",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "realm",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "contractId",
            type: "address",
          },
          {
            internalType: "bool",
            name: "status",
            type: "bool",
          },
        ],
        internalType: "struct IContextManagement.RequestContext",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "bytes4[]",
            name: "funcSelectors",
            type: "bytes4[]",
          },
          {
            internalType: "bool",
            name: "isEnabled",
            type: "bool",
          },
        ],
        internalType: "struct IContextManagement.RequestRegisterContext[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6122e061003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100d95760003560e01c80639bb20d5111610096578063bec9475111610070578063bec94751146101ac578063d8b31999146101b4578063f1c3afef146101bc578063f7d6b5af146101fb57600080fd5b80639bb20d5114610194578063a61967571461019c578063b899699c146101a457600080fd5b806310e1fc40146100de5780632466209b146101115780633de90db3146101195780634572e0c11461013b5780635632ffd81461016b57806397ca328d14610173575b600080fd5b8180156100ea57600080fd5b506100fe6100f9366004611ee8565b61021b565b6040519081526020015b60405180910390f35b6100fe6105ee565b81801561012557600080fd5b50610139610134366004611f85565b61061c565b005b81801561014757600080fd5b5061015b610156366004611fc9565b610816565b6040519015158152602001610108565b6100fe610940565b61018661018136600461200e565b61096c565b60405161010892919061203a565b6100fe6117a8565b6100fe6117d1565b6100fe6117fe565b6100fe61180d565b6100fe61182c565b8180156101c857600080fd5b506101dc6101d736600461212c565b611851565b604080516001600160a01b039093168352602083019190915201610108565b81801561020757600080fd5b506100fe61021636600461217a565b611b6d565b80516000906001600160a01b03166102735760405162461bcd60e51b8152602060048201526016602482015275496e76616c696420536f75726365204164647265737360501b60448201526064015b60405180910390fd5b60208201516001600160a01b03166102cd5760405162461bcd60e51b815260206004820152601b60248201527f496e76616c69642044657374696e6174696f6e20416464726573730000000000604482015260640161026a565b81602001516001600160a01b031682600001516001600160a01b0316036103365760405162461bcd60e51b815260206004820152601b60248201527f496c6c6567616c2044657374696e6174696f6e20416464726573730000000000604482015260640161026a565b61034342620151806121b2565b8260400151116103895760405162461bcd60e51b81526020600482015260116024820152700496c6c6567616c2054696d657374616d7607c1b604482015260640161026a565b60008260600151116103ce5760405162461bcd60e51b815260206004820152600e60248201526d125b1b1959d85b08185b5bdd5b9d60921b604482015260640161026a565b600082600001518360200151846040015185606001516040516020016104269493929190606094851b6bffffffffffffffffffffffff1990811682529390941b90921660148401526028830152604882015260680190565b60408051601f198184030181529181528151602092830120858301516001600160a01b0390811660009081526002808a018652848220848352909552929092209092015491925016156104b35760405162461bcd60e51b81526020600482015260156024820152744c6f636b496420416c72656164792045786973747360581b604482015260640161026a565b82516001600160a01b031660009081526020859052604090205460608401518110156105215760405162461bcd60e51b815260206004820152601c60248201527f496e73756666696369656e74204163636f756e742042616c616e636500000000604482015260640161026a565b60608401805185516001600160a01b039081166000908152602089815260408083209487039094559351938801519091168152908120600101805490919061056a9084906121b2565b9091555050506020838101516001600160a01b03908116600090815260028781018452604080832086845290945290839020928601516001600160801b03908116600160801b02429190911617600184015585519083018054606088015190945591166001600160a81b031990921691909117600160a01b17905590505b92915050565b604051640312e302e360dc1b60208201526025015b6040516020818303038152906040528051906020012081565b6001600160a01b03831661066b5760405162461bcd60e51b8152602060048201526016602482015275496e76616c696420536f75726365204164647265737360501b604482015260640161026a565b6001600160a01b0382166106c15760405162461bcd60e51b815260206004820152601b60248201527f496e76616c69642044657374696e6174696f6e20416464726573730000000000604482015260640161026a565b816001600160a01b0316836001600160a01b03160361071a5760405162461bcd60e51b815260206004820152601560248201527424b63632b3b0b61029b2b633102a3930b739b332b960591b604482015260640161026a565b6000811161076a5760405162461bcd60e51b815260206004820152601760248201527f496e76616c6964205472616e7366657220416d6f756e74000000000000000000604482015260640161026a565b6001600160a01b038316600090815260208590526040902054818110156107d35760405162461bcd60e51b815260206004820152601c60248201527f496e73756666696369656e74204163636f756e742042616c616e636500000000604482015260640161026a565b6001600160a01b0380851660009081526020879052604080822085850390559185168152908120805484929061080a9084906121b2565b90915550505050505050565b60006001600160a01b03831661086e5760405162461bcd60e51b815260206004820152601760248201527f496e76616c6964204163636f756e742041646472657373000000000000000000604482015260640161026a565b81156108d4576108816005850184611d3b565b6108c15760405162461bcd60e51b81526020600482015260116024820152701058d8dbdd5b9d08139bdd08119bdd5b99607a1b604482015260640161026a565b6108ce6005850184611d60565b50610936565b6108e16005850184611d3b565b156109275760405162461bcd60e51b81526020600482015260166024820152754163636f756e7420416c72656164792045786973747360501b604482015260640161026a565b6109346005850184611d75565b505b5060019392505050565b604051774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b6020820152603801610603565b6040805160a0810182526000808252602082018190528183018190526060808301829052608083018290528351600580825260c082019095529293909290816020015b604080516060808201835260008083526020830191909152918101919091528152602001906001900390816109af57905050604051744c4956454c595f414e4f4e594d4f55535f524f4c4560581b60208201529091506035016040516020818303038152906040528051906020012081600081518110610a3157610a316121db565b60200260200101516000018181525050600181600081518110610a5657610a566121db565b6020908102919091018101519115156040928301528151600a808252610160820190935291908201610140803683370190505081600081518110610a9c57610a9c6121db565b60200260200101516020018190525063a9059cbb60e01b81600081518110610ac657610ac66121db565b602002602001015160200151600081518110610ae457610ae46121db565b6001600160e01b03199092166020928302919091019091015280516323b872dd60e01b908290600090610b1957610b196121db565b602002602001015160200151600181518110610b3757610b376121db565b6001600160e01b031990921660209283029190910190910152805163095ea7b360e01b908290600090610b6c57610b6c6121db565b602002602001015160200151600281518110610b8a57610b8a6121db565b6001600160e01b0319909216602092830291909101909101528051631f54aa5560e31b908290600090610bbf57610bbf6121db565b602002602001015160200151600381518110610bdd57610bdd6121db565b6001600160e01b031990921660209283029190910190910152805163038d251d60e31b908290600090610c1257610c126121db565b602002602001015160200151600481518110610c3057610c306121db565b6001600160e01b0319909216602092830291909101909101528051639fd5a6cf60e01b908290600090610c6557610c656121db565b602002602001015160200151600581518110610c8357610c836121db565b6001600160e01b0319909216602092830291909101909101528051633950935160e01b908290600090610cb857610cb86121db565b602002602001015160200151600681518110610cd657610cd66121db565b6001600160e01b031990921660209283029190910190910152805163a457c2d760e01b908290600090610d0b57610d0b6121db565b602002602001015160200151600781518110610d2957610d296121db565b6001600160e01b031990921660209283029190910190910152805163a5bfa9a960e01b908290600090610d5e57610d5e6121db565b602002602001015160200151600881518110610d7c57610d7c6121db565b6001600160e01b031990921660209283029190910190910152805163028ab43960e31b908290600090610db157610db16121db565b602002602001015160200151600981518110610dcf57610dcf6121db565b6001600160e01b0319909216602092830291909101820152604051610e0c9101704c4956454c595f41444d494e5f524f4c4560781b815260110190565b6040516020818303038152906040528051906020012081600181518110610e3557610e356121db565b60200260200101516000018181525050600181600181518110610e5a57610e5a6121db565b6020908102919091018101519115156040928301528151600c8082526101a0820190935291908201610180803683370190505081600181518110610ea057610ea06121db565b6020026020010151602001819052506348e6be1c60e01b81600181518110610eca57610eca6121db565b602002602001015160200151600081518110610ee857610ee86121db565b6001600160e01b031990921660209283029190910190910152805163225bf2f960e11b9082906001908110610f1f57610f1f6121db565b602002602001015160200151600181518110610f3d57610f3d6121db565b6001600160e01b0319909216602092830291909101909101528051632770a7eb60e21b9082906001908110610f7457610f746121db565b602002602001015160200151600281518110610f9257610f926121db565b6001600160e01b03199092166020928302919091019091015280516340c10f1960e01b9082906001908110610fc957610fc96121db565b602002602001015160200151600381518110610fe757610fe76121db565b6001600160e01b0319909216602092830291909101909101528051630bfee64760e11b908290600190811061101e5761101e6121db565b60200260200101516020015160048151811061103c5761103c6121db565b6001600160e01b03199092166020928302919091019091015280516311a98d3560e21b9082906001908110611073576110736121db565b602002602001015160200151600581518110611091576110916121db565b6001600160e01b0319909216602092830291909101909101528051637d35f35560e01b90829060019081106110c8576110c86121db565b6020026020010151602001516006815181106110e6576110e66121db565b6001600160e01b03199092166020928302919091019091015280516376a67a5160e01b908290600190811061111d5761111d6121db565b60200260200101516020015160078151811061113b5761113b6121db565b6001600160e01b03199092166020928302919091019091015280516357b001f960e01b9082906001908110611172576111726121db565b602002602001015160200151600881518110611190576111906121db565b6001600160e01b031990921660209283029190910190910152805163595c6a6760e01b90829060019081106111c7576111c76121db565b6020026020010151602001516009815181106111e5576111e56121db565b6001600160e01b0319909216602092830291909101909101528051638a2ddd0360e01b908290600190811061121c5761121c6121db565b602002602001015160200151600a8151811061123a5761123a6121db565b60200260200101906001600160e01b03191690816001600160e01b031916815250507f756af45f4ce05d832bee0c171992c529ad6d3ca8e13303d78feace2f8fd7faf281600181518110611290576112906121db565b602002602001015160200151600b815181106112ae576112ae6121db565b6001600160e01b03199092166020928302919091018201526040516112f29101774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b815260180190565b604051602081830303815290604052805190602001208160028151811061131b5761131b6121db565b60200260200101516000018181525050600181600281518110611340576113406121db565b60209081029190910101519015156040918201528051600280825260608201909252908160200160208202803683370190505081600281518110611386576113866121db565b60200260200101516020018190525063d9dc1f1960e01b816002815181106113b0576113b06121db565b6020026020010151602001516000815181106113ce576113ce6121db565b6001600160e01b0319909216602092830291909101909101528051637147855d60e01b9082906002908110611405576114056121db565b602002602001015160200151600181518110611423576114236121db565b6001600160e01b03199092166020928302919091018201526040516114689101784c4956454c595f41535345545f4d414e414745525f524f4c4560381b815260190190565b6040516020818303038152906040528051906020012081600381518110611491576114916121db565b602002602001015160000181815250506001816003815181106114b6576114b66121db565b60209081029190910181015191151560409283015281516003808252608082019093529190820160608036833701905050816003815181106114fa576114fa6121db565b602002602001015160200181905250636b83949260e01b81600381518110611524576115246121db565b602002602001015160200151600081518110611542576115426121db565b6001600160e01b0319909216602092830291909101909101528051639a7e187360e01b9082906003908110611579576115796121db565b602002602001015160200151600181518110611597576115976121db565b60200260200101906001600160e01b03191690816001600160e01b031916815250507fec4ac1f7a145493f4b4d677b3706ded0b0efff6bc9b9de9ab9d367b741bae880816003815181106115ed576115ed6121db565b60200260200101516020015160028151811061160b5761160b6121db565b6001600160e01b031990921660209283029190910182015260405161163091016121f1565b6040516020818303038152906040528051906020012081600481518110611659576116596121db565b6020026020010151600001818152505060018160048151811061167e5761167e6121db565b602090810291909101015190151560409182015280516002808252606082019092529081602001602082028036833701905050816004815181106116c4576116c46121db565b60200260200101516020018190525063fdb92ec460e01b816004815181106116ee576116ee6121db565b60200260200101516020015160008151811061170c5761170c6121db565b6001600160e01b0319909216602092830291909101909101528051634daf9ab760e11b9082906004908110611743576117436121db565b602002602001015160200151600181518110611761576117616121db565b6001600160e01b0319929092166020928302919091018201526040805160a08101825297885290870195909552938501929092525050306060830152600160808301529091565b604051744c4956454c595f414e4f4e594d4f55535f524f4c4560581b6020820152603501610603565b604051784c4956454c595f41535345545f4d414e414745525f524f4c4560381b6020820152603901610603565b604051602001610603906121f1565b6040516a04c546f6b656e45524332360ac1b6020820152602b01610603565b604051704c4956454c595f41444d494e5f524f4c4560781b6020820152603101610603565b60008082356118935760405162461bcd60e51b815260206004820152600e60248201526d125b9d985b1a5908131bd8dad25960921b604482015260640161026a565b600060028501816118aa6040870160208801612225565b6001600160a01b039081168252602080830193909352604091820160009081208835825290935291206002015416036119185760405162461bcd60e51b815260206004820152601060248201526f131bd8dad25908139bdd08119bdd5b9960821b604482015260640161026a565b60016002850160006119306040870160208801612225565b6001600160a01b031681526020808201929092526040908101600090812087358252909252902060020154600160a01b900460ff166003811115611976576119766121c5565b146119b85760405162461bcd60e51b8152602060048201526012602482015271496e76616c6964204c6f636b20537461746560701b604482015260640161026a565b600060028501816119cf6040870160208801612225565b6001600160a01b03168152602080820192909252604090810160009081208735825283528181205493509187918391611a0c918901908901612225565b6001600160a01b03166001600160a01b031681526020019081526020016000206001015490506000866002016000876020016020810190611a4d9190612225565b6001600160a01b039081168252602080830193909352604091820160009081208a35825290935291206002015416905082821015611a9d5760405162461bcd60e51b815260040161026a90612240565b828203876000611ab360408a0160208b01612225565b6001600160a01b0390811682526020808301939093526040918201600090812060010194909455841683529089905281208054859290611af49084906121b2565b9091555060039050600288016000611b1260408a0160208b01612225565b6001600160a01b03168152602080820192909252604090810160009081208a3582529092529020600201805460ff60a01b1916600160a01b836003811115611b5c57611b5c6121c5565b021790555096919550909350505050565b600081611bad5760405162461bcd60e51b815260206004820152600e60248201526d125b9d985b1a5908131bd8dad25960921b604482015260640161026a565b33600090815260028085016020908152604080842086855290915290912001546001600160a01b0316611c155760405162461bcd60e51b815260206004820152601060248201526f131bd8dad25908139bdd08119bdd5b9960821b604482015260640161026a565b33600090815260028401602090815260408083208584529091529020600101546001600160801b03428116600160801b9092041610611c8b5760405162461bcd60e51b8152602060048201526012602482015271496c6c6567616c20436c61696d204c6f636b60701b604482015260640161026a565b33600081815260028501602090815260408083208684528252808320549383529086905290206001015481811015611cd55760405162461bcd60e51b815260040161026a90612240565b33600090815260208690526040812083830360018201558054849290611cfc9084906121b2565b909155505033600090815260029586016020908152604080832096835295905293909320909301805460ff60a01b1916600160a11b1790555090919050565b6001600160a01b038116600090815260018301602052604081205415155b9392505050565b6000611d59836001600160a01b038416611d8a565b6000611d59836001600160a01b038416611e7d565b60008181526001830160205260408120548015611e73576000611dae600183612281565b8554909150600090611dc290600190612281565b9050818114611e27576000866000018281548110611de257611de26121db565b9060005260206000200154905080876000018481548110611e0557611e056121db565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080611e3857611e38612294565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506105e8565b60009150506105e8565b6000818152600183016020526040812054611ec4575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556105e8565b5060006105e8565b80356001600160a01b0381168114611ee357600080fd5b919050565b60008082840360a0811215611efc57600080fd5b833592506080601f1982011215611f1257600080fd5b506040516080810181811067ffffffffffffffff82111715611f4457634e487b7160e01b600052604160045260246000fd5b604052611f5360208501611ecc565b8152611f6160408501611ecc565b60208201526060840135604082015260808401356060820152809150509250929050565b60008060008060808587031215611f9b57600080fd5b84359350611fab60208601611ecc565b9250611fb960408601611ecc565b9396929550929360600135925050565b600080600060608486031215611fde57600080fd5b83359250611fee60208501611ecc565b91506040840135801515811461200357600080fd5b809150509250925092565b60008060006060848603121561202357600080fd5b505081359360208301359350604090920135919050565b600060c08201845183526020808601518185015260408087015181860152606060018060a01b0381890151168187015260808089015115158188015260c060a088015284885180875260e08901915060e08160051b8a01019650858a016000805b8381101561211a578b8a0360df19018552825180518b52898101518a8c018990528051898d01819052908b01908490898e01905b808310156120f95783516001600160e01b0319168252928d019260019290920191908d01906120cf565b50928b015115159c8b019c909c52509950938801939188019160010161209b565b50979c9b505050505050505050505050565b6000806040838503121561213f57600080fd5b82359150602083013567ffffffffffffffff81111561215d57600080fd5b83016060818603121561216f57600080fd5b809150509250929050565b6000806040838503121561218d57600080fd5b50508035926020909101359150565b634e487b7160e01b600052601160045260246000fd5b808201808211156105e8576105e861219c565b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b7f4c4956454c595f434f4d4d554e4954595f44414f5f4558454355544f525f524f8152614c4560f01b602082015260220190565b60006020828403121561223757600080fd5b611d5982611ecc565b60208082526021908201527f496e73756666696369656e74204163636f756e74204c6f636b2042616c616e636040820152606560f81b606082015260800190565b818103818111156105e8576105e861219c565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220d21baadc0bf549efb68f3b9172ad41bebc5a84c6412cb56b9763fd5e22ec2b9d64736f6c63430008110033";

type LTokenERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LTokenERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LTokenERC20__factory extends ContractFactory {
  constructor(...args: LTokenERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LTokenERC20> {
    return super.deploy(overrides || {}) as Promise<LTokenERC20>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LTokenERC20 {
    return super.attach(address) as LTokenERC20;
  }
  override connect(signer: Signer): LTokenERC20__factory {
    return super.connect(signer) as LTokenERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LTokenERC20Interface {
    return new utils.Interface(_abi) as LTokenERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LTokenERC20 {
    return new Contract(address, _abi, signerOrProvider) as LTokenERC20;
  }
}
