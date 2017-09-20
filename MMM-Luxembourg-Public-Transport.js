/* global Module */

/* Magic Mirror
 * Module: Luxembourg Public Transport
 *
 * By Evghenii Marinescu https://github.com/MarinescuEvghenii/
 * MIT Licensed.
 */

'use strict';

Module.register("MMM-Luxembourg-Public-Transport", {

	defaults: {
		urlTpl         : 'https://travelplanner.mobiliteit.lu/restproxy/departureBoard?accessId=cdt&id={from}&direction={to}&duration={duration}&format={format}',
		to             : '',
		from           : '',
		duration       : '720',
		format         : 'json',
		fetchInterval  : 1000 * 60,
		animationSpeed : 2000,
		maxLength      : 16
	},

	template:
		'<div class="lux-transport">' +
			'<div class="lux-transport__next">' +
				'<div class="lux-transport__next__title"><i class="fa fa-bus" aria-hidden="true"></i><% this[0].name %></div>' +
				'<div class="lux-transport__next__time">Next bus <strong><% moment(this[0].datetime).fromNow() %></strong></div>' +
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
		return this.config.urlTpl
			.replace(/{from}/gi, this.config.from)
			.replace(/{to}/gi, this.config.to)
			.replace(/{duration}/gi, this.config.duration)
			.replace(/{format}/gi, this.config.format);
	},

	start: function() {
		this.config     = Object.assign({}, this.defaults, this.config);
		this.success    = false;
		this.departures = [];

		this.run();

		Log.log("Starting module: " + this.name);
	},

	run: function() {
		this.getSchedule();
		setInterval(() => this.getSchedule(), this.config.fetchInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		Log.log(this.name + " received a socket notification: " + notification);

		switch (notification) {
			case 'LUX_TRANSPORT:SUCCESS':
				this.success = true;
				this.departures = payload;
				break;

			case 'LUX_TRANSPORT:ERROR':
				this.success = false;
				this.departures = [];
				break;

			default:
				this.success = false;
				this.departures = [];
		}

		this.updateDom(this.config.animationSpeed);
	},

	getDom: function() {
		const wrapperEl = document.createElement("div");

		if(this.success) {
			wrapperEl.innerHTML = template(this.template, this.departures.slice(0, this.config.maxLength));
		} else {
			wrapperEl.innerHTML = this.translate("LOADING");
			wrapperEl.className = "small dimmed";
		}

		return wrapperEl;
	}
});
