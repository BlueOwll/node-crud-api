interface IDatabase {
  [key: string]: []
}

export class DataBase {
  private dataBase: IDatabase = {
    users: []
  };

  public getUsers() {
    return this.dataBase.users;
  }

  public addUser(data: string) {
    console.log(data);
    const   newUser = JSON.parse(data);
    if (newUser instanceof Error) {
      console.error(newUser);
      throw new Error('Incorrect data');
    }
      
    console.log(`adding user ${newUser}`);
    console.log(newUser);
    return newUser;
  }
}