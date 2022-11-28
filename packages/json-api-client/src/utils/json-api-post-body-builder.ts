import {
  JsonApiPostBody,
  JsonApiPostResource,
  JsonApiAttributes,
  JsonApiPostRelationships,
  JsonApiLinks,
  JsonApiMeta,
  JsonApiImplementation,
  URL,
  JsonApiLink,
} from '@/types'

export class JsonApiPostBodyBuilder {
  private body: JsonApiPostBody

  constructor() {
    this.body = {
      data: {
        type: '',
      },
    }
  }

  setData(resource: JsonApiPostResource) {
    this.body.data = resource
    return this
  }

  setMeta(meta: JsonApiMeta) {
    this.body.meta = meta
    return this
  }

  setImplementation(implementation: JsonApiImplementation) {
    this.body.jsonapi = implementation
  }

  setLinks(links: JsonApiLinks) {
    this.body.links = links
    return this
  }

  setIncluded(included: JsonApiPostResource[]) {
    this.body.included = included
    return this
  }

  setDataType(type: string) {
    this.body.data.type = type
    return this
  }

  setDataID(id: string) {
    this.body.data.id = id
    return this
  }

  setDataAttributes(attributes: JsonApiAttributes) {
    this.body.data.attributes = attributes
    return this
  }

  setDataRelationships(relationships: JsonApiPostRelationships) {
    this.body.data.relationships = relationships
    return this
  }

  setDataLinks(links: JsonApiLinks) {
    this.body.data.links = links
    return this
  }

  setDataMeta(meta: JsonApiMeta) {
    this.body.data.meta = meta
    return this
  }

  setImplementationVersion(version: string) {
    if (this.body.jsonapi) this.body.jsonapi.version = version
    else
      this.body.jsonapi = {
        version: version,
      }
  }

  setImplementationExt(ext: URL[]) {
    if (this.body.jsonapi) this.body.jsonapi.ext = ext
    else
      this.body.jsonapi = {
        ext: ext,
      }
  }

  setImplementationProfile(profile: URL[]) {
    if (this.body.jsonapi) this.body.jsonapi.profile = profile
    else
      this.body.jsonapi = {
        profile: profile,
      }
  }

  setImplementationMeta(meta: JsonApiMeta) {
    if (this.body.jsonapi) this.body.jsonapi.meta = meta
    else
      this.body.jsonapi = {
        meta: meta,
      }
  }

  setLinksSelf(self: JsonApiLink | URL | null) {
    if (this.body.links) this.body.links.self = self
    else
      this.body.links = {
        self: self,
      }
  }

  setLinksRelated(related: URL | JsonApiLink | null) {
    if (this.body.links) this.body.links.related = related
    else
      this.body.links = {
        related: related,
      }
  }

  setLinksDescribedby(describedby: URL | JsonApiLink | null) {
    if (this.body.links) this.body.links.describedby = describedby
    else
      this.body.links = {
        describedby: describedby,
      }
  }

  setLinksFirst(first: URL | JsonApiLink | null) {
    if (this.body.links) this.body.links.first = first
    else
      this.body.links = {
        first: first,
      }
  }

  setLinksLast(last: URL | JsonApiLink | null) {
    if (this.body.links) this.body.links.last = last
    else
      this.body.links = {
        last: last,
      }
  }

  setLinksPrev(prev: URL | JsonApiLink | null) {
    if (this.body.links) this.body.links.prev = prev
    else
      this.body.links = {
        prev: prev,
      }
  }

  setLinksNext(next: URL | JsonApiLink | null) {
    if (this.body.links) this.body.links.next = next
    else
      this.body.links = {
        next: next,
      }
  }

  build() {
    const result: JsonApiPostBody = { ...this.body }
    this.reset()
    return result
  }

  reset() {
    this.body = {
      data: {
        type: '',
      },
    }
  }
}
