public class practical_7<T> {

    // Внутрішній клас для реалізації вузла (Node)
    private static class Node<T> {
        T data;         // Дані, що зберігаються
        Node<T> next;   // Адреса наступного вузла

        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }

    private Node<T> head; // Вказує на початок черги
    private Node<T> tail; // Вказує на кінець черги
    private int size;     // Зберігає кількість елементів у черзі

    public practical_7() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Додає новий елемент в чергу
    public void enqueue(T element) {
        Node<T> newNode = new Node<>(element);
        
        // Якщо черга порожня, новий елемент стає і Head, і Tail
        if (tail == null) {
            head = tail = newNode;
        } else {
            // Додаємо новий елемент після поточного Tail і оновлюємо Tail
            tail.next = newNode;
            tail = newNode;
        }
        size++;
    }

    // Повертає та видаляє наявний елемент з початку черги
    public T dequeue() {
        if (head == null) {
            throw new IllegalStateException("Error: Queue is empty.");
        }
        
        T item = head.data;
        head = head.next; // Head тепер вказує на наступний елемент
        
        // Якщо черга стала порожньою, Tail також має стати null
        if (head == null) {
            tail = null;
        }
        
        size--;
        return item;
    }

    // Повертає кількість елементів черги
    public int getSize() {
        return size;
    }

    // Виводить всі елементи черги
    public void printQueue() {
        if (head == null) {
            System.out.println("Error: Queue is empty.");
            return;
        }
        
        Node<T> current = head;
        System.out.print("Elements in queue (from Head to Tail): ");
        while (current != null) {
            System.out.print(current.data + " ");
            current = current.next;
        }
        System.out.println();
    }

    // Головний метод для перевірки роботи
    public static void main(String[] args) {
        practical_7<Integer> queue = new practical_7<>();

        System.out.println("--- Adding elements ---");
        queue.enqueue(12);
        queue.enqueue(25);
        queue.enqueue(8);
        
        queue.printQueue();
        System.out.println("Number of elements: " + queue.getSize());

        System.out.println("\n--- Removing element ---");
        System.out.println("Removed: " + queue.dequeue());
        queue.printQueue();
        System.out.println("Number of elements: " + queue.getSize());
        
        System.out.println("\n--- Adding one more element ---");
        queue.enqueue(100);
        queue.printQueue();
        System.out.println("Number of elements: " + queue.getSize());
    }
}