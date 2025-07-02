package com.quanhai.chat.service;

import com.quanhai.chat.entity.CustomerUser;
import com.quanhai.chat.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public int register(CustomerUser customerUser) {
        CustomerUser isExistUser =  userMapper.selectUserByUserName(customerUser.getUsername());
        if (isExistUser != null){
            return 0;
        }
        return userMapper.register(customerUser);
    }
}

