const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static('public'));
app.set('view engine', 'ejs');

// 공통 함수로 이미지 불러오기
function getImages(round) {
  const uploadDir = path.join(__dirname, 'public', 'uploads', round);
  if (!fs.existsSync(uploadDir)) return [];

  return fs.readdirSync(uploadDir)
    .filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file))
    .sort((a, b) => {
      const nameA = a.replace(/\.[^/.]+$/, '');
      const nameB = b.replace(/\.[^/.]+$/, '');
      return nameA.localeCompare(nameB, undefined, { numeric: true });
    })
    .map(file => ({
      src: `/uploads/${round}/${file}`,
      title: file.replace(/\.[^/.]+$/, '')
    })); 
}

// 1회차 라우터
app.get('/round/1', (req, res) => {
  const images = getImages('1');
  res.render('index', { images, round: 1 });
});

// 2회차 라우터
app.get('/round/2', (req, res) => {
  const images = getImages('2');
  res.render('index', { images, round: 2 });
});

// 기본 접근시 1회차로 리다이렉트
app.get('/', (req, res) => {
  res.redirect('/round/2');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
