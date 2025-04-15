const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 하드코딩된 이미지 배열 (서버에 이미 업로드된 이미지 경로들)
const images = [
  { src: '/uploads/1.png', title: '사진 1' },
  { src: '/uploads/2.png', title: '사진 2' },
];

// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.use(express.static('public')); // 정적 파일 제공

// 홈 페이지
app.get('/', (req, res) => {
  res.render('index', { images });  // 이미지 배열을 템플릿에 전달
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
