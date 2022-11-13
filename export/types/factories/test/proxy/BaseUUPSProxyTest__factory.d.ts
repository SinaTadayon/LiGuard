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
    static readonly bytecode = "0x60a0604052306080523480156200001557600080fd5b506200004360017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd62000127565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc146200007457620000746200014f565b620000a160017fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610462000127565b60008051602062003e4783398151915214620000c157620000c16200014f565b33620000ea60008051602062003e4783398151915260001b6200012460201b620029171760201c565b80546001600160a01b03929092166001600160a01b03199092169190911790556003805461ffff60a01b1916600160a01b17905562000165565b90565b818103818111156200014957634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052600160045260246000fd5b608051613c64620001e360003960008181610584015281816105cd015281816115bd015281816115fd01528181611777015281816117b7015281816119490152818161198901528181611a0601528181611ac401528181611b0401528181611e9301528181611ed30152818161272c015261276c0152613c646000f3fe6080604052600436106101ae5760003560e01c80637147855d116100eb578063a73929b21161008f578063d8b3199911610061578063d8b31999146104c9578063d9dc1f19146104de578063f698da25146104fe578063f94a0adb1461051357005b8063a73929b214610457578063b4a0bdf314610477578063be22465d14610495578063d3e024b8146104b457005b80637ca1e2ca116100c85780637ca1e2ca146103ed5780637daea9a31461040d578063870666cb1461042d578063a0a8e4601461044257005b80637147855d1461038b578063756af45f146103b857806375d0c0dc146103d857005b806344b7e5f21161015257806352d1902d1161012f57806352d1902d146103075780635479d9401461032a5780635632ffd81461034957806358dbc45d1461035e57005b806344b7e5f2146102b457806348e6be1c146102d45780634f1ef286146102f457005b806333a69c141161018b57806333a69c141461022c57806338d38c971461024c5780633d7a4893146102745780633d7b4f291461029457005b806301ffc9a7146101b75780631c1102ad146101ec5780632cc1e1561461020c57005b366101b557005b005b3480156101c357600080fd5b506101d76101d236600461342d565b610528565b60405190151581526020015b60405180910390f35b3480156101f857600080fd5b506101b561020736600461346c565b61057a565b34801561021857600080fd5b506101b561022736600461352c565b61070b565b34801561023857600080fd5b506101b56102473660046135b2565b610b15565b34801561025857600080fd5b50610261610ec2565b60405161ffff90911681526020016101e3565b34801561028057600080fd5b506101b561028f3660046135b2565b610ed6565b3480156102a057600080fd5b506101b56102af3660046135b2565b61130c565b3480156102c057600080fd5b506101d76102cf366004613692565b6115b1565b3480156102e057600080fd5b506101d76102ef366004613692565b61176b565b6101b56103023660046136af565b61193f565b34801561031357600080fd5b5061031c6119f9565b6040519081526020016101e3565b34801561033657600080fd5b50600354600160a81b900460ff166101d7565b34801561035557600080fd5b5061031c611a86565b34801561036a57600080fd5b50610373611aae565b6040516001600160a01b0390911681526020016101e3565b34801561039757600080fd5b506103ab6103a63660046136ff565b611ab8565b6040516101e391906137b3565b3480156103c457600080fd5b506101b56103d336600461346c565b611bcb565b3480156103e457600080fd5b5060005461031c565b3480156103f957600080fd5b506101b561040836600461352c565b611c8a565b34801561041957600080fd5b506101b561042836600461346c565b611e89565b34801561043957600080fd5b5061031c612011565b34801561044e57600080fd5b5060015461031c565b34801561046357600080fd5b506101b561047236600461352c565b61201c565b34801561048357600080fd5b506003546001600160a01b0316610373565b3480156104a157600080fd5b50600354600160a01b900460ff166101d7565b3480156104c057600080fd5b5060025461031c565b3480156104d557600080fd5b5061031c6126fb565b3480156104ea57600080fd5b506101d76104f936600461346c565b612720565b34801561050a57600080fd5b5061031c6128a1565b34801561051f57600080fd5b5061037361290d565b60006001600160e01b031982166314751dbf60e01b148061055957506001600160e01b031982166352d1902d60e01b145b8061057457506301ffc9a760e01b6001600160e01b03198316145b92915050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036105cb5760405162461bcd60e51b81526004016105c2906137c6565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166105fd61291a565b6001600160a01b0316146106235760405162461bcd60e51b81526004016105c2906137f5565b600354600160a01b900460ff161561064d5760405162461bcd60e51b81526004016105c290613823565b600354600160a81b900460ff166106765760405162461bcd60e51b81526004016105c29061385a565b610686631c1102ad60e01b61293b565b6106d25760405162461bcd60e51b815260206004820152601d60248201527f75706772616465546f546573746572526f6c6520466f7262696464656e00000060448201526064016105c2565b6040516001600160a01b0382169033907fad295f9bf5cc9d0dcc7230eb2655b1b54d619c56c10ba32aea8185bec9d4e5bd90600090a350565b33610714612aa4565b6001600160a01b03161461073a5760405162461bcd60e51b81526004016105c290613889565b60445460029062010000900460ff1615801561075e575060445461ffff8083169116105b61077a5760405162461bcd60e51b81526004016105c2906138b8565b6044805462ffffff191661ffff831617620100001790556040805160a081018252600080548252600154602080840191909152835191938301916107d191016b4c4956454c595f5245414c4d60a01b8152600c0190565b60408051601f198184030181529181528151602092830120835230838301526001928101929092528151600280825260608201909352929350600092919082015b610835604080516060808201835260008083526020830191909152909182015290565b815260200190600190039081610812579050509050604051602001610859906138ef565b604051602081830303815290604052805190602001208160008151811061088257610882613918565b602002602001015160000181815250506000816000815181106108a7576108a7613918565b60200260200101516040019060028111156108c4576108c461392e565b908160028111156108d7576108d761392e565b9052506040805160018082528183019092529060208083019080368337019050508160008151811061090b5761090b613918565b602002602001015160200181905250637147855d60e01b8160008151811061093557610935613918565b60200260200101516020015160008151811061095357610953613918565b6001600160e01b031990921660209283029190910182015260405161097891016138ef565b60405160208183030381529060405280519060200120816001815181106109a1576109a1613918565b602002602001015160000181815250506001816001815181106109c6576109c6613918565b60200260200101516040019060028111156109e3576109e361392e565b908160028111156109f6576109f661392e565b90525060408051600180825281830190925290602080830190803683370190505081600181518110610a2a57610a2a613918565b602002602001015160200181905250634f1ef28660e01b81600181518110610a5457610a54613918565b602002602001015160200151600081518110610a7257610a72613918565b6001600160e01b0319909216602092830291909101909101526003546040516371d569d960e01b81526001600160a01b03909116906371d569d990610abf908790869086906004016139c1565b6020604051808303816000875af1158015610ade573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b029190613a7e565b50506044805462ff000019169055505050565b33610b1e612aa4565b6001600160a01b031614610b445760405162461bcd60e51b81526004016105c290613889565b60445462010000900460ff1615808015610b665750604454600161ffff909116105b80610b815750303b158015610b81575060445461ffff166001145b610b9d5760405162461bcd60e51b81526004016105c2906138b8565b6044805461ffff191660011790558015610bc3576044805462ff00001916620100001790555b60008585604051602001610bd8929190613a9b565b604051602081830303815290604052805190602001209050610bfe8a8a8a8a8588612acc565b6040805160a0810190915260009080610c1b8d8d60c08401613a9b565b6040516020818303038152906040528051906020012081526020018a8a604051602001610c49929190613a9b565b60408051808303601f1901815291815281516020928301208352908201859052308282015260016060909201829052805182815280820190915291925060009190816020015b60408051606080820183526000808352602083019190915291810191909152815260200190600190039081610c8f57905050604051712624ab22a62cafaba7a926222fa0a226a4a760711b60208201529091506032016040516020818303038152906040528051906020012081600081518110610d0e57610d0e613918565b60200260200101516000018181525050600181600081518110610d3357610d33613918565b60209081029190910101519015156040918201528051600280825260608201909252908160200160208202803683370190505081600081518110610d7957610d79613918565b60200260200101516020018190525063d9dc1f1960e01b81600081518110610da357610da3613918565b602002602001015160200151600081518110610dc157610dc1613918565b6001600160e01b0319909216602092830291909101909101528051631239af8760e21b908290600090610df657610df6613918565b602002602001015160200151600181518110610e1457610e14613918565b6001600160e01b0319909216602092830291909101909101526040516378efa4ed60e11b81526001600160a01b0386169063f1df49da90610e5d90899086908690600401613aab565b6020604051808303816000875af1158015610e7c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea09190613b4d565b505050508015610eb7576044805462ff0000191690555b505050505050505050565b6000610ed160445461ffff1690565b905090565b33610edf612aa4565b6001600160a01b031614610f055760405162461bcd60e51b81526004016105c290613889565b60445462010000900460ff1615808015610f275750604454600161ffff909116105b80610f425750303b158015610f42575060445461ffff166001145b610f5e5760405162461bcd60e51b81526004016105c2906138b8565b6044805461ffff191660011790558015610f84576044805462ff00001916620100001790555b60008585604051602001610f99929190613a9b565b604051602081830303815290604052805190602001209050610fbf8a8a8a8a8588612acc565b6040805160a0810190915260009080610fdc8d8d60c08401613a9b565b6040516020818303038152906040528051906020012081526020018a8a60405160200161100a929190613a9b565b60408051808303601f1901815291815281516020928301208352908201859052308282015260016060928301528051600280825292810190915291925060009190816020015b6040805160608082018352600080835260208301919091529181019190915281526020019060019003908161105057905050604051704c4956454c595f41444d494e5f524f4c4560781b602082015290915060310160405160208183030381529060405280519060200120816000815181106110ce576110ce613918565b602002602001015160000181815250506001816000815181106110f3576110f3613918565b6020908102919091010151901515604091820152805160028082526060820190925290816020016020820280368337019050508160008151811061113957611139613918565b60200260200101516020018190525063d9dc1f1960e01b8160008151811061116357611163613918565b60200260200101516020015160008151811061118157611181613918565b6001600160e01b0319909216602092830291909101909101528051631239af8760e21b9082906000906111b6576111b6613918565b6020026020010151602001516001815181106111d4576111d4613918565b6001600160e01b03199092166020928302919091018201526040516111f991016138ef565b604051602081830303815290604052805190602001208160018151811061122257611222613918565b6020026020010151600001818152505060018160018151811061124757611247613918565b6020908102919091010151901515604091820152805160028082526060820190925290816020016020820280368337019050508160018151811061128d5761128d613918565b6020026020010151602001819052506344b7e5f260e01b816001815181106112b7576112b7613918565b6020026020010151602001516000815181106112d5576112d5613918565b6001600160e01b0319909216602092830291909101909101528051637147855d60e01b9082906001908110610df657610df6613918565b33611315612aa4565b6001600160a01b03161461133b5760405162461bcd60e51b81526004016105c290613889565b60445462010000900460ff161580801561135d5750604454600161ffff909116105b806113785750303b158015611378575060445461ffff166001145b6113945760405162461bcd60e51b81526004016105c2906138b8565b6044805461ffff1916600117905580156113ba576044805462ff00001916620100001790555b600085856040516020016113cf929190613a9b565b60405160208183030381529060405280519060200120905089896040516020016113fa929190613a9b565b60408051601f19818403018152908290528051602091820120600055611424918a918a9101613a9b565b60408051601f19818403018152919052805160209091012060015560028190556001600160a01b03831661146957600380546001600160a01b03191630179055611586565b6040516301ffc9a760e01b81526314b8343560e31b60048201526001600160a01b038416906301ffc9a790602401602060405180830381865afa9250505080156114d0575060408051601f3d908101601f191682019092526114cd91810190613b66565b60015b61151c5760405162461bcd60e51b815260206004820152601c60248201527f496c6c6567616c20416363657373436f6e74726f6c4d616e616765720000000060448201526064016105c2565b806115695760405162461bcd60e51b815260206004820152601c60248201527f496e76616c696420416363657373436f6e74726f6c4d616e616765720000000060448201526064016105c2565b50600380546001600160a01b0319166001600160a01b0385161790555b6003805461ffff60a01b191690556040805160a0810190915260009080610fdc8d8d60c08401613a9b565b60006001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036115fb5760405162461bcd60e51b81526004016105c2906137c6565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661162d61291a565b6001600160a01b0316146116535760405162461bcd60e51b81526004016105c2906137f5565b600061166260445461ffff1690565b61ffff16116116b35760405162461bcd60e51b815260206004820152601860248201527f436f6e7472616374204e6f7420496e697469616c697a6564000000000000000060448201526064016105c2565b6116c363225bf2f960e11b61293b565b6117075760405162461bcd60e51b815260206004820152601560248201527429b2ba29b0b332a6b7b232902337b93134b23232b760591b60448201526064016105c2565b6003805460ff60a01b1916600160a01b8415150217905560025430336001600160a01b03167fdd452a31d2e164a1ea436c084842c27d24ae2548a575a869f71b05a4ed16243f8560405161175f911515815260200190565b60405180910390a45090565b60006001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036117b55760405162461bcd60e51b81526004016105c2906137c6565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166117e761291a565b6001600160a01b03161461180d5760405162461bcd60e51b81526004016105c2906137f5565b600354600160a01b900460ff16156118375760405162461bcd60e51b81526004016105c290613823565b611847631239af8760e21b61293b565b6118935760405162461bcd60e51b815260206004820152601a60248201527f5365745570677261646553746174757320466f7262696464656e00000000000060448201526064016105c2565b61189b612ae2565b6118e75760405162461bcd60e51b815260206004820152601760248201527f5265616c6d205570677261646520466f7262696464656e00000000000000000060448201526064016105c2565b6003805460ff60a81b1916600160a81b8415150217905560025430336001600160a01b03167fe9f97ad94c2ba252dcfc525e004f608ac5cb886955d8fc87d9e0ee070a698c568560405161175f911515815260200190565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036119875760405162461bcd60e51b81526004016105c2906137c6565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166119b961291a565b6001600160a01b0316146119df5760405162461bcd60e51b81526004016105c2906137f5565b6119e882612c20565b6119f482826001612ce7565b505050565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614611a735760405162461bcd60e51b815260206004820152601d60248201527f496c6c6567616c20436f6e74726163742044656c656761746563616c6c00000060448201526064016105c2565b50600080516020613c0f83398151915290565b604051602001611a95906138ef565b6040516020818303038152906040528051906020012081565b6000610ed161291a565b60606001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003611b025760405162461bcd60e51b81526004016105c2906137c6565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316611b3461291a565b6001600160a01b031614611b5a5760405162461bcd60e51b81526004016105c2906137f5565b600354600160a01b900460ff1615611b845760405162461bcd60e51b81526004016105c290613823565b600354600160a81b900460ff16611bad5760405162461bcd60e51b81526004016105c29061385a565b611bb684612c20565b611bc1848484612ce7565b90505b9392505050565b600354600160a01b900460ff1615611bf55760405162461bcd60e51b81526004016105c290613823565b611c0563756af45f60e01b61293b565b611c515760405162461bcd60e51b815260206004820152601a60248201527f57697468647261772042616c616e636520466f7262696464656e00000000000060448201526064016105c2565b6040516001600160a01b038216904780156108fc02916000818181858888f19350505050158015611c86573d6000803e3d6000fd5b5050565b33611c93612aa4565b6001600160a01b031614611cb95760405162461bcd60e51b81526004016105c290613889565b60445460029062010000900460ff16158015611cdd575060445461ffff8083169116105b611cf95760405162461bcd60e51b81526004016105c2906138b8565b6044805462ffffff191661ffff831617620100001790556040805160a08101825260008054825260018054602080850191909152600254848601523060608501526080840182905284518281528086019095529293919282015b611d76604080516060808201835260008083526020830191909152909182015290565b815260200190600190039081611d5357905050604051712624ab22a62cafaba7a926222fa0a226a4a760711b60208201529091506032016040516020818303038152906040528051906020012081600081518110611dd657611dd6613918565b60200260200101516000018181525050600081600081518110611dfb57611dfb613918565b6020026020010151604001906002811115611e1857611e1861392e565b90816002811115611e2b57611e2b61392e565b90525060408051600180825281830190925290602080830190803683370190505081600081518110611e5f57611e5f613918565b602002602001015160200181905250637147855d60e01b81600081518110610a5457610a54613918565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003611ed15760405162461bcd60e51b81526004016105c2906137c6565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316611f0361291a565b6001600160a01b031614611f295760405162461bcd60e51b81526004016105c2906137f5565b600354600160a01b900460ff1615611f535760405162461bcd60e51b81526004016105c290613823565b600354600160a81b900460ff16611f7c5760405162461bcd60e51b81526004016105c29061385a565b611f8c637daea9a360e01b61293b565b611fd85760405162461bcd60e51b815260206004820181905260248201527f75706772616465546f416e6f6e796d6f7573526f6c6520466f7262696464656e60448201526064016105c2565b6040516001600160a01b0382169033907ff8fbf00b3d8e06cbb351532b9eeb04883f88786bf3e2b2e83c8f191e6d6dae9790600090a350565b6000610ed130612f38565b33612025612aa4565b6001600160a01b03161461204b5760405162461bcd60e51b81526004016105c290613889565b60445460029062010000900460ff1615801561206f575060445461ffff8083169116105b61208b5760405162461bcd60e51b81526004016105c2906138b8565b6044805462ffffff191661ffff831617620100001790556040516120ca90602001714c4956454c595f56455253455f5245414c4d60701b815260120190565b60408051601f198184030181528282528051602091820120600281905560a0840183526000805485526001805493860193909352928401523060608401526080830152600560405190808252806020026020018201604052801561216357816020015b612150604080516060808201835260008083526020830191909152909182015290565b81526020019060019003908161212d5790505b509050604051602001612175906138ef565b604051602081830303815290604052805190602001208160008151811061219e5761219e613918565b602002602001015160000181815250506000816000815181106121c3576121c3613918565b60200260200101516040019060028111156121e0576121e061392e565b908160028111156121f3576121f361392e565b9052506040805160018082528183019092529060208083019080368337019050508160008151811061222757612227613918565b602002602001015160200181905250637147855d60e01b8160008151811061225157612251613918565b60200260200101516020015160008151811061226f5761226f613918565b6001600160e01b031990921660209283029190910182015260405161229491016138ef565b60405160208183030381529060405280519060200120816001815181106122bd576122bd613918565b602002602001015160000181815250506001816001815181106122e2576122e2613918565b60200260200101516040019060028111156122ff576122ff61392e565b908160028111156123125761231261392e565b9052506040805160018082528183019092529060208083019080368337019050508160018151811061234657612346613918565b602002602001015160200181905250634f1ef28660e01b8160018151811061237057612370613918565b60200260200101516020015160008151811061238e5761238e613918565b6001600160e01b03199092166020928302919091018201526040516123c591016a5445535445525f524f4c4560a81b8152600b0190565b60405160208183030381529060405280519060200120816002815181106123ee576123ee613918565b6020026020010151600001818152505060018160028151811061241357612413613918565b60200260200101516040019060028111156124305761243061392e565b908160028111156124435761244361392e565b9052506040805160018082528183019092529060208083019080368337019050508160028151811061247757612477613918565b602002602001015160200181905250631c1102ad60e01b816002815181106124a1576124a1613918565b6020026020010151602001516000815181106124bf576124bf613918565b6001600160e01b03199092166020928302919091018201526040516125009101744c4956454c595f414e4f4e594d4f55535f524f4c4560581b815260150190565b604051602081830303815290604052805190602001208160038151811061252957612529613918565b6020026020010151600001818152505060018160038151811061254e5761254e613918565b602002602001015160400190600281111561256b5761256b61392e565b9081600281111561257e5761257e61392e565b905250604080516001808252818301909252906020808301908036833701905050816003815181106125b2576125b2613918565b602002602001015160200181905250637daea9a360e01b816003815181106125dc576125dc613918565b6020026020010151602001516000815181106125fa576125fa613918565b6001600160e01b031990921660209283029190910182015260405161261f91016138ef565b604051602081830303815290604052805190602001208160048151811061264857612648613918565b6020026020010151600001818152505060028160048151811061266d5761266d613918565b602002602001015160400190600281111561268a5761268a61392e565b9081600281111561269d5761269d61392e565b905250604080516001808252818301909252906020808301908036833701905050816004815181106126d1576126d1613918565b60200260200101516020018190525063d9dc1f1960e01b81600481518110610a5457610a54613918565b604051704c4956454c595f41444d494e5f524f4c4560781b6020820152603101611a95565b60006001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016300361276a5760405162461bcd60e51b81526004016105c2906137c6565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661279c61291a565b6001600160a01b0316146127c25760405162461bcd60e51b81526004016105c2906137f5565b600354600160a01b900460ff16156127ec5760405162461bcd60e51b81526004016105c290613823565b6127fc63d9dc1f1960e01b61293b565b6128485760405162461bcd60e51b815260206004820152601760248201527f5365744c6f63616c41646d696e20466f7262696464656e00000000000000000060448201526064016105c2565b6001600160a01b0382166128905760405162461bcd60e51b815260206004820152600f60248201526e1059191c995cdcc8125b9d985b1a59608a1b60448201526064016105c2565b61289982612f77565b506001919050565b6000610ed160008054600154604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b6000610ed1612aa4565b90565b6000600080516020613c0f8339815191525b546001600160a01b0316919050565b6003546000906001600160a01b03163003612a295760006363d59cf360e11b61296330612f38565b338560405160240161297793929190613b83565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152905060006129f46129b861291a565b836040518060400160405280601d81526020017f44656c656761746563616c6c20686173416363657373204661696c6564000000815250612fee565b90508060018251612a059190613bac565b81518110612a1557612a15613918565b60209101015160f81c600114949350505050565b6003546001600160a01b031663c7ab39e6612a4330612f38565b33856040518463ffffffff1660e01b8152600401612a6393929190613b83565b602060405180830381865afa158015612a80573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105749190613b66565b60007fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610361292c565b612ada8686868686866130b7565b505050505050565b6003546000906001600160a01b03163003612baa57600063e25d75f060e01b600254604051602401612b1691815260200190565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915290506000612b76612b5761291a565b83604051806060016040528060258152602001613bea60259139612fee565b90508060018251612b879190613bac565b81518110612b9757612b97613918565b60209101015160f81c6001149392505050565b600354600254604051630e25d75f60e41b81526001600160a01b039092169163e25d75f091612bdf9160040190815260200190565b602060405180830381865afa158015612bfc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed19190613b66565b612c2861291a565b6001600160a01b0316816001600160a01b031603612c885760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c204e657720496d706c656d656e746174696f6e00000000000060448201526064016105c2565b612c98637147855d60e01b61293b565b612ce45760405162461bcd60e51b815260206004820152601960248201527f5570677261646520436f6e7465787420466f7262696464656e0000000000000060448201526064016105c2565b50565b60607f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615612d3157612d1c846132c5565b50604080516000815260208101909152611bc4565b836001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015612d8b575060408051601f3d908101601f19168201909252612d8891810190613b4d565b60015b612dcf5760405162461bcd60e51b8152602060048201526015602482015274125b1b1959d85b0815555414c810dbdb9d1c9858dd605a1b60448201526064016105c2565b600080516020613c0f8339815191528114612e245760405162461bcd60e51b8152602060048201526015602482015274125b9d985b1a590815555414c810dbdb9d1c9858dd605a1b60448201526064016105c2565b506040516301ffc9a760e01b81526314751dbf60e01b60048201526001600160a01b038516906301ffc9a790602401602060405180830381865afa925050508015612e8c575060408051601f3d908101601f19168201909252612e8991810190613b66565b60015b612ed85760405162461bcd60e51b815260206004820152601760248201527f496c6c6567616c204950726f787920436f6e747261637400000000000000000060448201526064016105c2565b80612f255760405162461bcd60e51b815260206004820152601760248201527f496e76616c6964204950726f787920436f6e747261637400000000000000000060448201526064016105c2565b50612f31848484613346565b9050611bc4565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610380546001600160a01b0383166001600160a01b031990911681179091556040805191825251309133917f54ab0d18de7958786ba1ad85966d59baa2b395455f0530dcdcfd732e6af539e29181900360200190a350565b60606001600160a01b0384163b6130425760405162461bcd60e51b8152602060048201526018602482015277496c6c6567616c20436f6e7472616374204164647265737360401b60448201526064016105c2565b600080856001600160a01b03168560405161305d9190613bcd565b600060405180830381855af49150503d8060008114613098576040519150601f19603f3d011682016040523d82523d6000602084013e61309d565b606091505b50915091506130ad8282866133b0565b9695505050505050565b60445462010000900460ff1661310f5760405162461bcd60e51b815260206004820152601960248201527f436f6e7472616374204e6f7420496e697469616c697a696e670000000000000060448201526064016105c2565b8585604051602001613122929190613a9b565b60408051601f1981840301815290829052805160209182012060005561314c918691869101613a9b565b60408051601f19818403018152919052805160209091012060015560028290556001600160a01b03811661319157600380546001600160a01b031916301790556132ae565b6040516301ffc9a760e01b81526314b8343560e31b60048201526001600160a01b038216906301ffc9a790602401602060405180830381865afa9250505080156131f8575060408051601f3d908101601f191682019092526131f591810190613b66565b60015b6132445760405162461bcd60e51b815260206004820152601c60248201527f496c6c6567616c20416363657373436f6e74726f6c4d616e616765720000000060448201526064016105c2565b806132915760405162461bcd60e51b815260206004820152601c60248201527f496e76616c696420416363657373436f6e74726f6c4d616e616765720000000060448201526064016105c2565b50600380546001600160a01b0319166001600160a01b0383161790555b6003805461ffff60a01b19169055612ada33612f77565b6001600160a01b0381163b6133175760405162461bcd60e51b8152602060048201526018602482015277496c6c6567616c20436f6e7472616374204164647265737360401b60448201526064016105c2565b600080516020613c0f83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6060613351846133e9565b60008351118061335e5750815b1561339957612f3184846040518060400160405280601381526020017211195b1959d85d1958d85b1b0811985a5b1959606a1b815250612fee565b505060408051600081526020810190915292915050565b606083156133bf575081611bc4565b8251156133cf5782518084602001fd5b8160405162461bcd60e51b81526004016105c291906137b3565b6133f2816132c5565b6040516001600160a01b03821690309033907f354bd4b6eb65d64e6c79c53fa4f983a5e6bec4824ce4627c71be0b2722f4917e90600090a450565b60006020828403121561343f57600080fd5b81356001600160e01b031981168114611bc457600080fd5b6001600160a01b0381168114612ce457600080fd5b60006020828403121561347e57600080fd5b8135611bc481613457565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126134b057600080fd5b813567ffffffffffffffff808211156134cb576134cb613489565b604051601f8301601f19908116603f011681019082821181831017156134f3576134f3613489565b8160405283815286602085880101111561350c57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60006020828403121561353e57600080fd5b813567ffffffffffffffff81111561355557600080fd5b6135618482850161349f565b949350505050565b60008083601f84011261357b57600080fd5b50813567ffffffffffffffff81111561359357600080fd5b6020830191508360208285010111156135ab57600080fd5b9250929050565b60008060008060008060008060a0898b0312156135ce57600080fd5b883567ffffffffffffffff808211156135e657600080fd5b6135f28c838d01613569565b909a50985060208b013591508082111561360b57600080fd5b6136178c838d01613569565b909850965060408b013591508082111561363057600080fd5b61363c8c838d01613569565b909650945060608b013591508082111561365557600080fd5b506136628b828c0161349f565b925050608089013561367381613457565b809150509295985092959890939650565b8015158114612ce457600080fd5b6000602082840312156136a457600080fd5b8135611bc481613684565b600080604083850312156136c257600080fd5b82356136cd81613457565b9150602083013567ffffffffffffffff8111156136e957600080fd5b6136f58582860161349f565b9150509250929050565b60008060006060848603121561371457600080fd5b833561371f81613457565b9250602084013567ffffffffffffffff81111561373b57600080fd5b6137478682870161349f565b925050604084013561375881613684565b809150509250925092565b60005b8381101561377e578181015183820152602001613766565b50506000910152565b6000815180845261379f816020860160208601613763565b601f01601f19169290920160200192915050565b602081526000611bc46020830184613787565b602080825260159082015274125b1b1959d85b0810dbdb9d1c9858dd0810d85b1b605a1b604082015260600190565b602080825260149082015273141c9bde1e4810d85b1b195908125b9d985b1a5960621b604082015260600190565b60208082526017908201527f536166654d6f64653a2043616c6c2052656a6563746564000000000000000000604082015260600190565b602080825260159082015274155c19dc9859194810d85b1b0814995a9958dd1959605a1b604082015260600190565b60208082526015908201527410d85b1b195c88139bdd08105d5d1a1bdc9a5e9959605a1b604082015260600190565b6020808252601c908201527f436f6e747261637420416c726561647920496e697469616c697a656400000000604082015260600190565b7f4c4956454c595f53595354454d5f41444d494e5f524f4c450000000000000000815260180190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b8051825260208082015190830152604080820151908301526060808201516001600160a01b0316908301526080908101511515910152565b600081518084526020808501945080840160005b838110156139b65781516001600160e01b03191687529582019590820190600101613990565b509495945050505050565b60e0815260006139d460e0830186613787565b60206139e281850187613944565b83820360c0850152845180835281830190600581901b840183018388016000805b84811015613a6d57601f19888503018652825160608151865288820151818a880152613a318288018261397c565b915050604080830151925060038310613a5857634e487b7160e01b85526021600452602485fd5b95909501529486019491860191600101613a03565b50919b9a5050505050505050505050565b600060208284031215613a9057600080fd5b8151611bc481613457565b8183823760009101908152919050565b60e081526000613abe60e0830186613787565b6020613acc81850187613944565b83820360c0850152845180835281830190600581901b8401830183880160005b83811015613b3d57601f198784030185528151606081518552878201518189870152613b1a8287018261397c565b604093840151151596909301959095525094860194925090850190600101613aec565b50909a9950505050505050505050565b600060208284031215613b5f57600080fd5b5051919050565b600060208284031215613b7857600080fd5b8151611bc481613684565b9283526001600160a01b039190911660208301526001600160e01b031916604082015260600190565b8181038181111561057457634e487b7160e01b600052601160045260246000fd5b60008251613bdf818460208701613763565b919091019291505056fe44656c656761746563616c6c2069735265616c6d55706772616461626c65204661696c6564360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbca2646970667358221220e556f63383aeaaaa9ee9824fc4c1bd456982371a328169ee1a5cf51ab10b01a564736f6c63430008110033b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103";
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
