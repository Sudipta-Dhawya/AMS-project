

export function saveUserCredential(userDetails) {
    if (userDetails !== null) {
        let key = "admin_key";
        let value = JSON.stringify(userDetails);
        localStorage.setItem(key, value);
    }

}
export function getUserCredential() {
    let key = "admin_key";
    let userVal = localStorage.getItem(key);
    if (userVal === null) {
        return null;
    }
    let userDetails = userVal;
    return JSON.parse(userDetails);
}
export function getCurrentUserProfileSeq() {
    let userDetails = getUserCredential();

    if (userDetails !== null) {
        if (userDetails._profile_seq.length !== 0) {
            return userDetails._profile_seq;
        }
    }
    return -1;

}
export function getUserParticularDetails(detailsType) {
    let userDetails = getUserCredential();
    if (userDetails !== null) {
        if (userDetails.hasOwnProperty(detailsType)) {
            return userDetails[detailsType];
        }
    }
    return "";
}
export function changeUserCredential(changeValueArray) {
    let userDetails = getUserCredential();
    if (userDetails !== null) {
        changeValueArray.map((obj) => {
            userDetails[obj.key] = obj.value;
        });
        saveUserCredential(userDetails);
    }
}
export function removeUserCredential() {
    let key = "admin_key";
    localStorage.removeItem(key)
}
export function setAccessKey(access_key) {
    localStorage.setItem("_access__key", access_key);
}
export function getAccessKey() {
    let accessKey = localStorage.getItem("_access__key");
    return accessKey;
}
export function removeAccessKey() {
    localStorage.removeItem("_access__key")
}
