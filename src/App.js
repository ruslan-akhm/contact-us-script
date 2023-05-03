import { useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

import ReactMarkdown from "react-markdown";
import * as Handlebars from "handlebars/dist/handlebars.min.js";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import Form from "./Form";
// import EditModal from "./EditModal";
import { details } from "./details";

function App() {
	const [paInfo, setPaInfo] = useState(details);
	const [list, setList] = useState("");
	const [edit, setEdit] = useState({ state: false, item_id: null });

	const addPaInfo = () => {
		const template = Handlebars.compile(
			`~~~js 
      if(app_client_id && app_client_id == "{{id.value.en}}"){
		document.querySelector("#contact-us-title").innerText = {{#if name.value.fr}} config.language === "fr" ? "{{name.value.fr}}" :{{/if}} "{{name.value.en}}";
		document.querySelector("#contact-local-number").innerText = {{#if local.value.fr}}config.language === "fr" ? "{{local.value.fr}}" :{{/if}} "{{local.value.en}}";
		document.querySelector("#contact-local-number").href = {{#if local.value.fr}}config.language === "fr" ? "tel:{{local.value.fr}}" :{{/if}} "tel:{{local.value.en}}";
		document.querySelector("#contact-local-number").style.display = {{#if local.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-local").style.display = {{#if local.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-tollfree-number").innerText = {{#if tollFree.value.fr}}config.language === "fr" ? "{{tollFree.value.fr}}" :{{/if}} "{{tollFree.value.en}}";
		document.querySelector("#contact-tollfree-number").href = {{#if tollFree.value.fr}}config.language === "fr" ? "tel:{{tollFree.value.fr}}" :{{/if}} "tel:{{tollFree.value.en}}";
		document.querySelector("#contact-tollfree-number").style.display = {{#if tollFree.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-tollfree").style.display = {{#if tollFree.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-email-address").innerText = {{#if email.value.fr}}config.language === "fr" ? "{{email.value.fr}}" :{{/if}} "{{email.value.en}}";
		document.querySelector("#contact-email-address").href = {{#if email.value.fr}}config.language === "fr" ? "mailto:{{email.value.fr}}" :{{/if}} "mailto:{{email.value.en}}";
		document.querySelector("#contact-email-address").style.display = {{#if email.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-email").style.display = {{#if email.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-web-address").innerText = {{#if website_title.value.fr}}config.language === "fr" ? "{{website_title.value.fr}}" :{{/if}} "{{website_title.value.en}}";
		document.querySelector("#contact-web-address").href = {{#if website_url.value.fr}}config.language === "fr" ? "{{website_url.value.fr}}" :{{/if}} "{{website_url.value.en}}";
		document.querySelector("#contact-web-address").style.display = {{#if website_url.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-website").style.display = {{#if website_url.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-local-fax").innerText = {{#if fax.value.fr}}config.language === "fr" ? "{{fax.value.fr}}" :{{/if}} "{{fax.value.en}}";
		document.querySelector("#contact-local-fax").href = {{#if fax.value.fr}}config.language === "fr" ? "tel:{{fax.value.fr}}" :{{/if}} "tel:{{fax.value.en}}";
		document.querySelector("#contact-local-fax").style.display = {{#if fax.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-fax").style.display = {{#if fax.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-tty-number").innerText = {{#if tty.value.fr}}config.language === "fr" ? "{{tty.value.fr}}" :{{/if}} "{{tty.value.en}}";
		document.querySelector("#contact-tty-number").href = {{#if tty.value.fr}}config.language === "fr" ? "tel:{{tty.value.fr}}" :{{/if}} "tel:{{tty.value.en}}";
		document.querySelector("#contact-tty-number").style.display = {{#if tty.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-tty").style.display = {{#if tty.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-local-mailing").innerText = {{#if mailing.value.fr}}config.language === "fr" ? "{{mailing.value.fr}}" :{{/if}} "{{mailing.value.en}}";
		document.querySelector("#contact-local-mailing").style.display = {{#if mailing.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-mailing").style.display = {{#if mailing.value.en}}"inline" {{else}}"none" {{/if}};
		document.querySelector("#contact-schedule-days").innerText = {{#if schedule_days.value.fr}}config.language === "fr" ? "{{schedule_days.value.fr}}" :{{/if}} "{{schedule_days.value.en}}";
		document.querySelector("#contact-schedule-hours").innerText = {{#if schedule_hours.value.fr}}config.language === "fr" ? "{{schedule_hours.value.fr}}" :{{/if}} "{{schedule_hours.value.en}}";
		document.querySelector("#contact-phones").style.display = "inline";
		document.querySelector("#contact-schedule").style.display = "inline";
	  }
      `
		);
		const variables = { ...paInfo };
		const renderedMarkdown = template(variables);
		setList([
			...list,
			{
				id: list.length === 0 ? 1 : list[list.length - 1].id + 1,
				code: renderedMarkdown,
			},
		]);
		setPaInfo({ ...details });
	};

	const copyAll = () => {
		const codeBlocks = document.getElementById("code-blocks").children;
		let fullText = "";
		for (let code of codeBlocks) {
			const text = code.children[1].children[0].children[0].innerText;
			fullText = fullText + text;
		}

		const copyContent = async () => {
			try {
				await navigator.clipboard.writeText(fullText);
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

	const editCodeBlock = (id) => {
		setEdit({ state: true, item_id: id });
	};

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
			<Grid item container direction="column" alignItems="center">
				<Typography variant="h5" sx={{ margin: "20px auto 20px" }}>
					Enter Program Area's information
				</Typography>
				<ul>
					<Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
						Every field is optional, and if not provided, will not be shown on Contact
						Us modal.
					</Typography>
					<Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
						French variant is optional, and if not provided, an English variant will
						be shown on French page.
					</Typography>
					<Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
						If ONLY French variant is provided and English is empty, value will not be
						shown on Contact Us modal.
					</Typography>
				</ul>
				<Form paInfo={paInfo} setPaInfo={setPaInfo} />
				<Button
					onClick={addPaInfo}
					variant="contained"
					sx={{ m: "20px auto 40px", background: "#333" }}
				>
					Add Program Area
				</Button>
			</Grid>
			<Grid item direction="column" alignItems="center" container>
				<Typography variant="h5">
					Copy and paste the following code blocks to the sign-in page:
				</Typography>
				<Button onClick={copyAll} variant="outlined">
					Copy All
				</Button>

				<Grid
					sx={{
						// border: "1px solid #ebe9e6",
						borderRadius: "4px",
						mt: 3,
					}}
				>
					<div id="code-blocks">
						{list.length > 0 &&
							list.map((pa, index) => {
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
											{/* <IconButton
												onClick={() => editCodeBlock(pa.id)}
												sx={{
													padding: "3px",
													background: "#4287f5",
													borderRadius: "4px",
													mb: 1,
													"&:hover": {
														background: "#1f61cc",
													},
												}}
											>
												<EditIcon sx={{ color: "#fff", fontSize: "18px" }} />
											</IconButton> */}
											<IconButton
												onClick={() => deleteCodeBlock(pa.id)}
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
											children={pa.code}
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
			{/* <EditModal edit={edit} close={() => setEdit({state: false, item_id: null})} paInfo={paInfo}/> */}
		</Grid>
	);
}

export default App;
