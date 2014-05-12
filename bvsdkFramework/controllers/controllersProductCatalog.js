$bvsdk.extend(true, bvsdk, {

	controllers : {

		catalog : {

			products : {

				loadProductInfoWidget : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["product"]["universal"]["container-widget"],
						"viewContainer":bvsdk.models.templates["product"]["universal"]["container-widget"],
					}, options);
					// set content
					var productsToLoad = content["Results"]; // products
					var bvContent = {};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.html($template);
					// load products
					if (productsToLoad != undefined) {
						$bvsdk.each (productsToLoad, function(key) {
							bvsdk.controllers.catalog.products.loadProductInfo (productsToLoad[key], {
								"parentContainer":$template,
							});
						});
					}
				},

				loadProductInfo : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["product"]["universal"]["container-individual"],
						"viewContainer":bvsdk.models.templates["product"]["universal"]["container-individual"],
					}, options);
					// set content
					var bvContent = {};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
					// load product name
					bvsdk.controllers.catalog.products.loadProductName (content, {
						"parentContainer":$template
					});
					// load product description
					bvsdk.controllers.catalog.products.loadProductDescription (content, {
						"parentContainer":$template
					});
					// load product image
					bvsdk.controllers.catalog.products.loadProductImage (content, {
						"parentContainer":$template
					});
				},

				loadProductName : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["product"]["universal"]["title"],
						"viewContainer":bvsdk.models.templates["product"]["universal"]["title"],
					}, options);
					// set content
					var bvContent = {
						"product-name" : content["Name"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
				},

				loadProductDescription : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["product"]["universal"]["body"],
						"viewContainer":bvsdk.models.templates["product"]["universal"]["body"],
					}, options);
					// set content
					var bvContent = {
						"product-description" : content["Description"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
				},

				loadProductImage : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["product"]["universal"]["photo-individual"],
						"viewContainer":bvsdk.models.templates["product"]["universal"]["photo-individual"],
					}, options);
					// set content
					var bvContent = {
						"product-img-url" : content["ImageUrl"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add template
					$container.append($template);
					// set image attr
					$bvsdk($template).find("img").andSelf().filter("img").attr({
						"src":bvContent["product-img-url"],
					});
				},

			},

		},

	},

});