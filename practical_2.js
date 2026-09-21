
function makeMatrix(rows, cols, from = 0, to = 20) {
  let table = [];
  for (let i = 0; i < rows; i++) {
    table[i] = [];
    for (let j = 0; j < cols; j++) {
      table[i][j] = Math.floor(Math.random() * (to - from + 1)) + from;
    }
  }
  return table;
}

/**
 * Форматований вивід матриці із підписами рядків та стовпців.
 */
function showMatrix(arr) {
  if (!arr || !arr.length) return;

  let r = arr.length;
  let c = arr[0].length;

  let head = "".padEnd(10);
  for (let j = 0; j < c; j++) {
    head += `стовпець ${j + 1}`.padEnd(14);
  }
  console.log(head);

  for (let i = 0; i < r; i++) {
    let line = `рядок ${i + 1}`.padEnd(10);
    for (let j = 0; j < c; j++) {
      let val = Number.isInteger(arr[i][j]) ? arr[i][j] : arr[i][j].toFixed(2);
      line += `${val}`.padEnd(14);
    }
    console.log(line);
  }
  console.log();
}

/**
 * Завдання 1: Відняти від елементів кожного рядка матриці 
 * середнє арифметичне цього рядка
 */
function subRowAverage(arr) {
  let updated = [];
  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = 0; j < arr[i].length; j++) {
      sum += arr[i][j];
    }
    let avg = sum / arr[i].length;

    updated[i] = [];
    for (let j = 0; j < arr[i].length; j++) {
      updated[i][j] = Number((arr[i][j] - avg).toFixed(2));
    }
  }
  return updated;
}

/**
 * Завдання 2: Виконати циклічний зсув матриці на k позицій вправо та на k догори. 
 */
function shiftMatrix(arr, step) {
  let h = arr.length;
  let w = arr[0].length;
  let out = [];

  for (let i = 0; i < h; i++) {
    out[i] = new Array(w);
  }

  let dx = ((step % w) + w) % w;
  let dy = ((step % h) + h) % h;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let targetY = (y - dy + h) % h;
      let targetX = (x + dx) % w;
      out[targetY][targetX] = arr[y][x];
    }
  }
  return out;
}

/**
 * Завдання 3: Знайти максимальні елементи в матриці та 
 * видалити з матриці всі рядки та стовпці, що містять їх.
 */
function cutMaxElements(arr) {
  let h = arr.length;
  let w = arr[0].length;
  let maxEl = arr[0][0];

  // шукаємо найбільше число
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (arr[i][j] > maxEl) {
        maxEl = arr[i][j];
      }
    }
  }

  let badRows = [];
  let badCols = [];

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (arr[i][j] === maxEl) {
        if (!badRows.includes(i)) badRows.push(i);
        if (!badCols.includes(j)) badCols.push(j);
      }
    }
  }

  console.log(`Максимум: ${maxEl}`);
  console.log(`Рядки на видалення:`, badRows.map(n => n + 1));
  console.log(`Стовпці на видалення:`, badCols.map(n => n + 1), "\n");

  let trimmed = [];
  for (let i = 0; i < h; i++) {
    if (badRows.includes(i)) continue;
    let row = [];
    for (let j = 0; j < w; j++) {
      if (!badCols.includes(j)) {
        row.push(arr[i][j]);
      }
    }
    trimmed.push(row);
  }

  return trimmed;
}

/**
 * Завдання 4: Реалізуйте обертання матриці на 90 градусів 
 * (транспонування) за годинниковою стрілкою без використання 
 * додаткового масиву (in-place) та без використання спеціалізованих 
 * бібліотек роботи із матрицями.
 */
function rotateClockwise(arr) {
  let size = arr.length;

  // транспонування
  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      let tmp = arr[i][j];
      arr[i][j] = arr[j][i];
      arr[j][i] = tmp;
    }
  }

  // розвертаємо кожен рядок
  for (let i = 0; i < size; i++) {
    arr[i].reverse();
  }
}

console.log("Початкова матриця:");
let myMatrix = makeMatrix(4, 4, 1, 15);
showMatrix(myMatrix);

console.log("1. Після віднімання середнього:");
let norm = subRowAverage(myMatrix);
showMatrix(norm);

console.log("2. Зсув на 1:");
let shifted = shiftMatrix(myMatrix, 1);
showMatrix(shifted);

console.log("3. Обертання на 90 градусів:");
let copyForRotate = myMatrix.map(row => row.slice());
rotateClockwise(copyForRotate);
showMatrix(copyForRotate);

console.log("4. Видалення максимумів:");
let cut = cutMaxElements(myMatrix);
showMatrix(cut);
