import * as types from "./types";
import Image from "../design/image";
import Text from "../design/text";

const compsMap = {
  [types.IMAGE]: {
    comp: Image,
    name: "图片",
  },
  [types.TEXT]: {
    comp: Text,
    name: "文本",
  },
};

const compsConfig = Object.keys(compsMap).map(key => {
  return {
    type: key,
    name: compsMap[key].name,
  };
});

export { types, compsConfig, compsMap };
