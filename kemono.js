(function() {
    // kemono
    chrome.runtime.sendMessage({msg: "getDisabled"}, function(response) {
        if (!response.disabled) {
            replaceImages('img');
            replaceImages('a');
            replaceImages('figure');
            replaceImages('div');
        }
    });
})();

function replaceImages(tagName) {
    objects = document.getElementsByTagName(tagName);
    var imageSrcs = [
        "https://pbs.twimg.com/media/C46fOL7VcAAM4H-.jpg",
        "https://pbs.twimg.com/media/C5cdRXyUoAEQ8HK.jpg",
        "https://pbs.twimg.com/media/C7rkymbVwAAE11F.jpg",
        "https://pbs.twimg.com/media/C7HmZy4VAAETPGR.jpg",
        "https://pbs.twimg.com/media/C7Hmew-UwAEOBox.jpg",
        "https://pbs.twimg.com/media/C6ispvmVwAAKLvZ.jpg",
        "https://pbs.twimg.com/media/C6issRcV0AIXjll.jpg",
        "https://pbs.twimg.com/media/C5-jiooUsAAmOJy.jpg",
        "https://pbs.twimg.com/media/C5-jlo2UYAAIVcT.jpg",
        "https://pbs.twimg.com/media/C5atYAoUwAAoEBz.jpg",
        "https://pbs.twimg.com/media/C5atflpUYAADBbS.jpg",
        "https://pbs.twimg.com/media/C5atg0BUoAA_zNu.jpg",
        "https://pbs.twimg.com/media/C42iwUAUoAAY8HV.jpg",
        "https://pbs.twimg.com/media/C42iyZtUcAAof4R.jpg",
        "https://pbs.twimg.com/media/C42i0tqUEAEOffq.jpg",
        "https://pbs.twimg.com/media/C4nf2a-VcAMGy-3.jpg",
        "https://pbs.twimg.com/media/C3t7WvCVcAAsBoo.jpg",
        "https://pbs.twimg.com/media/C3t7a5LVYAAl2Kd.jpg",
        "https://pbs.twimg.com/media/C3KH9iQVMAIIgda.jpg",
        "https://pbs.twimg.com/media/C2h5KX4UcAID-Fe.jpg",
        "https://pbs.twimg.com/media/C2h5WoJUcAA-qF_.jpg",
        "https://pbs.twimg.com/media/C2h5XxQUQAALHkl.jpg"
    ];
    for (var i = 0; i < objects.length; i++) {
        var imgSrc = imageSrcs[Math.floor(Math.random()*imageSrcs.length)];
        object = objects[i];
        if (object.src) {
            if (object.srcset) {
                object.srcset = imgSrc;
            }
            if (!object.outerHTML.match('width=')) {
                if (object.offsetWidth > 0) {
                    object.style.width = object.offsetWidth + 'px';
                } else {
                    object.style.width = '100%';
                }
            }
            if (!object.outerHTML.match('height=')) {
                if (object.offsetHeight > 0) {
                    object.style.height = object.offsetHeight + 'px';
                } else {
                    object.style.height = 'auto';
                }
            }
            object.style.objectFit = 'cover';
            object.src = imgSrc;
        } else if (undefined !== object.style.backgroundImage && '' !== object.style.backgroundImage) {
            object.style.backgroundImage = "url('" + imgSrc + "')";
            object.style.backgroundPosition = 'center';
        }
    }
}