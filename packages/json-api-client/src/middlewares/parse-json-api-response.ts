import { JsonApiResponse } from '@/response'
import { AxiosResponse } from 'axios'
import { JsonApiClient } from '@/json-api'

export const parseJsonApiResponse = <T>(opts: {
  raw: AxiosResponse
  apiClient: JsonApiClient
  isNeedRaw: boolean
  withCredentials: boolean
}) => {
  return new JsonApiResponse<T>(opts)
}
