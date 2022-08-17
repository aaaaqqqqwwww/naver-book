const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.set("port", 8099);
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
      "X-Naver-Client-Id": "jSRsLa_WrpguF0mZMFFQ",
      "X-Naver-Client-Secret": "42A8NqtW3a",
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
app.listen(8099, function () {
  console.log("8099에서 서버 대기 중");
});
