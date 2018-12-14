//alert(md5("王慧霞"));
// q 请求翻译的语言序列
// from 翻译源语言
// to 译文语言
// appid是你申请的百度翻译测试账号（注册后秒发）
// salt是一个随机数，这里用事件表示
// sign是对拼接的字符串的MD5加密，至于拼接的字符串其实就是： 待加密字符串 = appid+q+salt+秘钥（申请账号时密码也会给你） 最后把 待价密 的字符串传入MD5函数，返回sign.
//完整请求为：http://api.fanyi.baidu.com/api/trans/vip/translate?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4
(function () {
    var flag=true;
    var lang= document.querySelector(".left .title .lang");
    var langshow=document.getElementById("ul1");
    var text=document.getElementsByClassName("text")[0];
    var transSubmit=document.getElementsByClassName("trans")[0];
    var clear=document.getElementsByClassName("reset")[0];
       console.log(langshow);

        function init() {
            /*点击要翻译的语言种类，底下出现不同语言种类*/
            lang.onclick=function () {
            if(flag){
                langshow.style.display="none";
                flag=false;
            }else{
                langshow.style.display="block";
                flag=true;
            }
        }
            /*点击要ul li翻译的语言种类，翻译框字应该替换为点击的这一语言*/
            //运用事件委托，查找事件源
            langshow.onclick=function () {
                var e=e||window.event;
                if(e.target.tagName=="LI"){
                  lang.innerHTML=e.target.innerHTML;
                  var dataLang=e.target.getAttribute("data-lang");
                    lang.setAttribute("data-lang",dataLang);
                    langshow.style.display="none";
                    flag=false;
                }
            };
            /*清除所写的内容*/
            clear.onclick=function () {
                text.innerHTML="";
            };

         transSubmit.onclick=function () {
             var val = document.getElementsByClassName("text")[0].value;
             console.log(val);
             if(val){
             translate();} else {
                 alert("请输入翻译内容");
             }
         }
    }
    init();
    /*构造跨域请求   动态生成js*/
    function  createScript(src) {
        var script = document.createElement('script');
        script.id ="script1";
        script.src = src;
        document.body.appendChild(script);
    }
    /*点击翻译，提交请求*/
    //完整请求为：http://api.fanyi.baidu.com/api/trans/vip/translate?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4

    //3725f358ad96349978f81109125c4082
    function  translate() {
        var htop = "http://api.fanyi.baidu.com/api/trans/vip/translate?";
        var val = document.getElementsByClassName("text")[0].value;
console.log(val);
        var date = Date.now();
        var tol=document.getElementsByClassName("lang")[0].getAttribute("data-lang");
        console.log(tol);
       //appid+q+salt+密钥 的MD5值
       var str="20181201000241926"+val+date+"74KdsV0Xo1n0CFalMtdL";
    //   var strResult = encodeURI(str);
        var salt0=md5(str);
       console.log(salt0);
       var bot="q="+val+"&from=en&to="+tol+"&appid=20181201000241926"+"&salt="+date+"&sign"+salt0;

       var src=htop+bot;
    //   var src1=encodeURI(src);
        console.log(src);
        //http://api.fanyi.baidu.com/api/trans/vip/translate?q=&from=en&to=null&appid=20181201000241930&salt=1543671787719&signe83d9cd5fa63a46f1740c6c3582392e7
        createScript(src);
    }
    })();