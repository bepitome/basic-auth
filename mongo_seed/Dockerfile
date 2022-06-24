# install mongo image from https://hub.docker.com/_/mongo
FROM mongo

# copy the dummy data from the local containers to the host conatiners
COPY accounts.json accounts.json

# add cmd.sh file (list of linux command)
ADD cmd.sh /

# make cmd.sh file executable 
RUN chmod +x /cmd.sh

# open and execute the commands which inside the file `cmd.sh`
CMD ["/cmd.sh"]