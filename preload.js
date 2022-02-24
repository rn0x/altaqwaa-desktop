const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {

    document.getElementById('min-button').addEventListener("click", event => {
        ipcRenderer.send('minimize')
    });

    document.getElementById('close-button').addEventListener("click", event => {
        ipcRenderer.send('close')
    });
})