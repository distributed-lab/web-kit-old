import axios, { AxiosError } from 'axios'
import { HTTP_METHODS } from './enums'
import { JsonApiResponse } from '@/response'
import {
  JsonApiClientConfig,
  JsonApiClientRequestConfig,
  JsonApiClientRequestConfigHeaders,
  RequestOpts,
  Url,
  Uuid,
} from './types'
import {
  flattenToAxiosJsonApiQuery,
  parseJsonApiError,
  parseJsonApiResponse,
  setJsonApiHeaders,
} from './middlewares'
import { isUndefined } from './helpers'

/**
 * Represents JsonApiClient that performs requests to backend
 */
export class JsonApiClient {
  private _baseUrl: Url
  protected _authToken: Uuid

  constructor(config = {} as JsonApiClientConfig) {
    this._authToken = ''
    this._baseUrl = ''

    if (config?.baseUrl) this.useBaseUrl(config.baseUrl)
    if (config?.authToken) this.setAuthToken(config.authToken)
  }

  /**
   * Clones current JsonApiClient instance
   */
  private _clone(): JsonApiClient {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }

  /**
   *  Base URL will be prepended to `url` unless `url` is absolute.
   *  It can be convenient to set `baseURL` for an instance of axios to pass
   *  relative URLs to methods of that instance.
   *
   *  For more details look Axios Request config:
   *  {@link https://github.com/axios/axios#request-config}
   */
  get baseUrl(): Url {
    return this._baseUrl
  }

  /**
   * Rarify manages authentication and ownership within its system via bearer
   * tokens and internal identities.
   *
   * All endpoints in the Rarify API use bearer authToken authentication.
   * To get a authToken, contact us. All requests must include your authToken in the
   * Authorization header.
   */
  get authToken(): Uuid {
    return this._authToken
  }

  /**
   * Sets authentication token to the client instance.
   */
  setAuthToken(authToken: Uuid): JsonApiClient {
    this._authToken = authToken
    return this
  }

  /**
   * Assigns new base URL to the current instance.
   */
  useBaseUrl(baseUrl: Url): JsonApiClient {
    if (!baseUrl) throw new TypeError('Arg "baseUrl" not passed')
    this._baseUrl = baseUrl
    return this
  }

  /**
   * Creates new instance JsonApiClient instance with given base URL.
   */
  withBaseUrl(baseUrl: Url): JsonApiClient {
    if (!baseUrl) throw new TypeError('Arg "baseUrl" not passed')

    return this._clone().useBaseUrl(baseUrl)
  }

  /**
   * Creates new instance JsonApiClient instance with given auth authToken.
   */
  withAuthToken(authToken: Uuid): JsonApiClient {
    if (!authToken) throw new TypeError('Arg "authToken" not passed')

    return this._clone().setAuthToken(authToken)
  }

  /**
   * Performs a http request
   */
  async request<T>(opts: RequestOpts): Promise<JsonApiResponse<T>> {
    let response

    const config: JsonApiClientRequestConfig = {
      baseURL: this.baseUrl,
      params: opts.query ?? {},
      paramsSerializer: (params: object): string =>
        Object.entries(params)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&'),
      data: opts.isEmptyBodyAllowed && !opts.data ? undefined : opts.data || {},
      method: opts.method,
      headers: opts?.headers ?? ({} as JsonApiClientRequestConfigHeaders),
      url: opts.endpoint,
      withCredentials: isUndefined(opts.withCredentials)
        ? true
        : opts.withCredentials,
      maxContentLength: 100000000000,
      maxBodyLength: 1000000000000,
    }

    config.params = flattenToAxiosJsonApiQuery(config)

    if (!opts.headers) {
      config.headers = setJsonApiHeaders(config)

      if (opts.contentType) config.headers['Content-Type'] = opts.contentType
      if (this.authToken)
        config.headers['Authorization'] = `Bearer ${this.authToken}`
    }

    try {
      response = await axios(config)
    } catch (e) {
      throw parseJsonApiError(e as AxiosError)
    }

    return parseJsonApiResponse<T>({
      raw: response,
      needRaw: Boolean(opts?.needRaw),
      apiClient: this,
      withCredentials: Boolean(opts?.withCredentials),
    })
  }

  /**
   * Makes a `GET` to a target `endpoint` with the provided `query` params.
   * Parses the response in JsonApi format.
   */
  get<T>(
    endpoint: string,
    query: Record<string, unknown> = {},
  ): Promise<JsonApiResponse<T>> {
    return this.request<T>({
      method: HTTP_METHODS.GET,
      endpoint,
      query,
      isEmptyBodyAllowed: true,
    })
  }

  /**
   * Makes a `POST` to a target `endpoint` with the provided `data` as body.
   * Parses the response in JsonApi format.
   */
  post<T>(endpoint: string, data: unknown): Promise<JsonApiResponse<T>> {
    return this.request<T>({
      method: HTTP_METHODS.POST,
      endpoint,
      data,
    })
  }

  /**
   * Makes a `PATCH` to a target `endpoint` with the provided `data` as body.
   * Signing can be enabled with `needSign` argument. Parses the response in
   * JsonApi format.
   */
  patch<T>(endpoint: string, data?: unknown): Promise<JsonApiResponse<T>> {
    return this.request<T>({
      method: HTTP_METHODS.PATCH,
      endpoint,
      data,
    })
  }

  /**
   * Makes a `PUT` to a target `endpoint` with the provided `data` as body.
   * Parses the response in JsonApi format.
   */
  put<T>(endpoint: string, data: unknown): Promise<JsonApiResponse<T>> {
    return this.request<T>({
      method: HTTP_METHODS.PUT,
      endpoint,
      data,
    })
  }

  /**
   * Makes a `DELETE` to a target `endpoint` with the provided `data` as body.
   * Parses the response in JsonApi format.
   */
  delete<T>(endpoint: string, data?: unknown): Promise<JsonApiResponse<T>> {
    return this.request<T>({
      method: HTTP_METHODS.DELETE,
      endpoint,
      data,
      isEmptyBodyAllowed: true,
    })
  }
}
