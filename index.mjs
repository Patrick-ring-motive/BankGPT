import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';
import http from 'http';
import fileFromRequest from './static-files.mjs';
import modifyResponse from './modules/modify-response.mjs';
import modifyRequest from './modules/modify-request.mjs';
import sleep from './modules/sleep.mjs';
import { webscraper, wsPackage } from './modules/webscraper.mjs';
import { parallelCSESends } from './modules/cse-fetch.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import maintain from './modules/auto-maintain.mjs';
import {availReq,availRes} from './modules/availability.mjs';
//cheeseasdfasdfasdf
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let server = http.createServer(availReq(onRequest));


server.listen(3000);

maintain(server);


//fetch('https://grammarly.servleteer.repl.co/'+encodeURIComponent("People don't think it be like it is but it do."));

async function onRequest(req, res) {
 res=availRes(res);
    //console.log(req.url);
    if (req.url == '/ping') {
     // await updateFiles();
      res.statusCode = 200;
      return res.endAvail();
    }
    if (req.url.includes('/vz44blocked?')) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.statusCode = 200;
      return res.endAvail('ok');
    }
    if (req.url.includes('parallelCSESends')) {
      let q = JSON.parse(decodeURIComponent(req.url.split('parallelCSESends?')[1]));
      let ps = await parallelCSESends(q.username, q.query);
      console.log(ps);
      return res.endAvail(ps);
    }

    if ((req.url.includes('cse.js')) || (req.url.includes('cse') && req.url.includes('element') && req.url.includes('v1?'))) {

      res.setHeader('Access-Control-Allow-Origin', '*');
      let cseBdy = await (await fetch('https://cse.google.com' + req.url)).text();
      return res.endAvail(cseBdy);

    }
    let path = req.url.replaceAll('*', '');
    let pat = path.split('?')[0].split('#')[0];

    if (pat === '/chat/') {
      let req_url = req.url;
      if (req.headers['think'] === 'deep') {
        let req_url_list = req_url.split('&content=');
        let reqText = decodeURIComponenet(req_url_list[1].split('&_stream=false')[0]);


        req_url = req_url_list + '&content=' + encodeURIComponent(modifyRequest(reqText)) + '&_stream=false';

      }



      const options = {
        method: 'GET',
        headers: {
          'Accept': 'text/json'
        }
      };

      res.statusCode = 200;
      let resJson = JSON.parse(await (await fetch('https://web-gpt-demo.com/' + req_url, options)).text());
      resJson.response = modifyResponse(resJson.response);
      return res.endAvail(JSON.stringify(resJson));

    }
    if(req.url=='/'||req.url==''){req.url='/index.html';}
    let file = Buffer.from(await(await fetch('https://files-servleteer.vercel.app/bankgpt'+req.url)).arrayBuffer());
    return res.endAvail(file);

}


