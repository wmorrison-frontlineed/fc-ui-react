import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SuperButton from '../super-button';
import RequiredAsterisk from '../required-asterisk';

function SuperSingleFilterList({
	label,
	labelWeight,
	isDisabled,
	includeNoneOption,
	editMode,
	items,
	model,
	databindName,
	databindValue,
	required,
	onChange,
	orderBy
}) {
	const myRef = useRef();
	const [filter, setFilter] = useState('');
	const [isOpen, setOpen] = useState(false);
	const hasNoneOption = items.find(i => i[databindName] === 'None');

	const handleClickOutside = e => {
		if (!myRef.current.contains(e.target)) {
			setOpen(false);
			setFilter('')
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	const getSelectedText = () => {
		let r = 'None';
		if (model != null && items.length) {
			let item = items.find(v => v[databindValue] === model);
			if (item != null) {
				r = item[databindName];
			}
		}
		return r;
	}

	const handleOpen = (e) => setOpen(true);

	const handleSelect = (e) => {
		if (onChange) {
			onChange(e.target.value);
		}
	}

	const handleFilter = (e) => setFilter(e.target.value);

	const showDisplayMode = () => (
		<div>{getSelectedText()}</div>
	);

	const getMenuItems = () => {
		let menuItems = items;

		if (filter) {
			menuItems = menuItems.filter(x => x[databindName].indexOf(filter) >= 0);
		}

		if (orderBy) {
			menuItems.sort((a, b) => a[orderBy].localeCompare(b[orderBy]));
		}

		return menuItems;
	}

	const showEditMode = () => (
		<React.Fragment>
			<SuperButton label={getSelectedText()} type="button" ssIconAfter="angle-down" onClick={handleOpen} />
			{isOpen &&
			<div className="menu-container">
				<div className="select-menu-filter">
					<span className="fa-search-before"></span>
					<input type="text" placeholder="Type here to filter" value={filter} onChange={handleFilter} />
				</div>
				<select size="5" className="select-menu-list" value={model} onChange={handleSelect}>
					{!hasNoneOption && includeNoneOption && <option>None</option>}
					{ getMenuItems().map((item, index) =>
						<option value={item[databindValue]} key={index}>{item[databindName]}</option>
					)}
				</select>
			</div>}
		</React.Fragment>
	);

	return (
		<div ref={myRef} className={classNames('react-super-single-filter-list', {'is-disabled': isDisabled})}>
			{label && <RequiredAsterisk isEditMode={editMode && required}><label className={classNames('main-label', {[labelWeight]: labelWeight})}>{label}</label></RequiredAsterisk> }
			{editMode ? showEditMode() : showDisplayMode()}
		</div>
	);
}

SuperSingleFilterList.propTypes = {
	label: PropTypes.string,
	labelWeight: PropTypes.oneOf(['', 'light', 'heavy']),
	isDisabled: PropTypes.bool,
	includeNoneOption: PropTypes.bool,
	editMode: PropTypes.bool,
	items: PropTypes.array,
	model: PropTypes.string,
	databindName: PropTypes.string,
	databindValue: PropTypes.string,
	required: PropTypes.bool,
	onChange: PropTypes.func,
	orderBy: PropTypes.string
}

SuperSingleFilterList.defaultProps = {
	label: '',
	labelWeight: '',
	items: [],
	isDisabled: false,
	includeNoneOption: false,
	editMode: false,
	databindName: '_name',
	databindValue: 'value',
	onChange: function () { }
}

export default SuperSingleFilterList;
