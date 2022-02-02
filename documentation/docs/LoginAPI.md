# Login API Endpoints

The job API endpoints can be found in the `job` route under `/backend/routes/login.js`. The corresponding collection in our database is named `users`.

## GET

### `/login`

The GET endpoint `/login` checks whether there is a user with specific username and password in database. 
If such user exists, function `sessionCreate` will be called to insert a new session to database and then the session info will be sent back to frontend.
A GET request should be sent to the backend server at the endpoint above.
The request body of such a request would be a JSON object with a form, 

```js
{
  "username": "string",
  "password": "string",
}
 ```
 
The response of such a request would be a JSON object with a form as follows:

```js
{
  "username": "string",
  "session_key": "string",
  "expiration_date": "Date",
  "created_at": "Date",
}
```

### `/login/check`

The GET endpoint `/login/check` checks whether a session is not in the database or expired by calling function `sessionCheck`.
The request body of such a request would be a JSON object with a form, 

```js
{
  "username": "string",
  "session_key": "string",
  "expiration_date": "Date",
  "created_at": "Date",
}
 ```
 
The response of such a request would be a JSON object with a form as follows:

```js
{
  "username": "string",
  "session_key": "string",
  "expiration_date": "Date",
  "created_at": "Date",
  "sessionValid": "Boolean",
}
```
