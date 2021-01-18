<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
						// #ifdef APP-PLUS
						plus.screen.lockOrientation('portrait-primary');
						// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
 /*uview样式*/
 @import "uview-ui/index.scss";
 /*自定义iconfont*/
 @import "static/styles/iconfont.css";
 /*每个页面公共css */
</style>