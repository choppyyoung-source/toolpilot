import { onRequestOptions as __api_analyze_ts_onRequestOptions } from "/Users/hyunyoung/toolbox-web/functions/api/analyze.ts"
import { onRequestPost as __api_analyze_ts_onRequestPost } from "/Users/hyunyoung/toolbox-web/functions/api/analyze.ts"
import { onRequestOptions as __api_base64_ts_onRequestOptions } from "/Users/hyunyoung/toolbox-web/functions/api/base64.ts"
import { onRequestPost as __api_base64_ts_onRequestPost } from "/Users/hyunyoung/toolbox-web/functions/api/base64.ts"
import { onRequestOptions as __api_color_convert_ts_onRequestOptions } from "/Users/hyunyoung/toolbox-web/functions/api/color-convert.ts"
import { onRequestPost as __api_color_convert_ts_onRequestPost } from "/Users/hyunyoung/toolbox-web/functions/api/color-convert.ts"
import { onRequestOptions as __api_hash_ts_onRequestOptions } from "/Users/hyunyoung/toolbox-web/functions/api/hash.ts"
import { onRequestPost as __api_hash_ts_onRequestPost } from "/Users/hyunyoung/toolbox-web/functions/api/hash.ts"
import { onRequestOptions as __api_json_format_ts_onRequestOptions } from "/Users/hyunyoung/toolbox-web/functions/api/json-format.ts"
import { onRequestPost as __api_json_format_ts_onRequestPost } from "/Users/hyunyoung/toolbox-web/functions/api/json-format.ts"
import { onRequestOptions as __api_unit_convert_ts_onRequestOptions } from "/Users/hyunyoung/toolbox-web/functions/api/unit-convert.ts"
import { onRequestPost as __api_unit_convert_ts_onRequestPost } from "/Users/hyunyoung/toolbox-web/functions/api/unit-convert.ts"

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
  {
      routePath: "/api/base64",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_base64_ts_onRequestOptions],
    },
  {
      routePath: "/api/base64",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_base64_ts_onRequestPost],
    },
  {
      routePath: "/api/color-convert",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_color_convert_ts_onRequestOptions],
    },
  {
      routePath: "/api/color-convert",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_color_convert_ts_onRequestPost],
    },
  {
      routePath: "/api/hash",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_hash_ts_onRequestOptions],
    },
  {
      routePath: "/api/hash",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_hash_ts_onRequestPost],
    },
  {
      routePath: "/api/json-format",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_json_format_ts_onRequestOptions],
    },
  {
      routePath: "/api/json-format",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_json_format_ts_onRequestPost],
    },
  {
      routePath: "/api/unit-convert",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_unit_convert_ts_onRequestOptions],
    },
  {
      routePath: "/api/unit-convert",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_unit_convert_ts_onRequestPost],
    },
  ]