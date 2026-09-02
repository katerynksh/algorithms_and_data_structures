function findThreeNumbers(numbers) {
    let result = [];

    // сортуємо масив чисел (копію) від меншого до більшого
    let arr = [...numbers].sort((a, b) => a - b);

    for (let i = 0; i < arr.length - 2; i++) {

        // пропускаємо однакові числа
        if (i > 0 && arr[i] === arr[i - 1]) {
            continue;
        }

        let left = i + 1;
        let right = arr.length - 1;

        while (left < right) {
            let sum = arr[i] + arr[left] + arr[right];

            if (sum === 0) {
                result.push([arr[i], arr[left], arr[right]]);

                // до наступних чисел
                left++;
                right--;

            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}


let numbers = [6, -6, 7, -7, 9, 6, -1, 48, -8, 5, -2, 8, -4, 10, -10, undefined, "sixseven"];

let triples = findThreeNumbers(numbers);

if (triples.length > 0) {
    console.log("Знайдені трійки:");
    console.log(triples);
} else {
    console.log("Трійок із сумою 0 не знайдено");
}