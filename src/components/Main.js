require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

var imageDatas = require("../data/imageDatas.json");
//将图片信息转成url
imageDatas = (function(imageDataArr) {
	for (var i = imageDataArr.length - 1; i >= 0; i--) {
		var imageData = imageDataArr[i];

		imageData.imageUrl = require("../images/" + imageData.fileName);

		imageDataArr[i] = imageData;
	}
	return imageDataArr;

})(imageDatas);

/**
 * 获取区间随机数
 */
function getRangeRandom(low, high) {
	return Math.ceil(Math.random() * (high - low) + low);
}

class ImgFigure extends React.Component {
	render() {
		var styleObj = {};

		if(this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}

		return(
			<figure className="img-figure" style = {styleObj}>
				<img src={this.props.data.imageUrl} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
}

class GalleryByReactApp extends React.Component {
	
	constructor() { //构造函数
		super();
        this.constant = {
			centerPos: {
				left: 0,
				top: 0
			},
			hPosRange: {
				leftSecX: [0, 0],
				rightSecX: [0, 0],
				y: [0, 0]
			},
			vPosRange: {
				x:[0, 0],
				topY : [0, 0]
			}
		};

		//初始化状态信息
		this.state = {
			imgArrangeArr: []
		}
    }

    
    /**
	 * 加载组件时调用，初始化舞台区域取值范围
	 */
	componentDidMount() {
		//获取舞台大小
		var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			haftStageW = Math.ceil(stageW / 2),
			haftStageH = Math.ceil(stageH / 2);

		//获取imgFigure大小
		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			haftImgW = Math.ceil(imgW / 2),
			haftImgH = Math.ceil(imgH / 2);

		//计算中心图片位置
		this.constant.centerPos = {
			left: haftStageW - haftImgW,
			top: haftStageH - haftImgH
		}

		console.log("stageW :"+stageW +", stageH: " + stageH + ", imgW: "+imgW+",imgH: "+imgH);
		console.log("centerPos = { left: " + this.constant.centerPos.left + ", top: " + this.constant.centerPos.top);

		//计算左边区域范围
		this.constant.hPosRange.leftSecX[0] = -haftImgW;
		this.constant.hPosRange.leftSecX[1] = haftStageW - haftImgW*3;
		this.constant.hPosRange.rightSecX[0] = haftStageW + haftImgW;
		this.constant.hPosRange.rightSecX[1] = stageW - haftImgW;
		this.constant.hPosRange.y[0] = -haftImgH;
		this.constant.hPosRange.y[1] = stageH - haftImgH;

		//计算上方区域位置取值范围
		this.constant.vPosRange.topY[0] = -haftImgH;
		this.constant.vPosRange.topY[1] = haftStageH - haftImgH*3;
		this.constant.vPosRange.x[0] = haftStageW - imgW;
		this.constant.vPosRange.x[1] = haftStageW;

		this.rearrage(12);
	}

	/**
	 * 选中图片，重新布局
	 *
	 * @param currentIndex 当前选中图片索引值
	 */
	rearrage(currentIndex) {
		var imgArrangeArr = this.state.imgArrangeArr,
			constant = this.constant,
			centerPos = constant.centerPos,
			hPosRange = constant.hPosRange,
			vPosRange = constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,

			imgArrangeTopArr = [],
			topImgNum = Math.ceil(Math.random() * 2), //最多取一个
			topImgSpliceIndex = 0,
			imgArrangeCenterArr = imgArrangeArr.splice(currentIndex, 1);
			
		//居中当前图片
		imgArrangeCenterArr[0].pos = centerPos;

		//布局当前居中图片上方图片
		topImgSpliceIndex = Math.ceil(Math.random() * (imgArrangeArr.length - topImgNum));
		imgArrangeTopArr = imgArrangeArr.splice(topImgSpliceIndex, topImgNum);

		imgArrangeTopArr.forEach(function(value, index) {
			imgArrangeTopArr[index].pos = {
				top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
				left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
			}
		});

		//布局左右两侧图片
		for(var i = 0, j = imgArrangeArr.length, k = j/2; i < j; i++) {

			var hPosRangeLOrR = null;

			//将一般的图片布局在左边，一半在右边
			if(i < k) {
				hPosRangeLOrR = hPosRangeLeftSecX;
			} else {
				hPosRangeLOrR = hPosRangeRightSecX;
			}

			imgArrangeArr[i].pos = {
				top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
				left: getRangeRandom(hPosRangeLOrR[0], hPosRangeLOrR[1])
			}

			console.log("imgArrangeArr["+i +"] = {top:"+imgArrangeArr[i].pos.top +", left: "+imgArrangeArr[i].pos.left+"}");
		}

		//替换顶部区域图片位置信息
		if(imgArrangeTopArr && imgArrangeTopArr[0]) {
			imgArrangeArr.splice(topImgSpliceIndex, 0, imgArrangeTopArr[0]);
		}

		//替换居中图片位置信息
		imgArrangeArr.splice(currentIndex, 0, imgArrangeCenterArr[0]);

		//将位置信息设置到state中去
		this.setState({
			imgArrangeArr: imgArrangeArr
		});
	}

  	render() {
	  	var controllerUnits = [],
	  		imgFigures = [];

	  	imageDatas.forEach(function(value, index) {
	  		if(!this.state.imgArrangeArr[index]) {
	  			this.state.imgArrangeArr[index] = {
	  				pos: {
	  					left: 0,
	  					top: 0
	  				}
	  			}
	  		}
	  		imgFigures.push(<ImgFigure data={value} ref={"imgFigure"+index} arrange={this.state.imgArrangeArr[index]} />);
	  	}.bind(this));

	    return (
	      	<section className="stage" ref="stage">
	    		<section className="img-sec">
	    			{imgFigures}
	    		</section>
	    		<nav className="controller-nav">
	    			{controllerUnits}
	    		</nav>
	      	</section>
	    );
  	}
}

GalleryByReactApp.defaultProps = {
};

export default GalleryByReactApp;
