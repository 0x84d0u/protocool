
export {
  AbstractError as Custom,
  AuthenticationError as Authentication,
  AuthorizationError as Authorization,
  ConflictError as Conflict,
  NotFoundError as NotFound,
  ValidationError as Validation,
  InternalError as Internal
} from './classes'

export {
  isProtocoolError as isErr
} from './helpers'