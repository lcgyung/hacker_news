const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

ajax.open("GET", NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax?.response);
const ul = document.createElement("ul");

// hashchange 이벤트
window.addEventListener("hashchange", () => {
  const id = location?.hash.substr(1);
  ajax.open("GET", CONTENT_URL.replace("@id", id), false);
  ajax.send();

  const newsContent = JSON.parse(ajax?.response);
  const title = document.createElement("h1");

  title.innerHTML = newsContent?.title;
  content.appendChild(title);
});

// 리스트 생성
newsFeed.map((o) => {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.href = `#${o?.id}`;
  a.innerHTML = `${o?.title} (${o?.comments_count})`;

  li.appendChild(a);
  ul.appendChild(li);
});

// 렌더링
container.appendChild(ul);
container.appendChild(content);
