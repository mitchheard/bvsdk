$bvsdk.extend(true, bvsdk, {

	controllers : {

		general : {

			/***** EVENT LISTENERS *****/

			loadEventListeners : function (content, options) {
				//event listener character counter
				if(options["textFieldCounter"] !== 'undefined') {
					$bvsdk(bvsdk.models.objectVariables["container"]["character-counter"]).html(bvsdk.models.config.controllerSubmissionDefaults["minimumCharacterCounter"]);
					$bvsdk(options["textFieldCounter"]["textField"]).bind('input', function(e) {
						if(bvsdk.models.config.controllerSubmissionDefaults["minimumCharacterCounter"] >= e["currentTarget"]["textLength"]) {
					    	$bvsdk(bvsdk.models.objectVariables["container"]["character-counter"]).removeClass(bvsdk.models.config.bvClassSuccess).html(bvsdk.models.config.controllerSubmissionDefaults["minimumCharacterCounter"]-e["currentTarget"]["textLength"]);
						}
						else {
							$bvsdk(bvsdk.models.objectVariables["container"]["character-counter"]).addClass(bvsdk.models.config.bvClassSuccess).removeClass(bvsdk.models.config.bvClassError).html(bvsdk.models.properties["submission"]["universal"]["charcounter-success"]);
						}
					}); 
				}
				else {
					bvsdk.controllers.general.consoleLogFallback (options["textFieldCounter"]);
				}
			},

			/***** FILE PATHS *****/

			pathResource : function (relativeURI) {
				var path = relativeURI.substr(0,4) == 'http' ? relativeURI : bvsdk.models.config.siteBaseURL + relativeURI;
				return path;
			},


			/***** FORMS *****/


			loadSubmissionPage : function (url) {
				if (url) {
					$bvsdk(location).attr('href', url);
				} else {
					alert("There is no URL to return to.");
				}
			},

			returnToPage : function (url) {
				if (url) {
					$bvsdk(location).attr('href', url);
				} else if (bvsdk.models.config.siteBaseURL) {
					$bvsdk(location).attr('href', bvsdk.models.config.siteBaseURL);
				} else {
					alert("There is no URL to return to.");
				}
			},

			/***** IDS & CLASSES *****/

			addOddEvenClasses : function (template) {
				var total = $bvsdk(template).length;
				var current = 1;
				$bvsdk(template).each(function() {
					if (current %2 != 0) {
						$bvsdk(this).addClass("BVodd");
					} else {
						$bvsdk(this).addClass("BVeven");
					}
					current ++;
				});
			},

			addFirstLastClasses : function (template) {
				$bvsdk(template).first().addClass("BVfirst");
				$bvsdk(template).last().addClass("BVlast");
			},

			/***** GENERAL *****/

			setStarRating : function (template, rating, range) {
				// set variables for images to load
				var imgLoad = $bvsdk(template).find('img'); // all images in template 
				var imgLoadTotal = imgLoad.length; // total amount of images in template
				var imgLoadCount = 0; // total amount of images currently loaded in template
				// loop through all images to keep track of when they finish loading
				$bvsdk.each(imgLoad, function() {
					// on image load
					$bvsdk(this).load(function() {
						// increment 1 to total count of images loaded
						imgLoadCount++;
						// if all images are loaded, run function
						if (imgLoadCount == imgLoadTotal) {
							// calculate variables for image sizing
							var imgWidth = $bvsdk(template).find(bvsdk.models.objectVariables["container"]["rating-star-image-unfilled"]).andSelf().filter(bvsdk.models.objectVariables["container"]["rating-star-image-unfilled"]).width(); // width of unfilled star image to use as a base size
						   	var avgDecimal = (rating/range); // rating decimal
						   	var avg = (avgDecimal * 100); // rating percentage
							var imgPercentage = (imgWidth / (imgWidth * avgDecimal)) * 100; // width of filled image based of rating percentage

							// set attr for star rating container - pos relative is needed to position imgs inside correctly
							$bvsdk(template).find(bvsdk.models.objectVariables["container"]["rating-star"]).andSelf().filter(bvsdk.models.objectVariables["container"]["rating-star"]).css(
								"cssText", "position: relative !important;"
							);

							// set attr for filled star container
							$bvsdk(template).find(bvsdk.models.objectVariables["container"]["rating-star-filled"]).andSelf().filter(bvsdk.models.objectVariables["container"]["rating-star-filled"]).css(
								"cssText", "width: " + avg + "% !important; position: absolute !important; top: 0px !important; left: 0px !important; overflow: hidden !important;"
							);
							// set attr for unfilled star container
							$bvsdk(template).find(bvsdk.models.objectVariables["container"]["rating-star-unfilled"]).andSelf().filter(bvsdk.models.objectVariables["container"]["rating-star-unfilled"]).css(
								"cssText", "width: 100% !important;"
							);

							// set attr for filled star img - needed to counteract sizing of parent container
							$bvsdk(template).find(bvsdk.models.objectVariables["container"]["rating-star-image-filled"]).andSelf().filter(bvsdk.models.objectVariables["container"]["rating-star-image-filled"]).css(
								"cssText", "width: " + imgPercentage + "% !important;"
							);
							// set attr for unfilled star img - needed to to keep constraints of parent container
							$bvsdk(template).find(bvsdk.models.objectVariables["container"]["rating-star-image-unfilled"]).andSelf().filter(bvsdk.models.objectVariables["container"]["rating-star-image-unfilled"]).css(
								"cssText", "width: 100% !important;"
							);
							
							// set rating text - for SEO purposes - hidden by default
							$bvsdk(template).find(bvsdk.models.objectVariables["container"]["rating-star-text"]).andSelf().filter(bvsdk.models.objectVariables["container"]["rating-star-text"]).text(rating + " stars");
						}
					});
				}).each(function(){
					// needed to trigger img load when cached by browser
					if (this.complete) {
						$bvsdk(this).trigger('load');
					}
				});
			},

			convertDecimalToPercentage : function (value) {
				return value.toFixed(2) * 100;
			},

			returnFormParamaters : function (form, options) {
				var formData = $bvsdk(form).serializeArray();
				var params = options;
				// add form data to params object
				if (formData != undefined) {
					$bvsdk.each(formData, function(key) {
						params[this["name"]] = this["value"];
					});
				}
				// return updated parameters
				return params;
			},

			returnTemplate : function (content, template) {
				// template to process
				var bvContent = content;
				var temp = $bvsdk.parseHTML($bvsdk(template).html().trim());
				//console.log(temp);
				// find all images with data image urls
				$bvsdk(temp).find("img[data-img-url]").andSelf().filter("img[data-img-url]").each(function() {
					// use Modernizr to check for svg support
					if(!Modernizr.svg){
						// image file name
						var img = $bvsdk(this).attr("data-img-url");
						// split image name to get suffix
						img = img.split(".");
						// if image is svg
						if (img[1] == "svg") {
							// switch to png
							img = img[0] + ".png";
							$bvsdk(this).attr("src", bvsdk.controllers.general.pathResource (img));
						} else {
							// use original image name
							$bvsdk(this).attr("src", bvsdk.controllers.general.pathResource ($bvsdk(this).attr("data-img-url")));
						}
					} else {
						// use original image name
						$bvsdk(this).attr("src", bvsdk.controllers.general.pathResource ($bvsdk(this).attr("data-img-url")));
						// fallback in case MIME type is not set properly on server causing img load error
						$bvsdk(this).attr("onerror", "var url=this.src.split('.').reverse(); url[0] = 'png'; this.src=url.reverse().join('.')");
					}
				});
				// inject bv content into template
				$bvsdk.each($bvsdk(temp).find("[data-bv-content]").andSelf().filter("[data-bv-content]"), function(key, value) {
					var content = eval("bvContent" + $bvsdk(this).attr("data-bv-content"));
					if (content) {
						$bvsdk(this).html(content);
					} else {
						bvsdk.controllers.general.consoleLogFallback(content);
					}
				});
				// inject bv properties into template
				$bvsdk.each($bvsdk(temp).find("[data-bv-property]").andSelf().filter("[data-bv-property]"), function(key, value) {
					var prop = eval("bvsdk.models.properties" + $bvsdk(this).attr("data-bv-property"));
					if (prop) {
						$bvsdk(this).html(prop);
					} else {
						bvsdk.controllers.general.consoleLogFallback(prop);
					}
				});
				// return updated template
				return temp;
			},

			consoleLogFallback : function () {
				if (!bvsdk.models.config.production && bvsdk.models.config.debug) {
					var alertFallback = false;
					if (typeof console === "undefined" || typeof console.log === "undefined") {
						console = {};
						if (alertFallback) {
							console.log = function(arguments) {
								$bvsdk.each(arguments, function(key, value) {
									alert(value);								
								});
							};
						} else {
							console.log = function() {};
						}
					} else {
						$bvsdk.each(arguments, function(key, value) {
							console.log(value);								
						});
					}
				}
			},

			/***** ANIMATIONS *****/

			loadLoadingOverlay : function (container, template, scroll) {
				// set content
				var bvContent = {};
				// set template
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, template);
				// add widget template
				$bvsdk($template).appendTo(container);
				// set loading container height - this needs to be done to animate height once content is loaded
				$bvsdk(container).css({"height":$bvsdk(container).prop("scrollHeight")});
				// scroll to top of loading container
				if (scroll) {
					$bvsdk('html, body').animate({
						scrollTop: $bvsdk(container).offset().top
					}, bvsdk.models.config.defaultAnimationSpeed);
				}
			},

			removeLoadingOverlay : function (container, template, scroll) {
				// set template to remove by getting class
				var $template = '.' + bvsdk.controllers.general.returnTemplate(null, template)[0].className;
				// animate height of loading container to fit content
				$bvsdk(container).animate({"height":$bvsdk(container).prop("scrollHeight")}, bvsdk.models.config.defaultAnimationSpeed, function() {
					// callback to remove inline height style from loading container in case a child element changes size
					$bvsdk(container).css({"height":""});
				});
				// remove overlay template from loading container
				$bvsdk(container).find($template).andSelf().filter($template).remove();
			},

			/***** HEADERS *****/

			// page headers
			loadPageHeader : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":bvsdk.models.targets["submission"]["universal"]["container-form"],
					"targetContainer":bvsdk.models.targets["header"]["universal"]["page"],
					"viewContainer":bvsdk.models.templates["header"]["universal"]["page"],
					"loadOrder":"",
					"productId":"",
				}, options);
				// set content
				var bvContent = {
					"header-page" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add widget template
				$container.append($template);
			},

			// section headers
			loadSectionHeader : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":bvsdk.models.targets["submission"]["universal"]["container-form"],
					"targetContainer":bvsdk.models.targets["header"]["universal"]["section"],
					"viewContainer":bvsdk.models.templates["header"]["universal"]["section"],
					"loadOrder":"",
					"productId":"",
				}, options);
				// set content
				var bvContent = {
					"header-section" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add widget template
				$container.append($template);
			},

			/***** BUTTONS *****/

			// submit button
			loadSubmitButton : function (content, callBack, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["button"]["universal"]["submit"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["primary"],
				}, options);
				// set content
				var bvContent = {
					"button-label" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
				// set attributes and text for button
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"",
					"title":"",
					"href":"",
				}).click(function() {
					if (callBack) {
						callBack();
					}
				});
			},

			// preview button
			loadPreviewButton : function (content, callBack, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["button"]["universal"]["preview"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["secondary"],
				}, options);
				// set content
				var bvContent = {
					"button-label" : content,
				};
				var productId = settings["productId"];
				var returnURL = settings["returnURL"];
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
				// set attributes and text for button
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"",
					"title":"",
					"href":"",
				}).click(function() {
					if (callBack) {
						callBack();
					}
				});
			},

			// edit button
			loadEditButton : function (content, callBack, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["button"]["universal"]["edit"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["secondary"],
				}, options);
				// set content
				var bvContent = {
					"button-label" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
				// set attributes and text for button
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"",
					"title":"",
					"href":"",
				}).click(function() {
					if (callBack) {
						callBack();
					}
				});
			},

			// cancel button
			loadCancelButton : function (content, callBack, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["button"]["universal"]["cancel"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["tertiary"],
				}, options);
				// set content
				var bvContent = {
					"button-label" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
				// set attributes and text for button
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"",
					"title":"",
					"href":"",
				}).click(function() {
					if (callBack) {
						callBack();
					}
				});
			},

			// return button
			loadReturnButton : function (content, callBack, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["button"]["universal"]["return"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["secondary"],
				}, options);
				// set content
				var bvContent = {
					"button-label" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
				// set attributes and text for button
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"",
					"title":"",
					"href":"",
				}).click(function() {
					if (callBack) {
						callBack();
					}
				});
			},

			// generic button
			loadGenericButton : function (content, callBack, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // must be defined in call
					"targetContainer":bvsdk.models.targets["button"]["universal"]["generic"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["tertiary"],
				}, options);
				// set content
				var bvContent = {
					"button-label" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
				// set attributes and text for button
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"",
					"title":"",
					"href":"",
				}).click(function() {
					if (callBack) {
						callBack();
					}
				});
			},

			// write review button
			loadWriteReviewButton : function (content, callBack, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"",
					"targetContainer":bvsdk.models.targets["button"]["review"]["write"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["primary"],
				}, options);
				// set content
				var bvContent = {
					"button-label" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);

				// set attributes
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"",
					"title":"",
					"href":"",
				}).click(function() {
					if (callBack) {
						callBack();
					}
				});
			},

			// read reviews button (go-to)
			loadReadReviewsButton : function (content, callBack, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"",
					"targetContainer":bvsdk.models.targets["button"]["review"]["read"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["text"],
				}, options);
				// set content
				var bvContent = {
					"button-label" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);

				// set variables
				var productId = settings["productId"]
				var returnURL = $bvsdk(location).attr("href") + "";

				// set attributes
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"",
					"title":"",
					"onclick":"",
					"href":"#BVRRContainer",
				}).click(function() {
					if (callBack) {
						callBack();
					}
				});
			},

			// write review comment button
			loadWriteReviewCommentButton : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["button"]["review-comment"]["write"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["text"],
				}, options);
				// set content
				var bvContent = {
					"button-label" : content,
				};
				var productId = settings["productId"]
				var reviewId = settings["contentId"]
				var contentType = "review_comment"
				var returnURL = $bvsdk(location).attr("href") + "";
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add widget template
				$container.append($template);
				// set variables
				// set attributes
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"BVButtonWriteReviewComment" + reviewId,
					"title":"",
					"href":"",
				}).click(function() {
					// set attributes and text for button
					var submissionParams = $bvsdk.param({
						"productId":productId,
						"reviewId":reviewId,
						"contentType":contentType,
						"returnURL":returnURL,
					});
					bvsdk.controllers.general.consoleLogFallback (submissionParams);

					var url = bvsdk.models.config.siteBaseSubmissionURL + submissionParams;
					bvsdk.controllers.general.loadSubmissionPage (url);
				});
			},

			// write review comment button
			loadToggleReviewCommentsButton : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["button"]["review-comment"]["toggle"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["text"],
				}, options);
				// set content
				var contentId = settings["contentId"];
				var bvContent = {
					"button-label" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add widget template
				$container.append($template);
				// set attributes
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"",
					"title":"",
					"href":""
				}).click(function() {
					// set display toggle for comment section
					var commentContainer = $bvsdk(bvsdk.models.objectVariables["container"]["toggle-review-comment"] + "[data-bv-contentid='" + contentId + "']");
					// toggle form if enabled
					if (!$bvsdk(this).hasClass("BVDisabled")) {
						$bvsdk(commentContainer).fadeToggle(bvsdk.models.config.defaultToggleOptions);
					}
				});
			},

			// write review button
			loadWriteQuestionButton : function (content, callBack, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"",
					"targetContainer":bvsdk.models.targets["button"]["question"]["write"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["primary"],
				}, options);
				// set content
				var bvContent = {
					"button-label" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);

				// set attributes
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"",
					"title":"",
					"href":"",
				}).click(function() {
					if (callBack) {
						callBack();
					}
				});
			},

			// read questions button (go-to)
			loadReadQuestionsButton : function (content, callBack, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"",
					"targetContainer":bvsdk.models.targets["button"]["question"]["read"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["text"],
				}, options);
				// set content
				var bvContent = {
					"button-label" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);

				// set variables
				var productId = settings["productId"]
				var returnURL = $bvsdk(location).attr("href") + "";

				// set attributes
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"",
					"title":"",
					"onclick":"",
					"href":"#BVQAContainer",
				}).click(function() {
					if (callBack) {
						callBack();
					}
				});
			},


			/***** SUBMISSION *****/

			updateReviewPreviewNode : function (content) {

				content["Review"]["RatingRange"] = 5; //default to 5 since API doesn't include this for preview

				content["Review"]["TotalFeedbackCount"] = 0; // set to 0 since there wont be any feedback yet
				content["Review"]["TotalPositiveFeedbackCount"] = 0; // set to 0 since there wont be any feedback yet
				content["Review"]["TotalNegativeFeedbackCount"] = 0; // set to 0 since there wont be any feedback yet
				content["Review"]["Helpfulness"] = 0; // set to 0 since there wont be any feedback yet

				content["Review"]["TotalInappropriateFeedbackCount"] = 0; // set to 0 since there wont be any feedback yet
				content["Review"]["InappropriateFeedbackList"] = []; // empty since there wont be any feedback yet

				content["Review"]["TotalCommentCount"] = 0; // set to 0 since there wont be any comments yet
				content["Review"]["CommentIds"] = []; // empty since there wont be any comments yet

				content["Review"]["ClientResponses"] = []; // empty since there wont be any client responses yet

				content["Review"]["IsFeatured"] = false; // set to false since review will not be featured by default
				content["Review"]["IsSyndicated"] = false; // set to false since review will not be syndicated by default

				// content["Review"]["AuthorId"] = null;
				// content["Review"]["CampaignId"] = null;
				// content["Review"]["ProductId"] = null;
				// content["Review"]["ProductRecommendationIds"] = [];
				content["Review"]["IsRatingsOnly"] = content["Data"]["Fields"]["isratingsonly"]["Value"];

				content["Review"]["ModerationStatus"] = "PENDING"; // set to "PENDING" since review has not been submitted
				content["Review"]["LastModificationTime"] = content["Review"]["SubmissionTime"]; // set to submission time since there have been no modifications
				content["Review"]["LastModeratedTime"] = null; // set to null since review has not been submitted yet

				content["Review"]["BadgesOrder"] = []; // empty since there wont be any badges yet
				content["Review"]["Badges"] = {}; // empty since there wont be any badges yet

				content["Review"]["UserNickname"] = content["Data"]["Fields"]["usernickname"]["Value"];
				content["Review"]["UserLocation"] = content["Data"]["Fields"]["userlocation"]["Value"];

				content["Review"]["SecondaryRatingsOrder"] = [];
				content["Review"]["SecondaryRatings"] = {};

				if (content["Data"]["Groups"]["rating"]) {
					// set secondary ratings load order
					$bvsdk.each (content["Data"]["Groups"]["rating"]["SubElements"], function () {
						if (content["Data"]["Fields"][this["Id"]]["Value"] != null) {
							content["Review"]["SecondaryRatingsOrder"].push(this["Id"]);
						}
					});
					// set secondary ratings object
					$bvsdk.each (content["Review"]["SecondaryRatingsOrder"], function () {
						var rating = new Object;
						// set rating values
						rating["DisplayType"] = "NORMAL";
						rating["Id"] = content["Data"]["Fields"][this]["Id"];
						rating["Label"] = content["Data"]["Fields"][this]["Label"];
						rating["MaxLabel"] = content["Data"]["Fields"][this]["Id"];
						rating["MinLabel"] = content["Data"]["Fields"][this]["Id"];
						rating["Value"] = parseInt(content["Data"]["Fields"][this]["Value"]);
						rating["ValueLabel"] = content["Data"]["Fields"][this]["Id"];
						rating["ValueRange"] = 5;
						// add rating to secondary ratings object
						content["Review"]["SecondaryRatings"][this] = rating;
					});
				}

				content["Review"]["TagDimensionsOrder"] = [];
				content["Review"]["TagDimensions"] = {};

				if (content["Data"]["Groups"]["tag"]) {
					// set tags load order
					$bvsdk.each (content["Data"]["Groups"]["tag"]["SubElements"], function (index) {
						content["Review"]["TagDimensionsOrder"][index] = this["Id"];
					});
					// set secondary ratings object
					$bvsdk.each (content["Review"]["TagDimensionsOrder"], function () {
						var tag = new Object;
						var i = 0; // integer to be used as object key for each tag value label
						// set tag values
						tag["Id"] = content["Data"]["Groups"][this]["Id"];
						tag["Label"] = content["Data"]["Groups"][this]["Label"];
						tag["Values"] = [];
						$bvsdk.each(content["Data"]["Groups"][this]["SubElements"], function () {
							$bvsdk.each(content["Data"]["Groups"][this["Id"]]["SubElements"], function () {
								// set tag values
								// check if tag is predefined (BooleanInput is predefined, TextInput is open field)
								if (content["Data"]["Fields"][this["Id"]]["Type"] == "BooleanInput") {
									// check if selected
									if (content["Data"]["Fields"][this["Id"]]["Value"] == "true") {
										// set tag object value label
										tag["Values"][i] = content["Data"]["Fields"][this["Id"]]["Label"];
										// update object key varibale
										i++;
									}
								} else {
									// check if selected
									if (content["Data"]["Fields"][this["Id"]]["Value"] != null) {
										// set tag object value label
										tag["Values"][i] = content["Data"]["Fields"][this["Id"]]["Value"];
										// update object key varibale
										i++;
									}
								}
							})
						})
						// add tag to tag dimensions object
						content["Review"]["TagDimensions"][this] = tag;
					});
				}

				content["Review"]["AdditionalFieldsOrder"] = [];
				content["Review"]["AdditionalFields"] = {};

				if (content["Data"]["Groups"]["additionalfield"]) {
					// set additional fields load order
					$bvsdk.each (content["Data"]["Groups"]["additionalfield"]["SubElements"], function () {
						if (content["Data"]["Fields"][this["Id"]]["Value"] != null) {
							content["Review"]["AdditionalFieldsOrder"].push(this["Id"]);
						}
					});
					// set additional fields object
					$bvsdk.each (content["Review"]["AdditionalFieldsOrder"], function () {
						var additionalfield = new Object;
						// set rating values
						additionalfield["Id"] = content["Data"]["Fields"][this]["Id"];
						additionalfield["Label"] = content["Data"]["Fields"][this]["Label"];
						additionalfield["Value"] = content["Data"]["Fields"][this]["Value"];
						// add field to additional fields object
						content["Review"]["AdditionalFields"][this] = additionalfield;
					});
				}

				content["Review"]["ContextDataValuesOrder"] = [];
				content["Review"]["ContextDataValues"] = {};

				if (content["Data"]["Groups"]["contextdatavalue"]) {
					// set context data values load order
					$bvsdk.each (content["Data"]["Groups"]["contextdatavalue"]["SubElements"], function () {
						if (content["Data"]["Fields"][this["Id"]]["Value"] != null) {
							content["Review"]["ContextDataValuesOrder"].push(this["Id"]);
						}
					});
					// set context data values object
					$bvsdk.each (content["Review"]["ContextDataValuesOrder"], function () {
						var contextdatavalue = new Object;
						// set rating values
						contextdatavalue["DimensionLabel"] = content["Data"]["Fields"][this]["Label"];
						contextdatavalue["Id"] = content["Data"]["Fields"][this]["Id"];
						$bvsdk.each (content["Data"]["Fields"][this]["Options"], function () {
							if (this["Selected"] == true) {
								contextdatavalue["Value"] = this["Value"];
								contextdatavalue["ValueLabel"] = this["Label"];
							}							
						})

						// add data to context data values object
						content["Review"]["ContextDataValues"][this] = contextdatavalue;
					});
				}

				content["Review"]["Photos"] = [];

				if (content["Data"]["Groups"]["photo"]) {
					// set tags load order
					$bvsdk.each (content["Data"]["Groups"]["photo"]["SubElements"], function (index) {
						var urlField = content["Data"]["Groups"][this["Id"]]["SubElements"][0]["Id"];
						var captionField = content["Data"]["Groups"][this["Id"]]["SubElements"][1]["Id"];
						if (content["Data"]["Fields"][urlField]["Value"] != null) {
							var photo = new Object;
							// set tag values
							photo["Id"] = content["Data"]["Groups"][this["Id"]]["Id"];
							photo["Caption"] = content["Data"]["Fields"][captionField]["Value"];
							photo["Sizes"] = {};
							photo["SizesOrder"] = {0:"thumbnail",1:"normal"};
							var size = new Object;
							size["Id"] = content["Data"]["Fields"][urlField]["Id"];
							size["Url"] = content["Data"]["Fields"][urlField]["Value"];
							$bvsdk.each(photo["SizesOrder"], function () {
								// set tag values
								photo["Sizes"][this] = size;
							})
							// add photo to photo dimensions object
							content["Review"]["Photos"][index] = photo;
						}
					});
				}

				content["Review"]["Videos"] = [];

				if (content["Data"]["Groups"]["video"]) {
					// set tags load order
					$bvsdk.each (content["Data"]["Groups"]["video"]["SubElements"], function (index) {
						var urlField = content["Data"]["Groups"][this["Id"]]["SubElements"][0]["Id"];
						var captionField = content["Data"]["Groups"][this["Id"]]["SubElements"][1]["Id"];
						if (content["Data"]["Fields"][urlField]["Value"] != null) {
							var video = new Object;
							// set tag values
							video["VideoId"] = content["Data"]["Groups"][this["Id"]]["Id"];
							video["Caption"] = content["Data"]["Fields"][captionField]["Value"];
							video["VideoHost"] = content["Data"]["Fields"][urlField]["Value"];
							video["VideoIframeUrl"] = content["Data"]["Fields"][urlField]["Value"];
							video["VideoThumbnailUrl"] = content["Data"]["Fields"][urlField]["Value"];
							video["VideoUrl"] = content["Data"]["Fields"][urlField]["Value"];
							// add video to video dimensions object
							content["Review"]["Videos"][index] = video;
						}
					});
				}

				return content;

			},

			updateCommentPreviewNode : function (content) {

				content["Comment"]["TotalFeedbackCount"] = 0; // set to 0 since there wont be any feedback yet
				content["Comment"]["TotalPositiveFeedbackCount"] = 0; // set to 0 since there wont be any feedback yet
				content["Comment"]["TotalNegativeFeedbackCount"] = 0; // set to 0 since there wont be any feedback yet
				content["Comment"]["Helpfulness"] = 0; // set to 0 since there wont be any feedback yet

				content["Comment"]["TotalInappropriateFeedbackCount"] = 0; // set to 0 since there wont be any feedback yet
				content["Comment"]["InappropriateFeedbackList"] = []; // empty since there wont be any feedback yet

				content["Comment"]["IsFeatured"] = false; // set to false since comment will not be featured by default

				// content["Comment"]["AuthorId"] = null;
				// content["Comment"]["CampaignId"] = null;
				// content["Comment"]["ReviewId"] = null;
				// content["Comment"]["StoryId"] = null;
				// content["Comment"]["ProductRecommendationIds"] = [];

				content["Comment"]["ModerationStatus"] = "PENDING"; // set to "PENDING" since comment has not been submitted
				content["Comment"]["LastModificationTime"] = content["Comment"]["SubmissionTime"]; // set to submission time since there have been no modifications
				content["Comment"]["LastModeratedTime"] = null; // set to null since comment has not been submitted yet

				content["Comment"]["BadgesOrder"] = []; // empty since there wont be any badges yet
				content["Comment"]["Badges"] = {}; // empty since there wont be any badges yet

				content["Comment"]["UserNickname"] = content["Data"]["Fields"]["usernickname"]["Value"];
				content["Comment"]["UserLocation"] = content["Data"]["Fields"]["userlocation"]["Value"];

				content["Comment"]["ContextDataValuesOrder"] = [];
				content["Comment"]["ContextDataValues"] = {};

				if (content["Data"]["Groups"]["contextdatavalue"]) {
					// set context data values load order
					$bvsdk.each (content["Data"]["Groups"]["contextdatavalue"]["SubElements"], function () {
						if (content["Data"]["Fields"][this["Id"]]["Value"] != null) {
							content["Comment"]["ContextDataValuesOrder"].push(this["Id"]);
						}
					});
					// set context data values object
					$bvsdk.each (content["Comment"]["ContextDataValuesOrder"], function () {
						var contextdatavalue = new Object;
						// set rating values
						contextdatavalue["DimensionLabel"] = content["Data"]["Fields"][this]["Label"];
						contextdatavalue["Id"] = content["Data"]["Fields"][this]["Id"];
						$bvsdk.each (content["Data"]["Fields"][this]["Options"], function () {
							if (this["Selected"] == true) {
								contextdatavalue["Value"] = this["Value"];
								contextdatavalue["ValueLabel"] = this["Label"];
							}							
						})

						// add data to context data values object
						content["Comment"]["ContextDataValues"][this] = contextdatavalue;
					});
				}

				content["Comment"]["Photos"] = [];

				if (content["Data"]["Groups"]["photo"]) {
					// set tags load order
					$bvsdk.each (content["Data"]["Groups"]["photo"]["SubElements"], function (index) {
						var urlField = content["Data"]["Groups"][this["Id"]]["SubElements"][0]["Id"];
						var captionField = content["Data"]["Groups"][this["Id"]]["SubElements"][1]["Id"];
						if (content["Data"]["Fields"][urlField]["Value"] != null) {
							var photo = new Object;
							// set tag values
							photo["Id"] = content["Data"]["Groups"][this["Id"]]["Id"];
							photo["Caption"] = content["Data"]["Fields"][captionField]["Value"];
							photo["Sizes"] = {};
							photo["SizesOrder"] = {0:"thumbnail",1:"normal"};
							var size = new Object;
							size["Id"] = content["Data"]["Fields"][urlField]["Id"];
							size["Url"] = content["Data"]["Fields"][urlField]["Value"];
							$bvsdk.each(photo["SizesOrder"], function () {
								// set tag values
								photo["Sizes"][this] = size;
							})
							// add photo to photo dimensions object
							content["Comment"]["Photos"][index] = photo;
						}
					});
				}

				content["Comment"]["Videos"] = [];

				if (content["Data"]["Groups"]["video"]) {
					// set tags load order
					$bvsdk.each (content["Data"]["Groups"]["video"]["SubElements"], function (index) {
						var urlField = content["Data"]["Groups"][this["Id"]]["SubElements"][0]["Id"];
						var captionField = content["Data"]["Groups"][this["Id"]]["SubElements"][1]["Id"];
						if (content["Data"]["Fields"][urlField]["Value"] != null) {
							var video = new Object;
							// set tag values
							video["VideoId"] = content["Data"]["Groups"][this["Id"]]["Id"];
							video["Caption"] = content["Data"]["Fields"][captionField]["Value"];
							video["VideoHost"] = content["Data"]["Fields"][urlField]["Value"];
							video["VideoIframeUrl"] = content["Data"]["Fields"][urlField]["Value"];
							video["VideoThumbnailUrl"] = content["Data"]["Fields"][urlField]["Value"];
							video["VideoUrl"] = content["Data"]["Fields"][urlField]["Value"];
							// add video to video dimensions object
							content["Comment"]["Videos"][index] = video;
						}
					});
				}

				return content;

			},

		},

	},

});