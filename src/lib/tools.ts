export interface Tool {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  icon: string;
  keywords: string[];
}

export const categories = [
  { id: "text", name: "Text Tools", icon: "📝" },
  { id: "developer", name: "Developer Tools", icon: "💻" },
  { id: "converter", name: "Converters", icon: "🔄" },
  { id: "security", name: "Security Tools", icon: "🔒" },
];

export const tools: Tool[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs instantly.",
    longDescription:
      "Free online word counter tool. Count words, characters (with and without spaces), sentences, paragraphs, and estimate reading time. Perfect for writers, students, and content creators.",
    category: "text",
    icon: "🔢",
    keywords: [
      "word counter",
      "character counter",
      "letter count",
      "word count online",
    ],
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    description: "Convert text between uppercase, lowercase, title case, and more.",
    longDescription:
      "Free online case converter tool. Easily transform text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more. Useful for developers, writers, and anyone who needs to change text formatting.",
    category: "text",
    icon: "🔤",
    keywords: [
      "case converter",
      "uppercase converter",
      "lowercase converter",
      "title case",
    ],
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs and layouts.",
    longDescription:
      "Free Lorem Ipsum generator. Create dummy placeholder text in paragraphs, sentences, or words for web design, graphic design, and publishing layouts.",
    category: "text",
    icon: "📄",
    keywords: [
      "lorem ipsum generator",
      "placeholder text",
      "dummy text generator",
    ],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    description: "Format, validate, and beautify JSON data with syntax highlighting.",
    longDescription:
      "Free online JSON formatter and validator. Beautify, minify, and validate JSON data with syntax highlighting. Debug JSON errors and convert between formats easily.",
    category: "developer",
    icon: "{ }",
    keywords: [
      "json formatter",
      "json validator",
      "json beautifier",
      "json pretty print",
    ],
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder & Decoder",
    description: "Encode or decode text and files using Base64 encoding.",
    longDescription:
      "Free online Base64 encoder and decoder. Convert text or files to and from Base64 format. Useful for developers working with APIs, data URIs, and encoded content.",
    category: "developer",
    icon: "🔐",
    keywords: [
      "base64 encoder",
      "base64 decoder",
      "base64 converter",
      "encode base64",
    ],
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    description: "Convert colors between HEX, RGB, HSL, and more formats.",
    longDescription:
      "Free online color converter tool. Convert colors between HEX, RGB, RGBA, HSL, HSLA, and CMYK formats. Includes a color picker and preview for designers and developers.",
    category: "developer",
    icon: "🎨",
    keywords: [
      "color converter",
      "hex to rgb",
      "rgb to hex",
      "color picker",
      "hsl converter",
    ],
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description: "Convert between units of length, weight, temperature, and more.",
    longDescription:
      "Free online unit converter. Convert between units of length, weight, temperature, volume, area, speed, and time. Fast, accurate, and easy to use.",
    category: "converter",
    icon: "📏",
    keywords: [
      "unit converter",
      "length converter",
      "weight converter",
      "temperature converter",
    ],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes for URLs, text, Wi-Fi, and more.",
    longDescription:
      "Free online QR code generator. Create QR codes for any URL, text, or data. Download as high-resolution PNG. No sign-up required.",
    category: "converter",
    icon: "📱",
    keywords: ["qr code generator", "create qr code", "qr code maker", "free qr code"],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Create strong, random passwords with customizable options.",
    longDescription:
      "Free online password generator. Create strong, secure, random passwords with customizable length and character types. Uses cryptographic randomness.",
    category: "security",
    icon: "🔑",
    keywords: ["password generator", "random password", "strong password", "secure password generator"],
  },
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder & Decoder",
    description: "Encode or decode URLs and query parameters instantly.",
    longDescription:
      "Free online URL encoder and decoder. Percent-encode or decode URLs and query parameters. Supports full Unicode characters.",
    category: "developer",
    icon: "🔗",
    keywords: ["url encoder", "url decoder", "percent encoding", "urlencode"],
  },
  {
    slug: "markdown-preview",
    name: "Markdown Preview",
    description: "Write Markdown and see a live preview with HTML export.",
    longDescription:
      "Free online Markdown previewer and editor. Write Markdown and see live-rendered HTML preview. Copy the HTML output with one click.",
    category: "developer",
    icon: "📝",
    keywords: ["markdown preview", "markdown editor", "markdown to html", "markdown viewer"],
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates.",
    longDescription:
      "Free online Unix timestamp converter. Convert timestamps to dates and dates to timestamps. Supports seconds and milliseconds.",
    category: "developer",
    icon: "⏱️",
    keywords: ["timestamp converter", "unix timestamp", "epoch converter", "date to timestamp"],
  },
  {
    slug: "html-entity-encoder",
    name: "HTML Entity Encoder",
    description: "Encode or decode HTML entities for safe web display.",
    longDescription:
      "Free online HTML entity encoder and decoder. Encode special characters for safe HTML display or decode entities back to plain text.",
    category: "developer",
    icon: "&lt;&gt;",
    keywords: ["html entity encoder", "html entity decoder", "html encode", "html special characters"],
  },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((t) => t.category === categoryId);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
