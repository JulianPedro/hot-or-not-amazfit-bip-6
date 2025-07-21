import { BaseSideService } from "@zeppos/zml/base-side";
import { DATA_API } from "../utils/config/constants";

async function fetchData(res) {
  try {
    const response = await fetch({
      url: DATA_API,
      method: 'GET'
    })
    const resBody = typeof response.body === 'string' ? JSON.parse(response.body) : response.body

    res(null, {
      result: resBody,
    });
  } catch (error) {

    res(null, {
      result: "ERROR",
    });
  }
};

AppSideService(
  BaseSideService({
    onInit() {},
    onRequest(req, res) {
      if (req.method === "GET_DATA") {
        fetchData(res); 
      }
    },
    onRun() {},
    onDestroy() {},
  })
);
