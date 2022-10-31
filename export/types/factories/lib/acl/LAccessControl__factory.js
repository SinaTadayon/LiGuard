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
const _bytecode = "0x612df061003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061025d5760003560e01c806387d8e2b011610150578063c0a8ca0c116100cd578063d98ef62211610091578063d98ef622146104b1578063dd15702c146104c4578063e99b513a146104d7578063e9cfb672146104ea578063efec2d5e146104fd578063f0984ee61461051057600080fd5b8063c0a8ca0c1461045d578063cb4a1bb714610470578063cc6c326814610483578063ce34a66d14610496578063d8b31999146104a957600080fd5b8063a619675711610114578063a61967571461041f578063afb9270614610427578063b019d53a1461043a578063b899699c1461044d578063bec947511461045557600080fd5b806387d8e2b0146103a057806389b5a834146103cf5780639bb20d51146103e25780639fa79bf8146103ea578063a5f1e2fe1461040c57600080fd5b80634df89d6f116101de5780635f6cef3c116101a25780635f6cef3c1461035557806362f3c2d41461035d5780636787ad51146103725780636ac58ac11461038557806385de33361461038d57600080fd5b80634df89d6f14610301578063513d425a146103145780635632ffd8146103275780635a96334b1461032f5780635b8ba8981461034257600080fd5b80633167d0c4116102255780633167d0c4146102b8578063337cd188146102cb57806336206f04146102de57806337f4c930146102e65780634c95d60d146102f957600080fd5b8063108f5bdc1461026257806316b714ad1461027d57806320dd27af146102a05780632466209b146102a85780632d8bc9cb146102b0575b600080fd5b61026a610523565b6040519081526020015b60405180910390f35b61029061028b3660046128bb565b61054b565b6040519015158152602001610274565b61026a6105d1565b61026a6105e0565b61026a6105f9565b6102906102c63660046128bb565b610608565b6102906102d93660046128f9565b610658565b61026a6106c4565b6102906102f43660046128bb565b6106d3565b61026a6106fc565b61029061030f3660046128bb565b61070b565b61029061032236600461293d565b61072c565b61026a61091a565b61029061033d3660046128bb565b610929565b6102906103503660046128f9565b61096e565b61026a610998565b6103656109be565b6040516102749190612983565b6102906103803660046128bb565b611403565b61026a61141e565b61029061039b3660046128f9565b61142d565b6102906103ae3660046128bb565b600090815260019182016020526040902001546001600160a01b0316151590565b6102906103dd3660046128bb565b611457565b61026a61149c565b8180156103f657600080fd5b5061040a610405366004612a3a565b6114c5565b005b61029061041a3660046128bb565b6124f3565b61026a612539565b6102906104353660046128f9565b612548565b6102906104483660046128bb565b612572565b61026a6125c0565b61026a6125cf565b61029061046b3660046128bb565b6125f1565b61029061047e3660046128bb565b61264a565b6102906104913660046128bb565b61268f565b6102906104a43660046128bb565b6126ad565b61026a6126e1565b6102906104bf3660046128bb565b6126f0565b6102906104d2366004612a53565b61270b565b6102906104e5366004612a53565b61277c565b6102906104f83660046128f9565b6127c8565b61029061050b3660046128f9565b6127f2565b61029061051e3660046128bb565b61281c565b60405160200161053290612a88565b6040516020818303038152906040528051906020012081565b600081815260018084016020908152604080842090920154825163be22465d60e01b815292516001600160a01b039091169263be22465d9260048083019391928290030181865afa1580156105a4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c89190612aad565b90505b92915050565b60405160200161053290612ad6565b604051640312e302e360dc1b6020820152602501610532565b60405160200161053290612af6565b60006105c88284600301600060405160200161062390612ad6565b60405160208183030381529060405280519060200120815260200190815260200160002060020161283790919063ffffffff16565b6001600160a01b038116600090815260208381526040808320905160019284916106829101612b28565b60408051601f198184030181529181528151602092830120835290820192909252016000205460ff1660028111156106bc576106bc612b12565b149392505050565b60405160200161053290612b4c565b6000818152600383016020526040812080548291906106f190612b6f565b905011905092915050565b60405160200161053290612ba9565b6000818152600283016020526040812060010180548291906106f190612b6f565b600083815260018501602090815260408083206001600160e01b0319851684526002018252808320549051909161077f9101744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b60405160208183030381529060405280519060200120810361080d576000858152600187810160205260409091200154600160a01b900460ff1680156108055750600160008681526001808901602090815260408084206001600160e01b0319891685526002908101909252909220015460ff169081111561080357610803612b12565b145b915050610912565b6000858152600187810160205260409091200154600160a01b900460ff1680156108775750600160008681526001808901602090815260408084206001600160e01b0319891685526002908101909252909220015460ff169081111561087557610875612b12565b145b80156108a55750600085815260018088016020908152604080842054845260038a01909152909120015460ff165b80156108d35750600081815260028701602090815260408083205483526004890190915290206001015460ff165b8015610805575060016001600160a01b03851660009081526020888152604080832085845290915290205460ff16600281111561080357610803612b12565b949350505050565b60405160200161053290612b28565b60008181526004830160205260408120805482919061094790612b6f565b90501180156105c85750506000908152600491909101602052604090206001015460ff1690565b6001600160a01b038116600090815260208381526040808320905160019284916106829101612bc7565b604051714c4956454c595f41535345545f5245414c4d60701b6020820152603201610532565b604080516002808252606082810190935260009190816020015b604080516060808201835260008083526020830191909152918101919091528152602001906001900390816109d8579050509050604051602001610a1b90612c11565b6040516020818303038152906040528051906020012081600081518110610a4457610a44612c2e565b60200260200101516000018181525050600181600081518110610a6957610a69612c2e565b602090810291909101810151911515604092830152815160168082526102e08201909352919082016102c0803683370190505081600081518110610aaf57610aaf612c2e565b6020026020010151602001819052506348e6be1c60e01b81600081518110610ad957610ad9612c2e565b602002602001015160200151600081518110610af757610af7612c2e565b6001600160e01b031990921660209283029190910190910152805163225bf2f960e11b908290600090610b2c57610b2c612c2e565b602002602001015160200151600181518110610b4a57610b4a612c2e565b6001600160e01b031990921660209283029190910190910152805163031c049360e01b908290600090610b7f57610b7f612c2e565b602002602001015160200151600281518110610b9d57610b9d612c2e565b6001600160e01b0319909216602092830291909101909101528051635ac4b36f60e11b908290600090610bd257610bd2612c2e565b602002602001015160200151600381518110610bf057610bf0612c2e565b6001600160e01b031990921660209283029190910190910152805163771bcf4560e01b908290600090610c2557610c25612c2e565b602002602001015160200151600481518110610c4357610c43612c2e565b6001600160e01b0319909216602092830291909101909101528051634346a04b60e01b908290600090610c7857610c78612c2e565b602002602001015160200151600581518110610c9657610c96612c2e565b6001600160e01b031990921660209283029190910190910152805163d338640160e01b908290600090610ccb57610ccb612c2e565b602002602001015160200151600681518110610ce957610ce9612c2e565b6001600160e01b03199092166020928302919091019091015280516370420ee360e01b908290600090610d1e57610d1e612c2e565b602002602001015160200151600781518110610d3c57610d3c612c2e565b6001600160e01b031990921660209283029190910190910152805163b2dc26e560e01b908290600090610d7157610d71612c2e565b602002602001015160200151600881518110610d8f57610d8f612c2e565b6001600160e01b0319909216602092830291909101909101528051634f1d167560e11b908290600090610dc457610dc4612c2e565b602002602001015160200151600981518110610de257610de2612c2e565b6001600160e01b03199092166020928302919091019091015280516308f09e0f60e41b908290600090610e1757610e17612c2e565b602002602001015160200151600a81518110610e3557610e35612c2e565b6001600160e01b03199092166020928302919091019091015280516393ba313160e01b908290600090610e6a57610e6a612c2e565b602002602001015160200151600b81518110610e8857610e88612c2e565b6001600160e01b031990921660209283029190910190910152805163df01de4560e01b908290600090610ebd57610ebd612c2e565b602002602001015160200151600c81518110610edb57610edb612c2e565b6001600160e01b03199092166020928302919091019091015280516362ab810560e11b908290600090610f1057610f10612c2e565b602002602001015160200151600d81518110610f2e57610f2e612c2e565b6001600160e01b031990921660209283029190910190910152805163738f112760e11b908290600090610f6357610f63612c2e565b602002602001015160200151600e81518110610f8157610f81612c2e565b6001600160e01b0319909216602092830291909101909101528051630dbf304b60e41b908290600090610fb657610fb6612c2e565b602002602001015160200151600f81518110610fd457610fd4612c2e565b6001600160e01b03199092166020928302919091019091015280516307e9933760e31b90829060009061100957611009612c2e565b60200260200101516020015160108151811061102757611027612c2e565b6001600160e01b031990921660209283029190910190910152805163b6c03f0360e01b90829060009061105c5761105c612c2e565b60200260200101516020015160118151811061107a5761107a612c2e565b6001600160e01b03199092166020928302919091019091015280516312ec6fa360e21b9082906000906110af576110af612c2e565b6020026020010151602001516012815181106110cd576110cd612c2e565b6001600160e01b03199092166020928302919091019091015280516322df6f5b60e21b90829060009061110257611102612c2e565b60200260200101516020015160138151811061112057611120612c2e565b6001600160e01b031990921660209283029190910190910152805163f2c673bd60e01b90829060009061115557611155612c2e565b60200260200101516020015160148151811061117357611173612c2e565b60200260200101906001600160e01b03191690816001600160e01b031916815250507f756af45f4ce05d832bee0c171992c529ad6d3ca8e13303d78feace2f8fd7faf2816000815181106111c9576111c9612c2e565b6020026020010151602001516015815181106111e7576111e7612c2e565b6001600160e01b031990921660209283029190910182015260405161120c9101612b28565b604051602081830303815290604052805190602001208160018151811061123557611235612c2e565b6020026020010151600001818152505060018160018151811061125a5761125a612c2e565b6020908102919091018101519115156040928301528151600480825260a0820190935291908201608080368337019050508160018151811061129e5761129e612c2e565b60200260200101516020018190525063d9dc1f1960e01b816001815181106112c8576112c8612c2e565b6020026020010151602001516000815181106112e6576112e6612c2e565b6001600160e01b0319909216602092830291909101909101528051637147855d60e01b908290600190811061131d5761131d612c2e565b60200260200101516020015160018151811061133b5761133b612c2e565b6001600160e01b03199092166020928302919091019091015280516378efa4ed60e11b908290600190811061137257611372612c2e565b60200260200101516020015160028151811061139057611390612c2e565b6001600160e01b0319909216602092830291909101909101528051631ccb7c8d60e31b90829060019081106113c7576113c7612c2e565b6020026020010151602001516003815181106113e5576113e5612c2e565b6001600160e01b031990921660209283029190910190910152919050565b60006105c88284600401600060405160200161062390612ba9565b60405160200161053290612c44565b6001600160a01b038116600090815260208381526040808320905160019284916106829101612a88565b60008181526003830160205260408120805482919061147590612b6f565b90501180156105c85750506000908152600391909101602052604090206001015460ff1690565b604051744c4956454c595f414e4f4e594d4f55535f524f4c4560581b6020820152603501610532565b33600090815260208281526040808320905160019391926114e69101612c11565b60408051601f19818403018152918152815160209283012083529082019290925201600020805460ff1916600183600281111561152557611525612b12565b0217905550336000908152602082815260408083209051600193919261154b9101612b28565b60408051601f19818403018152918152815160209283012083529082019290925201600020805460ff1916600183600281111561158a5761158a612b12565b0217905550604051806040016040528060118152602001704c4956454c595f41444d494e5f524f4c4560781b8152508160020160006040516020016115ce90612c11565b60405160208183030381529060405280519060200120815260200190815260200160002060010190816116019190612cb3565b50600181600201600060405160200161161990612c11565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff02191690831515021790555060405160200161166690612c44565b6040516020818303038152906040528051906020012081600201600060405160200161169190612c11565b6040516020818303038152906040528051906020012081526020019081526020016000206000018190555061170a338260020160006040516020016116d590612c11565b60405160208183030381529060405280519060200120815260200190815260200160002060030161284f90919063ffffffff16565b50604051806040016040528060188152602001774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b81525081600201600060405160200161175190612b28565b60405160208183030381529060405280519060200120815260200190815260200160002060010190816117849190612cb3565b50600181600201600060405160200161179c90612b28565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff0219169083151502179055506040516020016117e990612c44565b6040516020818303038152906040528051906020012081600201600060405160200161181490612b28565b60405160208183030381529060405280519060200120815260200190815260200160002060000181905550611858338260020160006040516020016116d590612b28565b50604051806040016040528060198152602001784c4956454c595f41535345545f4d414e414745525f524f4c4560381b8152508160020160006040516020016118a090612d73565b60405160208183030381529060405280519060200120815260200190815260200160002060010190816118d39190612cb3565b5060018160020160006040516020016118eb90612d73565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff02191690831515021790555060405160200161193890612ba9565b6040516020818303038152906040528051906020012081600201600060405160200161196390612d73565b60405160208183030381529060405280519060200120815260200190815260200160002060000181905550604051806040016040528060178152602001764c4956454c595f41535345545f41444d494e5f524f4c4560481b8152508160020160006040516020016119d390612b4c565b6040516020818303038152906040528051906020012081526020019081526020016000206001019081611a069190612cb3565b506001816002016000604051602001611a1e90612b4c565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001611a6b90612ba9565b60405160208183030381529060405280519060200120816002016000604051602001611a9690612b4c565b60405160208183030381529060405280519060200120815260200190815260200160002060000181905550604051806040016040528060198152602001784c4956454c595f434f4d4d554e4954595f44414f5f524f4c4560381b815250816002016000604051602001611b0890612a88565b6040516020818303038152906040528051906020012081526020019081526020016000206001019081611b3b9190612cb3565b506001816002016000604051602001611b5390612a88565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001611ba090612af6565b60405160208183030381529060405280519060200120816002016000604051602001611bcb90612a88565b60405160208183030381529060405280519060200120815260200190815260200160002060000181905550604051806060016040528060228152602001612d9960229139816002016000604051602001611c2490612bc7565b6040516020818303038152906040528051906020012081526020019081526020016000206001019081611c579190612cb3565b506001816002016000604051602001611c6f90612bc7565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001611cbc90612af6565b60405160208183030381529060405280519060200120816002016000604051602001611ce790612bc7565b60405160208183030381529060405280519060200120815260200190815260200160002060000181905550604051806040016040528060158152602001744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815250816002016000604051602001611d7190744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b6040516020818303038152906040528051906020012081526020019081526020016000206001019081611da49190612cb3565b506001816002016000604051602001611dd890744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b60405160208183030381529060405280519060200120815260200190815260200160002060020160006101000a81548160ff021916908315150217905550604051602001611e2590612c44565b60405160208183030381529060405280519060200120816002016000604051602001611e6c90744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b604051602081830303815290604052805190602001208152602001908152602001600020600001819055506040518060400160405280601481526020017304c4956454c595f47454e4552414c5f47524f55560641b815250816004016000604051602001611ed990612c44565b6040516020818303038152906040528051906020012081526020019081526020016000206000019081611f0c9190612cb3565b506001816004016000604051602001611f2490612c44565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff021916908315150217905550611fd4604051602001611f7490612c11565b60405160208183030381529060405280519060200120826004016000604051602001611f9f90612c44565b60405160208183030381529060405280519060200120815260200190815260200160002060020161286490919063ffffffff16565b50611fe7604051602001611f7490612b28565b506040518060400160405280601081526020016f04c4956454c595f44414f5f47524f55560841b81525081600401600060405160200161202690612af6565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816120599190612cb3565b50600181600401600060405160200161207190612af6565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff0219169083151502179055506120ec6040516020016120c190612a88565b60405160208183030381529060405280519060200120826004016000604051602001611f9f90612af6565b506120ff6040516020016120c190612bc7565b506040518060400160405280601281526020017104c4956454c595f41535345545f47524f55560741b81525081600401600060405160200161214090612ba9565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816121739190612cb3565b50600181600401600060405160200161218b90612ba9565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff0219169083151502179055506122066040516020016121db90612d73565b60405160208183030381529060405280519060200120826004016000604051602001611f9f90612ba9565b506122196040516020016121db90612b4c565b50604051806040016040528060148152602001734c4956454c595f47454e4552414c5f5245414c4d60601b81525081600301600060405160200161225c90612ad6565b604051602081830303815290604052805190602001208152602001908152602001600020600001908161228f9190612cb3565b5060018160030160006040516020016122a790612ad6565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff02191690831515021790555060018160030160006040516020016122fc90612ad6565b60408051601f19818403018152918152815160209283012083528282019390935290820160002060010180549315156101000261ff00199094169390931790925580513060601b6bffffffffffffffffffffffff191681840152815160148183030181526034909101909152805191012061238690826003016000604051602001611f9f90612ad6565b50604051806040016040528060128152602001714c4956454c595f41535345545f5245414c4d60701b8152508160030160006040516020016123e090714c4956454c595f41535345545f5245414c4d60701b815260120190565b60405160208183030381529060405280519060200120815260200190815260200160002060000190816124139190612cb3565b50600181600301600060405160200161244490714c4956454c595f41535345545f5245414c4d60701b815260120190565b60405160208183030381529060405280519060200120815260200190815260200160002060010160006101000a81548160ff02191690831515021790555060018160030160006040516020016124b290714c4956454c595f41535345545f5245414c4d60701b815260120190565b60405160208183030381529060405280519060200120815260200190815260200160002060010160016101000a81548160ff02191690831515021790555050565b600081815260018084016020526040822001546001600160a01b0316158015906105c857505060009081526001918201602052604090200154600160a01b900460ff1690565b60405160200161053290612d73565b6001600160a01b038116600090815260208381526040808320905160019284916106829101612d73565b60008181526003830160205260408120805461258d90612b6f565b905060000361259e575060006105cb565b5060009081526003919091016020526040902060010154610100900460ff1690565b60405160200161053290612bc7565b6040516d131058d8d95cdcd0dbdb9d1c9bdb60921b6020820152602e01610532565b6000818152600180840160209081526040808420909201548251630151e76560e61b815292516001600160a01b0390911692635479d9409260048083019391928290030181865afa1580156105a4573d6000803e3d6000fd5b60008181526002830160205260408120600101805482919061266b90612b6f565b90501180156105c85750506000908152600291820160205260409020015460ff1690565b6000818152600483016020526040812080548291906106f190612b6f565b60006105c88284600301600060405160200161062390714c4956454c595f41535345545f5245414c4d60701b815260120190565b60405160200161053290612c11565b60006105c88284600401600060405160200161062390612af6565b600082815260018085016020526040822001546001600160a01b0316158015906109125750600160008481526001808701602090815260408084206001600160e01b0319881685526002908101909252909220015460ff169081111561277357612773612b12565b14949350505050565b600082815260018085016020526040822001546001600160a01b031615801590610912575060008381526001850160205260409020610912906003016001600160e01b03198416612837565b6001600160a01b038116600090815260208381526040808320905160019284916106829101612b4c565b6001600160a01b038116600090815260208381526040808320905160019284916106829101612c11565b60006105c88284600401600060405160200161062390612c44565b600081815260018301602052604081205415156105c8565b60006105c8836001600160a01b03841661286c565b60006105c883835b60008181526001830160205260408120546128b3575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556105cb565b5060006105cb565b600080604083850312156128ce57600080fd5b50508035926020909101359150565b80356001600160a01b03811681146128f457600080fd5b919050565b6000806040838503121561290c57600080fd5b8235915061291c602084016128dd565b90509250929050565b80356001600160e01b0319811681146128f457600080fd5b6000806000806080858703121561295357600080fd5b843593506020850135925061296a604086016128dd565b915061297860608601612925565b905092959194509250565b60006020808301818452808551808352604092508286019150828160051b8701018488016000805b84811015612a2b57898403603f190186528251805185528881015160608a8701819052815190870181905260808701918b019085905b80821015612a0b5782516001600160e01b0319168452928c0192918c0191600191909101906129e1565b5050509088015115159488019490945294870194918701916001016129ab565b50919998505050505050505050565b600060208284031215612a4c57600080fd5b5035919050565b600080600060608486031215612a6857600080fd5b8335925060208401359150612a7f60408501612925565b90509250925092565b784c4956454c595f434f4d4d554e4954595f44414f5f524f4c4560381b815260190190565b600060208284031215612abf57600080fd5b81518015158114612acf57600080fd5b9392505050565b734c4956454c595f47454e4552414c5f5245414c4d60601b815260140190565b6f04c4956454c595f44414f5f47524f55560841b815260100190565b634e487b7160e01b600052602160045260246000fd5b774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b815260180190565b764c4956454c595f41535345545f41444d494e5f524f4c4560481b815260170190565b600181811c90821680612b8357607f821691505b602082108103612ba357634e487b7160e01b600052602260045260246000fd5b50919050565b7104c4956454c595f41535345545f47524f55560741b815260120190565b7f4c4956454c595f434f4d4d554e4954595f44414f5f4558454355544f525f524f8152614c4560f01b602082015260220190565b634e487b7160e01b600052604160045260246000fd5b704c4956454c595f41444d494e5f524f4c4560781b815260110190565b634e487b7160e01b600052603260045260246000fd5b7304c4956454c595f47454e4552414c5f47524f55560641b815260140190565b601f821115612cae57600081815260208120601f850160051c81016020861015612c8b5750805b601f850160051c820191505b81811015612caa57828155600101612c97565b5050505b505050565b815167ffffffffffffffff811115612ccd57612ccd612bfb565b612ce181612cdb8454612b6f565b84612c64565b602080601f831160018114612d165760008415612cfe5750858301515b600019600386901b1c1916600185901b178555612caa565b600085815260208120601f198616915b82811015612d4557888601518255948401946001909101908401612d26565b5085821015612d635787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b784c4956454c595f41535345545f4d414e414745525f524f4c4560381b81526019019056fe4c4956454c595f434f4d4d554e4954595f44414f5f4558454355544f525f524f4c45a2646970667358221220f689c0175504c7631bcb0736476d44aee9784562301f1993b9f319bd9e27468a64736f6c63430008110033";
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