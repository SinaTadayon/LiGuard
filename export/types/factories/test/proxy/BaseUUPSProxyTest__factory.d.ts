import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { BaseUUPSProxyTest, BaseUUPSProxyTestInterface } from "../../../test/proxy/BaseUUPSProxyTest";
declare type BaseUUPSProxyTestConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class BaseUUPSProxyTest__factory extends ContractFactory {
    constructor(...args: BaseUUPSProxyTestConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<BaseUUPSProxyTest>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): BaseUUPSProxyTest;
    connect(signer: Signer): BaseUUPSProxyTest__factory;
    static readonly bytecode = "0x60a0604052306080523480156200001557600080fd5b506200004360017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd62000127565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc146200007457620000746200014f565b620000a160017fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610462000127565b60008051602062003e5783398151915214620000c157620000c16200014f565b33620000ea60008051602062003e5783398151915260001b6200012460201b6200291f1760201c565b80546001600160a01b03929092166001600160a01b03199092169190911790556003805461ffff60a01b1916600160a01b17905562000165565b90565b818103818111156200014957634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052600160045260246000fd5b608051613c74620001e360003960008181610584015281816105cd015281816115c5015281816116050152818161177f015281816117bf015281816119510152818161199101528181611a0e01528181611acc01528181611b0c01528181611e9b01528181611edb0152818161273401526127740152613c746000f3fe6080604052600436106101ae5760003560e01c80637147855d116100eb578063a73929b21161008f578063d8b3199911610061578063d8b31999146104c9578063d9dc1f19146104de578063f698da25146104fe578063f94a0adb1461051357005b8063a73929b214610457578063b4a0bdf314610477578063be22465d14610495578063d3e024b8146104b457005b80637ca1e2ca116100c85780637ca1e2ca146103ed5780637daea9a31461040d578063870666cb1461042d578063a0a8e4601461044257005b80637147855d1461038b578063756af45f146103b857806375d0c0dc146103d857005b806344b7e5f21161015257806352d1902d1161012f57806352d1902d146103075780635479d9401461032a5780635632ffd81461034957806358dbc45d1461035e57005b806344b7e5f2146102b457806348e6be1c146102d45780634f1ef286146102f457005b806333a69c141161018b57806333a69c141461022c57806338d38c971461024c5780633d7a4893146102745780633d7b4f291461029457005b806301ffc9a7146101b75780631c1102ad146101ec5780632cc1e1561461020c57005b366101b557005b005b3480156101c357600080fd5b506101d76101d2366004613435565b610528565b60405190151581526020015b60405180910390f35b3480156101f857600080fd5b506101b5610207366004613474565b61057a565b34801561021857600080fd5b506101b5610227366004613534565b61070b565b34801561023857600080fd5b506101b56102473660046135ba565b610b1d565b34801561025857600080fd5b50610261610eca565b60405161ffff90911681526020016101e3565b34801561028057600080fd5b506101b561028f3660046135ba565b610ede565b3480156102a057600080fd5b506101b56102af3660046135ba565b611314565b3480156102c057600080fd5b506101d76102cf36600461369a565b6115b9565b3480156102e057600080fd5b506101d76102ef36600461369a565b611773565b6101b56103023660046136b7565b611947565b34801561031357600080fd5b5061031c611a01565b6040519081526020016101e3565b34801561033657600080fd5b50600354600160a81b900460ff166101d7565b34801561035557600080fd5b5061031c611a8e565b34801561036a57600080fd5b50610373611ab6565b6040516001600160a01b0390911681526020016101e3565b34801561039757600080fd5b506103ab6103a6366004613707565b611ac0565b6040516101e391906137bb565b3480156103c457600080fd5b506101b56103d3366004613474565b611bd3565b3480156103e457600080fd5b5060005461031c565b3480156103f957600080fd5b506101b5610408366004613534565b611c92565b34801561041957600080fd5b506101b5610428366004613474565b611e91565b34801561043957600080fd5b5061031c612019565b34801561044e57600080fd5b5060015461031c565b34801561046357600080fd5b506101b5610472366004613534565b612024565b34801561048357600080fd5b506003546001600160a01b0316610373565b3480156104a157600080fd5b50600354600160a01b900460ff166101d7565b3480156104c057600080fd5b5060025461031c565b3480156104d557600080fd5b5061031c612703565b3480156104ea57600080fd5b506101d76104f9366004613474565b612728565b34801561050a57600080fd5b5061031c6128a9565b34801561051f57600080fd5b50610373612915565b60006001600160e01b031982166314751dbf60e01b148061055957506001600160e01b031982166352d1902d60e01b145b8061057457506301ffc9a760e01b6001600160e01b03198316145b92915050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036105cb5760405162461bcd60e51b81526004016105c2906137ce565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166105fd612922565b6001600160a01b0316146106235760405162461bcd60e51b81526004016105c2906137fd565b600354600160a01b900460ff161561064d5760405162461bcd60e51b81526004016105c29061382b565b600354600160a81b900460ff166106765760405162461bcd60e51b81526004016105c290613862565b610686631c1102ad60e01b612943565b6106d25760405162461bcd60e51b815260206004820152601d60248201527f75706772616465546f546573746572526f6c6520466f7262696464656e00000060448201526064016105c2565b6040516001600160a01b0382169033907fad295f9bf5cc9d0dcc7230eb2655b1b54d619c56c10ba32aea8185bec9d4e5bd90600090a350565b33610714612aac565b6001600160a01b03161461073a5760405162461bcd60e51b81526004016105c290613891565b60445460029062010000900460ff1615801561075e575060445461ffff8083169116105b61077a5760405162461bcd60e51b81526004016105c2906138c0565b6044805462ffffff191661ffff831617620100001790556040805160a081018252600080548252600154602080840191909152835191938301916107d191016b4c4956454c595f5245414c4d60a01b8152600c0190565b60408051601f198184030181529181528151602092830120835230838301526001928101929092528151600280825260608201909352929350600092919082015b610835604080516060808201835260008083526020830191909152909182015290565b815260200190600190039081610812579050509050604051602001610859906138f7565b604051602081830303815290604052805190602001208160008151811061088257610882613920565b602002602001015160000181815250506000816000815181106108a7576108a7613920565b60200260200101516040019060028111156108c4576108c4613936565b908160028111156108d7576108d7613936565b9052506040805160018082528183019092529060208083019080368337019050508160008151811061090b5761090b613920565b602002602001015160200181905250637147855d60e01b8160008151811061093557610935613920565b60200260200101516020015160008151811061095357610953613920565b6001600160e01b031990921660209283029190910182015260405161097891016138f7565b60405160208183030381529060405280519060200120816001815181106109a1576109a1613920565b602002602001015160000181815250506001816001815181106109c6576109c6613920565b60200260200101516040019060028111156109e3576109e3613936565b908160028111156109f6576109f6613936565b90525060408051600180825281830190925290602080830190803683370190505081600181518110610a2a57610a2a613920565b602002602001015160200181905250634f1ef28660e01b81600181518110610a5457610a54613920565b602002602001015160200151600081518110610a7257610a72613920565b6001600160e01b0319909216602092830291909101909101526003546001600160a01b031663e65be468610aa530612ad4565b8685856040518563ffffffff1660e01b8152600401610ac794939291906139c9565b6020604051808303816000875af1158015610ae6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b0a9190613a8e565b50506044805462ff000019169055505050565b33610b26612aac565b6001600160a01b031614610b4c5760405162461bcd60e51b81526004016105c290613891565b60445462010000900460ff1615808015610b6e5750604454600161ffff909116105b80610b895750303b158015610b89575060445461ffff166001145b610ba55760405162461bcd60e51b81526004016105c2906138c0565b6044805461ffff191660011790558015610bcb576044805462ff00001916620100001790555b60008585604051602001610be0929190613aab565b604051602081830303815290604052805190602001209050610c068a8a8a8a8588612b13565b6040805160a0810190915260009080610c238d8d60c08401613aab565b6040516020818303038152906040528051906020012081526020018a8a604051602001610c51929190613aab565b60408051808303601f1901815291815281516020928301208352908201859052308282015260016060909201829052805182815280820190915291925060009190816020015b60408051606080820183526000808352602083019190915291810191909152815260200190600190039081610c9757905050604051712624ab22a62cafaba7a926222fa0a226a4a760711b60208201529091506032016040516020818303038152906040528051906020012081600081518110610d1657610d16613920565b60200260200101516000018181525050600181600081518110610d3b57610d3b613920565b60209081029190910101519015156040918201528051600280825260608201909252908160200160208202803683370190505081600081518110610d8157610d81613920565b60200260200101516020018190525063d9dc1f1960e01b81600081518110610dab57610dab613920565b602002602001015160200151600081518110610dc957610dc9613920565b6001600160e01b0319909216602092830291909101909101528051631239af8760e21b908290600090610dfe57610dfe613920565b602002602001015160200151600181518110610e1c57610e1c613920565b6001600160e01b0319909216602092830291909101909101526040516378efa4ed60e11b81526001600160a01b0386169063f1df49da90610e6590899086908690600401613abb565b6020604051808303816000875af1158015610e84573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea89190613b5d565b505050508015610ebf576044805462ff0000191690555b505050505050505050565b6000610ed960445461ffff1690565b905090565b33610ee7612aac565b6001600160a01b031614610f0d5760405162461bcd60e51b81526004016105c290613891565b60445462010000900460ff1615808015610f2f5750604454600161ffff909116105b80610f4a5750303b158015610f4a575060445461ffff166001145b610f665760405162461bcd60e51b81526004016105c2906138c0565b6044805461ffff191660011790558015610f8c576044805462ff00001916620100001790555b60008585604051602001610fa1929190613aab565b604051602081830303815290604052805190602001209050610fc78a8a8a8a8588612b13565b6040805160a0810190915260009080610fe48d8d60c08401613aab565b6040516020818303038152906040528051906020012081526020018a8a604051602001611012929190613aab565b60408051808303601f1901815291815281516020928301208352908201859052308282015260016060928301528051600280825292810190915291925060009190816020015b6040805160608082018352600080835260208301919091529181019190915281526020019060019003908161105857905050604051704c4956454c595f41444d494e5f524f4c4560781b602082015290915060310160405160208183030381529060405280519060200120816000815181106110d6576110d6613920565b602002602001015160000181815250506001816000815181106110fb576110fb613920565b6020908102919091010151901515604091820152805160028082526060820190925290816020016020820280368337019050508160008151811061114157611141613920565b60200260200101516020018190525063d9dc1f1960e01b8160008151811061116b5761116b613920565b60200260200101516020015160008151811061118957611189613920565b6001600160e01b0319909216602092830291909101909101528051631239af8760e21b9082906000906111be576111be613920565b6020026020010151602001516001815181106111dc576111dc613920565b6001600160e01b031990921660209283029190910182015260405161120191016138f7565b604051602081830303815290604052805190602001208160018151811061122a5761122a613920565b6020026020010151600001818152505060018160018151811061124f5761124f613920565b6020908102919091010151901515604091820152805160028082526060820190925290816020016020820280368337019050508160018151811061129557611295613920565b6020026020010151602001819052506344b7e5f260e01b816001815181106112bf576112bf613920565b6020026020010151602001516000815181106112dd576112dd613920565b6001600160e01b0319909216602092830291909101909101528051637147855d60e01b9082906001908110610dfe57610dfe613920565b3361131d612aac565b6001600160a01b0316146113435760405162461bcd60e51b81526004016105c290613891565b60445462010000900460ff16158080156113655750604454600161ffff909116105b806113805750303b158015611380575060445461ffff166001145b61139c5760405162461bcd60e51b81526004016105c2906138c0565b6044805461ffff1916600117905580156113c2576044805462ff00001916620100001790555b600085856040516020016113d7929190613aab565b6040516020818303038152906040528051906020012090508989604051602001611402929190613aab565b60408051601f1981840301815290829052805160209182012060005561142c918a918a9101613aab565b60408051601f19818403018152919052805160209091012060015560028190556001600160a01b03831661147157600380546001600160a01b0319163017905561158e565b6040516301ffc9a760e01b81526314b8343560e31b60048201526001600160a01b038416906301ffc9a790602401602060405180830381865afa9250505080156114d8575060408051601f3d908101601f191682019092526114d591810190613b76565b60015b6115245760405162461bcd60e51b815260206004820152601c60248201527f496c6c6567616c20416363657373436f6e74726f6c4d616e616765720000000060448201526064016105c2565b806115715760405162461bcd60e51b815260206004820152601c60248201527f496e76616c696420416363657373436f6e74726f6c4d616e616765720000000060448201526064016105c2565b50600380546001600160a01b0319166001600160a01b0385161790555b6003805461ffff60a01b191690556040805160a0810190915260009080610fe48d8d60c08401613aab565b60006001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036116035760405162461bcd60e51b81526004016105c2906137ce565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316611635612922565b6001600160a01b03161461165b5760405162461bcd60e51b81526004016105c2906137fd565b600061166a60445461ffff1690565b61ffff16116116bb5760405162461bcd60e51b815260206004820152601860248201527f436f6e7472616374204e6f7420496e697469616c697a6564000000000000000060448201526064016105c2565b6116cb63225bf2f960e11b612943565b61170f5760405162461bcd60e51b815260206004820152601560248201527429b2ba29b0b332a6b7b232902337b93134b23232b760591b60448201526064016105c2565b6003805460ff60a01b1916600160a01b8415150217905560025430336001600160a01b03167fdd452a31d2e164a1ea436c084842c27d24ae2548a575a869f71b05a4ed16243f85604051611767911515815260200190565b60405180910390a45090565b60006001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036117bd5760405162461bcd60e51b81526004016105c2906137ce565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166117ef612922565b6001600160a01b0316146118155760405162461bcd60e51b81526004016105c2906137fd565b600354600160a01b900460ff161561183f5760405162461bcd60e51b81526004016105c29061382b565b61184f631239af8760e21b612943565b61189b5760405162461bcd60e51b815260206004820152601a60248201527f5365745570677261646553746174757320466f7262696464656e00000000000060448201526064016105c2565b6118a3612b29565b6118ef5760405162461bcd60e51b815260206004820152601760248201527f5265616c6d205570677261646520466f7262696464656e00000000000000000060448201526064016105c2565b6003805460ff60a81b1916600160a81b8415150217905560025430336001600160a01b03167fe9f97ad94c2ba252dcfc525e004f608ac5cb886955d8fc87d9e0ee070a698c5685604051611767911515815260200190565b6001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016300361198f5760405162461bcd60e51b81526004016105c2906137ce565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166119c1612922565b6001600160a01b0316146119e75760405162461bcd60e51b81526004016105c2906137fd565b6119f082612c67565b6119fc82826001612d2e565b505050565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614611a7b5760405162461bcd60e51b815260206004820152601d60248201527f496c6c6567616c20436f6e74726163742044656c656761746563616c6c00000060448201526064016105c2565b50600080516020613c1f83398151915290565b604051602001611a9d906138f7565b6040516020818303038152906040528051906020012081565b6000610ed9612922565b60606001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003611b0a5760405162461bcd60e51b81526004016105c2906137ce565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316611b3c612922565b6001600160a01b031614611b625760405162461bcd60e51b81526004016105c2906137fd565b600354600160a01b900460ff1615611b8c5760405162461bcd60e51b81526004016105c29061382b565b600354600160a81b900460ff16611bb55760405162461bcd60e51b81526004016105c290613862565b611bbe84612c67565b611bc9848484612d2e565b90505b9392505050565b600354600160a01b900460ff1615611bfd5760405162461bcd60e51b81526004016105c29061382b565b611c0d63756af45f60e01b612943565b611c595760405162461bcd60e51b815260206004820152601a60248201527f57697468647261772042616c616e636520466f7262696464656e00000000000060448201526064016105c2565b6040516001600160a01b038216904780156108fc02916000818181858888f19350505050158015611c8e573d6000803e3d6000fd5b5050565b33611c9b612aac565b6001600160a01b031614611cc15760405162461bcd60e51b81526004016105c290613891565b60445460029062010000900460ff16158015611ce5575060445461ffff8083169116105b611d015760405162461bcd60e51b81526004016105c2906138c0565b6044805462ffffff191661ffff831617620100001790556040805160a08101825260008054825260018054602080850191909152600254848601523060608501526080840182905284518281528086019095529293919282015b611d7e604080516060808201835260008083526020830191909152909182015290565b815260200190600190039081611d5b57905050604051712624ab22a62cafaba7a926222fa0a226a4a760711b60208201529091506032016040516020818303038152906040528051906020012081600081518110611dde57611dde613920565b60200260200101516000018181525050600081600081518110611e0357611e03613920565b6020026020010151604001906002811115611e2057611e20613936565b90816002811115611e3357611e33613936565b90525060408051600180825281830190925290602080830190803683370190505081600081518110611e6757611e67613920565b602002602001015160200181905250637147855d60e01b81600081518110610a5457610a54613920565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003611ed95760405162461bcd60e51b81526004016105c2906137ce565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316611f0b612922565b6001600160a01b031614611f315760405162461bcd60e51b81526004016105c2906137fd565b600354600160a01b900460ff1615611f5b5760405162461bcd60e51b81526004016105c29061382b565b600354600160a81b900460ff16611f845760405162461bcd60e51b81526004016105c290613862565b611f94637daea9a360e01b612943565b611fe05760405162461bcd60e51b815260206004820181905260248201527f75706772616465546f416e6f6e796d6f7573526f6c6520466f7262696464656e60448201526064016105c2565b6040516001600160a01b0382169033907ff8fbf00b3d8e06cbb351532b9eeb04883f88786bf3e2b2e83c8f191e6d6dae9790600090a350565b6000610ed930612ad4565b3361202d612aac565b6001600160a01b0316146120535760405162461bcd60e51b81526004016105c290613891565b60445460029062010000900460ff16158015612077575060445461ffff8083169116105b6120935760405162461bcd60e51b81526004016105c2906138c0565b6044805462ffffff191661ffff831617620100001790556040516120d290602001714c4956454c595f56455253455f5245414c4d60701b815260120190565b60408051601f198184030181528282528051602091820120600281905560a0840183526000805485526001805493860193909352928401523060608401526080830152600560405190808252806020026020018201604052801561216b57816020015b612158604080516060808201835260008083526020830191909152909182015290565b8152602001906001900390816121355790505b50905060405160200161217d906138f7565b60405160208183030381529060405280519060200120816000815181106121a6576121a6613920565b602002602001015160000181815250506000816000815181106121cb576121cb613920565b60200260200101516040019060028111156121e8576121e8613936565b908160028111156121fb576121fb613936565b9052506040805160018082528183019092529060208083019080368337019050508160008151811061222f5761222f613920565b602002602001015160200181905250637147855d60e01b8160008151811061225957612259613920565b60200260200101516020015160008151811061227757612277613920565b6001600160e01b031990921660209283029190910182015260405161229c91016138f7565b60405160208183030381529060405280519060200120816001815181106122c5576122c5613920565b602002602001015160000181815250506001816001815181106122ea576122ea613920565b602002602001015160400190600281111561230757612307613936565b9081600281111561231a5761231a613936565b9052506040805160018082528183019092529060208083019080368337019050508160018151811061234e5761234e613920565b602002602001015160200181905250634f1ef28660e01b8160018151811061237857612378613920565b60200260200101516020015160008151811061239657612396613920565b6001600160e01b03199092166020928302919091018201526040516123cd91016a5445535445525f524f4c4560a81b8152600b0190565b60405160208183030381529060405280519060200120816002815181106123f6576123f6613920565b6020026020010151600001818152505060018160028151811061241b5761241b613920565b602002602001015160400190600281111561243857612438613936565b9081600281111561244b5761244b613936565b9052506040805160018082528183019092529060208083019080368337019050508160028151811061247f5761247f613920565b602002602001015160200181905250631c1102ad60e01b816002815181106124a9576124a9613920565b6020026020010151602001516000815181106124c7576124c7613920565b6001600160e01b03199092166020928302919091018201526040516125089101744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b604051602081830303815290604052805190602001208160038151811061253157612531613920565b6020026020010151600001818152505060018160038151811061255657612556613920565b602002602001015160400190600281111561257357612573613936565b9081600281111561258657612586613936565b905250604080516001808252818301909252906020808301908036833701905050816003815181106125ba576125ba613920565b602002602001015160200181905250637daea9a360e01b816003815181106125e4576125e4613920565b60200260200101516020015160008151811061260257612602613920565b6001600160e01b031990921660209283029190910182015260405161262791016138f7565b604051602081830303815290604052805190602001208160048151811061265057612650613920565b6020026020010151600001818152505060028160048151811061267557612675613920565b602002602001015160400190600281111561269257612692613936565b908160028111156126a5576126a5613936565b905250604080516001808252818301909252906020808301908036833701905050816004815181106126d9576126d9613920565b60200260200101516020018190525063d9dc1f1960e01b81600481518110610a5457610a54613920565b604051704c4956454c595f41444d494e5f524f4c4560781b6020820152603101611a9d565b60006001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036127725760405162461bcd60e51b81526004016105c2906137ce565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166127a4612922565b6001600160a01b0316146127ca5760405162461bcd60e51b81526004016105c2906137fd565b600354600160a01b900460ff16156127f45760405162461bcd60e51b81526004016105c29061382b565b61280463d9dc1f1960e01b612943565b6128505760405162461bcd60e51b815260206004820152601760248201527f5365744c6f63616c41646d696e20466f7262696464656e00000000000000000060448201526064016105c2565b6001600160a01b0382166128985760405162461bcd60e51b815260206004820152600f60248201526e1059191c995cdcc8125b9d985b1a59608a1b60448201526064016105c2565b6128a182612f7f565b506001919050565b6000610ed960008054600154604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b6000610ed9612aac565b90565b6000600080516020613c1f8339815191525b546001600160a01b0316919050565b6003546000906001600160a01b03163003612a315760006363d59cf360e11b61296b30612ad4565b338560405160240161297f93929190613b93565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152905060006129fc6129c0612922565b836040518060400160405280601d81526020017f44656c656761746563616c6c20686173416363657373204661696c6564000000815250612ff6565b90508060018251612a0d9190613bbc565b81518110612a1d57612a1d613920565b60209101015160f81c600114949350505050565b6003546001600160a01b031663c7ab39e6612a4b30612ad4565b33856040518463ffffffff1660e01b8152600401612a6b93929190613b93565b602060405180830381865afa158015612a88573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105749190613b76565b60007fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103612934565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b612b218686868686866130bf565b505050505050565b6003546000906001600160a01b03163003612bf157600063e25d75f060e01b600254604051602401612b5d91815260200190565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915290506000612bbd612b9e612922565b83604051806060016040528060258152602001613bfa60259139612ff6565b90508060018251612bce9190613bbc565b81518110612bde57612bde613920565b60209101015160f81c6001149392505050565b600354600254604051630e25d75f60e41b81526001600160a01b039092169163e25d75f091612c269160040190815260200190565b602060405180830381865afa158015612c43573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed99190613b76565b612c6f612922565b6001600160a01b0316816001600160a01b031603612ccf5760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c204e657720496d706c656d656e746174696f6e00000000000060448201526064016105c2565b612cdf637147855d60e01b612943565b612d2b5760405162461bcd60e51b815260206004820152601960248201527f5570677261646520436f6e7465787420466f7262696464656e0000000000000060448201526064016105c2565b50565b60607f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615612d7857612d63846132cd565b50604080516000815260208101909152611bcc565b836001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015612dd2575060408051601f3d908101601f19168201909252612dcf91810190613b5d565b60015b612e165760405162461bcd60e51b8152602060048201526015602482015274125b1b1959d85b0815555414c810dbdb9d1c9858dd605a1b60448201526064016105c2565b600080516020613c1f8339815191528114612e6b5760405162461bcd60e51b8152602060048201526015602482015274125b9d985b1a590815555414c810dbdb9d1c9858dd605a1b60448201526064016105c2565b506040516301ffc9a760e01b81526314751dbf60e01b60048201526001600160a01b038516906301ffc9a790602401602060405180830381865afa925050508015612ed3575060408051601f3d908101601f19168201909252612ed091810190613b76565b60015b612f1f5760405162461bcd60e51b815260206004820152601760248201527f496c6c6567616c204950726f787920436f6e747261637400000000000000000060448201526064016105c2565b80612f6c5760405162461bcd60e51b815260206004820152601760248201527f496e76616c6964204950726f787920436f6e747261637400000000000000000060448201526064016105c2565b50612f7884848461334e565b9050611bcc565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610380546001600160a01b0383166001600160a01b031990911681179091556040805191825251309133917f54ab0d18de7958786ba1ad85966d59baa2b395455f0530dcdcfd732e6af539e29181900360200190a350565b60606001600160a01b0384163b61304a5760405162461bcd60e51b8152602060048201526018602482015277496c6c6567616c20436f6e7472616374204164647265737360401b60448201526064016105c2565b600080856001600160a01b0316856040516130659190613bdd565b600060405180830381855af49150503d80600081146130a0576040519150601f19603f3d011682016040523d82523d6000602084013e6130a5565b606091505b50915091506130b58282866133b8565b9695505050505050565b60445462010000900460ff166131175760405162461bcd60e51b815260206004820152601960248201527f436f6e7472616374204e6f7420496e697469616c697a696e670000000000000060448201526064016105c2565b858560405160200161312a929190613aab565b60408051601f19818403018152908290528051602091820120600055613154918691869101613aab565b60408051601f19818403018152919052805160209091012060015560028290556001600160a01b03811661319957600380546001600160a01b031916301790556132b6565b6040516301ffc9a760e01b81526314b8343560e31b60048201526001600160a01b038216906301ffc9a790602401602060405180830381865afa925050508015613200575060408051601f3d908101601f191682019092526131fd91810190613b76565b60015b61324c5760405162461bcd60e51b815260206004820152601c60248201527f496c6c6567616c20416363657373436f6e74726f6c4d616e616765720000000060448201526064016105c2565b806132995760405162461bcd60e51b815260206004820152601c60248201527f496e76616c696420416363657373436f6e74726f6c4d616e616765720000000060448201526064016105c2565b50600380546001600160a01b0319166001600160a01b0383161790555b6003805461ffff60a01b19169055612b2133612f7f565b6001600160a01b0381163b61331f5760405162461bcd60e51b8152602060048201526018602482015277496c6c6567616c20436f6e7472616374204164647265737360401b60448201526064016105c2565b600080516020613c1f83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6060613359846133f1565b6000835111806133665750815b156133a157612f7884846040518060400160405280601381526020017211195b1959d85d1958d85b1b0811985a5b1959606a1b815250612ff6565b505060408051600081526020810190915292915050565b606083156133c7575081611bcc565b8251156133d75782518084602001fd5b8160405162461bcd60e51b81526004016105c291906137bb565b6133fa816132cd565b6040516001600160a01b03821690309033907f354bd4b6eb65d64e6c79c53fa4f983a5e6bec4824ce4627c71be0b2722f4917e90600090a450565b60006020828403121561344757600080fd5b81356001600160e01b031981168114611bcc57600080fd5b6001600160a01b0381168114612d2b57600080fd5b60006020828403121561348657600080fd5b8135611bcc8161345f565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126134b857600080fd5b813567ffffffffffffffff808211156134d3576134d3613491565b604051601f8301601f19908116603f011681019082821181831017156134fb576134fb613491565b8160405283815286602085880101111561351457600080fd5b836020870160208301376000602085830101528094505050505092915050565b60006020828403121561354657600080fd5b813567ffffffffffffffff81111561355d57600080fd5b613569848285016134a7565b949350505050565b60008083601f84011261358357600080fd5b50813567ffffffffffffffff81111561359b57600080fd5b6020830191508360208285010111156135b357600080fd5b9250929050565b60008060008060008060008060a0898b0312156135d657600080fd5b883567ffffffffffffffff808211156135ee57600080fd5b6135fa8c838d01613571565b909a50985060208b013591508082111561361357600080fd5b61361f8c838d01613571565b909850965060408b013591508082111561363857600080fd5b6136448c838d01613571565b909650945060608b013591508082111561365d57600080fd5b5061366a8b828c016134a7565b925050608089013561367b8161345f565b809150509295985092959890939650565b8015158114612d2b57600080fd5b6000602082840312156136ac57600080fd5b8135611bcc8161368c565b600080604083850312156136ca57600080fd5b82356136d58161345f565b9150602083013567ffffffffffffffff8111156136f157600080fd5b6136fd858286016134a7565b9150509250929050565b60008060006060848603121561371c57600080fd5b83356137278161345f565b9250602084013567ffffffffffffffff81111561374357600080fd5b61374f868287016134a7565b92505060408401356137608161368c565b809150509250925092565b60005b8381101561378657818101518382015260200161376e565b50506000910152565b600081518084526137a781602086016020860161376b565b601f01601f19169290920160200192915050565b602081526000611bcc602083018461378f565b602080825260159082015274125b1b1959d85b0810dbdb9d1c9858dd0810d85b1b605a1b604082015260600190565b602080825260149082015273141c9bde1e4810d85b1b195908125b9d985b1a5960621b604082015260600190565b60208082526017908201527f536166654d6f64653a2043616c6c2052656a6563746564000000000000000000604082015260600190565b602080825260159082015274155c19dc9859194810d85b1b0814995a9958dd1959605a1b604082015260600190565b60208082526015908201527410d85b1b195c88139bdd08105d5d1a1bdc9a5e9959605a1b604082015260600190565b6020808252601c908201527f436f6e747261637420416c726561647920496e697469616c697a656400000000604082015260600190565b7f4c4956454c595f53595354454d5f41444d494e5f524f4c450000000000000000815260180190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b8051825260208082015190830152604080820151908301526060808201516001600160a01b0316908301526080908101511515910152565b600081518084526020808501945080840160005b838110156139be5781516001600160e01b03191687529582019590820190600101613998565b509495945050505050565b6000610100868352602081818501526139e48285018861378f565b915060406139f48186018861394c565b84830360e0860152855180845282840190600581901b850184018489016000805b84811015613a7b57601f19898503018652825160608151865289820151818b880152613a4382880182613984565b928a01519291505060038210613a6757634e487b7160e01b84526021600452602484fd5b948801529487019491870191600101613a15565b50919d9c50505050505050505050505050565b600060208284031215613aa057600080fd5b8151611bcc8161345f565b8183823760009101908152919050565b60e081526000613ace60e083018661378f565b6020613adc8185018761394c565b83820360c0850152845180835281830190600581901b8401830183880160005b83811015613b4d57601f198784030185528151606081518552878201518189870152613b2a82870182613984565b604093840151151596909301959095525094860194925090850190600101613afc565b50909a9950505050505050505050565b600060208284031215613b6f57600080fd5b5051919050565b600060208284031215613b8857600080fd5b8151611bcc8161368c565b9283526001600160a01b039190911660208301526001600160e01b031916604082015260600190565b8181038181111561057457634e487b7160e01b600052601160045260246000fd5b60008251613bef81846020870161376b565b919091019291505056fe44656c656761746563616c6c2069735265616c6d55706772616461626c65204661696c6564360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbca26469706673582212203121a65aa27a2534618c9c9c697e6860869712ec55d13991354c2a4659a2ec2664736f6c63430008110033b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103";
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): BaseUUPSProxyTestInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): BaseUUPSProxyTest;
}
export {};
