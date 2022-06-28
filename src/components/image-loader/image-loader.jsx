import React, { useState, useEffect } from 'react';

const ImageLoader = ({ loaderImage, mainImage, alt }) => {
	const [currentImage, setCurrentImage] = useState(loaderImage);

	const fetchImage = (src) => {
		const loadingImage = new Image();
		loadingImage.src = mainImage;
		loadingImage.onload = () => {
			setCurrentImage(loadingImage.src);
		};
	};

	// on component load > fetch main image data
	useEffect(() => {
		fetchImage(mainImage);
	}, []);

	return <img className="w-100 pl-0" src={currentImage} alt={alt} />;
};

export default ImageLoader;
