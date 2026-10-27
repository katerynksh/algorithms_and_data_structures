package practical_4;
import java.util.Scanner;

public class task1 {
    public static void main (String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();
        
        printNumbers(number);
        
    }



    public static void printNumbers (int current) {
        if (current < 1) {
            return;
        }

        printNumbers(current - 1);
        System.out.println(current);

    }
}
