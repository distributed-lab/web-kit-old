import {
  AxiosInstance,
  RawAxiosRequestHeaders,
  AxiosRequestConfig,
} from 'axios'
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

export type JsonApiClientRequestConfigHeaders = RawAxiosRequestHeaders

export type JsonApiClientRequestParams = unknown

export type JsonApiClientRequestConfig = AxiosRequestConfig

export type JsonApiErrorMetaType = Record<string, unknown> | unknown[] | unknown

export type JsonApiRelationship = {
  links?: JsonApiLinks
  data?: JsonApiResourceLinkage
  meta?: JsonApiMeta
} & JsonApiPaginationLinks &
  Record<string, unknown>

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
  isNeedRaw?: boolean
  withCredentials?: boolean
}

export type JsonApiResponseError = {
  id?: string | number
  code?: string
  title?: string
  detail?: string
  status?: string
  source?: {
    pointer?: string
    parameter?: string
    header?: string
  }
  meta?: JsonApiErrorMetaType
  links?: JsonApiResponseLinks
}

export type JsonApiResponseNestedErrors = JsonApiResponseError[]

export type JsonApiResponseErrors = {
  errors?: JsonApiResponseNestedErrors
}

export type JsonApiPostBody = {
  data: JsonApiPostResource
  meta?: JsonApiMeta
  jsonapi?: JsonApiImplementation
  links?: JsonApiLinks &
    JsonApiPaginationLinks & {
      self?: JsonApiLink | URL | null
      related?: URL | JsonApiLink | null
      describedby?: URL | JsonApiLink | null
    }
  included?: JsonApiPostResource[]
}

export type JsonApiPostResource = {
  type: string
  id?: string
  attributes?: JsonApiAttributes
  relationships?: JsonApiPostRelationships
  links?: JsonApiLinks & JsonApiPaginationLinks
  meta?: JsonApiMeta
}

export type JsonApiPostResourceLinkage =
  | null
  | []
  | JsonApiPostResourceIdentifier
  | JsonApiPostResourceIdentifier[]

export type JsonApiPostResourceIdentifier = {
  type: string
  id?: string
  lid?: string
  meta?: JsonApiMeta
}

export type JsonApiPostRelationship = {
  links?: JsonApiLinks &
    JsonApiPaginationLinks & {
      self?: URL | JsonApiLink | null
      related?: URL | JsonApiLink | null
    }
  data?: JsonApiPostResourceLinkage
  meta?: JsonApiMeta
}

export type JsonApiPostRelationships = Record<
  string,
  JsonApiPostRelationship | JsonApiPostRelationship[]
>

export type JsonApiLink = {
  href: URL
  rel?: string
  describedby?: URL
  title?: string
  type?: string
  hreflang?: string | string[]
  meta?: JsonApiMeta
}

export type JsonApiImplementation = {
  version?: string
  ext?: URL[]
  profile?: URL[]
  meta?: JsonApiMeta
}

export type JsonApiPaginationLinks = {
  first?: URL | JsonApiLink | null
  last?: URL | JsonApiLink | null
  prev?: URL | JsonApiLink | null
  next?: URL | JsonApiLink | null
}

export type JsonApiResource = {
  id: string
  type: string
  attributes?: JsonApiAttributes
  relationships?: JsonApiRelationships
  links?: JsonApiLinks & JsonApiPaginationLinks
  meta?: JsonApiMeta
}

export type JsonApiResourceLinkage =
  | null
  | []
  | JsonApiResourceIdentifier
  | JsonApiResourceIdentifier[]

export type JsonApiResourceIdentifier = {
  type: string
  id: string
  lid?: string
  meta?: JsonApiMeta
}

export type JsonApiLinks = Record<string, URL | JsonApiLink | null>

export type JsonApiMeta = Record<string | number | symbol, unknown>

export type JsonApiAttributes = Record<string | number | symbol, unknown>
