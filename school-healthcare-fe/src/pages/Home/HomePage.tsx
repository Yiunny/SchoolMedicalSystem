import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, FileText } from "lucide-react";
import { useAuthStore } from "@/auth/useAuthStore";
import axios from "@/api/axiosInstance";
import MainLayout from "@/layouts/MainLayout";

interface BlogPost {
  blogId: number;
  title: string;
  content: string;
  createdDate: string;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    axios.get("/admin/blogs")
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Lỗi khi tải blogs:", err));
  }, []);

  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-4 min-h-screen">
        <div className="max-w-5xl mx-auto">
          {/* Header Hero Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg mb-4">
              <Heart className="text-white w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Hệ thống Y tế học đường</h1>
            <p className="text-gray-600 mt-2 text-lg">
              Nơi cung cấp thông tin sức khỏe, theo dõi học sinh và quản lý toàn diện
            </p>

            {/* Nút tùy theo trạng thái đăng nhập */}
            {user ? (
              <button
                onClick={logout}
                className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow"
              >
                Đăng xuất
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow"
              >
                Đăng nhập
              </button>
            )}
          </div>

          {/* Blog section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-indigo-500" /> Bài viết gần đây
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogs.length === 0 ? (
                <p className="text-gray-500">Không có bài viết nào.</p>
              ) : (
                blogs.map(blog => (
                  <div key={blog.blogId} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                    <h3 className="text-xl font-bold text-indigo-700 mb-2">{blog.title}</h3>
                    <p className="text-gray-700 line-clamp-4">{blog.content}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Ngày đăng: {new Date(blog.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
