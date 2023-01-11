import { DataBase } from './database';
import { IUser, IUserData } from './user.js';


const usersData: IUserData[] = [
  {
    username: 'Olya',
    age: 22,
    hobbies: []
  }
]



const database = new DataBase();

it('gets first state of users list', () => {
  expect(database.getUsers()).toStrictEqual([] as IUser[]);
});

it('adds new user', () =>{
  expect(database.addUser(JSON.stringify(usersData[0]))).toEqual({
    id: expect.any(String),
    username: usersData[0].username,
    hobbies: usersData[0].hobbies,
    age: usersData[0].age
  })
})

