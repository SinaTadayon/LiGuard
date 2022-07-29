Imports System
Imports System.Threading.Tasks
Imports System.Collections.Generic
Imports System.Numerics
Imports Nethereum.Hex.HexTypes
Imports Nethereum.ABI.FunctionEncoding.Attributes
Imports Nethereum.Web3
Imports Nethereum.RPC.Eth.DTOs
Imports Nethereum.Contracts.CQS
Imports Nethereum.Contracts.ContractHandlers
Imports Nethereum.Contracts
Imports System.Threading
Imports LivelyCoreOnchain.Contracts.LivelyStorage.ContractDefinition
Namespace LivelyCoreOnchain.Contracts.LivelyStorage


    Public Partial Class LivelyStorageService
    
    
        Public Shared Function DeployContractAndWaitForReceiptAsync(ByVal web3 As Nethereum.Web3.Web3, ByVal livelyStorageDeployment As LivelyStorageDeployment, ByVal Optional cancellationTokenSource As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return web3.Eth.GetContractDeploymentHandler(Of LivelyStorageDeployment)().SendRequestAndWaitForReceiptAsync(livelyStorageDeployment, cancellationTokenSource)
        
        End Function
         Public Shared Function DeployContractAsync(ByVal web3 As Nethereum.Web3.Web3, ByVal livelyStorageDeployment As LivelyStorageDeployment) As Task(Of String)
        
            Return web3.Eth.GetContractDeploymentHandler(Of LivelyStorageDeployment)().SendRequestAsync(livelyStorageDeployment)
        
        End Function
        Public Shared Async Function DeployContractAndGetServiceAsync(ByVal web3 As Nethereum.Web3.Web3, ByVal livelyStorageDeployment As LivelyStorageDeployment, ByVal Optional cancellationTokenSource As CancellationTokenSource = Nothing) As Task(Of LivelyStorageService)
        
            Dim receipt = Await DeployContractAndWaitForReceiptAsync(web3, livelyStorageDeployment, cancellationTokenSource)
            Return New LivelyStorageService(web3, receipt.ContractAddress)
        
        End Function
    
        Protected Property Web3 As Nethereum.Web3.Web3
        
        Public Property ContractHandler As ContractHandler
        
        Public Sub New(ByVal web3 As Nethereum.Web3.Web3, ByVal contractAddress As String)
            Web3 = web3
            ContractHandler = web3.Eth.GetContractHandler(contractAddress)
        End Sub
    

    
    End Class

End Namespace
