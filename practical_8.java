public class practical_8 {

    // для реалізації вузла дерева
    private static class Node {
        int value;      // Власне значення вузла
        Node left;      // Посилання на ліву дитину
        Node right;     // Посилання на праву дитину

        Node(int value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }

    private Node root; // Кореневий елемент 
    private int size;  // Лічильник кількості елементів

    public practical_8() {
        this.root = null;
        this.size = 0;
    }

    public void add(int value) {
        root = addRecursive(root, value);
    }

    private Node addRecursive(Node current, int value) {
        // Якщо місце порожнє - вставляємо новий вузол
        if (current == null) {
            size++;
            return new Node(value);
        }
        // Менші значення йдуть вліво
        if (value < current.value) {
            current.left = addRecursive(current.left, value);
        } 
        // Більші або рівні значення йдуть вправо
        else {
            current.right = addRecursive(current.right, value);
        }
        return current;
    }

    // search element
    public boolean contains(int value) {
        return containsRecursive(root, value);
    }

    private boolean containsRecursive(Node current, int value) {
        if (current == null) {
            return false; 
        }
        if (value == current.value) {
            return true; 
        }
        // Відсіюємо непотрібну частину дерева
        return value < current.value
                ? containsRecursive(current.left, value)
                : containsRecursive(current.right, value);
    }

    public void remove(int value) {
        if (contains(value)) { // Перевіряємо, чи є такий елемент, щоб коректно зменшити size
            root = removeRecursive(root, value);
            size--;
        } else {
            System.out.println("Element " + value + " not found for removal.");
        }
    }

    private Node removeRecursive(Node current, int value) {
        if (current == null) return null;

        // Шукаємо вузол для видалення
        if (value == current.value) {
            // якщо вузол не має нащадків
            if (current.left == null && current.right == null) {
                return null;
            }
            // якщо вузол не має одного з нащадків
            if (current.right == null) {
                return current.left; // переміщуємо ліву дитину на місце поточного
            }
            if (current.left == null) {
                return current.right; // переміщуємо праву дитину на місце поточного
            }
            
            // якщо вузол має обидвох нащадків
            // Шукаємо найбільш лівий вузол у правій частині
            int smallestValue = findSmallestValue(current.right);
            current.value = smallestValue; // Замінюємо значення
            // Видаляємо той вузол, який ми щойно перемістили
            current.right = removeRecursive(current.right, smallestValue);
            return current;
        }

        if (value < current.value) {
            current.left = removeRecursive(current.left, value);
            return current;
        }

        current.right = removeRecursive(current.right, value);
        return current;
    }

    // Допоміжний метод для пошуку найменшого елемента в піддереві
    private int findSmallestValue(Node root) {
        return root.left == null ? root.value : findSmallestValue(root.left);
    }

    public void printAll() {
        System.out.print("Elements in the tree: ");
        printInOrder(root);
        System.out.println();
    }

    private void printInOrder(Node node) {
        if (node != null) {
            printInOrder(node.left);
            System.out.print(node.value + " ");
            printInOrder(node.right);
        }
    }

    public void printMax() {
        if (root == null) {
            System.out.println("Tree is empty.");
            return;
        }
        Node current = root;
        // Найбільший елемент завжди найбільш правий
        while (current.right != null) {
            current = current.right;
        }
        System.out.println("Maximum element: " + current.value);
    }

    public void printMin() {
        if (root == null) {
            System.out.println("Tree is empty.");
            return;
        }
        Node current = root;
        // Найменший елемент завжди найбільш лівий
        while (current.left != null) {
            current = current.left;
        }
        System.out.println("Minimum element: " + current.value);
    }

    public void printSize() {
        System.out.println("Number of elements in the tree: " + size);
    }
    public static void main(String[] args) {
        practical_8 tree = new practical_8();

        tree.add(3);
        tree.add(1);
        tree.add(1);
        tree.add(9);
        tree.add(7);
        tree.add(10);
        tree.add(6);
        tree.add(8);

        tree.printAll(); 
        
        tree.printSize();

        System.out.println("Is element 7 present? " + tree.contains(7));
        System.out.println("Is element 99 present? " + tree.contains(99));

        tree.printMin();
        tree.printMax();

        System.out.println("\n--- Removing element 3 (root) ---");
        tree.remove(3);
        
        tree.printAll();
        tree.printSize();
    }
}
