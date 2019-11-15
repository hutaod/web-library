import { types } from "../../config";

export default class TextStruct {
  constructor() {
    this.dataInfo = {
      type: types.TEXT,
      id: Math.random()
        .toString(36)
        .substr(2),
      data: {
        text: "",
      },
    };
  }
}
