module.exports = function barWindow(ipcRenderer) {

    document.getElementById('closed').addEventListener('click', e => ipcRenderer.send('closed'));
    document.getElementById('minimizable').addEventListener('click', e => ipcRenderer.send('minimizable'));
    document.getElementById('minimize').addEventListener('click', e => ipcRenderer.send('minimize'));

}