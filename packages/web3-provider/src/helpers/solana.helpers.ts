import { Transaction } from '@solana/web3.js'
import bs58 from 'bs58'

import { handleCommonEIPErrors } from '@/errors'
import { SolanaProviderRpcError } from '@/types'

export function handleSolError(error: SolanaProviderRpcError) {
  const errorCode = error?.error?.code || error?.code
  const errorMessage = error?.error?.message || error?.message || ''

  if (errorCode) handleCommonEIPErrors(errorCode, errorMessage)
  throw error
}

export function decodeSolanaTx(tx: string) {
  const buff = bs58.decode(tx)
  return Transaction.from(buff)
}
