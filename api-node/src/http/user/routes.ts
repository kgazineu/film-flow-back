import { FastifyInstance } from 'fastify'
import { register } from './register-controller'
import { login } from './login-controller'
import { CreateUserMovieRating } from './create-user-movie-rating-controller'
import { RecoverSendPassCode } from './recover-send-pass-code-controller'
import { RecoverResendPassCode } from './resend-pass-code-controller'


export async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/register', register)
    fastify.post('/login', login)
    fastify.post('/user-movie-rating', CreateUserMovieRating)
    fastify.post('/recover/send-code', RecoverSendPassCode)
    fastify.post('/recover/resend-code', RecoverResendPassCode)
}