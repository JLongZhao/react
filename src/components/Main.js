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

class GalleryByReactApp extends React.Component {
  render() {
    return (
      	<section className="stage">
    		<section className="img-sec">

    		</section>
    		<nav className="controller-nav">
    			
    		</nav>
      	</section>
    );
  }
}

GalleryByReactApp.defaultProps = {
};

export default GalleryByReactApp;
