import device;

var GoogleAnalytics = Class(function () {
	this.init = function () {
		this._globalProperties = {};

		if (device.isMobileBrowser && !device.isSimulator && !window.weebyGoogleAnalyticsLoaded) {
			window.weebyGoogleAnalyticsLoaded = true;
			this._loadTrackingForWeb();
		}
	};

	this.track = function (name, data) {
		// copy in global properties
		merge(data, this._globalProperties);

			NATIVE.plugins.sendEvent("GoogleAnalyticsPlugin", "track", JSON.stringify({
					eventName: name,
					params: data
				}));
	};

	this.trackScreen = function(name) {
			NATIVE.plugins.sendEvent("GoogleAnalyticsPlugin", "trackScreen", name);
	};

	this.setGlobalProperty = function (key, value) {
		this._globalProperties[key] = value;
	};

	this._loadTrackingForWeb = function() {
		try {
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', CONFIG.addons.googleanalytics.trackingId, CONFIG.addons.googleanalytics.url);
			ga('send', 'pageview');
		} catch (err) {
			console.log("googleAnalytics addon [error]: " + err.message);
		}
	};

	this.trackPage = function(page, displayTitle) {
		if (window.ga) {
			ga('send', {
				'hitType': 'pageview',
				'page': '/' + page,
				'title': displayTitle
			});
		}
	};

	this.trackEvent = function(category, action, label, value) {
		if (window.ga) {
			ga('send', {
				'hitType': 'event',
				'eventCategory': category,
				'eventAction': action,
				'eventLabel': label,
				'value': value || 0
			});
		}
	};
});

exports = new GoogleAnalytics();
