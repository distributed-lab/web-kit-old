import { PROVIDERS } from '@/enums'
import { computed, ComputedRef, Ref, ref } from '@vue/reactivity'
import {
  useMetamask,
  useCoinbase,
  usePhantom,
  useSolflare,
} from '@/composables/useProvider'
import {
  DesignatedProvider,
  ChainId,
  ProviderWrapper,
  TransactionResponse,
  TxRequestBody,
} from '@/types'
import { errors } from '@/errors'

export interface UseProvider {
  selectedProvider: Ref<PROVIDERS | undefined>
  chainId: ComputedRef<ChainId | undefined>
  selectedAddress: ComputedRef<string | undefined>
  isConnected: ComputedRef<boolean>

  init: (provider: DesignatedProvider) => Promise<void>
  connect: () => Promise<void>
  disconnect: () => void
  switchChain: (chainId: ChainId) => Promise<void>
  addChain: (
    chainId: ChainId,
    chainName: string,
    chainRpcUrl: string,
  ) => Promise<void>
  signAndSendTx: (txRequestBody: TxRequestBody) => Promise<TransactionResponse>
  getHashFromTxResponse: (txResponse: TransactionResponse) => string
}

export const useProvider = (): UseProvider => {
  const providerWrp = ref<ProviderWrapper | undefined>()

  const selectedProvider = ref<PROVIDERS | undefined>()
  const chainId: ComputedRef<ChainId | undefined> = computed(
    () => providerWrp.value?.chainId as ChainId | undefined,
  )
  const selectedAddress: ComputedRef<string | undefined> = computed(
    () => providerWrp.value?.selectedAddress as string | undefined,
  )
  const isConnected = computed(() =>
    Boolean(chainId.value && selectedAddress.value),
  )

  const init = async (provider: DesignatedProvider) => {
    switch (provider.name as PROVIDERS) {
      case PROVIDERS.metamask:
        providerWrp.value = useMetamask(provider.instance)
        break
      case PROVIDERS.coinbase:
        providerWrp.value = useCoinbase(provider.instance)
        break
      case PROVIDERS.phantom:
        providerWrp.value = usePhantom(provider.instance)
        break
      case PROVIDERS.solflare:
        providerWrp.value = useSolflare(provider.instance)
        break
      default:
        throw new Error('Invalid Provider')
    }
    selectedProvider.value = provider.name
    await providerWrp.value.init()
  }

  const connect = async () => {
    if (!providerWrp.value)
      throw new errors.ProviderWrapperMethodNotFoundError()

    await providerWrp.value.connect()
  }

  // TODO: It's not actually a disconnect. To be implemented in next versions
  const disconnect = () => {
    providerWrp.value = undefined
  }

  const switchChain = async (chainId: ChainId) => {
    if (!providerWrp.value)
      throw new errors.ProviderWrapperMethodNotFoundError()

    await providerWrp.value.switchChain(chainId)
  }

  const addChain = async (
    chainId: ChainId,
    chainName: string,
    chainRpcUrl: string,
    blockExplorerUrls?: string,
    nativeCurrency?: {
      name: string
      symbol: string
      decimals: number
    },
  ) => {
    if (!providerWrp.value || !providerWrp.value?.addChain)
      throw new errors.ProviderWrapperMethodNotFoundError()

    await providerWrp.value.addChain(
      chainId,
      chainName,
      chainRpcUrl,
      blockExplorerUrls,
      nativeCurrency,
    )
  }

  const signAndSendTx = async (
    txRequestBody: TxRequestBody,
  ): Promise<TransactionResponse> => {
    if (!providerWrp.value)
      throw new errors.ProviderWrapperMethodNotFoundError()

    return providerWrp.value.signAndSendTransaction(txRequestBody)
  }

  const getHashFromTxResponse = (txResponse: TransactionResponse): string => {
    if (!providerWrp.value)
      throw new errors.ProviderWrapperMethodNotFoundError()

    return providerWrp.value.getHashFromTxResponse(txResponse)
  }

  return {
    selectedProvider,
    chainId,
    selectedAddress,
    isConnected,

    init,
    connect,
    disconnect,
    switchChain,
    addChain,
    signAndSendTx,
    getHashFromTxResponse,
  }
}
