$bvsdk.extend(true, bvsdk, {

	controllers : {

		submission : {

			review : {

				loadSubmissionWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["container-widget"],
						"viewContainer":bvsdk.models.templates["submission"]["review"]["container-widget"],
						"loadOrder":"",
						"productId":"",
						"returnURL":"",
					}, options);
					// set content
					var bvContent = {};
					var productId = settings["productId"];
					var returnURL = settings["returnURL"];
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);
					// check for errors
					if(content["HasErrors"]) {
						bvsdk.controllers.submission.universal.loadErrors (content, {
							"parentContainer":$template,
						});
					} else {
						// load review submission form
						bvsdk.controllers.submission.review.loadSubmissionForm (content, {
							"parentContainer":$template,
							"productId":productId,
							"returnURL":returnURL,
						});
						// laod event listeners
						bvsdk.controllers.general.loadEventListeners ("Listener", {
							"textFieldCounter": {
								"textField": ".BVFormInputTextarea",
							}
						});
						bvsdk.controllers.submission.universal.loadErrors (content, {
							"parentContainer":$template,
						});
					}
				},

				loadSubmissionForm : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["container-form"],
						"viewContainer":bvsdk.models.templates["submission"]["review"]["container-form"],
						"loadOrder":"",
						"productId":"",
						"returnURL":"",
					}, options);
					// set content
					var bvContent = {};
					var newID = "BVSubmissionContainerID_" + settings["productId"];
					var productId = settings["productId"];
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
					bvsdk.controllers.general.loadSectionHeader (bvsdk.models.properties["header"]["review"]["section-submission-rating"], {
						"parentContainer":$template,
						"targetContainer":bvsdk.models.targets["header"]["review"]["section-submission-rating"],
					});
					bvsdk.controllers.general.loadSectionHeader (bvsdk.models.properties["header"]["review"]["section-submission-ugc"], {
						"parentContainer":$template,
						"targetContainer":bvsdk.models.targets["header"]["universal"]["section-submission-ugc"],
					});
					bvsdk.controllers.general.loadSectionHeader (bvsdk.models.properties["header"]["review"]["section-submission-media"], {
						"parentContainer":$template,
						"targetContainer":bvsdk.models.targets["header"]["universal"]["section-submission-media"],
					});
					bvsdk.controllers.general.loadSectionHeader (bvsdk.models.properties["header"]["review"]["section-submission-user"], {
						"parentContainer":$template,
						"targetContainer":bvsdk.models.targets["header"]["universal"]["section-submission-user"],
					});
					
					/***** product info *****/

					bvsdk.models.catalog.product.getProducts (productId, bvsdk.models.targets["product"]["universal"]["container-widget"], function(data) {
						bvsdk.controllers.catalog.products.loadProductInfoWidget (data, {
							"parentContainer":$template,
						});					
					}, {

					});

					/***** inputs *****/

					// overall rating
					bvsdk.controllers.submission.review.loadOverallRatingInput (content, {
						"parentContainer":$template,
					});
					// is recommended
					bvsdk.controllers.submission.review.loadIsRecommendedInput (content, {
						"parentContainer":$template,
					});
					// review title
					bvsdk.controllers.submission.review.loadTitleInput (content, {
						"parentContainer":$template,
					});
					// review text
					bvsdk.controllers.submission.review.loadBodyTextInput (content, {
						"parentContainer":$template,
					});
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

					// // user id
					// bvsdk.controllers.submission.universal.loadUGCUserIDInput (content, {
					// 	"parentContainer":$template,
					// 	"inputSettings":{
					// 		"inputLabel":"User Id",
					// 		"inputName":"userid",
					// 	},
					// });

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

					// context data values
					bvsdk.controllers.submission.universal.loadUGCContextDataValueGroupInput (content, {
						"parentContainer":$template,
					});
					// additional fields
					bvsdk.controllers.submission.universal.loadUGCAdditionalFieldGroupInput (content, {
						"parentContainer":$template,
					});
					// secondary ratings
					bvsdk.controllers.submission.review.loadSecondaryRatingGroup (content, {
						"parentContainer":$template,
					});

					// photo upload
					bvsdk.controllers.submission.universal.loadUGCPhotoGroupInput (content, {
						"parentContainer":$template,
						"mediaSettings":{
							"contentType":"review",
						},
					});
					// video link
					bvsdk.controllers.submission.universal.loadUGCVideoUrlInput (content, {
						"parentContainer":$template,
					});
					// video caption
					bvsdk.controllers.submission.universal.loadUGCVideoCaptionInput (content, {
						"parentContainer":$template,
					});

					// product recommendations
					bvsdk.controllers.general.consoleLogFallback ("productrecommendations");

					// tags
					bvsdk.controllers.submission.universal.loadUGCTagGroupInput (content, {
						"parentContainer":$template,
					});
					
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
					if (content["Data"]["Fields"]["sendemailalertwhencommented"]) {
						bvsdk.controllers.submission.universal.loadSendEmailAlertWhenCommentedInput (content, {
							"parentContainer":$template,
						});
					};
					if (content["Data"]["Fields"]["sendemailalertwhenpublished"]) {
						bvsdk.controllers.submission.universal.loadSendEmailAlertWhenPublishedInput (content, {
							"parentContainer":$template,
						});
					};

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
								$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-form"]).hide();
								bvsdk.models.submission.review.postForm (productId, bvsdk.models.targets["submission"]["universal"]["container-thankyou"], function (content) {
										bvsdk.controllers.submission.review.loadSubmissionThankYouWidget (content, {
											"parentContainer":settings["parentContainer"],
											"productId":productId,
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
								$bvsdk("#BVSubmissionContainer").css({"height":$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-form"]).height()});
								$bvsdk('html, body').animate({
									scrollTop: $bvsdk("#BVSubmissionContainer").offset().top
								}, 300);
								$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-form"]).fadeOut(300, function() {
									bvsdk.models.submission.review.postForm (productId, bvsdk.models.targets["submission"]["universal"]["container-preview"], function (content) {
											// update content to have matching review node so the preview will match the display
											content = bvsdk.controllers.general.updateReviewPreviewNode (content);
											// review preview
											bvsdk.controllers.submission.review.loadSubmissionPreviewWidget (content, {
												"parentContainer":settings["parentContainer"],
												"productId":productId,
												"returnURL":returnURL,
											});
											$bvsdk("#BVSubmissionContainer").animate({"height":$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-preview"]).height()}, 300);
										}, {
										"Parameters": params,
									});
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

					// set stars using jquery.rating plugin
					$bvsdk(function(){
						$bvsdk('input[type=radio].star').rating();
					});
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
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["review"]["title-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["review"]["title-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["review"]["title-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName,
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
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
				},

				loadBodyTextInput : function (content, options) {
					var content = content["Data"]["Fields"]["reviewtext"];
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["body"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["body-charcounter"],
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
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["review"]["body-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["review"]["body-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["review"]["body-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName,
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
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

				loadOverallRatingInput : function (content, options) {
					var content = content["Data"]["Fields"]["rating"];
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["rating-overall"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["rating-overall"],
						"loadOrder":[
							{"1":bvsdk.models.properties["submission"]["review"]["rating-value-1-label"]},
							{"2":bvsdk.models.properties["submission"]["review"]["rating-value-2-label"]},
							{"3":bvsdk.models.properties["submission"]["review"]["rating-value-3-label"]},
							{"4":bvsdk.models.properties["submission"]["review"]["rating-value-4-label"]},
							{"5":bvsdk.models.properties["submission"]["review"]["rating-value-5-label"]},
						],
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
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["review"]["rating-overall-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["review"]["rating-overall-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["review"]["rating-overall-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.html($template);
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load radio buttons
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(key) {
							bvsdk.controllers.submission.universal.loadRadioInputIndividual (content, {
								"parentContainer":$template,
								"viewContainer":bvsdk.models.templates["input"]["review"]["radio-rating-overall"],
								"loadOrder":settings["loadOrder"][key],
								"inputSettings":{
									// using bvContent to allow for property customization - api response is still default
									"inputLabel":bvContent["input-label"],
									"inputHelperText":bvContent["input-helpertext"],
									"inputPlaceholder":bvContent["input-placeholder"],				
								},
							});
						});
					}
				},

				loadSecondaryRatingGroup : function (content, options) {
					var defaultLoadOrder = [];
					if (content["Data"]["Groups"]["rating"] != undefined) {
						$bvsdk.each(content["Data"]["Groups"]["rating"]["SubElements"], function() {
							defaultLoadOrder.push(this["Id"]);
						});
					}
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["rating-secondary-group"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["rating-secondary-group"],
						"loadOrder":defaultLoadOrder,
						"productId":"",
						"inputSettings":{
							"inputType":content["Type"],
							"inputRequired":content["Required"],
							"inputSubElements":content["SubElements"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
						},
					}, options);
					// set content
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["review"]["rating-secondary-group-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["review"]["rating-secondary-group-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["review"]["rating-secondary-group-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// load individual secondary ratings
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(key) {
							// load secondary rating input container
							bvsdk.controllers.submission.review.loadSecondaryRatingIndividual (content["Data"]["Fields"][this], {
								"parentContainer":$template,
							});
						});
					}
				},

				loadSecondaryRatingIndividual : function (content, options) {
					// content expected ["Data"]["Fields"][<fieldname>]
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["rating-secondary-individual"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["rating-secondary-individual"],
						"loadOrder":[
							{"1":bvsdk.models.properties["submission"]["review"]["rating-value-1-label"]},
							{"2":bvsdk.models.properties["submission"]["review"]["rating-value-2-label"]},
							{"3":bvsdk.models.properties["submission"]["review"]["rating-value-3-label"]},
							{"4":bvsdk.models.properties["submission"]["review"]["rating-value-4-label"]},
							{"5":bvsdk.models.properties["submission"]["review"]["rating-value-5-label"]},
						],
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
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["review"]["rating-secondary-individual-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["review"]["rating-secondary-individual-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["review"]["rating-secondary-individual-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load radio buttons
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(key) {
							bvsdk.controllers.submission.universal.loadRadioInputIndividual (content, {
								"parentContainer":$template,
								"viewContainer":bvsdk.models.templates["input"]["review"]["radio-rating-secondary"],
								"loadOrder":settings["loadOrder"][key],
								"inputSettings":{
									// using bvContent to allow for property customization - api response is still default
									"inputLabel":bvContent["input-label"],
									"inputHelperText":bvContent["input-helpertext"],
									"inputPlaceholder":bvContent["input-placeholder"],				
								},
							});
						});
					}
				},

				loadIsRecommendedInput : function (content, options) {
					var content = content["Data"]["Fields"]["isrecommended"];
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["recommended"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["recommended"],
						"loadOrder":[
							{"true":"Yes"},
							{"false":"No"},
						],
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
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["review"]["recommended-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["review"]["recommended-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["review"]["recommended-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load radio buttons
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(key) {
							bvsdk.controllers.submission.universal.loadRadioInputIndividual (content, {
								"parentContainer":$template,
								"loadOrder":settings["loadOrder"][key],
								"inputSettings":{
									// using bvContent to allow for property customization - api response is still default
									"inputLabel":bvContent["input-label"],
									"inputHelperText":bvContent["input-helpertext"],
									"inputPlaceholder":bvContent["input-placeholder"],				
								},
							});
						});
					}
				},

				/**************************************** PREVIEW ****************************************/

				loadSubmissionPreviewWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["container-preview"],
						"viewContainer":bvsdk.models.templates["submission"]["review"]["container-preview"],
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
					bvsdk.controllers.submission.review.loadSubmissionPreview (content["Review"], {
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
								$bvsdk("#BVSubmissionContainer").css({"height":$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-preview"]).height()});
								$bvsdk('html, body').animate({
									scrollTop: $bvsdk("#BVSubmissionContainer").offset().top
								}, 300);
								$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-preview"]).fadeOut(300, function() {
									bvsdk.models.submission.review.postForm (productId, bvsdk.models.targets["submission"]["universal"]["container-thankyou"], function (content) {
											bvsdk.controllers.submission.review.loadSubmissionThankYouWidget (content, {
												"parentContainer":settings["parentContainer"],
												"productId":productId,
												"returnURL":returnURL,
											});
											$bvsdk("#BVSubmissionContainer").animate({"height":$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-preview"]).height()}, 300);
										}, {
										"Parameters": params,
									});
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
						"viewContainer":bvsdk.models.templates["submission"]["review"]["container-individual"],
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

					// load ugc rating
					bvsdk.controllers.ugc.universal.loadUGCRating (content, {
						"parentContainer":$template,
					});
					// load ugc secondary ratings
					bvsdk.controllers.ugc.universal.loadUGCSecondaryRatings (content, {
						"parentContainer":$template,
					});
					// load ugc recommended
					bvsdk.controllers.ugc.universal.loadUGCRecommended (content, {
						"parentContainer":$template,
					});
					// load ugc date
					bvsdk.controllers.ugc.universal.loadUGCDate (content, {
						"parentContainer":$template,
					});
					// load ugc title
					bvsdk.controllers.ugc.universal.loadUGCTitle (content, {
						"parentContainer":$template,
					});
					// load ugc text
					bvsdk.controllers.ugc.universal.loadUGCBody (content, {
						"parentContainer":$template,
					});
					// load ugc user nickname
					bvsdk.controllers.ugc.universal.loadUGCUserNickname (content, {
						"parentContainer":$template,
					});
					// load ugc user location
					bvsdk.controllers.ugc.universal.loadUGCUserLocation (content, {
						"parentContainer":$template,
					});
					// load ugc cdvs
					bvsdk.controllers.ugc.universal.loadUGCContextDataValuesGroup (content, {
						"parentContainer":$template,
					});
					// load ugc tags
					bvsdk.controllers.ugc.universal.loadUGCTagGroups (content, {
						"parentContainer":$template,
					});
					// load ugc additional fields
					bvsdk.controllers.ugc.universal.loadUGCAdditionalFieldsGroups (content, {
						"parentContainer":$template,
					});
					// load ugc photos
					bvsdk.controllers.ugc.universal.loadUGCPhotosGroup (content, {
						"parentContainer":$template,
					});
					// load ugc videos
					bvsdk.controllers.ugc.universal.loadUGCVideosGroup (content, {
						"parentContainer":$template,
					});

					// // load user badges
					// bvsdk.controllers.badges.loadBadges(content, {
					// 	"parentContainer":$template,
					// 	"targetContainer":bvsdk.models.targets["badge"]["universal"]["container-group-user"],
					// 	"loadOrder":bvsdk.models.badges.userOrder,
					// });

					// // load review badges
					// bvsdk.controllers.badges.loadBadges(content, {
					// 	"parentContainer":$template,
					// 	"targetContainer":bvsdk.models.targets["badge"]["universal"]["container-group-content"],
					// 	"loadOrder":bvsdk.models.badges.contentOrder,
					// });

				},

				/**************************************** THANK YOU ****************************************/

				loadSubmissionThankYouWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["container-thankyou"],
						"viewContainer":bvsdk.models.templates["submission"]["review"]["container-thankyou"],
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