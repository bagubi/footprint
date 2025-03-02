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
    <title>登录</title>
</head>
<style>
    .login_container{
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-rows: repeat(5,1fr) ;
    }
    .login_container div{
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-top: 5px;
    }

    .login_container button{
        width: 60%;
        border-radius: 5px;
    }
</style>

<body>
    <div class="login_container">
        <h2>欢迎来到泉海办公大厅</h2>
        <form method="post" action="login">
            <div><label for="userId">用户名：</label><input type="text" name="userId" id="userId"></div>
            <div><label for="password">密码：</label><input type="password" name="password" id="password"></div>
            <div><label for="Ag_password">重复密码：</label><input type="password" name="Ag_password" id="Ag_password"></div>
            <div><button type="submit">登录</button><button type="reset">重置</button></div>
        </form>

    </div>

</body>
</html>
