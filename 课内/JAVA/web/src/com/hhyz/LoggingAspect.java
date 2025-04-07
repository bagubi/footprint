package com.hhyz;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
//������
@Aspect
public class LoggingAspect {

    @Before("execution(* com.hhyz.BusinessService.*(..))")
    public void beforeAdvice() {
        System.out.println("����ִ��ǰ");
    }

    @After("execution(* com.hhyz.BusinessService.*(..))")
    public void afterAdvice() {
        System.out.println("����ִ�к�");
    }
}