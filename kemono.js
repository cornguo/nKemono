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
    var imageSrcs = [
        'https://pbs.twimg.com/media/C46fOL7VcAAM4H-.jpg',
        'https://pbs.twimg.com/media/C5cdRXyUoAEQ8HK.jpg',
        'https://pbs.twimg.com/media/C7rkymbVwAAE11F.jpg',
        'https://pbs.twimg.com/media/C7HmZy4VAAETPGR.jpg',
        'https://pbs.twimg.com/media/C7Hmew-UwAEOBox.jpg',
        'https://pbs.twimg.com/media/C6ispvmVwAAKLvZ.jpg',
        'https://pbs.twimg.com/media/C6issRcV0AIXjll.jpg',
        'https://pbs.twimg.com/media/C5-jiooUsAAmOJy.jpg',
        'https://pbs.twimg.com/media/C5-jlo2UYAAIVcT.jpg',
        'https://pbs.twimg.com/media/C5atYAoUwAAoEBz.jpg',
        'https://pbs.twimg.com/media/C5atflpUYAADBbS.jpg',
        'https://pbs.twimg.com/media/C5atg0BUoAA_zNu.jpg',
        'https://pbs.twimg.com/media/C42iwUAUoAAY8HV.jpg',
        'https://pbs.twimg.com/media/C42iyZtUcAAof4R.jpg',
        'https://pbs.twimg.com/media/C42i0tqUEAEOffq.jpg',
        'https://pbs.twimg.com/media/C4nf2a-VcAMGy-3.jpg',
        'https://pbs.twimg.com/media/C3t7WvCVcAAsBoo.jpg',
        'https://pbs.twimg.com/media/C3t7a5LVYAAl2Kd.jpg',
        'https://pbs.twimg.com/media/C3KH9iQVMAIIgda.jpg',
        'https://pbs.twimg.com/media/C2h5KX4UcAID-Fe.jpg',
        'https://pbs.twimg.com/media/C2h5WoJUcAA-qF_.jpg',
        'https://pbs.twimg.com/media/C2h5XxQUQAALHkl.jpg',
        'https://pbs.twimg.com/media/C7HmdfMV0AARKV5.jpg',
        'https://pbs.twimg.com/media/C7HmfteVwAARQPd.jpg',
        'https://pbs.twimg.com/media/C6isrAgU8AMoyOI.jpg',
        'https://pbs.twimg.com/media/C6istZoVsAAu6-b.jpg',
        'https://pbs.twimg.com/media/C5-jhrYU4AIF92w.jpg',
        'https://pbs.twimg.com/media/C5-jjhqVMAAKEmx.jpg',
        'https://pbs.twimg.com/media/C5atahqUoAAtgXX.jpg',
        'https://pbs.twimg.com/media/C5W4dj2VYAE6Zmi.jpg',
        'https://pbs.twimg.com/media/C42i2F9UYAA5O47.jpg',
        'https://pbs.twimg.com/media/C4Sf2yrUkAAOKAh.jpg',
        'https://pbs.twimg.com/media/C4Sf2yuVYAAjLo1.jpg',
        'https://pbs.twimg.com/media/C4Sf2yoUoAA0mgW.jpg',
        'https://pbs.twimg.com/media/C4SgCzyVcAAdOXz.jpg',
        'https://pbs.twimg.com/media/C3t7Y8EUkAAoQfW.jpg',
        'https://pbs.twimg.com/media/C3t7a5JUYAA9B7r.jpg',
        'https://pbs.twimg.com/media/C3KH7vZUMAAXV13.jpg',
        'https://pbs.twimg.com/media/C3KH9iRVcAAi6Bd.jpg',
        'https://pbs.twimg.com/media/C3KH9iRVYAc-lh5.jpg',
        'https://pbs.twimg.com/media/C3Gjis2VYAEVgY_.jpg',
        'https://pbs.twimg.com/media/C3Gjn9_UMAAdHEr.jpg',
        'https://pbs.twimg.com/media/C3Gj6RJVYAAglcP.jpg',
        'https://pbs.twimg.com/media/C3Gj841VMAA5D0c.jpg',
        'https://pbs.twimg.com/media/C2h5VHZUcAAHR6j.jpg',
        'https://pbs.twimg.com/media/C2B3A6xUAAEKTb6.jpg',
        'https://pbs.twimg.com/media/C2B3DkwUkAE9vnB.jpg',
        'https://pbs.twimg.com/media/C2B3DkxVEAQhmwl.jpg',
        'https://pbs.twimg.com/media/C2B3HBZUkAAEF3B.jpg'
    ];
    for (var i = 0; i < objects.length; i++) {
        var imgSrc = imageSrcs[Math.floor(Math.random()*imageSrcs.length)];
        var object = objects[i];
        if (object.src && 'IMG' === object.tagName) {
            if (object.srcset) {
                object.srcset = imgSrc;
            }
            if (object.style) {
                if (!object.outerHTML.match('width=')) {
                    if (object.clientWidth > 0) {
                        object.style.width = object.clientWidth + 'px';
                    } else {
                        if (!object.style.width) {
                            object.style.maxWidth = '100%';
                        }
                    }
                }
                if (!object.outerHTML.match('height=')) {
                    if (object.clientHeight > 0) {
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
