class DefineWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }
  // 注入变量
  genDefine() {
    const { options } = this;
    let str = "";
    Object.keys(options).forEach((key) => {
      const value = options[key];
      str += `window.${key} = ${JSON.stringify(value)};`;
    });
    return str;
  }
  apply(compiler) {
    compiler.hooks.emit.tap("DefineWebpackPlugin", (compilation) => {
      // 找到所有入口
      const entrypoints = compilation.entrypoints;
      for (let entrypoint of entrypoints) {
        // 找到相关的chunk
        const chunks = entrypoint[1].chunks;

        chunks.forEach((chunk) => {
          // 找到相关的文件
          const files = chunk.files;
          files.forEach((file) => {
            const assets = compilation.assets;
            // 获取文件的内容
            const content = assets[file].source();
            const define = this.genDefine();
            // 用新内容去替换
            const newContent = `${define}${content}`;
            assets[file] = {
              source() {
                return newContent;
              },
              size() {
                return newContent.length;
              },
            };
          });
        });
      }
    });
  }
}

module.exports = DefineWebpackPlugin;
