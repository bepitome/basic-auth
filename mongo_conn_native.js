const { MongoClient } = require("mongodb");
const config = require("config");

const uri = config.mongo_conn_str;
class Connection {
	static async connectToMongo() { 
		if (this.db) return this.db;
		let mongo_client = await MongoClient.connect(this.url, this.options);
		this.client = mongo_client;
		this.db = await mongo_client.db();
		return this.db;
	}
}

Connection.client = null;
Connection.db = null;
Connection.url = uri;
Connection.options = {
	// poolSize:   10,
	// reconnectTries:     5000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

module.exports = { Connection };
