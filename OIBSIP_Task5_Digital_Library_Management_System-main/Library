package Library;

import java.util.Scanner;

// Class
public class Library {

    // Main driver method
    public static void main(String[] args)
    {
        // Creating object of Scanner class
        // to take input from user
        Scanner input = new Scanner(System.in);

        // Displaying menu
        System.out.println(
                "\n********************Welcome to the I2IT Library!********************");
        System.out.println(
                "\nSelect From The Following Options:               ");
//        System.out.println(
//                "*************************************************************************");

        // Creating object of book class
        books ob = new books();
        // Creating object of students class
        students obStudent = new students();

        int choice;
        int searchChoice;

        // Creating menu
        // using do-while loop
        do {

            ob.dispMenu();
            choice = input.nextInt();

            // Switch case
            switch (choice) {

                // Case
                case 1:
                    book b = new book();
                    ob.addBook(b);
                    break;

                // Case
                case 2:
                    ob.upgradeBookQty();
                    break;

                // Case
                case 3:

                    System.out.println(
                            " 1 :  Search with Book Serial No.");
                    System.out.println(
                            " 2 : Search with Book's Author Name.");
                    searchChoice = input.nextInt();

                    // Nested switch
                    switch (searchChoice) {

                        // Case
                        case 1:
                            ob.searchBySno();
                            break;

                        // Case
                        case 2:
                            ob.searchByAuthorName();
                    }
                    break;

                // Case
                case 4:
                    ob.showAllBooks();
                    break;

                // Case
                case 5:
                    student s = new student();
                    obStudent.addStudent(s);
                    break;

                // Case
                case 6:
                    obStudent.showAllStudents();
                    break;

                // Case
                case 7:
                    obStudent.checkOutBook(ob);
                    break;

                // Case
                case 8:
                    obStudent.checkInBook(ob);
                    break;

                // Default case that will execute for sure
                // if above cases does not match
                default:

                    // Print statement
                    System.out.println("ENTER BETWEEN 0 TO 8.");
            }

        }

        // Checking condition at last where we are
        // checking case entered value is not zero
        while (choice != 0);
    }
}