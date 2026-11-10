import java.util.Arrays;
import java.util.Random;

public class practical_9 {

    public static void main(String[] args) {
        int[] sizes = {10000, 100000, 1000000, 10000000, 100000000};

        System.out.printf("%-15s | %-25s | %-25s | %-25s%n", 
                "Size", "Method 1 (Sorting)", "Method 2 (Array of 6)", "Method 3 (Max Elements)");
        System.out.println("-".repeat(95));

        for (int size : sizes) {
            long[] timesMethod1 = new long[3];
            long[] timesMethod2 = new long[3];
            long[] timesMethod3 = new long[3];

            for (int run = 0; run < 3; run++) {
                int[] originalArray = generateRandomArray(size);

                // Спосіб 1: копіюємо масив, бо сортування його змінить
                int[] arr1 = Arrays.copyOf(originalArray, originalArray.length);
                long start1 = System.currentTimeMillis();
                method1(arr1);
                long end1 = System.currentTimeMillis();
                timesMethod1[run] = (end1 - start1);

                // Спосіб 2: масив не змінюється, передаємо оригінал
                long start2 = System.currentTimeMillis();
                method2(originalArray);
                long end2 = System.currentTimeMillis();
                timesMethod2[run] = (end2 - start2);

                // Спосіб 3: копіюємо масив, бо метод заміняє елементи на мінімальні
                int[] arr3 = Arrays.copyOf(originalArray, originalArray.length);
                long start3 = System.currentTimeMillis();
                method3(arr3);
                long end3 = System.currentTimeMillis();
                timesMethod3[run] = (end3 - start3);
            }

            String res1 = formatResult(timesMethod1);
            String res2 = formatResult(timesMethod2);
            String res3 = formatResult(timesMethod3);

            System.out.printf("%-15d | %-25s | %-25s | %-25s%n", size, res1, res2, res3);
        }
    }

    public static int[] generateRandomArray(int size) {
        int[] arr = new int[size];
        Random rnd = new Random();
        for (int i = 0; i < size; i++) {
            // (20001) дає діапазон 0..20000, віднімаємо 10000 -> -10000..10000
            arr[i] = rnd.nextInt(20001) - 10000;
        }
        return arr;
    }

    // Спосіб 1: Відсортувати масив і взяти 6-й найбільший елемент
    public static int method1(int[] arr) {
        // вбудоване сортування
        Arrays.sort(arr); 
        return arr[arr.length - 6];
    }

    // Спосіб 2: Запам'ятовувати 6 найбільших елементів у відсортованому масиві
    public static int method2(int[] arr) {
        int[] top6 = new int[6];
        Arrays.fill(top6, Integer.MIN_VALUE);
        
        for (int num : arr) {
            if (num > top6[0]) {
                top6[0] = num;
                Arrays.sort(top6); // Підтримуємо масив з 6 елементів відсортованим
            }
        }
        return top6[0]; 
    }

    // Спосіб 3: 6 разів знайти найбільший, заміняючи його на найменший можливий
    public static int method3(int[] arr) {
        int max = Integer.MIN_VALUE;
        for (int k = 0; k < 6; k++) {
            max = Integer.MIN_VALUE;
            int maxIndex = -1;
            
            // Знаходимо максимум поточного масиву
            for (int i = 0; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                    maxIndex = i;
                }
            }
            // Заміняємо знайдений максимум на мінімальне значення
            if (k < 5 && maxIndex != -1) {
                arr[maxIndex] = Integer.MIN_VALUE;
            }
        }
        return max; 
    }

    // Допоміжний метод для форматування виводу: Середнє(Т1 Т2 Т3)
    private static String formatResult(long[] times) {
        long sum = 0;
        for (long t : times) {
            sum += t;
        }
        long avg = sum / times.length;
        return String.format("%d(%d %d %d)", avg, times[0], times[1], times[2]);
    }
}