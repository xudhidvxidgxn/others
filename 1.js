// @ts-check
const input_num = /** @type {HTMLInputElement} */ (document.querySelector("#input-num"));
const display = /** @type {HTMLDivElement} */ (document.querySelector("#display"));

let content_data = getLocalStorage("");

/**
 * 저장소 이름 받아서 가져옵니다
 * @param {string} [storage_name = "recent_searches"] - 저장소의 이름 (문자열이어야 해!)
 * @param {any} default_value - 데이터가 없을 경우 저장할 초기값 (기본값: [])
 * @returns {any} 파싱된 데이터 객체 또는 배열
 */
function getLocalStorage(storage_name = "recent_searches", default_value = []) {
    const data = localStorage.getItem(storage_name);

    // 데이터가 없으면 초기값을 저장하고 반환합니다.
    if (data === null) {
        alert(`${storage_name} 라는 localStorage가 없어 ${default_value} 로 대체되었습니다.`);
        return default_value;
    }

    // 데이터가 있으면 JSON으로 변환해서 반환합니다.
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error("localStorage 파싱 에러:", e);
        return default_value;
    }
}
/** 화면 로딩 함수 
 * @param {string|number|null} [filter] - 필터입니다. 
*/
function render(filter = null) {
    display.innerHTML = "";
    const data = filter ? content_data.filter((value) => `${value["no"]}`.includes(`${filter}`) || value["title"].includes(`${filter}`)) : content_data;
    const insert_html = data.map((value, index) => {
        const { no, title, link } = value;
        const link_html = link.trim() !== "" ? `<div class="content-link">${link}</div>` : "";

        return `<div class="content" data-no="${no}" data-title="${no}">
            <div class="content-no">${no}</div>
            <div class="content-title">${title}</div>
            ${link_html}
            <div class="btn-bar">
                <button class="edit-btn">수정</button>
                <button class="delete-btn">삭제</button>
            </div>
        </div>`;
    }).join("\n");

    display.insertAdjacentHTML("beforeend", insert_html);
}

window.addEventListener("DOMContentLoaded", () => {
    render();
});