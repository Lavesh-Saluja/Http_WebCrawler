function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => b[1] - a[1]);
    return pagesArr;
}

function printReport(pages) {
    console.log('==========')
  console.log('REPORT')
  console.log('==========')
    const sortedPages = sortPages(pages);
    console.log(`Found ${sortedPages.length} pages:`);
    for (const page of sortedPages) {
        console.log(`${page[1]} ${page[0]}`);
    }
}
module.exports = {
  printReport,
  sortPages
}