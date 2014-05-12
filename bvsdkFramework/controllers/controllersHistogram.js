$bvsdk.extend(true, bvsdk, {

	controllers : {

		histogram : {

			loadHistogramOverallRating : function (content, options) {
				var defaultLoadOrder = content["RatingDistribution"]; // review stats
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["histogram"]["universal"]["container-widget"],
					"viewContainer":bvsdk.models.templates["histogram"]["universal"]["container-widget"],
					"loadOrder":defaultLoadOrder,
				}, options);
				// set content
				// create ratings distribution to match other distribution objects from json repsonse
				var ratingsDistribution = {
					"Id":"rating",
					"Label":"Star rating...",
					"TotalResults":content["TotalReviewCount"],
					"Values":[],
				};
				if (settings["loadOrder"] != undefined) {
					$bvsdk.each(settings["loadOrder"], function() {
						var obj = new Object;
						obj["Count"] = this["Count"];
						obj["Value"] = this["RatingValue"];
						obj["Label"] = bvsdk.models.properties["filter"]["universal"]["rating-overall-" + this["RatingValue"] + "-label"];
						ratingsDistribution["Values"].push(obj);
					});
				}
				var bvContent = {
					"histogram-id" : ratingsDistribution["Id"],
					"histogram-label" : ratingsDistribution["Label"],
					"histogram-values" : ratingsDistribution["Values"],
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);

				// add template
				$container.append($template);
				// load histogram
				bvsdk.controllers.histogram.loadIndividualHistogram (ratingsDistribution, {
					"parentContainer":$template,
					"loadOrder":ratingsDistribution["Values"].reverse(),
				});
			},

			loadIndividualHistogram : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["histogram"]["universal"]["container-group"],
					"viewContainer":bvsdk.models.templates["histogram"]["universal"]["container-individual"],
					"loadOrder":"",
				}, options);
				if (settings["loadOrder"] != undefined) {
					$bvsdk.each(settings["loadOrder"], function(key) {
						// set content
						var bvContent = {
							"histogram-count" : content["Values"][key]["Count"],
							"histogram-value" : content["Values"][key]["Label"] || content["Values"][key]["Value"],
						};
						// set container & template
						var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
						var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
						// add template
						$container.append($template);
						// set histogram
						var histogramWidth = (content["Values"][key]["Count"]/content["TotalResults"]) * 100;
						$bvsdk($template).find(bvsdk.models.targets["histogram"]["universal"]["container-individual"]).andSelf().filter(bvsdk.models.targets["histogram"]["universal"]["container-individual"]).css({
							"width":histogramWidth+"%",
						});
					});
				}
			},

		},

	},

});