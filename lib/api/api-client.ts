// API client for making requests to our backend

// Generic fetch function with error handling
async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API request failed: ${url}`, error)
    throw error
  }
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return fetchAPI("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  },
}

// Users API
export const usersAPI = {
  getAll: async () => {
    return fetchAPI("/api/users")
  },

  getById: async (id: string) => {
    return fetchAPI(`/api/users/${id}`)
  },

  create: async (userData: any) => {
    return fetchAPI("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
  },

  update: async (id: string, userData: any) => {
    return fetchAPI(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
  },

  delete: async (id: string) => {
    return fetchAPI(`/api/users/${id}`, {
      method: "DELETE",
    })
  },
}

// Reports API
export const reportsAPI = {
  getAll: async () => {
    return fetchAPI("/api/reports")
  },

  getByUserId: async (userId: string) => {
    return fetchAPI(`/api/reports?userId=${userId}`)
  },

  getById: async (id: string) => {
    return fetchAPI(`/api/reports/${id}`)
  },

  create: async (reportData: any) => {
    return fetchAPI("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    })
  },

  update: async (id: string, reportData: any) => {
    return fetchAPI(`/api/reports/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    })
  },

  delete: async (id: string) => {
    return fetchAPI(`/api/reports/${id}`, {
      method: "DELETE",
    })
  },

  generateReport: async (reportConfig: any) => {
    return fetchAPI("/api/reports/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportConfig),
    })
  },

  downloadReport: async (type: string, format: string) => {
    return fetchAPI(`/api/reports/download?type=${type}&format=${format}`)
  },
}

// Courses API
export const coursesAPI = {
  getAll: async () => {
    return fetchAPI("/api/courses")
  },

  getById: async (id: string) => {
    return fetchAPI(`/api/courses/${id}`)
  },

  create: async (courseData: any) => {
    return fetchAPI("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData),
    })
  },

  update: async (id: string, courseData: any) => {
    return fetchAPI(`/api/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData),
    })
  },

  delete: async (id: string) => {
    return fetchAPI(`/api/courses/${id}`, {
      method: "DELETE",
    })
  },
}

// Notifications API
export const notificationsAPI = {
  getAll: async () => {
    return fetchAPI("/api/notifications")
  },

  getByUserId: async (userId: string) => {
    return fetchAPI(`/api/notifications?userId=${userId}`)
  },

  getById: async (id: number) => {
    return fetchAPI(`/api/notifications/${id}`)
  },

  create: async (notificationData: any) => {
    return fetchAPI("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notificationData),
    })
  },

  update: async (id: number, notificationData: any) => {
    return fetchAPI(`/api/notifications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notificationData),
    })
  },

  delete: async (id: number) => {
    return fetchAPI(`/api/notifications/${id}`, {
      method: "DELETE",
    })
  },

  markAsRead: async (id: number) => {
    return fetchAPI("/api/notifications/mark-read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
  },

  markAllAsRead: async (userId: string) => {
    return fetchAPI("/api/notifications/mark-all-read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
  },
}

// Settings API
export const settingsAPI = {
  getAll: async () => {
    return fetchAPI("/api/settings")
  },

  getByCategory: async (category: string) => {
    return fetchAPI(`/api/settings?category=${category}`)
  },

  update: async (key: string, value: any) => {
    return fetchAPI("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    })
  },
}

