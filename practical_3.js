const arraySize = 5000;
const minValue = -100;
const maxValue = 100;


function zgeneruvatyMasiv(length, minValue, maxValue) {
  const masiv = new Array(length);
  for (let i = 0; i < length; i++) {
    masiv[i] = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }
  return masiv;
}

function napisatyMasiv(array, limit = -1) {
  const count = (limit > 0 && limit < array.length) ? limit : array.length;
  const elementy = [];

  for (let i = 0; i < count; i++) {
    elementy.push(`[cell - ${i},value - ${array[i]}]`);
  }

  let result = "{" + elementy.join(",");
  if (count < array.length) {
    result += ", . . .";
  }
  result += "}";

  console.log(result);
}

function bulbashka(array, ascending = true) {
  const masivchik = [...array]; 
  const n = masivchik.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const shouldSwap = ascending ? masivchik[j] > masivchik[j + 1] : masivchik[j] < masivchik[j + 1];
      if (shouldSwap) {
        const temp = masivchik[j];
        masivchik[j] = masivchik[j + 1];
        masivchik[j + 1] = temp;
      }
    }
  }
  return masivchik;
}

// Сортування вставками (Insertion Sort)
function controlVe(array, ascending = true) {
  const masivchik = [...array];
  const n = masivchik.length;
  for (let i = 1; i < n; i++) {
    const kliuch = masivchik[i];
    let j = i - 1;
    while (j >= 0 && (ascending ? masivchik[j] > kliuch : masivchik[j] < kliuch)) {
      masivchik[j + 1] = masivchik[j];
      j--;
    }
    masivchik[j + 1] = kliuch;
  }
  return masivchik;
}

// Сортування вибором (Selection Sort)
function vibirBezViboru(array, ascending = true) {
  const masiv = [...array];
  const n = masiv.length;
  for (let i = 0; i < n - 1; i++) {
    let tsilioviyIndex = i;
    for (let j = i + 1; j < n; j++) {
      const isBetter = ascending ? masiv[j] < masiv[tsilioviyIndex] : masiv[j] > masiv[tsilioviyIndex];
      if (isBetter) {
        tsilioviyIndex = j;
      }
    }
    const temp = masiv[tsilioviyIndex];
    masiv[tsilioviyIndex] = masiv[i];
    masiv[i] = temp;
  }
  return masiv;
}

console.log("------------------------------------------------")
console.log(`Generatsiya masivu na ${arraySize} elementiv...`);
const originalArray = zgeneruvatyMasiv(arraySize, minValue, maxValue);

console.log("\nPochatkoviy masiv (pershi 50 elementiv):");
napisatyMasiv(originalArray, 50);

function vimiriyvaniaChasu(sortName, sortFn, array, ascending) {
  const pochatok = performance.now();
  const vidsortovano = sortFn(array, ascending);
  const kinets = performance.now();
  const chasMilisecundy = (kinets - pochatok).toFixed(2);
  const napriamok = ascending ? "Priamiy poriadok (true)" : "Zvorotniy poriadok (false)";
  
  process.stdout.write(`${sortName} | ${napriamok} [Chas: ${chasMilisecundy} ms]: `);
  napisatyMasiv(vidsortovano, 50);
}

console.log("\n\n--- Bul Bul (Bubble Sort) ---");
vimiriyvaniaChasu("Bul Bul", bulbashka, originalArray, true);
console.log("------------------------------------------------")
vimiriyvaniaChasu("Bul Bul", bulbashka, originalArray, false);

console.log("\n\n--- Ctrl V (Insertion Sort) ---");
vimiriyvaniaChasu("Ctrl V", controlVe, originalArray, true);
console.log("------------------------------------------------")
vimiriyvaniaChasu("Ctrl V", controlVe, originalArray, false);

console.log("\n\n--- Vibir Bez Viboru (Selection Sort) ---");
vimiriyvaniaChasu("Vibir Bez Viboru", vibirBezViboru, originalArray, true);
console.log("------------------------------------------------")
vimiriyvaniaChasu("Vibir Bez Viboru", vibirBezViboru, originalArray, false);