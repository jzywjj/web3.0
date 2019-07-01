function getQueryStr(str) { 
	var LocString = String(window.document.location.href); 
	var rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(LocString), tmp; 
	if (tmp = rs) { 
		return tmp[2]; 
	} 
	// parameter cannot be found 
	return ""; 
} 