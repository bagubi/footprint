package com.quanhai.chat.controller;

import com.quanhai.chat.security.SecurityUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/login")
    public String home() {
        if (SecurityUtil.isUserAuthenticated()) {
            return "chat";
        } else {
            return "login";
        }
    }
}
