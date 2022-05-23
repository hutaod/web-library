const keyWithPrefix = (prefix: string, key: string) => {
  if (prefix !== "") {
    // 首字母大写
    return prefix + key.slice(0, 1).toUpperCase() + key.slice(1);
  }
  return key;
};

class PageVisibility {
  private __hidden = "";

  private __state = "";

  private __prefixSupport = "";

  __bindFn = () => {};

  supportHidden = false; // 是否支持document.hidden

  supportState = false; // 是否支持document.visibilityState

  constructor() {
    this.supportHidden = this.__isPageHiddenSupport();
    this.supportState = this.__isPageVisibilitySupport();
  }

  // 当前浏览器是否支持hidden
  private __isPageHiddenSupport() {
    let support = false;
    if (typeof window?.screenX !== "number") {
      return support;
    }
    ["", "webkit", "moz", "ms", "o"].forEach((item) => {
      const s = keyWithPrefix(item, "hidden");
      if (!support && s in document) {
        this.__hidden = s;
        this.__prefixSupport = item;
        support = true;
      }
    });
    return support;
  }

  // 当前浏览器是否支持hidden
  private __isPageVisibilitySupport() {
    let support = false;
    if (typeof window?.screenX !== "number") {
      return support;
    }
    ["", "webkit", "moz", "ms", "o"].forEach((item) => {
      const s = keyWithPrefix(item, "visibilityState");
      if (!support && s in document) {
        this.__state = keyWithPrefix(item, "visibilityState");
        support = true;
      }
    });
    return support;
  }

  /**
   * 监听页面可见性的变化
   * @param {function} fn 回调方法
   * @param {boolean} usecapture 是否冒泡
   */
  visibilityChange(fn: (visibility: boolean) => void, usecapture = false) {
    if ((this.supportHidden || this.supportState) && typeof fn === "function") {
      const self = this;

      this.__bindFn = function () {
        fn.call(null, self.isShow());
      }.bind(this);

      // 先注销上一个事件，然后再注册下一个事件
      this.destory();
      return document.addEventListener(this.__prefixSupport + "visibilitychange", this.__bindFn, usecapture);
    }
  }

  // 多次执行时，先去掉之前的事件，防止附加多个change事件
  destory() {
    document.removeEventListener(this.__prefixSupport + "visibilitychange", this.__bindFn);
  }

  /**
   * 获取当前页面的可见性
   *
   * @returns {boolean} 是否可见
   */
  isShow(): boolean {
    if (this.supportState) {
      return (document as any)[this.__state] === "visible";
    }
    if (this.supportHidden) {
      return !(document as any)[this.__hidden];
    }
    // 若不支持，则默认页面一直可见
    return true;
  }
}

export default PageVisibility;
