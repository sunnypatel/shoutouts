/**
* Videos.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	url: {
		type: 'string'
	},
	userid: {
		model: 'User',
		required: true
	},
	filename: {
		type: 'string'
	},
	name: {
		type: 'string'
	},
	eventid: {
		model: 'Events',
		required: true
	}
  }
};

