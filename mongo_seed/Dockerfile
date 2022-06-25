# install mongo image from https://hub.docker.com/_/mongo
FROM mongo

# copy the dummy data from the local containers to the host conatiners
COPY accounts.json /usr/src/app/mongo_seed/accounts.json

# add cmd.sh file (list of linux command)
ADD cmd.sh /usr/src/app/mongo_seed

# make cmd.sh file executable 
RUN chmod +x /usr/src/app/mongo_seed/cmd.sh

# open and execute the commands which inside the file `cmd.sh`
CMD ["/usr/src/app/mongo_seed/cmd.sh"]