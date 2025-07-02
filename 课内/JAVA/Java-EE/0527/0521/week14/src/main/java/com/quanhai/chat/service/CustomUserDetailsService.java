package com.quanhai.chat.service;

import com.quanhai.chat.entity.CustomerUser;
import com.quanhai.chat.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CustomerUser user = userMapper.selectUserByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException("用户名不存在");
        }
        if ("admin".equals(user.getRole())){
            return new User(user.getUsername(), user.getPassword(),  Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
        }
        if ("user".equals(user.getRole())){
            return new User(user.getUsername(), user.getPassword(),  Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        }
        return new User(user.getUsername(), user.getPassword(), Collections.emptyList());
    }
}
