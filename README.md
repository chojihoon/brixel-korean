# OLED Korean - 마이크로비트 OLED 한글 출력

마이크로비트에서 OLED 디스플레이(SSD1306/SH1106)에 한글을 출력할 수 있는 MakeCode 확장 프로그램입니다.

## 🔧 한글 변환 도구

**👉 [한글 → HEX 변환기 바로가기](https://chojihoon.github.io/brixel-korean/)**

위 링크에서 한글을 입력하면 HEX 코드로 변환됩니다. 변환된 코드를 복사하여 MakeCode 블록에 붙여넣기 하세요!

## 기능

- 🇰🇷 **한글 출력**: 16x16 픽셀 한글 폰트 지원
- 🔧 **변환 도구**: 웹 기반 한글→HEX 변환기 제공
- 🖥️ **OLED 지원**: SSD1306 (0.96") 및 SH1106 (1.3") 지원
- 🔤 **ASCII 지원**: 영문, 숫자, 특수문자 출력

## 사용 방법

### 1. 확장 프로그램 추가

MakeCode에서 **확장** 메뉴를 클릭하고, 아래 URL을 입력하세요:

```
https://github.com/chojihoon/brixel-korean
```

### 2. 한글 출력하기

1. **[한글 변환기](https://chojihoon.github.io/brixel-korean/)** 페이지 열기
2. 한글 입력 (예: "안녕")
3. **"HEX 코드 복사하기"** 클릭
4. MakeCode에서 **"OLED 0.96 한글출력"** 블록 추가
5. 텍스트 입력칸에 **붙여넣기 (Ctrl+V)**

### 3. 블록 사용 예시

```blocks
OLEDKorean.initSSD1306()
OLEDKorean.showKoreanText("C548 B155", 0, 0)  // "안녕" 출력
```

## 한글 HEX 코드 예시

| 한글 | HEX 코드 |
|------|----------|
| 안녕 | C548 B155 |
| 시작 | C2DC C791 |
| 정지 | C815 C9C0 |
| 온도 | C628 B3C4 |
| 습도 | C2B5 B3C4 |
| 성공 | C131 ACF5 |
| 실패 | C2E4 D328 |

## 지원 하드웨어

- **SSD1306**: 0.96인치 128x64 OLED (I2C)
- **SH1106**: 1.3인치 128x64 OLED (I2C)

## 라이선스

MIT License

## Supported targets

* for PXT/microbit

```package
brixel-korean=github:chojihoon/brixel-korean
```
