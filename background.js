// ref: http://stackoverflow.com/questions/18740932

var disabled = false;

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.browserAction.setPopup({popup: ""});
    if (!disabled) {
        chrome.browserAction.setIcon({path: "icon-off.png"});
        disabled = true;
    } else {
        chrome.browserAction.setIcon({path: "icon.png"});
        disabled = false;
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.msg == "getDisabled") {
        sendResponse({disabled: disabled});
        return true;
    }
});