/**
 * VideosController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var AWS = require('aws-sdk');
var fs = require('fs');
var uuid = require('node-uuid');

module.exports = {
	upload: function(req, res) {
		req.file('video').upload({
			maxBytes: 300000000
		}, function whenDone(err, uploadedFiles) {
			if (err) {
				return res.negotiate(err);
			}
			// If no files were uploaded, response with error
			if (uploadedFiles.length === 0){
      			return res.badRequest('No file was uploaded');
   			}
			var file = fs.readFileSync(uploadedFiles[0].fd);
		    var s3 = new AWS.S3();
		    var uuid1 = uuid.v1();
		    var filename = uuid1 + uploadedFiles[0].filename;
		    var bucketName = 'shoutout-videos';
		    var keyName = req.param('eventid') + '/' + filename;
	      	s3.createBucket({
	      		Bucket: bucketName
	      	}, function() {
	      		var params = {Bucket: bucketName, Key: keyName, Body: file, ACL: 'public-read'};
	      		s3.putObject(params, function(err, data){
	      			if (err)
	      				console.log(err)
	      			else {
	      				var successObj = {
	      					url: 'https://s3.amazonaws.com/' + bucketName + '/' + keyName
	      				}
	      				Videos.create({
	      					userid: req.param('userid'),
	      					eventid: req.param('eventid'),
	      					name: req.param('name'),
	      					url: successObj.url,
	      					filename: filename
	      				}).exec(function createCB(err, created){
							console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
	      					return res.ok(created);
	      				});
	      			}
	      		})
	      	});
		})
	}
};

