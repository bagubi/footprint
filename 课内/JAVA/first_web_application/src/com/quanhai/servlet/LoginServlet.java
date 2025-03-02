package com.quanhai.servlet;

//import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class LoginServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("你好 泉海这是一个get请求");
        resp.sendRedirect("login.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("你好 泉海这是一个post请求");
        String userId = req.getParameter("userId");
        String password = req.getParameter("password");
        String Ag_password = req.getParameter("Ag_password");
        HttpSession session = req.getSession();

        if ("".equals(userId) || userId == null){
            session.setAttribute("error","用户名为空");
            resp.sendRedirect("login_error.jsp");
            return;
        }
        if ("".equals(password) || userId == null){
            session.setAttribute("error","密码为空");
            resp.sendRedirect("login_error.jsp");
            return;
        }
        if (!password.equals(Ag_password)){
            session.setAttribute("error","两次密码输入不一致");
            resp.sendRedirect("login_error.jsp");
            return;
        }

        session.setAttribute("userId",userId);
        resp.sendRedirect("login_success.jsp");
    }
}
