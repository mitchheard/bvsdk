$bvsdk.extend(true, bvsdk, {

	controllers : {

		submission : {

			universal : {

				initSubmissionUniversal : function () {
					// get passed parameters from the url
					var urlParameters = (function() {
						var result = {};
						if (window.location.search) {
							// split up the query string and store in an associative array
							var params = window.location.search.slice(1).split("&");
							for (var i = 0; i < params.length; i++) {
								var obj = params[i].split("=");
								result[obj[0]] = unescape(obj[1]);
							}
						}
						return result;
					}());

					switch (urlParameters["contentType"]) {
						case "review": 
							bvsdk.controllers.general.consoleLogFallback ("review");
							// load review submission container
							bvsdk.models.submission.review.getForm (urlParameters["productId"], bvsdk.models.targets["submission"]["universal"]["container-widget"], function(content) {
								bvsdk.controllers.general.consoleLogFallback (bvsdk.models.user.parseUAS(bvsdk.models.config.bvUserDefaults['bvUAS']));
								bvsdk.controllers.submission.review.loadSubmissionWidget (content, {
									"parentContainer":bvsdk.models.targets["submission"]["universal"]["container-widget"],
									"productId":urlParameters["productId"],
									"returnURL":urlParameters["returnURL"]
								});
							});

							break;

						case "review_comment": 
							bvsdk.controllers.general.consoleLogFallback ("review comment");
							// load review submission container
							bvsdk.models.submission.reviewcomment.getForm (urlParameters["reviewId"], bvsdk.models.targets["submission"]["universal"]["container-widget"], function(content) {
								bvsdk.controllers.submission.reviewcomment.loadSubmissionWidget (content, {
									"parentContainer":bvsdk.models.targets["submission"]["universal"]["container-widget"],
									"productId":urlParameters["productId"],
									"contentId":urlParameters["reviewId"],
									"returnURL":urlParameters["returnURL"]
								});
							});

							break;

						case "question": 
							bvsdk.controllers.general.consoleLogFallback ("question");
							break;

						case "answer": 
							bvsdk.controllers.general.consoleLogFallback ("answer");
							break;

						case "story": 
							bvsdk.controllers.general.consoleLogFallback ("story");
							break;

						case "story_comment": 
							bvsdk.controllers.general.consoleLogFallback ("story comment");
							break;

						default:
							bvsdk.controllers.general.consoleLogFallback ("nothing");
							break;

					}

				},

			},

		},

	},

});