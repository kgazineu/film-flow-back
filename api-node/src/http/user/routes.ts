import { FastifyInstance } from 'fastify'
import { register } from './register-controller'
import { login } from './login'

export async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/register', register)
    fastify.post('/login', login)
}