const {crawlPage}=require('./crawl')
async function main() {
    if (process.argv.length < 3) {
        console.log("No website Provide");
        process.exit(1);
    }
     if (process.argv.length > 3){
    console.log('too many arguments provided')
     }
    const baseURL = process.argv[2]
    console.log("Starting Crawl...");
    const pages = await crawlPage(baseURL, baseURL, {});
    console.log(pages);
}
main();
