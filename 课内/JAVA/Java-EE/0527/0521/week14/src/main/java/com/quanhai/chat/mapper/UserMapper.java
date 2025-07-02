package com.quanhai.chat.mapper;

import com.quanhai.chat.entity.CustomerUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    CustomerUser selectUserByUserName(String userName);
    int register(CustomerUser user);
}

