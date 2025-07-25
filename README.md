# AI WeBill365 Publishing

A modern Next.js application built with Bootstrap 5.3.3 and React Bootstrap components, following best practices for scalable web development.

## 🚀 Features

- **Next.js 15** with App Router
- **React 19** with latest features
- **TypeScript** for type safety
- **Bootstrap 5.3.3** for responsive design
- **React Bootstrap** for React components
- **Bootstrap Icons** for beautiful icons
- **ESLint** for code quality
- **Component-based architecture** for reusability
- **Multi-language support** with language selector
- **Admin and user authentication** with separate login interfaces
- **Responsive design** with mobile-first approach

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-webill365-publishing
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   ├── login/             # User login page
│   ├── signup/            # User signup page
│   ├── verify/            # Email verification page
│   ├── admin/             # Admin pages
│   │   └── login/         # Admin login page
│   └── globals.scss        # Global styles with Bootstrap
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer component
│   ├── LoginForm.tsx      # Reusable login form
│   ├── SignupForm.tsx     # Signup form component
│   └── FeatureCard.tsx    # Feature card component
└── types/                 # TypeScript type definitions (optional)

public/                    # Static assets
├── assets/
│   ├── images/            # UI icons and images
│   └── flag/              # Language flag icons
├── fonts/                 # Custom fonts
└── favicon.ico

package.json               # Dependencies and scripts
tsconfig.json             # TypeScript configuration
next.config.ts            # Next.js configuration
eslint.config.mjs         # ESLint configuration
```

## 🎨 Bootstrap Integration

### CSS Import

Bootstrap is imported in `src/app/globals.scss`:

```css
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";
```

### Component Usage

Use React Bootstrap components for better React integration:

```tsx
import { Button, Card, Container } from "react-bootstrap";

function MyComponent() {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Button variant="primary">Click me</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
```

## 🧩 Component Architecture

### Reusable Components

- **Header**: Configurable navigation with dropdown support
- **Footer**: Responsive footer with social links and newsletter
- **LoginForm**: Reusable login form with admin/user mode support
- **SignupForm**: Complete signup form with OTP verification
- **FeatureCard**: Reusable feature display component

### Component Props

All components use TypeScript interfaces for type safety:

```tsx
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  iconColor?: string;
  buttonText?: string;
  buttonVariant?: string;
  onButtonClick?: () => void;
  className?: string;
}
```

## 🎯 Best Practices

### 1. Component Organization

- Keep components in `src/components/`
- Use descriptive file names
- Export components as default exports
- Use TypeScript interfaces for props

### 2. Styling

- Use Bootstrap classes for layout and styling
- Custom CSS in `globals.scss` for overrides
- Use Bootstrap utility classes for spacing and colors
- Responsive design with Bootstrap grid system

### 3. TypeScript

- Define interfaces for all component props
- Use proper type annotations
- Enable strict mode in `tsconfig.json`

### 4. Performance

- Use Next.js Image component for images
- Implement proper loading states
- Optimize bundle size with tree shaking

## 🛣️ Available Routes

- **`/`** - Home page with features and navigation
- **`/login`** - User login page with signup option
- **`/signup`** - User registration page with OTP verification
- **`/verify`** - Email verification page
- **`/admin/login`** - Admin login page with language selector

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📱 Responsive Design

The application is fully responsive using Bootstrap's grid system:

- **Mobile-first** approach
- **Breakpoints**: xs, sm, md, lg, xl, xxl
- **Flexible containers** and responsive utilities

## 🎨 Customization

### Bootstrap Theme

Customize Bootstrap variables in `globals.scss`:

```css
:root {
  --bs-primary: #007bff;
  --bs-secondary: #6c757d;
  /* Add more custom variables */
}
```

### Component Styling

Override Bootstrap classes or add custom CSS:

```css
.custom-card {
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
```

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using Next.js, Bootstrap, and modern web technologies.
# Force GitHub Actions deployment
# Force deployment Fri Jul 25 15:12:19 +07 2025
