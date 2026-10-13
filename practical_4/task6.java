package practical_4;
import java.util.Scanner;

public class task6 {
    public static void main (String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a number");
        int number = scanner.nextInt();

        printLeftToRight(number);
        
    }
    private static void printLeftToRight (int number) {
        if (number >= 10) {
            printLeftToRight(number / 10);
            System.out.println(" ");
        }
        System.out.print(number % 10);
    }
}