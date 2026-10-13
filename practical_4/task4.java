package practical_4;
import java.util.Scanner;

public class task4 {
    public static void main (String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a number:");
        int number = scanner.nextInt();
        
        System.out.println(sumDigits(number));
        
    }
    private static int sumDigits (int number) {
        if (number == 0) {
            return 0;
        }
        return (number % 10) + sumDigits(number / 10);
    }
}
