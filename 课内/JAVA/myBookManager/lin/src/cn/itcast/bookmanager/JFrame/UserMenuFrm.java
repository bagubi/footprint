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
 * �û��˵������࣬չʾ�鼮��Ϣ�����顢����ȹ��ܡ�
 */
public class UserMenuFrm {
    private DbUtil dbUtil = new DbUtil();
    private JTextField textField_1;
    private JComboBox comboBox;
    private DefaultTableModel BookModel;
    private JTable BookTable;
    private JLabel textField_2; // Ӧ���� JTextField ���� Label��������ʾ���
    private JTextField textField_3;
    private JTable table;
    private JLabel lblNewLabel_1;
    private JTextField textField;
    private JButton btnBackBook;
     // ���ݿ⹤����ʵ��
    private ThreadGroup bookDao;

    /**
     * ���ô���ɼ��ԣ�����ʼ������������¼�������
     * @param b �����Ƿ�ɼ��ı�־
     */
    public void setVisible(boolean b) {
        // ��ʼ���鼮��Ϣ������
        initBookInfoPanel();

        // ��ʼ��������Ϣ������
        initBorrowInfoPanel();

        // ��ʼ�����鹦�����
        initReturnBookPanel();

        // ���ô��ڱ�����û���Ϣ��ʾ
        setTitleAndUserInfo();

        // ���ô������Բ�ʹ��ɼ�
        JFrame jf = new JFrame("�û��˵�"); // ʵ���� JFrame
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jf.pack();
        jf.setVisible(b);
        jf.setResizable(true);
    }

    private void initBookInfoPanel() {
        // ��ʼ���鼮��Ϣչʾ��TitledBorder�����е����
        // �����鼮�б�Ĳ�ѯ�����չʾ��
        // ��ȥ����ʵ��ϸ���Ա���ʾ�����
    }

    private void initBorrowInfoPanel() {
        // ��ʼ��������Ϣչʾ��TitledBorder�����鰴ť���¼�����
        // ��ȥ����ʵ��ϸ���Ա���ʾ�����
    }

    private void initReturnBookPanel() {
        // ��ʼ�����鹦�ܵ�TitledBorder�����鰴ť���¼�����
        // ��ȥ����ʵ��ϸ���Ա���ʾ�����
    }

    private void setTitleAndUserInfo() {
        // ���ô��ڱ��⣬����ʾ��ǰ��¼�û����û���
        JFrame jf = new JFrame(); // ʵ���� JFrame
        JLabel lblNewLabel_1 = new JLabel();
        lblNewLabel_1.setForeground(Color.RED);
        lblNewLabel_1.setFont(new Font("Dialog", Font.BOLD, 18));
        lblNewLabel_1.setBounds(315, 10, 197, 28);
        jf.getContentPane().add(lblNewLabel_1);
        lblNewLabel_1.setText(LoginFrm.currentUser.getUserName()); // ����LoginFrm�о�̬�ֶ�currentUser
    }
    private BdetailDao bdetailDao;
    /**
     * �����ݿ��ȡ�鼮��Ϣ����䵽����С�
     * @param book ��ѯ������Book����
     */
    private void populateBookData(Book book) {
        DefaultTableModel model = (DefaultTableModel) BookTable.getModel();
        model.setRowCount(0); // �����������

        String query = "SELECT id, book_name, type_name, author, remark FROM books WHERE ..."; // ���Ʋ�ѯ����

        try (Connection connection = (Connection) dbUtil.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            // ���book�������ڹ��˲�ѯ������PreparedStatement�Ĳ���
            // ���磺preparedStatement.setInt(1, book.getId());

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
            JOptionPane.showMessageDialog(null, "���ݼ���ʧ�ܣ�" + e.getMessage(), "����", JOptionPane.ERROR_MESSAGE);
            throw new RuntimeException("Failed to load book data", e); // ���쳣ת�����׳�������ⲿ��Ҫ����
        }
    }
    public void actionPerformed(ActionEvent e) {
        BorrowDetail borrowDetail = new BorrowDetail();
        borrowDetail.setStatus(1);
        borrowDetail.setBorrowTime(toolUtil.getTime());

        String bookId = textField_2.getText();
        String bookName = textField_3.getText();
        if (toolUtil.isEmpty(bookId) || toolUtil.isEmpty(bookName)) {
            JOptionPane.showMessageDialog(null, "��ѡ������鼮");
            return;
        }


        borrowDetail.setUserId(LoginFrm.currentUser.getUserId());
        try {
            borrowDetail.setBookId(Integer.parseInt(bookId)); // ���Բ�����ܵ�NumberFormatException
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "��ID��ʽ����ȷ");
            return;
        }
        borrowDetail.setStatus(1);
        borrowDetail.setBorrowTime(toolUtil.getTime());

        Connection con = null;
        try {
            con = (Connection) dbUtil.getConnection(); // ��ȡ���ݿ�����

            // ���� BdetailDao ����
            BdetailDao bdetailDao = new BdetailDao(con);

            // ��ѯ�Ƿ��и����ѽ��
            ResultSet resultSet = bdetailDao.list(con, borrowDetail);
            if (resultSet.next()) {
                JOptionPane.showMessageDialog(null, "�������ڽ�, ���Ȼ��ٽ�");
                return;
            }

            // ������ӽ��ļ�¼
            int result = bdetailDao.add(con, borrowDetail);
            if (result == 1) {
                JOptionPane.showMessageDialog(null, "����ɹ�");
                putDates(new BorrowDetail());
            } else {
                JOptionPane.showMessageDialog(null, "����ʧ��");
            }
        } catch (Exception e1) {
            e1.printStackTrace();
            JOptionPane.showMessageDialog(null, "�����쳣");
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
