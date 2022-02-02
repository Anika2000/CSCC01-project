# Sprint 4 Planning meeting

## Participants, Sprint Goals, Spikes

In our Sprint 4 planning meeting, the group Drop Table Teams (consisting of Jan, Christina, Anika, Jiale, Kourosh, Mohammed, and Raymond) decided that our sprint goal will be to implement the bulk of our remaining user stories and to improve frontend design. These user stories include the ability of an employer to view elevator pitches, and job seekers to be able to apply for any job they wish to. The other features to be implemented are the notifications to be real-time on the website, the web extension feature would be able to autofill job applications on our website, schedule meetings with a specific applicant, search for specific jobs, the ability of employers to view all the applications to a job they have posted, attend a job fair, and view profiles of other users. There was one spike in this sprint and it was integrating the video conferencing feature using a third-party API. The team members assigned these tasks collaboratively, researched and reviewed documentation to further their knowledge which aided with implementation. These features were broken down into multiple sub-tasks to aid in completing them. 
 
## User stories
- As an employer, I want to view applications for a particular position and favourite ones that interest me. (Employers can view the applications feature, 15 points) (DTT-100)
- As a job-seeker, I want to be able to apply to any jobs I wish (Apply to job feature, 15 points) (DTT-103)
- As an employer, I want to be able to schedule meetings with specific applicants. (18 points)(DTT- 99)
- As an employer, I want to view and have access to the 90-second elevator pitches of job applicants so that I can find and evaluate potential employees. (15 points) (DTT-101) 
- As a job-seeker, I want to attend a job fair so that I can gain information about a job I am unsure of / don’t know about. 
(22 points) (DTT-102)
- AS a job-seeker, I can search for desired jobs using the search bar. (20 points) (DTT-105)
- As an employer, I want to be able to schedule an online meeting with the applicants using the video conference feature. (35 points) (DTT-106)
- As a job-seeker and employer, I want to see notifications for upcoming interviews/meetings so that I do not forget to attend an important meeting (Notifications for upcoming interviews/meetings, 15 points) (DTT-107)
- As a job-seeker, I will be able to utilize the extension autofill feature on Easy App-ly itself (35 points) (DTT-108)
- As an employer and job-seeker, I can view profiles that I have searched for and be presented with the other user's name, bio, contact info and elevator pitch (15 points) (DTT-109)

## Task Breakdown

DTT-100 Employers can view the applications.
- Create an API endpoint to retrieve data on the job applicants 
- Create frontend component of applicants information 
- Create the ability to view pdf files 
- Create the ability to favourite applicants based on preference 

DTT-103 Job seekers can apply for a job
- Update Job Seeker front end to allow users to apply for jobs
- Persist applications to jobs for applicant lookup

DTT-98 Improve the visual design of the website's UI
- Improve the overall website design 

DTT-99 Employers can schedule interviews with specific users
- Update schedule meeting front end for selecting specific users
- Create an empty profile when a new user signs up
- Improve API endpoint for creating meetings
- Update job posting and schedule interviews with session

DTT-101 Employers can view elevator pitches
- Establish the connection to the database to retrieve the videos
- Change elevator pitch submission to use GridFS instead of binary storage

DTT-102 Job seekers can view employer job fair posts
- Add job seeker component to view upcoming job fairs
- Retrieve schedule of upcoming job fairs
- Add API endpoints to attend a job fair

DTT-105 Job seekers can search the jobs board
- Show jobs based on search
- Navigate to search profile

DTT-106 Users can schedule online meetings
- Zoom API has been integrated into the codebase
- Implement Zoom POST API to create a meeting
- Update Schedule Meeting webpage UI

DTT-107 Notifications are real-time

DTT-108 Extension autofill feature can be used on Easy App-ly itself
- Update extension front end
- Improve fill form function to handle inputs with event listeners

DTT-109 Users can view other profiles
- Create front end view
- Link frontend view to existing backend API


## Team Capacity

|      Name       | Hours per day to work  |
|-----------------|------------------------|
| Mohammad        | 3                      |
| Jan             | 2                      |
| Christina       | 2                      |
| Kourosh         | 3                      |
| Jiale           | 4                      |
| Anika           | 2                      |
| Raymond         | 3                      |

Our team of 7 can commit (20 hours)*(10 days)=200 hours of work to complete 205 points.
