package com.quanhai.chat.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        response.setStatus(javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED);
        String encodedErrorMessage = URLEncoder.encode(exception.getMessage(), "UTF-8");
        response.sendRedirect("/login?error=true&message="+encodedErrorMessage);
    }
}
