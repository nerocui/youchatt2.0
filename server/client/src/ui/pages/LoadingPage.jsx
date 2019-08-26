import React from 'react';
import Lottie from 'lottie-react-web'
import animation from '../../data/loading.json';

const LoadingPage = () => (
	<div className='page themecolor'>
		<div className='lottie--loading'>
			<Lottie
				options={{
					animationData: animation
				}}
			/>
		</div>
	</div>
);

export default LoadingPage;
