// 登录验证，会话存储
// var usName = document.cookie;
var usName =localStorage.getItem('name');
var regist = document.querySelector('.regist')
if(usName){
    // console.log(usName)
    regist.innerHTML = usName;
    // $('regist').children('div').empty().appendTo(`
    // <li>
    //     <a href="#">${usName}</a><span>|</span>
    // </li>
    // `)
}
// 判断是否登录
if(!usName){
    window.onclick = function(){
        location.href = "./login.html"
    }
}

// 顶部列表，ajax渲染
$('.hov').on('mouseenter',async function(){
    $('.item-children-list').empty().show()
    .animate({
        height:230
    },300,'linear')
    var data = await $.ajax({
        url:"../js/mi.json",
        dataType:"json"
    })
    // $('.item-children').children('ul').html(``)
    data = data[$(this).index()-1]
    $.each(data,function(index,item){
        // $('.item-children-list').empty()
        $(`
        <li>
            <a href="#">
            <img src="${item.img}" alt="">
            <p class="title">${item.details}</p>
            <span class="price">${item.price}</span>
            </a>
        </li> 
        `).appendTo($('.item-children-list'))
    })
})
// 划过显示
$('.hov').on('mouseleave',function(){
    $('.item-children-list').hide()
})


// 轮播图，初始化Swiper
var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay:true,//可自动轮播

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable:true
    },
    
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
}) 

setInterval(showTime,1000)
// 倒计时
function showTime(){
    var time1 = new Date(2021,0,10);//过年时间
    var time2 = new Date().getTime();//当前时间
    // 时间差，换算成秒
    var differ = parseInt((time1 - time2)/1000);
    var day = parseInt(differ/(24*3600));//天
    

    differ = differ - 24*3600*day;
    var hours = parseInt(differ/3600)// 小时

    differ = differ - hours*3600;
    var minutes = parseInt(differ/60);//分钟

    var seconds = differ - minutes*60;//秒

    if(hours<10){
        $('.time').children('span').eq(0).html("0"+hours)
    }else{
        $('.time').children('span').eq(0).html(hours)
    }
    // 分钟
    if(minutes<10){
        $('.time').children('span').eq(1).html("0"+minutes)
    }else{
        $('.time').children('span').eq(1).html(minutes)
    }
    //秒
    if(seconds<10){
        $('.time').children('span').eq(2).html("0"+seconds)
    }else{
        $('.time').children('span').eq(2).html(seconds)
    }
}


// ban_list列表划过显示二级菜单
$('.ban_list').children('li').each(function(index,item){
    // 多少个ul
    var num = $(item).children('.ban_list_right').children().length
    // $(this).children('.ban_list_right').css({
    //     'widht':num*234
    // })
    $(item).on('mouseover',function(){
        $(this).children('.ban_list_right').css('width',num*234).show().parents('li').siblings().children('.ban_list_right').hide()
        
    })
})

// 选项卡
$('.select_card>ul>li').on('mouseover',function(){
    $(this).addClass('under_line').siblings().removeClass('under_line')
    .parents('.select_card')
    .next()
    .children('.elect_right')
    .hide().eq($(this).index()).show()
})
$('select_card').children('li')

// 页面右侧固定导航栏
// 点击div .to_top 回到顶部
$('.to_top').on('click',function(){
    if(document.documentElement.scrollTop){
        document.documentElement.scrollTop = 0
    }else{
        document.body.scrollTop = 0
    }
}) 
// 判断div top_top距离页面顶部的偏移量
window.onscroll = function(){
    var top = getScroll().top;
    if(top >= 890){
        $('.to_top').css('display','block')
    }if(top < 890){
        $('.to_top').css('display','none')
    }
}
// 封装一个方法用来获取页面滚动的距离
function getScroll(){
    if(window.pageYOffset){
        return {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else if(document.documentElement.scrollTop){
        return {
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }else{
        return {
            top:document.body.scrollTop,
            left:document.body.scrollLeft
        }
    }
}

// 给整个页面的img标签都绑定一个点击事件，点击进入详情页，图片的id，title,price一起带过去详情页
$('.page_main .container a').on('click',function(){
    console.log(this)
    localStorage.setItem('img',$(this).children('img').attr('src'))
    localStorage.setItem('id',$(this).children('img').attr('data-id'))
    localStorage.setItem('title',$(this).children('.title').html())
    localStorage.setItem('price',$(this).children('.price').html())

    // var details = localStorage.getItem('img')
    // var imgId = localStorage.getItem('id')
    // var imgTitle = localStorage.getItem('title')
    // var imgPrice = localStorage.getItem('price')
    // console.log(details)
    // console.log(imgId)
    // console.log(imgTitle)
    // console.log(imgPrice)
    location.href = "./details.html"
})