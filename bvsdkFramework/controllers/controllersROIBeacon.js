$bvsdk.extend(true, bvsdk, {

    controllers : {

        roibeacon : {

        	initROIBeacon : function () {
				if (bvConfigSDK["ROI"]["orderId"]) {
					bvsdk.controllers.roibeacon.trackTransactionPageView (bvConfigSDK["ROI"]);
				}

				if (bvConfigSDK["ROI"]["type"]) {
					bvsdk.controllers.roibeacon.trackConversion (bvConfigSDK["ROI"]["type"], bvConfigSDK["ROI"]["label"], bvConfigSDK["ROI"]["value"]);
				}
        	},

			// Track a transaction page view. A transaction is just a special
			// conversion with extra transaction-specific data. Detects PII
			// data and fires a seperate PII conversion event if necessary.
			trackTransactionPageView : function (options) {
				var settings = $bvsdk.extend(true, {
					"orderId" : "", // The unique Id of the order. Required for ROI Measurement. Used to measure lift in average number of orders for products where UGC is present.
					"tax" : "", // The amount of tax applied to the order.
					"shipping" : "", // The cost of shipping for the order.
					"total" : "", // The total amount of the order. Required for ROI Measurement. Used to generate standard ROI Reports.
					"city" : "", // The city to associate with the transaction.
					"state" : "", // The state to associate with the transaction.
					"country" : "", // The country to associate with the transaction.
					"currency" : "", //ISO 4217 alphabetic currency code.
					"items" : { // An array of the individual items in the order.
						"sku" : "", // Item's SKU code or product id. Required for ROI Measurement. The Bazaarvoice ExternalID of the item. Sometimes this is a SKU code or ProductID, but it MUST match what you send to Bazaarvoice in your product data feed for the <Product> <ExternalID>. 
						"name" : "", // Product name. Recommended for ROI Measurement. Can be used to generate reports by product name vs. skus/product ids. Important! Should match the value you provide to Bazaarvoice in the product data feed.
						"category" : "", // Product category. Recommended for ROI Measurement can be used to generate category level ROI Reports.
						"price" : "", // Product price. Important! Must have only two fraction numbers after the decimal.
						"quantity" : "", // Purchase quantity. Recommended for ROI Measurement.  Quantity can be used to measure average lift in items per order when UGC is present.
						"imageURL" : "", // Product image URL
					},
					"userId" : "", // The unique id of the user
					"locale" : "", // Locale of the transaction
					"email" : "", // The user's email address
					"nickname" : "", // The nickname of the user
					"locale" : "", // Transaction locale, two or four letters code. Format is: <language code>_<country code>. Language code should be lowercase. Country code uppercase.
				}, options);

				var data = settings;

				$bvsdk.each(data, function(key, value) {
					if (typeof value == "object") {
						$bvsdk.each(value, function(key2, value2) {
							if (value2 == "" || value2 == null) {
								delete value[key2];
							}
						});
					}
					if (value == "" || value == null || $bvsdk.isEmptyObject(value)) {
						delete data[key];
					}
				});

				// if (!this.enabled) {
				// 	return this;
				// }

				// if (typeof data !== "object") {
				// 	return this;
				// }

				// Magpie.load();

				data["type"] = "Transaction";
				data["label"] = "TransactionThankYou";

				// Legacy remap transaction_id -> orderId.
				if ('transaction_id' in data) {
					data["orderId"] = data["transaction_id"];
					delete data["transaction_id"];
				}

				// Legacy remap products -> items.
				if ('products' in data) {
					data["items"] = data["products"];
					delete data["products"];
				}

				if (data["items"] && data["items"].length) {
					for (var x = 0, len = data["items"].length; x < len; x++) {
						var item = data["items"][x];
						// Legacy remap product_id -> sku.
						if ('product_id' in item) {
							item["sku"] = item["product_id"];
							delete item["product_id"];
						}
					}
				}

				 _bvaq.push(['trackConversion', data]);
			},

			// Track a conversion. Detects PII data and fires a seperate PII
			// conversion event if necessary.
			trackConversion : function (type, label, value, options) {
				var settings = $bvsdk.extend(true, {
					"type" : "", // Required. The type of conversion that is taking place.
					"label" : "", // A descriptive label to apply to the conversion.
					"value" : "", // Required.  A value to attribute to the conversion.
					"userId" : "", // The unique id of the user
					"locale" : "", // Locale of the transaction
					"email" : "", // The user's email address
					"nickname" : "", // The nickname of the user
					"locale" : "", // Transaction locale, two or four letters code. Format is: <language code>_<country code>. Language code should be lowercase. Country code uppercase.
				}, options);

				// if (!this.enabled) {
				// 	return this;
				// }

				// Magpie.load();

				var data = type;

				if (typeof data !== "object") {
					data = {
						type: type || null,
						label: label || null,
						value: value || null
					};
				}

				_bvaq.push(['trackConversion', data]);

				return this;
			},

        },

    },

});