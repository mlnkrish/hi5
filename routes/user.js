var client = require("./../lib/redisClient").client();
var Q = require('q');

exports.register = function(req, res) {
	var registration = req.body;

	Q.ninvoke(client, "sadd", "users", "user:" + registration.name).then(function(result) {

		Q.invoke(client, "hmset", "user:" + registration.name, "name", 
			registration.name, "phone_number", registration.phone_number, 
			"device_id", registration.device_id, "token", registration.token, 
			"platform", registration.platform).then( function(result) {
			res.send('registered');
		})
		}).
		catch (function(error) {
			res.send('error');

		}).done();

	};