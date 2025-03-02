<%--
  Created by IntelliJ IDEA.
  User: YELLOW
  Date: 2025/2/24
  Time: 21:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>2-5include动作标记</title>
</head>
<body>
<%
request.setCharacterEncoding("UTF-8");
%>
<jsp:include page="index4.0.jsp">
    <jsp:param name="username" value="张先生"/>
</jsp:include>
</body>
</html>
