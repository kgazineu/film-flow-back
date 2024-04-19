import fastify from 'fastify'
import { ZodError } from 'zod'
import { routes } from './http/routes'

export const app = fastify()

app.register(routes)

app.setErrorHandler((error, req, reply) => {
    if (error instanceof ZodError) {
        reply.status(409).send({ message: error.format()})
    }
})