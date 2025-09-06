# HireReady - Global Job Portal

A comprehensive job portal application built with Next.js, featuring resume building, ATS scoring, job matching, and multi-language support.

## 🌟 Features

### ✨ Core Features
- **Resume Builder**: Create professional resumes with multiple templates
- **ATS Score**: Get instant ATS compatibility scores for your resume
- **Job Matching**: AI-powered job matching based on skills and preferences
- **Job Search**: Browse jobs from top companies worldwide
- **Company Profiles**: Explore company information and culture
- **Notifications**: Stay updated with job alerts and application status

### 🎨 UI/UX Features
- **3D Animations**: Modern animations with Framer Motion
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark/Light Mode**: Theme switching capability
- **Glass Morphism**: Modern glass-like UI elements
- **Smooth Transitions**: Fluid animations and micro-interactions

### 🌐 Internationalization
- **Multi-language Support**: 7 languages including Indian languages
- **Native Script Display**: Languages shown in their native scripts
- **RTL Support**: Right-to-left language support
- **Cultural Adaptation**: Region-specific content and formatting

### 👤 User Management
- **Comprehensive Registration**: Multi-step form with detailed user information
- **Profile Management**: Complete user profile with education and experience
- **Dashboard**: Personalized dashboard with analytics
- **Settings**: User preferences and account management

### 🔧 Admin Features
- **User Management**: Admin panel for user administration
- **Analytics Dashboard**: Comprehensive analytics and reporting
- **System Settings**: Platform configuration and management
- **Content Management**: Job and company data management

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context + useState
- **Form Handling**: React Hook Form
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/auspicious27/hireready-working.git
   cd hireready-working
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🌍 Supported Languages

- **English** - English
- **हिंदी** - Hindi
- **मैथिली** - Maithili
- **தமிழ்** - Tamil
- **తెలుగు** - Telugu
- **ಕನ್ನಡ** - Kannada
- **മലയാളം** - Malayalam

## 📱 Pages & Features

### Public Pages
- **Homepage** (`/`) - Landing page with features overview
- **Job Search** (`/job-search`) - Browse and search jobs
- **Companies** (`/companies`) - Company profiles and information
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - Multi-step user registration

### User Pages
- **Dashboard** (`/dashboard`) - User dashboard with analytics
- **Profile** (`/profile`) - User profile management
- **Settings** (`/settings`) - Account settings and preferences
- **Language** (`/language`) - Language selection page
- **Notifications** (`/notifications`) - User notifications

### Application Pages
- **Resume Builder** (`/builder`) - Create and edit resumes
- **ATS Score** (`/ats-score`) - Resume scoring and optimization
- **Job Match** (`/job-match`) - Job matching and recommendations

### Admin Pages
- **Admin Dashboard** (`/admin`) - Admin panel and analytics

## 🎯 Key Components

### Authentication
- **AuthProvider**: Context-based authentication
- **Login/Register**: Secure user authentication
- **Protected Routes**: Route protection for authenticated users

### Internationalization
- **LanguageProvider**: Global language context
- **LanguageSelector**: Language switching component
- **Translations**: Comprehensive translation system

### UI Components
- **Responsive Navigation**: Mobile and desktop navigation
- **Form Components**: Reusable form elements
- **Card Components**: Content display cards
- **Modal Components**: Overlay dialogs and forms

## 🚀 Deployment

### Vercel Deployment
1. **Connect GitHub**: Link your GitHub repository to Vercel
2. **Auto Deploy**: Vercel will automatically deploy on push to main branch
3. **Environment Variables**: Configure any required environment variables
4. **Custom Domain**: Set up your custom domain (optional)

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add other environment variables as needed
```

### Tailwind Configuration
The project uses Tailwind CSS with custom configuration for:
- Color schemes
- Typography
- Spacing
- Animations

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for performance
- **Bundle Size**: Optimized with tree shaking
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for deployment platform
- **Tailwind CSS** for styling framework
- **Shadcn/UI** for component library
- **Framer Motion** for animations

## 📞 Support

For support, email support@hireready.com or create an issue in the GitHub repository.

---

**HireReady** - Your gateway to global career opportunities! 🌍✨
