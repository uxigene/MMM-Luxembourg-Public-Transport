/* MagicMirror²
 * Node Helper: Luxembourg Public Transport
 *
 * By Evghenii Marinescu https://github.com/uxigene/
 * MIT Licensed.
 */

'use strict';

const https      = require("node:https");
const NodeHelper = require("node_helper");

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
		url = encodeURI(url);

		https.get(url, resp => {
			let buffer = '';

			resp.on('data', chunk => {
				buffer += chunk;
			});

			resp.on('end', () => {
				const data = JSON.parse(buffer);
				this.sendSocketNotification('LUX_TRANSPORT:SUCCESS', data);
			});

		}).on("error", err => {
			this.sendSocketNotification('LUX_TRANSPORT:ERROR');
		});
	}
});
