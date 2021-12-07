const Btn1 = document.querySelector("#Btn1");
const Btn2 = document.querySelector("#Btn2");
const Btn1Img = document.createElement("img");
const Btn2Img = document.createElement("img");
const roundTitle = document.querySelector("#round");
const arrIndex = [];
const arr16 = [];
const arr8 = [];
const arr4 = [];
const arr2 = [];
const result = [];
var count16 = 0;
var count8 = 0;
var count4 = 0;
var count2 = 0;

var requestURL = 'https://raw.githubusercontent.com/nick102030/JS/main/list.json';
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

document.querySelector("#location").classList.add("hidden");
document.querySelector("#mainmenu").classList.add("hidden");

request.onload = function () {
    var matzip = request.response;

    for (var i = 0; i < matzip['members'].length; i++) {
        arrIndex.push(i);
    }

    for (var i = 0; i < 16; i++) {
        const randomNum = Math.floor(Math.random() * arrIndex.length);
        arr16.push( matzip['members'][arrIndex[randomNum]]['name'] );
        arrIndex.splice(randomNum, 1);
    }

    //맨 처음 상태 설정
    Btn1.innerText = arr16[count16];
    Btn1Img.src = `./images/${arr16[0]}.jpg`;
    Btn1.appendChild(Btn1Img);

    Btn2.innerText = arr16[count16 + 1];
    Btn2Img.src = `./images/${arr16[1]}.jpg`;
    Btn2.appendChild(Btn2Img);

    viewround();

    function handleClick(event) {
        if (count16 < 16) { //32강이 끝나고 16강 진행 중
            arr8.push(event.target.parentElement.innerText);
            count16 += 2;
            console.log("arr8: ", arr8);
        } else if ((count16 == 16) && (count8 < 8)) { //16강 끝나고 8강 진행 중
            arr4.push(event.target.parentElement.innerText);
            count8 += 2;
            console.log("arr4: ", arr4);
        } else if ((count16 == 16) && (count8 == 8) && (count4 < 4)) { //8강 끝나고 4강 진행 중
            arr2.push(event.target.parentElement.innerText);
            count4 += 2;
            console.log("arr2: ", arr2);
        } else if ((count16 == 16) && (count8 == 8) && (count4 == 4) && (count2 < 2)) { //4강 끝나고 결승 진행 중
            result.push(event.target.parentElement.innerText);
            count2 += 2;
            console.log("result: ", result);

            localStorage.setItem("result", event.target.parentElement.innerText);
        }

        drawBtn();
    }

    /* 이미지 추가, innerText 추가 */
    function drawBtn() {
        if ((count16 < 16)) { //32강이 끝나고 16강 진행 중
            Btn1.innerText = arr16[count16];
            Btn2.innerText = arr16[count16 + 1];
            Btn1Img.src = `./images/${arr16[count16]}.jpg`;
            Btn2Img.src = `./images/${arr16[count16 + 1]}.jpg`;
            Btn1.appendChild(Btn1Img);
            Btn2.appendChild(Btn2Img);
        } else if ((count16 == 16) && (count8 < 8)) { //16강 끝나고 8강 진행 중
            Btn1.innerText = arr8[count8];
            Btn2.innerText = arr8[count8 + 1];
            Btn1Img.src = `./images/${arr8[count8]}.jpg`;
            Btn2Img.src = `./images/${arr8[count8 + 1]}.jpg`;
            Btn1.appendChild(Btn1Img);
            Btn2.appendChild(Btn2Img);
        } else if ((count16 == 16) && (count8 == 8) && (count4 < 4)) { //8강 끝나고 4강 진행 중
            Btn1.innerText = arr4[count4];
            Btn2.innerText = arr4[count4 + 1];
            Btn1Img.src = `./images/${arr4[count4]}.jpg`;
            Btn2Img.src = `./images/${arr4[count4 + 1]}.jpg`;
            Btn1.appendChild(Btn1Img);
            Btn2.appendChild(Btn2Img);
        } else if ((count16 == 16) && (count8 == 8) && (count4 == 4) && (count2 < 2)) { //4강 끝나고 결승 진행 중
            Btn1.innerText = arr2[count2];
            Btn2.innerText = arr2[count2 + 1];
            Btn1Img.src = `./images/${arr2[count2]}.jpg`;
            Btn2Img.src = `./images/${arr2[count2 + 1]}.jpg`;
            Btn1.appendChild(Btn1Img);
            Btn2.appendChild(Btn2Img);
        } else if ((count16 == 16) && (count8 == 8) && (count4 == 4) && (count2 == 2)) {
            Btn1.innerText = result[0];
            Btn1Img.src = `./images/${result[0]}.jpg`
            Btn1.appendChild(Btn1Img);
            Btn2.classList.add('hidden');
            document.querySelector("#location").classList.remove("hidden");
            document.querySelector("#mainmenu").classList.remove("hidden");
            document.cookie = `name = ${result[0]}`;
        }

        viewround();
    }

    /* 화면에 현재 라운드 수와 남은 수 표시 */
    function viewround() {
        if ((count16 < 16)) {
            roundTitle.innerHTML = `음식 이상형 월드컵! 16강 (${count16 / 2}/8)`;
        } else if ((count16 == 16) && (count8 < 8)) {
            roundTitle.innerHTML = `음식 이상형 월드컵! 8강 (${count8 / 2}/4)`;
        } else if ((count16 == 16) && (count8 == 8) && (count4 < 4)) {
            roundTitle.innerHTML = `음식 이상형 월드컵! 4강 (${count4 / 2}/2)`;
        } else if ((count16 == 16) && (count8 == 8) && (count4 == 4) && (count2 < 2)) {
            roundTitle.innerHTML = `음식 이상형 월드컵! 결승 (${count2 / 2}/1)`;
        } else if ((count16 == 16) && (count8 == 8) && (count4 == 4) && (count2 == 2)) {
            roundTitle.innerHTML = `최종 결과! ${result[0]}`;
            document.cookie = `name = ${result[0]}`;
        }
    }
    Btn1.addEventListener("click", handleClick);
    Btn2.addEventListener("click", handleClick);

}

