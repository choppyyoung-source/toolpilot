"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

const emojiCategories = [
  {
    id: "smileys",
    name: "Smileys & Emotion",
    icon: "😀",
    items: "😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 🥰 😍 🤩 😘 😗 😚 😙 🥲 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🤫 🤔 🫡 🤐 🤨 😐 😑 😶 🫥 😏 😒 🙄 😬 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🥵 🥶 🥴 😵 🤯 🤠 🥳 🥸 😎 🤓 🧐 😕 🫤 😟 🙁 😮 😯 😲 😳 🥺 🥹 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 🥱 😤 😡 😠 🤬 😈 👿 💀 ☠️ 💩 🤡 👹 👺 👻 👽 👾 🤖".split(" "),
  },
  {
    id: "hearts",
    name: "Hearts & Love",
    icon: "❤️",
    items: "❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 💟 ♥️ 🫶 💑 💏 😍 🥰 😘 😻 💋 💌".split(" "),
  },
  {
    id: "hands",
    name: "Hands & Gestures",
    icon: "👋",
    items: "👋 🤚 🖐️ ✋ 🖖 🫱 🫲 🫳 🫴 👌 🤌 🤏 ✌️ 🤞 🫰 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 🫵 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 🫶 👐 🤲 🙏 ✍️ 💪 🦾 🦿 🦵 🦶 👂 🦻 👃 👀 👁️ 👅 👄".split(" "),
  },
  {
    id: "animals",
    name: "Animals & Nature",
    icon: "🐶",
    items: "🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐻‍❄️ 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🙈 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🪱 🐛 🦋 🐌 🐞 🐜 🪳 🪲 🐢 🐍 🦎 🦂 🦀 🦑 🐙 🦐 🐠 🐟 🐡 🐬 🦈 🐳 🐋 🐊 🐆 🐅 🐃 🐂 🐄 🦌 🐪 🐫 🦙 🦒 🐘 🦣 🦏 🦛 🐁 🐀 🐿️ 🦫 🦔 🐇 🐈 🐕 🦮".split(" "),
  },
  {
    id: "food",
    name: "Food & Drink",
    icon: "🍔",
    items: "🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶️ 🫑 🌽 🥕 🧄 🧅 🥔 🍠 🫘 🥐 🥖 🫓 🥨 🥯 🍞 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 🍖 🦴 🌭 🍔 🍟 🍕 🫔 🌮 🌯 🫔 🥗 🥘 🫕 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍡 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🍼 🫖 ☕ 🍵 🧃 🥤 🧋 🍶 🍺 🍻 🥂 🍷 🥃 🍸 🍹 🧉 🍾 🧊".split(" "),
  },
  {
    id: "travel",
    name: "Travel & Places",
    icon: "✈️",
    items: "🚗 🚕 🚙 🚌 🚎 🏎️ 🚓 🚑 🚒 🚐 🛻 🚚 🚛 🚜 🏍️ 🛵 🚲 🛴 🛹 🛼 🚏 🛣️ 🛤️ ⛽ 🚨 🚥 🚦 🛑 🚧 ⚓ 🛟 ⛵ 🛶 🚤 🛳️ ⛴️ 🛥️ 🚢 ✈️ 🛩️ 🛫 🛬 🪂 💺 🚁 🚟 🚠 🚡 🛰️ 🚀 🛸 🏠 🏡 🏘️ 🏗️ 🏭 🏢 🏬 🏣 🏤 🏥 🏦 🏨 🏪 🏫 🏩 💒 🏛️ ⛪ 🕌 🛕 🕍 ⛩️ 🕋 ⛲ ⛺ 🌁 🏔️ ⛰️ 🌋 🗻 🏕️ 🏖️ 🏜️ 🏝️ 🗾 🌅 🌄 🌠 🎇 🎆 🌇 🌆 🏙️ 🌃 🌌 🌉 🌁".split(" "),
  },
  {
    id: "objects",
    name: "Objects & Symbols",
    icon: "💡",
    items: "⌚ 📱 💻 ⌨️ 🖥️ 🖨️ 🖱️ 🖲️ 💽 💾 💿 📀 🧮 🎮 🕹️ 🔋 🔌 💡 🔦 🕯️ 🪔 🧯 🛢️ 💸 💵 💴 💶 💷 🪙 💰 💳 🧾 ✉️ 📧 📨 📩 📤 📥 📦 📫 📪 📬 📭 📮 📝 💼 📁 📂 📅 📆 📇 📈 📉 📊 📋 📌 📍 📎 🖇️ 📏 📐 ✂️ 🗃️ 🗄️ 🗑️ 🔒 🔓 🔏 🔐 🔑 🗝️ 🔨 🪓 ⛏️ ⚒️ 🛠️ 🗡️ ⚔️ 🔫 🪃 🏹 🛡️ 🪚 🔧 🪛 🔩 ⚙️ 🗜️ ⚖️ 🦯 🔗 ⛓️ 🪝 🧰 🧲 🪜".split(" "),
  },
  {
    id: "symbols",
    name: "Special Symbols",
    icon: "★",
    items: "★ ☆ ✦ ✧ ✩ ✪ ✫ ✬ ✭ ✮ ✯ ✰ ⁂ ⁎ ⁑ ☀ ☁ ☂ ☃ ☄ ☮ ☯ ☸ ☾ ☽ ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟ ♠ ♡ ♢ ♣ ♤ ♥ ♦ ♧ ♩ ♪ ♫ ♬ ♭ ♮ ♯ ⚀ ⚁ ⚂ ⚃ ⚄ ⚅ ⚐ ⚑ ⚡ ⚬ ⚭ ⚮ ⚯ ✓ ✔ ✕ ✖ ✗ ✘ ✙ ✚ ✛ ✜ ✝ ✞ ✟ ✠ ✡ ✢ ✣ ✤ ✥ ☐ ☑ ☒ ⓵ ⓶ ⓷ ⓸ ⓹ ⓺ ⓻ ⓼ ⓽ ⓾".split(" "),
  },
  {
    id: "arrows",
    name: "Arrows",
    icon: "→",
    items: "← → ↑ ↓ ↔ ↕ ↖ ↗ ↘ ↙ ↚ ↛ ↜ ↝ ↞ ↟ ↠ ↡ ↢ ↣ ↤ ↥ ↦ ↧ ↨ ↩ ↪ ↫ ↬ ↭ ↮ ↯ ↰ ↱ ↲ ↳ ↴ ↵ ↶ ↷ ↸ ↹ ↺ ↻ ⇄ ⇅ ⇆ ⇇ ⇈ ⇉ ⇊ ⇋ ⇌ ⇍ ⇎ ⇏ ⇐ ⇑ ⇒ ⇓ ⇔ ⇕ ⇖ ⇗ ⇘ ⇙ ⇚ ⇛ ➔ ➘ ➙ ➚ ➛ ➜ ➝ ➞ ➟ ➠ ➡ ➢ ➣ ➤ ➥ ➦ ➧ ➨ ➩ ➪ ➫ ➬ ➭ ➮ ➯ ➱ ➲ ➳ ➴ ➵ ➶ ➷ ➸ ➹ ➺ ➻ ➼ ➽ ➾".split(" "),
  },
  {
    id: "kaomoji",
    name: "Kaomoji",
    icon: "(◕‿◕)",
    items: [
      "(◕‿◕)", "(╥_╥)", "(≧◡≦)", "(◕ᴗ◕✿)", "(╯°□°)╯︵ ┻━┻", "┬─┬ノ( º _ ºノ)",
      "(ᵔᴥᵔ)", "(•̀ᴗ•́)و", "( ˘ω˘ )", "(☞ﾟヮﾟ)☞", "☜(ﾟヮﾟ☜)", "(ノ◕ヮ◕)ノ*:・゚✧",
      "ʕ•ᴥ•ʔ", "(ง'̀-'́)ง", "(づ￣ ³￣)づ", "(⊃｡•́‿•̀｡)⊃", "¯\\_(ツ)_/¯", "(☞ ͡° ͜ʖ ͡°)☞",
      "( ͡° ͜ʖ ͡°)", "(⌐■_■)", "(•_•)", "( •_•)>⌐■-■", "ᕕ( ᐛ )ᕗ", "ᕦ(ò_óˇ)ᕤ",
      "(ﾉ◕ヮ◕)ﾉ*:・゚✧", "٩(◕‿◕｡)۶", "(✿◠‿◠)", "♪(´ε` )", "(⊙_⊙)", "(*≧ω≦)",
      "(´・ω・`)", "(；一_一)", "(￣▽￣)ノ", "(*^▽^*)", "(T_T)", "(;_;)",
      "(ಥ_ಥ)", "＼(◎o◎)／", "(°ロ°) !", "Σ(°△°|||)", "(⊙﹏⊙)", "ヾ(⌐■_■)ノ♪",
      "(*¯︶¯*)", "(✧ω✧)", "(◠‿◠)", "(◉‿◉)", "ಠ_ಠ", "(ꈍᴗꈍ)",
      "( ˶ˆᗜˆ˵ )", "(≖_≖ )", "(⁀ᗢ⁀)", "⊂(◉‿◉)つ", "ε=ε=ε=┌(;*´Д`)ノ", "(∩^o^)⊃━☆゚.*・。",
    ],
  },
];

export default function EmojiPickerPage() {
  const [activeCat, setActiveCat] = useState("smileys");
  const [copied, setCopied] = useState("");
  const [search, setSearch] = useState("");

  const cat = emojiCategories.find((c) => c.id === activeCat)!;

  function copy(char: string) {
    navigator.clipboard.writeText(char);
    setCopied(char);
    setTimeout(() => setCopied(""), 1500);
  }

  const filteredItems = search
    ? emojiCategories.flatMap((c) => c.items).filter((item) => item.includes(search))
    : cat.items;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <JsonLd
        data={webApplicationSchema({
          name: "Emoji & Special Character Picker",
          description:
            "Free emoji picker and special character map. Click to copy emojis, kaomoji, symbols, arrows, and special characters.",
          url: "https://toolpilot.pages.dev/tools/emoji-picker",
          category: "UtilityApplication",
          keywords: [
            "emoji picker",
            "special characters",
            "kaomoji",
            "copy emoji",
            "symbol picker",
            "emoji copy paste",
          ],
        })}
      />
      <JsonLd data={howToSchema({ name: "How to copy an emoji or special character", description: "Browse, search, and copy emojis, symbols, arrows, and kaomoji with a single click.", steps: [{ name: "Step 1", text: "Browse categories or search" }, { name: "Step 2", text: "Click any emoji to copy" }, { name: "Step 3", text: "Paste it anywhere" }] })} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Text Tools", href: "/#text" },
          { label: "Emoji Picker", href: "/tools/emoji-picker" },
        ]}
      />

      <h1 className="mb-2 text-3xl font-bold">Emoji & Special Character Picker</h1>
      <p className="mb-6 text-gray-600">
        Click any emoji, symbol, or kaomoji to copy it to your clipboard. Works
        everywhere — social media, documents, messages, and code.
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search emojis..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
      />

      {/* Category Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {emojiCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setActiveCat(c.id);
              setSearch("");
            }}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              activeCat === c.id && !search
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      {/* Copied Toast */}
      {copied && (
        <div className="mb-4 rounded-lg bg-green-50 px-4 py-2 text-center text-sm text-green-700">
          Copied <span className="text-lg">{copied}</span> to clipboard!
        </div>
      )}

      {/* Grid */}
      <div className="rounded-lg bg-white p-4">
        <div className="flex flex-wrap gap-1">
          {filteredItems.filter(Boolean).map((item, idx) => (
            <button
              key={`${item}-${idx}`}
              onClick={() => copy(item)}
              title={`Click to copy: ${item}`}
              className="flex items-center justify-center rounded-lg border border-gray-100 p-2 text-xl transition-colors hover:border-blue-300 hover:bg-blue-50 sm:p-3 sm:text-2xl"
              style={{ minWidth: item.length > 3 ? "auto" : "48px" }}
            >
              {item}
            </button>
          ))}
        </div>
        {filteredItems.filter(Boolean).length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">No results found</p>
        )}
      </div>

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          How to Use Emojis & Special Characters
        </h2>
        <p className="mb-3">
          Simply click on any emoji, symbol, or kaomoji to instantly copy it to
          your clipboard. Then paste it anywhere you want — social media posts,
          messages, emails, documents, or code.
        </p>
        <h3 className="mb-1 font-semibold text-gray-900">Categories Available</h3>
        <ul className="list-inside list-disc space-y-1">
          <li><strong>Smileys & Emotion</strong> — Faces, expressions, and reaction emojis</li>
          <li><strong>Hearts & Love</strong> — Heart symbols in all colors</li>
          <li><strong>Hands & Gestures</strong> — Hand signs and body parts</li>
          <li><strong>Animals & Nature</strong> — Animal faces and nature emojis</li>
          <li><strong>Food & Drink</strong> — Fruits, meals, and beverages</li>
          <li><strong>Travel & Places</strong> — Vehicles, buildings, and landmarks</li>
          <li><strong>Objects & Symbols</strong> — Everyday objects and tools</li>
          <li><strong>Special Symbols</strong> — Stars, checkmarks, music notes, and more</li>
          <li><strong>Arrows</strong> — All types of directional arrows</li>
          <li><strong>Kaomoji</strong> — Japanese-style text emoticons</li>
        </ul>
      </section>

      <FAQ
        items={[
          {
            question: "How do I copy an emoji?",
            answer:
              "Simply click on any emoji, symbol, or kaomoji and it will be automatically copied to your clipboard. You will see a confirmation message. Then paste it anywhere using Ctrl+V (or Cmd+V on Mac).",
          },
          {
            question: "Do these emojis work on all platforms?",
            answer:
              "Yes. Unicode emojis work on all modern platforms including Windows, macOS, iOS, Android, and Linux. The appearance may vary slightly between platforms as each uses its own emoji design.",
          },
          {
            question: "What are kaomoji?",
            answer:
              "Kaomoji are Japanese-style emoticons made from Unicode characters. Unlike standard emojis, they are text-based and display the same on all platforms. Examples include (◕‿◕), ¯\\_(ツ)_/¯, and (╯°□°)╯︵ ┻━┻.",
          },
          {
            question: "Can I use these in code or HTML?",
            answer:
              "Yes. All characters are standard Unicode and can be used directly in source code, HTML, CSS, JSON, and any text format. No special encoding is needed for most modern systems.",
          },
          {
            question: "How many emojis and symbols are available?",
            answer:
              "This tool includes over 700 emojis, symbols, arrows, and kaomoji organized into 10 categories. We regularly update the collection with new Unicode additions.",
          },
        ]}
      />
      <RelatedTools currentSlug="emoji-picker" />
    </div>
  );
}
