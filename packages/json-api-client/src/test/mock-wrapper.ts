import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios'
import { JsonApiClient, JsonApiResponse } from '../index'
import { parseJsonApiResponse } from '@/middlewares'

export class MockWrapper {
  static makeAxiosResponse<T>(
    data: T,
    status = 200,
    config?: AxiosRequestConfig,
  ): AxiosResponse<T> {
    return {
      data,
      status,
      statusText: 'ok',
      headers: {} as AxiosResponseHeaders,
      config: config || ({} as AxiosRequestConfig),
    } as AxiosResponse
  }

  static makeJsonApiResponse<T>(
    data: unknown,
    needRaw?: boolean,
  ): JsonApiResponse<T> {
    const apiClient = MockWrapper.getMockedApi()
    const raw = MockWrapper.makeAxiosResponse<T>(data as T)

    return parseJsonApiResponse<T>({
      raw,
      needRaw: Boolean(needRaw),
      apiClient,
      withCredentials: true,
    })
  }

  static getMockedApi(): jest.Mocked<JsonApiClient> {
    return new JsonApiClient({
      baseUrl: 'http://localhost:8095/core',
    }) as never
  }
}
