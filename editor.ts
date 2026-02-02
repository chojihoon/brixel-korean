/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts"/>

namespace pxt.editor {
    interface KoreanFieldOptions extends pxt.editor.FieldCustomOptions {
    }

    // 한글을 hex 코드로 변환
    function koreanToHex(text: string): string {
        let result: string[] = [];
        for (let i = 0; i < text.length; i++) {
            let code = text.charCodeAt(i);
            if (code >= 0xAC00 && code <= 0xD7A3) {
                // 한글 음절
                result.push(code.toString(16).toUpperCase());
            } else if (code >= 32 && code < 128) {
                // ASCII - 그대로 유지하거나 hex로
                result.push(code.toString(16).toUpperCase());
            }
        }
        return result.join(" ");
    }

    // hex 코드를 한글로 변환 (표시용)
    function hexToKorean(hex: string): string {
        if (!hex) return "";
        let parts = hex.split(" ");
        let result = "";
        for (let part of parts) {
            if (part.length > 0) {
                let code = parseInt(part, 16);
                if (code >= 0xAC00 && code <= 0xD7A3) {
                    result += String.fromCharCode(code);
                } else if (code >= 32 && code < 128) {
                    result += String.fromCharCode(code);
                }
            }
        }
        return result;
    }

    export class FieldKoreanText extends pxt.editor.FieldCustom implements Blockly.FieldCustom {
        public isFieldCustom_ = true;
        private hexValue: string = "";

        constructor(text: string, params: KoreanFieldOptions, validator?: Blockly.FieldValidator) {
            super(text, params, validator);
            this.hexValue = text || "";
        }

        getText(): string {
            // 에디터에 표시할 텍스트 (한글로 변환)
            return hexToKorean(this.hexValue) || "한글 입력";
        }

        getValue(): string {
            return this.hexValue;
        }

        setValue(newValue: string): void {
            this.hexValue = newValue || "";
            super.setValue(this.hexValue);
        }

        showEditor_(): void {
            // 입력 다이얼로그 표시
            const currentKorean = hexToKorean(this.hexValue);

            const newValue = prompt("한글을 입력하세요:", currentKorean);
            if (newValue !== null) {
                const hexResult = koreanToHex(newValue);
                this.setValue(hexResult);
                if (this.sourceBlock_) {
                    Blockly.Events.fire(new (Blockly.Events as any).BlockChange(
                        this.sourceBlock_, 'field', this.name, this.hexValue, hexResult
                    ));
                }
            }
        }
    }
}
