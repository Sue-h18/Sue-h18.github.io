$(function () {
	// alert('o') 测试\
	$(window)
		.on('resize', () => {
			//1.窗口的宽度
			let clientW = $(window).width();
			//2.设置临界点
			let isShowBigImg = clientW >= 900;

			//3.获取所有item
			let $allItems = $('#lk_carousel  .carousel-item');

			//4.遍历
			$allItems.each((index, item) => {
				//4.1 取出图片的路径
				let src = isShowBigImg ? $(item).data('lg-img') : $(item).data('sm-img');

				let imgUrl = `url(${src})`;

				//4.2 设置背景
				$(item).css({
					backgroundImage: imgUrl
				});

				//4.3 创建 img 标签
				if (!isShowBigImg) {
					//小屏幕
					let imgEle = `<img src="${src}">`;
					//empty 清空 因为屏幕只要变化了 就会添加img标签 所以要在添加之前 清空一次
					$(item).empty().append(imgEle);
				} else {
					//当进入大屏幕时 小屏幕的img标签 会被覆盖在 下面 虽然看不到 但还是会有 所以也要清空一下
					$(item).empty();
				}
			});
		})
		.trigger('resize');

	$('[data-toggle="tooltip"]').tooltip();

	//轮播图的滚动
	let startX = 0,
		endX = 0;
	let carouselInner = $('#lk_carousel .carousel-inner')[0];
	let $carousel = $('#lk_carousel');
	let carousel = $carousel[0];

	carouselInner.addEventListener('touchstart', (e) => {
		startX = e.targetTouches[0].clientX;
	});

	carouselInner.addEventListener('touchmove', (e) => {
		endX = e.targetTouches[0].clientX;
		if (endX - startX > 0) {
			//上一张
			$carousel.carousel('prev');
		} else if (endX - startX < 0) {
			//下一张
			$carousel.carousel('next');
		}
	});

	//产品中心 滚动条
	$(window)
		.on('resize', () => {
			// 所有li的总宽度
			let totalW = 0;
			let $ul = $('#lk_product .nav');
			let $allLists = $('.nav-item', $ul);

			$allLists.each((index, item) => {
				totalW += $(item).width();
			});

			//获取 父级标签的宽度
			let parentW = $ul.parent().width();
			if (totalW > parentW) {
				$ul.css({
					width: totalW + 'px'
				});
			} else {
				$ul.removeAttr('style');
			}
		})
		.trigger('resize');
});