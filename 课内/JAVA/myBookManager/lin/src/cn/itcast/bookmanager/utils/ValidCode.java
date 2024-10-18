package cn.itcast.bookmanager.utils;

import javax.swing.*;
import java.awt.*;
import java.util.Random;

public class ValidCode extends JPanel {

    private String code;

    public ValidCode() {
        generateCode();
    }

    private void generateCode() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            sb.append(random.nextInt(10)); // Generates a random digit
        }
        code = sb.toString();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.setColor(Color.BLACK);
        g.setFont(new Font("Arial", Font.BOLD, 20));
        g.drawString(code, 10, 25);
    }

    public String getCode() {
        return code;
    }
}
