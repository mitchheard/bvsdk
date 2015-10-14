// TODO: Update for Question and Answers?

$bvsdk.extend(true, bvsdk, {

	controllers : {

		ugc : {

			review : {

				/**************************************** RATINGS AND REVIEWS CONTROLLERS ****************************************/

				initRatingReviewWidget : function () {
					bvsdk.models.ugc.review.getUGC (bvConfigSDK["productId"], bvsdk.models.targets["ugc"]["review"]["container-widget"], function(content, modelLocalDefaultSettings) {

						// callback functions
						bvsdk.controllers.ugc.review.loadRatingReviewWidget (content, {
							"parentContainer":"body",
							"productId":bvConfigSDK["productId"],
							"modelLocalDefaultSettings":{
								"Parameters":modelLocalDefaultSettings
							},
							"filterSettings":{
								"ratingOverallEnabled":true,
								"tagEnabled":true,
							},
						});

						/***** magpie start - place all content loading BEFORE this *****/
						bvsdk.controllers.magpie.trackPageView (null, bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]);
						_bvaq.push(['flushBatch']);
						/***** magpie end *****/

					}, {
						// api parameters
						"Parameters":{
							// "limit":1,
							"filter":{
								// "isfeatured":"true",
							},
							"sort":{
								// "contextdatavalue_Age": "asc",
							}
						}
					});
				},

				loadRatingReviewWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer" :"body", // container must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-widget"],
						"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-widget"],
						"loadOrder":"",
						"productId":"",
						"modelLocalDefaultSettings":"",
						"filterSettings" : {
							"ratingOverallEnabled":false,
							"ratingSecondaryEnabled":false,
							"cdvEnabled":false,
							"additionalFieldEnabled":false,
							"tagEnabled":false,
						}
					}, options);
					// set content
					var bvContent = {};
					var ugcStatisticsToLoad;
					if (content["Includes"]["Products"]) {
						if (content["Includes"]["Products"][settings["productId"]]) {
							ugcStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] || content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']; // review stats
							/***** magpie start *****/
					  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"] = content["Includes"]["Products"][settings["productId"]]["CategoryId"];
					  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"] = content["Includes"]["Products"][settings["productId"]]["Brand"]["Name"];
							/***** magpie end *****/
						}
					}
					var ugcToLoad = content["Results"]; // reviews
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);

					/***** headers *****/

					bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page"], {
						"parentContainer":$template,
					});

					// check to make sure reviews exist
					if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$bvsdk.isEmptyObject(ugcToLoad)) {
						/***** magpie start - place all content loading AFTER this *****/
						bvsdk.models.magpie.totalContentDisplayed["review"]["total"] = ugcToLoad.length;
						/***** magpie end *****/

						// load primary summary
						bvsdk.controllers.ugc.review.loadPrimarySummary (content, {
							// "parentContainer":"body",
							"productId":settings["productId"],
							"modelLocalDefaultSettings":settings["modelLocalDefaultSettings"],
						});
					
						// load quick take
						bvsdk.controllers.ugc.review.loadQuickTake (content, {
							"parentContainer":$template,
							"productId":settings["productId"],
						});

						// load reviews
						$bvsdk.each (ugcToLoad, function(key) {
							bvsdk.controllers.ugc.review.loadIndividualUGC (ugcToLoad[key], {
								"parentContainer":$template,
								"productId":settings["productId"],
								"magpie":{
									"categoryId":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"],
									"rootCategoryId":null,
									"brand":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"],
								}
							});
						});

						// pagination
						bvsdk.controllers.pagination.loadNumberedPagination (content, {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["pagination"]["review"]["container-widget"],
							"viewReloadOptions":{
								"model":bvsdk.models.ugc.review.getUGC,
								"modelSettings":settings["modelLocalDefaultSettings"],
								"controller":bvsdk.controllers.ugc.review.loadRatingReviewWidget,
								"controllerSettings":settings,
							},
						});
						// sorting dropdown
						// TODO: [mheard] Update for Question & Answer (and frankly all of these methods)
						bvsdk.controllers.sorting.loadSortDropdown (content, {
							"parentContainer":$template,
							"loadOrder":bvsdk.models.sorting.reviewLoadOrder,
							"viewReloadOptions":{
								"model":bvsdk.models.ugc.review.getUGC,
								"modelSettings":settings["modelLocalDefaultSettings"],
								"controller":bvsdk.controllers.ugc.review.loadRatingReviewWidget,
								"controllerSettings":settings,
							},
						});
						// filters
						// check to make sure reviews statistics exist - they are needed to create filters
						if (ugcStatisticsToLoad) {
							if (settings["filterSettings"]["ratingOverallEnabled"]) {
								bvsdk.controllers.filters.loadFiltersOverallRating (ugcStatisticsToLoad, {
									"parentContainer":$template,
									"viewReloadOptions":{
										"model":bvsdk.models.ugc.review.getUGC,
										"modelSettings":settings["modelLocalDefaultSettings"],
										"controller":bvsdk.controllers.ugc.review.loadRatingReviewWidget,
										"controllerSettings":settings,
									},
								});
							}
							if (settings["filterSettings"]["ratingSecondaryEnabled"]) {
								bvsdk.controllers.filters.loadFiltersSecondaryRatings (ugcStatisticsToLoad, {
									"parentContainer":$template,
									"viewReloadOptions":{
										"model":bvsdk.models.ugc.review.getUGC,
										"modelSettings":settings["modelLocalDefaultSettings"],
										"controller":bvsdk.controllers.ugc.review.loadRatingReviewWidget,
										"controllerSettings":settings,
									},
								});
							}
							if (settings["filterSettings"]["cdvEnabled"]) {
								bvsdk.controllers.filters.loadFiltersContextDataValues (ugcStatisticsToLoad, {
									"parentContainer":$template,
									"viewReloadOptions":{
										"model":bvsdk.models.ugc.review.getUGC,
										"modelSettings":settings["modelLocalDefaultSettings"],
										"controller":bvsdk.controllers.ugc.review.loadRatingReviewWidget,
										"controllerSettings":settings,
									},
								});
							}
							if (settings["filterSettings"]["additionalFieldEnabled"]) {
								bvsdk.controllers.filters.loadFiltersAdditionalFields (ugcStatisticsToLoad, {
									"parentContainer":$template,
									"viewReloadOptions":{
										"model":bvsdk.models.ugc.review.getUGC,
										"modelSettings":settings["modelLocalDefaultSettings"],
										"controller":bvsdk.controllers.ugc.review.loadRatingReviewWidget,
										"controllerSettings":settings,
									},
								});
							}
							if (settings["filterSettings"]["tagEnabled"]) {
								bvsdk.controllers.filters.loadFiltersTags (ugcStatisticsToLoad, {
									"parentContainer":$template,
									"viewReloadOptions":{
										"model":bvsdk.models.ugc.review.getUGC,
										"modelSettings":settings["modelLocalDefaultSettings"],
										"controller":bvsdk.controllers.ugc.review.loadRatingReviewWidget,
										"controllerSettings":settings,
									},
								});
							}
						}

					} else {

						/***** headers *****/
						bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-nocontent"], {
							"parentContainer":$template,
						});

						bvsdk.controllers.ugc.review.loadPrimarySummaryNoContent (content, {
							// "parentContainer":"body",
							"productId":settings["productId"],
							"modelLocalDefaultSettings":settings["modelLocalDefaultSettings"],
						});						
						bvsdk.controllers.ugc.review.loadQuickTakeNoContent (content, {
							// "parentContainer":$template,
							"productId":settings["productId"],
							"modelLocalDefaultSettings":settings["modelLocalDefaultSettings"],
						});

					}

					// set classes
					bvsdk.controllers.general.addOddEvenClasses (bvsdk.models.objectVariables["container"]["review"]);
					bvsdk.controllers.general.addFirstLastClasses (bvsdk.models.objectVariables["container"]["review"]);
				},

				loadIndividualUGC : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-group"],
						"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-individual"],
						"loadOrder":"",
						"productId":"",
						"modelLocalDefaultSettings":"",
						"magpie":{
							"categoryId":"",
							"rootCategoryId":"",
							"brand":"",
						},
					}, options);
					// set content
					var bvContent = {};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set variables
					var contentId = content["Id"]
					var productId = settings["productId"];
					var newID = "BVUGCContainer" + contentId;
					$bvsdk($template).attr("id",newID);

					// load ugc rating
					if (content["Rating"]) {
						bvsdk.controllers.ugc.universal.loadUGCRating (content, {
							"parentContainer":$template,
						});
					}
					// load ugc secondary ratings
					if (content["SecondaryRatingsOrder"]) {
						bvsdk.controllers.ugc.universal.loadUGCSecondaryRatings (content, {
							"parentContainer":$template,
						});
					}
					// load ugc recommended
					if (content["IsRecommended"]) {
						bvsdk.controllers.ugc.universal.loadUGCRecommended (content, {
							"parentContainer":$template,
						});
					}
					// load ugc title
					if (content["Title"]) {
						bvsdk.controllers.ugc.universal.loadUGCTitle (content, {
							"parentContainer":$template,
						});
					}
					// load ugc text
					if (content["ReviewText"] || content["QuestionText"] || content["AnswerText"] || content["StoryText"] || content["CommentText"]) {
						bvsdk.controllers.ugc.universal.loadUGCBody (content, {
							"parentContainer":$template,
						});
					}
					// load ugc date
					if (content["SubmissionTime"]) {
						bvsdk.controllers.ugc.universal.loadUGCDate (content, {
							"parentContainer":$template,
						});
					}
					// load ugc user nickname
					if (content["UserNickname"]) {
						bvsdk.controllers.ugc.universal.loadUGCUserNickname (content, {
							"parentContainer":$template,
						});
					}
					// load ugc user location
					if (content["UserLocation"]) {
						bvsdk.controllers.ugc.universal.loadUGCUserLocation (content, {
							"parentContainer":$template,
						});
					}
					// load ugc cdvs
					if (content["ContextDataValuesOrder"]) {
						bvsdk.controllers.ugc.universal.loadUGCContextDataValuesGroup (content, {
							"parentContainer":$template,
						});
					}
					// load ugc tags
					if (content["TagDimensionsOrder"]) {
						bvsdk.controllers.ugc.universal.loadUGCTagGroups (content, {
							"parentContainer":$template,
						});
					}
					// load ugc additional fields
					if (content["AdditionalFieldsOrder"]) {
						bvsdk.controllers.ugc.universal.loadUGCAdditionalFieldsGroups (content, {
							"parentContainer":$template,
						});
					}
					// load ugc photos
					if (content["Photos"]) {
						bvsdk.controllers.ugc.universal.loadUGCPhotosGroup (content, {
							"parentContainer":$template,
						});
					}
					// load ugc videos
					if (content["Videos"]) {
						bvsdk.controllers.ugc.universal.loadUGCVideosGroup (content, {
							"parentContainer":$template,
						});
					}
					// load badges
					if (content["BadgesOrder"]) {
						// load user badges
						bvsdk.controllers.badges.loadBadges(content, {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["badge"]["universal"]["container-group-user"],
							"loadOrder":bvsdk.models.badges.userOrder,
						});
						// load UGC badges
						bvsdk.controllers.badges.loadBadges(content, {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["badge"]["universal"]["container-group-content"],
							"loadOrder":bvsdk.models.badges.contentOrder,
						});
					}
					// load review feedback
					if (typeof content["TotalFeedbackCount"] != undefined) {
						bvsdk.controllers.feedback.loadFeedback(content, {
							"parentContainer":$template,
							"productId":productId,
							"contentId":contentId,
							"feedbackSettings":{
								"contentType":"review",
							},
						});
					}

					// load comments if available
					if (typeof content["TotalCommentCount"] != undefined) {
						bvsdk.models.ugc.reviewcomment.getUGC (contentId, $bvsdk($template).find(bvsdk.models.targets["ugc"]["review-comment"]["container-widget"]).andSelf().filter(bvsdk.models.targets["ugc"]["review-comment"]["container-widget"]), function(content, modelLocalDefaultSettings) {
							bvsdk.controllers.ugc.reviewcomment.loadReviewCommentsWidget (content, {
								"parentContainer":$template,
								"productId":productId,
								"contentId":contentId,
								"modelLocalDefaultSettings":{
									"Parameters":modelLocalDefaultSettings,
								},
							});
						});
					}

					/***** magpie start - place all content loading BEFORE this *****/
					bvsdk.controllers.magpie.addImpression (content, {
						"contentType" : "Review",
						"bvProduct" : "RatingsAndReviews",
						"visible" : $bvsdk("#" + newID).visible(true),
						"categoryId":settings["magpie"]["categoryId"],
						"rootCategoryId":settings["magpie"]["rootCategoryId"],
						"brand":settings["magpie"]["brand"],
				        "numPeers" : bvsdk.models.magpie.totalContentDisplayed["review"]["total"],
				        "initialContent" : (bvsdk.models.magpie.totalContentDisplayed["review"]["update"] == 0) ? "true" : "false",
					});
					/***** magpie end *****/
				},

				/**************************************** PRIMARY SUMMARY ****************************************/


				loadPrimarySummary : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"body", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-summary-primary"],
						"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-summary-primary"],
						"productId":"",
					}, options);
					// set content
					var bvContent = {};
					var ugcStatisticsToLoad;
					if (content["Includes"]["Products"]) {
						if (content["Includes"]["Products"][settings["productId"]]) {
							ugcStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] || content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']; // review stats
						}
					}
					var ugcToLoad = content["Results"]; // reviews
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);

					// check to make sure reviews statistics exist - they are needed to create primary summary
					if (ugcStatisticsToLoad) {
						// overall rating average
						bvsdk.controllers.ugc.universal.loadUGCRating (ugcStatisticsToLoad, {
							"parentContainer":$template,
						});
						// histogram
						bvsdk.controllers.histogram.loadHistogramOverallRating (ugcStatisticsToLoad, {
							"parentContainer":$template,
						});
					}

					// write review button
					bvsdk.controllers.general.loadWriteReviewButton (bvsdk.models.properties["button"]["review"]["write"],
						// onclick functionality
						function() {
							// set variables
							var productId = settings["productId"]
							var returnURL = $bvsdk(location).attr("href") + "";
							// set attributes and text for button
							var submissionParams = "?" + $bvsdk.param({
								"productId":productId,
								"contentType":"review",
								"returnURL":returnURL,
							});
							bvsdk.controllers.general.consoleLogFallback (submissionParams);
							var url = bvsdk.models.config.siteBaseSubmissionURL + submissionParams;
							// load submission container
							bvsdk.controllers.general.loadSubmissionPage (url);
						}, {
							"parentContainer":$template,
							"viewContainer":bvsdk.models.templates["button"]["universal"]["text"],
						}
					);

					// read reviews button
					bvsdk.controllers.general.loadReadReviewsButton (bvsdk.models.properties["button"]["review"]["read"], null, {
						"parentContainer":$template,
						"viewContainer":bvsdk.models.templates["button"]["universal"]["text"],
						"productId":settings["productId"],
					});
				},

				loadPrimarySummaryNoContent : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"body", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-summary-primary"],
						"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-summary-primary-nocontent"],
						"productId":"",
					}, options);
					// set content
					var bvContent = {};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);
					// write review button
					bvsdk.controllers.general.loadWriteReviewButton (bvsdk.models.properties["button"]["review"]["write-first"],
						// onclick functionality
						function() {
							// set variables
							var productId = settings["productId"]
							var returnURL = $bvsdk(location).attr("href") + "";
							// set attributes and text for button
							var submissionParams = "?" + $bvsdk.param({
								"productId":productId,
								"contentType":"review",
								"returnURL":returnURL,
							});
							bvsdk.controllers.general.consoleLogFallback (submissionParams);
							var url = bvsdk.models.config.siteBaseSubmissionURL + submissionParams;
							// load submission container
							bvsdk.controllers.general.loadSubmissionPage (url);
						}, {
							"parentContainer":$template,
							"viewContainer":bvsdk.models.templates["button"]["universal"]["text"],
						}
					);
				},

				/**************************************** QUICKTAKE ****************************************/

				loadQuickTake : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"body", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-quicktake"],
						"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-quicktake"],
						"productId":"",
					}, options);
					// set content
					var bvContent = {};
					var ugcStatisticsToLoad;
					if (content["Includes"]["Products"]) {
						if (content["Includes"]["Products"][settings["productId"]]) {
							ugcStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] || content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']; // review stats
						}
					}
					var ugcToLoad = content["Results"]; // reviews
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);

					// check to make sure reviews statistics exist - they are needed to load the quick take
					if (ugcStatisticsToLoad) {
						// overall rating average
						bvsdk.controllers.ugc.universal.loadUGCRating (ugcStatisticsToLoad, {
							"parentContainer":$template,
						});
						// histogram
						bvsdk.controllers.histogram.loadHistogramOverallRating (ugcStatisticsToLoad, {
							"parentContainer":$template,
						});
						// recommended average
						bvsdk.controllers.ugc.universal.loadUGCRecommendedAverage (ugcStatisticsToLoad, {
							"parentContainer":$template,
						});
					}
					// write review button
					bvsdk.controllers.general.loadWriteReviewButton (bvsdk.models.properties["button"]["review"]["write"],
						// onclick functionality
						function() {
							// set variables
							var productId = settings["productId"]
							var returnURL = $bvsdk(location).attr("href") + "";
							// set attributes and text for button
							var submissionParams = "?" + $bvsdk.param({
								"productId":productId,
								"contentType":"review",
								"returnURL":returnURL,
							});
							bvsdk.controllers.general.consoleLogFallback (submissionParams);
							var url = bvsdk.models.config.siteBaseSubmissionURL + submissionParams;
							// load submission container
							bvsdk.controllers.general.loadSubmissionPage (url);
						}, {
							"parentContainer":$template,
						}
					);
				},

				loadQuickTakeNoContent : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"body", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-quicktake"],
						"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-quicktake-nocontent"],
						"productId":"",
					}, options);
					// set content
					var bvContent = {};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);
					// write review button
					bvsdk.controllers.general.loadWriteReviewButton (bvsdk.models.properties["button"]["review"]["write-first"],
						// onclick functionality
						function() {
							// set variables
							var productId = settings["productId"]
							var returnURL = $bvsdk(location).attr("href") + "";
							// set attributes and text for button
							var submissionParams = "?" + $bvsdk.param({
								"productId":productId,
								"contentType":"review",
								"returnURL":returnURL,
							});
							bvsdk.controllers.general.consoleLogFallback (submissionParams);
							var url = bvsdk.models.config.siteBaseSubmissionURL + submissionParams;
							// load submission container
							bvsdk.controllers.general.loadSubmissionPage (url);
						}, {
							"parentContainer":$template,
						}
					);
				},

				/**************************************** FEATURED UGC WIDGET ****************************************/

				initFeaturedUGCWidget : function () {
					bvsdk.models.ugc.review.getUGC (bvConfigSDK["productId"], bvsdk.models.targets["ugc"]["review"]["container-featured-widget"], function(content, modelLocalDefaultSettings) {

						// callback functions
						bvsdk.controllers.ugc.review.loadFeaturedUGCWidget (content, {
							"parentContainer":"body",
							"productId":bvConfigSDK["productId"],
							"modelLocalDefaultSettings":{
								"Parameters":modelLocalDefaultSettings
							}
						});

						/***** magpie start - place all content loading BEFORE this *****/
						bvsdk.controllers.magpie.trackPageView (null, bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]);
						_bvaq.push(['flushBatch']);
						/***** magpie end *****/

					}, {
						// api parameters
						"Parameters":{
							"limit":1,
							"filter":{
								"isfeatured":"true",
							},
							"sort":{
								// "contextdatavalue_Age": "asc",
							}
						}
					});	
				},

				loadFeaturedUGCWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer" :"body", // container must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-featured-widget"],
						"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-widget"],
						"loadOrder":"",
						"productId":"",
						"modelLocalDefaultSettings":"",
					}, options);
					// set content
					var bvContent = {};
					var ugcStatisticsToLoad;
					if (content["Includes"]["Products"]) {
						if (content["Includes"]["Products"][settings["productId"]]) {
							ugcStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] || content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']; // review stats
							/***** magpie start *****/
					  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"] = content["Includes"]["Products"][settings["productId"]]["CategoryId"];
					  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"] = content["Includes"]["Products"][settings["productId"]]["Brand"]["Name"];
							/***** magpie end *****/
						}
					}
					var ugcToLoad = content["Results"]; // reviews
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);

					// check to make sure reviews exist
					if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$bvsdk.isEmptyObject(ugcToLoad)) {
						/***** magpie start - place all content loading AFTER this *****/
						bvsdk.models.magpie.totalContentDisplayed["review"]["total"] = ugcToLoad.length;
						/***** magpie end *****/

						/***** headers *****/

						// bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-featured"], {
						// 	"parentContainer":$template,
						// });

						// load reviews
						$bvsdk.each (ugcToLoad, function(key) {
							bvsdk.controllers.ugc.review.loadIndividualUGC (ugcToLoad[key], {
								"parentContainer":$template,
								"productId":settings["productId"],
								"magpie":{
									"categoryId":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"],
									"rootCategoryId":null,
									"brand":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"],
								}
							});
						});

						// pagination
						bvsdk.controllers.pagination.loadNumberedPagination (content, {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["pagination"]["review"]["container-widget"],
							"viewReloadOptions":{
								"model":bvsdk.models.ugc.review.getUGC,
								"modelSettings":settings["modelLocalDefaultSettings"],
								"controller":bvsdk.controllers.ugc.review.loadRatingReviewWidget,
								"controllerSettings":settings,
							},
						});

					} else {

						/***** headers *****/
						bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-nocontent"], {
							"parentContainer":$template,
						});

					}

					// set classes
					bvsdk.controllers.general.addOddEvenClasses (bvsdk.models.objectVariables["container"]["review"]);
					bvsdk.controllers.general.addFirstLastClasses (bvsdk.models.objectVariables["container"]["review"]);
				},

				/**************************************** VERSUS WIDGET ****************************************/

				initVersusUGCWidget : function () {
					bvsdk.models.ugc.review.getUGC (bvConfigSDK["productId"], bvsdk.models.targets["ugc"]["review"]["container-helpful-high-widget"], function(content, modelLocalDefaultSettings) {

						// callback functions
						bvsdk.controllers.ugc.review.loadHelpfulHighUGCWidget (content, {
							"parentContainer":"body",
							"productId":bvConfigSDK["productId"],
							"modelLocalDefaultSettings":{
								"Parameters":modelLocalDefaultSettings
							}
						});

						/***** magpie start - place all content loading BEFORE this *****/
						bvsdk.controllers.magpie.trackPageView (null, bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]);
						_bvaq.push(['flushBatch']);
						/***** magpie end *****/

					}, {
						// api parameters
						"Parameters":{
							"limit":1,
							"filter":{
								"rating":"5",
							},
							"sort":{
								"totalpositivefeedbackcount": "desc",
							},
						}
					});

					bvsdk.models.ugc.review.getUGC (bvConfigSDK["productId"], bvsdk.models.targets["ugc"]["review"]["container-helpful-low-widget"], function(content, modelLocalDefaultSettings) {

						// callback functions
						bvsdk.controllers.ugc.review.loadHelpfulLowUGCWidget (content, {
							"parentContainer":"body",
							"productId":bvConfigSDK["productId"],
							"modelLocalDefaultSettings":{
								"Parameters":modelLocalDefaultSettings
							}
						});

						/***** magpie start - place all content loading BEFORE this *****/
						bvsdk.controllers.magpie.trackPageView (null, bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]);
						_bvaq.push(['flushBatch']);
						/***** magpie end *****/

					}, {
						// api parameters
						"Parameters":{
							"limit":1,
							"filter":{
								"rating":"1",
							},
							"sort":{
								"totalpositivefeedbackcount": "desc",
							},
						}
					});
				},

				loadHelpfulHighUGCWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer" :"body", // container must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-helpful-high-widget"],
						"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-widget"],
						"loadOrder":"",
						"productId":"",
						"modelLocalDefaultSettings":"",
					}, options);
					// set content
					var bvContent = {};
					var ugcStatisticsToLoad;
					if (content["Includes"]["Products"]) {
						if (content["Includes"]["Products"][settings["productId"]]) {
							ugcStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] || content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']; // review stats
							/***** magpie start *****/
					  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"] = content["Includes"]["Products"][settings["productId"]]["CategoryId"];
					  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"] = content["Includes"]["Products"][settings["productId"]]["Brand"]["Name"];
							/***** magpie end *****/
						}
					}
					var ugcToLoad = content["Results"]; // reviews
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);

					// check to make sure reviews exist
					if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$bvsdk.isEmptyObject(ugcToLoad)) {
						/***** magpie start - place all content loading AFTER this *****/
						bvsdk.models.magpie.totalContentDisplayed["review"]["total"] = ugcToLoad.length;
						/***** magpie end *****/

						/***** headers *****/

						bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-helpful-high"], {
							"parentContainer":$template,
						});

						// load reviews
						$bvsdk.each (ugcToLoad, function(key) {
							bvsdk.controllers.ugc.review.loadIndividualUGC (ugcToLoad[key], {
								"parentContainer":$template,
								"viewContainer":"#bvtemplate-individual-review-helpful",
								"productId":settings["productId"],
								"magpie":{
									"categoryId":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"],
									"rootCategoryId":null,
									"brand":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"],
								}
							});
						});

					} else {

						/***** headers *****/
						bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-nocontent"], {
							"parentContainer":$template,
						});

					}

					// set classes
					bvsdk.controllers.general.addOddEvenClasses (bvsdk.models.objectVariables["container"]["review"]);
					bvsdk.controllers.general.addFirstLastClasses (bvsdk.models.objectVariables["container"]["review"]);
				},

				loadHelpfulLowUGCWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer" :"body", // container must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-helpful-low-widget"],
						"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-widget"],
						"loadOrder":"",
						"productId":"",
						"modelLocalDefaultSettings":"",
					}, options);
					// set content
					var bvContent = {};
					var ugcStatisticsToLoad;
					if (content["Includes"]["Products"]) {
						if (content["Includes"]["Products"][settings["productId"]]) {
							ugcStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] || content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']; // review stats
							/***** magpie start *****/
					  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"] = content["Includes"]["Products"][settings["productId"]]["CategoryId"];
					  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"] = content["Includes"]["Products"][settings["productId"]]["Brand"]["Name"];
							/***** magpie end *****/
						}
					}
					var ugcToLoad = content["Results"]; // reviews
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);

					// check to make sure reviews exist
					if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$bvsdk.isEmptyObject(ugcToLoad)) {
						/***** magpie start - place all content loading AFTER this *****/
						bvsdk.models.magpie.totalContentDisplayed["review"]["total"] = ugcToLoad.length;
						/***** magpie end *****/

						/***** headers *****/

						bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-helpful-low"], {
							"parentContainer":$template,
						});

						// load reviews
						$bvsdk.each (ugcToLoad, function(key) {
							bvsdk.controllers.ugc.review.loadIndividualUGC (ugcToLoad[key], {
								"parentContainer":$template,
								"viewContainer":"#bvtemplate-individual-review-helpful",
								"productId":settings["productId"],
								"magpie":{
									"categoryId":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"],
									"rootCategoryId":null,
									"brand":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"],
								}
							});
						});

					} else {

						/***** headers *****/
						bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-nocontent"], {
							"parentContainer":$template,
						});

					}

					// set classes
					bvsdk.controllers.general.addOddEvenClasses (bvsdk.models.objectVariables["container"]["review"]);
					bvsdk.controllers.general.addFirstLastClasses (bvsdk.models.objectVariables["container"]["review"]);
				},

				/**************************************** TAG CLOUD ****************************************/

				initTagCloud : function () {

					bvsdk.models.ugc.review.getUGC (bvConfigSDK["productId"], bvsdk.models.targets["ugc"]["review"]["container-tagcloud-widget"], function(content, modelLocalDefaultSettings) {

						// callback functions
						bvsdk.controllers.ugc.review.loadTagCloudWidget (content, {
							"parentContainer":"body",
							"productId":bvConfigSDK["productId"],
							"modelLocalDefaultSettings":{
								"Parameters":modelLocalDefaultSettings
							}
						});

						/***** magpie start - place all content loading BEFORE this *****/
						bvsdk.controllers.magpie.trackPageView (null, bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]);
						_bvaq.push(['flushBatch']);
						/***** magpie end *****/

					}, {
						// api parameters
						"Parameters":{
							// "limit":"100",
							"filter":{
								// "isfeatured":"true",
							},
							"sort":{
								// "contextdatavalue_Age": "asc",
							}
						}
					});
				},

				loadTagCloudWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer" :"body", // container must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["container-tagcloud-widget"],
						// "viewContainer":bvsdk.models.templates["ugc"]["review"]["container-widget"],
						"viewContainer":"#bvtemplate-tagcloud-group-universal",
						"loadOrder":"",
						"productId":"",
						"modelLocalDefaultSettings":"",
						"tagCloudSettings":{
							"content":{
								"tags":true,
								"commonWords":false,
								"acceptedWords":false,
							},
							"displayCount":15,
							"filter":false,
							"intervalCount":10,
							"minCount":5,
							"acceptedWordsArray" : ["jfl", "submit"],
							"restrictedWordsArray" : ["the", "labelseaders"],
						},
					}, options);
					// set content
					var bvContent = {};
					var statisticsToLoad;
					if (content["Includes"]["Products"]) {
						if (content["Includes"]["Products"][settings["productId"]]) {
							statisticsToLoad= content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] // filterd review stats
							|| content["Includes"]["Products"][settings["productId"]]['ReviewStatistics'] // review stats
							|| content["Includes"]["Products"][settings["productId"]]['FilteredQAStatistics'] // filtered QA stats
							|| content["Includes"]["Products"][settings["productId"]]['QAStatistics'] // QA stats
							|| content["Includes"]["Products"][settings["productId"]]['FilteredStoryStatistics'] // filtered story stats
							|| content["Includes"]["Products"][settings["productId"]]['StoryStatistics']; // story stats
						}
					}
					var ugcToLoad = content["Results"]; // ugc content
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);

					// check to make sure ugc exist
					if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$bvsdk.isEmptyObject(ugcToLoad)) {

						// create concatenated string full of UGC body text for all loaded content
						var ugcText = new String;
						$bvsdk.each (ugcToLoad, function() {
							ugcText += this["Title"] + (this["ReviewText"] || this["QuesionText"] || this["AnswerText"] || this["StoryText"] || this["CommentText"]) + " . ";
						});

						// object to hold value and count of each tag
						var ugcWordsCount = new Object;
						// array to hold each tag
						var ugcWords = ugcText.split(/\b/);

						var preps = ["aboard", "about", "above", "across", "after", "against", "along", "amid", "among", "anti", "around", "as", "at", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", "concerning", "considering", "despite", "down", "during", "except", "excepting", "excluding", "following", "for", "from", "in", "inside", "into", "like", "minus", "near", "of", "off", "on", "onto", "opposite", "outside", "over", "past", "per", "plus", "regarding", "round", "save", "since", "than", "through", "to", "towards", "under", "underneath", "unlike", "until", "up", "upon", "versus", "via", "with", "within", "without"];
						var pronouns = ["all", "another", "any", "anybody", "anyone", "anything", "both", "each", "either", "everybody", "everyone", "everything", "few", "he", "her", "hers", "herself", "him", "himself", "his", "I", "it", "its", "itself", "many", "me", "mine", "more", "most", "much", "my", "myself", "neither", "no one", "nobody", "none", "nothing", "one", "other", "others", "our", "ours", "ourselves", "several", "she", "some", "somebody", "someone", "something", "that", "their", "theirs", "them", "themselves", "these", "they", "this", "those", "us", "we", "what", "whatever", "which", "whichever", "who", "whoever", "whom", "whomever", "whose", "you", "your", "yours", "yourself", "yourselves"];

						// var sentences = ugcText.split(/[\\.!\?]/);
						// var sentences2 = ugcText.match( /[^\.!\?]+[\.!\?]+/g );
						// console.log("sentences", sentences, sentences2);

						// array of good words to specifically look for and use
						var acceptedWordsArray = settings["tagCloudSettings"]["acceptedWordsArray"];
						// array of bad words to specifically look for and avoid
						var restrictedWordsArray = settings["tagCloudSettings"]["restrictedWordsArray"];

						// create object with each ugc word's value and count
						for (var i = 0; i < ugcWords.length; i++) {
							// ugc word
							var word = ugcWords[i].replace(/\s/g, '');
							// set to lower case during testing to ignore casing
							word = word.toLowerCase();
							// check if word fits criteria
							if (word.length > 4 && !($bvsdk.inArray(word, restrictedWordsArray) > -1)) {
								// add underscore to eliminate conflicts with object properties
								ugcWordsCount["_" + word] = {
									// increment count
									"Count" : (ugcWordsCount["_" + ugcWords[i]]) ? (ugcWordsCount["_" + ugcWords[i]]["Count"] || 0) + 1 : 1,
									// set value of word/phrase
									"Value" : word,
								}
							}
						}

						// create array to hold each keyword object
						var keywordsArray = [];
						$bvsdk.each (ugcWordsCount, function() {
							keywordsArray.push(this);
						})

						// create object to hold keyword array - this is needed to replicate the layout of the tag distribution object
						var keywordsObject = {"keywords" : {
							"Id":"search",
							"Label":"Trending Words",
							"Values":keywordsArray,
						}}

						if (settings["tagCloudSettings"]["content"]["tags"]) {
							$bvsdk.each(statisticsToLoad["TagDistribution"], function() {
								this["Id"] = "tag_" + this["Id"];
							});
						}

						// merge tag and keyword objects
						var ugcTags = $bvsdk.extend(statisticsToLoad["TagDistribution"], keywordsObject);
						// array to hold tag objects that meet criteria (minimum count, restricted words, etc.)
						var ugcTagsFiltered = [];
						// array to hold keys for each tag to be displayed
						var ugcKeys = [];

						var tagIntervals = settings["tagCloudSettings"]["intervalCount"]; // amount of intervals in tag styling
						var highCount; // highest tag count
						var lowCount; // lowest tag count

						// set keys, tags, high count, and low count to represent filtered tag data
						$bvsdk.each (ugcTags, function() {
							for (var i = 0; i < this["Values"].length; i++) {
								// check for criteria
								if (this["Values"][i]["Count"] >= settings["tagCloudSettings"]["minCount"]) {
									// add tag key
									ugcKeys.push(ugcTagsFiltered.length);
									// add tag
									this["Values"][i]["Parameter"] = this["Id"];
									ugcTagsFiltered.push(this["Values"][i]);
									// set high count
									if (this["Values"][i]["Count"] > highCount || highCount == undefined) {
										highCount = this["Values"][i]["Count"];
									}
									// set low count
									if (this["Values"][i]["Count"] < lowCount || lowCount == undefined) {
										lowCount = this["Values"][i]["Count"];
									}
								}
							}
						});

						console.log("filter", ugcTagsFiltered);

						// comparing function to sort array of obejcts by the count value
						function compare(a, b) {
							if (a["Count"] > b["Count"]) {
								return -1;
							}
							if (a["Count"] < b["Count"]) {
								return 1;
							}
							return 0;
						}
						// sort the array of object by count
						ugcTagsFiltered.sort(compare);
						var test = {
							"Id":"search",
							"Label":"test",
							"Values":ugcTagsFiltered,
						}

						// slice array of keys so only the configured amount of tags are displayed
						ugcKeys = ugcKeys.slice(0, settings["tagCloudSettings"]["displayCount"]);

						var tagRangeTotal = (highCount - lowCount); // range between tag counts
						var tagRangeInt = tagRangeTotal/tagIntervals; // size of range for each tag interval

						// load tags
						$bvsdk.each(ugcKeys, function() {
							var ugcKey = Math.floor(Math.random() * ugcKeys.length); // key to be displayed
							var ugcTag = ugcTagsFiltered[ugcKeys[ugcKey]]; // tag to be displays
							var ugcTagInt = tagIntervals - Math.floor((ugcTag["Count"] - lowCount) / tagRangeInt); // tag interval rank

							// new tag cloud item
							var tagCloudItem = new Object();
							tagCloudItem["Value"] = ugcTag["Value"]; // tag word/phrase value
							tagCloudItem["Count"] = ugcTag["Count"]; // tag count
							tagCloudItem["Interval"] = ugcTagInt; // tag interval
							// load individual tag cloud item
							if (settings["tagCloudSettings"]["filter"]) {
								bvsdk.controllers.ugc.review.loadTagCloudItems (tagCloudItem, {
									"parentContainer" : $template,
								});
							} else {
								bvsdk.controllers.ugc.review.loadTagCloudItems (tagCloudItem, {
									"parentContainer" : $template,
								});
							}
							// update keys to load to remove loaded tag cloud item
							ugcKeys.splice(ugcKey, 1);

						});

					} else {
						$bvsdk($template).html("no tags")
					}

				},

				loadTagCloudItems : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer" :"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["container-tagcloud-group-widget"],
						// "viewContainer":bvsdk.models.templates["ugc"]["review"]["container-widget"],
						"viewContainer":"#bvtemplate-tagcloud-individual-universal",
						"loadOrder":"",
						"productId":"",
						"modelLocalDefaultSettings":"",
						"tagCloudSettings":{
							"filter":false,
						},
					}, options);
					// set content
					var bvContent = {
						"filter-value" : content["Value"],
						"filter-count" : content["Count"],
						"tagcloud-interval" : content["Interval"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add tag cloud class
					$bvsdk($template).addClass("BVTagCloudItem" + bvContent["tagcloud-interval"]);

					// if filtering option is set, load filter
					if (settings["tagCloudSettings"]["filter"]) {
						bvsdk.controllers.filters.loadIndividualFilters (content, {
							"parentContainer":$template,
							// "targetContainer":bvsdk.models.targets["ugc"]["universal"]["container-tagcloud-group-widget"],
							// "viewContainer":"#bvtemplate-tagcloud-individual-universal",
							"loadOrder":settings["loadOrder"],
							// "filterSettings":{
							// 	"filterParameter":false,
							// },
							"viewReloadOptions":{
								"model":bvsdk.models.ugc.review.getUGC,
								"modelSettings":settings["modelLocalDefaultSettings"],
								"controller":loadTagCloudReviewWidget,
								"controllerSettings":settings,
							},
						});
					} else {

					}

					// add widget template
					$container.append($template);

				},

			},

			reviewcomment : {

				loadReviewCommentsWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review-comment"]["container-widget"],
						"viewContainer":bvsdk.models.templates["ugc"]["review-comment"]["container-widget"],
						"loadOrder":"",
						"productId":"",
						"modelLocalDefaultSettings":"",
					}, options);
					// set content
					var bvContent = {};
					var ugcToDisplay = content["Results"]; // review comments to display
					var contentId = settings["contentId"];
					var productId = settings["productId"];
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);

					// load comments if available
					if (ugcToDisplay.length > 0) {
						// add content id data param to content section
						$bvsdk($template).find(bvsdk.models.objectVariables["container"]["toggle-review-comment"]).andSelf().filter(bvsdk.models.objectVariables["container"]["toggle-review-comment"]).attr({
							"data-bv-contentid":contentId,
						});

						// toggle comments button
						bvsdk.controllers.general.loadToggleReviewCommentsButton (bvsdk.models.properties["button"]["review-comment"]["toggle"], {
							"parentContainer":$template,
							"productId":productId,
							"contentId":contentId,
						});

						// comment section header
						bvsdk.controllers.general.loadSectionHeader (bvsdk.models.properties["header"]["review-comment"]["section-ugc"], {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["header"]["review-comment"]["section-ugc"],
						});

						// comments
						if (ugcToDisplay != undefined) {
							$bvsdk.each (ugcToDisplay, function(key) {
								bvsdk.controllers.ugc.reviewcomment.loadIndividualReviewComment (ugcToDisplay[key], {
									"parentContainer":$template,
									"productId":productId,
								});
							});
						}

						// pagination
						bvsdk.controllers.pagination.loadNumberedPagination (content, {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["pagination"]["review-comment"]["container-widget"],
							"viewReloadOptions":{
								"model":bvsdk.models.ugc.reviewcomment.getUGC,
								"modelSettings":settings["modelLocalDefaultSettings"],
								"controller":bvsdk.controllers.ugc.reviewcomment.loadReviewCommentsWidget,
								"controllerSettings":settings,
							},
						});
					}
					// write review comment button
					bvsdk.controllers.general.loadWriteReviewCommentButton (bvsdk.models.properties["button"]["review-comment"]["write"], {
						"parentContainer":$template,
						"productId":productId,
						"contentId":contentId,
					});
				},

				loadIndividualReviewComment : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review-comment"]["container-group"],
						"viewContainer":bvsdk.models.templates["ugc"]["review-comment"]["container-individual"],
						"loadOrder":"",
						"productId":"",
						"modelLocalDefaultSettings":"",
					}, options);
					// set content
					var bvContent = {}; 
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set variables
					var contentId = content["Id"]
					var productId = settings["productId"];
					var newID = "BVUGCContainer" + contentId;
					$bvsdk($template).attr("id",newID);

					// load ugc title
					if (content["Title"]) {
						bvsdk.controllers.ugc.universal.loadUGCTitle (content, {
							"parentContainer":$template,
						});
					}
					// load ugc text
					if (content["ReviewText"] || content["QuestionText"] || content["AnswerText"] || content["StoryText"] || content["CommentText"]) {
						bvsdk.controllers.ugc.universal.loadUGCBody (content, {
							"parentContainer":$template,
						});
					}
					// load ugc date
					if (content["SubmissionTime"]) {
						bvsdk.controllers.ugc.universal.loadUGCDate (content, {
							"parentContainer":$template,
						});
					}
					// load ugc user nickname
					if (content["UserNickname"]) {
						bvsdk.controllers.ugc.universal.loadUGCUserNickname (content, {
							"parentContainer":$template,
						});
					}
					// load ugc user location
					if (content["UserLocation"]) {
						bvsdk.controllers.ugc.universal.loadUGCUserLocation (content, {
							"parentContainer":$template,
						});
					}
					// load ugc cdvs
					if (content["ContextDataValuesOrder"]) {
						bvsdk.controllers.ugc.universal.loadUGCContextDataValuesGroup (content, {
							"parentContainer":$template,
						});
					}
					// load ugc photos
					if (content["Photos"]) {
						bvsdk.controllers.ugc.universal.loadUGCPhotosGroup (content, {
							"parentContainer":$template,
						});
					}
					// load ugc videos
					if (content["Videos"]) {
						bvsdk.controllers.ugc.universal.loadUGCVideosGroup (content, {
							"parentContainer":$template,
						});
					}
					// load review comment feedback
					if (typeof content["TotalFeedbackCount"] != undefined) {
						bvsdk.controllers.feedback.loadFeedback(content, {
							"parentContainer":$template,
							"productId":productId,
							"contentId":contentId,
							"feedbackSettings":{
								"contentType":"review_comment",
							},
						});
					}
					// load badges
					if (content["BadgesOrder"]) {
						// load user badges
						bvsdk.controllers.badges.loadBadges(content, {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["badge"]["universal"]["container-group-user"],
							"loadOrder":bvsdk.models.badges.userOrder,
						});
						// load UGC badges
						bvsdk.controllers.badges.loadBadges(content, {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["badge"]["universal"]["container-group-content"],
							"loadOrder":bvsdk.models.badges.contentOrder,
						});
					}
				},

			},

			// // TODO: Finish updating Question and add Answer
			// question : {

			// 	/**************************************** Question AND Answer CONTROLLERS ****************************************/

			// 	initQuestionAnswerWidget : function () {
			// 		bvsdk.models.ugc.question.getUGC (bvConfigSDK["productId"], bvsdk.models.targets["ugc"]["question"]["container-widget"], function(content, modelLocalDefaultSettings) {

			// 			// callback functions
			// 			bvsdk.controllers.ugc.question.loadQuestionAnswerWidget (content, {
			// 				"parentContainer":"body",
			// 				"productId":bvConfigSDK["productId"],
			// 				"modelLocalDefaultSettings":{
			// 					"Parameters":modelLocalDefaultSettings
			// 				},
			// 				"filterSettings":{
			// 					// "ratingOverallEnabled":true,
			// 					// "tagEnabled":true,
			// 				},
			// 			});

			// 			/***** magpie start - place all content loading BEFORE this *****/
			// 			// TODO: does this work?
			// 			bvsdk.controllers.magpie.trackPageView (null, bvsdk.models.magpie.pageTrackContent["QuestionAndAnswer"]);
			// 			_bvaq.push(['flushBatch']);
			// 			/***** magpie end *****/

			// 		}, {
			// 			// api parameters
			// 			"Parameters":{
			// 				// "limit":1,
			// 				"filter":{
			// 					// "isfeatured":"true",
			// 				},
			// 				"sort":{
			// 					// "contextdatavalue_Age": "asc",
			// 				}
			// 			}
			// 		});
			// 	},

			// 	// TODO: do we have to udpate the loadQuestionAnswerWidget and initQuestionAnswerWidget anywhere?

			// 	loadQuestionAnswerWidget : function (content, options) {
			// 		var settings = $bvsdk.extend(true, {
			// 			"parentContainer" :"body", // container must be defined in call
			// 			"targetContainer":bvsdk.models.targets["ugc"]["question"]["container-widget"],
			// 			"viewContainer":bvsdk.models.templates["ugc"]["question"]["container-widget"],
			// 			"loadOrder":"",
			// 			"productId":"",
			// 			"modelLocalDefaultSettings":"",
			// 			"filterSettings" : {
			// 				// "ratingOverallEnabled":false,
			// 				// "ratingSecondaryEnabled":false,
			// 				// "cdvEnabled":false,
			// 				// "additionalFieldEnabled":false,
			// 				// "tagEnabled":false,
			// 			}
			// 		}, options);
			// 		// set content
			// 		var bvContent = {};
			// 		var ugcStatisticsToLoad;
			// 		if (content["Includes"]["Products"]) {
			// 			if (content["Includes"]["Products"][settings["productId"]]) {
			// 				ugcStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] || content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']; // review stats // TODO: what to do here?
			// 				/***** magpie start *****/
			// 				// TODO: is QuestionAndAnswer correct for magpie call?
			// 		  		bvsdk.models.magpie.pageTrackContent["QuestionAndAnswer"]["categoryId"] = content["Includes"]["Products"][settings["productId"]]["CategoryId"];
			// 		  		bvsdk.models.magpie.pageTrackContent["QuestionAndAnswer"]["brand"] = content["Includes"]["Products"][settings["productId"]]["Brand"]["Name"];
			// 				/***** magpie end *****/
			// 			}
			// 		}
			// 		var ugcToLoad = content["Results"]; // questions
			// 		// set container & template
			// 		var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
			// 		var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
			// 		// add widget template
			// 		$container.html($template);

			// 		/***** headers *****/

			// 		bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["question"]["page"], {
			// 			"parentContainer":$template,
			// 		});

			// 		// check to make sure questions exist
			// 		if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$bvsdk.isEmptyObject(ugcToLoad)) {
			// 			/***** magpie start - place all content loading AFTER this *****/
			// 			bvsdk.models.magpie.totalContentDisplayed["question"]["total"] = ugcToLoad.length;
			// 			/***** magpie end *****/

			// 			// load primary summary
			// 			bvsdk.controllers.ugc.question.loadPrimarySummary (content, {
			// 				// "parentContainer":"body",
			// 				"productId":settings["productId"],
			// 				"modelLocalDefaultSettings":settings["modelLocalDefaultSettings"],
			// 			});
					
			// 			// // load quick take
			// 			// bvsdk.controllers.ugc.question.loadQuickTake (content, {
			// 			// 	"parentContainer":$template,
			// 			// 	"productId":settings["productId"],
			// 			// });

			// 			// load questions
			// 			// TOOD: is this the right way to do magpie?
			// 			$bvsdk.each (ugcToLoad, function(key) {
			// 				bvsdk.controllers.ugc.question.loadIndividualUGC (ugcToLoad[key], {
			// 					"parentContainer":$template,
			// 					"productId":settings["productId"],
			// 					"magpie":{
			// 						"categoryId":bvsdk.models.magpie.pageTrackContent["QuestionAndAnswer"]["categoryId"],
			// 						"rootCategoryId":null,
			// 						"brand":bvsdk.models.magpie.pageTrackContent["QuestionAndAnswer"]["brand"],
			// 					}
			// 				});
			// 			});

			// 			// pagination
			// 			bvsdk.controllers.pagination.loadNumberedPagination (content, {
			// 				"parentContainer":$template,
			// 				"targetContainer":bvsdk.models.targets["pagination"]["question"]["container-widget"],
			// 				"viewReloadOptions":{
			// 					"model":bvsdk.models.ugc.question.getUGC,
			// 					"modelSettings":settings["modelLocalDefaultSettings"],
			// 					"controller":bvsdk.controllers.ugc.question.loadQuestionAnswerWidget,
			// 					"controllerSettings":settings,
			// 				},
			// 			});
			// 			// sorting dropdown
			// 			bvsdk.controllers.sorting.loadSortDropdown (content, {
			// 				"parentContainer":$template,
			// 				"loadOrder":bvsdk.models.sorting.questionLoadOrder,
			// 				"viewReloadOptions":{
			// 					"model":bvsdk.models.ugc.question.getUGC,
			// 					"modelSettings":settings["modelLocalDefaultSettings"],
			// 					"controller":bvsdk.controllers.ugc.question.loadQuestionAnswerWidget,
			// 					"controllerSettings":settings,
			// 				},
			// 			});
			// 			// filters
			// 			// check to make sure reviews statistics exist - they are needed to create filters
			// 			if (ugcStatisticsToLoad) {
			// 				if (settings["filterSettings"]["ratingOverallEnabled"]) {
			// 					bvsdk.controllers.filters.loadFiltersOverallRating (ugcStatisticsToLoad, {
			// 						"parentContainer":$template,
			// 						"viewReloadOptions":{
			// 							"model":bvsdk.models.ugc.question.getUGC,
			// 							"modelSettings":settings["modelLocalDefaultSettings"],
			// 							"controller":bvsdk.controllers.ugc.question.loadQuestionAnswerWidget,
			// 							"controllerSettings":settings,
			// 						},
			// 					});
			// 				}
			// 				// if (settings["filterSettings"]["ratingSecondaryEnabled"]) {
			// 				// 	bvsdk.controllers.filters.loadFiltersSecondaryRatings (ugcStatisticsToLoad, {
			// 				// 		"parentContainer":$template,
			// 				// 		"viewReloadOptions":{
			// 				// 			"model":bvsdk.models.ugc.question.getUGC,
			// 				// 			"modelSettings":settings["modelLocalDefaultSettings"],
			// 				// 			"controller":bvsdk.controllers.ugc.question.loadQuestionAnswerWidget,
			// 				// 			"controllerSettings":settings,
			// 				// 		},
			// 				// 	});
			// 				// }
			// 				// if (settings["filterSettings"]["cdvEnabled"]) {
			// 				// 	bvsdk.controllers.filters.loadFiltersContextDataValues (ugcStatisticsToLoad, {
			// 				// 		"parentContainer":$template,
			// 				// 		"viewReloadOptions":{
			// 				// 			"model":bvsdk.models.ugc.question.getUGC,
			// 				// 			"modelSettings":settings["modelLocalDefaultSettings"],
			// 				// 			"controller":bvsdk.controllers.ugc.question.loadQuestionAnswerWidget,
			// 				// 			"controllerSettings":settings,
			// 				// 		},
			// 				// 	});
			// 				// }
			// 				// if (settings["filterSettings"]["additionalFieldEnabled"]) {
			// 				// 	bvsdk.controllers.filters.loadFiltersAdditionalFields (ugcStatisticsToLoad, {
			// 				// 		"parentContainer":$template,
			// 				// 		"viewReloadOptions":{
			// 				// 			"model":bvsdk.models.ugc.question.getUGC,
			// 				// 			"modelSettings":settings["modelLocalDefaultSettings"],
			// 				// 			"controller":bvsdk.controllers.ugc.question.loadQuestionAnswerWidget,
			// 				// 			"controllerSettings":settings,
			// 				// 		},
			// 				// 	});
			// 				// }
			// 				// if (settings["filterSettings"]["tagEnabled"]) {
			// 				// 	bvsdk.controllers.filters.loadFiltersTags (ugcStatisticsToLoad, {
			// 				// 		"parentContainer":$template,
			// 				// 		"viewReloadOptions":{
			// 				// 			"model":bvsdk.models.ugc.question.getUGC,
			// 				// 			"modelSettings":settings["modelLocalDefaultSettings"],
			// 				// 			"controller":bvsdk.controllers.ugc.question.loadQuestionAnswerWidget,
			// 				// 			"controllerSettings":settings,
			// 				// 		},
			// 				// 	});
			// 				// }
			// 			}

			// 		} else {

			// 			/***** headers *****/
			// 			bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["question"]["page-nocontent"], {
			// 				"parentContainer":$template,
			// 			});

			// 			bvsdk.controllers.ugc.question.loadPrimarySummaryNoContent (content, {
			// 				// "parentContainer":"body",
			// 				"productId":settings["productId"],
			// 				"modelLocalDefaultSettings":settings["modelLocalDefaultSettings"],
			// 			});						
			// 			// bvsdk.controllers.ugc.review.loadQuickTakeNoContent (content, {
			// 			// 	// "parentContainer":$template,
			// 			// 	"productId":settings["productId"],
			// 			// 	"modelLocalDefaultSettings":settings["modelLocalDefaultSettings"],
			// 			// });

			// 		}

			// 		// set classes
			// 		bvsdk.controllers.general.addOddEvenClasses (bvsdk.models.objectVariables["container"]["question"]);
			// 		bvsdk.controllers.general.addFirstLastClasses (bvsdk.models.objectVariables["container"]["question"]);
			// 	},

			// 	loadIndividualUGC : function (content, options) {
			// 		var settings = $bvsdk.extend(true, {
			// 			"parentContainer":"", // template must be defined in call
			// 			"targetContainer":bvsdk.models.targets["ugc"]["question"]["container-group"],
			// 			"viewContainer":bvsdk.models.templates["ugc"]["question"]["container-individual"],
			// 			"loadOrder":"",
			// 			"productId":"",
			// 			"modelLocalDefaultSettings":"",
			// 			"magpie":{
			// 				"categoryId":"",
			// 				"rootCategoryId":"",
			// 				"brand":"",
			// 			},
			// 		}, options);
			// 		// set content
			// 		var bvContent = {};
			// 		// set container & template
			// 		var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
			// 		var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
			// 		// add widget template
			// 		$container.append($template);
			// 		// set variables
			// 		var contentId = content["Id"]
			// 		var productId = settings["productId"];
			// 		var newID = "BVUGCContainer" + contentId;
			// 		$bvsdk($template).attr("id",newID);

			// 		// // load ugc rating
			// 		// if (content["Rating"]) {
			// 		// 	bvsdk.controllers.ugc.universal.loadUGCRating (content, {
			// 		// 		"parentContainer":$template,
			// 		// 	});
			// 		// }
			// 		// // load ugc secondary ratings
			// 		// if (content["SecondaryRatingsOrder"]) {
			// 		// 	bvsdk.controllers.ugc.universal.loadUGCSecondaryRatings (content, {
			// 		// 		"parentContainer":$template,
			// 		// 	});
			// 		// }
			// 		// // load ugc recommended
			// 		// if (content["IsRecommended"]) {
			// 		// 	bvsdk.controllers.ugc.universal.loadUGCRecommended (content, {
			// 		// 		"parentContainer":$template,
			// 		// 	});
			// 		// }
			// 		// load ugc title
			// 		if (content["Title"]) {
			// 			bvsdk.controllers.ugc.universal.loadUGCTitle (content, {
			// 				"parentContainer":$template,
			// 			});
			// 		}
			// 		// load ugc text
			// 		if (content["ReviewText"] || content["QuestionText"] || content["AnswerText"] || content["StoryText"] || content["CommentText"]) {
			// 			bvsdk.controllers.ugc.universal.loadUGCBody (content, {
			// 				"parentContainer":$template,
			// 			});
			// 		}
			// 		// load ugc date
			// 		if (content["SubmissionTime"]) {
			// 			bvsdk.controllers.ugc.universal.loadUGCDate (content, {
			// 				"parentContainer":$template,
			// 			});
			// 		}
			// 		// load ugc user nickname
			// 		if (content["UserNickname"]) {
			// 			bvsdk.controllers.ugc.universal.loadUGCUserNickname (content, {
			// 				"parentContainer":$template,
			// 			});
			// 		}
			// 		// load ugc user location
			// 		if (content["UserLocation"]) {
			// 			bvsdk.controllers.ugc.universal.loadUGCUserLocation (content, {
			// 				"parentContainer":$template,
			// 			});
			// 		}
			// 		// // load ugc cdvs
			// 		// if (content["ContextDataValuesOrder"]) {
			// 		// 	bvsdk.controllers.ugc.universal.loadUGCContextDataValuesGroup (content, {
			// 		// 		"parentContainer":$template,
			// 		// 	});
			// 		// }
			// 		// // load ugc tags
			// 		// if (content["TagDimensionsOrder"]) {
			// 		// 	bvsdk.controllers.ugc.universal.loadUGCTagGroups (content, {
			// 		// 		"parentContainer":$template,
			// 		// 	});
			// 		// }
			// 		// // load ugc additional fields
			// 		// if (content["AdditionalFieldsOrder"]) {
			// 		// 	bvsdk.controllers.ugc.universal.loadUGCAdditionalFieldsGroups (content, {
			// 		// 		"parentContainer":$template,
			// 		// 	});
			// 		// }
			// 		// load ugc photos
			// 		if (content["Photos"]) {
			// 			bvsdk.controllers.ugc.universal.loadUGCPhotosGroup (content, {
			// 				"parentContainer":$template,
			// 			});
			// 		}
			// 		// load ugc videos
			// 		if (content["Videos"]) {
			// 			bvsdk.controllers.ugc.universal.loadUGCVideosGroup (content, {
			// 				"parentContainer":$template,
			// 			});
			// 		}
			// 		// load badges
			// 		if (content["BadgesOrder"]) {
			// 			// load user badges
			// 			bvsdk.controllers.badges.loadBadges(content, {
			// 				"parentContainer":$template,
			// 				"targetContainer":bvsdk.models.targets["badge"]["universal"]["container-group-user"],
			// 				"loadOrder":bvsdk.models.badges.userOrder,
			// 			});
			// 			// load UGC badges
			// 			bvsdk.controllers.badges.loadBadges(content, {
			// 				"parentContainer":$template,
			// 				"targetContainer":bvsdk.models.targets["badge"]["universal"]["container-group-content"],
			// 				"loadOrder":bvsdk.models.badges.contentOrder,
			// 			});
			// 		}
			// 		// load review feedback
			// 		if (typeof content["TotalFeedbackCount"] != undefined) {
			// 			bvsdk.controllers.feedback.loadFeedback(content, {
			// 				"parentContainer":$template,
			// 				"productId":productId,
			// 				"contentId":contentId,
			// 				"feedbackSettings":{
			// 					"contentType":"question",
			// 				},
			// 			});
			// 		}

			// 		// load comments if available
			// 		if (typeof content["TotalCommentCount"] != undefined) {
			// 			bvsdk.models.ugc.answer.getUGC (contentId, $bvsdk($template).find(bvsdk.models.targets["ugc"]["answer"]["container-widget"]).andSelf().filter(bvsdk.models.targets["ugc"]["answer"]["container-widget"]), function(content, modelLocalDefaultSettings) {
			// 				bvsdk.controllers.ugc.answer.loadAnswerWidget (content, {
			// 					"parentContainer":$template,
			// 					"productId":productId,
			// 					"contentId":contentId,
			// 					"modelLocalDefaultSettings":{
			// 						"Parameters":modelLocalDefaultSettings,
			// 					},
			// 				});
			// 			});
			// 		}

			// 		/***** magpie start - place all content loading BEFORE this *****/
			// 		bvsdk.controllers.magpie.addImpression (content, {
			// 			"contentType" : "Question",
			// 			"bvProduct" : "QuestionAndAnswer",
			// 			"visible" : $bvsdk("#" + newID).visible(true),
			// 			"categoryId":settings["magpie"]["categoryId"],
			// 			"rootCategoryId":settings["magpie"]["rootCategoryId"],
			// 			"brand":settings["magpie"]["brand"],
			// 	        "numPeers" : bvsdk.models.magpie.totalContentDisplayed["question"]["total"],
			// 	        "initialContent" : (bvsdk.models.magpie.totalContentDisplayed["question"]["update"] == 0) ? "true" : "false",
			// 		});
			// 		/***** magpie end *****/
			// 	},

			// 	/**************************************** PRIMARY SUMMARY ****************************************/


			// 	loadPrimarySummary : function (content, options) {
			// 		var settings = $bvsdk.extend(true, {
			// 			"parentContainer":"body", // template must be defined in call
			// 			"targetContainer":bvsdk.models.targets["ugc"]["question"]["container-summary-primary"],
			// 			"viewContainer":bvsdk.models.templates["ugc"]["question"]["container-summary-primary"],
			// 			"productId":"",
			// 		}, options);
			// 		// set content
			// 		var bvContent = {};
			// 		var ugcStatisticsToLoad;
			// 		if (content["Includes"]["Products"]) {
			// 			if (content["Includes"]["Products"][settings["productId"]]) {
			// 				ugcStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] || content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']; // review stats
			// 			}
			// 		}
			// 		var ugcToLoad = content["Results"]; // reviews
			// 		// set container & template
			// 		var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
			// 		var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
			// 		// add widget template
			// 		$container.html($template);

			// 		// check to make sure reviews statistics exist - they are needed to create primary summary
			// 		if (ugcStatisticsToLoad) {
			// 			// overall rating average
			// 			bvsdk.controllers.ugc.universal.loadUGCRating (ugcStatisticsToLoad, {
			// 				"parentContainer":$template,
			// 			});
			// 			// histogram
			// 			bvsdk.controllers.histogram.loadHistogramOverallRating (ugcStatisticsToLoad, {
			// 				"parentContainer":$template,
			// 			});
			// 		}

			// 		// write review button
			// 		bvsdk.controllers.general.loadWriteQuestionButton (bvsdk.models.properties["button"]["question"]["write"],
			// 			// onclick functionality
			// 			function() {
			// 				// set variables
			// 				var productId = settings["productId"]
			// 				var returnURL = $bvsdk(location).attr("href") + "";
			// 				// set attributes and text for button
			// 				var submissionParams = "?" + $bvsdk.param({
			// 					"productId":productId,
			// 					"contentType":"question",
			// 					"returnURL":returnURL,
			// 				});
			// 				bvsdk.controllers.general.consoleLogFallback (submissionParams);
			// 				var url = bvsdk.models.config.siteBaseSubmissionURL + submissionParams;
			// 				// load submission container
			// 				bvsdk.controllers.general.loadSubmissionPage (url);
			// 			}, {
			// 				"parentContainer":$template,
			// 				"viewContainer":bvsdk.models.templates["button"]["universal"]["text"],
			// 			}
			// 		);

			// 		// read reviews button
			// 		bvsdk.controllers.general.loadReadQuestionsButton (bvsdk.models.properties["button"]["question"]["read"], null, {
			// 			"parentContainer":$template,
			// 			"viewContainer":bvsdk.models.templates["button"]["universal"]["text"],
			// 			"productId":settings["productId"],
			// 		});
			// 	},

			// 	loadPrimarySummaryNoContent : function (content, options) {
			// 		var settings = $bvsdk.extend(true, {
			// 			"parentContainer":"body", // template must be defined in call
			// 			"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-summary-primary"],
			// 			"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-summary-primary-nocontent"],
			// 			"productId":"",
			// 		}, options);
			// 		// set content
			// 		var bvContent = {};
			// 		// set container & template
			// 		var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
			// 		var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
			// 		// add widget template
			// 		$container.html($template);
			// 		// write review button
			// 		bvsdk.controllers.general.loadWriteReviewButton (bvsdk.models.properties["button"]["review"]["write-first"],
			// 			// onclick functionality
			// 			function() {
			// 				// set variables
			// 				var productId = settings["productId"]
			// 				var returnURL = $bvsdk(location).attr("href") + "";
			// 				// set attributes and text for button
			// 				var submissionParams = "?" + $bvsdk.param({
			// 					"productId":productId,
			// 					"contentType":"review",
			// 					"returnURL":returnURL,
			// 				});
			// 				bvsdk.controllers.general.consoleLogFallback (submissionParams);
			// 				var url = bvsdk.models.config.siteBaseSubmissionURL + submissionParams;
			// 				// load submission container
			// 				bvsdk.controllers.general.loadSubmissionPage (url);
			// 			}, {
			// 				"parentContainer":$template,
			// 				"viewContainer":bvsdk.models.templates["button"]["universal"]["text"],
			// 			}
			// 		);
			// 	},

			// 	/**************************************** QUICKTAKE ****************************************/

			// 	loadQuickTake : function (content, options) {
			// 		var settings = $bvsdk.extend(true, {
			// 			"parentContainer":"body", // template must be defined in call
			// 			"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-quicktake"],
			// 			"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-quicktake"],
			// 			"productId":"",
			// 		}, options);
			// 		// set content
			// 		var bvContent = {};
			// 		var ugcStatisticsToLoad;
			// 		if (content["Includes"]["Products"]) {
			// 			if (content["Includes"]["Products"][settings["productId"]]) {
			// 				ugcStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] || content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']; // review stats
			// 			}
			// 		}
			// 		var ugcToLoad = content["Results"]; // reviews
			// 		// set container & template
			// 		var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
			// 		var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
			// 		// add widget template
			// 		$container.html($template);

			// 		// check to make sure reviews statistics exist - they are needed to load the quick take
			// 		if (ugcStatisticsToLoad) {
			// 			// overall rating average
			// 			bvsdk.controllers.ugc.universal.loadUGCRating (ugcStatisticsToLoad, {
			// 				"parentContainer":$template,
			// 			});
			// 			// histogram
			// 			bvsdk.controllers.histogram.loadHistogramOverallRating (ugcStatisticsToLoad, {
			// 				"parentContainer":$template,
			// 			});
			// 			// recommended average
			// 			bvsdk.controllers.ugc.universal.loadUGCRecommendedAverage (ugcStatisticsToLoad, {
			// 				"parentContainer":$template,
			// 			});
			// 		}
			// 		// write review button
			// 		bvsdk.controllers.general.loadWriteReviewButton (bvsdk.models.properties["button"]["review"]["write"],
			// 			// onclick functionality
			// 			function() {
			// 				// set variables
			// 				var productId = settings["productId"]
			// 				var returnURL = $bvsdk(location).attr("href") + "";
			// 				// set attributes and text for button
			// 				var submissionParams = "?" + $bvsdk.param({
			// 					"productId":productId,
			// 					"contentType":"review",
			// 					"returnURL":returnURL,
			// 				});
			// 				bvsdk.controllers.general.consoleLogFallback (submissionParams);
			// 				var url = bvsdk.models.config.siteBaseSubmissionURL + submissionParams;
			// 				// load submission container
			// 				bvsdk.controllers.general.loadSubmissionPage (url);
			// 			}, {
			// 				"parentContainer":$template,
			// 			}
			// 		);
			// 	},

			// 	loadQuickTakeNoContent : function (content, options) {
			// 		var settings = $bvsdk.extend(true, {
			// 			"parentContainer":"body", // template must be defined in call
			// 			"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-quicktake"],
			// 			"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-quicktake-nocontent"],
			// 			"productId":"",
			// 		}, options);
			// 		// set content
			// 		var bvContent = {};
			// 		// set container & template
			// 		var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
			// 		var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
			// 		// add widget template
			// 		$container.html($template);
			// 		// write review button
			// 		bvsdk.controllers.general.loadWriteReviewButton (bvsdk.models.properties["button"]["review"]["write-first"],
			// 			// onclick functionality
			// 			function() {
			// 				// set variables
			// 				var productId = settings["productId"]
			// 				var returnURL = $bvsdk(location).attr("href") + "";
			// 				// set attributes and text for button
			// 				var submissionParams = "?" + $bvsdk.param({
			// 					"productId":productId,
			// 					"contentType":"review",
			// 					"returnURL":returnURL,
			// 				});
			// 				bvsdk.controllers.general.consoleLogFallback (submissionParams);
			// 				var url = bvsdk.models.config.siteBaseSubmissionURL + submissionParams;
			// 				// load submission container
			// 				bvsdk.controllers.general.loadSubmissionPage (url);
			// 			}, {
			// 				"parentContainer":$template,
			// 			}
			// 		);
			// 	},

			// 	/**************************************** FEATURED UGC WIDGET ****************************************/

			// 	initFeaturedUGCWidget : function () {
			// 		bvsdk.models.ugc.review.getUGC (bvConfigSDK["productId"], bvsdk.models.targets["ugc"]["review"]["container-featured-widget"], function(content, modelLocalDefaultSettings) {

			// 			// callback functions
			// 			bvsdk.controllers.ugc.review.loadFeaturedUGCWidget (content, {
			// 				"parentContainer":"body",
			// 				"productId":bvConfigSDK["productId"],
			// 				"modelLocalDefaultSettings":{
			// 					"Parameters":modelLocalDefaultSettings
			// 				}
			// 			});

			// 			/***** magpie start - place all content loading BEFORE this *****/
			// 			bvsdk.controllers.magpie.trackPageView (null, bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]);
			// 			_bvaq.push(['flushBatch']);
			// 			/***** magpie end *****/

			// 		}, {
			// 			// api parameters
			// 			"Parameters":{
			// 				"limit":1,
			// 				"filter":{
			// 					"isfeatured":"true",
			// 				},
			// 				"sort":{
			// 					// "contextdatavalue_Age": "asc",
			// 				}
			// 			}
			// 		});	
			// 	},

			// 	loadFeaturedUGCWidget : function (content, options) {
			// 		var settings = $bvsdk.extend(true, {
			// 			"parentContainer" :"body", // container must be defined in call
			// 			"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-featured-widget"],
			// 			"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-widget"],
			// 			"loadOrder":"",
			// 			"productId":"",
			// 			"modelLocalDefaultSettings":"",
			// 		}, options);
			// 		// set content
			// 		var bvContent = {};
			// 		var ugcStatisticsToLoad;
			// 		if (content["Includes"]["Products"]) {
			// 			if (content["Includes"]["Products"][settings["productId"]]) {
			// 				ugcStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] || content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']; // review stats
			// 				/***** magpie start *****/
			// 		  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"] = content["Includes"]["Products"][settings["productId"]]["CategoryId"];
			// 		  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"] = content["Includes"]["Products"][settings["productId"]]["Brand"]["Name"];
			// 				/***** magpie end *****/
			// 			}
			// 		}
			// 		var ugcToLoad = content["Results"]; // reviews
			// 		// set container & template
			// 		var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
			// 		var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
			// 		// add widget template
			// 		$container.html($template);

			// 		// check to make sure reviews exist
			// 		if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$bvsdk.isEmptyObject(ugcToLoad)) {
			// 			/***** magpie start - place all content loading AFTER this *****/
			// 			bvsdk.models.magpie.totalContentDisplayed["review"]["total"] = ugcToLoad.length;
			// 			/***** magpie end *****/

			// 			/***** headers *****/

			// 			// bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-featured"], {
			// 			// 	"parentContainer":$template,
			// 			// });

			// 			// load reviews
			// 			$bvsdk.each (ugcToLoad, function(key) {
			// 				bvsdk.controllers.ugc.review.loadIndividualUGC (ugcToLoad[key], {
			// 					"parentContainer":$template,
			// 					"productId":settings["productId"],
			// 					"magpie":{
			// 						"categoryId":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"],
			// 						"rootCategoryId":null,
			// 						"brand":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"],
			// 					}
			// 				});
			// 			});

			// 			// pagination
			// 			bvsdk.controllers.pagination.loadNumberedPagination (content, {
			// 				"parentContainer":$template,
			// 				"targetContainer":bvsdk.models.targets["pagination"]["review"]["container-widget"],
			// 				"viewReloadOptions":{
			// 					"model":bvsdk.models.ugc.review.getUGC,
			// 					"modelSettings":settings["modelLocalDefaultSettings"],
			// 					"controller":bvsdk.controllers.ugc.review.loadRatingReviewWidget,
			// 					"controllerSettings":settings,
			// 				},
			// 			});

			// 		} else {

			// 			/***** headers *****/
			// 			bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-nocontent"], {
			// 				"parentContainer":$template,
			// 			});

			// 		}

			// 		// set classes
			// 		bvsdk.controllers.general.addOddEvenClasses (bvsdk.models.objectVariables["container"]["review"]);
			// 		bvsdk.controllers.general.addFirstLastClasses (bvsdk.models.objectVariables["container"]["review"]);
			// 	},

			// 	/**************************************** VERSUS WIDGET ****************************************/

			// 	initVersusUGCWidget : function () {
			// 		bvsdk.models.ugc.review.getUGC (bvConfigSDK["productId"], bvsdk.models.targets["ugc"]["review"]["container-helpful-high-widget"], function(content, modelLocalDefaultSettings) {

			// 			// callback functions
			// 			bvsdk.controllers.ugc.review.loadHelpfulHighUGCWidget (content, {
			// 				"parentContainer":"body",
			// 				"productId":bvConfigSDK["productId"],
			// 				"modelLocalDefaultSettings":{
			// 					"Parameters":modelLocalDefaultSettings
			// 				}
			// 			});

			// 			/***** magpie start - place all content loading BEFORE this *****/
			// 			bvsdk.controllers.magpie.trackPageView (null, bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]);
			// 			_bvaq.push(['flushBatch']);
			// 			/***** magpie end *****/

			// 		}, {
			// 			// api parameters
			// 			"Parameters":{
			// 				"limit":1,
			// 				"filter":{
			// 					"rating":"5",
			// 				},
			// 				"sort":{
			// 					"totalpositivefeedbackcount": "desc",
			// 				},
			// 			}
			// 		});

			// 		bvsdk.models.ugc.review.getUGC (bvConfigSDK["productId"], bvsdk.models.targets["ugc"]["review"]["container-helpful-low-widget"], function(content, modelLocalDefaultSettings) {

			// 			// callback functions
			// 			bvsdk.controllers.ugc.review.loadHelpfulLowUGCWidget (content, {
			// 				"parentContainer":"body",
			// 				"productId":bvConfigSDK["productId"],
			// 				"modelLocalDefaultSettings":{
			// 					"Parameters":modelLocalDefaultSettings
			// 				}
			// 			});

			// 			/***** magpie start - place all content loading BEFORE this *****/
			// 			bvsdk.controllers.magpie.trackPageView (null, bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]);
			// 			_bvaq.push(['flushBatch']);
			// 			/***** magpie end *****/

			// 		}, {
			// 			// api parameters
			// 			"Parameters":{
			// 				"limit":1,
			// 				"filter":{
			// 					"rating":"1",
			// 				},
			// 				"sort":{
			// 					"totalpositivefeedbackcount": "desc",
			// 				},
			// 			}
			// 		});
			// 	},

			// 	loadHelpfulHighUGCWidget : function (content, options) {
			// 		var settings = $bvsdk.extend(true, {
			// 			"parentContainer" :"body", // container must be defined in call
			// 			"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-helpful-high-widget"],
			// 			"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-widget"],
			// 			"loadOrder":"",
			// 			"productId":"",
			// 			"modelLocalDefaultSettings":"",
			// 		}, options);
			// 		// set content
			// 		var bvContent = {};
			// 		var ugcStatisticsToLoad;
			// 		if (content["Includes"]["Products"]) {
			// 			if (content["Includes"]["Products"][settings["productId"]]) {
			// 				ugcStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] || content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']; // review stats
			// 				/***** magpie start *****/
			// 		  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"] = content["Includes"]["Products"][settings["productId"]]["CategoryId"];
			// 		  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"] = content["Includes"]["Products"][settings["productId"]]["Brand"]["Name"];
			// 				/***** magpie end *****/
			// 			}
			// 		}
			// 		var ugcToLoad = content["Results"]; // reviews
			// 		// set container & template
			// 		var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
			// 		var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
			// 		// add widget template
			// 		$container.html($template);

			// 		// check to make sure reviews exist
			// 		if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$bvsdk.isEmptyObject(ugcToLoad)) {
			// 			/***** magpie start - place all content loading AFTER this *****/
			// 			bvsdk.models.magpie.totalContentDisplayed["review"]["total"] = ugcToLoad.length;
			// 			/***** magpie end *****/

			// 			/***** headers *****/

			// 			bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-helpful-high"], {
			// 				"parentContainer":$template,
			// 			});

			// 			// load reviews
			// 			$bvsdk.each (ugcToLoad, function(key) {
			// 				bvsdk.controllers.ugc.review.loadIndividualUGC (ugcToLoad[key], {
			// 					"parentContainer":$template,
			// 					"viewContainer":"#bvtemplate-individual-review-helpful",
			// 					"productId":settings["productId"],
			// 					"magpie":{
			// 						"categoryId":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"],
			// 						"rootCategoryId":null,
			// 						"brand":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"],
			// 					}
			// 				});
			// 			});

			// 		} else {

			// 			/***** headers *****/
			// 			bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-nocontent"], {
			// 				"parentContainer":$template,
			// 			});

			// 		}

			// 		// set classes
			// 		bvsdk.controllers.general.addOddEvenClasses (bvsdk.models.objectVariables["container"]["review"]);
			// 		bvsdk.controllers.general.addFirstLastClasses (bvsdk.models.objectVariables["container"]["review"]);
			// 	},

			// 	loadHelpfulLowUGCWidget : function (content, options) {
			// 		var settings = $bvsdk.extend(true, {
			// 			"parentContainer" :"body", // container must be defined in call
			// 			"targetContainer":bvsdk.models.targets["ugc"]["review"]["container-helpful-low-widget"],
			// 			"viewContainer":bvsdk.models.templates["ugc"]["review"]["container-widget"],
			// 			"loadOrder":"",
			// 			"productId":"",
			// 			"modelLocalDefaultSettings":"",
			// 		}, options);
			// 		// set content
			// 		var bvContent = {};
			// 		var ugcStatisticsToLoad;
			// 		if (content["Includes"]["Products"]) {
			// 			if (content["Includes"]["Products"][settings["productId"]]) {
			// 				ugcStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] || content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']; // review stats
			// 				/***** magpie start *****/
			// 		  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"] = content["Includes"]["Products"][settings["productId"]]["CategoryId"];
			// 		  		bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"] = content["Includes"]["Products"][settings["productId"]]["Brand"]["Name"];
			// 				/***** magpie end *****/
			// 			}
			// 		}
			// 		var ugcToLoad = content["Results"]; // reviews
			// 		// set container & template
			// 		var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
			// 		var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
			// 		// add widget template
			// 		$container.html($template);

			// 		// check to make sure reviews exist
			// 		if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$bvsdk.isEmptyObject(ugcToLoad)) {
			// 			/***** magpie start - place all content loading AFTER this *****/
			// 			bvsdk.models.magpie.totalContentDisplayed["review"]["total"] = ugcToLoad.length;
			// 			/***** magpie end *****/

			// 			/***** headers *****/

			// 			bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-helpful-low"], {
			// 				"parentContainer":$template,
			// 			});

			// 			// load reviews
			// 			$bvsdk.each (ugcToLoad, function(key) {
			// 				bvsdk.controllers.ugc.review.loadIndividualUGC (ugcToLoad[key], {
			// 					"parentContainer":$template,
			// 					"viewContainer":"#bvtemplate-individual-review-helpful",
			// 					"productId":settings["productId"],
			// 					"magpie":{
			// 						"categoryId":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["categoryId"],
			// 						"rootCategoryId":null,
			// 						"brand":bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["brand"],
			// 					}
			// 				});
			// 			});

			// 		} else {

			// 			/***** headers *****/
			// 			bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["review"]["page-nocontent"], {
			// 				"parentContainer":$template,
			// 			});

			// 		}

			// 		// set classes
			// 		bvsdk.controllers.general.addOddEvenClasses (bvsdk.models.objectVariables["container"]["review"]);
			// 		bvsdk.controllers.general.addFirstLastClasses (bvsdk.models.objectVariables["container"]["review"]);
			// 	},

			// 	/**************************************** TAG CLOUD ****************************************/

			// 	initTagCloud : function () {

			// 		bvsdk.models.ugc.review.getUGC (bvConfigSDK["productId"], bvsdk.models.targets["ugc"]["review"]["container-tagcloud-widget"], function(content, modelLocalDefaultSettings) {

			// 			// callback functions
			// 			bvsdk.controllers.ugc.review.loadTagCloudWidget (content, {
			// 				"parentContainer":"body",
			// 				"productId":bvConfigSDK["productId"],
			// 				"modelLocalDefaultSettings":{
			// 					"Parameters":modelLocalDefaultSettings
			// 				}
			// 			});

			// 			/***** magpie start - place all content loading BEFORE this *****/
			// 			bvsdk.controllers.magpie.trackPageView (null, bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]);
			// 			_bvaq.push(['flushBatch']);
			// 			/***** magpie end *****/

			// 		}, {
			// 			// api parameters
			// 			"Parameters":{
			// 				// "limit":"100",
			// 				"filter":{
			// 					// "isfeatured":"true",
			// 				},
			// 				"sort":{
			// 					// "contextdatavalue_Age": "asc",
			// 				}
			// 			}
			// 		});
			// 	},

			// 	loadTagCloudWidget : function (content, options) {
			// 		var settings = $bvsdk.extend(true, {
			// 			"parentContainer" :"body", // container must be defined in call
			// 			"targetContainer":bvsdk.models.targets["ugc"]["universal"]["container-tagcloud-widget"],
			// 			// "viewContainer":bvsdk.models.templates["ugc"]["review"]["container-widget"],
			// 			"viewContainer":"#bvtemplate-tagcloud-group-universal",
			// 			"loadOrder":"",
			// 			"productId":"",
			// 			"modelLocalDefaultSettings":"",
			// 			"tagCloudSettings":{
			// 				"content":{
			// 					"tags":true,
			// 					"commonWords":false,
			// 					"acceptedWords":false,
			// 				},
			// 				"displayCount":15,
			// 				"filter":false,
			// 				"intervalCount":10,
			// 				"minCount":5,
			// 				"acceptedWordsArray" : ["jfl", "submit"],
			// 				"restrictedWordsArray" : ["the", "labelseaders"],
			// 			},
			// 		}, options);
			// 		// set content
			// 		var bvContent = {};
			// 		var statisticsToLoad;
			// 		if (content["Includes"]["Products"]) {
			// 			if (content["Includes"]["Products"][settings["productId"]]) {
			// 				statisticsToLoad= content["Includes"]["Products"][settings["productId"]]['FilteredReviewStatistics'] // filterd review stats
			// 				|| content["Includes"]["Products"][settings["productId"]]['ReviewStatistics'] // review stats
			// 				|| content["Includes"]["Products"][settings["productId"]]['FilteredQAStatistics'] // filtered QA stats
			// 				|| content["Includes"]["Products"][settings["productId"]]['QAStatistics'] // QA stats
			// 				|| content["Includes"]["Products"][settings["productId"]]['FilteredStoryStatistics'] // filtered story stats
			// 				|| content["Includes"]["Products"][settings["productId"]]['StoryStatistics']; // story stats
			// 			}
			// 		}
			// 		var ugcToLoad = content["Results"]; // ugc content
			// 		// set container & template
			// 		var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
			// 		var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
			// 		// add widget template
			// 		$container.html($template);

			// 		// check to make sure ugc exist
			// 		if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$bvsdk.isEmptyObject(ugcToLoad)) {

			// 			// create concatenated string full of UGC body text for all loaded content
			// 			var ugcText = new String;
			// 			$bvsdk.each (ugcToLoad, function() {
			// 				ugcText += this["Title"] + (this["ReviewText"] || this["QuesionText"] || this["AnswerText"] || this["StoryText"] || this["CommentText"]) + " . ";
			// 			});

			// 			// object to hold value and count of each tag
			// 			var ugcWordsCount = new Object;
			// 			// array to hold each tag
			// 			var ugcWords = ugcText.split(/\b/);

			// 			var preps = ["aboard", "about", "above", "across", "after", "against", "along", "amid", "among", "anti", "around", "as", "at", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", "concerning", "considering", "despite", "down", "during", "except", "excepting", "excluding", "following", "for", "from", "in", "inside", "into", "like", "minus", "near", "of", "off", "on", "onto", "opposite", "outside", "over", "past", "per", "plus", "regarding", "round", "save", "since", "than", "through", "to", "towards", "under", "underneath", "unlike", "until", "up", "upon", "versus", "via", "with", "within", "without"];
			// 			var pronouns = ["all", "another", "any", "anybody", "anyone", "anything", "both", "each", "either", "everybody", "everyone", "everything", "few", "he", "her", "hers", "herself", "him", "himself", "his", "I", "it", "its", "itself", "many", "me", "mine", "more", "most", "much", "my", "myself", "neither", "no one", "nobody", "none", "nothing", "one", "other", "others", "our", "ours", "ourselves", "several", "she", "some", "somebody", "someone", "something", "that", "their", "theirs", "them", "themselves", "these", "they", "this", "those", "us", "we", "what", "whatever", "which", "whichever", "who", "whoever", "whom", "whomever", "whose", "you", "your", "yours", "yourself", "yourselves"];

			// 			// var sentences = ugcText.split(/[\\.!\?]/);
			// 			// var sentences2 = ugcText.match( /[^\.!\?]+[\.!\?]+/g );
			// 			// console.log("sentences", sentences, sentences2);

			// 			// array of good words to specifically look for and use
			// 			var acceptedWordsArray = settings["tagCloudSettings"]["acceptedWordsArray"];
			// 			// array of bad words to specifically look for and avoid
			// 			var restrictedWordsArray = settings["tagCloudSettings"]["restrictedWordsArray"];

			// 			// create object with each ugc word's value and count
			// 			for (var i = 0; i < ugcWords.length; i++) {
			// 				// ugc word
			// 				var word = ugcWords[i].replace(/\s/g, '');
			// 				// set to lower case during testing to ignore casing
			// 				word = word.toLowerCase();
			// 				// check if word fits criteria
			// 				if (word.length > 4 && !($bvsdk.inArray(word, restrictedWordsArray) > -1)) {
			// 					// add underscore to eliminate conflicts with object properties
			// 					ugcWordsCount["_" + word] = {
			// 						// increment count
			// 						"Count" : (ugcWordsCount["_" + ugcWords[i]]) ? (ugcWordsCount["_" + ugcWords[i]]["Count"] || 0) + 1 : 1,
			// 						// set value of word/phrase
			// 						"Value" : word,
			// 					}
			// 				}
			// 			}

			// 			// create array to hold each keyword object
			// 			var keywordsArray = [];
			// 			$bvsdk.each (ugcWordsCount, function() {
			// 				keywordsArray.push(this);
			// 			})

			// 			// create object to hold keyword array - this is needed to replicate the layout of the tag distribution object
			// 			var keywordsObject = {"keywords" : {
			// 				"Id":"search",
			// 				"Label":"Trending Words",
			// 				"Values":keywordsArray,
			// 			}}

			// 			if (settings["tagCloudSettings"]["content"]["tags"]) {
			// 				$bvsdk.each(statisticsToLoad["TagDistribution"], function() {
			// 					this["Id"] = "tag_" + this["Id"];
			// 				});
			// 			}

			// 			// merge tag and keyword objects
			// 			var ugcTags = $bvsdk.extend(statisticsToLoad["TagDistribution"], keywordsObject);
			// 			// array to hold tag objects that meet criteria (minimum count, restricted words, etc.)
			// 			var ugcTagsFiltered = [];
			// 			// array to hold keys for each tag to be displayed
			// 			var ugcKeys = [];

			// 			var tagIntervals = settings["tagCloudSettings"]["intervalCount"]; // amount of intervals in tag styling
			// 			var highCount; // highest tag count
			// 			var lowCount; // lowest tag count

			// 			// set keys, tags, high count, and low count to represent filtered tag data
			// 			$bvsdk.each (ugcTags, function() {
			// 				for (var i = 0; i < this["Values"].length; i++) {
			// 					// check for criteria
			// 					if (this["Values"][i]["Count"] >= settings["tagCloudSettings"]["minCount"]) {
			// 						// add tag key
			// 						ugcKeys.push(ugcTagsFiltered.length);
			// 						// add tag
			// 						this["Values"][i]["Parameter"] = this["Id"];
			// 						ugcTagsFiltered.push(this["Values"][i]);
			// 						// set high count
			// 						if (this["Values"][i]["Count"] > highCount || highCount == undefined) {
			// 							highCount = this["Values"][i]["Count"];
			// 						}
			// 						// set low count
			// 						if (this["Values"][i]["Count"] < lowCount || lowCount == undefined) {
			// 							lowCount = this["Values"][i]["Count"];
			// 						}
			// 					}
			// 				}
			// 			});

			// 			console.log("filter", ugcTagsFiltered);

			// 			// comparing function to sort array of obejcts by the count value
			// 			function compare(a, b) {
			// 				if (a["Count"] > b["Count"]) {
			// 					return -1;
			// 				}
			// 				if (a["Count"] < b["Count"]) {
			// 					return 1;
			// 				}
			// 				return 0;
			// 			}
			// 			// sort the array of object by count
			// 			ugcTagsFiltered.sort(compare);
			// 			var test = {
			// 				"Id":"search",
			// 				"Label":"test",
			// 				"Values":ugcTagsFiltered,
			// 			}

			// 			// slice array of keys so only the configured amount of tags are displayed
			// 			ugcKeys = ugcKeys.slice(0, settings["tagCloudSettings"]["displayCount"]);

			// 			var tagRangeTotal = (highCount - lowCount); // range between tag counts
			// 			var tagRangeInt = tagRangeTotal/tagIntervals; // size of range for each tag interval

			// 			// load tags
			// 			$bvsdk.each(ugcKeys, function() {
			// 				var ugcKey = Math.floor(Math.random() * ugcKeys.length); // key to be displayed
			// 				var ugcTag = ugcTagsFiltered[ugcKeys[ugcKey]]; // tag to be displays
			// 				var ugcTagInt = tagIntervals - Math.floor((ugcTag["Count"] - lowCount) / tagRangeInt); // tag interval rank

			// 				// new tag cloud item
			// 				var tagCloudItem = new Object();
			// 				tagCloudItem["Value"] = ugcTag["Value"]; // tag word/phrase value
			// 				tagCloudItem["Count"] = ugcTag["Count"]; // tag count
			// 				tagCloudItem["Interval"] = ugcTagInt; // tag interval
			// 				// load individual tag cloud item
			// 				if (settings["tagCloudSettings"]["filter"]) {
			// 					bvsdk.controllers.ugc.review.loadTagCloudItems (tagCloudItem, {
			// 						"parentContainer" : $template,
			// 					});
			// 				} else {
			// 					bvsdk.controllers.ugc.review.loadTagCloudItems (tagCloudItem, {
			// 						"parentContainer" : $template,
			// 					});
			// 				}
			// 				// update keys to load to remove loaded tag cloud item
			// 				ugcKeys.splice(ugcKey, 1);

			// 			});

			// 		} else {
			// 			$bvsdk($template).html("no tags")
			// 		}

			// 	},

			// 	loadTagCloudItems : function (content, options) {
			// 		var settings = $bvsdk.extend(true, {
			// 			"parentContainer" :"", // container must be defined in call
			// 			"targetContainer":bvsdk.models.targets["ugc"]["universal"]["container-tagcloud-group-widget"],
			// 			// "viewContainer":bvsdk.models.templates["ugc"]["review"]["container-widget"],
			// 			"viewContainer":"#bvtemplate-tagcloud-individual-universal",
			// 			"loadOrder":"",
			// 			"productId":"",
			// 			"modelLocalDefaultSettings":"",
			// 			"tagCloudSettings":{
			// 				"filter":false,
			// 			},
			// 		}, options);
			// 		// set content
			// 		var bvContent = {
			// 			"filter-value" : content["Value"],
			// 			"filter-count" : content["Count"],
			// 			"tagcloud-interval" : content["Interval"],
			// 		};
			// 		// set container & template
			// 		var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
			// 		var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
			// 		// add tag cloud class
			// 		$bvsdk($template).addClass("BVTagCloudItem" + bvContent["tagcloud-interval"]);

			// 		// if filtering option is set, load filter
			// 		if (settings["tagCloudSettings"]["filter"]) {
			// 			bvsdk.controllers.filters.loadIndividualFilters (content, {
			// 				"parentContainer":$template,
			// 				// "targetContainer":bvsdk.models.targets["ugc"]["universal"]["container-tagcloud-group-widget"],
			// 				// "viewContainer":"#bvtemplate-tagcloud-individual-universal",
			// 				"loadOrder":settings["loadOrder"],
			// 				// "filterSettings":{
			// 				// 	"filterParameter":false,
			// 				// },
			// 				"viewReloadOptions":{
			// 					"model":bvsdk.models.ugc.review.getUGC,
			// 					"modelSettings":settings["modelLocalDefaultSettings"],
			// 					"controller":loadTagCloudReviewWidget,
			// 					"controllerSettings":settings,
			// 				},
			// 			});
			// 		} else {

			// 		}

			// 		// add widget template
			// 		$container.append($template);

			// 	},

			// },


			universal : {

			},

		},

	},

});