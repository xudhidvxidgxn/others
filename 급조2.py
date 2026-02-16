import random
from decimal import Decimal, getcontext


def fmt(x, f=False):
    if f:
        return round(float(x), 2) if type(x) == float else "잘못된 접근"
    s = f"{float(x):,.2f}"  # 우선 소수 둘째 자리까지 반올림해서 문자열로
    s = s.rstrip("0").rstrip(".")  # 소수점만 남으면 제거
    # 끝의 0 제거
    return s


def ex_fmt(x, b=False, a=4):
    try:
        # x = x[0 : x.find(".")] if "." in x else x  # 소수점 안전 처리
        x = str(x).replace(",", "")
        x = str(round(float(x)))
        x = x[::-1]
    except:
        return "!잘못된 접근!"

    # a자씩 자르기 + 마지막 조각 보존
    x1 = []
    for i in range(0, len(x), a):
        chunk = x[i : i + a]
        if chunk:  # 빈 문자열이 아닌 경우만 추가
            x1.append(chunk)

    x1.reverse()
    if b:
        x1 = list(map(lambda chunk: (chunk[::-1] or "0000"), x1))
    else:
        x1 = list(map(lambda chunk: (chunk[::-1].lstrip("0") or "0"), x1))
    res = " ".join(x1)
    return res


def main():
    astack = 0
    while True:
        a = input("시도 횟수 입력 | : ") or 1
        try:
            a = int(a)
        except ValueError:
            continue
        print(f"시도 횟수 : {ex_fmt(a)}회 ({ex_fmt(a, True)})")

        while True:
            chanc_input = input("\n확률 입력(%) | : ") or 1
            if "/" in chanc_input:
                chanc_parts = chanc_input.split("/")
                try:
                    num1 = Decimal(chanc_parts[0].strip())
                    num2 = Decimal(chanc_parts[1].strip())

                    if num2 != 0:
                        chanc = num1 / num2
                        break
                    else:
                        print("0으로 나눌 수 없다.")
                        continue
                except:
                    print("유효하지 않은 값이 있다.")
                    continue
            else:
                chanc = Decimal(chanc_input.rstrip("%")) / Decimal("100")
            break
        print(f"확률 : {chanc:f} ({(chanc*100).normalize():f}%)")
        input("go?")
        break

    print("시도 중...")
    chanc_float = float(chanc)
    for i in range(a):
        stack = 0
        while True:
            stack += 1
            if random.random() < chanc_float:
                break
                # print(ex_fmt(i, True))
        astack += stack
    res = Decimal(astack) / Decimal(a)
    res1 = fmt(res)
    print()
    print(f"확률 : {chanc.normalize():f} ({(chanc*100).normalize():f}%)")
    print(f"평균 시도 : {res1} ({ex_fmt(res1)}) ({ex_fmt(res1, True)})")
    print()
    print(f"전체 시도 : {fmt(astack)} ({ex_fmt(astack)}) ({ex_fmt(astack, True)})")


main()
