import { IUser, IUserData } from './user.js';
import { v4 as uuid, validate as isValid } from 'uuid';

interface IDatabase {
  users: IUser[]
}

export class DataBase {
  private dataBase: IDatabase = {
    users: []
  };

  public getUsers() {
    return this.dataBase.users;
  }

  public addUser(data: string) {
    let newUserData: IUserData;
    try {
      newUserData = JSON.parse(data);     
    }catch(err) {
      throw new Error('Invalid input');
    }
    const newUser: IUser = {
      id: uuid(),
      username: newUserData.username,
      age: newUserData.age,
      hobbies: newUserData.hobbies
    }
    Object.values(newUser).forEach((value) => {
      if (value === undefined) throw new Error(`Missing required fields`);
    });
    if ( !this.isValidUserFields(newUser)) {
      throw new Error(`Invalid user data`);
    } 
    this.dataBase.users.push(newUser);
    return newUser;
  }

  public getUser(userId: string) {
    if (isValid(userId)) {
      return this.dataBase.users.find((item) => item.id === userId)
    } 
    throw new Error('Invalid user id');
  }

  public deleteUser(userId: string) {
    let user: IUser;
    if (isValid(userId)) {
      const userIndex = this.dataBase.users.findIndex((item) => item.id === userId);
      if (userIndex === -1) return undefined;
      [user] = this.dataBase.users.splice(userIndex, 1);
      return user;
    } 
    throw new Error('Invalid user id');
  }

  public putUser(userId: string, data: string) {
    let newUserData: IUserData;
    try {
      newUserData = JSON.parse(data);     
    }catch(err) {
      throw new Error('Invalid input');
    }
    
    if (isValid(userId)) {
      const userIndex = this.dataBase.users.findIndex((item) => item.id === userId);
      if (userIndex === -1) return undefined;

      const newUser: IUser = {
        id: userId,
        username: newUserData.username,
        age: newUserData.age,
        hobbies: newUserData.hobbies
      }
      Object.values(newUser).forEach((value) => {
        if (value === undefined) throw new Error(`Missing required fields`);
      });
      if ( !this.isValidUserFields(newUser)) {
        throw new Error(`Invalid user data`);
      } 
      // const user = {...this.dataBase.users[userIndex]};
      // user.username = newUserData.username === undefined ? null : newUserData.username;
      // user.age = newUserData.age === undefined ? null : newUserData.age;
      // user.hobbies = newUserData.hobbies === undefined ? null : newUserData.hobbies;
      this.dataBase.users[userIndex] = newUser;   
      console.log(newUser);   
      return newUser;
    } 
    throw new Error('Invalid user id');
  }

  private isValidAge(age: any) {
    if (typeof age === 'number' && age >= 0 && age <= 150) return true;
    return false;
  }

  private isValidUserFields(user: IUser) {
    if ( typeof user.username === 'string' && this.isValidAge(user.age) && Array.isArray(user.hobbies)) {
      return true;
    }   
    return false;
  }
}