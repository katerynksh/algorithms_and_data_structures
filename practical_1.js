// Генерація масиву заданої довжини в діапазоні [min, max]
function generateArray(length, min, max) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

// Виведення масиву у заданому форматі
function printArray(arr) {
  const formatted = arr
    .map((val, idx) => `[елемент_${idx + 1}_значення_${val}]`)
    .join(",\n");
  console.log(formatted);
}

// Завдання 1: Порахувати кількість та суму парних елементів масиву, 
// що знаходяться в заданому діапазоні.
function task1(arr, rangeMin, rangeMax) {
  let count = 0;
  let sum = 0;
  for (const num of arr) {
    if (num % 2 === 0 && num >= rangeMin && num <= rangeMax) {
      count++;
      sum += num;
    }
  }
  return { count, sum };
}

// Завдання 2: Визначити середнє арифметичне елементів масиву 
// та кількість елементів, що є більшими за середнє арифметичне
function task2(arr) {
  if (arr.length === 0) return { avg: 0, countGreater: 0 };
  const sum = arr.reduce((acc, val) => acc + val, 0);
  const avg = sum / arr.length;
  const countGreater = arr.filter(val => val > avg).length;
  return { avg, countGreater };
}

// Завдання 3: Утворити третій масив як попарну суму елементів 
// двох масивів однакової довжини.
function task3(arr1, arr2) {
  return arr1.map((val, i) => val + arr2[i]);
}

// Завдання 4: Утворити третій масив як конкатенацію двох 
// масивів різної довжини
function task4(arr1, arr2) {
  return arr1.concat(arr2);
}

// Завдання 5: В масиві поміняти місцями максимум та мінімум
function task5(arr) {
  if (arr.length === 0) return [];
  const result = [...arr];
  let minIdx = 0;
  let maxIdx = 0;
  for (let i = 1; i < result.length; i++) {
    if (result[i] < result[minIdx]) minIdx = i;
    if (result[i] > result[maxIdx]) maxIdx = i;
  }
  const temp = result[minIdx];
  result[minIdx] = result[maxIdx];
  result[maxIdx] = temp;
  return result;
}

// Завдання 6: Масив поділити на два масиви: з додатніх та від’ємних елементів
function task6(arr) {
  const positive = arr.filter(val => val > 0);
  const negative = arr.filter(val => val < 0);
  return { positive, negative };
}

// Завдання 7: З масиву видалити дублікати максимума та мінімума
function task7(arr) {
  if (arr.length === 0) return [];
  const minVal = Math.min(...arr);
  const maxVal = Math.max(...arr);
  let minSeen = false;
  let maxSeen = false;

  return arr.filter(val => {
    if (val === minVal) {
      if (!minSeen) {
        minSeen = true;
        return true;
      }
      return false;
    }
    if (val === maxVal) {
      if (!maxSeen) {
        maxSeen = true;
        return true;
      }
      return false;
    }
    return true;
  });
}

// Завдання 8: Визначити середні арифметичні двох масивів. 
// Утворити третій масив з елементів обидвох масивів, 
// що знаходяться в межах між значеннями середніх арифметичних
function task8(arr1, arr2) {
  const avg1 = arr1.reduce((a, b) => a + b, 0) / arr1.length;
  const avg2 = arr2.reduce((a, b) => a + b, 0) / arr2.length;
  const lowerBoundary = Math.min(avg1, avg2);
  const upperBoundary = Math.max(avg1, avg2);

  const combined = [...arr1, ...arr2];
  return combined.filter(val => val >= lowerBoundary && val <= upperBoundary);
}

// Приклади
const mainArray = generateArray(10, -50, 50);
console.log("Згенерований масив:");
printArray(mainArray);

console.log("\n1. Парні у діапазоні [-20, 20]:", task1(mainArray, -20, 20));
console.log("2. Середнє арифметичне та > avg:", task2(mainArray));

const arrA = generateArray(5, 1, 10);
const arrB = generateArray(5, 1, 10);
console.log("3. Попарна сума одинакових масивів:", task3(arrA, arrB));

const arrC = generateArray(3, 1, 10);
const arrD = generateArray(6, 1, 10);
console.log("4. Конкатенація масивів:", task4(arrC, arrD));

console.log("5. Масив після обміну max/min:", task5(mainArray));
console.log("6. Розділені додатні та від'ємні:", task6(mainArray));
console.log("7. Без дублікатів min i max:", task7([5, 1, 5, -2, -2, 3]));
console.log("8. Елементи між середніми арифметичними двох масивів:", task8(arrA, arrD));