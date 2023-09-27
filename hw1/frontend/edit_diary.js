/* global axios */
const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

const searchURL = window.location.search;
const diary_id = searchURL.split("&")[0].split("=")[1];

const date_input_tmp = document.querySelector("#date-input");
const tag_input_tmp = document.querySelector("#tag-input");
const feeling_input_tmp = document.querySelector("#feeling-input");
const content_input_tmp = document.querySelector("#content-input");


async function main() {
  // Editing an existed diary
  if(!searchURL){
    setupEventListeners_add();
  }
  // New adding a diary
  else{
    const dia = await getDiaryById(diary_id);
    replace_textarea(dia);
    setupEventListeners(dia);
  }
  
}

// NEW ADD A DIARY MODE
function setupEventListeners_add() {
  // Buttons
  const save_DiaryButton = document.querySelector("#save_diary");
  const cancel_DiaryBotton = document.querySelector("#cancel_diary");
  // Inputs, Date要記得處理
  const dateInput = document.querySelector("#date-input");
  const tagInput = document.querySelector("#tag-input");
  const feelingInput = document.querySelector("#feeling-input");
  const contentInput = document.querySelector("#content-input");

  save_DiaryButton.addEventListener("click", async () => {
    var date = dateInput.value;
    const tag = tagInput.value;
    const feeling = feelingInput.value;
    const content = contentInput.value;
    // Date default: XXXX.XX.XX (星期幾)
    if(!date) {
      var Today = new Date();
      var weekday = [" (日)", " (一)", " (二)", " (三)", " (四)", " (五)", " (六)"];
      // Month
      var month;
      if(Today.getMonth()+1 < 10){
        month = String("0"+(Today.getMonth()+1));
      }
      else {
        month = String(Today.getMonth()+1);
      }
      // Day
      var day;
      if(Today.getDate() < 10){
        day = String("0"+(Today.getDate()));
      }
      else {
        day = String(Today.getDate());
      }
      // Date
      date = String(Today.getFullYear() + "." + month + "." + day + weekday[Today.getDay()]);
    }

    if(!tag) {
      alert("Please enter a diary tag!");
    }
    if(!feeling) {
        alert("Please enter a diary feeling!");
    }
    if(!content) {
      alert("Please enter a diary content!");
    }

    try {
      await createDiary({date, tag, feeling, content});
      // alert("Create!");
      window.location.href='diary.html';
    } catch (error) {
      alert("Fail to create diary!");
      return;
    }
    dateInput.value = "";
    tagInput.value = "";
    feelingInput.value = "";
    contentInput.value = "";
  });

    cancel_DiaryBotton.addEventListener("click", async () => {
    // alert("取消儲存");
    window.location.href='diary.html';
  });
}

// EDIT AN EXSITED DIARY
function setupEventListeners(dia) {
    // Buttons
    const save_DiaryButton = document.querySelector("#save_diary");
    const cancel_DiaryBotton = document.querySelector("#cancel_diary");
    // Inputs, Date要記得處理
    const dateInput = document.querySelector("#date-input");
    const tagInput = document.querySelector("#tag-input");
    const feelingInput = document.querySelector("#feeling-input");
    const contentInput = document.querySelector("#content-input");

    // Show existed content on Textarea



    //Click events
        save_DiaryButton.addEventListener("click", async () => {
        var date = dateInput.value;
        var tag = tagInput.value;
        var feeling = feelingInput.value;
        var content = contentInput.value;
        if(!date) {
          date = dia.date;
        }
        if(!tag) {
          tag = dia.tag;
          // alert("Please enter a diary tag!");
        }
        if(!feeling) {
          feeling = dia.feeling;
          // alert("Please enter a diary feeling!");
        }
        if(!content) {
          content = dia.content;
          // alert("Please enter a diary content!");
        }
        try  {
          await updateDiaryStatus(diary_id, {date, tag, feeling, content});
          // alert("Update!")
          window.location.href='diary.html';
        } catch (error) {
          alert("Fail to create diary!");
          return;
        }
      });

        cancel_DiaryBotton.addEventListener("click", async () => {
        // alert("取消儲存");
        window.location.href='diary.html';
      });
    
}

function replace_textarea(dia) {
  date_input_tmp.innerHTML = dia.date;
  tag_input_tmp.innerHTML = dia.tag;
  feeling_input_tmp.innerHTML = dia.feeling;
  content_input_tmp.innerHTML = dia.content;
}

async function createDiary(diary) {
  const response = await instance.post("/diaries", diary);
  return response.data;
}

async function getDiaryById(diary_id) {
  const response = await instance.get(`/diaries/${diary_id}`);
  return response.data;
}

async function updateDiaryStatus(id, diary) {
  const response = await instance.put(`/diaries/${id}`, diary);
  return response.data;
}

main();