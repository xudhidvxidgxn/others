// @ts-check
const input_bar = /** @type {HTMLDivElement} */ (document.getElementById("input-bar"));
const display = /** @type {HTMLPreElement} */ (document.getElementById("display"));
const template = /** @type {HTMLTemplateElement} */ (document.getElementById("template"));

/** @type {number} */
let count = 0;

/** @type {Object[]} */
const data = [];

/** input 데이터에 기반한 데이터 쪼가리들 만들어버리기 */
function saveData() {
    const groups = document.querySelectorAll(".input-group");
    groups.forEach((group) => {

    });
}

/** 수집된 데이터를 바탕으로 복잡한 HTML 구조를 텍스트로 변환 */
function displayCode() {
    const groups = document.querySelectorAll(".input-group");
    /** @type {string[]} */
    const results = [];

    groups.forEach((group, index) => {
        const titleInp = /** @type {HTMLInputElement} */ (group.querySelector(".input-title"));
        const idInp = /** @type {HTMLInputElement} */ (group.querySelector(".input-id"));
        const numInp = /** @type {HTMLInputElement} */ (group.querySelector(".input-num"));

        const title = titleInp.value || "제목 없음";
        const id = idInp.value || "00000";
        const num = numInp.value || "0";

        // HTML 주석에 적어주신 복잡한 구조를 백틱으로 그대로 재현!
        // 들여쓰기도 눈에 보이는 대로 적용됩니다.
        results.push(
            `<div class="day short end">
    <a href="https://blacktoon.me/webtoon/${id}.html" class="day">
        <div class="title">${title}</div>
    </a>
    <input type="checkbox" name="modal-toggle" id="toggle${num}" hidden />
    <label for="toggle${num}">정보</label>
    <div id="modal${num}">
        <label for="toggle${num}" class="label"></label>
        <div class="modal-info">
            <h1>등장인물</h1>
            <div class="character-list">
                <div class="character">
                    <div class="title">추가 예정</div>
                    <ul class="episodes">
                        <a href="https://blacktoon.me/webtoons/${id}/0000000.html"><li class="episode good first">n화</li></a>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>`,
        );
    });

    // 결과를 pre 태그에 출력 (특수문자 포함 그대로)
    display.textContent = results.join("\n\n");
}

/** 템플릿 복제 함수 */
function addInput() {
    if (count >= 5) {
        alert(`현재 추가된 개수가 5개 이상입니다. (현재 : ${count}개)`);
        return;
    }
    count++;
    const temp = /** @type {DocumentFragment} */ (template.content.cloneNode(true));
    input_bar.appendChild(temp);
    displayCode(); // 추가하자마자 빈 폼이라도 출력
}

// 이벤트 리스너
input_bar.addEventListener("input", displayCode);
window.addEventListener("load", addInput);
