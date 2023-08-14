# Go Eats Form
This repo houses the frontend form and admin dashboard for Go Eats. The main repo can be found [here](https://github.com/bentohset/go-eats).

## Usage
The form consists of 2 key pages:

**1. User Form**

The user form acts as a data collection method for the ML Model
Users are able to submit reviews of food places with the following inputs:
- Name (Google Maps autocomplete for locations in Singapore)
    - A dropdown list of autocomplete suggestions filtered by location and type
- isChain checkbox (nullifies location in the state)
- average budget
- mood dropdown (single select from preset choices)
- cuisine dropdown (multiple select)
- mealtime dropdown (multiple select)
- rating stars (out of 5)

Upon submitting the form, it sends a POST request to the web server API which inserts this entry into the Database. It is then pending for an approval from the admin before it can be considered for integration with the recommendation system as a form of data preprocessing.

**2. Admin Dashboard**

The admin dashboard acts as a "first line of defence" for accurate data. The admin can edit the fields accordingly and approve or delete them.

A tab toggle is shown to toggle between `Requested` and `Approved` tables:
1. Requested table
- Consists of all user submitted places from the form, pending for approval from the admin.
- Admin is able to edit, approve and delete the entry.

2. Approved table
- Consists of all the approved places in the DB, which the admin has vetted and approved.
- Admin is able to edit and delete an entry.


## Tech Stack
- Next.js in TypeScript, React
- Google Maps API
- Material UI
- Headless UI
- HeroIcons

## Getting Started
**Setup .env variables:**
```
NEXT_PUBLIC_PROD_API_URL=
NEXT_PUBLIC_DEV_API_URL=http://localhost:8080
NEXT_PUBLIC_GOOGLEMAPS_KEY=
```

**Run the development server:**
```
npm i
npm run dev

```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**To run the backend on locally:**
Pull the latest docker image and run it on localhost port 8080
```
docker pull bentohset/go-eats-server:latest
docker run -it --rm -p 8080:8080 go-eats-server
```

or run the server with the repo. Instructions can be found [here](https://github.com/bentohset/go-eats-server).


## Deployment
It is deployed on [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

Considerations of clustering the frontend together with Kubernetes Services vs Deploying externally:
- Clustering together would prove for better security as the frontend can only interact internally with the web server
- Clustering together would introduce complications with regards to DNS of the site. For a free hosted service, a nice URL would not be available.
- Deploying externally with Vercel allows abstraction from the backend and an independent DNS given by Vercel.
- Deploying externally might be less secure as my backend server is exposed publicly through a URL.

## Todo
- pagination
- refactor for code quality