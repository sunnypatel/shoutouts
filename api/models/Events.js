/**
* Events.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	autoPk: false,

	attributes: {
		eventid: {
			type: 'integer',
			autoIncrement: true,
			unique: true,
        	primaryKey: true
		},
		title: {
			type: 'string'
		},
		videos: {
			collection: 'videos',
			via: 'eventid'
		}
	}
};

