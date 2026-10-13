package practical_4;
import java.util.Scanner;

public class task5 {
    public static void main (String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a number");
        int number = scanner.nextInt();

        printRightToLeft(number);
        
    }
    private static void printRightToLeft (int number) {
        System.out.println(number % 10);
        if (number >= 10) {
            printRightToLeft(number / 10);
        }
    }
}
