package com.hhyz;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
//≤‚ ‘¿‡
public class AopTest {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");
        BusinessService businessService = (BusinessService) context.getBean("businessService");
        businessService.doSomething();
    }
}
