$bvsdk.extend(true, bvsdk, {

	controllers : {

		pagination : {

			loadNumberedPagination : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["pagination"]["universal"]["container-widget"], // container must be defined in call
					"viewContainer":bvsdk.models.templates["pagination"]["universal"]["container-group"],
					"modelLocalDefaultSettings":"",
					"paginationSettings":{
						"offset":content["Offset"],
						"limit":content["Limit"],
						"totalResults":content["TotalResults"],
						"displayCount":7,
						"prevBtnBool":true,
						"prevBtnLabel":bvsdk.models.properties["pagination"]["universal"]["button-previous"],
						"nextBtnBool":true,
						"nextBtnLabel":bvsdk.models.properties["pagination"]["universal"]["button-next"],
						"firstBtnBool":true,
						"firstBtnLabel":bvsdk.models.properties["pagination"]["universal"]["button-first"],
						"lastBtnBool":true,
						"lastBtnLabel":bvsdk.models.properties["pagination"]["universal"]["button-last"],
						"totalPageBool":false,
					},
					"viewReloadOptions":{
						"model":"",
						"modelSettings":"",
						"controller":"",
						"controllerSettings":"",
					},
				}, options);
				// set content
				var bvContent = {};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);

				// set variables
				var pageOffset = settings["paginationSettings"]["offset"];
				var pageLimit = settings["paginationSettings"]["limit"];
				var pageCount = Math.ceil(settings["paginationSettings"]["totalResults"]/pageLimit); // total number of pages
				var pagesToDisplay = settings["paginationSettings"]["displayCount"]; // amount of pagination buttons to display
				
				var currentPage = pageCount - Math.ceil((settings["paginationSettings"]["totalResults"] - pageOffset)/pageLimit); // current page
				var firstPage = 1; // first page
				var firstPageLabel = firstPage + "..."; // first page label
				var lastPage = pageCount; // last page
				var lastPageLabel = "..." + lastPage; // last page label
				var prevPage = currentPage - 1; // previous page
				var prevPageLabel = settings["paginationSettings"]["prevBtnLabel"]; // previous page label
				var nextPage = currentPage + 1; // next page
				var nextPageLabel = settings["paginationSettings"]["nextBtnLabel"]; // next page label

				var startPage = (currentPage - Math.floor(pagesToDisplay/2) + 1); // first pagination link to display - DEFAULT
				var stopPage = (startPage + pagesToDisplay) - 1; // last pagination link to display - DEFAULT

				// make sure pagination nav never goes below 1
				if (startPage <= 0) {
					startPage = 1;
					stopPage = ((startPage + pagesToDisplay) - 1);
				}
				
				// make sure pagination nav never goes above total page count
				if (stopPage > pageCount) {
					stopPage = pageCount;
					if (((stopPage - pagesToDisplay) + 1) <= 1) {
						startPage = 1;
					} else {
						startPage = ((stopPage - pagesToDisplay) + 1);
					}
				}

				// check if pagination is needed
				if (pageCount > 1) {
					// prev page button
					if (settings["paginationSettings"]["prevBtnBool"] && prevPage >= 0) {
						// set offset and limit in api call for each button respectively
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = (pageLimit * prevPage);
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["limit"] = pageLimit;
						
						// load button
						bvsdk.controllers.pagination.loadPaginationButton (prevPageLabel, {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["pagination"]["universal"]["button-previous"],
							"viewReloadOptions":settings["viewReloadOptions"],
						});
					}

					// first page button
					if (settings["paginationSettings"]["firstBtnBool"] && startPage > 1) {
						// set offset and limit in api call for each button respectively
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = (pageLimit * (firstPage - 1));
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["limit"] = pageLimit;
						
						// load button
						bvsdk.controllers.pagination.loadPaginationButton (firstPageLabel, {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["pagination"]["universal"]["button-first"],
							"viewReloadOptions":settings["viewReloadOptions"],
						});
					}

					// pagination buttons
					for (var i = startPage; i <= stopPage; i++) {
						if (i == (currentPage + 1)) {
							// set offset and limit in api call for each button respectively
							settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = (pageLimit * (i - 1));
							settings["viewReloadOptions"]["modelSettings"]["Parameters"]["limit"] = pageLimit;
							
							// load button
							bvsdk.controllers.pagination.loadPaginationButton (i, {
								"parentContainer":$template,
								"targetContainer":bvsdk.models.targets["pagination"]["universal"]["button-group"],
								"viewContainer":bvsdk.models.templates["pagination"]["universal"]["container-individual-selected"],
								"viewReloadOptions":settings["viewReloadOptions"],
							});
						} else {
							// set offset and limit in api call for each button respectively
							settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = (pageLimit * (i - 1));
							settings["viewReloadOptions"]["modelSettings"]["Parameters"]["limit"] = pageLimit;

							// load button
							bvsdk.controllers.pagination.loadPaginationButton (i, {
								"parentContainer":$template,
								"targetContainer":bvsdk.models.targets["pagination"]["universal"]["button-group"],
								"viewReloadOptions":settings["viewReloadOptions"],
							});
						}
					}
					if (settings["paginationSettings"]["totalPageBool"]) {
						// show the total number of pages if at the end of the loop
					}

					// last page button
					if (settings["paginationSettings"]["lastBtnBool"] && pageCount > stopPage) {
						// set offset and limit in api call for each button respectively
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = (pageLimit * (lastPage - 1));
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["limit"] = pageLimit;
						
						// load button
						bvsdk.controllers.pagination.loadPaginationButton (lastPageLabel, {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["pagination"]["universal"]["button-last"],
							"viewReloadOptions":settings["viewReloadOptions"],
						});
					}

					// next page button
					if (settings["paginationSettings"]["nextBtnBool"] && nextPage < pageCount) {
						// set offset and limit in api call for each button respectively
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = (pageLimit * nextPage);
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["limit"] = pageLimit;
						
						// load button
						bvsdk.controllers.pagination.loadPaginationButton (nextPageLabel, {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["pagination"]["universal"]["button-next"],
							"viewReloadOptions":settings["viewReloadOptions"],
						});
					}

				}
			},

			loadPaginationButton : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["pagination"]["universal"]["button-group"],
					"viewContainer":bvsdk.models.templates["pagination"]["universal"]["container-individual"],
					"productId":"",
					"viewReloadOptions":{
						"model":"",
						"modelSettings":"",
						"controller":"",
						"controllerSettings":"",
					},
				}, options);
				// set content
				var bvContent = {
					"button-label" : content,
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
				// apply pagination functionality
				if (!$bvsdk($template).data("disabled")) {
					$bvsdk($template).click(function(){
						// container info to refresh
						var refreshContainer = $bvsdk(settings["viewReloadOptions"]["controllerSettings"]["parentContainer"]).find(settings["viewReloadOptions"]["controllerSettings"]["targetContainer"]).andSelf().filter(settings["viewReloadOptions"]["controllerSettings"]["targetContainer"]);
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
					});
				}
			},

		},

	},

});