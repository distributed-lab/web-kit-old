import { errors } from '@/errors'
import { JsonApiError } from '@/errors'
import { AxiosError } from 'axios'
import { HTTP_STATUS_CODES } from '@/enums'

/*
 * Parses server error and returns corresponding error instance.
 * Needed to handle on client side different behavior based on error type
 */
export const parseJsonApiError = (error: AxiosError): JsonApiError => {
  const status = error?.['response']?.status

  switch (status) {
    case HTTP_STATUS_CODES.badRequest:
      return new errors.BadRequestError(error)
    case HTTP_STATUS_CODES.unauthorized:
      return new errors.UnauthorizedError(error)
    case HTTP_STATUS_CODES.forbidden:
      return new errors.ForbiddenError(error)
    case HTTP_STATUS_CODES.notFound:
      return new errors.NotFoundError(error)
    case HTTP_STATUS_CODES.conflict:
      return new errors.ConflictError(error)
    case HTTP_STATUS_CODES.internalError:
      return new errors.InternalServerError(error)
    default:
      return new errors.NetworkError(error)
  }
}
