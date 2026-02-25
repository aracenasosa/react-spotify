# Spotify Clone - React application

A professional, full-featured Spotify clone built with React and the Spotify Web API. This project demonstrates modern frontend practices, including state management with Context API, custom hooks for API interaction, and a responsive UI.

## 🚀 Key Features

- **Spotify Authentication**: Seamless login flow using PKCE-based authorization.
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
- **Global History Tracking**: Custom logic to track navigation history for the navigation arrows, ensuring they accurately reflect session state.

### 2. Custom Hooks

All API interactions logic is encapsulated in `src/hooks/hook.js`, promoting reusability and clean separation of concerns between UI components and data fetching.

### 3. Component Hierarchy

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

## 📜 Available Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

---

_Built with ❤️ by [Carlos Aracena](https://github.com/aracenasosa)_
