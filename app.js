const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";

ajax.open("GET", NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement("ul");

document.getElementById("root").appendChild(ul);
newsFeed.map((o) => {
  const li = document.createElement("li");
  li.innerHTML = o.title;
  ul.appendChild(li);
});
