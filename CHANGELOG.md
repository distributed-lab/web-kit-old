
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [1.2.11] - 2022-06-02
#### Added
- `is_new_sign_up` field to `Session` type

## [1.2.10] - 2022-05-04
#### Added
- `patchApplication`, `deleteApplication` methods to the `ApplicationCaller`
- `toFormat` method to `MathUtil`

## [1.2.9] - 2022-05-04
#### Changed
- Update `UsagePlotPoint` type

## [1.2.8] - 2022-05-02
#### Added
- `getPricingPlan` method to the `UserCaller`
#### Changed
- Moved `getApiUsageStatistics` method from `ApplicationCaller` to the `UserCaller`

## [1.2.7] - 2022-04-29
#### Added
- `format` method to the `DateUtil`

## [1.2.6] - 2022-04-29
#### Added
- `getApiUsageStatistics` method to the `ApplicationCaller` and `RarifyClient`

## [1.2.5] - 2022-04-27
#### Added
- `company`, `role`, `project` fields to `IdentityBasics` type
- `company`, `role`, `project` body parameter fields to `UserCaller.patchIdentity`
- `ApplicationCaller`
- `ApplicationCaller` functionality to `RarifyClient`

## [1.2.4] - 2022-04-26
#### Added
- `email` field to `Identity` type
#### Deprecated
- `email` field in `IdentityBasics` type no longer return email. use `email` field from `Identity` type

## [1.2.3] - 2022-04-22
#### Added
- `email` field to `IdentityBasics` type

## [1.2.2] - 2022-03-16
#### Fixed
- `Network.id` type

## [1.2.1] - 2022-03-16
#### Added
- `sell_orders` field to the `Token` type
- New `sell_orders` includes to the get tokens and get
  token by id methods

## [1.2.0] - 2022-03-14
#### Added
- New `accounts` and `account.network` includes to the get identity and get
  session method
- `Account` type and field to the `Identity` type
#### Changed
- Replaced all `interface` types with `type` because there is no need to use `interface`

## [1.1.13] - 2022-03-11
#### Added
- Added new methods to the `DateUtil`
- Added new method to the `MathUtil`

## [1.1.12] - 2022-03-09
#### Added
- `DateUtil`

## [1.1.11] - 2022-03-07
#### Fixed
- `RarifyClient` `getCollectionById` and `getNftById` methods issue

## [1.1.10] - 2022-02-28
#### Added
- `getCollectionById` & `getNftById` methods to the `NftDataCaller` and `RarifyClient`
- `statistics` field to the `Nft` and `Collection` types
- Convert currency from wei to eth helper function
- Ability to set decimal places in `MathUtil`
#### Changed
- Updated readme
#### Removed
- Test files from npm package

## [1.1.9] - 2022-02-22
#### Removed
- Sending auth token to the `/public` endpoints with caller's `.clone()` method

## [1.1.8] - 2022-02-19
#### Changed
- `package.json` repo and home page urls
- Updated `README.md`

## [1.1.7] - 2022-02-18
#### Added
- Filter "has metadata" to search collection methods

## [1.1.6] - 2022-02-18
#### Added
- `sort` filter to `getSellOrders` & `RarifyClient.getSellOrders`
- `email_verified`, `picture`, `name` to type `Session`
#### Removed
- `page[order]` filter from `getSellOrders`
- `page.order` filter from `RarifyClient.getSellOrders`

## [1.1.5] - 2022-02-17
#### Fixed
- `JsonApiResponse` page limit getter

## [1.1.4] - 2022-02-17
#### Added
- Filter "has metadata" to search NFTs methods

## [1.1.3] - 2022-02-15
#### Added
- `NftDataCaller` and it's methods to the `RarifyClient`

## [1.1.2] - 2022-02-14
#### Fixed
- Setting empty auth token

## [1.1.1] - 2022-02-11
#### Added
- `JsonApiClient` tests
- `parseJsonApiResponse` tests
- `views_count` field to the `MetaSellOrder` typo
#### Fixed
- Ability to use `jsonApiClient.delete` method with optional data parameter
- `JsonApiResponse` does `links` object exists condition in the response in the
  private method `_createLinks()`

## [1.1.0] - 2022-02-04
#### Added
- Ability to provide `authToken` to the `JsonApiClient` during initialization
- `RarifyClient` - all callers wrapper to simplify developing experience for
  the common users
#### Changed
- Callers `.withBaseUrl()` method renamed to `clone()` to add ability provide
  authorization token
- `JsonApiClient` method `setToken` renamed to `setAuthToken`, `withToken`
  renamed to `withAuthToken` to not be confused with a token as an entity
- Refactored `getRandomHex` helper function to get Node.js compatibility

## [1.0.0] - 2022-01-31
#### Added
- `userCaller.getSession()`
#### Removed
- `userCaller.getSessionById()`

## [1.0.0-rc.31] - 2022-01-28
#### Added
- Rarify entities type checkers

## [1.0.0-rc.30] - 2022-01-27
#### Added
- Patch metadata method
#### Fixed
- `FileLike` typo

## [1.0.0-rc.29] - 2022-01-27
#### Changed
- Babel config

## [1.0.0-rc.28] - 2022-01-27
#### Added
- CommonJS modules support

## [1.0.0-rc.27] - 2022-01-26
#### Added
- `getBuyOrders` method to the `MetaBuyOrderCaller`
- `META_BUY_ORDER_STATES` enum
- New fields to the `MetaBuyOrder` type

## [1.0.0-rc.26] - 2022-01-22
#### Changed
- Moved to `openpgp/lightweight`

## [1.0.0-rc.25] - 2022-01-21
#### Added
- New `claimable_at` field to the `MetaBuyOrder` type

## [1.0.0-rc.24] - 2022-01-18
#### Fixed
- `Contract` type

## [1.0.0-rc.23] - 2022-01-17
#### Added
- `loadDataViaLoop` helper to load all data from endpoint that supports pagination

## [1.0.0-rc.22] - 2022-01-14
#### Changed
- Updated `Identity` type

## [1.0.0-rc.21] - 2022-01-06
#### Added
- Ability to get identity and patch identity attributes

## [1.0.0-rc.20] - 2021-12-30
#### Added
- Multiply and divide functions to math utils

## [1.0.0-rc.19] - 2021-12-29
#### Fixed
- Meta buy order patch request, backend now needs one-time auth bearer token

## [1.0.0-rc.18] - 2021-12-28
#### Added
- Patch buy order method to `MetaBuyOrderCaller`

## [1.0.0-rc.17] - 2021-12-27
#### Fixed
- `MetaBuyOrderCaller` types

## [1.0.0-rc.16] - 2021-12-27
#### Added
- `MetaBuyOrderCaller`

## [1.0.0-rc.15] - 2021-12-23
#### Added
- Math utils

## [1.0.0-rc.14] - 2021-12-20
#### Changed
- Updated [README.md](./README.md)

## [1.0.0-rc.13] - 2021-12-17
#### Fixed
- Fetch pages `JsonApiClient` request config

## [1.0.0-rc.12] - 2021-12-16
#### Added
- Added `fetchPage` to `JsonApiClient` to paginate list
#### Changed
- Changed return type of all callers, now them returns data in `JsonApiResponce`,
  to make possible paginate result. It breaks backward compatibility.

## [1.0.0-rc.11] - 2021-12-15
#### Added
- `getRandomHex` helper function
#### Removed
- `crypto` package
-
## [1.0.0-rc.10] - 2021-12-15
#### Added
- `crypto` package

## [1.0.0-rc.9] - 2021-12-15
#### Added
- `MetaSellOrderCaller` that performs sell order requests

## [1.0.0-rc.8] - 2021-12-15
#### Fixed
- `TransactionCaller` export

## [1.0.0-rc.7] - 2021-12-15
#### Removed
- `randombytes` dependency

## [1.0.0-rc.6] - 2021-12-10
#### Fixed
- Setting empty token

## [1.0.0-rc.5] - 2021-12-10
#### Added
- `UserCaller` that performs session and identity requests

## [1.0.0-rc.4] - 2021-12-06
#### Added
- Examples of usage SDK to `README.md`

## [1.0.0-rc.3] - 2021-12-03
#### Added
- `ContractCaller`, `NetworkCaller`, `TokenCaller`, `MetadataCaller`,
  `TransferCaller`, `TransactionCaller`, `FileCaller` callers  that provides
   interface to work with related API endpoints

## [1.0.0-rc.2] - 2021-11-26
#### Changed
- Updated [README.md](./README.md) install guidelines
- Browser build distributive output file name to `rarify.js-sdk.min.js`
#### Fixed
- `.npmignore`
## [1.0.0-rc.1] - 2021-11-25
#### Under the hood changes
- Initiated project with TypeScript + Jest
#### Added
- `JsonApiClient` that performs requests to backend
- Error wrappers

[Unreleased]: https://gitlab.com/rarifytech/js-sdk/compare/1.2.11...main
[1.2.11]: https://gitlab.com/rarifytech/js-sdk/compare/1.2.10...1.2.11
[1.2.10]: https://gitlab.com/rarifytech/js-sdk/compare/1.2.9...1.2.10
[1.2.9]: https://gitlab.com/rarifytech/js-sdk/compare/1.2.8...1.2.9
[1.2.8]: https://gitlab.com/rarifytech/js-sdk/compare/1.2.7...1.2.8
[1.2.7]: https://gitlab.com/rarifytech/js-sdk/compare/1.2.6...1.2.7
[1.2.6]: https://gitlab.com/rarifytech/js-sdk/compare/1.2.5...1.2.6
[1.2.5]: https://gitlab.com/rarifytech/js-sdk/compare/1.2.4...1.2.5
[1.2.4]: https://gitlab.com/rarifytech/js-sdk/compare/1.2.3...1.2.4
[1.2.3]: https://gitlab.com/rarifytech/js-sdk/compare/1.2.2...1.2.3
[1.2.2]: https://gitlab.com/rarifytech/js-sdk/compare/1.2.1...1.2.2
[1.2.1]: https://gitlab.com/rarifytech/js-sdk/compare/1.2.0...1.2.1
[1.2.0]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.13...1.2.0
[1.1.13]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.12...1.1.13
[1.1.12]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.11...1.1.12
[1.1.11]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.10...1.1.11
[1.1.10]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.9...1.1.10
[1.1.9]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.8...1.1.9
[1.1.8]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.7...1.1.8
[1.1.7]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.6...1.1.7
[1.1.6]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.5...1.1.6
[1.1.5]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.4...1.1.5
[1.1.4]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.3...1.1.4
[1.1.3]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.2...1.1.3
[1.1.2]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.1...1.1.2
[1.1.1]: https://gitlab.com/rarifytech/js-sdk/compare/1.1.0...1.1.1
[1.1.0]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0...1.1.0
[1.0.0]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.31...1.0.0
[1.0.0-rc.31]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.30...1.0.0-rc.31
[1.0.0-rc.30]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.29...1.0.0-rc.30
[1.0.0-rc.29]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.28...1.0.0-rc.29
[1.0.0-rc.28]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.27...1.0.0-rc.28
[1.0.0-rc.27]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.26...1.0.0-rc.27
[1.0.0-rc.26]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.25...1.0.0-rc.26
[1.0.0-rc.25]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.24...1.0.0-rc.25
[1.0.0-rc.24]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.23...1.0.0-rc.24
[1.0.0-rc.23]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.22...1.0.0-rc.23
[1.0.0-rc.22]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.21...1.0.0-rc.22
[1.0.0-rc.21]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.20...1.0.0-rc.21
[1.0.0-rc.20]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.19...1.0.0-rc.20
[1.0.0-rc.19]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.18...1.0.0-rc.19
[1.0.0-rc.18]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.17...1.0.0-rc.18
[1.0.0-rc.17]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.16...1.0.0-rc.17
[1.0.0-rc.16]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.15...1.0.0-rc.16
[1.0.0-rc.15]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.14...1.0.0-rc.15
[1.0.0-rc.14]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.13...1.0.0-rc.14
[1.0.0-rc.13]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.12...1.0.0-rc.13
[1.0.0-rc.12]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.11...1.0.0-rc.12
[1.0.0-rc.11]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.10...1.0.0-rc.11
[1.0.0-rc.10]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.9...1.0.0-rc.10
[1.0.0-rc.9]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.8...1.0.0-rc.9
[1.0.0-rc.8]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.7...1.0.0-rc.8
[1.0.0-rc.7]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.6...1.0.0-rc.7
[1.0.0-rc.6]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.5...1.0.0-rc.6
[1.0.0-rc.5]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.4...1.0.0-rc.5
[1.0.0-rc.4]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.3...1.0.0-rc.4
[1.0.0-rc.3]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.2...1.0.0-rc.3
[1.0.0-rc.2]: https://gitlab.com/rarifytech/js-sdk/compare/1.0.0-rc.1...1.0.0-rc.2
[1.0.0-rc.1]: https://gitlab.com/rarifytech/js-sdk/tags/1.0.0-rc.1
