// ref: http://stackoverflow.com/questions/18740932

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.browserAction.setPopup({popup: ''});
    chrome.storage.local.get('disabled', function (data) {
        if (data.hasOwnProperty('disabled')) {
            if (!data.disabled) {
                chrome.browserAction.setIcon({path: 'icon-off.png'});
                chrome.storage.local.set({'disabled': true});
            } else {
                chrome.browserAction.setIcon({path: 'icon.png'});
                chrome.storage.local.set({'disabled': false});
            }
        }
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if ('getDisabled' === request.msg) {
        chrome.storage.local.get('disabled', function (data) {
            if (data.hasOwnProperty('disabled')) {
                if (data.disabled) {
                    chrome.browserAction.setIcon({path: 'icon-off.png'});
                } else {
                    chrome.browserAction.setIcon({path: 'icon.png'});
                }
            } else {
                chrome.storage.local.set({'disabled': false});
            }
            sendResponse(data);
        });
        // note: must return true, otherwise sendResponse() won't work
        return true;
    }
});