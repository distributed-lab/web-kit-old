# @distributedlab/json-api-client
JSON API client

![version (scoped package)](https://badgen.net/npm/v/@distributedlab/json-api-client)
![types](https://badgen.net/npm/types/@distributedlab/json-api-client)
![tree-shaking](https://badgen.net/bundlephobia/tree-shaking/@distributedlab/json-api-client)
![checks](https://badgen.net/github/checks/distributed-lab/web-kit/main)

## Usage
#### Bearer token
```typescript
// interceptors.ts
import { HTTPS_STATUS_CODES } from '@distributedlab/json-api-client'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store'
import { router } from '@/router'
import { Bus } from '@/utils'
import { ROUTE_NAMES } from '@/enums'
import { useI18n } from '@/localization'

export function attachBearerInjector(axios: AxiosInstance): void {
  axios.interceptors.request.use((request): AxiosRequestConfig => {
    // Some authentication store in the client app
    const authStore = useAuthStore()
    if (!authStore.accessToken) return request

    if (!request.headers) request.headers = {}
    // Attach bearer token to every request
    request.headers['Authorization'] = `Bearer ${authStore.accessToken}`
    return request
  })
}

export function attachStaleTokenHandler(axios: AxiosInstance): void {
  axios.interceptors.response.use(
    response => response,
    async error => {
      const config = error?.config
      const isUnauthorized = (
        error?.response?.status === HTTPS_STATUS_CODES.UNAUTHORIZED &&
        !config?._retry
      )

      // If error isn't unauthorized or request was already retried - return error
      if (!isUnauthorized) return Promise.reject(error)

      // Some authentication store in the client app
      const authStore = useAuthStore()
      const { $t } = useI18n()

      try {
        config._retry = true
        // Executes some refresh token logic in the client app
        await authStore.refreshToken()

        // Reset default axios authorization header witn new token
        axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.accessToken}`

        return axios(config)
      } catch (_error) {

        /** Example of handling refresh token error in the client app
         *
         * Implementation may differ from example
         *
         * We can logout user and redirect him to the login page and
         * emit bus error event to show user that session expired
        */
        authStore.logout()
        router.push({ name: ROUTE_NAMES.login })
        Bus.error({
          title: $t('api-errors.session-expired-title'),
          message: $t('api-errors.session-expired-desc'),
        })
        return Promise.reject(_error)
      }
    },
  )
}

// api.ts
import { JsonApiClient } from '@distributedlab/json-api-client';
import { attachBearerInjector, attachStaleTokenHandler } from '@/interceptors';

const axiosInstance = axios.create()
attachBearerInjector(axiosInstance)
attachStaleTokenHandler(axiosInstance)

export const api = new JsonApiClient({
  baseUrl: 'https://api.example.com',
  axios: axiosInstance,
});
```

## Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<details><summary>2.0.3</summary>
  <h4>Changed</h4>
  <ul>
    <li>Updated axios to <code>1.0.0</code></li>
  </ul>
</details>
<details><summary>2.0.2</summary>
  <h4>Added</h4>
  <ul>
    <li>Export helpers, enums and types</li>
  </ul>
</details>
<details><summary>2.0.1</summary>
  <h4>Fixed</h4>
  <ul>
    <li>Build content in NPM package</li>
  </ul>
</details>
<details><summary>2.0.0</summary>
  <h4>Added</h4>
  <ul>
    <li>
      Ability to provide axios instance to make possible to inject interceptors
      from client code to handle authorization and refresh token logic
    </li>
  </ul>
  <h4>Removed</h4>
  <ul>
    <li>Ability to provide auth token</li>
  </ul>
</details>
<details><summary>1.0.2</summary>
  <h4>Fixed</h4>
  <ul>
    <li>@babel/runtime dependency</li>
  </ul>
</details>
<details><summary>1.0.1</summary>
  <h4>Fixed</h4>
  <ul>
    <li>Readme</li>
  </ul>
</details>
<details><summary>1.0.0</summary>
  <h4>Under the hood changes</h4>
  <ul>
    <li>Initiated project</li>
  </ul>
</details>

