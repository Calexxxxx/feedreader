/**
 * feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/**
 * We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /**
     * @description - This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', () => {
        // array of keys in allFeeds
        let expected = ['name', 'url', 'id'];

        /**
         * @description - checks if allFeeds is defined and is not empty
         */
        it('has ALLFEEDS defined and ALLFEEDS is not empty', () => {
            // is defined
            expect(allFeeds).toBeDefined();

            // is not empty
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * @description - loops over all feeds in the allFeeds array and checks if url
         * is defined and if url is not empty.
         */
        it('has a URL defined and that the URL is not empty', () => {
            // loop over allFeeds
            for(let i = 0; i < allFeeds.length; i++) {
                // check if allFeeds keys contain 'url'
                expect(Object.keys(allFeeds[i])).toContain(expected[1]);

                // check if allFeeds url is not empty
                expect(allFeeds[i]).not.toEqual(jasmine.objectContaining({url:''}));
            }
        });

        /**
         * @description - loops over all feeds in the allFeeds array and checks if
         * name is defined and if name is not empty.
         */
        it('has a NAME defined and that the NAME is not empty', () => {
            // loop over allFeeds
            for(let i = 0; i < allFeeds.length; i++) {
                // check if allFeeds keys contain 'name'
                expect(Object.keys(allFeeds[i])).toContain(expected[0]);

                // check if allFeeds name is not empty
                expect(allFeeds[i]).not.toEqual(jasmine.objectContaining({name:''}));
            }
        });
    });


    /**
     * @Description - Test the menu to be hidden by default and toggle the
     * menu-hidden class when clicking the menu-icon-link
     */
    describe('The menu', () => {
        // body and menu variables
        let body, menu;

        /**
         * @description - assing the elements to the variables
         */
        beforeEach(() => {
            body = $(document.body);
            menu = $('.menu-icon-link');
        });

        /**
         * @description - check if the menu-hidden class is on the body element by
         * default
         */
        it('should be hidden by default', () => expect((body).hasClass('menu-hidden')).toBe(true));

        /**
         * @description - check if the menu click remove the menu-hidden class
         * from the body and adds it back on the second click
         */
        it('should show the menu and hide the menu when menu icon is clicked', () => {
            // first click
            menu.click();
            // menu-hidden should be remove
            expect((body).hasClass('menu-hidden')).toBe(false);

            // second click
            menu.click();
            // menu-hidden should be added back
            expect((body).hasClass('menu-hidden')).toBe(true);
        });
    });

    /**
     * @description - Test the entries
     */
    describe('Initial Entries', () => {
        // feed cointainer variable
        let feedContainer;

        /**
         * @description - assign .feed and .entry class to feedContainer
         * @param {boolean} done - used to check if the entries are loaded
         * @async
         * @function loadFeed
         */
        beforeEach((done) => {
            // add class names
            feedContainer = '.feed .entry';
            // call loadfeed
            loadFeed(0, done);
        });

        /**
         * @description - check if there is at least one entry in the feedList
         * @param {boolean} done - used to check if the entries are loaded
         * @async
         * @function done
         */
        it('has at least 1 entry in the feed', (done) => {
            // check if feed length is greater than 0 so not empty
            expect($(feedContainer).length).toBeGreaterThan(0);
            // done
            done();
        });

    });

    /**
     * @description - Test if feed changes correctly
     */
    describe('New Feed Selection', () => {
        // oldfeed and newfeed variable
        let oldFeed, newFeed;

        /**
         * @description - assign old feed to the oldFeed variable and the new feed to the newFeed variable
         * @param {boolean} done - used to check if the entries are loaded
         * @async
         * @function loadFeed
         */
        beforeEach((done) => {
            loadFeed(0, () => {
                oldFeed = ($('.feed').html());
                loadFeed(1, () => {
                    newFeed = ($('.feed').html());
                    done();
                });
            });
        });

        /**
         * @description - check if the old feed does not match the new feed
         * @param {boolean} done - used to check if the entries are loaded
         * @async
         * @function loadFeed
         */
        it('should should change the feed when a new feed is loaded', (done) => {
            expect(oldFeed).not.toEqual(newFeed);
            done();
        });
    });

}());
