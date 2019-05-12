;(function(){
	class Login{
		constructor(){
			this.url="http://www.icodeilife.cn/ctrl/login.php";
			this.btn=$(".submit");
			this.user=$(".user");
			this.pass = $(".psd");
			this.init();

		}
		init(){
			let that= this;
			this.btn.click(function(){
				that.load();
			})
			this.user.blur(function(){
				that.verify();
			})
			this.pass.blur(function(){
				that.passverify();
			})
		}
		verify(){
			let reg = /^1[3-9]\d{9}$/;
			if(reg.test(this.user.val())){
				this.user.next("s").hide();
				this.passOn=true;
			}else{
				this.user.next("s").show().html("请输入正确的用户名");
			}
		}
		passverify(){
			let lengthReg =/^.{6,18}$/;
			if(lengthReg.test(this.pass.val())){
				this.pass.next("s").hide();
				this.passOn=true;
			}else{
				this.pass.next("s").show().html("密码错误");
			}
		}
		load(){
			let that =this;
			$.ajax({
				type:"get",
				url:this.url,
				async:true,
				data:{
					user:this.user.val(),
					pass:this.pass.val()
				},
				success:function(res){
					switch(res){
						case "0":
						alert("用户名与密码不符");break;
						case "1":
						that.s.html("请重新登录");break;
						default:
						location.href ="index.html";
					}
				}
			});
		}
	}
	new Login();
})();

