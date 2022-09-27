import { ethers } from 'ethers'

export interface EthereumProvider extends ethers.providers.ExternalProvider {
  providers?: unknown[]
}

export type EthProviderRpcError = {
  message: string
  code: number
  data?: unknown
}
