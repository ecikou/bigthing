$(function () {
    // 点击去注册账号让 登录框隐藏，注册框显示
    $("#link_reg").click(() => {
      $(".login-box").hide();
      $(".reg-box").show();
    });
    // 点击去登录让 注册框隐藏，登录框显示
    $("#link_login").click(() => {
      $(".login-box").show();
      $(".reg-box").hide();
    });


//   获取form
const form =layui.form;

form.verify({
    // 定义校验密码的规则
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    // 定义校验确认密码的规则
    repwd:(val)=>{
        // 获取密码
        const pwd =$(".reg-box [name=password]").val();
        if(val !== pwd) return "两次密码不一致";
        
    }

})

// 监听注册表单，发送注册请求
 // 设置请求根路径
const baseUrl = "http://www.liulongbin.top:3007"

 // 获取 layui 弹窗
const layer = layui.layer;
 $("#form_reg").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url:"/api/reguser",
        data: {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val(),
        },
        success: (res) => {
            if (res.status !== 0) return layer.msg('注册失败');
            layer.msg("注册成功！");
            // 注册成功后跳转到登录界面
            $("#link_login").click();
        },
    });
  });

// 监听登录表单，发送登录请求
 $("#form_login").on("submit", function (e){
    e.preventDefault();
    
    $.ajax({
        type: "POST",
        url:"/api/login",
        data: $(this).serialize(),        
        success: (res) => {
            console.log(res);          
            if (res.status !== 0) return layer.msg('登录失败');
            layer.msg("登录成功！");
            // 把用户信息存储到本地
            localStorage.setItem("token", res.token);
            // 登录成功后跳转到首页
            location.href = "./index.html";
       
        }
    })
  })

}); 
