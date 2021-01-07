<?php
    // 处理中文乱码
    header("content-type:text/html;charset=utf-8;");
    
    $username = $_POST['username'];
    $password = $_POST['password'];

    // 2.把用户名和密码在数据库里查询。。。
    $conn = mysqli_connect('127.0.0.1','root','root','shop');

    // 2.执行SQL语句
    $sql = "SELECT * FROM `user` WHERE `account_num` = '$username' AND `password` = '$password'"; 
    $res = mysqli_query($conn,$sql);

    // 3.解析查询结果
    // $data = mysqli_fetch_all($res,MYSQLI_ASSOC);
    // $data = mysqli_fetch_assoc($res);
    $data = mysqli_fetch_assoc($res);
    // print_r($data);js会接收到php传递的所有数据
    if($data){
        $data = array('code'=>1);
        echo json_encode($data);
    }else{
        $data = array('code'=>0);
        echo json_encode($data);
    }
    // 断开连接
    mysqli_close($conn);

    // 3.把查询成功的信息发送给前端
    // $data = array('code'=>1);
    // echo json_encode($data);

    // 当登录成功以后，给浏览器写入cookie
    // setCookie('un',$username,time()+3600);
?>