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

// 放大镜
/* 
    总容器：.main-left
    小盒子：.left-top
    遮罩层：mask
    大图盒子：big-img
*/
// $('.left-top').on('mouseenter',function(){
//     $('.big-img').css('display','block')
//     $('.mask').css('display','block')
// })
var smallBox = document.querySelector('.left-top');//小图盒子
var mask = document.querySelector('.mask');//遮罩层
var bigBox = document.querySelector('.big-img');//大图盒子
var bigImg = document.querySelector('.bigImg');//大图
var box = document.querySelector('.main-left');//总容器

smallBox.onmouseenter = function(){
    bigBox.style.display = "block";
    mask.style.display = "block";
}

smallBox.onmousemove = function(e){
    e = e||window.event;
    // 鼠标到small的距离
    var left = e.clientX+getScroll().left - box.offsetLeft;
    var top = e.clientY+getScroll().top - box.offsetTop;

    left = left - mask.offsetWidth/2
    top = top - mask.offsetHeight/2;

    // 边界监测
    if(left<0){
        left=0
    }
    if(left>smallBox.offsetWidth-mask.offsetWidth){
        left=smallBox.offsetWidth-mask.offsetWidth
    }
    if(top<0){
        top = 0;
    }
    if(top>smallBox.offsetHeight-mask.offsetHeight){
        top = smallBox.offsetHeight-mask.offsetHeight
    }
    
    // 定位mask
    mask.style.left = left + "px"
    mask.style.top = top + "px"

    var x = left/smallBox.offsetWidth*bigImg.offsetWidth;
    var y = top/smallBox.offsetHeight*bigImg.offsetHeight;

    bigImg.style.marginLeft = -x + "px"
    bigImg.style.marginTop = -y + "px"
}
// 鼠标移出smallBox，big隐藏，mask隐藏
smallBox.onmouseleave = function(){
    bigBox.style.display = "none";
    mask.style.display = "none";
}


// 划过小图，显示大图
$('.left-bottom').children('ul').children('li').on('mouseover', function () {
    $(this)
    .children('img')
    .css('borderColor','#e2231a')
    .parent()
    .siblings()
    .children('img')
    .css('borderColor','#fff')
    .parents('.main-left')
    .children('.left-top')
    .children('.small-img')
    .html($(this).html())
    .parents('.main-left')
    .children('.big-img')
    .children()
    .removeClass('bigImg')
    .css('display','none')
    .eq($(this).index())
    .addClass('bigImg')
    .css('display','block')
    // .parents('.main-left')
    // .children('.big-img')
    // .children('img').eq($(this).index)
    // .addClass('bigImg').css('display','block')
    // .siblings().removeClass('bigImg').css('display','none')
})

// 获取首页传入的图片，本地存储
var details = localStorage.getItem('img')
var imgId = localStorage.getItem('id')
var imgTitle = localStorage.getItem('title')
var imgPrice = localStorage.getItem('price')
var imgPrice = parseInt(imgPrice)

console.log(details)
console.log(imgId)
console.log(imgTitle)
console.log(imgPrice)


// 把小图的第一张和大图的第一张的url地址改成details
// 小图
$('.left-bottom').children('ul').children().eq(0).children('img').attr('src',details)
// 大图
$('.big-img').children('img').eq(0).attr('src',details)

$('.main-right>h1').html(imgId)
$('.main-right').children('.title').html(imgTitle)
$('.main-right').children('.price').children('span').html(imgPrice)

// 点击购买按钮
// 获取用户输入的商品数量
// 获取本页面的商品id
// 获取本页面的商品价格
// 获取本页面的商品名称
// 获取本页面的商品图片
$('button').click(async function () {
    var data = await $.ajax({
        url: "../php/interface/add.php",
        type: 'post',
        data: {
            id: $('h1').html(),
            name: $('.title').html(),
            price: $('.price>span').html(),
            num: $('input').val(),
            img: details
        },
        dataType: 'json'
    })
    console.log(data)
    if (data.code == 1) {
        alert('商品添加成功')
    }
})


// 获取数量
var num = $('input').val();
// 点击+，数量增加
$('.add').on('click', function () {
    num++
    $('input').val(num)
    if (num > 1) {
        $('.cut').html('-')
    }
})
$('.cut').on('click', function () {
    num--
    $('input').val(num);
    num--
    if (num <= 1) {
        num = 1
        $('input').val(num);
        $('.cut').html('')
    }
})

