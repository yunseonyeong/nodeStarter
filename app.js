const express = require('express');

//express app
const app = express();

//listen for request
app.listen(3000);

// get method (url, (req, res) => {})
app.get('/', (req, res)=> {
  // html 태그 띄워주기
  // res.send('<p>Home page</p>');

  //직접 만들어놓은 html 파일 연결하기 (상대경로 x, root 폴더명 명시해주기.)
  res.sendFile('./views/index.html', { root : __dirname});
});

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', {root: __dirname});
});

// 브라우저 network 검사 시, statusCode 는 302로 노출, location 은 /about 로 노출된다. 
app.get('/about-us', (req, res) => {
  // server.js에서는 switch, statusCode, setHeader 로 처리해주었던 부분을 express 환경에서는 redirect함수로 쉽게 처리
  res.redirect('/about');
});

// 404 처리 => js는 top-bottom 으로 코드를 읽기 때문에 가장 하단에 작성해야 default 처리 가능 
// 따라서, 위치가 중요하다. 또한 status(404)로 statusCode 404임을 명시해주자. 
app.use((req, res)=> {
  res.status(404).sendFile('./views/404.html', {root: __dirname });
})

// server.js 파일과 비교하면, express 환경 사용 시 코드가 상당히 깔끔해짐을 느낄 수 있다. 
