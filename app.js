const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static('public'));

app.set('view engine', 'ejs');

// 이미지 자동 로딩
app.get('/', (req, res) => {
    const uploadDir = path.join(__dirname, 'public', 'uploads');
  
    const images = fs.readdirSync(uploadDir)
      .filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file))
      .sort((a, b) => {
        // 숫자 기준 자연 정렬
        const nameA = a.replace(/\.[^/.]+$/, '');
        const nameB = b.replace(/\.[^/.]+$/, '');
        return nameA.localeCompare(nameB, undefined, { numeric: true });
      })
      .map(file => ({
        src: `/uploads/${file}`,
        title: file.replace(/\.[^/.]+$/, '')
      }));
  
    res.render('index', { images });
  });

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
