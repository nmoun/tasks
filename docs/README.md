# Description
Testing miscellaneous stuff

# Launching
Launch mongo daemon at url specified in .env file

## DEV
npm i<br/>
npm run start

## PROD
npm i<br/>
npm run build<br/>
npm run launch

# Screenshots
![alt text](/docs/test.gif)

# TODO
Transaction status should be entirely independant<br/>
reselect: reorganize selectors<br/>
replace ThemedPage by an hoc?<br/>
refactor Login page<br/>
Reorganize folder structure (separate view & state?)<br/>
language settings<br/>
Compute the subtitle rather than save it<br/>
Modals depending on UI state in store rather than independant<br/>
Persiste date last update to fetch tasks only after a certain amount of time<br/>
auth0?