# TypeScript 入门

初学 TypeScript

## 常见类型

- string
- number
- boolean
- void
- symbol
- any

## 类型声明

1. 类型推论：根据第一次赋值的值类型来推论。如果声明时不进行类型声明，也不赋值时，默认为 any 类型

```javascript
let name = 'xx' // string 类型， 再赋值其他类型就有报错提示

// name2 默认为any类型，不会有报错提示
let name2
name2 = ‘123’
name2 = {}
```

2. 类型注解
