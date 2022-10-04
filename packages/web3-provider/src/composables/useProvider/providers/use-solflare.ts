import {
  PhantomProvider,
  ChainId,
  ProviderInstance,
  ProviderWrapper,
  SolanaTransactionResponse,
  SolanaProviderRpcError,
  TransactionResponse,
  TxRequestBody,
} from '@/types'
import { computed, ref } from '@vue/reactivity'
import { decodeSolanaTx, handleSolError } from '@/helpers'
import {
  Connection,
  clusterApiUrl,
  Cluster,
  Transaction as SolTransaction,
  PublicKey,
} from '@solana/web3.js'

export const useSolflare = (provider: ProviderInstance): ProviderWrapper => {
  const currentProvider = provider as PhantomProvider

  const chainId = ref<ChainId>('')
  const selectedAddress = ref('')

  const connection = ref(
    new Connection(clusterApiUrl(chainId.value as Cluster)),
  )

  const isConnected = computed(() =>
    Boolean(selectedAddress.value && chainId.value),
  )
  const init = async () => {
    _setListeners()
    await _updateProviderState()
  }

  const _setListeners = () => {
    currentProvider.on('connect', () => {
      _updateProviderState()
    })
    currentProvider.on('disconnect', () => {
      _updateProviderState()
    })
    currentProvider.on('accountChanged', () => {
      _updateProviderState()
    })
  }

  const _updateProviderState = async () => {
    const publicKey = currentProvider.publicKey
    selectedAddress.value = publicKey ? new PublicKey(publicKey).toBase58() : ''
  }

  const connect = async () => {
    try {
      await currentProvider.connect()
    } catch (error) {
      handleSolError(error as SolanaProviderRpcError)
    }
  }

  const switchChain = async (_chainId: ChainId) => {
    try {
      connection.value = new Connection(clusterApiUrl(chainId.value as Cluster))
      chainId.value = _chainId
    } catch (error) {
      handleSolError(error as SolanaProviderRpcError)
    }
  }

  const signAndSendTransaction = async (txRequestBody: TxRequestBody) => {
    try {
      const txBody =
        typeof txRequestBody === 'string'
          ? decodeSolanaTx(txRequestBody)
          : txRequestBody

      const signedTx = await currentProvider.signTransaction(
        txBody as SolTransaction,
      )

      const connection = new Connection(clusterApiUrl(chainId.value as Cluster))

      const signature = await connection.sendRawTransaction(
        signedTx.serialize(),
      )
      await connection.confirmTransaction(signature)
      return signature
    } catch (error) {
      handleSolError(error as SolanaProviderRpcError)
    }
  }

  const getHashFromTxResponse = (txResponse: TransactionResponse) => {
    return txResponse as SolanaTransactionResponse
  }

  return {
    chainId,
    isConnected,
    selectedAddress,

    init,
    connect,
    switchChain,
    signAndSendTransaction,
    getHashFromTxResponse,
  }
}
