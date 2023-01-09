import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import http from 'http';
import { v4 as uuid } from 'uuid';
import { IUser } from './models/user.js';
import { DataBase } from './models/database.js';


dotenv.config();


//console.log(`Server starts on host = ${process.env.HOST} PORT = ${process.env.PORT}`);
const PORT = Number(process.env.PORT);
const HOST = process.env.HOST;
enum METHODS {
  get = 'GET',
  post = 'POST',
  update = 'UPDATE',
  delete = 'DELETE'
} 

const dataBase = new DataBase();

const server = http.createServer((req, res) => {
  //res.writeHead(200, { 'Content-Type': 'application/json' });
  res.setHeader("Content-Type", "application/json");
  console.log(req.url);
  let body = '';
  switch (req.url) {
    case '/api/users':
      switch (req.method) {
        case METHODS.get:
          res.writeHead(200);
          res.end(JSON.stringify(dataBase.getUsers()));
          break;
        case METHODS.post:
          console.log('POST');          
          req.on('data', function(data) {
            body += data
            console.log('Partial body: ' + body)
          })
          req.on('end', function() {
            console.log('Body: ' + body);
            try{
              const newUser = dataBase.addUser(body);
              res.writeHead(201);
              res.end(JSON.stringify(newUser));
            } catch (e) {
              res.writeHead(400);
              res.end(e);
            }            
          })
          break;
      }  
      break;  
    default:
      res.writeHead(404);
      res.end(JSON.stringify({error:"Resource not found"}));
  }
});

server.listen(PORT,HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)}
  );