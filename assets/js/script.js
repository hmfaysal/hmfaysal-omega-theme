/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function () {

        // Tooltip init
        tooltipInit();

        // Init the posts
        postInit();

        // Waypoints
        waypointsInit();

    });

    // Init waypoints for header and footer animations
    function waypointsInit() {

        var headerWaypoint = new Waypoint({
            element: document.getElementById('masthead'),
            handler: function (direction) {
                if (direction === 'down')
                    this.element.classList.remove('animation-on');
                else
                    this.element.classList.add('animation-on');
            },
            offset: -5
        });

        var footerWaypoint = new Waypoint({
            element: document.getElementById('footer'),
            handler: function (direction) {
                this.element.classList.toggle('animation-on');
            },
            offset: 'bottom-in-view'
        });

    }

    // Init bootstrap tooltip
    function tooltipInit() {
        $('[data-toggle]').tooltip();
    }

    function postInit() {
        // Set lead paragraphs
        $('.post-body p:first-child').addClass('lead');

        // Set feature image
        var featured = $('.featured-image').find('img').attr('src');
        if (featured) {
            $('#masthead').css('backgroundImage', 'url(' + featured + ')');
            $('#footer').css('backgroundImage', 'url(' + featured + ')');
        };
    }

} (jQuery));

