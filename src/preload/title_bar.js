// menu.js
var titlebarCode = '<header id="titlebar" onmousedown="return false;" onselectstart="return false;">' +
    '<div id="drag-region">' +
    '<div id="window-controls">' +
    '<div id="closed">' +
    '<img class="icon_bar" srcset="../public/icon/closed.png" id="icon_closed_window" draggable="false" />' +
    '</div>' +
    '<div id="minimizable">' +
    '<img class="icon_bar" srcset="../public/icon/minimizable.png" id="icon_minimizable_window" draggable="false" />' +
    '</div>' +
    '<div id="minimize">' +
    '<img class="icon_bar" srcset="../public/icon/minimize.png" id="icon_minimize_window" draggable="false" />' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</header>';

// Example usage:
var titlebarContainer = document.getElementById("titlebar-container");
titlebarContainer.innerHTML = titlebarCode;
