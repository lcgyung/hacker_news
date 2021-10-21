const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

// API getData
function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();
  return JSON.parse(ajax?.response);
}

// 리스트 페이지
function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];

  newsList.push("<ul>");

  for (let i = 0; i < newsFeed.length; i++) {
    const o = newsFeed[i];
    newsList.push(`
  <li>
    <a href="#${o?.id}">
      ${o?.title} (${o?.comments_count})
    </a>
  </li>
`);
  }

  newsList.push("</ul>");
  container.innerHTML = newsList.join("");
}

// 상세 페이지
function newsDetail() {
  const id = location?.hash.substr(1);
  const newsContent = getData(CONTENT_URL.replace("@id", id));
  container.innerHTML = `
      <h1>${newsContent?.title}</h1>
      <div>
        <a href="#">목록으로</a>
      </div>
    `;
}

// 라우터
function router() {
  const routePath = location.hash;
  routePath === "" ? newsFeed() : newsDetail();
}

window.addEventListener("hashchange", router);
router();
