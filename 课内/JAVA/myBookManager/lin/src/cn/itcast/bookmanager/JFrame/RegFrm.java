package cn.itcast.bookmanager.JFrame;

import cn.itcast.bookmanager.dao.BdetailDao;
import cn.itcast.bookmanager.dao.UserDao;
import cn.itcast.bookmanager.model.User;
import cn.itcast.bookmanager.utils.DbUtil;
import cn.itcast.bookmanager.utils.ValidCode;
import cn.itcast.bookmanager.utils.toolUtil;
import com.mysql.jdbc.Connection;
import org.jb2011.lnf.beautyeye.BeautyEyeLNFHelper;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;

public class RegFrm extends JFrame {
    private JFrame jf;
    private JTextField textField;
    private JTextField textField_1;
    private JTextField textField_2;
    private JRadioButton rdbtnNewRadioButton;
    private JRadioButton rdbtnNewRadioButton_1;
    private JLabel usernameMes;
    private JLabel passwordMes;
    private JLabel phoneMes;
    private JLabel label_4;
    private JTextField textField_3;
    private JButton button;
    private JButton button_1;
    private ValidCode vcode;
    private DbUtil dbUtil;
    private BdetailDao bdetailDao;

    public RegFrm() {
        initializeUI();
    }

    private void initializeUI() {
        jf = new JFrame("�û�ע��");
        jf.setBounds(600, 250, 510, 410);
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jf.getContentPane().setLayout(null);

        JLabel label = new JLabel("�û�����");
        label.setFont(new Font("��Բ", Font.BOLD, 16));
        label.setBounds(110, 65, 75, 40);
        jf.getContentPane().add(label);

        textField = new JTextField();
        textField.setFont(new Font("��Բ", Font.BOLD, 14));
        textField.setBounds(198, 71, 164, 30);
        jf.getContentPane().add(textField);

        textField.addFocusListener(new FocusListener() {
            @Override
            public void focusGained(FocusEvent e) {}

            @Override
            public void focusLost(FocusEvent e) {
                String text = textField.getText();
                if (toolUtil.isEmpty(text)) {
                    usernameMes.setText("�û�������Ϊ��");
                    usernameMes.setForeground(Color.RED);
                } else {
                    usernameMes.setText("��");
                    usernameMes.setForeground(Color.GREEN);
                }
            }
        });

        JLabel label_1 = new JLabel("���룺");
        label_1.setFont(new Font("��Բ", Font.BOLD, 16));
        label_1.setBounds(120, 108, 65, 40);
        jf.getContentPane().add(label_1);

        textField_1 = new JTextField();
        textField_1.setFont(new Font("Dialog", Font.BOLD, 14));
        textField_1.setBounds(198, 114, 164, 30);
        jf.getContentPane().add(textField_1);

        textField_1.addFocusListener(new FocusListener() {
            @Override
            public void focusLost(FocusEvent e) {
                String pwd = textField_1.getText();
                if (toolUtil.isEmpty(pwd)) {
                    passwordMes.setText("���벻��Ϊ��");
                    passwordMes.setForeground(Color.RED);
                } else {
                    boolean flag = pwd.matches("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$");
                    if (flag) {
                        passwordMes.setText("��");
                        passwordMes.setForeground(Color.GREEN);
                    } else {
                        JOptionPane.showMessageDialog(null, "������Ϊ6-16λ���ֺ���ĸ�����");
                        passwordMes.setText("");
                    }
                }
            }

            @Override
            public void focusGained(FocusEvent e) {}
        });

        JLabel label_2 = new JLabel("�ֻ��ţ�");
        label_2.setFont(new Font("��Բ", Font.BOLD, 16));
        label_2.setBounds(110, 150, 75, 40);
        jf.getContentPane().add(label_2);

        textField_2 = new JTextField();
        textField_2.setFont(new Font("Dialog", Font.BOLD, 14));
        textField_2.setBounds(198, 156, 164, 30);
        jf.getContentPane().add(textField_2);

        textField_2.addFocusListener(new FocusListener() {
            @Override
            public void focusLost(FocusEvent e) {
                String phone = textField_2.getText();
                if (toolUtil.isEmpty(phone)) {
                    phoneMes.setText("�ֻ��Ų���Ϊ��");
                    phoneMes.setForeground(Color.RED);
                } else {
                    boolean flag = phone.matches("^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$");
                    if (flag) {
                        phoneMes.setText("��");
                        phoneMes.setForeground(Color.GREEN);
                    } else {
                        JOptionPane.showMessageDialog(null, "��������ȷ���ֻ��Ÿ�ʽ");
                        phoneMes.setText("");
                    }
                }
            }

            @Override
            public void focusGained(FocusEvent e) {}
        });

        JLabel label_3 = new JLabel("�Ա�");
        label_3.setFont(new Font("��Բ", Font.BOLD, 16));
        label_3.setBounds(123, 184, 65, 40);
        jf.getContentPane().add(label_3);

        rdbtnNewRadioButton = new JRadioButton("��");
        rdbtnNewRadioButton.setFont(new Font("��Բ", Font.BOLD, 16));
        rdbtnNewRadioButton.setBounds(198, 192, 58, 23);
        jf.getContentPane().add(rdbtnNewRadioButton);

        rdbtnNewRadioButton_1 = new JRadioButton("Ů");
        rdbtnNewRadioButton_1.setFont(new Font("��Բ", Font.BOLD, 16));
        rdbtnNewRadioButton_1.setBounds(287, 192, 65, 23);
        jf.getContentPane().add(rdbtnNewRadioButton_1);

        ButtonGroup bg = new ButtonGroup();
        bg.add(rdbtnNewRadioButton);
        bg.add(rdbtnNewRadioButton_1);

        usernameMes = new JLabel("");
        usernameMes.setFont(new Font("Dialog", Font.BOLD, 15));
        usernameMes.setBounds(372, 57, 122, 27);
        jf.getContentPane().add(usernameMes);

        passwordMes = new JLabel("");
        passwordMes.setFont(new Font("Dialog", Font.BOLD, 15));
        passwordMes.setBounds(372, 100, 122, 27);
        jf.getContentPane().add(passwordMes);

        phoneMes = new JLabel("");
        phoneMes.setFont(new Font("Dialog", Font.BOLD, 15));
        phoneMes.setBounds(372, 142, 122, 30);
        jf.getContentPane().add(phoneMes);

        vcode = new ValidCode();
        vcode.setLocation(293, 231);
        jf.getContentPane().add(vcode);

        label_4 = new JLabel("��֤�룺");
        label_4.setFont(new Font("��Բ", Font.BOLD, 16));
        label_4.setBounds(110, 231, 75, 40);
        jf.getContentPane().add(label_4);

        textField_3 = new JTextField();
        textField_3.setBounds(198, 241, 83, 30);
        jf.getContentPane().add(textField_3);

        button = new JButton("ע��");
        button.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String code = textField_3.getText();
                if (toolUtil.isEmpty(code)) {
                    JOptionPane.showMessageDialog(null, "��������֤��");
                } else {
                    if (code.equalsIgnoreCase(vcode.getCode())) {
                        RegCheck(e);
                    } else {
                        JOptionPane.showMessageDialog(null, "��֤���������������");
                    }
                }
            }
        });
        button.setFont(new Font("��Բ", Font.BOLD, 15));
        button.setBounds(120, 299, 75, 30);
        jf.getContentPane().add(button);

        button_1 = new JButton("ǰ����¼ҳ��");
        button_1.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                jf.setVisible(false);
                new LoginFrm();
            }
        });
        button_1.setFont(new Font("��Բ", Font.BOLD, 15));
        button_1.setBounds(245, 299, 132, 30);
        jf.getContentPane().add(button_1);

        JLabel lblNewLabel_1 = new JLabel("�û�ע��");
        lblNewLabel_1.setFont(new Font("Dialog", Font.BOLD, 22));
        lblNewLabel_1.setBounds(184, 10, 122, 51);
        jf.getContentPane().add(lblNewLabel_1);

        JLabel lblNewLabel = new JLabel("");
        lblNewLabel.setIcon(new ImageIcon(RegFrm.class.getResource("/tupian/regBG.png")));
        lblNewLabel.setBounds(0, 0, 494, 372);
        jf.getContentPane().add(lblNewLabel);

        jf.setVisible(true);
        jf.setResizable(true);
    }

    protected void RegCheck(ActionEvent e) {
        UserDao userDao = new UserDao();
        String username = textField.getText();
        String password = textField_1.getText();
        String phone = textField_2.getText();
        String sex = "";
        if (rdbtnNewRadioButton.isSelected()) {
            sex = rdbtnNewRadioButton.getText();
        } else {
            sex = rdbtnNewRadioButton_1.getText();
        }
        if (toolUtil.isEmpty(username) || toolUtil.isEmpty(password) || toolUtil.isEmpty(phone)) {
            JOptionPane.showMessageDialog(null, "�����������Ϣ");
            return;
        }
        User user = new User();
        user.setUserName(username);
        user.setPassword(password);
        user.setSex(sex);
        user.setPhone(phone);
        user.setRole(1);
        Connection con = null;
        try {
            con = (Connection) dbUtil.getConnection();
            int i = userDao.addUser(con, user);
            if (i == 2) {
                JOptionPane.showMessageDialog(null, "���û����Ѵ���,������ע��");
            } else if (i == 0) {
                JOptionPane.showMessageDialog(null, "ע��ʧ��");
            } else {
                JOptionPane.showMessageDialog(null, "ע��ɹ�");
                jf.dispose();
                new LoginFrm();
            }
        } catch (Exception e1) {
            e1.printStackTrace();
        } finally {
            try {
                dbUtil.closeCon(con);
            } catch (Exception e1) {
                e1.printStackTrace();
            }
        }

    }

    public static void main(String[] args) {
        try {
            BeautyEyeLNFHelper.frameBorderStyle = BeautyEyeLNFHelper.FrameBorderStyle.generalNoTranslucencyShadow;
            BeautyEyeLNFHelper.launchBeautyEyeLNF();
        } catch (Exception e) {
            e.printStackTrace();
        }
        //new RegFrm();
    }
}




