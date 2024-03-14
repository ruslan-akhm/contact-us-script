import { useState, useEffect } from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

function JsonGen(props) {
	const [input, setInput] = useState("");
	const [list, setList] = useState();
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		}
	}, [isCopied]);

	const checkRegex = (pa, regex) => {
		const isMatch = pa.match(regex);
		if (isMatch) {
			if (isMatch[1].startsWith("config.language")) {
				/* There are Eng and Fre values */
				let valuesArr = isMatch[1].split("? ")[1].split(': "');
				valuesArr = valuesArr.map(trimStr);
				return valuesArr;
			} else {
				/* There is only Eng value */
				let value = isMatch[1].trim();
				value = trimStr(value);
				return isNotApplicable(value) ? ["", ""] : ["", value];
			}
		}
		return ["", ""];
	};

	const trimStr = (str) => {
		const quotesRegex = /^["'`]?(.*?)["'`]?;?$/;
		str = str.trim();
		const trimmed = str.replace(quotesRegex, "$1");
		return trimmed;
	};

	const isNotApplicable = (str) => {
		return str.toLowerCase() === "n/a";
	};

	const generateJson = () => {
		let result = {};
		let paObj = {};
		let paList = input.split("}");
		for (let pa of paList) {
			if (pa) {
				let client_id,
					title,
					phone,
					tollFreeNum,
					fax,
					tty,
					websiteTitle,
					websiteUrl,
					email,
					mailingAddress,
					days,
					hours;

				/* Client id parse */
				const idRegex = /app_client_id\s*==*\s*"([^"]*)"/;
				client_id = checkRegex(pa, idRegex);

				/* Title(s) parse */
				const titleRegex =
					/document\.querySelector\("#contact-us-title"\)\.innerText\s*=\s*([\s\S]*?)(?=document\.querySelector|$)/;
				title = checkRegex(pa, titleRegex);

				/* Phone number parse */
				const phoneRegex =
					/document\.querySelector\("#contact-local-number"\)\.innerText\s*=\s*([\s\S]*?)(?=document\.querySelector|$)/;
				phone = checkRegex(pa, phoneRegex);

				/* Toll free number parse */
				const tollFreeNumRegex =
					/document\.querySelector\("#contact-tollfree-number"\)\.innerText\s*=\s*([\s\S]*?)(?=document\.querySelector|$)/;
				tollFreeNum = checkRegex(pa, tollFreeNumRegex);

				/* Fax number parse */
				const faxRegex =
					/document\.querySelector\("#contact-local-fax"\)\.innerText\s*=\s*([\s\S]*?)(?=document\.querySelector|$)/;
				fax = checkRegex(pa, faxRegex);

				/* Tty number parse */
				const ttyRegex =
					/document\.querySelector\("#contact-tty-number"\)\.innerText\s*=\s*([\s\S]*?)(?=document\.querySelector|$)/;
				tty = checkRegex(pa, ttyRegex);

				/* Website parse */
				const websiteTitleRegex =
					/document\.querySelector\("#contact-web-address"\)\.innerText\s*=\s*([\s\S]*?)(?=document\.querySelector|$)/;
				websiteTitle = checkRegex(pa, websiteTitleRegex);

				const websiteUrlRegex =
					/document\.querySelector\("#contact-web-address"\)\.href\s*=\s*([\s\S]*?)(?=document\.querySelector|$)/;
				websiteUrl = checkRegex(pa, websiteUrlRegex);

				const emailRegex =
					/document\.querySelector\("#contact-email-address"\)\.innerText\s*=\s*([\s\S]*?)(?=document\.querySelector|$)/;
				email = checkRegex(pa, emailRegex);

				/* Mailing address parse */
				const mailingAddressRegex =
					/document\.querySelector\("#contact-local-mailing"\)\.innerText\s*=\s*([\s\S]*?)(?=document\.querySelector|$)/;
				mailingAddress = checkRegex(pa, mailingAddressRegex);

				/* Schedule days parse */
				const daysRegex =
					/document\.querySelector\("#contact-schedule-days"\)\.innerText\s*=\s*([\s\S]*?)(?=document\.querySelector|$)/;
				days = checkRegex(pa, daysRegex);

				/* Schedule hours parse */
				const hoursRegex =
					/document\.querySelector\("#contact-schedule-hours"\)\.innerText\s*=\s*([\s\S]*?)(?=document\.querySelector|$)/;
				hours = checkRegex(pa, hoursRegex);

				paObj = {
					[client_id[1]]: {
						name: {
							fr: title[0],
							en: title[1],
						},
						local: {
							fr: phone[0],
							en: phone[1],
						},
						tollFree: {
							fr: tollFreeNum[0],
							en: tollFreeNum[1],
						},
						fax: {
							fr: fax[0],
							en: fax[1],
						},
						tty: {
							fr: tty[0],
							en: tty[1],
						},
						website: {
							title: {
								fr: websiteTitle[0],
								en: websiteTitle[1],
							},
							url: {
								fr: websiteUrl[0],
								en: websiteUrl[1],
							},
						},
						email: {
							fr: email[0],
							en: email[1],
						},
						mailingAddress: {
							fr: mailingAddress[0],
							en: mailingAddress[1],
						},
						schedule: {
							days: {
								fr: days[0],
								en: days[1],
							},
							hours: {
								fr: hours[0],
								en: hours[1],
							},
						},
					},
				};

				result = { ...result, ...paObj };
			}
		}
		setList(result);
	};

	const copyAll = () => {
		if (list.length === 0) return;
		const fullText = document.getElementById("code-blocks").innerText;

		const copyContent = async () => {
			try {
				await navigator.clipboard.writeText(fullText);
				setIsCopied(true);
			} catch (err) {
				console.error("Failed to copy: ", err);
			}
		};
		copyContent();
	};

	return (
		<Grid item container direction="column">
			<Grid item container direction="column" alignItems="center">
				<Typography variant="h5" sx={{ margin: "20px auto 20px" }}>
					Copy Program Area's information from Signin page
				</Typography>
				<ul>
					<Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
						Paste only if statement blocks from Signin page
					</Typography>
				</ul>
			</Grid>
			<Grid
				item
				container
				alignItems="center"
				justifyContent="center"
				direction="column"
				sx={{ px: 10 }}
			>
				<TextField
					id="outlined-multiline-static"
					label="Code blocks"
					multiline
					rows={20}
					// defaultValue=""
					sx={{ width: "70vw" }}
					onChange={(e) => setInput(e.target.value)}
				/>
				<Button
					onClick={generateJson}
					variant="contained"
					sx={{ m: "20px auto 40px", background: "#333" }}
				>
					Generate JSON
				</Button>
			</Grid>

			{list && (
				<Grid
					item
					container
					alignItems="center"
					justifyContent="center"
					direction="column"
					sx={{ width: "fit-content", mx: "auto" }}
				>
					<Typography variant="h5">
						Copy and paste the following JSON to contacts.json file:
					</Typography>
					<Button variant="outlined" onClick={copyAll}>
						Copy JSON
					</Button>
					{isCopied && (
						<Typography
							sx={{
								color: "green",
								display: "flex",
								fontWeight: "bold",
								fontSize: "14px",
								mt: 1,
							}}
						>
							<CheckIcon sx={{ fontSize: "20px", mr: 0.5 }} />
							JSON copied
						</Typography>
					)}
				</Grid>
			)}

			{list && (
				<Grid
					item
					container
					alignItems="center"
					justifyContent="center"
					sx={{
						mx: "auto",
						mt: 4,
						width: "80vw",
						background: "rgb(245, 242, 240)",
					}}
				>
					<pre id="code-blocks" style={{ textWrap: "wrap", width: "100%" }}>
						{JSON.stringify(list, null, 6)}
					</pre>
				</Grid>
			)}
		</Grid>
	);
}

export default JsonGen;
