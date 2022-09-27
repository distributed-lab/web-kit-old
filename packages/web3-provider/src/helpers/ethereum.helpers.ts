import { EthProviderRpcError } from '@/types'
import { errors } from '@/errors'
import { ethers } from 'ethers'
import { EIP1193, EIP1474 } from '@/enums'

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
  chainId: number,
  chainName: string,
  chainRpcUrl: string,
) {
  await provider.send('wallet_addEthereumChain', [
    {
      chainId: ethers.utils.hexValue(chainId),
      chainName,
      rpcUrls: [chainRpcUrl],
    },
  ])
}

export function handleEthError(error: EthProviderRpcError) {
  switch (error.code) {
    case EIP1193.userRejectedRequest:
      throw new errors.ProviderUserRejectedRequest(error.message)
    case EIP1193.unauthorized:
      throw new errors.ProviderUnauthorized(error.message)
    case EIP1193.unsupportedMethod:
      throw new errors.ProviderUnsupportedMethod(error.message)
    case EIP1193.disconnected:
      throw new errors.ProviderDisconnected(error.message)
    case EIP1193.chainDisconnected:
      throw new errors.ProviderChainDisconnected(error.message)
    case EIP1474.parseError:
      throw new errors.ProviderParseError(error.message)
    case EIP1474.invalidRequest:
      throw new errors.ProviderInvalidRequest(error.message)
    case EIP1474.methodNotFound:
      throw new errors.ProviderMethodNotFound(error.message)
    case EIP1474.invalidParams:
      throw new errors.ProviderInvalidParams(error.message)
    case EIP1474.internalError:
      throw new errors.ProviderInternalError(error.message)
    case EIP1474.invalidInput:
      throw new errors.ProviderInvalidInput(error.message)
    case EIP1474.resourceNotFound:
      throw new errors.ProviderResourceNotFound(error.message)
    case EIP1474.resourceUnavailable:
      throw new errors.ProviderResourceUnavailable(error.message)
    case EIP1474.transactionRejected:
      throw new errors.ProviderTransactionRejected(error.message)
    case EIP1474.methodNotSupported:
      throw new errors.ProviderMethodNotSupported(error.message)
    case EIP1474.limitExceeded:
      throw new errors.ProviderLimitExceeded(error.message)
    case EIP1474.jsonRpcVersionNotSupported:
      throw new errors.ProviderJsonRpcVersionNotSupported(error.message)
    default:
      throw error
  }
}

export function getEthExplorerTxUrl(explorerUrl: string, txHash: string) {
  return `${explorerUrl}/tx/${txHash}`
}

export function getEthExplorerAddressUrl(explorerUrl: string, address: string) {
  return `${explorerUrl}/address/${address}`
}
