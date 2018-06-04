<template>
	<div id="question" class="wrapper">
		<div class="content">
			<h2 class="question-tit">Q&A 常见问题</h2>
			<ul class="question-list">
				<li v-for="item of lists" class="question-item">
					<h5 class="item-tit" @click="handle(item)">
						<i class="left">Q</i><span>{{item.wen}}</span>
					</h5>
					<p class="item-text" v-show="item.isQustionShow">
						<span v-if="!item.shun" v-html="item.da"></span>
						<span v-else>您需要清空您的登录信息，然后重新登录。<br /><a class="colorred" href="javascript:;">清空登录信息请点击这里</a></span>
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				lists: [{
					"shun" : true,
					"wen": "登录失败，登录异常怎么办？",
					"da": "",
					"isQustionShow": false,
				}, {
					"wen": "怎样查看我参与的商品有没有中奖？",
					"da": "每件商品开奖结果公布之后，点击进入“我的-中奖纪录”即可查询中奖情况。",
					"isQustionShow": false,
				}, {
					"wen": "我获得了商品，我还需要支付其他费用吗？",
					"da": "不需要支付其他任何费用。",
					"isQustionShow": false,
				}, {
					"wen": "当我获得商品以后我该做什么？",
					"da": "在您获得商品后您会收到站内信的通知。在这之后，您必须在“我的-中奖纪录”确认收货，然后正确填写、真实的收货地址，完善或确认您的个人信息。我们会在您获得商品后3个工作日内通过电话方式与您取得联系。",
					"isQustionShow": false,
				}, {
					"wen": "我收到的商品可以换货或者退货吗？",
					"da": "非质量问题，不在三包范围内，不给予退换货。",
					"isQustionShow": false,
				}, {
					"wen": "通过支付宝、微信支付或网上银行充值未及时到账怎么办？",
					"da": "网上支付未及时到账可能有以下几个原因造成：<br />a，由于网速或者支付接口等问题，支付数据没有及时传送到支付系统造成的；<br />b，网速过慢，数据传输超时，使银行后台支付信息不能成功对接，导致银行交易成功而支付后台显示失败；<br />c，在网上支付如果使用某些防火墙软件，有时会屏蔽银行接口的弹出窗口，这时会造成在银行那边被扣费，但在我们网站上显示尚未支付。但请您放心，每天我们都会根据银行系统的账务明细清单对前一天的订单进行逐笔核对，如遇问题订单将做单独处理。",
					"isQustionShow": false,
				}, {
					"wen": "如何建议反馈?",
					"da": "如您对我们“帮助中心”的说明有任何疑问或建议请通过“在线客服”告诉我们",
					"isQustionShow": false,
				}, {
					"wen": "所有活动及商品均与苹果公司无关",
					"da": "通过本软件所从事的任何活动及其获得的任何商品均与苹果公司(Apple Inc.)无关。苹果公司既不作为赞助商也不以任何形式参与。",
					"isQustionShow": false,
				}]
			}
		},
		components: {

		},
		methods: {
			handle(item){
				item.isQustionShow = !item.isQustionShow;
				switch (item.isQustionShow){
					case true :
						item.icon = 'icon-chevron-copy-copy-copy';
						break;
					default:
						item.icon = 'icon-jiantou';
						break;
				}
			}
		},
		created(){
			let listLength = this.lists.length;
			for (let i = 0;i<listLength; i++){
				this.lists[i]['icon'] = 'icon-jiantou';
			}
		},
		mounted() {

		}
	}
</script>
<style lang="scss" scoped>
	#question {
		.content {
			top: 0;
			bottom: 0;
		}
		.question-tit {
			margin-left: 20px;
			height: 48px;
			line-height: 48px;
			color: #b7b7b7;
			font-size: 20px;
			font-weight: 400;
			border-bottom: 1px solid #dddddd;
		}
		.question-list {
			width: 100%;
			padding: 0 0 10px 20px;
		}
		.question-item {
			border-bottom: 1px solid #dddddd;
		}
		.item-tit {
			position: relative;
			font-family: "微软雅黑";
			color: #333333;
			padding: 16px 1px 12px;
			.left{
				position: absolute;
				left: 0;
				top: 19px;
				display: inline-block;
				width: 30px;
                height: 20px;
                line-height: 20px;
				padding-left: 5px;
				font-style: normal;
				font-weight: 400;
				font-size: 14px;
				color: #fff;
				background: url(../../assets/img/question.png) no-repeat center;
				background-size: 100% 100%;
			}
			span{
				display: inline-block;
			    margin-left: 35px;
			    width: 80%;
			    font-weight: 400;
			    font-size: 14px;
			}
			.iconfont{
				font-size: 12px;
				position: absolute;
				right: 24px;
			}
		}
		.item-text{
			font-family: "微软雅黑";
		    color: #999999;
		    margin: 0 30px 10px;
		    font-size: 14px;
		}
	}
</style>