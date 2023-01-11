import { server } from './server';
import request  from 'supertest';



describe('GET api/user', function() {
  it('responds with json', async () => {
  const response = await request(server).get('/api/users')

  expect(response.status).toBe(200)
  expect(response.body).toStrictEqual([])
  
  });
});



// it('gets the test endpoint', async done => {
//   const response = await request.get('/test')

//   expect(response.status).toBe(200)
//   expect(response.body.message).toBe('pass!')
//   done()
// })