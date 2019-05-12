
//图片展示
;(function(){
	
class Tabpic{
	constructor(){
		this.ali = document.querySelectorAll(".list li");
		this.p = document.querySelectorAll(".display p ");
		this.index = 0 ;
		this.init();
	}
	init(){
		var that= this;
		for(var i =0;i<this.ali.length;i++){
			this.ali[i].num=i;
			this.ali[i].onclick=function(){
				that.changeIndex(this);
				console.log(this)

			}
		}
	}
	changeIndex(ele){
		this.index=ele.num;
		this.hide();
	}
	hide(){
		for(var i =0 ;i<this.ali.length;i++){
			this.ali[i].className="";
			this.p[i].style.display = "none";
		}
		this.show();
	}
	show(){
		this.ali[this.index].className = "on";
		this.p[this.index].style.display = "block";
	}
}
new Tabpic();
})();


//定位
;(function(){
			$(window).scroll(function(){
				var fixTop =document.querySelector(".fix-bar").offsetTop;
				var srcollTop = $(document).scrollTop();
				if(srcollTop < fixTop){
					$(".fix-bar").css({"position":"fixed"});
				}else if(srcollTop >= fixTop){
					$(".fix-bar").css({"position":"relative"});
				}
			})


})();

//三级
;(function(){
	class Nav{
		constructor(){
			this.nav = $(".nav");
			this.Nav = $(".Nav");
			this.phone = $(".phone");
			this.third = $(".third li");
			this.two = $("li .two");
			this.leve = $(".leve");
			this.init();
			
		}
		init(){
			var that = this;
			this.phone.mouseover(function(){
				that.nav.css({"display":"block"});
			});
			this.Nav.mouseleave(function(){
				that.nav.css({"display":"none"});
			});
			this.two.mouseenter(function(){
				that.leve.css({"display":"block"})
			});
			this.leve.mouseleave(function(){
				that.leve.css({"display":"none"})
			})
		}
	}
	
	new Nav();
})();

//加购物车

function Goods(){
			this.url =" http://localhost/Linux/data/buy.php";
			this.cont=document.querySelector(".fix-bar");
			console.log(this.cont);
			this.init();
			this.addEvent();
		}
Goods.prototype.init = function(){
			let that = this;
			ajaxGet(this.url).then(function(res){
				that.res = JSON.parse(res);
				that.display();
			})
		}
		
Goods.prototype.display = function(){
			var str = "";
		    for(var i=0;i<this.res.length;i++){
		        str += `<div class="fixbar layout" index="${this.res[i].goodsId}">
						<h4>您已选择了</h4>
						<div class="things">
							<span>${this.res[i].name}</span>
							<p>男款|T恤|S</p>
						</div>
						<div class="freight">
							<p>运费</p>
							<i>￥</i>
							<s>0.00</s>
						</div>
						<div class="addCart">
							<div class="qian">
								<i>￥</i>
								<s>${this.res[i].price}</s>
							</div>
							<div class="buy">加入购物车</div>
						</div>
						</div>`
    }
    this.cont.innerHTML = str;
//  console.log( this.cont.innerHTML)
		}
Goods.prototype.addEvent = function(){
			let that = this;
			this.cont.addEventListener("click",function(eve){
				var e = eve || window.event;
				var target = target || e.srcElement;
				if(target.className == "buy"){
					that.id =target.parentNode.parentNode.getAttribute("index");
					that.setCookie();
					
				}
			})
		}
Goods.prototype.setCookie = function(){
			 this.goods = getCookie("goods");
		    if(this.goods == ""){
		        this.goods = [{
		            id:this.id,
		            num:1
		        }];
		    }else{
		        var onoff = true;
		        this.goods = JSON.parse(this.goods)
		        for(var i=0;i<this.goods.length;i++){
		            if(this.goods[i].id == this.id){
		                this.goods[i].num++;
		                onoff = false;
		                break;
            }
		}
		        if(onoff){
	            this.goods.push({
	                id:this.id,
	                num:1	
            })
        }
	}
	setCookie("goods",JSON.stringify(this.goods))
	}
	new Goods();
