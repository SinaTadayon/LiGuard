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
const _bytecode = "0x612dee61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061025d5760003560e01c80635f6cef3c11610150578063af07cfcd116100cd578063d8b3199911610091578063d8b31999146104bc578063d95140eb146104c4578063decf375c146104d7578063e24b90a9146104ea578063e3309d66146104fd578063edc9c7d31461051057600080fd5b8063af07cfcd14610473578063b5e5b4d414610486578063b899699c14610499578063bec94751146104a1578063d77caec8146104a957600080fd5b8063779a6a7a11610114578063779a6a7a1461042a5780637cd7c4ed1461043d5780639bb20d5114610450578063a619675714610458578063a834b8c01461046057600080fd5b80635f6cef3c146103df57806362f3c2d4146103e757806364f892ca146103fc578063660c99121461040f5780636ac58ac11461042257600080fd5b80632466209b116101de57806345d71c18116101a257806345d71c1814610387578063487c6960146103a95780634bb485f6146103bc5780634c95d60d146103cf5780635632ffd8146103d757600080fd5b80632466209b146103495780632d8bc9cb146103515780633346dd2d1461035957806336206f041461036c578063442b0ca11461037457600080fd5b806310f075011161022557806310f07501146102d9578063113f28281461030857806320dd27af1461031b578063231b271c1461032357806323707db31461033657600080fd5b8063017d62691461026257806309ae9e861461028a5780630cf3ea2f1461029d5780630fd7cb90146102b0578063108f5bdc146102c3575b600080fd5b6102756102703660046128b9565b610523565b60405190151581526020015b60405180910390f35b6102756102983660046128f7565b61057c565b6102756102ab3660046128f7565b6105e8565b6102756102be3660046128b9565b610612565b6102cb61063b565b604051908152602001610281565b6102756102e73660046128b9565b600090815260019182016020526040902001546001600160a01b0316151590565b6102756103163660046128b9565b610663565b6102cb610681565b6102756103313660046128f7565b610690565b6102756103443660046128f7565b6106ba565b6102cb6106e4565b6102cb6106fd565b6102756103673660046128b9565b61070c565b6102cb610752565b6102756103823660046128b9565b610761565b81801561039357600080fd5b506103a76103a2366004612923565b6107a6565b005b6102756103b7366004612954565b6117d4565b6102756103ca3660046128f7565b6119c6565b6102cb6119f0565b6102cb6119ff565b6102cb611a0e565b6103ef611a34565b604051610281919061299a565b61027561040a3660046128b9565b612479565b61027561041d3660046128b9565b612494565b6102cb6124e2565b6102756104383660046128b9565b6124f1565b61027561044b3660046128b9565b612536565b6102cb6125b3565b6102cb6125dc565b61027561046e366004612a51565b6125eb565b6102756104813660046128b9565b612637565b6102756104943660046128b9565b612690565b6102cb6126c4565b6102cb6126d3565b6102756104b73660046128b9565b6126f5565b6102cb612710565b6102756104d23660046128b9565b61271f565b6102756104e5366004612a51565b61273d565b6102756104f83660046128b9565b6127ae565b61027561050b3660046128f7565b6127f0565b61027561051e3660046128b9565b61281a565b60006105738284600401600060405160200161053e90612a86565b60405160208183030381529060405280519060200120815260200190815260200160002060020161283590919063ffffffff16565b90505b92915050565b6001600160a01b038116600090815260208381526040808320905160019284916105a69101612abc565b60408051601f198184030181529181528151602092830120835290820192909252016000205460ff1660028111156105e0576105e0612aa6565b149392505050565b6001600160a01b038116600090815260208381526040808320905160019284916105a69101612adf565b60008181526004830160205260408120805482919061063090612b03565b905011905092915050565b60405160200161064a90612b3d565b6040516020818303038152906040528051906020012081565b60008181526003830160205260408120805482919061063090612b03565b60405160200161064a90612b62565b6001600160a01b038116600090815260208381526040808320905160019284916105a69101612b82565b6001600160a01b038116600090815260208381526040808320905160019284916105a69101612b3d565b604051640312e302e360dc1b602082015260250161064a565b60405160200161064a90612b9f565b600081815260018084016020526040822001546001600160a01b03161580159061057357505060009081526001918201602052604090200154600160a01b900460ff1690565b60405160200161064a90612abc565b60008181526004830160205260408120805482919061077f90612b03565b90501180156105735750506000908152600491909101602052604090206001015460ff1690565b33600090815260208281526040808320905160019391926107c79101612b82565b60408051601f19818403018152918152815160209283012083529082019290925201600020805460ff1916600183600281111561080657610806612aa6565b0217905550336000908152602082815260408083209051600193919261082c9101612adf565b60408051601f19818403018152918152815160209283012083529082019290925201600020805460ff1916600183600281111561086b5761086b612aa6565b0217905550604051806040016040528060118152602001704c4956454c595f41444d494e5f524f4c4560781b8152508160020160006040516020016108af90612b82565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816108e29190612c20565b5060018160020160006040516020016108fa90612b82565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff02191690831515021790555060405160200161094790612a86565b6040516020818303038152906040528051906020012081600201600060405160200161097290612b82565b604051602081830303815290604052805190602001208152602001908152602001600020600101819055506109eb338260020160006040516020016109b690612b82565b60405160208183030381529060405280519060200120815260200190815260200160002060030161284d90919063ffffffff16565b50604051806040016040528060188152602001774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b815250816002016000604051602001610a3290612adf565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610a659190612c20565b506001816002016000604051602001610a7d90612adf565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610aca90612a86565b60405160208183030381529060405280519060200120816002016000604051602001610af590612adf565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550610b39338260020160006040516020016109b690612adf565b50604051806040016040528060198152602001784c4956454c595f41535345545f4d414e414745525f524f4c4560381b815250816002016000604051602001610b8190612ce0565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610bb49190612c20565b506001816002016000604051602001610bcc90612ce0565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610c1990612d05565b60405160208183030381529060405280519060200120816002016000604051602001610c4490612ce0565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550604051806040016040528060178152602001764c4956454c595f41535345545f41444d494e5f524f4c4560481b815250816002016000604051602001610cb490612abc565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610ce79190612c20565b506001816002016000604051602001610cff90612abc565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610d4c90612d05565b60405160208183030381529060405280519060200120816002016000604051602001610d7790612abc565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550604051806040016040528060198152602001784c4956454c595f434f4d4d554e4954595f44414f5f524f4c4560381b815250816002016000604051602001610de990612b3d565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610e1c9190612c20565b506001816002016000604051602001610e3490612b3d565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610e8190612b9f565b60405160208183030381529060405280519060200120816002016000604051602001610eac90612b3d565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550604051806060016040528060228152602001612d9760229139816002016000604051602001610f0590612d23565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081610f389190612c20565b506001816002016000604051602001610f5090612d23565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001610f9d90612b9f565b60405160208183030381529060405280519060200120816002016000604051602001610fc890612d23565b60405160208183030381529060405280519060200120815260200190815260200160002060010181905550604051806040016040528060158152602001744c4956454c595f414e4f4e594d4f55535f524f4c4560581b81525081600201600060405160200161105290744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816110859190612c20565b5060018160020160006040516020016110b990744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff02191690831515021790555060405160200161110690612a86565b6040516020818303038152906040528051906020012081600201600060405160200161114d90744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b604051602081830303815290604052805190602001208152602001908152602001600020600101819055506040518060400160405280601481526020017304c4956454c595f47454e4552414c5f47524f55560641b8152508160040160006040516020016111ba90612a86565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816111ed9190612c20565b50600181600401600060405160200161120590612a86565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff0219169083151502179055506112b560405160200161125590612b82565b6040516020818303038152906040528051906020012082600401600060405160200161128090612a86565b60405160208183030381529060405280519060200120815260200190815260200160002060020161286290919063ffffffff16565b506112c860405160200161125590612adf565b506040518060400160405280601081526020016f04c4956454c595f44414f5f47524f55560841b81525081600401600060405160200161130790612b9f565b604051602081830303815290604052805190602001208152602001908152602001600020600001908161133a9190612c20565b50600181600401600060405160200161135290612b9f565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff0219169083151502179055506113cd6040516020016113a290612b3d565b6040516020818303038152906040528051906020012082600401600060405160200161128090612b9f565b506113e06040516020016113a290612d23565b506040518060400160405280601281526020017104c4956454c595f41535345545f47524f55560741b81525081600401600060405160200161142190612d05565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816114549190612c20565b50600181600401600060405160200161146c90612d05565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff0219169083151502179055506114e76040516020016114bc90612ce0565b6040516020818303038152906040528051906020012082600401600060405160200161128090612d05565b506114fa6040516020016114bc90612abc565b50604051806040016040528060148152602001734c4956454c595f47454e4552414c5f5245414c4d60601b81525081600301600060405160200161153d90612b62565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816115709190612c20565b50600181600301600060405160200161158890612b62565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff02191690831515021790555060018160030160006040516020016115dd90612b62565b60408051601f19818403018152918152815160209283012083528282019390935290820160002060010180549315156101000261ff00199094169390931790925580513060601b6bffffffffffffffffffffffff19168184015281516014818303018152603490910190915280519101206116679082600301600060405160200161128090612b62565b50604051806040016040528060128152602001714c4956454c595f41535345545f5245414c4d60701b8152508160030160006040516020016116c190714c4956454c595f41535345545f5245414c4d60701b815260120190565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816116f49190612c20565b50600181600301600060405160200161172590714c4956454c595f41535345545f5245414c4d60701b815260120190565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff021916908315150217905550600181600301600060405160200161179390714c4956454c595f41535345545f5245414c4d60701b815260120190565b60405160208183030381529060405280519060200120815260200190815260200160002060010160016101000a81548160ff02191690831515021790555050565b600083815260018501602090815260408083206001600160e01b031985168452600201825280832054905190916118279101744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b6040516020818303038152906040528051906020012081036118b5576000858152600187810160205260409091200154600160a01b900460ff1680156118ad5750600160008681526001808901602090815260408084206001600160e01b0319891685526002908101909252909220015460ff16908111156118ab576118ab612aa6565b145b9150506119be565b6000858152600187810160205260409091200154600160a01b900460ff16801561191f5750600160008681526001808901602090815260408084206001600160e01b0319891685526002908101909252909220015460ff169081111561191d5761191d612aa6565b145b801561194d5750600085815260018088016020908152604080842054845260038a01909152909120015460ff165b801561197f575060008181526002870160209081526040808320600190810154845260048a01909252909120015460ff165b80156118ad575060016001600160a01b03851660009081526020888152604080832085845290915290205460ff1660028111156118ab576118ab612aa6565b949350505050565b6001600160a01b038116600090815260208381526040808320905160019284916105a69101612d23565b60405160200161064a90612d05565b60405160200161064a90612adf565b604051714c4956454c595f41535345545f5245414c4d60701b602082015260320161064a565b604080516002808252606082810190935260009190816020015b60408051606080820183526000808352602083019190915291810191909152815260200190600190039081611a4e579050509050604051602001611a9190612b82565b6040516020818303038152906040528051906020012081600081518110611aba57611aba612d57565b60200260200101516000018181525050600181600081518110611adf57611adf612d57565b602090810291909101810151911515604092830152815160168082526102e08201909352919082016102c0803683370190505081600081518110611b2557611b25612d57565b6020026020010151602001819052506348e6be1c60e01b81600081518110611b4f57611b4f612d57565b602002602001015160200151600081518110611b6d57611b6d612d57565b6001600160e01b031990921660209283029190910190910152805163225bf2f960e11b908290600090611ba257611ba2612d57565b602002602001015160200151600181518110611bc057611bc0612d57565b6001600160e01b031990921660209283029190910190910152805163031c049360e01b908290600090611bf557611bf5612d57565b602002602001015160200151600281518110611c1357611c13612d57565b6001600160e01b0319909216602092830291909101909101528051635ac4b36f60e11b908290600090611c4857611c48612d57565b602002602001015160200151600381518110611c6657611c66612d57565b6001600160e01b031990921660209283029190910190910152805163771bcf4560e01b908290600090611c9b57611c9b612d57565b602002602001015160200151600481518110611cb957611cb9612d57565b6001600160e01b0319909216602092830291909101909101528051634346a04b60e01b908290600090611cee57611cee612d57565b602002602001015160200151600581518110611d0c57611d0c612d57565b6001600160e01b031990921660209283029190910190910152805163d338640160e01b908290600090611d4157611d41612d57565b602002602001015160200151600681518110611d5f57611d5f612d57565b6001600160e01b03199092166020928302919091019091015280516370420ee360e01b908290600090611d9457611d94612d57565b602002602001015160200151600781518110611db257611db2612d57565b6001600160e01b031990921660209283029190910190910152805163b2dc26e560e01b908290600090611de757611de7612d57565b602002602001015160200151600881518110611e0557611e05612d57565b6001600160e01b0319909216602092830291909101909101528051634f1d167560e11b908290600090611e3a57611e3a612d57565b602002602001015160200151600981518110611e5857611e58612d57565b6001600160e01b03199092166020928302919091019091015280516308f09e0f60e41b908290600090611e8d57611e8d612d57565b602002602001015160200151600a81518110611eab57611eab612d57565b6001600160e01b03199092166020928302919091019091015280516393ba313160e01b908290600090611ee057611ee0612d57565b602002602001015160200151600b81518110611efe57611efe612d57565b6001600160e01b031990921660209283029190910190910152805163df01de4560e01b908290600090611f3357611f33612d57565b602002602001015160200151600c81518110611f5157611f51612d57565b6001600160e01b03199092166020928302919091019091015280516362ab810560e11b908290600090611f8657611f86612d57565b602002602001015160200151600d81518110611fa457611fa4612d57565b6001600160e01b031990921660209283029190910190910152805163738f112760e11b908290600090611fd957611fd9612d57565b602002602001015160200151600e81518110611ff757611ff7612d57565b6001600160e01b0319909216602092830291909101909101528051630dbf304b60e41b90829060009061202c5761202c612d57565b602002602001015160200151600f8151811061204a5761204a612d57565b6001600160e01b03199092166020928302919091019091015280516307e9933760e31b90829060009061207f5761207f612d57565b60200260200101516020015160108151811061209d5761209d612d57565b6001600160e01b031990921660209283029190910190910152805163b6c03f0360e01b9082906000906120d2576120d2612d57565b6020026020010151602001516011815181106120f0576120f0612d57565b6001600160e01b03199092166020928302919091019091015280516312ec6fa360e21b90829060009061212557612125612d57565b60200260200101516020015160128151811061214357612143612d57565b6001600160e01b03199092166020928302919091019091015280516322df6f5b60e21b90829060009061217857612178612d57565b60200260200101516020015160138151811061219657612196612d57565b6001600160e01b031990921660209283029190910190910152805163f2c673bd60e01b9082906000906121cb576121cb612d57565b6020026020010151602001516014815181106121e9576121e9612d57565b60200260200101906001600160e01b03191690816001600160e01b031916815250507f756af45f4ce05d832bee0c171992c529ad6d3ca8e13303d78feace2f8fd7faf28160008151811061223f5761223f612d57565b60200260200101516020015160158151811061225d5761225d612d57565b6001600160e01b03199092166020928302919091018201526040516122829101612adf565b60405160208183030381529060405280519060200120816001815181106122ab576122ab612d57565b602002602001015160000181815250506001816001815181106122d0576122d0612d57565b6020908102919091018101519115156040928301528151600480825260a0820190935291908201608080368337019050508160018151811061231457612314612d57565b60200260200101516020018190525063d9dc1f1960e01b8160018151811061233e5761233e612d57565b60200260200101516020015160008151811061235c5761235c612d57565b6001600160e01b0319909216602092830291909101909101528051637147855d60e01b908290600190811061239357612393612d57565b6020026020010151602001516001815181106123b1576123b1612d57565b6001600160e01b03199092166020928302919091019091015280516378efa4ed60e11b90829060019081106123e8576123e8612d57565b60200260200101516020015160028151811061240657612406612d57565b6001600160e01b0319909216602092830291909101909101528051631ccb7c8d60e31b908290600190811061243d5761243d612d57565b60200260200101516020015160038151811061245b5761245b612d57565b6001600160e01b031990921660209283029190910190910152919050565b60006105738284600301600060405160200161053e90612b62565b6000818152600383016020526040812080546124af90612b03565b90506000036124c057506000610576565b5060009081526003919091016020526040902060010154610100900460ff1690565b60405160200161064a90612a86565b60008181526003830160205260408120805482919061250f90612b03565b90501180156105735750506000908152600391909101602052604090206001015460ff1690565b600081815260018084016020908152604080842090920154825163be22465d60e01b815292516001600160a01b039091169263be22465d9260048083019391928290030181865afa15801561258f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105739190612d6d565b604051744c4956454c595f414e4f4e594d4f55535f524f4c4560581b602082015260350161064a565b60405160200161064a90612ce0565b600082815260018085016020526040822001546001600160a01b0316158015906119be5750600083815260018501602052604090206119be906003016001600160e01b03198416612835565b6000818152600180840160209081526040808420909201548251630151e76560e61b815292516001600160a01b0390911692635479d9409260048083019391928290030181865afa15801561258f573d6000803e3d6000fd5b60006105738284600301600060405160200161053e90714c4956454c595f41535345545f5245414c4d60701b815260120190565b60405160200161064a90612d23565b6040516d131058d8d95cdcd0dbdb9d1c9bdb60921b6020820152602e0161064a565b60006105738284600401600060405160200161053e90612b9f565b60405160200161064a90612b82565b60008181526002830160205260408120805482919061063090612b03565b600082815260018085016020526040822001546001600160a01b0316158015906119be5750600160008481526001808701602090815260408084206001600160e01b0319881685526002908101909252909220015460ff16908111156127a5576127a5612aa6565b14949350505050565b6000818152600283016020526040812080548291906127cc90612b03565b90501180156105735750506000908152600291820160205260409020015460ff1690565b6001600160a01b038116600090815260208381526040808320905160019284916105a69101612ce0565b60006105738284600401600060405160200161053e90612d05565b60008181526001830160205260408120541515610573565b6000610573836001600160a01b03841661286a565b600061057383835b60008181526001830160205260408120546128b157508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610576565b506000610576565b600080604083850312156128cc57600080fd5b50508035926020909101359150565b80356001600160a01b03811681146128f257600080fd5b919050565b6000806040838503121561290a57600080fd5b8235915061291a602084016128db565b90509250929050565b60006020828403121561293557600080fd5b5035919050565b80356001600160e01b0319811681146128f257600080fd5b6000806000806080858703121561296a57600080fd5b8435935060208501359250612981604086016128db565b915061298f6060860161293c565b905092959194509250565b60006020808301818452808551808352604092508286019150828160051b8701018488016000805b84811015612a4257898403603f190186528251805185528881015160608a8701819052815190870181905260808701918b019085905b80821015612a225782516001600160e01b0319168452928c0192918c0191600191909101906129f8565b5050509088015115159488019490945294870194918701916001016129c2565b50919998505050505050505050565b600080600060608486031215612a6657600080fd5b8335925060208401359150612a7d6040850161293c565b90509250925092565b7304c4956454c595f47454e4552414c5f47524f55560641b815260140190565b634e487b7160e01b600052602160045260246000fd5b764c4956454c595f41535345545f41444d494e5f524f4c4560481b815260170190565b774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b815260180190565b600181811c90821680612b1757607f821691505b602082108103612b3757634e487b7160e01b600052602260045260246000fd5b50919050565b784c4956454c595f434f4d4d554e4954595f44414f5f524f4c4560381b815260190190565b734c4956454c595f47454e4552414c5f5245414c4d60601b815260140190565b704c4956454c595f41444d494e5f524f4c4560781b815260110190565b6f04c4956454c595f44414f5f47524f55560841b815260100190565b634e487b7160e01b600052604160045260246000fd5b601f821115612c1b57600081815260208120601f850160051c81016020861015612bf85750805b601f850160051c820191505b81811015612c1757828155600101612c04565b5050505b505050565b815167ffffffffffffffff811115612c3a57612c3a612bbb565b612c4e81612c488454612b03565b84612bd1565b602080601f831160018114612c835760008415612c6b5750858301515b600019600386901b1c1916600185901b178555612c17565b600085815260208120601f198616915b82811015612cb257888601518255948401946001909101908401612c93565b5085821015612cd05787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b784c4956454c595f41535345545f4d414e414745525f524f4c4560381b815260190190565b7104c4956454c595f41535345545f47524f55560741b815260120190565b7f4c4956454c595f434f4d4d554e4954595f44414f5f4558454355544f525f524f8152614c4560f01b602082015260220190565b634e487b7160e01b600052603260045260246000fd5b600060208284031215612d7f57600080fd5b81518015158114612d8f57600080fd5b939250505056fe4c4956454c595f434f4d4d554e4954595f44414f5f4558454355544f525f524f4c45a2646970667358221220b906701d8e250d699c761815a54aca98a3dbbb7819e6818969722d61212026eb64736f6c63430008110033";
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