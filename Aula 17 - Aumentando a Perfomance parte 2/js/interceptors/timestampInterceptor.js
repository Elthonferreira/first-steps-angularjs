angular.module("listaTelefonica").factory("timestampInterceptor", function () {
	return {
		request: function (config) {
			if (config.url.indexOf('view') > -1) return config;

			let timestamp = new Date().getTime();
			config.url += "?timestamp=" + timestamp;
			
			return config;
		}
	};
});