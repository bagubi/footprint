<%--
  Created by IntelliJ IDEA.
  User: 40544
  Date: 2025/2/21
  Time: 14:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录成功</title>
</head>
<%
    String userId = (String) session.getAttribute("userId");
%>
<body>
    <h2>登录成功：您好：
        ${userId}
    </h2>
</body>
</html>
