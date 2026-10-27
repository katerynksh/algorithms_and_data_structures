package practical_4;
import java.util.Scanner;

public class task2 {
    public static void main (String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the first number");
        int first = scanner.nextInt();
        System.out.println("Enter the second number");
        int second = scanner.nextInt();

        printNumbers(first, second);
        
    }
    private static void printNumbers (int first, int second) {
        System.out.println(first);
        if (first == second) {
            return;
        }
            System.out.print(" ");
        if (first < second){
            printNumbers(first + 1, second);
        } else {
            printNumbers(first - 1, second);
        }

    }
}