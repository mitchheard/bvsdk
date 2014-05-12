$bvsdk.extend(true, bvsdk, {

	controllers : {

		ugc : {

			universal : {

				loadUGCTitle : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["title"],
						"viewContainer":bvsdk.models.templates["ugc"]["universal"]["title"],
					}, options);
					// set content
					var bvContent = {
						"title" : content['Title'],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
				},

				loadUGCBody : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["body"],
						"viewContainer":bvsdk.models.templates["ugc"]["universal"]["body"],
					}, options);
					// set content
					var bvContent = {
						"text-body" : content['ReviewText'] || content['QuestionText'] || content['AnswerText'] || content['StoryText'] || content['CommentText'],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
				},

				loadUGCDate : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["date"],
						"viewContainer":bvsdk.models.templates["ugc"]["universal"]["date"],
					}, options);
					// set content
					var bvContent = {
						"date" : $bvsdk.format.date(content['SubmissionTime'], bvsdk.models.config.bvDateFormat),
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
				},

				/***** TAGS - (PROS/CONS) *****/

				loadUGCTagGroups : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["tag-group"],
						"viewContainer":bvsdk.models.templates["ugc"]["universal"]["tag-group"],
						"loadOrder":content["TagDimensionsOrder"],
					}, options);
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(index) {
							// current iteration of loop
							var cur = settings["loadOrder"][index];
							// set content
							var bvContent = {
								"tag-id" : content["TagDimensions"][cur]["Id"],
								"tag-label" : content["TagDimensions"][cur]["Label"],
								"tag-values" : content["TagDimensions"][cur]["Values"],
							};
							// set container & template
							var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
							var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
							// add template
							$container.append($template);

							// load tags
							$bvsdk.each(bvContent["tag-values"], function(index) {
								if ((index + 1) == bvContent["tag-values"].length) {
									bvsdk.controllers.ugc.universal.loadUGCTagIndividual (this, {
										"parentContainer":$template,
										"viewContainer":bvsdk.models.templates["ugc"]["universal"]["tag-individual-last"],
									});
								} else {
									bvsdk.controllers.ugc.universal.loadUGCTagIndividual (this, {
										"parentContainer":$template,
									});

								}
							});
						});
					}
				},

				loadUGCTagIndividual : function (content, options) {
					// content expected [<ugc content>]["TagDimensions"][<tag name>]["Values"]
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["tag-individual"],
						"viewContainer":bvsdk.models.templates["ugc"]["universal"]["tag-individual"],
					}, options);
					// set content
					var bvContent = {
						"tag-value" : content,
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
				},

				/***** ADDITIONAL FIELDS *****/

				loadUGCAdditionalFieldsGroups : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["additionalfield-group"],
						"viewContainer":bvsdk.models.templates["ugc"]["universal"]["additionalfield-individual"],
						"loadOrder":content["AdditionalFieldsOrder"],
					}, options);
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(index) {
							// current iteration of loop
							var cur = settings["loadOrder"][index];
							// set content
							var bvContent = {
								"additionalfield-id" : content["AdditionalFields"][cur]["Id"],
								"additionalfield-value" : content["AdditionalFields"][cur]["Value"],
								"additionalfield-value-label" : content["AdditionalFields"][cur]["Label"],
							};
							// set container & template
							var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
							var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
							// add template
							$container.append($template);
						});
					}
				},

				/***** MEDIA - PHOTO & VIDEO *****/

				loadUGCPhotosGroup : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["photo-group"],
						"viewContainer":bvsdk.models.templates["ugc"]["universal"]["photo-individual"],
						"loadOrder":content["Photos"],
					}, options);
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(index) {
							// current iteration of loop
							var cur = settings["loadOrder"][index];
							// set content
							var thumbnail = new Image; // thumbnail image
							thumbnail.src = cur["Sizes"]["thumbnail"]["Url"]; // set thumbnail image src attr
							var photo = new Image; // photo image
							photo.src = cur["Sizes"]["normal"]["Url"]; // set photo image src attr
							var bvContent = {
								"photo-caption" : [cur]["Caption"],
								"photo-id" : [cur]["Id"],
								"photo-normal" : photo,
								"photo-normal-url" : cur["Sizes"]["normal"]["Url"],
								"photo-thumbnail" : thumbnail,
								"photo-thumbnail-url" : cur["Sizes"]["thumbnail"]["Url"],
							};
							// set container & template
							var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
							var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
							// add template
							$container.append($template);
							// set thumbnail
							$bvsdk($template).find("a[data-bv-content=\"['photo-thumbnail']\"]").andSelf().filter("a[data-bv-content=\"['photo-thumbnail']\"]").attr({
								"href":bvContent["photo-normal-url"],
								"title":bvContent["photo-caption"],
							});
						});
					}
				},

				loadUGCVideosGroup : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["video-group"],
						"viewContainer":bvsdk.models.templates["ugc"]["universal"]["video-individual"],
						"loadOrder":content["Videos"],
					}, options);
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(index) {
							// current iteration of loop
							var cur = settings["loadOrder"][index];
							// set content
							var thumbnail = new Image; // thumbnail image
							if (cur["VideoThumbnailUrl"]) {			
								thumbnail.src = cur["VideoThumbnailUrl"]; // set thumbnail image src attr
							} else {
								thumbnail.src = "http://techlivewire.com/wp-content/uploads/2013/10/youtube-playbutton.png"; // set thumbnail image src attr
							}
							var video = $bvsdk("<iframe />"); // video
							video.attr({"src":cur["VideoUrl"]}); // set video src attr
							var bvContent = {
								"video-caption" : [cur]["Caption"],
								"video-host" : [cur]["VideoHost"],
								"video-id" : [cur]["VideoId"],
								"video-normal" : video,
								"video-normal-url" : cur["VideoUrl"],
								"video-iframe" : video,
								"video-iframe-url" : cur["VideoIframeUrl"],
								"video-thumbnail" : thumbnail,
								"video-thumbnail-url" : cur["VideoThumbnailUrl"],
							};
							// set container & template
							var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
							var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
							// add template
							$container.append($template);
							// set thumbnail
							$bvsdk($template).find("[data-bv-content=\"['video-thumbnail']\"]").andSelf().filter("[data-bv-content=\"['video-thumbnail']\"]").attr({"href":bvContent["video-normal-url"],"title":bvContent["video-caption"]});
						});
					}
				},

				/***** USER DATA *****/

				loadUGCUserNickname : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["nickname"],
						"viewContainer":bvsdk.models.templates["ugc"]["universal"]["nickname"],
					}, options);
					// set content
					var bvContent = {
						"nickname" : content["UserNickname"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
				},

				loadUGCUserLocation : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["location"],
						"viewContainer":bvsdk.models.templates["ugc"]["universal"]["location"],
					}, options);
					// set content
					var bvContent = {
						"location" : content["UserLocation"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
				},

				/***** CONTEXT DATA VALUES (CDVs) *****/

				loadUGCContextDataValuesGroup : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["cdv-group"],
						"viewContainer":bvsdk.models.templates["ugc"]["universal"]["cdv-individual"],
						"loadOrder":content["ContextDataValuesOrder"],
					}, options);
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(index) {
							// current iteration of loop
							var cur = settings["loadOrder"][index];
							// set content
							var bvContent = {
								"cdv-id" : content["ContextDataValues"][cur]["Id"],
								"cdv-dimension-label" : content["ContextDataValues"][cur]["DimensionLabel"],
								"cdv-value" : content["ContextDataValues"][cur]["Value"],
								"cdv-value-label" : content["ContextDataValues"][cur]["ValueLabel"],
							};
							// set container & template
							var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
							var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
							// add template
							$container.append($template);
						});
					}
				},

				/***** RATINGS DATA *****/

				loadUGCRating : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review"]["rating-overall"],
						"viewContainer":bvsdk.models.templates["ugc"]["review"]["rating-overall"],
					}, options);
					// set content
					var bvContent = {
						"rating-overall-value" : (content['AverageOverallRating']) ? content['AverageOverallRating'].toFixed(bvsdk.models.config.defaultDecimalOptions["overallAverage"]) : content['Rating'].toFixed(bvsdk.models.config.defaultDecimalOptions["overall"]),
						"rating-overall-value-range" : (content['OverallRatingRange']) ? content['OverallRatingRange'].toFixed(bvsdk.models.config.defaultDecimalOptions["overallRange"]): content['RatingRange'].toFixed(bvsdk.models.config.defaultDecimalOptions["overallRange"]),
					};
					// set variables
					if (content['AverageOverallRating']) {
						// set average rating for magpie if necessary
						bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["avgRating"] = bvContent["rating-overall-value"];
					}
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
					// set star value
					bvsdk.controllers.general.setStarRating ($template, bvContent["rating-overall-value"], bvContent["rating-overall-value-range"]);
				},

				loadUGCSecondaryRatings : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["review"]["rating-secondary-individual"],
						"viewContainer":bvsdk.models.templates["ugc"]["review"]["rating-secondary-individual"],
						"loadOrder":content["SecondaryRatingsOrder"],
					}, options);
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(index) {
							// current iteration of loop
							var cur = settings["loadOrder"][index];
							// set content
							var bvContent = {
								"rating-secondary-display-type" : content["SecondaryRatings"][cur]["DisplayType"],
								"rating-secondary-id" : content["SecondaryRatings"][cur]["Id"],
								"rating-secondary-label" : content["SecondaryRatings"][cur]["Label"],
								"rating-secondary-max-label" : content["SecondaryRatings"][cur]["MaxLabel"],
								"rating-secondary-min-label" : content["SecondaryRatings"][cur]["MinLabel"],
								"rating-secondary-value" : content["SecondaryRatings"][cur]["Value"].toFixed(bvsdk.models.config.defaultDecimalOptions["secondary"]),
								"rating-secondary-value-label" : content["SecondaryRatings"][cur]["ValueLabel"],
								"rating-secondary-value-range" : content["SecondaryRatings"][cur]["ValueRange"].toFixed(bvsdk.models.config.defaultDecimalOptions["secondaryRange"]),
							};
							// set container & template
							var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
							var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
							// add template
							$container.append($template);
							// set star value
							bvsdk.controllers.general.setStarRating ($template, bvContent["rating-secondary-value"], bvContent["rating-secondary-value-range"]);
						});
					}
				},

				/***** RECOMMENDED DATA *****/

				loadUGCRecommended : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["recommended"],
						"viewContainer":"",
					}, options);
					// set content
					var bvContent = {
						"is-recommended" : content['IsRecommended'],
					};
					// set view
					if (content['IsRecommended'] == true) {
						settings["viewContainer"] = bvsdk.models.templates["ugc"]["universal"]["recommended-yes"];
					} else if (content['IsRecommended'] == false) {
						settings["viewContainer"] = bvsdk.models.templates["ugc"]["universal"]["recommended-no"];
					} else {
						return;
					}
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
				},

				loadUGCRecommendedAverage : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // template must be defined in call
						"targetContainer":bvsdk.models.targets["ugc"]["universal"]["recommended"],
						"viewContainer":bvsdk.models.templates["ugc"]["universal"]["recommended-average"],
					}, options);
					// set content
					var bvContent = {
						"recommended-count-yes" : content['RecommendedCount'],
						"recommended-count-no" : content['NotRecommendedCount'],
						"recommended-count-total" : content['RecommendedCount'] + content['NotRecommendedCount'],
						"recommended-percentage" : content['RecommendedCount'] / (content['RecommendedCount'] + content['NotRecommendedCount']),
						"recommended-percentage-formatted" : bvsdk.controllers.general.convertDecimalToPercentage (content['RecommendedCount'] / (content['RecommendedCount'] + content['NotRecommendedCount'])),
					};
					// set variables
					bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["percentRecommended"] = bvContent["recommended-percentage-formatted"];
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
				},

			},

		},

	},

});