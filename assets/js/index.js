$(function(){
    // 获取用户信息
    getUserInfo();
})

const layer = layui.layer;

const getUserInfo = ()=>{
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        success: (res) => {
            console.log(res);
            if (res.status !== 0) return layui.layer.msg("数据请求失败！") 
            layer.msg("数据请求成功！")
            // 渲染头像
            renderAvatar(res.data);
          
          
        },
    });
};

// 渲染头像函数
const renderAvatar = (uer)=>{
 const name = uer.nickname || uer.username;
//  欢迎文本
$("#welcome").html(`欢迎 ${name}`);
//  头像
if (uer.user_pic !== null) {
    $(".layui-nav-img").attr("src", uer.user_pic).show();
    $(".text-avatar").hide();
} else {
    $(".layui-nav-img").hide();
    const firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName).show();
  }
}