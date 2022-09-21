import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { HTTP_METHODS } from '@/enums'

export enum JsonApiLinkFields {
  first = 'first',
  last = 'last',
  next = 'next',
  prev = 'prev',
  self = 'self',
}

export type Uuid = string

export type Url = string

export type Endpoint = string

export type JsonApiClientConfig = {
  baseUrl?: Url
  authToken?: Uuid
}

export type JsonApiClientRequestConfigHeaders = AxiosRequestHeaders

export type JsonApiClientRequestParams = unknown

export type JsonApiClientRequestConfig = AxiosRequestConfig

export type JsonApiErrorMetaType = Record<string, unknown> | unknown[] | unknown

export type JsonApiErrorBaseNestedErrors = Record<string, unknown>[]

export type JsonApiKey = {
  id?: Uuid
  type: string
}

export type JsonApiAttribute = string | number | string[] | boolean | undefined
export type JsonApiRawRelationship = { data: JsonApiKey }

export type JsonApiRawResource = JsonApiKey & {
  attributes?: Record<string, JsonApiAttribute>
  relationshipNames?: Record<string, JsonApiRawRelationship>
}

export type JsonApiPayload = { data: JsonApiRawResource }

export type JsonApiRelationship = Record<string, unknown>

export type JsonApiRelationships = Record<
  string,
  JsonApiRelationship | JsonApiRelationship[]
>

export type JsonApiRecordBase<T extends string> = {
  id: Uuid
  type: T
  relationshipNames?: JsonApiRelationships
}

export type JsonApiRecord = JsonApiRecordBase<string> &
  Record<string, JsonApiAttribute | JsonApiRelationships>

export type JsonApiResponseData = JsonApiRecord | JsonApiRecord[]

export type JsonApiResponseLinks = {
  first?: Endpoint
  last?: Endpoint
  next?: Endpoint
  prev?: Endpoint
  self?: Endpoint
}

export type RequestOpts = {
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
