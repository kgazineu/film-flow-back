import fastify from "fastify"
import { userRoutes } from "./http/user/routes"
import { ZodError } from "zod"

export const app = fastify()

app.register(userRoutes)

app.setErrorHandler((error, req, reply) => {
  if (error instanceof ZodError) {
    reply.status(409).send({ message: error.format()})
  }
})