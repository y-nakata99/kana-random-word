
const CHARACTER_SETS = {
  hiragana: [
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
  ],
  katakana: [
    "ア", "イ", "ウ", "エ", "オ",
    "カ", "キ", "ク", "ケ", "コ",
    "サ", "シ", "ス", "セ", "ソ",
    "タ", "チ", "ツ", "テ", "ト",
    "ナ", "ニ", "ヌ", "ネ", "ノ",
    "ハ", "ヒ", "フ", "ヘ", "ホ",
    "マ", "ミ", "ム", "メ", "モ",
    "ヤ", "ユ", "ヨ",
    "ラ", "リ", "ル", "レ", "ロ",
    "ワ", "ヲ", "ン"
  ],
  alphabet: "abcdefghijklmnopqrstuvwxyz".split("")
};

const WORD_LENGTH_RANGE = {
  min: 3,
  max: 7
};

const characterTypeSelect = document.getElementById("characterType");
const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const resultElement = document.getElementById("result");

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCharactersForType(type) {
  return CHARACTER_SETS[type] ?? CHARACTER_SETS.hiragana;
}

function getRandomCharacter(characters) {
  const index = getRandomIntInclusive(0, characters.length - 1);
  return characters[index];
}

function generateRandomWord(type) {
  const characters = getCharactersForType(type);
  const length = getRandomIntInclusive(WORD_LENGTH_RANGE.min, WORD_LENGTH_RANGE.max);
  let generatedWord = "";

  for (let i = 0; i < length; i += 1) {
    generatedWord += getRandomCharacter(characters);
  }

  return generatedWord;
}

function updateResult() {
  const type = characterTypeSelect.value;
  const word = generateRandomWord(type);
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
characterTypeSelect.addEventListener("change", updateResult);

updateResult();
