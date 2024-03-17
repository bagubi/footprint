#include <stdio.h>
#include <string.h>
struct a
{
    /* data */
    int bookNumber;
    int stock;
    float price;
    int priority;
};
main()

{
    void changeStock(struct BookInfo oneBook, int stk)
    {
        oneBook.stock = stk;
    }
    void changePrice(struct BookInfo oneBook, int price)
    {
        oneBook.price = price;
    }
    void changeStock(struct BookInfo oneBook, int priority)
    {
        oneBook.priority = priority;
    }
}
