(function(graph){
    function require(module) {
      function localrequire(relativePath) {
        return require(graph[module].dependecies[relativePath])
      }
      var exports = {};
      (function(require, exports, code) {
        eval(code)
      })(localrequire, exports, graph[module].code);
      return exports
    }
    require('./src/index.js')
  })({"./src/index.js":{"dependecies":{"./hello.js":"./src/hello.js"},"code":"\"use strict\";\n\nvar _hello = require(\"./hello.js\");\n\ndocument.write((0, _hello.say)('webpack'));"},"./src/hello.js":{"dependecies":{"./word.js":"./src/word.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.say = say;\n\nvar _word = require(\"./word.js\");\n\nfunction say(name) {\n  return 'hello ' + name + (0, _word.say2)(name);\n}"},"./src/word.js":{"dependecies":{"./a.js":"./src/a.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.say2 = say2;\n\nvar _a = require(\"./a.js\");\n\nfunction say2(name) {\n  (0, _a.haha)(name);\n  return 'hello ' + name;\n}"},"./src/a.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.haha = haha;\n\nfunction haha(name) {\n  console.log('haha', name);\n}"}})