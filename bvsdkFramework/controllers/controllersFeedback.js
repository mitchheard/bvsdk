$bvsdk.extend(true, bvsdk, {

	controllers : {

		feedback : {

			loadFeedback : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["feedback"]["universal"]["container-widget"],
					"viewContainer":bvsdk.models.templates["feedback"]["universal"]["container-widget"],
					"productId":"",
					"contentId":"",
					"feedbackSettings":{
						"contentType":"",
						"vote":"",
					},
				}, options);
				// set content
				var contentId = settings["contentId"]; // id of content associated with feedback controls
				var cookieNameHelpfulness = "helpfulness" + contentId; // cookie name for helpfulness voting
				var cookieNameInappropriate = "inappropriate" + contentId; // cookie name for inappropriate feedback
				var vote = $bvsdk.cookie(cookieNameHelpfulness); // current vote - if any
				var bvContent = {};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);

				// load feedback count
				bvsdk.controllers.feedback.loadFeedbackCount (content, {
					"parentContainer":$template,
				});
				// load feedback voting
				bvsdk.controllers.feedback.loadFeedbackVoting (content, {
					"parentContainer":$template,
					"productId":settings["productId"],
					"contentId":settings["contentId"],
					"feedbackSettings":{
						"contentType":settings["feedbackSettings"]["contentType"],
					},
				});
				// load report inappropriate
				bvsdk.controllers.feedback.loadReportInappropriate (content, {
					"parentContainer":$template,
					"productId":settings["productId"],
					"contentId":settings["contentId"],
					"feedbackSettings":{
						"contentType":settings["feedbackSettings"]["contentType"],
					},
				});
				// load status message area
				bvsdk.controllers.feedback.loadFeedbackStatus (content, {
					"parentContainer":$template,
					"productId":settings["productId"],
					"contentId":settings["contentId"],
					"feedbackSettings":{
						"contentType":settings["feedbackSettings"]["contentType"],
					},
				});
				// update feedback to reflect any past votes based off of browser cookies
				bvsdk.controllers.feedback.updateFeedback (cookieNameHelpfulness, {
					"contentId":contentId,
					"feedbackSettings":{
						"vote":vote,
					},
				});
				bvsdk.controllers.feedback.updateReportInapproriate (cookieNameInappropriate, {
					"contentId":contentId,
				});
			},



			/************************* HELPFULNESS VOTING *************************/



			loadFeedbackCount : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["feedback"]["universal"]["count"],
					"viewContainer":bvsdk.models.templates["feedback"]["universal"]["count"],
					"loadOrder":"",
					"productId":"",
				}, options);
				// set content
				var bvContent = {
					"feedback-positive" : content["TotalPositiveFeedbackCount"] || "0",
					"feedback-negative" : content["TotalNegativeFeedbackCount"] || "0",
					"feedback-total" : content["TotalFeedbackCount"] || "0",
					"feedback-positive-percentage" : content["TotalPositiveFeedbackCount"] / content["TotalFeedbackCount"],
					"feedback-negative-percentage" : content["TotalNegativeFeedbackCount"] / content["TotalFeedbackCount"],
					"feedback-positive-percentage-formatted" : bvsdk.controllers.general.convertDecimalToPercentage (content["TotalPositiveFeedbackCount"] / content["TotalFeedbackCount"]),
					"feedback-negative-percentage-formatted" : bvsdk.controllers.general.convertDecimalToPercentage (content["TotalNegativeFeedbackCount"] / content["TotalFeedbackCount"]),
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
			},

			loadFeedbackVoting : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["feedback"]["universal"]["voting"],
					"viewContainer":bvsdk.models.templates["feedback"]["universal"]["voting"],
					"loadOrder":"",
					"productId":"",
					"contentId":"",
					"feedbackSettings":{
						"contentType":"",
						"feedbackType":"helpfulness",
					},
				}, options);
				// set content
				var bvContent = {
					"feedback-positive" : content["TotalPositiveFeedbackCount"] || "0",
					"feedback-negative" : content["TotalNegativeFeedbackCount"] || "0",
					"feedback-total" : content["TotalFeedbackCount"] || "0",
					"feedback-positive-percentage" : content["TotalPositiveFeedbackCount"] / content["TotalFeedbackCount"],
					"feedback-negative-percentage" : content["TotalNegativeFeedbackCount"] / content["TotalFeedbackCount"],
					"feedback-positive-percentage-formatted" : bvsdk.controllers.general.convertDecimalToPercentage (content["TotalPositiveFeedbackCount"] / content["TotalFeedbackCount"]),
					"feedback-negative-percentage-formatted" : bvsdk.controllers.general.convertDecimalToPercentage (content["TotalNegativeFeedbackCount"] / content["TotalFeedbackCount"]),
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);

				// load positive feedback button
				bvsdk.controllers.feedback.loadFeedbackVotingButton (bvsdk.models.properties["button"]["universal"]["vote-positive"] + " " + bvContent["feedback-positive"], {
					"parentContainer":$template,
					"targetContainer":bvsdk.models.targets["button"]["universal"]["vote-positive"],
					"productId":settings["productId"],
					"contentId":settings["contentId"],
					"feedbackSettings":{
						"contentType":settings["feedbackSettings"]["contentType"],
						"feedbackType":settings["feedbackSettings"]["feedbackType"],
						"vote":"positive",
					},
				});
				// load negative feedback button
				bvsdk.controllers.feedback.loadFeedbackVotingButton (bvsdk.models.properties["button"]["universal"]["vote-negative"] + " " + bvContent["feedback-negative"], {
					"parentContainer":$template,
					"targetContainer":bvsdk.models.targets["button"]["universal"]["vote-negative"],
					"productId":settings["productId"],
					"contentId":settings["contentId"],
					"feedbackSettings":{
						"contentType":settings["feedbackSettings"]["contentType"],
						"feedbackType":settings["feedbackSettings"]["feedbackType"],
						"vote":"negative",
					},
				});
			},

			loadFeedbackVotingButton : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":"DEFAULT",
					"viewContainer":bvsdk.models.templates["button"]["universal"]["tertiary"],
					"loadOrder":"",
					"productId":"",
					"contentId":"",
					"feedbackSettings":{
						"contentType":"",
						"feedbackType":"helpfulness",
						"vote":"", // must be defined in call
					},
				}, options);
				// set content
				var contentId = settings["contentId"]; // id of content associated with feedback controls
				var feedbackType = settings["feedbackSettings"]["feedbackType"]; // feedback type
				var vote = settings["feedbackSettings"]["vote"]; // voting value
				var cookieName = feedbackType + contentId; // cookie name
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
					"data-bv-contentid":contentId,
					"data-bv-feedbacktype":vote,
				}).click(function() {
					bvsdk.controllers.feedback.processFeedbackVoting (cookieName, {
						"productId":"",
						"contentId":contentId,
						"feedbackSettings":settings["feedbackSettings"],
					});
				});
			},



			/************************* HELPFULNESS VOTING PROCESSING *************************/



			// processes the voting for feedback helpfulness buttons
			processFeedbackVoting : function (cookieName, options) {
				// content expected is the name of the cookie
				var settings = $bvsdk.extend(true, {
					"productId":"",
					"contentId":"",
					"feedbackSettings":{
						"contentType":"",
						"feedbackType":"helpfulness",
						"vote":"",
						"reasonText":"",
					},
				}, options);
				// set variables
				var contentId = settings["contentId"];
				var vote = settings["feedbackSettings"]["vote"];
				var btnPositive = $bvsdk("[data-bv-feedbacktype='positive'][data-bv-contentid='" + contentId + "']");
				var btnNegative = $bvsdk("[data-bv-feedbacktype='negative'][data-bv-contentid='" + contentId + "']");
				// process feedback voting
				if (!$bvsdk.cookie(cookieName)) {
					// disable buttons while processing
					$bvsdk(btnPositive).addClass("BVDisabled");
					$bvsdk(btnNegative).addClass("BVDisabled");
					// if no cookie for this feedback (no previous feedback vote)
					bvsdk.models.feedback.postForm (
						contentId,
						function (content) {
							// set cookie
							$bvsdk.cookie(cookieName, vote);
							// update feedback voting for selected and disabled states
							bvsdk.controllers.feedback.updateFeedback (cookieName, {
								"contentId":contentId,
								"feedbackSettings":{
									"vote":content["Feedback"]["Helpfulness"]["Vote"].toLowerCase(),
								},
							});
							bvsdk.controllers.feedback.loadFeedbackStatusMessage (content, {
								"contentId":contentId,
								"productid":settings["productId"],
							});
						}, {
							// feedback voting API parameters
							"Parameters":{
								"contenttype":settings["feedbackSettings"]["contentType"],
								"feedbacktype":settings["feedbackSettings"]["feedbackType"],
								"productid":settings["productId"],
								"vote":vote,
							},
						}
					);
				} else if (bvsdk.models.config.bvUndoHelpfulnessAllowed && $bvsdk.cookie(cookieName) && $bvsdk.cookie(cookieName) == vote) {
					// disable buttons while processing
					$bvsdk(btnPositive).addClass("BVDisabled");
					$bvsdk(btnNegative).addClass("BVDisabled");
					// if cookie exists for this feedback and matches vote value, then undo
					bvsdk.models.feedback.postForm (
						contentId,
						function (content) {
							// set cookie
							$bvsdk.removeCookie(cookieName);
							// update feedback voting
							bvsdk.controllers.feedback.updateFeedback (cookieName, {
								"contentId":contentId,
								"feedbackSettings":{
									"vote":content["Feedback"]["Helpfulness"]["Vote"].toLowerCase(),
								},
							});
							bvsdk.controllers.feedback.loadFeedbackStatusMessage (content, {
								"contentId":contentId,
								"productid":settings["productId"],
							});
						}, {
							// feedback voting API parameters
							"Parameters":{
								"contenttype":settings["feedbackSettings"]["contentType"],
								"feedbacktype":settings["feedbackSettings"]["feedbackType"],
								"productid":settings["productId"],
								"vote":"UNDO",
							},
						}
					);
				}
			},

			// updates feedback helpfulness voting buttons to reflect current vote status
			updateFeedback : function (cookieName, options) {
				var settings = $bvsdk.extend(true, {
					"productId":"",
					"contentId":"",
					"feedbackSettings":{
						"vote":"",
					},
				}, options);
				// set variables
				var contentId = settings["contentId"];
				var btnPositive = $bvsdk("[data-bv-feedbacktype='positive'][data-bv-contentid='" + contentId + "']");
				var btnNegative = $bvsdk("[data-bv-feedbacktype='negative'][data-bv-contentid='" + contentId + "']");
				var vote = settings["feedbackSettings"]["vote"];
				// update button classes to reflect vote
				if (!$bvsdk.cookie(cookieName)) {
					// enable buttons
					$bvsdk(btnPositive).removeClass(
						"BVDisabled BVUndo BVSelected"
					);
					$bvsdk(btnNegative).removeClass(
						"BVDisabled BVUndo BVSelected"
					);
				} else if ($bvsdk.cookie(cookieName) && $bvsdk.cookie(cookieName) == vote) {
					// disable and select appropriate buttons
					if (vote == "positive") {
						$bvsdk(btnPositive).addClass(
							"BVSelected"
						).removeClass(
							"BVDisabled BVUndo"
						);
						$bvsdk(btnNegative).addClass(
							"BVDisabled BVUndo"
						).removeClass(
							"BVSelected"
						);
					} else if (vote == "negative") {
						$bvsdk(btnNegative).addClass(
							"BVSelected"
						).removeClass(
							"BVDisabled BVUndo"
						);
						$bvsdk(btnPositive).addClass(
							"BVDisabled BVUndo"
						).removeClass(
							"BVSelected"
						);
					}
				}
			},



			/************************* REPORT INAPPROPRIATE *************************/



			loadReportInappropriate : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["feedback"]["universal"]["inappropriate"],
					"viewContainer":bvsdk.models.templates["feedback"]["universal"]["inappropriate"],
					"loadOrder":"",
					"productId":"",
					"feedbackSettings":{
						"contentType":"",
						"feedbackType":"inappropriate",
					},
				}, options);
				// set content
				var productId = settings["productId"];
				var contentId = settings["contentId"];
				var contentType = settings["feedbackSettings"]["contentType"];
				var feedbackType = settings["feedbackSettings"]["feedbackType"];
				var bvContent = {};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);

				// load report inappropriate button
				bvsdk.controllers.feedback.loadReportInappropriateButton (bvsdk.models.properties["button"]["universal"]["inappropriate"], {
					"parentContainer":$template,
					"productId":productId,
					"contentId":contentId,
					"feedbackSettings":{
						"contentType":contentType,
						"feedbackType":feedbackType,
					},
				});
				// load report inappropriate form
				bvsdk.controllers.feedback.loadReportInappropriateForm (content, {
					"parentContainer":$template,
					"productId":productId,
					"contentId":contentId,
					"feedbackSettings":{
						"contentType":contentType,
						"feedbackType":feedbackType,
					},
				});
			},

			loadReportInappropriateButton : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["button"]["universal"]["inappropriate"],
					"viewContainer":bvsdk.models.templates["button"]["universal"]["text"],
					"loadOrder":"",
					"productId":"",
					"contentId":"",
				}, options);
				// set content
				var productId = settings["productId"];
				var contentId = settings["contentId"];
				var contentType = settings["feedbackSettings"]["contentType"];
				var feedbackType = settings["feedbackSettings"]["feedbackType"];
				var bvContent = {
					"button-label" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
				// set attributes and for button
				$bvsdk($template).find(bvsdk.models.objectVariables["container"]["button"]).andSelf().filter(bvsdk.models.objectVariables["container"]["button"]).attr({
					"id":"",
					"title":"",
					"href":"",
					"data-bv-contentid":contentId,
					"data-bv-feedbacktype":feedbackType,
				}).click(function() {
					// set display toggle for form
					var formContainer = $bvsdk("form[data-bv-feedbacktype='" + feedbackType + "'][data-bv-contentid='" + contentId + "']");
					// toggle form if enabled
					if (!$bvsdk(this).hasClass("BVDisabled")) {
						$bvsdk(formContainer).fadeIn(bvsdk.models.config.defaultToggleOptions);
					}
				});
			},

			loadReportInappropriateForm : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["feedback"]["universal"]["container-form"],
					"viewContainer":bvsdk.models.templates["feedback"]["universal"]["container-form"],
					"loadOrder":"",
					"productId":"",
					"contentId":"",
				}, options);
				// set content
				var contentId = settings["contentId"];
				var contentType = settings["feedbackSettings"]["contentType"];
				var feedbackType = settings["feedbackSettings"]["feedbackType"];
				var cookieName = feedbackType + contentId;
				var bvContent = {};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
				// set form attributes (just fallbacks, not needed since we are using ajax submission)
				$bvsdk($template).find("form").andSelf().filter("form").attr({
						"id":"",
						"name":"",
						"action":"",
						"method":"POST",
						"enctype":"application/x-www-form-urlencoded",
						"autocomplete":"on",
						"accept-charset":"UTF-8",
						"target":"",
						"data-bv-contentid":contentId,
						"data-bv-feedbacktype":feedbackType,
					});
				// load header
				bvsdk.controllers.general.loadSectionHeader (bvsdk.models.properties["header"]["universal"]["section-inappropriate"], {
					"parentContainer":$template,
					"targetContainer":bvsdk.models.targets["header"]["universal"]["section-inappropriate"],
				});
				// load text field
				bvsdk.controllers.feedback.loadReportInappropriateTextInput (content, {
					"parentContainer":$template,
				});

				// load buttons
				// submit button
				bvsdk.controllers.general.loadSubmitButton (bvsdk.models.properties["button"]["universal"]["submit"],
					// onclick functionality
					function() {
						bvsdk.controllers.feedback.processFeedbackReportInappropriate (cookieName, {
							"productId":"",
							"contentId":contentId,
							"feedbackSettings":{
								"contentType":contentType,
								"reasonText":$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).val(),
							},
						});
					}, {
						"parentContainer":$template,
					}
				);
				
				// cancel button
				bvsdk.controllers.general.loadCancelButton (bvsdk.models.properties["button"]["universal"]["cancel"], 
					// onclick functionality
					function() {
						// set display toggle for form
						var formContainer = $bvsdk("form[data-bv-feedbacktype='" + feedbackType + "'][data-bv-contentid='" + contentId + "']");
						// toggle form
						$bvsdk(formContainer).fadeOut(bvsdk.models.config.defaultToggleOptions);
					}, {
						"parentContainer":$template,
					}
				);

				// initially hide form on load
				$bvsdk($template).hide();
			},

			loadReportInappropriateTextInput : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["feedback"]["universal"]["textarea"],
					"viewContainer":bvsdk.models.templates["submission"]["universal"]["input-individual"],
					"loadOrder":"",
					"productId":"",
					"inputSettings":{
						"inputName":"reasonText",
						"inputType":"",
						"inputLabel":"",
						"inputPlaceholder":"", // user defined
						"inputHelperText":"", // user defined
						"inputValue":"",
						"inputMinLength":"",
						"inputMaxLength":"",
						"inputRequired":false,
						"inputDefault":"",
						"inputOptionsArray":"",
					},
				}, options);
				// set content
				var bvContent = {
					"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["feedback"]["universal"]["inappropriate-label"],
					"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["feedback"]["universal"]["inappropriate-helpertext"],
					"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["feedback"]["universal"]["inappropriate-placeholder"],
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
				// load input
				bvsdk.controllers.submission.universal.loadTextAreaInput (content, {
					"parentContainer":$template,
					"inputSettings":{
						// using bvContent to allow for property customization - api response is still default
						"inputLabel":bvContent["input-label"],
						"inputHelperText":bvContent["input-helpertext"],
						"inputPlaceholder":bvContent["input-placeholder"],
					},
				});
			},



			/************************* REPORT INAPPROPRIATE PROCESSING *************************/



			// processes the report inappropriate feedback
			processFeedbackReportInappropriate : function (cookieName, options) {
				// content expected is the name of the cookie
				var settings = $bvsdk.extend(true, {
					"productId":"",
					"contentId":"",
					"feedbackSettings":{
						"contentType":"",
						"feedbackType":"inappropriate",
						"reasonText":"",
					},
				}, options);
				// set variables
				var contentId = settings["contentId"];
				var contentType = settings["feedbackSettings"]["contentType"];
				var feedbackType = settings["feedbackSettings"]["feedbackType"];
				var reasonText = settings["feedbackSettings"]["reasonText"];
				var formContainer = $bvsdk("form[data-bv-feedbacktype='" + feedbackType + "'][data-bv-contentid='" + contentId + "']");
				// process report inappropriate
				if (!$bvsdk.cookie(cookieName) && !formContainer.hasClass("BVDisabled")) {
					bvsdk.controllers.general.consoleLogFallback (settings);
					bvsdk.controllers.general.consoleLogFallback (cookieName);
					// if no cookie for this feedback (no previous reports)
					bvsdk.models.feedback.postForm (
						contentId,
						function (content) {
							// set cookie
							$bvsdk.cookie(cookieName, true);
							// update report button for selected and disabled states
							bvsdk.controllers.feedback.updateReportInapproriate (cookieName, {
								"contentId":contentId,
								"feedbackSettings":{
									"feedbackType":feedbackType,
									"reasonText":reasonText,
								},
							});
							// toggle form
							$bvsdk(formContainer).fadeOut(bvsdk.models.config.defaultToggleOptions);
							// update status message
							bvsdk.controllers.feedback.loadFeedbackStatusMessage (content, {
								"contentId":contentId,
								"productid":settings["productId"],
							});
						}, {
							// feedback voting API parameters
							"Parameters":{
								"contenttype":contentType,
								"feedbacktype":feedbackType,
								"productid":settings["productId"],
								"reasontext":reasonText,
							},
						}
					);
				} 
			},

			// updates feedback helpfulness voting buttons to reflect current vote status
			updateReportInapproriate : function (cookieName, options) {
				var settings = $bvsdk.extend(true, {
					"productId":"",
					"contentId":"",
				}, options);
				// set variables
				var contentId = settings["contentId"];
				var btnReport = $bvsdk("[data-bv-feedbacktype='inappropriate'][data-bv-contentid='" + contentId + "']");
				// update button classes to reflect feedback
				if ($bvsdk.cookie(cookieName)) {
					// disable report inappropriate buttons
					$bvsdk(btnReport).addClass("BVDisabled");
				}
			},



			/************************* STATUS MESSAGING *************************/



			loadFeedbackStatus : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["feedback"]["universal"]["container-message"],
					// "targetContainer":bvsdk.models.targets["message"]["container-status-feedback"],
					"viewContainer":bvsdk.models.templates["feedback"]["universal"]["container-message"],
					"loadOrder":"",
					"productId":"",
					"feedbackSettings":{
						"contentType":"",
						"feedbackType":"",
					},
				}, options);
				// set content
				var productId = settings["productId"];
				var contentId = settings["contentId"];
				var bvContent = {};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
				// set attributes and hide container
				$bvsdk($template).hide().attr({
					"data-bv-contentid":contentId,
					"data-bv-feedbacktype":"message-status",
				});
				// set status container variable using data attribute - this needs to be done here to avoid a bug with fadeout in jQuery 1.9.1
				var statusContainer = $bvsdk("[data-bv-feedbacktype='message-status'][data-bv-contentid='" + contentId + "']");
				// load close button
				bvsdk.controllers.general.loadGenericButton (bvsdk.models.properties["button"]["universal"]["close"],
					// onclick functionality
					function() {
						// close container
						$bvsdk(statusContainer).fadeOut(bvsdk.models.config.defaultToggleOptions);
					}, {
						"parentContainer":$template,
						"targetContainer":bvsdk.models.targets["button"]["universal"]["close"],
					}
				);
			},

			loadFeedbackStatusMessage : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["feedback"]["universal"]["message"],
					// "targetContainer":bvsdk.models.targets["message"]["status-feedback"],
					"viewContainer":bvsdk.models.templates["feedback"]["universal"]["message"],
					"productId":"",
					"contentId":"",
					"feedbackSettings":{
						"contentType":"",
						"feedbackType":"",
						"vote":"",
					},
				}, options);
				// set content
				var contentId = settings["contentId"];
				var statusContainer = $bvsdk("[data-bv-feedbacktype='message-status'][data-bv-contentid='" + contentId + "']");
				// set status message text to load - check if feedback is for helpfulness or inappropriate
				if (content["Feedback"]["Helpfulness"]) {
					// check if feedback is casting or undoing a vote - set to lowercase for consistency
					if (content["Feedback"]["Helpfulness"]["Vote"].toLowerCase() == "positive" || content["Feedback"]["Helpfulness"]["Vote"].toLowerCase() == "negative") {
						content = bvsdk.models.properties["feedback"]["universal"]["message-voting-received"];
					} else if (content["Feedback"]["Helpfulness"]["Vote"].toLowerCase() == "undo") {
						content = bvsdk.models.properties["feedback"]["universal"]["message-voting-removed"];
					}
				} else if (content["Feedback"]["Inappropriate"]) {
					content = bvsdk.models.properties["feedback"]["universal"]["message-inappropriate-received"];
				} else {
					content = bvsdk.models.properties["feedback"]["universal"]["message-error"];
				}
				var bvContent = {
					"feedback-message-status" : content,
				};
				// set container & template
				var $container = $bvsdk(statusContainer).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.html($template);
				// set status message and show container
				$bvsdk(statusContainer).fadeIn(bvsdk.models.config.defaultToggleOptions);
			},

		},

	},

});