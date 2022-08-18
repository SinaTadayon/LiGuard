import { Signer, ContractFactory, PayableOverrides, BytesLike } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Proxy, ProxyInterface } from "../../proxy/Proxy";
declare type ProxyConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Proxy__factory extends ContractFactory {
    constructor(...args: ProxyConstructorParams);
    deploy(logic: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<Proxy>;
    getDeployTransaction(logic: PromiseOrValue<string>, data: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): Proxy;
    connect(signer: Signer): Proxy__factory;
    static readonly bytecode = "0x60a060408190523060805262000ae03881900390819083398101604081905261002791610667565b61005260017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd610735565b60008051602062000ac08339815191521461006f5761006f61075a565b61009a60017fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6104610735565b60008051602062000aa0833981519152146100b7576100b761075a565b336100dd60008051602062000aa083398151915260001b61011c60201b6100521760201c565b80546001600160a01b0319166001600160a01b03929092169190911790556004805460ff191660011790556101148282600061011f565b5050506107fa565b90565b60606101577f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd914360001b61011c60201b6100521760201c565b5460ff161561017e576101698461039e565b50604080516000815260208101909152610397565b836001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156101d8575060408051601f3d908101601f191682019092526101d591810190610770565b60015b6102295760405162461bcd60e51b815260206004820152601560248201527f496c6c6567616c205555505320436f6e7472616374000000000000000000000060448201526064015b60405180910390fd5b60008051602062000ac083398151915281146102875760405162461bcd60e51b815260206004820152601560248201527f496e76616c6964205555505320436f6e747261637400000000000000000000006044820152606401610220565b506040516301ffc9a760e01b815263748be05360e01b60048201526001600160a01b038516906301ffc9a790602401602060405180830381865afa9250505080156102ef575060408051601f3d908101601f191682019092526102ec91810190610789565b60015b61033b5760405162461bcd60e51b815260206004820152601760248201527f496c6c6567616c204950726f787920436f6e74726163740000000000000000006044820152606401610220565b806103885760405162461bcd60e51b815260206004820152601760248201527f496e76616c6964204950726f787920436f6e74726163740000000000000000006044820152606401610220565b506103948484846103e5565b90505b9392505050565b806103c460008051602062000ac083398151915260001b61011c60201b6100521760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606103f08461042d565b6000835111806103fd5750815b1561041657610394848461047b60201b6100551760201c565b505060408051600081526020810190915292915050565b6104368161039e565b61043e6104c3565b6040516001600160a01b039190911690309033907f354bd4b6eb65d64e6c79c53fa4f983a5e6bec4824ce4627c71be0b2722f4917e90600090a450565b606061039783836040518060400160405280601481526020017f44656c65676174652043616c6c204661696c65640000000000000000000000008152506104f960201b60201c565b60006104ea60008051602062000ac083398151915260001b61011c60201b6100521760201c565b546001600160a01b0316919050565b606061050e846105d960201b6100951760201c565b61055a5760405162461bcd60e51b815260206004820152601860248201527f496c6c6567616c20436f6e7472616374204164647265737300000000000000006044820152606401610220565b600080856001600160a01b03168560405161057591906107ab565b600060405180830381855af49150503d80600081146105b0576040519150601f19603f3d011682016040523d82523d6000602084013e6105b5565b606091505b50915091506105cf8282866105e860201b6100a41760201c565b9695505050505050565b6001600160a01b03163b151590565b606083156105f7575081610397565b8251156106075782518084602001fd5b8160405162461bcd60e51b815260040161022091906107c7565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561065257818101518382015260200161063a565b83811115610661576000848401525b50505050565b6000806040838503121561067a57600080fd5b82516001600160a01b038116811461069157600080fd5b60208401519092506001600160401b03808211156106ae57600080fd5b818501915085601f8301126106c257600080fd5b8151818111156106d4576106d4610621565b604051601f8201601f19908116603f011681019083821181831017156106fc576106fc610621565b8160405282815288602084870101111561071557600080fd5b610726836020830160208801610637565b80955050505050509250929050565b60008282101561075557634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052600160045260246000fd5b60006020828403121561078257600080fd5b5051919050565b60006020828403121561079b57600080fd5b8151801515811461039757600080fd5b600082516107bd818460208701610637565b9190910192915050565b60208152600082518060208401526107e6816040850160208701610637565b601f01601f19169190910160400192915050565b60805161028d620008136000396000505061028d6000f3fe60806040523661001357610011610017565b005b6100115b61005061004b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b6100e6565b565b90565b606061008e83836040518060400160405280601481526020017311195b1959d85d194810d85b1b0811985a5b195960621b81525061010a565b9392505050565b6001600160a01b03163b151590565b606083156100b357508161008e565b8251156100c35782518084602001fd5b8160405162461bcd60e51b81526004016100dd9190610208565b60405180910390fd5b3660008037600080366000845af43d6000803e808015610105573d6000f35b3d6000fd5b60606001600160a01b0384163b6101635760405162461bcd60e51b815260206004820152601860248201527f496c6c6567616c20436f6e74726163742041646472657373000000000000000060448201526064016100dd565b600080856001600160a01b03168560405161017e919061023b565b600060405180830381855af49150503d80600081146101b9576040519150601f19603f3d011682016040523d82523d6000602084013e6101be565b606091505b50915091506101ce8282866100a4565b9695505050505050565b60005b838110156101f35781810151838201526020016101db565b83811115610202576000848401525b50505050565b60208152600082518060208401526102278160408501602087016101d8565b601f01601f19169190910160400192915050565b6000825161024d8184602087016101d8565b919091019291505056fea264697066735822122083625b9281bdb9950c00d687b576e30c204ef64e94d6f91cdae3fd6b5ff6d36464736f6c634300080f0033b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
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
    } | {
        stateMutability: string;
        type: string;
        inputs?: undefined;
        anonymous?: undefined;
        name?: undefined;
    })[];
    static createInterface(): ProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Proxy;
}
export {};
