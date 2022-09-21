import { errors } from '@/errors'
import { JsonApiError } from '@/errors'
import { AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'

/*
 * Parses server error and returns corresponding error instance.
 * Needed to handle on client side different behavior based on error type
 */
export const parseJsonApiError = (error: AxiosError): JsonApiError => {
  const status = error?.['response']?.status

  switch (status) {
    case StatusCodes.BAD_REQUEST:
      return new errors.BadRequestError(error)
    case StatusCodes.UNAUTHORIZED:
      return new errors.UnauthorizedError(error)
    case StatusCodes.FORBIDDEN:
      return new errors.ForbiddenError(error)
    case StatusCodes.NOT_FOUND:
      return new errors.NotFoundError(error)
    case StatusCodes.CONFLICT:
      return new errors.ConflictError(error)
    case StatusCodes.INTERNAL_SERVER_ERROR:
      return new errors.InternalServerError(error)
    default:
      return new errors.NetworkError(error)
  }
}
