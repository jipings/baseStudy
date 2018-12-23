// 如果一个loader使用外部资源（例如：从文件系统读取），必须声明它，这些信息
// 用于使缓存laoders无效，以及在观察式（watch mode）下重新编译

import path from 'path';
import fs from 'fs';

export default function(source) {
    var callback = this.async();
    var headerPath = path.resolve('header.js');

    this.addDependency(headerPath);

    fs.readFile(headerPath, 'utf-8', function(err, header) {
        if(err) return callback(err);
        callback(null, header+'\n'+source)
    })
}