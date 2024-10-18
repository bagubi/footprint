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
        JFrame frame = new JFrame("ͼ�����");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(600, 400);

        panel = new JPanel();
        panel.setLayout(null);
        frame.add(panel);

        // ��ʼ��UI���
        initializeUI();

        // ���ò��ֺ����

        frame.setVisible(true);
    }

    private void initializeUI() {
        // ʡ�Ծ��岼�ִ��룬������ԭ�����еĲ����߼�һ��

        addButton = new JButton("���");
        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                handleAddButton();
            }
        });
        addButton.setBounds(220, 22, 80, 25);
        panel.add(addButton);

        // �����Ѿ���ʼ����comboBoxType���������
    }

    private void handleAddButton() {
        // ��ȡ�û�����
        String name = textFieldName.getText();
        String author = textFieldAuthor.getText();
        String publisher = textFieldPublisher.getText();
        int stock = Integer.parseInt(textFieldStock.getText());
        BigDecimal price = new BigDecimal(textFieldPrice.getText()).setScale(2, BigDecimal.ROUND_DOWN);
        String desc = textFieldDesc.getText();
        BookType selectedType = (BookType) comboBoxType.getSelectedItem();

        // ����Ƿ�Ϊ��
        if (name.isEmpty() || author.isEmpty() || publisher.isEmpty() || stock == 0 || price.compareTo(BigDecimal.ZERO) <= 0 || desc.isEmpty()) {
            JOptionPane.showMessageDialog(null, "������������Ϣ");
            return;
        }

        // ģ������鼮����
        try {
            Book book = new Book(name, author, selectedType.getId(), stock, price, publisher, desc);
            int result = new BookDao().addBook(book);

            if (result > 0) {
                JOptionPane.showMessageDialog(null, "��ӳɹ�");
            } else {
                JOptionPane.showMessageDialog(null, "���ʧ��");
            }
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, "����쳣��" + ex.getMessage());
        }
    }

    // ʡ�Ծ��岼�ִ��룬��textField.setBounds��
}
