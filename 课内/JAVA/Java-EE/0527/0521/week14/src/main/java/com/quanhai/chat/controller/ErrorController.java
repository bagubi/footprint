package com.quanhai.chat.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class ErrorController {
    @GetMapping("/access-denied")
    public String accessDenied() {
        return "error/403"; // 对应你的模板路径
    }
}
