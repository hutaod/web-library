import { merge } from "lodash";

import Visibility from "./libs/visibility";

import defaultsConfig, { RedpackRainOptions } from "./config/defaults";
import RedpackItem from "./libs/redpackItem";

interface RedpackRainProps extends Partial<RedpackRainOptions> {
  selector: HTMLElement | string;
  redpack: RedpackRainOptions["redpack"];
  bubble: RedpackRainOptions["bubble"];
}

class RedpackRain {
  private timer: NodeJS.Timeout | null = null;

  private rainCtx: CanvasRenderingContext2D | null = null;

  private bubbleCtx: CanvasRenderingContext2D | null = null;

  private config = defaultsConfig;

  private selector: HTMLElement | undefined;

  private parentClientRect = { width: 0, height: 0, top: 0, left: 0 };

  private ratio = 3;

  private redpackItemList: {
    [key: number]: RedpackItem;
  } = {};

  private requestId: number | null = null;

  private fpsBefore = Date.now(); // 计算fps

  private lastRedpackX = 0; // 上个红包的横坐标

  private pageVisibility: Visibility | null = null;

  constructor(props: RedpackRainProps) {
    this.config = merge(this.config, props);

    if (typeof props.selector === "string") {
      const dom: HTMLElement | null = document.querySelector(props.selector);
      if (dom) {
        this.selector = dom;
      } else {
        throw new Error(`rain container cant found, selector: ${props.selector}`);
      }
    } else {
      this.selector = props.selector;
    }
    this.creatCanvas();
    this.pageVisibility = new Visibility();
  }

  // 在指定容器内创建2个canvas
  private creatCanvas() {
    const selector: HTMLElement = this.selector as HTMLElement;

    const { top, left, width, height } = selector.getBoundingClientRect();

    this.parentClientRect.width = width * this.ratio;
    this.parentClientRect.height = height * this.ratio;
    this.parentClientRect.top = top;
    this.parentClientRect.left = left;

    if (selector.getElementsByTagName("canvas").length === 0) {
      const canvasBubble = document.createElement("canvas");
      canvasBubble.className = "bubble-redpack-canvas";
      canvasBubble.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1";
      canvasBubble.width = this.parentClientRect.width;
      canvasBubble.height = this.parentClientRect.height;

      const canvasRain = document.createElement("canvas");
      canvasRain.className = "rain-redpack-canvas";
      canvasRain.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2";
      canvasRain.width = this.parentClientRect.width;
      canvasRain.height = this.parentClientRect.height;

      const div = document.createElement("div");
      div.className = `rain-item rain-${Date.now()}-${Math.random()}`;
      div.style.cssText = "position: relative; height: 100%";
      div.appendChild(canvasBubble);
      div.appendChild(canvasRain);

      selector.appendChild(div);

      const rainCanvasSelector: HTMLCanvasElement | null = selector.querySelector(".rain-redpack-canvas");
      const bubbleCanvasSelector: HTMLCanvasElement | null = selector.querySelector(".bubble-redpack-canvas");

      if (rainCanvasSelector && bubbleCanvasSelector) {
        this.rainCtx = rainCanvasSelector.getContext("2d");
        this.bubbleCtx = bubbleCanvasSelector.getContext("2d");
      }
    }
  }

  /**
   * 返回红包创建时的x轴坐标
   * @param width 红包的宽度
   */
  private getRedpackItemX(width: number): number {
    let x = this.lastRedpackX;
    do {
      x = Math.floor(Math.random() * (this.parentClientRect.width - width * 3) + width); // 避免红包产生在边界
    } while (Math.abs(this.lastRedpackX - x) <= width * 1.5); // 避免先后两个红包重叠

    this.lastRedpackX = x;
    return x;
  }

  // 创建红包
  private createRedpackItem() {
    if (!this.rainCtx || !this.bubbleCtx) {
      this.stop();
      return;
    }
    let redpack;
    if (Array.isArray(this.config.redpack)) {
      redpack = this.config.redpack[Math.ceil(Math.random() * this.config.redpack.length) - 1];
    } else {
      redpack = this.config.redpack;
    }

    if (!redpack) {
      return;
    }

    const { width, height, speedMax, speedMin, imgUrl } = redpack;
    const redpackItemId = Date.now();
    const x = this.getRedpackItemX(width);

    const redpackItem = new RedpackItem({
      redpackId: redpackItemId,
      redpackCtx: this.rainCtx,
      bubbleCtx: this.bubbleCtx,
      x,
      y: -height * 3,
      redpackImgUrl: imgUrl,
      width: width * 3,
      height: height * 3,
      speedMax,
      speedMin,
      bubble: this.config.bubble,
      containerHeight: this.parentClientRect.height,
      onDestoryed: (id) => {
        // eslint-disable-next-line
        delete this.redpackItemList[id];
      },
    });
    redpackItem.start();
    this.redpackItemList[redpackItemId] = redpackItem;
  }

  private clickListener = (event: MouseEvent | TouchEvent) => {
    if (typeof this.config.onClick !== "function") {
      return;
    }
    let touchClients: Array<{ clientX: number; clientY: number }> = []; // 手指触控的坐标
    if (event.type === "touchstart") {
      // touchstart
      touchClients = Array.prototype.slice.call((event as TouchEvent).touches).map((touch) => ({
        clientX: touch.clientX,
        clientY: touch.clientY,
      }));
    } else {
      // click
      touchClients = [
        {
          clientX: (event as MouseEvent).clientX,
          clientY: (event as MouseEvent).clientY,
        },
      ];
    }

    const { left, top } = this.parentClientRect;

    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
    }
    touchClients.forEach(({ clientX, clientY }) => {
      const myClientX = (clientX - left) * this.ratio;
      const myClientY = (clientY - top) * this.ratio;
      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.redpackItemList) {
        const redpackItem = this.redpackItemList[key];
        const { x, y, width, height } = redpackItem;

        const diff = 14;
        let isHited = false;
        if (
          myClientX >= x - diff &&
          myClientX <= x + width + diff &&
          myClientY >= y - diff &&
          myClientY <= y + height + diff
        ) {
          // eslint-disable-next-line
          delete this.redpackItemList[key];
          redpackItem.addBubble();
          isHited = true;
        }
        if (typeof this.config.onClick === "function") {
          this.config.onClick(isHited);
        }
      }
    });
    this.render();
  };

  private render() {
    this.requestId = window.requestAnimationFrame(() => {
      this.rainCtx?.clearRect(0, 0, this.parentClientRect.width, this.parentClientRect.height);
      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.redpackItemList) {
        const redpackItem = this.redpackItemList[key];

        redpackItem.render();
      }
      const now = Date.now();
      const fps = Math.round(1000 / (now - this.fpsBefore));
      this.fpsBefore = now;
      if (typeof this.config.onMonitor === "function") {
        this.config.onMonitor({ fps });
      }
      this.render();
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  setOptions(options: RedpackRainOptions) {
    if (!this.timer) {
      // 若没有启动红包雨，则无法调用该方法
      // eslint-disable-next-line
      return console.error("please use start() before setOptions");
    }
    const beforeInterval = this.config.interval;
    this.config = merge(this.config, options);

    // 当下红包雨的间隔变化后，则重置定时器；
    // 若间隔不变，则还是使用之前的定时器
    if (beforeInterval !== this.config.interval) {
      this.start();
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  start() {
    if (!this.selector) {
      return;
    }
    // 先停止上一个
    this.clear();
    this.selector.addEventListener(this.config.eventType, this.clickListener, false);

    this.createRedpackItem();

    // 创建一个新的红包雨
    this.timer = setInterval(() => {
      this.createRedpackItem();
    }, this.config.interval);
    this.render();

    this.pageVisibility?.visibilityChange((isShow) => {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      if (isShow) {
        // 创建一个新的红包雨
        this.timer = setInterval(() => {
          this.createRedpackItem();
        }, this.config.interval);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  clear() {
    // 停止产生新的红包
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    // 停止渲染
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }

    // 清空面板
    this.rainCtx?.clearRect(0, 0, this.parentClientRect.width, this.parentClientRect.height);

    // 解除已绑定的事件
    this.selector?.removeEventListener(this.config.eventType, this.clickListener);

    // 解除事件
    this.pageVisibility?.destory();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  stop() {
    this.clear();

    // 清空已存储的红包
    this.redpackItemList = {};
  }
}
export default RedpackRain;
