import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import SuperButton from '../super-button';
import useEventListener from '../hooks/useEventListener';

const SuperActionMenu = (props) => {
	const { children, showMenu, ...buttonProps } = props;
	const [menuOpen, setMenuOpen] = useState(showMenu);
	const ref = useRef(null);
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


	return (
		<div ref={ref} className="react-super-action-menu">
			<SuperButton onClick={() => setMenuOpen(!menuOpen)} {...buttonProps} />
			{ menuOpen &&
				<div className="action-menu">
					<menu className="action-menu-list">
						{children}
					</menu>
				</div> }
		</div>
	);
}

SuperActionMenu.propTypes = {
	children: PropTypes.any,
	showMenu: PropTypes.bool
}

export default SuperActionMenu;
