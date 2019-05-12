function Car(){
			this.tbody =document.querySelector(".list")
			this.url =" http://localhost/Linux/data/buy.php";
			this.init();
			this.addEvent();
		}
Car.prototype.init = function(){
			let that = this;
			ajaxGet(this.url).then(function(res){
				that.res = JSON.parse(res);
//				console.log(that.res);
				that.getCookie();
			})
		}
Car.prototype.getCookie = function(){
			this.goods = getCookie("goods")!="" ? JSON.parse(getCookie("goods")) : [];
			this.display();
		}
Car.prototype.display = function(){
			var str = ""
    for(var i=0;i<this.res.length;i++){
        for(var j=0;j<this.goods.length;j++){
            if(this.res[i].goodsId == this.goods[j].id){
				str +=` 
					<div class="checkbox fixed">
							<i class="box"><s></s></i>
						</div>
						<div class="pic"><img src="images/1.webp"/></div>
						<div class="name">${this.res[i].name}</div>
						<div class="per-price"><i>￥</i><span class="price">${this.res[i].price}</span></div>
						<div class="count"><a class="reduce">-</a><input type="text" class="num" min="1" value="${this.goods[j].num}"/><a class="jia">+</a></div>
						<div class="subtotal"><i>￥</i><span>399.00</span></div>
						<div index="${this.goods[j].id}"><span class="del">删除</span></div>
						`
            }
		}
         }   
		this.tbody.innerHTML = str;
	}	    
Car.prototype.addEvent = function(){
		var that = this;
	    this.tbody.addEventListener("input",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "num"){

            that.num = target.value;
            that.id = target.parentNode.parentNode.getAttribute("index");
            that.changeCookie(function(i){
                that.goods[i].num = that.num;
            })
        }
    })
    this.tbody.addEventListener("click",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "del"){
        	console.log(that.goods)
        	
            that.id = target.parentNode.getAttribute("index");
            console.log(that.id)
            target.parentNode.parentNode.remove();
            that.changeCookie(function(i){
                that.goods.splice(i,1);
                console.log(1)
            })
        }
    })
}
Car.prototype.changeCookie = function(callback){
	for(var i=0;i<this.goods.length;i++){
        if(this.goods[i].id == this.id){
        	console.log(this.goods)
        	
            callback(i);
            
        }
    }
    setCookie("goods",JSON.stringify(this.goods))
    
	}
	new Car();
