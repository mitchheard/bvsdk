$bvsdk.extend(true, bvsdk, {

	controllers : {

		sorting : {

			loadSortDropdown : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["input"]["universal"]["select"],
					"viewContainer":bvsdk.models.templates["input"]["universal"]["select"],
					"loadOrder":"",
					"productId":"",
					"viewReloadOptions":{
						"model":"",
						"modelSettings":"",
						"controller":"",
						"controllerSettings":"",
					},
				}, options);
				// set content
				var inputRequired = false; // required boolean
				var inputOptions = settings["loadOrder"]; // options to be loaded in the dropdown
				var bvContent = {};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add widget template
				$container.append($template);
				// load select options
				if (inputOptions != undefined) {
					$bvsdk.each(inputOptions, function(key, value) {
						// add selected state
						if (settings["viewReloadOptions"]["controllerSettings"]["modelLocalDefaultSettings"]["Parameters"]["sort"][value["SortParameter"]] == value["Value"]) {
							this["Selected"] = true;
						}
						// load sort option
						bvsdk.controllers.sorting.loadSortSelectOptionsInput (this, {
							"parentContainer":$template,
						});
					});
				}
				// sort option functionality
				if (!$bvsdk($template).data("disabled")) {
					$bvsdk($template).change(function(){
						// container info to refresh
						var refreshContainer = $bvsdk(settings["viewReloadOptions"]["controllerSettings"]["parentContainer"]).find(settings["viewReloadOptions"]["controllerSettings"]["targetContainer"]).andSelf().filter(settings["viewReloadOptions"]["controllerSettings"]["targetContainer"]);
						var selected = $bvsdk(this.options[this.selectedIndex]).attr("data-sort-parameter");
						var selectedValue = this.options[this.selectedIndex].value;
						// check to make sure selected option has a sorting parameter and value
						if (selected && selectedValue) {
							// load new content based off of sorting selection and current settings
							// update parameters for new api call
							// reset and add selected sort
							settings["viewReloadOptions"]["modelSettings"]["Parameters"]["sort"] = {};
							settings["viewReloadOptions"]["modelSettings"]["Parameters"]["sort"][selected] = selectedValue;
							// reset offset to start from the beginning - 
							settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = 0;
							// make new api call
							settings["viewReloadOptions"]["model"] (
								// product id
								settings["productId"],
								// container to load
								refreshContainer,
								// controller callback
								function(content, modelLocalDefaultSettings) {
									// update model settings to represent new data (needed for selcted/disabled states for filters, sorting, and pagination)
									settings["viewReloadOptions"]["controllerSettings"]["modelLocalDefaultSettings"]["Parameters"] = modelLocalDefaultSettings;
									// callback function
									settings["viewReloadOptions"]["controller"](content, settings["viewReloadOptions"]["controllerSettings"]);

									/***** magpie start ****/
									var startMs = // <-- time when the user initiated the sort
									bvsdk.controllers.magpie.trackFeature (content, {
										"type" : "Used",
										"name" : "sort",
								        "detail1" : selected,
								        "detail2" : selectedValue,
										"campaignId" : "",
										"component" : "",
										"location" : "",
										"elapsedMs" : new Date().getTime() - startMs, // <-- conveys the response time of the 'sort' feature
										"productId" : settings["productId"],
										"categoryId":(content["Includes"]["Products"]) ? (content["Includes"]["Products"]["123"]) ? content["Includes"]["Products"][this["ProductId"]]["CategoryId"] : content["Includes"]["Products"][this["ProductId"]] : "2" || "3",
										"rootCategoryId":"",
										"brand":(content["Includes"]["Products"]) ? (content["Includes"]["Products"][this["ProductId"]]) ? content["Includes"]["Products"][this["ProductId"]]["Brand"]["Name"] : null : null || null,
										"bvProduct" : "RatingsAndReviews",
									});
									/***** magpie end *****/

								},
								// api call parameters
								settings["viewReloadOptions"]["modelSettings"]
							);
						}
					});
				};

				bvsdk.controllers.magpie.trackFeature (content, {
					"type" : "Shown",
					"name" : "sort",
					"campaignId" : "",
					"component" : "",
					"location" : "",
				});
			},

			loadSortSelectOptionsInput : function (content, options) {
				// content expected ["Data"]["Fields"][<contextdatavalue_Value>]["Options"]
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["input"]["universal"]["option"],
					"viewContainer":bvsdk.models.templates["input"]["universal"]["option"],
					"inputSettings":{
						"inputValue":content["Value"],
						"inputSelected":content["Selected"],
						"inputLabel":content["Label"],
					},
				}, options);
				// set content
				var inputValue = settings["inputSettings"]["inputValue"]; // option value
				var inputSelected = settings["inputSettings"]["inputSelected"]; // option selected boolean
				var sortParameter = content["SortParameter"]; // option selected boolean
				var bvContent = {
					"input-label" : settings["inputSettings"]["inputLabel"],
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add widget template
				$container.append($template);
				// set input attributes
				$bvsdk($template).find(bvsdk.models.objectVariables["input"]["option"]).andSelf().filter(bvsdk.models.objectVariables["input"]["option"]).attr({
					"label":bvContent["input-label"],
					"value":inputValue,
					"selected":inputSelected,
					"data-sort-parameter":sortParameter,
				});
			},

		},

	},

});