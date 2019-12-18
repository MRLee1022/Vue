<template>
<div class="container">
	<div class="head head__fixed">
		<div class="filter"></div>
		<div class="back"><</div>
		<div class="category__select"></div>
	</div>
	
	<ul class="hotel__list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
		<li v-for="item in list"><div class="box">
			<div class="imgbox">
				<div class="info">
<!-- 					<div class="tit">北京中成天坛假日酒店</div>
					<div class="pos">北京-丰台区 | 距离您8.9km</div> -->
				</div>
			</div>
			<div class="tags">
				<!-- <span>免费停车</span><span>精致小食</span><span>优质服务</span> -->
			</div>
			<div class="price">
				<span class="svip"></span>
<!-- 				<span class="value">¥180</span>
				<span class="mprice">门市价¥300起</span> -->
			</div>
		</div></li>
	</ul>

</div>
</template>
<script>
export default {
	name:"list",
	data() {
		return {
			list:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
		}
	},
	mounted() {

	},
	methods: {
		loadMore() {
		  this.loading = true;
		  setTimeout(() => {
		    let last = this.list[this.list.length - 1];
		    for (let i = 1; i <= 10; i++) {
		      this.list.push(last + i);
		    }
		    this.loading = false;
		  }, 2500);
		}
	}
}



</script>