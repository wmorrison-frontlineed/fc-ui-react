import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as iconHelper from '../helpers/iconHelper';

const SuperButton = ({ children, onClick, label, styleType, size, type, isDisabled, ssIcon, ssIconBefore, ssIconAfter }) => {

    const buttonClasses = classNames(
        'super-button',
        styleType,
        size
    );

    const labelClasses = classNames(
        'button-control',
        iconHelper.ssIcon(ssIcon),
        iconHelper.ssIconBefore(ssIconBefore),
        iconHelper.ssIconAfter(ssIconAfter)
    );

    return (
        <div className="super-button-container">
            <button className={buttonClasses} disabled={isDisabled ? 'disabled' : ''} type={type} onClick={onClick}>
                <label className={labelClasses}>{label}</label>
            </button>
            {children}
        </div>
    )
}

SuperButton.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    styleType: PropTypes.oneOf(['pri', 'std', 'neg', 'pos', 'smp', 'flat', 'link']),
    type: PropTypes.oneOf(['button', 'submit']),
    size: PropTypes.oneOf(['sm', 'lg']),
    isDisabled: PropTypes.bool,
    ssIcon: PropTypes.string,
    ssIconBefore: PropTypes.string,
    ssIconAfter: PropTypes.string
}

SuperButton.defaultProps = {
    label: '',
    type: 'button',
    isDisabled: false,
    styleType: 'std',
    onClick: function () { }
}

export default SuperButton;
