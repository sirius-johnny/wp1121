/* global axios */
const diaryTemplate = document.querySelector("#diaries-template");
const diaryList = document.querySelector("#diaries");

const instance = axios.create({
    baseURL: "http://localhost:8000/api",
});

async function main() {
    setupEventListeners();
    try {
        const diaries = await getDiaries();
        diaries.forEach((diary) => renderDiary(diary));
    } 
    catch (error) {
        alert("Failed to load diaries!");
    }
}


function setupEventListeners() {
  // Buttons
  const newadd_DiaryButton = document.querySelector("#diary_add");

  //Click events
  newadd_DiaryButton.addEventListener("click", async () => {
    // alert("進入編輯，新增日記本");
    window.location.href='edit_diary.html';
  });
}

function renderDiary(diary) {
    const item = createDiaryElement(diary);
    diaryList.appendChild(item);
}

function createDiaryElement(diary) {
    const item = diaryTemplate.content.cloneNode(true);
    const container = item.querySelector(".diary_open");
    container.id = diary.id;
    console.log(diary);
    const date = item.querySelector("p.diary-date");
    date.innerText = diary.date;
    const tag = item.querySelector("p.diary-tag");
    tag.innerText = diary.tag;
    const feeling = item.querySelector("p.diary-feeling");
    feeling.innerText = diary.feeling;
    // const content = item.querySelector("p.diary-content");
    // content.innerText = diary.content;
    const to_view_mode = item.querySelector(".diary_open");
    to_view_mode.addEventListener("click", async() => {
      window.location.href = 'view_diary.html' + '?id=' + diary.id;
    });
    return item;
  }

  async function getDiaries() {
    const response = await instance.get("/diaries");
    return response.data;
  }

main();