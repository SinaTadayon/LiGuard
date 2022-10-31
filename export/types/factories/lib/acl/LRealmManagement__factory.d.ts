import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { LRealmManagement, LRealmManagementInterface } from "../../../lib/acl/LRealmManagement";
declare type LRealmManagementConstructorParams = [linkLibraryAddresses: LRealmManagementLibraryAddresses, signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class LRealmManagement__factory extends ContractFactory {
    constructor(...args: LRealmManagementConstructorParams);
    static linkBytecode(linkLibraryAddresses: LRealmManagementLibraryAddresses): string;
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<LRealmManagement>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): LRealmManagement;
    connect(signer: Signer): LRealmManagement__factory;
    static readonly bytecode = "0x61101e61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061009c5760003560e01c80639b214b70116100705780639b214b7014610137578063a51a964014610157578063bbfb8c1c14610179578063bec9475114610199578063cb3db3a3146101a157600080fd5b80625d742f146100a15780632466209b146100d65780635ed86fc9146100ec5780637678922e1461010c575b600080fd5b8180156100ad57600080fd5b506100c16100bc366004610c14565b6101b4565b60405190151581526020015b60405180910390f35b6100de610538565b6040519081526020016100cd565b6100ff6100fa366004610c4d565b610566565b6040516100cd9190610c6f565b6040516001600160a01b0373__$c43b1d7058274a71a9734d16e6b6586431$__1681526020016100cd565b81801561014357600080fd5b506100de610152366004610cb3565b61058c565b61016a610165366004610c4d565b610814565b6040516100cd93929190610d57565b81801561018557600080fd5b506100c1610194366004610c14565b6108d8565b6100de610ad1565b6100c16101af366004610db4565b610af5565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101f4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102189190610de0565b1561023e5760405162461bcd60e51b815260040161023590610dfd565b60405180910390fd5b604051734c4956454c595f47454e4552414c5f5245414c4d60601b6020820152839060340160405160208183030381529060405280519060200120036103d157600061028930610b3f565b60008181526001878101602081815260408085206322df6f5b60e21b80875260028201845291862054958790529290915291015492935091600160a01b900460ff1680156103175750600160008481526001808a01602090815260408084206001600160e01b0319881685526002908101909252909220015460ff169081111561031557610315610e34565b145b801561034557506000818152600288016020908152604080832054835260048a0190915290206001015460ff165b801561037d575060013360009081526020898152604080832085845290915290205460ff16600281111561037b5761037b610e34565b145b6103c95760405162461bcd60e51b815260206004820152601c60248201527f5365745265616c6d537461747573204163636573732044656e696564000000006044820152606401610235565b5050506104af565b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a856103f530610b3f565b6040516001600160e01b031960e085901b16815261042292919033906322df6f5b60e21b90600401610e4a565b602060405180830381865af415801561043f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104639190610de0565b6104af5760405162461bcd60e51b815260206004820152601c60248201527f5365745265616c6d537461747573204163636573732044656e696564000000006044820152606401610235565b6000838152600385016020526040902080546104ca90610e78565b905060000361050d5760405162461bcd60e51b815260206004820152600f60248201526e1499585b1b48139bdd08119bdd5b99608a1b6044820152606401610235565b50600082815260038401602052604090206001908101805483151560ff199091161790559392505050565b604051640312e302e360dc1b60208201526025015b6040516020818303038152906040528051906020012081565b6000818152600383016020526040902060609061058590600201610b7e565b9392505050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f09190610de0565b1561060d5760405162461bcd60e51b815260040161023590610dfd565b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a8761063130610b3f565b6040516001600160e01b031960e085901b16815261065e92919033906312ec6fa360e21b90600401610e4a565b602060405180830381865af415801561067b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061069f9190610de0565b6106eb5760405162461bcd60e51b815260206004820152601b60248201527f52656769737465725265616c6d204163636573732044656e69656400000000006044820152606401610235565b60008490036107315760405162461bcd60e51b81526020600482015260126024820152711499585b1b4813985b5948125b9d985b1a5960721b6044820152606401610235565b60008585604051602001610746929190610eb2565b60408051601f198184030181529181528151602092830120600081815260038b01909352912080549192509061077b90610e78565b1590506107ca5760405162461bcd60e51b815260206004820152601860248201527f5265616c6d20416c7265616479205265676973746572656400000000000000006044820152606401610235565b60008181526003880160205260409020806107e6878983610f27565b5060010180548415156101000261ff00198715151661ffff1990921691909117179055905095945050505050565b6000818152600383016020526040812060018101548154606093928392909160ff8083169261010090041690839061084b90610e78565b80601f016020809104026020016040519081016040528092919081815260200182805461087790610e78565b80156108c45780601f10610899576101008083540402835291602001916108c4565b820191906000526020600020905b8154815290600101906020018083116108a757829003601f168201915b505050505092509250925092509250925092565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610918573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093c9190610de0565b156109595760405162461bcd60e51b815260040161023590610dfd565b73__$c43b1d7058274a71a9734d16e6b6586431$__63513d425a8561097d30610b3f565b6040516001600160e01b031960e085901b1681526109aa929190339063f2c673bd60e01b90600401610e4a565b602060405180830381865af41580156109c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109eb9190610de0565b610a435760405162461bcd60e51b815260206004820152602360248201527f5365745265616c6d55706772616465537461747573204163636573732044656e6044820152621a595960ea1b6064820152608401610235565b600083815260038501602052604090208054610a5e90610e78565b9050600003610aa15760405162461bcd60e51b815260206004820152600f60248201526e1499585b1b48139bdd08119bdd5b99608a1b6044820152606401610235565b5060008281526003840160205260409020600190810180548315156101000261ff00199091161790559392505050565b6040516f131499585b1b53585b9859d95b595b9d60821b602082015260300161054d565b600082815260038401602052604081208054610b1090610e78565b1580159150610b37575060008381526003850160205260409020610b379060020183610b8f565b949350505050565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b6060610b8982610ba7565b92915050565b60008181526001830160205260408120541515610585565b606081600001805480602002602001604051908101604052809291908181526020018280548015610bf757602002820191906000526020600020905b815481526020019060010190808311610be3575b50505050509050919050565b8015158114610c1157600080fd5b50565b600080600060608486031215610c2957600080fd5b83359250602084013591506040840135610c4281610c03565b809150509250925092565b60008060408385031215610c6057600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610ca757835183529284019291840191600101610c8b565b50909695505050505050565b600080600080600060808688031215610ccb57600080fd5b85359450602086013567ffffffffffffffff80821115610cea57600080fd5b818801915088601f830112610cfe57600080fd5b813581811115610d0d57600080fd5b896020828501011115610d1f57600080fd5b6020830196508095505050506040860135610d3981610c03565b91506060860135610d4981610c03565b809150509295509295909350565b606081526000845180606084015260005b81811015610d855760208188018101516080868401015201610d68565b50600060808285018101919091529415156020840152921515604083015250601f909101601f19160101919050565b600080600060608486031215610dc957600080fd5b505081359360208301359350604090920135919050565b600060208284031215610df257600080fd5b815161058581610c03565b60208082526017908201527f536166654d6f64653a2043616c6c2052656a6563746564000000000000000000604082015260600190565b634e487b7160e01b600052602160045260246000fd5b93845260208401929092526001600160a01b031660408301526001600160e01b031916606082015260800190565b600181811c90821680610e8c57607f821691505b602082108103610eac57634e487b7160e01b600052602260045260246000fd5b50919050565b8183823760009101908152919050565b634e487b7160e01b600052604160045260246000fd5b601f821115610f2257600081815260208120601f850160051c81016020861015610eff5750805b601f850160051c820191505b81811015610f1e57828155600101610f0b565b5050505b505050565b67ffffffffffffffff831115610f3f57610f3f610ec2565b610f5383610f4d8354610e78565b83610ed8565b6000601f841160018114610f875760008515610f6f5750838201355b600019600387901b1c1916600186901b178355610fe1565b600083815260209020601f19861690835b82811015610fb85786850135825560209485019460019092019101610f98565b5086821015610fd55760001960f88860031b161c19848701351681555b505060018560011b0183555b505050505056fea2646970667358221220749a3a08da203c3ca315e56c6f51b7c822a30b14de6c297e1d2854ed3884467f64736f6c63430008110033";
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
    static createInterface(): LRealmManagementInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): LRealmManagement;
}
export interface LRealmManagementLibraryAddresses {
    ["src/contracts/lib/acl/LAccessControl.sol:LAccessControl"]: string;
}
export {};
