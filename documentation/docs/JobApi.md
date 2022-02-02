# Job API Endpoints

The job API endpoints can be found in the `job` route under `/backend/routes/job.js`. The corresponding collection in our database is named `joblistings`.

## POST

### `/job/add`

The POST endpoint `/job/add` can be used to add a new job listing to our database, adding it to the available job listings on our website.
A POST request should be sent to the backend server at the endpoint above with a body comprised of a JSON object of the following form:

```js
{
  "jobTitle": "string",
  "jobCompany": "string",
  "jobDescription": "string",
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

### `/job/:_id/apply`

The POST endpoint `/job/:_id/apply` can be used to add a job seeker to the list of applicants for a job listing on our website. The applicant's identity will be persisted in the database, allowing employers to screen the applicant at their soonest convenience.
A POST request should be sent to the backend server at the endpoint above with a body comprised of a JSON object of the following form:

```js
{ "user": "string" }
```

The response body would be an object of the following form:

```js
{
  "acknowledged": "boolean",
  "insertedId": "string"
}
```

### `/job/find`

The POST endpoint `/job/find` can be used to search job listings on our website.
A POST request should be sent to the backend server at the endpoint above with a body comprised of a JSON object of the following form:

```js
{
  "jobTitle": "string",
  "jobCompany": "string",
  "jobDescription": "string",
}
```

The response body would be an object of the following form:

```js
[
  {
    "_id": "string",
    "jobTitle": "string",
    "jobCompany": "string",
    "jobDescription": "string",
  },
  {
    "_id": "string",
    "jobTitle": "string",
    "jobCompany": "string",
    "jobDescription": "string",
  },
  ...
]
```

Where `insertedId` would correspond to the ID of the object in our collection.

## GET

### `/jobs`

The GET endpoint `/jobs` can be used to access an array of all jobs in the database, which corresponds to all jobs available on the website.
A GET request should be sent to the backend server at the endpoint above. The response of such a request would be a JSON object with a form as follows:

```js
[
  {
    "_id": "string",
    "jobTitle": "string",
    "jobCompany": "string",
    "jobDescription": "string",
  },
  {
    "_id": "string",
    "jobTitle": "string",
    "jobCompany": "string",
    "jobDescription": "string",
  },
  ...
]
```

The `_id` fields of the returned array elements correspond to the jobs' `insertedId` numbers generated upon addition to the database.
