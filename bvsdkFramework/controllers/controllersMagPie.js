$bvsdk.extend(true, bvsdk, {

    controllers : {

        magpie : {

            initMagpie : function () {
                console.log('magpie!');
                // Asynchronously load magpie.js
                (function(doc, tag) {
                    var mag = document.createElement(tag); mag.type = 'text/javascript'; mag.async = true;
                    mag.src = '//magpie-static.ugc.bazaarvoice.com/magpiejs/2.4/magpie.js';
                    var s = document.getElementsByTagName(tag)[0]; s.parentNode.insertBefore(mag, s);
                })(document, 'script');
            },

            // track UGC impressions individually
            addImpression : function (content, options) {
                var settings = $bvsdk.extend(true, {
                    "type" : "UGC", // String - 
                    "contentId" : null, // String - Unique identifier for the piece of content displayed
                    // "subjectType" : null, // String - 
                    "contentType" : null, // String - Type of content displayed, pascal-cased. E.g. 'Review', 'Question'. This field is not enumerated in order to support novel content types
                    "productId" : null, // String - Client-centric product ID of the product to which this UGC refers, if applicable. Unique within the client's product feed
                    "categoryId" : null, // String - Client-centric category ID of either the category to which the UGC refers or the category of the product to which the UGC refers, if applicable. Unique within the client's product feed
                    "rootCategoryId" : null, // String - Client-centric category ID of the root category relative to the category identified by the 'categoryId' property value. Unique within the client's product feed
                    "brand" : null, // String - Client-centric brand name of the product to which this UGC refers, if available
                    "ucProductId" : null, // String - BV universal catalog unique product ID. See 'productId'. Optional until the universal catalog is complete
                    "ucCategoryId" : null, // String - BV universal catalog unique category ID, if applicable. See 'categoryId'.
                    "ucRootCategoryId" : null, // String - BV universal catalog unique category ID of the root category relative to the category identified by the 'ucCategoryId' property value
                    "ucBrandId" : null, // String - BV universal catalog unique canonical brand ID to which the canonicalized product to which this UGC refers belongs, if available
                    "parentId" : null, // String - Optional, unique id of the parent of the displayed piece of content (if applicable)
                    "parentType" : null, // String - Optional, content type of the parent of the displayed piece of content (if applicable)
                    "syndicated" : "false", // Boolean - Flag indicating whether the displayed piece of content is 'native' or is syndicated from another client. Assumed false unless present
                    "syndicationSource" : null, // String - Optional, for syndicated content, the source (e.g. client) from which the content was syndicated
                    "visible" : "true", // Boolean - Flag indicating whether or not the impressed content was actually visible (i.e. in the view port). Assumed true unless present
                    "numPeers" : null, // Number - Optional, number of pieces of 'peer' content on the page
                    "peerPosition" : null, // Number - Optional, used inconjunction with the 'numPeers' field to indicate where, relative to its peers, the displayed piece of content lies
                    "initialContent" : "true", // Boolean - Flag indicating whether or not this piece of content was initially visible on the page, or if the user had to sort/paginate/filter to see it. Assumed true unless present.
                    "bvProduct" : null, // Enumeration - Bazaarvoice 'sku' of the SaaS product that generated the event (AskAndAnswer, Profiles, Stories, RatingsAndReviews).
                }, options);

                // update global UGC count
                switch (settings["contentType"].slice(0,1).toUpperCase() + settings["contentType"].slice(1).toLowerCase()) {
                    case "Review" :
                        bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["numReviews"]++;
                        settings["peerPosition"] = bvsdk.models.magpie.pageTrackContent["RatingsAndReviews"]["numReviews"];
                        break;
                    case "Question" :
                        bvsdk.models.magpie.pageTrackContent["AskAndAnswer"]["numQuestions"]++;
                        settings["peerPosition"] = bvsdk.models.magpie.pageTrackContent["AskAndAnswer"]["numQuestions"];
                        break;
                    case "Answer" :
                        bvsdk.models.magpie.pageTrackContent["AskAndAnswer"]["numAnswers"]++;
                        settings["peerPosition"] = bvsdk.models.magpie.pageTrackContent["AskAndAnswer"]["numAnswers"];
                        break;
                    case "Story" :
                        bvsdk.models.magpie.pageTrackContent["Stories"]["numStories"]++;
                        settings["peerPosition"] = bvsdk.models.magpie.pageTrackContent["Stories"]["numStories"];
                        break;
                }

                // create impression data object
                var data = {
                    type: "UGC",
                    contentId : content["Id"] || settings["contentId"],
                    contentType: settings["contentType"],
                    bvProduct: settings["bvProduct"],
                    ucProductId : settings["ucProductId"],
                    numPeers : settings["numPeers"],
                    peerPosition : settings["peerPosition"],
                    categoryId : settings["categoryId"],
                    rootCategoryId : settings["rootCategoryId"],
                    brand : settings["brand"],
                    ucCategoryId : settings["ucCategoryId"],
                    ucRootCategoryId : settings["ucRootCategoryId"],
                    ucBrandId : settings["ucBrandId"],
                    syndicated : content["IsSyndicated"] || settings["syndicated"],
                    syndicationSource : (content["SyndicationSource"]) ? content["SyndicationSource"]["Name"] : settings["syndicationSource"],
                    parentId : content["ReviewId"] || content["QuestionId"] || content["StoryId"] || settings["parentId"],
                    parentType : (content["ReviewId"]) ? "Review" : (content["QuestionId"]) ? "Question" : (content["StoryId"]) ? "Story" : settings["contentType"],
                    productId : content["ProductId"] || settings["productId"],
                    visible : settings["visible"],
                    initialContent : settings["initialContent"],
                }

                // remove unused items from impression data object
                $bvsdk.each(data, function(key, value) {
                    if (value == "" || value == null) {
                        delete data[key];
                    }
                });

                // push impression to magpie batch
                _bvaq.push(["addBatchItem", "Impression", data]);

            },

            // track PageView
            trackPageView : function (content, options) {
                var settings = $bvsdk.extend(true, {
                    "type" : null, // String - (Product, Category, or Misc)
                    "productId" : null, // String - Client-centric product ID of the product to which this UGC refers, if applicable. Unique within the client's product feed
                    "categoryId" : null, // String - Client-centric category ID of either the category to which the UGC refers or the category of the product to which the UGC refers, if applicable. Unique within the client's product feed
                    "rootCategoryId" : null, // String - Client-centric category ID of the root category relative to the category identified by the 'categoryId' property value. Unique within the client's product feed
                    "brand" : null, // String - Client-centric brand name of the product to which this UGC refers, if available
                    "ucProductId" : null, // String - BV universal catalog unique product ID. See 'productId'. Optional until the universal catalog is complete
                    "ucCategoryId" : null, // String - BV universal catalog unique category ID, if applicable. See 'categoryId'.
                    "ucRootCategoryId" : null, // String - BV universal catalog unique category ID of the root category relative to the category identified by the 'ucCategoryId' property value
                    "ucBrandId" : null, // String - BV universal catalog unique canonical brand ID to which the canonicalized product to which this UGC refers belongs, if available
                    "numReviews" : null, // Number - Number of reviews for this product. Include if this value (even if 0) is shown to user, don't include otherwise.
                    "numQuestions" : null, // Number - Number of questions for this product. Include if this value (even if 0) is shown to user, don't include otherwise.
                    "numAnswers" : null, // Number - Number of answers for this product. Include if this value (even if 0) is shown to user, don't include otherwise.
                    "percentRecommended" : null, // Number - Percentage of users who would recommend this product. The value should be between 0 and 1. Include if this value (even if 0) is shown to user, don't include otherwise.
                    "avgRating" : null, // Number - The average star rating for this product. Include if this value (even if 0) is shown to user, don't include otherwise.
                    "bvProduct" : null, // Enumeration - Bazaarvoice 'sku' of the SaaS product that generated the event (AskAndAnswer, Profiles, Stories, RatingsAndReviews).
                }, options);

                // create pagetrack data object
                var data = {
                    type: bvConfigSDK["pageType"].slice(0,1).toUpperCase() + bvConfigSDK["pageType"].slice(1).toLowerCase(),
                    productId : bvConfigSDK["productId"] || settings["productId"],
                    categoryId : bvConfigSDK["categoryId"] || settings["categoryId"],
                    rootCategoryId : bvConfigSDK["rootCategoryId"] || settings["rootCategoryId"],
                    brand : bvConfigSDK["brand"] || settings["brand"],
                    ucProductId : settings["ucProductId"],
                    ucCategoryId : settings["ucCategoryId"],
                    ucRootCategoryId : settings["ucRootCategoryId"],
                    ucBrandId : settings["ucBrandId"],
                    numReviews: settings["numReviews"],
                    numQuestions: settings["numQuestions"],
                    numAnswers: settings["numAnswers"],
                    percentRecommended: settings["percentRecommended"],
                    avgRating: settings["avgRating"],
                    bvProduct: settings["bvProduct"],
                }

                // remove unused items from pagetrack data object
                $bvsdk.each(data, function(key, value) {
                    if (value == "" || value == null) {
                        delete data[key];
                    }
                });

                // push pageview to magpie
                _bvaq.push(["trackPageView", data]);

            },

            // track features shown/used
            trackFeature : function (content, options) {
                var settings = $bvsdk.extend(true, {
                    "type" : null, // String - (Shown or Used)
                    "name" : null, // String - Name of the feature, e.g. 'sort' or 'paginate'
                    "detail1" : null, // String - Optional first-level sub-detail for the feature. Feature usage metrics automatically aggregate by feature name, detail1, and detail2 (in that order), so you can extract heirarchical metrics given carefully crafted detail attributes.
                    "detail2" : null, // String - Optional second-level sub-detail for the feature. See 'detail1'
                    "quantity" : null, // Number - Optional numeric 'quantity' of the feature. E.g. for search results, the quantity might be the number of search results
                    "elapsedMs" : null, // Number - Optional amount of time (in milliseconds) that this feature took between being initiated by the user and completing
                    "interaction" : "true", // Boolean - Flag indicating whether or not this event should be considered an interaction by the user. Assumed true unless present.
                    "campaignId" : null, // Identifier for the campaign with which this feature is associated, if any
                    "component" : null, // String - UI component in which the feature lives. E.g. 'PromoUnit_150x150'.
                    "location" : null, // String - UI location on which the feature or component lives. E.g. 'BrandHomePage'.
                    "contentType" : null, // String - Type of UGC that serves as the context for this feature. For features with an implied target of a piece of UGC, this should be set (e.g. voting on a review's helpfulness).
                    "contentId" : null, // String - Unique identifier for the piece of content displayed
                    "productId" : null, // String - Client-centric product ID of the product to which this UGC refers, if applicable. Unique within the client's product feed
                    "categoryId" : null, // String - Client-centric category ID of either the category to which the UGC refers or the category of the product to which the UGC refers, if applicable. Unique within the client's product feed
                    "rootCategoryId" : null, // String - Client-centric category ID of the root category relative to the category identified by the 'categoryId' property value. Unique within the client's product feed
                    "brand" : null, // String - Client-centric brand name of the product to which this UGC refers, if available
                    "ucProductId" : null, // String - BV universal catalog unique product ID. See 'productId'. Optional until the universal catalog is complete
                    "ucCategoryId" : null, // String - BV universal catalog unique category ID, if applicable. See 'categoryId'.
                    "ucRootCategoryId" : null, // String - BV universal catalog unique category ID of the root category relative to the category identified by the 'ucCategoryId' property value
                    "ucBrandId" : null, // String - BV universal catalog unique canonical brand ID to which the canonicalized product to which this UGC refers belongs, if available
                    "bvProduct" : null, // Enumeration - Bazaarvoice 'sku' of the SaaS product that generated the event (AskAndAnswer, Profiles, Stories, RatingsAndReviews).
                }, options);

                // create feature data object
                var data = {
                    type: settings["type"].slice(0,1).toUpperCase() + settings["type"].slice(1).toLowerCase(),
                    name : settings["name"],

                    detail1 : settings["detail1"],
                    detail2 : settings["detail2"],

                    quantity : content["Results"].length || settings["quantity"],
                    elapsedMs : settings["elapsedMs"],
                    interaction : settings["interaction"],
                    campaignId   : settings["campaignId"],
                    component : settings["component"],
                    location : settings["location"],
                    contentType : settings["contentType"],

                    contentId : content["Id"] || settings["contentId"],
                    productId : bvConfigSDK["productId"] || settings["productId"],
                    categoryId : bvConfigSDK["categoryId"] || settings["categoryId"],
                    rootCategoryId : bvConfigSDK["rootCategoryId"] || settings["rootCategoryId"],
                    brand : bvConfigSDK["brand"] || settings["brand"],
                    ucProductId : settings["ucProductId"],
                    ucCategoryId : settings["ucCategoryId"],
                    ucRootCategoryId : settings["ucRootCategoryId"],
                    ucBrandId : settings["ucBrandId"],
                    bvProduct: settings["bvProduct"],
                }

                // remove unused items from feature data object
                $bvsdk.each(data, function(key, value) {
                    if (value == "" || value == null) {
                        delete data[key];
                    }
                });

                // push feature to magpie batch
                _bvaq.push(["addBatchItem", "Feature", data]);
                
                // if feature is being used, flush batch. not needed for feature seen (loaded)
                if (settings["type"].slice(0,1).toUpperCase() + settings["type"].slice(1).toLowerCase() == "Used") {
                    _bvaq.push(['flushBatch']);
                }

            },

        },

    },

    models : {

        magpie : {

            // _bvaq : _bvaq || [],

            pageTrackContent : {
                "RatingsAndReviews" : {
                    "type" : null, // String - (Product, Category, or Misc)
                    "productId" : null, // String - Client-centric product ID of the product to which this UGC refers, if applicable. Unique within the client's product feed
                    "categoryId" : null, // String - Client-centric category ID of either the category to which the UGC refers or the category of the product to which the UGC refers, if applicable. Unique within the client's product feed
                    // "rootCategoryId" : null, // String - Client-centric category ID of the root category relative to the category identified by the 'categoryId' property value. Unique within the client's product feed
                    "brand" : null, // String - Client-centric brand name of the product to which this UGC refers, if available
                    // "ucProductId" : null, // String - BV universal catalog unique product ID. See 'productId'. Optional until the universal catalog is complete
                    // "ucCategoryId" : null, // String - BV universal catalog unique category ID, if applicable. See 'categoryId'.
                    // "ucRootCategoryId" : null, // String - BV universal catalog unique category ID of the root category relative to the category identified by the 'ucCategoryId' property value
                    // "ucBrandId" : null, // String - BV universal catalog unique canonical brand ID to which the canonicalized product to which this UGC refers belongs, if available
                    "numReviews" : 0, // Number - Number of reviews for this product. Include if this value (even if 0) is shown to user, don't include otherwise.
                    "percentRecommended" : null, // Number - Percentage of users who would recommend this product. The value should be between 0 and 1. Include if this value (even if 0) is shown to user, don't include otherwise.
                    "avgRating" : null, // Number - The average star rating for this product. Include if this value (even if 0) is shown to user, don't include otherwise.
                    "bvProduct" : "RatingsAndReviews", // Enumeration - Bazaarvoice 'sku' of the SaaS product that generated the event (AskAndAnswer, Profiles, Stories, RatingsAndReviews).
                },
                "AskAndAnswer" : {
                    "type" : null, // String - (Product, Category, or Misc)
                    "productId" : null, // String - Client-centric product ID of the product to which this UGC refers, if applicable. Unique within the client's product feed
                    "categoryId" : null, // String - Client-centric category ID of either the category to which the UGC refers or the category of the product to which the UGC refers, if applicable. Unique within the client's product feed
                    // "rootCategoryId" : null, // String - Client-centric category ID of the root category relative to the category identified by the 'categoryId' property value. Unique within the client's product feed
                    "brand" : null, // String - Client-centric brand name of the product to which this UGC refers, if available
                    // "ucProductId" : null, // String - BV universal catalog unique product ID. See 'productId'. Optional until the universal catalog is complete
                    // "ucCategoryId" : null, // String - BV universal catalog unique category ID, if applicable. See 'categoryId'.
                    // "ucRootCategoryId" : null, // String - BV universal catalog unique category ID of the root category relative to the category identified by the 'ucCategoryId' property value
                    // "ucBrandId" : null, // String - BV universal catalog unique canonical brand ID to which the canonicalized product to which this UGC refers belongs, if available
                    "numQuestions" : 0, // Number - Number of questions for this product. Include if this value (even if 0) is shown to user, don't include otherwise.
                    "numAnswers" : 0, // Number - Number of answers for this product. Include if this value (even if 0) is shown to user, don't include otherwise.
                    "bvProduct" : "AskAndAnswer", // Enumeration - Bazaarvoice 'sku' of the SaaS product that generated the event (AskAndAnswer, Profiles, Stories, RatingsAndReviews).
                },
                "Stories" : {
                    "type" : null, // String - (Product, Category, or Misc)
                    "productId" : null, // String - Client-centric product ID of the product to which this UGC refers, if applicable. Unique within the client's product feed
                    "categoryId" : null, // String - Client-centric category ID of either the category to which the UGC refers or the category of the product to which the UGC refers, if applicable. Unique within the client's product feed
                    // "rootCategoryId" : null, // String - Client-centric category ID of the root category relative to the category identified by the 'categoryId' property value. Unique within the client's product feed
                    "brand" : null, // String - Client-centric brand name of the product to which this UGC refers, if available
                    // "ucProductId" : null, // String - BV universal catalog unique product ID. See 'productId'. Optional until the universal catalog is complete
                    // "ucCategoryId" : null, // String - BV universal catalog unique category ID, if applicable. See 'categoryId'.
                    // "ucRootCategoryId" : null, // String - BV universal catalog unique category ID of the root category relative to the category identified by the 'ucCategoryId' property value
                    // "ucBrandId" : null, // String - BV universal catalog unique canonical brand ID to which the canonicalized product to which this UGC refers belongs, if available
                    "numStories" : 0, // Number - Number of answers for this product. Include if this value (even if 0) is shown to user, don't include otherwise.
                    "bvProduct" : "Stories", // Enumeration - Bazaarvoice 'sku' of the SaaS product that generated the event (AskAndAnswer, Profiles, Stories, RatingsAndReviews).
                },
            },

            totalContentDisplayed : {
                "review" : {
                    "total" : 0,
                    "update" : 0,
                },
                "question" : {
                    "total" : 0,
                    "update" : 0,
                },
                "answer" : {
                    "total" : 0,
                    "update" : 0,
                },
                "story" : {
                    "total" : 0,
                    "update" : 0,
                },
            },

        },

    },

});

// $bvsdk.when(
//     $bvsdk.getScript("http://magpie-static.ugc.bazaarvoice.com/magpiejs/2.4/magpie.js")
// ).done(function(){

//     var mptest = {
//         "cl": "Impression",
//         "type": "UGC",
//         "source": "api",
//         "contentType": "Review",
//         "contentId": "conttest1",
//         "subjectType": "Product",
//         "subjectId": "prodtest1",
//         "client": "cssandbox13",
//         // "syndicationSource": "TestCustomer-C2",
//         "visible": true,
//         "numPeers": 10
//     };

//     console.log("mptest", mptest);

//     _bvaq.push(['addBatch', {
//         "cl": "Impression",
//         "type": "UGC",
//         "source": "api",
//         "contentType": "Review",
//         "contentId": "conttest1",
//         "subjectType": "Product",
//         "subjectId": "prodtest1",
//         "client": "cssandbox13",
//         // "syndicationSource": "TestCustomer-C2",
//         "visible": true,
//         "numPeers": 10
//     }]);
// }

/***** GLOBAL MAGPIE VARIABLES *****/

var _bvaq = _bvaq || [];


/***** anonymous tracker hostname *****/
// Sets the hostname to which anonymous events are sent. Events sent to the anonymous tracking server are never associated with the BV third-party cookie.
// You should not ever need to set the anonymous tracking server's hostname explicitly.
// A helper method Tracker#setStaging is provided that makes it easy to switch between production event tracking and staging/test environment event tracking.
// _bvaq.push(['setAnonTrackerHostname', null]);

/***** third party cookie *****/
// bv third party cookie (opt-in by client).
// DO NOT use this option for any EMEA or APAC clients with the exception of Australia and New Zealand which are approved for 3rd party cookie enablement.
// This method has no impact on first party cookies (i.e. brand cookies).
// true = off / false = on
_bvaq.push(['setAnonymous', bvsdk.models.config.defaultMagpieSettings["setAnonymous"]]);

/***** audience *****/
// set audience who can view this app
// public: accessible to the public internet. PRR is an example public application.
// private: accessible to authenticated users (clients and employees). Workbench is an example application with a private audience.
// internal: accessible to BV employees only. The Magpie UI is an example internal only application.
_bvaq.push(['setAudience', bvsdk.models.config.defaultMagpieSettings["setAudience"]]);

/***** brand domain *****/
// Sets the domain on which to set first-party tracking cookies. Two cookies will be set on the specified domain: BVBRANDID and BVBRANDSID.
// BVBRANDID is set to expire in 20 years. This is the persistent ID of the "user". BVBRANDSID is set to expire in 30 minutes. This is used to track user sessions.
// If brandDomain is false, then the first-party cookies will be deleted.
// _bvaq.push(['setBrandDomain', 'clientdomain.com']);  // sets the 1st party cookies
// _bvaq.push(['setBrandDomain', false]);  // clears the 1st party cookies

/***** client name *****/
_bvaq.push(['setClient', bvsdk.models.config.defaultMagpieSettings["setClient"]]);

/***** display code *****/
_bvaq.push(['setDisplay', bvsdk.models.config.defaultMagpieSettings["setDisplay"]]);

/***** environment *****/
// Sets the name of the environment that the app that is sending events is running in. Example environments are: production, staging, qa, local.
// The value is application-specific.
_bvaq.push(['setEnvironment', bvsdk.models.config.defaultMagpieSettings["setEnvironment"]]); // name of the application's environment

/***** event class filter *****/
// The filter will prevent matching classes of events from being transmitted. This is a mechanism to turn off certain types of events without having to actually remove the tracking code that is firing the events.
// Filtering is only supported at the event class level. You may block an entire class (or classes) of events.
// _bvaq.push(['setEventClassFilter', 'PageView|SCI']);  // prevent PageView and SCI events from being sent
// _bvaq.push(['setEventClassFilter', 'P.*']);  // prevent any events whose class starts with 'P' from being sent
// _bvaq.push(['setEventClassFilter', null]);  // disable a previously installed filter

/***** https *****/
_bvaq.push(['setSecure', bvsdk.models.config.defaultMagpieSettings["setSecure"]]); // set all requests to be transmitted over HTTPS

/***** source *****/
// REQUIRED
_bvaq.push(['setSource', bvsdk.models.config.defaultMagpieSettings["setSource"]]); // name of the source that is sending this event

/***** staging/production *****/
// If staging is true, then tracking and anonymous server hostnames are changed as follows:
// this.setTrackerHostname('network-stg.bazaarvoice.com'); this.setAnonTrackerHostname('network-stg-a.bazaarvoice.com');
// If staging is false, then tracking and anonymus server hostnames are not changed.
if (bvsdk.models.config.production) {
    _bvaq.push(['setStaging', false]); // send events to magpie's production event collectors
} else {
    _bvaq.push(['setStaging', true]); // send events to magpie's staging event collectors
}

/***** tracker hostname *****/
// Sets the hostname of the server to which tracked events are sent.
// Events sent to the tracking server will cause the BV third-party cookie to be set (if it is not already).
// Requests will only be sent to this server if third-party tracking is enabled Tracker#setAnonymous.
// You should not ever need to set the tracking server's hostname explicitly.
// A helper method Tracker#setStaging is provided that makes it easy to switch between production event tracking and staging/test environment event tracking.
// _bvaq.push(['setTrackerHostname', '']);





/***** validation mode *****/
// enable validation mode (for testing only - no collection will occur while enabled)
if (bvsdk.models.config.defaultMagpieSettings["enableValidation"]) {
    _bvaq.push(['enableValidation', function(resp, event) {
        if (resp.error) {
            alert("Bad event: " + resp.message);
        }
    }]);
}
// disable validation mode (collection will occur if disabled)
// _bvaq.push(['disableValidation', function(resp, event) {
//     if (resp.error) {
//         alert("Bad event: " + resp.message);
//     }
// }]);




/***** track event *****/
// Sends an event of the specified class to magpie.
// If an event class filter (Tracker#setEventClassFilter) has been specified, then the event will not be sent if cl matches the filter.
// If cl starts with 'PII' (case insensitive), then the event is considered to contain PII data. Independent of the current configuration settings, then the event will be transmitted over HTTPS to the anonymous event collection server (i.e. it will not be associated with the third-party cookie).
// data contains the event fields that will be transmitted. trackEvent will add a cl property to data and set it equal to the cl parameter. Any fields in data that are objects or arrays will be rison encoded before transmission. All other fields will be rison quoted. For more information on rison, see Rison.
// Events are transmitted asynchronously.

// // Send a basic impression event for a single review
// _bvaq.push(['trackEvent', 'Impression', {contentType: 'Review', contentId: 'revId1234', subjectType: 'product', subjectId: 'pid1234'}]);
// // Send an event containing PII (i.e. email address)
// _bvaq.push(['trackEvent', 'PIIEmail', {email: 'test@test.com', type: 'Open'}]);
// // Send an event with fields that are a complex type (i.e. objects and arrays).
// _bvaq.push(['trackEvent', 'MyClass', {type: 'Test', obj: {f1: 1, f2: {deeply: 'nested'}}, array: [1,2,3,4]}]);


/***** track pageview *****/
// Track a single page view.
// trackPageView is an extension of the generic Tracker#trackEvent method. The event class is set to PageView. Additionally, various browser stats will be added to data (see BrowserStats for details).
// If timing data is enabled (see Tracker#enableTiming), then timing information is added to data as a field named t.
// trackPageView calls Tracker#trackEvent to actually transmit the event. All comments for trackEvent apply to trackPageView as well.

// _bvaq.push(['trackPageView']); // track basic PageView with no additional fields
// _bvaq.push(['trackPageView', {pageName: 'Dashboard'}]);  // send an additional field along with the PageView






// var startMs = // <-- time when the user initiated the sort
// _bvaq.push(['trackEvent', 'Feature', {
//     type: 'Used',
//     location: 'BrandHomePage',
//     component: 'PromoUnit_150x150',
//     name: 'sort',
//     detail1: 'averageRating',
//     detail2: 'ascending',
//     contextContentType: 'Review',
//     // elapsedMs: new Date().getTime() - startMs // <-- conveys the response time of the 'sort' feature
// }]);

// Track this page view as a 'Misc' view of the named page.
// _bvaq.push(["trackPageView", {
//     type: "Misc",
//     pageName: "MyAwesomePage",
//     // userName: "usertest"
//     categoryId: "test-cat",
//     // rootCategoryId: "CAT22354"
// }]);

// Personally Identifiable Info (PII) event (is this really needed?)
// _bvaq.push(['trackEvent', 'PIIData', {type: 'Email', email: 'bob@test.com'}]);





/***** track conversion *****/
// Tracks a Conversion event. Conversions are intended to signal the completion of some goal such as a purchase, use of a store locator, etc.
// Conversion events are sent by the ROI Beacon. Conversion events are treated specially in that they are expected to contain PII data (since they are used by ROI Beacon to power feedless PIE). As such, Conversion events have a whitelist of fields that are not considered to contain PII (see the ROI Beacon link above for details on whitelisted fields).
// If data contains a field that is not whitelisted, then the field is assumed to contain PII data. This will cause two Conversion events to be transmitted. The first event will be an event of class PIIConversion that contains all of the fields in data. The second event will be of event class Conversion and will only contain the whitelisted fields from data.
// trackConversion calls Tracker#trackEvent to actually transmit the event. All comments for trackEvent apply to trackConversion as well

// var conversion = {
//     type: "Transaction",
//     orderId: "55555",
//     tax: "1.44",
//     shipping: "10.00",
//     total: "40.84",
//     city: "Austin",
//     state: "TX",
//     country: "USA",
//     currency: "USD",
//     locale: "en_US",
//     items: [{
//         sku: "2245",
//         name: "product name",
//         category: "category name",
//         price: "13.42",
//         imageURL: "http://product/Image/URL/1",
//         quantity: "1"
//     }, {
//         sku: "2245",
//         name: "product name",
//         category: "category name",
//         price: "13.42",
//         quantity: "1"
//     }],
//     userId: "7448dc2"
// }
// // Two events will be transmitted.  The `PIIConversion` event
// // will contain all of the fields shown above.  The `Conversion`
// // event will contain all fields except for `userId`.  `userId` is
// // not whitelisted, so it will be excluded from the `Conversion` event.
// _bvaq.push(['trackConversion', conversion]);

