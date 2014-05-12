$bvsdk.extend(true, bvsdk, {

	models : {

		badges : {

			userOrder : {
				"top1Contributor":bvsdk.models.templates["badge"]["universal"]["top1Contributor"],
				"top10Contributor":bvsdk.models.templates["badge"]["universal"]["top10Contributor"],
				"top25Contributor":bvsdk.models.templates["badge"]["universal"]["top25Contributor"],
				"top50Contributor":bvsdk.models.templates["badge"]["universal"]["top50Contributor"],
				"top100Contributor":bvsdk.models.templates["badge"]["universal"]["top100Contributor"],
				"top250Contributor":bvsdk.models.templates["badge"]["universal"]["top250Contributor"],
				"top500Contributor":bvsdk.models.templates["badge"]["universal"]["top500Contributor"],
				"top1000Contributor":bvsdk.models.templates["badge"]["universal"]["top1000Contributor"],
				"Expert":bvsdk.models.templates["badge"]["universal"]["expert"],
				"VerifiedPurchaser":bvsdk.models.templates["badge"]["universal"]["verifiedPurchaser"],
				"SocialAnsweringSubscriber":bvsdk.models.templates["badge"]["universal"]["socialAnsweringSubscriber"],
			},

			contentOrder : {
				"featured":bvsdk.models.templates["badge"]["universal"]["featured"],
			},

			affiliationOrder : {
				"Staff":bvsdk.models.templates["badge"]["universal"]["staff"],
			},

		},

		filters : {

			overallOrder : [
				{"Value":"5"},
				{"Value":"4"},
				{"Value":"3"},
				{"Value":"2"},
				{"Value":"1"},
			],

		},

		sorting : {

			reviewLoadOrder : [
				// blank option to start
				{

					"SortParameter":"",
					"Label": bvsdk.models.properties["sort"]["review"]["default"],
					"Selected": false,
					"Value": "",
				},
				// lowest overall rating
				{
					"SortParameter":"rating",
					"Label": bvsdk.models.properties["sort"]["review"]["rating-asc"],
					"Selected": false,
					"Value": "asc",
				},
				// highest overall rating
				{
					"SortParameter":"rating",
					"Label": bvsdk.models.properties["sort"]["review"]["rating-desc"],
					"Selected": false,
					"Value": "desc",
				},
				// oldest reviews
				{
					"SortParameter":"submissiontime",
					"Label": bvsdk.models.properties["sort"]["review"]["submissiontime-asc"],
					"Selected": false,
					"Value": "asc",
				},
				// newest reviews
				{
					"SortParameter":"submissiontime",
					"Label": bvsdk.models.properties["sort"]["review"]["submissiontime-desc"],
					"Selected": false,
					"Value": "desc",
				},
				// least helpful reviews reviews
				{
					"SortParameter":"totalnegativefeedbackcount",
					"Label": bvsdk.models.properties["sort"]["review"]["totalnegativefeedbackcount-desc"],
					"Selected": false,
					"Value": "desc",
				},
				// most helpful reviews reviews
				{
					"SortParameter":"totalpositivefeedbackcount",
					"Label": bvsdk.models.properties["sort"]["review"]["totalpositivefeedbackcount-desc"],
					"Selected": false,
					"Value": "desc",
				},
				// featured reviews first
				{
					"SortParameter":"isfeatured",
					"Label": bvsdk.models.properties["sort"]["review"]["isfeatured-desc"],
					"Selected": false,
					"Value": "desc",
				},
				// photo reviews first
				{
					"SortParameter":"hasphotos",
					"Label": bvsdk.models.properties["sort"]["review"]["hasphotos-desc"],
					"Selected": false,
					"Value": "desc",
				},
				// video reviews first
				{
					"SortParameter":"hasvideos",
					"Label": bvsdk.models.properties["sort"]["review"]["hasvideos-desc"],
					"Selected": false,
					"Value": "desc",
				},
			],

			defaultQuestionSortLoadOrder : [],

			defaultStorySortLoadOrder : [],

		},

	},

});