/* Magic Mirror
 * Node Helper: Luxembourg Public Transport
 *
 * By Evghenii Marinescu https://github.com/MarinescuEvghenii/
 * MIT Licensed.
 */

'use strict';

const NodeHelper = require("node_helper");
const https      = require('https');

module.exports = NodeHelper.create({

	start: function() {
		console.log("Starting node helper for: " + this.name);
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "LUX_TRANSPORT:FETCH") {
			this.fetch(payload.url);
		}
	},

	fetch: function(url) {
		https.get(url, resp => {
			let buffer = '';

			resp.on('data', chunk => {
				buffer += chunk;
			});

			resp.on('end', () => {
				const datetimeNow = new Date();
				const departures  = [];

				JSON.parse(buffer).Departure.forEach(departure => {
					const datetime = new Date(departure.date + ' ' + departure.time);

					if(datetime > datetimeNow) {
						departures.push({
							name      : departure.name,
							stop      : departure.stop,
							time      : departure.time,
							data      : departure.date,
							direction : departure.direction,
							datetime  : datetime
						})
					}
				});

				this.sendSocketNotification('LUX_TRANSPORT:SUCCESS', departures);
			});

		}).on("error", err => {
			this.sendSocketNotification('LUX_TRANSPORT:ERROR');
		});
	}
});
