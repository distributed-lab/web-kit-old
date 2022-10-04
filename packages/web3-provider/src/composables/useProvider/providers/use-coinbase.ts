import { ethers } from 'ethers'
import {
  connectEthAccounts,
  handleEthError,
  requestAddEthChain,
  requestSwitchEthChain,
} from '@/helpers'
import { computed, ref } from '@vue/reactivity'
import {
  EthProviderRpcError,
  EthTransactionResponse,
  ChainId,
  ProviderInstance,
  ProviderWrapper,
  TransactionResponse,
  TxRequestBody,
} from '@/types'
import { Deferrable } from '@ethersproject/properties'
import { TransactionRequest } from '@ethersproject/abstract-provider'

export const useCoinbase = (provider: ProviderInstance): ProviderWrapper => {
  const chainId = ref<ChainId>('')
  const selectedAddress = ref('')

  const currentProvider = new ethers.providers.Web3Provider(
    provider as ethers.providers.ExternalProvider,
    'any',
  )

  const isConnected = computed(() =>
    Boolean(selectedAddress.value && chainId.value),
  )

  const init = async () => {
    _setListeners()
    await _updateProviderState()
  }

  const _setListeners = () => {
    const tempProviderStub = currentProvider.provider as {
      on: (eventName: string, cb: () => void) => void
    }

    tempProviderStub.on('accountsChanged', () => {
      _updateProviderState()
    })
    tempProviderStub.on('chainChanged', () => {
      _updateProviderState()
    })
    tempProviderStub.on('disconnect', () => {
      selectedAddress.value = ''
    })
  }

  const _updateProviderState = async () => {
    try {
      const network = await currentProvider.detectNetwork()
      chainId.value = network.chainId

      const currentAccounts = await currentProvider.listAccounts()
      selectedAddress.value = currentAccounts[0]
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const connect = async () => {
    try {
      await connectEthAccounts(currentProvider)
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const switchChain = async (chainId: ChainId) => {
    try {
      await requestSwitchEthChain(currentProvider, Number(chainId))
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const addChain = async (
    chainId: ChainId,
    chainName: string,
    chainRpcUrl: string,
  ) => {
    try {
      await requestAddEthChain(currentProvider, {
        chainId: Number(chainId),
        chainName,
        chainRpcUrl,
      })
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const signAndSendTransaction = async (txRequestBody: TxRequestBody) => {
    try {
      const signer = currentProvider.getSigner()
      const transactionResponse = await signer.sendTransaction(
        txRequestBody as Deferrable<TransactionRequest>,
      )
      await transactionResponse.wait()

      return transactionResponse
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const getHashFromTxResponse = (txResponse: TransactionResponse) => {
    const transactionResponse = txResponse as EthTransactionResponse

    return transactionResponse.hash
  }

  return {
    chainId,
    selectedAddress,
    isConnected,

    init,
    connect,
    switchChain,
    addChain,
    signAndSendTransaction,
    getHashFromTxResponse,
  }
}
