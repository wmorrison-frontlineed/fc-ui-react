import React from 'react';
import PropTypes from 'prop-types';

const SuperActionMenuItem = ({ value, label, onClick, style }) => {
    const handleClick = (e) => {
        onClick(e.target.value);
    };

    const handleKeypress = e => {
        if (e.charCode === 13) { // enter key
            handleClick(e);
        }
    };

    return (
        <li
            className="action-menu-item"
            style={style}
            tabIndex={0}
            onClick={handleClick}
            onKeyPress={handleKeypress}
            value={value}>
            {label}
        </li>
    )
}

SuperActionMenuItem.propTypes = {
    value: PropTypes.any,
    label: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object
}

export default SuperActionMenuItem
