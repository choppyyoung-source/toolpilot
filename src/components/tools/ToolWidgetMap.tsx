import dynamic from "next/dynamic";

/* eslint-disable @typescript-eslint/no-explicit-any */
const widgets: Record<string, React.ComponentType<any>> = {
  "word-counter": dynamic(() => import("./WordCounterWidget")),
  "case-converter": dynamic(() => import("./CaseConverterWidget")),
  "css-gradient-generator": dynamic(() => import("./CssGradientWidget")),
  "json-to-csv": dynamic(() => import("./JsonToCsvWidget")),
  "age-calculator": dynamic(() => import("./AgeCalculatorWidget")),
  "bmi-calculator": dynamic(() => import("./BmiCalculatorWidget")),
  "image-compressor": dynamic(() => import("./ImageCompressorWidget")),
  "hash-generator": dynamic(() => import("./HashGeneratorWidget")),
  "seo-analyzer": dynamic(() => import("./SeoAnalyzerWidget")),
  "base64-encoder-decoder": dynamic(() => import("./Base64Widget")),
  "color-converter": dynamic(() => import("./ColorConverterWidget")),
  "diff-checker": dynamic(() => import("./DiffCheckerWidget")),
  "emoji-picker": dynamic(() => import("./EmojiPickerWidget")),
  "html-entity-encoder": dynamic(() => import("./HtmlEntityWidget")),
  "json-formatter": dynamic(() => import("./JsonFormatterWidget")),
  "lorem-ipsum-generator": dynamic(() => import("./LoremIpsumWidget")),
  "markdown-preview": dynamic(() => import("./MarkdownPreviewWidget")),
  "password-generator": dynamic(() => import("./PasswordGeneratorWidget")),
  "qr-code-generator": dynamic(() => import("./QrCodeWidget")),
  "regex-tester": dynamic(() => import("./RegexTesterWidget")),
  "timestamp-converter": dynamic(() => import("./TimestampConverterWidget")),
  "unit-converter": dynamic(() => import("./UnitConverterWidget")),
  "url-encoder-decoder": dynamic(() => import("./UrlEncoderWidget")),
};

export default widgets;
