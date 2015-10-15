$bvsdk.extend(true, bvsdk, {

	controllers : {

		submission : {

			reviewcomment : {

				loadSubmissionWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["container-widget"],
						"viewContainer":bvsdk.models.templates["submission"]["review-comment"]["container-widget"],
						"loadOrder":"",
						"productId":"",
						"returnURL":"",
					}, options);
					// set content
					var bvContent = {};
					var productId = settings["productId"];
					var contentId = settings["contentId"];
					var returnURL = settings["returnURL"];
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);
					// load review submission form
					bvsdk.controllers.submission.reviewcomment.loadSubmissionForm (content, {
						"parentContainer":$template,
						"productId":productId,
						"contentId":contentId,
						"returnURL":returnURL,
					});
				},

				loadSubmissionForm : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["container-form"],
						"viewContainer":bvsdk.models.templates["submission"]["review-comment"]["container-form"],
						"loadOrder":"",
						"productId":"",
						"returnURL":"",
					}, options);
					// set content
					var bvContent = {};
					var newID = "BVSubmissionContainerID_" + settings["productId"];
					var productId = settings["productId"];
					var contentId = settings["contentId"];
					var returnURL = settings["returnURL"];
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set form attributes (just fallbacks, not needed since we are using ajax submission)
					$bvsdk($template).find("form").andSelf().filter("form").attr({
						"id":newID,
						"name":newID,
						"action":"",
						"method":"POST",
						"enctype":"application/x-www-form-urlencoded",
						"autocomplete":"on",
						"accept-charset":"UTF-8",
						"target":"",
					});
					
					/***** headers *****/

					bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["universal"]["page-submission"], {
						"parentContainer":$template,
					});
					bvsdk.controllers.general.loadSectionHeader (bvsdk.models.properties["header"]["review-comment"]["section-submission-ugc"], {
						"parentContainer":$template,
						"targetContainer":bvsdk.models.targets["header"]["universal"]["section-submission-ugc"],
					});
					bvsdk.controllers.general.loadSectionHeader (bvsdk.models.properties["header"]["review-comment"]["section-submission-user"], {
						"parentContainer":$template,
						"targetContainer":bvsdk.models.targets["header"]["universal"]["section-submission-user"],
					});
					
					/***** inputs *****/

					// comment title
					if (content["Data"]["Fields"]["title"]) {
						bvsdk.controllers.submission.reviewcomment.loadTitleInput (content, {
							"parentContainer":$template,
						});
					}
					// comment text
					if (content["Data"]["Fields"]["commenttext"]) {
						bvsdk.controllers.submission.reviewcomment.loadBodyTextInput (content, {
							"parentContainer":$template,
						});
					}
					// nickname
					if (content["Data"]["Fields"]["usernickname"]) {
						bvsdk.controllers.submission.universal.loadUGCUserNicknameInput (content, {
							"parentContainer":$template,
						});
					}
					// email
					if (content["Data"]["Fields"]["useremail"]) {
						bvsdk.controllers.submission.universal.loadUGCUserEmailInput (content, {
							"parentContainer":$template,
						});
					}
					// location
					if (content["Data"]["Fields"]["userlocation"]) {
						bvsdk.controllers.submission.universal.loadUGCUserLocationInput (content, {
							"parentContainer":$template,
						});
					}

					// device fingerprint
					bvsdk.controllers.general.consoleLogFallback ("devicefingerprint");
					// product id
					bvsdk.controllers.general.consoleLogFallback ("productid");
					// submission id
					bvsdk.controllers.general.consoleLogFallback ("submissionid");
					// auth source type
					bvsdk.controllers.general.consoleLogFallback ("authsourcetype");
					// is ratings only
					bvsdk.controllers.general.consoleLogFallback ("isratingsonly");
					// net promoter score
					bvsdk.controllers.general.consoleLogFallback ("netpromoterscore");
					// net promoter comment
					bvsdk.controllers.general.consoleLogFallback ("netpromotercomment");
					// product recommendations
					bvsdk.controllers.general.consoleLogFallback ("productrecommendations");
					// user location geocode
					bvsdk.controllers.general.consoleLogFallback ("userlocationgeocode");
					// hosted authentication
					bvsdk.controllers.general.consoleLogFallback ("hostedauthentication");

					// opt in checkboxes
					if (content["Data"]["Fields"]["agreedtotermsandconditions"]) {
						bvsdk.controllers.submission.universal.loadTermsAndConditionsInput (content, {
							"parentContainer":$template,
							"inputSettings":{
								"inputRequired":true,
							},
						});
					}
					if (content["Data"]["Fields"]["sendemailalertwhenpublished"]) {
						bvsdk.controllers.submission.universal.loadSendEmailAlertWhenPublishedInput (content, {
							"parentContainer":$template,
						});
					};

					// submit button
					bvsdk.controllers.general.loadSubmitButton (bvsdk.models.properties["button"]["universal"]["submit"],
						// onclick functionality
						function() {
							// get form parameters
							var params = bvsdk.controllers.general.returnFormParamaters ("#" + newID, {
								"action":"submit",
							});
							// validate form using parsly.js plugin
							var validated = $bvsdk("#" + newID).parsley('validate');
							// POST form to server if no errors
							if (validated) {
								$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-form"]).hide();
								bvsdk.models.submission.reviewcomment.postForm (contentId, bvsdk.models.targets["submission"]["universal"]["container-thankyou"], function (content) {
										bvsdk.controllers.submission.reviewcomment.loadSubmissionThankYouWidget (content, {
											"parentContainer":settings["parentContainer"],
											"productId":productId,
											"contentId":contentId,
											"returnURL":returnURL,
										});
									}, {
									"Parameters": params,
								});
							}
						}, {
							"parentContainer":$template,
						}
					);

					// preview button
					bvsdk.controllers.general.loadPreviewButton (bvsdk.models.properties["button"]["universal"]["preview"],
						// onclick functionality
						function() {
							// get form parameters
							var params = bvsdk.controllers.general.returnFormParamaters ("#" + newID, {
								"action":"preview",
							});
							// validate form using parsly.js plugin
							var validated = $bvsdk("#" + newID).parsley('validate');
							// POST form to server if no errors
							if (validated) {
								$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-form"]).hide();
								bvsdk.models.submission.reviewcomment.postForm (contentId, bvsdk.models.targets["submission"]["universal"]["container-preview"], function (content) {
										// update content to have matching review node so the preview will match the display
										content = bvsdk.controllers.general.updateCommentPreviewNode (content);
										// comment preview
										bvsdk.controllers.submission.reviewcomment.loadSubmissionPreviewWidget (content, {
											"parentContainer":settings["parentContainer"],
											"productId":productId,
											"contentId":contentId,
											"returnURL":returnURL,
										});
									}, {
									"Parameters": params,
								});
							}
						}, {
							"parentContainer":$template,
						}
					);

					// cancel button
					bvsdk.controllers.general.loadCancelButton (bvsdk.models.properties["button"]["universal"]["cancel"],
						// onclick functionality
						function() {
							// load return page
							bvsdk.controllers.general.returnToPage (returnURL);
						}, {
							"parentContainer":$template,
						}
					);
					
					// set inline form validation using parsley.js plugin
					$bvsdk("#" + newID).parsley(bvsdk.models.config.defaultInlineValidationOption);	
					// add inline validation
					$bvsdk(bvsdk.models.objectVariables["input"]["universal"]).change( function() {
						$bvsdk(this).parsley('validate');
					});
					bvsdk.controllers.submission.universal.loadRequiredIndicators (content, {
						"parentContainer":$template,
					});
				},

				loadTitleInput : function (content, options) {
					var content = content["Data"]["Fields"]["title"];
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["title"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["title"],
						"loadOrder":"",
						"productId":"",
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["review-comment"]["title-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["review-comment"]["title-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["review-comment"]["title-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName
					});
					// load input
					bvsdk.controllers.submission.universal.loadTextFieldInput (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
						},
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
				},

				loadBodyTextInput : function (content, options) {
					var content = content["Data"]["Fields"]["commenttext"];
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["body"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["body"],
						"loadOrder":"",
						"productId":"",
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["review-comment"]["body-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["review-comment"]["body-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["review-comment"]["body-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName
					});
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
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
				},

				/**************************************** PREVIEW ****************************************/

				loadSubmissionPreviewWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["container-preview"],
						"viewContainer":bvsdk.models.templates["submission"]["review-comment"]["container-preview"],
						"loadOrder":"",
						"productId":"",
						"returnURL":"",
					}, options);
					// get a new id for the submission container using product id - this will be needed for reference on form processing
					var newID = "BVSubmissionContainerID_" + settings["productId"];
					// set content
					var bvContent = {};
					var productId = settings["productId"];
					var contentId = settings["contentId"];
					var returnURL = settings["returnURL"];
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);

					bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["universal"]["page-submission-preview"], {
						"parentContainer":$template,
					});

					// load review submission form
					bvsdk.controllers.submission.reviewcomment.loadSubmissionPreview (content["Comment"], {
						"parentContainer":$template,
						"productId":productId,
					});

					// buttons
					// submit button
					bvsdk.controllers.general.loadSubmitButton (bvsdk.models.properties["button"]["universal"]["submit"],
						// onclick functionality
						function() {
							// get form parameters
							var params = bvsdk.controllers.general.returnFormParamaters ("#" + newID, {
								"action":"submit",
							});
							// validate form using parsly.js plugin
							var validated = $bvsdk("#" + newID).parsley('validate');
							// POST form to server if no errors
							if (validated) {
								$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-preview"]).hide();
								bvsdk.models.submission.reviewcomment.postForm (contentId, bvsdk.models.targets["submission"]["universal"]["container-thankyou"], function (content) {
										bvsdk.controllers.submission.reviewcomment.loadSubmissionThankYouWidget (content, {
											"parentContainer":settings["parentContainer"],
											"productId":productId,
											"contentId":contentId,
											"returnURL":returnURL,
										});
									}, {
									"Parameters": params,
								});
							}
						}, {
							"parentContainer":$template,
						}
					);

					// edit button
					bvsdk.controllers.general.loadEditButton (bvsdk.models.properties["button"]["universal"]["edit"], 
						// onclick functionality
						function() {
							// show form and hide preview
							$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-preview"]).empty();
							$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-form"]).show();
							$bvsdk($bvsdk($template)).hide();
						}, {
						"parentContainer":$template,
					});

					// cancel button
					bvsdk.controllers.general.loadCancelButton (bvsdk.models.properties["button"]["universal"]["cancel"],
						// onclick functionality
						function() {
							// load return page
							bvsdk.controllers.general.returnToPage (returnURL);
						}, {
							"parentContainer":$template,
						}
					);
				},

				loadSubmissionPreview : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["container-individual"],
						"viewContainer":bvsdk.models.templates["submission"]["review-comment"]["container-individual"],
						"loadOrder":"",
						"productId":"",
					}, options);
					// set content
					var bvContent = {};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);

					// load ugc title
					if (content["Title"] || content["QuestionSummary"]) {
						bvsdk.controllers.ugc.universal.loadUGCTitle (content, {
							"parentContainer":$template,
						});
					}
					// load ugc text
					if (content["ReviewText"] || content["QuestionDetails"] || content["AnswerText"] || content["StoryText"] || content["CommentText"]) {
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

				},

				/**************************************** THANK YOU ****************************************/

				loadSubmissionThankYouWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["container-thankyou"],
						"viewContainer":bvsdk.models.templates["submission"]["review-comment"]["container-thankyou"],
						"loadOrder":"",
						"productId":"",
						"returnURL":"",
					}, options);
					// set content
					var bvContent = {
						 "thankyou-hourstopost" : content["TypicalHoursToPost"],
					};
					var returnURL = settings["returnURL"];
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);

					// empty and hide submission form and preview containers
					$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-form"]).empty().hide();
					$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-preview"]).empty().hide();

					bvsdk.controllers.general.loadPageHeader (bvsdk.models.properties["header"]["universal"]["page-submission-thankyou"], {
						"parentContainer":$template,
					});

					// buttons
					// return button
					bvsdk.controllers.general.loadReturnButton (bvsdk.models.properties["button"]["universal"]["return"],
						// onclick functionality
						function() {
							// load return page
							bvsdk.controllers.general.returnToPage (returnURL);
						}, {
							"parentContainer":$template,
						}
					);
				},







			},

		},

	},

});

/***** DEFAULT REVIEW COMMENT SUBMISSION FORM FUNCTION *****/

