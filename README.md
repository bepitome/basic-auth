# Basic authentication project

### Project description

Basic authentication

---

### Installation

You need to install all the below to run the project.

- [docker](https://docs.docker.com/get-docker/)
- [nodejs](https://nodejs.org/en/download/)
- [mongodb](https://www.mongodb.com/docs/manual/installation/)

> We are going to deploy the apis on cloud to allow you interact with the apis without install anything. (wait for us)

```bash
# make install.sh file executable
chmod +x ./install.sh

# run install.sh file to install all project dependencies
./install.sh
```

### Run project

No need run the project if you already run ./install.sh file

```bash
# using Makefile
make run

# docker
npm run docker
```

### Create a new `.env` file in project root and paste the below two lines

```bash
PORT=3000
mongodb_uri=mongodb://localhost:27017/
SECRET=secret
```
