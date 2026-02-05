const HIRAGANA_CHARACTERS = [
  "あ", "い", "う", "え", "お",
  "か", "き", "く", "け", "こ",
  "さ", "し", "す", "せ", "そ",
  "た", "ち", "つ", "て", "と",
  "な", "に", "ぬ", "ね", "の",
  "は", "ひ", "ふ", "へ", "ほ",
  "ま", "み", "む", "め", "も",
  "や", "ゆ", "よ",
  "ら", "り", "る", "れ", "ろ",
  "わ", "を", "ん"
];

const WORD_LENGTH_RANGE = {
  min: 3,
  max: 7
};

const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const resultElement = document.getElementById("result");

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKana() {
  const index = getRandomIntInclusive(0, HIRAGANA_CHARACTERS.length - 1);
  return HIRAGANA_CHARACTERS[index];
}

function generateRandomWord() {
  const length = getRandomIntInclusive(WORD_LENGTH_RANGE.min, WORD_LENGTH_RANGE.max);
  let generatedWord = "";

  for (let i = 0; i < length; i += 1) {
    generatedWord += getRandomKana();
  }

  return generatedWord;
}

function updateResult() {
  const word = generateRandomWord();
  resultElement.textContent = word;
}

async function copyResult() {
  const text = resultElement.textContent;

  if (!text || text === "---") {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "コピー済み";

    window.setTimeout(() => {
      copyButton.textContent = "コピー";
    }, 1000);
  } catch {
    copyButton.textContent = "失敗";

    window.setTimeout(() => {
      copyButton.textContent = "コピー";
    }, 1000);
  }
}

generateButton.addEventListener("click", updateResult);
copyButton.addEventListener("click", copyResult);

updateResult();
