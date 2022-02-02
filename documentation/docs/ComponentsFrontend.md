# Frontend Components

## Landing

The Landing component displays the introduction page which explains the features of the site and allows the users to log in and sign up. It renders a form with a text field and button where a user can enter their email to submit for sign up. There is also a login and sign up button on a navbar rendered at the top of the page. It imports the ModalDialog component to handle user signup.

## ActiveFeature

The ActiveFeature component renders the parent container for all features that a logged in user can access. It imports the NavBar so that all pages have the ability to navigate to any other page that a job-seeker or employer can interact with.

## NavBar

The NavBar component renders a drawer on the left side of the page which all pages outside of the landing page use to allow the user to navigate the main features of the application. There is a list of links at the top of the drawer, and the current user and log out button at the bottom of the drawer.

## Profile

The Profile Component renders a form where users can view and change their profile information.
On render, a GET request will be sent to the API endpoint with routing, "http://localhost:5000/profile/:user_name". The profile component will then get the response of the profile information of the specific user and set the values of the form.
The form requires users to enter their first name, last name, and phone number. Users can upload their avatars by clicking their current avatar, preview their avatars of 3 sizes and delete their avatar by clicking the clear button. Users can also upload, download, and delete their resumes through dropzone. After editing the form, users can submit it by clicking the button, and a submit message will pop up.
On submission, the form will send a POST request to the API endpoint with routing "http://localhost:5000/update/:user_name" if there is an existing profile of the user, or "http://localhost:5000/add" otherwise.


## CreatePosting

The CreatePosting component displays a form where users can create a new job. It renders a form, which has three text fields. The form requires one to enter a job title, the company name, and a job description. A user can add images and use the button to submit a new job. On submission, the form will make a POST request to the API endpoint with routing, “http://localhost:5000/job/add”. After the response, the page gets changed to reflect the new job added to our collection. The createPosting component imports two important components and FileUpload.

## ElevatorPitch

The ElevatorPitch component displays the page where users would submit their elevator pitch. It displays the pitch title, description, and user who created the elevator pitch video. ReactPlayer is used to display videos.

## FileUpload

The FileUpload component renders a container where users can drag and drop files to upload.

## Home

The Home component displays a summary page for the users where users can view notifications, their calendar, and relevant job postings. It imports HomeJobs to display a set of relevant job postings. Users can also search for other users here by using the search bar.

## HomeJobs

The HomeJobs component renders a list of job posting components for the home page within a single container list. It does this by importing a JobPosting component.

## JobPosting

The JobPosting component has a container which displays job information such as company name, job title, and job description. Users can also search for jobs here. It is from here that a user can also click to easy apply to a job, allowing prospective employers to view said user’s resume and elevator pitch.

## Jobs

The Jobs component retrieves all the job postings from the database. The component then displays all required elements of the job posting page (e.g. title, tag displays total job postings, search bar, each job posting card).

## ModalDialog

The ModelDialog component creates the sign up form or login form and receives props from the main App.js file.

## SignupForm

The SignupForm component handles sign up. It displays a sign up form and has two input fields. An email field, which is for inserting your email address and when the form field cannot detect a valid email, it would give an error message, “this field is required, Email is not valid.” There is also a text field for password, where one would get a helper message “Password need to match, have at least one number, on letter, and be at least 7 characters long”, if one does not have the proper password format entered in the text field. A radiogroup tag is used to display the options of user types, which are either Job Seekers or Employers. At the end of the form, is the cancel and sign up button. Users can cancel the sign-up process anytime by using the cancel button and signup to our website using the signup button after the form is completed. On form submission, POST request is made to the user API with endpoint “user/add”. This adds a user to our users collection.

## ScheduleMeeting

The component forms a render where users can input the date and time of the meeting and with whom. The data is then saved into the database unde the ‘meetings’ collection by sending a POST request to the API endpoint with routing, “http://localhost:5000/meetings/add”.

## Login

The Login component handles login. It displays a login form and has two input fields. It receives an email/username input and a password input from users. On submit, a GET request will be sent to the API endpoint with routing, "http://localhost:5000/login" where the username and password is checked. If the username and password are valid, a user session is created and added to the database and then the session info is sent back to the frontend.
If login is successful, session info will be added to cookies and users will go to their home page. If login failed, an alert info will pop up at the bottom of the form.

## ExtensionLanding

The ExtensionLanding component displays the introduction page for the chrome extension and allows the users to log in. It renders a form with a text field and button where a user can enter their email and password to submit for login. It imports the Login component to handle user login. If a session is detected, it will push the user to the homepage of the extension.

## ExtensionHome

The ExtensionHome component displays the homepage where users can see a button for the autofill feature and logout. When the 'AutoFill application' button is clicked, a GET request will be sent to the API endpoint with routing, "http://localhost:5000/profile/:user_name" to fetch the current user's information. And then, It will fill the form on the current tabs with the user's data. If there is no user profile or if there is any error when getting information, an error message will show up at the bottom of the homepage.

## NotificationDialog
This component receives props from App.jsx, returns a dialog and “routes” to Notification which can then display the contents of the dialog.

## Notification
The Notification component displays notification on the homepage. The button “Notification” is clicked by the user which triggers a dialog to pop up. The contents of the dialog are all the upcoming meetings from the “meetings” collection in the database. A GET request is made with API endpoint routing “http://localhost:5000/meetings” which fetches all the current documents from “meetings”.

## CreateMeeting
This component communicates with the Zoom API to schedule a meeting for the user according to their desired specifications.


## HostFair
This component allows an employer to create a new job-fair, with a title, description, date as well as start and end times. A POST request is made to the API endpoint with routing “http://localhost:5000/fair/add” which adds the job fair to the “fairs” collection.

## ViewJobFairList
This component shows a list of job fairs with title, descriptions and times, which differs depending on whether the logged-in user is a seeker or an employer.
If the logged-in user is a seeker, they will see all upcoming job fairs with a GET request “http://localhost:5000/fairs/upcoming”, and is only allowed to attend job fairs that are currently ongoing, where they send a PUT request “http://localhost:5000/fair/id/:id/attend/:user” to show employers that they are attending before viewing the job fair.
If the logged-in user is an employee, they will see all the job fairs they are hosting with the GET request “http://localhost:5000/fairs/host/:host”. They can either view the individual fair or delete it by sending a DELETE request “http://localhost:5000/fair/id/:id”.



## ViewJobFair
The component displays the title and description of a job fair, as well as a list of posts by the employer about the job fair, which contain a title, description, as well as image.
Employers can also delete posts with a DELETE request “http://localhost:5000/fair/posts/:id”. Employers can also see a list of attendees and navigate to their profiles.

## JobFairPost
This component allows an employer to create a new job-fair post for a given job fair, with a title, description and image. On submission, the component sends a POST request “http://localhost:5000/fair/id/:id/posts”

##ViewProfile

The ViewProfile component renders a page where you can view information about users that you search for. The search bar in home sends the email of the user that is searched to ViewProfile, where a GET request with API routing "http://localhost:5000/profile/:user_name" which is then executed to get the needed information about the user that is to be viewed. The component uses the response to display needed information about the user such as their avatar, name, bio, contact information, and elevator pitch.

