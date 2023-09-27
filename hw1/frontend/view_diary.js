/* global axios */
const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

const searchURL = window.location.search;
const diary_id = searchURL.split("&")[0].split("=")[1];

const date_tmp = document.querySelector("#date_view");
const tag_tmp = document.querySelector("#tag_view");
const feeling_tmp = document.querySelector("#feeling_view");
const content_tmp = document.querySelector("#content_view");
alert
async function main() {
  const dia = await getDiaryById(diary_id);
  view_content(dia);
  setupEventListeners();
}

function setupEventListeners() {
  // Buttons
  const edit_DiaryButton = document.querySelector("#edit_diary");
  //Click events
  edit_DiaryButton.addEventListener("click", async () => {
    // alert("進入編輯");
    window.location.href='edit_diary.html' + searchURL;
  });
}

function view_content(dia) {
  date_tmp.innerText = dia.date;
  tag_tmp.innerText = dia.tag;
  feeling_tmp.innerText = dia.feeling;
  content_tmp.innerText = dia.content;
}

async function getDiaryById(diary_id) {
  const response = await instance.get(`/diaries/${diary_id}`);
  return response.data;
}

main();