import { CLIENT_API_ENDPOINT_TYPES } from '@/enums'

export const CLIENT_DEV_API_CLUSTER_BASE_URLS = {
  [CLIENT_API_ENDPOINT_TYPES.core]: 'https://api.dev.rarify.tech/core',
  [CLIENT_API_ENDPOINT_TYPES.public]: 'https://api.dev.rarify.tech/public',
  [CLIENT_API_ENDPOINT_TYPES.data]: 'https://api.dev.rarify.tech/data',
} as const

export const CLIENT_PROD_API_CLUSTER_BASE_URLS = {
  [CLIENT_API_ENDPOINT_TYPES.core]: 'https://api.rarify.tech/core',
  [CLIENT_API_ENDPOINT_TYPES.public]: 'https://api.rarify.tech/public',
  [CLIENT_API_ENDPOINT_TYPES.data]: 'https://api.rarify.tech/data',
} as const
