# Architecture

How is eartrainr going to be structured? What technologies are going to be used?

Typical workflow:

- Go to eartrainr.app (or something similar)
- Click on a button to create a new problem set
- This takes you through a config process which allows you to set parameters from a "settings" panel or something related
- Finally the actual activity shows up
- You can share this activity by providing a link to people who want it
- No sign in required!

## Frontend

- React
- ChakraUI
- React-router

- Homepage: provides basic info and a button to create a new activity (maybe allows choosing link slug?)
- Activity config page : The activity can be configured (this happens immediately after an activity is created but also anytime after)
- Activity page itself: The activity can be done here

## Backend

- Express
- MongoDB

- User clicking button on frontend sends POST request to backend, which creates a new activity with a unique ID, and sends the id back to the front end
- Frontend redirects to activity config page and gets all config info from backend with a GET request
- Changes are made and saved with a PUT request to the backend
- Front end then redirects to the activity itself loaded with info from the backend (gotten with same GET request)

- User might also simply go to eartrainr.app/SOMEIDHERE, in which case a GET request for that activities info is sent and then the activity is loaded again

- All of this is managed by a single RESTful endpoint on the backend (/activity)

  - GET /activity/ID -> gets all config info about an ID
  - POST /activity -> creates new activity and gives back its ID
  - PUT /activity/ID -> sets/updates config info for an ID
  - DELETE /activity/ID -> deletes the activity and its ID

- Internally activities are stored as simple objects in a Mongo DB

- The backend and frontend don't have to be served from the same place!
