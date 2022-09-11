# Health Tracker

Health Tracker is an app to help people better understand and take control of their own health. Users can enter their test results for a number of tests, track their progress, get more information on what the test results mean and find a local doctor in their area.

To view a demo of Health Tracker, click [here](insert link once deployed)

You can create your own account, or use the demo account below to iew to the app.

```
username: [insert once delpoyed]
pasword: [insert once deployed]
```

---

## Introduction

Health Tracker is an app to help empower people to take control of their health. Australia's healthcare system is currently strained and has been under significant pressure for the past few years. These pressures have been compounded by shortages in several key professions including General Practitioners, nursing and mental health.

If more Australian's are able to better manage their health, we can both improve or continue to live a healthy, happier life as well as reduce the current burden on the health system.

Health Tracker is a simple app to help people better manage their own health. Users can input the results of different health metrics and test to monitor their health status. It provides easy to understand visualisations to show the users if there has been any changes to the health. It also facilitates access to reputable websites and information sources already available for further information.

Health Tracker is not intended to be a replacement for professional medical advice. Rather, it is a tool assist users to be more aware of their health indicators and the potential impacts of lifestyle choices.

Health Tracker can also help a user find a medical professional near them, if they require medical advice.

Their are many fitness and food tracking apps available on the market to help people maintain and healthy and active lifestyle, however Health Tracker is focused on educating people on their health status and the potential impacts that their lifestyle choices can have.

This application was developed as the fourth project in completing the General Assembly Software Engineering Immersive course. I was allocated nine days to develop a full-stack CRUD application based on the [brief](https://git.generalassemb.ly/seir59anz/seir59anz-course-materials/tree/main/python/project) provided.

---

## App Development

The Health Tracker app was developed using:
- Python
- Flask
- postgreSQL
- React
- CSS

The app also utilised libraries and packages including:
- Google Maps and Nearby Search APIs for the Find a Doctor feature (not yet completed)
- Material UI components for styling and UX/UI.
- Fusion Charts for the health metrics data visualisations

The app was deployed using Heroku (confirm once deployed).

### Rationale

I decided to develop the app using Python and SQL for the backend as I had limited exposure to these languages and wanted to develop my skills for each.

I chose to develop the Health Tracker app as, studying a health degree and working in Australia's healthcare system for over 10 years, I have always been passionate about helping people to improve their health. Working in variety of government roles, I became very aware of how much focus is on reactive healthcare, once a person has already developed an illness or disease, and much less so on preventative healthcare. However, if there is more investment in preventitive healthcare, we can improve people's quality of life (through potentailly avoiding certain diseases), reduce the costs and strain for the healthcare system (as less people would require healthcare). 

The Health Tracker app could be a small tool in prevenatative healthcare to help people be more educated and aware for their own health, and therefore make active decisions or take action to reduce their risks of developing preventable diseases later in life.

### User Stories

Sample user stories for the project:

- "As a consumer, I want to input my test results so I can track them"

- "As a consumer, I want to view my historical test results so I can see my progress"

- "As a consumer, I want info on the tests to better understand what the results mean"

- "As a consumer, I want to be able to find local GPs so I can seek medical advice when needed"

- "As a consumer, I want to store my details so that I don't need to reenter them again"

- "As a consumer, I want to know where my results rank compared to the rest of the population"

- "As a consumer, I want ability to share my data so my doctor can review my results"

### Planning Process

In planning the project, I first considered what goals I wanted to achieve for myself and my own development through the project, these were:

- Practice using Python and SQL.

- Practice using relational databases

- Practice using React and React packages

- Incorporate a map API.

I then used a MVC (model, views, controllers) structure to develop the proposed MVP (minimum viable product) and stretch tasks for the app:

![MVP Planning](./readme-images/Health%20Tracker%20-%20MVP%20%26%20Stretch%20Goals%20Planning.jpg)

### Wireframing

Once the MVP was established, wireframes were developed to mock up the views for the app:

![Wireframes](./readme-images/Health%20Tracker%20-%20Wireframes.jpg)

Miro was used to develop the wireframes and MVP.

---

## Screenshots

Home Screen

![Home Screen](./readme-images/Health%20Tracker%20-%20Home%20Screen%20.png)

Health Metric Detailed View (add new or delete entries)

![Details Screen](./readme-images/Health%20Tracker%20-%20Detail%20Screen.png)

Find A Doctor Screen

![Find a Doctor Screen](./readme-images/Health%20Tracker%20-%20Find%20Doctor.png)

User Account Details Screen

![User Account Details Screen](./readme-images/Health%20Tracker%20-%20Account%20Details.png)

Sign In Screen

![Sign in Screen](./readme-images/Health%20Tracker%20-%20Sign%20In.png)

---

## Hurdles & Challenges

In developing this app I encountered a number of challenges (both expected and unexpected).

#### New Languages

Prior to this project, my exposure to Python, Flask and SQL was limited. I decided to use these languages/packages to develop my skills in each, however this also reslulted in increased time to develop functions and features as I learnt how to implement them on the go.

#### Major Bug

On the due date of the project, I experienced a major bug with rendering the the detailed views of the health metrics. Using React in the front end, when fetching the data and rendering new a view, state had stopped updating all of a sudden resulting in multiple console errors. 

As a first step, I tested multiple links, views, requests, queries to re-create the error and establish exactly what would cause it to occur. On the initial load of a detailed view, the data would be fetched from the API and state loaded, however when navigating to another metric or updating the view, state would not reload, resultsing in errors attempting to render the graph and table.

To try to resolve this issue, I went back through the code the I had recently written to see if there was a way that it could have affected state and caused the error. While it was unlikely, as this code was for completely different feature and view, I double checked anyway.

I continued troubleshooting and enlisted the help of our lead instructor. While it was unclear to both of us as to what exactly was causing state to not update after the initial render, we could only theorise that it may have been related to the way that the data was nested when API sent its response and that as the app began grew larger, the scale resulted in the state not being updated quick enough.

In the end, I refactored the queries to the database in the back end so that the data provided to the front end was nested one less level and re-wrote the metrics.jsx file and this resolved the bug.

#### Integrating Google Maps API & Neaby Search

One of my goals for this project was to use Google Maps and Nearby Search to allow users to enter their postcode or suburb and return a list of doctors near their location. 

While I was able to integrate the Google Maps API, unfortunately I was unable to implement the Nearby Search functionality. This was primarily due to the time limitations following the major bug above and the Google documentation proving difficult to follow. I intend to complete this feature in the future.

---

## Future Updates

Due to the time constraints of the project, there were a number of features I was unable to implement, but are planned for the future, including:

- Complete the 'Find A Doctor' functionally using Google Maps API and Nearby Search. Potentially expand to also include features such as 'Find A Gym'.
- Add additional health metrics including blood pressure, cholesterol, body mass index etc.
- Expand the additional information available to users, such as links to reputable websites related to healthy eating and exercise.
- Make the more dynamic providing realtime feedback to users. For example, letting them know if a metric, such as resting heart rate, is in a 'healthy' range for their age or displaying a message (e.g. "Great job, you've reduced your blood pressure by ... since your last test) to encourage users to continue and maintain health habits.

---


