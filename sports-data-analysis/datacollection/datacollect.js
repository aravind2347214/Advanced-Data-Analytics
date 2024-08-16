const puppeteer = require('puppeteer');

async function fetchTeamStatistics() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.uefa.com/euro2024/statistics/teams');

    // Wait for the rows to load
    await page.waitForSelector('.ag-root');

    setTimeout(()=>{

    },5000)


    // Extract the data
    const data = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('.ag-row-odd , .ag-row-even'));
     return rows.map(row => {
            const columns = Array.from(row.querySelectorAll('.ag-cell'));
            return columns.map(column => column.textContent.trim(''));
        });
    });

    await browser.close();
    return data;
}

// Call the function and log the results
fetchTeamStatistics().then(data=>console.log(data)).catch(error => console.error('Error:', error));
