void async function Main() {
  await import('/public/js/import/web-gpt-3.js');
  const Ж = 'Ж';



  let blocked = false;
  void async function Init() {

    try {
      await fetch('https://vz44gpt.vz44bank.repl.co/vz44blocked?');
    } catch (e) {
      blocked = true;
    }

    void async function LoadShortCSE() {
      let cx = '324ddee4f04a04062';
      let cxurl = '/cse.js?hpg=1&cx=' + cx;

      let script_raw = await fetchText(cxurl);

      let cse_tok = JSONExtract(script_raw, "cse_token");

      localStorage.setItem('cse_tok', cse_tok);

    }?.();

    void function SendPrimer() {

      document.addEventListener('load', prime);

      prime();

      async function prime() {
        await sleep(3000);
        if (document.primed) { return; }
        document.primed = true;
        let botName = document.querySelector('h3').textContent.trim();
        let nameChange = '';
        let primer = '';
        if (botName.toLowerCase() != 'webgpt') {

          nameChange = ' I would like you to refer to yourself as ' + botName + ' and I may refer to you as ' + botName + ' or some shortened variation of ' + botName + '.';

          primer = '...PRIMER...';

        }

        sendMessageSync(sessionUsername,

          (primer + 'I have some additional parameters that I would like you to follow for the remainder of the chat. I would like for you to refer to me as Member rather than User unless I give you another name. I will refer to Autocode.com as USAA and I would like you to do the same. I would like you to behave as if these specification had always been true and not based on my requesting it. So please do not remind me that I requested these things.')

          , () => { });


      }
    }?.();

  }?.();

  window.sleep = function(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


  function encodeSnippets(code) {
    let codeChunks = code.split('```');
    const codeChunks_length = codeChunks.length;
    for (let i = 1; i < codeChunks_length; i += 2) {

      codeChunks[i] = btoa(codeChunks[i]);

    }
    code = codeChunks.join(btoa('```'));

    let codeBits = code.split('`');
    const codeBits_length = codeBits.length;
    for (let i = 1; i < codeBits_length; i += 2) {

      codeBits[i] = btoa(codeBits[i]);

    }
    code = codeBits.join(btoa('`'));

    return code;
  }

  function decodeSnippets(code) {
    let codeChunks = code.split(btoa('```'));
    const codeChunks_length = codeChunks.length;
    for (let i = 1; i < codeChunks_length; i += 2) {
      try {

        codeChunks[i] = atob(codeChunks[i]);

      } catch (e) { continue; }
    }
    code = codeChunks.join('```');

    let codeBits = code.split(btoa('`'));
    const codeBits_length = codeBits.length;
    for (let i = 1; i < codeBits_length; i += 2) {
      try {

        codeBits[i] = atob(codeBits[i]);

      } catch (e) { continue; }
    }
    code = codeBits.join('`');


    return code;
  }

  function lcws(text1, text2) {/*longest common word subsequence*/
    text1 = text1.toLowerCase().replace(/[^a-z ]/g, ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').split(' ');
    text2 = text2.toLowerCase().replace(/[^a-z ]/g, ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').split(' ');

    const dp = Array(text1.length + 1).fill(0).map(Þ => Array(text2.length + 1).fill(0));
    for (let i = 1; i < dp.length; i++) {
      for (let j = 1; j < dp[i].length; j++) {
        // If the words match, look diagonally to get the max subsequence before this letter and add one
        if (text1[i - 1] == text2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1
        } else {
          // If there is no match, set the cell to the previous current longest subsequence
          dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
        }
      }
    }
    return dp[text1.length][text2.length]
  }

  function isSimilarPhrase(text1, text2) {
    text1 = text1.toLowerCase().replace(/[^a-z ]/g, ' ').replaceAll('  ', ' ').replaceAll('  ', ' ');
    text2 = text2.toLowerCase().replace(/[^a-z ]/g, ' ').replaceAll('  ', ' ').replaceAll('  ', ' ');

    let numerator = lcws(text1, text2);

    let ratio1 = numerator / text1.split(' ').length;

    let ratio2 = numerator / text2.split(' ').length;

    if (Math.max(ratio1, ratio2) >= 0.8) {

      return true;

    } else {

      return false;

    }


  }

  function removeRedundant(passage) {

    let isSentenceModified = false;
    for (let pass = 0; pass < 2; pass++) {
      let mpassage = passage;
      /* let pass_regex = /[?!¿¡]/g;
       if (pass) { pass_regex = /[?!¿¡.,:;]/g; }
       mpassage = mpassage.replace(pass_regex, '.')
         .replaceAll('..', '.')
         .replaceAll('..', '.')
         .replaceAll('  ', ' ')
         .replaceAll('  ', ' ');*/
      mpassage = unpunctuate(mpassage);
      console.log(mpassage);
      let mpass_list = mpassage.split('.');
      console.log(mpass_list);
      const mpass_list_length = mpass_list.length;
      for (let i = 0; i < mpass_list_length; i++) {
        try {
          if ((mpass_list[i].length > 1) && (mpass_list[i].split(' ').length > 3)) {
            for (let x = 0; x < mpass_list_length; x++) {
              try {
                if ((i != x) && (mpass_list[x].length > 1) && (mpass_list[x].split(' ').length > 3) && (mpass_list[i].length > 1) && (mpass_list[i].split(' ').length > 3)) {
                  if (isSimilarPhrase(mpass_list[i], mpass_list[x])) {
                    /* if (mpass_list[i].length < mpass_list[x].length) {
    
                        mpass_list[i] = '';
                        isSentenceModified = true;
                        break;
    
                      } else {  */

                    mpass_list[x] = '';
                    isSentenceModified = true;
                    continue;

                    /*  }  */
                  }
                }
              } catch (e) { continue; }
            }
          }
        } catch (e) { continue; }
      }
      console.log(isSentenceModified);
      if (isSentenceModified) {
        passage = punctuate(mpass_list.join('.'))
          .replaceAll('..', '.')
          .replaceAll('..', '.')
          .replaceAll('  ', ' ')
          .replaceAll('  ', ' ')
          .replaceAll(',.', '.')
          .replaceAll('.,', '.');
      }
    }
    return passage;


  }


  function removeSentence(passage, sentence) {
    let passageList = passage.replaceAll('!', ' !.').replaceAll('?', ' ?.').split('.');
    let passageList_length = passageList.length;
    for (let i = 0; i < passageList_length; i++) {
      if (isSimilarPhrase(passageList[i], sentence)) {
        passageList[i] = '';
      }
    }
    let p = passageList.join('.').replaceAll('..', '.').replaceAll(' ?.', '?').replaceAll(' !.', '!').replaceAll('..', '.');
    if (p[0] == '.') {
      p = p.split('');
      p[0] = '';
      p = p.join('');
    }
    return p;
  }


  function removeSentenceContaining(passage, sentence) {
    let passageList = passage.replaceAll('!', ' !.').replaceAll('?', ' ?.').split('.');
    let passageList_length = passageList.length;
    for (let i = 0; i < passageList_length; i++) {
      if (passageList[i].includes(sentence)) {
        passageList[i] = '';
      }
    }
    let p = passageList.join('.').replaceAll('..', '.').replaceAll(' ?.', '?').replaceAll(' !.', '!').replaceAll('..', '.');
    if (p[0] == '.') {
      p = p.split('');
      p[0] = '';
      p = p.join('');
    }
    return p;
  }

  // Create a Unique UUID for user chat history
  function createUUID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  // Generate session name
  let sessionUsername = `User ${createUUID()}`;

  // Convert object to query parameters
  let serialize = (obj) => {
    return Object.keys(obj).map(key => {
      return [
        encodeURIComponent(key),
        encodeURIComponent(obj[key])
      ].join('=');
    }).join('&');
  }

  // Add a message to the chat
  let createMessage = (role, content) => {
    let messagesEl = document.querySelector('.chat-content');
    let messageEl = document.createElement('div');
    messageEl.classList.add('message');
    messageEl.classList.add(role);
    let contentEl = document.createElement('div');
    contentEl.classList.add('content');
    contentEl.innerText = content;
    messageEl.appendChild(contentEl);
    messagesEl.appendChild(messageEl);
    return {
      messages: messagesEl,
      content: contentEl
    };
  };


  // wait until the whole message is done before printing;
  let sendMessageSync = async (username, content, messageListener) => {
    content = "In the context of USAA, answer the following. " + content + ". Let's work this out in a step by step way to be sure we have the right answer";
    let query = serialize({
      username,
      content,
      _stream: false
    });

    const options = {
      method: 'GET',
      headers: {
        'Accept': 'text/json',
        'think': 'shallow'
      }
    };
    let jmsg = await fetchText(`/chat/?${query}`, options);
    let res = " " + tryJSONRes(jmsg);
    res = res.replace(/usaa/gi, 'Bank');
    res = removeSentence(res, "Let's work this out in a step by step way to be sure we have the right answer");
    res = removeSentenceContaining(res, "step by step");

    res = res.replace(/usaa/gi, 'Bank');
    let res_words = res.split(' ');
    let res_words_length = res_words.length;
    for (let i = 0; i < res_words_length; i++) {
      messageListener(res_words[i] + ' ');
      await sleep(25);
    }

    await formatCode();
    await formatSnip();

    return jmsg;
  }

  function extractTokens(text) {
    let tokens = [];
    let textList = text.split('"');
    const textList_length = textList.length;
    for (let i = 1; i < textList_length; i += 2) {
      try {

        tokens.push('"' + textList[i] + '"');

      } catch (e) { continue; }
    }

    return tokens.join(' OR ');
  }
  async function parallelSends(username, listx) {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'text/json,*/*',
        'think': 'shallow'
      }
    };
    let webscrape = [];
    try {
      webscrape = JSON.parse(await fetchText('/webscraper?' + encodeURIComponent(listx)));
    } catch (e) { webscrape = []; }
    console.log(webscrape);
    const webscrape_length = webscrape.length;
    let feeder = [];
    for (let i = webscrape_length - 1; i > -1; i--) {
      try {
        content = 'Additional information ' + listx + 'part ' + (i + 1) + ' of ' + webscrape_length + ' content:{' + webscrape[i] + '}';

        if (content.length > 500) { content = content.replaceAll(' ', '-'); }
        if (content.length > 500) { content = content.replace(/[?!¿¡.,:;]/g, '.').replaceAll('"', "'"); }
        if (content.length > 500) { content = content.replace(/[^A-Za-z0-9.'-]/g, '_'); }

        let query = serialize({ username, content, _stream: false });
        /* https://web-gpt-demo.com */
        feeder.push(Promise.race([fetchText(`/chat/?${query}`, options), sleep(2000)]));
      } catch (e) { continue; }
    }



    await /*Promise.race([*/Promise.all(feeder)/*,sleep(5000)])*/;

    return 0;
  }
  let analyzeMessageSync = async (username, content, messageListener) => {
    let prompt = content;
    /* content = 'Please provide the exact tokens to enter into a google search bar in order to respond to the prompt {' + content + '}';*/
    let query = serialize({
      username,
      content,
      _stream: false
    });

    const options = {
      method: 'GET',
      headers: {
        'Accept': 'text/json',
        'think': 'shallow'
      }
    };



    let sends = [];
    sends.push(parallelCSESends(username, prompt));
    await Promise.race([Promise.all(sends), sleep(15000)]);
    await sleep(100);
    content = "Using the additional information, answer the following. " + prompt + " {at USAA}. Let's work this out in a step by step way to be sure we have the right answer";

    query = serialize({ username, content, _stream: false });

    let part1 = "";
    let part1_raw = "";

    part1_raw = await fetchText(`/chat/?${query}`, options);
    let json_answer = tryJSONRes(part1_raw);
    part1 = " " + json_answer;


    part1 = part1.split(',');
    if (part1[0].includes('ased on the')) {
      part1[0] = '';
    }

    if (part1[0].includes('ccording to the')) {
      part1[0] = '';
    }

    if (part1[0].includes('d earlier')) {
      part1[0] = '';
    }
    part1 = part1.join(',').trim();
    part1[0] = '';
    content = "expand on your previous response";
    //content = "continue";
    let elab = serialize({ username, content, _stream: false });
    let json_elab = "";
    let elab_raw = "";

    elab_raw = await fetchText(`/chat/?${elab}`, options);

    json_answer = tryJSONRes(elab_raw);
    json_elab = " " + json_answer;


    let part2 = json_elab.split('.');
    const part2_length = part2.length;
    for (let i = 0; i < part2_length; i++) {

      if (part1.includes(part2[i])) {
        part2[i] = '';
      }

    }
    part2 = part2.join('.').replaceAll('..', '.').replaceAll('..', '.');

    let full_msg = part1 + ' ' + part2;
    full_msg = encodeSnippets(full_msg);
    full_msg = removeRedundant(full_msg).replaceAll(' .', '.');
    full_msg = full_msg.replace(/^\.|^,/, '').trim();
    full_msg = full_msg.replaceAll(' {at USAA}', '');
    full_msg = full_msg.replaceAll('information you provided', 'information');
    full_msg = removeSentence(full_msg, "Let's work this out in a step by step way to be sure we have the right answer");
    full_msg = removeSentenceContaining(full_msg, "step by step");
    full_msg = removeSentence(full_msg, 'It looks like I may have accidentally repeated my previous response');
    full_msg = full_msg.replaceAll('I apologize, Member.', '');
    full_msg = full_msg.replaceAll('I apologize, Member,', '');
    full_msg = full_msg.trim().split('');
    const full_msg_length = full_msg.length;
    for (let i = 0; i < full_msg_length; i++) {
      try {
        if ((full_msg[i] == '.') && (full_msg[i + 1] == ' ') && (full_msg[i + 2] == full_msg[i + 2].toLowerCase())) {

          full_msg[i] = ',';

        }

      } catch (e) { continue; }
    }
    full_msg[0] = full_msg[0].toUpperCase();
    full_msg = full_msg.join('')
      .replaceAll(',.', '.')
      .replaceAll('.,', '.');
    full_msg = full_msg.replaceAll('U,', 'US');
    full_msg = decodeSnippets(full_msg);
    full_msg = full_msg.replace(/usaa/gi, 'Bank');

    document.querySelector('[thinking]')?.removeAttribute('thinking');
    let res_words = full_msg.split(' ');
    let res_words_length = res_words.length;
    for (let i = 0; i < res_words_length; i++) {
      messageListener(res_words[i] + ' ');
      await sleep(25);
    }
    await formatCode();
    await formatSnip();
    return full_msg;
  }

  // Prepare the page to handle interaction


  document.addEventListener('load', firstMSG);

  firstMSG();

  async function firstMSG() {
    if (document.fmg) { return; }
    document.fmg = true;
    await sleep(200);
    fixHeight();
    let button = document.querySelector('button#send');
    let deep = document.querySelector('button#deep>span');
    let textarea = document.querySelector('textarea#input');
    let form = document.querySelector('form#chat');
    textarea.addEventListener('keydown', async (e) => {
      if (e.keyCode == 13) {
        if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          form.dispatchEvent(new Event('submit'));
        }
      }
    });
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent reload
      if (!form.hasAttribute('disabled')) {
        let content = textarea.value;
        content = content.trim();
        if (content) {
          form.setAttribute('disabled', '');
          textarea.value = '';
          let response = '';
          let userEls = createMessage('user', content);
          let assistantEls = createMessage('assistant', '');
          assistantEls.messages.scrollTop = assistantEls.messages.scrollHeight;
          await sendMessageSync(sessionUsername, content, (message) => {
            response += message;
            let chunkEl = document.createElement('span');
            chunkEl.classList.add('chunk');
            chunkEl.innerText = message;
            assistantEls.content.appendChild(chunkEl);
            assistantEls.messages.scrollTop = assistantEls.messages.scrollHeight;
          });
          form.removeAttribute('disabled');
        }
      }
    });

    deep.addEventListener('mouseup', async (e) => {
      e.preventDefault(); // Prevent reload
      if (!form.hasAttribute('disabled')) {
        let content = textarea.value;
        content = content.trim();
        if (content) {
          form.setAttribute('disabled', '');
          textarea.value = '';
          let response = '';
          let userEls = createMessage('user', content);
          let assistantEls = createMessage('assistant', '');
          let msgEl = assistantEls.content.parentElement;
          msgEl.setAttribute('thinking', 'Searching');
          assistantEls.messages.scrollTop = assistantEls.messages.scrollHeight;
          processing();
          await analyzeMessageSync(sessionUsername, content, (message) => {
            response += message;
            let chunkEl = document.createElement('span');
            chunkEl.classList.add('chunk');
            chunkEl.innerText = message;
            assistantEls.content.appendChild(chunkEl);
            assistantEls.messages.scrollTop = assistantEls.messages.scrollHeight;
          });
          msgEl.removeAttribute('thinking');
          form.removeAttribute('disabled');
        }
      }
    });

    // Create initial message
    let gpt = 'Bank gpt';

    let assistantEls = createMessage(
      'assistant',
      `Hi there Bank Member! How can I help you today?`
    );
  }

  // iOS resize handler for message input
  if (window.visualViewport) {
    const loadHeight = window.visualViewport.height;
    const resizeHandler = fn => {
      document.body.style.height = window.visualViewport.height.toString() + 'px';
      let headerEl = document.querySelector('.chat-header');
      let messagesEl = document.querySelector('.chat-content');
      if (window.visualViewport.height < loadHeight) {
        headerEl.style.display = 'none';
        messagesEl.scrollTop = messagesEl.scrollHeight;
      } else {
        headerEl.style.display = '';
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }
    }
    window.visualViewport.addEventListener('resize', resizeHandler);
  }

  //reformat code to look a little nicer
  async function formatCode() {
    let gpt_msgs = document.querySelectorAll('div.message.assistant>div.content');
    let last_msg = gpt_msgs[gpt_msgs.length - 1];
    let txt = last_msg.innerHTML.toString();
    if (txt.indexOf('```') > -1) {

      txt = txt.replace('```', '<pre><code><span>').replace('```', '</span></code></pre>');


      last_msg.innerHTML = txt;

      await sleep(100);
      await formatCode();
    }




    return 0;
  }


  async function formatSnip() {
    let gpt_msgs = document.querySelectorAll('div.message.assistant>div.content');
    let last_msg = gpt_msgs[gpt_msgs.length - 1];
    let txt = last_msg.innerHTML.toString();
    if (txt.indexOf('`') > -1) {

      txt = txt.replace('`', '<code>').replace('`', '</code>');


      last_msg.innerHTML = txt;
      await formatSnip();
    }
    return 0;
  }

  window.mobile = (navigator.userAgent.toLowerCase().indexOf('mobile') > -1);

  setInterval(fixHeight, 500);
  function fixHeight() {


    let chatWindow = document.querySelector('div.chat');
    if ((document.body.clientHeight > document.body.clientWidth) || (window.top != window)) {

      if (chatWindow.style.maxWidth != '100vw') { chatWindow.style.maxWidth = '100vw'; }

    } else {


      if ((chatWindow.style.maxWidth != '90vw') && (!window.mobile)) { chatWindow.style.maxWidth = '90vw'; }

    }




  }




  function JSONExtract(raw, key) {

    let json_key = '"' + key + '"';
    let json_val = raw.split(json_key)[1].split('"')[1];

    return json_val;


  }





  async function cseFetch(query) {

    let cx = '324ddee4f04a04062';

    let cse_tok = localStorage.getItem('cse_tok');

    let cse_url = '/cse/element/v1?rsz=filtered_cse&num=7&hl=en&source=gcsc&gss=.com&cx=' + cx + '&q=' + encodeURIComponent(query) + '&safe=off&cse_tok=' + cse_tok + '&lr=&cr=&gl=&filter=1&sort=&as_oq=&as_sitesearch=&exp=csqr,cc&cseclient=hosted-page-client&callback=google.search.cse.api';

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

  async function parallelCSESendsBackend(username, query) {

    let q = {};
    q.username = username;
    q.query = query;
    return await (await fetch('/parallelCSESends?' + encodeURIComponent(JSON.stringify(q)))).text();

  }

  async function parallelCSESends(username, query) {
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
        let query = { username, content, _stream: false };
        /* https://web-gpt-demo.com */
        feeder.push(Promise.race([postChat, sleep(1000)]));
      } catch (e) { continue; }
    }



    await Promise.race([Promise.all(feeder), sleep(15000)]);

    return 0;
  }

  async function processing() {
    await sleep(1000);
    document.querySelector('[thinking]')?.setAttribute('thinking', 'Investigating');
    await sleep(2000);
    document.querySelector('[thinking]')?.setAttribute('thinking', 'Researching');
    await sleep(2000);
    document.querySelector('[thinking]')?.setAttribute('thinking', 'Scanning');
    await sleep(2000);
    document.querySelector('[thinking]')?.setAttribute('thinking', 'Analyzing');
    await sleep(2000);
    document.querySelector('[thinking]')?.setAttribute('thinking', 'Examining');
    await sleep(2000);
    document.querySelector('[thinking]')?.setAttribute('thinking', 'Reviewing');
    await sleep(2000);
    document.querySelector('[thinking]')?.setAttribute('thinking', 'Reflecting');
  }



  function tryJSON(obj) {

    let txt = {};
    try {
      txt = JSON.parse(obj);
    } catch (e) {
      txt = e.message + ' ' + stripTags(obj);
    }
    return txt;

  }

  function tryJSONRes(obj) {

    let txt = {};
    try {
      txt = JSON.parse(obj).response;
    } catch (e) {
      txt = stripTags(obj);
    }
    return txt;

  }

  function tryJSONRu(obj) {

    let txt = {};
    try {
      txt = JSON.parse(obj).results;
    } catch (e) {
      txt = e.message + ' ' + stripTags(obj);
    }
    return txt;

  }


  async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 5000 } = options;

    const controller = new AbortController();
    const id = setTimeout(Ж => controller.abort(), timeout, Ж);

    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);

    return response;
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



  async function fetchTextWithTimeout(url, options) {
    let txt = "";
    try {
      txt = await (await fetchWithTimeout(url, options)).text();
    } catch (e) {
      txt = e.message;
    }
    return txt;
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }



  function unpunctuate(str) {
    let s = str.replaceAll('?', ' ?.')
      .replaceAll('!', ' !.')
      .replaceAll(',', ' ,.')
      .replaceAll(':', ' :.')
      .replaceAll(';', ' ;.');

    return s;


  }

  function punctuate(str) {

    let s = str.replaceAll(' ;.', ';')
      .replaceAll(' :.', ':')
      .replaceAll(' ,.', ',')
      .replaceAll(' !.', '!')
      .replaceAll(' ?.', '?')
    return s;
  }


  function stripTags(rawHTML) {

    let dom = document.createElement('dom');
    dom.innerHTML = rawHTML;


    const extra_tags = dom.querySelectorAll('head,link,meta,style,script');
    const extra_tags_length = extra_tags.length;
    for (let i = 0; i < extra_tags_length; i++) {
      try {

        extra_tags[i].remove();

      } catch (e) { continue; }
    }
    return dom.textContent;

  }

}?.();