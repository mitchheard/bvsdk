$bvsdk.extend(true, bvsdk, {

	controllers : {

		filters : {

			loadFiltersOverallRating : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["filter"]["universal"]["container-group"],
					"viewContainer":bvsdk.models.templates["filter"]["universal"]["container-group"],
					"loadOrder":bvsdk.models.filters.overallOrder,
					"productId":"",
					"modelLocalDefaultSettings":"",
					"filterSettings":{
						"displayCount":5,
						"multipleSelect":false,
						"popinBool":false,
						"onClickBool":false,
						"showCountBool":true,
					},
					"viewReloadOptions":{
						"model":"",
						"modelSettings":"",
						"controller":"",
						"controllerSettings":"",
					},
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
					$bvsdk.each(settings["loadOrder"], function(index) {
						var filterValue = this["Value"];
						var filter = $bvsdk.grep(content["RatingDistribution"], function(filter) {
							return filter.RatingValue == filterValue;
						});
						if (filter.length > 0) {
							var obj = new Object;
							obj["Count"] = filter[0]["Count"];
							obj["Value"] = filter[0]["RatingValue"];
							obj["Label"] = bvsdk.models.properties["filter"]["universal"]["rating-overall-" + filter[0]["RatingValue"] + "-label"];
							ratingsDistribution["Values"].push(obj);
						} else {
							var obj = new Object;
							obj["Count"] = 0;
							obj["Value"] = filterValue;
							obj["Label"] = bvsdk.models.properties["filter"]["universal"]["rating-overall-" + filterValue + "-label"];
							ratingsDistribution["Values"].push(obj);
						}
					});
				}
				var bvContent = {
					"filter-id" : ratingsDistribution["Id"],
					"filter-label" : ratingsDistribution["Label"],
					"filter-values" : ratingsDistribution["Values"],
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
				// load filters
				bvsdk.controllers.filters.loadIndividualFilters (ratingsDistribution, {
					"parentContainer":$template,
					"viewContainer":bvsdk.models.templates["filter"]["universal"]["container-individual-histogram"],
					"loadOrder":ratingsDistribution["Values"],
					"viewReloadOptions":settings["viewReloadOptions"],
					"filterSettings":{
						"showHistogramBool":true,
						"multipleSelect":true,
					},
				});
			},

			loadFiltersSecondaryRatings : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["filter"]["universal"]["container-group"],
					"viewContainer":bvsdk.models.templates["filter"]["universal"]["container-group"],
					"loadOrder":content["SecondaryRatingsAveragesOrder"],
					"productId":"",
					"modelLocalDefaultSettings":"",
					"filterSettings":{
						"displayCount":5,
						"multipleSelect":false,
						"popinBool":false,
						"onClickBool":false,
						"showCountBool":true,
					},
					"viewReloadOptions":{
						"model":"",
						"modelSettings":"",
						"controller":"",
						"controllerSettings":"",
					},
				}, options);
				if (settings["loadOrder"] != undefined) {
					$bvsdk.each (settings["loadOrder"], function(key) {
						// current iteration of loop
						var cur = settings["loadOrder"][key];
						// set content
						// create secondary ratings distribution to match other distribution objects from json repsonse
						var secondaryRatingsDistribution = {
							"Id":"secondaryrating_" + content["SecondaryRatingsAverages"][cur]["Id"],
							"Label":content["SecondaryRatingsAverages"][cur]["Id"],
							"Values":[],
						};
						for (var i = 1; i <= 5; i++) {
							var obj = new Object;
							obj["Count"] = 0;
							obj["Value"] = i;
							obj["Label"] = bvsdk.models.properties["filter"]["universal"]["rating-secondary-" + i + "-label"];
							secondaryRatingsDistribution["Values"].push(obj);
						}
						var bvContent = {
							"filter-id" : secondaryRatingsDistribution["Id"],
							"filter-label" : secondaryRatingsDistribution["Label"],
							"filter-values" : secondaryRatingsDistribution["Values"],
						};
						// set container & template
						var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
						var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
						// add template
						$container.append($template);
						// load filters
						bvsdk.controllers.filters.loadIndividualFilters (secondaryRatingsDistribution, {
							"parentContainer":$template,
							"loadOrder":secondaryRatingsDistribution["Values"],
							"viewReloadOptions":settings["viewReloadOptions"],
						});
					});
				}
			},

			loadFiltersContextDataValues : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["filter"]["universal"]["container-group"],
					"viewContainer":bvsdk.models.templates["filter"]["universal"]["container-group"],
					"loadOrder":content["ContextDataDistributionOrder"],
					"productId":"",
					"modelLocalDefaultSettings":"",
					"filterSettings":{
						"displayCount":5,
						"multipleSelect":true,
						"popinBool":false,
						"onClickBool":false,
						"showCountBool":true,
					},
					"viewReloadOptions":{
						"model":"",
						"modelSettings":"",
						"controller":"",
						"controllerSettings":"",
					},
				}, options);
				if (settings["loadOrder"] != undefined) {
					$bvsdk.each (settings["loadOrder"], function(key) {
						// current iteration of loop
						var cur = settings["loadOrder"][key];
						// set content
						// add prefix to id
						content["ContextDataDistribution"][cur]["Id"] = "contextdatavalue_" + content["ContextDataDistribution"][cur]["Id"];
						var bvContent = {
							"filter-id" : content["ContextDataDistribution"][cur]["Id"],
							"filter-label" : content["ContextDataDistribution"][cur]["Label"],
							"filter-values" : content["ContextDataDistribution"][cur]["Values"],
						};
						// set container & template
						var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
						var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
						// add template
						$container.append($template);
						// load filters
						bvsdk.controllers.filters.loadIndividualFilters (content["ContextDataDistribution"][cur], {
							"parentContainer":$template,
							"loadOrder":content["ContextDataDistribution"][cur]["Values"],
							"viewReloadOptions":settings["viewReloadOptions"],
						});
					});
				}
			},

			loadFiltersAdditionalFields : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["filter"]["universal"]["container-group"],
					"viewContainer":bvsdk.models.templates["filter"]["universal"]["container-group"],
					"loadOrder":content["AdditionalFieldDistributionOrder"],
					"productId":"",
					"modelLocalDefaultSettings":"",
					"filterSettings":{
						"displayCount":5,
						"multipleSelect":true,
						"popinBool":false,
						"onClickBool":false,
						"showCountBool":true,
					},
					"viewReloadOptions":{
						"model":"",
						"modelSettings":"",
						"controller":"",
						"controllerSettings":""
					}
				}, options);
				if (settings["loadOrder"] != undefined) {
					$bvsdk.each (settings["loadOrder"], function(key) {
						// current iteration of loop
						var cur = settings["loadOrder"][key];
						// set content
						// add prefix to id
						content["AdditionalFieldDistribution"][cur]["Id"] = "additionalfield_" + content["AdditionalFieldDistribution"][cur]["Id"];
						var bvContent = {
							"filter-id" : content["AdditionalFieldDistribution"][cur]["Id"],
							"filter-label" : content["AdditionalFieldDistribution"][cur]["Label"],
							"filter-values" : content["AdditionalFieldDistribution"][cur]["Values"],
						};
						// set container & template
						var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
						var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
						// add template
						$container.append($template);
						// load filters
						bvsdk.controllers.filters.loadIndividualFilters (content["AdditionalFieldDistribution"][cur], {
							"parentContainer":$template,
							"loadOrder":content["AdditionalFieldDistribution"][cur]["Values"],
							"viewReloadOptions":settings["viewReloadOptions"]
						});
					});
				}
			},

			loadFiltersTags : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["filter"]["universal"]["container-group"],
					"viewContainer":bvsdk.models.templates["filter"]["universal"]["container-group"],
					"loadOrder":content["TagDistributionOrder"],
					"productId":"",
					"modelLocalDefaultSettings":"",
					"filterSettings":{
						"displayCount":5,
						"multipleSelect":true,
						"popinBool":false,
						"onClickBool":false,
						"showCountBool":true,
					},
					"viewReloadOptions":{
						"model":"",
						"modelSettings":"",
						"controller":"",
						"controllerSettings":"",
					},
				}, options);
				if (settings["loadOrder"] != undefined) {
					$bvsdk.each (settings["loadOrder"], function(key) {
						// current iteration of loop
						var cur = settings["loadOrder"][key];
						// set content
						// add prefix to id
						content["TagDistribution"][cur]["Id"] = "tag_" + content["TagDistribution"][cur]["Id"];
						var bvContent = {
							"filter-id" : content["TagDistribution"][cur]["Id"],
							"filter-label" : content["TagDistribution"][cur]["Label"],
							"filter-values" : content["TagDistribution"][cur]["Values"],
						};
						// set container & template
						var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
						var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
						// add template
						$container.append($template);
						// load filters
						bvsdk.controllers.filters.loadIndividualFilters (content["TagDistribution"][cur], {
							"parentContainer":$template,
							"loadOrder":content["TagDistribution"][cur]["Values"],
							"viewReloadOptions":settings["viewReloadOptions"],
						});
					});
				}
			},

			loadIndividualFilters : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["filter"]["universal"]["container-individual"],
					"viewContainer":bvsdk.models.templates["filter"]["universal"]["container-individual"],
					"loadOrder":"",
					"productId":"",
					"modelLocalDefaultSettings":"",
					"filterSettings":{
						"displayCount":5,
						"filterParameter":true,
						"multipleSelect":true,
						"popinBool":false,
						"onClickBool":false,
						"showCountBool":true,
						"showHistogramBool":false,
					},
					"viewReloadOptions":{
						"model":"",
						"modelSettings":"",
						"controller":"",
						"controllerSettings":"",
					},
				}, options);
				if (settings["loadOrder"] != undefined) {
					$bvsdk.each(settings["loadOrder"], function(key) {
						// set content
						var multipleSelect = settings["filterSettings"]["multipleSelect"];
						var bvContent = {
							"filter-count" : content["Values"][key]["Count"],
							"filter-value" : content["Values"][key]["Label"] || content["Values"][key]["Value"],
						};
						// set container & template
						var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
						var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
						// add template
						$container.append($template);

						// set filter data attributes
						$bvsdk($template).attr({
							"data-filter":settings["filterSettings"]["filterParameter"],
							"data-parameter":content["Id"],
							"data-value":content["Values"][key]["Value"],
							"data-selected":"false",
							"data-disabled":"false",
						});
						// set selected/disabled state data attribute
						// set selected filter
						if ((settings["viewReloadOptions"]["controllerSettings"]["modelLocalDefaultSettings"]["Parameters"]["filter"][content["Id"]] == content["Values"][key]["Value"]) || ($bvsdk.inArray(content["Values"][key]["Value"], settings["viewReloadOptions"]["controllerSettings"]["modelLocalDefaultSettings"]["Parameters"]["filter"][content["Id"]]) > -1)) {
							$bvsdk($template).attr({
								"data-selected":"true",
							}).addClass("BVSelected");
						}
						// set disabled filter
						if (bvContent["filter-count"] == 0) {
							$bvsdk($template).attr({
								"data-disabled":"true",
							}).addClass("BVDisabled");
						}
						// set histogram
						if (settings["filterSettings"]["showHistogramBool"]) {
							var histogramWidth = (bvContent["filter-count"]/content["TotalResults"]) * 100;
							$bvsdk($template).find(bvsdk.models.targets["histogram"]["universal"]["container-individual"]).andSelf().filter(bvsdk.models.targets["histogram"]["universal"]["container-individual"]).css({
								"width":histogramWidth+"%",
							});
						}
						// filter option functionality
						$bvsdk($template).click(function(){

							bvsdk.models.magpie.totalContentDisplayed["review"]["update"]++;

							if ($bvsdk(this).attr("data-disabled") == "false") {
								if ($bvsdk(this).attr("data-selected") == "false") {
									var refreshContainer = $bvsdk(settings["viewReloadOptions"]["controllerSettings"]["parentContainer"]).find(settings["viewReloadOptions"]["controllerSettings"]["targetContainer"]).andSelf().filter(settings["viewReloadOptions"]["controllerSettings"]["targetContainer"]);
									var filterParameter = eval($bvsdk(this).attr("data-filter"));
									var selected = $bvsdk(this).attr("data-parameter");
									var selectedValue = $bvsdk(this).attr("data-value");
									// load new content based off of filter selection and current settings
									// update parameters for new api call
									// add selected filter
									// check if it is a filter parameter or not
									if (filterParameter) {
										// check if multiple filter option can be selected
										if (multipleSelect) {
											// check if filter already exists
											if (settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected]) {
												// check if existing filter is a string or an array
												if (typeof settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected] === "string") {
													// convert string into array
													settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected] = [settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected]];
													// add new option to filter array
													settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected].push(selectedValue);
												} else {
													// add new filter option to existing filter array
													settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected].push(selectedValue);								
												}
											} else {
												// create array from selected option and set filter
												settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected] = [selectedValue];
											}
										} else {
											// set filter as string
											settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected] = selectedValue;
										}
									} else {
										// set parameter (not filter) as string
										settings["viewReloadOptions"]["modelSettings"]["Parameters"][selected] = selectedValue;
									}
									// reset offset to start from the beginning
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
										},
										// api call parameters
										settings["viewReloadOptions"]["modelSettings"]
									);
								} else if ($bvsdk(this).attr("data-selected") == "true") {
									var refreshContainer = $bvsdk(settings["viewReloadOptions"]["controllerSettings"]["parentContainer"]).find(settings["viewReloadOptions"]["controllerSettings"]["targetContainer"]).andSelf().filter(settings["viewReloadOptions"]["controllerSettings"]["targetContainer"]);
									var filterParameter = eval($bvsdk(this).attr("data-filter"));
									var selected = $bvsdk(this).attr("data-parameter");
									var selectedValue = $bvsdk(this).attr("data-value");
									// load new content based off of filter selection and current settings
									// update parameters for new api call
									// add selected filter
									// check if it is a filter parameter or not
									if (filterParameter) {
										// check if multiple filter option can be selected
										if (multipleSelect) {
											// verify filter already exists
											if (settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected]) {
												// check if existing filter is a string or an array
												if (typeof settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected] === "string") {
													// set filter to null since the value is a string
													settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected] = null;
												} else {
													// check if more than one value is in array
													if (settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected].length > 1) {
														// multiple values exist - remove filter option from existing filter array
														settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected] = $bvsdk.grep(settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected], function(value) {
															return value != selectedValue;
														});
													} else {
														// set filter to null since filter already does not exist
														settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected] = null;
													}
												}
											} else {
												// set filter to null since filter already does not exist
												settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected] = null;
											}
										} else {
											// set filter to null since only one value is allowed and it is being removed
											settings["viewReloadOptions"]["modelSettings"]["Parameters"]["filter"][selected] = null;
										}
									} else {
										// set parameter (not filter) as string
										settings["viewReloadOptions"]["modelSettings"]["Parameters"][selected] = null;
									}
									// reset offset to start from the beginning
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
										},
										// api call parameters
										settings["viewReloadOptions"]["modelSettings"]
									);
								}
							}
						});
					});
				}
			},

		},

	},

});