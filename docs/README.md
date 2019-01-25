# Description
Testing miscellaneous stuff. Simulates in-store web app.

# Launching
Launch mongo daemon at url specified in .env file

## DEV
npm i<br/>
npm start

## PROD
npm i<br/>
npm run build<br/>
npm run launch

# Screenshots
![alt text](/docs/test.gif)

# TODO
reselect: reorganize selectors<br/>
replace ThemedPage by an hoc?<br/>
Refactor Login page<br/>
Language settings<br/>
Compute the task widget's subtitle rather than save it<br/>
Modals depending on UI state in store rather than independant<br/>
Persiste date last update to fetch tasks only after a certain amount of time<br/>
auth0?