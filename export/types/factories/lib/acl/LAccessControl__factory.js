"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAccessControl__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
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
        name: "LIVELY_ASSET_ADMIN_ROLE",
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
        name: "LIVELY_ASSET_GROUP",
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
        name: "LIVELY_ASSET_REALM",
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
        name: "LIVELY_COMMUNITY_DAO_ROLE",
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
        name: "LIVELY_DAO_GROUP",
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
const _bytecode = "0x612cf761003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061025d5760003560e01c80635f6cef3c11610150578063af07cfcd116100cd578063d8b3199911610091578063d8b31999146104bc578063d95140eb146104c4578063decf375c146104d7578063e24b90a9146104ea578063e3309d66146104fd578063edc9c7d31461051057600080fd5b8063af07cfcd14610473578063b5e5b4d414610486578063b899699c14610499578063bec94751146104a1578063d77caec8146104a957600080fd5b8063779a6a7a11610114578063779a6a7a1461042a5780637cd7c4ed1461043d5780639bb20d5114610450578063a619675714610458578063a834b8c01461046057600080fd5b80635f6cef3c146103df57806362f3c2d4146103e757806364f892ca146103fc578063660c99121461040f5780636ac58ac11461042257600080fd5b80632466209b116101de57806345d71c18116101a257806345d71c1814610387578063487c6960146103a95780634bb485f6146103bc5780634c95d60d146103cf5780635632ffd8146103d757600080fd5b80632466209b146103495780632d8bc9cb146103515780633346dd2d1461035957806336206f041461036c578063442b0ca11461037457600080fd5b806310f075011161022557806310f07501146102d9578063113f28281461030857806320dd27af1461031b578063231b271c1461032357806323707db31461033657600080fd5b8063017d62691461026257806309ae9e861461028a5780630cf3ea2f1461029d5780630fd7cb90146102b0578063108f5bdc146102c3575b600080fd5b6102756102703660046127c2565b610523565b60405190151581526020015b60405180910390f35b610275610298366004612800565b61057c565b6102756102ab366004612800565b6105e8565b6102756102be3660046127c2565b610612565b6102cb61063b565b604051908152602001610281565b6102756102e73660046127c2565b600090815260019182016020526040902001546001600160a01b0316151590565b6102756103163660046127c2565b610663565b6102cb610681565b610275610331366004612800565b610690565b610275610344366004612800565b6106ba565b6102cb6106e4565b6102cb6106fd565b6102756103673660046127c2565b61070c565b6102cb610752565b6102756103823660046127c2565b610761565b81801561039357600080fd5b506103a76103a236600461282c565b6107a6565b005b6102756103b736600461285d565b6117d4565b6102756103ca366004612800565b6119c6565b6102cb6119f0565b6102cb6119ff565b6102cb611a0e565b6103ef611a34565b60405161028191906128a3565b61027561040a3660046127c2565b612382565b61027561041d3660046127c2565b61239d565b6102cb6123eb565b6102756104383660046127c2565b6123fa565b61027561044b3660046127c2565b61243f565b6102cb6124bc565b6102cb6124e5565b61027561046e36600461295a565b6124f4565b6102756104813660046127c2565b612540565b6102756104943660046127c2565b612599565b6102cb6125cd565b6102cb6125dc565b6102756104b73660046127c2565b6125fe565b6102cb612619565b6102756104d23660046127c2565b612628565b6102756104e536600461295a565b612646565b6102756104f83660046127c2565b6126b7565b61027561050b366004612800565b6126f9565b61027561051e3660046127c2565b612723565b60006105738284600401600060405160200161053e9061298f565b60405160208183030381529060405280519060200120815260200190815260200160002060020161273e90919063ffffffff16565b90505b92915050565b6001600160a01b038116600090815260208381526040808320905160019284916105a691016129c5565b60408051601f198184030181529181528151602092830120835290820192909252016000205460ff1660028111156105e0576105e06129af565b149392505050565b6001600160a01b038116600090815260208381526040808320905160019284916105a691016129e8565b60008181526004830160205260408120805482919061063090612a0c565b905011905092915050565b60405160200161064a90612a46565b6040516020818303038152906040528051906020012081565b60008181526003830160205260408120805482919061063090612a0c565b60405160200161064a90612a6b565b6001600160a01b038116600090815260208381526040808320905160019284916105a69101612a8b565b6001600160a01b038116600090815260208381526040808320905160019284916105a69101612a46565b604051640312e302e360dc1b602082015260250161064a565b60405160200161064a90612aa8565b600081815260018084016020526040822001546001600160a01b03161580159061057357505060009081526001918201602052604090200154600160a01b900460ff1690565b60405160200161064a906129c5565b60008181526004830160205260408120805482919061077f90612a0c565b90501180156105735750506000908152600491909101602052604090206001015460ff1690565b33600090815260208281526040808320905160019391926107c79101612a8b565b60408051601f19818403018152918152815160209283012083529082019290925201600020805460ff19166001836002811115610806576108066129af565b0217905550336000908152602082815260408083209051600193919261082c91016129e8565b60408051601f19818403018152918152815160209283012083529082019290925201600020805460ff1916600183600281111561086b5761086b6129af565b0217905550604051806040016040528060118152602001704c4956454c595f41444d494e5f524f4c4560781b8152508160020160006040516020016108af90612a8b565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816108e29190612b29565b5060018160020160006040516020016108fa90612a8b565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff0219169083151502179055506040516020016109479061298f565b6040516020818303038152906040528051906020012081600201600060405160200161097290612a8b565b604051602081830303815290604052805190602001208152602001908152602001600020600101819055506109eb338260020160006040516020016109b690612a8b565b60405160208183030381529060405280519060200120815260200190815260200160002060030161275690919063ffffffff16565b50604051806040016040528060188152602001774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b815250816002016000604051602001610a32906129e8565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610a659190612b29565b506001816002016000604051602001610a7d906129e8565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610aca9061298f565b60405160208183030381529060405280519060200120816002016000604051602001610af5906129e8565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550610b39338260020160006040516020016109b6906129e8565b50604051806040016040528060198152602001784c4956454c595f41535345545f4d414e414745525f524f4c4560381b815250816002016000604051602001610b8190612be9565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610bb49190612b29565b506001816002016000604051602001610bcc90612be9565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610c1990612c0e565b60405160208183030381529060405280519060200120816002016000604051602001610c4490612be9565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550604051806040016040528060178152602001764c4956454c595f41535345545f41444d494e5f524f4c4560481b815250816002016000604051602001610cb4906129c5565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610ce79190612b29565b506001816002016000604051602001610cff906129c5565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610d4c90612c0e565b60405160208183030381529060405280519060200120816002016000604051602001610d77906129c5565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550604051806040016040528060198152602001784c4956454c595f434f4d4d554e4954595f44414f5f524f4c4560381b815250816002016000604051602001610de990612a46565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610e1c9190612b29565b506001816002016000604051602001610e3490612a46565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610e8190612aa8565b60405160208183030381529060405280519060200120816002016000604051602001610eac90612a46565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550604051806060016040528060228152602001612ca060229139816002016000604051602001610f0590612c2c565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610f389190612b29565b506001816002016000604051602001610f5090612c2c565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610f9d90612aa8565b60405160208183030381529060405280519060200120816002016000604051602001610fc890612c2c565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550604051806040016040528060158152602001744c4956454c595f414e4f4e594d4f55535f524f4c4560581b81525081600201600060405160200161105290744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816110859190612b29565b5060018160020160006040516020016110b990744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff0219169083151502179055506040516020016111069061298f565b6040516020818303038152906040528051906020012081600201600060405160200161114d90744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b604051602081830303815290604052805190602001208152602001908152602001600020600101819055506040518060400160405280601481526020017304c4956454c595f47454e4552414c5f47524f55560641b8152508160040160006040516020016111ba9061298f565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816111ed9190612b29565b5060018160040160006040516020016112059061298f565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff0219169083151502179055506112b560405160200161125590612a8b565b604051602081830303815290604052805190602001208260040160006040516020016112809061298f565b60405160208183030381529060405280519060200120815260200190815260200160002060020161276b90919063ffffffff16565b506112c8604051602001611255906129e8565b506040518060400160405280601081526020016f04c4956454c595f44414f5f47524f55560841b81525081600401600060405160200161130790612aa8565b604051602081830303815290604052805190602001208152602001908152602001600020600001908161133a9190612b29565b50600181600401600060405160200161135290612aa8565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff0219169083151502179055506113cd6040516020016113a290612a46565b6040516020818303038152906040528051906020012082600401600060405160200161128090612aa8565b506113e06040516020016113a290612c2c565b506040518060400160405280601281526020017104c4956454c595f41535345545f47524f55560741b81525081600401600060405160200161142190612c0e565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816114549190612b29565b50600181600401600060405160200161146c90612c0e565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff0219169083151502179055506114e76040516020016114bc90612be9565b6040516020818303038152906040528051906020012082600401600060405160200161128090612c0e565b506114fa6040516020016114bc906129c5565b50604051806040016040528060148152602001734c4956454c595f47454e4552414c5f5245414c4d60601b81525081600301600060405160200161153d90612a6b565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816115709190612b29565b50600181600301600060405160200161158890612a6b565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff02191690831515021790555060018160030160006040516020016115dd90612a6b565b60408051601f19818403018152918152815160209283012083528282019390935290820160002060010180549315156101000261ff00199094169390931790925580513060601b6bffffffffffffffffffffffff19168184015281516014818303018152603490910190915280519101206116679082600301600060405160200161128090612a6b565b50604051806040016040528060128152602001714c4956454c595f41535345545f5245414c4d60701b8152508160030160006040516020016116c190714c4956454c595f41535345545f5245414c4d60701b815260120190565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816116f49190612b29565b50600181600301600060405160200161172590714c4956454c595f41535345545f5245414c4d60701b815260120190565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff021916908315150217905550600181600301600060405160200161179390714c4956454c595f41535345545f5245414c4d60701b815260120190565b60405160208183030381529060405280519060200120815260200190815260200160002060010160016101000a81548160ff02191690831515021790555050565b600083815260018501602090815260408083206001600160e01b031985168452600201825280832054905190916118279101744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b6040516020818303038152906040528051906020012081036118b5576000858152600187810160205260409091200154600160a01b900460ff1680156118ad5750600160008681526001808901602090815260408084206001600160e01b0319891685526002908101909252909220015460ff16908111156118ab576118ab6129af565b145b9150506119be565b6000858152600187810160205260409091200154600160a01b900460ff16801561191f5750600160008681526001808901602090815260408084206001600160e01b0319891685526002908101909252909220015460ff169081111561191d5761191d6129af565b145b801561194d5750600085815260018088016020908152604080842054845260038a01909152909120015460ff165b801561197f575060008181526002870160209081526040808320600190810154845260048a01909252909120015460ff165b80156118ad575060016001600160a01b03851660009081526020888152604080832085845290915290205460ff1660028111156118ab576118ab6129af565b949350505050565b6001600160a01b038116600090815260208381526040808320905160019284916105a69101612c2c565b60405160200161064a90612c0e565b60405160200161064a906129e8565b604051714c4956454c595f41535345545f5245414c4d60701b602082015260320161064a565b604080516002808252606082810190935260009190816020015b60408051606080820183526000808352602083019190915291810191909152815260200190600190039081611a4e579050509050604051602001611a9190612a8b565b6040516020818303038152906040528051906020012081600081518110611aba57611aba612c60565b60200260200101516000018181525050600181600081518110611adf57611adf612c60565b60209081029190910181015191151560409283015281516012808252610260820190935291908201610240803683370190505081600081518110611b2557611b25612c60565b6020026020010151602001819052506348e6be1c60e01b81600081518110611b4f57611b4f612c60565b602002602001015160200151600081518110611b6d57611b6d612c60565b6001600160e01b031990921660209283029190910190910152805163031c049360e01b908290600090611ba257611ba2612c60565b602002602001015160200151600181518110611bc057611bc0612c60565b6001600160e01b0319909216602092830291909101909101528051635ac4b36f60e11b908290600090611bf557611bf5612c60565b602002602001015160200151600281518110611c1357611c13612c60565b6001600160e01b031990921660209283029190910190910152805163771bcf4560e01b908290600090611c4857611c48612c60565b602002602001015160200151600381518110611c6657611c66612c60565b6001600160e01b0319909216602092830291909101909101528051634346a04b60e01b908290600090611c9b57611c9b612c60565b602002602001015160200151600481518110611cb957611cb9612c60565b6001600160e01b031990921660209283029190910190910152805163d338640160e01b908290600090611cee57611cee612c60565b602002602001015160200151600581518110611d0c57611d0c612c60565b6001600160e01b03199092166020928302919091019091015280516370420ee360e01b908290600090611d4157611d41612c60565b602002602001015160200151600681518110611d5f57611d5f612c60565b6001600160e01b031990921660209283029190910190910152805163b2dc26e560e01b908290600090611d9457611d94612c60565b602002602001015160200151600781518110611db257611db2612c60565b6001600160e01b03199092166020928302919091019091015280516308f09e0f60e41b908290600090611de757611de7612c60565b602002602001015160200151600881518110611e0557611e05612c60565b6001600160e01b031990921660209283029190910190910152805163df01de4560e01b908290600090611e3a57611e3a612c60565b602002602001015160200151600981518110611e5857611e58612c60565b6001600160e01b031990921660209283029190910190910152805163738f112760e11b908290600090611e8d57611e8d612c60565b602002602001015160200151600a81518110611eab57611eab612c60565b6001600160e01b0319909216602092830291909101909101528051630dbf304b60e41b908290600090611ee057611ee0612c60565b602002602001015160200151600b81518110611efe57611efe612c60565b6001600160e01b03199092166020928302919091019091015280516307e9933760e31b908290600090611f3357611f33612c60565b602002602001015160200151600c81518110611f5157611f51612c60565b6001600160e01b031990921660209283029190910190910152805163b6c03f0360e01b908290600090611f8657611f86612c60565b602002602001015160200151600d81518110611fa457611fa4612c60565b6001600160e01b03199092166020928302919091019091015280516312ec6fa360e21b908290600090611fd957611fd9612c60565b602002602001015160200151600e81518110611ff757611ff7612c60565b6001600160e01b03199092166020928302919091019091015280516322df6f5b60e21b90829060009061202c5761202c612c60565b602002602001015160200151600f8151811061204a5761204a612c60565b6001600160e01b031990921660209283029190910190910152805163f2c673bd60e01b90829060009061207f5761207f612c60565b60200260200101516020015160108151811061209d5761209d612c60565b60200260200101906001600160e01b03191690816001600160e01b031916815250507f756af45f4ce05d832bee0c171992c529ad6d3ca8e13303d78feace2f8fd7faf2816000815181106120f3576120f3612c60565b60200260200101516020015160118151811061211157612111612c60565b6001600160e01b031990921660209283029190910182015260405161213691016129e8565b604051602081830303815290604052805190602001208160018151811061215f5761215f612c60565b6020026020010151600001818152505060018160018151811061218457612184612c60565b6020908102919091018101519115156040928301528151600580825260c082019093529190820160a08036833701905050816001815181106121c8576121c8612c60565b60200260200101516020018190525063d9dc1f1960e01b816001815181106121f2576121f2612c60565b60200260200101516020015160008151811061221057612210612c60565b6001600160e01b031990921660209283029190910190910152805163225bf2f960e11b908290600190811061224757612247612c60565b60200260200101516020015160018151811061226557612265612c60565b6001600160e01b0319909216602092830291909101909101528051637147855d60e01b908290600190811061229c5761229c612c60565b6020026020010151602001516002815181106122ba576122ba612c60565b6001600160e01b03199092166020928302919091019091015280516378efa4ed60e11b90829060019081106122f1576122f1612c60565b60200260200101516020015160038151811061230f5761230f612c60565b6001600160e01b0319909216602092830291909101909101528051631ccb7c8d60e31b908290600190811061234657612346612c60565b60200260200101516020015160048151811061236457612364612c60565b6001600160e01b031990921660209283029190910190910152919050565b60006105738284600301600060405160200161053e90612a6b565b6000818152600383016020526040812080546123b890612a0c565b90506000036123c957506000610576565b5060009081526003919091016020526040902060010154610100900460ff1690565b60405160200161064a9061298f565b60008181526003830160205260408120805482919061241890612a0c565b90501180156105735750506000908152600391909101602052604090206001015460ff1690565b600081815260018084016020908152604080842090920154825163be22465d60e01b815292516001600160a01b039091169263be22465d9260048083019391928290030181865afa158015612498573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105739190612c76565b604051744c4956454c595f414e4f4e594d4f55535f524f4c4560581b602082015260350161064a565b60405160200161064a90612be9565b600082815260018085016020526040822001546001600160a01b0316158015906119be5750600083815260018501602052604090206119be906003016001600160e01b0319841661273e565b6000818152600180840160209081526040808420909201548251630151e76560e61b815292516001600160a01b0390911692635479d9409260048083019391928290030181865afa158015612498573d6000803e3d6000fd5b60006105738284600301600060405160200161053e90714c4956454c595f41535345545f5245414c4d60701b815260120190565b60405160200161064a90612c2c565b6040516d131058d8d95cdcd0dbdb9d1c9bdb60921b6020820152602e0161064a565b60006105738284600401600060405160200161053e90612aa8565b60405160200161064a90612a8b565b60008181526002830160205260408120805482919061063090612a0c565b600082815260018085016020526040822001546001600160a01b0316158015906119be5750600160008481526001808701602090815260408084206001600160e01b0319881685526002908101909252909220015460ff16908111156126ae576126ae6129af565b14949350505050565b6000818152600283016020526040812080548291906126d590612a0c565b90501180156105735750506000908152600291820160205260409020015460ff1690565b6001600160a01b038116600090815260208381526040808320905160019284916105a69101612be9565b60006105738284600401600060405160200161053e90612c0e565b60008181526001830160205260408120541515610573565b6000610573836001600160a01b038416612773565b600061057383835b60008181526001830160205260408120546127ba57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610576565b506000610576565b600080604083850312156127d557600080fd5b50508035926020909101359150565b80356001600160a01b03811681146127fb57600080fd5b919050565b6000806040838503121561281357600080fd5b82359150612823602084016127e4565b90509250929050565b60006020828403121561283e57600080fd5b5035919050565b80356001600160e01b0319811681146127fb57600080fd5b6000806000806080858703121561287357600080fd5b843593506020850135925061288a604086016127e4565b915061289860608601612845565b905092959194509250565b60006020808301818452808551808352604092508286019150828160051b8701018488016000805b8481101561294b57898403603f190186528251805185528881015160608a8701819052815190870181905260808701918b019085905b8082101561292b5782516001600160e01b0319168452928c0192918c019160019190910190612901565b5050509088015115159488019490945294870194918701916001016128cb565b50919998505050505050505050565b60008060006060848603121561296f57600080fd5b833592506020840135915061298660408501612845565b90509250925092565b7304c4956454c595f47454e4552414c5f47524f55560641b815260140190565b634e487b7160e01b600052602160045260246000fd5b764c4956454c595f41535345545f41444d494e5f524f4c4560481b815260170190565b774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b815260180190565b600181811c90821680612a2057607f821691505b602082108103612a4057634e487b7160e01b600052602260045260246000fd5b50919050565b784c4956454c595f434f4d4d554e4954595f44414f5f524f4c4560381b815260190190565b734c4956454c595f47454e4552414c5f5245414c4d60601b815260140190565b704c4956454c595f41444d494e5f524f4c4560781b815260110190565b6f04c4956454c595f44414f5f47524f55560841b815260100190565b634e487b7160e01b600052604160045260246000fd5b601f821115612b2457600081815260208120601f850160051c81016020861015612b015750805b601f850160051c820191505b81811015612b2057828155600101612b0d565b5050505b505050565b815167ffffffffffffffff811115612b4357612b43612ac4565b612b5781612b518454612a0c565b84612ada565b602080601f831160018114612b8c5760008415612b745750858301515b600019600386901b1c1916600185901b178555612b20565b600085815260208120601f198616915b82811015612bbb57888601518255948401946001909101908401612b9c565b5085821015612bd95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b784c4956454c595f41535345545f4d414e414745525f524f4c4560381b815260190190565b7104c4956454c595f41535345545f47524f55560741b815260120190565b7f4c4956454c595f434f4d4d554e4954595f44414f5f4558454355544f525f524f8152614c4560f01b602082015260220190565b634e487b7160e01b600052603260045260246000fd5b600060208284031215612c8857600080fd5b81518015158114612c9857600080fd5b939250505056fe4c4956454c595f434f4d4d554e4954595f44414f5f4558454355544f525f524f4c45a2646970667358221220526d6b25b55cc5f5a6b0b8821ea843fe9b69f2264019f6a0d589e65c00b09a5764736f6c63430008110033";
const isSuperArgs = (xs) => xs.length > 1;
class LAccessControl__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.LAccessControl__factory = LAccessControl__factory;
LAccessControl__factory.bytecode = _bytecode;
LAccessControl__factory.abi = _abi;
//# sourceMappingURL=LAccessControl__factory.js.map