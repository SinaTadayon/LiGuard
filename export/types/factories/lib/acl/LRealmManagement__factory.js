"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRealmManagement__factory = void 0;
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
];
const _bytecode = "0x610fed61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100925760003560e01c806359186f401161006557806359186f401461012457806379eafb8c14610144578063a1e1663a14610157578063bec947511461017757600080fd5b80630549f02d14610097578063108ca8b7146100cc5780632466209b146100ee5780632b6318ea14610104575b600080fd5b8180156100a357600080fd5b506100b76100b2366004610be3565b61017f565b60405190151581526020015b60405180910390f35b6100df6100da366004610c1c565b610507565b6040516100c393929190610c3e565b6100f66105cb565b6040519081526020016100c3565b81801561011057600080fd5b506100b761011f366004610be3565b6105f9565b81801561013057600080fd5b506100f661013f366004610c9b565b6107f2565b6100b7610152366004610d3f565b610a7a565b61016a610165366004610c1c565b610ac4565b6040516100c39190610d6b565b6100f6610aea565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e39190610daf565b156102095760405162461bcd60e51b815260040161020090610dcc565b60405180910390fd5b604051734c4956454c595f47454e4552414c5f5245414c4d60601b6020820152839060340160405160208183030381529060405280519060200120036103a057600061025430610b0e565b60008181526001878101602081815260408085206322df6f5b60e21b80875260028201845291862054958790529290915291015492935091600160a01b900460ff1680156102e25750600160008481526001808a01602090815260408084206001600160e01b0319881685526002908101909252909220015460ff16908111156102e0576102e0610e03565b145b8015610314575060008181526002880160209081526040808320600190810154845260048b01909252909120015460ff165b801561034c575060013360009081526020898152604080832085845290915290205460ff16600281111561034a5761034a610e03565b145b6103985760405162461bcd60e51b815260206004820152601c60248201527f5365745265616c6d537461747573204163636573732044656e696564000000006044820152606401610200565b50505061047e565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c6960856103c430610b0e565b6040516001600160e01b031960e085901b1681526103f192919033906322df6f5b60e21b90600401610e19565b602060405180830381865af415801561040e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104329190610daf565b61047e5760405162461bcd60e51b815260206004820152601c60248201527f5365745265616c6d537461747573204163636573732044656e696564000000006044820152606401610200565b60008381526003850160205260409020805461049990610e47565b90506000036104dc5760405162461bcd60e51b815260206004820152600f60248201526e1499585b1b48139bdd08119bdd5b99608a1b6044820152606401610200565b50600082815260038401602052604090206001908101805483151560ff199091161790559392505050565b6000818152600383016020526040812060018101548154606093928392909160ff8083169261010090041690839061053e90610e47565b80601f016020809104026020016040519081016040528092919081815260200182805461056a90610e47565b80156105b75780601f1061058c576101008083540402835291602001916105b7565b820191906000526020600020905b81548152906001019060200180831161059a57829003601f168201915b505050505092509250925092509250925092565b604051640312e302e360dc1b60208201526025015b6040516020818303038152906040528051906020012081565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610639573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065d9190610daf565b1561067a5760405162461bcd60e51b815260040161020090610dcc565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608561069e30610b0e565b6040516001600160e01b031960e085901b1681526106cb929190339063f2c673bd60e01b90600401610e19565b602060405180830381865af41580156106e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061070c9190610daf565b6107645760405162461bcd60e51b815260206004820152602360248201527f5365745265616c6d55706772616465537461747573204163636573732044656e6044820152621a595960ea1b6064820152608401610200565b60008381526003850160205260409020805461077f90610e47565b90506000036107c25760405162461bcd60e51b815260206004820152600f60248201526e1499585b1b48139bdd08119bdd5b99608a1b6044820152606401610200565b5060008281526003840160205260409020600190810180548315156101000261ff00199091161790559392505050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610832573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108569190610daf565b156108735760405162461bcd60e51b815260040161020090610dcc565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608761089730610b0e565b6040516001600160e01b031960e085901b1681526108c492919033906312ec6fa360e21b90600401610e19565b602060405180830381865af41580156108e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109059190610daf565b6109515760405162461bcd60e51b815260206004820152601b60248201527f52656769737465725265616c6d204163636573732044656e69656400000000006044820152606401610200565b60008490036109975760405162461bcd60e51b81526020600482015260126024820152711499585b1b4813985b5948125b9d985b1a5960721b6044820152606401610200565b600085856040516020016109ac929190610e81565b60408051601f198184030181529181528151602092830120600081815260038b0190935291208054919250906109e190610e47565b159050610a305760405162461bcd60e51b815260206004820152601860248201527f5265616c6d20416c7265616479205265676973746572656400000000000000006044820152606401610200565b6000818152600388016020526040902080610a4c878983610ef6565b5060010180548415156101000261ff00198715151661ffff1990921691909117179055905095945050505050565b600082815260038401602052604081208054610a9590610e47565b1580159150610abc575060008381526003850160205260409020610abc9060020183610b4d565b949350505050565b60008181526003830160205260409020606090610ae390600201610b65565b9392505050565b6040516f131499585b1b53585b9859d95b595b9d60821b60208201526030016105e0565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b60008181526001830160205260408120541515610ae3565b6060610b7082610b76565b92915050565b606081600001805480602002602001604051908101604052809291908181526020018280548015610bc657602002820191906000526020600020905b815481526020019060010190808311610bb2575b50505050509050919050565b8015158114610be057600080fd5b50565b600080600060608486031215610bf857600080fd5b83359250602084013591506040840135610c1181610bd2565b809150509250925092565b60008060408385031215610c2f57600080fd5b50508035926020909101359150565b606081526000845180606084015260005b81811015610c6c5760208188018101516080868401015201610c4f565b50600060808285018101919091529415156020840152921515604083015250601f909101601f19160101919050565b600080600080600060808688031215610cb357600080fd5b85359450602086013567ffffffffffffffff80821115610cd257600080fd5b818801915088601f830112610ce657600080fd5b813581811115610cf557600080fd5b896020828501011115610d0757600080fd5b6020830196508095505050506040860135610d2181610bd2565b91506060860135610d3181610bd2565b809150509295509295909350565b600080600060608486031215610d5457600080fd5b505081359360208301359350604090920135919050565b6020808252825182820181905260009190848201906040850190845b81811015610da357835183529284019291840191600101610d87565b50909695505050505050565b600060208284031215610dc157600080fd5b8151610ae381610bd2565b60208082526017908201527f536166654d6f64653a2043616c6c2052656a6563746564000000000000000000604082015260600190565b634e487b7160e01b600052602160045260246000fd5b93845260208401929092526001600160a01b031660408301526001600160e01b031916606082015260800190565b600181811c90821680610e5b57607f821691505b602082108103610e7b57634e487b7160e01b600052602260045260246000fd5b50919050565b8183823760009101908152919050565b634e487b7160e01b600052604160045260246000fd5b601f821115610ef157600081815260208120601f850160051c81016020861015610ece5750805b601f850160051c820191505b81811015610eed57828155600101610eda565b5050505b505050565b67ffffffffffffffff831115610f0e57610f0e610e91565b610f2283610f1c8354610e47565b83610ea7565b6000601f841160018114610f565760008515610f3e5750838201355b600019600387901b1c1916600186901b178355610fb0565b600083815260209020601f19861690835b82811015610f875786850135825560209485019460019092019101610f67565b5086821015610fa45760001960f88860031b161c19848701351681555b505060018560011b0183555b505050505056fea26469706673582212206ee94710862a9de2fa44c1a2733e66a1574661e4cb295289a87d6949bae5f25864736f6c63430008110033";
const isSuperArgs = (xs) => {
    return (typeof xs[0] === "string" ||
        Array.isArray(xs[0]) ||
        "_isInterface" in xs[0]);
};
class LRealmManagement__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            const [linkLibraryAddresses, signer] = args;
            super(_abi, LRealmManagement__factory.linkBytecode(linkLibraryAddresses), signer);
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
exports.LRealmManagement__factory = LRealmManagement__factory;
LRealmManagement__factory.bytecode = _bytecode;
LRealmManagement__factory.abi = _abi;
//# sourceMappingURL=LRealmManagement__factory.js.map