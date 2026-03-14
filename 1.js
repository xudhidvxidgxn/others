// @ts-check
const input_num = /** @type {HTMLInputElement} */ (
    document.querySelector("#input-num")
);
const display = /** @type {HTMLDivElement} */ (
    document.querySelector("#display")
);
/** @typedef {object} ContentList
 * @property {Number} no
 * @property {String} title
 * @property {String} link
 */
/** @type {ContentList} */
let content_data = getLocalStorage("karaoke_list", [
    { no: 75596, title: "숲의 아이", link: "d" },
    { no: 51581, title: "Become", link: "" },
]);

/**
 * 저장소 이름 받아서 가져옵니다
 * @param {string} storage_name - 저장소의 이름 (문자열이어야 해!)
 * @param {any} default_value - 데이터가 없을 경우 저장할 초기값 (기본값: [])
 * @returns {any} 파싱된 데이터 객체 또는 배열
 */
function getLocalStorage(storage_name, default_value = []) {
    const data = localStorage.getItem(storage_name);

    // 데이터가 없으면 초기값을 저장하고 반환합니다.
    if (data === null) {
        console.log(
            `${storage_name} 라는 localStorage가 없어 ${default_value} 로 대체되었습니다.`,
        );
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
    const fragment = document.createDocumentFragment();
    display.innerHTML = "";

    const data = /** @type {ContentList[]} */ (
        filter
            ? content_data.filter(
                  (value) =>
                      `${value["no"]}`.includes(`${filter}`) ||
                      value["title"].includes(`${filter}`),
              )
            : content_data
    );
    data.forEach((element) => {
        const no = /** @type {number} */ (element["no"]);
        const title = /** @type {string} */ (element["title"]);
        const link = /** @type {string} */ (element["link"]);

        const content = document.createElement("div");
        content.className = "content";
        content.dataset.no = `${no}`;
        content.dataset.title = title;
        if (link !== "") content.dataset.link = link;

        const no_div = document.createElement("div");
        no_div.className = "content-no";
        no_div.textContent = `${no}`;

        const title_div = document.createElement("div");
        title_div.className = "content-title";
        title_div.textContent = title;

        content.append(no_div, title_div);

        fragment.appendChild(content);
    });

    display.appendChild(fragment);
    // const insert_html = data.map((value) => {
    //     const { no, title, link } = value;
    //     const link_html = link.trim() !== "" ? `<div class="content-link">${link}</div>` : "";

    //     return `<div class="content" data-no="${no}" data-title="${no}">
    //         <div class="content-no">${no}</div>
    //         <div class="content-title">${title}</div>
    //         ${link_html}
    //         <div class="btn-bar">
    //             <button class="edit-btn">수정</button>
    //             <button class="delete-btn">삭제</button>
    //         </div>
    //     </div>`;
    // }).join("\n");

    // display.insertAdjacentHTML("beforeend", insert_html);
}

window.addEventListener("DOMContentLoaded", () => {
    render();
});
