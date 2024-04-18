import { FastifyInstance } from "fastify";
import { register } from "./register-controller";

export async function userRoutes(fastify: FastifyInstance) {

  fastify.post("/register", register);
}