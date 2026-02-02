// 한글 → hex 코드 변환
function koreanToHex(text) {
    if (!text) return "";
    var result = [];
    for (var i = 0; i < text.length; i++) {
        var code = text.charCodeAt(i);
        if (code >= 0xAC00 && code <= 0xD7A3) {
            // 한글 음절
            result.push(code.toString(16).toUpperCase());
        } else if (code >= 32 && code < 128) {
            // ASCII
            result.push(code.toString(16).toUpperCase());
        }
    }
    return result.join(" ");
}

// hex 코드 → 한글 변환 (표시용)
function hexToKorean(hex) {
    if (!hex) return "";
    var parts = hex.split(" ");
    var result = "";
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (part.length > 0) {
            var code = parseInt(part, 16);
            if (!isNaN(code) && code > 0) {
                result += String.fromCharCode(code);
            }
        }
    }
    return result;
}

// MakeCode 필드 에디터 등록
(function() {
    // Blockly가 로드될 때까지 대기
    if (typeof Blockly === "undefined" || typeof pxt === "undefined") {
        return;
    }

    var FieldKorean = function(text, options, validator) {
        this.hexValue = text || "";
        Blockly.FieldTextInput.call(this, this.hexValue, validator);
    };

    // FieldTextInput 상속
    if (Blockly.FieldTextInput) {
        FieldKorean.prototype = Object.create(Blockly.FieldTextInput.prototype);
        FieldKorean.prototype.constructor = FieldKorean;
    }

    // 에디터에 표시할 텍스트
    FieldKorean.prototype.getText = function() {
        var korean = hexToKorean(this.hexValue);
        return korean || "한글입력";
    };

    // 값 가져오기
    FieldKorean.prototype.getValue = function() {
        return this.hexValue;
    };

    // 값 설정
    FieldKorean.prototype.setValue = function(newValue) {
        if (newValue === null || newValue === undefined) {
            return;
        }
        this.hexValue = newValue;
        Blockly.FieldTextInput.prototype.setValue.call(this, newValue);
    };

    // 에디터 표시
    FieldKorean.prototype.showEditor_ = function() {
        var currentKorean = hexToKorean(this.hexValue);
        var newValue = window.prompt("한글을 입력하세요:", currentKorean);

        if (newValue !== null) {
            var hexResult = koreanToHex(newValue);
            this.setValue(hexResult);
        }
    };

    // fromJson 구현
    FieldKorean.fromJson = function(options) {
        return new FieldKorean(options["text"]);
    };

    // Blockly에 필드 등록
    if (Blockly.fieldRegistry) {
        Blockly.fieldRegistry.register("field_korean", FieldKorean);
    } else if (Blockly.Field && Blockly.Field.register) {
        Blockly.Field.register("field_korean", FieldKorean);
    }

    // pxt 에디터에도 등록
    if (pxt && pxt.blocks && pxt.blocks.registerFieldEditor) {
        pxt.blocks.registerFieldEditor("korean", FieldKorean);
    }
})();
