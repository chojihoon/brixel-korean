import re
import os

def parse_header_array(file_path, array_name, is_korean=False):
    data = []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Find the array content between { and }
    # Specialized regex for the different file formats
    if is_korean:
        # Match K_font[360][32]
        match = re.search(r'K_font.*?\{(.*)\};', content, re.DOTALL)
    elif "English" in file_path:
         match = re.search(r'E_font.*?\{(.*)\};', content, re.DOTALL)
    else:
        # For Seg0, Seg1 etc (Big Nums), we return a dictionary or list of lists
        return []

    if match:
        array_str = match.group(1)
        # Remove comments
        array_str = re.sub(r'//.*', '', array_str)
        # Find all hex numbers
        hex_nums = re.findall(r'0x[0-9A-Fa-f]+', array_str)
        return hex_nums
    return []

def parse_big_nums(file_path):
    big_nums = []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract Seg0 to Seg10
    for i in range(11):
        pattern = r'const byte Seg' + str(i) + r'\[\] PROGMEM = \{(.*?)\};'
        match = re.search(pattern, content, re.DOTALL)
        if match:
            array_str = match.group(1)
            array_str = re.sub(r'//.*', '', array_str)
            hex_nums = re.findall(r'0x[0-9A-Fa-f]+', array_str)
            big_nums.append(hex_nums)
    return big_nums

# Paths
base_path = r"C:\brixel-korean"
korean_font_path = os.path.join(base_path, r"OLED_HAN_UNO_SSD1306(0.96inch)\hmgothic.h")
english_font_path = os.path.join(base_path, r"OLED_HAN_UNO_SSD1306(0.96inch)\English8x16.h")
big_num_path = os.path.join(base_path, r"OLED_HAN_UNO_SSD1306(0.96inch)\OLED_HAN_UNO.h")
output_path = os.path.join(base_path, r"brixel-korean\oled_korean.ts")

# Parse
print("Parsing Korean Font...")
k_font = parse_header_array(korean_font_path, "K_font", is_korean=True)

print("Parsing English Font...")
e_font = parse_header_array(english_font_path, "E_font")

print("Parsing Big Nums...")
big_nums = parse_big_nums(big_num_path)

# Generate TS Content
ts_content = """/**
 * OLED Korean Support with SSD1306/SH1106 Drivers
 */
//% weight=100 color=#2c3e50 icon="\\uf108" block="OLED Korean"
//% groups="['OLED0.96\\'(SSD1306)', 'OLED1.3\\'(SH1106)']"
namespace OLEDKorean {
    // 16x16 Korean Font (Chosung, Jungsung, Jongsung)
    // Converted to Hex Buffer for performance
    export const K_FONT = hex`
"""

def format_hex(nums, indent=8, wrap=32):
    # Convert numbers to 2-digit hex string
    try:
        hex_str = "".join([f"{int(num, 16):02X}" for num in nums])
    except ValueError:
        # Fallback if num is int already (unlikely with this regex but safe)
        hex_str = "".join([f"{int(num):02X}" for num in nums])
    # Wrap lines
    lines = []
    for i in range(0, len(hex_str), wrap):
        lines.append(" " * indent + hex_str[i:i+wrap])
    return "\n".join(lines)

ts_content += format_hex(k_font)
ts_content += "`;\n\n"

ts_content += "    // 8x16 English Font\n"
ts_content += "    export const E_FONT = hex`\n"
ts_content += format_hex(e_font)
ts_content += "`;\n\n"

ts_content += "    // 32x32 Big Numbers (0-10)\n"
ts_content += "    export const BIG_NUMS = [\n"
for i, nums in enumerate(big_nums):
    ts_content += f"        // {i}\n        hex`\n"
    ts_content += format_hex(nums, indent=12, wrap=32)
    ts_content += "`,\n"
ts_content += "    ];\n"
ts_content += "}\n"

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated {output_path}")
