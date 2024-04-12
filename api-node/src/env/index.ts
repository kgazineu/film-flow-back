import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(8000),
  NODE_ENV: z.enum(['dev', 'text', 'production']).default('dev'),
})

const _env = envSchema.safeParse(process.env)

if(!_env.success){
  console.error('Invalid environmnent variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data