import { o as __toESM } from "../_runtime.mjs";
import { c as ORG, i as GALLERY, l as PROJECTS } from "./site-data-3zwADvDn.mjs";
import { t as api } from "./api-pAUbCncO.mjs";
import { d as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-store-BVt5Ru0H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var DEFAULT_SETTINGS = {
	id: "",
	email: ORG.email,
	phone: ORG.phone,
	whatsapp: ORG.whatsapp,
	whatsappName: ORG.whatsappName,
	address: ORG.address,
	instagram: ORG.social.instagram,
	facebook: ORG.social.facebook,
	twitter: ORG.social.twitter,
	youtube: ORG.social.youtube,
	founderPortfolioUrl: ORG.founderPortfolioUrl,
	updatedAt: (/* @__PURE__ */ new Date()).toISOString()
};
function useProjectsStore() {
	const [data, setData] = (0, import_react.useState)(PROJECTS);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const refresh = async () => {
		setLoading(true);
		try {
			setData(await api.getProjects());
		} catch (error) {
			console.error("Failed to fetch projects:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return {
		data,
		loading,
		refresh
	};
}
function useGalleryStore() {
	const [data, setData] = (0, import_react.useState)([...GALLERY]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const refresh = async () => {
		setLoading(true);
		try {
			setData(await api.getGallery());
		} catch (error) {
			console.error("Failed to fetch gallery:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return {
		data,
		loading,
		refresh
	};
}
function useVolunteersStore() {
	const [data, setData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const refresh = async () => {
		setLoading(true);
		try {
			setData(await api.getVolunteers());
		} catch (error) {
			console.error("Failed to fetch volunteers:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return {
		data,
		loading,
		refresh
	};
}
function useMessagesStore() {
	const [data, setData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const refresh = async () => {
		setLoading(true);
		try {
			setData(await api.getMessages());
		} catch (error) {
			console.error("Failed to fetch messages:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return {
		data,
		loading,
		refresh
	};
}
function useSettingsStore() {
	const [data, setData] = (0, import_react.useState)(DEFAULT_SETTINGS);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const refresh = async () => {
		setLoading(true);
		try {
			setData(await api.getSettings());
		} catch (error) {
			console.error("Failed to fetch settings:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return {
		data,
		loading,
		refresh
	};
}
function useActivitiesStore() {
	const [data, setData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const refresh = async () => {
		setLoading(true);
		try {
			setData(await api.getActivities());
		} catch (error) {
			console.error("Failed to fetch activities:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return {
		data,
		loading,
		refresh
	};
}
function useTestimonialsStore() {
	const [data, setData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const refresh = async () => {
		setLoading(true);
		try {
			setData(await api.getTestimonials());
		} catch (error) {
			console.error("Failed to fetch testimonials:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return {
		data,
		loading,
		refresh
	};
}
function useImpactStatsStore() {
	const [data, setData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const refresh = async () => {
		setLoading(true);
		try {
			setData(await api.getImpactStats());
		} catch (error) {
			console.error("Failed to fetch impact stats:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return {
		data,
		loading,
		refresh
	};
}
function useLeadersStore() {
	const [data, setData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const refresh = async () => {
		setLoading(true);
		try {
			setData(await api.getLeaders());
		} catch (error) {
			console.error("Failed to fetch leaders:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return {
		data,
		loading,
		refresh
	};
}
function usePartnersStore() {
	const [data, setData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const refresh = async () => {
		setLoading(true);
		try {
			setData(await api.getPartners());
		} catch (error) {
			console.error("Failed to fetch partners:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return {
		data,
		loading,
		refresh
	};
}
function useDonationsStore() {
	const [data, setData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const refresh = async () => {
		setLoading(true);
		try {
			setData(await api.getDonations());
		} catch (error) {
			console.error("Failed to fetch donations:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return {
		data,
		loading,
		refresh
	};
}
/** Convert a File to a data URL (for local preview/storage). */
async function fileToDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
//#endregion
export { useGalleryStore as a, useMessagesStore as c, useSettingsStore as d, useTestimonialsStore as f, useDonationsStore as i, usePartnersStore as l, fileToDataUrl as n, useImpactStatsStore as o, useVolunteersStore as p, useActivitiesStore as r, useLeadersStore as s, DEFAULT_SETTINGS as t, useProjectsStore as u };
