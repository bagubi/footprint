package com.quanhai.chat;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.quanhai.chat.mapper") // 指定Mapper接口所在包
public class ChatApplication {
    public static void main(String[] args){
        SpringApplication.run(ChatApplication.class, args);
    }
}

