import React from 'react';
import classNames from 'classnames';

const Loader = ({fill, loading, statusText}) => {
	var loaderClass = classNames(
		'loader',
		{
			'fill-container': fill,
			'is-loading': loading
		});
	return (
		<div className={loaderClass}>
			{ loading && <div className="loading-container">
				{ statusText && <div className="status">{statusText}</div> }
				<div className="logo-spinner">
					<span className="bar bar-1"></span>
					<span className="bar bar-2"></span>
					<span className="bar bar-3"></span>
					<span className="bar bar-4"></span>
					<span className="bar bar-5"></span>
					<span className="bar bar-6"></span>
				</div>
			</div> }
			{ fill && <div className="cover"></div> }
		</div>
	);
}

export default Loader;
