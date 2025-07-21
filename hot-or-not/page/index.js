import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import {
  BACKGROUND_IMG,
  TEMPERATURE_TEXT,
  SENSATION_TEXT,
  HUMIDITY_TEXT,
  TEMPERATURE_IMG,
  SENSATION_IMG,
  HUMIDITY_IMG
} from "zosLoader:./index.[pf].layout.js";

const logger = Logger.getLogger("fetch_api");

let temperatureTextWidget;
let sensationTextWidget;
let humidityTextWidget;

let temperatureImageWidget;
let sensationImageWidget;
let humidityImageWidget;


let backgroundWidget;
Page(
  BasePage({
    state: {},
    onInit() {
      backgroundWidget = hmUI.createWidget(hmUI.widget.IMG, {
        ...BACKGROUND_IMG,
        src: 'backgroundSunny.png',
      });
      temperatureImageWidget = hmUI.createWidget(hmUI.widget.IMG, {
        ...TEMPERATURE_IMG
      })
      sensationImageWidget = hmUI.createWidget(hmUI.widget.IMG, {
        ...SENSATION_IMG
      })
      humidityImageWidget = hmUI.createWidget(hmUI.widget.IMG, {
        ...HUMIDITY_IMG
      })
      temperatureTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        ...TEMPERATURE_TEXT,
        text: "Carregando..."
      });
      sensationTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        ...SENSATION_TEXT,
        text: "Carregando..."
      });
      humidityTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        ...HUMIDITY_TEXT,
        text: "Carregando..."
      });
    },
    build() {
      this.fetchData();
      setInterval(() => {this.fetchData()}, 5000);
    },
    fetchData() {
      this.request({
        method: "GET_DATA",
      })
        .then((data) => {
          const { result = {} } = data;
          const temperature = result['temperature'];
          const sensation = result['sensation'];
          const humidity = result['humidity'];
          if (!temperature || !sensation || !humidity) {
            return;
          }
          backgroundWidget.setProperty(hmUI.prop.IMG, {
            ...BACKGROUND_IMG,
            src: result['temperature'] >= 24 ? 'backgroundSunny.png' : 'backgroundColdest.png'
          })
          temperatureTextWidget.setProperty(hmUI.prop.TEXT, {text: `Temperatura: ${temperature}°C`})
          sensationTextWidget.setProperty(hmUI.prop.TEXT, {text: `Sensação: ${sensation}°C`})
          humidityTextWidget.setProperty(hmUI.prop.TEXT, {text: `Umidade: ${humidity}%H`})
        })
        .catch((res) => {
          console.log(res);
          logger.error(res);
        });
    },
  })
);
