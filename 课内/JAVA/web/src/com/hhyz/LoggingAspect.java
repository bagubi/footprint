package com.hhyz;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
//切面类
@Aspect
public class LoggingAspect {

    @Before("execution(* com.hhyz.BusinessService.*(..))")
    public void beforeAdvice() {
        System.out.println("方法执行前");
    }

    @After("execution(* com.hhyz.BusinessService.*(..))")
    public void afterAdvice() {
        System.out.println("方法执行后");
    }
}