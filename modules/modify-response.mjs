

export default function modifyResponse(res) {

  res = removeQuestions(res);
  res = res.replaceAll('their', 'the');

  res = res.replace(/Based on the information you provided earlier. /g, '');

  res = res.replace(/the matrix/gi, 'USAA');


  res = res.replaceAll("User", 'Member');



  let resc = res.trim();
  if (resc[resc.length - 1] == ',') {
    resc = resc.slice(0, resc.length - 1) + '.';
    res = resc;

  }
  
  res = res.replaceAll('programming', 'financial services');

  if (res.indexOf('utocode') > -1) {
    res = res.replaceAll('Autocode.com', 'USAA').replaceAll('autocode.com', 'USAA').replaceAll('Autocode', 'USAA').replaceAll('autocode', 'USAA');
  }
  res = res.replaceAll('the the', 'the');

  res = res.replace(/(Certainly|Sure thing|Sure|Of course). Member./g, '');
  res = res.replace(/(Certainly|Sure thing|Of course)[^ ]/g, '');
  res = res.replace(/Let me know if there is anything else I can help you with./g, '');
  res = res.replace(/According to the source you provided./g, '');
  res = res.replace(/To expand on my previous response./g, '');
  res = res.trim();

  res = res[0].toUpperCase() + res.slice(1);

  return res;
}


function removeQuestions(text) {


  let qtext = text.replaceAll('.', '?').replaceAll('!', '?').trim();
  let qtext_list = qtext.split('?');
  if (qtext_list.length < 3) { qtext_list = text.replaceAll('.', '?').replaceAll('!', '?').replaceAll(';', '?').replaceAll(':', '?')/*.replaceAll(',', '?')*/.trim().split('?'); }
  if (qtext_list.length < 3) { return text; };
  let last_qtext = qtext_list[qtext_list.length - 2];
  if ((last_qtext.indexOf('I may help') > -1) ||
    (last_qtext.indexOf('ay I help') > -1) ||
    (last_qtext.indexOf('I may assist') > -1) ||
    (last_qtext.indexOf('ay I assist') > -1) || (last_qtext.indexOf('I can help') > -1) ||
    (last_qtext.indexOf('an I help') > -1) ||
    (last_qtext.indexOf('I can assist') > -1) ||
    (last_qtext.indexOf('an I assist') > -1) ||
    (last_qtext.indexOf('there anything else') > -1) ||
    (last_qtext.indexOf('there anything specific') > -1) ||
    (last_qtext.indexOf('there something else') > -1) ||
    (last_qtext.indexOf('there something specific') > -1) ||
    (last_qtext.indexOf('you need help') > -1) ||
    (last_qtext.indexOf('help you with') > -1) ||
    (last_qtext.indexOf('you need assist') > -1) ||
    (last_qtext.indexOf('assist you with') > -1)) {

    text = text.replace(last_qtext + '?', '');

  }

  return text;
}