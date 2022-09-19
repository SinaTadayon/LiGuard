/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  LAccessControl,
  LAccessControlInterface,
} from "../../../lib/acl/LAccessControl";

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
    name: "LIVELY_DAO_EXECUTOR_ROLE",
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
    name: "LIVELY_DAO_ROLE",
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
    name: "LIVELY_GENERAL_GROUP",
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
    name: "LIVELY_GENERAL_REALM",
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
    inputs: [],
    name: "createRequestContext",
    outputs: [
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
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x61268761003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106102055760003560e01c80636ac58ac111610124578063bec94751116100b7578063d95140eb11610086578063d95140eb14610400578063decf375c14610413578063e24b90a914610426578063e8a0df2d14610439578063fbe97e191461044c57600080fd5b8063bec94751146103d5578063cddce0ae146103dd578063d8407ffe146103e5578063d8b31999146103f857600080fd5b8063a6196757116100f3578063a619675714610394578063a834b8c01461039c578063af07cfcd146103af578063be74825b146103c257600080fd5b80636ac58ac11461035e578063779a6a7a146103665780637cd7c4ed146103795780639bb20d511461038c57600080fd5b806345d71c181161019c57806362f3c2d41161016b57806362f3c2d41461031b578063639b718e1461033057806364f892ca14610338578063660c99121461034b57600080fd5b806345d71c18146102cb578063470e4565146102ed578063487c6960146103005780635632ffd81461031357600080fd5b806320dd27af116101d857806320dd27af146102875780632466209b1461029d5780633346dd2d146102a5578063442b0ca1146102b857600080fd5b8063017d62691461020a5780630fd7cb901461023257806310f0750114610245578063113f282814610274575b600080fd5b61021d6102183660046121ee565b61045f565b60405190151581526020015b60405180910390f35b61021d6102403660046121ee565b6104b8565b61021d6102533660046121ee565b600090815260019182016020526040902001546001600160a01b0316151590565b61021d6102823660046121ee565b6104e1565b61028f6104ff565b604051908152602001610229565b61028f610527565b61021d6102b33660046121ee565b610540565b61021d6102c63660046121ee565b610586565b8180156102d757600080fd5b506102eb6102e6366004612210565b6105cb565b005b61021d6102fb366004612245565b611192565b61021d61030e366004612289565b6111fe565b61028f6113d4565b6103236113e3565b60405161022991906122cf565b61028f611d31565b61021d6103463660046121ee565b611d54565b61021d6103593660046121ee565b611d6f565b61028f611dbd565b61021d6103743660046121ee565b611dcc565b61021d6103873660046121ee565b611e11565b61028f611e8e565b61028f611e9d565b61021d6103aa366004612386565b611ebc565b61021d6103bd3660046121ee565b611f08565b61021d6103d0366004612245565b611f61565b61028f611f9f565b61028f611fc1565b61021d6103f3366004612245565b611fe0565b61028f612022565b61021d61040e3660046121ee565b612031565b61021d610421366004612386565b61204f565b61021d6104343660046121ee565b6120c0565b61021d610447366004612245565b612102565b61021d61045a366004612245565b612140565b60006104af8284600401600060405160200161047a906123bb565b60405160208183030381529060405280519060200120815260200190815260200160002060020161216a90919063ffffffff16565b90505b92915050565b6000818152600483016020526040812080548291906104d6906123db565b905011905092915050565b6000818152600383016020526040812080548291906104d6906123db565b60405160200161050e90612415565b6040516020818303038152906040528051906020012081565b604051640312e302e360dc1b602082015260250161050e565b600081815260018084016020526040822001546001600160a01b0316158015906104af57505060009081526001918201602052604090200154600160a01b900460ff1690565b6000818152600483016020526040812080548291906105a4906123db565b90501180156104af5750506000908152600491909101602052604090206001015460ff1690565b33600090815260208281526040808320905160019391926105ec9101612435565b60408051601f19818403018152918152815160209283012083529082019290925201600020805460ff1916600183600281111561062b5761062b612452565b021790555033600090815260208281526040808320905160019391926106519101612468565b60408051601f19818403018152918152815160209283012083529082019290925201600020805460ff1916600183600281111561069057610690612452565b0217905550604051806040016040528060118152602001704c4956454c595f41444d494e5f524f4c4560781b8152508160020160006040516020016106d490612435565b604051602081830303815290604052805190602001208152602001908152602001600020600001908161070791906124f1565b50600181600201600060405160200161071f90612435565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff02191690831515021790555060405160200161076c906123bb565b6040516020818303038152906040528051906020012081600201600060405160200161079790612435565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550610810338260020160006040516020016107db90612435565b60405160208183030381529060405280519060200120815260200190815260200160002060030161218290919063ffffffff16565b50604051806040016040528060188152602001774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b81525081600201600060405160200161085790612468565b604051602081830303815290604052805190602001208152602001908152602001600020600001908161088a91906124f1565b5060018160020160006040516020016108a290612468565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff0219169083151502179055506040516020016108ef906123bb565b6040516020818303038152906040528051906020012081600201600060405160200161091a90612468565b6040516020818303038152906040528051906020012081526020019081526020016000206001018190555061095e338260020160006040516020016107db90612468565b506040518060400160405280601981526020016000805160206126128339815191528152508160020160006040516020016109aa90600080516020612612833981519152815260190190565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816109dd91906124f1565b506001816002016000604051602001610a0790600080516020612612833981519152815260190190565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610a54906123bb565b60405160208183030381529060405280519060200120816002016000604051602001610a9190600080516020612612833981519152815260190190565b604051602081830303815290604052805190602001208152602001908152602001600020600101819055506040518060400160405280600f81526020016e4c4956454c595f44414f5f524f4c4560881b815250816002016000604051602001610b0f906e4c4956454c595f44414f5f524f4c4560881b8152600f0190565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610b4291906124f1565b506001816002016000604051602001610b70906e4c4956454c595f44414f5f524f4c4560881b8152600f0190565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610bbd906123bb565b60405160208183030381529060405280519060200120816002016000604051602001610bfe906e4c4956454c595f44414f5f524f4c4560881b8152600f0190565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550604051806040016040528060188152602001600080516020612632833981519152815250816002016000604051602001610c7490600080516020612632833981519152815260180190565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610ca791906124f1565b506001816002016000604051602001610cd190600080516020612632833981519152815260180190565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610d1e906123bb565b60405160208183030381529060405280519060200120816002016000604051602001610d5b90600080516020612632833981519152815260180190565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550604051806040016040528060158152602001744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815250816002016000604051602001610dc9906125b1565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610dfc91906124f1565b506001816002016000604051602001610e14906125b1565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610e61906123bb565b60405160208183030381529060405280519060200120816002016000604051602001610e8c906125b1565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550610ed0338260020160006040516020016107db906125b1565b506040518060400160405280601481526020017304c4956454c595f47454e4552414c5f47524f55560641b815250816004016000604051602001610f13906123bb565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610f4691906124f1565b506001816004016000604051602001610f5e906123bb565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff02191690831515021790555061100e604051602001610fae90612435565b60405160208183030381529060405280519060200120826004016000604051602001610fd9906123bb565b60405160208183030381529060405280519060200120815260200190815260200160002060020161219790919063ffffffff16565b50611021604051602001610fae90612468565b50604051806040016040528060148152602001734c4956454c595f47454e4552414c5f5245414c4d60601b81525081600301600060405160200161106490612415565b604051602081830303815290604052805190602001208152602001908152602001600020600001908161109791906124f1565b5060018160030160006040516020016110af90612415565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff021916908315150217905550600181600301600060405160200161110490612415565b60408051601f19818403018152918152815160209283012083528282019390935290820160002060010180549315156101000261ff00199094169390931790925580513060601b6bffffffffffffffffffffffff191681840152815160148183030181526034909101909152805191012061118e90826003016000604051602001610fd990612415565b5050565b6001600160a01b038116600090815260208381526040808320905160019284916111bc9101612468565b60408051601f198184030181529181528151602092830120835290820192909252016000205460ff1660028111156111f6576111f6612452565b149392505050565b600083815260018501602090815260408083206001600160e01b0319851684526002018252808320549051909161123591016125b1565b6040516020818303038152906040528051906020012081036112c3576000858152600187810160205260409091200154600160a01b900460ff1680156112bb5750600160008681526001808901602090815260408084206001600160e01b0319891685526002908101909252909220015460ff16908111156112b9576112b9612452565b145b9150506113cc565b6000858152600187810160205260409091200154600160a01b900460ff16801561132d5750600160008681526001808901602090815260408084206001600160e01b0319891685526002908101909252909220015460ff169081111561132b5761132b612452565b145b801561135b5750600085815260018088016020908152604080842054845260038a01909152909120015460ff165b801561138d575060008181526002870160209081526040808320600190810154845260048a01909252909120015460ff165b80156112bb575060016001600160a01b03851660009081526020888152604080832085845290915290205460ff1660028111156112b9576112b9612452565b949350505050565b60405160200161050e90612468565b604080516002808252606082810190935260009190816020015b604080516060808201835260008083526020830191909152918101919091528152602001906001900390816113fd57905050905060405160200161144090612435565b6040516020818303038152906040528051906020012081600081518110611469576114696125d2565b6020026020010151600001818152505060018160008151811061148e5761148e6125d2565b602090810291909101810151911515604092830152815160128082526102608201909352919082016102408036833701905050816000815181106114d4576114d46125d2565b6020026020010151602001819052506348e6be1c60e01b816000815181106114fe576114fe6125d2565b60200260200101516020015160008151811061151c5761151c6125d2565b6001600160e01b031990921660209283029190910190910152805163031c049360e01b908290600090611551576115516125d2565b60200260200101516020015160018151811061156f5761156f6125d2565b6001600160e01b0319909216602092830291909101909101528051635ac4b36f60e11b9082906000906115a4576115a46125d2565b6020026020010151602001516002815181106115c2576115c26125d2565b6001600160e01b031990921660209283029190910190910152805163771bcf4560e01b9082906000906115f7576115f76125d2565b602002602001015160200151600381518110611615576116156125d2565b6001600160e01b0319909216602092830291909101909101528051634346a04b60e01b90829060009061164a5761164a6125d2565b602002602001015160200151600481518110611668576116686125d2565b6001600160e01b031990921660209283029190910190910152805163d338640160e01b90829060009061169d5761169d6125d2565b6020026020010151602001516005815181106116bb576116bb6125d2565b6001600160e01b03199092166020928302919091019091015280516370420ee360e01b9082906000906116f0576116f06125d2565b60200260200101516020015160068151811061170e5761170e6125d2565b6001600160e01b031990921660209283029190910190910152805163b2dc26e560e01b908290600090611743576117436125d2565b602002602001015160200151600781518110611761576117616125d2565b6001600160e01b03199092166020928302919091019091015280516308f09e0f60e41b908290600090611796576117966125d2565b6020026020010151602001516008815181106117b4576117b46125d2565b6001600160e01b031990921660209283029190910190910152805163df01de4560e01b9082906000906117e9576117e96125d2565b602002602001015160200151600981518110611807576118076125d2565b6001600160e01b031990921660209283029190910190910152805163738f112760e11b90829060009061183c5761183c6125d2565b602002602001015160200151600a8151811061185a5761185a6125d2565b6001600160e01b0319909216602092830291909101909101528051630dbf304b60e41b90829060009061188f5761188f6125d2565b602002602001015160200151600b815181106118ad576118ad6125d2565b6001600160e01b03199092166020928302919091019091015280516307e9933760e31b9082906000906118e2576118e26125d2565b602002602001015160200151600c81518110611900576119006125d2565b6001600160e01b031990921660209283029190910190910152805163b6c03f0360e01b908290600090611935576119356125d2565b602002602001015160200151600d81518110611953576119536125d2565b6001600160e01b03199092166020928302919091019091015280516312ec6fa360e21b908290600090611988576119886125d2565b602002602001015160200151600e815181106119a6576119a66125d2565b6001600160e01b03199092166020928302919091019091015280516322df6f5b60e21b9082906000906119db576119db6125d2565b602002602001015160200151600f815181106119f9576119f96125d2565b6001600160e01b031990921660209283029190910190910152805163f2c673bd60e01b908290600090611a2e57611a2e6125d2565b602002602001015160200151601081518110611a4c57611a4c6125d2565b60200260200101906001600160e01b03191690816001600160e01b031916815250507f756af45f4ce05d832bee0c171992c529ad6d3ca8e13303d78feace2f8fd7faf281600081518110611aa257611aa26125d2565b602002602001015160200151601181518110611ac057611ac06125d2565b6001600160e01b0319909216602092830291909101820152604051611ae59101612468565b6040516020818303038152906040528051906020012081600181518110611b0e57611b0e6125d2565b60200260200101516000018181525050600181600181518110611b3357611b336125d2565b6020908102919091018101519115156040928301528151600580825260c082019093529190820160a0803683370190505081600181518110611b7757611b776125d2565b60200260200101516020018190525063d9dc1f1960e01b81600181518110611ba157611ba16125d2565b602002602001015160200151600081518110611bbf57611bbf6125d2565b6001600160e01b031990921660209283029190910190910152805163225bf2f960e11b9082906001908110611bf657611bf66125d2565b602002602001015160200151600181518110611c1457611c146125d2565b6001600160e01b0319909216602092830291909101909101528051637147855d60e01b9082906001908110611c4b57611c4b6125d2565b602002602001015160200151600281518110611c6957611c696125d2565b6001600160e01b03199092166020928302919091019091015280516378efa4ed60e11b9082906001908110611ca057611ca06125d2565b602002602001015160200151600381518110611cbe57611cbe6125d2565b6001600160e01b0319909216602092830291909101909101528051631ccb7c8d60e31b9082906001908110611cf557611cf56125d2565b602002602001015160200151600481518110611d1357611d136125d2565b6001600160e01b031990921660209283029190910190910152919050565b6040516e4c4956454c595f44414f5f524f4c4560881b6020820152602f0161050e565b60006104af8284600301600060405160200161047a90612415565b600081815260038301602052604081208054611d8a906123db565b9050600003611d9b575060006104b2565b5060009081526003919091016020526040902060010154610100900460ff1690565b60405160200161050e906123bb565b600081815260038301602052604081208054829190611dea906123db565b90501180156104af5750506000908152600391909101602052604090206001015460ff1690565b600081815260018084016020908152604080842090920154825163be22465d60e01b815292516001600160a01b039091169263be22465d9260048083019391928290030181865afa158015611e6a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104af91906125e8565b60405160200161050e906125b1565b604051600080516020612612833981519152602082015260390161050e565b600082815260018085016020526040822001546001600160a01b0316158015906113cc5750600083815260018501602052604090206113cc906003016001600160e01b0319841661216a565b6000818152600180840160209081526040808420909201548251630151e76560e61b815292516001600160a01b0390911692635479d9409260048083019391928290030181865afa158015611e6a573d6000803e3d6000fd5b600060016001600160a01b03831660009081526020858152604080832090519092916111bc9101600080516020612632833981519152815260180190565b6040516d131058d8d95cdcd0dbdb9d1c9bdb60921b6020820152602e0161050e565b604051600080516020612632833981519152602082015260380161050e565b600060016001600160a01b03831660009081526020858152604080832090519092916111bc91016e4c4956454c595f44414f5f524f4c4560881b8152600f0190565b60405160200161050e90612435565b6000818152600283016020526040812080548291906104d6906123db565b600082815260018085016020526040822001546001600160a01b0316158015906113cc5750600160008481526001808701602090815260408084206001600160e01b0319881685526002908101909252909220015460ff16908111156120b7576120b7612452565b14949350505050565b6000818152600283016020526040812080548291906120de906123db565b90501180156104af5750506000908152600291820160205260409020015460ff1690565b600060016001600160a01b03831660009081526020858152604080832090519092916111bc9101600080516020612612833981519152815260190190565b6001600160a01b038116600090815260208381526040808320905160019284916111bc9101612435565b600081815260018301602052604081205415156104af565b60006104af836001600160a01b03841661219f565b60006104af83835b60008181526001830160205260408120546121e6575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556104b2565b5060006104b2565b6000806040838503121561220157600080fd5b50508035926020909101359150565b60006020828403121561222257600080fd5b5035919050565b80356001600160a01b038116811461224057600080fd5b919050565b6000806040838503121561225857600080fd5b8235915061226860208401612229565b90509250929050565b80356001600160e01b03198116811461224057600080fd5b6000806000806080858703121561229f57600080fd5b84359350602085013592506122b660408601612229565b91506122c460608601612271565b905092959194509250565b60006020808301818452808551808352604092508286019150828160051b8701018488016000805b8481101561237757898403603f190186528251805185528881015160608a8701819052815190870181905260808701918b019085905b808210156123575782516001600160e01b0319168452928c0192918c01916001919091019061232d565b5050509088015115159488019490945294870194918701916001016122f7565b50919998505050505050505050565b60008060006060848603121561239b57600080fd5b83359250602084013591506123b260408501612271565b90509250925092565b7304c4956454c595f47454e4552414c5f47524f55560641b815260140190565b600181811c908216806123ef57607f821691505b60208210810361240f57634e487b7160e01b600052602260045260246000fd5b50919050565b734c4956454c595f47454e4552414c5f5245414c4d60601b815260140190565b704c4956454c595f41444d494e5f524f4c4560781b815260110190565b634e487b7160e01b600052602160045260246000fd5b774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b815260180190565b634e487b7160e01b600052604160045260246000fd5b601f8211156124ec57600081815260208120601f850160051c810160208610156124c95750805b601f850160051c820191505b818110156124e8578281556001016124d5565b5050505b505050565b815167ffffffffffffffff81111561250b5761250b61248c565b61251f8161251984546123db565b846124a2565b602080601f831160018114612554576000841561253c5750858301515b600019600386901b1c1916600185901b1785556124e8565b600085815260208120601f198616915b8281101561258357888601518255948401946001909101908401612564565b50858210156125a15787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b634e487b7160e01b600052603260045260246000fd5b6000602082840312156125fa57600080fd5b8151801515811461260a57600080fd5b939250505056fe4c4956454c595f41535345545f4d414e414745525f524f4c45000000000000004c4956454c595f44414f5f4558454355544f525f524f4c450000000000000000a2646970667358221220a4f83d7217cf2a038293c1ff40a6456341227871f7aafd7e10896e0b7c5b142264736f6c63430008110033";

type LAccessControlConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LAccessControlConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LAccessControl__factory extends ContractFactory {
  constructor(...args: LAccessControlConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LAccessControl> {
    return super.deploy(overrides || {}) as Promise<LAccessControl>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LAccessControl {
    return super.attach(address) as LAccessControl;
  }
  override connect(signer: Signer): LAccessControl__factory {
    return super.connect(signer) as LAccessControl__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LAccessControlInterface {
    return new utils.Interface(_abi) as LAccessControlInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LAccessControl {
    return new Contract(address, _abi, signerOrProvider) as LAccessControl;
  }
}
