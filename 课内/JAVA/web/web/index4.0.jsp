<%--
  Created by IntelliJ IDEA.
  User: YELLOW
  Date: 2025/2/24
  Time: 21:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>

<html>
<head>
    <title>date页面</title>
</head>
<body>
<%
    String name = request.getParameter("username");
    out.println("你好," + name + "! 今天的日期是:");
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
    String string = sdf.format(date);
    out.println(string);
%>
</body>
</html>