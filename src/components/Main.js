require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

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

class ImgFigure extends React.Component {
	render() {
		return(
			<figure className="img-figure">
				<img src={this.props.data.imageUrl} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
}

class GalleryByReactApp extends React.Component {
	
  	render() {
	  	var controllerUnits = [],
	  		imgFigures = [];

	  	imageDatas.forEach(function(value) {
	  		imgFigures.push(<ImgFigure data={value}/>);
	  	});

	    return (
	      	<section className="stage">
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
