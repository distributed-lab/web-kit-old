/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { Identity, Metadata, MetaSellOrder, Network } from '@/types'

export const isObjectOrArray = (arg: unknown): boolean => {
  return arg instanceof Object
}

export const isUndefined = (arg: unknown): arg is undefined => {
  return typeof arg === 'undefined'
}

export const isObject = (arg: unknown): boolean => {
  return !Array.isArray(arg) && arg instanceof Object
}

export const isMetadata = (metadata: any): metadata is Metadata => {
  return metadata?.name && metadata?.image_url
}

export const isIdentity = (owner: any): owner is Identity => {
  return Boolean(owner.basics)
}

export const isNetwork = (network: any): network is Network => {
  return Boolean(network.protocol)
}

export const isMetaSellOrderArray = (
  metaSellOrders: any,
): metaSellOrders is MetaSellOrder[] => {
  if (!Array.isArray(metaSellOrders)) return false

  const order = metaSellOrders[0]
  return Boolean(order?.currency && order?.price)
}
