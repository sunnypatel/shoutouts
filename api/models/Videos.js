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
	filename: {
		type: 'string'
	},
	name: {
		type: 'string'
	},
	user: {
		model: 'User',
		required: true,
		unique: true
	},
	event: {
		model: 'Events',
		required: true,
		unique: true
	}
  }
};

