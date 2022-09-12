import Jsona from 'jsona'
import isEmpty from 'lodash/isEmpty'

import { AxiosResponse } from 'axios'
import { Endpoint, JsonApiLinkFields, JsonApiResponseLinks } from './types'
import { JsonApiClient } from '@/json-api'
import { HTTP_METHODS } from '@/./enums'

const formatter = new Jsona()

/**
 * API response wrapper.
 */
export class JsonApiResponse<T> {
  private _raw: AxiosResponse
  private _rawData!: Record<string, unknown>
  private _data!: T
  private _links: JsonApiResponseLinks
  private _apiClient: JsonApiClient
  private _needRaw: boolean
  private _withCredentials: boolean

  constructor(opts: {
    raw: AxiosResponse
    needRaw: boolean
    apiClient: JsonApiClient
    withCredentials: boolean
  }) {
    this._raw = opts.raw
    this._rawData = opts.raw?.data
    this._links = opts.raw?.data?.links ?? {}
    this._apiClient = opts.apiClient
    this._needRaw = opts.needRaw
    this._withCredentials = opts.withCredentials
    this._parseResponse(opts.raw, opts.needRaw)
  }

  get meta(): Record<string, unknown> {
    return (this.rawData.meta || {}) as Record<string, unknown>
  }

  /**
   * Get raw response.
   */
  get rawResponse(): AxiosResponse {
    return this._raw
  }

  /**
   * Get request page limit.
   */
  get pageLimit(): number | undefined {
    const requestConfig = this._raw.config
    const pageLimitKey = 'page[limit]'

    if (!isEmpty(requestConfig.params)) {
      return requestConfig.params[pageLimitKey]
    }

    const decodedUrl = decodeURIComponent(requestConfig.url || '')
    const limit = new URLSearchParams(decodedUrl).get(pageLimitKey)

    return Number(limit)
  }

  /**
   * Get raw response data.
   */
  get rawData(): Record<string, unknown> {
    return this._rawData || {}
  }

  /**
   * Get response data.
   */
  get data(): T {
    return this._data
  }

  /**
   * Get response HTTP status.
   */
  get status(): number {
    return this._raw.status
  }

  /**
   * Get response headers.
   */
  get headers(): Record<string, string> {
    return this._raw.headers
  }

  /**
   * Get response links.
   */
  get links(): JsonApiResponseLinks {
    return this._links
  }

  /**
   * Is response links exist.
   */
  get isLinksExist(): boolean {
    return Boolean(this._links) && !isEmpty(this._links)
  }

  /**
   * Parses and unwraps response data.
   */
  private _parseResponse(raw: AxiosResponse, needRaw: boolean) {
    if (raw.status === 204 || raw.status === 205) {
      return
    }

    this._data = needRaw
      ? (raw.data as T)
      : (formatter.deserialize(raw.data) as T)
  }

  private _createLink(link: Endpoint): Endpoint {
    const baseUrl = this._apiClient?.baseUrl

    if (!baseUrl) return link

    let intersection = ''

    for (const char of link) {
      if (baseUrl.endsWith(intersection + char)) {
        intersection += char
        break
      } else {
        intersection += char
      }
    }

    return link.replace(intersection, '')
  }

  public async fetchPage(page: JsonApiLinkFields): Promise<JsonApiResponse<T>> {
    if (!this.isLinksExist) {
      throw new TypeError('There are no links in response')
    }

    const link = this._createLink(this.links[page] as string)

    const requestOpts = {
      endpoint: link,
      method: this._raw.config.method?.toUpperCase() as HTTP_METHODS,
      headers: this._raw.config.headers,
      needRaw: this._needRaw,
      withCredentials: this._withCredentials,
    }

    return this._apiClient.request<T>(requestOpts)
  }
}
