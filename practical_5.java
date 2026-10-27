public class practical_5 {

    private static void runTests(int[] sizes, boolean isAscending) {
        for (int size : sizes) {
            double[] arr = new double[size];
            for (int i = 0; i < size; i++) {
                arr[i] = Math.random() * 1000;
            }

            long startTime = System.nanoTime();
            
            sort(arr, isAscending);
            
            long endTime = System.nanoTime();
            double durationInMilliseconds = (endTime - startTime) / 1_000_000.0;

            System.out.println("Розмір масиву: " + size);
            System.out.println("Масив відсортовано правильно: " + isSorted(arr, isAscending));
            System.out.printf("Час виконання: %.3f мс\n\n", durationInMilliseconds);
        }
    }
    
    private static void swap(double[] arr, int i, int j) {
        double temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    private static int partition(double[] arr, int low, int high, boolean isAscending) {
        double pivot = arr[high];
        int i = (low - 1);

        for (int j = low; j < high; j++) {
            boolean condition = isAscending ? (arr[j] <= pivot) : (arr[j] >= pivot);
            
            if (condition) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return i + 1;
    }

    private static void quickSort(double[] arr, int low, int high, boolean isAscending) {
        if (low < high) {
            int pi = partition(arr, low, high, isAscending);

            quickSort(arr, low, pi - 1, isAscending);
            quickSort(arr, pi + 1, high, isAscending);
        }
    }

    public static void sort(double[] arr, boolean isAscending) {
        if (arr == null || arr.length == 0) return;
        quickSort(arr, 0, arr.length - 1, isAscending);
    }

    public static boolean isSorted(double[] arr, boolean isAscending) {
        for (int i = 0; i < arr.length - 1; i++) {
            if (isAscending) {
                if (arr[i] > arr[i + 1]) return false;
            } else {
                if (arr[i] < arr[i + 1]) return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        int[] sizes = {1_000, 10_000, 100_000};

        System.out.println("ascending");
        runTests(sizes, true);

        System.out.println("descending");
        runTests(sizes, false);
    }
}