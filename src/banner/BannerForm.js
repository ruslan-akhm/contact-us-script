import { Grid, TextField, TextareaAutosize, Input } from "@mui/material";

function BannerForm({ bannersInfo, setBannersInfo }) {
	const handleInput = (e, type, lang, field) => {
		if (type === "pa_id") {
			setBannersInfo((prevState) => {
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
		} else {
			setBannersInfo((prevState) => {
				return {
					...prevState,
					[type]: {
						...prevState[type],
						[field]: {
							...prevState[type][field],
							[lang]: e.target.value,
						},
					},
				};
			});
		}
	};

	const inputs = Object.keys(bannersInfo).map((el) => {
		if (el === "pa_id") {
			return (
				<Grid key={el} item container sx={{ width: "fit-content", py: 1, mb: 2 }}>
					<TextField
						variant="outlined"
						label={bannersInfo[el].label.en}
						value={bannersInfo[el].value.en}
						onChange={(e) => handleInput(e, el, "en")}
						sx={{ width: "624px" }}
					/>
				</Grid>
			);
		} else {
			return (
				<Grid
					key={el}
					item
					container
					sx={{ width: "fit-content" }}
					direction="column"
				>
					<Grid
						item
						container
						direction="column"
						sx={[
							el === "alert"
								? {
										background: "#ffd440",
										width: "90vw",
								  }
								: {
										width: "65vw",
										background: "#e2f0f4",
										borderLeft: "3px solid #1080a6;",
								  },
							{
								p: 2,
							},
						]}
					>
						<TextField
							variant="outlined"
							label={bannersInfo[el].label.en + " - Title"}
							value={bannersInfo[el].title.en}
							onChange={(e) => handleInput(e, el, "en", "title")}
						/>
						<Input
							multiline
							placeholder={bannersInfo[el].label.en + " - Body"}
							value={bannersInfo[el].body.en}
							onChange={(e) => handleInput(e, el, "en", "body")}
							sx={{ border: "1px solid gray", borderRadius: "4px", p: 1.8, mt: 1 }}
						/>
					</Grid>
					<Grid
						item
						container
						direction="column"
						sx={[
							el === "alert"
								? {
										mb: 4,
										background: "#ffd440",
										width: "90vw",
								  }
								: {
										width: "65vw",
										background: "#e2f0f4",
										borderLeft: "3px solid #1080a6;",
								  },
							{
								p: 2,
							},
						]}
					>
						<TextField
							variant="outlined"
							label={bannersInfo[el].label.fr + " - Title"}
							value={bannersInfo[el].title.fr}
							onChange={(e) => handleInput(e, el, "fr", "title")}
						/>
						<Input
							multiline
							placeholder={bannersInfo[el].label.fr + " - Body"}
							value={bannersInfo[el].body.fr}
							onChange={(e) => handleInput(e, el, "fr", "body")}
							sx={{ border: "1px solid gray", borderRadius: "4px", p: 1.8, mt: 1 }}
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

export default BannerForm;
