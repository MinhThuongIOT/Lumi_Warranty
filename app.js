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
  closeAllModals(); // Đóng tất cả modal trước khi mở modal mới
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

// --- Chatbot visibility logic ---
function showChatbotToggle() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    if (chatbotToggle) chatbotToggle.style.display = 'flex';
}
function hideChatbotToggle() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    if (chatbotToggle) chatbotToggle.style.display = 'none';
    const chatbotContainer = document.getElementById('chatbotContainer');
    if (chatbotContainer) chatbotContainer.style.display = 'none';
}

// Call this after successful admin login
function handleAdminLoginSuccess() {
    // ...existing code for showing admin panel...
    showChatbotToggle();
}
// Call this after admin logs out
function handleAdminLogout() {
    // ...existing code for hiding admin panel...
    hideChatbotToggle();
}

// Example: integrate with your login logic
const adminForm = document.getElementById('adminForm');
if (adminForm) {
    adminForm.addEventListener('submit', function(e) {
        // ...existing code...
        e.preventDefault();
        // ...validate login...
        // If login success:
        localStorage.setItem('isAdminLoggedIn', 'true');
        handleAdminLoginSuccess();
        // ...existing code...
    });
}
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isAdminLoggedIn');
        handleAdminLogout();
        // ...existing code...
    });
}

// On page load, set chatbot toggle visibility
window.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('isAdminLoggedIn') === 'true') {
        showChatbotToggle();
    } else {
        hideChatbotToggle();
    }
});

// Đảm bảo chỉ một modal được mở tại một thời điểm
function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.add('hidden');
    modal.classList.remove('fade-in');
  });
}

// Main Application Class
class LumiWarrantySystem {
  constructor() {
    // Load từ localStorage nếu có, nếu không thì lấy mockProducts
    const savedProducts = loadFromLocalStorage("lumiProducts");
    let products = Array.isArray(savedProducts) ? savedProducts : [...mockProducts];
    // Đảm bảo tất cả sản phẩm đều có đủ trường mới
    products = products.map((p) => ({
      id: p.id,
      dateReceived: p.dateReceived || "",
      viettelTrackingCode: p.viettelTrackingCode || "",
      deviceQuantity: p.deviceQuantity || 1,
      deviceType: p.deviceType || "",
      distributor: p.distributor || "",
      distributorAddress: p.distributorAddress || "",
      errorType: p.errorType || "",
      errorDescription: p.errorDescription || "",
      repairStatus: p.repairStatus || "not-started",
      estimatedCompletion: p.estimatedCompletion || "",
      shippingStatus: p.shippingStatus || "not-sent",
      partsCost: typeof p.partsCost === 'number' ? p.partsCost : 0,
      createdAt: p.createdAt || new Date().toISOString(),
      // Các trường cũ giữ lại nếu cần
      productCode: p.productCode || "",
      deviceName: p.deviceName || "",
      repairNotes: p.repairNotes || "",
      distributorPhone: p.distributorPhone || "",
      distributorEmail: p.distributorEmail || "",
    }));
    // Lưu lại nếu có cập nhật cấu trúc
    saveToLocalStorage("lumiProducts", products);
    this.products = products;
    this.currentUser = null;
    this.editingProduct = null;
    this.filteredProducts = [...this.products];
    this.init();
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
      closeAllModals();
      showElement("adminModal");
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
    const totalCost = product.repairCost > 0 ? `${formatCurrency(product.repairCost)}` : '<span style="font-size:1.1rem;font-weight:600;">Miễn phí</span>';

    // Danh sách sản phẩm trong đơn hàng (hiện tại mỗi đơn là 1 sản phẩm, có thể mở rộng sau)
    const productListHtml = `
      <div style="margin-bottom:1.2rem;">
        <div style="font-weight:700; font-size:1.08rem; color:#008c4f; margin-bottom:0.5rem; letter-spacing:0.2px;">Đơn hàng này gồm các sản phẩm:</div>
        <ul style="margin:0; padding-left:1.2rem; color:#374151; font-size:1.02rem;">
          <li><b>${product.deviceName}</b> <span style=\"color:#888; font-size:0.98rem;\">(${product.productCode})</span></li>
        </ul>
      </div>
    `;

    const resultHtml = `
      <div class="result-card" style="max-width: 900px; margin: 2.5rem auto; background: #fff; border-radius: 2rem; box-shadow: 0 8px 32px rgba(0,0,0,0.10); overflow: hidden;">
        <!-- Header trạng thái tổng thể -->
        <div style="background: ${overallStatus.color}; color: #fff; padding: 2rem 2.5rem 1.5rem 2.5rem; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; border-radius: 2rem 2rem 0 0;">
          <div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: rgba(255,255,255,0.12); border-radius: 1.5rem;">
            <i data-lucide="${overallStatus.icon}" style="width: 2.5rem; height: 2.5rem;"></i>
          </div>
          <div style="flex: 1; min-width: 200px;">
            <div style="font-size: 1.5rem; font-weight: 800; letter-spacing: 0.5px;">${overallStatus.status}</div>
            <div style="font-size: 1.1rem; font-weight: 500; opacity: 0.95; margin-top: 0.25rem;">${overallStatus.description}</div>
          </div>
          <div style="font-size: 1.1rem; font-weight: 600; opacity: 0.9; text-align: right, min-width: 180px;">
            Mã đơn: <span style="font-family: monospace; background: rgba(255,255,255,0.18); padding: 0.25rem 0.75rem; border-radius: 1rem;">${product.viettelTrackingCode}</span>
          </div>
        </div>
        <!-- Nội dung chia 2 cột -->
        <div style="display: flex; flex-wrap: wrap; gap: 2.5rem; padding: 2.5rem; align-items: stretch; justify-content: center; background: #f6f8fa; border-radius: 0 0 2rem 2rem;">
          <!-- Cột trái: Sản phẩm, lỗi, nhà phân phối -->
          <div style="flex: 1 1 340px; min-width: 300px; max-width: 440px; display: flex; flex-direction: column; gap: 1.5rem; justify-content: flex-start; background: #fff; border-radius: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 2rem 1.5rem; border: 1.5px solid #e0e7ef;">
            ${productListHtml}
            <div style="margin-bottom:0.7rem;">
              <div style="font-weight:700; color:#d32f2f; font-size:1.08rem; margin-bottom:0.3rem;">Lỗi sản phẩm:</div>
              <div style="color:#222; font-size:1.05rem; font-weight:400; line-height:1.6;">${product.errorDescription}</div>
            </div>
            <div>
              <div style="font-weight:700; color:#008c4f; font-size:1.08rem; margin-bottom:0.3rem;">Nhà phân phối:</div>
              <div style="color:#222; font-size:1.05rem; font-weight:600;">${product.distributor}</div>
            </div>
          </div>
          <!-- Cột phải: Thời gian & chi phí -->
          <div style="flex: 1 1 280px; min-width: 240px; max-width: 340px; display: flex; flex-direction: column; gap: 2.2rem; justify-content: center; align-items: center; background: #fff; border-radius: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 2rem 1.2rem; border: 1.5px solid #e0e7ef;">
            <div style="width: 100%; background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); border-radius: 1rem; padding: 1.3rem 1rem; display: flex; flex-direction: column; align-items: flex-start; gap: 0.7rem; border: 2.5px solid #60a5fa; box-shadow: 0 2px 8px rgba(30,58,138,0.07); font-weight: 600;">
              <div style="width:100%; text-align:center; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.25rem; font-size:1.1rem; color:#2563eb;">
                <i data-lucide=\"calendar\"></i> Thời gian xử lý
              </div>
              <div style=\"font-size: 1rem; font-weight: 500; color: #3b82f6; text-align:left; width:100%;\">Ngày nhận: <b style=\"color:#222; font-weight:600;\">${formatDateShort(product.dateReceived)}</b></div>
              ${product.estimatedCompletion ? `<div style=\"font-size: 1rem; font-weight: 500; color: #3b82f6; text-align:left; width:100%;\">Dự kiến hoàn thành: <b style=\"color:#222; font-weight:600;\">${formatDateShort(product.estimatedCompletion)}</b></div>` : ""}
            </div>
            <div style="width: 100%; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); border-radius: 1rem; padding: 1.3rem 1rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.7rem; border: 2.5px solid #43e97b; box-shadow: 0 4px 18px -4px #43e97b33;">
              <div style="font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; color: #008c4f;">
                <i data-lucide=\"credit-card\"></i> Tổng chi phí sửa chữa
              </div>
              <div style="font-size: 2.1rem; font-weight: 900; letter-spacing: 1px; color: #006b3d;">${totalCost}</div>
            </div>
          </div>
        </div>
      </div>
      <style>
        @media (max-width: 1100px) {
          .result-card { max-width: 99vw !important; }
        }
        @media (max-width: 900px) {
          .result-card { padding: 1.2rem !important; }
          .result-card > div { gap: 1.2rem !important; }
        }
        @media (max-width: 700px) {
          .result-card > div { flex-direction: column !important; gap: 1.2rem !important; }
          .result-card > div > div { max-width: 100% !important; min-width: 0 !important; }
        }
        @media (max-width: 600px) {
          .result-card { padding: 0.5rem !important; border-radius: 1rem !important; }
          .result-card > div { padding: 0.5rem !important; }
        }
      </style>
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
      showChatbotToggle();
    } else {
      errorElement.textContent = "Email hoặc mật khẩu không đúng"
      errorElement.classList.remove("hidden")
    }
  }

  handleLogout() {
    this.currentUser = null
    localStorage.removeItem("lumiUser")
    this.hideAdminPanel()
    hideChatbotToggle();
    showNotification("Đã đăng xuất thành công!", "success")
  }

  showAdminPanel() {
    hideElement("adminModal");
    document.querySelector(".main-content").classList.add("hidden");
    document.querySelector(".app-footer").classList.add("hidden");
    showElement("adminPanel");
    this.updateAdminStats();
    this.renderProductsList();
    this.bindOrderStatsByDate(); // Thêm dòng này để gắn sự kiện thống kê theo ngày
  }

  // Thống kê đơn hàng theo ngày nhận
  bindOrderStatsByDate() {
    const dateInput = document.getElementById("orderStatsDate");
    if (!dateInput) return;
    // Mặc định chọn hôm nay
    const today = new Date();
    dateInput.value = today.toISOString().split("T")[0];
    this.renderOrderStatsByDate(dateInput.value);
    dateInput.addEventListener("change", (e) => {
      this.renderOrderStatsByDate(e.target.value);
    });
  }

  renderOrderStatsByDate(dateStr) {
    const container = document.getElementById("orderStatsTableContainer");
    if (!container) return;
    if (!dateStr) {
      container.innerHTML = '<div style="color:#888;">Vui lòng chọn ngày để xem thống kê.</div>';
      return;
    }
    // Lọc đơn hàng theo ngày nhận
    const products = this.products.filter(p => p.dateReceived === dateStr);
    if (products.length === 0) {
      container.innerHTML = '<div style="color:#888;">Không có đơn hàng nào được nhận trong ngày này.</div>';
      return;
    }
    // Render bảng mới chỉ với các trường quan trọng
    let html = `<div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; background:#fff; border-radius:1rem; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <thead style="background:#00b14f; color:#fff;">
        <tr style="text-align:left;">
          <th style="padding:0.7rem 1rem;">STT</th>
          <th style="padding:0.7rem 1rem;">Mã vận đơn</th>
          <th style="padding:0.7rem 1rem;">Loại thiết bị</th>
          <th style="padding:0.7rem 1rem;">Số lượng</th>
          <th style="padding:0.7rem 1rem;">Nhà phân phối</th>
          <th style="padding:0.7rem 1rem;">Ngày nhận hàng</th>
        </tr>
      </thead>
      <tbody>`;
    products.forEach((p, idx) => {
      html += `<tr style="border-bottom:1px solid #e5e7eb;">
        <td style="padding:0.6rem 1rem;">${idx + 1}</td>
        <td style="padding:0.6rem 1rem; font-family:monospace;">${p.viettelTrackingCode || ""}</td>
        <td style="padding:0.6rem 1rem;">${p.deviceType || ""}</td>
        <td style="padding:0.6rem 1rem; text-align:center;">${p.deviceQuantity || 1}</td>
        <td style="padding:0.6rem 1rem;">${p.distributor || ""}</td>
        <td style="padding:0.6rem 1rem;">${p.dateReceived ? formatDateShort(p.dateReceived) : ""}</td>
      </tr>`;
    });
    html += '</tbody></table></div>';
    container.innerHTML = html;
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
            ${product.deviceType}
            ${
              isOverdue(product.dateReceived, product.repairStatus)
                ? `<span class="badge badge-error">
                ⚠️ Quá hạn
              </span>`
                : ""
            }
          </div>
          <div class="product-card-codes">
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
              🔢 Số lượng: <strong>${product.deviceQuantity || 1}</strong>
            </div>
            <div class="product-card-info-item">
              🏷️ Loại thiết bị: <strong>${product.deviceType}</strong>
            </div>
            <div class="product-card-info-item">
              🏢 Nhà phân phối: <strong>${product.distributor}</strong>
            </div>
            <div class="product-card-info-item">
              📍 Địa chỉ NPP: <strong>${product.distributorAddress}</strong>
            </div>
            <div class="product-card-info-item">
              ⚙️ Trạng thái sửa chữa: <strong>${getRepairStatusBadge(product.repairStatus)}</strong>
            </div>
          </div>
        </div>

        <div class="product-card-footer">
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
    document.getElementById("dateReceived").value = product.dateReceived || "";
    document.getElementById("viettelCode").value = product.viettelTrackingCode || "";
    document.getElementById("deviceQuantity").value = product.deviceQuantity || 1;
    document.getElementById("deviceType").value = product.deviceType || "";
    document.getElementById("distributorSearch").value = product.distributor || "";
    document.getElementById("distributorAddress").value = product.distributorAddress || "";
    document.getElementById("errorType").value = product.errorType || "";
    document.getElementById("errorDescription").value = product.errorDescription || "";
    document.getElementById("repairStatus").value = product.repairStatus || "not-started";
    if (document.getElementById("estimatedCompletion"))
      document.getElementById("estimatedCompletion").value = product.estimatedCompletion || "";
    if (document.getElementById("shippingStatus"))
      document.getElementById("shippingStatus").value = product.shippingStatus || "not-sent";
    if (document.getElementById("partsCost"))
      document.getElementById("partsCost").value = product.partsCost || 0;
    // Ẩn/hiện các trường theo trạng thái sửa chữa
    // ...có thể bổ sung logic nếu cần...
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
    e.preventDefault();
    const productData = {
      dateReceived: document.getElementById("dateReceived").value,
      viettelTrackingCode: document.getElementById("viettelCode").value,
      deviceQuantity: Number.parseInt(document.getElementById("deviceQuantity").value) || 1,
      deviceType: document.getElementById("deviceType").value,
      distributor: document.getElementById("distributorSearch").value,
      distributorAddress: document.getElementById("distributorAddress").value,
      errorType: document.getElementById("errorType").value,
      errorDescription: document.getElementById("errorDescription").value,
      repairStatus: document.getElementById("repairStatus").value,
      estimatedCompletion: document.getElementById("estimatedCompletion") ? document.getElementById("estimatedCompletion").value : "",
      shippingStatus: document.getElementById("shippingStatus") ? document.getElementById("shippingStatus").value : "",
      partsCost: Number.parseInt(document.getElementById("partsCost") ? document.getElementById("partsCost").value : 0) || 0,
    };
    if (this.editingProduct) {
      const index = this.products.findIndex((p) => p.id === this.editingProduct.id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...productData };
        showNotification("Cập nhật sản phẩm thành công!", "success");
      }
    } else {
      const newProduct = {
        id: Date.now(),
        ...productData,
        createdAt: new Date().toISOString(),
      };
      this.products.unshift(newProduct);
      showNotification("Thêm sản phẩm thành công!", "success");
    }
    // Lưu lại vào localStorage mỗi lần thêm/sửa
    saveToLocalStorage("lumiProducts", this.products);
    this.hideProductForm();
    this.updateAdminStats();
    this.filterProducts();
    this.populateDistributorFilter();
    this.renderProductsList();
    setTimeout(() => {
      const list = document.getElementById("productsList");
      if (list) list.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  }

  deleteProduct(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      this.products = this.products.filter((p) => p.id !== id);
      // Lưu lại vào localStorage sau khi xóa
      saveToLocalStorage("lumiProducts", this.products);
      this.updateAdminStats();
      this.filterProducts();
      this.populateDistributorFilter();
      showNotification("Xóa sản phẩm thành công!", "success");
    }
  }

  editProduct(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      this.showProductForm(product);
      // Không cần gọi showElement("productModal") nữa vì đã gọi trong showProductForm
    } else {
      showNotification("Không tìm thấy sản phẩm để sửa!", "error");
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

// Gộp tất cả các DOMContentLoaded lại để đảm bảo thứ tự khởi tạo
window.addEventListener("DOMContentLoaded", () => {
  // Khởi tạo app
  window.app = new LumiWarrantySystem();
  console.log("🚀 LUMI Warranty System initialized successfully!");
  console.log("👨‍💻 Tác giả: Trần Minh Thương - Bộ phận T&S Miền Nam");

  // Xử lý chatbot toggle
  if (localStorage.getItem('isAdminLoggedIn') === 'true') {
    showChatbotToggle();
  } else {
    hideChatbotToggle();
  }
});
