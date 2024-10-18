package cn.itcast.bookmanager.dao;

import cn.itcast.bookmanager.model.BorrowDetail;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BdetailDao {

    private long borrowTime;

    public long getBorrowTime() {
        return borrowTime;
    }

    public void setBorrowTime(long borrowTime) {
        this.borrowTime = borrowTime;
    }
    private Connection connection;

    public BdetailDao(Connection connection) {
        this.connection = connection;
    }

    // Add borrow detail
    // Add borrow detail
    public int add(BorrowDetail borrowDetail) throws SQLException {
        String sql = "INSERT INTO bdetail (book_id, user_id, status, borrow_time) VALUES (?, ?, ?, ?)";
        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setInt(1, borrowDetail.getBookId());
            ps.setInt(2, borrowDetail.getUserId());
            ps.setInt(3, borrowDetail.getStatus());
//            ps.setTimestamp(4, new java.sql.Timestamp(borrowDetail.getBorrowTime()));

            return ps.executeUpdate(); // Return number of affected rows
        }
    }


    // List borrow details for a specific book
    public List<BorrowDetail> list(int bookId) throws SQLException {
        List<BorrowDetail> borrowDetails = new ArrayList<>();
        String sql = "SELECT * FROM bdetail WHERE book_id = ? AND status = 1";
        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setInt(1, bookId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                BorrowDetail borrowDetail = new BorrowDetail();
                borrowDetail.setBookId(rs.getInt("book_id"));
                borrowDetail.setUserId(rs.getInt("user_id"));
                borrowDetail.setStatus(rs.getInt("status"));
                borrowDetail.setBorrowTime(rs.getTimestamp("borrow_time"));

                borrowDetails.add(borrowDetail);
            }
        }
        return borrowDetails;
    }

    // Close connection
    public void close() throws SQLException {
        if (connection != null) {
            connection.close();
        }
    }


    public ResultSet list(com.mysql.jdbc.Connection con, BorrowDetail borrowDetail) {
        return null;
    }

    public int add(com.mysql.jdbc.Connection con, BorrowDetail borrowDetail) {
        return 0;
    }
}