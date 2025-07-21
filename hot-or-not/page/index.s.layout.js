import * as hmUI from "@zos/ui";
import { px } from "@zos/utils";

import { DEVICE_WIDTH } from "../utils/config/device";

export const FETCH_RESULT_TEXT = {
  x: px(50),
  y: px(100),
  w: DEVICE_WIDTH - 2 * px(50),
  h: px(160),
  color: 0xffffff,
  text_size: px(36),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.WRAP,
};

export const BACKGROUND_IMG = {
  h: px(300)
}

export const TEMPERATURE_TEXT = {
  x: px(72),
  y: px(305),
  w: px(390),
  h: px(32),
  color: 0xffffff,
  text_size: px(32),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.WRAP,
};

export const TEMPERATURE_IMG = {
  src: "temperature.png",
  x: px(30),
  y: px(305),
}

export const SENSATION_TEXT = {
  x: px(72),
  y: px(345),
  w: px(390),
  h: px(32),
  color: 0xffffff,
  text_size: px(32),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.WRAP,
};

export const SENSATION_IMG = {
  src: "sensation.png",
  x: px(30),
  y: px(345),
}

export const HUMIDITY_TEXT = {
  x: px(72),
  y: px(385),
  w: px(390),
  h: px(32),
  color: 0xffffff,
  text_size: px(32),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.WRAP,
};

export const HUMIDITY_IMG = {
  src: "humidity.png",
  x: px(30),
  y: px(385),
}