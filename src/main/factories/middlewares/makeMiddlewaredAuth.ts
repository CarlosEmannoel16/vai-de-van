import { AuthMiddleware } from '../../../presentation/middlewares/auth/authMiddleware'
import { JwtCompare } from '../../../data/usecases/auth/CompareJwt'
import { IMiddleware } from '../../../presentation/protocols/IMiddleware'

export const makeMiddlewareAuth = (): IMiddleware => {
    return new AuthMiddleware(new JwtCompare())
}