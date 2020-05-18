// let xhr = new XMLHttpRequest();
//
// xhr.open(method, URL, [async, usre, password]);
//
// // 이름과 다르게 connection을 여는 메서드는 아니다
// // 환경 설정의 용도만 가지고 있다
// // 네트워크 활동은 send 메서드에서 일어난다
//
// xhr.send([ body ]);
//
// xhr.onload = function() {
//   alert(`Loaded: ${xhr.status} ${xhr.response}`);
// };
//
// xhr.onerror = function() {
//   alert(`Network Error`);
// };
//
// xhr.onprogress = function(event) {
//   alert(`Received ${event.loaded} of ${event.total}`);
// };

let xhr = new XMLHttpRequest();

// 설정, 요청 메서드는 GET이고, URL은 아래, default는 async, 요청에 아이디와 비밀번호가 필요하다면 설정이 가능하다
xhr.open('GET', '/article/xmlhttprequest/example/loadssss');

xhr.send();
// 연결을 열고, 서버에 요청을 보낸다

xhr.onload = function() {
  if (xhr.status != 200) {
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(`Done, got ${xhr.response.length} bytes`);
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    alert(`Received ${event.loaded} bytes`);
  }
}

xhr.onerror = function() {
  alert('Request failed');
};
