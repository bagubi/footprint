package cn.itcast.bookmanager.dao;

import cn.itcast.bookmanager.model.Book;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
public class BookDao {

        // Õº ÈÃÌº”
        public int add(Connection con, Book book)throws Exception{
            String sql="insert into book (book_name,type_id,author,publish,price,number,status,remark) values(?,?,?,?,?,?,?,?)";
            PreparedStatement pstmt=(PreparedStatement) con.prepareStatement(sql);
            pstmt.setString(1, book.getBookName());
            pstmt.setInt(2, book.getBookTypeId());
            pstmt.setString(3, book.getAuthor());
            pstmt.setString(4, book.getPublish());
            pstmt.setDouble(5, book.getPrice());
            pstmt.setInt(6, book.getNumber());
            pstmt.setInt(7, book.getStatus());
            pstmt.setString(8, book.getRemark());
            return pstmt.executeUpdate();
        }


    public int addBook(Book book) {

        return 0;
    }
}
