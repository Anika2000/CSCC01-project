### POST requests for creating meetings:

The POST API with routing "meetings/add" will add a new meeting to the database upon submitting schedule meeting form. 
One would send a POST request with url "http://localhost:5000/meetings/add" with a JSON body as 
request body. The JSON body has to be in form, 
` ` `
{
  "attendees" : "a string",
  "date_scheduled" : "a string",
 }
 ` ` `

The attendees field will contain the username of the applicant, the interviewer is trying to schdule a meeting with. Where as, the date_scheduled field will be a string with date, later turned into Date object by the frontend.
The response body would be,
` ` ` 
{
  "acknowledged": true,
   "insertedId": "615fba4cf456bd37c2641806"
}
` ` ` 
Here the insertedId is the ID of the object in our collection. If there is an error with insertion then an error will be thrown. 

### GET Requests for meetings: 

The GET API with routing "/meetings/:id" will fetch the document of a meeting with the 
given id in the parameter of the url, in our case ":id". One would send a GET request 
with the url "http://localhost:5000/meetings/an_existing_id and then will get back the document in
JSON format. On error, the response will not be a document but will show an error message indicating the problem. 
An example of a successful response body, 
` ` `
{
  "_id": "617224c449cf0053dcb1126c",
  "attendees" : "Pam",
  "date_scheduled" : "Fri Oct 29 202106:00:00 GMT-0400 (Eastern Daylight Time)"
}
` ` `

The GET request with routing "/meetings/" will fetch all the documents in the collection "meetings". One would send a 
get request with url "http://localhost:5000/meetings/"and will get back an array or Json objects that shows all the
current documents in the "meetings" collection.  


The GET API with routing "/meetings/:date_scheduled" will fetch the document of a meeting with the given date in the parameter
of the url, in our case ":date_scheduled". One would send a GET request with the url "http://localhost:5000/meetings/an_existing_date
and then will get back the document in JSON format. On error, the response will not be a document but will show an error message 
indicating the problem. 
An example of a successful response body given a correct request, 
` ` `
{
  "_id": "617224c449cf0053dcb1126c",
  "attendees" : "user2",
  "date_scheduled" : "Sun Oct 31 202112:00:00 GMT-0400 (Eastern Daylight Time)",
}
` ` `