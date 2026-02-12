import random


def fmt(x, f=False):
    if f:
        return round(x, 2)
    s = f"{x:,.2f}"  # 우선 소수 둘째 자리까지 반올림해서 문자열로
    s = s.rstrip("0")  # 끝의 0 제거
    s = s.rstrip(".")  # 소수점만 남으면 제거
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
    r = random.random
    while True:
        a = input("시도 횟수 입력 | : ") or 1
        try:
            a = int(a)
        except ValueError:
            continue
        print(f"시도 횟수 : {ex_fmt(a)}회 ({ex_fmt(a, True)})")
        chanc = input("\n확률 입력(%) | : ") or 1
        chanc = float(chanc.rstrip("%")) / 100
        print(f"확률 : {chanc}")
        input("go?")
        break
    print("시도 중...")
    for i in range(a):
        stack = 0
        chan = r()
        while True:
            if chan < chanc:
                # print("성공!")
                break
            else:
                chan = r()
                stack += 1
                # print(ex_fmt(i, True))
        astack += stack
        # print(f"완료! ({ex_fmt(i+1)}) ({ex_fmt(i+1, True)})")
    res = astack / a
    res1 = fmt(res)
    print()
    print(f"확률 : {chanc} ({chanc*100}%)")
    print(f"평균 시도 : {res1} ({ex_fmt(res1)}) ({ex_fmt(res1, True)})")
    print()
    print(f"전체 시도 : {fmt(astack)} ({ex_fmt(astack)}) ({ex_fmt(astack, True)})")


main()
