export enum EIP1193 {
  userRejectedRequest = 4001,
  unauthorized = 4100,
  unsupportedMethod = 4200,
  disconnected = 4900,
  chainDisconnected = 4901,
}

export enum EIP1474 {
  parseError = -32700,
  invalidRequest = -32600,
  methodNotFound = -32601,
  invalidParams = -32602,
  internalError = -32603,
  invalidInput = -32000,
  resourceNotFound = -32001,
  resourceUnavailable = -32002,
  transactionRejected = -32003,
  methodNotSupported = -32004,
  limitExceeded = -32005,
  jsonRpcVersionNotSupported = -32006,
}
