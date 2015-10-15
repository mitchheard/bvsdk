// TODO: [mheard] lots to do here, see individual comments below

$bvsdk.extend(true, bvsdk, {

	models : {

		targets : {

			/********** badges **********/

			"badge" : {

				"universal" : {
					"container-group-default" : "[data-bv-target='badge-container-group-default-universal']", // default badge group
					"container-group-content" : "[data-bv-target='badge-container-group-content-universal']", // badge group associated with ugc content (featured)
					"container-group-user" : "[data-bv-target='badge-container-group-user-universal']", // badge group associated with user (contributor)
					"container-group-affiliation" : "[data-bv-target='badge-container-group-affiliation-universal']", // badge group associated with client (staff)
					"container-text" : "[data-bv-target='badge-text']", // badge group associated with client (staff)
				},
			},

			/********** buttons **********/

			"button" : {

				"universal" : {
					"cancel" : "[data-bv-target='button-cancel-universal']", // cancel button
					"close" : "[data-bv-target='button-close-universal']", // close button
					"edit" : "[data-bv-target='button-edit-universal']", // edit button
					"generic" : "[data-bv-target='button-generic-universal']", // generic button
					"preview" : "[data-bv-target='button-preview-universal']", // preview button
					"return" : "[data-bv-target='button-return-universal']", // return to product button
					"submit" : "[data-bv-target='button-submit-universal']", // submit button
					"vote-negative" : "[data-bv-target='button-voting-negative-universal']", // unhelpful button
					"vote-positive" : "[data-bv-target='button-voting-positive-universal']", // helpful button
					"inappropriate" : "[data-bv-target='button-inappropriate-universal']", // report/flag button container
				},

				"review" : {
					"read" : "[data-bv-target='button-read-review']", // read reviews button
					"write" : "[data-bv-target='button-write-review']", // write review button
				},

				"review-comment" : {
					"toggle" : "[data-bv-target='button-toggle-review-comment']", // toggle review comments button
					"write" : "[data-bv-target='button-write-review-comment']", // write reveiw comment button
				},

				"question" : {
					"read" : "[data-bv-target='button-read-question']", // read questions button
					"write" : "[data-bv-target='button-write-question']", // write question button
				},

				"answer" : {
					"toggle" : "[data-bv-target='button-toggle-answer']", // toggle answers button
					"write" : "[data-bv-target='button-write-answer']", // write answer button
				},

				// TODO: Questions & Answers
			},

			/********** feedback and inappropriate **********/

			"feedback" : {

				"universal" : {
					"container-widget" : "[data-bv-target='feedback-container-widget-universal']", // entire review widget
					"container-form" : "[data-bv-target='feedback-container-form-universal']", // entire review widget
					"container-message" : "[data-bv-target='feedback-container-message-universal']", // entire review widget
					"count" : "[data-bv-target='feedback-container-count-universal']", // entire review widget
					"voting" : "[data-bv-target='feedback-container-voting-universal']", // entire review widget
					"inappropriate" : "[data-bv-target='feedback-container-inappropriate-universal']", // entire review widget
					"textarea" : "[data-bv-target='input-textarea-inappropriate']", // inappropriate text input
					"message" : "[data-bv-target='feedback-message-universal']", // entire review widget
				},
			},

			/********** filters **********/

			"filter" : {

				"universal" : {
					"container-group" : "[data-bv-target='filter-container-group-universal']",
					"container-individual" : "[data-bv-target='filter-container-individual-universal']",
				},
			},

			/********** headers - page, section **********/

			"header" : {

				"universal" : {
					"page" : "[data-bv-target='header-page-universal']",
					"section" : "[data-bv-target='header-section-universal']",
					"section-ugc" : "[data-bv-target='header-section-ugc-universal']", // inappropriate section header container
					"section-inappropriate" : "[data-bv-target='header-section-inappropriate-universal']", // inappropriate section header container
					"section-submission-error" : "[data-bv-target='header-section-submission-error-universal']", // inappropriate section header container
					"section-submission-ugc" : "[data-bv-target='header-section-submission-ugc-universal']", // inappropriate section header container
					"section-submission-media" : "[data-bv-target='header-section-submission-media-universal']", // inappropriate section header container
					"section-submission-user" : "[data-bv-target='header-section-submission-user-universal']", // inappropriate section header container
				},

				"review" : {
					"page" : "[data-bv-target='header-page-review']",
					"section" : "[data-bv-target='header-section-review']",
					"section-ugc" : "[data-bv-target='header-section-ugc-review']", // inappropriate section header container
					"section-submission-rating" : "[data-bv-target='header-section-submission-rating-review']", // inappropriate section header container
				},

				"review-comment" : {
					"page" : "[data-bv-target='header-page-review-comment']",
					"section" : "[data-bv-target='header-section-review-comment']",
					"section-ugc" : "[data-bv-target='header-section-ugc-review-comment']", // inappropriate section header container
				},

				"question" : {
					"page" : "[data-bv-target='header-page-question']",
					"section" : "[data-bv-target='header-section-question']",
					"section-ugc" : "[data-bv-target='header-section-ugc-question']", // inappropriate section header container
					"section-submission-rating" : "[data-bv-target='header-section-submission-rating-question']", // inappropriate section header container
				},

				"answer" : {
					"page" : "[data-bv-target='header-page-answer']",
					"section" : "[data-bv-target='header-section-answer']",
					"section-ugc" : "[data-bv-target='header-section-ugc-answer']", // inappropriate section header container
				},

				// TODO: Questions & Answers
			},

			/********** histograms **********/

			"histogram" : {

				"universal" : {
					"container-widget" : "[data-bv-target='histogram-container-widget-universal']",
					"container-group" : "[data-bv-target='histogram-container-group-universal']",
					"container-individual" : "[data-bv-target='histogram-container-individual-universal']",
				},
			},

			/********** submssion field form inputs **********/

			"input" : {

				"universal" : {
					"individual" : "[data-bv-target='input-universal']",
					"group" : "[data-bv-target='input-group-universal']",
					"rating-secondary-group-universal" : "[data-bv-target='input-group-secondary-universal']",
					"text" : "[data-bv-target='input-text-universal']",
					"textarea" : "[data-bv-target='input-textarea-universal']",
					"radio-group" : "[data-bv-target='input-radio-group-universal']",
					"radio-individual" : "[data-bv-target='input-radio-individual-universal']",
					"checkbox-group" : "[data-bv-target='input-checkbox-group-universal']",
					"checkbox-individual" : "[data-bv-target='input-checkbox-individual-universal']",
					"select" : "[data-bv-target='input-select-universal']",
					"option" : "[data-bv-target='input-option-universal']",
					"file" : "[data-bv-target='input-file-universal']",
				},
			},

			/********** pagination **********/

			"pagination" : {

				"universal" : {
					"container-widget" : "[data-bv-target='container-pagination-widget-universal']",
					"button-group" : "[data-bv-target='pagination-button-group']",
					"button-first" : "[data-bv-target='pagination-button-first']",
					"button-last" : "[data-bv-target='pagination-button-last']",
					"button-next" : "[data-bv-target='pagination-button-next']",
					"button-previous" : "[data-bv-target='pagination-button-previous']",
				},

				"review" : {
					"container-widget" : "[data-bv-target='pagination-container-widget-review']",
				},

				"review-comment" : {
					"container-widget" : "[data-bv-target='pagination-container-widget-review-comment']",
				},

				"question" : {
					"container-widget" : "[data-bv-target='pagination-container-widget-question']",
				},

				"answer" : {
					"container-widget" : "[data-bv-target='pagination-container-widget-answer']",
				},

				// TODO: Questions & Answers
			},

			/********** product catalog **********/

			"product" : {

				"universal" : {
					"container-widget" : "[data-bv-target='product-container-widget-universal']", // entire review widget
					"container-group" : "[data-bv-target='product-container-group-universal']", // entire review widget
					"container-individual" : "[data-bv-target='product-container-individual-universal']",
					"title" : "[data-bv-target='product-container-title-universal']",
					"body" : "[data-bv-target='product-container-body-universal']",
					"photo-individual" : "[data-bv-target='product-container-photo-universal']",
				},
			},

			/********** submission **********/

			"submission" : {

				"universal" : {
					"container-widget" : "[data-bv-target='submission-container-widget-universal']",
					"container-form" : "[data-bv-target='submission-container-form-universal']",
					"container-preview" : "[data-bv-target='submission-container-preview-universal']",
					"container-individual" : "[data-bv-target='submission-container-individual-universal']",
					"container-thankyou" : "[data-bv-target='submission-container-thankyou-universal']",
					"container-error" : "[data-bv-target='submission-container-error-universal']",
					"nickname" : "[data-bv-target='submission-user-nickname-universal']",
					"email" : "[data-bv-target='submission-user-email-universal']",
					"location" : "[data-bv-target='submission-user-location-universal']",
					"userid" : "[data-bv-target='submission-user-id-universal']",
					"photo-group" : "[data-bv-target='submission-media-photo-universal']",
					"photo-individual" : "[data-bv-target='submission-file-individual-universal']",
					"photo-caption" : "[data-bv-target='submission-media-photo-caption-universal']",
					"photo-url" : "[data-bv-target='submission-media-photo-url-universal']",
					"photo-preview" : "[data-bv-target='submission-media-photo-preview-universal']",
					"video" : "[data-bv-target='submission-media-video-universal']",
					"video-caption" : "[data-bv-target='submission-media-video-caption-universal']",
					"additionalfield-group" : "[data-bv-target='submission-ugc-additionalfield-group-universal']",
					"additionalfield-individual" : "[data-bv-target='submission-ugc-additionalfield-individual-universal']",
					"cdv-group" : "[data-bv-target='submission-user-cdv-group-universal']",
					"cdv-individual" : "[data-bv-target='submission-user-cdv-individual-universal']",
					"tag-group" : "[data-bv-target='submission-ugc-tag-group-universal']",
					"tag-individual" : "[data-bv-target='submission-ugc-tag-individual-universal']",
					"termsandconditions" : "[data-bv-target='submission-checkbox-termsandconditions-universal']",
					"alert-email-commented" : "[data-bv-target='submission-checkbox-alert-email-commented-universal']",
					"alert-email-published" : "[data-bv-target='submission-checkbox-alert-email-published-universal']",
					"rating-overall" : "[data-bv-target='submission-ugc-rating-overall-universal']",
					"rating-secondary-group" : "[data-bv-target='submission-ugc-rating-secondary-group-universal']",
					"rating-secondary-individual" : "[data-bv-target='submission-ugc-rating-secondary-individual-universal']",
					"recommended" : "[data-bv-target='submission-ugc-recommended-universal']",
					"title" : "[data-bv-target='submission-ugc-title-universal']",
					"body" : "[data-bv-target='submission-ugc-body-universal']",
				},

				// TODO: Questions & Answers, any needed to be added?
			},

			/********** general display items **********/

			"ugc" : {
				
				"universal" : {
					"container-quicktake" : "[data-bv-target='ugc-container-quicktake-universal']", // quick take module
					"container-summary-primary" : "[data-bv-target='ugc-container-summary-primary-universal']", // primary summary module
					"container-widget" : "[data-bv-target='ugc-container-widget-universal']", // entire ugc widget
					"container-group" : "[data-bv-target='ugc-container-group-universal']", // ugc group
					"container-individual" : "[data-bv-target='ugc-container-individual-universal']", // ugc individual item
					"recommended" : "[data-bv-target='ugc-recommended-universal']",
					"title" : "[data-bv-target='ugc-title-universal']",
					"body" : "[data-bv-target='ugc-body-universal']",
					"date" : "[data-bv-target='ugc-date-universal']",
					"nickname" : "[data-bv-target='ugc-nickname-universal']",
					"location" : "[data-bv-target='ugc-location-universal']",
					"tag-group" : "[data-bv-target='ugc-tag-group-universal']", // tag individual group module
					"tag-individual" : "[data-bv-target='ugc-tag-individual-universal']", // tag individual input module
					"cdv-group" : "[data-bv-target='ugc-cdv-group-universal']", // cdv individual module
					"cdv-individual" : "[data-bv-target='ugc-cdv-individual-universal']", // cdv individual module
					"additionalfield-group" : "[data-bv-target='ugc-additionalfield-group-universal']", // additional field individual module
					"additionalfield-individual" : "[data-bv-target='ugc-additionalfield-individual-universal']", // additional field individual module
					"photo-group" : "[data-bv-target='ugc-photo-group-universal']",
					"photo-individual" : "[data-bv-target='ugc-photo-individual-universal']",
					"video-group" : "[data-bv-target='ugc-video-group-universal']",
					"video-individual" : "[data-bv-target='ugc-video-individual-universal']",

					/* widget search */
					"container-tagcloud-widget" : "[data-bv-target='ugc-container-tagcloud-widget-universal']", // tag cloud widget
					"container-tagcloud-group-widget" : "[data-bv-target='ugc-container-tagcloud-group-universal']", // tag cloud item group
					"container-tagcloud-individual-widget" : "[data-bv-target='ugc-container-tagcloud-individual-universal']", // tag cloud item individual
				},

				"review" : {
					"container-quicktake" : "[data-bv-target='ugc-container-quicktake-review']", // quick take module
					"container-summary-primary" : "[data-bv-target='ugc-container-summary-primary-review']", // primary summary module
					"container-widget" : "[data-bv-target='ugc-container-widget-review']", // entire review widget
					"container-group" : "[data-bv-target='ugc-container-group-review']",
					"container-individual" : "[data-bv-target='ugc-container-individual-review']",
					"rating-overall" : "[data-bv-target='ugc-rating-overall-review']", // overall rating module
					"rating-secondary-individual" : "[data-bv-target='ugc-rating-secondary-group-review']", // individual secondary rating module

					/* widget search */
					"container-featured-widget" : "[data-bv-target='ugc-container-featured-widget-review']", // most helpful high rating review widget
					"container-helpful-high-widget" : "[data-bv-target='ugc-container-helpful-high-widget-review']", // most helpful high rating review widget
					"container-helpful-low-widget" : "[data-bv-target='ugc-container-helpful-low-widget-review']", // most helpful low rating review widget

				},

				"review-comment" : {
					"container-widget" : "[data-bv-target='ugc-container-widget-review-comment']", // entire review widget
					"container-group" : "[data-bv-target='ugc-container-group-review-comment']",
					"container-individual" : "[data-bv-target='ugc-container-individual-review-comment']",
				},

				// TODO: Questions & Answers

				"question" : {
					"container-summary-primary" : "[data-bv-target='ugc-container-summary-primary-question']", // primary summary module
					"container-widget" : "[data-bv-target='ugc-container-widget-question']", // entire question widget
					"container-group" : "[data-bv-target='ugc-container-group-question']", // TODO: what is this, remove it?
					"container-individual" : "[data-bv-target='ugc-container-individual-question']",
				},

				"answer" : {
					"container-widget" : "[data-bv-target='ugc-container-widget-answer']", // entire answer widget
					"container-group" : "[data-bv-target='ugc-container-group-answer']",
					"container-individual" : "[data-bv-target='ugc-container-individual-answer']",
				},
			},
		},

		objectVariables : {
			"input" : {
				"universal" : "textarea, input",
				"text" : "input[type='text']",
				"textarea" : "textarea",
				"radio" : "input[type='radio']",
				"checkbox" : "input[type='checkbox']",
				"select" : "select",
				"option" : "option",
				"file" : "input[type='file']",
			},
			"input-label" : {
				"universal" : "[data-bv-content=\"['input-label']\"]",
				"required" : "[data-bv-content=\"['input-label']\"][data-required='true']",
			},
			"container" : {
				"review" : ".BVReviewContainer",
				"button" : "[data-bv-container='button']",
				"character-counter" : "[data-bv-container='character-counter']",
				"photo-upload" : "[data-bv-container='photo-upload']",
				"toggle-review-comment" : "[data-bv-container='toggle-review-comment']",
				"rating-star" : "[data-bv-container='rating-star']",
				"rating-star-filled" : "[data-bv-container='rating-star-filled']",
				"rating-star-image-filled" : "[data-bv-container='rating-star-image-filled']",
				"rating-star-unfilled" : "[data-bv-container='rating-star-unfilled']",
				"rating-star-image-unfilled" : "[data-bv-container='rating-star-image-unfilled']",
				"rating-star-text" : "[data-bv-container='rating-star-text']",
			},

			// TODO: Questions & Answers, any need to be added>
		},

	},

});