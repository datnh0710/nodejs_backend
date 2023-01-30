const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(401).json({message:'Unauthorized request'});
		}
		const token = request.headers.authorization.split(' ')[1]; 
		if ( token === 'null' ){                                              //No token
			return response.status(401).json( {message:'Unauthorized request'} )  //Send back with 401 status
		}

		const { payload } = jwt.verify(
			token,
			process.env.JWT_SECRET
		);

		if ( !payload ) {                                                     //Not valid
			return response.status(401).json( {msg:'Unauthorized request'} )  //Send back with 401 status
		}
		request.userId = payload.subject 										//Embed user id into request
		next();
	} catch (error) {
		console.error(error);
		return res.status(401).send(`Unauthorized`);
	}
};