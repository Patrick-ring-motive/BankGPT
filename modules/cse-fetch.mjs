
import sleep from './sleep.mjs';



let cx = '324ddee4f04a04062';
let cxurl = 'https://cse.google.com/cse.js?hpg=1&cx=' + cx;

let script_raw = await fetchText(cxurl);

let cse_tok = JSONExtract(script_raw, "cse_token");


let serialize = (obj) => {
  return Object.keys(obj).map(key => {
    return [
      encodeURIComponent(key),
      encodeURIComponent(obj[key])
    ].join('=');
  }).join('&');
}



async function cseFetch(query) {





  let cse_url = 'https://cse.google.com/cse/element/v1?rsz=filtered_cse&num=7&hl=en&source=gcsc&gss=.com&cx=' + cx + '&q=' + encodeURIComponent(query) + '&safe=off&cse_tok=' + cse_tok + '&lr=&cr=&gl=&filter=1&sort=&as_oq=&as_sitesearch=&exp=csqr,cc&cseclient=hosted-page-client&callback=google.search.cse.api';

  let preslice = (await fetchText(cse_url)).split('google.search.cse.api(')[1];


  let cse_res = tryJSONRu(preslice.slice(0, preslice.length - 2));


  let text = '';
  const results = cse_res;
  const results_length = results.length;
  for (let i = 0; i < results_length; i++) {
    text = text + results[i].url + ' ';
    text = text + results[i].contentNoFormatting;
  }
  return text.split('https://');
}


export async function parallelCSESends(username, query) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'text/json,*/*',
      'think': 'shallow'
    }
  };
  let webscrape = [];
  try {
    webscrape = await cseFetch(query);
  } catch (e) { webscrape = []; }
  console.log(webscrape);
  const webscrape_length = webscrape.length;
  let feeder = [];
  for (let i = webscrape_length - 1; i > -1; i--) {
    try {
      let content = 'Additional information {' + webscrape[i] + '}';
      if (content.length > 500) { content = content.replaceAll(' ', '-'); }
      if (content.length > 500) { content = content.replace(/[?!¿¡.,;]/g, '.').replaceAll('"', "'"); }
      if (content.length > 500) { content = content.replace(/[^A-Za-z0-9.'-]/g, '_'); }
      let query = serialize({ username, content, _stream: false });
      
      feeder.push(Promise.race([fetchText(`https://web-gpt-demo.com/chat/?${query}`, options)/*, sleep(2000)*/]));
    } catch (e) { continue; }
  }



  await Promise.all(feeder);

  return 0;
}

async function fetchText(url, options) {
  let txt = "";
  try {
    txt = await (await fetch(url, options)).text();
  } catch (e) {
    txt = e.message;
  }
  return txt;
}


function JSONExtract(raw, key) {

  let json_key = '"' + key + '"';
  let json_val = raw.split(json_key)[1].split('"')[1];

  return json_val;


}

