import { EthProviderRpcError } from '@/types'
import { ethers } from 'ethers'
import { handleCommonEIPErrors } from '@/errors'
export const connectEthAccounts = async (
  provider: ethers.providers.Web3Provider,
) => {
  await provider.send('eth_requestAccounts', [])
}

export async function requestSwitchEthChain(
  provider: ethers.providers.Web3Provider,
  chainId: number,
) {
  await provider.send('wallet_switchEthereumChain', [
    { chainId: ethers.utils.hexValue(chainId) },
  ])
}

export async function requestAddEthChain(
  provider: ethers.providers.Web3Provider,
  chainDetails: {
    chainId: number
    chainName: string
    chainRpcUrl: string
    blockExplorerUrls?: string
    nativeCurrency?: {
      name: string
      symbol: string
      decimals: number
    }
  },
) {
  await provider.send('wallet_addEthereumChain', [
    {
      chainId: ethers.utils.hexValue(chainDetails.chainId),
      chainName: chainDetails.chainName,
      rpcUrls: [chainDetails.chainRpcUrl],
      ...(chainDetails.blockExplorerUrls && {
        blockExplorerUrls: chainDetails.blockExplorerUrls,
      }),
      ...(chainDetails.nativeCurrency && {
        nativeCurrency: chainDetails.nativeCurrency,
      }),
    },
  ])
}

export function handleEthError(error: EthProviderRpcError) {
  handleCommonEIPErrors(error.code, error.message)
  throw error
}
