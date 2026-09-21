// /**
//  * Генерація двовимірного масиву (матриці) m x n з випадковими числами.
//  * @param {number} m - кількість рядків
//  * @param {number} n - кількість стовпців
//  * @param {number} min - мінімальне значення
//  * @param {number} max - максимальне значення
//  */
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

// // ==========================================
// // ДОДАТКОВЕ ЗАВДАННЯ: РОЗКЛАД (3D-МАСИВ)
// // ==========================================

// const DAYS_OF_WEEK = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"];
// const WINDOW = "Вільне вікно";

// /**
//  * Генерація та заповнення розкладу [3 групи][5 днів][4 пари]
//  */
// function initSchedule() {
//   const schedule = [
//     // Група 0 (ІПЗ-1)
//     [
//       ["Алгоритми", "Бази даних", WINDOW, "Англійська"],     // Понеділок (є вікно)
//       ["Веб-технології", "ООП", "Дискретна математика", WINDOW], // Вівторок (3 пари)
//       ["Архітектура ПЗ", "Мережі", "ОС", "Тестування"],      // Середа (4 пари - макс)
//       [WINDOW, WINDOW, "Філософія", "Право"],                // Четвер (немає вікон між парами)
//       ["Алгоритми", "Веб-технології", WINDOW, WINDOW]       // П'ятниця (2 пари)
//     ],
//     // Група 1 (ІПЗ-2)
//     [
//       ["Алгоритми", "Бази даних", "ООП", WINDOW],            // Понеділок (спільні Алгоритми та БД)
//       ["Менеджмент", WINDOW, "Дискретна математика", "Фізика"], // Вівторок
//       ["Архітектура ПЗ", "Статистика", WINDOW, WINDOW],      // Середа (спільна Архітектура)
//       [WINDOW, WINDOW, WINDOW, WINDOW],                      // Четвер
//       ["Англійська", "Веб-технології", WINDOW, WINDOW]       // П'ятниця
//     ],
//     // Група 2 (ІПЗ-3)
//     [
//       ["Алгоритми", "Маркетинг", WINDOW, WINDOW],            // Понеділок (спільні Алгоритми на 1 парі)
//       ["Історія", "Культурологія", WINDOW, WINDOW],          // Вівторок
//       ["Економіка", "Мережі", "ОС", WINDOW],                 // Середа
//       ["Філософія", "Право", WINDOW, WINDOW],                // Четвер
//       [WINDOW, "Веб-технології", "Психологія", WINDOW]       // П'ятниця
//     ]
//   ];

//   return schedule;
// }

// /**
//  * 1. День із найбільшим навантаженням для обраної групи
//  */
// function findBusiestDay(schedule, groupIndex) {
//   const groupSchedule = schedule[groupIndex];
//   let maxClasses = -1;
//   let busiestDayIndex = 0;

//   for (let day = 0; day < 5; day++) {
//     // Рахуємо пари, де стоїть назва предмета, а не вікно
//     const count = groupSchedule[day].filter(slot => slot !== WINDOW).length;
//     if (count > maxClasses) {
//       maxClasses = count;
//       busiestDayIndex = day;
//     }
//   }

//   return { day: DAYS_OF_WEEK[busiestDayIndex], count: maxClasses };
// }

// /**
//  * 2. Пошук днів із «вікнами» (незручний розклад).
//  * Вікно — це вільна пара, розташована між реальними заняттями.
//  */
// function findDaysWithGaps(schedule, groupIndex) {
//   const groupSchedule = schedule[groupIndex];
//   const problemDays = [];

//   for (let day = 0; day < 5; day++) {
//     const slots = groupSchedule[day];
//     let firstClass = -1;
//     let lastClass = -1;

//     for (let slot = 0; slot < 4; slot++) {
//       if (slots[slot] !== WINDOW) {
//         if (firstClass === -1) firstClass = slot;
//         lastClass = slot;
//       }
//     }

//     // Якщо занять менше 2, внутрішніх вікон бути не може
//     if (firstClass !== -1 && lastClass > firstClass) {
//       for (let slot = firstClass + 1; slot < lastClass; slot++) {
//         if (slots[slot] === WINDOW) {
//           problemDays.push({
//             day: DAYS_OF_WEEK[day],
//             gapSlot: slot + 1
//           });
//         }
//       }
//     }
//   }

//   return problemDays;
// }

// /**
//  * 3. Перевірка наявності потокових занять
//  */
// function findStreamClasses(schedule) {
//   const streamEvents = [];

//   for (let day = 0; day < 5; day++) {
//     for (let slot = 0; slot < 4; slot++) {
//       // Підраховуємо, які дисципліни читаються одночасно
//       const subjectMap = new Map();

//       for (let group = 0; group < 3; group++) {
//         const subject = schedule[group][day][slot];
//         if (subject !== WINDOW) {
//           if (!subjectMap.has(subject)) {
//             subjectMap.set(subject, []);
//           }
//           subjectMap.get(subject).push(`Група ${group + 1}`);
//         }
//       }

//       // Якщо предмет одночасно стоїть у 2 або більше груп
//       for (const [subj, groups] of subjectMap.entries()) {
//         if (groups.length > 1) {
//           streamEvents.push({
//             day: DAYS_OF_WEEK[day],
//             slot: slot + 1,
//             subject: subj,
//             groups: groups
//           });
//         }
//       }
//     }
//   }

//   return streamEvents;
// }

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

// console.log("\n=== ТЕСТУВАННЯ 3D-РОЗКЛАДУ ===\n");
// const schedule = initSchedule();

// // Аналіз для Групи 1 (індекс 0)
// const targetGroup = 0;
// console.log(`Аналіз для Групи ${targetGroup + 1}:`);

// const busiest = findBusiestDay(schedule, targetGroup);
// console.log(`- Найбільш завантажений день: ${busiest.day} (${busiest.count} пар/и)`);

// const gaps = findDaysWithGaps(schedule, targetGroup);
// if (gaps.length > 0) {
//   gaps.forEach(g => console.log(`- Незручний день (вікно): ${g.day}, на ${g.gapSlot}-й парі`));
// } else {
//   console.log("- Днів із вікнами не виявлено.");
// }

// console.log("\nПошук потокових лекцій/пар:");
// const streams = findStreamClasses(schedule);
// if (streams.length > 0) {
//   streams.forEach(s => {
//     console.log(`- [${s.day}, ${s.slot}-а пара] Предмет: "${s.subject}" -> ${s.groups.join(" та ")}`);
//   });
// } else {
//   console.log("- Потокових занять немає.");
// }