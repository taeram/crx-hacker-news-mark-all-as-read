chrome.extension.sendMessage({module: "page", action: "is_loaded"}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            // Add a Mark All as Read link to the footer, so we can mark links
            // as read on the very last page where there is no "More" link
            $('.yclinks').append(' | <span class="mark-all-as-read" style="cursor: pointer">Mark All as Read</span>')

            var mr = new MarkAsRead();
            mr.initialize();
        }
    }, 10);
});


/**
* The Mark as Read module
*/
function MarkAsRead() {

    /**
    * Setup the module
    */
    this.initialize = function (markAsReadOnNext) {
        // Add the "Mark All as Read" link
        var markAllAsReadLink = $('#more a, .yclinks .mark-all-as-read');
        $(markAllAsReadLink).on('click', function (e) {
            var urls = $('a[href]');
            for (var i=0; i < urls.length; i++) {
                var url = $(urls[i]).attr('href');
                chrome.runtime.sendMessage({
                    module: "mark-as-read",
                    url: this.relativeToAbsolute(url)
                });
            }
        }.bind(this));
    };

    /**
    * Convert a relative url to an absolute url
    *
    * @param string url The url
    *
    * @return string
    */
    this.relativeToAbsolute = function (url) {
        if (!url.match(/:\/\//)) {
            var prepend = '';
            if (!url.match(/^\//)) {
                prepend = '/';
            }

            url = window.location.origin + prepend + url;
        }
        return url;
    };

}
