# assignmentSubmissionNoApp
Assignment details:  Create a set of APIs using Node(Express) + MongoDB(mongoose) which should implement the following features.
- Authentication module using jwt 
- Upload and save contact (csv file) through api in db using service workers.  
- contacts sample format: name, phone, email, linkedin profile url

# submission description
<li> Created APIs for authentication using jwt using nodejs, mongodb, expressjs </li>
<li> Uploaded csv contact by using background sync to intercept POST request in service worker </li>
<li> to store multiple POST requests hitted, i used IndexedDb </li>

# steps to set up locally
```
npm install
npm run dev
```
<li> the server will run on localhost:3100 </li>
Login Credentials
<li> email: test@gmail.com | Password: 12345 </li>

# APIs
use postman to hit the apis...
<li> POST @/api/auth/register : to register user, body of request = { name, email, password } </li>
<li> POST @/api/auth/login : to login user, body of request = { email, password } </li>
<li> POST @/api/auth/authenticate : to authenticate the jwt token, body of request = { token } </li>
<br>
<li> GET @/api/contacts : to list all the contacts in the collection </li>
<li> POST @/api/contacts : to add new contact to the collection, body of request = { name, phone, email, linkedin } </li>

