chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.module == "mark-as-read") {
        chrome.history.getVisits(
            {
                url: request.url
            },
            function (results) {
                if (results.length == 0) {
                    chrome.history.addUrl({
                        url: request.url
                    });
                }
            }
        );
    }

    sendResponse();
});
