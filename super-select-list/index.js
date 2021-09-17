import React, { useState, useEffect, useRef, useCallback } from 'react';
import SuperButton from '../super-button';
import PropTypes from 'prop-types';
import useEventListener from "../hooks/useEventListener";
import classNames from 'classnames';

const SuperSelectList = ({ model, items, label, editMode, onChange, databindName, databindValue, includeNoneOption, isDisabled, labelWeight }) => {
    const ref = useRef();
    const [selected, setSelected] = useState(model);
    const [menuOpen, setMenuOpen] = useState(false);
    const hasNoneOption = items.find(i => i[databindName] === 'None');

    useEffect(() => {
        setSelected(model);
    }, [model]);


    const handler = useCallback(event => {
        if (ref.current && !ref.current.contains(event.target)) {
            setMenuOpen(false);
        }
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    }, [ref]);

    useEventListener('keydown', handler, document);
    useEventListener('click', handler, document);


    const setMinListHeight = () => {
        // List should always be at least 32px tall
        // up to 128px (4 items), when list size is less than 5.
        if (items.length < 5) {
            return `${(((items.length - 1) * 33) + 33)}px`;
        }
    };

    const handleChange = (e) => {
        setSelected(e.target.value);
        onChange(e.target.value);
    };

    const handleOptionClick = (e) => {
        setSelected(e.target.value);
        setMenuOpen(false);
    };

    const getSelectedText = () => {
        let r = 'None';
        if (selected != null && items.length) {
            let item = items.find(v => {
                return v[databindValue] == selected;
            });
            if (item != null) {
                r = item[databindName];
            }
        }
        return r;
    };

    const showEditMode = () => {
        return (
                <React.Fragment>
                    <SuperButton label={getSelectedText()} type="button" ssIconAfter="angle-down" onClick={() => setMenuOpen(!menuOpen)} />
                    {
                        menuOpen && <div className="select">
                            <select size={5} value={selected} className="select-list" style={{ height: setMinListHeight() }} onChange={handleChange} >
                                {!hasNoneOption && includeNoneOption && <option>Please Select</option>}
                                {items.map((item, index) =>
                                    <option value={item[databindValue]} key={item.id ? item.id : index} onClick={handleOptionClick}>{item[databindName]}</option>
                                )}
                            </select>
                        </div>
                    }
                </React.Fragment>
        )
    };

    const showViewMode = () => {
        return (<span>{getSelectedText()}</span>);
    };

    return (
        <div ref={ref} className={classNames('react-super-single-select-list', { 'is-disabled': isDisabled })}>
            {label && <label className={classNames('main-label', { [labelWeight]: labelWeight, required })}>{label}</label>}
            {editMode && items.length ? showEditMode() : showViewMode()}
        </div>
    );
}

SuperSelectList.propTypes = {
    label: PropTypes.string,
    labelWeight: PropTypes.oneOf(['', 'light', 'heavy']),
    isDisabled: PropTypes.bool,
    includeNoneOption: PropTypes.bool,
    editMode: PropTypes.bool,
    items: PropTypes.array,
    model: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    databindName: PropTypes.string,
    databindValue: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
}

SuperSelectList.defaultProps = {
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


export default SuperSelectList;