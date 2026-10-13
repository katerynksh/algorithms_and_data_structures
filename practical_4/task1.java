package practical_4;
import java.util.Scanner;

public class task1 {
    public static void main (String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a number");
        int number = scanner.nextInt();
        
        printNumbers(1, number);
        
    }
    private static void printNumbers (int current, int number) {
        if (current > number) {
            return;
        }
        
        System.out.print(current);
        if (current < number) {
            System.out.print(" ");
        }
        
        printNumbers(current + 1, number);

    }
}
