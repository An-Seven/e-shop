;(function(){
	class Register{
		constructor(){
			this.url="http://www.icodeilife.cn/ctrl/register.php";
			this.btn = $(".submit");
			this.user = $(".use");
			this.pass = $(".psd");
			this.pass1 = $(".psd1");
			this.init();
			this.useOff = this.passOff = this.passOff = false

		}
		init(){
			let that = this;
			this.btn.click(function(){
				that.sub();
			})
			this.user.blur(function(){
				that.verify();
			})
			this.pass.blur(function(){
				that.passverify();
			})
			this.pass1.blur(function(){
				that.confirmpass(that.pass.val());
			})
		}
		verify(){
			let reg = /^1[3-9]\d{9}$/;
			if(reg.test(this.user.val())){
				this.user.next("s").hide();
				this.useOff=true;
			}else{
				this.user.next("s").show().html("长度不符合");
				this.useOff=false;
			}
		}
		passverify(){
			let lengthReg =/^.{6,18}$/;
			if(lengthReg.test(this.pass.val())){
				this.pass.next("s").hide();
				this.passOff=true;
			}else{
				this.pass.next("s").show().html("请输入6-18位密码");
				this.passOff=false;
			}
		}
		
		confirmpass(pass){
//			console.log(this.pass.val());

			if(this.pass1.val() == pass){
					this.pass1.next("s").hide();
					this.pass1Off=true;
				}else {
					this.pass1.next("s").show().html("密码不一致");
					this.pass1Off=false;
				}
			}
		sub(){
				if(this.useOff && this.passOff && this.pass1Off){
					this.load();
				}else{
					if(!this.useOff){
						alert("手机号失败");
					}
					if(!this.passOff){
						alert("密码失败");
					}
					if(!this.pass1Off){
						alert("两次密码输入不一致");
					}
				}
			}
		load(){
			let that = this;
			$.ajax({
				type:"get",
				url:this.url,
				async:true,
				data:{
					tel:this.user.val(),
					pass:this.pass.val()
				},
				success:function(res){
					switch(res){
						case "0":
						that.user.next("s").show().html("手机号已注册");break;
						case "1":
						alert("恭喜你注册成功，3秒后跳转到登录");
						setTimeout(()=>{
							location.href="login.html";
						},3000);
						break;
					}
				}
			});
		}
	}
	new Register();
})();