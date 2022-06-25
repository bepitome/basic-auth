#!/bin/bash

# import accounts collection
mongoimport --host mongodb --db bauthdb --collection users --type json --file /usr/src/app/mongo_seed/accounts.json --jsonArray