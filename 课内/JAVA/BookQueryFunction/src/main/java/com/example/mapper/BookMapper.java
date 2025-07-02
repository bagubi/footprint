package main.java.com.example.mapper;

import main.java.com.example.entity.Book;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BookMapper {
    int insert(Book book);
    int updatePrice(int id, double price);
    Book selectById(int id);

    // ��� @Param ע�⣬Ϊ��������
    List<Book> selectByPriceRange(@Param("minPrice") double minPrice,
                                  @Param("maxPrice") double maxPrice);
}