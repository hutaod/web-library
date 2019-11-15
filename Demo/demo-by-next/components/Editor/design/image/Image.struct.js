import { types } from "../../config";

export default class ImageStruct {
  constructor() {
    this.dataInfo = {
      type: types.IMAGE,
      id: Math.random()
        .toString(36)
        .substr(2),
      data: {
        src: "",
      },
    };
  }
}
