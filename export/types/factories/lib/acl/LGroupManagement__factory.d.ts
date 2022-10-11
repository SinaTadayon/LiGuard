import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { LGroupManagement, LGroupManagementInterface } from "../../../lib/acl/LGroupManagement";
declare type LGroupManagementConstructorParams = [linkLibraryAddresses: LGroupManagementLibraryAddresses, signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class LGroupManagement__factory extends ContractFactory {
    constructor(...args: LGroupManagementConstructorParams);
    static linkBytecode(linkLibraryAddresses: LGroupManagementLibraryAddresses): string;
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<LGroupManagement>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): LGroupManagement;
    connect(signer: Signer): LGroupManagement__factory;
    static readonly bytecode = "0x610da561003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100875760003560e01c8063745311f811610065578063745311f8146100ee5780637c95bcdf1461010f578063bec947511461012f578063f728a0f51461013757600080fd5b806313ee73021461008c5780632466209b146100b55780634ba84563146100cb575b600080fd5b61009f61009a3660046109dc565b610157565b6040516100ac91906109fe565b60405180910390f35b6100bd61017d565b6040519081526020016100ac565b6100de6100d9366004610a42565b6101ab565b60405190151581526020016100ac565b6101016100fc3660046109dc565b6101f5565b6040516100ac929190610a6e565b81801561011b57600080fd5b506100de61012a366004610ad6565b6102ab565b6100bd610654565b81801561014357600080fd5b506100bd610152366004610b0f565b610678565b6000818152600483016020526040902060609061017690600201610918565b9392505050565b604051640312e302e360dc1b60208201526025015b6040516020818303038152906040528051906020012081565b6000828152600484016020526040812080546101c690610b9e565b15801591506101ed5750600083815260048501602052604090206101ed9060020183610929565b949350505050565b6000818152600483016020526040812060018101548154606093929160ff1690829061022090610b9e565b80601f016020809104026020016040519081016040528092919081815260200182805461024c90610b9e565b80156102995780601f1061026e57610100808354040283529160200191610299565b820191906000526020600020905b81548152906001019060200180831161027c57829003601f168201915b50505050509150915091509250929050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156102eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061030f9190610bd8565b1561035b5760405162461bcd60e51b815260206004820152601760248201527614d85999535bd9194e8810d85b1b0814995a9958dd1959604a1b60448201526064015b60405180910390fd5b6040517304c4956454c595f47454e4552414c5f47524f55560641b60208201526034016040516020818303038152906040528051906020012083036104ed5760006103a530610941565b60008181526001878101602081815260408085206322df6f5b60e21b80875260028201845291862054958790529290915291015492935091600160a01b900460ff1680156104335750600160008481526001808a01602090815260408084206001600160e01b0319881685526002908101909252909220015460ff169081111561043157610431610bf5565b145b80156104615750600083815260018089016020908152604080842054845260038b01909152909120015460ff165b8015610499575060013360009081526020898152604080832085845290915290205460ff16600281111561049757610497610bf5565b145b6104e55760405162461bcd60e51b815260206004820152601c60248201527f53657447726f7570537461747573204163636573732044656e696564000000006044820152606401610352565b5050506105cb565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608561051130610941565b6040516001600160e01b031960e085901b16815261053e929190339063b6c03f0360e01b90600401610c0b565b602060405180830381865af415801561055b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057f9190610bd8565b6105cb5760405162461bcd60e51b815260206004820152601c60248201527f53657447726f7570537461747573204163636573732044656e696564000000006044820152606401610352565b6000838152600485016020526040902080546105e690610b9e565b90506000036106295760405162461bcd60e51b815260206004820152600f60248201526e11dc9bdd5c08139bdd08119bdd5b99608a1b6044820152606401610352565b50600082815260048401602052604090206001908101805483151560ff199091161790559392505050565b6040516f1311dc9bdd5c13585b9859d95b595b9d60821b6020820152603001610192565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156106b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106dc9190610bd8565b156107235760405162461bcd60e51b815260206004820152601760248201527614d85999535bd9194e8810d85b1b0814995a9958dd1959604a1b6044820152606401610352565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608661074730610941565b6040516001600160e01b031960e085901b16815261077492919033906307e9933760e31b90600401610c0b565b602060405180830381865af4158015610791573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107b59190610bd8565b6108015760405162461bcd60e51b815260206004820152601b60248201527f526567697374657247726f7570204163636573732044656e69656400000000006044820152606401610352565b60008390036108475760405162461bcd60e51b815260206004820152601260248201527111dc9bdd5c0813985b5948125b9d985b1a5960721b6044820152606401610352565b6000848460405160200161085c929190610c39565b60408051601f198184030181529181528151602092830120600081815260048a01909352912080549192509061089190610b9e565b1590506108e05760405162461bcd60e51b815260206004820152601860248201527f47726f757020416c7265616479205265676973746572656400000000000000006044820152606401610352565b60008181526004870160205260409020806108fc868883610cae565b50600101805484151560ff199091161790559050949350505050565b606061092382610980565b92915050565b60008181526001830160205260408120541515610176565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b6060816000018054806020026020016040519081016040528092919081815260200182805480156109d057602002820191906000526020600020905b8154815260200190600101908083116109bc575b50505050509050919050565b600080604083850312156109ef57600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610a3657835183529284019291840191600101610a1a565b50909695505050505050565b600080600060608486031215610a5757600080fd5b505081359360208301359350604090920135919050565b604081526000835180604084015260005b81811015610a9c5760208187018101516060868401015201610a7f565b506000606082850101526060601f19601f83011684010191505082151560208301529392505050565b8015158114610ad357600080fd5b50565b600080600060608486031215610aeb57600080fd5b83359250602084013591506040840135610b0481610ac5565b809150509250925092565b60008060008060608587031215610b2557600080fd5b84359350602085013567ffffffffffffffff80821115610b4457600080fd5b818701915087601f830112610b5857600080fd5b813581811115610b6757600080fd5b886020828501011115610b7957600080fd5b6020830195508094505050506040850135610b9381610ac5565b939692955090935050565b600181811c90821680610bb257607f821691505b602082108103610bd257634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215610bea57600080fd5b815161017681610ac5565b634e487b7160e01b600052602160045260246000fd5b93845260208401929092526001600160a01b031660408301526001600160e01b031916606082015260800190565b8183823760009101908152919050565b634e487b7160e01b600052604160045260246000fd5b601f821115610ca957600081815260208120601f850160051c81016020861015610c865750805b601f850160051c820191505b81811015610ca557828155600101610c92565b5050505b505050565b67ffffffffffffffff831115610cc657610cc6610c49565b610cda83610cd48354610b9e565b83610c5f565b6000601f841160018114610d0e5760008515610cf65750838201355b600019600387901b1c1916600186901b178355610d68565b600083815260209020601f19861690835b82811015610d3f5786850135825560209485019460019092019101610d1f565b5086821015610d5c5760001960f88860031b161c19848701351681555b505060018560011b0183555b505050505056fea264697066735822122074dd070261581fbb81e3fa816cf51234a141f094270c55fc8a9a2029e831e1fe64736f6c63430008110033";
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
    static createInterface(): LGroupManagementInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): LGroupManagement;
}
export interface LGroupManagementLibraryAddresses {
    ["src/contracts/lib/acl/LAccessControl.sol:LAccessControl"]: string;
}
export {};
