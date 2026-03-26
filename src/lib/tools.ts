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
    slug: "emoji-picker",
    name: "Emoji & Symbol Picker",
    description: "Click to copy emojis, kaomoji, symbols, and special characters.",
    longDescription:
      "Free emoji picker and special character map. Click to copy emojis, kaomoji, arrows, stars, and Unicode symbols. Over 700 characters organized in 10 categories.",
    category: "text",
    icon: "😀",
    keywords: ["emoji picker", "special characters", "kaomoji", "copy emoji", "symbol picker"],
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
    slug: "seo-analyzer",
    name: "SEO Analyzer",
    description: "Check any website's SEO score with 16+ on-page checks.",
    longDescription:
      "Free SEO analyzer tool. Enter any URL to get an instant SEO audit with 16+ checks covering meta tags, headings, images, structured data, and more.",
    category: "developer",
    icon: "🔍",
    keywords: ["seo analyzer", "seo checker", "website analyzer", "seo audit"],
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
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Compress images to reduce file size while maintaining quality.",
    longDescription: "Free online image compressor. Reduce image file size with adjustable quality. All processing in your browser.",
    category: "converter",
    icon: "🖼️",
    keywords: ["image compressor", "compress image", "reduce image size", "image optimizer"],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions with real-time matching and highlighting.",
    longDescription: "Free online regex tester. Test regular expressions with live matching, highlighting, and match details.",
    category: "developer",
    icon: "🔎",
    keywords: ["regex tester", "regular expression", "regex checker", "regex online"],
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from text.",
    longDescription: "Free online hash generator. Generate secure hashes using SHA-1, SHA-256, SHA-384, SHA-512 algorithms.",
    category: "security",
    icon: "#️⃣",
    keywords: ["hash generator", "sha256", "sha1", "sha512"],
  },
  {
    slug: "diff-checker",
    name: "Diff Checker",
    description: "Compare two texts and see differences highlighted line by line.",
    longDescription: "Free online diff checker. Compare two texts and see added, removed, and unchanged lines highlighted.",
    category: "developer",
    icon: "📊",
    keywords: ["diff checker", "text compare", "diff tool", "compare text"],
  },
  {
    slug: "css-gradient-generator",
    name: "CSS Gradient Generator",
    description: "Create beautiful CSS gradients with live preview.",
    longDescription: "Free CSS gradient generator. Create linear and radial gradients with live preview and copy CSS code.",
    category: "developer",
    icon: "🌈",
    keywords: ["css gradient", "gradient generator", "gradient maker", "css background"],
  },
  {
    slug: "json-to-csv",
    name: "JSON to CSV Converter",
    description: "Convert JSON arrays to CSV format instantly.",
    longDescription: "Free online JSON to CSV converter. Convert JSON data to CSV format and download as a spreadsheet file.",
    category: "converter",
    icon: "📋",
    keywords: ["json to csv", "convert json", "json csv", "data converter"],
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, days, and more.",
    longDescription: "Free online age calculator. Calculate exact age from date of birth in years, months, days, weeks, and hours.",
    category: "converter",
    icon: "🎂",
    keywords: ["age calculator", "how old am i", "birthday calculator", "calculate age"],
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index with metric or imperial units.",
    longDescription: "Free online BMI calculator. Calculate Body Mass Index using metric or imperial units with health category.",
    category: "converter",
    icon: "⚖️",
    keywords: ["bmi calculator", "body mass index", "bmi checker", "weight calculator"],
  },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((t) => t.category === categoryId);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
