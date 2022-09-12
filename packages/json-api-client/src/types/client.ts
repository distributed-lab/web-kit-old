import {
  CLIENT_DEV_API_CLUSTER_BASE_URLS,
  CLIENT_PROD_API_CLUSTER_BASE_URLS,
} from '@/const'

export type ConnectionBaseUrls =
  | typeof CLIENT_PROD_API_CLUSTER_BASE_URLS
  | typeof CLIENT_DEV_API_CLUSTER_BASE_URLS

export type RClientPageFilterOptions = {
  number?: number | string
  order?: 'asc' | 'desc'
  limit?: number | string
}
