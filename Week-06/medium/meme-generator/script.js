const templateSelect = document.getElementById("templateSelect");
const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottomText");
const textColorInput = document.getElementById("textColor");
const strokeColorInput = document.getElementById("strokeColor");
const fontFamilySelect = document.getElementById("fontFamily");
const fontSizeInput = document.getElementById("fontSize");
const isBoldInput = document.getElementById("isBold");
const isItalicInput = document.getElementById("isItalic");
const isUppercaseInput = document.getElementById("isUppercase");
const downloadBtn = document.getElementById("downloadBtn");
const memeCanvas = document.getElementById("memeCanvas");
const ctx = memeCanvas.getContext("2d");

const svgToDataUrl = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const TEMPLATE_SIZE = { width: 1000, height: 1000 };
const templates = [
  {
    id: "office-chaos",
    label: "Office Chaos",
    src: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2b3a67"/>
            <stop offset="100%" stop-color="#4d78c9"/>
          </linearGradient>
        </defs>
        <rect width="1000" height="1000" fill="url(#g)"/>
        <ellipse cx="500" cy="220" rx="330" ry="120" fill="#e9f2ff" opacity="0.23"/>
        <rect x="160" y="380" width="680" height="440" rx="32" fill="#f7fbff"/>
        <rect x="210" y="450" width="180" height="220" rx="20" fill="#d8e5ff"/>
        <rect x="420" y="450" width="180" height="220" rx="20" fill="#bfd4ff"/>
        <rect x="630" y="450" width="160" height="220" rx="20" fill="#9fbfff"/>
        <circle cx="280" cy="760" r="52" fill="#6f9dff"/>
        <circle cx="500" cy="760" r="52" fill="#5a87e8"/>
        <circle cx="710" cy="760" r="52" fill="#496fbd"/>
      </svg>
    `),
  },
  {
    id: "cat-energy",
    label: "Cat Energy",
    src: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f8d44f"/>
            <stop offset="100%" stop-color="#f59e0b"/>
          </linearGradient>
        </defs>
        <rect width="1000" height="1000" fill="url(#bg)"/>
        <circle cx="500" cy="560" r="290" fill="#fef3c7"/>
        <polygon points="300,350 420,450 260,520" fill="#4b5563"/>
        <polygon points="700,350 580,450 740,520" fill="#4b5563"/>
        <circle cx="390" cy="540" r="54" fill="#374151"/>
        <circle cx="610" cy="540" r="54" fill="#374151"/>
        <circle cx="390" cy="540" r="18" fill="#ffffff"/>
        <circle cx="610" cy="540" r="18" fill="#ffffff"/>
        <ellipse cx="500" cy="650" rx="75" ry="55" fill="#ef4444"/>
        <rect x="360" y="740" width="280" height="70" rx="20" fill="#ffffff" opacity="0.8"/>
      </svg>
    `),
  },
  {
    id: "galaxy-brain",
    label: "Galaxy Brain",
    src: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
        <defs>
          <linearGradient id="s" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="#1e3a8a"/>
          </linearGradient>
        </defs>
        <rect width="1000" height="1000" fill="url(#s)"/>
        <circle cx="170" cy="170" r="3" fill="#ffffff"/>
        <circle cx="280" cy="130" r="3" fill="#ffffff"/>
        <circle cx="460" cy="190" r="3" fill="#ffffff"/>
        <circle cx="690" cy="150" r="3" fill="#ffffff"/>
        <circle cx="820" cy="280" r="3" fill="#ffffff"/>
        <circle cx="120" cy="520" r="3" fill="#ffffff"/>
        <circle cx="280" cy="710" r="3" fill="#ffffff"/>
        <circle cx="850" cy="760" r="3" fill="#ffffff"/>
        <circle cx="500" cy="500" r="300" fill="#312e81" opacity="0.45"/>
        <circle cx="500" cy="500" r="220" fill="#4f46e5" opacity="0.5"/>
        <circle cx="500" cy="500" r="140" fill="#22d3ee" opacity="0.65"/>
        <path d="M390 560 C 450 640, 550 640, 610 560" stroke="#f8fafc" stroke-width="18" fill="none" stroke-linecap="round"/>
      </svg>
    `),
  },
];

let activeTemplateImage = null;

const createTemplateOptions = () => {
  templates.forEach((template) => {
    const option = document.createElement("option");
    option.value = template.id;
    option.textContent = template.label;
    templateSelect.append(option);
  });
};

const getTemplateById = (id) => templates.find((template) => template.id === id) || templates[0];

const loadTemplate = (templateId) =>
  new Promise((resolve, reject) => {
    const template = getTemplateById(templateId);
    const image = new Image();

    image.onload = () => {
      activeTemplateImage = image;
      resolve();
    };
    image.onerror = () => reject(new Error("Unable to load template image."));

    image.src = template.src;
  });

const normalizeText = (text) => {
  if (!text) {
    return "";
  }

  return isUppercaseInput.checked ? text.toUpperCase() : text;
};

const buildFont = () => {
  const style = isItalicInput.checked ? "italic" : "normal";
  const weight = isBoldInput.checked ? "700" : "500";
  const size = Number(fontSizeInput.value);
  const family = fontFamilySelect.value;
  return `${style} ${weight} ${size}px ${family}`;
};

const wrapTextLines = (text, maxWidth) => {
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) {
    return [];
  }

  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i += 1) {
    const testLine = `${currentLine} ${words[i]}`;
    if (ctx.measureText(testLine).width <= maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }

  lines.push(currentLine);
  return lines;
};

const drawTextBlock = (text, isBottom = false) => {
  if (!text) {
    return;
  }

  const horizontalPadding = 54;
  const maxWidth = memeCanvas.width - horizontalPadding * 2;
  const lineHeight = Number(fontSizeInput.value) * 1.05;
  const lines = wrapTextLines(text, maxWidth);

  ctx.font = buildFont();
  ctx.fillStyle = textColorInput.value;
  ctx.strokeStyle = strokeColorInput.value;
  ctx.textAlign = "center";
  ctx.lineWidth = Math.max(3, Number(fontSizeInput.value) * 0.085);
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;

  let startY = 82 + lineHeight;
  if (isBottom) {
    startY = memeCanvas.height - 72 - lineHeight * (lines.length - 1);
  }

  lines.forEach((line, index) => {
    const y = startY + index * lineHeight;
    ctx.strokeText(line, memeCanvas.width / 2, y);
    ctx.fillText(line, memeCanvas.width / 2, y);
  });
};

const renderMeme = () => {
  if (!activeTemplateImage) {
    return;
  }

  ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
  ctx.drawImage(activeTemplateImage, 0, 0, memeCanvas.width, memeCanvas.height);

  drawTextBlock(normalizeText(topTextInput.value), false);
  drawTextBlock(normalizeText(bottomTextInput.value), true);
};

const setupCanvasSize = () => {
  memeCanvas.width = TEMPLATE_SIZE.width;
  memeCanvas.height = TEMPLATE_SIZE.height;
};

const downloadMeme = () => {
  const link = document.createElement("a");
  link.download = "my-meme.png";
  link.href = memeCanvas.toDataURL("image/png");
  link.click();
};

const bindEvents = () => {
  templateSelect.addEventListener("change", async (event) => {
    const selectedTemplate = event.target.value;
    await loadTemplate(selectedTemplate);
    renderMeme();
  });

  [
    topTextInput,
    bottomTextInput,
    textColorInput,
    strokeColorInput,
    fontFamilySelect,
    fontSizeInput,
    isBoldInput,
    isItalicInput,
    isUppercaseInput,
  ].forEach((control) => {
    control.addEventListener("input", renderMeme);
    control.addEventListener("change", renderMeme);
  });

  downloadBtn.addEventListener("click", downloadMeme);
};

const init = async () => {
  setupCanvasSize();
  createTemplateOptions();

  templateSelect.value = templates[0].id;
  await loadTemplate(templateSelect.value);
  bindEvents();
  renderMeme();
};

init().catch((error) => {
  // Keep a visible fallback in canvas if initialization fails.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, memeCanvas.width, memeCanvas.height);
  ctx.fillStyle = "#c62828";
  ctx.font = "600 40px Arial, sans-serif";
  ctx.fillText("Failed to initialize meme generator.", 80, 520);
  console.error(error);
});