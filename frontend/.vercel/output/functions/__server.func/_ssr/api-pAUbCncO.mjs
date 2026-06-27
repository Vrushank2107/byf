//#region node_modules/.nitro/vite/services/ssr/assets/api-pAUbCncO.js
var API_URL = "http://localhost:3001";
async function request(endpoint, options = {}) {
	const url = `${API_URL}${endpoint}`;
	const headers = {
		"Content-Type": "application/json",
		...options.headers || {}
	};
	const response = await fetch(url, {
		...options,
		headers,
		credentials: "include"
	});
	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: "Request failed" }));
		throw new Error(error.message || error.error || "Request failed");
	}
	return response.json();
}
var api = {
	getProjects: () => request("/api/projects"),
	getProject: (slug) => request(`/api/projects/${slug}`),
	createProject: (data) => request("/api/projects", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	updateProject: (id, data) => request(`/api/projects/${id}`, {
		method: "PUT",
		body: JSON.stringify(data)
	}),
	deleteProject: (id) => request(`/api/projects/${id}`, { method: "DELETE" }),
	getGallery: () => request("/api/gallery"),
	getGalleryByTag: (tag) => request(`/api/gallery/tag/${tag}`),
	createGalleryItem: (data) => request("/api/gallery", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	deleteGalleryItem: (id) => request(`/api/gallery/${id}`, { method: "DELETE" }),
	getEvents: () => request("/api/events"),
	getUpcomingEvents: () => request("/api/events/upcoming"),
	createEvent: (data) => request("/api/events", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	updateEvent: (id, data) => request(`/api/events/${id}`, {
		method: "PUT",
		body: JSON.stringify(data)
	}),
	deleteEvent: (id) => request(`/api/events/${id}`, { method: "DELETE" }),
	getBlogPosts: () => request("/api/blog"),
	getBlogPost: (slug) => request(`/api/blog/${slug}`),
	createBlogPost: (data) => request("/api/blog", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	updateBlogPost: (id, data) => request(`/api/blog/${id}`, {
		method: "PUT",
		body: JSON.stringify(data)
	}),
	deleteBlogPost: (id) => request(`/api/blog/${id}`, { method: "DELETE" }),
	getVolunteers: () => request("/api/volunteers"),
	createVolunteer: (data) => request("/api/volunteers", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	markVolunteerReviewed: (id) => request(`/api/volunteers/${id}/review`, { method: "PUT" }),
	deleteVolunteer: (id) => request(`/api/volunteers/${id}`, { method: "DELETE" }),
	getMessages: () => request("/api/messages"),
	createMessage: (data) => request("/api/messages", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	markMessageRead: (id) => request(`/api/messages/${id}/read`, { method: "PUT" }),
	deleteMessage: (id) => request(`/api/messages/${id}`, { method: "DELETE" }),
	getSettings: () => request("/api/settings"),
	updateSettings: (data) => request("/api/settings", {
		method: "PUT",
		body: JSON.stringify(data)
	}),
	login: (password) => request("/api/auth/login", {
		method: "POST",
		body: JSON.stringify({ password })
	}),
	checkSession: () => request("/api/auth/session"),
	logout: () => request("/api/auth/logout", { method: "POST" }),
	uploadImage: async (file, folder) => {
		const formData = new FormData();
		formData.append("file", file);
		if (folder) formData.append("folder", folder);
		const response = await fetch(`${API_URL}/api/upload`, {
			method: "POST",
			credentials: "include",
			body: formData
		});
		if (!response.ok) throw new Error("Upload failed");
		return response.json();
	},
	getActivities: () => request("/api/activities"),
	createActivity: (data) => request("/api/activities", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	updateActivity: (id, data) => request(`/api/activities/${id}`, {
		method: "PUT",
		body: JSON.stringify(data)
	}),
	deleteActivity: (id) => request(`/api/activities/${id}`, { method: "DELETE" }),
	getTestimonials: () => request("/api/testimonials"),
	createTestimonial: (data) => request("/api/testimonials", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	updateTestimonial: (id, data) => request(`/api/testimonials/${id}`, {
		method: "PUT",
		body: JSON.stringify(data)
	}),
	deleteTestimonial: (id) => request(`/api/testimonials/${id}`, { method: "DELETE" }),
	getImpactStats: () => request("/api/impact-stats"),
	createImpactStat: (data) => request("/api/impact-stats", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	updateImpactStat: (id, data) => request(`/api/impact-stats/${id}`, {
		method: "PUT",
		body: JSON.stringify(data)
	}),
	deleteImpactStat: (id) => request(`/api/impact-stats/${id}`, { method: "DELETE" }),
	getLeaders: () => request("/api/leaders"),
	createLeader: (data) => request("/api/leaders", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	updateLeader: (id, data) => request(`/api/leaders/${id}`, {
		method: "PUT",
		body: JSON.stringify(data)
	}),
	deleteLeader: (id) => request(`/api/leaders/${id}`, { method: "DELETE" }),
	getPartners: () => request("/api/partners"),
	createPartner: (data) => request("/api/partners", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	updatePartner: (id, data) => request(`/api/partners/${id}`, {
		method: "PUT",
		body: JSON.stringify(data)
	}),
	deletePartner: (id) => request(`/api/partners/${id}`, { method: "DELETE" }),
	getDonations: () => request("/api/donations"),
	getDonation: (id) => request(`/api/donations/${id}`),
	createDonationOrder: (data) => request("/api/donations/create-order", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	verifyDonation: (data) => request("/api/donations/verify", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	deleteDonation: (id) => request(`/api/donations/${id}`, { method: "DELETE" })
};
//#endregion
export { api as t };
