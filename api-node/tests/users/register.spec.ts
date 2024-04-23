import { afterAll, beforeAll, describe, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Register (e2e)', it => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        const response = await request(app.server)
            .post('/register')
            .send({
                name: 'test',
                nickname: 'icaro',
                email: 'test@gmail.com',
                password: 'teste123',
            })

        expect(response.status).toEqual(201)
    })

    it('should not be able to register with the same email', async () => {
        const response = await request(app.server)
            .post('/register')
            .send({
                name: 'test',
                nickname: 'icaro',
                email: 'test@gmail.com',
                password: 'teste123',
            })
        
        expect(response.status).toEqual(409)
    })

    it('should not be able to register with the same nickname', async () => {
        const response = await request(app.server)
            .post('/register')
            .send({
                name: 'test',
                nickname: 'icaro',
                email: 'test2agasg@gmail.com',
                password: 'teste123'
            })
        
        expect(response.status).toEqual(409)
    })
})