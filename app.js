// LUMI VIỆT NAM - Main Application
// Tác giả: Trần Minh Thương - Bộ phận T&S Miền Nam

// Mock data
const mockProducts = [
  {
    id: 1,
    dateReceived: "2024-01-15",
    dateSent: "2024-01-20",
    productCode: "LUMI-001",
    deviceName: "Lumi Smart Sensor Pro",
    distributor: "Nhà phân phối Miền Bắc",
    distributorPhone: "0901234567",
    distributorEmail: "mien-bac@lumi.vn",
    errorDescription:
      "Không kết nối được WiFi, đèn LED báo lỗi liên tục. Thiết bị không phản hồi khi kết nối qua ứng dụng mobile.",
    repairStatus: "completed",
    shippingStatus: "shipped",
    viettelTrackingCode: "115276011122",
    estimatedCompletion: "2024-01-20",
    actualCompletion: "2024-01-19",
    repairNotes: "Đã thay thế module WiFi và cập nhật firmware lên phiên bản mới nhất. Kiểm tra kết nối ổn định.",
    repairCost: 150000,
    partsCost: 150000,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    dateReceived: "2024-01-16",
    productCode: "LUMI-002",
    deviceName: "Lumi Gateway Controller",
    distributor: "Nhà phân phối Miền Nam",
    distributorPhone: "0902345678",
    distributorEmail: "mien-nam@lumi.vn",
    errorDescription:
      "LED báo lỗi liên tục, không nhận tín hiệu từ sensor. Gateway không thể điều khiển các thiết bị con.",
    repairStatus: "in-progress",
    shippingStatus: "not-sent",
    viettelTrackingCode: "VTP240116002",
    estimatedCompletion: "2024-01-25",
    repairNotes: "Đang kiểm tra bo mạch chính và thay thế IC điều khiển",
    repairCost: 0,
    partsCost: 0,
    createdAt: "2024-01-16T14:30:00Z",
  },
  {
    id: 3,
    dateReceived: "2024-01-17",
    productCode: "LUMI-003",
    deviceName: "Lumi Temperature Monitor",
    distributor: "Nhà phân phối Miền Trung",
    distributorPhone: "0903456789",
    distributorEmail: "mien-trung@lumi.vn",
    errorDescription: "Hiển thị sai nhiệt độ, chênh lệch 5-10 độ so với thực tế. Cảm biến nhiệt độ không chính xác.",
    repairStatus: "not-started",
    shippingStatus: "not-sent",
    viettelTrackingCode: "VTP240117003",
    estimatedCompletion: "2024-01-28",
    repairNotes: "",
    repairCost: 0,
    partsCost: 0,
    createdAt: "2024-01-17T09:15:00Z",
  },
  {
    id: 4,
    dateReceived: "2024-01-18",
    dateSent: "2024-01-23",
    productCode: "LUMI-004",
    deviceName: "Lumi Motion Detector",
    distributor: "Nhà phân phối Miền Bắc",
    distributorPhone: "0901234567",
    distributorEmail: "mien-bac@lumi.vn",
    errorDescription:
      "Cảm biến không hoạt động, không phát hiện chuyển động trong phạm vi 5m. Thiết bị không gửi tín hiệu cảnh báo.",
    repairStatus: "completed",
    shippingStatus: "shipped",
    viettelTrackingCode: "VTP240118004",
    estimatedCompletion: "2024-01-23",
    actualCompletion: "2024-01-22",
    repairNotes: "Đã thay thế cảm biến PIR và hiệu chỉnh độ nhạy. Kiểm tra hoạt động bình thường trong phạm vi 8m.",
    repairCost: 120000,
    partsCost: 120000,
    createdAt: "2024-01-18T11:20:00Z",
  },
  {
    id: 5,
    dateReceived: "2024-01-19",
    productCode: "LUMI-005",
    deviceName: "Lumi Smart Switch",
    distributor: "Nhà phân phối Đông Nam Bộ",
    distributorPhone: "0904567890",
    distributorEmail: "dong-nam-bo@lumi.vn",
    errorDescription:
      "Không điều khiển được từ xa qua app mobile. Công tắc hoạt động thủ công nhưng mất kết nối wireless.",
    repairStatus: "in-progress",
    shippingStatus: "not-sent",
    viettelTrackingCode: "VTP240119005",
    estimatedCompletion: "2024-01-26",
    repairNotes: "Đang cập nhật firmware và kiểm tra kết nối Bluetooth/WiFi",
    repairCost: 0,
    partsCost: 0,
    createdAt: "2024-01-19T16:45:00Z",
  },
]

const adminCredentials = {
  email: "admin@lumi.vn",
  password: "admin123",
}

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatDateShort(dateString) {
  return new Date(dateString).toLocaleDateString("vi-VN")
}

function calculateDays(startDate, endDate = null) {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

function isOverdue(dateReceived, status) {
  if (status === "completed") return false
  const received = new Date(dateReceived)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - received.getTime()) / (1000 * 60 * 60 * 24))
  return diffDays > 7
}

function generateTrackingCode() {
  const today = new Date()
  const dateStr = today.toISOString().slice(2, 10).replace(/-/g, "")
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `VTP${dateStr}${randomNum}`
}

function getRepairStatusBadge(status) {
  switch (status) {
    case "not-started":
      return `
        <div class="status-badge status-pending">
          ⏰ CHƯA SỬA
        </div>
      `
    case "in-progress":
      return `
        <div class="status-badge status-progress">
          ⚙️ ĐANG SỬA
        </div>
      `
    case "completed":
      return `
        <div class="status-badge status-completed">
          ✅ ĐÃ SỬA XONG
        </div>
      `
    default:
      return `<div class="badge">KHÔNG XÁC ĐỊNH</div>`
  }
}

function getShippingStatusBadge(status) {
  switch (status) {
    case "not-sent":
      return `
        <div class="badge badge-pending">
          ❌ CHƯA GỬI
        </div>
      `
    case "waiting-shipper":
      return `
        <div class="badge badge-progress">
          📦 CHỜ SHIPPER
        </div>
      `
    case "shipped":
      return `
        <div class="badge badge-completed">
          🚚 ĐÃ GỬI
        </div>
      `
    default:
      return `<div class="badge">KHÔNG XÁC ĐỊNH</div>`
  }
}

function getOverallStatus(repairStatus, shippingStatus) {
  if (repairStatus === "completed" && shippingStatus === "shipped") {
    return {
      status: "HOÀN THÀNH",
      color: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
      icon: "✅",
      description: "Sản phẩm đã được sửa xong và gửi trả về",
    }
  } else if (repairStatus === "completed" && shippingStatus !== "shipped") {
    return {
      status: "SỬA XONG - CHỜ GỬI",
      color: "linear-gradient(135deg, #007bff 0%, #6610f2 100%)",
      icon: "📦",
      description: "Sản phẩm đã sửa xong, đang chờ gửi trả về",
    }
  } else if (repairStatus === "in-progress") {
    return {
      status: "ĐANG XỬ LÝ",
      color: "linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)",
      icon: "⚙️",
      description: "Sản phẩm đang trong quá trình sửa chữa",
    }
  } else {
    return {
      status: "CHỜ XỬ LÝ",
      color: "linear-gradient(135deg, #dc3545 0%, #e83e8c 100%)",
      icon: "⏰",
      description: "Sản phẩm đang chờ được xử lý",
    }
  }
}

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

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <span>${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
      <span>${message}</span>
    </div>
  `

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

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-in"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

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

// Main Application Class
class LumiWarrantySystem {
  constructor() {
    this.products = [...mockProducts]
    this.currentUser = null
    this.editingProduct = null
    this.filteredProducts = [...this.products]

    this.init()
  }

  init() {
    this.bindEvents()
    this.loadUserSession()
    this.updateAdminStats()
    this.renderProductsList()
    this.populateDistributorFilter()
  }

  bindEvents() {
    // Search functionality
    const searchInput = document.getElementById("searchInput")
    const searchBtn = document.getElementById("searchBtn")

    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.trim()
      searchBtn.disabled = !value
    })

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !searchBtn.disabled) {
        this.handleSearch()
      }
    })

    searchBtn.addEventListener("click", () => this.handleSearch())

    // Admin functionality
    document.getElementById("adminBtn").addEventListener("click", () => {
      showElement("adminModal")
    })

    document.getElementById("closeModal").addEventListener("click", () => {
      hideElement("adminModal")
    })

    document.getElementById("adminForm").addEventListener("submit", (e) => {
      this.handleAdminLogin(e)
    })

    document.getElementById("logoutBtn").addEventListener("click", () => {
      this.handleLogout()
    })

    // Product management
    document.getElementById("addProductBtn").addEventListener("click", () => {
      this.showProductForm()
    })

    document.getElementById("closeProductModal").addEventListener("click", () => {
      this.hideProductForm()
    })

    document.getElementById("cancelProductBtn").addEventListener("click", () => {
      this.hideProductForm()
    })

    document.getElementById("productForm").addEventListener("submit", (e) => {
      this.handleProductSubmit(e)
    })

    document.getElementById("generateCodeBtn").addEventListener("click", () => {
      document.getElementById("viettelCode").value = generateTrackingCode()
    })

    // Try again button
    document.getElementById("tryAgainBtn").addEventListener("click", () => {
      this.clearSearch()
    })

    // Admin filters
    document.getElementById("adminSearch").addEventListener(
      "input",
      debounce((e) => this.filterProducts(), 300),
    )

    document.getElementById("statusFilter").addEventListener("change", () => {
      this.filterProducts()
    })

    document.getElementById("distributorFilter").addEventListener("change", () => {
      this.filterProducts()
    })

    // Modal overlay clicks
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        hideElement("adminModal")
        hideElement("productModal")
      }
    })
  }

  loadUserSession() {
    const savedUser = loadFromLocalStorage("lumiUser")
    if (savedUser) {
      this.currentUser = savedUser
      this.showAdminPanel()
    }
  }

  handleSearch() {
    const searchTerm = document.getElementById("searchInput").value.trim()
    if (!searchTerm) return

    hideElement("searchResult")
    hideElement("noResults")
    showElement("loadingState")

    setTimeout(() => {
      const result = this.products.find(
        (product) =>
          product.viettelTrackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.productCode.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      hideElement("loadingState")

      if (result) {
        this.displaySearchResult(result)
      } else {
        this.displayNoResults(searchTerm)
      }
    }, 1500)
  }

  displaySearchResult(product) {
    const overallStatus = getOverallStatus(product.repairStatus, product.shippingStatus)

    const resultHtml = `
      <div class="result-header" style="background: ${overallStatus.color}">
        <div class="result-status">
          ${overallStatus.icon}
          ${overallStatus.status}
        </div>
        <div class="result-description">${overallStatus.description}</div>
      </div>
      
      <div class="result-body">
        <div class="product-info">
          <div class="product-details">
            <div class="product-header">
              <h2>${product.deviceName}</h2>
              <div class="product-codes">
                <span class="code-badge primary">${product.productCode}</span>
                <span class="code-badge">
                  🚚 ${product.viettelTrackingCode}
                </span>
                ${
                  isOverdue(product.dateReceived, product.repairStatus)
                    ? `<span class="badge badge-error">
                    ⚠️ Quá hạn ${calculateDays(product.dateReceived)} ngày
                  </span>`
                    : ""
                }
              </div>
            </div>

            <div class="status-badges">
              <h3>Trạng thái chi tiết</h3>
              <div class="status-badges-content">
                ${getRepairStatusBadge(product.repairStatus)}
                ${getShippingStatusBadge(product.shippingStatus)}
              </div>
            </div>

            <div style="background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: var(--spacing-lg); margin: var(--spacing-lg) 0;">
              <div style="display: flex; align-items: center; gap: var(--spacing-sm); font-weight: 600; color: var(--gray-700); margin-bottom: var(--spacing-sm);">
                ⚠️ Mô tả lỗi:
              </div>
              <div style="color: var(--gray-600); line-height: 1.6;">${product.errorDescription}</div>
            </div>

            <div style="background: var(--lumi-primary); color: white; padding: var(--spacing-xl); border-radius: var(--radius-xl); margin: var(--spacing-lg) 0;">
              <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: var(--spacing-lg); display: flex; align-items: center; gap: var(--spacing-sm);">
                📅 Thời gian xử lý
              </div>
              <div style="display: grid; grid-template-columns: 1fr; gap: var(--spacing-lg);">
                <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); padding: var(--spacing-lg); border-radius: var(--radius-lg);">
                  <div style="display: flex; align-items: center; gap: var(--spacing-sm); font-weight: 600; margin-bottom: var(--spacing-sm);">
                    <div style="width: 12px; height: 12px; background: #28a745; border-radius: 50%;"></div>
                    Ngày nhận
                  </div>
                  <div style="font-size: 1.125rem; font-weight: 700; margin-bottom: var(--spacing-xs);">${formatDate(product.dateReceived)}</div>
                  <div style="font-size: 0.875rem; opacity: 0.8;">${calculateDays(product.dateReceived)} ngày trước</div>
                </div>
                
                ${
                  product.dateSent
                    ? `
                  <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); padding: var(--spacing-lg); border-radius: var(--radius-lg);">
                    <div style="display: flex; align-items: center; gap: var(--spacing-sm); font-weight: 600; margin-bottom: var(--spacing-sm);">
                      <div style="width: 12px; height: 12px; background: #007bff; border-radius: 50%;"></div>
                      Ngày gửi về
                    </div>
                    <div style="font-size: 1.125rem; font-weight: 700; margin-bottom: var(--spacing-xs);">${formatDate(product.dateSent)}</div>
                    <div style="font-size: 0.875rem; opacity: 0.8; display: flex; align-items: center; gap: var(--spacing-xs);">
                      ➡️ Thời gian xử lý: ${calculateDays(product.dateReceived, product.dateSent)} ngày
                    </div>
                  </div>
                `
                    : `
                  <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); padding: var(--spacing-lg); border-radius: var(--radius-lg); border: 2px dashed rgba(255, 255, 255, 0.3);">
                    <div style="display: flex; align-items: center; gap: var(--spacing-sm); font-weight: 600; margin-bottom: var(--spacing-sm);">
                      <div style="width: 12px; height: 12px; background: #ffc107; border-radius: 50%; animation: pulse 2s infinite;"></div>
                      Chưa gửi về
                    </div>
                    <div style="font-size: 1.125rem; font-weight: 700; margin-bottom: var(--spacing-xs);">Đang xử lý...</div>
                    <div style="font-size: 0.875rem; opacity: 0.8;">
                      Dự kiến: ${formatDateShort(product.estimatedCompletion)}
                    </div>
                  </div>
                `
                }
              </div>
            </div>

            ${
              product.repairCost > 0
                ? `
              <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: var(--spacing-xl); border-radius: var(--radius-xl); margin: var(--spacing-lg) 0;">
                <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: var(--spacing-lg); display: flex; align-items: center; gap: var(--spacing-sm);">
                  💰 Chi phí linh kiện
                </div>
                <div style="background: rgba(255, 255, 255, 0.2); padding: var(--spacing-lg); border-radius: var(--radius-lg); text-align: center;">
                  <div style="font-size: 0.875rem; opacity: 0.9; margin-bottom: var(--spacing-sm);">Tổng chi phí linh kiện</div>
                  <div style="font-size: 2rem; font-weight: 800; margin-bottom: 0;">${formatCurrency(product.repairCost)}</div>
                </div>
              </div>
            `
                : ""
            }

            <div style="display: grid; grid-template-columns: 1fr; gap: var(--spacing-lg); margin: var(--spacing-lg) 0;">
              <div style="background: rgba(0, 140, 79, 0.05); border: 1px solid var(--lumi-primary); padding: var(--spacing-lg); border-radius: var(--radius-lg);">
                <div style="display: flex; align-items: center; gap: var(--spacing-sm); font-weight: 600; color: var(--gray-700); margin-bottom: var(--spacing-sm);">
                  📍 Nhà phân phối
                </div>
                <div style="font-weight: 700; color: var(--gray-900); margin-bottom: var(--spacing-xs);">${product.distributor}</div>
              </div>
              <div style="background: var(--gray-50); border: 1px solid var(--gray-200); padding: var(--spacing-lg); border-radius: var(--radius-lg);">
                <div style="display: flex; align-items: center; gap: var(--spacing-sm); font-weight: 600; color: var(--gray-700); margin-bottom: var(--spacing-sm);">
                  📞 Liên hệ
                </div>
                <div style="font-weight: 700; color: var(--gray-900); margin-bottom: var(--spacing-xs);">${product.distributorPhone}</div>
                <div style="color: var(--gray-600); font-size: 0.875rem;">${product.distributorEmail}</div>
              </div>
            </div>

            ${
              product.repairNotes
                ? `
              <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%); border: 1px solid rgba(99, 102, 241, 0.2); padding: var(--spacing-lg); border-radius: var(--radius-lg); margin: var(--spacing-lg) 0;">
                <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm); color: #6366f1; font-weight: 600;">
                  ⚙️ Ghi chú sửa chữa:
                </div>
                <div style="color: #4338ca; font-size: 1.125rem; line-height: 1.6; margin-bottom: 0;">${product.repairNotes}</div>
              </div>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `

    document.getElementById("searchResult").innerHTML = resultHtml
    showElement("searchResult")
  }

  displayNoResults(searchTerm) {
    document.getElementById("searchTerm").textContent = searchTerm
    showElement("noResults")
  }

  clearSearch() {
    document.getElementById("searchInput").value = ""
    document.getElementById("searchBtn").disabled = true
    hideElement("searchResult")
    hideElement("noResults")
  }

  handleAdminLogin(e) {
    e.preventDefault()

    const email = document.getElementById("adminEmail").value
    const password = document.getElementById("adminPassword").value
    const errorElement = document.getElementById("loginError")

    if (email === adminCredentials.email && password === adminCredentials.password) {
      this.currentUser = { email, role: "admin" }
      saveToLocalStorage("lumiUser", this.currentUser)

      hideElement("adminModal")
      this.showAdminPanel()
      showNotification("Đăng nhập thành công!", "success")
    } else {
      errorElement.textContent = "Email hoặc mật khẩu không đúng"
      errorElement.classList.remove("hidden")
    }
  }

  handleLogout() {
    this.currentUser = null
    localStorage.removeItem("lumiUser")
    this.hideAdminPanel()
    showNotification("Đã đăng xuất thành công!", "success")
  }

  showAdminPanel() {
    hideElement("adminModal")
    document.querySelector(".main-content").classList.add("hidden")
    document.querySelector(".app-footer").classList.add("hidden")
    showElement("adminPanel")
    this.updateAdminStats()
    this.renderProductsList()
  }

  hideAdminPanel() {
    hideElement("adminPanel")
    document.querySelector(".main-content").classList.remove("hidden")
    document.querySelector(".app-footer").classList.remove("hidden")
  }

  updateAdminStats() {
    const stats = {
      total: this.products.length,
      pending: this.products.filter((p) => p.repairStatus === "not-started").length,
      progress: this.products.filter((p) => p.repairStatus === "in-progress").length,
      completed: this.products.filter((p) => p.repairStatus === "completed").length,
    }

    document.getElementById("totalProducts").textContent = stats.total
    document.getElementById("pendingProducts").textContent = stats.pending
    document.getElementById("progressProducts").textContent = stats.progress
    document.getElementById("completedProducts").textContent = stats.completed
  }

  populateDistributorFilter() {
    const distributorFilter = document.getElementById("distributorFilter")
    const uniqueDistributors = [...new Set(this.products.map((p) => p.distributor))]

    distributorFilter.innerHTML = '<option value="all">Tất cả nhà phân phối</option>'

    uniqueDistributors.forEach((distributor) => {
      const option = document.createElement("option")
      option.value = distributor
      option.textContent = distributor
      distributorFilter.appendChild(option)
    })
  }

  filterProducts() {
    const searchTerm = document.getElementById("adminSearch").value.toLowerCase()
    const statusFilter = document.getElementById("statusFilter").value
    const distributorFilter = document.getElementById("distributorFilter").value

    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch =
        product.productCode.toLowerCase().includes(searchTerm) ||
        product.deviceName.toLowerCase().includes(searchTerm) ||
        product.viettelTrackingCode.toLowerCase().includes(searchTerm) ||
        product.distributor.toLowerCase().includes(searchTerm)

      const matchesStatus = statusFilter === "all" || product.repairStatus === statusFilter
      const matchesDistributor = distributorFilter === "all" || product.distributor === distributorFilter

      return matchesSearch && matchesStatus && matchesDistributor
    })

    this.renderProductsList()
  }

  renderProductsList() {
    const container = document.getElementById("productsList")

    if (this.filteredProducts.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">📦</div>
          <h3 class="no-results-title">Không tìm thấy sản phẩm</h3>
          <p class="no-results-description">Vui lòng thử với bộ lọc khác</p>
        </div>
      `
      return
    }

    const productsHtml = this.filteredProducts
      .map(
        (product) => `
      <div class="product-card ${isOverdue(product.dateReceived, product.repairStatus) ? "overdue" : ""}">
        <div class="product-card-header">
          <div class="product-card-title">
            ${product.deviceName}
            ${
              isOverdue(product.dateReceived, product.repairStatus)
                ? `<span class="badge badge-error">
                ⚠️ Quá hạn
              </span>`
                : ""
            }
          </div>
          <div class="product-card-codes">
            <span class="code-badge primary">${product.productCode}</span>
            <span class="code-badge">
              🚚 ${product.viettelTrackingCode}
            </span>
          </div>
        </div>

        <div class="product-card-body">
          <div style="background: var(--gray-50); padding: var(--spacing-md); border-radius: var(--radius-lg); margin-bottom: var(--spacing-lg);">
            <h4 style="font-size: 0.875rem; font-weight: 600; color: var(--gray-700); margin-bottom: var(--spacing-sm);">Mô tả lỗi:</h4>
            <p style="color: var(--gray-600); margin-bottom: 0; line-height: 1.5;">${product.errorDescription}</p>
          </div>

          <div class="product-card-info">
            <div class="product-card-info-item">
              📅 Ngày nhận: <strong>${formatDateShort(product.dateReceived)}</strong>
            </div>
            <div class="product-card-info-item">
              📍 Nhà phân phối: <strong>${product.distributor}</strong>
            </div>
            <div class="product-card-info-item">
              📞 SĐT: <strong>${product.distributorPhone}</strong>
            </div>
            <div class="product-card-info-item">
              📧 Email: <strong>${product.distributorEmail}</strong>
            </div>
          </div>

          ${
            product.repairNotes
              ? `
            <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%); border: 1px solid rgba(99, 102, 241, 0.2); padding: var(--spacing-lg); border-radius: var(--radius-lg); margin: var(--spacing-lg) 0;">
              <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm); color: #6366f1; font-weight: 600;">
                ⚙️ Ghi chú sửa chữa:
              </div>
              <div style="color: #4338ca; font-size: 1.125rem; line-height: 1.6; margin-bottom: 0;">${product.repairNotes}</div>
            </div>
          `
              : ""
          }
        </div>

        <div class="product-card-footer">
          <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-sm);">
            ${getRepairStatusBadge(product.repairStatus)}
            ${getShippingStatusBadge(product.shippingStatus)}
          </div>
          <div class="product-card-actions">
            <button class="btn btn-secondary btn-icon" onclick="app.editProduct(${product.id})" title="Chỉnh sửa">
              ✏️
            </button>
            <button class="btn btn-secondary btn-icon btn-danger" onclick="app.deleteProduct(${product.id})" title="Xóa">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `,
      )
      .join("")

    container.innerHTML = productsHtml
  }

  showProductForm(product = null) {
    this.editingProduct = product

    const title = document.getElementById("productModalTitle")
    const submitBtn = document.getElementById("submitBtnText")

    if (product) {
      title.textContent = "Chỉnh sửa sản phẩm"
      submitBtn.textContent = "Cập nhật sản phẩm"
      this.populateProductForm(product)
    } else {
      title.textContent = "Thêm sản phẩm mới"
      submitBtn.textContent = "Thêm sản phẩm"
      this.resetProductForm()
    }

    showElement("productModal")
  }

  hideProductForm() {
    hideElement("productModal")
    this.editingProduct = null
    this.resetProductForm()
  }

  populateProductForm(product) {
    document.getElementById("dateReceived").value = product.dateReceived
    document.getElementById("productCode").value = product.productCode
    document.getElementById("deviceName").value = product.deviceName
    document.getElementById("viettelCode").value = product.viettelTrackingCode
    document.getElementById("distributor").value = product.distributor
    document.getElementById("distributorPhone").value = product.distributorPhone
    document.getElementById("distributorEmail").value = product.distributorEmail
    document.getElementById("errorDescription").value = product.errorDescription
    document.getElementById("repairStatus").value = product.repairStatus
    document.getElementById("shippingStatus").value = product.shippingStatus
    document.getElementById("estimatedCompletion").value = product.estimatedCompletion
    document.getElementById("partsCost").value = product.partsCost
    document.getElementById("repairNotes").value = product.repairNotes || ""
  }

  resetProductForm() {
    document.getElementById("productForm").reset()

    const today = new Date().toISOString().split("T")[0]
    document.getElementById("dateReceived").value = today

    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    document.getElementById("estimatedCompletion").value = nextWeek.toISOString().split("T")[0]
  }

  handleProductSubmit(e) {
    e.preventDefault()

    const productData = {
      dateReceived: document.getElementById("dateReceived").value,
      productCode: document.getElementById("productCode").value,
      deviceName: document.getElementById("deviceName").value,
      viettelTrackingCode: document.getElementById("viettelCode").value,
      distributor: document.getElementById("distributor").value,
      distributorPhone: document.getElementById("distributorPhone").value,
      distributorEmail: document.getElementById("distributorEmail").value,
      errorDescription: document.getElementById("errorDescription").value,
      repairStatus: document.getElementById("repairStatus").value,
      shippingStatus: document.getElementById("shippingStatus").value,
      estimatedCompletion: document.getElementById("estimatedCompletion").value,
      partsCost: Number.parseInt(document.getElementById("partsCost").value) || 0,
      repairNotes: document.getElementById("repairNotes").value,
    }

    productData.repairCost = productData.partsCost

    if (this.editingProduct) {
      const index = this.products.findIndex((p) => p.id === this.editingProduct.id)
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...productData }
        showNotification("Cập nhật sản phẩm thành công!", "success")
      }
    } else {
      const newProduct = {
        id: Date.now(),
        ...productData,
        createdAt: new Date().toISOString(),
      }
      this.products.unshift(newProduct)
      showNotification("Thêm sản phẩm thành công!", "success")
    }

    this.hideProductForm()
    this.updateAdminStats()
    this.filterProducts()
    this.populateDistributorFilter()
  }

  editProduct(id) {
    const product = this.products.find((p) => p.id === id)
    if (product) {
      this.showProductForm(product)
    }
  }

  deleteProduct(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      this.products = this.products.filter((p) => p.id !== id)
      this.updateAdminStats()
      this.filterProducts()
      this.populateDistributorFilter()
      showNotification("Xóa sản phẩm thành công!", "success")
    }
  }
}

// Add notification styles
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

// Initialize application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new LumiWarrantySystem()
  console.log("🚀 LUMI Warranty System initialized successfully!")
  console.log("👨‍💻 Tác giả: Trần Minh Thương - Bộ phận T&S Miền Nam")
})
