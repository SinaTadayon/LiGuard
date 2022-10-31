import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { AssetManagerERC20, AssetManagerERC20Interface } from "../../../token/asset/AssetManagerERC20";
declare type AssetManagerERC20ConstructorParams = [linkLibraryAddresses: AssetManagerERC20LibraryAddresses, signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class AssetManagerERC20__factory extends ContractFactory {
    constructor(...args: AssetManagerERC20ConstructorParams);
    static linkBytecode(linkLibraryAddresses: AssetManagerERC20LibraryAddresses): string;
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<AssetManagerERC20>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): AssetManagerERC20;
    connect(signer: Signer): AssetManagerERC20__factory;
    static readonly bytecode = "0x60a0604052306080523480156200001557600080fd5b506200004360017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd62000127565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc146200007457620000746200014f565b620000a160017fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610462000127565b600080516020620045fb83398151915214620000c157620000c16200014f565b33620000ea600080516020620045fb83398151915260001b6200012460201b620022b01760201c565b80546001600160a01b03929092166001600160a01b03199092169190911790556003805461ffff60a01b1916600160a01b17905562000165565b90565b818103818111156200014957634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052600160045260246000fd5b608051614434620001c760003960008181610f1d01528181610f5d015281816110db0152818161111b015281816113a30152818161154901528181611589015281816117d70152818161181701528181611e0c0152611e4c01526144346000f3fe6080604052600436106102485760003560e01c80637147855d11610138578063be22465d116100b0578063ef34f29111610077578063ef34f2911461071d578063f3913e691461073d578063f698da251461075d578063f94a0adb14610772578063fb3f4d2914610787578063ff4d8e4a146107a757005b8063be22465d14610689578063c5d39a4a146106a8578063d312998f146106c8578063d3e024b8146106e8578063d9dc1f19146106fd57005b8063870666cb116100ff578063870666cb146105e15780639ed4fa5a146105f6578063a0a8e46014610616578063aab405fe1461062b578063b484c8891461064b578063b4a0bdf31461066b57005b80637147855d1461052b578063756af45f1461055857806375d0c0dc146105785780637678922e1461058d5780637a09941e146105b457005b806338d38c97116101cb5780635479d940116101925780635479d94014610461578063565bf1fa1461048057806358dbc45d146104a0578063611376f5146104cd578063622110e1146104eb57806367eb04e61461050b57005b806338d38c97146103c457806344b7e5f2146103ec57806348e6be1c1461040c5780634a5e42b11461042c57806352d1902d1461044c57005b80631bdc56271161020f5780631bdc5627146103145780631f69565f146103345780632a5c792a146103625780633091a54814610384578063373c52fa146103a457005b806301ffc9a71461025157806309824a80146102865780630bb0ccaa146102a657806315eaef6b146102d45780631b87323d146102f457005b3661024f57005b005b34801561025d57600080fd5b5061027161026c3660046131c9565b6107c7565b60405190151581526020015b60405180910390f35b34801561029257600080fd5b506102716102a13660046131fb565b6107f2565b3480156102b257600080fd5b506102c66102c1366004613218565b6108f0565b60405190815260200161027d565b3480156102e057600080fd5b506102716102ef366004613259565b610979565b34801561030057600080fd5b5061027161030f36600461329a565b610a08565b34801561032057600080fd5b506102c661032f366004613259565b610d0c565b34801561034057600080fd5b5061035461034f3660046131fb565b610d93565b60405161027d929190613362565b34801561036e57600080fd5b50610377610dca565b60405161027d9190613399565b34801561039057600080fd5b506102c661039f366004613259565b610ddb565b3480156103b057600080fd5b506102716103bf3660046133ba565b610e23565b3480156103d057600080fd5b506103d9610f02565b60405161ffff909116815260200161027d565b3480156103f857600080fd5b506102716104073660046133f3565b610f11565b34801561041857600080fd5b506102716104273660046133f3565b6110cf565b34801561043857600080fd5b506102716104473660046131fb565b6112a3565b34801561045857600080fd5b506102c6611396565b34801561046d57600080fd5b50600354600160a81b900460ff16610271565b34801561048c57600080fd5b5061027161049b366004613410565b611423565b3480156104ac57600080fd5b506104b5611464565b6040516001600160a01b03909116815260200161027d565b3480156104d957600080fd5b506044546001600160a01b03166104b5565b3480156104f757600080fd5b50610271610506366004613484565b61146e565b34801561051757600080fd5b506102716105263660046131fb565b6114af565b34801561053757600080fd5b5061054b61054636600461358d565b61153d565b60405161027d9190613683565b34801561056457600080fd5b5061024f6105733660046131fb565b61166e565b34801561058457600080fd5b506000546102c6565b34801561059957600080fd5b5073__$cdf2ce6e37ccfb50337d871d83177ab89c$__6104b5565b3480156105c057600080fd5b506105d46105cf366004613696565b61172d565b60405161027d919061370a565b3480156105ed57600080fd5b506102c66117b5565b34801561060257600080fd5b506102716106113660046131fb565b6117c0565b34801561062257600080fd5b506001546102c6565b34801561063757600080fd5b5061024f610646366004613766565b6117cd565b34801561065757600080fd5b506104b5610666366004613766565b611b88565b34801561067757600080fd5b506003546001600160a01b03166104b5565b34801561069557600080fd5b50600354600160a01b900460ff16610271565b3480156106b457600080fd5b506102716106c33660046131fb565b611ca8565b3480156106d457600080fd5b506102716106e33660046131fb565b611d0c565b3480156106f457600080fd5b506002546102c6565b34801561070957600080fd5b506102716107183660046131fb565b611e00565b34801561072957600080fd5b506104b561073836600461379a565b611f81565b34801561074957600080fd5b506102716107583660046137d1565b61200f565b34801561076957600080fd5b506102c66120a6565b34801561077e57600080fd5b506104b5612112565b34801561079357600080fd5b506102716107a2366004613259565b61211c565b3480156107b357600080fd5b506102716107c23660046131fb565b612164565b60006001600160e01b03198216631c8b5d5b60e11b14806107ec57506107ec826122b3565b92915050565b60006108036213049560e71b612303565b60405163b5ea87b960e01b8152604660048201526001600160a01b0383166024820152600090819073__$cdf2ce6e37ccfb50337d871d83177ab89c$__9063b5ea87b990604401600060405180830381865af4158015610867573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261088f9190810190613867565b91509150836001600160a01b03166108a43390565b6001600160a01b03167ffbe16c292428cdc3e66e97f954e91cc4f49b472d24989df1b2cdc27f295a706784846040516108de9291906138ca565b60405180910390a35060019392505050565b6000610903836305d8665560e11b612373565b60405163108d303960e31b81526001600160a01b0384169063846981c89061092f908590600401613931565b6020604051808303816000875af115801561094e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610972919061393f565b9392505050565b600061098c846315eaef6b60e01b612373565b604051633466d7f360e11b81526001600160a01b038481166004830152602482018490528516906368cdafe6906044015b6020604051808303816000875af11580156109dc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a009190613963565b949350505050565b6000610a1a631b87323d60e01b612303565b6040516301ffc9a760e01b81526001600160a01b038516906301ffc9a790610a4d9063391f033d60e11b90600401613980565b602060405180830381865afa925050508015610a86575060408051601f3d908101601f19168201909252610a8391810190613963565b60015b610acd5760405162461bcd60e51b81526020600482015260136024820152720496c6c6567616c20494173736574455243323606c1b60448201526064015b60405180910390fd5b80610b105760405162461bcd60e51b81526020600482015260136024820152720496e76616c696420494173736574455243323606c1b6044820152606401610ac4565b506040516301ffc9a760e01b81526001600160a01b038516906301ffc9a790610b4490639673b47d60e01b90600401613980565b602060405180830381865afa925050508015610b7d575060408051601f3d908101601f19168201909252610b7a91810190613963565b60015b610bc05760405162461bcd60e51b8152602060048201526014602482015273496c6c6567616c20494173736574456e7469747960601b6044820152606401610ac4565b80610c045760405162461bcd60e51b8152602060048201526014602482015273496e76616c696420494173736574456e7469747960601b6044820152606401610ac4565b506044546001600160a01b03808616911603610c625760405162461bcd60e51b815260206004820152601b60248201527f41737365745375626a65637420416c72656164792045786973747300000000006044820152606401610ac4565b81610ca35760405162461bcd60e51b8152602060048201526011602482015270496e76616c6964205369676e617475726560781b6044820152606401610ac4565b604480546001600160a01b0319166001600160a01b0386161790556045610ccb838583613a14565b506040516001600160a01b0385169033907f635c49f367f9b4e320585d5b740e0db5ce9ed3194418e45af3a41422a2b9878c90600090a35060019392505050565b6000610d1f84631bdc562760e01b612373565b604051633f14901960e21b81526001600160a01b0384811660048301526024820184905285169063fc524064906044015b6020604051808303816000875af1158015610d6f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a00919061393f565b6001600160a01b038116600090815260466020526040812060028101546060919060ff16610dc0826125d1565b9250925050915091565b6060610dd660476125d1565b905090565b6000610dee8463061234a960e31b612373565b604051630529747360e51b81526001600160a01b0384811660048301526024820184905285169063a52e8e6090604401610d50565b6000610e35631b9e297d60e11b612303565b60405182151581526001600160a01b0384169033907f5b993d7a32d62133a02f02d99f7369ff289d4574f855412034f59adb739615ec9060200160405180910390a360405163c79fd49b60e01b8152604660048201526001600160a01b0384166024820152821515604482015273__$cdf2ce6e37ccfb50337d871d83177ab89c$__9063c79fd49b90606401602060405180830381865af4158015610ede573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109729190613963565b6000610dd660495461ffff1690565b60006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610f5b5760405162461bcd60e51b8152600401610ac490613ad4565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610f8d6125de565b6001600160a01b031614610fb35760405162461bcd60e51b8152600401610ac490613b03565b6000610fc260495461ffff1690565b61ffff16116110135760405162461bcd60e51b815260206004820152601860248201527f436f6e7472616374204e6f7420496e697469616c697a656400000000000000006044820152606401610ac4565b61102363225bf2f960e11b6125ff565b6110675760405162461bcd60e51b815260206004820152601560248201527429b2ba29b0b332a6b7b232902337b93134b23232b760591b6044820152606401610ac4565b6003805460ff60a01b1916600160a01b8415150217905560025430336001600160a01b03167fdd452a31d2e164a1ea436c084842c27d24ae2548a575a869f71b05a4ed16243f856040516110bf911515815260200190565b60405180910390a450805b919050565b60006001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036111195760405162461bcd60e51b8152600401610ac490613ad4565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661114b6125de565b6001600160a01b0316146111715760405162461bcd60e51b8152600401610ac490613b03565b600354600160a01b900460ff161561119b5760405162461bcd60e51b8152600401610ac490613b31565b6111ab631239af8760e21b6125ff565b6111f75760405162461bcd60e51b815260206004820152601a60248201527f5365745570677261646553746174757320466f7262696464656e0000000000006044820152606401610ac4565b6111ff612744565b61124b5760405162461bcd60e51b815260206004820152601760248201527f5265616c6d205570677261646520466f7262696464656e0000000000000000006044820152606401610ac4565b6003805460ff60a81b1916600160a81b8415150217905560025430336001600160a01b03167fe9f97ad94c2ba252dcfc525e004f608ac5cb886955d8fc87d9e0ee070a698c56856040516110bf911515815260200190565b60006112b5634a5e42b160e01b612303565b60405163bbb9b43d60e01b8152604660048201526001600160a01b038316602482015260009073__$cdf2ce6e37ccfb50337d871d83177ab89c$__9063bbb9b43d90604401602060405180830381865af4158015611317573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061133b9190613b68565b9050806001600160a01b0316836001600160a01b03166113583390565b6001600160a01b03167f9b4f55639e5e283319baee5bc4e69a5625a8e3a1cc004af968f4fee72502202760405160405180910390a450600192915050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146114105760405162461bcd60e51b815260206004820152601d60248201527f496c6c6567616c20436f6e74726163742044656c656761746563616c6c0000006044820152606401610ac4565b506000805160206143df83398151915290565b600061143684632b2df8fd60e11b612373565b604051632710b17b60e21b81526001600160a01b03851690639c42c5ec906109bd9086908690600401613b85565b6000610dd66125de565b60006114818463622110e160e01b612373565b60405163e9dbebbd60e01b81526001600160a01b0385169063e9dbebbd906109bd9086908690600401613bf5565b60006107ec8260466000016000856001600160a01b0316631083f7616040518163ffffffff1660e01b8152600401602060405180830381865afa1580156114fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061151e9190613b68565b6001600160a01b03168152602081019190915260400160002090612882565b60606001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036115875760405162461bcd60e51b8152600401610ac490613ad4565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166115b96125de565b6001600160a01b0316146115df5760405162461bcd60e51b8152600401610ac490613b03565b600354600160a01b900460ff16156116095760405162461bcd60e51b8152600401610ac490613b31565b600354600160a81b900460ff1661165a5760405162461bcd60e51b8152602060048201526015602482015274155c19dc9859194810d85b1b0814995a9958dd1959605a1b6044820152606401610ac4565b611663846128a4565b610a0084848461296b565b600354600160a01b900460ff16156116985760405162461bcd60e51b8152600401610ac490613b31565b6116a863756af45f60e01b6125ff565b6116f45760405162461bcd60e51b815260206004820152601a60248201527f57697468647261772042616c616e636520466f7262696464656e0000000000006044820152606401610ac4565b6040516001600160a01b038216904780156108fc02916000818181858888f19350505050158015611729573d6000803e3d6000fd5b5050565b606061174084633d04ca0f60e11b612373565b604051633862ae0160e11b81526001600160a01b038516906370c55c029061176e9086908690600401613c41565b6000604051808303816000875af115801561178d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610a009190810190613ca6565b6000610dd630612bc1565b60006107ec604783612882565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036118155760405162461bcd60e51b8152600401610ac490613ad4565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166118476125de565b6001600160a01b03161461186d5760405162461bcd60e51b8152600401610ac490613b03565b33611876612c00565b6001600160a01b0316146118c45760405162461bcd60e51b815260206004820152601560248201527410d85b1b195c88139bdd08105d5d1a1bdc9a5e9959605a1b6044820152606401610ac4565b60495462010000900460ff16158080156118e65750604954600161ffff909116105b806119015750303b158015611901575060495461ffff166001145b61194d5760405162461bcd60e51b815260206004820152601c60248201527f436f6e747261637420416c726561647920496e697469616c697a6564000000006044820152606401610ac4565b6049805461ffff191660011790558015611973576049805462ff00001916620100001790555b60006119826040840184613d36565b604051602001611993929190613d83565b60408051601f19818403018152919052805160209091012090506119dd6119ba8480613d36565b6119c76020870187613d36565b856119d860808a0160608b016131fb565b612c28565b600080546001546002546040516397ca328d60e01b8152849373__$cdf2ce6e37ccfb50337d871d83177ab89c$__936397ca328d93611a2f936004019283526020830191909152604082015260600190565b600060405180830381865af4158015611a4c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611a749190810190613ecf565b60035491935091506001600160a01b031663f1df49da611a976080880188613d36565b85856040518563ffffffff1660e01b8152600401611ab89493929190613faa565b6020604051808303816000875af1158015611ad7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611afb919061393f565b50611b046125de565b6001600160a01b031630337ff851a1e85477b818fc72ad517ea622cc316f10f67d61c9e740adc151a8b41394611b3a8980613d36565b611b4760208c018c613d36565b8a611b5560495461ffff1690565b604051611b67969594939291906140b6565b60405180910390a45050508015611729576049805462ff0000191690555050565b6000611b9a63b484c88960e01b612303565b6003546044546040516308d9f7e360e01b8152600092839273__$cdf2ce6e37ccfb50337d871d83177ab89c$__926308d9f7e392611bf0926046928a926001600160a01b039081169216906045906004016141bd565b6040805180830381865af4158015611c0c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c309190614288565b9092509050611c4560608501604086016131fb565b6001600160a01b0316826001600160a01b0316611c5f3390565b6040516001600160a01b03858116825291909116907fa585f587bcfc3f76acec7db143aa51e1be0b5e75bee741689d55af27cbed7c1d9060200160405180910390a45092915050565b6000816001600160a01b0316634cfb99496040518163ffffffff1660e01b8152600401602060405180830381865afa158015611ce8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ec9190613963565b6000611d1e63d312998f60e01b612303565b604051631128debd60e31b8152604660048201526001600160a01b0383166024820152600090819073__$cdf2ce6e37ccfb50337d871d83177ab89c$__90638946f5e8906044016040805180830381865af4158015611d81573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611da591906142b7565b91509150806001600160a01b0316846001600160a01b0316611dc43390565b6001600160a01b03167f52fa4983a7faf930ea4d4238e22fcc42e87608baf5116306461b078bb1ed340660405160405180910390a45092915050565b60006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003611e4a5760405162461bcd60e51b8152600401610ac490613ad4565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316611e7c6125de565b6001600160a01b031614611ea25760405162461bcd60e51b8152600401610ac490613b03565b600354600160a01b900460ff1615611ecc5760405162461bcd60e51b8152600401610ac490613b31565b611edc63d9dc1f1960e01b6125ff565b611f285760405162461bcd60e51b815260206004820152601760248201527f5365744c6f63616c41646d696e20466f7262696464656e0000000000000000006044820152606401610ac4565b6001600160a01b038216611f705760405162461bcd60e51b815260206004820152600f60248201526e1059191c995cdcc8125b9d985b1a59608a1b6044820152606401610ac4565b611f7982612c3e565b506001919050565b60405163ef34f29160e01b81526001600160a01b038085166004830152602482018490528216604482015260009073__$cdf2ce6e37ccfb50337d871d83177ab89c$__9063ef34f29190606401602060405180830381865af4158015611feb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a009190613b68565b60006120228563f3913e6960e01b612373565b604051634b0cba5d60e11b81526001600160a01b03858116600483015284811660248301526044820184905286169063961974ba906064016020604051808303816000875af1158015612079573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061209d9190613963565b95945050505050565b6000610dd660008054600154604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b6000610dd6612c00565b600061212f8463fb3f4d2960e01b612373565b604051630cd689f560e01b81526001600160a01b03848116600483015260248201849052851690630cd689f5906044016109bd565b60006121796001625938db60e11b0319612303565b612184604783612882565b6121c45760405162461bcd60e51b8152602060048201526011602482015270151bdad95b925908139bdd08119bdd5b99607a1b6044820152606401610ac4565b6001600160a01b03821660009081526046602052604090206121e581612cb5565b60071461222c5760405162461bcd60e51b8152602060048201526015602482015274105cdcd95d0814995c5d5a5c99590811985a5b1959605a1b6044820152606401610ac4565b612234613195565b60005b60078110156122815761224a8382612cbf565b82826007811061225c5761225c6142d5565b6001600160a01b0390921660209290920201528061227981614301565b915050612237565b5060405163ec4ac1f760e01b81526001600160a01b0385169063ec4ac1f7906109bd903090859060040161431a565b90565b60006001600160e01b031982166314751dbf60e01b14806122e457506001600160e01b031982166352d1902d60e01b145b806107ec57506301ffc9a760e01b6001600160e01b03198316146107ec565b600354600160a01b900460ff161561232d5760405162461bcd60e51b8152600401610ac490613b31565b80612337816125ff565b6117295760405162461bcd60e51b815260206004820152600d60248201526c1058d8d95cdcc811195b9a5959609a1b6044820152606401610ac4565b61237c81612303565b6001600160a01b0382166123c45760405162461bcd60e51b815260206004820152600f60248201526e125b9d985b1a5908105cdcd95d1259608a1b6044820152606401610ac4565b6040516301ffc9a760e01b81526001600160a01b038316906301ffc9a7906123f790639673b47d60e01b90600401613980565b602060405180830381865afa925050508015612430575060408051601f3d908101601f1916820190925261242d91810190613963565b60015b6124735760405162461bcd60e51b8152602060048201526014602482015273496c6c6567616c20494173736574456e7469747960601b6044820152606401610ac4565b806124b75760405162461bcd60e51b8152602060048201526014602482015273496e76616c696420494173736574456e7469747960601b6044820152606401610ac4565b506000826001600160a01b0316631083f7616040518163ffffffff1660e01b8152600401602060405180830381865afa1580156124f8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061251c9190613b68565b9050612529604782612882565b6125695760405162461bcd60e51b8152602060048201526011602482015270151bdad95b925908139bdd08119bdd5b99607a1b6044820152606401610ac4565b6001600160a01b038116600090815260466020526040902061258b8185612882565b6125cb5760405162461bcd60e51b8152602060048201526011602482015270105cdcd95d125908139bdd08119bdd5b99607a1b6044820152606401610ac4565b50505050565b6060600061097283612ccb565b60006000805160206143df8339815191525b546001600160a01b0316919050565b6003546000906001600160a01b031630036126ed5760006363d59cf360e11b61262730612bc1565b338560405160240161263b93929190614361565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152905060006126b861267c6125de565b836040518060400160405280601d81526020017f44656c656761746563616c6c20686173416363657373204661696c6564000000815250612d27565b905080600182516126c9919061438a565b815181106126d9576126d96142d5565b60209101015160f81c600114949350505050565b6003546001600160a01b031663c7ab39e661270730612bc1565b33856040518463ffffffff1660e01b815260040161272793929190614361565b602060405180830381865afa158015611ce8573d6000803e3d6000fd5b6003546000906001600160a01b0316300361280c57600063e25d75f060e01b60025460405160240161277891815260200190565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152905060006127d86127b96125de565b836040518060600160405280602581526020016143ba60259139612d27565b905080600182516127e9919061438a565b815181106127f9576127f96142d5565b60209101015160f81c6001149392505050565b600354600254604051630e25d75f60e41b81526001600160a01b039092169163e25d75f0916128419160040190815260200190565b602060405180830381865afa15801561285e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dd69190613963565b6001600160a01b03811660009081526001830160205260408120541515610972565b6128ac6125de565b6001600160a01b0316816001600160a01b03160361290c5760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c204e657720496d706c656d656e746174696f6e0000000000006044820152606401610ac4565b61291c637147855d60e01b6125ff565b6129685760405162461bcd60e51b815260206004820152601960248201527f5570677261646520436f6e7465787420466f7262696464656e000000000000006044820152606401610ac4565b50565b60607f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156129b5576129a084612df0565b50604080516000815260208101909152610972565b836001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015612a0f575060408051601f3d908101601f19168201909252612a0c9181019061393f565b60015b612a535760405162461bcd60e51b8152602060048201526015602482015274125b1b1959d85b0815555414c810dbdb9d1c9858dd605a1b6044820152606401610ac4565b6000805160206143df8339815191528114612aa85760405162461bcd60e51b8152602060048201526015602482015274125b9d985b1a590815555414c810dbdb9d1c9858dd605a1b6044820152606401610ac4565b506040516301ffc9a760e01b81526001600160a01b038516906301ffc9a790612adc906314751dbf60e01b90600401613980565b602060405180830381865afa925050508015612b15575060408051601f3d908101601f19168201909252612b1291810190613963565b60015b612b615760405162461bcd60e51b815260206004820152601760248201527f496c6c6567616c204950726f787920436f6e74726163740000000000000000006044820152606401610ac4565b80612bae5760405162461bcd60e51b815260206004820152601760248201527f496e76616c6964204950726f787920436f6e74726163740000000000000000006044820152606401610ac4565b50612bba848484612e71565b9050610972565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b60007fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61036125f0565b612c36868686868686612edb565b505050505050565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610380546001600160a01b0383166001600160a01b031990911681179091556040805191825251309133917f54ab0d18de7958786ba1ad85966d59baa2b395455f0530dcdcfd732e6af539e29181900360200190a350565b60006107ec825490565b600061097283836130ee565b606081600001805480602002602001604051908101604052809291908181526020018280548015612d1b57602002820191906000526020600020905b815481526020019060010190808311612d07575b50505050509050919050565b60606001600160a01b0384163b612d7b5760405162461bcd60e51b8152602060048201526018602482015277496c6c6567616c20436f6e7472616374204164647265737360401b6044820152606401610ac4565b600080856001600160a01b031685604051612d96919061439d565b600060405180830381855af49150503d8060008114612dd1576040519150601f19603f3d011682016040523d82523d6000602084013e612dd6565b606091505b5091509150612de6828286613118565b9695505050505050565b6001600160a01b0381163b612e425760405162461bcd60e51b8152602060048201526018602482015277496c6c6567616c20436f6e7472616374204164647265737360401b6044820152606401610ac4565b6000805160206143df83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6060612e7c84613151565b600083511180612e895750815b15612ec457612bba84846040518060400160405280601381526020017211195b1959d85d1958d85b1b0811985a5b1959606a1b815250612d27565b505060408051600081526020810190915292915050565b60495462010000900460ff16612f335760405162461bcd60e51b815260206004820152601960248201527f436f6e7472616374204e6f7420496e697469616c697a696e67000000000000006044820152606401610ac4565b8585604051602001612f46929190613d83565b60408051601f19818403018152908290528051602091820120600055612f70918691869101613d83565b60408051601f19818403018152919052805160209091012060015560028290556001600160a01b038116612fb557600380546001600160a01b031916301790556130d7565b6040516301ffc9a760e01b81526001600160a01b038216906301ffc9a790612fe8906314b8343560e31b90600401613980565b602060405180830381865afa925050508015613021575060408051601f3d908101601f1916820190925261301e91810190613963565b60015b61306d5760405162461bcd60e51b815260206004820152601c60248201527f496c6c6567616c20416363657373436f6e74726f6c4d616e61676572000000006044820152606401610ac4565b806130ba5760405162461bcd60e51b815260206004820152601c60248201527f496e76616c696420416363657373436f6e74726f6c4d616e61676572000000006044820152606401610ac4565b50600380546001600160a01b0319166001600160a01b0383161790555b6003805461ffff60a01b19169055612c3633612c3e565b6000826000018281548110613105576131056142d5565b9060005260206000200154905092915050565b60608315613127575081610972565b8251156131375782518084602001fd5b8160405162461bcd60e51b8152600401610ac49190613683565b61315a81612df0565b6040516001600160a01b03821690309033907f354bd4b6eb65d64e6c79c53fa4f983a5e6bec4824ce4627c71be0b2722f4917e90600090a450565b6040518060e001604052806007906020820280368337509192915050565b6001600160e01b03198116811461296857600080fd5b6000602082840312156131db57600080fd5b8135610972816131b3565b6001600160a01b038116811461296857600080fd5b60006020828403121561320d57600080fd5b8135610972816131e6565b60008082840360a081121561322c57600080fd5b8335613237816131e6565b92506080601f198201121561324b57600080fd5b506020830190509250929050565b60008060006060848603121561326e57600080fd5b8335613279816131e6565b92506020840135613289816131e6565b929592945050506040919091013590565b6000806000604084860312156132af57600080fd5b83356132ba816131e6565b925060208401356001600160401b03808211156132d657600080fd5b818601915086601f8301126132ea57600080fd5b8135818111156132f957600080fd5b87602082850101111561330b57600080fd5b6020830194508093505050509250925092565b600081518084526020808501945080840160005b838110156133575781516001600160a01b031687529582019590820190600101613332565b509495945050505050565b60006003841061338257634e487b7160e01b600052602160045260246000fd5b83825260406020830152610a00604083018461331e565b602081526000610972602083018461331e565b801515811461296857600080fd5b600080604083850312156133cd57600080fd5b82356133d8816131e6565b915060208301356133e8816133ac565b809150509250929050565b60006020828403121561340557600080fd5b8135610972816133ac565b60008060006040848603121561342557600080fd5b8335613430816131e6565b925060208401356001600160401b038082111561344c57600080fd5b818601915086601f83011261346057600080fd5b81358181111561346f57600080fd5b87602060608302850101111561330b57600080fd5b60008060006040848603121561349957600080fd5b83356134a4816131e6565b925060208401356001600160401b03808211156134c057600080fd5b818601915086601f8301126134d457600080fd5b8135818111156134e357600080fd5b8760208260061b850101111561330b57600080fd5b634e487b7160e01b600052604160045260246000fd5b604051606081016001600160401b0381118282101715613530576135306134f8565b60405290565b604051601f8201601f191681016001600160401b038111828210171561355e5761355e6134f8565b604052919050565b60006001600160401b0382111561357f5761357f6134f8565b50601f01601f191660200190565b6000806000606084860312156135a257600080fd5b83356135ad816131e6565b925060208401356001600160401b038111156135c857600080fd5b8401601f810186136135d957600080fd5b80356135ec6135e782613566565b613536565b81815287602083850101111561360157600080fd5b816020840160208301376000602083830101528094505050506040840135613628816133ac565b809150509250925092565b60005b8381101561364e578181015183820152602001613636565b50506000910152565b6000815180845261366f816020860160208601613633565b601f01601f19169290920160200192915050565b6020815260006109726020830184613657565b6000806000604084860312156136ab57600080fd5b83356136b6816131e6565b925060208401356001600160401b03808211156136d257600080fd5b818601915086601f8301126136e657600080fd5b8135818111156136f557600080fd5b8760208260071b850101111561330b57600080fd5b6020808252825182820181905260009190848201906040850190845b8181101561374257835183529284019291840191600101613726565b50909695505050505050565b600060a0828403121561376057600080fd5b50919050565b60006020828403121561377857600080fd5b81356001600160401b0381111561378e57600080fd5b610a008482850161374e565b6000806000606084860312156137af57600080fd5b83356137ba816131e6565b9250602084013591506040840135613628816131e6565b600080600080608085870312156137e757600080fd5b84356137f2816131e6565b93506020850135613802816131e6565b92506040850135613812816131e6565b9396929550929360600135925050565b600082601f83011261383357600080fd5b81516138416135e782613566565b81815284602083860101111561385657600080fd5b610a00826020830160208701613633565b6000806040838503121561387a57600080fd5b82516001600160401b038082111561389157600080fd5b61389d86838701613822565b935060208501519150808211156138b357600080fd5b506138c085828601613822565b9150509250929050565b6040815260006138dd6040830185613657565b828103602084015261209d8185613657565b80356138fa816131e6565b6001600160a01b039081168352602082013590613916826131e6565b16602083015260408181013590830152606090810135910152565b608081016107ec82846138ef565b60006020828403121561395157600080fd5b5051919050565b80516110ca816133ac565b60006020828403121561397557600080fd5b8151610972816133ac565b6001600160e01b031991909116815260200190565b600181811c908216806139a957607f821691505b60208210810361376057634e487b7160e01b600052602260045260246000fd5b601f821115613a0f57600081815260208120601f850160051c810160208610156139f05750805b601f850160051c820191505b81811015612c36578281556001016139fc565b505050565b6001600160401b03831115613a2b57613a2b6134f8565b613a3f83613a398354613995565b836139c9565b6000601f841160018114613a735760008515613a5b5750838201355b600019600387901b1c1916600186901b178355613acd565b600083815260209020601f19861690835b82811015613aa45786850135825560209485019460019092019101613a84565b5086821015613ac15760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b602080825260159082015274125b1b1959d85b0810dbdb9d1c9858dd0810d85b1b605a1b604082015260600190565b602080825260149082015273141c9bde1e4810d85b1b195908125b9d985b1a5960621b604082015260600190565b60208082526017908201527f536166654d6f64653a2043616c6c2052656a6563746564000000000000000000604082015260600190565b600060208284031215613b7a57600080fd5b8151610972816131e6565b6020808252818101839052600090604080840186845b87811015613be8578135613bae816131e6565b6001600160a01b0390811684528286013590613bc9826131e6565b1683860152818401358484015260609283019290910190600101613b9b565b5090979650505050505050565b6020808252818101839052600090604080840186845b87811015613be8578135613c1e816131e6565b6001600160a01b0316835281850135858401529183019190830190600101613c0b565b6020808252810182905260008360408301825b85811015613c7957613c6682846138ef565b6080928301929190910190600101613c54565b5095945050505050565b60006001600160401b03821115613c9c57613c9c6134f8565b5060051b60200190565b60006020808385031215613cb957600080fd5b82516001600160401b03811115613ccf57600080fd5b8301601f81018513613ce057600080fd5b8051613cee6135e782613c83565b81815260059190911b82018301908381019087831115613d0d57600080fd5b928401925b82841015613d2b57835182529284019290840190613d12565b979650505050505050565b6000808335601e19843603018112613d4d57600080fd5b8301803591506001600160401b03821115613d6757600080fd5b602001915036819003821315613d7c57600080fd5b9250929050565b8183823760009101908152919050565b600082601f830112613da457600080fd5b81516020613db46135e783613c83565b82815260059290921b84018101918181019086841115613dd357600080fd5b8286015b84811015613ec45780516001600160401b0380821115613df75760008081fd5b908801906060828b03601f1901811315613e115760008081fd5b613e1961350e565b87840151815260408085015184811115613e335760008081fd5b85019350603f84018d13613e475760008081fd5b88840151613e576135e782613c83565b81815260059190911b85018201908a8101908f831115613e775760008081fd5b958301955b82871015613e9e578651613e8f816131b3565b8252958b0195908b0190613e7c565b848c015250613eb09050858401613958565b908201528652505050918301918301613dd7565b509695505050505050565b60008082840360c0811215613ee357600080fd5b60a0811215613ef157600080fd5b5060405160a081016001600160401b038282108183111715613f1557613f156134f8565b8160405285518352602086015160208401526040860151604084015260608601519150613f41826131e6565b81606084015260808601519150613f57826133ac565b6080830182905260a086015192945080831115613f7357600080fd5b50506138c085828601613d93565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60e081526000613fbe60e083018688613f81565b6020855181850152808601516040818187015280880151915060608281880152808901519250608060018060a01b03841681890152808a0151151560a089015287860360c089015285935088518087528587019450858160051b880101868b016000805b848110156140a1578a8403601f190189528251805185528a8101518b86018990528051898701819052908c01908490898801905b808310156140805783516001600160e01b0319168252928e019260019290920191908e0190614056565b50928b01511515968b019690965250988a0198935091890191600101614022565b50919f9e505050505050505050505050505050565b6080815260006140ca60808301888a613f81565b82810360208401526140dd818789613f81565b91505083604083015261ffff83166060830152979650505050505050565b6000808335601e1984360301811261411257600080fd5b83016020810192503590506001600160401b0381111561413157600080fd5b803603821315613d7c57600080fd5b6000815461414d81613995565b80855260206001838116801561416a5760018114614184576141b2565b60ff1985168884015283151560051b8801830195506141b2565b866000528260002060005b858110156141aa5781548a820186015290830190840161418f565b890184019650505b505050505092915050565b85815260a06020820152843560a0820152602085013560c0820152600060408601356141e8816131e6565b6001600160a01b031660e083015261420360608701876140fb565b60a061010085015261421a61014085018284613f81565b91505061422a60808801886140fb565b848303609f1901610120860152614242838284613f81565b9250505061425b60408401876001600160a01b03169052565b6001600160a01b0385166060840152828103608084015261427c8185614140565b98975050505050505050565b6000806040838503121561429b57600080fd5b82516142a6816131e6565b60208401519092506133e8816131e6565b600080604083850312156142ca57600080fd5b82516142a6816133ac565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201614313576143136142eb565b5060010190565b6001600160a01b03838116825261010082019060208084018560005b6007811015614355578151851683529183019190830190600101614336565b50505050509392505050565b9283526001600160a01b039190911660208301526001600160e01b031916604082015260600190565b818103818111156107ec576107ec6142eb565b600082516143af818460208701613633565b919091019291505056fe44656c656761746563616c6c2069735265616c6d55706772616461626c65204661696c6564360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbca26469706673582212200f3bf39420c8dd636fb4f8806561539d8247b815c3bdb276f1f9b4cded02dbc364736f6c63430008110033b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103";
    static readonly abi: ({
        inputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
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
        inputs?: undefined;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
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
    static createInterface(): AssetManagerERC20Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): AssetManagerERC20;
}
export interface AssetManagerERC20LibraryAddresses {
    ["src/contracts/lib/token/LAssetManagerERC20.sol:LAssetManagerERC20"]: string;
}
export {};
