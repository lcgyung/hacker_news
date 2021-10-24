const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

// 페이지네이션
const store = {
  currentPage: 1,
};

// API getData
function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();
  return JSON.parse(ajax?.response);
}

// news feed list
function newsFeed() {
  // Variables
  const newsFeed = getData(NEWS_URL);
  const maxPage = Math.ceil(newsFeed.length / 10);
  const newsList = [];

  // UI (Template)
  let template = /*html*/ `
    <div class="bg-gray-600 min-h-screen">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                Previous
              </a>
              <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 text-2xl text-gray-700">
        {{__news_feed__}}
      </div>
    </div>
  `;

  // Rendering
  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    const o = newsFeed[i];
    newsList.push(`
        <li>
          <a href="#/show/${o?.id}">
            ${o?.title} (${o?.comments_count})
          </a>
        </li>
      `);
  }

  template = template.replace("{{__news_feed__}}", newsList.join(""));
  template = template.replace(
    "{{__prev_page__}}",
    store.currentPage > 1 ? store.currentPage - 1 : 1
  );
  template = template.replace(
    "{{__next_page__}}",
    store.currentPage < maxPage ? store.currentPage + 1 : maxPage
  );

  container.innerHTML = template;
}

// 상세 페이지
function newsDetail() {
  const id = location?.hash.substr(7);
  const newsContent = getData(CONTENT_URL.replace("@id", id));
  container.innerHTML = `
      <h1>${newsContent?.title}</h1>
      <div>
        <a href="#/page/${store.currentPage}">목록으로</a>
      </div>
    `;
}

// 라우터
function router() {
  const routePath = location.hash;
  if (routePath === "") {
    newsFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener("hashchange", router);
router();
