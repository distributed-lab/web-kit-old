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
    return this
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
    return this
  }

  setImplementationExt(ext: URL[]) {
    if (this.body.jsonapi) this.body.jsonapi.ext = ext
    else
      this.body.jsonapi = {
        ext: ext,
      }
    return this
  }

  setImplementationProfile(profile: URL[]) {
    if (this.body.jsonapi) this.body.jsonapi.profile = profile
    else
      this.body.jsonapi = {
        profile: profile,
      }
    return this
  }

  setImplementationMeta(meta: JsonApiMeta) {
    if (this.body.jsonapi) this.body.jsonapi.meta = meta
    else
      this.body.jsonapi = {
        meta: meta,
      }
    return this
  }

  setLinksSelf(self: JsonApiLink | URL | null) {
    if (this.body.links) this.body.links.self = self
    else
      this.body.links = {
        self: self,
      }
    return this
  }

  setLinksRelated(related: URL | JsonApiLink | null) {
    if (this.body.links) this.body.links.related = related
    else
      this.body.links = {
        related: related,
      }
    return this
  }

  setLinksDescribedby(describedby: URL | JsonApiLink | null) {
    if (this.body.links) this.body.links.describedby = describedby
    else
      this.body.links = {
        describedby: describedby,
      }
    return this
  }

  setLinksFirst(first: URL | JsonApiLink | null) {
    if (this.body.links) this.body.links.first = first
    else
      this.body.links = {
        first: first,
      }
    return this
  }

  setLinksLast(last: URL | JsonApiLink | null) {
    if (this.body.links) this.body.links.last = last
    else
      this.body.links = {
        last: last,
      }
    return this
  }

  setLinksPrev(prev: URL | JsonApiLink | null) {
    if (this.body.links) this.body.links.prev = prev
    else
      this.body.links = {
        prev: prev,
      }
    return this
  }

  setLinksNext(next: URL | JsonApiLink | null) {
    if (this.body.links) this.body.links.next = next
    else
      this.body.links = {
        next: next,
      }
    return this
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
    return this
  }
}
