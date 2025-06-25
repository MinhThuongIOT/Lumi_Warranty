// LUMI VIỆT NAM - Utility Functions
// Tác giả: Trần Minh Thương - Bộ phận T&S Miền Nam

// Format currency in Vietnamese Dong
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}

// Format date in Vietnamese
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Format date short
function formatDateShort(dateString) {
  return new Date(dateString).toLocaleDateString("vi-VN")
}

// Calculate days between dates
function calculateDays(startDate, endDate = null) {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Check if product is overdue
function isOverdue(dateReceived, status) {
  if (status === "completed") return false
  const received = new Date(dateReceived)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - received.getTime()) / (1000 * 60 * 60 * 24))
  return diffDays > 7
}

// Generate tracking code
function generateTrackingCode() {
  const today = new Date()
  const dateStr = today.toISOString().slice(2, 10).replace(/-/g, "")
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `VTP${dateStr}${randomNum}`
}

// Get repair status badge HTML
function getRepairStatusBadge(status) {
  switch (status) {
    case "not-started":
      return `
        <div class="status-badge status-pending">
          <i data-lucide="clock"></i>
          CHƯA SỬA
        </div>
      `
    case "in-progress":
      return `
        <div class="status-badge status-progress">
          <i data-lucide="settings"></i>
          ĐANG SỬA
        </div>
      `
    case "completed":
      return `
        <div class="status-badge status-completed">
          <i data-lucide="check-circle"></i>
          ĐÃ SỬA XONG
        </div>
      `
    default:
      return `<div class="badge">KHÔNG XÁC ĐỊNH</div>`
  }
}

// Get shipping status badge HTML
function getShippingStatusBadge(status) {
  switch (status) {
    case "not-sent":
      return `
        <div class="badge badge-error">
          <i data-lucide="alert-circle"></i>
          CHƯA GỬI
        </div>
      `
    case "waiting-shipper":
      return `
        <div class="badge badge-pending">
          <i data-lucide="package"></i>
          CHỜ SHIPPER
        </div>
      `
    case "shipped":
      return `
        <div class="badge badge-completed">
          <i data-lucide="truck"></i>
          ĐÃ GỬI
        </div>
      `
    default:
      return `<div class="badge">KHÔNG XÁC ĐỊNH</div>`
  }
}

// Get overall status
function getOverallStatus(repairStatus, shippingStatus) {
  if (repairStatus === "completed" && shippingStatus === "shipped") {
    return {
      status: "HOÀN THÀNH",
      color: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
      icon: "check-circle",
      description: "Sản phẩm đã được sửa xong và gửi trả về",
    }
  } else if (repairStatus === "completed" && shippingStatus !== "shipped") {
    return {
      status: "SỬA XONG - CHỜ GỬI",
      color: "linear-gradient(135deg, #007bff 0%, #6610f2 100%)",
      icon: "package",
      description: "Sản phẩm đã sửa xong, đang chờ gửi trả về",
    }
  } else if (repairStatus === "in-progress") {
    return {
      status: "ĐANG XỬ LÝ",
      color: "linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)",
      icon: "settings",
      description: "Sản phẩm đang trong quá trình sửa chữa",
    }
  } else {
    return {
      status: "CHỜ XỬ LÝ",
      color: "linear-gradient(135deg, #dc3545 0%, #e83e8c 100%)",
      icon: "clock",
      description: "Sản phẩm đang chờ được xử lý",
    }
  }
}

// Show/hide elements
function showElement(elementId) {
  const element = document.getElementById(elementId)
  if (element) {
    element.classList.remove("hidden")
    element.classList.add("fade-in")
  }
}

function hideElement(elementId) {
  const element = document.getElementById(elementId)
  if (element) {
    element.classList.add("hidden")
    element.classList.remove("fade-in")
  }
}

// Show notification
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i data-lucide="${type === "success" ? "check-circle" : type === "error" ? "alert-circle" : "info"}"></i>
      <span>${message}</span>
    </div>
  `

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "success" ? "#d4edda" : type === "error" ? "#f8d7da" : "#d1ecf1"};
    color: ${type === "success" ? "#155724" : type === "error" ? "#721c24" : "#0c5460"};
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: slideInRight 0.3s ease-out;
    max-width: 400px;
    border: 1px solid ${type === "success" ? "#c3e6cb" : type === "error" ? "#f5c6cb" : "#bee5eb"};
  `

  // Add to body
  document.body.appendChild(notification)

  // Initialize icons
  window.lucide.createIcons()

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-in"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Add notification animations to CSS
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`
document.head.appendChild(notificationStyles)

// Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Local storage helpers
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error loading from localStorage:", error)
    return null
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    formatCurrency,
    formatDate,
    formatDateShort,
    calculateDays,
    isOverdue,
    generateTrackingCode,
    getRepairStatusBadge,
    getShippingStatusBadge,
    getOverallStatus,
    showElement,
    hideElement,
    showNotification,
    debounce,
    saveToLocalStorage,
    loadFromLocalStorage,
  }
}
