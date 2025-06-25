// Giá linh kiện
const spareParts = {
    'thẻ nhớ': { name: 'Thẻ nhớ (AI Camera Hub)', price: 330000 },
    'ai camera hub': { name: 'Thẻ nhớ (AI Camera Hub)', price: 330000 },
    'mạch nguồn hc': { name: 'Mạch nguồn HC', price: 165000 },
    'nguồn hc': { name: 'Mạch nguồn HC', price: 165000 },
    'mạch nguồn công tắc': { name: 'Mạch nguồn công tắc', price: 410000 },
    'nguồn công tắc': { name: 'Mạch nguồn công tắc', price: 410000 },
    'mạch cảm ứng công tắc': { name: 'Mạch cảm ứng công tắc', price: 435000 },
    'cảm ứng công tắc': { name: 'Mạch cảm ứng công tắc', price: 435000 },
    'module yale': { name: 'Module Yale', price: 660000 },
    'yale': { name: 'Module Yale', price: 660000 },
    'bộ điều khiển': { name: 'Bộ điều khiển/RS485/Gate', price: 1320000 },
    'rs485': { name: 'Bộ điều khiển/RS485/Gate', price: 1320000 },
    'gate': { name: 'Bộ điều khiển/RS485/Gate', price: 1320000 }
};

class ChatbotUI {
    constructor() {
        this.container = document.getElementById('chatbotContainer');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendButton = document.getElementById('chatbotSend');
        this.toggleButton = document.getElementById('chatbotToggle');
        this.closeButton = document.getElementById('closeChatbot');
        this.history = JSON.parse(localStorage.getItem('chatbotHistory') || '[]');
        this.maxHistory = 30;
        this.isFirstOpen = true;
        this.isBotTyping = false;
        this.setupEventListeners();
        this.renderHistory();
    }

    setupEventListeners() {
        this.toggleButton.addEventListener('click', () => this.toggleChatbot());
        this.closeButton.addEventListener('click', () => this.closeChatbot());
        this.sendButton.addEventListener('click', () => this.handleUserInput());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserInput();
            }
        });
        this.input.addEventListener('focus', () => this.input.select());
        this.input.addEventListener('input', () => {
            this.sendButton.disabled = !this.input.value.trim();
        });
    }

    toggleChatbot() {
        const isHidden = this.container.style.display === 'none';
        this.container.style.display = isHidden ? 'flex' : 'none';
        if (isHidden) {
            this.input.focus();
            if (this.isFirstOpen) {
                this.showWelcomeMessage();
                this.isFirstOpen = false;
            }
        }
    }

    closeChatbot() {
        this.container.style.display = 'none';
    }

    showWelcomeMessage() {
        this.addMessage('Xin chào! Tôi là trợ lý báo giá linh kiện Lumi. 🤖', 'bot');
        this.addMessage('Bạn có thể hỏi về giá linh kiện, xem bảng giá, hoặc gõ "hướng dẫn" để biết thêm.', 'bot');
        this.addMessage(this.generatePriceTable(), 'bot');
    }

    generatePriceTable() {
        const uniqueParts = Array.from(new Set(Object.values(spareParts).map(part => part.name)));
        let table = '<table class="price-table">';
        table += '<tr><th>Linh kiện</th><th>Giá (VNĐ)</th></tr>';
        uniqueParts.forEach(partName => {
            const part = Object.values(spareParts).find(p => p.name === partName);
            table += `<tr><td>${part.name}</td><td>${this.formatPrice(part.price)}</td></tr>`;
        });
        table += '</table>';
        return table;
    }

    formatPrice(price) {
        return price.toLocaleString('vi-VN') + ' VNĐ';
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = content;
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        // Lưu lịch sử
        this.history.push({ content, type });
        if (this.history.length > this.maxHistory) this.history.shift();
        localStorage.setItem('chatbotHistory', JSON.stringify(this.history));
    }

    addLoadingMessage() {
        this.isBotTyping = true;
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message loading';
        loadingDiv.id = 'chatbotLoadingMsg';
        loadingDiv.innerHTML = '<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span> Đang soạn câu trả lời...';
        this.messagesContainer.appendChild(loadingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    removeLoadingMessage() {
        this.isBotTyping = false;
        const loadingDiv = document.getElementById('chatbotLoadingMsg');
        if (loadingDiv) loadingDiv.remove();
    }

    renderHistory() {
        this.messagesContainer.innerHTML = '';
        this.history.forEach(msg => this.addMessage(msg.content, msg.type));
    }

    clearHistory() {
        this.history = [];
        localStorage.removeItem('chatbotHistory');
        this.messagesContainer.innerHTML = '';
        this.showWelcomeMessage();
    }

    handleUserInput() {
        const userInput = this.input.value.trim();
        if (!userInput || this.isBotTyping) return;
        this.addMessage(userInput, 'user');
        this.input.value = '';
        this.sendButton.disabled = true;
        this.sendButton.classList.add('sending');
        // Reset animation nếu gửi liên tục
        const sendIcon = this.sendButton.querySelector('.send-icon svg');
        if (sendIcon) {
            sendIcon.style.animation = 'none';
            // Force reflow để restart animation
            void sendIcon.offsetWidth;
        }
        setTimeout(() => {
            this.sendButton.classList.remove('sending');
        }, 600);
        this.addLoadingMessage();
        setTimeout(() => {
            this.removeLoadingMessage();
            this.processUserInput(userInput);
            this.sendButton.disabled = false;
            this.input.focus();
        }, 900 + Math.random() * 400);
    }

    processUserInput(input) {
        const text = input.toLowerCase();
        // Lệnh đặc biệt
        if (["help", "hướng dẫn", "trợ giúp", "?", "hdsd"].includes(text)) {
            this.showHelp();
            return;
        }
        if (["bảng giá", "giá", "list", "danh sách", "price", "bang gia"].includes(text)) {
            this.addMessage(this.generatePriceTable(), 'bot');
            return;
        }
        if (["xóa lịch sử", "clear", "clear history", "reset"].includes(text)) {
            this.clearHistory();
            this.addMessage('Đã xóa lịch sử hội thoại.', 'bot');
            return;
        }
        // Tìm kiếm linh kiện
        const matchedParts = Object.entries(spareParts)
            .filter(([key]) => text.includes(key))
            .map(([_, part]) => part);
        if (matchedParts.length > 0) {
            const uniqueParts = Array.from(new Set(matchedParts.map(part => part.name)));
            if (uniqueParts.length === 1) {
                const part = matchedParts[0];
                this.addMessage(
                    `Giá <b>${part.name}</b> là <span style='color:#008c4f;font-weight:600;'>${this.formatPrice(part.price)}</span>`,
                    'bot'
                );
            } else {
                this.addMessage(
                    `Tôi tìm thấy ${uniqueParts.length} linh kiện liên quan:<br>` +
                    uniqueParts.map(name => {
                        const part = matchedParts.find(p => p.name === name);
                        return `- <b>${name}</b>: <span style='color:#008c4f;font-weight:600;'>${this.formatPrice(part.price)}</span>`;
                    }).join('<br>'),
                    'bot'
                );
            }
            return;
        }
        // Câu hỏi tự nhiên
        if (/bao nhiêu|giá|cost|how much|mấy tiền|giá tiền|price/.test(text)) {
            this.addMessage('Bạn muốn hỏi giá linh kiện nào? Vui lòng nhập tên linh kiện hoặc gõ "bảng giá" để xem danh sách.', 'bot');
            return;
        }
        // Lời chào
        if (/chào|hello|hi|xin chào|alo|yo|hey/.test(text)) {
            this.addMessage('Chào bạn! Bạn cần hỏi giá linh kiện nào?', 'bot');
            return;
        }
        // Lệnh ẩn/đóng
        if (["ẩn", "đóng", "close", "hide", "bye", "tạm biệt"].includes(text)) {
            this.addMessage('Chatbot đã được ẩn. Nhấn bong bóng 💬 để mở lại.', 'bot');
            setTimeout(() => this.closeChatbot(), 1200);
            return;
        }
        // Không hiểu
        this.addMessage('Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể hỏi về giá linh kiện, gõ "bảng giá" hoặc "hướng dẫn" để xem thêm.', 'bot');
    }

    showHelp() {
        const helpMessage = `
            <b>Hướng dẫn sử dụng Chatbot:</b><br>
            • Gõ tên linh kiện để xem giá (VD: "thẻ nhớ", "mạch nguồn hc", "module yale")<br>
            • Gõ <b>bảng giá</b> để xem toàn bộ bảng giá linh kiện<br>
            • Gõ <b>xóa lịch sử</b> để xóa hội thoại<br>
            • Gõ <b>hướng dẫn</b> để xem hướng dẫn này<br>
            <br><b>Ví dụ:</b><br>
            - "Giá module yale bao nhiêu?"<br>
            - "Cho mình xem bảng giá"<br>
            - "thẻ nhớ"<br>
            - "xóa lịch sử"
        `;
        this.addMessage(helpMessage, 'bot');
    }
}

// Khởi tạo chatbot khi trang đã load
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new ChatbotUI();
    // Chỉ hiển thị chatbot cho admin
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    chatbotToggle.style.display = isAdminLoggedIn ? 'flex' : 'none';
    chatbotContainer.style.display = 'none';
});
