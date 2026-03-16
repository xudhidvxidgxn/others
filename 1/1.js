// @ts-check
const input_num = /** @type {HTMLInputElement} */ (
    document.querySelector("#input-num")
);
const display = /** @type {HTMLDivElement} */ (
    document.querySelector("#display")
);
const modal_area = /** @type {HTMLDivElement} */ (
    document.getElementById("modal-area")
);
/** @typedef {object} ContentList
 * @property {Number} no
 * @property {String} title
 * @property {String} link
 */
/** @type {ContentList[]} */
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
        const link = /** @type {string} */ (element["link"].trim());

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

        if (link && link !== "") {
            const link_div = document.createElement("div");
            link_div.className = "content-link";
            link_div.textContent = link;
            content.appendChild(link_div);
        }

        const btn_bar = document.createElement("div");
        btn_bar.className = "btn-bar";
        btn_bar.innerHTML = `
            <button class="edit btn">수정</button>
            <button class="delete btn">삭제</button>
        `;
        content.appendChild(btn_bar);

        fragment.appendChild(content);
    });

    display.appendChild(fragment);
}

window.addEventListener("DOMContentLoaded", () => {
    render();
});
window.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
        ev.preventDefault();
        if (modal_area.matches(".activated")) {
            modal_area.classList.remove("activated");
        }
    }
});
display.addEventListener("click", (ev) => {
    const target = /** @type {HTMLElement} */ (ev.target);

    if (!target.matches(".btn")) return;

    const parent = /** @type {HTMLElement} */ (target.closest(".content"));
    if (!parent) return;

    const no = parent.dataset.no;

    if (target.matches(".edit")) {
        console.log(`수정 클릭, ${no}번 곡`);
        modal_area.classList.add("activated");
    } else if (target.matches(".delete")) {
        console.log(`삭제 클릭, ${no}번 곡`);
    }
});
modal_area.addEventListener("click", (ev) => {
    const target = /** @type {HTMLElement} */ (ev.target);
    const current_target = /** @type {HTMLElement} */ (ev.currentTarget);

    if (target === current_target) {
        modal_area.classList.remove("activated");
    } else if (target.matches('button[type="submit"]')) {
        ev.preventDefault();
        modal_area.classList.remove("activated");
    }
});