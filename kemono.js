(function() {
    // kemono
    chrome.runtime.sendMessage({msg: 'getDisabled'}, function(response) {
        if (!response.disabled) {
            replaceImages('img, a, figure, div');
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(function (node) {
                            if (node) {
                                replaceImages('img, a, figure, div', node);
                            }
                        });
                    }
                });
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    });
})();

function replaceImages(selector, node) {
    var objects;
    if (node) {
        if (node.querySelectorAll) {
            objects = [ node, ...node.querySelectorAll(selector) ];
        } else {
            objects = [ node ];
        }
    } else {
        objects = document.querySelectorAll(selector);
    }
    var imagePrefix = 'https://pbs.twimg.com/media/';
    var imageSrcs = [
        'C46fOL7VcAAM4H-.jpg', 'C5cdRXyUoAEQ8HK.jpg', 'C7rkymbVwAAE11F.jpg', 'C7HmZy4VAAETPGR.jpg',
        'C7Hmew-UwAEOBox.jpg', 'C6ispvmVwAAKLvZ.jpg', 'C6issRcV0AIXjll.jpg', 'C5-jiooUsAAmOJy.jpg',
        'C5-jlo2UYAAIVcT.jpg', 'C5atYAoUwAAoEBz.jpg', 'C5atflpUYAADBbS.jpg', 'C5atg0BUoAA_zNu.jpg',
        'C42iwUAUoAAY8HV.jpg', 'C42iyZtUcAAof4R.jpg', 'C42i0tqUEAEOffq.jpg', 'C4nf2a-VcAMGy-3.jpg',
        'C3t7WvCVcAAsBoo.jpg', 'C3t7a5LVYAAl2Kd.jpg', 'C3KH9iQVMAIIgda.jpg', 'C2h5KX4UcAID-Fe.jpg',
        'C2h5WoJUcAA-qF_.jpg', 'C2h5XxQUQAALHkl.jpg', 'C7HmdfMV0AARKV5.jpg', 'C7HmfteVwAARQPd.jpg',
        'C6isrAgU8AMoyOI.jpg', 'C6istZoVsAAu6-b.jpg', 'C5-jhrYU4AIF92w.jpg', 'C5-jjhqVMAAKEmx.jpg',
        'C5atahqUoAAtgXX.jpg', 'C5W4dj2VYAE6Zmi.jpg', 'C42i2F9UYAA5O47.jpg', 'C4Sf2yrUkAAOKAh.jpg',
        'C4Sf2yuVYAAjLo1.jpg', 'C4Sf2yoUoAA0mgW.jpg', 'C4SgCzyVcAAdOXz.jpg', 'C3t7Y8EUkAAoQfW.jpg',
        'C3t7a5JUYAA9B7r.jpg', 'C3KH7vZUMAAXV13.jpg', 'C3KH9iRVcAAi6Bd.jpg', 'C3KH9iRVYAc-lh5.jpg',
        'C3Gjis2VYAEVgY_.jpg', 'C3Gjn9_UMAAdHEr.jpg', 'C3Gj6RJVYAAglcP.jpg', 'C3Gj841VMAA5D0c.jpg',
        'C2h5VHZUcAAHR6j.jpg', 'C2B3A6xUAAEKTb6.jpg', 'C2B3DkwUkAE9vnB.jpg', 'C2B3DkxVEAQhmwl.jpg',
        'C2B3HBZUkAAEF3B.jpg'
    ];
    for (var i = 0; i < objects.length; i++) {
        var imgSrc = imagePrefix + imageSrcs[Math.floor(Math.random()*imageSrcs.length)];
        var object = objects[i];
        if (object.src && 'IMG' === object.tagName) {
            if (object.srcset) {
                object.srcset = imgSrc;
            }
            if (object.getAttribute('ori-src')) {
                object.setAttribute('ori-src', imgSrc);
            }
            if (object.getAttribute('data-original')) {
                object.setAttribute('data-original', imgSrc);
            }
            if (object.style) {
                if (!object.outerHTML.match('width=')) {
                    if (object.clientWidth > 1) {
                        object.style.width = object.clientWidth + 'px';
                    } else {
                        if (!object.style.width) {
                            object.style.maxWidth = '100%';
                        }
                    }
                }
                if (!object.outerHTML.match('height=')) {
                    if (object.clientHeight > 1) {
                        object.style.height = object.clientHeight + 'px';
                    } else {
                        if (!object.style.height) {
                            object.style.height = 'auto';
                        }
                    }
                }
                if (!object.style.objectFit) {
                    object.style.objectFit = 'cover';
                }
            }
            object.src = imgSrc;
        } else if (object.style && undefined !== object.style.backgroundImage && '' !== object.style.backgroundImage) {
            object.style.backgroundImage = "url('" + imgSrc + "')";
            object.style.backgroundPosition = 'center';
        }
    }
}
