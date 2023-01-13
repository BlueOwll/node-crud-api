
import { server } from './server';
import request  from 'supertest';
import { IUserData } from './models/user.js';

const userdataNew: IUserData = {
  username: 'Vasya',
  age: 22,
  hobbies: ['football', 'horse-riding', 'express']
}

const userdataUpdated: IUserData = {
  username: 'Vasya',
  age: 30,
  hobbies: ['swimming', 'horse-riding', 'nestjs']
}

const validUuid = '0af6b075-f04b-4fbb-ad96-e4f7570bd666';
const invalidUuid = '0af6b075-f04b-4fbb-ad96-e4f7570bd66';

// a. Get all records with a GET api/users request (an empty array is expected)
// b. A new object is created by a POST api/users request (a response containing newly created record is expected)
// c. With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)
// d. We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)
// e. With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)
// f. With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)
describe('scenario 1: correct user handling', function() {
  let userId: string;

  // after(done => {
  //   server.close(done);
  // });

  it('get initial list of users', async () => {
  const response = await request(server).get('/api/users');
  expect(response.status).toBe(200);
  expect(response.body).toStrictEqual([]);  
  });

  it('add new user', async () => {
    const response = await request(server)
      .post('/api/users')
      .send(userdataNew);
    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({
      id: expect.any(String),
      ...userdataNew
    });  
    userId = response.body.id;
  });

  it('get current list of users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([
      {
        id: userId,
        ...userdataNew
      }
    ]);  
    });

  it('get user', async () => {
    const response = await request(server)
      .get(`/api/users/${userId}`)
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: userId,
      ...userdataNew
    });  
  });

  it('update user', async () => {
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send(userdataUpdated);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: userId,
      ...userdataUpdated
    });      
  });

  it('delete user', async () => {
    const response = await request(server)
      .delete(`/api/users/${userId}`)
    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual('');      
  });

  it('get final list of users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);  
    });

});

describe('scenario 2: invalid data in creating or updating user', function() {
  let userId: string;
  it('get initial list of users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);  
    });
    it('add new valid user', async () => {
      const response = await request(server)
        .post('/api/users')
        .send(userdataNew);
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({
        id: expect.any(String),
        ...userdataNew
      });  
      userId = response.body.id;
    });  
    it('add new user with invalid age', async () => {
      const response = await request(server)
        .post('/api/users')
        .send({
          ...userdataNew,
          age: 'twenty'});
      expect(response.status).toBe(400);
      expect(response.body.error).toStrictEqual('Invalid user data');  
      
    });  
    it('add new user with no age', async () => {
      const response = await request(server)
        .post('/api/users')
        .send({
          username: userdataNew.username,
          hobbies: []});
      expect(response.status).toBe(400);
      expect(response.body.error).toStrictEqual('Missing required fields');        
    });  
    it('try to update user with no age', async () => {
      const response = await request(server)
        .put(`/api/users/${userId}`)
        .send({
          username: userdataNew.username,
          hobbies: []});
      expect(response.status).toBe(400);
      expect(response.body.error).toStrictEqual('Missing required fields');        
    });  
    it('try to update user with invalid uuid', async () => {
      const response = await request(server)
        .put(`/api/users/${invalidUuid}`)
        .send({
          ...userdataNew
        });
      expect(response.status).toBe(400);
      expect(response.body.error).toStrictEqual('Invalid user id');        
    }); 
    it('try to update user with not-existing uuid', async () => {
      const response = await request(server)
        .put(`/api/users/${validUuid}`)
        .send({
          ...userdataNew
        });
      expect(response.status).toBe(404);
      expect(response.body.error).toStrictEqual('User not found');        
    }); 
});

describe('scenario 3: invalid data in creating or updating user', function() {
  it('try to get users with invalid endpoint', async () => {
    const response = await request(server).get('/api/not-existing-path');
    expect(response.status).toBe(404);
    expect(response.body.error).toStrictEqual('Resource not found');  
    });
  it('try to put to incorrect endpoint', async () => {
    const response = await request(server)
      .put(`/api/users`)
      .send({
        ...userdataNew
      });
    expect(response.status).toBe(404);
    expect(response.body.error).toStrictEqual('Resource not found');        
  }); 
  it('try to get server error', async () => {
    const response = await request(server).get('/api/error');
    expect(response.status).toBe(500);
    expect(response.body.error).toStrictEqual('Server error');  
    });
});


// it('gets the test endpoint', async done => {
//   const response = await request.get('/test')

//   expect(response.status).toBe(200)
//   expect(response.body.message).toBe('pass!')
//   done()
// })