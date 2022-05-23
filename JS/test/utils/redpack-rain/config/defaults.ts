// 每个红包的配置
interface RedpackRainItem {
  speedMin: number;
  speedMax: number;
  imgUrl: string;
  width: number;
  height: number;
}

export interface BubbleProps {
  imgUrl: string;
  width: number;
  height: number;
  speed: number;
  opacitySpeed: number;
}

interface MonitorProps {
  fps: number;
}

export interface RedpackRainOptions {
  interval: number;
  eventType: "click" | "touchstart";
  redpack: RedpackRainItem | RedpackRainItem[];
  bubble: BubbleProps;
  onClick?: (isHit: boolean) => void;
  onMonitor?: (props: MonitorProps) => void;
}

const defaultsConfig: RedpackRainOptions = {
  interval: 900,
  eventType: "touchstart",
  redpack: {
    speedMin: 22,
    speedMax: 22,
    imgUrl: "https://sola.gtimg.cn/aoi/sola/20201226100322_I1ltnkzJVc.png",
    width: 126,
    height: 174,
  },
  bubble: {
    imgUrl: "https://sola.gtimg.cn/aoi/sola/20201225103914_2QQ9bXg2rU.png",
    width: 156,
    height: 111,
    speed: 5,
    opacitySpeed: 0.04,
  },
  onClick: () => {
    /* isHit */
  },
};
export default defaultsConfig;
