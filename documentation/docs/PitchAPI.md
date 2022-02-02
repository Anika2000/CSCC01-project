# Pitch API Endpoints

The pitch API endpoints can be found in the `pitch` route under `/backend/routes/job.js`. The corresponding collection in our database is named `joblistings`.

## POST

### `/pitch/add`

The POST endpoint `/pitch/add` can be used to add a new elevator pitch to our database, stored using GridFSBucket.
A POST request should be sent to the backend server at the endpoint as a multipart form request with a request body of a JSON
object with a request body comprised of:

```js
{
  "username": "string"
}
```

As well as a `files` form parameter containing the video file itself. Upon completion, the response body sends the string: 
```js
 "Done uploading"
```


## GET

### `/pitch/watch/:user`

The GET endpoint `/pitch/watch/:user` gets the given user's elevator pitch video. A GET request should be sent to the backend server at the endpoint above. 
The response of such a request is first `206 Partial Content` code with Content-Range and Content-Length headers
for the video player. Then the video player receives a continuous file stream piped from GridFSBucket's storage.

