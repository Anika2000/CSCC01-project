### POST requests for users:

The POST API with routing "user/add" will add a new user upon signing in, to the database. 
One would send a POST request with url "http://localhost:5000/user/add" with a JSON body as 
request body. The JSON body has to be in form, 
` ` `
{
  "user_email" : "a string",
  "user_password" : "a string",
  "user_type" : "job-seeker"
 }
 ` ` `

One can use job-seeker for user_type or use employer depending on the user that is singning up. 
The response body would be,
` ` ` 
{
  "acknowledged": true,
   "insertedId": "615fba4cf456bd37c2641806"
}
` ` ` 
Here the insertedId is the ID of the object in our collection. This POST API also ensures 
that we don't add a user with existing email in our users collection. So all user emails need to be unique 
for the request to be successful. If the email is not unique, then one gets back the string "User cannot be added". 
If there is an error with insertion then an error will be thrown. 

### GET Requests for users: 
The GET API with routing "/useremail/:useremail" will fetch the first document of a user with the 
given useremail in the parameter of the url, in our case ":useremail". One would send a GET request 
with the url "http://localhost:5000/useremail/an_existing_useremail and then will get back the document in
JSON format. On error, the response will not be a document but will show an error message indicating the problem. 
An example of a successful response body, 
` ` `
{
    "_id": "615fba4cf456bd37c2641806",
    "user_email": "dummyMe@gmail.com",
    "user_password": "123",
    "user_type": "job-seeker"
}
` ` `

The GET request with routing "/users/" will fetch all the documents in the collection "users". One would send a 
get request with url "http://localhost:5000/users/"and will get back an array or Json objects that shows all the
current documents in the "users" collection.  