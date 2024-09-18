/* global Module */

/* Magic Mirror
 * Module: Luxembourg Public Transport
 *
 * By Evghenii Marinescu https://github.com/uxigene/
 * MIT Licensed.
 */

'use strict';

Module.register("MMM-Luxembourg-Public-Transport", {
	urlTpl: 'https://cdt.hafas.de/opendata/apiserver/departureBoard?accessId={apiKey}&lang=fr&id={stationId}&duration={duration}&maxJourneys={maxResults}&format=json',

	defaults: {
		apiKey         : "",
		stationId      : 0,
		duration       : '720',
		fetchInterval  : 60000,
		animationSpeed : 2000,
		maxResults     : 20
	},

	template:
		'<div class="lux-transport">' +
			'<div class="lux-transport__next">' +
				'<div class="lux-transport__next__title"><i class="fa fa-<% this[0].type %>" aria-hidden="true"></i><span><% this[0].name %></span></div>' +
				'<div class="lux-transport__next__time">Next <% this[0].type %> <strong><% moment(this[0].datetime).fromNow() %></strong></div>' +
				'<div class="lux-transport__next__subtitle"><% this[0].stop %> — <% this[0].direction %></div>' +
			'</div>' +

			'<ul class="lux-transport__schedule">' +
				'<% for(var i in this) { %>' +
					'<li class="lux-transport__schedule__item">' +
						'<div class="lux-transport__schedule__item__time"><% moment(this[i].datetime).format("HH:mm DD MMM") %></div>' +
					'</li>' +
				'<% } %>' +
			'</ul>' +
		'</div>',

	getStyles: function() {
		return ["MMM-Luxembourg-Public-Transport.css", "font-awesome.css"];
	},

	getScripts: function() {
		return ["moment.js", 'template-engine.js'];
	},

	getSchedule: function () {
		this.sendSocketNotification('LUX_TRANSPORT:FETCH', { url : this.getUrl() });
	},

	getUrl: function() {
		return this.urlTpl
			.replace(/{apiKey}/gi, this.config.apiKey)
			.replace(/{stationId}/gi, this.config.stationId)
			.replace(/{duration}/gi, this.config.duration)
			.replace(/{maxResults}/gi, this.config.maxResults);
	},

	start: function() {
		this.config   = Object.assign({}, this.defaults, this.config);
		this.success  = false;
		this.response = {};

		this.run();

		Log.log("Starting module: " + this.name);
	},

	run: function() {
		this.getSchedule();
		setInterval(() => this.getSchedule(), this.config.fetchInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		Log.log(this.name + " received a socket notification: " + notification, payload);

		switch (notification) {
			case 'LUX_TRANSPORT:SUCCESS':
				this.success = true;
				break;

			case 'LUX_TRANSPORT:ERROR':
				this.success = false;
				break;

			default:
				this.success = false;
		}

		this.response = this.normalize(payload);
		this.updateDom(this.config.animationSpeed);
	},

	normalize: function(data) {
		const datetimeNow = new Date();
		const departures  = [];

		data.Departure.forEach(departure => {
			const datetime = new Date(departure.date + ' ' + departure.time);
			var type = "train"

			if (departure.name.includes("BUS")) {
				type = "bus"
			}

			if(datetime > datetimeNow) {
				departures.push({
					name      : departure.name,
					type	  : type,
					stop      : departure.stop,
					time      : departure.time,
					data      : departure.date,
					direction : departure.direction,
					datetime  : datetime
				})
			}
		});

		return departures.slice(0, this.config.maxLength);
	},

	getDom: function() {
		const wrapperEl = document.createElement("div");

		if(this.success) {
			wrapperEl.innerHTML = template(this.template, this.response);
		}
		return wrapperEl;
	}
});
