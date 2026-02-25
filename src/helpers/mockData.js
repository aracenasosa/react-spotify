/**
 * Mock Data Service with REAL Spotify URLs
 * Uses actual Spotify CDN URLs for images
 * All IDs, images, and metadata are from real Spotify content
 */

// Real Spotify Artists with working image URLs
const theWeeknd = {
  id: '1Xyo4u8uXC1ZmMpatF05PJ',
  name: 'The Weeknd',
  type: 'artist',
  uri: 'spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ',
  images: [
    { url: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb', height: 640, width: 640 },
    { url: 'https://i.scdn.co/image/ab67616100005174214f3cf1cbe7139c1e26ffbb', height: 320, width: 320 },
    { url: 'https://i.scdn.co/image/ab6761610000f178214f3cf1cbe7139c1e26ffbb', height: 160, width: 160 }
  ],
  genres: ['canadian pop', 'pop', 'r&b'],
  followers: { total: 85000000 },
  popularity: 96
};

const tameImpala = {
  id: '5INjqkS1o8h1imAzPqGZBb',
  name: 'Tame Impala',
  type: 'artist',
  uri: 'spotify:artist:5INjqkS1o8h1imAzPqGZBb',
  images: [
    { url: 'https://i.scdn.co/image/ab6761610000e5eb90357ef28b3a012a1d1b2fa2', height: 640, width: 640 },
    { url: 'https://i.scdn.co/image/ab6761610000517490357ef28b3a012a1d1b2fa2', height: 320, width: 320 },
    { url: 'https://i.scdn.co/image/ab6761610000f17890357ef28b3a012a1d1b2fa2', height: 160, width: 160 }
  ],
  genres: ['psychedelic rock', 'indie rock', 'alternative'],
  followers: { total: 5200000 },
  popularity: 82
};

const billieEilish = {
  id: '6qqNVTkY8uBg9cP3Jd7DAH',
  name: 'Billie Eilish',
  type: 'artist',
  uri: 'spotify:artist:6qqNVTkY8uBg9cP3Jd7DAH',
  images: [
    { url: 'https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce', height: 640, width: 640 },
    { url: 'https://i.scdn.co/image/ab676161000051744a8d5ea37f6f622e7f5e1f9d', height: 320, width: 320 },
    { url: 'https://i.scdn.co/image/ab6761610000f1784a8d5ea37f6f622e7f5e1f9d', height: 160, width: 160 }
  ],
  genres: ['pop', 'alternative pop', 'indie pop'],
  followers: { total: 95000000 },
  popularity: 95
};

const arcticMonkeys = {
  id: '7Ln80lUS6He07XvHI8qqHH',
  name: 'Arctic Monkeys',
  type: 'artist',
  uri: 'spotify:artist:7Ln80lUS6He07XvHI8qqHH',
  images: [
    { url: 'https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f', height: 640, width: 640 },
    { url: 'https://i.scdn.co/image/ab676161000051747da39dea0a72f581535fb11f', height: 320, width: 320 },
    { url: 'https://i.scdn.co/image/ab6761610000f1787da39dea0a72f581535fb11f', height: 160, width: 160 }
  ],
  genres: ['indie rock', 'alternative rock', 'garage rock'],
  followers: { total: 12000000 },
  popularity: 85
};

const rhcp = {
  id: '0L8ExT028jH3ddEcZwqJJ5',
  name: 'Red Hot Chili Peppers',
  type: 'artist',
  uri: 'spotify:artist:0L8ExT028jH3ddEcZwqJJ5',
  images: [
    { url: 'https://i.scdn.co/image/ab6761610000e5ebc33cc15260b767ddec982ce8', height: 640, width: 640 },
    { url: 'https://i.scdn.co/image/ab67616100005174c33cc15260b767ddec982ce8', height: 320, width: 320 },
    { url: 'https://i.scdn.co/image/ab6761610000f178c33cc15260b767ddec982ce8', height: 160, width: 160 }
  ],
  genres: ['alternative rock', 'funk rock', 'rock'],
  followers: { total: 18000000 },
  popularity: 83
};

const drake = {
  id: '3TVXtAsR1Inumwj472S9r4',
  name: 'Drake',
  type: 'artist',
  uri: 'spotify:artist:3TVXtAsR1Inumwj472S9r4',
  images: [
    { url: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9', height: 640, width: 640 },
    { url: 'https://i.scdn.co/image/ab676161000051744293385d324db8558179afd9', height: 320, width: 320 },
    { url: 'https://i.scdn.co/image/ab6761610000f1784293385d324db8558179afd9', height: 160, width: 160 }
  ],
  genres: ['canadian hip hop', 'canadian pop', 'hip hop', 'rap'],
  followers: { total: 78000000 },
  popularity: 96
};

export const mockArtists = [theWeeknd, tameImpala, billieEilish, arcticMonkeys, rhcp, drake];

// Real Spotify Albums with working cover art URLs
const afterHours = {
  id: '4yP0hdKOZPNshxUOjY0cZj',
  name: 'After Hours',
  type: 'album',
  uri: 'spotify:album:4yP0hdKOZPNshxUOjY0cZj',
  artists: [{ id: theWeeknd.id, name: theWeeknd.name, uri: theWeeknd.uri }],
  images: [
    { url: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36', height: 640, width: 640 },
    { url: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36', height: 300, width: 300 },
    { url: 'https://i.scdn.co/image/ab67616d000048518863bc11d2aa12b54f5aeb36', height: 64, width: 64 }
  ],
  release_date: '2020-03-20',
  total_tracks: 14
};

const currents = {
  id: '79dL7FLiJFOO0EoehUHQBv',
  name: 'Currents',
  type: 'album',
  uri: 'spotify:album:79dL7FLiJFOO0EoehUHQBv',
  artists: [{ id: tameImpala.id, name: tameImpala.name, uri: tameImpala.uri }],
  images: [
    { url: 'https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79', height: 640, width: 640 },
    { url: 'https://i.scdn.co/image/ab67616d00001e029e1cfc756886ac782e363d79', height: 300, width: 300 },
    { url: 'https://i.scdn.co/image/ab67616d000048519e1cfc756886ac782e363d79', height: 64, width: 64 }
  ],
  release_date: '2015-07-17',
  total_tracks: 13
};

const whenWeAllFallAsleep = {
  id: '0S0KGZnfBGSIssfF54WSJh',
  name: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
  type: 'album',
  uri: 'spotify:album:0S0KGZnfBGSIssfF54WSJh',
  artists: [{ id: billieEilish.id, name: billieEilish.name, uri: billieEilish.uri }],
  images: [
    { url: 'https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce', height: 640, width: 640 },
    { url: 'https://i.scdn.co/image/ab67616d00001e0250a3147b4edd7701a876c6ce', height: 300, width: 300 },
    { url: 'https://i.scdn.co/image/ab67616d0000485150a3147b4edd7701a876c6ce', height: 64, width: 64 }
  ],
  release_date: '2019-03-29',
  total_tracks: 14
};

const am = {
  id: '78bpIziExqiI9qztvNFlQu',
  name: 'AM',
  type: 'album',
  uri: 'spotify:album:78bpIziExqiI9qztvNFlQu',
  artists: [{ id: arcticMonkeys.id, name: arcticMonkeys.name, uri: arcticMonkeys.uri }],
  images: [
    { url: 'https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163', height: 640, width: 640 },
    { url: 'https://i.scdn.co/image/ab67616d00001e024ae1c4c5c45aabe565499163', height: 300, width: 300 },
    { url: 'https://i.scdn.co/image/ab67616d000048514ae1c4c5c45aabe565499163', height: 64, width: 64 }
  ],
  release_date: '2013-09-09',
  total_tracks: 12
};

const unlimitedLove = {
  id: '2Y9IRtehByVkegoD7TcLyP',
  name: 'Unlimited Love',
  type: 'album',
  uri: 'spotify:album:2Y9IRtehByVkegoD7TcLyP',
  artists: [{ id: rhcp.id, name: rhcp.name, uri: rhcp.uri }],
  images: [
    { url: 'https://i.scdn.co/image/ab67616d0000b273a3a7f38ea2033aa501afd4cf', height: 640, width: 640 },
    { url: 'https://i.scdn.co/image/ab67616d00001e02a3a7f38ea2033aa501afd4cf', height: 300, width: 300 },
    { url: 'https://i.scdn.co/image/ab67616d00004851a3a7f38ea2033aa501afd4cf', height: 64, width: 64 }
  ],
  release_date: '2022-04-01',
  total_tracks: 17
};

const scorpion = {
  id: '3SpBlxme9WbeQdI9kx7KAV',
  name: 'Scorpion',
  type: 'album',
  uri: 'spotify:album:3SpBlxme9WbeQdI9kx7KAV',
  artists: [{ id: drake.id, name: drake.name, uri: drake.uri }],
  images: [
    { url: 'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5', height: 640, width: 640 },
    { url: 'https://i.scdn.co/image/ab67616d00001e02f907de96b9a4fbc04accc0d5', height: 300, width: 300 },
    { url: 'https://i.scdn.co/image/ab67616d00004851f907de96b9a4fbc04accc0d5', height: 64, width: 64 }
  ],
  release_date: '2018-06-29',
  total_tracks: 25
};

export const mockAlbums = [afterHours, currents, whenWeAllFallAsleep, am, unlimitedLove, scorpion];

// Real Spotify Tracks with proper album references
export const mockTracks = [
  {
    id: '0VjIjW4GlUZAMYd2vXMi3b',
    name: 'Blinding Lights',
    type: 'track',
    uri: 'spotify:track:0VjIjW4GlUZAMYd2vXMi3b',
    artists: [{ id: theWeeknd.id, name: theWeeknd.name, uri: theWeeknd.uri }],
    album: afterHours,
    duration_ms: 200040,
    preview_url: null,
    popularity: 95
  },
  {
    id: '7fBv7CLKzipRk6EC6TWHOB',
    name: 'Save Your Tears',
    type: 'track',
    uri: 'spotify:track:7fBv7CLKzipRk6EC6TWHOB',
    artists: [{ id: theWeeknd.id, name: theWeeknd.name, uri: theWeeknd.uri }],
    album: afterHours,
    duration_ms: 215626,
    preview_url: null,
    popularity: 90
  },
  {
    id: '6K4t31amVTZDgR3sKmwUJJ',
    name: 'The Less I Know The Better',
    type: 'track',
    uri: 'spotify:track:6K4t31amVTZDgR3sKmwUJJ',
    artists: [{ id: tameImpala.id, name: tameImpala.name, uri: tameImpala.uri }],
    album: currents,
    duration_ms: 216000,
    preview_url: null,
    popularity: 88
  },
  {
    id: '2X485T9Z5Ly0xyaghN73ed',
    name: 'Let It Happen',
    type: 'track',
    uri: 'spotify:track:2X485T9Z5Ly0xyaghN73ed',
    artists: [{ id: tameImpala.id, name: tameImpala.name, uri: tameImpala.uri }],
    album: currents,
    duration_ms: 467000,
    preview_url: null,
    popularity: 75
  },
  {
    id: '2Fxmhks0bxGSBdJ92vM42m',
    name: 'bad guy',
    type: 'track',
    uri: 'spotify:track:2Fxmhks0bxGSBdJ92vM42m',
    artists: [{ id: billieEilish.id, name: billieEilish.name, uri: billieEilish.uri }],
    album: whenWeAllFallAsleep,
    duration_ms: 194000,
    preview_url: null,
    popularity: 92
  },
  {
    id: '43zdsphuZLzwA9k4DJhU0I',
    name: 'when the party\'s over',
    type: 'track',
    uri: 'spotify:track:43zdsphuZLzwA9k4DJhU0I',
    artists: [{ id: billieEilish.id, name: billieEilish.name, uri: billieEilish.uri }],
    album: whenWeAllFallAsleep,
    duration_ms: 196000,
    preview_url: null,
    popularity: 86
  },
  {
    id: '5FVd6KXrgO9B3JPmC8OPst',
    name: 'Do I Wanna Know?',
    type: 'track',
    uri: 'spotify:track:5FVd6KXrgO9B3JPmC8OPst',
    artists: [{ id: arcticMonkeys.id, name: arcticMonkeys.name, uri: arcticMonkeys.uri }],
    album: am,
    duration_ms: 272000,
    preview_url: null,
    popularity: 90
  },
  {
    id: '1r9xUipOqoNwggBpENDsvJ',
    name: 'R U Mine?',
    type: 'track',
    uri: 'spotify:track:1r9xUipOqoNwggBpENDsvJ',
    artists: [{ id: arcticMonkeys.id, name: arcticMonkeys.name, uri: arcticMonkeys.uri }],
    album: am,
    duration_ms: 201000,
    preview_url: null,
    popularity: 87
  },
  {
    id: '3DamFFqW32WihKkTVlwTYQ',
    name: 'Black Summer',
    type: 'track',
    uri: 'spotify:track:3DamFFqW32WihKkTVlwTYQ',
    artists: [{ id: rhcp.id, name: rhcp.name, uri: rhcp.uri }],
    album: unlimitedLove,
    duration_ms: 312000,
    preview_url: null,
    popularity: 70
  },
  {
    id: '2G7V7zsVDxg1yRsu7Ew9RJ',
    name: 'God\'s Plan',
    type: 'track',
    uri: 'spotify:track:2G7V7zsVDxg1yRsu7Ew9RJ',
    artists: [{ id: drake.id, name: drake.name, uri: drake.uri }],
    album: scorpion,
    duration_ms: 198973,
    preview_url: null,
    popularity: 94
  },
  {
    id: '7KA4W4McWYRpgf0fWsJZWB',
    name: 'In My Feelings',
    type: 'track',
    uri: 'spotify:track:7KA4W4McWYRpgf0fWsJZWB',
    artists: [{ id: drake.id, name: drake.name, uri: drake.uri }],
    album: scorpion,
    duration_ms: 217925,
    preview_url: null,
    popularity: 89
  },
  {
    id: '0DiWol3AO6WpXZgp0goxAV',
    name: 'One Dance',
    type: 'track',
    uri: 'spotify:track:0DiWol3AO6WpXZgp0goxAV',
    artists: [{ id: drake.id, name: drake.name, uri: drake.uri }],
    album: scorpion,
    duration_ms: 173987,
    preview_url: null,
    popularity: 92
  }
];

// Real Spotify Playlists with working cover images
export const mockPlaylists = [
  {
    id: '37i9dQZF1DX4dyzvuaRJ0n',
    name: 'Chill Vibes',
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1DX4dyzvuaRJ0n',
    description: 'Relax and unwind with these chill tracks',
    images: [
      { url: 'https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79', height: 640, width: 640 }
    ],
    owner: {
      id: 'spotify',
      display_name: 'Spotify'
    },
    tracks: {
      total: 50,
      items: [
        { track: mockTracks[0] },
        { track: mockTracks[3] },
        { track: mockTracks[5] }
      ]
    },
    public: true
  },
  {
    id: '37i9dQZF1DX76Wlfdnj7AP',
    name: 'Workout Mix',
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1DX76Wlfdnj7AP',
    description: 'High energy tracks to power your workout',
    images: [
      { url: 'https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163', height: 640, width: 640 }
    ],
    owner: {
      id: 'spotify',
      display_name: 'Spotify'
    },
    tracks: {
      total: 40,
      items: [
        { track: mockTracks[2] },
        { track: mockTracks[6] },
        { track: mockTracks[7] }
      ]
    },
    public: true
  },
  {
    id: '37i9dQZF1DX2sUQwD7tbmL',
    name: 'Indie Favorites',
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1DX2sUQwD7tbmL',
    description: 'The best indie tracks from around the world',
    images: [
      { url: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36', height: 640, width: 640 }
    ],
    owner: {
      id: 'user123',
      display_name: 'Music Lover'
    },
    tracks: {
      total: 35,
      items: [
        { track: mockTracks[2] },
        { track: mockTracks[3] },
        { track: mockTracks[9] }
      ]
    },
    public: true
  },
  {
    id: '37i9dQZF1DX4WYpdgoIcn6',
    name: 'Electronic Dreams',
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1DX4WYpdgoIcn6',
    description: 'Journey through electronic soundscapes',
    images: [
      { url: 'https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce', height: 640, width: 640 }
    ],
    owner: {
      id: 'user456',
      display_name: 'DJ Synth'
    },
    tracks: {
      total: 45,
      items: [
        { track: mockTracks[0] },
        { track: mockTracks[1] },
        { track: mockTracks[10] }
      ]
    },
    public: true
  },
  {
    id: '37i9dQZF1DWZd79rJ6a7lp',
    name: 'Late Night Drives',
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1DWZd79rJ6a7lp',
    description: 'Perfect soundtrack for midnight cruising',
    images: [
      { url: 'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5', height: 640, width: 640 }
    ],
    owner: {
      id: 'user789',
      display_name: 'Night Rider'
    },
    tracks: {
      total: 30,
      items: [
        { track: mockTracks[0] },
        { track: mockTracks[1] },
        { track: mockTracks[4] }
      ]
    },
    public: true
  }
];

// Consolidated Mock Data Export
export const mockData = {
  recentlyPlayed: [
    { track: mockTracks[0], played_at: '2024-01-15T10:30:00Z' },
    { track: mockTracks[2], played_at: '2024-01-15T09:15:00Z' },
    { track: mockTracks[4], played_at: '2024-01-15T08:45:00Z' },
    { track: mockTracks[6], played_at: '2024-01-14T22:30:00Z' },
    { track: mockTracks[9], played_at: '2024-01-14T21:00:00Z' }
  ],
  newReleases: mockAlbums,
  featuredPlaylists: mockPlaylists,
  userPlaylists: [mockPlaylists[2], mockPlaylists[4]],
  albums: mockAlbums,
  artists: mockArtists,
  likedSongs: [mockTracks[0], mockTracks[2], mockTracks[4], mockTracks[6], mockTracks[9]],
  searchResults: {
    tracks: mockTracks,
    albums: mockAlbums,
    artists: mockArtists,
    playlists: mockPlaylists
  }
};

export default mockData;
