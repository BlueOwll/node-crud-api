
import http from 'http';
import { IUser } from './models/user.js';
import { DataBase } from './models/database.js';

enum METHODS {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

enum CODES {
  OK = 200,
  CREATED = 201,
  NOTFOUND = 404,
  BADREQUEST = 400,
  DELETED = 204,
  SERVERERROR = 500
}

enum ERRORS {
  NOTFOUNDRESOURSE = 'Resource not found',
  NOTFOUNDUSER = 'User not found',
  SERVERERROR = 'Server error'
}

const dataBase = new DataBase();

export const server = http.createServer((req, res) => {
  //res.writeHead(200, { 'Content-Type': 'application/json' });
  res.setHeader('Content-Type', 'application/json');
  // console.log(req.url);

  if (req.url === '/api/users') {
    let body = '';
    switch (req.method) {
      case METHODS.get:
        res.writeHead(CODES.OK);
        res.end(JSON.stringify(dataBase.getUsers()));
        break;

      case METHODS.post:
        // console.log('POST');
        req.on('data', (data) => {
          body += data;
        });
        req.on('end', function () {
          try {
            const newUser = dataBase.addUser(body);
            res.writeHead(CODES.CREATED);
            res.end(JSON.stringify(newUser));
          } catch (e) {
            res.writeHead(CODES.BADREQUEST);
            res.end(JSON.stringify({ error: e.message }));
          }
        });
        break;

      default:
        res.writeHead(CODES.NOTFOUND);
        res.end(JSON.stringify({ error: ERRORS.NOTFOUNDRESOURSE }));
    }
  } else if (req.url === '/api/error') {
    res.writeHead(CODES.SERVERERROR);
        res.end(JSON.stringify({ error: ERRORS.SERVERERROR }));
  }else if (req.url.startsWith('/api/users/')) {
    const userid = req.url.replace('/api/users/', '');
    let user: IUser;
    let body = '';
    switch (req.method) {
      case METHODS.get:
        try {
          user = dataBase.getUser(userid);
          if (user) {
            res.writeHead(CODES.OK);
            res.end(JSON.stringify(user));
          } else {
            res.writeHead(CODES.NOTFOUND);
            res.end(JSON.stringify({ error: ERRORS.NOTFOUNDUSER }));
          }
        } catch (e) {
          res.writeHead(CODES.BADREQUEST);
          res.end(JSON.stringify({ error: e.message }));
        }

        break;
      case METHODS.put:
        req.on('data', (data) => {
          body += data;
        });
        req.on('end', () => {
          try {
            user = dataBase.putUser(userid, body);
            if (user) {
              res.writeHead(CODES.OK);
              res.end(JSON.stringify(user));
            } else {
              res.writeHead(CODES.NOTFOUND);
              res.end(JSON.stringify({ error: ERRORS.NOTFOUNDUSER }));
            }
          } catch (e) {
            res.writeHead(CODES.BADREQUEST);
            res.end(JSON.stringify({ error: e.message }));
          }
        });
        break;
      case METHODS.delete:
        try {
          user = dataBase.deleteUser(userid);
          if (user) {
            res.writeHead(CODES.DELETED);
            res.end(JSON.stringify(user));
          } else {
            res.writeHead(CODES.NOTFOUND);
            res.end(JSON.stringify({ error: ERRORS.NOTFOUNDUSER }));
          }
        } catch (e) {
          res.writeHead(CODES.BADREQUEST);
          res.end(JSON.stringify({ error: e.message }));
        }
        break;
      default:
        res.writeHead(CODES.NOTFOUND);
        res.end(JSON.stringify({ error: ERRORS.NOTFOUNDRESOURSE }));
        return;
    }
  } else {
    res.writeHead(CODES.NOTFOUND);
    res.end(JSON.stringify({ error: ERRORS.NOTFOUNDRESOURSE }));
  }
});


