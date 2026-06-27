import { o as __toESM } from "../_runtime.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { D as Link2, a as Upload } from "../_libs/lucide-react.mjs";
import { n as fileToDataUrl } from "./admin-store-BVt5Ru0H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ImageInput-BO67Q8xa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Image input that accepts either a URL or a file upload (stored as data URL). */
function ImageInput({ value, onChange, label = "Image" }) {
	const [mode, setMode] = (0, import_react.useState)("url");
	const fileRef = (0, import_react.useRef)(null);
	async function handleFile(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 2e6) {
			alert("Please choose an image under 2 MB (admin uses browser storage).");
			e.target.value = "";
			return;
		}
		onChange(await fileToDataUrl(file));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block text-sm font-medium",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMode("url"),
					className: `px-2 py-1 rounded ${mode === "url" ? "bg-primary text-primary-foreground" : "bg-muted"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "inline h-3 w-3 mr-1" }), " URL"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMode("upload"),
					className: `px-2 py-1 rounded ${mode === "upload" ? "bg-primary text-primary-foreground" : "bg-muted"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "inline h-3 w-3 mr-1" }), " Upload"]
				})]
			})]
		}),
		mode === "url" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			value,
			onChange: (e) => onChange(e.target.value),
			className: "w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
			placeholder: "/assets/... or https://..."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: fileRef,
			type: "file",
			accept: "image/*",
			onChange: handleFile,
			className: "w-full text-sm"
		}),
		value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: value,
			alt: "preview",
			className: "mt-3 h-24 w-24 rounded-lg object-cover border border-border"
		})
	] });
}
//#endregion
export { ImageInput as t };
