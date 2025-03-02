<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.logging.Logger" %>
<%@ page import="java.util.logging.Level" %>
<html>
<head>
        <title>2-2</title>
</head>
<body>
<%
        Logger logger = Logger.getLogger("MyLogger");
        Integer countObj = (Integer) application.getAttribute("count");
        int count = (countObj != null) ? countObj : 0;
        count++;
        application.setAttribute("count", count);

        logger.log(Level.INFO, "Count: {0}", count);
        out.println("Count: " + count);
        out.println("Info: " + info());
%>
</body>
</html>

<%!
        // 定义成员变量和方法
        private String info() {
                return "hello";
        }
%>