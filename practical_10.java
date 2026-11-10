public class practical_10 {

    private static class Node {
        int data;      // Дані вузла
        Node prev;     // Посилання на попередній вузол
        Node next;     // Посилання на наступний вузол

        Node(int data) {
            this.data = data;
            this.prev = null;
            this.next = null;
        }
    }

    private Node head; // перший елемент у зв'язному списку
    private Node tail; // останній елемент у зв'язному списку
    private int size;  // Розмір списку

    public practical_10() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // 1. Додати елемент в початок списку
    public void addFirst(int value) {
        Node newNode = new Node(value);
        if (isEmpty()) {
            head = tail = newNode;
        } else {
            newNode.next = head;
            head.prev = newNode;
            head = newNode;
        }
        size++;
    }

    // 2. Додати елемент в кінець списку
    public void addLast(int value) {
        Node newNode = new Node(value);
        if (isEmpty()) {
            head = tail = newNode;
        } else {
            tail.next = newNode;
            newNode.prev = tail;
            tail = newNode;
        }
        size++;
    }

    // 3. Видалити перший елемент списку
    public void removeFirst() {
        if (isEmpty()) throw new IllegalStateException("List is empty");
        if (head == tail) {
            head = tail = null;
        } else {
            head = head.next;
            head.prev = null;
        }
        size--;
    }

    // 4. Видалити останній елемент списку
    public void removeLast() {
        if (isEmpty()) throw new IllegalStateException("List is empty");
        if (head == tail) {
            head = tail = null;
        } else {
            tail = tail.prev;
            tail.next = null;
        }
        size--;
    }

    // 5. Перевірити чи існує заданий елемент в списку
    public boolean contains(int value) {
        Node current = head;
        while (current != null) {
            if (current.data == value) return true;
            current = current.next;
        }
        return false;
    }

    // 6. Отримати елемент за індексом
    public int get(int index) {
        checkIndex(index);
        return getNode(index).data;
    }

    // 7. Вставити елемент за індексом
    public void insertAt(int index, int value) {
        if (index < 0 || index > size) throw new IndexOutOfBoundsException("Index " + index + " is out of bounds for list of size " + size);
        if (index == 0) {
            addFirst(value);
        } else if (index == size) {
            addLast(value);
        } else {
            Node current = getNode(index);
            Node newNode = new Node(value);
            
            newNode.prev = current.prev;
            newNode.next = current;
            current.prev.next = newNode;
            current.prev = newNode;
            
            size++;
        }
    }

    // 8. Видалити елемент за індексом
    public void removeAt(int index) {
        checkIndex(index);
        if (index == 0) {
            removeFirst();
        } else if (index == size - 1) {
            removeLast();
        } else {
            Node current = getNode(index);
            current.prev.next = current.next;
            current.next.prev = current.prev;
            size--;
        }
    }

    // 9. Повернути найбільший елемент
    public int getMax() {
        if (isEmpty()) throw new IllegalStateException("List is empty");
        int max = head.data;
        Node current = head.next;
        while (current != null) {
            if (current.data > max) max = current.data;
            current = current.next;
        }
        return max;
    }

    // 10. Повернути найменший елемент
    public int getMin() {
        if (isEmpty()) throw new IllegalStateException("List is empty");
        int min = head.data;
        Node current = head.next;
        while (current != null) {
            if (current.data < min) min = current.data;
            current = current.next;
        }
        return min;
    }

    // 11. Отримати розмір списку
    public int getSize() {
        return size;
    }

    // 12. Вивести елементи списку у заданому форматі
    public void printList() {
        if (isEmpty()) {
            System.out.println("{}");
            return;
        }
        StringBuilder sb = new StringBuilder("{");
        Node current = head;
        int index = 0;
        while (current != null) {
            sb.append("[index:").append(index).append("; value:").append(current.data).append("]");
            if (current.next != null) {
                sb.append(" ");
            }
            current = current.next;
            index++;
        }
        sb.append("}");
        System.out.println(sb.toString());
    }

    // 13. Додати множину елементів (масив) у вказане місце
    public void addAll(int index, int[] array) {
        if (index < 0 || index > size) throw new IndexOutOfBoundsException("Index " + index + " is out of bounds for list of size " + size);
        if (array == null || array.length == 0) return;

        // Вставляємо елементи масиву один за одним починаючи із заданого індексу
        for (int i = 0; i < array.length; i++) {
            insertAt(index + i, array[i]);
        }
    }

    private boolean isEmpty() {
        return size == 0;
    }

    private void checkIndex(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index " + index + " is out of bounds for list of size " + size);
        }
    }

    private Node getNode(int index) {
        Node current;
        // якщо індекс у першій половині списку, йдемо з початку
        if (index < size / 2) {
            current = head;
            for (int i = 0; i < index; i++) {
                current = current.next;
            }
        } 
        else {
            current = tail;
            for (int i = size - 1; i > index; i--) {
                current = current.prev;
            }
        }
        return current;
    }

    public static void main(String[] args) {
        practical_10 list = new practical_10();

        System.out.println("1. Adding elements to the list:");
        list.addLast(10);
        list.addLast(45);
        list.addFirst(5);
        list.printList(); // Очікується: {[index:0; value:5] [index:1; value:10] [index:2; value:45]}

        System.out.println("\n2. Adding array at index 1:");
        int[] arr = {20, 30};
        list.addAll(1, arr);
        list.printList(); // Очікується: {[index:0; value:5] [index:1; value:20] [index:2; value:30] [index:3; value:10] [index:4; value:45]}

        System.out.println("\n3. Removing first and last elements:");
        list.removeFirst();
        list.removeLast();
        list.printList(); // Очікується: {[index:0; value:20] [index:1; value:30] [index:2; value:10]}

        System.out.println("\n4. Information about the list:");
        System.out.println("List size: " + list.getSize());
        System.out.println("Contains 30? " + list.contains(30));
        System.out.println("Element at index 1: " + list.get(1));
        System.out.println("Maximum element: " + list.getMax());
        System.out.println("Minimum element: " + list.getMin());

        System.out.println("\n5. Removing element at index 1:");
        list.removeAt(1);
        list.printList(); // Очікується: {[index:0; value:20] [index:1; value:10]}
    }
}