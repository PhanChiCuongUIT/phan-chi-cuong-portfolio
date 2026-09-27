export type Language = 'en' | 'vi'
export type ProjectKey = 'eco' | 'fresh'

export const links = {
  github: 'https://github.com/PhanChiCuongUIT',
  linkedin: 'https://www.linkedin.com/in/chicuong16012005/',
  ecoquest: 'https://github.com/PhanChiCuongUIT/EcoQuest-Campus-Microservices',
  freshtrace: 'https://github.com/PhanChiCuongUIT/FreshTrace',
  freshtraceLive: 'https://freshtrace-app.vercel.app/',
  email: 'cuong26.16.8@gmail.com', phone: '+84989902105',
  resume: '/PhanChiCuong_Internship_Resume.pdf',
} as const

export const projectImages = {
  eco: [
    { src: '/projects/ecoquest/dashboard.png', en: 'Student dashboard', vi: 'Dashboard sinh viên', width: 1440, height: 1000 },
    { src: '/projects/ecoquest/missions.png', en: 'Campus missions', vi: 'Danh sách nhiệm vụ', width: 1440, height: 1000 },
    { src: '/projects/ecoquest/wallet.png', en: 'Wallet & badges', vi: 'Ví điểm và huy hiệu', width: 1440, height: 1000 },
    { src: '/projects/ecoquest/mobile.png', en: 'Mobile dashboard', vi: 'Dashboard trên mobile', width: 390, height: 844 },
  ],
  fresh: [
    { src: '/projects/freshtrace/home.png', en: 'Customer homepage', vi: 'Trang chủ khách hàng', width: 2880, height: 1464 },
    { src: '/projects/freshtrace/products.png', en: 'Product catalog', vi: 'Danh sách sản phẩm', width: 2880, height: 1472 },
    { src: '/projects/freshtrace/manager.png', en: 'Manager dashboard', vi: 'Dashboard quản lý', width: 2880, height: 1462 },
    { src: '/projects/freshtrace/mobile.jpg', en: 'Mobile homepage', vi: 'Trang chủ trên mobile', width: 1220, height: 2712 },
  ],
} as const

const skillGroups = [
  ['Java', 'TypeScript', 'JavaScript', 'SQL', 'HTML / CSS'],
  ['Spring Boot', 'Spring Cloud Gateway', 'REST', 'JWT', 'gRPC', 'Deno Edge Functions'],
  ['PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'Supabase', 'RLS'],
  ['React', 'Vite', 'TanStack Query', 'Docker', 'Git', 'Postman'],
] as const

export const content = {
  en: {
    nav: { work: 'Projects', expertise: 'Skills', about: 'About', contact: 'Contact', resume: 'Download CV', menu: 'Open menu', close: 'Close menu', skip: 'Skip to content' },
    hero: {
      status: 'Looking for an internship', location: 'Ho Chi Minh City, Vietnam', greeting: 'Hi, I’m', role: 'Backend & Full-stack Developer',
      intro: 'I’m a final-year Software Engineering student at UIT. I build web applications with Java, Spring Boot and React, and I’m looking for a Backend or Full-stack internship.',
      note: 'I like working on APIs and databases, especially the details behind checkout, permissions and communication between services.',
      primary: 'View projects', secondary: 'Download CV', education: 'Studying at UIT, VNU-HCM', graduation: 'Expected graduation · 2027', socials: 'Find me on',
    },
    work: {
      eyebrow: '01 / PROJECTS', title: 'What I’ve been working on',
      intro: 'Two university projects I worked on as a full-stack developer. Here are the applications, the code, and a few technical details.',
      code: 'GitHub', live: 'Open FreshTrace', roleLabel: 'Role', stackLabel: 'Built with', details: 'Technical details', close: 'Close details', highlights: 'In this project',
      gallery: { enlarge: 'View image', previous: 'Previous image', next: 'Next image', close: 'Close image', hint: 'Click to enlarge', caption: 'Application screenshots' },
      eco: {
        name: 'EcoQuest Campus', category: 'Campus activities · Microservices', date: 'Jun – Sep 2026', role: 'Full-stack developer',
        description: 'Students join sustainability missions, submit evidence, and receive points after moderator approval. The app also includes rankings, badges and reward coupons.',
        stack: ['Java 21', 'Spring Boot', 'React', 'PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'gRPC', 'Docker'],
        highlights: ['Nine backend services with separate responsibilities and data stores.', 'An event-driven approval and reward flow, with checks to prevent duplicate points.', 'Role-based screens for students, moderators and admins.'],
        detailTitle: 'From an approved action to reward points',
        detail: 'The Action service saves the approval and an outbox record together, then publishes an event to RabbitMQ. Reward uses the source action ID to avoid granting points twice. Leaderboards and other read models update through events. Policy checks run over gRPC; JWT and ownership checks protect the APIs.',
        flow: ['Action approved', 'Outbox', 'RabbitMQ', 'Reward ledger'],
      },
      fresh: {
        name: 'FreshTrace', category: 'Food marketplace · Traceability', date: 'Apr – Jul 2026', role: 'Full-stack developer',
        description: 'A food marketplace with batch traceability, stock-aware checkout, delivery tracking and online payments. It has separate workspaces for customers, shippers, managers and admins.',
        stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'Edge Functions', 'PayOS', 'Cloudinary'],
        highlights: ['Database RPCs and transactions for checkout, inventory, cancellation and coupons.', 'RLS policies to control access to orders and other role-owned data.', 'PayOS payments, QR batch tracing, signed uploads and realtime notifications.'],
        detailTitle: 'Keeping checkout and payments consistent',
        detail: 'Checkout runs in a PostgreSQL RPC so validation, order creation and inventory changes happen in one transaction. RLS limits access by role and ownership. Edge Functions verify payment callbacks and handle repeated events, with reconciliation for payments that arrive late.',
        flow: ['Cart & inventory', 'Checkout RPC', 'PayOS callback', 'Order update'],
      },
    },
    skills: {
      eyebrow: '02 / SKILLS', title: 'My main tools',
      intro: 'These are the technologies I’ve used in my coursework and projects. My main focus is backend development with Java and Spring Boot.',
      groups: [{ name: 'Languages', items: skillGroups[0] }, { name: 'Backend & APIs', items: skillGroups[1] }, { name: 'Data & messaging', items: skillGroups[2] }, { name: 'Frontend & tools', items: skillGroups[3] }],
    },
    about: {
      eyebrow: '03 / ABOUT', title: 'A little about me',
      paragraph: 'I’m studying Software Engineering at the University of Information Technology, VNU-HCM. I’m interested in backend development, API design and databases. Working on FreshTrace and EcoQuest has given me practice connecting those areas to a complete web application.',
      second: 'For my internship, I’d like to work with a team where I can contribute to real features, get feedback on my code, and learn how an application is maintained after release.',
      education: 'Education', school: 'University of Information Technology – VNU-HCM', degree: 'Bachelor of Software Engineering', duration: 'Sep 2023 – Present', graduation: 'Expected graduation: 2027', gpa: 'GPA: 8.51 / 10.0',
      courseworkLabel: 'Relevant coursework', coursework: 'Database Systems, Data Structures & Algorithms, Software Testing, Microservices Architecture, DevOps', certification: 'English', english: 'IELTS Academic', scores: '7.0 (2023) · 6.5 (2026)',
    },
    contact: {
      eyebrow: '04 / CONTACT', title: 'Get in touch', intro: 'Have an internship opening or a question about my projects? You can reach me by email or LinkedIn.',
      email: 'Email me', copy: 'Copy email', copied: 'Email copied', back: 'Back to top',
    },
    footer: 'Phan Chí Cường',
  },
  vi: {
    nav: { work: 'Dự án', expertise: 'Kỹ năng', about: 'Giới thiệu', contact: 'Liên hệ', resume: 'Tải CV', menu: 'Mở menu', close: 'Đóng menu', skip: 'Đến nội dung chính' },
    hero: {
      status: 'Đang tìm cơ hội thực tập', location: 'TP. Hồ Chí Minh, Việt Nam', greeting: 'Chào bạn, mình là', role: 'Backend & Full-stack Developer',
      intro: 'Mình là sinh viên năm cuối ngành Kỹ thuật Phần mềm tại UIT. Mình làm web với Java, Spring Boot và React, hiện đang tìm vị trí Backend hoặc Full-stack Intern.',
      note: 'Mình thích làm việc với API và cơ sở dữ liệu, đặc biệt là các bài toán về đặt hàng, phân quyền và giao tiếp giữa các service.',
      primary: 'Xem dự án', secondary: 'Tải CV', education: 'Sinh viên UIT, ĐHQG-HCM', graduation: 'Dự kiến tốt nghiệp · 2027', socials: 'Kết nối với mình',
    },
    work: {
      eyebrow: '01 / DỰ ÁN', title: 'Những dự án mình đã làm',
      intro: 'Hai đồ án mình tham gia ở vai trò full-stack developer. Dưới đây là giao diện ứng dụng, mã nguồn và một số phần kỹ thuật.',
      code: 'GitHub', live: 'Mở FreshTrace', roleLabel: 'Vai trò', stackLabel: 'Công nghệ', details: 'Chi tiết kỹ thuật', close: 'Đóng chi tiết', highlights: 'Các phần chính',
      gallery: { enlarge: 'Xem ảnh', previous: 'Ảnh trước', next: 'Ảnh tiếp theo', close: 'Đóng ảnh', hint: 'Nhấn để xem ảnh lớn', caption: 'Ảnh chụp ứng dụng' },
      eco: {
        name: 'EcoQuest Campus', category: 'Hoạt động xanh · Microservices', date: '06 – 09/2026', role: 'Full-stack developer',
        description: 'Sinh viên tham gia nhiệm vụ xanh, nộp minh chứng và nhận điểm sau khi được duyệt. Ứng dụng có thêm bảng xếp hạng, huy hiệu và đổi điểm lấy coupon.',
        stack: ['Java 21', 'Spring Boot', 'React', 'PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'gRPC', 'Docker'],
        highlights: ['Chín backend service, mỗi service phụ trách nghiệp vụ và dữ liệu riêng.', 'Luồng duyệt và cộng điểm qua sự kiện, có xử lý tránh cộng điểm trùng.', 'Giao diện và phân quyền cho sinh viên, moderator và admin.'],
        detailTitle: 'Từ duyệt minh chứng đến cộng điểm',
        detail: 'Action service lưu kết quả duyệt cùng bản ghi outbox, sau đó gửi sự kiện qua RabbitMQ. Reward dựa vào source action ID để tránh cộng điểm hai lần. Bảng xếp hạng và các dữ liệu tổng hợp được cập nhật qua sự kiện. Policy được kiểm tra bằng gRPC; API kiểm tra JWT, vai trò và quyền sở hữu dữ liệu.',
        flow: ['Duyệt action', 'Outbox', 'RabbitMQ', 'Sổ điểm'],
      },
      fresh: {
        name: 'FreshTrace', category: 'Thực phẩm sạch · Truy xuất nguồn gốc', date: '04 – 07/2026', role: 'Full-stack developer',
        description: 'Website bán thực phẩm sạch có truy xuất lô hàng, đặt hàng theo tồn kho, theo dõi giao hàng và thanh toán online. Khách hàng, shipper, manager và admin có khu vực làm việc riêng.',
        stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'Edge Functions', 'PayOS', 'Cloudinary'],
        highlights: ['RPC và transaction cho checkout, tồn kho, hủy đơn và coupon.', 'RLS kiểm soát quyền truy cập đơn hàng và dữ liệu theo vai trò.', 'Thanh toán PayOS, QR truy xuất, upload có chữ ký và thông báo realtime.'],
        detailTitle: 'Xử lý nhất quán đơn hàng và thanh toán',
        detail: 'Checkout chạy trong PostgreSQL RPC để kiểm tra điều kiện, tạo đơn và cập nhật tồn kho trong cùng transaction. RLS giới hạn truy cập theo vai trò và quyền sở hữu. Edge Functions xác thực callback thanh toán, xử lý sự kiện lặp và đối soát khi kết quả thanh toán đến chậm.',
        flow: ['Giỏ hàng & tồn kho', 'Checkout RPC', 'Callback PayOS', 'Cập nhật đơn'],
      },
    },
    skills: {
      eyebrow: '02 / KỸ NĂNG', title: 'Công nghệ mình sử dụng', intro: 'Những công nghệ mình đã dùng trong môn học và dự án. Mình tập trung nhiều hơn vào backend với Java và Spring Boot.',
      groups: [{ name: 'Ngôn ngữ', items: skillGroups[0] }, { name: 'Backend & API', items: skillGroups[1] }, { name: 'Dữ liệu & messaging', items: skillGroups[2] }, { name: 'Frontend & công cụ', items: skillGroups[3] }],
    },
    about: {
      eyebrow: '03 / GIỚI THIỆU', title: 'Một chút về mình',
      paragraph: 'Mình đang học Kỹ thuật Phần mềm tại Trường Đại học Công nghệ Thông tin, ĐHQG-HCM. Mình quan tâm đến backend, thiết kế API và cơ sở dữ liệu. Hai đồ án FreshTrace và EcoQuest giúp mình thực hành kết hợp những phần này trong một ứng dụng web hoàn chỉnh.',
      second: 'Ở kỳ thực tập, mình muốn được tham gia làm tính năng thực tế, nhận góp ý về code và học cách đội ngũ duy trì ứng dụng sau khi đưa vào sử dụng.',
      education: 'Học vấn', school: 'Trường Đại học Công nghệ Thông tin – ĐHQG-HCM', degree: 'Cử nhân Kỹ thuật Phần mềm', duration: '09/2023 – Hiện tại', graduation: 'Dự kiến tốt nghiệp: 2027', gpa: 'GPA: 8.51 / 10.0',
      courseworkLabel: 'Các môn liên quan', coursework: 'Cơ sở dữ liệu, Cấu trúc dữ liệu & giải thuật, Kiểm thử phần mềm, Kiến trúc Microservices, DevOps', certification: 'Ngoại ngữ', english: 'IELTS Academic', scores: '7.0 (2023) · 6.5 (2026)',
    },
    contact: {
      eyebrow: '04 / LIÊN HỆ', title: 'Liên hệ với mình', intro: 'Nếu bạn có vị trí thực tập phù hợp hoặc muốn hỏi thêm về dự án, hãy liên hệ với mình qua email hoặc LinkedIn nhé.',
      email: 'Gửi email', copy: 'Sao chép email', copied: 'Đã sao chép email', back: 'Lên đầu trang',
    },
    footer: 'Phan Chí Cường',
  },
} as const
