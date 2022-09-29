export enum PROVIDERS {
  fallback = 'fallback',
  metamask = 'metamask',
  coinbase = 'coinbase',
  trust = 'trust',
  walletConnect = 'wallet-connect',
  brave = 'brave',
  ledger = 'ledger',
  phantom = 'phantom',
  solflare = 'solflare',
}

export enum PROVIDERS_CHECKS {
  fallback = 'isWeb3',
  metamask = 'isMetaMask',
  coinbase = 'isCoinbaseWallet',
  trust = 'isTrust',
  walletConnect = 'isWalletConnect',
  brave = 'isBraveWallet',
  ledger = 'isLedger',
  phantom = 'isPhantom',
  solflare = 'isSolflare',
}
