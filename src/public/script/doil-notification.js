let wcCookie;
const COOKIE_NAME = 'wcCookie';
let cookie_label;

// document ready
document.addEventListener("DOMContentLoaded", function(){
  cookie_label = document.getElementById('cookie_label');

  getCookieStatus();

});








function makeCookie(){
  const tmpCookie = getCookie(COOKIE_NAME);

  if(tmpCookie) wcCookie = JSON.parse(tmpCookie);
  else wcCookie = false;

  // 쿠키가 없으면 발행
  if(!wcCookie){
      // 개인 식별키 생성
      let tmpId = false;
       
      makeId().then(function(id) {
        tmpId = id; // 개인 식별키는 response 값


        let cookie_obj = {};
        cookie_obj['ip'] = "192.168.0.11";
        cookie_obj['isFirst'] = true;
        cookie_obj['id'] = tmpId;
        cookie_obj['text'] = '쿠키를 생성했습니다.';
        setCookie(COOKIE_NAME , JSON.stringify(cookie_obj) , 1);
        wcCookie = JSON.parse(getCookie(COOKIE_NAME));

        getCookieStatus();

      }).catch(function(err) {
        // 개인 식별키를 발급하지 못 한 경우
        console.log(err);
      });

    
  }else{ // 쿠키가 있는 경우
      wcCookie = JSON.parse(getCookie(COOKIE_NAME));
      wcCookie.text = '쿠키가 존재합니다.';
      wcCookie.isFirst = false;
      setCookie(COOKIE_NAME , JSON.stringify(wcCookie) , 1);
  }
  
  wait(2);
  getCookieStatus();
}

function getCookieStatus(){

  const msg = wcCookie?.id ? 
  ( wcCookie['text'] + "(" + wcCookie['id'] +")" ) : 
  "쿠키가 존재하지 않습니다.";

  cookie_label.innerHTML = ('Your cookie value is : ' + msg);


}






function setCookie(cookie_name, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    // 설정 일수만큼 현재시간에 만료값으로 지정
  
    var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
}

function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');
  
    for (var i = 0; i < val.length; i++) {
      x = val[i].substr(0, val[i].indexOf('='));
      y = val[i].substr(val[i].indexOf('=') + 1);
      x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
      if (x == cookie_name) {
        return unescape(y); // unescape로 디코딩 후 값 리턴
      }
    }
  }


  function makeId(){

    let id = 'wcCookie_ID_192.168.0.11';
    let isOk = true;

    // 프로미스 리턴
    return new Promise(function (resolve, reject) {
          if(isOk) resolve(id);
          else reject(new Error('실패'));
    });

  }

  function delCookie(){
    // 쿠키의 날짜를 만료시켜서 삭제처리
    document.cookie = COOKIE_NAME + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    wcCookie = false;
    getCookieStatus();

  }



  function wait(sec) {
    let start = Date.now(), now = start;
    while (now - start < sec) {
        now = Date.now();
    }
}