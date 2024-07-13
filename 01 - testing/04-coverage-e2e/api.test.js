const { describe, it,  } = require('mocha')
const request = require('supertest')
const assert = require('assert')
const app = require('./api')

describe('API Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app)
        .get('/contact')
        .expect(200)

      assert.deepStrictEqual(response.text, 'contact us page')
      console.log('response => ', response)
    })
  })

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app)
        .get('/hi')
        .expect(200)

      assert.deepStrictEqual(response.text, 'Hello World!')
      console.log('response => ', response)
    })
  })

  describe('/login', () => {
    it('should login successfully on the login and return HTTP Status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'nathan', password: '123' })
        .expect(200)

      assert.deepStrictEqual(response.text, 'Logging has succeeded!')
    })

    it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'mendonca', password: '123' })
        .expect(401)

      assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, 'Logging failed!')
    })
  })
});
