var varify=function verifyWebsitMember(str, callback) {
    var isTrue = false;
    if (str != undefined) {
        if(str == '147852') {
            isTrue='true';
        } else {
            var isTrue = false;
        }
        callback(isTrue);
    }
}
module.exports = varify;