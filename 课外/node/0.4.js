// 用node压缩把回车换行去掉写到新的html
const fs = require('fs');
const path = require('path');

// 压缩后的输出文件路径
const outputFile = path.join(__dirname, '压缩轮播图.html');


// 1.读取原始 HTML 文件---------------------------------------------------------------------------------
fs.readFile(path.join(__dirname, '轮播图.html'), 'utf8', (err, data) => {
    if (err) {
        console.error('读取失败:', err);
        return;
    }

    // 更安全的压缩：保留 <pre>/<code>/<script> 内的空格结构，只压缩标签间的空白
    let inPreOrCode = false;
    let inScript = false;
    let result = '';
    let i = 0;

    while (i < data.length) {
        // 检测 <pre> 和 <code> 标签（简单检测，实际可用更复杂的解析）
        if (data.substr(i, 5).toLowerCase() === '<pre>' || data.substr(i, 6).toLowerCase() === '<code>') {
            inPreOrCode = true;
        }
        if (data.substr(i, 6).toLowerCase() === '</pre>' || data.substr(i, 7).toLowerCase() === '</code>') {
            inPreOrCode = false;
        }
        // 检测 script 标签
        if (data.substr(i, 7).toLowerCase() === '<script') {
            inScript = true;
        }
        if (data.substr(i, 8).toLowerCase() === '</script') {
            inScript = false;
        }

        if (inPreOrCode || inScript) {
            // 在 pre/code/script 内部，原样保留
            result += data[i];
            i++;
        } else {
            // 2.外部区域，压缩空白-----------------------------------------------------------------------
            if (/\s/.test(data[i])) {
                // 遇到空白字符，跳过连续空白，只加一个空格
                result += ' ';
                while (i < data.length && /\s/.test(data[i])) {
                    i++;
                }
            } else {
                result += data[i];
                i++;
            }
        }
    }

    // 进一步优化：去掉标签之间的多余空格----------------------------------------------------------------
    result = result.replace(/>\s+</g, '><').trim();
    // 3. 写入文件-------------------------------------------------------------------------------------
    fs.writeFile(outputFile, result, 'utf8', (err) => {
        if (err) {
            console.error('写入失败:', err);
            return;
        }
        console.log(`✅ 压缩完成: ${outputFile}`);
        console.log(`压缩前: ${(data.length / 1024).toFixed(2)} KB → 压缩后: ${(result.length / 1024).toFixed(2)} KB`);
    });
});