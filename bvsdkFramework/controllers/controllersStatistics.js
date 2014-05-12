$bvsdk.extend(true, bvsdk, {

	controllers : {

		statistics : {

			/**************************************** INLINE RATINGS CONTROLLERS ****************************************/

			initInlineRatingWidget : function () {
				bvsdk.models.statistics.getStats (bvConfigSDK["productId"], bvsdk.models.targets["ugc"]["review"]["container-widget"], function(content) {
					console.log("stats", content);
				});
			},

		},

	},

});