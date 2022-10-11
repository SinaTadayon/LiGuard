"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LContextManagement__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "CTX_MESSAGE_TYPEHASH",
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
        name: "PREDICT_CTX_MESSAGE_TYPEHASH",
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
        name: "TYPE_HASH",
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
const _bytecode = "0x613c3461003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106101205760003560e01c806364d4c819116100ac578063b0c255751161007b578063b0c255751461036c578063bec947511461038c578063ec77eb2114610394578063f0b15def146103b4578063faee6718146103db57600080fd5b806364d4c8191461029b5780637134bb45146102c2578063733ae93e146102e55780637cc5941d1461034c57600080fd5b80633e015ef6116100f35780633e015ef6146101e4578063453dd6dc1461021b5780634ac3fdd41461023b578063518bf9601461025b5780635acd816a1461027b57600080fd5b8063099a0c2e1461012557806315922efe1461016a5780632466209b146101a757806334109de2146101bd575b600080fd5b81801561013157600080fd5b506101456101403660046134f1565b6103fb565b604080516001600160a01b039384168152929091166020830152015b60405180910390f35b81801561017657600080fd5b5061018a610185366004613582565b610673565b604080519283526001600160a01b03909116602083015201610161565b6101af61087b565b604051908152602001610161565b6101af7f7aabe2571874f2a330ea11c8972d9cc3792d973efc6b36e3e29005861a34418881565b8180156101f057600080fd5b506102046101ff366004613609565b6108a9565b604080519215158352602083019190915201610161565b81801561022757600080fd5b506101af610236366004613652565b610b9e565b81801561024757600080fd5b5061018a61025636600461368f565b610e62565b81801561026757600080fd5b506101af610276366004613652565b6110ac565b81801561028757600080fd5b506101af610296366004613652565b61135e565b6101af7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81565b6102d56102d0366004613711565b61160b565b6040519015158152602001610161565b6102f86102f3366004613750565b6116b1565b60405161016191908151815260208083015190820152604080830151908201526060808301516001600160a01b03169082015260808083015115159082015260a09182015115159181019190915260c00190565b81801561035857600080fd5b50610204610367366004613783565b61197e565b81801561037857600080fd5b506101af6103873660046137bc565b611baf565b6101af611e47565b6103a76103a2366004613750565b611e6d565b60405161016191906137f1565b6101af7f210e35e86b887de2dcef95a381a8278f979cd7b7bbbe99972070d2549710564681565b8180156103e757600080fd5b506101af6103f6366004613856565b611fa6565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561043c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061046091906138ad565b156104865760405162461bcd60e51b815260040161047d906138ca565b60405180910390fd5b600061051061049b6080880160608901613901565b604080517f7aabe2571874f2a330ea11c8972d9cc3792d973efc6b36e3e29005861a3441886020828101919091526001600160a01b03939093168183015289356060820152828a01356080820152818a013560a0808301919091528251808303909101815260c0909101909152805191012090565b9050600061051d82611fc1565b905060008061052c838b61200f565b909250905060008160048111156105455761054561391c565b146105625760405162461bcd60e51b815260040161047d90613932565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608d6105863061207d565b6040516001600160e01b031960e085901b1681526105b39291908790631ccb7c8d60e31b90600401613969565b602060405180830381865af41580156105d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f491906138ad565b6106405760405162461bcd60e51b815260206004820152601b60248201527f557064617465436f6e74657874204163636573732044656e6965640000000000604482015260640161047d565b6106618c8c60408c013561065a60a08e0160808f01613997565b8c8c6120bc565b9c919b50909950505050505050505050565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156106b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106d891906138ad565b156106f55760405162461bcd60e51b815260040161047d906138ca565b600061070a61049b6080880160608901613901565b9050600061071782611fc1565b9050600080610726838b61200f565b9092509050600081600481111561073f5761073f61391c565b1461075c5760405162461bcd60e51b815260040161047d90613932565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608c6107803061207d565b6040516001600160e01b031960e085901b1681526107ad92919087906378efa4ed60e11b90600401613969565b602060405180830381865af41580156107ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ee91906138ad565b61083a5760405162461bcd60e51b815260206004820152601d60248201527f5265676973746572436f6e74657874204163636573732044656e696564000000604482015260640161047d565b61086a8b61084e60808c0160608d01613901565b60408c013561086360a08e0160808f01613997565b8c8c6127e3565b9b919a509098505050505050505050565b604051640312e302e360dc1b60208201526025015b6040516020818303038152906040528051906020012081565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090e91906138ad565b1561092b5760405162461bcd60e51b815260040161047d906138ca565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608661094f3061207d565b6040516001600160e01b031960e085901b16815261097c929190339063d338640160e01b90600401613969565b602060405180830381865af4158015610999573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109bd91906138ad565b610a095760405162461bcd60e51b815260206004820152601d60248201527f536574436f6e746578745265616c6d204163636573732044656e696564000000604482015260640161047d565b83610a133061207d565b03610a605760405162461bcd60e51b815260206004820181905260248201527f496c6c6567616c204368616e67652041434c20436f6e74657874205265616c6d604482015260640161047d565b60008481526001808701602052604090912001546001600160a01b0316610a995760405162461bcd60e51b815260040161047d906139b4565b600083815260038601602052604090208054610ab4906139df565b9050600003610ad55760405162461bcd60e51b815260040161047d90613a13565b6000848152600186016020526040902054839003610b355760405162461bcd60e51b815260206004820152601960248201527f496c6c6567616c205265616c6d204475706c69636174696f6e00000000000000604482015260640161047d565b600084815260018601602090815260408083205486845260038901909252909120610b639060020186612bc0565b5060008581526001870160209081526040808320548352600389019091529020610b909060020186612bd3565b506001969095509350505050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610bde573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c0291906138ad565b15610c1f5760405162461bcd60e51b815260040161047d906138ca565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c696086610c433061207d565b6040516001600160e01b031960e085901b168152610c70929190339063771bcf4560e01b90600401613969565b602060405180830381865af4158015610c8d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb191906138ad565b610cfd5760405162461bcd60e51b815260206004820152601e60248201527f4772616e74436f6e74657874526f6c65204163636573732044656e6965640000604482015260640161047d565b83610d073061207d565b03610d545760405162461bcd60e51b815260206004820152601960248201527f496c6c6567616c204772616e742041434c20436f6e7465787400000000000000604482015260640161047d565b60008481526001808701602052604090912001546001600160a01b0316610d8d5760405162461bcd60e51b815260040161047d906139b4565b600082815260028601602052604090208054610da8906139df565b9050600003610dc95760405162461bcd60e51b815260040161047d90613a3c565b60008481526001860160205260409020610df0906003016001600160e01b03198516612bdf565b610e0c5760405162461bcd60e51b815260040161047d90613a64565b60008481526001868101602090815260408084206001600160e01b0319881685526002019091529091208381558101805460ff191682805b02179055505050600091825250600191909101602052604090205490565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ea3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ec791906138ad565b15610ee45760405162461bcd60e51b815260040161047d906138ca565b6000610f64610ef960c0880160a08901613901565b604080517f210e35e86b887de2dcef95a381a8278f979cd7b7bbbe99972070d254971056466020808301919091526001600160a01b039390931681830152818a013560608201526080808b0135828201528251808303909101815260a0909101909152805191012090565b90506000610f7182611fc1565b9050600080610f80838b61200f565b90925090506000816004811115610f9957610f9961391c565b14610fb65760405162461bcd60e51b815260040161047d90613932565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608c610fda3061207d565b6040516001600160e01b031960e085901b16815261100792919087906378efa4ed60e11b90600401613969565b602060405180830381865af4158015611024573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061104891906138ad565b6110a05760405162461bcd60e51b8152602060048201526024808201527f526567697374657250726564696374436f6e74657874204163636573732044656044820152631b9a595960e21b606482015260840161047d565b61086a8b89898c612bf7565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156110ec573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061111091906138ad565b1561112d5760405162461bcd60e51b815260040161047d906138ca565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c6960866111513061207d565b6040516001600160e01b031960e085901b16815261117e929190339063031c049360e01b90600401613969565b602060405180830381865af415801561119b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111bf91906138ad565b61120b5760405162461bcd60e51b815260206004820181905260248201527f416464436f6e7465787446756e63526f6c65204163636573732044656e696564604482015260640161047d565b60008481526001808701602052604090912001546001600160a01b03166112445760405162461bcd60e51b815260040161047d906139b4565b60008281526002860160205260409020805461125f906139df565b90506000036112805760405162461bcd60e51b815260040161047d90613a3c565b600084815260018601602052604090206112a7906003016001600160e01b03198516612bdf565b156112f45760405162461bcd60e51b815260206004820152601f60248201527f46756e6374696f6e53656c6563746f7220416c72656164792045786973747300604482015260640161047d565b60008481526001868101602081815260408085206001600160e01b031989168087526002820184529186208881558501805460ff1916909517909455938890525261134491600390910190612bc0565b505050600091825250600191909101602052604090205490565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561139e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113c291906138ad565b156113df5760405162461bcd60e51b815260040161047d906138ca565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c6960866114033061207d565b6040516001600160e01b031960e085901b1681526114309291903390634346a04b60e01b90600401613969565b602060405180830381865af415801561144d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061147191906138ad565b6114bd5760405162461bcd60e51b815260206004820152601f60248201527f5265766f6b65436f6e74657874526f6c65204163636573732044656e69656400604482015260640161047d565b836114c73061207d565b036115145760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c205265766f6b652041434c20436f6e74657874000000000000604482015260640161047d565b60008481526001808701602052604090912001546001600160a01b031661154d5760405162461bcd60e51b815260040161047d906139b4565b600082815260028601602052604090208054611568906139df565b90506000036115895760405162461bcd60e51b815260040161047d90613a3c565b600084815260018601602052604090206115b0906003016001600160e01b03198516612bdf565b6115cc5760405162461bcd60e51b815260040161047d90613a64565b60008481526001808701602090815260408084206001600160e01b031988168552600290810190925290922081018054909160ff199091169083610e44565b600083815260018086016020526040822001546001600160a01b03161580159061165c5750600084815260018601602090815260408083206001600160e01b03198616845260020190915290205483145b80156116a85750600160008581526001808801602090815260408084206001600160e01b0319881685526002908101909252909220015460ff16908111156116a6576116a661391c565b145b95945050505050565b6040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a081019190915260008281526001808501602052604090912001546001600160a01b031661171c5760405162461bcd60e51b815260040161047d906139b4565b6000828152600180850160209081526040808420909201548251631d74303760e21b815292516001600160a01b03909116926375d0c0dc9260048083019391928290030181865afa158015611775573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117999190613a9b565b6000848152600180870160209081526040808420909201548251630505472360e51b8152925194955092936001600160a01b039093169263a0a8e4609260048082019392918290030181865afa1580156117f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061181b9190613a9b565b600085815260018088016020908152604080842090920154825163be22465d60e01b8152925194955092936001600160a01b039093169263be22465d9260048082019392918290030181865afa158015611879573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061189d91906138ad565b6000868152600180890160209081526040808420909201548251630151e76560e61b8152925194955092936001600160a01b0390931692635479d9409260048082019392918290030181865afa1580156118fb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061191f91906138ad565b6040805160c08101825295865260208087019590955260008881526001808b018088528383208054948a0194909452918a90529552909301546001600160a01b031660608501525015156080830152151560a082015290505b92915050565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156119bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119e391906138ad565b15611a005760405162461bcd60e51b815260040161047d906138ca565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c696086611a243061207d565b6040516001600160e01b031960e085901b168152611a5192919033906370420ee360e01b90600401613969565b602060405180830381865af4158015611a6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a9291906138ad565b611ade5760405162461bcd60e51b815260206004820152601e60248201527f536574436f6e74657874537461747573204163636573732044656e6965640000604482015260640161047d565b83611ae83061207d565b03611b3f5760405162461bcd60e51b815260206004820152602160248201527f496c6c6567616c204368616e67652041434c20436f6e746578742053746174756044820152607360f81b606482015260840161047d565b60008481526001808701602052604090912001546001600160a01b0316611b785760405162461bcd60e51b815260040161047d906139b4565b50506000828152600180850160205260409091208082018054841515600160a01b0260ff60a01b1990911617905554935093915050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611bef573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c1391906138ad565b15611c305760405162461bcd60e51b815260040161047d906138ca565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c696085611c543061207d565b6040516001600160e01b031960e085901b168152611c819291903390635ac4b36f60e11b90600401613969565b602060405180830381865af4158015611c9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cc291906138ad565b611d0e5760405162461bcd60e51b815260206004820152601f60248201527f52656d6f7665436f6e7465787446756e63204163636573732044656e69656400604482015260640161047d565b82611d183061207d565b03611d655760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c2052656d6f76652041434c20436f6e74657874000000000000604482015260640161047d565b60008381526001808601602052604090912001546001600160a01b0316611d9e5760405162461bcd60e51b815260040161047d906139b4565b60008381526001850160205260409020611dc5906003016001600160e01b03198416612bdf565b611de15760405162461bcd60e51b815260040161047d90613a64565b60008381526001808601602081815260408085206001600160e01b03198816808752600282018452918620868155909401805460ff191690559387905252611e2e91600390910190612bd3565b5050506000908152600191909101602052604090205490565b604051711310dbdb9d195e1d13585b9859d95b595b9d60721b6020820152603201610890565b60008181526001808401602052604090912001546060906001600160a01b0316611ea95760405162461bcd60e51b815260040161047d906139b4565b60008281526001840160205260408120611ec590600301613021565b67ffffffffffffffff811115611edd57611edd6133f1565b604051908082528060200260200182016040528015611f06578160200160208202803683370190505b50905060005b60008481526001860160205260409020611f2890600301613021565b8163ffffffff161015611f9e5760008481526001860160205260409020611f5b9060030163ffffffff8084169061302b16565b828263ffffffff1681518110611f7357611f73613ab4565b6001600160e01b03199092166020928302919091019091015280611f9681613ae0565b915050611f0c565b509392505050565b6000611fb7868686600187876127e3565b9695505050505050565b6000611978611fce613037565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b60008082516041036120455760208301516040840151606085015160001a6120398782858561315f565b94509450505050612076565b825160400361206e576020830151604084015161206386838361324c565b935093505050612076565b506000905060025b9250929050565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b600085815260018088016020526040822001546001600160a01b0316806120f55760405162461bcd60e51b815260040161047d906139b4565b6001600160a01b038116331461214d5760405162461bcd60e51b815260206004820152601860248201527f55706461746520436f6e7465787420466f7262696464656e0000000000000000604482015260640161047d565b600086815260038901602052604090208054612168906139df565b90506000036121895760405162461bcd60e51b815260040161047d90613a13565b600087815260018981016020526040909120908101805460ff60a01b1916600160a01b88151502179055548614612206576000878152600189016020908152604080832054835260038b0190915290206121e69060020188612bd3565b50600086815260038901602052604090206122049060020188612bc0565b505b600087815260018901602052604081208790555b838110156127d75788600201600086868481811061223a5761223a613ab4565b905060200281019061224c9190613b03565b35815260208101919091526040016000208054612268906139df565b90506000036122895760405162461bcd60e51b815260040161047d90613a3c565b60005b85858381811061229e5761229e613ab4565b90506020028101906122b09190613b03565b6122be906020810190613b23565b90508110156127c45760018686848181106122db576122db613ab4565b90506020028101906122ed9190613b03565b6122fe906060810190604001613b6d565b600281111561230f5761230f61391c565b14806123605750600086868481811061232a5761232a613ab4565b905060200281019061233c9190613b03565b61234d906060810190604001613b6d565b600281111561235e5761235e61391c565b145b1561261a5785858381811061237757612377613ab4565b90506020028101906123899190613b03565b60008a815260018c0160205260408120913591600201908888868181106123b2576123b2613ab4565b90506020028101906123c49190613b03565b6123d2906020810190613b23565b858181106123e2576123e2613ab4565b90506020020160208101906123f79190613b8e565b6001600160e01b0319168152602081019190915260400160002055600186868481811061242657612426613ab4565b90506020028101906124389190613b03565b612449906060810190604001613b6d565b600281111561245a5761245a61391c565b14612466576002612469565b60015b60008a815260018c01602052604081206002019088888681811061248f5761248f613ab4565b90506020028101906124a19190613b03565b6124af906020810190613b23565b858181106124bf576124bf613ab4565b90506020020160208101906124d49190613b8e565b6001600160e01b0319168152602081019190915260400160002060019081018054909160ff19909116908360028111156125105761251061391c565b021790555061259286868481811061252a5761252a613ab4565b905060200281019061253c9190613b03565b61254a906020810190613b23565b8381811061255a5761255a613ab4565b905060200201602081019061256f9190613b8e565b60008b815260018d0160205260409020600301906001600160e01b031916612bdf565b612615576126138686848181106125ab576125ab613ab4565b90506020028101906125bd9190613b03565b6125cb906020810190613b23565b838181106125db576125db613ab4565b90506020020160208101906125f09190613b8e565b60008b815260018d0160205260409020600301906001600160e01b031916612bc0565b505b6127b2565b600089815260018b01602052604081206002019087878581811061264057612640613ab4565b90506020028101906126529190613b03565b612660906020810190613b23565b8481811061267057612670613ab4565b90506020020160208101906126859190613b8e565b6001600160e01b0319168152602080820192909252604090810160009081208190558b815260018d019092528120600201908787858181106126c9576126c9613ab4565b90506020028101906126db9190613b03565b6126e9906020810190613b23565b848181106126f9576126f9613ab4565b905060200201602081019061270e9190613b8e565b6001600160e01b03191681526020810191909152604001600020600101805460ff191690556127b086868481811061274857612748613ab4565b905060200281019061275a9190613b03565b612768906020810190613b23565b8381811061277857612778613ab4565b905060200201602081019061278d9190613b8e565b60008b815260018d0160205260409020600301906001600160e01b031916612bd3565b505b806127bc81613ba9565b91505061228c565b50806127cf81613ba9565b91505061221a565b50979650505050505050565b6000848152600387016020526040812080546127fe906139df565b905060000361281f5760405162461bcd60e51b815260040161047d90613a13565b600061282a8761207d565b60008181526001808b01602052604090912001549091506001600160a01b0316156128975760405162461bcd60e51b815260206004820152601a60248201527f436f6e7465787420416c72656164792052656769737465726564000000000000604482015260640161047d565b600086815260038901602052604090206128b49060020182612bc0565b5060008181526001808a01602052604082208881559081018054881515600160a01b026001600160a81b03199091166001600160a01b038c1617179055905b84811015612bb25789600201600087878481811061291357612913613ab4565b90506020028101906129259190613b03565b35815260208101919091526040016000208054612941906139df565b90506000036129625760405162461bcd60e51b815260040161047d90613a3c565b60005b86868381811061297757612977613ab4565b90506020028101906129899190613b03565b612997906020810190613b23565b9050811015612b9f578686838181106129b2576129b2613ab4565b90506020028101906129c49190613b03565b356002840160008989868181106129dd576129dd613ab4565b90506020028101906129ef9190613b03565b6129fd906020810190613b23565b85818110612a0d57612a0d613ab4565b9050602002016020810190612a229190613b8e565b6001600160e01b0319168152602081019190915260400160002055868683818110612a4f57612a4f613ab4565b9050602002810190612a619190613b03565b612a72906060810190604001613997565b612a7d576002612a80565b60015b836002016000898986818110612a9857612a98613ab4565b9050602002810190612aaa9190613b03565b612ab8906020810190613b23565b85818110612ac857612ac8613ab4565b9050602002016020810190612add9190613b8e565b6001600160e01b0319168152602081019190915260400160002060019081018054909160ff1990911690836002811115612b1957612b1961391c565b0217905550612b8c878784818110612b3357612b33613ab4565b9050602002810190612b459190613b03565b612b53906020810190613b23565b83818110612b6357612b63613ab4565b9050602002016020810190612b789190613b8e565b60038501906001600160e01b031916612bc0565b5080612b9781613ba9565b915050612965565b5080612baa81613ba9565b9150506128f3565b509098975050505050505050565b6000612bcc8383613285565b9392505050565b6000612bcc83836132d4565b60008181526001830160205260408120541515612bcc565b6040808201356000908152600386016020529081208054612c17906139df565b9050600003612c385760405162461bcd60e51b815260040161047d90613a13565b60006001600160f81b0319612c5360c0850160a08601613901565b6040516001600160f81b031990921660208301526bffffffffffffffffffffffff19606091821b1660218301528401356035820152608084013560558201526075016040516020818303038152906040528051906020012060001c90506000612cbb8261207d565b60008181526001808a01602052604090912001549091506001600160a01b031615612d285760405162461bcd60e51b815260206004820152601a60248201527f436f6e7465787420416c72656164792052656769737465726564000000000000604482015260640161047d565b60408085013560009081526003890160205220612d489060020182612bc0565b5060008181526001888101602052604091829020918601358255810180546001600160a01b0319166001600160a01b038516179055612d8d60e0860160c08701613997565b600182018054911515600160a01b0260ff60a01b1990921691909117905560005b8681101561301457886002016000898984818110612dce57612dce613ab4565b9050602002810190612de09190613b03565b35815260208101919091526040016000208054612dfc906139df565b9050600003612e1d5760405162461bcd60e51b815260040161047d90613a3c565b60005b888883818110612e3257612e32613ab4565b9050602002810190612e449190613b03565b612e52906020810190613b23565b905081101561300157888883818110612e6d57612e6d613ab4565b9050602002810190612e7f9190613b03565b356002840160008b8b86818110612e9857612e98613ab4565b9050602002810190612eaa9190613b03565b612eb8906020810190613b23565b85818110612ec857612ec8613ab4565b9050602002016020810190612edd9190613b8e565b6001600160e01b0319168152602081019190915260400160002055888883818110612f0a57612f0a613ab4565b9050602002810190612f1c9190613b03565b612f2d906060810190604001613997565b612f38576002612f3b565b60015b8360020160008b8b86818110612f5357612f53613ab4565b9050602002810190612f659190613b03565b612f73906020810190613b23565b85818110612f8357612f83613ab4565b9050602002016020810190612f989190613b8e565b6001600160e01b0319168152602081019190915260400160002060019081018054909160ff1990911690836002811115612fd457612fd461391c565b0217905550612fee898984818110612b3357612b33613ab4565b5080612ff981613ba9565b915050612e20565b508061300c81613ba9565b915050612dae565b5090979650505050505050565b6000611978825490565b6000612bcc83836133c7565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f306001600160a01b03166375d0c0dc6040518163ffffffff1660e01b8152600401602060405180830381865afa158015613098573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906130bc9190613a9b565b306001600160a01b031663a0a8e4606040518163ffffffff1660e01b8152600401602060405180830381865afa1580156130fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061311e9190613a9b565b60408051602081019490945283019190915260608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156131965750600090506003613243565b8460ff16601b141580156131ae57508460ff16601c14155b156131bf5750600090506004613243565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015613213573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661323c57600060019250925050613243565b9150600090505b94509492505050565b6000806001600160ff1b0383168161326960ff86901c601b613bc2565b90506132778782888561315f565b935093505050935093915050565b60008181526001830160205260408120546132cc57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155611978565b506000611978565b600081815260018301602052604081205480156133bd5760006132f8600183613bd5565b855490915060009061330c90600190613bd5565b905081811461337157600086600001828154811061332c5761332c613ab4565b906000526020600020015490508087600001848154811061334f5761334f613ab4565b6000918252602080832090910192909255918252600188019052604090208390555b855486908061338257613382613be8565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050611978565b6000915050611978565b60008260000182815481106133de576133de613ab4565b9060005260206000200154905092915050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261341857600080fd5b813567ffffffffffffffff80821115613433576134336133f1565b604051601f8301601f19908116603f0116810190828211818310171561345b5761345b6133f1565b8160405283815286602085880101111561347457600080fd5b836020870160208301376000602085830101528094505050505092915050565b600060a082840312156134a657600080fd5b50919050565b60008083601f8401126134be57600080fd5b50813567ffffffffffffffff8111156134d657600080fd5b6020830191508360208260051b850101111561207657600080fd5b600080600080600080610120878903121561350b57600080fd5b8635955060208701359450604087013567ffffffffffffffff8082111561353157600080fd5b61353d8a838b01613407565b955061354c8a60608b01613494565b945061010089013591508082111561356357600080fd5b5061357089828a016134ac565b979a9699509497509295939492505050565b6000806000806000610100868803121561359b57600080fd5b85359450602086013567ffffffffffffffff808211156135ba57600080fd5b6135c689838a01613407565b95506135d58960408a01613494565b945060e08801359150808211156135eb57600080fd5b506135f8888289016134ac565b969995985093965092949392505050565b60008060006060848603121561361e57600080fd5b505081359360208301359350604090920135919050565b80356001600160e01b03198116811461364d57600080fd5b919050565b6000806000806080858703121561366857600080fd5b843593506020850135925061367f60408601613635565b9396929550929360600135925050565b60008060008060008587036101408112156136a957600080fd5b86359550602087013567ffffffffffffffff808211156136c857600080fd5b6136d48a838b01613407565b965060e0603f19840112156136e857600080fd5b60408901955061012089013592508083111561370357600080fd5b50506135f8888289016134ac565b6000806000806080858703121561372757600080fd5b84359350602085013592506040850135915061374560608601613635565b905092959194509250565b6000806040838503121561376357600080fd5b50508035926020909101359150565b801515811461378057600080fd5b50565b60008060006060848603121561379857600080fd5b833592506020840135915060408401356137b181613772565b809150509250925092565b6000806000606084860312156137d157600080fd5b83359250602084013591506137e860408501613635565b90509250925092565b6020808252825182820181905260009190848201906040850190845b818110156138335783516001600160e01b0319168352928401929184019160010161380d565b50909695505050505050565b80356001600160a01b038116811461364d57600080fd5b60008060008060006080868803121561386e57600080fd5b8535945061387e6020870161383f565b935060408601359250606086013567ffffffffffffffff8111156138a157600080fd5b6135f8888289016134ac565b6000602082840312156138bf57600080fd5b8151612bcc81613772565b60208082526017908201527f536166654d6f64653a2043616c6c2052656a6563746564000000000000000000604082015260600190565b60006020828403121561391357600080fd5b612bcc8261383f565b634e487b7160e01b600052602160045260246000fd5b60208082526018908201527f496c6c6567616c20454344415341205369676e61747572650000000000000000604082015260600190565b93845260208401929092526001600160a01b031660408301526001600160e01b031916606082015260800190565b6000602082840312156139a957600080fd5b8135612bcc81613772565b60208082526011908201527010dbdb9d195e1d08139bdd08119bdd5b99607a1b604082015260600190565b600181811c908216806139f357607f821691505b6020821081036134a657634e487b7160e01b600052602260045260246000fd5b6020808252600f908201526e1499585b1b48139bdd08119bdd5b99608a1b604082015260600190565b6020808252600e908201526d149bdb1948139bdd08119bdd5b9960921b604082015260600190565b6020808252601a908201527f46756e6374696f6e53656c6563746f72204e6f7420466f756e64000000000000604082015260600190565b600060208284031215613aad57600080fd5b5051919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600063ffffffff808316818103613af957613af9613aca565b6001019392505050565b60008235605e19833603018112613b1957600080fd5b9190910192915050565b6000808335601e19843603018112613b3a57600080fd5b83018035915067ffffffffffffffff821115613b5557600080fd5b6020019150600581901b360382131561207657600080fd5b600060208284031215613b7f57600080fd5b813560038110612bcc57600080fd5b600060208284031215613ba057600080fd5b612bcc82613635565b600060018201613bbb57613bbb613aca565b5060010190565b8082018082111561197857611978613aca565b8181038181111561197857611978613aca565b634e487b7160e01b600052603160045260246000fdfea26469706673582212207cf84028d54af3187385457e19e0a129e15c8dd4f08abb01882cfee6fda2d0e964736f6c63430008110033";
const isSuperArgs = (xs) => {
    return (typeof xs[0] === "string" ||
        Array.isArray(xs[0]) ||
        "_isInterface" in xs[0]);
};
class LContextManagement__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            const [linkLibraryAddresses, signer] = args;
            super(_abi, LContextManagement__factory.linkBytecode(linkLibraryAddresses), signer);
        }
    }
    static linkBytecode(linkLibraryAddresses) {
        let linkedBytecode = _bytecode;
        linkedBytecode = linkedBytecode.replace(new RegExp("__\\$c43b1d7058274a71a9734d16e6b6586431\\$__", "g"), linkLibraryAddresses["src/contracts/lib/acl/LAccessControl.sol:LAccessControl"]
            .replace(/^0x/, "")
            .toLowerCase());
        return linkedBytecode;
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
exports.LContextManagement__factory = LContextManagement__factory;
LContextManagement__factory.bytecode = _bytecode;
LContextManagement__factory.abi = _abi;
//# sourceMappingURL=LContextManagement__factory.js.map