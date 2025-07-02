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

            // ��������ʾ��
            Book book = new Book();
            book.setName("Html");
            book.setAuthor("hhyz");
            book.setPrice(99);
            mapper.insert(book);
            session.commit();

            // ��ѯ����ʾ��
            Book queriedBook = mapper.selectById(1);
            System.out.println("��ѯIDΪ1���飺" + queriedBook.getName());

            // ��������ѯʾ��
            List<Book> books = mapper.selectByPriceRange(50.0, 100.0);
            System.out.println("�۸�50~100���飺");
            for (Book b : books) {
                System.out.println(b.getName() + " - " + b.getPrice());
            }
        }
    }
}