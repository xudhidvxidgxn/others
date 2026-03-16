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
const form = /** @type {HTMLDivElement} */ (document.querySelector(".form"));
const controller = /** @type {HTMLDivElement} */ (
    document.querySelector("#controller")
);
const go_btn = /** @type {HTMLButtonElement} */ (document.querySelector("#go"));

let render_timer = null;

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

/** 저장하는 함수 */
function save() {
    const idx = modal_area.dataset.idx;
    const no_input = /** @type {HTMLInputElement} */ (
        document.querySelector("#no")
    );
    const title_input = /** @type {HTMLInputElement} */ (
        document.querySelector("#title")
    );
    const link_input = /** @type {HTMLInputElement} */ (
        document.querySelector("#link")
    );

    const new_data = {
        no: Number(no_input.value),
        title: title_input.value,
        link: link_input.value || "",
    };
    console.log(new_data);

    if (Number.isNaN(new_data["no"]) || new_data["title"].trim() === "") {
        alert(`번호가 잘못되었거나 제목이 잘못되었습니다! 
            번호 : ${new_data["no"]}
            제목 : ${new_data["title"]}
            링크 : ${new_data["link"]}`);
        return;
    }

    let full_data = [
        new_data,
        ...content_data.filter(
            (value, index) =>
                `${new_data["no"]}` !== `${value["no"]}` && idx !== `${index}`,
        ),
    ];
    content_data = setLocalStorage("karaoke_list", full_data);
    render(input_num.value);
}
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
/**
 * 데이터를 JSON 문자열로 변환하여 localStorage에 저장합니다.
 * @param {string} storage_name - 로컬스토리지 키 이름 (없으면 recent_searches)
 * @param {any} data - 저장할 데이터 (객체나 배열 등)
 */
function setLocalStorage(storage_name, data = null) {
    if (data === null || data === undefined) {
        console.log("data가 비었습니다.");
        return;
    }
    localStorage.setItem(storage_name, JSON.stringify(data));
    return getLocalStorage(storage_name);
}
/** 화면 로딩 함수
 * @param {string} [filter] - 필터입니다.
 */
function render(filter = "") {
    const fragment = document.createDocumentFragment();
    display.innerHTML = "";

    const data = /** @type {ContentList[]} */ (
        filter || filter.trim() !== "" ?
            content_data.filter((value) => `${value["no"]}`.startsWith(`${filter}`) || value["title"].includes(`${filter}`))
            : content_data
    );

    data.forEach((element, index) => {
        const no = /** @type {number} */ (element["no"]);
        const title = /** @type {string} */ (element["title"]);
        const link = /** @type {string} */ (element["link"].trim());

        const content = document.createElement("div");
        content.className = "content";
        content.dataset.idx = `${index}`;
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
    if (ev.key === "Enter" && modal_area.matches(".activated")) {
        // 저장하는 함수
        console.log("저장됨");
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
        const id_input = /** @type {HTMLInputElement} */ (
            form.querySelector("#no")
        );
        const title_input = /** @type {HTMLInputElement} */ (
            form.querySelector("#title")
        );
        const link_input = /** @type {HTMLInputElement} */ (
            form.querySelector("#link")
        );

        id_input.value = parent.dataset.no || "";
        title_input.value = parent.dataset.title || "";
        link_input.value = parent.dataset.link || "";
        modal_area.classList.add("activated");
        modal_area.dataset.idx = parent.dataset.idx;
    } else if (target.matches(".delete")) {
        console.log(`삭제 클릭, ${no}번 곡`);
        // if(confirm())
        const edited_data = content_data.filter(
            (value) => `${value["no"]}` !== `${no}`,
        );
        content_data = setLocalStorage("karaoke_list", edited_data);
        render(input_num.value);
        alert(`${no}번 삭제되었습ㄴ다.`);
    }
});
modal_area.addEventListener("click", (ev) => {
    const target = /** @type {HTMLElement} */ (ev.target);
    const current_target = /** @type {HTMLElement} */ (ev.currentTarget);

    if (target === current_target) {
        modal_area.classList.remove("activated");
    } else if (target.matches('button[type="submit"]')) {
        ev.preventDefault();
        save();
        modal_area.classList.remove("activated");
    }
});
input_num.addEventListener("input", (ev) => {
    const current_target = /** @type {HTMLInputElement} */ (ev.currentTarget);
    const val = current_target.value;
    // console.log(Number(val), /^[0-9]+$/.test(val));
    if (/^[0-9]+$/.test(val)) {
        if (val.length > 5) {
            const clipped = val.slice(0, 5);
            current_target.value = val !== clipped ? clipped : val;
        }
    }
    render(val);
});
