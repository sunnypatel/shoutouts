/**
 * VideosController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var AWS = require('aws-sdk');
var fs = require('fs');

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
			// Save the "fd" and the url where the avatar for a user can be accessed
		    User.update({"id": req.param('userId')}, {

		      // Generate a unique URL where the avatar can be downloaded.
		      avatarUrl: require('util').format('%s/user/videos/%s', sails.getBaseUrl(), '1'),

		      // Grab the first file and use it's `fd` (file descriptor)
		      avatarFd: uploadedFiles[0].fd
		    })
		    .exec(function (err, updated){
		      if (err) return res.negotiate(err);
		      else {
		      	var file = fs.readFileSync(updated[0].avatarFd);
		      	var s3 = new AWS.S3();

		      	var bucketName = 'shoutout-videos';
		      	var keyName = req.param('eventId') + '/' + uploadedFiles[0].filename;
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
		      				console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
		      				return res.ok(successObj);
		      			}
		      		})
		      	});
		      }
		      
		    });
		})
	},
	test: function(req, res){
		var AWS = require('aws-sdk');
  
		// Create an S3 client
		var s3 = new AWS.S3();
  
		// Create a bucket and upload something into it
		var bucketName = 'shoutout-videos';
		var keyName = 'test/ello_world.txt';
  

		s3.createBucket({Bucket: bucketName}, function() {
		    var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
		    s3.putObject(params, function(err, data) {
		      if (err)
		        console.log(err)
			  else
		        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
		    });
  		});
	}
};

