
// 我们的 loader 将会处理 .txt 文件, 并且将任何实例中的 [name] 直接替换为 loader 选项中设置的 name。然后返回包含默认导出文本的 JavaScript 模块。

import { getOptions } from 'loader-utils';
export default function(source) {
    const options = getOptions(this);

    source = source.replace(/\[name\]/g, options.name);
    return `export default ${JSON.stringify(source)}`;
}