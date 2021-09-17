import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import DatePicker from "react-datepicker";

// ================== SINGLE DATE INPUT ====================
const SuperSingleDateInput = ({
	date,
	minDate,
	maxDate,
	editMode,
	customReadModeValue,
	placeholderText,
	handleSetDate,
}) => {

	var selectedDate = date ? new Date(date) : null;

	var showEditMode = () => {
		return (
			<div className="single-date-input-wrapper">
				<DatePicker
					minDate={minDate}
					maxDate={maxDate}
					placeholderText={placeholderText}
					showMonthDropdown
					useWeekdaysShort
					showYearDropdown
					scrollableYearDropdown={true}
					selected={selectedDate}
					onChange={(newDate) => handleSetDate(newDate)}
				/>
			</div>
		);
	};

	var showDisplayMode = () => {
		return (
			<div className="date-read-mode-wrapper">
				{customReadModeValue || moment(selectedDate).calendar()}
			</div>
		);
	};

	return (
		<div className="date-control-wrapper">
			{editMode ? showEditMode() : showDisplayMode()}
		</div>
	);
};

SuperSingleDateInput.propTypes = {
	date: PropTypes.string,
	minDate: PropTypes.string,
	maxDate: PropTypes.string,
	editMode: PropTypes.bool,
	customReadModeValue: PropTypes.string,
	placeholderText: PropTypes.string,
	handleSetDate: PropTypes.func,
};

SuperSingleDateInput.defaultProps = {
	editMode: true,
};
// ==================== SINGLE DATE INPUT ====================

// ==================== DATE RANGE INPUT =====================
const SuperRangedDateInput = ({
	editMode,
	customReadModeValue,
	startDatePlaceHolderText,
	endDatePlaceHolderText,
	handleSetStartDate,
	handleSetEndDate,
	startDate,
	endDate,
}) => {
	var selectedStartDate = startDate ? new Date(startDate) : null;
	var selectedEndDate = endDate ? new Date(endDate) : null;

	var showEditMode = () => {
		return (
			<React.Fragment>
				<div className="single-date-input-wrapper">
					<DatePicker
						placeholderText={startDatePlaceHolderText}
						showMonthDropdown
						useWeekdaysShort
						showYearDropdown
						scrollableYearDropdown={true}
						selected={selectedStartDate}
						onChange={(newVal) => handleSetStartDate(newVal)}
					/>
				</div>
				<div className="single-date-input-wrapper">
					<DatePicker
						placeholderText={endDatePlaceHolderText}
						showMonthDropdown
						useWeekdaysShort
						showYearDropdown
						scrollableYearDropdown={true}
						selected={selectedEndDate}
						onChange={(newVal) => handleSetEndDate(newVal)}
					/>
				</div>
			</React.Fragment>
		);
	};

	var showDisplayMode = () => {
		return (
			<div className="date-read-mode-wrapper">
				{customReadModeValue ||	`${moment(selectedStartDate).calendar()} - ${moment(selectedEndDate).calendar()}`}
			</div>
		);
	};

	return (
		<div className="date-control-wrapper">
			{editMode ? showEditMode() : showDisplayMode()}
		</div>
	);
};

SuperRangedDateInput.propTypes = {
	editMode: PropTypes.bool,
	customReadModeValue: PropTypes.string,
	startDatePlaceHolderText: PropTypes.string,
	endDatePlaceHolderText: PropTypes.string,
	handleSetStartDate: PropTypes.func,
	handleSetEndDate: PropTypes.func,
	startDate: PropTypes.string,
	endDate: PropTypes.string,
};

SuperRangedDateInput.defaultProps = {
	editMode: true,
};
// ================== DATE RANGE INPUT =====================

export { SuperRangedDateInput, SuperSingleDateInput };
