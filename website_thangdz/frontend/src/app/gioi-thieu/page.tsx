// frontend/src/app/gioi-thieu/page.tsx
import { User, Award, Shield, Compass, Code2, Globe, GraduationCap } from 'lucide-react';

export default function About() {
  const skills = [
    { category: 'Frontend', items: ['React.js', 'Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit / Zustand'] },
    { category: 'Backend & DB', items: ['Python', 'FastAPI', 'Flask', 'SQLAlchemy / SQLModel', 'PostgreSQL', 'Redis'] },
    { category: 'DevOps & Tooling', items: ['VPS Ubuntu', 'Nginx', 'Systemd / PM2', 'Git / GitHub Actions', 'Alembic Migrations'] },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 flex flex-col gap-16 py-12">
      {/* Introduction Header */}
      <section className="flex flex-col gap-6 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Giới Thiệu Bản Thân</h1>
        <p className="text-gradient font-bold text-lg">Lê Minh Thắng (ThangDz) — Full-stack Developer & Technical Mentor</p>
        <p className="text-slate-400 leading-relaxed text-base">
          Tôi là một nhà phát triển phần mềm Full-stack đam mê thiết kế hệ thống tối giản, tối ưu hóa tốc độ ứng dụng và hướng dẫn các bạn lập trình viên khác phát triển tư duy giải quyết vấn đề.
        </p>
      </section>

      {/* Story section */}
      <section className="glass-panel p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3 text-cyan-400">
          <Compass className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-white">Câu chuyện thương hiệu</h2>
        </div>
        <div className="text-slate-300 text-sm leading-relaxed flex flex-col gap-4">
          <p>
            Bắt đầu từ một lập trình viên tự học, tôi thấu hiểu những rào cản và khó khăn khi tiếp cận các công nghệ mới hay cấu hình hạ tầng phức tạp. Đó là động lực để tôi xây dựng thương hiệu cá nhân **ThangDz.Com**.
          </p>
          <p>
            Mục tiêu của tôi là cung cấp các **giải pháp phần mềm trực quan, trực tiếp, tối giản hóa** không lạm dụng các công nghệ quá cồng kềnh (như lạm dụng Docker cho các dự án nhỏ/vừa) để giúp khách hàng tiết kiệm chi phí vận hành và tăng tốc độ thời gian phát triển dự án ra thị trường.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Code2 className="w-6 h-6 text-purple-400" />
          <span>Kỹ năng & Chuyên môn</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="glass-panel p-6">
              <h3 className="text-white font-bold mb-4 border-b border-white/5 pb-2 text-base">{skill.category}</h3>
              <ul className="flex flex-col gap-2">
                {skill.items.map((item, idx) => (
                  <li key={idx} className="text-slate-400 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 flex gap-4">
          <div className="p-3 bg-purple-500/10 text-purple-300 rounded-lg h-12 w-12 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Chất lượng cao</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Mỗi dòng code đều được chăm chút, tối ưu hóa hiệu năng tối đa và tuân thủ các nguyên tắc thiết kế sạch (Clean Code).
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 flex gap-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-300 rounded-lg h-12 w-12 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Trực tiếp & Uy tín</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Luôn minh bạch trong giao tiếp, hỗ trợ kỹ thuật tận tình và cam kết mang lại giải pháp thực tế nhất cho khách hàng.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
