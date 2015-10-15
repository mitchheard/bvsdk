// TODO: [mheard] add controllers and other configuration settions, see individual comments below

(function(window, document, undefined) {

	window.bvsdk = {

		controllers : {

			init : {
			
				loadScript : function (url, callback) {
					// create script to load
					var script = document.createElement('script');
					script.type = "text/javascript";
					script.src = url;
					// document head
					var head = document.getElementsByTagName('head')[0];
					// toggle to ensure script only loads once in browsers with onreadystatechange bugs (specifically Opera, maybe others)
					var complete = false;

					// handler for script load
					script.onload = script.onreadystatechange = function() {
						// check to make sure script is loaded
						if (!complete && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
							// toggle to stop script from loading more than once	
							complete = true;
							// callback function provided as param
							callback();
							// reset onreadystatechange of script for browser compatibility bugs (specifically Opera, maybe others)
							script.onload = script.onreadystatechange = null;
							// remove loaded script from head
							head.removeChild(script);
						};
					};

					// handler for script load error
					script.onerror = function() {
							// toggle to stop script from loading more than once	
							complete = true;
							// callback function provided as param
							callback();
							// reset onreadystatechange of script for browser compatibility bugs (specifically Opera, maybe others)
							script.onload = script.onreadystatechange = null;
							// remove loaded script from head
							head.removeChild(script);
					}

					// add script to head
					head.appendChild(script);
				},

				bvLoadSDK : function () {
					// create bvsdk object for namespacing
					window.bvsdk = window.bvsdk || {};
					// load dependant files first
					$bvsdk.when(
						// jquery ui - loaded through function to check for CDN resource with local fallback
						$bvsdk.getScript(bvsdk.models.init.locationProtocol + bvsdk.models.init.locationHostName + bvsdk.models.init.locationPort + bvsdk.models.init.localPathToSDK + "js/jquery-ui.bvsdk.min." + bvsdk.models.init.jqueryUIVersion + ".js"),
						// modernizr - must load for HTML 5 browser support (includes HTML5 shiv)
						$bvsdk.getScript(bvsdk.models.init.locationProtocol + bvsdk.models.init.locationHostName + bvsdk.models.init.locationPort + bvsdk.models.init.localPathToSDK + "js/modernizr.js"),
						// global variables - must load first for bv content
						$bvsdk.getScript(bvsdk.models.init.locationProtocol + bvsdk.models.init.locationHostName + bvsdk.models.init.locationPort + bvsdk.models.init.localPathToSDK + "models/varsGlobal.js")
					).done(function(){
						// load models (controllers depend on them)
						$bvsdk.when(
							// properties
							$bvsdk.when(
								// load language defaults first
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "models/properties/" + bvConfigSDK["language"] + "/properties.js")
							).done(function(){
								// load region specific overrides
								if (bvConfigSDK["region"]) {
									$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "models/properties/" + bvConfigSDK["language"] + "/" + bvConfigSDK["region"] + "/properties.js")
								}		
							}).fail(function(e){
								// console.log(e);
							}),
							// magpie
							$bvsdk.when(
								// load magpie
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersMagPie.js")
							).done(function(){
								// init magpie
								bvsdk.controllers.magpie.initMagpie ();
							}).fail(function(e){
								// console.log(e);
							}),
							// ROI beacon
							// $bvsdk.when(
							// 	// load magpie
							// 	$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersROIBeacon.js")
							// ).done(function(){
							// 	// init magpie
							// 	bvsdk.controllers.roibeacon.initROIBeacon ();
							// }).fail(function(e){
							// 	// console.log(e);
							// }),
							// models
							$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "models/varsTemplates.js"),
							$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "models/varsContainers.js"),		
							$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "models/modelsGlobal.js"),		
							$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "models/modelsAPICalls.js"),
							$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "models/modelsReviews.js"),
							$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "models/modelsQuestions.js")
						).done(function(){
							// load controllers, plugins, and css files
							$bvsdk.when(
								// controllers
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersGlobal.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersUGCSubmissionUniversal.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersUGCSubmissionWidgets.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersUGCDisplayUniversal.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersUGCDisplayWidgets.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersFeedback.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersPagination.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersSorting.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersFilters.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersBadges.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersHistogram.js"),

								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersStatistics.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersProductCatalog.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersReviewsSubmission.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "controllers/controllersUGCSubmissionReviewComment.js"),
								// // plugins
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "js/plugins/jquery-cookie.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "js/plugins/jquery.dateFormat.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "js/plugins/jquery.visible.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "js/plugins/jquery.magnific-popup.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "js/browserSelector.js"),

								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "js/plugins/jquery.rating.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "js/plugins/jquery.fileupload.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "js/plugins/jquery.iframe-transport.js"),
								$bvsdk.getScript(bvsdk.models.config.siteBaseURL + "js/plugins/parsley.js"),
								// css files
								$bvsdk("head").append("<link href='" + bvsdk.models.config.siteBaseURL + "css/bazaarvoiceUniversal.css' type='text/css' rel='stylesheet' />"),
								$bvsdk("head").append("<link href='" + bvsdk.models.config.siteBaseURL + "css/magnific-popup.css' type='text/css' rel='stylesheet' />"),
								$bvsdk.get(bvsdk.models.config.siteBaseURL + "views/viewsUniversal.html", function(data) {
									$bvsdk("body").append(data);
								})
							).done(function(){
								// set user parameters
								bvsdk.models.user.userParams = bvsdk.models.user.parseUAS(bvsdk.models.config.bvUserDefaults['bvUAS']);
								// load reviews
								switch (bvConfigSDK["pageType"]) {
									case "Product":
										// reviews
										bvsdk.controllers.ugc.review.initRatingReviewWidget ();
										bvsdk.controllers.ugc.review.initFeaturedUGCWidget ();
										bvsdk.controllers.ugc.review.initVersusUGCWidget ();
										bvsdk.controllers.ugc.review.initTagCloud ();
										// ask and answer
										bvsdk.controllers.ugc.question.initQuestionAnswerWidget ();
										// stories

										break;

									case "Category":
										// inline ratings
										bvsdk.controllers.statistics.initInlineRatingWidget ();
										break;

									case "Misc":

										break;

									case "Submission":
										// universal submission
										bvsdk.controllers.submission.universal.initSubmissionUniversal ();
										break;

									default:

										break;

									}
								/* MAGNIFIC LIGHTBOX POPIN */
								// photos
								$bvsdk(bvsdk.models.targets["ugc"]["review"]["container-widget"]).on('click', '[data-bv-content="[\'photo-thumbnail\']"]', function() {
									event.preventDefault();
									$bvsdk(this).magnificPopup({
										type: 'image',
										titleSrc: 'title'
									}).click();
								});
								// videos
								$bvsdk(bvsdk.models.targets["ugc"]["review"]["container-widget"]).on('click', '[data-bv-content="[\'video-thumbnail\']"]', function() {
									event.preventDefault();
									$bvsdk(this).magnificPopup({
										type: 'iframe',
										titleSrc: 'title'
									}).click();
								});

							}).fail(function(e){
								// console.log(e);
							});

						}).fail(function(e){
							// console.log(e);
						});
					}).fail(function(e){
						// console.log(e);
					});
				},

			},

		},

		models : {

			init : {
				
				// version of jquery being used by SDK - if changed, make sure local file is updated for fallbacks
				jqueryVersion : "1.11.1",
				jqueryUIVersion : "1.10.3",

				locationProtocol : ("locationProtocol" in bvConfigSDK) ? bvConfigSDK["locationProtocol"] : location.protocol + "//",
				locationHostName : ("locationHostName" in bvConfigSDK) ? bvConfigSDK["locationHostName"] : location.hostname,
				locationPort : ("locationPort" in bvConfigSDK) ? bvConfigSDK["locationPort"] : (location.port) ? ":" + location.port : '',
				locationPathname : ("locationPathname" in bvConfigSDK) ? bvConfigSDK["locationPathname"] : location.pathname,
				localPathToSDK : ("localPathToSDK" in bvConfigSDK) ? bvConfigSDK["localPathToSDK"] : "/bvsdkFramework/",

			},

		},

	};

	bvsdk.controllers.init.loadScript(bvsdk.models.init.locationProtocol + bvsdk.models.init.locationHostName + bvsdk.models.init.locationPort + bvsdk.models.init.localPathToSDK + "js/jquery.bvsdk.min." + bvsdk.models.init.jqueryVersion + ".js", function() {
		bvsdk.controllers.init.bvLoadSDK();
	});

})(window, document);

