# 🌿 Sanjeevani - Mental Wellness Companion

A beautiful, soothing mental wellness web application that provides compassionate AI support, anonymous sharing, journaling, mood tracking, and therapy booking—all in a safe, judgment-free environment.

![Sanjeevani Preview](https://via.placeholder.com/800x400?text=Sanjeevani+Mental+Wellness+App)

## ✨ Features

### 🤖 **AI-Powered Chat Support**
- Real-time conversations with a compassionate AI companion powered by OpenAI
- Built-in content moderation for safety
- Crisis detection and automatic support resource recommendations
- Empathetic responses focused on mental wellness

### 📝 **Anonymous Sharing**
- Post thoughts and feelings completely anonymously
- Read and react to others' shares in a supportive community
- Automatic content moderation for safety
- No personal information stored or tracked

### 📖 **Personal Journaling**
- Private journaling with thoughtful prompts
- Local storage - your entries never leave your device
- Export functionality for backup
- Guided prompts for reflection and growth

### 😊 **Mood Tracking**
- Simple emoji-based mood check-ins
- Visualize mood patterns over time
- Track correlations between activities and feelings
- Completely private and stored locally

### 🧑‍⚕️ **Therapy Booking**
- Browse licensed mental health professionals
- Book appointments (frontend demo - no payment required)
- Filter by specialization, language, and session type
- Flexible scheduling interface

### 🆘 **Crisis Support**
- Always-visible urgent support card
- Immediate access to crisis helplines
- Built-in breathing exercises and calming tools
- Safety-first approach to mental health

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS with custom mental wellness theme
- **Animations**: Framer Motion for smooth, calming transitions
- **AI Integration**: OpenAI GPT-3.5/4 for chatbot functionality
- **State Management**: Zustand for lightweight state management
- **Icons**: Lucide React for beautiful, consistent icons
- **Fonts**: Google Fonts (Playfair Display, Lora, Inter, Open Sans)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- OpenAI API key (get one at [OpenAI Platform](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sanjeevani
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Philosophy

Sanjeevani follows a **healing-first design approach**:

- **Soothing Color Palette**: Soft pastels (mint, lavender, cream, sage)
- **Gentle Typography**: Elegant serif fonts for headings, clean sans-serif for content
- **Breathing Space**: Generous padding and spacing for a calm feeling
- **Soft Interactions**: Rounded corners, subtle shadows, gentle animations
- **Accessibility**: High contrast ratios, keyboard navigation, screen reader support

## 📱 Pages & Features

### 🏠 **Home (`/`)**
- Daily affirmations with rotation
- Quick mood check-in
- Navigation to all features
- Urgent support card
- Inspiring welcome message

### 💬 **AI Chat (`/chat`)**
- Real-time conversation with Sanjeevani AI
- Typing indicators and natural delays
- Crisis detection and intervention
- Message history with timestamps
- Fully responsive chat interface

### 📢 **Anonymous Posts (`/post`)**
- Create anonymous posts with character limits
- View recent community shares
- React to posts with hearts
- Community guidelines and safety measures
- Content moderation integration

### 📝 **Personal Journal (`/journal`)**
- Guided journal prompts for mental wellness
- Rich text writing interface
- Local storage with export functionality
- Entry management (edit, delete)
- Complete privacy - data never leaves device

### 😊 **Mood Tracking (`/mood`)**
- 5-point emoji mood scale
- Optional reasoning and context
- Historical mood visualization
- Trend analysis and insights
- Privacy-first local storage

### 🧑‍⚕️ **Therapy Booking (`/book`)**
- Licensed therapist profiles
- Specialization and language filtering
- Multiple session types (video, phone, in-person, chat)
- Interactive booking interface
- Confirmation and scheduling system

## 🔒 Privacy & Security

- **Anonymous by Design**: No user accounts or personal data collection
- **Local Data Storage**: Journaling and mood data stored on your device only
- **Content Moderation**: AI-powered safety checks for posts and chat
- **Crisis Detection**: Automatic detection of self-harm indicators with resource provision
- **HTTPS Only**: All communications encrypted in production

## 🌍 Accessibility

- **WCAG 2.1 AA Compliant**: High contrast, keyboard navigation
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Responsive Design**: Works on all devices and screen sizes
- **Keyboard Navigation**: Full app accessible without mouse
- **Focus Management**: Clear focus indicators and logical tab order

## 🔧 Development

### Project Structure
```
sanjeevani/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── api/chat/        # OpenAI chat API endpoint
│   │   ├── chat/            # Chat page
│   │   ├── post/            # Anonymous posting
│   │   ├── journal/         # Personal journaling
│   │   ├── mood/            # Mood tracking
│   │   └── book/            # Therapy booking
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utility functions
│   ├── stores/              # Zustand state stores
│   └── types/               # TypeScript definitions
├── public/                  # Static assets
└── tailwind.config.js       # Tailwind configuration
```

### Key Components
- `Navigation.tsx` - Main navigation with active states
- `DailyAffirmation.tsx` - Rotating daily affirmations
- `MoodCheckIn.tsx` - Interactive mood selection
- `UrgentSupportCard.tsx` - Crisis support with breathing exercises

### API Routes
- `/api/chat` - OpenAI integration with moderation

### Styling
- Custom Tailwind theme with mental wellness colors
- Soft UI components with gentle shadows and rounded corners
- Smooth animations using Framer Motion
- Responsive design with mobile-first approach

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🤝 Contributing

We welcome contributions to make Sanjeevani even better! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear commit messages
- Add proper TypeScript types
- Test your changes thoroughly
- Update documentation as needed

## 📞 Support & Resources

### Crisis Resources (India)
- **iCall**: 9152987821 (24/7 emotional support)
- **Snehi**: Visit [snehi.org](https://snehi.org)
- **Vandrevala Foundation**: 1860-2662-345

### International Resources
- **Crisis Text Line**: Text HOME to 741741 (US)
- **Samaritans**: 116 123 (UK)
- **Lifeline**: 13 11 14 (Australia)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **Mental Health Professionals** who inspired the app's compassionate approach
- **OpenAI** for providing the AI technology that powers our chatbot
- **The Mental Wellness Community** for guidance on best practices
- **Open Source Contributors** who make projects like this possible

---

**⚠️ Important Disclaimer**: Sanjeevani is a mental wellness support tool and is not a substitute for professional medical advice, diagnosis, or treatment. If you're experiencing a mental health crisis, please contact emergency services or a mental health professional immediately.

**💚 Remember**: You are not alone in your journey. Every step toward wellness matters, no matter how small. Be kind to yourself.

---

Made with 💚 for mental wellness and healing.
