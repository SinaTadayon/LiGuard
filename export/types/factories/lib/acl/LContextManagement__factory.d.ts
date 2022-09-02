import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { LContextManagement, LContextManagementInterface } from "../../../lib/acl/LContextManagement";
declare type LContextManagementConstructorParams = [linkLibraryAddresses: LContextManagementLibraryAddresses, signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class LContextManagement__factory extends ContractFactory {
    constructor(...args: LContextManagementConstructorParams);
    static linkBytecode(linkLibraryAddresses: LContextManagementLibraryAddresses): string;
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<LContextManagement>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): LContextManagement;
    connect(signer: Signer): LContextManagement__factory;
    static readonly bytecode = "0x61350961003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061010a5760003560e01c806364d4c819116100a1578063b0c2557511610070578063b0c2557514610336578063bec9475114610356578063ec77eb211461035e578063faee67181461037e57600080fd5b806364d4c819146102655780637134bb451461028c578063733ae93e146102af5780637cc5941d1461031657600080fd5b8063453dd6dc116100dd578063453dd6dc146101de57806346e356b1146101fe578063518bf960146102255780635acd816a1461024557600080fd5b8063099a0c2e1461010f57806315922efe146101545780632466209b146101915780633e015ef6146101a7575b600080fd5b81801561011b57600080fd5b5061012f61012a366004612e76565b61039e565b604080516001600160a01b039384168152929091166020830152015b60405180910390f35b81801561016057600080fd5b5061017461016f366004612f07565b610641565b604080519283526001600160a01b0390911660208301520161014b565b610199610874565b60405190815260200161014b565b8180156101b357600080fd5b506101c76101c2366004612f8e565b6108a2565b60408051921515835260208301919091520161014b565b8180156101ea57600080fd5b506101996101f9366004612fd7565b610b97565b6101997f530af313a2df7e43f6d5bb783887185736b0df94b889b4b51a9a91f51472219d81565b81801561023157600080fd5b50610199610240366004612fd7565b610e5b565b81801561025157600080fd5b50610199610260366004612fd7565b61110d565b6101997f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81565b61029f61029a366004613014565b6113ba565b604051901515815260200161014b565b6102c26102bd366004613053565b611460565b60405161014b91908151815260208083015190820152604080830151908201526060808301516001600160a01b03169082015260808083015115159082015260a09182015115159181019190915260c00190565b81801561032257600080fd5b506101c7610331366004613086565b61172d565b81801561034257600080fd5b506101996103513660046130bf565b61195e565b610199611bf6565b61037161036c366004613053565b611c1c565b60405161014b91906130f4565b81801561038a57600080fd5b50610199610399366004613159565b611d55565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103df573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040391906131b0565b156104295760405162461bcd60e51b8152600401610420906131cd565b60405180910390fd5b60006104b361043e6080880160608901613204565b604080517f530af313a2df7e43f6d5bb783887185736b0df94b889b4b51a9a91f51472219d6020828101919091526001600160a01b03939093168183015289356060820152828a01356080820152818a013560a0808301919091528251808303909101815260c0909101909152805191012090565b905060006104c082611d70565b90506000806104cf838b611dbe565b909250905060008160048111156104e8576104e861321f565b146105305760405162461bcd60e51b8152602060048201526018602482015277496c6c6567616c20454344415341205369676e617475726560401b6044820152606401610420565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608d61055430611e2c565b6040516001600160e01b031960e085901b1681526105819291908790631ccb7c8d60e31b90600401613235565b602060405180830381865af415801561059e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c291906131b0565b61060e5760405162461bcd60e51b815260206004820152601b60248201527f557064617465436f6e74657874204163636573732044656e69656400000000006044820152606401610420565b61062f8c8c60408c013561062860a08e0160808f01613263565b8c8c611e6b565b9c919b50909950505050505050505050565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610682573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a691906131b0565b156106c35760405162461bcd60e51b8152600401610420906131cd565b60006106d861043e6080880160608901613204565b905060006106e582611d70565b90506000806106f4838b611dbe565b9092509050600081600481111561070d5761070d61321f565b146107555760405162461bcd60e51b8152602060048201526018602482015277496c6c6567616c20454344415341205369676e617475726560401b6044820152606401610420565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608c61077930611e2c565b6040516001600160e01b031960e085901b1681526107a692919087906378efa4ed60e11b90600401613235565b602060405180830381865af41580156107c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e791906131b0565b6108335760405162461bcd60e51b815260206004820152601d60248201527f5265676973746572436f6e74657874204163636573732044656e6965640000006044820152606401610420565b6108638b61084760808c0160608d01613204565b60408c013561085c60a08e0160808f01613263565b8c8c612592565b9b919a509098505050505050505050565b604051640312e302e360dc1b60208201526025015b6040516020818303038152906040528051906020012081565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108e3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090791906131b0565b156109245760405162461bcd60e51b8152600401610420906131cd565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c69608661094830611e2c565b6040516001600160e01b031960e085901b168152610975929190339063d338640160e01b90600401613235565b602060405180830381865af4158015610992573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109b691906131b0565b610a025760405162461bcd60e51b815260206004820152601d60248201527f536574436f6e746578745265616c6d204163636573732044656e6965640000006044820152606401610420565b83610a0c30611e2c565b03610a595760405162461bcd60e51b815260206004820181905260248201527f496c6c6567616c204368616e67652041434c20436f6e74657874205265616c6d6044820152606401610420565b60008481526001808701602052604090912001546001600160a01b0316610a925760405162461bcd60e51b815260040161042090613280565b600083815260038601602052604090208054610aad906132ab565b9050600003610ace5760405162461bcd60e51b8152600401610420906132df565b6000848152600186016020526040902054839003610b2e5760405162461bcd60e51b815260206004820152601960248201527f496c6c6567616c205265616c6d204475706c69636174696f6e000000000000006044820152606401610420565b600084815260018601602090815260408083205486845260038901909252909120610b5c906002018661296f565b5060008581526001870160209081526040808320548352600389019091529020610b899060020186612982565b506001969095509350505050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610bd7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bfb91906131b0565b15610c185760405162461bcd60e51b8152600401610420906131cd565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c696086610c3c30611e2c565b6040516001600160e01b031960e085901b168152610c69929190339063771bcf4560e01b90600401613235565b602060405180830381865af4158015610c86573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610caa91906131b0565b610cf65760405162461bcd60e51b815260206004820152601e60248201527f4772616e74436f6e74657874526f6c65204163636573732044656e69656400006044820152606401610420565b83610d0030611e2c565b03610d4d5760405162461bcd60e51b815260206004820152601960248201527f496c6c6567616c204772616e742041434c20436f6e74657874000000000000006044820152606401610420565b60008481526001808701602052604090912001546001600160a01b0316610d865760405162461bcd60e51b815260040161042090613280565b600082815260028601602052604090208054610da1906132ab565b9050600003610dc25760405162461bcd60e51b815260040161042090613308565b60008481526001860160205260409020610de9906003016001600160e01b0319851661298e565b610e055760405162461bcd60e51b815260040161042090613330565b60008481526001868101602090815260408084206001600160e01b0319881685526002019091529091208381558101805460ff191682805b02179055505050600091825250600191909101602052604090205490565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610e9b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ebf91906131b0565b15610edc5760405162461bcd60e51b8152600401610420906131cd565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c696086610f0030611e2c565b6040516001600160e01b031960e085901b168152610f2d929190339063031c049360e01b90600401613235565b602060405180830381865af4158015610f4a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f6e91906131b0565b610fba5760405162461bcd60e51b815260206004820181905260248201527f416464436f6e7465787446756e63526f6c65204163636573732044656e6965646044820152606401610420565b60008481526001808701602052604090912001546001600160a01b0316610ff35760405162461bcd60e51b815260040161042090613280565b60008281526002860160205260409020805461100e906132ab565b905060000361102f5760405162461bcd60e51b815260040161042090613308565b60008481526001860160205260409020611056906003016001600160e01b0319851661298e565b156110a35760405162461bcd60e51b815260206004820152601f60248201527f46756e6374696f6e53656c6563746f7220416c726561647920457869737473006044820152606401610420565b60008481526001868101602081815260408085206001600160e01b031989168087526002820184529186208881558501805460ff191690951790945593889052526110f39160039091019061296f565b505050600091825250600191909101602052604090205490565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561114d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061117191906131b0565b1561118e5760405162461bcd60e51b8152600401610420906131cd565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c6960866111b230611e2c565b6040516001600160e01b031960e085901b1681526111df9291903390634346a04b60e01b90600401613235565b602060405180830381865af41580156111fc573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061122091906131b0565b61126c5760405162461bcd60e51b815260206004820152601f60248201527f5265766f6b65436f6e74657874526f6c65204163636573732044656e696564006044820152606401610420565b8361127630611e2c565b036112c35760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c205265766f6b652041434c20436f6e746578740000000000006044820152606401610420565b60008481526001808701602052604090912001546001600160a01b03166112fc5760405162461bcd60e51b815260040161042090613280565b600082815260028601602052604090208054611317906132ab565b90506000036113385760405162461bcd60e51b815260040161042090613308565b6000848152600186016020526040902061135f906003016001600160e01b0319851661298e565b61137b5760405162461bcd60e51b815260040161042090613330565b60008481526001808701602090815260408084206001600160e01b031988168552600290810190925290922081018054909160ff199091169083610e3d565b600083815260018086016020526040822001546001600160a01b03161580159061140b5750600084815260018601602090815260408083206001600160e01b03198616845260020190915290205483145b80156114575750600160008581526001808801602090815260408084206001600160e01b0319881685526002908101909252909220015460ff16908111156114555761145561321f565b145b95945050505050565b6040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a081019190915260008281526001808501602052604090912001546001600160a01b03166114cb5760405162461bcd60e51b815260040161042090613280565b6000828152600180850160209081526040808420909201548251631d74303760e21b815292516001600160a01b03909116926375d0c0dc9260048083019391928290030181865afa158015611524573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115489190613367565b6000848152600180870160209081526040808420909201548251630505472360e51b8152925194955092936001600160a01b039093169263a0a8e4609260048082019392918290030181865afa1580156115a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115ca9190613367565b600085815260018088016020908152604080842090920154825163be22465d60e01b8152925194955092936001600160a01b039093169263be22465d9260048082019392918290030181865afa158015611628573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061164c91906131b0565b6000868152600180890160209081526040808420909201548251630151e76560e61b8152925194955092936001600160a01b0390931692635479d9409260048082019392918290030181865afa1580156116aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116ce91906131b0565b6040805160c08101825295865260208087019590955260008881526001808b018088528383208054948a0194909452918a90529552909301546001600160a01b031660608501525015156080830152151560a082015290505b92915050565b600080306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561176e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061179291906131b0565b156117af5760405162461bcd60e51b8152600401610420906131cd565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c6960866117d330611e2c565b6040516001600160e01b031960e085901b16815261180092919033906370420ee360e01b90600401613235565b602060405180830381865af415801561181d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061184191906131b0565b61188d5760405162461bcd60e51b815260206004820152601e60248201527f536574436f6e74657874537461747573204163636573732044656e69656400006044820152606401610420565b8361189730611e2c565b036118ee5760405162461bcd60e51b815260206004820152602160248201527f496c6c6567616c204368616e67652041434c20436f6e746578742053746174756044820152607360f81b6064820152608401610420565b60008481526001808701602052604090912001546001600160a01b03166119275760405162461bcd60e51b815260040161042090613280565b50506000828152600180850160205260409091208082018054841515600160a01b0260ff60a01b1990911617905554935093915050565b6000306001600160a01b031663be22465d6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561199e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119c291906131b0565b156119df5760405162461bcd60e51b8152600401610420906131cd565b73__$c43b1d7058274a71a9734d16e6b6586431$__63487c696085611a0330611e2c565b6040516001600160e01b031960e085901b168152611a309291903390635ac4b36f60e11b90600401613235565b602060405180830381865af4158015611a4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a7191906131b0565b611abd5760405162461bcd60e51b815260206004820152601f60248201527f52656d6f7665436f6e7465787446756e63204163636573732044656e696564006044820152606401610420565b82611ac730611e2c565b03611b145760405162461bcd60e51b815260206004820152601a60248201527f496c6c6567616c2052656d6f76652041434c20436f6e746578740000000000006044820152606401610420565b60008381526001808601602052604090912001546001600160a01b0316611b4d5760405162461bcd60e51b815260040161042090613280565b60008381526001850160205260409020611b74906003016001600160e01b0319841661298e565b611b905760405162461bcd60e51b815260040161042090613330565b60008381526001808601602081815260408085206001600160e01b03198816808752600282018452918620868155909401805460ff191690559387905252611bdd91600390910190612982565b5050506000908152600191909101602052604090205490565b604051711310dbdb9d195e1d13585b9859d95b595b9d60721b6020820152603201610889565b60008181526001808401602052604090912001546060906001600160a01b0316611c585760405162461bcd60e51b815260040161042090613280565b60008281526001840160205260408120611c74906003016129a6565b67ffffffffffffffff811115611c8c57611c8c612d76565b604051908082528060200260200182016040528015611cb5578160200160208202803683370190505b50905060005b60008481526001860160205260409020611cd7906003016129a6565b8163ffffffff161015611d4d5760008481526001860160205260409020611d0a9060030163ffffffff808416906129b016565b828263ffffffff1681518110611d2257611d22613380565b6001600160e01b03199092166020928302919091019091015280611d45816133ac565b915050611cbb565b509392505050565b6000611d6686868660018787612592565b9695505050505050565b6000611727611d7d6129bc565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b6000808251604103611df45760208301516040840151606085015160001a611de887828585612ae4565b94509450505050611e25565b8251604003611e1d5760208301516040840151611e12868383612bd1565b935093505050611e25565b506000905060025b9250929050565b6040516bffffffffffffffffffffffff19606083901b166020820152600090603401604051602081830303815290604052805190602001209050919050565b600085815260018088016020526040822001546001600160a01b031680611ea45760405162461bcd60e51b815260040161042090613280565b6001600160a01b0381163314611efc5760405162461bcd60e51b815260206004820152601860248201527f55706461746520436f6e7465787420466f7262696464656e00000000000000006044820152606401610420565b600086815260038901602052604090208054611f17906132ab565b9050600003611f385760405162461bcd60e51b8152600401610420906132df565b600087815260018981016020526040909120908101805460ff60a01b1916600160a01b88151502179055548614611fb5576000878152600189016020908152604080832054835260038b019091529020611f959060020188612982565b5060008681526003890160205260409020611fb3906002018861296f565b505b600087815260018901602052604081208790555b8381101561258657886002016000868684818110611fe957611fe9613380565b9050602002810190611ffb91906133cf565b35815260208101919091526040016000208054612017906132ab565b90506000036120385760405162461bcd60e51b815260040161042090613308565b60005b85858381811061204d5761204d613380565b905060200281019061205f91906133cf565b61206d9060208101906133ef565b905081101561257357600186868481811061208a5761208a613380565b905060200281019061209c91906133cf565b6120ad906060810190604001613439565b60028111156120be576120be61321f565b148061210f575060008686848181106120d9576120d9613380565b90506020028101906120eb91906133cf565b6120fc906060810190604001613439565b600281111561210d5761210d61321f565b145b156123c95785858381811061212657612126613380565b905060200281019061213891906133cf565b60008a815260018c01602052604081209135916002019088888681811061216157612161613380565b905060200281019061217391906133cf565b6121819060208101906133ef565b8581811061219157612191613380565b90506020020160208101906121a6919061345a565b6001600160e01b031916815260208101919091526040016000205560018686848181106121d5576121d5613380565b90506020028101906121e791906133cf565b6121f8906060810190604001613439565b60028111156122095761220961321f565b14612215576002612218565b60015b60008a815260018c01602052604081206002019088888681811061223e5761223e613380565b905060200281019061225091906133cf565b61225e9060208101906133ef565b8581811061226e5761226e613380565b9050602002016020810190612283919061345a565b6001600160e01b0319168152602081019190915260400160002060019081018054909160ff19909116908360028111156122bf576122bf61321f565b02179055506123418686848181106122d9576122d9613380565b90506020028101906122eb91906133cf565b6122f99060208101906133ef565b8381811061230957612309613380565b905060200201602081019061231e919061345a565b60008b815260018d0160205260409020600301906001600160e01b03191661298e565b6123c4576123c286868481811061235a5761235a613380565b905060200281019061236c91906133cf565b61237a9060208101906133ef565b8381811061238a5761238a613380565b905060200201602081019061239f919061345a565b60008b815260018d0160205260409020600301906001600160e01b03191661296f565b505b612561565b600089815260018b0160205260408120600201908787858181106123ef576123ef613380565b905060200281019061240191906133cf565b61240f9060208101906133ef565b8481811061241f5761241f613380565b9050602002016020810190612434919061345a565b6001600160e01b0319168152602080820192909252604090810160009081208190558b815260018d0190925281206002019087878581811061247857612478613380565b905060200281019061248a91906133cf565b6124989060208101906133ef565b848181106124a8576124a8613380565b90506020020160208101906124bd919061345a565b6001600160e01b03191681526020810191909152604001600020600101805460ff1916905561255f8686848181106124f7576124f7613380565b905060200281019061250991906133cf565b6125179060208101906133ef565b8381811061252757612527613380565b905060200201602081019061253c919061345a565b60008b815260018d0160205260409020600301906001600160e01b031916612982565b505b8061256b81613475565b91505061203b565b508061257e81613475565b915050611fc9565b50979650505050505050565b6000848152600387016020526040812080546125ad906132ab565b90506000036125ce5760405162461bcd60e51b8152600401610420906132df565b60006125d987611e2c565b60008181526001808b01602052604090912001549091506001600160a01b0316156126465760405162461bcd60e51b815260206004820152601a60248201527f436f6e7465787420416c726561647920526567697374657265640000000000006044820152606401610420565b60008681526003890160205260409020612663906002018261296f565b5060008181526001808a01602052604082208881559081018054881515600160a01b026001600160a81b03199091166001600160a01b038c1617179055905b84811015612961578960020160008787848181106126c2576126c2613380565b90506020028101906126d491906133cf565b358152602081019190915260400160002080546126f0906132ab565b90506000036127115760405162461bcd60e51b815260040161042090613308565b60005b86868381811061272657612726613380565b905060200281019061273891906133cf565b6127469060208101906133ef565b905081101561294e5786868381811061276157612761613380565b905060200281019061277391906133cf565b3560028401600089898681811061278c5761278c613380565b905060200281019061279e91906133cf565b6127ac9060208101906133ef565b858181106127bc576127bc613380565b90506020020160208101906127d1919061345a565b6001600160e01b03191681526020810191909152604001600020558686838181106127fe576127fe613380565b905060200281019061281091906133cf565b612821906060810190604001613263565b61282c57600261282f565b60015b83600201600089898681811061284757612847613380565b905060200281019061285991906133cf565b6128679060208101906133ef565b8581811061287757612877613380565b905060200201602081019061288c919061345a565b6001600160e01b0319168152602081019190915260400160002060019081018054909160ff19909116908360028111156128c8576128c861321f565b021790555061293b8787848181106128e2576128e2613380565b90506020028101906128f491906133cf565b6129029060208101906133ef565b8381811061291257612912613380565b9050602002016020810190612927919061345a565b60038501906001600160e01b03191661296f565b508061294681613475565b915050612714565b508061295981613475565b9150506126a2565b509098975050505050505050565b600061297b8383612c0a565b9392505050565b600061297b8383612c59565b6000818152600183016020526040812054151561297b565b6000611727825490565b600061297b8383612d4c565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f306001600160a01b03166375d0c0dc6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612a1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a419190613367565b306001600160a01b031663a0a8e4606040518163ffffffff1660e01b8152600401602060405180830381865afa158015612a7f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612aa39190613367565b60408051602081019490945283019190915260608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115612b1b5750600090506003612bc8565b8460ff16601b14158015612b3357508460ff16601c14155b15612b445750600090506004612bc8565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015612b98573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116612bc157600060019250925050612bc8565b9150600090505b94509492505050565b6000806001600160ff1b03831681612bee60ff86901c601b61348e565b9050612bfc87828885612ae4565b935093505050935093915050565b6000818152600183016020526040812054612c5157508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155611727565b506000611727565b60008181526001830160205260408120548015612d42576000612c7d6001836134a6565b8554909150600090612c91906001906134a6565b9050818114612cf6576000866000018281548110612cb157612cb1613380565b9060005260206000200154905080876000018481548110612cd457612cd4613380565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080612d0757612d076134bd565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050611727565b6000915050611727565b6000826000018281548110612d6357612d63613380565b9060005260206000200154905092915050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112612d9d57600080fd5b813567ffffffffffffffff80821115612db857612db8612d76565b604051601f8301601f19908116603f01168101908282118183101715612de057612de0612d76565b81604052838152866020858801011115612df957600080fd5b836020870160208301376000602085830101528094505050505092915050565b600060a08284031215612e2b57600080fd5b50919050565b60008083601f840112612e4357600080fd5b50813567ffffffffffffffff811115612e5b57600080fd5b6020830191508360208260051b8501011115611e2557600080fd5b6000806000806000806101208789031215612e9057600080fd5b8635955060208701359450604087013567ffffffffffffffff80821115612eb657600080fd5b612ec28a838b01612d8c565b9550612ed18a60608b01612e19565b9450610100890135915080821115612ee857600080fd5b50612ef589828a01612e31565b979a9699509497509295939492505050565b60008060008060006101008688031215612f2057600080fd5b85359450602086013567ffffffffffffffff80821115612f3f57600080fd5b612f4b89838a01612d8c565b9550612f5a8960408a01612e19565b945060e0880135915080821115612f7057600080fd5b50612f7d88828901612e31565b969995985093965092949392505050565b600080600060608486031215612fa357600080fd5b505081359360208301359350604090920135919050565b80356001600160e01b031981168114612fd257600080fd5b919050565b60008060008060808587031215612fed57600080fd5b843593506020850135925061300460408601612fba565b9396929550929360600135925050565b6000806000806080858703121561302a57600080fd5b84359350602085013592506040850135915061304860608601612fba565b905092959194509250565b6000806040838503121561306657600080fd5b50508035926020909101359150565b801515811461308357600080fd5b50565b60008060006060848603121561309b57600080fd5b833592506020840135915060408401356130b481613075565b809150509250925092565b6000806000606084860312156130d457600080fd5b83359250602084013591506130eb60408501612fba565b90509250925092565b6020808252825182820181905260009190848201906040850190845b818110156131365783516001600160e01b03191683529284019291840191600101613110565b50909695505050505050565b80356001600160a01b0381168114612fd257600080fd5b60008060008060006080868803121561317157600080fd5b8535945061318160208701613142565b935060408601359250606086013567ffffffffffffffff8111156131a457600080fd5b612f7d88828901612e31565b6000602082840312156131c257600080fd5b815161297b81613075565b60208082526017908201527f536166654d6f64653a2043616c6c2052656a6563746564000000000000000000604082015260600190565b60006020828403121561321657600080fd5b61297b82613142565b634e487b7160e01b600052602160045260246000fd5b93845260208401929092526001600160a01b031660408301526001600160e01b031916606082015260800190565b60006020828403121561327557600080fd5b813561297b81613075565b60208082526011908201527010dbdb9d195e1d08139bdd08119bdd5b99607a1b604082015260600190565b600181811c908216806132bf57607f821691505b602082108103612e2b57634e487b7160e01b600052602260045260246000fd5b6020808252600f908201526e1499585b1b48139bdd08119bdd5b99608a1b604082015260600190565b6020808252600e908201526d149bdb1948139bdd08119bdd5b9960921b604082015260600190565b6020808252601a908201527f46756e6374696f6e53656c6563746f72204e6f7420466f756e64000000000000604082015260600190565b60006020828403121561337957600080fd5b5051919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600063ffffffff8083168181036133c5576133c5613396565b6001019392505050565b60008235605e198336030181126133e557600080fd5b9190910192915050565b6000808335601e1984360301811261340657600080fd5b83018035915067ffffffffffffffff82111561342157600080fd5b6020019150600581901b3603821315611e2557600080fd5b60006020828403121561344b57600080fd5b81356003811061297b57600080fd5b60006020828403121561346c57600080fd5b61297b82612fba565b60006001820161348757613487613396565b5060010190565b600082198211156134a1576134a1613396565b500190565b6000828210156134b8576134b8613396565b500390565b634e487b7160e01b600052603160045260246000fdfea26469706673582212207445181ddb4e6a555799bc355f95b2b63bb847ab6055354cb1a9fd579a7b842764736f6c634300080f0033";
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
    static createInterface(): LContextManagementInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): LContextManagement;
}
export interface LContextManagementLibraryAddresses {
    ["src/contracts/lib/acl/LAccessControl.sol:LAccessControl"]: string;
}
export {};
