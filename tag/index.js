import React from 'react';

const Tag = ({status = TagStatus.DEFAULT, text}) => {

	return (
		<div className={status}>
			{text}
		</div>
	);
}

export default Tag;

export const TagStatus = Object.freeze({
	DEFAULT: 'ss-tag',
	POSITIVE: 'ss-tag-positive',
	PRIMARY: 'ss-tag-primary',
	NEGATIVE: 'ss-tag-negative'
});
