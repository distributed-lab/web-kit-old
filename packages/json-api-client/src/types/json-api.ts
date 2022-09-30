import { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { HTTP_METHODS } from '@/enums'

export enum JsonApiLinkFields {
  first = 'first',
  last = 'last',
  next = 'next',
  prev = 'prev',
  self = 'self',
}

export type URL = string

export type Endpoint = string // e.g. `/users`

export type JsonApiClientConfig = {
  baseUrl?: URL
  axios?: AxiosInstance
}

export type JsonApiClientRequestConfigHeaders = AxiosRequestHeaders

export type JsonApiClientRequestParams = unknown

export type JsonApiClientRequestConfig = AxiosRequestConfig

export type JsonApiErrorMetaType = Record<string, unknown> | unknown[] | unknown

export type JsonApiErrorBaseNestedErrors = Record<string, unknown>[]

export type JsonApiRelationship = Record<string, unknown>

export type JsonApiRelationships = Record<
  string,
  JsonApiRelationship | JsonApiRelationship[]
>

// Can be used in client code to extend and cast own entity types
export type JsonApiRecordBase<T extends string> = {
  id: string
  type: T
  relationships?: JsonApiRelationships
}

export type JsonApiResponseLinks = {
  first?: Endpoint
  last?: Endpoint
  next?: Endpoint
  prev?: Endpoint
  self?: Endpoint
}

export type JsonApiClientRequestOpts = {
  endpoint: Endpoint
  method: HTTP_METHODS
  headers?: JsonApiClientRequestConfigHeaders
  data?: unknown
  query?: unknown
  contentType?: string
  isEmptyBodyAllowed?: boolean
  needRaw?: boolean
  withCredentials?: boolean
}
