import React, { useState } from "react";
import Layout from "../common/Layout";

const FaqPage = () => {
  const [activeKey, setActiveKey] = useState(["1"]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const toggleAccordion = (id) => {
    if (activeKey.includes(id)) {
      setActiveKey(activeKey.filter((key) => key !== id));
    } else {
      setActiveKey([...activeKey, id]);
    }
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const filterFAQs = () => {
    const lowerKeyword = searchKeyword.toLowerCase();
    const filterMap = {
      order: ["3", "5", "7"],
      payment: ["2", "6"],
      account: ["9", "10"],
      support: ["4", "11", "12"],
    };

    return faqItems.filter((item) => {
      const matchFilter =
        !activeFilter || filterMap[activeFilter].includes(item.id);
      const matchSearch =
        item.question.toLowerCase().includes(lowerKeyword) ||
        item.answer.toLowerCase().includes(lowerKeyword);
      return matchFilter && matchSearch;
    });
  };

  const faqItems = [
    {
      id: "1",
      question: "📦 Tôi có thể đổi trả sản phẩm sau bao lâu?",
      answer:
        "Bạn có thể đổi trả sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng. Sản phẩm cần phải còn nguyên vẹn, đầy đủ phụ kiện và hộp đựng...",
    },
    {
      id: "2",
      question: "💳 Tôi có thể thanh toán bằng hình thức nào?",
      answer:
        "Hiện tại chúng tôi chỉ sử dụng duy nhất 1 hình thức thanh toán đó là VnPay",
    },
    {
      id: "3",
      question: "🚚 Thời gian giao hàng là bao lâu?",
      answer:
        "Từ 1–3 ngày làm việc tại thành phố HN, 3–7 ngày cho tỉnh thành khác...",
    },
    {
      id: "4",
      question: "📞 Tôi cần hỗ trợ, liên hệ thế nào?",
      answer:
        "Hotline: 036 8910 JQK\nEmail: longstore@gmail.com\nChat trực tuyến/Facebook",
    },
    {
      id: "5",
      question: "🔄 Làm sao để hủy đơn hàng?",
      answer:
        "Khi bạn nhận được hàng rồi nhưng muốn hủy thì hãy mang ra đơn vị vận chuyển gần nhất để hoàn trả đơn, hoặc có thể trả trực tiếp tại cửa hàng theo địa chỉ ghi trên website, hoặc gọi hotline để hỗ trợ.",
    },
    {
      id: "6",
      question: "💰 Tôi có thể được hoàn tiền không?",
      answer:
        "Có. Sau khi kiểm tra, hoàn tiền từ 3–15 ngày làm việc tùy phương thức.",
    },
    {
      id: "7",
      question: "📦 Tôi có thể kiểm tra tình trạng đơn hàng như thế nào?",
      answer:
        'Vào "Đơn hàng của tôi" hoặc dùng mã tra cứu được gửi qua email/SMS.',
    },
    {
      id: "8",
      question: "🎁 Tôi có được miễn phí vận chuyển không?",
      answer:
        "Đơn hàng từ 500.000đ được miễn phí vận chuyển nội thành các thành phố lớn.",
    },
    {
      id: "9",
      question: "👤 Tôi có cần tạo tài khoản để mua hàng không?",
      answer: "✅ Có, bạn cần phải tạo tài khoản mới có thể mua hàng",
    },
    {
      id: "10",
      question: "🔐 Thông tin cá nhân của tôi có được bảo mật không?",
      answer:
        "Chúng tôi bảo mật thông tin theo luật định. Không chia sẻ nếu không được phép.",
    },
    {
      id: "11",
      question: "🔧 Chính sách bảo hành như thế nào?",
      answer:
        "Bảo hành 12–24 tháng chính hãng, có thể nâng cấp gói bảo hành tại cửa hàng.",
    },
    {
      id: "12",
      question: "🔔 Làm thế nào để nhận thông báo về khuyến mãi?",
      answer:
        "Đăng ký email, theo dõi fanpage, cài app hoặc làm thành viên để nhận thông báo.",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Câu Hỏi Thường Gặp (FAQ)
              </h1>
              <p className="text-gray-600">
                Nếu bạn không tìm thấy câu trả lời, vui lòng liên hệ đội ngũ hỗ
                trợ của chúng tôi.
              </p>
            </div>

            {/* Tìm kiếm */}
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Tìm kiếm câu hỏi..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>

            {/* Bộ lọc FAQ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { key: "order", label: "Đơn hàng", color: "blue" },
                { key: "payment", label: "Thanh toán", color: "green" },
                { key: "account", label: "Tài khoản", color: "purple" },
                { key: "support", label: "Hỗ trợ", color: "amber" },
              ].map(({ key, label, color }) => (
                <button
                  key={key}
                  onClick={() => handleFilterClick(key)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium ${
                    activeFilter === key
                      ? `bg-${color}-600 text-white`
                      : `bg-${color}-50 text-${color}-700 hover:bg-${color}-100`
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              {filterFAQs().map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 bg-white rounded-lg overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    <span>{item.question}</span>
                    <i
                      className={`fas ${
                        activeKey.includes(item.id)
                          ? "fa-chevron-up"
                          : "fa-chevron-down"
                      } text-gray-400`}
                    ></i>
                  </button>
                  {activeKey.includes(item.id) && (
                    <div className="px-6 py-4 bg-gray-50 text-gray-600 whitespace-pre-line border-t border-gray-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}

              {filterFAQs().length === 0 && (
                <p className="text-center text-gray-500">
                  Không tìm thấy câu hỏi phù hợp.
                </p>
              )}
            </div>

            {/* Kênh liên hệ */}
            <div className="mt-12 bg-blue-50 border border-blue-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Bạn vẫn chưa tìm thấy câu trả lời?
              </h2>
              <p className="text-gray-600 mb-4">
                Hãy liên hệ đội ngũ hỗ trợ của chúng tôi qua các kênh sau:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-phone-alt text-blue-500 text-xl mr-3"></i>
                  <div>
                    <h3 className="font-medium text-gray-800">Hotline</h3>
                    <p className="text-sm text-gray-600">036 8910 JQK</p>
                  </div>
                </div>
                <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-envelope text-blue-500 text-xl mr-3"></i>
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <p className="text-sm text-gray-600">longstore@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-comments text-blue-500 text-xl mr-3"></i>
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Chat trực tuyến
                    </h3>
                    <p className="text-sm text-gray-600">Hỗ trợ 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default FaqPage;
