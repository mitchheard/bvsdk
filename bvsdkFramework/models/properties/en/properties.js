// TODO: [mheard] Update and add Questin & Answer properties
$bvsdk.extend(true, bvsdk, {

	models : {

		properties : {
			
			/********** badges **********/

			"badge" : {

				"universal" : {
					"contributor-1" : "Number 1 Contributor",
					"contributor-10" : "Top 10 Contributor",
					"contributor-25" : "Top 25 Contributor",
					"contributor-50" : "Top 50 Contributor",
					"contributor-100" : "Top 100 Contributor",
					"contributor-250" : "Top 250 Contributor",
					"contributor-500" : "Top 500 Contributor",
					"contributor-1000" : "Top 1000 Contributor",
					"default" : "DEFAULT BADGE!",
					"expert" : "Expert",
					"staff" : "Staff",
					"verified-purchaser" : "Verified Purchaser",
					"social-answering-subscriber" : "Social Answering Subscriber",
					"featured" : "Featured",
				},
			},

			/********** buttons **********/

			"button" : {

				"universal" : {
					"cancel" : "Cancel", // cancel button
					"close" : "Close", // close button
					"edit" : "Edit", // edit button
					// "generic" : "[data-bv-target='button-generic-universal']", // generic button
					"preview" : "Preview", // preview button
					"remove" : "Remove", // remove button
					"return" : "Return to Product", // return to product button
					"submit" : "Submit", // submit button
					"vote-negative" : "Unhelpful", // unhelpful button
					"vote-positive" : "Helpful", // helpful button
					"inappropriate" : "Flag as Inappropriate", // report/flag button container
				},

				"review" : {
					"read" : "Read All Reviews", // read reviews button
					"write" : "Review This Product", // write review button
					"write-first" : "Be the First to Review This Product", // write review button
				},

				"review-comment" : {
					"toggle" : "Show/Hide Comments", // toggle review comments button
					"write" : "Post Comment", // write reveiw comment button
					"write-first" : "Be the First to Post a Comment", // write reveiw comment button
				},

				"question" : {
					"read" : "Read All Questions", // read questions button
					"write" : "Ask a Question", // ask question button
					"write-first" : "Be the First to Ask a Question About This Product", // ask first question button
				},

				"answer" : {
					"toggle" : "Show/Hide Answers", // toggle review comments button
					"write" : "Post Answer", // write reveiw comment button
					"write-first" : "Be the First to Answer a Question", // write reveiw comment button
				},
			},
				
			/********** error messaging **********/

			"error" : {

				"universal" : {
					"ugc-nocontent" : "Sorry. There is no content to display with the given specifications.",
					"submission-timeout" : "Sorry. Submission is unavailable at this time.",
					"submission-500" : "Sorry. The server is the not responding at this time. (500 error)",
				},

				"review" : {
					"ugc-nocontent" : "Sorry. There are no review to display with the given specifications.",
					"submission-timeout" : "Sorry. Submission is unavailable at this time.",
					"submission-500" : "Sorry. The server is the not responding at this time. (500 error)",
				},

				"review-comment" : {
					"ugc-nocontent" : "Sorry. There are no comments to display with the given specifications.",
					"submission-timeout" : "Sorry. Submission is unavailable at this time.",
					"submission-500" : "Sorry. The server is the not responding at this time. (500 error)",
				},
			},

			/********** feedback and inappropriate **********/

			"feedback" : {

				"universal" : {
					"voting-label" : "Was this review helpful?",
					"prefix-count" : "",
					"separator-count" : "out of",
					"suffix-count" : "",
					"prefix-percentage" : "(",
					"suffix-percentage" : "% )",
					"prefix-label" : "",
					"suffix-label" : "found this review helpful.",
					"inappropriate-label" : "Please describe the issue",
					"inappropriate-helpertext" : "",
					"inappropriate-placeholder" : "",
					"message-voting-received" : "Thanks! Your feedback has been successfully submitted.",
					"message-voting-removed" : "Your feedback has been removed.",
					"message-inappropriate-received" : "Thanks! Your concern has been successfully submitted.",
					"message-error" : "Sorry. There was an error submitting your feedback.",
				},
			},

			/********** filters **********/

			"filter" : {

				"universal" : {
					"widget-label" : "Filter content by:",
					"prefix-label" : "",
					"suffix-label" : "",
					"prefix-count" : "(",
					"suffix-count" : ")",
					// number in key is matching filter values returned in API call
					// e.g."rating-overall-<api value>-label"
					"rating-overall-1-label" : "1 star",
					"rating-overall-2-label" : "2 stars",
					"rating-overall-3-label" : "3 stars",
					"rating-overall-4-label" : "4 stars",
					"rating-overall-5-label" : "5 stars",
					"rating-secondary-1-label" : "1 star",
					"rating-secondary-2-label" : "2 stars",
					"rating-secondary-3-label" : "3 stars",
					"rating-secondary-4-label" : "4 stars",
					"rating-secondary-5-label" : "5 stars",
				},

				"review" : {
					"widget-label" : "Filter reviews by:",
				},
			},
			
			/********** headers **********/

			"header" : {

				"universal" : {
					"page" : "[data-bv-target='header-page-universal']",
					"page-submission" : "Write Your Opinion",
					"page-submission-preview" : "Preview Your Opinion",
					"page-submission-thankyou" : "Thank You For Your Opinion",
					"section-ugc" : "",
					"section-inappropriate" : "Report Inappropriate",
					"section-submission-error" : "Errors",
					"section-submission-ugc" : "Your Opinion",
					"section-submission-user" : "User Info",
					"section-submission-media" : "Media Upload",
				},

				"review" : {
					"page" : "Reviews",
					"page-nocontent" : "There are no reviews for this product.",
					"page-submission" : "Write Your Review",
					"page-submission-preview" : "Preview Your Review",
					"page-submission-thankyou" : "Thank You For Your Review",

					/* widget search */
					"page-featured" : "Featured Reviews",
					"page-helpful-high" : "Most Helpful High Rated Review",
					"page-helpful-low" : "Most Helpful Low Rated Review",

					"section-ugc" : "",
					"section-inappropriate" : "Report Inappropriate",
					"section-submission-rating" : "Your Rating",
					"section-submission-error" : "Errors",
					"section-submission-ugc" : "Your Review",
					"section-submission-user" : "User Info",
					"section-submission-media" : "Media Upload",
				},

				"review-comment" : {
					"page" : "Comments",
					"page-nocontent" : "There are no comments for this review.",
					"page-submission" : "Write Your Comment",
					"page-submission-preview" : "Preview Your Comment",
					"page-submission-thankyou" : "Thank You For Your Comment",
					"section-ugc" : "Review Comments",
					"section-inappropriate" : "Report Inappropriate",
					"section-submission-error" : "Errors",
					"section-submission-ugc" : "Your Comment",
					"section-submission-user" : "User Info",
					"section-submission-media" : "Media Upload",
				},

				"question" : {
					"page" : "QQQuestions",
					"page-nocontent" : "There are no questions for this product.",
					"page-submission" : "Write Your Question",
					"page-submission-preview" : "Preview Your Question",
					"page-submission-thankyou" : "Thank You For Your Question",

					/* widget search */
					"page-featured" : "Featured Reviews",
					"page-helpful-high" : "Most Helpful High Rated Question",
					"page-helpful-low" : "Most Helpful Low Rated Question",

					"section-ugc" : "",
					"section-inappropriate" : "Report Inappropriate",
					"section-submission-rating" : "Your Rating",
					"section-submission-error" : "Errors",
					"section-submission-ugc" : "Your Question",
					"section-submission-user" : "User Info",
					"section-submission-media" : "Media Upload",
				},

				"answer" : {
					"page" : "AAAnswers",
					"page-nocontent" : "There are no answers for this question.",
					"page-submission" : "Write Your Answer",
					"page-submission-preview" : "Preview Your Answer",
					"page-submission-thankyou" : "Thank You For Your Answer",
					"section-ugc" : "Question Answers",
					"section-inappropriate" : "Report Inappropriate",
					"section-submission-error" : "Errors",
					"section-submission-ugc" : "Your Answer",
					"section-submission-user" : "User Info",
					"section-submission-media" : "Media Upload",
				},
			},

			/********** histograms **********/

			"histogram" : {

				"universal" : {
					"title" : "Ratings Breakdown",
					"prefix-label" : "",
					"suffix-label" : "",
					"prefix-count" : "(",
					"suffix-count" : ")",
				},
			},
			
			/********** overlays **********/

			"overlay" : {

				"universal" : {
					"loading" : "Loading...",
				},

				"review" : {
					"loading" : "Loading Reviews...",
				},

				"review-comment" : {
					"loading" : "Loading Cmments...",
				},
			},

			/********** pagination **********/

			"pagination" : {

				"universal" : {
					"button-first" : "First",
					"button-last" : "Last",
					"button-next" : "Next",
					"button-previous" : "Prev",	
					"separator" : "out of",
				},
			},

			/********** product catalog **********/

			"product" : {

				"universal" : {
				},
			},

			/********** sorting **********/

			"sort" : {
				"universal" : {
					"default" : "Sort Content...",
					"rating-asc" : "Lowest Rating",
					"rating-desc" : "Highest Rating",
					"submissiontime-asc" : "Oldest",
					"submissiontime-desc" : "Newest",
					"totalnegativefeedbackcount-desc" : "Least Helpful",
					"totalpositivefeedbackcount-desc" : "Most Helpful",
					"isfeatured-desc" : "Featured Content",
					"hasphotos-desc" : "Photo Content",
					"hasvideos-desc" : "Video Content",
				},

				"review" : {
					"default" : "Sort Reviews...",
					"rating-asc" : "Lowest Rating",
					"rating-desc" : "Highest Rating",
					"submissiontime-asc" : "Oldest",
					"submissiontime-desc" : "Newest",
					"totalnegativefeedbackcount-desc" : "Least Helpful",
					"totalpositivefeedbackcount-desc" : "Most Helpful",
					"isfeatured-desc" : "Featured Reviews",
					"hasphotos-desc" : "Photo Reviews",
					"hasvideos-desc" : "Video Reviews",
				},
			},

			/********** submission **********/

			"submission" : {

				"universal" : {
					// title
					"title-label" : "Title",
					"title-helpertext" : "Example: Great product for a beginner!",
					"title-placeholder" : "",
					// body
					"body-label" : "Your Opinion",
					"body-helpertext" : "",
					"body-placeholder" : "",
					// nickname
					"nickname-label" : "User Nickname",
					"nickname-helpertext" : "Do not use your full name or email address; your privacy is important to us.",
					"nickname-placeholder" : "",
					// email
					"email-label" : "User Email",
					"email-helpertext" : "We will ONLY use your email to notify you when your review is posted or if a comment is added to your review after it is posted.",
					"email-placeholder" : "",
					// location
					"location-label" : "User Location",
					"location-helpertext" : "Example: New York, NY",
					"location-placeholder" : "",
					// additional fields
					"additionalfield-label-<inputId>" : "",
					"additionalfield-helpertext-<inputId>" : "",
					"additionalfield-placeholder-<inputId>" : "",
					// context data values
					"contextdatavalue-label-<inputId>" : "",
					"contextdatavalue-helpertext-<inputId>" : "",
					"contextdatavalue-placeholder-<inputId>" : "",
					// tags
					"tag-group-label" : "default tag group label",
					"tag-group-helpertext" : "",
					"tag-group-placeholder" : "",	
					// context data values
					"tag-individual-labellabel" : "",
					"tag-individual-helpertext" : "",
					"tag-individual-placeholder" : "Add your own tag",
					// default file upload
					"file-individual-label" : "",
					"file-individual-helpertext" : "default file helpertext",
					"file-individual-placeholder" : "",
					// file group upload-photo
					"file-photo-group-label" : "Upload you photos",
					"file-photo-group-helpertext" : "",
					"file-photo-group-placeholder" : "",
					// file individual upload-photo
					"file-photo-individual-label" : "",
					"file-photo-individual-helpertext" : "2 image max, 5mb per image",
					"file-photo-individual-placeholder" : "",
					// photo url
					"photo-url-label" : "",
					"photo-url-helpertext" : "",
					"photo-url-placeholder" : "",
					// photo caption
					"photo-caption-label" : "Add Caption",
					"photo-caption-helpertext" : "",
					"photo-caption-placeholder" : "add caption to pho",
					// photo preview section
					"photo-preview-label" : "",
					"photo-preview-helpertext" : "",
					"photo-preview-placeholder" : "",
					// video url
					"video-url-label" : "Youtube Link",
					"video-url-helpertext" : "(Paste the URL from your videos on Youtube)",
					"video-url-placeholder" : "",
					// video caption
					"video-caption-label" : "Video Caption",
					"video-caption-helpertext" : "Example: \"See it in action.\" 150 Characters Max.",
					"video-caption-placeholder" : "",
					// terms and conditions
					"termsandconditions-label" : "I acknowledge that I have read and agree to the Terms & Conditions.",
					"termsandconditions-helpertext" : "",
					"termsandconditions-placeholder" : "",
					// email alert when commented
					"alert-email-commented-label" : "Yes, Please send me an email when a comment posts to my review.",
					"alert-email-commented-helpertext" : "",
					"alert-email-commented-placeholder" : "",
					// email alert when published
					"alert-email-published-label" : "Yes, Please send me an email when my review is published.",
					"alert-email-published-helpertext" : "",
					"alert-email-published-placeholder" : "",
					// character counter
					"charcounter-prefix" : "Character(s) needed to meet minimum length: ",
					"charcounter-suffix" : "",
					"charcounter-success" : "Minimum reached!",
					// thank you page
					"thankyou-text" : "Thank you for your opinion!",
					"thankyou-prefix-time" : "Your content will post in the next",
					"thankyou-suffix-time" : "hours.",
				},
				"review" : {
					"rating-value-1-label" : "poor",
					"rating-value-2-label" : "fair",
					"rating-value-3-label" : "average",
					"rating-value-4-label" : "good",
					"rating-value-5-label" : "excellent",
					"rating-overall-value-1-label" : "poor",
					"rating-overall-value-2-label" : "fair",
					"rating-overall-value-3-label" : "average",
					"rating-overall-value-4-label" : "good",
					"rating-overall-value-5-label" : "excellent",
					"rating-secondary-value-1-label" : "poor",
					"rating-secondary-value-2-label" : "fair",
					"rating-secondary-value-3-label" : "average",
					"rating-secondary-value-4-label" : "good",
					"rating-secondary-value-5-label" : "excellent",
					// overall rating group
					"rating-overall-label" : "Overall Rating",
					"rating-overall-helpertext" : "1 is bad, 5 is great!",
					"rating-overall-placeholder" : "",
					// secondary ratings group
					"rating-secondary-group-label" : "Secondary Ratings",
					"rating-secondary-group-helpertext" : "sec group",
					"rating-secondary-group-placeholder" : "",
					// secondary ratings individual
					"rating-secondary-individual-label" : "",
					"rating-secondary-individual-helpertext" : "sec indi",
					"rating-secondary-individual-placeholder" : "",
					// recommended
					"recommended-label" : "Would you recommend this product?",
					"recommended-helpertext" : "",
					"recommended-placeholder" : "",
					// title
					"title-label" : "Review Title",
					"title-helpertext" : "Example: Great product for a beginner!",
					"title-placeholder" : "",
					// body
					"body-label" : "Review Text",
					"body-helpertext" : "",
					"body-placeholder" : "",
					// thank you page
					"thankyou-text" : "Thank you for your review!",
					"thankyou-prefix-time" : "Your review will post in the next",
					"thankyou-suffix-time" : "hours.",
				},
				"review-comment" : {
					// title
					"title-label" : "Comment Title",
					"title-helpertext" : "Example: Great Review!",
					"title-placeholder" : "",
					// body
					"body-label" : "Comment Text",
					"body-helpertext" : "",
					"body-placeholder" : "",
					// thank you page
					"thankyou-text" : "Thank you for your comment!",
					"thankyou-prefix-time" : "Your comment will post in the next",
					"thankyou-suffix-time" : "hours.",
				},
			},
			
			/********** general display items **********/

			"ugc" : {
				
				"universal" : {
					// additional fields
					"additionalfield-prefix" : "",
					"additionalfield-suffix" : "",
					// context data values
					"cdv-prefix" : "",
					"cdv-suffix" : "",	
					// date
					"date-prefix" : "on",
					// location
					"location-prefix" : "from",
					"location-suffix" : "",
					// nickname
					"nickname-prefix" : "",
					"nickname-suffix" : "",
					// recommended
					"recommended-prefix-count" : "(",
					"recommended-separator-count" : "out of",
					"recommended-suffix-count" : ")",
					"recommended-prefix-percentage" : "",
					"recommended-suffix-percentage" : "% of reviewers would recommeded this product to a friend.",
					"recommended-value-no" : "No, I would not recommend this to a friend.",
					"recommended-value-yes" : "Yes, I would recommend this to a friend!",
					// tags
					"tag-prefix-first" : "",
					"tag-prefix" : "",
					"tag-prefix-last" : "",
					"tag-suffix-first" : "",
					"tag-suffix" : ",",
					"tag-suffix-last" : "",
					// tag cloud
					"tagcloud-prefix-first" : "",
					"tagcloud-prefix" : "",
					"tagcloud-prefix-last" : "",
					"tagcloud-suffix-first" : "",
					"tagcloud-suffix" : "",
					"tagcloud-suffix-last" : "",
				},

				"review" : {
					// ratings
					"rating-overall-label" : "Overall Rating:",
					"rating-overall-separator" : "/",
					"rating-secondary-separator" : "/",
				},
			},
		},

	},

});