# Basic Authentication project

## Project Description

In this project you will learn how to deal with `Basic Authentication`.

### What is Basic Authentication?

[Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) is a simple authentication scheme built into the HTTP protocol. The client sends HTTP requests with the Authorization header that contains the word Basic word followed by a space and a base64-encoded string `username:password`.

---

### Installation

You have the choice to run the project using docker or locally. If you want to go with Docker no need to install nodejs and mongodb, and if you want to go with local no need to install docker.

- [docker](https://docs.docker.com/get-docker/)
- [nodejs](https://nodejs.org/en/download/)
- [mongodb](https://www.mongodb.com/docs/manual/installation/)

> We are going to deploy the APIs on cloud to allow you interact with the APIs without install anything. (wait for it)

### Run project with Docker

```bash
# run and install all the dependencies (prefered for fresh installation only)
npm run install

# run docker container using Makefile
make run  # run container
make stop # stop container

# run docker container using npm script
npm run docker
```
### Run project locally

```bash
# serve node apis locally
npm run local
```

### Test your changes

```bash
# run lint & pre-commit hooks at the same time
npm run prepare 
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

<<<<<<< HEAD
- Display user profile (first name, last name, email, username, company, gender)

- Add teammate section (you should display all the employees who is working at the same company as a list below user profile.)
||||||| parent of ba9eaa9... added user-id in login api
> You should receive a valid token to be used for other APIs.

- Design and display user profile.
- Add the below functionalities for the user:
  - Reset password
  - Delete account
=======
- Display user profile (name, email, 
>>>>>>> ba9eaa9... added user-id in login api

> You should receive a valid token to be used for other APIs.
> There is postman collection to know more about the available APIs with file name (basic-auth-postman-collection.json)

---

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Click [here](https://github.com/bepitome/basic-auth/issues/new/choose) to report a new issue.

### License

[MIT](https://choosealicense.com/licenses/mit/)
