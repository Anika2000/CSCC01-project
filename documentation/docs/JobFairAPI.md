# Fair API Endpoints

The fair API endpoints can be found in the `fair` route under `/backend/routes/fair.js`. The corresponding collection in our database is named `fairs`.

## POST

### `/fair/add`

The POST endpoint `/fair/add` can be used to add a new job fair to our database, consisting of its scheduled date, time, and description.
A POST request should be sent to the backend server at the endpoint above with a body comprised of a JSON object of the following form:

```js
{
  "title": "string",
  "description": "string",
  "host": "string",
  "start": "string",
  "end": "string"
}
```

The response body would be an object of the following form:

```js
{
  "acknowledged": "boolean",
  "insertedId": "string"
}
```

Were `insertedId` would correspond to the ID of the object in our collection.

### `/fair/id/:id/posts`

The POST endpoint `/fair/id/:id/posts` can be used to add a new job fair post to our database, consisting of a title, description and image, 
as well as the id of the fair it belongs to. A POST request should be sent to the backend server at the endpoint above with a body comprised of a JSON object of the following form:

```js
{
  "title": "string",
  "description": "string",
  "avatar":"file",
}
```

The response body would be an object of the following form:

```js
{
  "acknowledged": "boolean",
  "insertedId": "string"
}
```

Where `insertedId` would correspond to the ID of the object in our collection.


## GET

### `/fair/id/:id`

The GET endpoint `/fair/id/:id` can be used to access a job fair by id.
A GET request should be sent to the backend server at the endpoint above. 
The response of such a request would be a JSON object with a form as follows:

```js
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "host": "string",
    "start": "string",
    "end": "string"
  }
```

The `_id` field of the returned fair correspond to the fair's `insertedId` number generated upon addition to the database.

### `/fair/id/:id/posts`

The GET endpoint `/fair/id/:id/posts` can be used to access an array of job fair posts in the database by the fair id.
A GET request should be sent to the backend server at the endpoint above. The response of such a request would be a JSON object with a form as follows:

```js
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "avatar":"file",
  },
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "avatar":"file",
  },
  ...
]
```

The `_id` fields of the returned array elements correspond to the posts' `insertedId` numbers generated upon addition to the database.


### `/fairs/upcoming`

The GET endpoint `/fairs/upcoming` can be used to access an array of job fairs in the database. 
It only returns a list of job fairs which have not yet ended, ie any with end times greater than the current.
A GET request should be sent to the backend server at the endpoint above. The response of such a request would be a JSON object with a form as follows:

```js
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "host": "string",
    "start": "string",
    "end": "string"
  },
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "host": "string",
    "start": "string",
    "end": "string"
  },
  ...
]
```

The `_id` fields of the returned array elements correspond to the fairs' `insertedId` numbers generated upon addition to the database.


### `/fairs/upcoming`

The GET endpoint `/fairs/host/:host` can be used to access an array of job fairs in the database.
It only returns a list of job fairs which are hosted by the given host username.
A GET request should be sent to the backend server at the endpoint above. The response of such a request would be a JSON object with a form as follows:

```js
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "host": "string",
    "start": "string",
    "end": "string"
  },
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "host": "string",
    "start": "string",
    "end": "string"
  },
  ...
]
```

The `_id` fields of the returned array elements correspond to the fairs' `insertedId` numbers generated upon addition to the database.

## PUT

### `/fair/id/:id/posts`

The PUT endpoint `/fair/id/:id/attend/:user` can be used to update a job fair in the database, adding the given user to 
the list of attendees within a document the fairs collection, which corresponds to an individual fair.
A PUT request should be sent to the backend server at the endpoint.

The response body would be an object of the following form:

```js
{
    "acknowledged": "boolean",
    "modifiedCount": "integer",
    "upsertedId": "string",
    "upsertedCount": "integer",
    "matchedCount": "integer"
}
```

Where `upsertedID` would correspond to the ID of the modified fair document in our collection.

## DELETE

### `/fair/id/:id/`

The DELETE endpoint `/fair/id/:id/` can be used to delete a fair from the database by ID.
It also deletes all corresponding posts. A DELETE request should be sent to the backend server at the endpoint.

The response body would be an object of the following form:

```js
{
    "acknowledged": "boolean",
    "deletedCount": "integer"
}
```

### `/fair/posts/:id`

The DELETE endpoint `/fair/id/:id/` can be used to delete a fair post from the database by ID.
A DELETE request should be sent to the backend server at the endpoint.

The response body would be an object of the following form:

```js
{
    "acknowledged": "boolean",
    "deletedCount": "integer"
}
```

