import { onRequestOptions as __api_analyze_ts_onRequestOptions } from "/Users/hyunyoung/toolbox-web/functions/api/analyze.ts"
import { onRequestPost as __api_analyze_ts_onRequestPost } from "/Users/hyunyoung/toolbox-web/functions/api/analyze.ts"

export const routes = [
    {
      routePath: "/api/analyze",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_analyze_ts_onRequestOptions],
    },
  {
      routePath: "/api/analyze",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_analyze_ts_onRequestPost],
    },
  ]