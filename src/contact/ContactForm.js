import { Grid, TextField } from "@mui/material";

function ContactForm({ paInfo, setPaInfo }) {
	const handleInput = (e, type, lang) => {
		setPaInfo((prevState) => {
			return {
				...prevState,
				[type]: {
					...prevState[type],
					value: {
						...prevState[type].value,
						[lang]: e.target.value,
					},
				},
			};
		});
	};

	const inputs = Object.keys(paInfo).map((el) => {
		if (el === "id") {
			return (
				<Grid key={el} item container sx={{ width: "fit-content", py: 1 }}>
					<TextField
						variant="outlined"
						label={paInfo[el].label.en}
						value={paInfo[el].value.en}
						onChange={(e) => handleInput(e, el, "en")}
						sx={{ width: "624px" }}
					/>
				</Grid>
			);
		} else {
			return (
				<Grid key={el} item container sx={{ width: "fit-content" }}>
					<Grid item container sx={{ p: 1.5, width: "fit-content" }}>
						<TextField
							variant="outlined"
							label={paInfo[el].label.en}
							value={paInfo[el].value.en}
							onChange={(e) => handleInput(e, el, "en")}
							sx={{ width: "300px" }}
						/>
					</Grid>
					<Grid item container sx={{ p: 1.5, width: "fit-content" }}>
						<TextField
							variant="outlined"
							label={paInfo[el].label.fr}
							value={paInfo[el].value.fr}
							onChange={(e) => handleInput(e, el, "fr")}
							sx={{ width: "300px" }}
						/>
					</Grid>
				</Grid>
			);
		}
	});

	return (
		<Grid item container direction="column" alignItems="center">
			{inputs}
		</Grid>
	);
}

export default ContactForm;
