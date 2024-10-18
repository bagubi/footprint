package cn.itcast.bookmanager.JFrame;

import cn.itcast.bookmanager.dao.UserDao;
import cn.itcast.bookmanager.model.User;
import cn.itcast.bookmanager.utils.DbUtil;
import cn.itcast.bookmanager.utils.toolUtil;
import java.awt.Component;
import java.awt.Font;
import java.awt.LayoutManager;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPasswordField;
import javax.swing.JTextField;

public class LoginFrm extends JFrame {
    public static User currentUser;
    private JFrame jf = new JFrame("图书管理");
    private JTextField userNameText;
    private JTextField passwordText;
    private JComboBox<String> comboBox;

    public LoginFrm() {
        this.jf.getContentPane().setFont(new Font("幼圆", 1, 14));
        this.jf.setBounds(600, 250, 500, 467);
        this.jf.setDefaultCloseOperation(3);
        this.jf.getContentPane().setLayout((LayoutManager)null);
        JLabel lblNewLabel = new JLabel(new ImageIcon("D:\\足迹\\footprint\\课内\\JAVA\\myBookManager\\lin\\tupian\\bg2.png"));
        lblNewLabel.setBounds(24, 10, 430, 218);
        this.jf.getContentPane().add(lblNewLabel);
        JLabel label = new JLabel("用户名：");
        label.setFont(new Font("幼圆", 1, 14));
        label.setBounds(129, 250, 60, 29);
        this.jf.getContentPane().add(label);
        this.userNameText = new JTextField();
        this.userNameText.setBounds(199, 252, 127, 25);
        this.jf.getContentPane().add(this.userNameText);
        this.userNameText.setColumns(10);
        JLabel label_1 = new JLabel("密码：");
        label_1.setFont(new Font("幼圆", 1, 14));
        label_1.setBounds(144, 289, 45, 29);
        this.jf.getContentPane().add(label_1);
        this.passwordText = new JPasswordField();
        this.passwordText.setColumns(10);
        this.passwordText.setBounds(199, 291, 127, 25);
        this.jf.getContentPane().add(this.passwordText);
        JLabel label_2 = new JLabel("权限：");
        label_2.setFont(new Font("幼圆", 1, 14));
        label_2.setBounds(144, 328, 45, 29);
        this.jf.getContentPane().add(label_2);
        this.comboBox = new JComboBox();
        this.comboBox.setBounds(199, 332, 127, 25);
        this.comboBox.addItem("用户");
        this.comboBox.addItem("管理员");
        this.jf.getContentPane().add(this.comboBox);
        JButton button = new JButton("登录");
        button.setBounds(153, 377, 65, 29);
        JButton button1 = new JButton("注册");
        button1.setBounds(153, 377, 65, 29);
        this.jf.getContentPane().add(button);
        button.addActionListener(new ActionListener() {
            UserDao userDao = new UserDao();
            DbUtil dbutil = new DbUtil();

            public void actionPerformed(ActionEvent e) {
                this.checkLogin(e);
            }

            protected void checkLogin(ActionEvent e) {
                String userName = LoginFrm.this.userNameText.getText();
                String password = LoginFrm.this.passwordText.getText();
                int index = LoginFrm.this.comboBox.getSelectedIndex();
                if (!toolUtil.isEmpty(userName) && !toolUtil.isEmpty(password)) {
                    User user = new User();
                    user.setUserName(userName);
                    user.setPassword(password);
                    if (index == 0) {
                        user.setRole(1);
                    } else {
                        user.setRole(2);
                    }

                    Connection con = null;

                    try {
                        con = DbUtil.getConnection();
                        User login = this.userDao.login(con, user);
                        LoginFrm.currentUser = login;
                        if (login == null) {
                            JOptionPane.showMessageDialog((Component)null, "登录失败");
                        } else if (index == 0) {
                            LoginFrm.this.jf.dispose();
                            new UserMenuFrm();
                        } else {
                            LoginFrm.this.jf.dispose();
                            new AdminMenuFrm();
                        }
                    } catch (Exception var16) {
                        var16.printStackTrace();
                        JOptionPane.showMessageDialog((Component)null, "登录异常");
                    } finally {
                        try {
                            this.dbutil.closeCon(con);
                        } catch (Exception var15) {
                            var15.printStackTrace();
                        }

                    }

                } else {
                    JOptionPane.showMessageDialog((Component)null, "用户名和密码不能为空");
                }
            }
        });
        this.jf.setVisible(true);
    }

    public static void main(String[] args) {
        new LoginFrm();
    }
}
