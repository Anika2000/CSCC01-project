# Easy App-ly

## Motivation

Current job searching platforms suffer from a number of drawbacks that make job searching a laborious process. These drawbacks affect both seekers and employers, and are typically connected by the fact that they cost the user time. 

To apply for a job, a seeker needs to prepare materials to convince an employer that he or she is qualified. This typically includes, at the minimum, a resume, cover letter, and a number of references. While some platforms allow a candidate to develop a single resume and submit it for multiple positions, the burden on candidates is worsened should they choose to tailor their supporting documents for each position to which they are applying.

On the flipside, employers are forced to make a decision on which candidate they find to be best suited for a position in an efficient manner. Since an employer cannot put every candidate through the pipeline of interviews and technical examinations due to time and budget constraints, an employer is forced to cut back on a large number of applicants with little information to vet their capabilities.

Finally, many positions at more established companies are not offered on hiring platforms like those mentioned above, but on the companies' own hiring portals; forcing job seekers keen on applying to start the application process afresh without the potential crutch of easy apply features offered by certain application platforms.

To exacerbate the faults with the current job application systems, the job market is currently dealing with a large number of new job seekers, as well as availabilities in the wake of the CoViD-19 pandemic. This has lead to a large market of potential customers for a product that could resolve the issues mentioned above.

This project aims to relieve both job seekers and employers by revolutionising the means by which one applies for jobs. This is accomplished through a web-platform in which we propose a feature allowing job seekers to offer an elevator pitch-style case for the value that they could bring to a company. This could be viewed by employers and would give them better insight into an applicant's temperament in a personable yet time-efficient manner.

Further issues, such as counteracting the inefficiencies borne of private company application portals are met by the introduction of a plugin that allows these companies to include the platform in their application portals. This gives the companies the ability to use all the features of the platform while retaining the prestige, exclusivity and features of their custom portals, as well as allowing applicants the efficiency of applying with their existing Easy App-ly accounts and using Easy App-ly's elevator pitch application method.

## Setup

### Required Tools

[node.js](https://nodejs.org/en/) is required to preview this project. It can be acquired by navigating to [their downloads page](https://nodejs.org/en/download/) and selecting the appropriate installer depending on the operating system used. Alternatively, a package manager could be used to perform the installation; in which case, appropriate instructions to do so are dependent on the package manager used and should be looked up seperately.

To preview this project, begin by cloning the repository to a local machine.

### Dependencies

Once done, navigate to this project's `frontend/` directory and run the command `npm install`. This should install all the dependencies needed to run the project's frontend.

Once done, navigate to the `backend/` directory and similarly run `npm install`. With this, the necessary dependencies needed to run the backend of the project should be installed.

### Launching the Application

For convenience, it is recommended to run the server using the `nodemon` package. This can be installed using the command `npm install -g nodemon`. Once done, navigate to the `backend/` directory and run `nodemon server`. This should bring the server online and should offer a confirmation message seen below:

> Server is running on port: 5000
>
> Successfully connected to MongoDB.

To launch the application, leave the server running and navigate to the `frontend/` directory. Once that is complete, the front end can be launched by running `npm start`. This should open the front end in the existing browser session, or a new session if no session exists.

For sake of experimentation, a simple example of a CRUD system contain a number of pre-filled records has been included based off of [MongoDB's MERN stack setup](https://www.mongodb.com/languages/mern-stack-tutorial).

## Contribution

This project makes extensive use of GitHub issue tracking. To begin contributing, one should first check that his / her issue is not a duplicate of an existing issue. If not, then one should create a new issue for a proposed change, and decorate it with the appropriate labels (bug, feature, etc.).

Upon making a correctly-decorated issue, the matter can be discussed with other contributors to verify and vet the issue. Once the need to institute a change to address the issue is confirmed, someone will be assigned to address it. Optionally, the creator of the issue can self-assign the issue once it has been verified.

Once an issue has been assigned, the assignee should implement the issue in a separate branch. Branch nomenclature should follow the format: `iss/#-issue_name`, where `#` represents the issue number as it appears on GitHub and `issue_name` is the name of the issue (abbreviations permitted).

Commits to the project should follow [semantic commit principles](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716). Commit messages should be kept below 50 characters in length. Longer and more descriptive commit messages should be included as a commit description. Commits should be regular and focused. Commits should avoid introducing errors to previously functional modules in order to protect the integrity of tools such as Git bisect and similar.

Once branches have been populated with all changes that a contributor wishes to make, the contributor can create a new pull request off of the branch to add his or her changes to the master branch. The pull request title should be a brief, descriptive indicator of the change made by the contributor. Any superfluous implementation details should be included in the pull request description. Pull requests should likewise be decorated with the appropriate labels.

Each pull request should have one or more reviewers selected. Ideal reviewers would include past contributors familiar with the modules touched by the change in the pull request.
