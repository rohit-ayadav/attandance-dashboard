# 🎓 BunkMaster Pro

BunkMaster Pro is a modern, interactive attendance management and prediction tool built with Next.js and React. It helps students optimize their attendance by providing real-time calculations, projections, and planning features.

<!-- ![BunkMaster Pro Banner](https://via.placeholder.com/800x400/6366f1/ffffff?text=BunkMaster+Pro) -->

## ✨ Features

- **Real-time Attendance Calculation**: Instantly calculate your current attendance percentage
- **Smart Predictions**: 
  - Calculate how many lectures you can safely skip
  - Project future attendance based on planned absences
  - See attendance impact of missing specific days
- **Weekly Planning**: 
  - Interactive calendar for next week's attendance planning
  - Day-by-day attendance projections
  - Automatic Sunday exclusion
- **Absenteeism Impact**: Calculate how future absences will affect your attendance
- **Local Storage**: Save your data locally for quick access
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful, animated interface with intuitive controls

## 🚀 Demo

[Live Demo](https://bunk-master.vercel.app/)

## 💻 Technologies Used

- Next.js 15+
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion
- Shadcn/ui Components
- Lucide React Icons
- React Hot Toast

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/rohit-ayadav/bunkmaster-pro.git
cd bunkmaster-pro
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Usage

1. Enter your name and attendance details:
   - Total number of lectures
   - Number of lectures attended

2. Click "Calculate My Destiny!" to see your current attendance status

3. Use the Weekly Planning feature to:
   - Plan your attendance for the next week
   - See how each day affects your attendance
   - Toggle between attending and bunking days

4. Use the Absenteeism Calculator to:
   - Project the impact of future absences
   - Calculate attendance drops
   - Plan leaves without falling below the threshold
<!-- 
## 📱 Screenshots

![Screenshot 1](https://via.placeholder.com/400x800/6366f1/ffffff?text=Screenshot+1)
![Screenshot 2](https://via.placeholder.com/400x800/6366f1/ffffff?text=Screenshot+2) -->

## ⚙️ Configuration

The application uses several configurable constants:

```typescript
const STORAGE_KEY = 'bunkMasterData';  // Local storage key
const LECTURES_PER_DAY = 6;            // Number of lectures per day
```

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please make sure to update tests as appropriate and follow the existing code style.

## 📝 To-Do

- [ ] Add support for different lecture patterns
- [ ] Implement data export feature
- [ ] Add multiple subject tracking
- [ ] Create attendance history visualization
- [ ] Add push notifications for attendance alerts
- [ ] Implement user accounts and cloud sync

## 🐛 Known Issues

- Edge cases in date calculations near semester boundaries
- Attendance projections might need adjustment for irregular lecture schedules

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👏 Acknowledgments

- Shadcn for the amazing UI components
- Framer Motion for smooth animations
- The Next.js team for the awesome framework

<!-- ## 📧 Contact -->
<!-- 
Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/bunkmaster-pro](https://github.com/yourusername/bunkmaster-pro) -->

---

Made with ❤️ by Rohit Kumar Yadav