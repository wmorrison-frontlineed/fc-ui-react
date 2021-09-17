import React from "react";

const RequiredAsterisk = ({ isEditMode, children}) => {
    if(isEditMode){
		return (<span className="required">{children}</span>);
	}else{
		return (<React.Fragment>{children}</React.Fragment>);
	}
}

export default RequiredAsterisk;
