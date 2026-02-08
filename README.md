# AI Productivity Dashboard 🚀

> **"One Dashboard. One Question. Complete Context."**  
> An AI-powered context aggregation tool that stops developers from wasting 2-3 hours daily switching between GitHub, Slack, and project management tools.

---

## ⚠️ Hackathon Submission Notice

**Status:** 🚧 **Work in Progress** - Incomplete due to technical challenges

### What Happened?

This project was developed during [GitHub REST API Docs](https://www.wemakedevs.org/hackathons/tambo) with ambitious goals. Unfortunately, we faced:

- ⚡ Power outage during final development hours
- 👥 Team coordination challenges with incomplete task assignments
- ⏰ Time constraints preventing full implementation

**However, the core concept, architecture, and substantial backend implementation demonstrate the vision and technical capability.**

---

## 🎯 The Problem We're Solving

Developers and teams lose **2-3 hours daily** by:

- 🔄 Switching between GitHub, Discord/Slack, and project tools
- 📜 Scrolling through endless messages and commits
- 🤯 Losing context on "what happened while I was away"
- ⏰ Manually checking PRs, issues, and team discussions

**The Cost:** Context switching destroys productivity and focus.

---

## 💡 Our Solution

An **AI-powered developer intelligence dashboard** that:

1. ✅ **Connects work tools** (GitHub, Discord, Slack)
2. ✅ **Select date ranges** (yesterday, last week, custom)
3. ✅ **Ask natural language questions**: _"What happened during this time?"_
4. ✅ **Get AI-generated summaries** with actionable insights

**Result:** No more context switching. Just instant clarity.

---

## 🏗️ Technical Architecture

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Frontend   │─────▶│   Backend    │─────▶│  External    │
│  (Next.js)   │      │  (Express)   │      │    APIs      │
│              │      │              │      │              │
│ • React 19   │      │ • REST API   │      │ • GitHub API │
│ • TypeScript │      │ • MongoDB    │      │ • Discord    │
│ • Tailwind   │      │ • OAuth      │      │ • Webhooks   │
│ • Clerk Auth │      │ • Discord.js │      └──────────────┘
└──────────────┘      └──────────────┘              │
                              │                      │
                              ▼                      │
                      ┌──────────────┐              │
                      │   Database   │              │
                      │  (MongoDB)   │              │
                      │              │              │
                      │ • Users      │              │
                      │ • Tokens     │              │
                      │ • Config     │              │
                      │ • Messages   │              │
                      └──────────────┘              │
                                                     │
                      ┌──────────────┐              │
                      │   Tambo AI   │◀─────────────┘
                      │              │
                      │ • NLP        │
                      │ • Summary    │
                      │ • Context    │
                      └──────────────┘
```

---

## ✨ Implementation Status

### ✅ Completed

- [x] Project architecture design
- [x] Frontend scaffolding (Next.js + TypeScript)
- [x] Backend API structure (Express + MongoDB)
- [x] Authentication setup (Clerk)
- [x] **Discord integration (Discord.js)** ✨
- [x] GitHub API setup (Octokit)
- [x] UI component library (Radix UI + Tailwind)
- [x] Database schema design (Mongoose)
- [x] Tambo AI SDK integration
- [x] CORS and security middleware
- [x] Environment configuration

### 🚧 In Progress / Incomplete

- [ ] GitHub data fetching (commits, PRs, issues) - API calls not fully connected
- [ ] Discord message fetching and filtering - Integration code exists but not wired to frontend
- [ ] Date range filtering logic - Backend logic exists, frontend incomplete
- [ ] AI prompt engineering for summaries - Tambo setup done, prompts not finalized
- [ ] Dashboard UI implementation - Components built, data flow incomplete
- [ ] Tool configuration CRUD - Backend routes exist, frontend not connected

### 📋 Planned (Not Started)

- [ ] Slack integration
- [ ] Real-time webhook updates
- [ ] Export functionality (PDF/Markdown)
- [ ] Team collaboration features
- [ ] Scheduled summaries

---

## 🛠 Tech Stack

### Frontend

- **Next.js 15.5.7** - React 19, App Router, Server Components
- **TypeScript** - Full type safety
- **Tailwind CSS 4** - Modern utility-first styling
- **Clerk** - User authentication and management
- **Tambo AI SDK** - AI-powered chat and summarization
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **TipTap** - Rich text editor
- **Lucide Icons** - Icon library

### Backend

- **Node.js + Express 5** - Fast, minimal API server
- **MongoDB + Mongoose** - Document database with ODM
- **Octokit (@octokit/rest)** - Official GitHub REST API client
- **Discord.js 14** - Complete Discord API wrapper ✨
- **@octokit/webhooks** - GitHub webhook handling
- **Axios** - Promise-based HTTP client
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

---

## 🎪 What Works Right Now

### ✅ You Can Run:

```bash
# Clone the repository
git clone https://github.com/unknowdeepanshu/AI-Productivity-Dashboard.git
cd AI-Productivity-Dashboard

# Backend setup
cd backend
npm install
# Create .env file with your credentials
npm start  # Server runs on http://localhost:5000

# Frontend setup (in new terminal)
cd frontend
npm install
# Create .env.local file with your API keys
npm run dev  # App runs on http://localhost:3000
```

### ✅ Current Functionality:

1. **Backend server starts successfully** - Express API ready
2. **Frontend app renders** - Next.js with Clerk authentication
3. **Discord.js integration exists** - Bot setup and message handling code
4. **GitHub API client configured** - Octokit initialized
5. **MongoDB connection ready** - Database schema defined
6. **UI components work** - Radix UI, Tailwind styling functional
7. **Tambo AI SDK integrated** - Chat interface available

### ❌ Not Yet Connected:

- GitHub data fetching to frontend
- Discord message retrieval flow
- Date range filtering in UI
- AI summarization pipeline (Tambo → Backend → Frontend)
- Tool configuration UI

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm 9+
- MongoDB (local or MongoDB Atlas)
- Discord Bot Token (optional for Discord features)
- GitHub Personal Access Token
- Clerk Account (free tier)
- Tambo AI API Key (free tier)

### Environment Variables

**Backend** (`backend/.env`):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ai-productivity-dashboard

# GitHub
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_APP_ID=your_github_app_id
GITHUB_WEBHOOK_SECRET=your_webhook_secret

# Discord (Already Integrated!)
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_discord_channel_id

# CORS
CORS_ORIGIN=http://localhost:3000
```

**Frontend** (`frontend/.env.local`):

```env
# Tambo AI
NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_api_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Getting API Keys

1. **Tambo AI**: https://tambo.ai/dashboard
2. **Clerk**: https://clerk.com → Create Application
3. **GitHub Token**: https://github.com/settings/tokens → Generate new token (classic)
4. **Discord Bot**: https://discord.com/developers/applications → New Application → Bot
5. **MongoDB Atlas** (optional): https://www.mongodb.com/cloud/atlas

### Quick Start

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start  # Runs with nodemon (auto-reload)

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev

# Open browser
http://localhost:3000
```

---

## 📖 How It's Designed to Work

### Intended User Flow:

1. **Sign in** with Clerk authentication
2. **Connect tools**:
   - GitHub via OAuth
   - Discord server (bot invite)
3. **Configure settings**:
   - Select GitHub repositories
   - Choose Discord channels
4. **Select date range**: "Show me last 7 days"
5. **Ask questions**:
   - "What did my team work on this week?"
   - "Summarize all GitHub PRs and Discord discussions"
6. **Get AI summary** with:
   - Key commits and PRs
   - Discord conversation highlights
   - Action items and blockers
   - Links to original sources

### Technical Data Flow:

```
User Query (with date range)
    ↓
Backend API
    ├─→ Fetch GitHub data (Octokit)
    │   • Commits in date range
    │   • Pull requests
    │   • Issues
    │
    ├─→ Fetch Discord messages (Discord.js)
    │   • Channel messages in date range
    │   • Filter by configured channels
    │
    ↓
Aggregate & Format Data
    ↓
Send to Tambo AI
    • "Summarize this activity"
    • Context: date range, user query
    ↓
AI Response
    ↓
Format & Display on Dashboard
```

---

## 🔧 Backend Implementation Details

### Discord Integration ✨

The backend includes **Discord.js 14** with:

- Bot client initialization
- Message event handlers
- Channel message fetching
- Date-based filtering
- Webhook support (planned)

**Files implemented:**

- Discord bot configuration
- Message retrieval functions
- Token management
- CORS setup for Discord webhooks

### GitHub Integration

The backend includes **Octokit** with:

- REST API client setup
- OAuth authentication flow
- Repository access
- Webhook handlers (partial)

### Database Schema

MongoDB models defined for:

- Users
- Connected tools (GitHub, Discord)
- API tokens (encrypted)
- Configuration settings
- Cached messages (planned)

---

## 🎯 Use Cases

### For Individual Developers:

- 📊 "Show me my GitHub commits and Discord mentions this week"
- 🔍 Auto-generate weekly status reports
- 📝 Track personal productivity trends

### For Team Leads:

- 👥 "What did the team discuss and build in the last sprint?"
- 📈 Get instant sprint summaries combining code + conversations
- 🎯 Identify blockers mentioned in Discord + open GitHub issues

### For Remote Teams:

- 🌍 "Catch me up on what happened while I was asleep" (time zones)
- 📬 Daily standup summaries without meetings
- 💬 Context without reading 500 messages

---

## 💭 Design Decisions & Learning

### What We Learned:

1. **Multi-API coordination is complex** - Different rate limits, auth methods, data schemas
2. **Discord.js is powerful** - Full API coverage, event-driven architecture
3. **OAuth token management** - Refresh logic, secure storage challenges
4. **AI prompt engineering** - Crafting effective context for summarization
5. **Team coordination** - Clear task ownership is critical in time-constrained projects

### Technical Challenges Faced:

- **Discord limitation**: Can only access servers where bot is invited (not others' servers)
  - _Solution_: Bot invite flow for user's servers
- **GitHub rate limits**: 5000 requests/hour authenticated, needs caching strategy
- **Data aggregation**: Normalizing different data formats from GitHub + Discord
- **Real-time vs on-demand**: Decided on-demand for MVP, real-time for v2
- **Cost optimization**: Minimizing AI API calls through smart caching

### If We Had More Time:

- ✅ Wire backend Discord code to frontend UI
- ✅ Complete GitHub data flow to dashboard
- ✅ Implement intelligent caching (Redis)
- ✅ Add comprehensive error handling
- ✅ Write integration tests
- ✅ Deploy (Vercel + Railway/Render)
- ✅ Add Slack as alternative to Discord

---

## 🗺️ Future Roadmap

### Phase 1: Complete MVP (2-3 weeks)

- [ ] Connect Discord backend to frontend
- [ ] Finish GitHub data fetching pipeline
- [ ] Implement complete AI summarization
- [ ] Polish dashboard UI
- [ ] Add error handling and loading states

### Phase 2: Expand Features (1 month)

- [ ] Slack integration (better team collaboration)
- [ ] Linear/Jira support
- [ ] Custom AI prompts
- [ ] Export summaries (PDF/Markdown)
- [ ] Scheduled daily/weekly digests

### Phase 3: Scale (3 months)

- [ ] Real-time updates via webhooks
- [ ] Team collaboration features
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Premium tier with advanced features

---

## 🤝 Contributing

**Help us complete this vision!**

We're looking for contributors to help finish:

**High Priority:**

- [ ] Connect Discord message fetching to frontend
- [ ] Complete GitHub API integration
- [ ] Wire up Tambo AI summarization pipeline
- [ ] Build remaining dashboard UI components
- [ ] Add comprehensive error handling
- [ ] Write tests (Jest + React Testing Library)

**How to Contribute:**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/discord-ui-integration`
3. Make your changes
4. Test locally
5. Submit a Pull Request with clear description

**Good First Issues:**

- Improve error messages
- Add loading skeletons to UI
- Write documentation
- Add TypeScript types
- Improve mobile responsiveness

---

## 📚 Resources & Documentation

### APIs & Tools Used:

- [GitHub REST API Docs](https://docs.github.com/en/rest)
- [Discord.js Guide](https://discordjs.guide/)
- [Tambo AI Documentation](https://docs.tambo.co)
- [Clerk Auth Docs](https://clerk.com/docs)
- [MongoDB Mongoose](https://mongoosejs.com/docs/)

### Code Examples:

- [Octokit Examples](https://github.com/octokit/rest.js/#readme)
- [Discord Bot Examples](https://github.com/discordjs/discord.js/tree/main/apps/guide/src/content/examples)
- [Next.js 15 App Router](https://nextjs.org/docs/app)

### Inspiration & Similar Tools:

- [Linear's AI features](https://linear.app)
- [GitHub Copilot Workspace](https://github.com/features/copilot)
- [Notion AI](https://www.notion.so/product/ai)
- [Slack's Workflow Builder](https://slack.com/features/workflow-automation)

---

## 💬 The Bigger Picture

While this project is incomplete, it demonstrates:

### ✅ **Technical Competence:**

- Full-stack architecture (Next.js + Express + MongoDB)
- Modern tech stack (React 19, TypeScript, Tailwind)
- Multiple API integrations (GitHub, Discord, Clerk, Tambo)
- Security best practices (OAuth, token management)

### ✅ **Problem-Solution Fit:**

- Real problem: Developers lose 2-3 hours daily to context switching
- Validated by studies and personal experience
- Market exists: Developer productivity tools are $5B+ market

### ✅ **Scalability:**

- Modular architecture allows adding more tools
- Database schema supports multi-user, multi-tool
- AI-first approach enables future features

### ✅ **Learning & Growth:**

- Honest about challenges faced
- Clear understanding of what's needed to complete
- Roadmap shows thoughtful planning

**This isn't a failed project—it's an in-progress journey.**

---

## 🙏 Acknowledgments

Despite the incomplete state, huge thanks to:

- **Tambo AI** - For the powerful AI SDK and developer-friendly docs
- **Clerk** - For making authentication painless
- **Discord** - For comprehensive API and Discord.js library
- **GitHub** - For excellent REST API and Octokit
- **Hackathon Organizers** - For the opportunity and learning experience
- **Our Team** - For effort despite coordination challenges

---

## 📞 Contact & Support

**Deepanshu**

- GitHub: [@unknowdeepanshu](https://github.com/unknowdeepanshu)
- Project: [AI-Productivity-Dashboard](https://github.com/unknowdeepanshu/AI-Productivity-Dashboard)

**Want to contribute or have questions?**

- 🐛 [Report a bug](https://github.com/unknowdeepanshu/AI-Productivity-Dashboard/issues/new)
- 💡 [Suggest a feature](https://github.com/unknowdeepanshu/AI-Productivity-Dashboard/issues/new)
- 💬 [Start a discussion](https://github.com/unknowdeepanshu/AI-Productivity-Dashboard/discussions)

---

## 📄 License

ISC License - See LICENSE file for details

---

<div align="center">

### 🚧 Hackathon Submission - Work in Progress

**This project represents vision, technical capability, and honest effort.**

The backend includes Discord integration, GitHub API setup, and Tambo AI.  
The frontend has beautiful UI components and authentication.  
**What's missing:** Connecting the pieces together.

---

### ⭐ Star this repo to follow the completion journey!

**Want to help finish it?** Contributions are welcome!

[View Code](https://github.com/unknowdeepanshu/AI-Productivity-Dashboard) • [Open Issue](https://github.com/unknowdeepanshu/AI-Productivity-Dashboard/issues) • [Discussion](https://github.com/unknowdeepanshu/AI-Productivity-Dashboard/discussions)

---

_Built with ❤️ during [Hackathon Name] - Learning in progress_

</div>
