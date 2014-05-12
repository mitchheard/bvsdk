$bvsdk.extend(true, bvsdk, {

	controllers : {

		badges : {

			loadBadges : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["badge"]["universal"]["container-group-default"],
					"viewContainer":bvsdk.models.templates["badge"]["universal"]["container-individual"],
					"loadOrder":content["BadgesOrder"],
				}, options);
				if (settings["loadOrder"] != undefined) {
					$bvsdk.each(settings["loadOrder"], function(key, value) {
						if (content["Badges"][key]) {
							// set content
							var bvContent = {
								"badge-id" : content["Badges"][key]["Id"],
								"badge-type" : content["Badges"][key]["BadgeType"],
								"badge-type-content" : content["Badges"][key]["ContentType"],
							};
							// set container & template
							var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
							var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
							// add template
							$container.append($template);

							// load badge text			
							bvsdk.controllers.badges.loadBadgeContent (content["Badges"][key], {
								"parentContainer":$template,
								"viewContainer":value,
							});
						}
					});
				}
			},

			loadBadgeContent : function (content, options) {
				var settings = $bvsdk.extend(true, {
					"parentContainer":"", // container must be defined in call
					"targetContainer":bvsdk.models.targets["badge"]["universal"]["container-text"],
					"viewContainer":"",
				}, options);
				// set content
				var bvContent = {
					"badge-id" : content["Id"],
					"badge-type" : content["BadgeType"],
					"badge-type-content" : content["ContentType"],
				};
				// set container & template
				var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
				var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
				// add template
				$container.append($template);
			},
		
		},

	},

});