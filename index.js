const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const NAVER_ID = process.env.NAVER_ID;
const NAVER_SECRET_ID = process.env.NAVER_SECRET_ID;
app.set("port", process.env.PORT || 8099);
const port = app.get("port");
app.use(cors());

//라우팅 (특정 주소로 사용자가 들어오면 해야하는 것)
app.get("/", (req, res) => {
  res.send("안녕 만나서 반가워");
});
app.get("/book/:bookname", (req, res) => {
  const queryTxt = encodeURIComponent(req.params.bookname);
  // console.log(req.params.bookname);
  axios({
    url: `https://openapi.naver.com/v1/search/book.json?query=${queryTxt}`,
    headers: {
      "X-Naver-Client-Id": NAVER_ID,
      "X-Naver-Client-Secret": NAVER_SECRET_ID,
    },
  }).then(function (response) {
    // console.log(response.data);
    res.json(response.data);
  });
});

app.get("/login", (req, res) => {
  // console.log(req.query);
  if (req.query.id === "supernova45" && req.query.pw === "1234") {
    res.send({ isLogged: true });
  } else {
    res.send({ isLogged: false });
  }
});
app.listen(port, function () {
  console.log(`${port}에서 서버 대기 중`);
});
