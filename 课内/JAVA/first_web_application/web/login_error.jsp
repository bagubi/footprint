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
    <title>登录错误</title>
</head>
<% String error = (String) session.getAttribute("error"); %>
<body>
    <h2>登录失败,失败原因：${error}</h2>
</body>
</html>
