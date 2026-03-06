// @ts-check 
const input = /** @type {HTMLInputElement} */ (document.querySelector(".input"));
const display = /** @type {HTMLPreElement} */ (document.querySelector("#display"));

const content = [];

/** 화면 개선 시 배열 업데이트 */
function arrayUpdate() {
    const input_list = /** @type {any[]} */ (Array.from((document.querySelectorAll(".input"))));
    for(let i = 0; i < input_list.length; i++) {
        content.push("");
    }
    input_list.forEach((value, index) => {
        content[index] = value.value;
    });
}
/** 배열에 따라 화면에 표시 */
function displayUpdate() {
}