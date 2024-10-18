package cn.itcast.bookmanager.JFrame;

import cn.itcast.bookmanager.dao.BookDao;
import cn.itcast.bookmanager.model.Book;
import cn.itcast.bookmanager.model.BookType;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.math.BigDecimal;

public class AdminBookAdd {
    private JTextField textFieldName, textFieldAuthor, textFieldPublisher, textFieldStock, textFieldPrice, textFieldDesc;
    private JComboBox<BookType> comboBoxType;
    private JButton addButton;
    private JPanel panel;

    public void initAndDisplay() {
        JFrame frame = new JFrame("图书添加");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(600, 400);

        panel = new JPanel();
        panel.setLayout(null);
        frame.add(panel);

        // 初始化UI组件
        initializeUI();

        // 设置布局和组件

        frame.setVisible(true);
    }

    private void initializeUI() {
        // 省略具体布局代码，保持与原问题中的布局逻辑一致

        addButton = new JButton("添加");
        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                handleAddButton();
            }
        });
        addButton.setBounds(220, 22, 80, 25);
        panel.add(addButton);

        // 假设已经初始化了comboBoxType和其他组件
    }

    private void handleAddButton() {
        // 获取用户输入
        String name = textFieldName.getText();
        String author = textFieldAuthor.getText();
        String publisher = textFieldPublisher.getText();
        int stock = Integer.parseInt(textFieldStock.getText());
        BigDecimal price = new BigDecimal(textFieldPrice.getText()).setScale(2, BigDecimal.ROUND_DOWN);
        String desc = textFieldDesc.getText();
        BookType selectedType = (BookType) comboBoxType.getSelectedItem();

        // 检查是否为空
        if (name.isEmpty() || author.isEmpty() || publisher.isEmpty() || stock == 0 || price.compareTo(BigDecimal.ZERO) <= 0 || desc.isEmpty()) {
            JOptionPane.showMessageDialog(null, "请输入完整信息");
            return;
        }

        // 模拟添加书籍操作
        try {
            Book book = new Book(name, author, selectedType.getId(), stock, price, publisher, desc);
            int result = new BookDao().addBook(book);

            if (result > 0) {
                JOptionPane.showMessageDialog(null, "添加成功");
            } else {
                JOptionPane.showMessageDialog(null, "添加失败");
            }
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, "添加异常：" + ex.getMessage());
        }
    }

    // 省略具体布局代码，如textField.setBounds等
}
