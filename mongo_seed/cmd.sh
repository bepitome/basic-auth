#!/bin/bash

# import accounts collection
mongoimport --host mongodb --db database_name --collection collection_name --type json --file accounts.json --jsonArray