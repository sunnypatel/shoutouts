/**
 * EventsController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var https = require('https');
var fs = require('fs');

module.exports = {
	buildEventClip: function(req, res){
		var eventid = req.param('eventid');

		Events.findOne({eventid: eventid})
		.populate('videos')
		.exec(function(err, eventObj){
			if (err) {
				console.log(err);
				res.serverError(err);
			} else {
				console.log(eventObj);
				eventObj.videos.forEach(function(video){
					console.log(video.url);
					var dir = sails.config.appPath + "/videos/" + eventid + '/';
					if (!fs.existsSync(dir)){
						fs.mkdirSync(dir);
					}
					var file = fs.createWriteStream(dir + video.filename);
					var request = https.get(video.url, function(response){
						response.pipe(file);
					});

				});
				res.ok(eventObj);
			}
		})
	}
};

