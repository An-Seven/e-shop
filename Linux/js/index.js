//轮播图
    var myswiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });

;(function(){
	class Person{
		constructor(){
			this.person = $("#person");
			this.shop = $("#shop");
			this.init();
		}
		init(){
			this.person.click(function(){
				location.href="login.html";
			})
			this.shop.click(function(){
				location.href = "shopCart.html"
			})
		}
	}
	new Person();
})();

//热门商品
;(function(){
	class Hot{
		constructor(){
			this.url = "http://localhost/Linux/data/index.php";
			this.right = $(".h-right");
			this.left = $(".h-left");
			this.shop = document.querySelector(".hot-shop");
			this.load();
			this.addEvent();
			this.hot = $(".hot-shop")
		}
		addEvent(){
			var that = this
			this.left.on("click",function(){
				that.leftbtn();
			})
			this.right.on("click",function(){
				that.rightbtn();
			})
		}
		
		leftbtn(){
//			for(var i = 0 ;i<this.res.length;i++){
//				if(let a=0;a=this.res.length / 4 ==0){
//					
//				}
//			}
			this.hot.css({left:"0px"});
		}
		rightbtn(){
			this.hot.css({left:"-1100px"})
		}
		load(){
			let that = this;
			ajaxGet(this.url).then(function(res){
				that.res = JSON.parse(res);
				that.display();
				that.rightbtn();
				})
			}
		display(){
			var str ="";
			for(var i =0 ;i<this.res.length;i++){
				str +=`<li><a href="detail.html">
						<div class="img">
						<img class="pic" src="${this.res[i].src}"/>
						</div>
						<h5>${this.res[i].name}</h5>
						<h6>${this.res[i].describe}</h6>
						<p><span></span></p>
						<i>￥</i>
						<b>${this.res[i].price}</b>
					</a></li>`
			};
			this.shop.innerHTML =str;
		}
		}
	new Hot();
})();

//搜索
function Search(options){
        this.url = options.url;
        this.ul = options.ul;
        this.txt = options.txt;
        this.addEvent()
    }
    Search.prototype.addEvent = function(){
        var that = this;
        this.txt.onkeyup = function(){
            that.value = this.value
            that.load()
        }
    }
    Search.prototype.load = function(){
        var that = this;
        jsonp(this.url,function(res){
            that.res = res.s;
            that.display()
        },{
            column:"cb",
            cb:"jagdsau",
            wd:this.value
        })
    }
    Search.prototype.display = function(){
        var str = "";
        for(var i=0;i<this.res.length;i++){
            str += `<li>${this.res[i]}</li>`
        } 
        this.ul.innerHTML = str;
    }
    new Search({
        url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
         ul:document.getElementsByClassName("search-res")[0],
         txt:document.getElementById("search").children[0]
    })

;
//三级
		$(".first li").mouseover(function(){
		$(this).find(".second").css({"display":"block"});
		});
		
		$(".first li").mouseout(function(){
			$(this).find(".second").css({"display":"none"});
		});
		
		$(".second li").mouseover(function(){
			$(this).find(".third").css({"display":"block"});
		});
		
		$(".second li").mouseout(function(){
			$(this).find(".third").css({"display":"none"});
		});