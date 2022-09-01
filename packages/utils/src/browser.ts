/**
 * This file is the entrypoint of browser builds.
 * The code executes when loaded in a browser.
 */
import * as webKitUtils from './index'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).webKitUtils = webKitUtils

console.warn('Web Kit Utils was added to the window object.')
