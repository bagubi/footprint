package cn.itcast.bookmanager.JFrame;

import cn.itcast.bookmanager.dao.BdetailDao;
import cn.itcast.bookmanager.model.Book;
import cn.itcast.bookmanager.model.BorrowDetail;
import cn.itcast.bookmanager.utils.DbUtil;
import cn.itcast.bookmanager.utils.toolUtil;
import com.mysql.jdbc.Connection;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Vector;


/**
 * 用户菜单界面类，展示书籍信息、借书、还书等功能。
 */
public class UserMenuFrm {
    private DbUtil dbUtil = new DbUtil();
    private JTextField textField_1;
    private JComboBox comboBox;
    private DefaultTableModel BookModel;
    private JTable BookTable;
    private JLabel textField_2; // 应该是 JTextField 而非 Label，用于显示编号
    private JTextField textField_3;
    private JTable table;
    private JLabel lblNewLabel_1;
    private JTextField textField;
    private JButton btnBackBook;
     // 数据库工具类实例
    private ThreadGroup bookDao;

    /**
     * 设置窗体可见性，并初始化界面组件及事件监听。
     * @param b 窗口是否可见的标志
     */
    public void setVisible(boolean b) {
        // 初始化书籍信息表格面板
        initBookInfoPanel();

        // 初始化借书信息表格面板
        initBorrowInfoPanel();

        // 初始化还书功能面板
        initReturnBookPanel();

        // 设置窗口标题和用户信息显示
        setTitleAndUserInfo();

        // 设置窗体属性并使其可见
        JFrame jf = new JFrame("用户菜单"); // 实例化 JFrame
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jf.pack();
        jf.setVisible(b);
        jf.setResizable(true);
    }

    private void initBookInfoPanel() {
        // 初始化书籍信息展示的TitledBorder及其中的组件
        // 包括书籍列表的查询、表格展示等
        // 略去具体实现细节以保持示例简洁
    }

    private void initBorrowInfoPanel() {
        // 初始化借书信息展示的TitledBorder及借书按钮的事件监听
        // 略去具体实现细节以保持示例简洁
    }

    private void initReturnBookPanel() {
        // 初始化还书功能的TitledBorder及还书按钮的事件监听
        // 略去具体实现细节以保持示例简洁
    }

    private void setTitleAndUserInfo() {
        // 设置窗口标题，并显示当前登录用户的用户名
        JFrame jf = new JFrame(); // 实例化 JFrame
        JLabel lblNewLabel_1 = new JLabel();
        lblNewLabel_1.setForeground(Color.RED);
        lblNewLabel_1.setFont(new Font("Dialog", Font.BOLD, 18));
        lblNewLabel_1.setBounds(315, 10, 197, 28);
        jf.getContentPane().add(lblNewLabel_1);
        lblNewLabel_1.setText(LoginFrm.currentUser.getUserName()); // 假设LoginFrm有静态字段currentUser
    }
    private BdetailDao bdetailDao;
    /**
     * 从数据库获取书籍信息并填充到表格中。
     * @param book 查询条件的Book对象
     */
    private void populateBookData(Book book) {
        DefaultTableModel model = (DefaultTableModel) BookTable.getModel();
        model.setRowCount(0); // 清空现有数据

        String query = "SELECT id, book_name, type_name, author, remark FROM books WHERE ..."; // 完善查询条件

        try (Connection connection = (Connection) dbUtil.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            // 如果book对象用于过滤查询，设置PreparedStatement的参数
            // 例如：preparedStatement.setInt(1, book.getId());

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Vector<Object> rowData = new Vector<>();
                rowData.add(resultSet.getInt("id"));
                rowData.add(resultSet.getString("book_name"));
                rowData.add(resultSet.getString("type_name"));
                rowData.add(resultSet.getString("author"));
                rowData.add(resultSet.getString("remark"));
                model.addRow(rowData);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "数据加载失败：" + e.getMessage(), "错误", JOptionPane.ERROR_MESSAGE);
            throw new RuntimeException("Failed to load book data", e); // 将异常转换并抛出，如果外部需要处理
        }
    }
    public void actionPerformed(ActionEvent e) {
        BorrowDetail borrowDetail = new BorrowDetail();
        borrowDetail.setStatus(1);
        borrowDetail.setBorrowTime(toolUtil.getTime());

        String bookId = textField_2.getText();
        String bookName = textField_3.getText();
        if (toolUtil.isEmpty(bookId) || toolUtil.isEmpty(bookName)) {
            JOptionPane.showMessageDialog(null, "请选择相关书籍");
            return;
        }


        borrowDetail.setUserId(LoginFrm.currentUser.getUserId());
        try {
            borrowDetail.setBookId(Integer.parseInt(bookId)); // 尝试捕获可能的NumberFormatException
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "书ID格式不正确");
            return;
        }
        borrowDetail.setStatus(1);
        borrowDetail.setBorrowTime(toolUtil.getTime());

        Connection con = null;
        try {
            con = (Connection) dbUtil.getConnection(); // 获取数据库连接

            // 创建 BdetailDao 对象
            BdetailDao bdetailDao = new BdetailDao(con);

            // 查询是否有该书已借出
            ResultSet resultSet = bdetailDao.list(con, borrowDetail);
            if (resultSet.next()) {
                JOptionPane.showMessageDialog(null, "该书已在借, 请先还再借");
                return;
            }

            // 尝试添加借阅记录
            int result = bdetailDao.add(con, borrowDetail);
            if (result == 1) {
                JOptionPane.showMessageDialog(null, "借书成功");
                putDates(new BorrowDetail());
            } else {
                JOptionPane.showMessageDialog(null, "借书失败");
            }
        } catch (Exception e1) {
            e1.printStackTrace();
            JOptionPane.showMessageDialog(null, "借书异常");
        } finally {
            try {
                if (con != null) {
                    dbUtil.closeCon(con);
                }
            } catch (Exception e1) {
                e1.printStackTrace();
            }
        }
    }


    private void putDates(BorrowDetail borrowDetail) {
    }


}
