$bvsdk.extend(true, bvsdk, {

	models : {

		templates : {

			/********** badges **********/

			"badge" : {

				"universal" : {
					"container-individual" : "#bvtemplate-badge-individual-universal",
					"top1Contributor" : "#bvtemplate-badge-1-universal",
					"top10Contributor" : "#bvtemplate-badge-10-universal",
					"top25Contributor" : "#bvtemplate-badge-25-universal",
					"top50Contributor" : "#bvtemplate-badge-50-universal",
					"top100Contributor" : "#bvtemplate-badge-100-universal",
					"top250Contributor" : "#bvtemplate-badge-250-universal",
					"top500Contributor" : "#bvtemplate-badge-500-universal",
					"top1000Contributor" : "#bvtemplate-badge-1000-universal",
				    "expert" : "#bvtemplate-badge-expert-universal",
					"featured" : "#bvtemplate-badge-featured-universal",
				    "socialAnsweringSubscriber" : "#bvtemplate-badge-social-answering-subscriber-universal",
					"staff" : "#bvtemplate-badge-staff-universal",
					"verifiedPurchaser" : "#bvtemplate-badge-verified-purchaser-universal",
					"default" : "#bvtemplate-badge-default-universal",
				},
			},

			/********** buttons **********/

			"button" : {

				"universal" : {
					"primary" : "#bvtemplate-button-primary-universal",
					"secondary" : "#bvtemplate-button-secondary-universal",
					"tertiary" : "#bvtemplate-button-tertiary-universal",
					"close" : "#bvtemplate-button-close-universal",
					"remove" : "#bvtemplate-button-remove-universal",
					"text" : "#bvtemplate-button-text-universal",
					"generic" : "#bvtemplate-button-universal",
				},

				"review" : {
					"primary" : "#bvtemplate-button-primary-review",
					"secondary" : "#bvtemplate-button-secondary-review",
					"tertiary" : "#bvtemplate-button-tertiary-review",
					"close" : "#bvtemplate-button-close-review",
					"remove" : "#bvtemplate-button-remove-review",
					"text" : "#bvtemplate-button-text-review",
					"generic" : "#bvtemplate-button-review",
				},

				"review-comment" : {
					"primary" : "#bvtemplate-button-primary-review-comment",
					"secondary" : "#bvtemplate-button-secondary-review-comment",
					"tertiary" : "#bvtemplate-button-tertiary-review-comment",
					"close" : "#bvtemplate-button-close-review-comment",
					"remove" : "#bvtemplate-button-remove-review-comment",
					"text" : "#bvtemplate-button-text-review-comment",
					"generic" : "#bvtemplate-button-review-comment",
				},
			},

			/********** feedback and inappropriate **********/

			"feedback" : {

				"universal" : {
					"container-widget" : "#bvtemplate-feedback-widget-universal", // entire review widget
					"container-form" : "#bvtemplate-feedback-report-inappropriate-form-universal", // entire review widget
					"container-message" : "#bvtemplate-feedback-message-status-container-universal", // entire review widget
					"count" : "#bvtemplate-feedback-count-universal", // entire review widget
					"voting" : "#bvtemplate-feedback-voting-universal", // entire review widget
					"inappropriate" : "#bvtemplate-feedback-report-inappropriate-universal", // entire review widget
					"message" : "#bvtemplate-feedback-message-status-universal", // entire review widget
				},
			},

			/********** filters **********/

			"filter" : {

				"universal" : {
					"container-group" : "#bvtemplate-filter-group-universal",
					"container-individual" : "#bvtemplate-filter-individual-universal",
					"container-individual-histogram" : "#bvtemplate-filter-individual-histogram-universal",
				},
			},

			/********** headers - page, section **********/

			"header" : {

				"universal" : {
					"page" : "#bvtemplate-header-page-universal",
					"section" : "#bvtemplate-header-section-universal",
				},

				"review" : {
					"page" : "#bvtemplate-header-page-review",
					"section" : "#bvtemplate-header-section-review",
				},

				"review-comment" : {
					"page" : "#bvtemplate-header-page-review-comment",
					"section" : "#bvtemplate-header-section-review-comment",
				},


				"question": {
					"page" : "#bvtemplate-header-page-question",
					"section" : "#bvtemplate-header-section-question",
				},

				"answer": {
					"page" : "#bvtemplate-header-page-answer",
					"section" : "#bvtemplate-header-section-answer",
				},
			},

			/********** histograms **********/

			"histogram" : {

				"universal" : {
					"container-widget" : "#bvtemplate-histogram-widget-universal",
					"container-individual" : "#bvtemplate-histogram-individual-universal",
				},
			},

			/********** submssion field form inputs **********/

			"input" : {

				"universal" : {
					"text" : "#bvtemplate-input-text-universal",
					"text-hidden" : "#bvtemplate-input-text-hidden-universal",
					"textarea" : "#bvtemplate-input-textarea-universal",
					"radio-individual" : "#bvtemplate-input-radio-universal",
					"checkbox-individual" : "#bvtemplate-input-checkbox-universal",
					"select" : "#bvtemplate-input-select-universal",
					"option" : "#bvtemplate-input-select-option-universal",
					"file" : "#bvtemplate-input-file-universal",
					"file-photo" : "#bvtemplate-input-file-photo-universal",
				},

				"review" : {
					"radio-rating-overall" : "#bvtemplate-input-radio-rating-overall-universal",
					"radio-rating-secondary" : "#bvtemplate-input-radio-rating-secondary-universal",
				},

				// TODO: Question/Answer Submission
			},

			/********** overlays **********/

			"overlay" : {

				"universal" : {
					"default" : "#bvtemplate-overlay-loading-default-universal",
				},
			},

			/********** pagination **********/

			"pagination" : {

				"universal" : {
					"container-group" : "#bvtemplate-pagination-widget-universal",
					"container-individual" : "#bvtemplate-pagination-button-universal",
					"container-individual-selected" : "#bvtemplate-pagination-button-selected-universal",
				},
			},

			/********** product catalog **********/

			"product" : {

				"universal" : {
					"container-widget" : "#bvtemplate-product-widget-universal", // entire review widget
					"container-widget-nocontent" : "", // entire review widget
					"container-individual" : "#bvtemplate-product-individual-universal",
					"title" : "#bvtemplate-product-title-universal",
					"body" : "#bvtemplate-product-body-universal",
					"photo-individual" : "#bvtemplate-product-photo-universal",
				},
			},

			/********** submission containers and fields **********/

			// TODO: Question/Answer

			"submission" : {

				"universal" : {
					"container-widget" : "#bvtemplate-submission-widget-universal",
					"container-form" : "#bvtemplate-submission-form-universal",
					"container-preview" : "#bvtemplate-submission-form-preview-universal",
					"container-thankyou" : "#bvtemplate-submission-form-thank-you-universal",
					"container-individual" : "[data-bv-target='submission-container-individual-universal']",
					// "container-error" : "[data-bv-target='submission-container-error-universal']",
					"rating-secondary-group" : "#bvtemplate-submission-rating-secondary-group-universal", // secondary rating module
					"rating-secondary-individual" : "#bvtemplate-submission-rating-secondary-individual-universal", // individual secondary rating module
					"rating-overall" : "#bvtemplate-submission-radio-group-universal", // overall rating module
					"tag-group" : "#bvtemplate-submission-tag-group-universal", // tag individual group module
					"tag-individual" : "#bvtemplate-submission-tag-individual-universal", // tag individual input module
					"cdv-group" : "#bvtemplate-submission-cdv-individual-universal",
					"cdv-individual" : "#bvtemplate-submission-individual-universal", // cdv individual module
					"additionalfield-group" : "#bvtemplate-submission-additionalfield-individual-universal",
					"additionalfield-individual" : "#bvtemplate-submission-individual-universal", // additional field individual module
					"recommended" : "#bvtemplate-submission-radio-group-universal",
					"title" : "#bvtemplate-submission-individual-universal",
					"body" : "#bvtemplate-submission-individual-universal",
					"body-charcounter" : "#bvtemplate-submission-individual-charcounter-universal",
					"nickname" : "#bvtemplate-submission-individual-universal",
					"email" : "#bvtemplate-submission-individual-universal",
					"location" : "#bvtemplate-submission-individual-universal",
					"userid" : "#bvtemplate-submission-individual-universal",
					"photo-group" : "#bvtemplate-submission-file-group-universal",
					"photo-individual" : "#bvtemplate-submission-file-individual-universal",
					"photo-caption" : "#bvtemplate-submission-individual-universal",
					"photo-url" : "#bvtemplate-submission-individual-universal",
					"photo-preview" : "#bvtemplate-submission-upload-preview-universal",
					"video" : "#bvtemplate-submission-individual-universal",
					"video-caption" : "#bvtemplate-submission-individual-universal",
					"termsandconditions" : "#bvtemplate-submission-termsconditions-universal",
					"alert-email-commented" : "#bvtemplate-submission-emailalert-commented-universal",
					"alert-email-published" : "#bvtemplate-submission-emailalert-published-universal",

					"input-individual" : "#bvtemplate-submission-individual-universal",
					"input-individual-charcounter" : "#bvtemplate-submission-individual-charcounter-universal",
					"input-required" : "#bvtemplate-input-required-universal",
				},

				"review" : {
					"container-widget" : "#bvtemplate-submission-widget-review",
					"container-form" : "#bvtemplate-submission-form-review",
					"container-preview" : "#bvtemplate-submission-form-preview-review",
					"container-thankyou" : "#bvtemplate-submission-form-thank-you-review",
					"container-individual" : "#bvtemplate-individual-review",
				},

				"review-comment" : {
					"container-widget" : "#bvtemplate-submission-widget-review-comment",
					"container-form" : "#bvtemplate-submission-form-review-comment",
					"container-preview" : "#bvtemplate-submission-form-preview-review-comment",
					"container-thankyou" : "#bvtemplate-submission-form-thank-you-review-comment",
					"container-individual" : "#bvtemplate-individual-review-comment",
				},
			},

			/********** general display items **********/

			"ugc" : { // TODO: what is this universal used for?
				
				"universal" : {
					"container-quicktake" : "#bvtemplate-quick-take-universal", // quick take module
					"container-quicktake-nocontent" : "#bvtemplate-quick-take-nocontent-universal", // quick take module - no content
					"container-summary-primary" : "#bvtemplate-summary-primary-universal", // primary summary module
					"container-summary-primary-nocontent" : "#bvtemplate-summary-primary-nocontent-universal", // primary summary module - no content
					"container-widget" : "#bvtemplate-widget-universal", // entire review widget
					"container-widget-nocontent" : "#bvtemplate-widget-nocontent-universal", // entire review widget
					"container-individual" : "#bvtemplate-individual-universal",
					"recommended-average" : "#bvtemplate-recommended-average-universal",
					"recommended-yes" : "#bvtemplate-recommended-yes-universal",
					"recommended-no" : "#bvtemplate-recommended-no-universal",
					"title" : "#bvtemplate-title-universal",
					"body" : "#bvtemplate-body-universal",
					"date" : "#bvtemplate-date-universal",
					"nickname" : "#bvtemplate-nickname-universal",
					"location" : "#bvtemplate-location-universal",
					"tag-group" : "#bvtemplate-tag-group-universal", // tag individual group module
					"tag-individual" : "#bvtemplate-tag-individual-universal", // tag individual input module
					"tag-individual-last" : "#bvtemplate-tag-individual-last-universal", // tag individual input module
					"cdv-individual" : "#bvtemplate-cdv-individual-universal", // cdv individual module
					"additionalfield-individual" : "#bvtemplate-additionalfield-individual-universal", // additional field individual module
					"photo-individual" : "#bvtemplate-photo-thumbnail-individual-universal",
					"video-individual" : "#bvtemplate-video-thumbnail-individual-universal",
				},

				"review" : {
					"container-quicktake" : "#bvtemplate-quick-take-review", // quick take module
					"container-quicktake-nocontent" : "#bvtemplate-quick-take-nocontent-review", // quick take module - no reviews
					"container-summary-primary" : "#bvtemplate-summary-primary-review", // primary summary module
					"container-summary-primary-nocontent" : "#bvtemplate-summary-primary-nocontent-review", // primary summary module - no reviews
					"container-widget" : "#bvtemplate-widget-review", // entire review widget
					"container-widget-nocontent" : "#bvtemplate-widget-nocontent-review", // entire review widget
					"container-individual" : "#bvtemplate-individual-review",
					"rating-overall" : "#bvtemplate-rating-overall-review", // overall rating module
					"rating-secondary-individual" : "#bvtemplate-rating-secondary-review", // individual secondary rating module
					"recommended-average" : "#bvtemplate-recommended-average-review",
					"recommended-yes" : "#bvtemplate-recommended-yes-review",
					"recommended-no" : "#bvtemplate-recommended-no-review",
					"title" : "#bvtemplate-title-review",
					"body" : "#bvtemplate-body-review",
					"date" : "#bvtemplate-date-review",
					"nickname" : "#bvtemplate-nickname-review",
					"location" : "#bvtemplate-location-review",
					"tag-group" : "#bvtemplate-tag-group-review", // tag individual group module
					"tag-individual" : "#bvtemplate-tag-individual-review", // tag individual input module
					"tag-individual-last" : "#bvtemplate-tag-individual-last-review", // tag individual input module
					"cdv-individual" : "#bvtemplate-cdv-individual-review", // cdv individual module
					"additionalfield-individual" : "#bvtemplate-additionalfield-individual-review", // additional field individual module
					"photo-individual" : "#bvtemplate-photo-thumbnail-individual-review",
					"video-individual" : "#bvtemplate-video-thumbnail-individual-review",
				},

				"review-comment" : {
					"container-quicktake" : "#bvtemplate-quick-take-review-comment", // quick take module
					"container-quicktake-nocontent" : "#bvtemplate-quick-take-nocontent-review-comment", // quick take module - no reviews
					"container-summary-primary" : "#bvtemplate-summary-primary-review-comment", // primary summary module
					"container-summary-primary-nocontent" : "#bvtemplate-summary-primary-nocontent-review-comment", // primary summary module - no reviews
					"container-widget" : "#bvtemplate-widget-review-comment", // entire review widget
					"container-widget-nocontent" : "#bvtemplate-widget-nocontent-review-comment", // entire review widget
					"container-individual" : "#bvtemplate-individual-review-comment",
					"title" : "#bvtemplate-title-review-comment",
					"body" : "#bvtemplate-body-review-comment",
					"date" : "#bvtemplate-date-review-comment",
					"nickname" : "#bvtemplate-nickname-review-comment",
					"location" : "#bvtemplate-location-review-comment",
					"cdv-individual" : "#bvtemplate-cdv-individual-review-comment", // cdv individual module
					"photo-individual" : "#bvtemplate-photo-thumbnail-individual-review-comment",
					"video-individual" : "#bvtemplate-video-thumbnail-individual-review-comment",
				},

				"question": {
					"container-summary-primary" : "#bvtemplate-summary-primary-question", // primary summary module
					"container-summary-primary-nocontent" : "#bvtemplate-summary-primary-nocontent-question", // primary summary module - no questions
					"container-widget" : "#bvtemplate-widget-question", // entire question widget
					"container-widget-nocontent" : "#bvtemplate-widget-nocontent-question", // entire question widget
					"container-individual" : "#bvtemplate-individual-question",
					"title" : "#bvtemplate-title-question",
					"body" : "#bvtemplate-body-question",
					"date" : "#bvtemplate-date-question",
					"nickname" : "#bvtemplate-nickname-question",
					"location" : "#bvtemplate-location-question",
					"photo-individual" : "#bvtemplate-photo-thumbnail-individual-question",
					"video-individual" : "#bvtemplate-video-thumbnail-individual-question",
				},

				"answer" : {
					"container-summary-primary" : "#bvtemplate-summary-primary-answer", // primary summary module
					"container-summary-primary-nocontent" : "#bvtemplate-summary-primary-nocontent-answer", // primary summary module - no answers
					"container-widget" : "#bvtemplate-widget-answer", // entire answer widget
					"container-widget-nocontent" : "#bvtemplate-widget-nocontent-answer", // entire answer widget
					"container-individual" : "#bvtemplate-individual-answer",
					"title" : "#bvtemplate-title-answer",
					"body" : "#bvtemplate-body-answer",
					"date" : "#bvtemplate-date-answer",
					"nickname" : "#bvtemplate-nickname-answer",
					"location" : "#bvtemplate-location-answer",
					"photo-individual" : "#bvtemplate-photo-thumbnail-individual-answer",
					"video-individual" : "#bvtemplate-video-thumbnail-individual-answer",
				},

			},
		},

	},

});

