import { server } from './server';
import * as request  from 'supertest';



describe("GET / - a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(server).get("/");
    expect(result.text).toEqual("hello");
    expect(result.statusCode).toEqual(200);
  });
});



// it('gets the test endpoint', async done => {
//   const response = await request.get('/test')

//   expect(response.status).toBe(200)
//   expect(response.body.message).toBe('pass!')
//   done()
// })