package main.java.com.example;

import main.java.com.example.entity.Book;
import main.java.com.example.mapper.BookMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;
import java.util.List;

public class App {
    public static void main(String[] args) throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        try (SqlSession session = sqlSessionFactory.openSession()) {
            BookMapper mapper = session.getMapper(BookMapper.class);

            // 插入数据示例
            Book book = new Book();
            book.setName("Html");
            book.setAuthor("hhyz");
            book.setPrice(99);
            mapper.insert(book);
            session.commit();

            // 查询数据示例
            Book queriedBook = mapper.selectById(1);
            System.out.println("查询ID为1的书：" + queriedBook.getName());

            // 多条件查询示例
            List<Book> books = mapper.selectByPriceRange(50.0, 100.0);
            System.out.println("价格50~100的书：");
            for (Book b : books) {
                System.out.println(b.getName() + " - " + b.getPrice());
            }
        }
    }
}