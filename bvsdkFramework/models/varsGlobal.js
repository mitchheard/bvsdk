$bvsdk.extend(true, bvsdk, {

	models : {

		config : {


			/***** client api defaults *****/


			apiDefaults : {
				"stagURL": "stg.api.bazaarvoice.com/",
				"prodURL": "api.bazaarvoice.com/",
				"stagSubmissionURL": "stg.api.bazaarvoice.com/",
				"prodSubmissionURL": "api.bazaarvoice.com/",
				"customerName": "cssandbox13.ugc",
				"format": "json",
				// "locale": bvConfigSDK["locale"] || "en_US",
				"locale": (bvConfigSDK["region"]) ? bvConfigSDK["language"] + "_" + bvConfigSDK["region"] : bvConfigSDK["language"] || "en_US",
				"apiVersion": "5.4",
				"passkey": bvConfigSDK["passkey"] || (bvConfigSDK["production"]) ? "<production key>" : "iwmji1d018b62e3fshc70qaj8", // cssandbox - PRR
				// "passkey": bvConfigSDK["passkey"] || (bvConfigSDK["production"]) ? "<production key>" : "3lxs1moc47vdim9iy99nmb130", // cssandbox - C13
				// "passkey": bvConfigSDK["passkey"] || (bvConfigSDK["production"]) ? "<production key>" : "56m3b2rfbcquf5j6fejjuu3w", // cssandbox - BBY
				"offset": 0,
				"limitReviews": 10,
				"limitReviewComments": 2,
				"limitQuestions": 10,
				"limitAnswers": 2,
				"limitStories": 10,
				"limitStoryComments": 2,
				"page": 1,
			},


			/***** set production - true = production - false = staging *****/


			production : bvConfigSDK["production"] || false,


			/***** set debug mode *****/


			debug : bvConfigSDK["debug"] || false,


			/***** helpfulness voting - true = user can undo voting selection and submit another vote *****/
			/***** THIS JUST SETS THE COOKIE. MAKE SURE THE CONFIG ALLOWS THIS BEFORE SWITCHING TO TRUE! *****/


			bvUndoHelpfulnessAllowed : false,


			/***** hosted authentication *****/


			bvHostedAuth : false,


			/***** set url bases *****/


			// url path for staging site
			stagingURL : bvsdk.models.init.locationProtocol + bvsdk.models.init.locationHostName + bvsdk.models.init.locationPort + bvsdk.models.init.localPathToSDK,
			stagingSubmissionURL : bvsdk.models.init.locationProtocol + bvsdk.models.init.locationHostName + bvsdk.models.init.locationPort + bvsdk.models.init.localPathToSDK + "bvSubmissionContainer.html",
			// url pate for production site
			productionURL : bvsdk.models.init.locationProtocol + bvsdk.models.init.locationHostName + bvsdk.models.init.locationPort + bvsdk.models.init.localPathToSDK,
			productionSubmissionURL : bvsdk.models.init.locationProtocol + bvsdk.models.init.locationHostName + bvsdk.models.init.locationPort + bvsdk.models.init.localPathToSDK + "bvSubmissionContainer.html",


			/***** magpie settings *****/


			defaultMagpieSettings : {
			    // "setAnonTrackerHostname" : "",
			    "setAnonymous" : true, // third party cookie - true = off / false = on
			    "setAudience" : "public", // public, private, internal
			    // "setBrandDomain" : "", // client domain - setting to false clears 1st party cookies
			    "setClient" : "cssandbox13", // client name
			    "setDisplay" : null, // client display code
			    "setEnvironment" : "dev",
			    // "setEventClassFilter" : "",
			    "setSecure" : false,
			    "setSource" : "sdk-api", // REQUIRED
			    "setStaging" : true,
			    // "setTrackerHostname" : "",
			    "enableValidation" : true,
			},


			/***** submission *****/


			controllerSubmissionDefaults : {
				"minimumCharacterCounter": 50,
			},


			/***** toggle animation *****/


			defaultAnimationSpeed : 300, // milliseconds

			defaultToggleOptions : {
				duration: bvsdk.models.init.defaultAnimationSpeed,
				easing: "swing",
				queue: true
			},


			/***** inline validation *****/


			bvClassRequired : "BVRequired",
			bvClassSuccess : "BVSuccess",
			bvClassError : "BVError",

			defaultInlineValidationOption : {
				successClass: bvsdk.models.init.bvClassSuccess,
				errorClass: bvsdk.models.init.bvClassError,
				messages: {
					"required":"This is a required field.",
					"alphanum":"You may not enter spaces or special characters, numbers and letters only.",
				},
				errors: {
					container: function (elem, isRadioOrCheckbox) {
						return $bvsdk(elem).closest(".BVField");
					},
					classHandler: function (elem, isRadioOrCheckbox) {
						return $bvsdk(elem).closest(".BVField");
					},
					errorsWrapper:"<div class='BVErrorContainerInline'></div>",
					errorElem:"<div class='BVErrorInline'></div>",
				},
			},


			/***** decimal truncation - value represents amount of decimal places to display *****/


			defaultDecimalOptions : {
				"overallAverage": 1, // overall rating - average
				"secondaryAverage": 1, // secondary rating - average
				"overall": 1, // overall rating - individual
				"secondary": 1, // secondary rating - individual
				"overallRange": 0, // overall rating - range (out of)
				"secondaryRange": 0, // secondary rating - range (out of)
			},


			/* set global variables using config settings */


			setGlobalVariables : function () {

				/* set site urls */

				this.apiBaseURL = this.production ? this.apiDefaults["prodURL"] : this.apiDefaults["stagURL"];
				this.apiBaseSubmissionURL = this.production ? this.apiDefaults["prodSubmissionURL"] : this.apiDefaults["stagSubmissionURL"];

				this.siteBaseURL = this.production ? this.productionURL : this.stagingURL;
				this.siteBaseSubmissionURL = this.production ? this.productionSubmissionURL : this.stagingSubmissionURL;

				/* set date format based off locale */

				switch (this.apiDefaults["locale"]) {
					case "en_US": 
						this.bvDateFormat = "MMMM dd, yyyy";
						break;

					default:
						this.bvDateFormat = "MMMM dd, yyyy";
						bvsdk.controllers.general.consoleLogFallback ("no locale");
						break;

				}

				/***** parse UAS and set user defaults *****/

				this.bvUserDefaults = {
					"bvUAS": typeof userToken != 'undefined' ? userToken : "", // encoded user string, or userToken if set
					// "userId": "testuser",
					// "userEmail":"bvspambox@gmail.com", //User's email address
					// "userLocation":null, //User location text
					// "userNickname":"testuser", //User nickname display text
				};

				/* return the config object */

				return this;

			},

		}.setGlobalVariables(),

	},

});
