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
Fake task validation<br/>
Task status: forbid transaction start depending on task status (SAVING...)<br/>
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

# Notes about transactions
Transactions do not work as all the tasks are discarded/saved when a discard/save is dispatched:
if a transaction is ongoing while the response for a validation/save is received, discarding
the current transaction will also discard the response's integration into the store.
Overhaul of the transaction system necessary.

Solution 1:
Keep the current reducer for transaction and use it only to discard or not the changes made in a task. Does not fix issue described above...

Solution 2:
Overhaul of transaction reducer: integrate the transaction reducer in the task reducer.
At the start of the transaction, add the started task in a data structure (to determine):
it will be this task which will be updated by every actions (add article, update quantity...).
When the transaction is over (changes discarded or saved), the task is removed from the data structure and its content integrated or not with the rest. 