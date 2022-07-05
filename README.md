# Basic Authentication project

## Project Description

In this project you will learn how to deal with `Basic Authentication`.

### What is Basic Authentication?

[Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) is a simple authentication scheme built into the HTTP protocol. The client sends HTTP requests with the Authorization header that contains the word Basic word followed by a space and a base64-encoded string `username:password`.

---

### Installation

You need to install all the below to run the backend.

- [docker](https://docs.docker.com/get-docker/)
- [nodejs](https://nodejs.org/en/download/)
- [mongodb](https://www.mongodb.com/docs/manual/installation/)

> We are going to deploy the APIs on cloud to allow you interact with the APIs without install anything. (wait for it)

### Run project

```bash
# run and install all the dependencies (prefered for fresh installation only)
npm run install

# rerun using Makefile
make run

# rerun using Docker
npm run docker
```

#### Create a new `.env` file in project root and paste the below three lines

```bash
PORT=3000
mongodb_uri=mongodb://localhost:27017/
SECRET=secret
```

---

## Challenge

- Authenticate successfuly using the below test account.
  - username: dbroadbridge4
  - password: fUVh0U1prk

> You should receive a valid token to be used for other APIs.

- Design and display user profile.
- Add the below functionalities for the user:
  - Reset password
  - Delete account

> There is postman collection to know more about the available APIs with file name (basic-auth-postman-collection.json)

---

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License

[MIT](https://choosealicense.com/licenses/mit/)
