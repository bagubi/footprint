package cn.itcast.bookmanager.JFrame;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
public class AdminBookEdit extends JFrame {
    private JPanel panel_1;
    private String[] title = {"编号", "书名", "类别", "作者", "价格", "库存", "状态"};
    private String[][] dates = {};
    private DefaultTableModel model = new DefaultTableModel(dates, title);
    private JTable table = new JTable(model);
    private JPanel panel_2;
    private JTextField textField_1, textField_2, textField_3, textField_4, textField_5, textField_6, textField_7;
    private JComboBox comboBox_1, comboBox_2;
    private JButton btnNewButton_1;

    public AdminBookEdit() {
        initializeUI();
    }

    private void initializeUI() {
        setTitle("Admin Book Edit");
        setSize(600, 600);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        panel_1 = new JPanel();
        panel_1.setLayout(new BorderLayout());
        panel_1.setBorder(BorderFactory.createTitledBorder(UIManager.getBorder("TitledBorder.border"), "\u4E66\u7C4D\u4FE1\u606F"));
        panel_1.setBounds(20, 105, 541, 195);

        JScrollPane jscrollpane = new JScrollPane(table);
        jscrollpane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
        panel_1.add(jscrollpane, BorderLayout.CENTER);

        getContentPane().add(panel_1, BorderLayout.WEST);

        panel_2 = new JPanel();
        panel_2.setLayout(null);
        panel_2.setBounds(20, 310, 541, 292);
        getContentPane().add(panel_2, BorderLayout.EAST);

        addComponentsToPanel2(panel_2);

        pack();
        setVisible(true);
    }

    private void addComponentsToPanel2(JPanel panel) {
        JLabel label;
        JTextField textField;
        JComboBox comboBox;

        label = createLabeledComponent("编号：", textField_1 = new JTextField(10), 58, 10);
        panel.add(label);

        label = createLabeledComponent("书名：", textField_2 = new JTextField(10), 294, 10);
        panel.add(label);

        // ... 继续添加其他标签和文本框，使用createLabeledComponent方法以减少重复代码

        label = createLabeledComponent("作者：", textField_3 = new JTextField(10), 58, 58);
        panel.add(label);

        label = createLabeledComponent("价格：", textField_4 = new JTextField(10), 58, 104);
        panel.add(label);

        label = createLabeledComponent("出版：", textField_5 = new JTextField(10), 294, 58);
        panel.add(label);

        comboBox_1 = new JComboBox(); // 初始化并添加类别选项
        comboBox_1.setBounds(102, 190, 128, 26);
        panel.add(comboBox_1);

        label = createLabeledComponent("库存：", textField_6 = new JTextField(10), 294, 104);
        panel.add(label);

        label = createLabeledComponent("描述：", textField_7 = new JTextField(10), 58, 152);
        panel.add(label);

        comboBox_2 = new JComboBox();
        comboBox_2.addItem("上架");
        comboBox_2.addItem("下架");
        comboBox_2.setBounds(338, 191, 128, 26);
        panel.add(comboBox_2);

        btnNewButton_1 = new JButton("修改");
        btnNewButton_1.setBounds(220, 245, 89, 23);
        btnNewButton_1.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // 实现修改按钮的逻辑
                System.out.println("修改按钮被点击");
            }
        });
        panel.add(btnNewButton_1);
    }

    private JLabel createLabeledComponent(String labelText, JTextField textField, int x, int y) {
        JLabel label = new JLabel(labelText);
        label.setFont(new Font("幼圆", Font.BOLD, 14));
        label.setBounds(x, y, 45, 27);
        textField.setBounds(x + 53, y, 129, 27);
        panel_2.add(textField);
        return label;
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new AdminBookEdit());
    }
}