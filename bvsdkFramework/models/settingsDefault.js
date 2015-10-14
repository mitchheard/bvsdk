// TODO: [mheard] remove stories and update/test for Question & Answers (what else is needed?)

var settings = $bvsdk.extend(true, {
	"parentContainer":"", // NO DEFAULT
	"targetContainer":"",
	"viewContainer":"",
	"loadOrder":"",
	"productId":"", // id associated with the product
	"contentId":"", // id associated with the content (i.e. review, question, story, etc.) being displayed
	"returnURL":"",
	"modelLocalDefaultSettings":"", // used to pass the api settings into the local function (for use with pagination, filter, and sort reloading)
	// submission input settings
	"inputSettings":{
		"inputName":"",
		"inputType":"",
		"inputLabel":"",
		"inputPlaceholder":"", // USER DEFINED
		"inputHelperText":"", // USER DEFINED
		"inputHidden":"", // USER DEFINED
		"inputValue":"",
		"inputSelected":"",
		"inputMinLength":"",
		"inputMaxLength":"",
		"inputRequired":"",
		"inputDefault":"",
		"inputOptionsArray":"",
		"inputSubElements":""
	},
	// filter settings
	"filterSettings":{
		"ratingOverallEnabled":false,
		"ratingSecondaryEnabled":false,
		"cdvEnabled":false,
		"additionalFieldEnabled":false,
		"tagEnabled":false,
	},
	// pagination settings
	"paginationSettings":{
		"offset":null,
		"limit":null,
		"totalResults":null,
		"btnsDisplayed":null,
		"prevBtnBool":"",
		"prevBtnLabel":"",
		"nextBtnBool":"",
		"nextBtnLabel":"",
		"firstBtnBool":"",
		"firstBtnLabel":"",
		"lastBtnBool":"",
		"lastBtnLabel":"",
		"totalPageBool":""
	},
	// helpfulness/inappropriate settings
	"feedbackSettings":{
		"contentType":"",
		"feedbackType":"",
		"vote":"",
		"reasonText":""
	},
	// media submission settings
	"mediaSettings":{
		"contentType":""
	},
	// for pagination, filtering, sorting, etc
	"viewReloadOptions":{
		"model":"",
		"modelSettings":"",
		"controller":"",
		"controllerSettings":""
	}
}, options);



bvsdk : {
	controllers : {
		badges : {

		},
		catalog : {
			categories : {

			},
			products : {

			},
		},
		feedback : {

		},
		filters : {

		},
		general : {

		},
		init : {

		},
		histogram : {

		},
		magpie : {

		},
		pagination : {

		},
		profiles : {

		},
		roibeacon : {

		},
		sorting : {

		},
		statistics : {

		},
		submission : {
			answer : {

			},
			question : {

			},
			review : {

			},
			reviewcomment : {

			},
			story : {

			},
			storycomment : {

			},
			universal : {

			},
		},
		ugc : {
			answers : {

			},
			question : {

			},
			review : {

			},
			reviewcomment : {

			},
			story : {

			},
			storycomment : {

			},
			universal : {

			},
		},
	},
	models : {
		badges : {

		},
		catalog : {
			catagory : {

			},
			product : {

			},
		},
		config : {

		},
		feedback : {

		},
		filters : {

		},
		general : {

		},
		init : {

		},
		magpie : {

		},
		properties : {

		},
		sorting : {

		},
		statistics : {

		},
		submission : {
			media : {

			},
			review : {

			},
			reviewcomment : {

			},
		},
		targets : {

		},
		templates : {

		},
		ugc : {
			review : {

			},
			reviewcomment : {

			},
		},
		user : {

		},
	},
}
