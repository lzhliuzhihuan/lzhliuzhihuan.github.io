<?php
    // 注册界面
    // 处理中文乱码
    header("content-type:text/html;charset=utf-8;");
    // 获取传递来的username和password
    $username = $_REQUEST['username'];
    $pw = $_REQUEST['password'];

    // 连接数据库
    $conn = mysqli_connect('127.0.0.1','root','root','shop');

    $sql = "SELECT * FROM `user` WHERE `account_num` = '$username'";

    // 执行sql语句
    // $sql = "INSERT INTO `user` (`account_num`,`password`) VALUES ('$username','$pw')";
    $res = mysqli_query($conn,$sql);

    // echo json_encode($res);
    // 解析查询结果
    $data = mysqli_fetch_assoc($res);
    // echo json_encode($data);
    if($data){
        // 用户名存在，不能注册
        $arr = array('code'=>0);
        echo json_encode($arr);
        // echo "注册成功";
    }
    if($data == null){
        // 账号不存在，可以注册
        $sql = "INSERT INTO `user` (`account_num`,`password`) VALUES ('$username','$pw')";
        $res = mysqli_query($conn,$sql);
        
        $arr = array('code'=>1);
        echo json_encode($arr);
        // header('location:./register.html');
    }
    // 断开连接
    mysqli_close($conn);

?>