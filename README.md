# Puppeteer Spoofer
Replace page requests in Puppeteer


Let's say you are testing some page. And that page loads tons of heavy libs from slow remote server each time. Tedious process, huh? With this module you can respond with content of that libraries, loaded from your local drive. 

In case you have the CORS error, disable web security (at your own risk):
```javascript
puppeteer.launch({ args: [ '--disable-web-security' ] });
```


## Installation
```bash
npm install pptr-spoofer
```



## API

### PptrSpoofer(req, rules)

### req   
**Type**: _Object_   
Page `request` object



### rules   
**Type**: _Array_   
```
[
   {
      rule: '',
      body: '',
      status: 200,
      contentType: 'text/plane'
   }
]
```
- `rule` _String_ or _RegExp_ of the request url that should be replaced
- `body` _String_ or _Buffer_ of the response body content, **Default:** `''`
- `status` _Number_, **Default:** `200`
- `contentType` _String_, **Default:** `'text/plane'`





## Usage
```javascript
const puppeteer = require('puppeteer');
const spoofer = require('pptr-spoofer');

let browser = await puppeteer.launch({ headless: 0, devtools: 1, args: ['--disable-web-security'] });
let pages = await browser.pages();
let page = pages[0];

await page.setRequestInterception(true);
await page.bringToFront();

page.on('request', req => {
   spoofer(req, [
      {
         rule: 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.8.2/pixi.js', 
         body: fs.readFileSync('./libs/pixi.js'),
         status: 200,
         contentType: 'text/plain'
      }
   ]);
});

await page.goto('http://localhost:12345/test', { waitUntil: 'networkidle2', timeout: 45000 });
```



