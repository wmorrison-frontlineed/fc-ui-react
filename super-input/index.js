import React from 'react';
import PropTypes from 'prop-types';
import { useFocus } from '../hooks/useFocus';
import classNames from 'classnames';

const SuperInput = ({
	editMode,
	isDisabled,
	onChange,
	placeholder,
	readonly,
	size,
	type,
	value,
	displayFormatter
}) => {

	const [inputRef, setFocus] = useFocus();

	const showEditMode = () => {
		const handleChange = (e) => {
			onChange(e.target.value);
		}

		const handleClearInput = () => {
			onChange('');
			setFocus();
		}

		const superInputClassNames = classNames(
			'super-input-text',
			size
		);
		const showClearInput = editMode && !isDisabled && !readonly && value !== '';

		return (
			<span className={superInputClassNames}>
				<input
					ref={inputRef}
					type={type}
					onChange={handleChange}
					value={value}
					placeholder={placeholder}
					disabled={isDisabled ? 'disabled' : ''}
					readOnly={readonly ? 'readonly' : ''} />
				{
					showClearInput &&
					<button
						type="button"
						tabIndex="-1"
						className="ss-ctrl-clear fa-li-close"
						aria-label="clear input"
						onClick={handleClearInput}></button>
				}
			</span>
		);
	}

	const showDisplayMode = () => {
		return (<span>{ displayFormatter ? displayFormatter(value) : value }</span>)
	}
	return (
		<React.Fragment>
			{editMode ? showEditMode() : showDisplayMode()}
		</React.Fragment>
	);
}

SuperInput.propTypes = {
	editMode: PropTypes.bool,
	isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
	placeholder: PropTypes.string,
	readonly: PropTypes.bool,
	size: PropTypes.oneOf(['sm', 'lg']),
	type: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
	displayFormatter: PropTypes.func
};

SuperInput.defaultProps = {
	editMode: true,
	placeholder: '',
	size: 'sm',
	type: 'text'
}

export default SuperInput;
