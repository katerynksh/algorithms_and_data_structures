public class practical_6 <T> {
    
    // Внутрішній клас для реалізації вузла
    private static class Node<T> {
        T data;         // Дані, що зберігаються
        Node<T> next;   // Посилання на попередній елемент

        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }

    private Node<T> top; // Вказує на поточний (верхній) елемент
    private int size;    // Лічильник кількості елементів

    // Конструктор ініціалізації порожнього стеку
    public practical_6() {
        this.top = null;
        this.size = 0;
    }

    // вставляє об'єкт на вершину стеку
    public void push(T item) {
        Node<T> newNode = new Node<>(item);
        newNode.next = top;
        top = newNode;
        size++;
    }

    // повертає елемент з вершини стеку та видаляє його
    public T pop() {
        if (top == null) {
            throw new IllegalStateException("Error: Stack is empty.");
        }
        T item = top.data;
        top = top.next;
        size--;
        return item;
    }

    // повертає елемент з вершини стеку (без видалення)
    public T peek() {
        if (top == null) {
            throw new IllegalStateException("Error: Stack is empty.");
        }
        return top.data;
    }

    // видаляє всі елементи з стеку
    public void clear() {
        top = null;
        size = 0;
    }

    // повертає кількість елементів у стеку
    public int size() {
        return size;
    }

    // повертає кількість елементів стеку (дублює функціонал size)
    public int count() {
        return size;
    }

    // виводить всі елементи стеку, але не видаляє їх
    @Override
    public String toString() {
        if (top == null) {
            return "Stack is empty.";
        }
        
        StringBuilder sb = new StringBuilder();
        sb.append("Stack elements (top to bottom): [");
        Node<T> current = top;
        
        while (current != null) {
            sb.append(current.data);
            if (current.next != null) {
                sb.append(", ");
            }
            current = current.next;
        }
        sb.append("]");
        return sb.toString();
    }

    public static void main(String[] args) {
        practical_6<Integer> stack = new practical_6<>();

        System.out.println("--- 1. Adding elements to the stack (push) ---");
        stack.push(11);
        stack.push(22);
        stack.push(33);
        System.out.println(stack.toString());
        System.out.println("Size: " + stack.size());

        System.out.println("\n--- 2. Reading the top element (peek) ---");
        System.out.println("Top element: " + stack.peek());

        System.out.println("\n--- 3. Removing from the top (pop) ---");
        System.out.println("Removed element: " + stack.pop());
        System.out.println(stack.toString());
        System.out.println("Count: " + stack.count());

        System.out.println("\n--- 4. Clear ---");
        stack.clear();
        System.out.println(stack.toString());
        System.out.println("Size: " + stack.size());
    }
}
