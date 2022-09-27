/**
 * This file is the entrypoint of browser builds.
 * The code executes when loaded in a browser.
 */
import * as Web3Provider from './index'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).webKitWeb3Provider = Web3Provider

console.warn('Web3 provider was added to the window object.')
