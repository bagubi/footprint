package cn.itcast.bookmanager.dao;

import cn.itcast.bookmanager.model.BorrowDetail;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class BorrowDetailDao {

    public int add(Connection con, BorrowDetail borrowDetail) throws SQLException {
        String sql = "INSERT INTO borrowdetail (user_id, book_id, status, borrow_time) VALUES (?, ?, ?, ?)";
        try (PreparedStatement pstmt = con.prepareStatement(sql)) {
            pstmt.setInt(1, borrowDetail.getUserId());
            pstmt.setInt(2, borrowDetail.getBookId());
            pstmt.setInt(3, borrowDetail.getStatus());
//            pstmt.setLong(4, borrowDetail.getBorrowTime());
            return pstmt.executeUpdate();
        }
    }

    public int returnBook(Connection con, BorrowDetail detail) throws SQLException {
        String sql = "UPDATE borrowdetail SET status = ?, return_time = ? WHERE id = ?";
        try (PreparedStatement pstmt = con.prepareStatement(sql)) {
            pstmt.setInt(1, detail.getStatus());
            pstmt.setLong(2, detail.getReturnTime());
            pstmt.setInt(3, detail.getBorrowId()); // 注意这里的字段名应该是borrow_id还是id，请确认与数据库表结构一致
            return pstmt.executeUpdate();
        }
    }
}