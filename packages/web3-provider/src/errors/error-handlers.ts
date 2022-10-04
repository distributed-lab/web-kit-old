import { EIP1193, EIP1474 } from '@/enums'
import { errors } from '@/errors'

export const handleCommonEIPErrors = (code: number, message: string): void => {
  switch (code) {
    case EIP1193.userRejectedRequest:
      throw new errors.ProviderUserRejectedRequest(message)
    case EIP1193.unauthorized:
      throw new errors.ProviderUnauthorized(message)
    case EIP1193.unsupportedMethod:
      throw new errors.ProviderUnsupportedMethod(message)
    case EIP1193.disconnected:
      throw new errors.ProviderDisconnected(message)
    case EIP1193.chainDisconnected:
      throw new errors.ProviderChainDisconnected(message)
    case EIP1474.parseError:
      throw new errors.ProviderParseError(message)
    case EIP1474.invalidRequest:
      throw new errors.ProviderInvalidRequest(message)
    case EIP1474.methodNotFound:
      throw new errors.ProviderMethodNotFound(message)
    case EIP1474.invalidParams:
      throw new errors.ProviderInvalidParams(message)
    case EIP1474.internalError:
      throw new errors.ProviderInternalError(message)
    case EIP1474.invalidInput:
      throw new errors.ProviderInvalidInput(message)
    case EIP1474.resourceNotFound:
      throw new errors.ProviderResourceNotFound(message)
    case EIP1474.resourceUnavailable:
      throw new errors.ProviderResourceUnavailable(message)
    case EIP1474.transactionRejected:
      throw new errors.ProviderTransactionRejected(message)
    case EIP1474.methodNotSupported:
      throw new errors.ProviderMethodNotSupported(message)
    case EIP1474.limitExceeded:
      throw new errors.ProviderLimitExceeded(message)
    case EIP1474.jsonRpcVersionNotSupported:
      throw new errors.ProviderJsonRpcVersionNotSupported(message)
    default:
      return
  }
}
