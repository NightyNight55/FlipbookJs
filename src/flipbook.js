// =============================================
// FlipBook Control
// Version: 1.0
// Dependencies: jQuery
// =============================================

const controlName = 'FlipBook';
const version = 'v1.0';
var isDebug = true;

var config = { };
var index = 0;

// =============================================
// FlipBook Control
// =============================================

var FlipBook = function ($containerElement) {
    var initialize = function() {
        var configObject = $containerElement[0].dataset.config;
    
        if(configObject === undefined) {
            console.log('>> [' + controlName + '] Error: No configuration supplied.');
            return false;
        }

        try {
            config = eval(configObject);
        } catch { 
            console.log('>> [' + controlName + '] Error: No configuration supplied.');
            isFatal = true;
            return false;
        }
        
        return true;
    }

    var initializeToConsole = function () {
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            console.log('%c ' + controlName + ' ' + version + ' ', 'background: #F17B21; color: white;');
        } else {
            console.log('< ' + controlName + ' ' + version + ' >');
        }
    };

    var appendContainer = function () {
        var html = '<div id="flipbook" class="flipbook"><i class="fas fa-cog fa-spin fa-2x"></i></div>';
        $containerElement[0].innerHTML = html;
    }

    var loadImages = function() {
        setInterval(renderFrame, config.delay);        
    }

    var renderFrame = function() {
        var container = $('.flipbook');
        var imgSrc = config.images[index];
        container[0].innerHTML = '<img src="' + imgSrc + '"/>';
        index++;
        if(index > config.images.length - 1) {
            index = 0;
        }

    }

    // =============================================
    // Constructor
    // =============================================
    if(!initialize()) return;

    initializeToConsole();
    appendContainer();
    
    loadImages();
}

// =============================================
// Utility Functions
// =============================================

// =============================================
// jQuery Interface
// =============================================

$(function () {
    $('.flipbook').flipbook();
})

jQuery.fn.extend({
    flipbook: function () {
        $('body').append('<script defer src="https://use.fontawesome.com/releases/v5.9.0/js/all.js" crossorigin="anonymous"></script>');

        return this.each(function () {
            new FlipBook($(this));
        });
    }
});

if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}
