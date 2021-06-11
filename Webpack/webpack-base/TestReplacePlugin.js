"use strict";

const fs = require("fs");

const path = require("path");

function getAllFiles(root) {
  var res = [],
    files = fs.readdirSync(root);
  files.forEach(function (file) {
    var pathname = root + "/" + file,
      stat = fs.lstatSync(pathname);

    if (!stat.isDirectory()) {
      res.push(pathname);
    } else {
      res = res.concat(getAllFiles(pathname));
    }
  });
  return res;
}

function replace(file, rules) {
  const src = path.resolve(file);
  let template = fs.readFileSync(src, "utf8");

  template = rules.reduce(
    (template, rule) =>
      template.replace(
        rule.search,
        typeof rule.replace === "string"
          ? rule.replace
          : rule.replace.bind(global)
      ),
    template
  );

  fs.writeFileSync(src, template);
}

function ReplaceInFilePlugin(options = []) {
  this.options = options;
}

ReplaceInFilePlugin.prototype.apply = function (compiler) {
  const root = compiler.options.context;
  console.log(123);
  // compiler.hooks.compilation.tap("ReplaceInFilePlugin", (compilation, callback) => {
  //   compilation.hooks.assetPath.tap("ReplaceInFilePlugin", (chunk, filename) => {
  //     console.log(2222, module, filename)
  //     // modules.forEach((chunk) => {
  //     //   console.log({
  //     //     id: chunk.id,
  //     //     name: chunk.name,
  //     //     includes: chunk.getModules().map((module) => module.request),
  //     //   });
  //     // });
  //     //   if (modules && modules.resource && modules.resource.endsWith(".scss")) {
  //     //     console.log(333, modules.resource, modules._source)
  //     //   }
  //     // console.log(modules)
  //     // modules.forEach(mod => {
  //     //   console.log(3333, mod.resource)
  //     //   if (mod && mod.resource && mod.resource.endsWith(".scss")) {
  //     //     console.log(333, mod.resource, mod._source._value)
  //     //   }
  // 		// 	// if (isMatch(mod.resource)) {
  // 		// 	// 	mod._source._value = mod._source._value.replace(RGXP, k => vals[k]);
  // 		// 	// 	pats.forEach((v,k) => {
  // 		// 	// 		mod._source._value = mod._source._value.replace(k, v);
  // 		// 	// 	});
  // 		// 	// }
  // 		// });
  //   });
  //   // console.log('[Success] 开始编译', compilation.hooks.buildModule)
  //   // compilation.hooks.buildModule.tap(
  //   //   'ReplaceInFilePlugin',
  //   //   (module) => {
  //   //     // console.log(222, module.resource)
  //   //     if(module.resource && module.resource.endsWith(".scss")) {
  //   //       console.log(2222, module)
  //   //     }
  //   //     // console.log(compilation.assets)
  //   //     // module.useSourceMap = true;
  //   //   }
  //   // );
  //   // compilation.hooks.additionalAssets.tapAsync("ReplaceInFilePlugin", (callback) => {
  //   //   console.log(222, compilation.assets)
  //   //   // chunks.forEach(chunk => {
  //   //   //   chunk.files.forEach(file => {
  //   //   //     compilation.assets[file] = new ConcatSource(
  //   //   //       '\/**Sweet Banner**\/',
  //   //   //       '\n',
  //   //   //       compilation.assets[file]
  //   //   //     );
  //   //   //   });
  //   //   // });
  //   //   // return new Promise((resolve) => {
  //   //   //   resolve(chunks)
  //   //   // })
  //   //   callback();
  //   // });
  //   // callback();
  // })
  // const done = (statsData) => {
  //   if (statsData.hasErrors()) {
  //     return;
  //   }
  //   this.options.forEach((option) => {
  //     const dir = option.dir || root;
  //     const files = option.files;

  //     if (option.files) {
  //       const files = option.files;
  //       if (Array.isArray(files) && files.length) {
  //         files.forEach((file) => {
  //           replace(path.resolve(dir, file), option.rules);
  //         });
  //       }
  //     } else if (option.test) {
  //       const test = option.test;
  //       const testArray = Array.isArray(test) ? test : [test];
  //       const files = getAllFiles(dir);

  //       files.forEach((file) => {
  //         const match = testArray.some((test, index, array) => {
  //           return test.test(file);
  //         });

  //         if (!match) {
  //           return;
  //         }

  //         replace(file, option.rules);
  //       });
  //     } else {
  //       const files = getAllFiles(dir);
  //       files.forEach((file) => {
  //         replace(file, option.rules);
  //       });
  //     }
  //   });
  // };

  // if (compiler.hooks) {
  //   const plugin = {
  //     name: "ReplaceInFilePlugin",
  //   };
  //   compiler.hooks.done.tap(plugin, done);
  // } else {
  //   compiler.plugin("done", done);
  // }
};

module.exports = ReplaceInFilePlugin;
