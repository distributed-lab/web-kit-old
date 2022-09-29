import { ethers } from 'ethers'

export * from './provider.types'
export * from './ethereum.types'
export * from './solana.types'
export interface EthereumProvider extends ethers.providers.ExternalProvider {
  providers?: unknown[]
}

declare global {
  interface Window {
    ethereum: EthereumProvider
    solana: unknown
    solflare: unknown
  }
}
