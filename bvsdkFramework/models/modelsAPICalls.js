$bvsdk.extend(true, bvsdk, {

	models : {

		catalog : {

			category : {

			},

			product : {

				// gets products with statistics - set productID to null to return all products
				getProducts : function (productID, container, callBack, options) {
					var settings = $bvsdk.extend(true, {
						"Parameters":{
							"include":"products",
							"stats":"reviews",
							"filter":{
								"id":productID
							}
						}
					}, options);
					var apiCall = bvsdk.models.catalog.product.apiCall (settings);
					var urlString = apiCall["url"];
					var paramObject = apiCall["params"];
					var paramString = bvsdk.models.general.returnAPIParametersString (apiCall["params"]);
					$bvsdk.ajax({
						type: "GET",
						url: urlString,
						data: paramString,
						dataType: "jsonp",
						success: function(data) {
							bvsdk.controllers.general.consoleLogFallback (data);
							callBack(data, paramObject);
							bvsdk.controllers.general.removeLoadingOverlay (container, bvsdk.models.templates["overlay"]["universal"]["default"], true);
						},
						error: function(e) {
							bvsdk.models.general.defaultAjaxErrorFunction (e);
						},
						beforeSend: function() {
							bvsdk.controllers.general.loadLoadingOverlay (container, bvsdk.models.templates["overlay"]["universal"]["default"], true);
						}
					});
				},

				apiCall : function (options) {
					var defaultSettings = $bvsdk.extend(true, {
						"URL":{
							"baseurl":bvsdk.models.config.apiBaseURL,
							"customername":bvsdk.models.config.apiDefaults["customerName"],
							"format":bvsdk.models.config.apiDefaults["format"] //Response format (xml or json)
						},
						"Parameters":{
							"apiversion":bvsdk.models.config.apiDefaults["apiVersion"], //The API version.
							"attributes":null, // Attributes to be included when returning content. For example, if includes are requested along with the &attributes=ModeratorCodes parameter, both the includes and the results will contain moderator codes. In order to filter by ModeratorCode, you must request the ModeratorCodes attribute parameter.
							"callback":null, // Callback function name (JsonP).
							"excludefamily":null, // Boolean flag indicating whether to exclude content from other products in the same family as the requested product. For example, "&filter=productid:eq:1101&excludeFamily=true" limits returned content to just that of product 1101 and not any of the products in the same family. If a value is not defined, content on all products in the family will be returned.
							"filter":{ // Filter criteria for primary content of the query. Multiple filter criteria are supported.
								"id":null, // The identifier of the content/subject type.
								"averageoverallrating":null, // The average overall rating for the reviews that were written on this Product.
								"categoryancestorid":null, // The identifier of the Ancestor of the Product Category that the Product belongs to.
								"categoryid":null, // The identifier of the Product Category that the Product belongs to.
								"isactive":null, // Boolean flag indicating whether the Product is Active.
								"isdisabled":null, // Boolean flag indicating whether the Product is Disabled.
								"lastanswertime":null, // The Submission Time of the latest Answer that was submitted on a Product.
								"lastquestiontime":null, // The Submission Time of the latest Question that was submitted on a Product.
								"lastreviewtime":null, // The Submission Time of the latest Review that was submitted on a Product.
								"laststorytime":null, // The Submission Time of the latest Story that was submitted on a Product.
								"name":null, // Product Name.
								"ratingsonlyreviewcount":null, // The number of ratings-only Reviews written for the Product.
								"totalanswercount":null, // The number of Answers written for Questions on the Product.
								"totalquestioncount":null, // The number of Questions written for the Product.
								"totalreviewcount":null, // The number of Reviews written for the Product.
								"totalstorycount":null, // The number of Stories written for the Product.
							},
							"filter_[TYPE]":null, // Filtering option for included nested content. TYPE can be any included nested content. i.e. Comments for Reviews.
							"include":null, // Related subjects to be included (e.g. Products, Categories, Authors, or Comments).
							"limit":bvsdk.models.config.apiDefaults["limitReviews"], // Max number of records returned. An error is returned if the value passed exceeds 100.
							"limit_[TYPE]":null, // Limit option for the nested content type returned. TYPE can be any nested content. i.e. Comments for Reviews. An error is returned if the value passed exceeds 20.
							"locale":null, // Locale to display Labels, Configuration, Product Attributes and Category Attributes in. The default value is the locale defined in the display associated with the API key.
							"offset":bvsdk.models.config.apiDefaults["offset"], // Index at which to return results. By default, indexing begins at 0 when you issue a query. Using Limit=100, Offset=0 returns results 0-99. When changing this to Offset=1, results 1-100 are returned.
							"passkey":bvsdk.models.config.apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
							"search":null, // Full-text search string used to find UGC. For more information about what fields are searched by default, see the API Basics page.
							"search_[TYPE]":null, // Searching option for included content followed by full-text search string. See the API Basics page for examples of searching for included data.
							"sort":{ // Sort criteria for primary content type of the query. Sort order is required (asc or desc). Multi-attribute sorting for each content/subject type is supported.
								"id":null, //The identifier of the content/subject type
								"averageoverallrating":null, //The average overall rating for the reviews that were written on this Product.
								"categoryid":null, //The identifier of the Product Category that the Product belongs to.
								"isactive":null, //Boolean flag indicating whether the Product is Active.
								"isdisabled":null, //Boolean flag indicating whether the Product is Disabled.
								"LastAnswerTime":null, //The date/time of the latest moderation of the content
								"lastanswertime":null, //The Submission Time of the latest Answer that was written for a Question on the Product.
								"lastquestiontime":null, //The Submission Time of the latest Question that was written for the Product.
								"lastreviewtime":null, //The Submission Time of the latest Review that was written on the Product.
								"laststorytime":null, //The Submission Time of the latest Story that was written on the Product.
								"name":null, //Product Name.
								"ratingsonlyreviewcount":null, //The number of ratings-only Reviews written for the Product.
								"totalanswercount":null, //The number of Answers written for Questions on the Product.
								"totalquestioncount":null, //The number of Questions written for the Product.
								"totalreviewcount":null, //The number of Reviews written for the Product.
								"totalstorycount":null, //The number of Stories written for the Product.
							},
							"sort_[TYPE]":null, // Sorting option for nested content. Sort order is required (asc or desc). TYPE can be any nested content. i.e. Comments for Reviews.
							"stats":null // The type of statistics that will be calculated on included subjects. Available content types are: Reviews, Questions, Answers, Stories. Note: Not all statistical content types apply to every possible include.
						}
					}, options);

					// set URL base for API call
					var url = bvsdk.models.init.locationProtocol + defaultSettings["URL"]["baseurl"] + "data/" + "products." + defaultSettings["URL"]["format"];

					// set URL parameters for API call
					var params = bvsdk.models.general.returnAPIParameters (defaultSettings["Parameters"]);

					// create array with url and parameters
					var apiCall = {"url":url, "params":params};

					// return the API call
					return apiCall;

				},

			},

		},

		feedback : {

			postForm : function (contentID, callBack, options) {
				var settings = $bvsdk.extend(true, {
					"Parameters":{
						"contentid":contentID,
					},
				}, options);
				var apiCall = bvsdk.models.feedback.apiCall (settings);
				var urlString = apiCall["url"];
				var paramObject = $bvsdk.param(apiCall["params"]);
				$bvsdk.ajax({
					type: "POST",
					url: urlString,
					data: paramObject,
					dataType: "json",
					success: function(data) {
						bvsdk.controllers.general.consoleLogFallback (data);
						callBack(data, settings);
					},
					error: function(e) {
						bvsdk.models.general.defaultAjaxErrorFunction (e);
					}
				});
			},

			apiCall : function (options) {

				var defaultSettings = $bvsdk.extend(true, {
					"URL":{
						"baseurl":bvsdk.models.config.apiBaseSubmissionURL,
						"customername":bvsdk.models.config.apiDefaults["customerName"],
						"format":bvsdk.models.config.apiDefaults["format"] //Response format (xml or json)
					},
					"Parameters":{
						"apiversion":bvsdk.models.config.apiDefaults["apiVersion"], //The API version.
						"contentid":null, //ID of the content with which the feedback is associated
						"contenttype":null, //Type of content with which the feedback is associated (review, story, question, answer, story_comment, review_comment)
						"feedbacktype":null, //Type of feedback (inappropriate, helpfulness)
						"passkey":bvsdk.models.config.apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
						"productid":null, //Product ID which the feedback is associated
						"userid":null, //User's external ID
						"user":"tom",
						"vote":null, //Helpfulness vote for this content. Valid votes are: Positive, Negative, UNDO. This parameter is only required for FeedbackType=helpfulness.
						"reasontext":null //Reason this content has been flagged as inappropriate
					}
				}, options);

				// set URL base for API call
				var url = bvsdk.models.init.locationProtocol + defaultSettings["URL"]["baseurl"] + "data/" + "submitfeedback." + defaultSettings["URL"]["format"];
				
				// set URL parameters for API call
				var params = bvsdk.models.general.returnAPIParameters (defaultSettings["Parameters"]);

				// create array with url and parameters
				var apiCall = {"url":url, "params":params};

				// return the API call
				return apiCall;

			},

		},

		submission : {

			media : {

				// posts photo submission form
				postForm : function (productID, callBack, options) {
					var settings = $bvsdk.extend(true, {
						"Parameters":{
							"productid":productID
						}
					}, options);
					var apiCall = bvsdk.models.submission.media.apiCall (settings);
					// parameter for callback must be an API call object returned from the apiCall model
					callBack(apiCall);
				},

				apiCall : function (options) {
					var defaultSettings = $bvsdk.extend(true, {
						"URL":{
							"baseurl":bvsdk.models.config.apiBaseSubmissionURL,
							"customername":bvsdk.models.config.apiDefaults["customerName"],
							"format":bvsdk.models.config.apiDefaults["format"] //Response format (xml or json)
						},
						"Parameters":{
							"apiversion":bvsdk.models.config.apiDefaults["apiVersion"], //The API version.
							"callback":null, //Callback function name (JsonP).
							"contenttype":null, //The content type for which this media is being submitted. Valid values include: review, question, answer, story, review_comment and story_comment.
							"locale":null, //Locale to display Labels, Configuration, Product Attributes and Category Attributes in. The default value is the locale defined in the display associated with the API key.
							"passkey":bvsdk.models.config.apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
							"photourl":null, //URL of the photo to be uploaded. Use either the photo or photoUrl parameter to define the photo to upload. An error is returned if both parameters are defined. HTTP and HTTPS are the only protocols supported for the photoUrl parameter.
							"user":bvsdk.models.config.bvUserDefaults["bvUAS"], //Value of the encrypted user. This parameter demonstrates that a user has been authenticated. Note that the UserId parameter does not contain authentication information and should not be used for hosted authentication. See the Authenticate User method for more information.
							"userid":null, //User's external ID
						}
					}, options);

					// set URL base for API call
					var url = bvsdk.models.init.locationProtocol + defaultSettings["URL"]["baseurl"] + "data/" + "uploadphoto." + defaultSettings["URL"]["format"];
					
					// set URL parameters for API call. params must be formatted to fit file upload plugin
					var params = [];
					$bvsdk.each(bvsdk.models.general.returnAPIParameters (defaultSettings["Parameters"]), function(key, value) {
						var obj = {name: key, value: value};
						params.push(obj);
					});
					// create array with url and parameters
					var apiCall = {"url":url, "params":params};

					// return the API call
					return apiCall;

				},

			},

			review : {

				// gets review submission form
				getForm : function (productID, container, callBack, options) {
					var settings = $bvsdk.extend(true, {
						"Parameters":{
							"productid":productID,
							"userid":null
						}
					}, options);
					var apiCall = bvsdk.models.submission.review.apiCall (settings);
					var urlString = apiCall["url"];
					var paramObject = $bvsdk.param(apiCall["params"]);
					$bvsdk.ajax({
						type: "GET",
						url: urlString,
						data: paramObject,
						dataType: "jsonp",
						success: function(data) {
							bvsdk.controllers.general.consoleLogFallback (data);
							callBack(data, settings);
							$bvsdk(container).removeClass("BVContentLoadingContainer");
						},
						error: function(e) {
							$bvsdk(container).removeClass("BVContentLoadingContainer").html("Submission is currently unavailable.")
							bvsdk.models.general.defaultAjaxErrorFunction (e);
						},
						beforeSend: function() {
							$bvsdk(container).addClass("BVContentLoadingContainer");
						}
					});
				},

				// posts review submission form
				postForm : function (productID, container, callBack, options) {
					var settings = $bvsdk.extend(true, {
						"Parameters":{
							"productid":productID
						}
					}, options);
					var apiCall = bvsdk.models.submission.review.apiCall (settings);
					var urlString = apiCall["url"];
					var paramObject = $bvsdk.param(apiCall["params"]);
					$bvsdk.ajax({
						type: "POST",
						url: urlString,
						data: paramObject,
						dataType: "json",
						success: function(data) {
							bvsdk.controllers.general.consoleLogFallback (data);
							if(data["HasErrors"]) {
								var errorObject = data["FormErrors"]["FieldErrors"];
								$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-error"]).html('');
								$bvsdk.each(errorObject, function(k, v) {
									$bvsdk('*[name="' + k + '"]').parent().parent().addClass('BVErrorText');
									$bvsdk('*[name="' + k + '"]').addClass('BVErrorBorder');
									$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-error"]).append(v["Message"] + '<br/>');
									$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-form"]).show();
								});
							} else {
								callBack(data, settings);
							}
							$bvsdk(container).removeClass("BVContentLoadingContainer");
						},
						error: function(e) {
							bvsdk.models.general.defaultAjaxErrorFunction (e);
						},
						beforeSend: function() {
							$bvsdk(container).addClass("BVContentLoadingContainer");
						}
					});
				},

				apiCall : function (options) {

					var defaultSettings = $bvsdk.extend(true, {
						"URL":{
							"baseurl":bvsdk.models.config.apiBaseSubmissionURL,
							"customername":bvsdk.models.config.apiDefaults["customerName"],
							"format":bvsdk.models.config.apiDefaults["format"] //Response format (xml or json)
						},
						"Parameters":{
							"apiversion":bvsdk.models.config.apiDefaults["apiVersion"], //The API version.
							"action":null, //The submission action to take -- either 'Preview' or 'Submit'. 'Preview' will show a draft of the content to be submitted; 'Submit' will submit the content. Note that if Action=Submit, the request must be an HTTP POST.
							"additionalfield_<Dimension-External-Id>":null, //A concrete example of the parameter might be 'AdditionalField_Seat' with a value of '24F' (describing the seat number at a stadium or on a plane).
							"agreedtotermsandconditions":null, //Boolean indicating whether or not the user agreed to the terms and conditions. Required depending on the client's settings.
							"callback":null, //Callback function name (JsonP).
							"campaignId":null, //Arbitrary text that may be saved alongside content to indicate vehicle by which content was captured, e.g. “post-purchase email”.
							"contextDataValue_<Dimension-External-Id>":null, //Some examples of this parameter include the following. Each is followed by possible values. ContextDataValue_PurchaserRank - "top", "top10", "top100", "top1000" ContextDataValue_Purchaser - "yes", "no" ContextDataValue_Age - "under21", "21to34", "35to44", "45to54", "55to64", "over65" ContextDataValue_Gender - "male", "female"
							"hostedauthentication_authenticationemail":null, //Email address where the submitter will receive the confirmation email. If you are configured to use hosted email authentication, this parameter is required. See the Authenticate User method for more information on hosted authentication.
							"hostedauthentication_callbackurl":null, //URL of the link contained in the user authentication email. This should point to a landing page where a web application exists to complete the user authentication process. The host for the URL must be one of the domains configured for the client. The link in the email will contain a user authentication token (authtoken) that is used to verify the submitter. If you are configured to use hosted email authentication, this parameter is required. See the Authenticate User method for more information on hosted authentication.
							"isrecommended":null, //Value is true or false; default is null – "true" or "false" answer to "I would recommend this to a friend". Required dependent on client settings.
							"locale":bvsdk.models.config.apiDefaults["locale"], //Locale to display Labels, Configuration, Product Attributes and Category Attributes in. The default value is the locale defined in the display associated with the API key.
							"netpromotercomment":null, //Value is text representing a user comment to explain numerical Net Promoter score.
							"netpromoterscore":null, //Value is positive integer between 1 and 10 representing a numerical rating in response to “How would you rate this company?”
							"passkey":bvsdk.models.config.apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
							"photocaption_<n>":null, //Value is caption text for the photo URL with the same value of <n>.
							"photourl_<n>":null, //Value is a Bazaarvoice URL of a photo uploaded using the Data API, where <n> is a non-negative integer.
							"productid":null, //The id of the product that this content is being submitted on.
							"productrecommendationid_<n>":null, //Value is non-negative integer representing the product external ID of the <n>'th product recommendation (for Social Recommendations)
							"rating":null, //Value is positive integer between 1 and 5, and represents review overall rating. Required depending on client settings.
							"rating_<Dimension-External-Id>":null, //A concrete example might be Rating_Quality where the value would represent the user's opinion of the quality of the product. The value is a positive integer between 1 and 5 and represents rating dimension value.
							"reviewtext":null, //Value is review body text.
							"sendemailalertwhencommented":null, //Boolean indicating whether or not the user wants to be notified when a comment is posted on the content.
							"sendemailalertwhenpublished":null, //Boolean indicating whether or not the user wants to be notified when his/her content is published.
							"tag_<Dimension-External-Id>_<n>":null, //A concrete example of the parameter might be 'tag_Pro_1'. Valid values could be any free-form text. <n> should be a non-negative integer starting at the number 1.
							"title":null, //Value is content title text.
							"user":bvsdk.models.config.bvUserDefaults["bvUAS"], //Value of the encrypted user. This parameter demonstrates that a user has been authenticated. Note that the UserId parameter does not contain authentication information and should not be used for hosted authentication. See the Authenticate User method for more information.
							"useremail":null, //User's email address
							"userid":null, //User's external ID
							"userlocation":null, //User location text
							"usernickname":null, //User nickname display text
							"videocaption_<n>":null, //Value is caption text for the video URL with the same value of <n>.
							"videourl_<n>":null //Value is valid YouTube or Bazaarvoice video-upload URL where <n> is a non-negative integer.
						}
					}, options);

					// set URL base for API call
					var url = bvsdk.models.init.locationProtocol + defaultSettings["URL"]["baseurl"] + "data/" + "submitreview." + defaultSettings["URL"]["format"];
					
					// set URL parameters for API call
					var params = bvsdk.models.general.returnAPIParameters (defaultSettings["Parameters"]);

					// create array with url and parameters
					var apiCall = {"url":url, "params":params};

					// return the API call
					return apiCall;

				},

			},

			reviewcomment : {

				// gets review comment submission form
				getForm : function (reviewid, container, callBack, options) {
					var settings = $bvsdk.extend(true, {
						"Parameters":{
							"reviewid":reviewid,
							"userid":null
						}
					}, options);
					var apiCall = bvsdk.models.submission.reviewcomment.apiCall (settings);
					var urlString = apiCall["url"];
					var paramObject = $bvsdk.param(apiCall["params"]);
					$bvsdk.ajax({
						type: "GET",
						url: urlString,
						data: paramObject,
						dataType: "jsonp",
						success: function(data) {
							bvsdk.controllers.general.consoleLogFallback (data);
							callBack(data, settings);
							$bvsdk(container).removeClass("BVContentLoadingContainer");
						},
						error: function(e) {
							bvsdk.models.general.defaultAjaxErrorFunction (e);
						},
						beforeSend: function() {
							$bvsdk(container).addClass("BVContentLoadingContainer");
						}
					});
				},

				// posts review comment submission form
				postForm : function (reviewid, container, callBack, options) {
					var settings = $bvsdk.extend(true, {
						"Parameters":{
							"reviewid":reviewid,
							"userid":null
						}
					}, options);
					var apiCall = bvsdk.models.submission.reviewcomment.apiCall (settings);
					var urlString = apiCall["url"];
					var paramObject = $bvsdk.param(apiCall["params"]);
					$bvsdk.ajax({
						type: "POST",
						url: urlString,
						data: paramObject,
						dataType: "json",
						success: function(data) {
							bvsdk.controllers.general.consoleLogFallback (data);
							if(data["HasErrors"]) {
								var errorObject = data["FormErrors"]["FieldErrors"];
								$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-error"]).html('');
								$bvsdk.each(errorObject, function(k, v) {
									$bvsdk('*[name="' + k + '"]').parent().parent().addClass('BVErrorText');
									$bvsdk('*[name="' + k + '"]').addClass('BVErrorBorder');
									$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-error"]).append(v["Message"] + '<br/>');
									$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-form"]).show();
								});
							} else {
								callBack(data, settings);
							}
							$bvsdk(container).removeClass("BVContentLoadingContainer");
						},
						error: function(e) {
							bvsdk.models.general.defaultAjaxErrorFunction (e);
						},
						beforeSend: function() {
							$bvsdk(container).addClass("BVContentLoadingContainer");
						}
					});
				},

				apiCall : function (options) {

					var defaultSettings = $bvsdk.extend(true, {
						"URL":{
							"baseurl":bvsdk.models.config.apiBaseSubmissionURL,
							"customername":bvsdk.models.config.apiDefaults["customerName"],
							"format":bvsdk.models.config.apiDefaults["format"] //Response format (xml or json)
						},
						"Parameters":{
							"apiversion":bvsdk.models.config.apiDefaults["apiVersion"], //The API version.
							"action":null, //The submission action to take -- either 'Preview' or 'Submit'. 'Preview' will show a draft of the content to be submitted; 'Submit' will submit the content. Note that if Action=Submit, the request must be an HTTP POST.
							"agreedtotermsandconditions":null, //Boolean indicating whether or not the user agreed to the terms and conditions. Required depending on the client's settings.
							"callback":null, //Callback function name (JsonP).
							"campaignId":null, //Arbitrary text that may be saved alongside content to indicate vehicle by which content was captured, e.g. “post-purchase email”.
							"commenttext":null, //Value is comment body text.
							"contextDataValue_<Dimension-External-Id>":null, //Some examples of this parameter include the following. Each is followed by possible values. ContextDataValue_PurchaserRank - "top", "top10", "top100", "top1000" ContextDataValue_Purchaser - "yes", "no" ContextDataValue_Age - "under21", "21to34", "35to44", "45to54", "55to64", "over65" ContextDataValue_Gender - "male", "female"
							"hostedauthentication_authenticationemail":null, //Email address where the submitter will receive the confirmation email. If you are configured to use hosted email authentication, this parameter is required. See the Authenticate User method for more information on hosted authentication.
							"hostedauthentication_callbackurl":null, //URL of the link contained in the user authentication email. This should point to a landing page where a web application exists to complete the user authentication process. The host for the URL must be one of the domains configured for the client. The link in the email will contain a user authentication token (authtoken) that is used to verify the submitter. If you are configured to use hosted email authentication, this parameter is required. See the Authenticate User method for more information on hosted authentication.
							"locale":null, //Locale to display Labels, Configuration, Product Attributes and Category Attributes in. The default value is the locale defined in the display associated with the API key.
							"passkey":bvsdk.models.config.apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
							"photocaption_<n>":null, //Value is caption text for the photo URL with the same value of <n>.
							"photourl_<n>":null, //Value is a Bazaarvoice URL of a photo uploaded using the Data API, where <n> is a non-negative integer.
							"productrecommendationid_<n>":null, //Value is non-negative integer representing the product external ID of the <n>'th product recommendation (for Social Recommendations)
							"reviewid":null, //The id of the review that this comment is being submitted on. One ReviewId or StoryId is required.
							"sendemailalertwhenpublished":null, //Boolean indicating whether or not the user wants to be notified when his/her content is published.
							"storyid":null, //The id of the story that this comment is being submitted on. One ReviewId or StoryId is required.
							"title":null, //Value is content title text.
							"user":null, //Value of the encrypted user. This parameter demonstrates that a user has been authenticated. Note that the UserId parameter does not contain authentication information and should not be used for hosted authentication. See the Authenticate User method for more information.
							"useremail":null, //User's email address
							"userid":null, //User's external ID
							"userlocation":null, //User location text
							"usernickname":null, //User nickname display text
							"videocaption_<n>":null, //Value is caption text for the video URL with the same value of <n>.
							"videourl_<n>":null //Value is valid YouTube or Bazaarvoice video-upload URL where <n> is a non-negative integer.
						}
					}, options);

					// set URL base for API call
					var url = bvsdk.models.init.locationProtocol + defaultSettings["URL"]["baseurl"] + "data/" + "submitreviewcomment." + defaultSettings["URL"]["format"];
					
					// set URL parameters for API call
					var params = bvsdk.models.general.returnAPIParameters (defaultSettings["Parameters"]);

					// create array with url and parameters
					var apiCall = {"url":url, "params":params};

					// return the API call
					return apiCall;

				},

			},

		},

		statistics : {

			// gets statistics - must set productID
			getStats : function (productID, container, callBack, options) {
				var settings = $bvsdk.extend(true, {
					"Parameters":{
						"stats":"reviews",
						"filter":{
							"productid":productID
						}
					}
				}, options);
				var apiCall = bvsdk.models.statistics.apiCall (settings);
				var urlString = apiCall["url"];
				var paramObject = apiCall["params"];
				var paramString = bvsdk.models.general.returnAPIParametersString (apiCall["params"]);
				$bvsdk.ajax({
					type: "GET",
					url: urlString,
					data: paramString,
					dataType: "jsonp",
					success: function(data) {
						bvsdk.controllers.general.consoleLogFallback (data);
						callBack(data, paramObject);
						bvsdk.controllers.general.removeLoadingOverlay (container, bvsdk.models.templates["overlay"]["universal"]["default"], true);
					},
					error: function(e) {
						bvsdk.models.general.defaultAjaxErrorFunction (e);
					},
					beforeSend: function() {
						bvsdk.controllers.general.loadLoadingOverlay (container, bvsdk.models.templates["overlay"]["universal"]["default"], true);
					}
				});
			},

			apiCall : function (options) {
				var defaultSettings = $bvsdk.extend(true, {
					"URL":{
						"baseurl":bvsdk.models.config.apiBaseURL,
						"customername":bvsdk.models.config.apiDefaults["customerName"],
						"format":bvsdk.models.config.apiDefaults["format"] //Response format (xml or json)
					},
					"Parameters":{
						"apiversion":bvsdk.models.config.apiDefaults["apiVersion"], //The API version.
						"callback":null, // Callback function name (JsonP).
						"filter":{ // Filter criteria for primary content of the query. Multiple filter criteria are supported.
							"contentlocale":null, // Locale of the content on which to calculate the statistics. A wildcard character "*" can be used to define the value, e.g., "en*" returns all content in English (en_US, en_CA, en_GB, etc.). The two valid operators for this filter are equals (eq) and not equals (neq).
							"productid":null, // The indentifier for the products that will be returned in the results. This filter is required.
						},
						"passkey":bvsdk.models.config.apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
						"stats":null // The type of statistics that will be calculated on included subjects. Available content types are: Reviews, Questions, Answers, Stories. Note: Not all statistical content types apply to every possible include.
					}
				}, options);

				// set URL base for API call
				var url = bvsdk.models.init.locationProtocol + defaultSettings["URL"]["baseurl"] + "data/" + "statistics." + defaultSettings["URL"]["format"];

				// set URL parameters for API call
				var params = bvsdk.models.general.returnAPIParameters (defaultSettings["Parameters"]);

				// create array with url and parameters
				var apiCall = {"url":url, "params":params};

				// return the API call
				return apiCall;

			},

		},

		ugc : {

			review : {

				// gets all reviews with statistics - set productID to null to return all reviews
				getUGC : function (productID, container, callBack, options) {
					var settings = $bvsdk.extend(true, {
						"Parameters":{
							"include":"products",
							"filteredstats":"reviews",
							"filter":{
								"productid":productID,
							}
						}
					}, options);
					var apiCall = bvsdk.models.ugc.review.apiCall(settings);
					var urlString = apiCall["url"];
					var paramObject = apiCall["params"];
					var paramString = bvsdk.models.general.returnAPIParametersString (apiCall["params"]);
					$bvsdk.ajax({
						type: "GET",
						url: urlString,
						data: paramString,
						dataType: "jsonp",
						success: function(data) {
							bvsdk.controllers.general.consoleLogFallback (data);
							callBack(data, paramObject);
							bvsdk.controllers.general.removeLoadingOverlay (container, bvsdk.models.templates["overlay"]["universal"]["default"], false);
						},
						error: function(e) {
							bvsdk.models.general.defaultAjaxErrorFunction (e);
						},
						beforeSend: function() {
							bvsdk.controllers.general.loadLoadingOverlay (container, bvsdk.models.templates["overlay"]["universal"]["default"], false);
						}
					});
				},

				apiCall : function (options) {

					var defaultSettings = $bvsdk.extend(true, {
						"URL":{
							"baseurl":bvsdk.models.config.apiBaseURL,
							"customername":bvsdk.models.config.apiDefaults["customerName"],
							"format":bvsdk.models.config.apiDefaults["format"] //Response format (xml or json)
						},
						"Parameters":{
							"apiversion":bvsdk.models.config.apiDefaults["apiVersion"], //The API version.
							"attributes":null, // Attributes to be included when returning content. For example, if includes are requested along with the &attributes=ModeratorCodes parameter, both the includes and the results will contain moderator codes. In order to filter by ModeratorCode, you must request the ModeratorCodes attribute parameter.
							"callback":null, // Callback function name (JsonP).
							"excludefamily":null, // Boolean flag indicating whether to exclude content from other products in the same family as the requested product. For example, "&filter=productid:eq:1101&excludeFamily=true" limits returned content to just that of product 1101 and not any of the products in the same family. If a value is not defined, content on all products in the family will be returned.
							"filter":{ // Filter criteria for primary content of the query. Multiple filter criteria are supported.
								"id":null, //The identifier of the Review.
								"additionalfield_[FIELD_NAME]":null, //Additional field to filter by, e.g., filter=AdditionalField_[FIELD_NAME]:eq:[FIELD_VALUE]
								"authorid":null, //The identifier of the author who wrote the content
								"campaignid":null, //The identifier of the Campaign associated with the content
								"categoryancestorid":null, //The identifier of the Product Category ancestor of the Product that the Review was written on.
								"contentlocale":null, //Locale of the content to display. If this filter is not defined, all content regardless of its locale is returned. To return specific content by locale, define the value in the filter. A wildcard character “*” can be used to define the value, e.g., “en*” returns all content in English (en_US, en_CA, en_GB, etc.) or you can use a single ContentLocale code (e.g., “fr_FR”). ContentLocale codes are case-sensitive.
								"contextdatavalue_[DIMENSION_EXTERNAL_ID]":null, //The context data value for the content. DIMENSION_EXTERNAL_ID can be age, gender, etc. e.g. filter=contextdatavalue_age:under21&filter=contextdatavalue_gender:male
								"hascomments":null, //Boolean flag indicating whether content has comments
								"hasphotos":null, //Boolean flag indicating whether content has photos
								"hastags":null, //Boolean flag indicating whether content has tags
								"hasvideos":null, //Boolean flag indicating whether content has videos. For more information on inserting the returned VideoUrl into HTML, see the API Basics page.
								"isfeatured":null, //Boolean flag indicating whether content is featured
								"isratingsonly":null, //Boolean flag indicating whether the review was a ratings only review
								"isrecommended":null, //Boolean flag indicating whether the user would recommend this product
								"issubjectactive":null, //Boolean flag indicating whether the content subject is active
								"issyndicated":null, //Boolean flag indicating whether the review has been syndicated. If IsSyndicated:eq:true, a SyndicationSource block with the details of where the syndication is coming from is displayed. Note: The API key must be configured to show syndicated content.
								"lastmoderatedtime":null, //The date/time of the latest moderation of the content. See the Introduction for an example of using advanced operators for filtering.
								"lastmodificationtime":null, //The date/time of the latest modification of the content. See the Introduction for an example of using advanced operators for filtering.
								"moderatorcode":null, //String value indicating the moderator code for rejected content, e.g., &Filter=ModeratorCode:eq:CR returns UGC that contains the CR (Competitor Reference) code. Multiple codes can be entered in a comma-delimited list, e.g., &Filter=ModeratorCode:eq:CS,IU returns UGC with either the CS (Customer Service Complaint) or the IU (Inappropriate/Unusable Content) code. For a list of all Moderator Codes, see the API Basics page. Note that the ModeratorCodes attribute parameter must be explicitly requested in order to use this filter. See the Parameters section above.
								"productbrandid":null, //The value of the external product brand ID. The value is case-insensitive. To return content that doesn't have a brand ID associated with it, set productbrandid:eq:null
								"productId":null, //The identifier of the Product that the Review was written on.
								"rating":null, //The Review Rating, usually between 1 to 5.
								"secondaryrating_[RATING_NAME]":null, //Secondary rating value to filter by, e.g., filter=SecondaryRating_[RATING_NAME]:gte:[RATING_VALUE]. Note: All advanced operators can be used for secondary ratings comparisons.
								"submissionid":null, //Submission identifier assigned to the content when it was initially submitted
								"submissiontime":null, //The submission date/time of the content. See the Introduction for an example of using advanced operators for filtering.
								"tag_[TAG_NAME]":null, //The tag name to filter by, e.g., filter=tag_[TAG_NAME]:eq:[TAG_VALUE]
								"totalcommentcount":null, //The number of comments the Review has
								"totalfeedbackcount":null, //Number of feedbacks received
								"totalnegativefeedbackcount":null, //Number of negative feedbacks received
								"totalpositivefeedbackcount":null, //Number of positive feedbacks received
								"userlocation":null //Location of the author
							},
							"filter_[TYPE]":null, // Filtering option for included nested content. TYPE can be any included nested content. i.e. Comments for Reviews.
							"include":null, // Related subjects to be included (e.g. Products, Categories, Authors, or Comments).
							"limit":bvsdk.models.config.apiDefaults["limitReviews"], // Max number of records returned. An error is returned if the value passed exceeds 100.
							"limit_[TYPE]":null, // Limit option for the nested content type returned. TYPE can be any nested content. i.e. Comments for Reviews. An error is returned if the value passed exceeds 20.
							"locale":null, // Locale to display Labels, Configuration, Product Attributes and Category Attributes in. The default value is the locale defined in the display associated with the API key.
							"offset":bvsdk.models.config.apiDefaults["offset"], // Index at which to return results. By default, indexing begins at 0 when you issue a query. Using Limit=100, Offset=0 returns results 0-99. When changing this to Offset=1, results 1-100 are returned.
							"passkey":bvsdk.models.config.apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
							"search":null, // Full-text search string used to find UGC. For more information about what fields are searched by default, see the API Basics page.
							"search_[TYPE]":null, // Searching option for included content followed by full-text search string. See the API Basics page for examples of searching for included data.
							"sort":{ // Sort criteria for primary content type of the query. Sort order is required (asc or desc). Multi-attribute sorting for each content/subject type is supported.
								"id":null, //The identifier of the content/subject type
								"additionalfield_[FIELD_NAME]":null, //Additional field to sort by, e.g., sort=AdditionalField_[FIELD_NAME]:desc
								"authorid":null, //The Identifier of the author who wrote the content
								"campaignid":null, //The identifier of the Campaign associated with the content
								"contentlocale":null, //Locale value of the content
								"contextdatavalue_[DIMENSION_EXTERNAL_ID]":null, //The context data value for the content. DIMENSION_EXTERNAL_ID can be age, gender, etc. e.g. sort=contextdatavalue_age:desc&sort=contextdatavalue_gender:asc
								"hascomments":null, //Boolean flag indicating whether content has comments
								"hasphotos":null, //Boolean flag indicating whether content has photos
								"hastags":null, //Boolean flag indicating whether content has tags
								"hasvideos":null, //Boolean flag indicating whether content has videos. For more information on inserting the returned VideoUrl into HTML, see the API Basics page.
								"helpfulness":null, //The helpfulness value of the review
								"isfeatured":null, //Boolean flag indicating whether content is featured
								"isratingsonly":null, //Boolean flag indicating whether the review was a ratings only review
								"isrecommended":null, //Boolean flag indicating whether the user would recommend this product.
								"issubjectactive":null, //Boolean flag indicating whether the content subject is active
								"issyndicated":null, //Boolean flag indicating whether the Content has been Syndicated.
								"lastmoderatedtime":null, //The date/time of the latest moderation of the content
								"lastmodificationtime":null, //The date/time of the latest modification of the content
								"productid":null, //The identifier of the product
								"rating":null, //The Review Rating, usually between 1 to 5
								"secondaryrating_[RATING_NAME]":null, //Secondary rating value to sort by, e.g., sort=SecondaryRating_[RATING_NAME]:desc
								"submissionid":null, //Submission identifier assigned to the content when it was initially submitted
								"submissiontime":null, //The submission date/time of the content
								"totalcommentcount":null, //Number of comments associated with the content
								"totalfeedbackcount":null, //Number of feedbacks received
								"totalnegativefeedbackcount":null, //Number of negative feedbacks received
								"totalpositivefeedbackcount":null, //Number of positive feedbacks received
								"userlocation":null //Location of the author
							},
							"sort_[TYPE]":null, // Sorting option for nested content. Sort order is required (asc or desc). TYPE can be any nested content. i.e. Comments for Reviews.
							"filteredstats":null,
							"stats":null // The type of statistics that will be calculated on included subjects. Available content types are: Reviews, Questions, Answers, Stories. Note: Not all statistical content types apply to every possible include.
						}
					}, options);

					// set URL base for API call
					var url = bvsdk.models.init.locationProtocol + defaultSettings["URL"]["baseurl"] + "data/" + "reviews." + defaultSettings["URL"]["format"];

					// set URL parameters for API call
					var params = bvsdk.models.general.returnAPIParameters (defaultSettings["Parameters"]);

					// create array with url and parameters
					var apiCall = {"url":url, "params":params};

					// return the API call
					return apiCall;
					
				},

			},

			reviewcomment : {

				// get comments - set reviewID to null to return all
				getUGC : function (reviewID, container, callBack, options) {
					var settings = $bvsdk.extend(true, {
						"Parameters":{
							"filter":{
								"reviewid":reviewID
							},
						}
					}, options);
					var apiCall = bvsdk.models.ugc.reviewcomment.apiCall (settings);
					var urlString = apiCall["url"];
					var paramObject = apiCall["params"];
					var paramString = bvsdk.models.general.returnAPIParametersString (apiCall["params"]);
					$bvsdk.ajax({
						type: "GET",
						url: urlString,
						data: paramString,
						dataType: "jsonp",
						success: function(data) {
							callBack(data, paramObject);
							bvsdk.controllers.general.removeLoadingOverlay (container, bvsdk.models.templates["overlay"]["universal"]["default"], false);
						},
						error: function(e) {
							bvsdk.models.general.defaultAjaxErrorFunction (e);
						},
						beforeSend: function() {
							bvsdk.controllers.general.loadLoadingOverlay (container, bvsdk.models.templates["overlay"]["universal"]["default"], false);
						}
					});
				},

				apiCall : function (options) {

					var defaultSettings = $bvsdk.extend(true, {
						"URL":{
							"baseurl":bvsdk.models.config.apiBaseURL,
							"customername":bvsdk.models.config.apiDefaults["customerName"],
							"format":bvsdk.models.config.apiDefaults["format"] //Response format (xml or json)
						},
						"Parameters":{
							"apiversion":bvsdk.models.config.apiDefaults["apiVersion"], //The API version.
							"attributes":null, // Attributes to be included when returning content. For example, if includes are requested along with the &attributes=ModeratorCodes parameter, both the includes and the results will contain moderator codes. In order to filter by ModeratorCode, you must request the ModeratorCodes attribute parameter.
							"callback":null, // Callback function name (JsonP).
							"excludefamily":null, // Boolean flag indicating whether to exclude content from other products in the same family as the requested product. For example, "&filter=productid:eq:1101&excludeFamily=true" limits returned content to just that of product 1101 and not any of the products in the same family. If a value is not defined, content on all products in the family will be returned.
							"filter":{ // Filter criteria for primary content of the query. Multiple filter criteria are supported.
								"id":null, //The identifier of the Review.
								"authorid":null, //The identifier of the author who wrote the content
								"campaignid":null, //The identifier of the Campaign associated with the content
								"categoryancestorid":null, //The identifier of the Product Category ancestor of the Product that the Review was written on.
								"contentlocale":null, //Locale of the content to display. If this filter is not defined, all content regardless of its locale is returned. To return specific content by locale, define the value in the filter. A wildcard character “*” can be used to define the value, e.g., “en*” returns all content in English (en_US, en_CA, en_GB, etc.) or you can use a single ContentLocale code (e.g., “fr_FR”). ContentLocale codes are case-sensitive.
								"hasphotos":null, //Boolean flag indicating whether content has photos
								"hasvideos":null, //Boolean flag indicating whether content has videos. For more information on inserting the returned VideoUrl into HTML, see the API Basics page.
								"isfeatured":null, //Boolean flag indicating whether content is featured
								"lastmoderatedtime":null, //The date/time of the latest moderation of the content. See the Introduction for an example of using advanced operators for filtering.
								"lastmodificationtime":null, //The date/time of the latest modification of the content. See the Introduction for an example of using advanced operators for filtering.
								"moderatorcode":null, //String value indicating the moderator code for rejected content, e.g., &Filter=ModeratorCode:eq:CR returns UGC that contains the CR (Competitor Reference) code. Multiple codes can be entered in a comma-delimited list, e.g., &Filter=ModeratorCode:eq:CS,IU returns UGC with either the CS (Customer Service Complaint) or the IU (Inappropriate/Unusable Content) code. For a list of all Moderator Codes, see the API Basics page. Note that the ModeratorCodes attribute parameter must be explicitly requested in order to use this filter. See the Parameters section above.
								"productid":null, //The identifier of the Product that the Review was written on.
								"reviewid":null, //The identifier of the Review
								"storyid":null, //The identifier of the Story
								"submissionid":null, //Submission identifier assigned to the content when it was initially submitted
								"submissiontime":null, //The submission date/time of the content. See the Introduction for an example of using advanced operators for filtering.
								"totalfeedbackcount":null, //Number of feedbacks received
								"totalnegativefeedbackcount":null, //Number of negative feedbacks received
								"totalpositivefeedbackcount":null, //Number of positive feedbacks received
								"userlocation":null //Location of the author
							},
							"include":null, // Related subjects to be included (e.g. Products, Categories, Authors, or Comments).
							"limit":bvsdk.models.config.apiDefaults["limitReviewComments"], // Max number of records returned. An error is returned if the value passed exceeds 100.
							"locale":null, // Locale to display Labels, Configuration, Product Attributes and Category Attributes in. The default value is the locale defined in the display associated with the API key.
							"offset":bvsdk.models.config.apiDefaults["offset"], // Index at which to return results. By default, indexing begins at 0 when you issue a query. Using Limit=100, Offset=0 returns results 0-99. When changing this to Offset=1, results 1-100 are returned.
							"passkey":bvsdk.models.config.apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
							"search":null, // Full-text search string used to find UGC. For more information about what fields are searched by default, see the API Basics page.
							"search_[TYPE]":null, // Searching option for included content followed by full-text search string. See the API Basics page for examples of searching for included data.
							"sort":{ // Sort criteria for primary content type of the query. Sort order is required (asc or desc). Multi-attribute sorting for each content/subject type is supported.
								"id":null, //The identifier of the content/subject type
								"authorid":null, //The Identifier of the author who wrote the content
								"campaignid":null, //The identifier of the Campaign associated with the content
								"contentlocale":null, //Locale value of the content
								"hasphotos":null, //Boolean flag indicating whether content has photos
								"hasvideos":null, //Boolean flag indicating whether content has videos. For more information on inserting the returned VideoUrl into HTML, see the API Basics page.
								"isfeatured":null, //Boolean flag indicating whether content is featured
								"lastmoderatedtime":null, //The date/time of the latest moderation of the content
								"lastmodificationtime":null, //The date/time of the latest modification of the content
								"productid":null, //The identifier of the product
								"reviewid":null, //The identifier of the Review
								"storyid":null, //The identifier of the Story
								"submissionid":null, //Submission identifier assigned to the content when it was initially submitted
								"submissiontime":null, //The submission date/time of the content
								"totalfeedbackcount":null, //Number of feedbacks received
								"totalnegativefeedbackcount":null, //Number of negative feedbacks received
								"totalpositivefeedbackcount":null, //Number of positive feedbacks received
								"userlocation":null //Location of the author
							},
							"stats":null // The type of statistics that will be calculated on included subjects. Available content types are: Reviews, Questions, Answers, Stories. Note: Not all statistical content types apply to every possible include.
						}
					}, options);

					// set URL base for API call
					var url = bvsdk.models.init.locationProtocol + defaultSettings["URL"]["baseurl"] + "data/" + "reviewcomments." + defaultSettings["URL"]["format"];

					// set URL parameters for API call
					var params = bvsdk.models.general.returnAPIParameters (defaultSettings["Parameters"]);

					// create array with url and parameters
					var apiCall = {"url":url, "params":params};

					// return the API call
					return apiCall;

				},

			},

		},

	},

});