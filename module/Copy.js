module.exports = async function Copy(id) {

    var createRange = document.createRange();
    createRange.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(createRange);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

}