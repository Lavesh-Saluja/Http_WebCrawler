function normalizeURL(url) {
    const urlObj = new URL(url);
    const hasPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hasPath.length > 0 && hasPath.slice(-1) === '/')
        return hasPath.slice(0, hasPath.length-1);
    return hasPath;
}

module.exports = {normalizeURL};