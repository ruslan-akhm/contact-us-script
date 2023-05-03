import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import Form from "./Form";

function EditModal({ edit, close, paInfo }) {
	const [formData, setFormData] = useState();
	return (
		<Dialog open={edit.state} onClose={close}>
			<Form />
		</Dialog>
	);
}

export default EditModal;
