package com.quanhai.chat.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {
    @GetMapping("/chat")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")  //hasRole('ADMIN')
    public String chat() {
        return "chat";
    }
}


