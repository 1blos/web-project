function saveData() {
    localStorage.setItem(
        "timetable",
        document.querySelector("table").innerHTML
    );
}

function addSubject() {

    let subject = document.getElementById("subject").value;

    const subjects = {
    "컴":"컴퓨터네트워크",
    "인프":"인공지능프로그래밍기초",
    "AI":"AI기초실습",
    "영어":"실용영어",
    "채플":"채플1",
    "문제":"문제해결능력",
    "웹":"웹기초",
    "데베":"인공지능데이터베이스"
    };

    if(subjects[subject]){
        subject = subjects[subject];}

    let day = document.getElementById("day").value;
    let period = document.getElementById("period").value;

    if(subject === ""){
        alert("과목명을 입력하세요.");
        return;
    }

    let cellId = day + period;
    let cell = document.getElementById(cellId);

    if(cell.innerHTML !== ""){
        alert("이미 수업이 등록되어 있습니다.");
        return;
    }

    cell.style.backgroundColor = subjectColors[subject] || "#64748b";

    const subjectColors = {
    "컴퓨터네트워크": "#f97316",
    "인공지능프로그래밍기초": "#facc15",
    "AI기초실습": "#84cc16",
    "실용영어": "#2dd4bf",
    "채플1": "#38bdf8",
    "문제해결능력": "#ec4899",
    "웹기초": "#c084fc",
    "인공지능데이터베이스": "#22c55e"
    };

    saveData();
    updateTodayLesson();
}

function deleteSubject() {

    let day = document.getElementById("day").value;
    let period = document.getElementById("period").value;

    let cellId = day + period;
    let cell = document.getElementById(cellId);

    cell.innerHTML = "";
    cell.style.backgroundColor = "";

    saveData();
    updateTodayLesson();
}

function clearTable() {

    let result = confirm("시간표를 모두 삭제하시겠습니까?");

    if(result){

        let cells = document.querySelectorAll("td[id]");

        cells.forEach(function(cell){
            cell.innerHTML = "";
            cell.style.backgroundColor = "";
        });

        localStorage.removeItem("timetable");

        alert("초기화 완료");
    }
}

function updateClock(){

    let now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleString("ko-KR");
}

setInterval(updateClock,1000);

window.onload = function(){

    updateClock();

    let saved =
    localStorage.getItem("timetable");

    if(saved){
        document.querySelector("table").innerHTML =
        saved;
    }

    updateTodayLesson();
};

function updateTodayLesson(){

    let today = new Date().getDay();

    let dayMap = [
        "sun",
        "mon",
        "tue",
        "wed",
        "thu",
        "fri",
        "sat"
    ];

    let todayDay = dayMap[today];

    let html = "";

    for(let i=1;i<=7;i++){

        let cell =
        document.getElementById(todayDay+i);

        if(cell && cell.innerHTML!=""){

            html +=
            "<p>"+i+"교시 - "+
            cell.innerHTML+
            "</p>";
        }
    }

    if(html==""){
        html="오늘 수업이 없습니다.";
    }

    document.getElementById("todayLesson")
    .innerHTML = html;
}