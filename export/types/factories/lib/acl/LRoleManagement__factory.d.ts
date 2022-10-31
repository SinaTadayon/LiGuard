import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { LRoleManagement, LRoleManagementInterface } from "../../../lib/acl/LRoleManagement";
declare type LRoleManagementConstructorParams = [linkLibraryAddresses: LRoleManagementLibraryAddresses, signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class LRoleManagement__factory extends ContractFactory {
    constructor(...args: LRoleManagementConstructorParams);
    static linkBytecode(linkLibraryAddresses: LRoleManagementLibraryAddresses): string;
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<LRoleManagement>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): LRoleManagement;
    connect(signer: Signer): LRoleManagement__factory;
    static readonly bytecode = "0x61253d61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100f45760003560e01c80637678922e1161009657806384f27d351161007057806384f27d3514610268578063881d86761461028857806391de53cf146102a8578063bec94751146102c857600080fd5b80637678922e146101fd578063803bd090146102285780638495fa561461024857600080fd5b806352b20ec0116100d257806352b20ec01461016b578063608f85ef1461018d5780636861fc11146101bd57806368b38e0f146101d057600080fd5b80631912cf43146100f95780632466209b146101355780633f75a32d1461014b575b600080fd5b81801561010557600080fd5b50610119610114366004611e71565b6102d0565b6040805192151583526020830191909152015b60405180910390f35b61013d61059d565b60405190815260200161012c565b81801561015757600080fd5b50610119610166366004611eae565b6105cb565b61017e610179366004611ee7565b6108a8565b60405161012c93929190611f09565b81801561019957600080fd5b506101ad6101a8366004611f67565b61096c565b604051901515815260200161012c565b6101ad6101cb366004612002565b610b4f565b8180156101dc57600080fd5b506101f06101eb366004612037565b610bcd565b60405161012c91906120a3565b6040516001600160a01b0373__$c43b1d7058274a71a9734d16e6b6586431$__16815260200161012c565b81801561023457600080fd5b506101ad610243366004611f67565b610e4b565b81801561025457600080fd5b506101ad610263366004612002565b611023565b61027b610276366004611ee7565b61118d565b60405161012c91906120e7565b81801561029457600080fd5b5061013d6102a3366004612128565b6111f5565b8180156102b457600080fd5b506101ad6102c3366004612002565b61136b565b61013d6114d5565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610311573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061033591906121c3565b1561035b5760405162461bcd60e51b8152600401610352906121e0565b60405180910390fd5b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a8661037f306114f8565b6040516001600160e01b031960e085901b1681526103ac9291903390630dbf304b60e41b90600401612217565b602060405180830381865af41580156103c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ed91906121c3565b6104395760405162461bcd60e51b815260206004820152601a60248201527f536574526f6c6547726f7570204163636573732044656e6965640000000000006044820152606401610352565b60008481526002860160205260409020600101805461045790612245565b90506000036104785760405162461bcd60e51b81526004016103529061227f565b60008381526004860160205260409020805461049390612245565b90506000036104d65760405162461bcd60e51b815260206004820152600f60248201526e11dc9bdd5c08139bdd08119bdd5b99608a1b6044820152606401610352565b60008481526002860160205260409020548390036105365760405162461bcd60e51b815260206004820152601960248201527f496c6c6567616c2047726f7570204475706c69636174696f6e000000000000006044820152606401610352565b60008481526002808701602090815260408084205480855260048a01909252909220610563910186611537565b50600084815260048701602052604090206105819060020186611543565b5060009485526002959095016020525050604090912055600191565b604051640312e302e360dc1b60208201526025015b6040516020818303038152906040528051906020012081565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561060c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063091906121c3565b1561064d5760405162461bcd60e51b8152600401610352906121e0565b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a86610671306114f8565b6040516001600160e01b031960e085901b16815261069e929190339063738f112760e11b90600401612217565b602060405180830381865af41580156106bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106df91906121c3565b61072b5760405162461bcd60e51b815260206004820152601b60248201527f536574526f6c65537461747573204163636573732044656e69656400000000006044820152606401610352565b604051744c4956454c595f414e4f4e594d4f55535f524f4c4560581b60208201526035016040516020818303038152906040528051906020012084141580156107a95750604051704c4956454c595f41444d494e5f524f4c4560781b6020820152603101604051602081830303815290604052805190602001208414155b80156107f15750604051774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b6020820152603801604051602081830303815290604052805190602001208414155b61083d5760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c204368616e676520526f6c65205374617475730000000000006044820152606401610352565b60008481526002860160205260409020600101805461085b90612245565b905060000361087c5760405162461bcd60e51b81526004016103529061227f565b5050600091825260029283016020526040909120918201805460ff191691151591909117905554600191565b600081815260028084016020526040822080549181015460019091018054606094938493909160ff9091169083906108df90612245565b80601f016020809104026020016040519081016040528092919081815260200182805461090b90612245565b80156109585780601f1061092d57610100808354040283529160200191610958565b820191906000526020600020905b81548152906001019060200180831161093b57829003601f168201915b505050505092509250925092509250925092565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109d091906121c3565b156109ed5760405162461bcd60e51b8152600401610352906121e0565b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a85610a11306114f8565b6040516001600160e01b031960e085901b168152610a3e92919033906362ab810560e11b90600401612217565b602060405180830381865af4158015610a5b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a7f91906121c3565b610ad75760405162461bcd60e51b8152602060048201526024808201527f42617463685265766f6b65526f6c654163636f756e74204163636573732044656044820152631b9a595960e21b6064820152608401610352565b60005b82811015610b4457610b3185858584818110610af857610af86122a7565b90506040020160000135868685818110610b1457610b146122a7565b9050604002016020016020810190610b2c91906122bd565b61154f565b5080610b3c816122ee565b915050610ada565b506001949350505050565b600082815260028401602052604081206001018054610b6d90612245565b1580159150610b8457506001600160a01b03821615155b8015610bc5575060016001600160a01b03831660009081526020868152604080832087845290915290205460ff166002811115610bc357610bc3612307565b145b949350505050565b6060306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610c0d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3191906121c3565b15610c4e5760405162461bcd60e51b8152600401610352906121e0565b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a85610c72306114f8565b6040516001600160e01b031960e085901b168152610c9f9291903390634f1d167560e11b90600401612217565b602060405180830381865af4158015610cbc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ce091906121c3565b610d2c5760405162461bcd60e51b815260206004820152601f60248201527f42617463685265676973746572526f6c65204163636573732044656e696564006044820152606401610352565b60008267ffffffffffffffff811115610d4757610d4761231d565b604051908082528060200260200182016040528015610d70578160200160208202803683370190505b50905060005b83811015610e4257610e1386868684818110610d9457610d946122a7565b9050602002810190610da69190612333565b610db4906020810190612353565b888886818110610dc657610dc66122a7565b9050602002810190610dd89190612333565b35898987818110610deb57610deb6122a7565b9050602002810190610dfd9190612333565b610e0e9060608101906040016123a1565b6117e4565b828281518110610e2557610e256122a7565b602090810291909101015280610e3a816122ee565b915050610d76565b50949350505050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610e8b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eaf91906121c3565b15610ecc5760405162461bcd60e51b8152600401610352906121e0565b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a85610ef0306114f8565b6040516001600160e01b031960e085901b168152610f1d92919033906393ba313160e01b90600401612217565b602060405180830381865af4158015610f3a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5e91906121c3565b610fb65760405162461bcd60e51b815260206004820152602360248201527f42617463684772616e74526f6c654163636f756e74204163636573732044656e6044820152621a595960ea1b6064820152608401610352565b60005b82811015610b445761101085858584818110610fd757610fd76122a7565b90506040020160000135868685818110610ff357610ff36122a7565b905060400201602001602081019061100b91906122bd565b611983565b508061101b816122ee565b915050610fb9565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611063573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061108791906121c3565b156110a45760405162461bcd60e51b8152600401610352906121e0565b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a856110c8306114f8565b6040516001600160e01b031960e085901b1681526110f592919033906308f09e0f60e41b90600401612217565b602060405180830381865af4158015611112573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061113691906121c3565b6111825760405162461bcd60e51b815260206004820152601e60248201527f4772616e74526f6c654163636f756e74204163636573732044656e69656400006044820152606401610352565b610b44848484611983565b600081815260028301602052604090206001018054606091906111af90612245565b90506000036111d05760405162461bcd60e51b81526004016103529061227f565b600082815260028401602052604090206111ec90600301611c69565b90505b92915050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611235573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061125991906121c3565b156112765760405162461bcd60e51b8152600401610352906121e0565b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a8761129a306114f8565b6040516001600160e01b031960e085901b1681526112c7929190339063b2dc26e560e01b90600401612217565b602060405180830381865af41580156112e4573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061130891906121c3565b6113545760405162461bcd60e51b815260206004820152601a60248201527f5265676973746572526f6c65204163636573732044656e6965640000000000006044820152606401610352565b61136186868686866117e4565b9695505050505050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156113ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113cf91906121c3565b156113ec5760405162461bcd60e51b8152600401610352906121e0565b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a85611410306114f8565b6040516001600160e01b031960e085901b16815261143d929190339063df01de4560e01b90600401612217565b602060405180830381865af415801561145a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061147e91906121c3565b6114ca5760405162461bcd60e51b815260206004820152601f60248201527f5265766f6b65526f6c654163636f756e74204163636573732044656e696564006044820152606401610352565b610b4484848461154f565b6040516e13149bdb1953585b9859d95b595b9d608a1b6020820152602f016105b2565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b60006111ec8383611c7d565b60006111ec8383611d70565b604051704c4956454c595f41444d494e5f524f4c4560781b6020820152600090603101604051602081830303815290604052805190602001208314806115d05750604051774c4956454c595f53595354454d5f41444d494e5f524f4c4560401b60208201526038016040516020818303038152906040528051906020012083145b1561164157600083815260028501602052604090206001906115f490600301611dbf565b116116415760405162461bcd60e51b815260206004820152601b60248201527f496c6c6567616c205265766f6b6520526f6c65204163636f756e7400000000006044820152606401610352565b60008381526002850160205260409020600101805461165f90612245565b90506000036116805760405162461bcd60e51b81526004016103529061227f565b6001600160a01b0382166116c85760405162461bcd60e51b815260206004820152600f60248201526e1059191c995cdcc8125b9d985b1a59608a1b6044820152606401610352565b600083815260028501602052604090206116e59060030183611dc9565b6117255760405162461bcd60e51b81526020600482015260116024820152701058d8dbdd5b9d08139bdd08119bdd5b99607a1b6044820152606401610352565b6001600160a01b03821660009081526020858152604080832086845290915281205460ff16600281111561175b5761175b612307565b036117a15760405162461bcd60e51b81526020600482015260166024820152751058d8dbdd5b9d08149bdb1948139bdd08119bdd5b9960521b6044820152606401610352565b6001600160a01b0382166000908152602085815260408083208684528252808320805460ff1916600290811790915587019091529020610b449060030183611deb565b6000828152600486016020526040812080546117ff90612245565b90506000036118425760405162461bcd60e51b815260206004820152600f60248201526e11dc9bdd5c08139bdd08119bdd5b99608a1b6044820152606401610352565b60008490036118875760405162461bcd60e51b8152602060048201526011602482015270149bdb194813985b5948125b9d985b1a59607a1b6044820152606401610352565b6000858560405160200161189c9291906123be565b60405160208183030381529060405280519060200120905086600201600082815260200190815260200160002060010180546118d790612245565b1590506119265760405162461bcd60e51b815260206004820152601760248201527f526f6c6520416c726561647920526567697374657265640000000000000000006044820152606401610352565b600084815260048801602052604090206119439060020182611543565b50600081815260028801602052604090206001810161196387898361241d565b50848155600201805484151560ff19909116179055905095945050505050565b60006040516020016119c3907f4c4956454c595f434f4d4d554e4954595f44414f5f4558454355544f525f524f8152614c4560f01b602082015260220190565b604051602081830303815290604052805190602001208303611a4b576000826001600160a01b03163b11611a4b5760405162461bcd60e51b815260206004820152602960248201527f496c6c6567616c204772616e7420436f6d6d756e6974792044616f204578656360448201526875746f7220526f6c6560b81b6064820152608401610352565b6040517f4c4956454c595f41535345545f4d414e414745525f524f4c45000000000000006020820152603901604051602081830303815290604052805190602001208303611aed576000826001600160a01b03163b11611aed5760405162461bcd60e51b815260206004820181905260248201527f496c6c6567616c204772616e74204173736574204d616e6167657220526f6c656044820152606401610352565b604051744c4956454c595f414e4f4e594d4f55535f524f4c4560581b6020820152603501604051602081830303815290604052805190602001208303611b755760405162461bcd60e51b815260206004820152601c60248201527f496c6c6567616c204772616e7420416e6f6e796d6f757320526f6c65000000006044820152606401610352565b600083815260028501602052604090206001018054611b9390612245565b9050600003611bb45760405162461bcd60e51b81526004016103529061227f565b6001600160a01b038216611bfc5760405162461bcd60e51b815260206004820152600f60248201526e1059191c995cdcc8125b9d985b1a59608a1b6044820152606401610352565b6001600160a01b0382166000908152602085815260408083208684528252808320805460ff19166001179055600287019091529020611c3e9060030183611dc9565b611c5f5760008381526002850160205260409020610b449060030183611e00565b5060019392505050565b60606000611c7683611e15565b9392505050565b60008181526001830160205260408120548015611d66576000611ca16001836124de565b8554909150600090611cb5906001906124de565b9050818114611d1a576000866000018281548110611cd557611cd56122a7565b9060005260206000200154905080876000018481548110611cf857611cf86122a7565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080611d2b57611d2b6124f1565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506111ef565b60009150506111ef565b6000818152600183016020526040812054611db7575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556111ef565b5060006111ef565b60006111ef825490565b6001600160a01b038116600090815260018301602052604081205415156111ec565b60006111ec836001600160a01b038416611c7d565b60006111ec836001600160a01b038416611d70565b606081600001805480602002602001604051908101604052809291908181526020018280548015611e6557602002820191906000526020600020905b815481526020019060010190808311611e51575b50505050509050919050565b600080600060608486031215611e8657600080fd5b505081359360208301359350604090920135919050565b8015158114611eab57600080fd5b50565b600080600060608486031215611ec357600080fd5b83359250602084013591506040840135611edc81611e9d565b809150509250925092565b60008060408385031215611efa57600080fd5b50508035926020909101359150565b606081526000845180606084015260005b81811015611f375760208188018101516080868401015201611f1a565b506000608082850101526080601f19601f8301168401019150508360208301528215156040830152949350505050565b600080600060408486031215611f7c57600080fd5b83359250602084013567ffffffffffffffff80821115611f9b57600080fd5b818601915086601f830112611faf57600080fd5b813581811115611fbe57600080fd5b8760208260061b8501011115611fd357600080fd5b6020830194508093505050509250925092565b80356001600160a01b0381168114611ffd57600080fd5b919050565b60008060006060848603121561201757600080fd5b833592506020840135915061202e60408501611fe6565b90509250925092565b60008060006040848603121561204c57600080fd5b83359250602084013567ffffffffffffffff8082111561206b57600080fd5b818601915086601f83011261207f57600080fd5b81358181111561208e57600080fd5b8760208260051b8501011115611fd357600080fd5b6020808252825182820181905260009190848201906040850190845b818110156120db578351835292840192918401916001016120bf565b50909695505050505050565b6020808252825182820181905260009190848201906040850190845b818110156120db5783516001600160a01b031683529284019291840191600101612103565b60008060008060006080868803121561214057600080fd5b85359450602086013567ffffffffffffffff8082111561215f57600080fd5b818801915088601f83011261217357600080fd5b81358181111561218257600080fd5b89602082850101111561219457600080fd5b6020830196508095505050506040860135915060608601356121b581611e9d565b809150509295509295909350565b6000602082840312156121d557600080fd5b8151611c7681611e9d565b60208082526017908201527f536166654d6f64653a2043616c6c2052656a6563746564000000000000000000604082015260600190565b93845260208401929092526001600160a01b031660408301526001600160e01b031916606082015260800190565b600181811c9082168061225957607f821691505b60208210810361227957634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252600e908201526d149bdb1948139bdd08119bdd5b9960921b604082015260600190565b634e487b7160e01b600052603260045260246000fd5b6000602082840312156122cf57600080fd5b6111ec82611fe6565b634e487b7160e01b600052601160045260246000fd5b600060018201612300576123006122d8565b5060010190565b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b60008235605e1983360301811261234957600080fd5b9190910192915050565b6000808335601e1984360301811261236a57600080fd5b83018035915067ffffffffffffffff82111561238557600080fd5b60200191503681900382131561239a57600080fd5b9250929050565b6000602082840312156123b357600080fd5b8135611c7681611e9d565b8183823760009101908152919050565b601f82111561241857600081815260208120601f850160051c810160208610156123f55750805b601f850160051c820191505b8181101561241457828155600101612401565b5050505b505050565b67ffffffffffffffff8311156124355761243561231d565b612449836124438354612245565b836123ce565b6000601f84116001811461247d57600085156124655750838201355b600019600387901b1c1916600186901b1783556124d7565b600083815260209020601f19861690835b828110156124ae578685013582556020948501946001909201910161248e565b50868210156124cb5760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b818103818111156111ef576111ef6122d8565b634e487b7160e01b600052603160045260246000fdfea26469706673582212203ade80f455dafbb88c9da425cc1df9cbd5f87e12f90cb30d15bf3ca51b3a62a264736f6c63430008110033";
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): LRoleManagementInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): LRoleManagement;
}
export interface LRoleManagementLibraryAddresses {
    ["src/contracts/lib/acl/LAccessControl.sol:LAccessControl"]: string;
}
export {};
