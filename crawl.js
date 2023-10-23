const { JSDOM } = require('jsdom');
function normalizeURL(url) {
    const urlObj = new URL(url);
    const hasPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hasPath.length > 0 && hasPath.slice(-1) === '/')
        return hasPath.slice(0, hasPath.length-1);
    return hasPath;
}

function getURLFromHTML(html, baseURL) {
    const urls = [];
    const dom = new JSDOM(html);
    const links = dom.window.document.querySelectorAll('a');
    for (const linkElement of links) {
        if (linkElement.href.slice(0, 1) === '/') {
            //relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                            urls.push(urlObj.href);

            }catch(e){
                console.log(e);
               
            }
        }
        else {
            //absolute
                try {
                const urlObj = new URL(linkElement.href)
                            urls.push(urlObj.href);

            }catch(e){
                console.log(e);
                
            }
        }
    }
    return urls;
}

async function crawlPage(baseURL,currentURL,pages) {
    const currentUrlObj = new URL(currentURL);
    const baseUrlObj = new URL(baseURL);

    if (currentUrlObj.hostname !== baseUrlObj.hostname) {
        return pages;
    }
    const normalizedURL = normalizeURL(currentURL);

    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++;
        return pages;
    }

    pages[normalizedURL] = 1;
console.log(`crawling ${currentURL}`)
    let html = '';
    try {
        const res = await fetch(currentURL);
        if (res.status > 399) {
            console.log(`Error: ${res.status} on page: ${currentURL}`);
            return;
        }

        const contentType = res.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            console.log(`Skipping ${url} due to content-type ${contentType}`);
            return;
        }
         html = (await res.text());
        
    } catch (e) {
        console.log(e.message);
        return;
    }
    
    const nextURLs = getURLFromHTML(html, baseURL);
    for (const nextURL of nextURLs) {
        await crawlPage(baseURL, nextURL, pages);
    }
return pages;
   
    
}
module.exports = {normalizeURL,getURLFromHTML,crawlPage};