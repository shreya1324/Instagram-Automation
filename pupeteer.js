let fs = require("fs");
let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let search=process.argv[3];
(async function () {
   
   try{
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", "--disable-notifications"],
        slowMo: 50
    });
    
    let pages = await browser.pages();
    let page = pages[0];
    let data = await fs.promises.readFile(cFile);
    let { user, pwd, url } = JSON.parse(data);
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("input[name=username]", { visible: true });
    await page.type("input[name=username]", user, { delay: 80 });
    await page.type("input[type=password]", pwd, { delay: 80 });
    await Promise.all([
        page.click("button[type=submit]"),
        page.waitForNavigation({ waitUntil: "networkidle2" })
    ]);

    await page.waitForSelector("input[placeholder=Search]", { visible: true, timeout: 0 });
    await page.type("input[placeholder=Search]",search, { delay: 0 });
    await page.waitForSelector(".fuqBx a", { timeout: 0 });
    let allPagesToSearch = await page.$$(".fuqBx a");
    await Promise.all([
        allPagesToSearch[0].click(),
        page.waitForNavigation({ waitUntil: "networkidle2" })
    ]);

    let idx = 0
    while (idx <10) {
        await page.waitForSelector(".ySN3v .Nnq7C.weEfm", { timeout: 0 });
        let rows = await page.$$(".ySN3v .Nnq7C.weEfm");
        let row = rows[idx];

            for (let i = 0; i < 3; i++) {
            await page.waitForSelector(".v1Nh3.kIKUG._bz0w", { timeout: 0 });
            let three_posts = await row.$$(".v1Nh3.kIKUG._bz0w");
            let one_post = three_posts[i];

            await Promise.all([
                one_post.click({ delay: 50 }),
                page.waitForNavigation({ waitUntil: "networkidle2" })
            ]);

            await page.waitForSelector(".fr66n", { visible: true, timeout: 0 });
            await page.click(".fr66n button");
            await page.waitForSelector("svg[aria-label=Close]", { visible: true }, { timeout: 0 });
            await Promise.all([
                page.click("svg[aria-label=Close]"),
                page.waitForNavigation({ waitUntil: "networkidle2" })
            ]);
        }

        
         if (idx < 10) {
             idx++;
           }
        await page.waitForSelector(".Igw0E.IwRSH.YBx95._4EzTm._9qQ0O.ZUqME", { timeout: 0 });
    }
   console.log("work done");
}
catch (err) {
    console.log(err)
  }
})()

