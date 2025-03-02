<%--
  Created by IntelliJ IDEA.
  User: 40544
  Date: 2025/2/21
  Time: 14:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

<style>
    .navication{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr ;
        font-size: 26px;

    }
    .navication a{
        text-decoration: none;
    }
    #xueyuan:hover{
        color: aqua;
        cursor: pointer;
    }
    #zhuanye:hover{
        color: aqua;
        cursor: pointer;
    }
    #login:hover{
        color: aqua;
        cursor: pointer;
    }
</style>
<head>
    <title>首页</title>
</head>
<body>
    <div class="navication">
        <span><a id="xueyuan">学院介绍</a></span>
        <span><a id="zhuanye">专业介绍</a></span>
        <span><a href="login" id="login">一站式系统登录</a></span>
    </div>

</body>
</html>
