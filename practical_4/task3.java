package practical_4;
import java.util.Scanner;

public class task3 {
    public static void main (String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a number:");
        int number = scanner.nextInt();
        
        if (isPowerOfTwo(number)) {
            System.out.print("YES");
        } else {
            System.out.print("NO");
        }
        
    }
    private static boolean isPowerOfTwo (int number) {
        if (number == 1) {
            return true;
        } else if (number <= 0 || number % 2 != 0) {
            return false;
        }
        return isPowerOfTwo(number / 2);
    }
}
