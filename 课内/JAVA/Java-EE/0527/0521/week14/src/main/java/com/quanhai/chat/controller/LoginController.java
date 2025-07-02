package com.quanhai.chat.controller;
import com.quanhai.chat.service.UserService;
import com.quanhai.chat.entity.CustomerUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/user")
public class LoginController {
    @Autowired
    private UserService userService;

    // 登录页面
    @GetMapping("/toLogin")
    public String toLogin() {
        return "login";
    }

    @GetMapping("/toRegister")
    public String toRegister() {
        return "register";
    }
    @PostMapping("/register")
    public String register(CustomerUser customerUser, Model model) {
        customerUser.setRole("admin");
        int result = userService.register(customerUser);
        if(result == 1){
            model.addAttribute("successMsg","注册成功，请点击下方登录链接");
        }else{
            model.addAttribute("errorMsg","注册失败,用户名重复");
        }
        return "register"; // 注册后跳转登录页
    }
}