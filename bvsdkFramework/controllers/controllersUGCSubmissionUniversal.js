$bvsdk.extend(true, bvsdk, {

	controllers : {

		submission : {

			universal : {

				/***** TAGS - (PROS/CONS) *****/

				loadUGCTagGroupInput : function (content, options) {
					var defaultLoadOrder = [];
					if (content["Data"]["Groups"]["tag"] != undefined) {
						$bvsdk.each(content["Data"]["Groups"]["tag"]["SubElements"], function() {
							defaultLoadOrder.push(this["Id"]);
						});
					}
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["tag-group"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["tag-group"],
						"loadOrder":defaultLoadOrder,
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputRequired":content["Required"],
							"inputSubElements":content["SubElements"],
						},
					}, options);
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(key, value) {
							// set content
							var inputId = content["Data"]["Groups"][value]["Id"];
							var inputRequired = content["Data"]["Groups"][value]["Required"];
							var bvContent = {
								"input-label" : content["Data"]["Groups"][value]["Label"] || bvsdk.models.properties["submission"]["universal"]["tag-group-label" + inputId],
								"input-helpertext" : bvsdk.models.properties["submission"]["universal"]["tag-group-helpertext" + inputId],
								"input-placeholder" : bvsdk.models.properties["submission"]["universal"]["tag-group-placeholder" + inputId],
							};
							// set container & template
							var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
							var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
							// add widget template
							$container.append($template);
							// if required field
							if (inputRequired) {
								$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
									"data-required" : inputRequired,
								});
							}
							// set order to load inputs
							// pre-defined tags load order
							var tagLoadOrder = new Array ();
							// open text field tags load order
							var tagOpenFieldLoadOrder = new Array ();
							// sort tag into their respective load order arrays
							if (content["Data"]["Groups"][value] != undefined) {
								$bvsdk.each(content["Data"]["Groups"][value]["SubElements"], function() {
									if (content["Data"]["Groups"][this["Id"]] != undefined) {
										$bvsdk.each(content["Data"]["Groups"][this["Id"]]["SubElements"], function() {
											// check if field type is TextInput (open text) or Boolean (pre-defined)
											if (content["Data"]["Fields"][this["Id"]]["Type"] == "TextInput") {
												tagOpenFieldLoadOrder.push(this["Id"]);
											} else {
												tagLoadOrder.push(this["Id"]);
											}
										});
									}
								});
							}
							// load pre-defined tags
							if (tagLoadOrder != undefined) {
								$bvsdk.each(tagLoadOrder, function() {
									// load inputs
									bvsdk.controllers.submission.universal.loadUGCTagIndividualInput (content["Data"]["Fields"][this], {
										"parentContainer":$template,
									});
								});
							}
							// load open text field tags
							if (tagOpenFieldLoadOrder != undefined) {
								$bvsdk.each(tagOpenFieldLoadOrder, function(key, value) {
									// only show first open text feild tag
									if ((key + 1) == 1) {
										settings["inputSettings"]["inputHidden"] = false;
									} else {
										settings["inputSettings"]["inputHidden"] = true;
									}
									// load inputs
									bvsdk.controllers.submission.universal.loadUGCTagIndividualInput (content["Data"]["Fields"][this], {
										"parentContainer":$template,
										"inputSettings":{
											"inputHidden":settings["inputSettings"]["inputHidden"],
											"inputPlaceholder":bvsdk.models.properties["submission"]["universal"]["tag-individual-placeholder"],
										},
									});
								});
							}
						});
					}
				},

				loadUGCTagIndividualInput : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["tag-individual"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["tag-individual"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputHidden = settings["inputSettings"]["inputHidden"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputType = settings["inputSettings"]["inputType"]; // selected value
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["tag-individual-label" + inputId],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["tag-individual-helpertext" + inputId],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["tag-individual-placeholder" + inputId],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// check if input should be hidden
					if (inputHidden) {
						$bvsdk($template).hide();
					}
					// load checkbox
					bvsdk.controllers.submission.universal.loadCheckboxInputField (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
						},
					});
					if (inputType == "TextInput") {
						// run once user clicks outside of text field
						$bvsdk($template).focusout( function() {
							// check to see if this field has any text (no need to show a new field if this field can still be used)
							if ($bvsdk("input[type='text'][name='" + inputId + "']").val().trim().length > 0) {
								// array of open text tag values (used to see if a new empty field is needed)
								var tagOpenTextValues = [];
								$bvsdk($bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"])).find("input[type='text']").andSelf().filter("input[type='text']").not(":hidden").each(function() {
									tagOpenTextValues.push($bvsdk(this).val().trim());
								});
								// check to see if an empty text field tag is already showing
								if ($bvsdk.inArray("", tagOpenTextValues) == -1) {
									// loop through all tags within this target container (use target to keep your search localized to this group)
									$bvsdk($bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"])).children(":hidden:first").each(function() {
										// move element to last position and show
										$bvsdk(this).detach().appendTo($bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"])).show();
									});
								}
							}
						});
					}
				},

				/***** ADDITIONAL FIELDS *****/

				loadUGCAdditionalFieldGroupInput : function (content, options) {
					var defaultLoadOrder = [];
					if (content["Data"]["Groups"]["additionalfield"] != undefined) {
						$bvsdk.each(content["Data"]["Groups"]["additionalfield"]["SubElements"], function() {
							defaultLoadOrder.push(this["Id"]);
						});
					}
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["additionalfield-group"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["additionalfield-group"],
						"loadOrder":defaultLoadOrder,
						"inputSettings":{
							"inputType":content["Type"],
							"inputRequired":content["Required"],
							"inputSubElements":content["SubElements"],
						},
					}, options);
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(key) {
							// set content
							var fieldContent = content["Data"]["Fields"][this];
							// slave in UAS parameter value if available
							fieldContent = $bvsdk.extend(true, fieldContent, {
								"Value":bvsdk.models.user.userParams[this]
							});
							var bvContent = {};
							// set container & template
							var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
							var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
							// add widget template
							$container.append($template);
							// load additional field input container
							bvsdk.controllers.submission.universal.loadUGCAdditionalFieldIndividualInput (fieldContent, {
								"parentContainer":$template,
							});
						});
					}
				},

				loadUGCAdditionalFieldIndividualInput : function (content, options) {
					// content is expecting ["Data"]["Fields"][<additionalfield_Value>]
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["additionalfield-individual"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["additionalfield-individual"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						}
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["additionalfield-label" + inputId],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["additionalfield-helpertext" + inputId],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["additionalfield-placeholder" + inputId],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":(inputName)
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load text field
					bvsdk.controllers.submission.universal.loadTextFieldInput (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],			
						}
					});
				},

				/***** MEDIA - PHOTO & VIDEO *****/

				loadUGCPhotoGroupInput : function (content, options) {
					var defaultLoadOrder = [];
					if (content["Data"]["Groups"]["photo"] != undefined) {
						$bvsdk.each(content["Data"]["Groups"]["photo"]["SubElements"], function() {
							defaultLoadOrder.push(this["Id"]);
						});
					}
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["photo-group"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["photo-group"],
						"loadOrder":defaultLoadOrder,
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputHidden":false,
							"inputLabel":content["Label"],
							"inputRequired":content["Required"],
							"inputSubElements":content["SubElements"],
						},
						"mediaSettings":{
							"contentType":"",
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputType = settings["inputSettings"]["inputType"];
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["file-photo-group-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["file-photo-group-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["file-photo-group-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// if required field
					if (inputRequired) {
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load photo upload inputs
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(key, value) {
							// set order to load inputs
							var photoLoadOrder = new Array ();
							if (content["Data"]["Groups"][value] != undefined) {
								$bvsdk.each(content["Data"]["Groups"][value]["SubElements"], function() {
									photoLoadOrder.push(this["Id"]);
								});
							}
							if ((key + 1) == settings["loadOrder"].length) {
								settings["inputSettings"]["inputHidden"] = false;
							} else {
								settings["inputSettings"]["inputHidden"] = true;
							}
							// load photo upload input
							bvsdk.controllers.submission.universal.loadUGCPhotoFileUploadInput (content, {
								"parentContainer":$template,
								"loadOrder":photoLoadOrder,
								"inputSettings":{
									"inputHidden":settings["inputSettings"]["inputHidden"],
								},
								"mediaSettings":{
									"contentType":settings["mediaSettings"]["contentType"],
								}
							});
						});
					}
				},

				loadUGCPhotoFileUploadInput : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["photo-individual"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["photo-individual"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputHidden":false,
							"inputLabel":content["Label"],
							"inputRequired":content["Required"],
							"inputSubElements":content["SubElements"],
						},
						"mediaSettings":{
							"contentType":"",
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputType = settings["inputSettings"]["inputType"];
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["file-photo-individual-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["file-photo-individual-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["file-photo-individual-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					if (settings["inputSettings"]["inputHidden"]) {
						$bvsdk($template).hide();
					}
					// set variables
					var urlInputName = settings["loadOrder"][0];
					var uploadInputName = "photo"; // DO NOT CHANGE - must be photo for upload to work
					// set attributes
					$bvsdk($template).attr({
						"data-state":"input",
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load file upload input (this returns the url needed to submit the photo)
					bvsdk.controllers.submission.universal.loadUploadInput (content["Data"]["Fields"][urlInputName], {
						"parentContainer":$template,
						"viewContainer":bvsdk.models.templates["input"]["universal"]["file-photo"],
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],				
							"inputName":uploadInputName,
						},
					});
					// set functionality for upload input
					bvsdk.models.submission.media.postForm (settings["productId"], function(data) {
						// set variables
						var uploadInput = "input[name='" + uploadInputName + "']";
						// submit photo using the jquery.fileupload.js plugin to allow ajax submission without embedding a form
						$bvsdk($template).find(uploadInput).andSelf().filter(uploadInput).fileupload({
							type: "POST",
							url: data["url"],
							formData: data["params"],
							dataType: "json",
					        done: function (e, result) {
								// load photo url input (this is what actually submits the photo)
								bvsdk.controllers.submission.universal.loadUGCPhotoUploadPreviewInput (content, {
									"parentContainer":$template,
									"loadOrder":settings["loadOrder"],
								});
								// array to hold photo response in json. needed to replicate object sent on json response for display
								var arrPhoto = new Array ();
								arrPhoto.push(result["result"]["Photo"]);
								// load photo thumbnail
								bvsdk.controllers.ugc.universal.loadUGCPhotosGroup (result["result"]["Photo"], {
									"parentContainer":$template,
									"loadOrder":arrPhoto,
								});
								// set value on photo url input
								var urlInput = "input[name='" + urlInputName + "']";
								var urlPhotoNormal = result["result"]["Photo"]["Sizes"]["normal"]["Url"];
								$bvsdk($template).find(urlInput).andSelf().filter(urlInput).attr({
									"value":urlPhotoNormal,
								});
								// load remove button
								bvsdk.controllers.general.loadGenericButton (bvsdk.models.properties["button"]["universal"]["remove"],
									// onclick functionality
									function() {
										// remove uploaded photo
										// show input field and empty photo container
										$bvsdk($template).find(bvsdk.models.objectVariables["container"]["photo-upload"]).andSelf().filter(bvsdk.models.objectVariables["container"]["photo-upload"]).show();
										$bvsdk($template).find(bvsdk.models.targets["submission"]["universal"]["photo-preview"]).andSelf().filter(bvsdk.models.targets["submission"]["universal"]["photo-preview"]).empty();
										// update state of container and hide
										$bvsdk($template).attr({"data-state":"input"}).hide();
										// check to see if a new input is needed
										if ($bvsdk($bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"])).children("[data-state='input']:visible").length == 0) {
											// find next hidden upload input and show if available
											$bvsdk($bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"])).children("[data-state='input']:hidden:first").each(function() {
												$bvsdk(this).detach().prependTo($bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"])).show();
											})
										}
									}, {
										"parentContainer":$template,
										"viewContainer":bvsdk.models.templates["button"]["universal"]["remove"],
									}
								);
								// find next hidden upload input and show if available
								$bvsdk($bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"])).children("[data-state='input']:hidden:first").each(function() {
									// move element to last position and show
									$bvsdk(this).detach().prependTo($bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"])).show();
								});
					        	// show uploaded image preview container and update state of container
					        	$bvsdk($bvsdk($template).attr({"data-state":"file"}).removeClass("BVContentLoadingContainer")).find(bvsdk.models.targets["submission"]["universal"]["photo-preview"]).andSelf().filter(bvsdk.models.targets["submission"]["universal"]["photo-preview"]).show();
					        },
							fail: function(e) {
								bvsdk.controllers.general.consoleLogFallback ("there was an error. please try again.", data);
					        	// show uploaded image preview container
					        	$bvsdk($bvsdk($template).removeClass("BVContentLoadingContainer")).find(bvsdk.models.objectVariables["container"]["photo-upload"]).andSelf().filter(bvsdk.models.objectVariables["container"]["photo-upload"]).show();
								bvsdk.models.general.defaultAjaxErrorFunction (e);
							},
							beforeSend: function() {
								// hide file upload input
								$bvsdk($template).addClass("BVContentLoadingContainer").find(bvsdk.models.objectVariables["container"]["photo-upload"]).andSelf().filter(bvsdk.models.objectVariables["container"]["photo-upload"]).hide();
					        }
					    });
					}, {
						"Parameters":{
							"contenttype":settings["mediaSettings"]["contentType"],
						},
					});
				},

				loadUGCPhotoUploadPreviewInput : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["photo-preview"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["photo-preview"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputRequired":content["Required"],
							"inputSubElements":content["SubElements"],
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputType = settings["inputSettings"]["inputType"];
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["photo-preview-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["photo-preview-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["photo-preview-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set variables
					var urlInputName = settings["loadOrder"][0];
					var captionInputName = settings["loadOrder"][1];
					// hide photo preview container on load
					$bvsdk($template).find(bvsdk.models.targets["submission"]["universal"]["photo-preview"]).andSelf().filter(bvsdk.models.targets["submission"]["universal"]["photo-preview"]).hide();
					// load photo caption input
					bvsdk.controllers.submission.universal.loadUGCPhotoCaptionInput (content["Data"]["Fields"][captionInputName], {
						"parentContainer":$template,
					});
					// load photo url input (hidden)
					bvsdk.controllers.submission.universal.loadUGCPhotoUrlInput (content["Data"]["Fields"][urlInputName], {
						"parentContainer":$template,
					});
				},

				loadUGCPhotoCaptionInput : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["photo-caption"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["photo-caption"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputType = settings["inputSettings"]["inputType"];
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["photo-caption-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["photo-caption-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["photo-caption-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName,
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load input
					bvsdk.controllers.submission.universal.loadTextFieldInput (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
						},
					});
				},

				loadUGCPhotoUrlInput : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["photo-url"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["photo-url"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputType = settings["inputSettings"]["inputType"];
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["photo-url-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["photo-url-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["photo-url-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// hide container
					$bvsdk($template).hide();
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName,
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load photo url input (hidden)
					bvsdk.controllers.submission.universal.loadTextFieldInput (content, {
						"parentContainer":$template,
						"viewContainer":bvsdk.models.templates["input"]["universal"]["text-hidden"],
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
						},
					});
				},

				loadUGCVideoUrlInput : function (content, options) {
					var content = content["Data"]["Fields"]["videourl_1"];
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["video"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["video"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputType = settings["inputSettings"]["inputType"];
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["video-url-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["video-url-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["video-url-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName,
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load input
					bvsdk.controllers.submission.universal.loadTextFieldInput (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
						},
					});
				},

				loadUGCVideoCaptionInput : function (content, options) {
					var content = content["Data"]["Fields"]["videocaption_1"];
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["video-caption"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["video-caption"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputType = settings["inputSettings"]["inputType"];
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["video-caption-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["video-caption-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["video-caption-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName,
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load input
					bvsdk.controllers.submission.universal.loadTextFieldInput (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
						},
					});
				},

				/***** USER DATA *****/

				loadUGCUserNicknameInput : function (content, options) {
					var content = content["Data"]["Fields"]["usernickname"];
					content = $bvsdk.extend(true, content, {
						"Value":bvsdk.models.user.userParams[content["Id"]]
					});
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["nickname"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["nickname"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["nickname-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["nickname-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["nickname-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load input
					bvsdk.controllers.submission.universal.loadTextFieldInput (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
						},
					});
				},

				loadUGCUserLocationInput : function (content, options) {
					var content = content["Data"]["Fields"]["userlocation"];
					// slave in UAS parameter value if available
					content = $bvsdk.extend(true, content, {
						"Value":bvsdk.models.user.userParams[content["Id"]]
					});
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["location"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["location"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["location-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["location-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["location-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load input
					bvsdk.controllers.submission.universal.loadTextFieldInput (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
						},
					});
				},

				loadUGCUserEmailInput : function (content, options) {
					var content = content["Data"]["Fields"]["useremail"];
					// slave in UAS parameter value if available
					content = $bvsdk.extend(true, content, {
						"Value":bvsdk.models.user.userParams[content["Id"]]
					});
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["email"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["email"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["email-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["email-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["email-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load input
					bvsdk.controllers.submission.universal.loadTextFieldInput (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
						},
					});
				},

				loadUGCUserIDInput : function (content, options) {
					var content = content["Data"]["Fields"]["userid"];
					// slave in UAS parameter value if available
					content = $bvsdk.extend(true, content, {
						"Value":bvsdk.models.user.userParams[content["Id"]]
					});
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["userid"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["userid"],
						"inputSettings":{
							"inputName":"userid",
							"inputType":"hidden",
							"inputLabel":"User Id",
							"inputPlaceholder":"",
							"inputHelperText":"",
							"inputValue":"",
							"inputMinLength":"",
							"inputMaxLength":"",
							"inputRequired":true,
							"inputDefault":"",
							"inputOptionsArray":"",
						},
					}, options);
					// set content
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["userid-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["userid-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["userid-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load input
					bvsdk.controllers.submission.universal.loadTextFieldInput (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
						},
					});
				},

				/***** CONTEXT DATA VALUES *****/

				loadUGCContextDataValueGroupInput : function (content, options) {
					var defaultLoadOrder = [];
					if (content["Data"]["Groups"]["contextdatavalue"] != undefined) {
						$bvsdk.each(content["Data"]["Groups"]["contextdatavalue"]["SubElements"], function() {
							defaultLoadOrder.push(this["Id"]);
						});
					}
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["cdv-group"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["cdv-group"],
						"loadOrder":defaultLoadOrder,
						"inputSettings":{
							"inputType":content["Type"],
							"inputRequired":content["Required"],
							"inputSubElements":content["SubElements"],
						}
					}, options);
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(key) {
							// set content
							var fieldContent = content["Data"]["Fields"][this];
							// slave in UAS parameter value if available
							fieldContent = $bvsdk.extend(true, fieldContent, {
								"Value":bvsdk.models.user.userParams[this]
							});
							var bvContent = {};
							// set container & template
							var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
							var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
							// add widget template
							$container.append($template);
							// load context data value input container
							bvsdk.controllers.submission.universal.loadUGCContextDataValueIndividualInput (fieldContent, {
								"parentContainer":$template,
							});
						});
					}
				},

				loadUGCContextDataValueIndividualInput : function (content, options) {
					// content is expecting ["Data"]["Fields"][<contextdatavalue_Value>]
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["cdv-individual"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["cdv-individual"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						}
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputType = settings["inputSettings"]["inputType"]; // selected value
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["contextdatavalue-label" + inputId],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["contextdatavalue-helpertext" + inputId],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["contextdatavalue-placeholder" + inputId],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":(inputName)
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
					// load select/radio input
					if (inputType == "SelectInput") {
						// load select(dropdown)
						bvsdk.controllers.submission.universal.loadSelectInput (content, {
							"parentContainer":$template,
							"inputSettings":{
								// using bvContent to allow for property customization - api response is still default
								"inputLabel":bvContent["input-label"],
								"inputHelperText":bvContent["input-helpertext"],
								"inputPlaceholder":bvContent["input-placeholder"],				
							},
						});
					} else {
						// set radio button load order
						var defaultLoadOrder = [];
						if (content["Options"] != undefined) {
							$bvsdk.each(content["Options"], function(index) {
								if (this["Label"]) {
									var obj = {};
									obj[this["Value"]] = this["Label"];
									defaultLoadOrder[index] = obj;
								};
							});
						}
						// load radio buttons
						bvsdk.controllers.submission.universal.loadRadioInputIndividual (content, {
							"parentContainer":$template,
							"targetContainer":bvsdk.models.targets["input"]["universal"]["individual"],
							"loadOrder":defaultLoadOrder,
							"inputSettings":{
								// using bvContent to allow for property customization - api response is still default
								"inputLabel":bvContent["input-label"],
								"inputHelperText":bvContent["input-helpertext"],
								"inputPlaceholder":bvContent["input-placeholder"],				
							},
						});
					}
				},

				/***** FORM CHECKBOXES *****/

				loadTermsAndConditionsInput : function (content, options) {
					var content = content["Data"]["Fields"]["agreedtotermsandconditions"];
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["termsandconditions"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["termsandconditions"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["termsandconditions-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["termsandconditions-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["termsandconditions-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// load checkbox
					bvsdk.controllers.submission.universal.loadCheckboxInputField (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
							"inputValue":true,
							"inputRequired":true,
						},
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
				},

				loadSendEmailAlertWhenCommentedInput : function (content, options) {
					content = content["Data"]["Fields"]["sendemailalertwhencommented"];
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["alert-email-commented"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["alert-email-commented"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["alert-email-commented-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["alert-email-commented-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["alert-email-commented-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// load checkbox
					bvsdk.controllers.submission.universal.loadCheckboxInputField (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
							"inputValue":true,
						},
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
				},

				loadSendEmailAlertWhenPublishedInput : function (content, options) {
					var content = content["Data"]["Fields"]["sendemailalertwhenpublished"];
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["alert-email-published"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["alert-email-published"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["alert-email-published-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["alert-email-published-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["alert-email-published-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// load checkbox
					bvsdk.controllers.submission.universal.loadCheckboxInputField (content, {
						"parentContainer":$template,
						"inputSettings":{
							// using bvContent to allow for property customization - api response is still default
							"inputLabel":bvContent["input-label"],
							"inputHelperText":bvContent["input-helpertext"],
							"inputPlaceholder":bvContent["input-placeholder"],
							"inputValue":true,
						},
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).parent().addClass(bvsdk.models.config.bvClassRequired);
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required" : inputRequired,
						});
					}
				},

				/***** GENERIC INPUTS *****/

				loadTextFieldInput : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["input"]["universal"]["individual"],
						"viewContainer":bvsdk.models.templates["input"]["universal"]["text"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// if required field
					if (inputRequired) {
						$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required":inputRequired,
						});
					}
					// set input attributes
					$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).attr({
						"id":inputId,
						"name":settings["inputSettings"]["inputName"],
						"value":settings["inputSettings"]["inputValue"],
						"placeholder":settings["inputSettings"]["inputPlaceholder"],
						"data-minlength":inputMinLength,
						"data-maxlength":inputMaxLength,
					});
					if (inputId == "useremail") {
						$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).attr({
							"data-type":"email",
						});
					}
					if (inputId == "usernickname") {
						$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).attr({
							"data-type":"alphanum",
						});
					}
				},

				loadTextAreaInput : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["input"]["universal"]["individual"],
						"viewContainer":bvsdk.models.templates["input"]["universal"]["textarea"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputName,
					});
					// if required field
					if (inputRequired) {
						$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required":inputRequired,
						});
					}
					// set input attributes
					$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).attr({
						"id":inputId,
						"name":settings["inputSettings"]["inputName"],
						"value":settings["inputSettings"]["inputValue"],
						"placeholder":settings["inputSettings"]["inputPlaceholder"],
						"data-required":settings["inputSettings"]["inputRequired"],
						"data-minlength":inputMinLength,
						"data-maxlength":inputMaxLength,
					});
				},

				loadRadioInputIndividual : function (content, options) {
					// object containing value and label text [<value>:<lable text>]
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["input"]["universal"]["group"],
						"viewContainer":bvsdk.models.templates["input"]["universal"]["radio-individual"],
						"loadOrder":"", // this must be defined in the call
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each (settings["loadOrder"], function(key, value) {
							// set content
							var inputId = settings["inputSettings"]["inputName"] + key;
							var inputMinLength = settings["inputSettings"]["inputMinLength"];
							var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
							var inputName = settings["inputSettings"]["inputName"];
							var inputRequired = settings["inputSettings"]["inputRequired"];
							var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
							var bvContent = {
								"input-label" : value,
								"input-helpertext" : settings["inputSettings"]["inputHelperText"],
								"input-placeholder" : settings["inputSettings"]["inputPlaceholder"],
								"input-value" : key,
							};
							// set container & template
							var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
							var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
							// add widget template
							$container.append($template);
							// set label
							$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
								"for":inputId,
							});
							// if required field
							if (inputRequired) {
								$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
									"data-required":inputRequired,
								});
							}
							// set input attributes
							$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).attr({
								"id":inputId,
								"name":inputName,
								"value":key,
							});
							// selected value
							if (key == inputSelected) {
								$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).attr({
									"checked":"checked",
								});
							}
						});
					}
				},

				loadCheckboxInputField : function (content, options) {
					// content expected ["Data"]["Fields"][<fieldname>]
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["input"]["universal"]["checkbox-individual"],
						"viewContainer":bvsdk.models.templates["input"]["universal"]["checkbox-individual"],
						"loadOrder":"", // this must be defined in the call
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputType = settings["inputSettings"]["inputType"];
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// if required field
					if (inputRequired) {
						$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required":inputRequired,
						});
					}
					// set label
					if (inputType !== "TextInput") {
						$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
							"for":inputId,
						});
						// set checkbox input attributes
						$bvsdk($template).find(bvsdk.models.objectVariables["input"]["checkbox"]).andSelf().filter(bvsdk.models.objectVariables["input"]["checkbox"]).attr({
							"id":inputId,
							"name":inputName,
							"value":true,
						});
					} else {
						bvsdk.controllers.submission.universal.loadTextFieldInput (content, {
							"parentContainer":$template,
							"targetContainer":$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
								"for":inputId,
							}),
							"inputSettings":{
								// using bvContent to allow for property customization - api response is still default
								"inputLabel":bvContent["input-label"],
								"inputHelperText":bvContent["input-helpertext"],
								"inputPlaceholder":bvContent["input-placeholder"],
								"inputName":inputName,
							}
						});
						// set checkbox input attributes
						$bvsdk($template).find(bvsdk.models.objectVariables["input"]["checkbox"]).andSelf().filter(bvsdk.models.objectVariables["input"]["checkbox"]).attr({
							"id":inputId,
							"name":inputName,
							"value":"",
						});
					}
					// may be needed for editing
					// // selected value
					// if (inputSelected) {
					// 	$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).attr({
					// 		"checked":true,
					// 	});
					// }
					
					// add functionality to update checked attribute on change
					$bvsdk($template).change(function() {
						if (this.checked) {
							// enable text input
							$bvsdk($template).find(bvsdk.models.objectVariables["input"]["text"]).andSelf().filter(bvsdk.models.objectVariables["input"]["text"]).prop('disabled', false);
							// check checkbox
							$bvsdk($template).find(bvsdk.models.objectVariables["input"]["checkbox"]).andSelf().filter(bvsdk.models.objectVariables["input"]["checkbox"]).prop('checked', true);
						} else {
							// disbale text input
							$bvsdk($template).find(bvsdk.models.objectVariables["input"]["text"]).andSelf().filter(bvsdk.models.objectVariables["input"]["text"]).prop('disabled', true);
							// uncheck checkbox
							$bvsdk($template).find(bvsdk.models.objectVariables["input"]["checkbox"]).andSelf().filter(bvsdk.models.objectVariables["input"]["checkbox"]).prop('checked', false);
						}
						// focus on text input container
						$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).focus()
					});
				},

				loadSelectInput : function (content, options) {
					// content expected ["Data"]["Fields"][<contextdatavalue_Value>]
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["input"]["universal"]["individual"],
						"viewContainer":bvsdk.models.templates["input"]["universal"]["select"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// slave in UAS parameter value if available
					if (inputSelected) {
						$bvsdk.each(inputOptions, function(key) {
							if (this["Value"] == inputSelected) {
								this["Selected"] = true;
							} else {
								this["Selected"] = false;
							}
						});
					}
					// if required field
					if (inputRequired) {
						$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).addClass(bvsdk.models.config.bvClassRequired).attr({
							"data-required":inputRequired,
						});
					}
					// set input attributes
					$bvsdk($template).find(bvsdk.models.targets["input"]["universal"]["option"]).andSelf().filter(bvsdk.models.targets["input"]["universal"]["option"]).attr({
						"id":inputId,
						"name":inputName,
					});
					// load select options
					bvsdk.controllers.submission.universal.loadSelectOptionsInput (inputOptions, {
						"parentContainer":$template,
					});
				},

				loadSelectOptionsInput : function (content, options) {
					// content expected ["Data"]["Fields"][<contextdatavalue_Value>]["Options"]
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["input"]["universal"]["option"],
						"viewContainer":bvsdk.models.templates["input"]["universal"]["option"],
						"loadOrder":content,
						"inputSettings":{
							"inputValue":content["Value"],
							"inputSelected":content["Selected"],
							"inputLabel":content["Label"],
						},
					}, options);
					if (settings["loadOrder"] != undefined) {
						$bvsdk.each(settings["loadOrder"], function(key) {
							// set content
							var inputValue = settings["loadOrder"][key]["Value"]; // option value
							var inputSelected = settings["loadOrder"][key]["Selected"]; // option selected boolean
							var bvContent = {
								"input-label" : settings["loadOrder"][key]["Label"],
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
								"disabled":false,
							});
						});
					}
				},

				loadUploadInput : function (content, options) {
					// content expected ["Data"]["Fields"][<fieldname>]
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["input"]["universal"]["file"],
						"viewContainer":bvsdk.models.templates["input"]["universal"]["file"],
						"inputSettings":{
							"inputName":content["Id"],
							"inputType":content["Type"],
							"inputLabel":content["Label"],
							"inputPlaceholder":"", // user defined
							"inputHelperText":"", // user defined
							"inputHidden":false,
							"inputValue":content["Value"],
							"inputMinLength":content["MinLength"],
							"inputMaxLength":content["MaxLength"],
							"inputRequired":content["Required"],
							"inputDefault":content["Default"],
							"inputOptionsArray":content["Options"],
						},
					}, options);
					// set content
					var inputId = settings["inputSettings"]["inputName"];
					var inputMinLength = settings["inputSettings"]["inputMinLength"];
					var inputMaxLength = settings["inputSettings"]["inputMaxLength"];
					var inputName = settings["inputSettings"]["inputName"];
					var inputRequired = settings["inputSettings"]["inputRequired"];
					var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
					var inputType = settings["inputSettings"]["inputType"];
					var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
					var bvContent = {
						"input-label" : settings["inputSettings"]["inputLabel"] || bvsdk.models.properties["submission"]["universal"]["file-individual-label"],
						"input-helpertext" : settings["inputSettings"]["inputHelperText"] || bvsdk.models.properties["submission"]["universal"]["file-individual-helpertext"],
						"input-placeholder" : settings["inputSettings"]["inputPlaceholder"] || bvsdk.models.properties["submission"]["universal"]["file-individual-placeholder"],
					};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
					// set label
					$bvsdk($template).find(bvsdk.models.objectVariables["input-label"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input-label"]["universal"]).attr({
						"for":inputId,
					});
					// set input attributes
					$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).attr({
						"id":inputId,
						"name":inputName,
					});
					// required
					if (inputRequired == true) {
						$bvsdk($template).find(bvsdk.models.objectVariables["input"]["universal"]).andSelf().filter(bvsdk.models.objectVariables["input"]["universal"]).addClass(bvsdk.models.config.bvClassRequired);
					}
				},

				loadRequiredIndicators : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.objectVariables["input-label"]["required"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["input-required"],
					}, options);
					// set content
					var bvContent = {};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);
				},

				loadErrors : function (content, options) {
					var settings = $bvsdk.extend(true, {
						"parentContainer":"", // container must be defined in call
						"targetContainer":bvsdk.models.targets["submission"]["universal"]["container-form"],
						"viewContainer":bvsdk.models.templates["submission"]["universal"]["input-required"],
					}, options);
					// set content
					var bvContent = {};
					// set container & template
					var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
					var $template = bvsdk.controllers.general.returnTemplate (bvContent, settings["viewContainer"]);
					// add widget template
					$container.append($template);


								$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-error"]).html('');

								// $bvsdk.each(content["FormErrors"]["FieldErrors"], function(k, v) {
								// 	$bvsdk('*[name="' + k + '"]').parent().parent().addClass('BVErrorText');
								// 	$bvsdk('*[name="' + k + '"]').addClass('BVErrorBorder');
								// 	$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-error"]).append(v["Message"] + '<br/>');
								// 	$bvsdk(bvsdk.models.targets["submission"]["universal"]["container-form"]).show();
								// });


				},



			},

		},

	},

});