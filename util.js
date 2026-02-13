/**
 * [코딩 파트너의 도구 상자]
 * Python 스타일의 문자열 처리 및 안전한 정규식 유틸리티
// [] : 안의 문자들 중 무엇이든지 될 수 있습니다 (OR 조건) (안의 문자들 중 하나를 나타냅니다).
// \ : 명칭은 이스케이프 문자로, 정규식 기호 앞에 붙이면 일반 문자로 만듭니다. 특정 알파벳 앞에 붙이면 특별한 의미가 생깁니다.
    // \d : 모든 숫자인 문자를 나타내며, [0-9] 와 같습니다.
    // \D : 모든 숫자가 아닌 문자를 나타내며, [^0-9] 와 같습니다.
    // \w : 알파벳, 숫자, 언더바인 문자를 나타내며, [A-Za-z0-9_]와 같습니다.
    // \W : [^A-Za-z0-9_] 와 같습니다.
    // \s  : 줄 바꿈, 공백, 탭을 나타내며, 빈칸을 나타냅니다.
    // \n : Enter(줄 바꿈)를 나타냅니다.
    // \r : 커서 위치를 맨 앞으로 밉니다.
// . : 줄 바꿈을 제외한 어떤 문자입니다.
// ^ : 다음 문자로 시작합니다. 대괄호 안에 쓰인 경우 대괄호가 '안의 문자들을 제외하고 무엇이든지 될 수 있습니다 (안의 문자들을 제외한 문자 중 하나를 나타냅니다)' 로 의미가 바뀝니다.
// $ : 앞의 문자로 끝납니다.
// ?= : 다음 문자를 검사하나 결과로 가져오지는 않습니다. (검사 실패 시 현재 정규식은 결과를 가져오지 않습니다.)
// * : {0,} 과도 같은 표현이며, 암의 문자가 0개 이상 반복되는 문자를 나타냅니다.
// + : {1,} 과도 같은 표현이며, 앞의 문자가 1개 이상 반복되는 문자를 나타냅니다.
// a-b : a부터 b까지 (ASCII 코드 기준) 의 문자를 나타냅니다.
// {a, b} : 앞의 문자가 a번 이상, b번 이하로 반복되는 문자열을 찾습니다.
 */

/**
 * 1. 정규식 특수문자 이스케이프 함수
 * 사용자가 입력한 문자열에 정규식 예약어가 포함되어도
 * 일반 문자로 처리되도록 모든 기호 앞에 \를 붙입니다.
 */
export const escapeRegExp = (string) => {
    // 지적해주신 대로 [와 ] 모두에 \를 붙여 중복 없이 일관성을 유지했습니다.
    return string.replace(/[.*+?^${}()|\[\]\\]/g, "\\$&");
};

/**
 * 2. lstrip (왼쪽 부분 제거)
 * 문자열 시작 부분에서 지정된 문자들(chars)이 연속될 경우 모두 제거합니다.
 */
export const lstrip = (str, chars = "\\s") => {
    const safeChars = chars === "\\s" ? chars : escapeRegExp(chars);
    const pattern = new RegExp(`^[${safeChars}]+`, "");
    return str.replace(pattern, "");
};

/**
 * 3. rstrip (오른쪽 부분 제거)
 * 문자열 끝 부분에서 지정된 문자들(chars)이 연속될 경우 모두 제거합니다.
 */
export const rstrip = (str, chars = "\\s") => {
    const safeChars = chars === "\\s" ? chars : escapeRegExp(chars);
    const pattern = new RegExp(`[${safeChars}]+$`, "");
    return str.replace(pattern, "");
};

/**
 * 4. strip (양쪽 부분 제거)
 * 문자열 양끝에서 지정된 문자들(chars)이 연속될 경우 모두 제거합니다.
 */
export const strip = (str, chars = "\\s") => {
    const safeChars = chars === "\\s" ? chars : escapeRegExp(chars);
    // 시작(^) 또는(|) 끝($) 패턴을 g(global) 플래그와 함께 사용하여 양쪽 모두 처리합니다.
    const pattern = new RegExp(`^[${safeChars}]+|[${safeChars}]+$`, "g");
    return str.replace(pattern, "");
};
