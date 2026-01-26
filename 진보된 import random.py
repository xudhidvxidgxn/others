import random
import time
stack = 0
p = 0; q = 0
확천 = False; 명함 = False; 전광 = False; 풀돌 = False; 풀재 = False
rec = []; jamMode = False

currentPickUp = '픽업캐'

def full(x):
    global stack, 확천, 명함, a, chan, ab, astack, p, q, 전광, 풀돌, 풀재
    a = random.random()
    stack += 1
    astack += 1
    match x:
        case "캐릭터":
            chan = 6/1000 + (stack - 73)*6/100 if stack > 73 else 6/1000
            ab = 5/10
            lineup = ["이우진", "이동훈", "엄동후"]; re = '픽업'
        case "광추":
            chan = 8/1000 + (stack - 63)*7/100 if stack > 63 else 8/1000
            ab = 75/100
            lineup = ["대학50명좌", "오은수"]; re = '광추'
            
    recordTxt = f"{re}({currentPickUp})\t\t"
    if(a < chan):
        if(확천 == True):
            if(x == "캐릭터"): 
                if(명함): p += 1; recordTxt += f'({p}돌)' if p < 6 else '(풀돌)'
                else: 명함 = True; recordTxt += '(명함)'
            else: 
                if(전광): q += 1; recordTxt += f'({q}재)' if q < 5 else '(풀재)'
                else: 전광 = True; recordTxt += '(전광)'
            record(recordTxt+'\t(확천)'+f' ({astack*160}개)')
            result = (f"{stack} : 뽑았다!")
            확천 = False
        else:
            b = random.random()
            if(b < ab):
                if(x == "캐릭터"): 
                    if(명함): p += 1; recordTxt += f'({p}돌)' if p < 6 else '(풀돌)'
                    else: 명함 = True; recordTxt += '(명함)'
                else: 
                    if(전광): q += 1; recordTxt += f'({q}재)' if q < 5 else '(풀재)'
                    else: 전광 = True; recordTxt += '(전광)'
                record(recordTxt+'\t(반천)'+f' ({astack*160}개)')
                result = (f"{stack} : 뽑았다!!")
            else:
                e = random.choice(lineup)
                re = '픽뚫' if x == "캐릭터" else '광뚫'
                recordTxt = f"{re}({e})"
                record(recordTxt)
                result = (f"{stack} : {e}됨")
                확천 = True
        stack = 0
    else:
        result = (f"{stack} : 실패..")
    if(p >= 6): 풀돌 = True
    if(q >= 5): 풀재 = True
    return result
def record(a):
    global stack, astack, 확천, rec
    recording = {
        '확' : 확천,
        'stack' : stack,
        'astack' : astack,
        'character' : a
    }
    rec.append(recording)
def recordprint():
    global rec
    result = ''; pic = 0; upic = 0
    if(not rec):
        result = "--- 뽑기 기록이 없습니다. ---\n"
        return result
    print('--- 뽑기 기록 ---')
    for i in range(len(rec)):
        print(f"{'0'*(len(str(len(rec)-1))-len(str(i+1)))}{i+1} : {'0' if len(str(rec[i]['stack'])) == 1 else ''}{rec[i]['stack']}회차 ({'0'*(len(str(rec[len(rec)-1]['astack']))-len(str(rec[i]['astack'])))}{rec[i]['astack']}회차) | {rec[i]['character']}")
    for i in rec: 
        if('픽업' in i['character'] or '광추' in i['character']): pic += 1
        else: upic += 1
    print(f"픽업률 : {pic/len(rec)*100:0.2f}% | 픽뚫률 : {upic/len(rec)*100:0.2f}%")
    return result
def c(a=''):
    global stack, astack, p, q, 확천, 명함, rec, 전광, 풀돌, 풀재, sta
    stack, astack, p, q, 확천, 명함, 전광, 풀돌, 풀재 = 0, 0, 0, 0, False, False, False, False, False
    sta = 0
    rec = []
    if(a == 'm'):
        print("초기화되었습니다.")
    else:
        print(end='')
def administerMode():
    global stack, 확천, jamMode, jam, astack
    while True:
        a = input("--- 행동 선택 --- \n1. 스택 조정\n2. 확천 여부 설정\n3. 성옥으로 뽑기\n나가기: 다른 아무 입력\n")
        match a:
            case "1":
                while True:
                    try:
                        st = int(input("조정할 스택 수를 입력하세요 : "))
                        astack += st
                        stack = st
                        break
                    except: continue
            case "2":
                if(not(확천)): 확천 = True; print("확천 활성화됨.")
                else: 확천 = False; print("확천 비활성화됨.")
            case "3":
                while True:
                    try:
                        jam = int(input("성옥 갯수를 입력하세요. : "))
                        jamMode = True
                        break
                    except: continue
            case _:
                return
def maingame():
    global x, xx, astack, stack, jamMode, p, q, sta
    astack = 0
    stack = 0; sta = 0
    x = input(f"어떤 뽑기? || 1. 캐릭터 | 2. 광추 | : ")
    while True:
        if(jamMode):
            c()
            x = input(f"어떤 뽑기? (성옥 '{jam}' 개 장전됨) ({jam//160}뽑) || 1. 캐릭터 | 2. 광추 | : ")
            b = input(f"--- {'광추' if x == "2" or x == "광추" else '캐릭터'} 뽑기 ---\n1. {'풀재?' if x == "2" or x == "광추" else '풀돌?'} | 2. 명함? | : ")
            for i in range(jam//160):
                print(full("광추" if x == "2" or x == "광추" else "캐릭터"))
                sta += 1
                match b:
                    case "1":
                        if(풀재 if x == "2" or x == "광추" else 풀돌): print("풀돌 성공!"); break
                    case _:
                        if(명함): print("명함 성공!"); break
            print(f"남은 성옥 : {jam-(sta*160)}개,", end=' '); print(f"이번 뽑기에 사용된 성옥 : {sta*160}개")
            print(f"총 {sta} 회 뽑았습니다.")
            print(recordprint(), end='')
            print((f"현재 뽑기 : '{'광추' if x == '2' or x == '광추' else '캐릭터'}' 뽑기\n현재까지 누적 뽑기 수 : {astack} 회, 사용된 성옥 : {astack * 160}개 [픽업 {'광추' if x == '2' or x == '광추' else '캐릭터'} : {f'{f"{f'{q}재' if q > 0 else '전광(명함)'}" if 전광 else "없음"}' if x == '2' or x == '광추' else f'{f"{f'{p}돌' if p > 0 else '명함'}" if 명함 else "없음"}'}{f'{"" if not(풀재) else "(풀재)"}' if x == '2' or x == '광추' else f'{"" if not(풀돌) else "(풀돌)"}'}]\n{'' if not(풀돌 or 풀재) else f'{f"{'픽업 광추 풀재 완료ㅡㅡ ' if 풀재 else ''}" if x == '2' or x == '광추' else f"{'픽업 캐릭터 풀돌 완료ㅡㅡ ' if 풀돌 else ''}"}'}"), end='')
            y = input("다시 시도?(Y/N) : ")
            if(y in ['n','N']): print("-- 거절됨 Denied --"); jamMode = False; continue
            else: continue
        xx = input((f"현재 뽑기 : '{'광추' if x == '2' or x == '광추' else '캐릭터'}' 뽑기\n현재까지 누적 뽑기 수 : {astack} 회, 사용된 성옥 : {astack * 160}개 [픽업 {'광추' if x == '2' or x == '광추' else '캐릭터'} : {f'{f"{f'{q}재' if q > 0 else '전광(명함)'}" if 전광 else "없음"}' if x == '2' or x == '광추' else f'{f"{f'{p}돌' if p > 0 else '명함'}" if 명함 else "없음"}'}{f'{"" if not(풀재) else "(풀재)"}' if x == '2' or x == '광추' else f'{"" if not(풀돌) else "(풀돌)"}'}]\n{'' if not(풀돌 or 풀재) else f'{f"{'픽업 광추 풀재 완료ㅡㅡ' if 풀재 else ''}" if x == '2' or x == '광추' else f"{'픽업 캐릭터 풀돌 완료ㅡㅡ' if 풀돌 else ''}"}\n'}{'엔터 : (10회 뽑기) | R : 기록 | C : 초기화 | Z : 풀돌 | X : 풀재 | V : 명함 | M : 전광 | B : 풀풀 | G : 관리자모드 | 0 : 나가기 | 숫자 입력 : 횟수 뽑기 | : ' if not(풀돌 or 풀재) else 'R : 기록 | C : 초기화 | : '}"))
        if(xx in ["r", "R",'ㄱ']):
            print(recordprint(), end='')
            continue
        elif(xx in ['c', 'C','ㅊ']):
            c("m")
            continue
        elif(xx in ['z','Z','ㅋ']): 
            c("m")
            while not(풀돌): print(full("캐릭터"))
            x = "1"
            print(recordprint(), end='')
            continue
        elif(xx in ['x','X','ㅌ']):
            c("m")
            while not(풀재): print(full("광추"))
            x = "2"
            print(recordprint(), end='')
            continue
        elif(xx in ['v','V','ㅍ']):
            c("m")
            while not(명함): print(full("캐릭터"))
            x = "1"
            print(recordprint(), end='')
            continue
        elif(xx in ['m', 'M','ㅡ']):
            c("m")
            while not(전광): print(full("광추"))
            x = "2"
            print(recordprint(), end='')
            continue
        elif(xx in ['g','G','ㅎ']):
            administerMode()
            continue
        elif(xx in ['b','B','ㅠ']):
            c("m")
            print("--- 캐릭터 ---")
            while not(풀돌): print(full("캐릭터"))
            print("--- 광추 ---")
            while not(풀재): print(full("광추"))
            x = "2"
            print(recordprint(), end='')
            print(f"현재까지 누적 뽑기 수 : {astack} 회, 사용된 성옥 : {astack*160}개")
            input("입력하여 종료하세요...")
            print("종료되었습니다.")
            c()
            break
        elif(xx == '0'):
            break
        try:
            if(type(int(xx)) == int and not(풀돌 or 풀재)):
                for i in range(int(xx)):
                    print(full("광추" if x == "2" or x == "광추" else "캐릭터"))
                    if(풀재 if x == "2" or x == "광추" else 풀돌): break
        except:
            if('q' in xx or 'Q' in xx):
                c("m")
                break
            else:
                if(not(풀돌 or 풀재)):
                    for i in range(10):
                        print(full("광추" if x == "2" or x == "광추" else "캐릭터"))
                        if(풀재 if x == "2" or x == "광추" else 풀돌): break

while True:
    maingame()