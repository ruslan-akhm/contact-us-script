import { useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import Banner from "./banner/Banner";
import Contact from "./contact/Contact";
import JsonGen from "./jsongen/JsonGen";

function App() {
	const [screen, setScreen] = useState("contact"); //"banners"

	return (
		<Grid
			container
			direction="column"
			sx={{
				width: "100%",
				minHeight: "100vh",
				background: "#ebe9e6",
				padding: "20px 0 20px 0",
			}}
		>
			<Grid item container justifyContent="center">
				<Button
					variant={screen === "jsongen" ? "contained" : "outlined"}
					sx={{ m: 1 }}
					onClick={() => setScreen("jsongen")}
				>
					Generate JSON
				</Button>
				<Button
					variant={screen === "contact" ? "contained" : "outlined"}
					sx={{ m: 1 }}
					onClick={() => setScreen("contact")}
				>
					Program Area Contact Info
				</Button>
				<Button
					variant={screen === "banners" ? "contained" : "outlined"}
					sx={{ m: 1 }}
					onClick={() => setScreen("banners")}
				>
					Alert/Banner Message
				</Button>
			</Grid>
			{screen === "contact" && <Contact />}
			{screen === "banners" && <Banner />}
			{screen === "jsongen" && <JsonGen />}
			<Typography
				sx={{ margin: "auto 20px 0 auto", fontSize: "10px", color: "lightgray" }}
			>
				by Ruslan. Ver. 2.0.0
			</Typography>
		</Grid>
	);
}

export default App;
