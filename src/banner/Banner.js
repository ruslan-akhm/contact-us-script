import { useEffect, useState } from "react";
import {
	Button,
	Grid,
	IconButton,
	Typography,
	RadioGroup,
	Radio,
	FormControlLabel,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

import ReactMarkdown from "react-markdown";
import * as Handlebars from "handlebars/dist/handlebars.min.js";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import BannerForm from "./BannerForm";
import { banner } from "../details";

function Banner() {
	const [bannersInfo, setBannersInfo] = useState(banner);
	const [list, setList] = useState("");
	const [isCopied, setIsCopied] = useState(false);
	const [option, setOption] = useState("all");

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		}
	}, [isCopied]);

	const handleRadioChange = (e) => {
		setOption(e.target.value);
	};

	const generateCode = () => {
		const template = Handlebars.compile(
			`~~~js 
            {{#if pa_id.value.en}} 
if (app_client_id && app_client_id == "{{pa_id.value.en}}") { 
            {{/if}}
                /* Blue banner */
                const bannerTitle = {{#if banner.title.fr}}
                    config.language === "fr"
                        ? "{{banner.title.fr}}"
                        :{{/if}} "{{banner.title.en}}";
                const bannerBody = {{#if banner.body.fr}}
                    config.language === "fr" 
                        ? "{{banner.body.fr}}"
                        :{{/if}} "{{banner.body.en}}";
                {{#if banner.title.en}}document.getElementById("banner-text-bold").innerText = bannerTitle; {{/if}}
                {{#if banner.body.en}}document.getElementById("banner-text").innerText = bannerBody; {{/if}}
                {{#if banner.title.en}}document.getElementById("banner").style.display = "block";
                {{else if banner.body.en}}document.getElementById("banner").style.display = "block";
                {{/if}}

                /* Yellow alert */
                const alertTitle = {{#if alert.title.fr}}
                    config.language === "fr"
                        ? "{{alert.title.fr}}"
                        :{{/if}} "{{alert.title.en}}";
                const alertBody = {{#if alert.body.fr}}
                    config.language === "fr"
                        ? "{{alert.body.fr}}"
                        :{{/if}} "{{alert.body.en}}";
                {{#if alert.title.en}}document.getElementById("alert-text-bold").innerText = alertTitle; {{/if}}
                {{#if alert.body.en}}document.getElementById("alert-text").innerText = alertBody; {{/if}}
                {{#if alert.title.en}}document.getElementById("alert").style.display = "block";
                {{else if alert.body.en}}document.getElementById("alert").style.display = "block";
                {{/if}}
            {{#if pa_id.value.en}} 
} 
            {{/if}}
      `
		);
		const variables = { ...bannersInfo };
		const renderedMarkdown = template(variables);
		setList([
			...list,
			{
				id: list.length === 0 ? 1 : list[list.length - 1].id + 1,
				code: renderedMarkdown,
			},
		]);
		setBannersInfo({ ...banner });
	};

	const generateENCode = () => {
		const template = Handlebars.compile(
			`~~~js 
            {{#if pa_id.value.en}} 
if (app_client_id && app_client_id == "{{pa_id.value.en}}") { 
            {{/if}}
			if(config.language === "en"){
                /* Blue banner */
                const bannerTitle = "{{banner.title.en}}";
                const bannerBody = "{{banner.body.en}}";
                {{#if banner.title.en}}document.getElementById("banner-text-bold").innerText = bannerTitle; {{/if}}
                {{#if banner.body.en}}document.getElementById("banner-text").innerText = bannerBody; {{/if}}
                {{#if banner.title.en}}document.getElementById("banner").style.display = "block";
                {{else if banner.body.en}}document.getElementById("banner").style.display = "block";
                {{/if}}

                /* Yellow alert */
                const alertTitle = "{{alert.title.en}}";
                const alertBody = "{{alert.body.en}}";
                {{#if alert.title.en}}document.getElementById("alert-text-bold").innerText = alertTitle; {{/if}}
                {{#if alert.body.en}}document.getElementById("alert-text").innerText = alertBody; {{/if}}
                {{#if alert.title.en}}document.getElementById("alert").style.display = "block";
                {{else if alert.body.en}}document.getElementById("alert").style.display = "block";
                {{/if}}
} else {
	document.getElementById("banner").style.display = "none"
	document.getElementById("alert").style.display = "none";
}
            {{#if pa_id.value.en}} 
} 
            {{/if}}
      `
		);
		const variables = { ...bannersInfo };
		const renderedMarkdown = template(variables);
		setList([
			...list,
			{
				id: list.length === 0 ? 1 : list[list.length - 1].id + 1,
				code: renderedMarkdown,
			},
		]);
		setBannersInfo({ ...banner });
	};

	const generateFRCode = () => {
		const template = Handlebars.compile(
			`~~~js 
            {{#if pa_id.value.en}} 
if (app_client_id && app_client_id == "{{pa_id.value.en}}") { 
            {{/if}}
			if(config.language === "fr"){
                /* Blue banner */
                const bannerTitle = "{{banner.title.fr}}";
                const bannerBody = "{{banner.body.fr}}";
                {{#if banner.title.fr}}document.getElementById("banner-text-bold").innerText = bannerTitle; {{/if}}
                {{#if banner.body.fr}}document.getElementById("banner-text").innerText = bannerBody; {{/if}}
                {{#if banner.title.fr}}document.getElementById("banner").style.display = "block";
                {{else if banner.body.fr}}document.getElementById("banner").style.display = "block";
                {{/if}}

                /* Yellow alert */
                const alertTitle = "{{alert.title.fr}}";
                const alertBody = "{{alert.body.fr}}";
                {{#if alert.title.fr}}document.getElementById("alert-text-bold").innerText = alertTitle; {{/if}}
                {{#if alert.body.fr}}document.getElementById("alert-text").innerText = alertBody; {{/if}}
                {{#if alert.title.fr}}document.getElementById("alert").style.display = "block";
                {{else if alert.body.fr}}document.getElementById("alert").style.display = "block";
                {{/if}}
} else {
	document.getElementById("banner").style.display = "none"
	document.getElementById("alert").style.display = "none";
}
            {{#if pa_id.value.en}} 
} 
            {{/if}}
      `
		);
		const variables = { ...bannersInfo };
		const renderedMarkdown = template(variables);
		setList([
			...list,
			{
				id: list.length === 0 ? 1 : list[list.length - 1].id + 1,
				code: renderedMarkdown,
			},
		]);
		setBannersInfo({ ...banner });
	};

	const copyAll = () => {
		if (list.length === 0) return;
		const codeBlocks = document.getElementById("code-blocks").children;
		let fullText = "";
		for (let code of codeBlocks) {
			const text = code.children[1].children[0].children[0].innerText;
			fullText = fullText + text;
		}

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

	const deleteCodeBlock = (id) => {
		const filteredList = list.filter((l) => l.id != id);
		setList(filteredList);
	};

	return (
		<>
			<Grid item container direction="column" alignItems="center">
				<Typography variant="h5" sx={{ margin: "20px auto 20px" }}>
					Enter Custom Alert and/or Banner message
				</Typography>
				<ul>
					<Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
						Program Area ID is optional. Use it to generate PA specific message.
					</Typography>

					<Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
						In case only one is needed, just the Title or just the Body are acceptable
						as standalone message.
					</Typography>
				</ul>
				<RadioGroup
					value={option}
					onChange={handleRadioChange}
					sx={{
						display: "flex",
						flexDirection: "row",
						my: 2,
					}}
				>
					<FormControlLabel
						value="all"
						control={<Radio />}
						label="English and French"
					/>
					<FormControlLabel value="en" control={<Radio />} label="English Only" />
					<FormControlLabel value="fr" control={<Radio />} label="French Only" />
				</RadioGroup>
				<BannerForm
					bannersInfo={bannersInfo}
					setBannersInfo={setBannersInfo}
					option={option}
				/>
				<Button
					onClick={
						option === "all"
							? generateCode
							: option === "en"
							? generateENCode
							: generateFRCode
					}
					variant="contained"
					sx={{ m: "20px auto 40px", background: "#333" }}
				>
					Generate Code
				</Button>
			</Grid>

			<Grid item direction="column" alignItems="center" container>
				<Typography variant="h5">
					Copy and paste the following code blocks to the sign-in page:
				</Typography>
				<Button onClick={copyAll} variant="outlined">
					Copy Banner Code
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
						Code copied
					</Typography>
				)}
				<Grid
					sx={{
						borderRadius: "4px",
						mt: 3,
					}}
				>
					<div id="code-blocks">
						{list.length > 0 &&
							list.map((el, index) => {
								return (
									<div style={{ position: "relative" }} key={"block-" + index}>
										<Grid
											item
											container
											direction="column"
											sx={{
												width: "25px",
												position: "absolute",
												left: "-40px",
												top: "0",
											}}
										>
											<IconButton
												onClick={() => deleteCodeBlock(el.id)}
												sx={{
													padding: "3px",
													background: "#ed3b3e",
													borderRadius: "4px",
													"&:hover": {
														background: "#cc1f22",
													},
												}}
											>
												<DeleteIcon sx={{ color: "#fff", fontSize: "18px" }} />
											</IconButton>
										</Grid>

										<ReactMarkdown
											children={el.code}
											components={{
												code({ node, inline, className, children, ...props }) {
													const match = /language-(\w+)/.exec(className || "");
													return !inline && match ? (
														<SyntaxHighlighter
															{...props}
															children={String(children).replace(/\n$/, "")}
															// style={dark}
															language={match[1]}
															PreTag="div"
														/>
													) : (
														<code {...props} className={className}>
															{children}
														</code>
													);
												},
											}}
										/>
									</div>
								);
							})}
					</div>
				</Grid>
			</Grid>
		</>
	);
}

export default Banner;
