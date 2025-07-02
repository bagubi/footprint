package com.quanhai.chat.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomAuthenticationFailureHandler customAuthenticationFailureHandler;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/login", "/user/toRegister","/user/register", "/user/toLogin", "/css/**", "/js/**", "/images/**").permitAll() // 允许匿名访问的页面
                .anyRequest().authenticated() // 其他页面需要登录才能访问
                .and().formLogin().loginPage("/login") // 自定义登录页面
                .defaultSuccessUrl("/chat").failureUrl("/login")
                .failureHandler(customAuthenticationFailureHandler)
                .permitAll().and().logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout") // 注销成功后跳转地址
                .deleteCookies("JSESSIONID") // 删除会话Cookie
                .invalidateHttpSession(true)  // 使Session失效
                .permitAll();
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(new CustomAuthenticationProvider(userDetailsService));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return new LogoutOnAccessDeniedHandler();
    }
}

