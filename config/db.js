const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		if (process.env.NODE_ENV === 'test') {
			const Mockgoose = require('mockgoose').Mockgoose;
			const mockgoose = new Mockgoose(mongoose);
	  
			mockgoose.prepareStorage()
			  .then(() => {
				mongoose.connect(db,
				  { useNewUrlParser: true, useCreateIndex: true })
				  .then((res, err) => {
					if (err) return reject(err);
					resolve();
				  })
				console.log("mongodb connected in test environment")
			  })
		  } else{
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	}
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

  

module.exports = connectDB;

