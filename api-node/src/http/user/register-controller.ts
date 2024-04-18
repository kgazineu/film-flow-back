import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"


export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = registerBodySchema.parse(req.body)
  return { email }
}