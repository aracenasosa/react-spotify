# Spotify Clone - React application

A professional, full-featured Spotify clone built with React and the Spotify Web API. This project demonstrates modern frontend practices, including state management with Context API, custom hooks for API interaction, and a responsive UI.

## 🚀 Key Features

- **Spotify Authentication**: Seamless login flow using PKCE-based authorization.
- **Guest Mode**: Explore the app with mock data without requiring Spotify authentication - perfect for demos and testing.
- **Dynamic Navigation**: "Smart" navigation arrows with global history tracking to manage back/forward states across sessions.
- **Search & Discovery**: Explore artists, albums, playlists, and tracks with real-time search and category browsing.
- **Personal Library**: Access your playlists, liked songs, and recently played tracks.
- **Playlist Management**: Create, edit, and delete playlists directly through the interface.
- **Interactive Player Integration**: Embedded Spotify players for albums and artists.
- **Real-time Feedback**: Toast notifications for user actions (CRUD operations, likes).

## 🛠️ Tech Stack

- **Frontend**: React (Hooks, Context API)
- **Routing**: React Router DOM (v5)
- **API Interaction**: Axios & Custom Hooks
- **Styling**: CSS Modules
- **Authentication**: Spotify OAuth 2.0 (PKCE)
- **Additional Tools**:
  - `react-toastify` for notifications
  - `classnames` for dynamic styling
  - `react-countup` for animated statistics

## 🏗️ Architecture & Design Patterns

The project follows a modular architecture designed for scalability and maintainability:

### 1. Context API State Management

Located in `src/context/SpotifyContext.jsx`, this layer manages:

- Global authentication tokens.
- User profile data.
- **Guest Mode State**: Tracks whether the user is in guest mode with mock data or authenticated with Spotify.
- **Global History Tracking**: Custom logic to track navigation history for the navigation arrows, ensuring they accurately reflect session state.

### 2. Custom Hooks

All API interactions logic is encapsulated in `src/hooks/hook.js`, promoting reusability and clean separation of concerns between UI components and data fetching.

### 3. Data Provider Pattern

The `src/helpers/dataProvider.js` module intelligently routes data requests:

- **Authenticated Mode**: Fetches real data from Spotify Web API.
- **Guest Mode**: Returns curated mock data from `src/helpers/mockData.js` with real Spotify CDN images for a realistic experience.

This abstraction allows seamless switching between modes without component-level changes.

### 4. Component Hierarchy

- **Nav**: Sidebar navigation using `useLocation` for active link highlights without prop drilling.
- **Collection Views**: Standardized views for playlists, artists, and albums for a consistent UX.
- **Creation Flows**: Dedicated forms for interactive playlist management.

## 🏁 Getting Started

### Prerequisites

- Node.js (v14+)
- A Spotify Developer Account (for API credentials)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/aracenasosa/react-spotify.git
   cd react-spotify
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Spotify API**:
   Open `src/components/Login/authorizeConf.js` and add your `clientId`:

   ```javascript
   export const clientId = "YOUR_CLIENT_ID";
   export const redirectUri = "http://localhost:3000/home"; // Or your production URL
   ```

4. **Start the development server**:

   ```bash
   npm start
   ```

5. **Try Guest Mode** (Optional):
   Click "CONTINUE AS GUEST" on the login page to explore the app with mock data without Spotify authentication.

## 🎭 Guest Mode

Guest Mode allows users to explore the application without Spotify authentication, making it perfect for:

- **Demos & Presentations**: Showcase the UI/UX without requiring attendees to log in.
- **Testing & Development**: Quickly test features without API rate limits.
- **User Onboarding**: Let potential users explore before committing to authentication.

### Features in Guest Mode:

- ✅ Browse curated artists, albums, and playlists with real Spotify images
- ✅ View recently played tracks and new releases
- ✅ Search functionality with mock results
- ✅ Navigate through artist and album pages
- ✅ Embedded Spotify players for preview
- ❌ Playlist creation/editing (requires authentication)
- ❌ Personalized recommendations (uses mock data)

### Implementation Details:

Guest mode is managed through:

- **Session Manager** (`src/helpers/sessionManager.js`): Handles guest mode state in localStorage
- **Data Provider** (`src/helpers/dataProvider.js`): Routes requests to mock data or Spotify API
- **Mock Data** (`src/helpers/mockData.js`): Curated dataset with real Spotify CDN URLs

## 📜 Available Scripts


- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

---

_Built with ❤️ by [Carlos Aracena](https://github.com/aracenasosa)_
