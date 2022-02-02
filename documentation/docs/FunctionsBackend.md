### Functions Documentation (Backend)
#### sessionCreate
``` 
function sessionCreate (username)
```

* **Description:** Create and insert a new session to database collection "sessions"

* **Parameters:** _username_ An String that represent a unique user's username

* **Returns:** A Json object of session information with fields: "username", "session_key", "expiration_date" and "created_at"

#### sessionCheck
``` 
function sessionCheck (session)
```

* **Description:** Check if a session is expired (was auto-deleted by mongodb or has a expiration_date earlier than current time). If so, delete the session in database.

* **Parameters:** _session_ An JSON object with the following fields: "username", "session_key", "expiration_date", "created_at" and "sessionValid"

* **Returns:** A bollean presents whether the session is expired

#### sessionDelete
``` 
function sessionDelete (session)
```

* **Description:** Delete a session in database.

* **Parameters:** _session_ An JSON object with the following fields: "username", "session_key", "expiration_date", "created_at" and "sessionValid"
