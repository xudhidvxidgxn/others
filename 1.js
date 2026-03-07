// @ts-check
const input_num = /** @type {HTMLInputElement} */ (document.querySelector("#input-num"));
const input_title = /** @type {HTMLInputElement} */ (document.querySelector("#input-title"));
const display = /** @type {HTMLDivElement} */ (document.querySelector("#display"));

let content_data = [
    { no: 75596, title: "숲의 아이", link: "d" },
    { no: 51581, title: "Become", link: "" },
];

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

render();