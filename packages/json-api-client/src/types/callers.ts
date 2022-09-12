import {
  COLLECTION_PRIMARY_INTERFACE,
  IDENTITY_STATES,
  NETWORK_PROTOCOLS,
  NETWORKS,
  TRANSACTION_STATES,
  APPLICATION_ENVIRONMENTS,
  APPLICATION_STATE_VALUES,
} from '@/enums'
import {
  JsonApiRecordBase,
  Url,
  Uuid,
  HexString,
  IsoDate,
  ContractSymbol,
  WeiAmount,
  PaymentAssetCode,
  JsonApiModelShort,
} from '@/types'

export type Account = JsonApiRecordBase<'accounts'> & {
  external_address: HexString
  is_funded: boolean
  network: Network
}

export type Network = JsonApiRecordBase<'networks'> & {
  id: NETWORKS
  is_test_net: boolean
  metadata_storage: boolean
  name: string
  protocol: NETWORK_PROTOCOLS
  tokens_minting: boolean
}

export type NetworkModelShort = JsonApiModelShort<Network> & {
  id: NETWORKS
}

export type IdentityBasics = JsonApiRecordBase<'identity_basics'> & {
  name: string
  /**
   * @deprecated
   *
   * {@link IdentityBasics} type no longer return email.
   * Use `email` field from {@link Identity} type
   */
  email: string
  company: string
  project: string
  role: string
}

export type CallbackSettings = JsonApiRecordBase<'callback_settings'> & {
  id: Uuid
}

export type Identity = JsonApiRecordBase<'identities'> & {
  state: IDENTITY_STATES
  basics: IdentityBasics
  callback_settings: CallbackSettings
  accounts?: Account[]
  email?: string
}

export type Transfer = JsonApiRecordBase<'transfers'> & {
  is_minting: boolean
  amount: number
  receiver?: HexString
  token: JsonApiModelShort<Token> | Token
  tx: JsonApiModelShort<Transaction> | Transaction
}

export type Transaction = JsonApiRecordBase<'transactions'> & {
  block_number: number
  created_at: IsoDate
  hash: HexString
  failure_reason?: string
  state: TRANSACTION_STATES
  contract: JsonApiModelShort<Contract> | Contract
  network: NetworkModelShort | Network
  transfer: JsonApiModelShort<Transfer> | Transfer
}

export type Metadata = JsonApiRecordBase<'metadata'> & {
  name: string
  description: string
  image_url: Url
  created_at: IsoDate
  updated_at: IsoDate
  external_url?: Url
  network: NetworkModelShort | Network
  owner: JsonApiModelShort<Identity> | Identity
  attributes: Record<string, unknown>
}

export type MetaSellOrder = JsonApiRecordBase<'meta-sell-order'> & {
  currency: symbol
  price: number
  amount: number
  views_count: number
  available_amount: number
  token: JsonApiModelShort<Token> | Token
  owner: JsonApiModelShort<Identity> | Identity
}

export type CollectionMetadata = {
  name: string
  description: string
  image_url: Url
  external_url: Url
  royalties_fee_basic_points: number
  royalties_receiver: HexString
}

export type RarifyERC721 = {
  name: string
  symbol: ContractSymbol
  metadata: CollectionMetadata
}

export type RarifyERC1155 = {
  metadata: CollectionMetadata
}

export type Contract = JsonApiRecordBase<'contracts'> & {
  name: string
  external_address?: HexString
  created_at: IsoDate
  owner: JsonApiModelShort<Identity> | Identity
  network: NetworkModelShort | Network
  tx: JsonApiModelShort<Transaction> | Transaction
  erc721?: RarifyERC721
  erc1155?: RarifyERC1155
}

export type ContractOpenSeaMetadata = {
  name: string
  description: string
  image: Url
  external_link: Url
  seller_fee_basis_points: number
  fee_recipient: HexString
}

export type Token = JsonApiRecordBase<'tokens'> & {
  created_at: IsoDate
  updated_at: IsoDate
  external_id: HexString
  contract: JsonApiModelShort<Contract> | Contract
  metadata: JsonApiModelShort<Metadata> | Metadata
  sell_orders: JsonApiModelShort<MetaSellOrder>[] | MetaSellOrder[]
}

export type Statistics = JsonApiRecordBase<'statistics'> & {
  buckets: {
    avg_price: WeiAmount
    ceil_price: WeiAmount
    floor_price: WeiAmount
    time: IsoDate
    trades: number
    unique_buyers: number
    volume: WeiAmount
  }[]
  payment_asset: {
    code: PaymentAssetCode
    image_url: Url
  }
}

export type Collection = JsonApiRecordBase<'collections'> & {
  network: NETWORKS
  address: HexString
  primary_interface: COLLECTION_PRIMARY_INTERFACE
  name: string
  symbol: symbol
  metadata_url: Url
  metadata_fetched_at: IsoDate
  token_metadata_url: Url
  statistics: Statistics
  metadata_payload: {
    name: string
    image: Url
    description: string
    external_link: Url
    fee_recipient: HexString
    seller_fee_basis_points: number
  }
}

export type Nft = JsonApiRecordBase<'nfts'> & {
  token_id: Uuid
  circulating: number
  collection: Collection
  metadata_payload_fetched_at: IsoDate
  statistics: Statistics
  metadata_payload: {
    name: string
    image: Url
    creator: Uuid
    attributes: Record<string, unknown>
    created_at: IsoDate
    description: string
    external_url: Url
  }
}

export type ApplicationStateValues = Exclude<
  APPLICATION_STATE_VALUES,
  APPLICATION_STATE_VALUES.deleted
>

export type PatchApplicationParams = {
  id: Uuid
  name?: string
  environment?: APPLICATION_ENVIRONMENTS
  state?: ApplicationStateValues
}
