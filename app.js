const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax?.response);
}

const newsFeed = getData(NEWS_URL);
const ul = document.createElement("ul");

// hashchange 이벤트
window.addEventListener("hashchange", () => {
  const id = location?.hash.substr(1);
  const newsContent = getData(CONTENT_URL.replace("@id", id));
  const title = document.createElement("h1");

  title.innerHTML = newsContent?.title;
  content.appendChild(title);
});

// 리스트 생성
newsFeed.map((o) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <li>
      <a href="#${o?.id}">
        ${o?.title} (${o?.comments_count})
      </a>
    </li>
  `;

  // ul.appendChild(div.children[0]);
  ul.appendChild(div?.firstElementChild);
});

// 렌더링
container.appendChild(ul);
container.appendChild(content);
