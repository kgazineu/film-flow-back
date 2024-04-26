import { afterAll, beforeAll, describe, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

// test('asgasgasg', ()  => {
//     expect(2 + 2).toBe(4)
// })

describe('Login (e2e)', it => {
    beforeAll(async () => {
        await app.ready()
        await request(app.server)
            .post('/register')
            .send({
                name: 'test',
                nickname: 'icaro',
                email: 'test@gmail.com',
                password: 'teste123',
            })
    }) 

    afterAll(async () => {
        await app.close()
    })

    it('should be able to login', async () => {
        const response = await request(app.server)
            .post('/login')
            .send({
                email: 'test@gmail.com',
                password: 'teste123',
            })

        expect(response.status).toEqual(200)
    })

    it('should not be able to login with invalid credentials', async () => {
        const response = await request(app.server)
            .post('/login')
            .send({
                email: 'test@gmail.com',
                password: 'teste1234',
            })

        expect(response.status).toEqual(401)
    })

    it('should not be able to login if user not registered', async () => {
        const response = await request(app.server)
            .post('/login')
            .send({
                email: 'teste@gmail.com',
                password: 'teste123',
            })

        expect(response.status).toEqual(404)
    })
})
