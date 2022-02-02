# Sprint 2 Planning meeting

## Participants, Sprint Goals, Spikes

In our Sprint 2 planning meeting, the group Drop Table Teams (consisting of Jan, Christina, Anika, Jiale, Kourosh, Mohammed, and Raymond) decided that our sprint goal will be to integrate the login feature into the application. As well as start to build our elevator pitch, interview sechduling and user search/system features. There are no spikes for this sprint since the user stories chosen are simple features and have been broken into subtasks and divided amongst team members accordingly.


## User stories
- As a user, I can log-in and automatically be directed to the proper page based on my previous session so that I can access the website from where I left off. (User system, 4 points) (DTT-54)
- As any user, I want to search for other users on the platform so that I can view their profile. (User Search, 8 points) (DTT-6)
- As an employer, I want to schedule a meeting or interview with candidates so that I can move on to the next steps of my hiring process with the selected candidates (Schedule a meeting or interview with candidates, 18 points) (DTT-10)
- As a job-seeker, I want to record / upload a 90 second elevator pitch onto my profile so that I can stand out from other applicants in job applications. (Record and Upload Elevator Pitch, 23 points) (DTT-13)
- As an employer, I want to view and have access to the 90 second elevator pitches of job applicants so that I can find evaluate potential employees (View Elevator Pitch, 15 points) (DTT-18)


## Task Breakdown
User System 
- Create a robust session API
- Remove old session regularly after a certain period of time
- Allow other services to verify user requests, (API key…)
- Improve salting algorithm
- Integrate login features with other pages
- User information 

Schedule Interview 
- Add meeting database storage and retrieval
- Create frontend page where users can schedule meetings
- Create an API endpoint for new meetings/interview creation

View Elevator Pitch 
- Create frontend web-page where the the elevator pitch will be viewed
- Establish the connection to the database in order to retrieve the videos
- Integrate a video player that can be used to view elevator pitches.

Record and Upload Elevator Pitch 
- Create a docker service that stores recordings
- Create an API that allows frontend upload/delete to the backend
- Add a frontend page and requisite components to upload an elevator pitch.

User Search 
- Create API endpoint for searching user
- Create search field on appropriate frontend page
- Improve the profile page the linting-compliance


## Team Capacity

|      Name       | Hours per day to work  |
|-----------------|------------------------|
| Mohammad        | 3                      |
| Jan             | 3                      |
| Christina       | 2                      |
| Kourosh         | 4                      |
| Jiale           | 4                      |
| Anika           | 2                      |
| Raymond         | 3                      |

Our team of 7 can commit (21 hours)*(10 days)=210 hours of work to complete 4+8+18+23+15=68 points.
