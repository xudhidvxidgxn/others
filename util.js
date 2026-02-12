/**
 * [코딩 파트너의 도구 상자]
 * Python 스타일의 문자열 처리 및 안전한 정규식 유틸리티
 */

/**
 * 1. 정규식 특수문자 이스케이프 함수
 * 사용자가 입력한 문자열에 정규식 예약어가 포함되어도 
 * 일반 문자로 처리되도록 모든 기호 앞에 \를 붙입니다.
 */
export const escapeRegExp = (string) => {
  // 지적해주신 대로 [와 ] 모두에 \를 붙여 중복 없이 일관성을 유지했습니다.
  return string.replace(/[.*+?^${}()|\[\]\\]/g, '\\$&');
};

/**
 * 2. lstrip (왼쪽 부분 제거)
 * 문자열 시작 부분에서 지정된 문자들(chars)이 연속될 경우 모두 제거합니다.
 */
export const lstrip = (str, chars = "\\s") => {
  const safeChars = (chars === "\\s") ? chars : escapeRegExp(chars);
  const pattern = new RegExp(`^[${safeChars}]+`, "");
  return str.replace(pattern, "");
};

/**
 * 3. rstrip (오른쪽 부분 제거)
 * 문자열 끝 부분에서 지정된 문자들(chars)이 연속될 경우 모두 제거합니다.
 */
export const rstrip = (str, chars = "\\s") => {
  const safeChars = (chars === "\\s") ? chars : escapeRegExp(chars);
  const pattern = new RegExp(`[${safeChars}]+$`, "");
  return str.replace(pattern, "");
};

/**
 * 4. strip (양쪽 부분 제거)
 * 문자열 양끝에서 지정된 문자들(chars)이 연속될 경우 모두 제거합니다.
 */
export const strip = (str, chars = "\\s") => {
  const safeChars = (chars === "\\s") ? chars : escapeRegExp(chars);
  // 시작(^) 또는(|) 끝($) 패턴을 g(global) 플래그와 함께 사용하여 양쪽 모두 처리합니다.
  const pattern = new RegExp(`^[${safeChars}]+|[${safeChars}]+$`, "g");
  return str.replace(pattern, "");
};