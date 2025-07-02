package main.java.com.example;
import main.java.com.example.entity.Book;

import java.util.List;
public class BookMapper {
    int insert(Book book);
    int updatePrice(int id, double price);
    Book selectById(int id);
    List<Book> selectByPriceRange(double minPrice, double maxPrice);
}
