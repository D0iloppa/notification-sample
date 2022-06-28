// 기본 설정
const fs = require('fs'); // 파일로드 사용
const express = require("express"); // express 웹 서버 사용
const app = express();
const PORT = 3939;

const os = require("os");
const IP = getServerIp();

// push API 사용
var webPush = require('web-push');
const vapidKeyObj = webPush.generateVAPIDKeys();

console.log("Vapid Key : ",vapidKeyObj);

var vapidPublicKey = vapidKeyObj.publicKey;
var vapidPrivateKey = vapidKeyObj.privateKey;
// var vapidPublicKey = 'BL6As_YCGHPf3ZeDbklyVxgvJVb4Tr5qjZFS-J7XzkT5zQNghd9iUBUsqSlVO5znwTsZZrEOx8JFRDJc1JmkymA';
//var vapidPrivateKey = 'GnMVDgbtZrqs7tgKEkJaV5aZF8cVjoq7Ncz_TEVI_lo';
        
webPush.setVapidDetails(
    'mailto:kdi3939@naver.com',
    vapidPublicKey,
    vapidPrivateKey
);



// 정적 파일 불러오기
app.use(express.static(__dirname + "/public"));

// 라우팅 정의
app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/index.html");
  res.sendFile(__dirname + "/index.html");
});

// endPoint 지정
app.get('/api/key', function(req, res) {
  res.send({
      key: vapidPublicKey
  });
});

app.post('/api/save-subscription', function(req, res) {
  // save req.body.subscription to a database
  res.send('Success');
});

/*
webPush.sendNotification(savedSubscriptionData, payload)
    .then(function (response) {
        console.log('sent');
});
*/
    


// 서버 실행
app.listen(PORT, () => {
  console.log(`Listen : doil Notification SAMPLE server running at http://${IP}:${PORT}`);
});



/************ 기타 초기 환경정보 표시용 함수 *********/

// server ip 구하기
function getServerIp() {
  var ifaces = os.networkInterfaces();
  var result = '';
  for (var dev in ifaces) {
      var alias = 0;
      ifaces[dev].forEach(function(details) {
          if (details.family == 'IPv4' && details.internal === false) {
              result = details.address;
              ++alias;
          }
      });
  }
  return result;
}


/*************************************************/