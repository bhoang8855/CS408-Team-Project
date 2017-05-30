/**
 * Arian Cuellar & Brian Hoang
 * CS408 Group Project
 * Created a Frogger esque game in Javascript
 */

/* ImageLoader.js
 * Eases process of loading image files
 */
(function() {
    var imgCache = {};
    //Image Loader
    //Takes the array containing strings pointing to image locations and loads them
    function loadStart(arr,func) {
            var readyC = [];
            arr.forEach(function(location) {
                if(imgCache[location])
                    return imgCache[location];
                var image = new Image();
                image.onload = function() {
                    imgCache[location] = image;
                    var ready = true;
                    for(var i in imgCache) {
                        if(imgCache.hasOwnProperty(i) && !imgCache[i]) {
                            ready = false;
                            break;
                        }
                    }
                    if(ready) {
                        readyC.forEach(function(func) {
                            func();
                        });
                    }
                };

                imgCache[location] = false;
                image.src = location;
            });

            readyC.push(func);
    }
    //Grabs images that have already been cached
    function getImage(location) {
        return imgCache[location];
    }
    //Defins what is publicly accessible
    window.Resources = {
        loadStart: loadStart,
        getImage: getImage,
    };
})();
