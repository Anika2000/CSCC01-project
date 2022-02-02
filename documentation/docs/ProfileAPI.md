### POST requests for profiles:

#### POST: /profile/add

The POST API with routing "profile/add" will add a new user profile to the database. 
You would send a POST request with url "http://localhost:5000/profile/add" with a JSON body as 
request body. The JSON body has to be in form, 

```
{
  "user_name": "string",
  "first_name": "string",
  "last_name": "string",
  "phone":"string",
  "bio":"string",
  "avatar":"file",
  "resume":"file",
}
 ```
 
The response body would be,

```
{
  "acknowledged": true,
  "insertedId": "616085130cc66ca4a43fc7a1"
}
``` 

Here the insertedId is the ID of the object in our collection. This POST API also insures 
that we don't add a profile with existing username in our database. So all usernames need to be unique 
for the request to be successful. On error, we will get back the string "User cannot be added". If there is 
an error with insertion then an error will be thrown.  

The files (resume,avatar) in req body will be converted to Binary data in backend before they are sent to the database.

#### POST: /profile/update/:user_name

The POST API with routing "profile/update/:user_name" will update a existing profile in the database collection "profiles". 
You would send a POST request with url "http://localhost:5000/profile/update/:user_name" with a JSON body as 
request body. The JSON body has to be in form, 

```
{
  "user_name": "string",
  "first_name": "string",
  "last_name": "string",
  "phone":"string",
  "bio":"string",
  "avatar":"file",
  "resume":"file",
}
```
 
An Example:

URL: ```http://localhost:5000/profile/update/john.hi@gmail.com```

Req body:
```
{
  "user_name": "http://localhost:5000/profile/update/john.hi@gmail.com",
  "first_name": "John",
  "last_name": "Hi",
  "phone":"111111111",
  "bio":"",
  "avatar":"Avatar.jpg",
  "resume":"myResume.pdf",
}
```
Response body:

```
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
``` 
The files (resume,avatar) in req body will be converted to Binary data in backend before they are sent to the database.

If there is any error with updating, you would be thrown an error message. 

### GET Requests for profiles:

#### GET: /profile/:user_name

The GET API with routing "/profile/:user_name" will fetch the first document of a user with the 
given username in the parameter of the url, in our case ":user_name". You would send a GET request 
with the url "http://localhost:5000/profile/:user_name" and then you will get back the document in
JSON format. On error, you would be thrown an error message. 

An example:

URL: ```http://localhost:5000/profile/mike555@gmail.com```

Response Body:
```
{
    "_id": "615f72bd8f3475a85fed6ad9",
    "user_name": "mike555@gmail.com",
    "first_name": "Mike",
    "last_name": "ABC",
    "phone": "555555555",
    "bio": "",
    "avatar": Binary('', 0),
    "resume": Binary('', 0),
}
```
The files (resume,avatar) are stored as Binary data on Mongodb, and will then be converted to Base64 on frontend.

#### GET: /profile

The GET request with routing "/searchprofile" will fetch all the documents in the collection "profiles", with only
the user_name, email, first_name, last_name, and avatar of the users to make searching faster and more efficient.
You would send a get request with url "http://localhost:5000/profile" and will get back an array or Json objects
that shows the documents as wanted.


#### GET: /profile

The GET request with routing "/profile" will fetch all the documents in the collection "profiles". You would send a 
get request with url "http://localhost:5000/profile" and will get back an array or Json objects that shows all the
current documents in the database. 
