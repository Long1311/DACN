import React, { useState } from "react";
import Layout from "../common/Layout";

const TinTuc = () => {
  const [commentText, setCommentText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Trần Minh",
      date: "01/07/2025",
      text: "Bài viết rất hữu ích. Tôi đang phân vân giữa iPlus 16 Pro và Galaxy Ultra Z, nhưng sau khi đọc bài này tôi nghiêng về iPlus vì nhu cầu hiệu năng cao.",
      replies: [],
    },
    {
      id: 2,
      name: "Lê Hương",
      date: "01/07/2025",
      text: "Tôi đã dùng Nothing Phone (2) và rất hài lòng. Không biết phiên bản (3) có cải tiến gì đáng kể không?",
      replies: [
        {
          id: 21,
          name: "Nguyễn Văn A",
          date: "01/07/2025",
          text: "Nothing Phone (3) cải tiến đáng kể về camera và thời lượng pin, bạn nên cân nhắc nâng cấp.",
        },
      ],
    },
  ]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText && name && email) {
      const newComment = {
        id: comments.length + 1,
        name,
        date: "02/07/2025",
        text: commentText,
        replies: [],
      };
      setComments([...comments, newComment]);
      setCommentText("");
      setName("");
      setEmail("");
    }
  };
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Article Content */}
        <main className="container mx-auto px-4 py-8">
          <article className="w-full max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span>02/07/2025</span>
                <span className="mx-2">•</span>
                <span>Bởi Nguyễn Văn A</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <i className="far fa-clock mr-1"></i> 5 phút đọc
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Top 5 Smartphone Đáng Mua Nhất Mùa Hè 2025 - Cân Bằng Hoàn Hảo
                Giữa Hiệu Năng và Giá Thành
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  Smartphone
                </span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  Xu hướng 2025
                </span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  Mua sắm thông minh
                </span>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                  <i className="fab fa-facebook-f mr-2"></i>
                  <span>Chia sẻ</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                  <i className="fab fa-twitter mr-2"></i>
                  <span>Tweet</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                  <i className="fab fa-pinterest mr-2"></i>
                  <span>Pin</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=A%20professional%20product%20photo%20of%20the%20latest%20smartphone%20models%20arranged%20in%20a%20stylish%20display%20with%20soft%20lighting%2C%20clean%20white%20background%2C%20showing%20different%20models%20with%20vibrant%20screens%2C%20high%20resolution%20details%20of%20camera%20systems%2C%20modern%20design%20features&width=1200&height=600&seq=123456&orientation=landscape"
                alt="Top 5 smartphone đáng mua nhất mùa hè 2025"
                className="w-full h-auto object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic">
                Top 5 smartphone cao cấp với thiết kế và tính năng đột phá cho
                mùa hè 2025
              </p>
            </div>

            {/* Article Content */}
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Mùa hè 2025 đã đến với nhiều sự kiện ra mắt sản phẩm công nghệ
                đáng chú ý. Thị trường smartphone không ngừng phát triển với
                những công nghệ tiên tiến nhất. Nếu bạn đang tìm kiếm một chiếc
                điện thoại mới, hãy cùng chúng tôi điểm qua top 5 smartphone
                đáng mua nhất hiện nay, giúp bạn đưa ra quyết định sáng suốt cho
                khoản đầu tư công nghệ của mình.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                1. iPhone 16 Pro Max - Đỉnh cao công nghệ Apple
              </h2>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="w-full md:w-1/3">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20premium%20iPhone%20with%20titanium%20frame%20and%20matte%20glass%20back%2C%20showing%20triple%20camera%20system%2C%20vibrant%20screen%20displaying%20professional%20interface%2C%20product%20photography%20on%20minimalist%20background%20with%20soft%20shadows&width=400&height=300&seq=123458&orientation=landscape"
                    alt="iPhone 16 Pro Max với hiệu năng vượt trội"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-gray-700 leading-relaxed">
                    iPhone 16 Pro Max với chip A19 Bionic mới nhất mang đến hiệu
                    năng vượt trội so với mọi đối thủ. Màn hình ProMotion 120Hz
                    với công nghệ micro-LED cho màu sắc sống động chưa từng
                    thấy. Hệ thống camera được nâng cấp với khả năng quay video
                    8K và chụp ảnh thiên văn đỉnh cao.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <span className="font-semibold">Giá tham khảo:</span>{" "}
                    34.990.000đ
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Điểm nổi bật:</span> Khung
                    titanium, chống nước IP68+, hỗ trợ trí tuệ nhân tạo Apple
                    Intelligence
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                2. Samsung Galaxy S25 Ultra - Đột phá công nghệ camera
              </h2>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="w-full md:w-1/3">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20sleek%20Samsung%20flagship%20smartphone%20with%20premium%20design%2C%20showing%20advanced%20camera%20system%20with%20multiple%20lenses%2C%20vibrant%20display%20screen%20showing%20colorful%20interface%2C%20professional%20product%20photography%20on%20clean%20background&width=400&height=300&seq=123457&orientation=landscape"
                    alt="Samsung Galaxy S25 Ultra với công nghệ camera đột phá"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-gray-700 leading-relaxed">
                    Samsung Galaxy S25 Ultra với hệ thống camera 200MP được phát
                    triển cùng Leica mang đến khả năng chụp ảnh đỉnh cao. Màn
                    hình Dynamic AMOLED 2X 6.9 inch với độ phân giải QHD+ và tần
                    số quét 144Hz cho trải nghiệm hình ảnh mượt mà. Bút S Pen
                    tích hợp với nhiều tính năng mới.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <span className="font-semibold">Giá tham khảo:</span>{" "}
                    32.990.000đ
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Điểm nổi bật:</span> Camera
                    200MP, zoom quang học 10x, pin 5.500mAh, sạc siêu nhanh 65W
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                3. iPhone 16 - Hiệu năng cao với giá hợp lý
              </h2>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="w-full md:w-1/3">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20modern%20iPhone%20with%20colorful%20design%2C%20showing%20dual%20camera%20system%2C%20vibrant%20display%20with%20clean%20interface%2C%20professional%20product%20photography%20of%20the%20device%20from%20multiple%20angles%20on%20minimalist%20background%20with%20soft%20lighting&width=400&height=300&seq=123459&orientation=landscape"
                    alt="iPhone 16 với hiệu năng cao giá hợp lý"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-gray-700 leading-relaxed">
                    iPhone 16 mang đến trải nghiệm cao cấp của Apple với mức giá
                    hợp lý hơn. Trang bị chip A19 giống như dòng Pro nhưng với
                    cấu hình thấp hơn một chút. Màn hình OLED 6.1 inch với tần
                    số quét 90Hz mang đến trải nghiệm mượt mà. Camera kép 48MP
                    cho chất lượng ảnh tuyệt vời.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <span className="font-semibold">Giá tham khảo:</span>{" "}
                    24.990.000đ
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Điểm nổi bật:</span> Thiết
                    kế nhỏ gọn, hiệu năng mạnh mẽ, hỗ trợ một số tính năng AI cơ
                    bản
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                4. Samsung Galaxy Z Fold 6 - Đột phá công nghệ màn hình gập
              </h2>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="w-full md:w-1/3">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20sleek%20foldable%20smartphone%20with%20an%20ultra-thin%20design%2C%20showing%20both%20folded%20and%20unfolded%20states%2C%20with%20a%20vibrant%20display%20screen%20showing%20a%20colorful%20interface%2C%20professional%20product%20photography%20on%20clean%20background&width=400&height=300&seq=123460&orientation=landscape"
                    alt="Samsung Galaxy Z Fold 6 với màn hình gập"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-gray-700 leading-relaxed">
                    Samsung Galaxy Z Fold 6 tiếp tục cải tiến công nghệ màn hình
                    gập với thiết kế mỏng hơn và nếp gấp ít nhìn thấy hơn. Màn
                    hình chính 7.6 inch và màn hình ngoài 6.2 inch đều sử dụng
                    tấm nền Dynamic AMOLED 2X với tần số quét 120Hz. Hiệu năng
                    mạnh mẽ với chip Snapdragon 8 Gen 3 và RAM 16GB.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <span className="font-semibold">Giá tham khảo:</span>{" "}
                    42.990.000đ
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Điểm nổi bật:</span> Màn
                    hình gập không nếp gấp, hỗ trợ S Pen, chống nước IPX8
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                5. Samsung Galaxy A55 - Smartphone tầm trung xuất sắc
              </h2>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="w-full md:w-1/3">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20modern%20mid-range%20smartphone%20with%20sleek%20design%2C%20showing%20triple%20camera%20system%2C%20vibrant%20display%20with%20clean%20interface%2C%20professional%20product%20photography%20of%20the%20device%20from%20multiple%20angles%20on%20minimalist%20background%20with%20soft%20lighting&width=400&height=300&seq=123461&orientation=landscape"
                    alt="Samsung Galaxy A55 - Smartphone tầm trung xuất sắc"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-gray-700 leading-relaxed">
                    Samsung Galaxy A55 là lựa chọn tuyệt vời cho phân khúc tầm
                    trung với thiết kế cao cấp và hiệu năng ổn định. Màn hình
                    Super AMOLED 6.5 inch với tần số quét 120Hz mang đến trải
                    nghiệm mượt mà. Camera chính 64MP cho chất lượng ảnh tốt
                    trong tầm giá.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <span className="font-semibold">Giá tham khảo:</span>{" "}
                    9.990.000đ
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Điểm nổi bật:</span> Giá hợp
                    lý, pin 5.000mAh, chống nước IP67, 4 năm cập nhật hệ điều
                    hành
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Lời khuyên khi chọn mua smartphone
              </h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                  <span className="font-medium">Xác định nhu cầu sử dụng:</span>{" "}
                  Chọn điện thoại phù hợp với mục đích chính (chơi game, chụp
                  ảnh, làm việc...)
                </li>
                <li>
                  <span className="font-medium">Cân nhắc ngân sách:</span> Đặt
                  ra giới hạn chi tiêu và tìm sản phẩm tốt nhất trong tầm giá
                </li>
                <li>
                  <span className="font-medium">Kiểm tra thời lượng pin:</span>{" "}
                  Đảm bảo điện thoại có pin đủ dùng cho nhu cầu hàng ngày
                </li>
                <li>
                  <span className="font-medium">Chính sách bảo hành:</span> Ưu
                  tiên các hãng có chính sách bảo hành tốt và dịch vụ hậu mãi
                  chuyên nghiệp
                </li>
                <li>
                  <span className="font-medium">Trải nghiệm trực tiếp:</span>{" "}
                  Nên dùng thử trước khi mua để đánh giá cảm giác cầm nắm và
                  trải nghiệm
                </li>
              </ul>

              <div className="bg-blue-50 p-6 rounded-lg my-8">
                <h3 className="text-xl font-bold text-blue-700 mb-3">
                  Phụ kiện không thể thiếu
                </h3>
                <p className="text-gray-700 mb-4">
                  Khi mua smartphone mới, đừng quên trang bị thêm các phụ kiện
                  cần thiết:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Ốp lưng chống sốc và cường lực bảo vệ màn hình</li>
                  <li>Sạc dự phòng dung lượng cao (từ 10.000mAh trở lên)</li>
                  <li>Tai nghe không dây cho trải nghiệm âm thanh tốt nhất</li>
                  <li>Đế sạc không dây tiện lợi cho văn phòng và gia đình</li>
                </ul>
              </div>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Mùa hè 2025 là thời điểm lý tưởng để nâng cấp smartphone của bạn
                với nhiều lựa chọn hấp dẫn. Tùy thuộc vào nhu cầu và ngân sách,
                bạn có thể lựa chọn một trong những mẫu điện thoại trên để có
                trải nghiệm công nghệ tốt nhất. Đừng quên tham khảo thêm các
                chương trình khuyến mãi hiện có để được giá tốt nhất!
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 my-10 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                Sẵn sàng nâng cấp smartphone của bạn?
              </h3>
              <p className="mb-6">
                Ghé thăm cửa hàng TechPhone ngay hôm nay để trải nghiệm trực
                tiếp các mẫu điện thoại mới nhất và nhận ưu đãi đặc biệt dành
                riêng cho mùa hè 2025!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-50 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-shopping-cart mr-2"></i> Mua ngay
                </button>
                <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-blue-600 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-store mr-2"></i> Tìm cửa hàng gần nhất
                </button>
              </div>
            </div>

            {/* Tags and Share */}
            <div className="border-t border-b border-gray-200 py-6 my-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-gray-500 mr-2">Tags:</span>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  #Smartphone2025
                </a>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  #MuaSắmThôngMinh
                </a>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  #CôngNghệMới
                </a>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  #TiếtKiệm
                </a>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  #PhụKiệnĐiệnThoại
                </a>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-3">
                  Chia sẻ bài viết:
                </span>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition duration-300 cursor-pointer"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition duration-300 cursor-pointer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition duration-300 cursor-pointer"
                  >
                    <i className="fab fa-pinterest"></i>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition duration-300 cursor-pointer"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center bg-gray-50 p-6 rounded-lg mb-8">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20Vietnamese%20tech%20journalist%2C%20neutral%20background%2C%20professional%20attire%2C%20friendly%20smile%2C%20high%20quality%20studio%20lighting&width=150&height=150&seq=123462&orientation=squarish"
                alt="Nguyễn Văn A"
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <h4 className="font-bold text-gray-800">Nguyễn Văn A</h4>
                <p className="text-gray-600 text-sm">
                  Chuyên gia công nghệ với hơn 10 năm kinh nghiệm đánh giá sản
                  phẩm. Đam mê khám phá và chia sẻ về những xu hướng công nghệ
                  mới nhất.
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Bình luận ({comments.length})
              </h3>

              {/* Comments List */}
              <div className="space-y-6 mb-8">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold text-gray-800">
                        {comment.name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{comment.text}</p>

                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-6 mt-4 space-y-4 border-l-2 border-gray-100 pl-4">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-gray-50 p-4 rounded-lg"
                          >
                            <div className="flex justify-between mb-2">
                              <h5 className="font-medium text-gray-800">
                                {reply.name}
                              </h5>
                              <span className="text-sm text-gray-500">
                                {reply.date}
                              </span>
                            </div>
                            <p className="text-gray-700">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex mt-3">
                      <button className="text-blue-600 text-sm hover:underline mr-4 cursor-pointer">
                        <i className="far fa-thumbs-up mr-1"></i> Thích
                      </button>
                      <button className="text-blue-600 text-sm hover:underline cursor-pointer">
                        <i className="far fa-comment mr-1"></i> Trả lời
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Form */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-800 mb-4">
                  Để lại bình luận của bạn
                </h4>
                <form onSubmit={handleSubmitComment}>
                  <div className="mb-4">
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Nhập bình luận của bạn..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Họ tên"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    Gửi bình luận
                  </button>
                </form>
              </div>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
};

export default TinTuc;
