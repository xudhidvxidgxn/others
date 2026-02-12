def fmt(x, f=False):
    if f:
        return round(x, 2)
    s = f"{x*a:,.2f}"  # 우선 소수 둘째 자리까지 반올림해서 문자열로
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


default = 10**10
while True:
    try:
        a = int(input(f"숫자를 입력 (기본값: {fmt(default)} ({ex_fmt(default)})) | : ") or default)
    except:
        a = default
    print(f"{fmt(a)} \n({ex_fmt(a)})\n({ex_fmt(a, True)})\n")
