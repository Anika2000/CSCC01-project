# Sprint 3 Planning meeting

## Participants, Sprint Goals, Spikes

In our Sprint 3 planning meeting, the group Drop Table Teams (consisting of Jan, Christina, Anika, Jiale, Kourosh, Mohammed, and Raymond) decided that our sprint goal will be to implement the job fair feature. Employers will be able to host job fairs, and job seeker users can attend these job fairs. The other features to be implemented are the notifications for upcoming meetings and job fairs, and the web extension autofill job application features. Two spikes are the web extension feature and video conferencing integration using a third party API. None of our team members have past experiences implementing these features. The team members assigned these tasks worked collaboratively, researched and reviewed documentation to further their knowledge which aided with implementation. These features were broken down into multiple sub tasks to aid in completing it. 
 
## User stories
- As a job-seeker, I want to see notifications for upcoming interviews / meetings so that I do not forget to attend an important meeting (Notifications for upcoming interviews / meetings, 22 points) (DTT-12).
- As an employer, I want to host a job fair so that I can showcase my company, attract new talent and give them information about the jobs available (Host job fair feature, 42 points) (DTT-11).
- As a job-seeker, I want to attend a job fair so that I can gain information about a job I am unsure of / don’t know about (Attend job fair, 22 points) (DTT-14).
- As a job-seeker, I want to use the platform on third party websites in order to expedite the application process on these sites (Add web extension feature, 45 points) (DTT-16).
- As an employer, I want to introduce the platform to a company portal so that its features are conveniently available for applicants with an account (Company portal integration, 47 points) (DTT-15).
- As an employer, I want to view the 90 second elevator pitches of job applicants so that I can find evaluate potential employees (Add Elevator Pitch Connection) (DTT-84, 15 points).

## Task Breakdown

DTT-84 Add Elevator Pitch Connection
- Establish the connection to the database in order to retrieve the videos

DTT-12 Notifications for upcoming interviews / meetings
- Integrate a video conferencing (e.g. Zoom) API
- Create frontend components of notifications on dashboard
- Create API endpoints to retrieve data on upcoming interviews/meetings

DTT-11 Host job fair feature 
- Add an employer page to schedule a new job fair.
- Add an employer page to view and update his or her scheduled job fairs.
- Add the necessary API endpoints for scheduling a new job fair (fairs/add).
- Add an API endpoint for marking fairs as ended (fairs/remove).

DTT-14 Attend job fair 
- Add job seeker component to view upcoming job fairs
- Retrieve schedule of upcoming job fairs
- Add job seeker page to view an individual job fair
- Add API endpoints to attend a job fair 

DTT-16 Add web extension feature 
- Set up web extension
- Integrate user system (login, signup, session) into web extension
- Implement auto-fill feature
- Create frontend view for extension

DTT-15 Company portal integration 
- Create and Remove Company API keys.
- Create an api access system for information related to jobs listings.
- Create “api/joblisting” route which retrieves all applicants.
- Create “api/applicant/view” which allows you to view the applicants resume and cover letter.
- Create "api/joblisting/statistics".

DTT-84 Add Elevator Pitch Connection
- Establish the connection to the database in order to retrieve the videos

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

Our team of 7 can commit (19 hours)*(10 days)=190 hours of work to complete 193 points.
