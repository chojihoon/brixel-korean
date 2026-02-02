# OLED Korean - 마이크로비트 OLED 한글 출력

마이크로비트에서 OLED 디스플레이(SSD1306/SH1106)에 한글을 출력할 수 있는 MakeCode 확장 프로그램입니다.

## 기능

- 🇰🇷 **한글 출력**: 16x16 픽셀 한글 폰트 지원
- 📝 **한글 입력기**: Editor Extension을 통한 쉬운 한글 입력
- 🖥️ **OLED 지원**: SSD1306 (0.96") 및 SH1106 (1.3") 지원
- 🔤 **ASCII 지원**: 영문, 숫자, 특수문자 출력

## 사용 방법

### 1. 확장 프로그램 추가

MakeCode에서 **확장** 메뉴를 클릭하고, 아래 URL을 입력하세요:

```
https://github.com/YOUR_GITHUB_USERNAME/brixel-korean
```

### 2. 한글 입력기 사용

1. **OLED Korean** 카테고리에서 **"한글 입력기"** 버튼을 클릭
2. 팝업 창에서 한글 입력
3. **적용** 버튼 클릭
4. 생성된 HEX 코드를 블록에 붙여넣기

### 3. 블록 사용 예시

```blocks
OLEDKorean.initSSD1306()
OLEDKorean.showKoreanText("C548 B155", 0, 0)  // "안녕" 출력
```

## 한글 HEX 코드 예시

| 한글 | HEX 코드 |
|------|----------|
| 안녕 | C548 B155 |
| 안녕하세요 | C548 B155 D558 C138 C694 |
| 시작 | C2DC C791 |
| 정지 | C815 C9C0 |
| 온도 | C628 B3C4 |
| 습도 | C2B5 B3C4 |

## 지원 하드웨어

- **SSD1306**: 0.96인치 128x64 OLED (I2C)
- **SH1106**: 1.3인치 128x64 OLED (I2C)

## 라이선스

MIT License

## Supported targets

* for PXT/microbit

```package
brixel-korean=github:YOUR_GITHUB_USERNAME/brixel-korean
```
