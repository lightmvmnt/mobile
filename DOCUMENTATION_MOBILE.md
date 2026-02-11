# Dzala Mobile — Technical Documentation

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Architecture](#architecture)
6. [State Management (Redux)](#state-management-redux)
7. [Navigation](#navigation)
8. [Screens](#screens)
9. [Components](#components)
10. [Authentication](#authentication)
11. [API Integration](#api-integration)
12. [Push Notifications](#push-notifications)
13. [Gamification System](#gamification-system)
14. [Hooks & Utilities](#hooks--utilities)
15. [Styling & Design System](#styling--design-system)
16. [Analytics & Tracking](#analytics--tracking)
17. [Form Management](#form-management)
18. [Localization](#localization)
19. [Development Tooling](#development-tooling)

---

## Overview

Dzala Mobile is a React Native civic engagement platform built for iOS and Android. It enables Georgian citizens to participate in missions/tasks, vote on polls, follow and elect representatives, manage their profiles, and earn points through gamification — all tied to a Node.js/Express backend.

**Language:** Georgian (ქართული)
**Bundle ID:** `org.solvio.dzala` / `com.dzala.mobile`

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | React Native | 0.76.5 |
| UI Library | React | 18.3.1 |
| Language | TypeScript | 5.0.4 |
| State Management | Redux Toolkit | 2.5.0 |
| Navigation | React Navigation (Native Stack) | 7.0.14 |
| UI Kit | React Native Paper | 5.12.5 |
| Animations | React Native Reanimated | 3.17.1 |
| Gestures | React Native Gesture Handler | 2.24.0 |
| Bottom Sheet | @gorhom/bottom-sheet | 5.1.1 |
| Icons | React Native Vector Icons | 10.2.0 |
| SVG | React Native SVG | 15.10.1 |
| HTTP | Axios | 1.7.9 |
| Forms | Formik + Yup | 2.4.6 / 1.6.1 |
| Storage | AsyncStorage | 2.1.0 |
| Auth (Google) | @react-native-google-signin | 13.1.0 |
| Auth (Apple) | react-native-apple-authentication | 2.4.0 |
| Auth (Facebook) | react-native-fbsdk-next | 13.4.1 |
| Push | @react-native-firebase/messaging | 21.6.1 |
| Analytics | react-native-appsflyer | 6.15.3 |
| Dates | dayjs | 1.11.13 |
| Device Info | react-native-device-info | 14.0.2 |
| Config | react-native-config | 1.6.1 |
| Permissions | react-native-permissions | 5.2.1 |
| Clipboard | @react-native-clipboard/clipboard | 1.16.2 |
| Swiper | react-native-swiper | 1.6.0-rc.3 |
| Toasts | react-native-toast-message | 2.2.1 |

---

## Project Structure

```
dzala-mobile/
├── src/
│   ├── assets/
│   │   ├── fonts/                          # Custom font files
│   │   └── icons/                          # SVG icon assets
│   │
│   ├── constants/
│   │   ├── colors.ts                       # Color palette
│   │   ├── environment.ts                  # API URLs, client IDs
│   │   ├── fonts.ts                        # Font family config
│   │   ├── layout.ts                       # Responsive dimensions
│   │   └── index.ts                        # Barrel export
│   │
│   ├── globalComponents/                   # Shared reusable components
│   │   ├── CountIndicator/                 # Completion count badge
│   │   ├── InfoContainer/                  # Stats display card
│   │   ├── InfoTooltip/                    # Tooltip popup
│   │   ├── LogoWithTitle/                  # App branding
│   │   ├── PointIndicator/                 # Points badge
│   │   ├── SafeAreaBackground/             # Screen wrapper (no nav)
│   │   ├── SafeAreaBackgroundWithHeader/   # Screen wrapper + header + bottom nav
│   │   │   ├── Header/                     # Top navigation bar
│   │   │   └── Navigator/                  # Bottom tab navigation
│   │   ├── ScreenHeader/                   # Standalone header
│   │   ├── SimpleButton/                   # Primary button component
│   │   ├── SimpleIndicator/                # Generic indicator
│   │   ├── SimpleModal/                    # Alert/confirmation dialog
│   │   ├── SocialAccountsContainer/        # Social links display
│   │   └── index.ts                        # Barrel export
│   │
│   ├── hooks/
│   │   ├── debounce/                       # Debounce hook
│   │   └── useTaskMetrics.ts               # Task points/completion calculator
│   │
│   ├── modules/                            # Feature modules
│   │   ├── auth/                           # Authentication
│   │   │   ├── components/TACBottomSheet/  # Terms & Conditions sheet
│   │   │   └── screens/Signin/             # Sign-in screen + hook
│   │   │
│   │   ├── home/                           # Dashboard
│   │   │   ├── components/
│   │   │   │   ├── PollsDepartment/        # Featured polls section
│   │   │   │   ├── TasksDepartment/        # Featured tasks section
│   │   │   │   └── UserProgressInfo/       # Points & completion stats
│   │   │   └── screens/Home/               # Home screen
│   │   │
│   │   ├── introduction/                   # Onboarding
│   │   │   ├── components/IntroductionSwiper/
│   │   │   └── screens/                    # Introduction screen
│   │   │
│   │   ├── loading/                        # Splash/init
│   │   │   └── screens/                    # Loading screen
│   │   │
│   │   ├── polls/                          # Polling feature
│   │   │   ├── components/
│   │   │   │   ├── PollCard/               # Poll list item
│   │   │   │   ├── PollDetailsCard/        # Full poll view
│   │   │   │   ├── PollResult/             # Results chart
│   │   │   │   ├── PollStatusIndicator/    # Active/closed badge
│   │   │   │   ├── PollVoteButton/         # Vote option button
│   │   │   │   ├── PollVotesSelector/      # Multi-vote selector
│   │   │   │   └── PollsTabButton/         # Tab switcher
│   │   │   └── screens/
│   │   │       ├── PollDetails/            # Poll details + voting
│   │   │       └── Polls/                  # Polls list
│   │   │
│   │   ├── profile/                        # User profile
│   │   │   ├── components/
│   │   │   │   ├── ProfileEditForm/        # Edit name/email form
│   │   │   │   ├── ProfileForm/            # Display profile
│   │   │   │   ├── ReferralInput/          # Referral link + copy
│   │   │   │   ├── RepresentativeSwitch/   # Toggle leader mode
│   │   │   │   ├── SocialAddModal/         # Add social account modal
│   │   │   │   └── SocialsEditForm/        # Edit social accounts
│   │   │   └── screens/
│   │   │       ├── Profile/                # Profile view
│   │   │       ├── ProfileEdit/            # Edit profile
│   │   │       └── ProfileSettings/        # Settings (logout, delete)
│   │   │
│   │   ├── representative/                 # Leader/representative feature
│   │   │   ├── components/
│   │   │   │   ├── RepresentativeCard/     # Leader list item
│   │   │   │   ├── RepresentativeDetailsButtons/
│   │   │   │   ├── RepresentativeDetailsCard/
│   │   │   │   └── RepresentativeSearchbar/
│   │   │   └── screens/
│   │   │       ├── Representative/         # Leaders list + search
│   │   │       └── RepresentativeDetails/  # Leader profile
│   │   │
│   │   ├── tasks/                          # Missions feature
│   │   │   ├── components/
│   │   │   │   ├── TaskCard/               # Task list item + hook
│   │   │   │   ├── TaskDetailCard/         # Full task view
│   │   │   │   ├── TaskSuggestionCard/     # Suggestion display
│   │   │   │   └── TaskSuggestionModal/    # Suggest a task modal
│   │   │   └── screens/
│   │   │       ├── TaskDetail/             # Task detail view
│   │   │       └── Tasks/                  # Tasks list
│   │   │
│   │   └── update/                         # App update prompt
│   │       └── screens/
│   │
│   ├── services/
│   │   ├── navigation/
│   │   │   └── Base.navigation.tsx         # Navigation container + stack
│   │   ├── notifications/
│   │   │   ├── notificationHandler.ts      # Push notification listeners
│   │   │   └── notificationPermissions.ts  # Request notification perms
│   │   └── tasks/
│   │       └── getTaskComplitionCount.ts    # Task completion count API
│   │
│   ├── store/                              # Redux state management
│   │   ├── store.ts                        # Root store configuration
│   │   ├── modalCallback.ts                # Modal action callback registry
│   │   ├── interceptors/
│   │   │   └── Base.interceptor.tsx        # Axios auth interceptor
│   │   ├── app/                            # Global UI state
│   │   ├── auth/                           # Authentication state
│   │   ├── polls/                          # Polls state
│   │   ├── profile/                        # Profile state
│   │   ├── referral/                       # Referral state
│   │   ├── representatives/                # Representatives state
│   │   └── tasks/                          # Tasks state
│   │
│   ├── types/
│   │   └── types.ts                        # Shared TypeScript types
│   │
│   ├── utils/
│   │   ├── asyncStore.util.ts              # AsyncStorage helpers
│   │   ├── configureNativeComponents.util.ts
│   │   ├── fontSizeGenerator.util.ts       # Responsive font sizing
│   │   ├── heightGenerator.util.ts         # Responsive height calc
│   │   ├── percentageCalculator.util.ts    # Percentage math
│   │   ├── socialAccounts.util.ts          # Social platform helpers
│   │   └── timeCalculator.util.ts          # Time remaining for polls
│   │
│   └── config.ts                           # App-level configuration
│
├── App.tsx                                 # Root component
├── index.js                                # Entry point
├── app.json                                # React Native app config
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
├── jest.config.js
├── .eslintrc.js
├── .prettierrc.js
├── commitlint.config.js
├── android/                                # Android native project
└── ios/                                    # iOS native project
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS dependencies)

### Installation

```bash
cd dzala-mobile
npm install
cd ios && pod install && cd ..
```

### Running

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

### Environment

Configure `.env` with:

```env
API_BASE_URL=http://192.168.0.101:3000     # or production URL
GOOGLE_WEB_CLIENT_ID=...
GOOGLE_IOS_CLIENT_ID=...
APPLE_CLIENT_ID=org.solvio.dzala
FACEBOOK_CLIENT_ID=...
APPSFLYER_DEV_KEY=...
APPSFLYER_APP_ID=...
APPSFLYER_ONE_LINK_ID=...
```

---

## Architecture

### Module-Based Architecture

The app follows a **feature-first module architecture** where each domain feature is self-contained:

```
modules/
  feature/
    components/     # Feature-specific UI components
    screens/        # Full-page screen components
```

### Component Structure Convention

Each component follows a consistent file pattern:

```
ComponentName/
├── ComponentName.tsx          # React component
├── ComponentName.styles.ts    # StyleSheet
├── ComponentName.hook.ts      # Custom hook (optional)
├── ComponentName.types.ts     # TypeScript interfaces (optional)
└── index.ts                   # Barrel export
```

### Data Flow

```
User Action → Screen → dispatch(thunk) → Axios → Backend API
                                              ↓
                           Redux Store ← Reducer ← Thunk fulfilled
                                ↓
                           useSelector() → Screen re-renders
```

### Axios Interceptor

All API calls are routed through a global Axios interceptor (`src/store/interceptors/Base.interceptor.tsx`) that:

1. Attaches `Authorization: Bearer <token>` from Redux auth state
2. Attaches `X-Session-Token` header
3. Sets `Content-Type: application/json`
4. On `401` response: dispatches `Logout` and shows toast
5. On other errors: shows error toast notification

---

## State Management (Redux)

The app uses **Redux Toolkit** with 7 state slices, each following a consistent pattern:

```
store/
  feature/
    feature.slice.ts        # createSlice with reducers + extraReducers
    feature.thunk.ts        # createAsyncThunk API calls
    feature.types.ts        # TypeScript interfaces
    feature.selectors.ts    # Selectors
    index.ts                # Barrel export
```

### Auth Slice (`store/auth/`)

| State Field | Type | Description |
|---|---|---|
| `sessionToken` | `string \| null` | Server session ID |
| `accessToken` | `string \| null` | JWT access token |
| `user` | `User \| null` | Authenticated user object |
| `isAuth` | `boolean` | Authentication status |
| `deviceId` | `string \| null` | Unique device identifier |
| `userTotalPoints` | `number` | Accumulated points |
| `loading` | `boolean` | Auth operation in progress |

**Thunks:**

| Thunk | Description |
|---|---|
| `authentication` | Sign in with OAuth provider token → `/auth/provider/token` |
| `GoogleSignIn` | Trigger Google Sign-In SDK → get ID token → `authentication` |
| `IosSignIn` | Trigger Apple Sign-In → get ID token → `authentication` |
| `CheckSessionValidation` | Validate stored session → `GET /auth/session` |
| `Logout` | Clear tokens, AsyncStorage, navigate to Signin |
| `AccountDeletion` | `DELETE /users/me/` → logout |
| `getUserTotalPoints` | `GET /users/me/points/` |

### Tasks Slice (`store/tasks/`)

| State Field | Type | Description |
|---|---|---|
| `tasks` | `Task[]` | All user missions |
| `taskDetails` | `Task \| null` | Currently viewed task |
| `completedTasksCount` | `number` | Completed count |
| `tasksPoints` | `TaskPoints[]` | Points per task config |
| `loading` | `object` | Per-operation loading flags |

**Thunks:**

| Thunk | Description |
|---|---|
| `getTasks` | `GET /missions/user/:userId/` — auto-creates UserMission records |
| `getTask` | `GET /missions/:id/` |
| `updateTask` | `PUT /missions/:id/` — mark complete/incomplete |
| `getTasksPoints` | `GET /missions/points/` |
| `getCompletedTaskCount` | `GET /missions/user/count/` |
| `sendAndroidDeviceIdForTasks` | `POST /missions/subscribe/gcm` |
| `sendIosDeviceIdForTasks` | `POST /missions/subscribe/apns` |

### Polls Slice (`store/polls/`)

| State Field | Type | Description |
|---|---|---|
| `polls` | `Poll[]` | All polls |
| `inProgressPolls` | `Poll[]` | Active polls |
| `completedPolls` | `Poll[]` | Closed polls |
| `pollDetails` | `Poll \| null` | Currently viewed poll |
| `userPollsVotes` | `GroupedVotes[]` | All user votes grouped by poll |
| `pollVotes` | `PollVote[]` | Votes for current poll |
| `pollResults` | `PollResults \| null` | Results for current poll |
| `pollsPoints` | `PollPoints[]` | Points per poll config |

**Thunks:**

| Thunk | Description |
|---|---|
| `getAllPolls` | `GET /polls/` |
| `getPoll` | `GET /polls/:id/` |
| `getUserPollsVotes` | `GET /polls/votes/` |
| `getPollVote` | `GET /polls/:id/vote/` |
| `postPollVote` | `POST /polls/:id/vote/` |
| `deletePollVote` | `DELETE /polls/:id/vote/:votes` |
| `getPollResults` | `GET /polls/:id/results/` |
| `getPollsPoints` | `GET /polls/points/` |

### Profile Slice (`store/profile/`)

| State Field | Type | Description |
|---|---|---|
| `account` | `Account \| null` | User profile + leader details |
| `socialAccounts` | `SocialAccount[]` | Connected social media |
| `connectedProviders` | `ConnectedProvider[]` | Linked OAuth providers |
| `loading` | `object` | Per-operation loading flags |

**Key types:**

```typescript
interface Account {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  leader_details?: {
    about_me: string;
    is_approved: boolean;
    votes_count: number;
  };
}

interface SocialAccount {
  id: number;
  social_account: string;
  type_id: number;
}

interface ConnectedProvider {
  display: string;
  provider: string;
  uid: string;
}
```

### Representatives Slice (`store/representatives/`)

| State Field | Type | Description |
|---|---|---|
| `representatives` | `Representative[]` | All leaders |
| `representative_details` | `Representative \| null` | Selected leader |
| `chosen_representative_id` | `number \| null` | User's voted leader |

### Referral Slice (`store/referral/`)

| State Field | Type | Description |
|---|---|---|
| `referralLink` | `string \| null` | Generated referral link |
| `referralCount` | `number` | Number of successful referrals |

### App Slice (`store/app/`)

Global UI state for the modal system:

| State Field | Type | Description |
|---|---|---|
| `isModalOpen` | `boolean` | Modal visibility |
| `modalTitle` | `string` | Modal title text |
| `modalDescription` | `string` | Modal body text |
| `mainButtonTitle` | `string` | Primary button label |
| `secondaryButtonTitle` | `string` | Secondary button label |

Uses a callback registry (`modalCallback.ts`) to handle modal button actions.

---

## Navigation

### Stack Structure

The app uses **React Navigation Native Stack** with a flat screen hierarchy:

```
NavigationContainer
  └── NativeStack.Navigator
        ├── Loading              (initial)
        ├── Introduction         (onboarding)
        ├── Signin               (authentication)
        ├── Home                 (dashboard)
        ├── Tasks                (missions list)
        ├── TaskDetail           (mission details)
        ├── Polls                (polls list)
        ├── PollDetails          (poll voting/results)
        ├── Profile              (user profile)
        ├── ProfileEdit          (edit profile)
        ├── ProfileSettings      (settings)
        ├── Representative       (leaders list)
        ├── RepresentativeDetails (leader profile)
        └── Update               (app update prompt)
```

### Bottom Tab Navigation

Rendered inside `SafeAreaBackgroundWithHeader` on authenticated screens:

| Tab | Label (Georgian) | Screen |
|---|---|---|
| Home | მთავარი | Home |
| Tasks | მისია | Tasks |
| Representatives | ვინ | Representative |
| Polls | არჩევანი | Polls |

### Navigation Flow

```
App Launch
    │
    ├── Loading Screen
    │       ├── First launch? → Introduction → Signin
    │       ├── Has stored tokens? → CheckSessionValidation
    │       │       ├── Valid → Home
    │       │       └── Invalid → Signin
    │       └── No tokens → Signin
    │
    ├── Signin → Home
    │
    └── Authenticated Screens (with bottom nav)
            ├── Home → Tasks / Polls / Profile
            ├── Tasks → TaskDetail
            ├── Polls → PollDetails
            ├── Profile → ProfileEdit / ProfileSettings
            └── Representative → RepresentativeDetails
```

---

## Screens

### Loading Screen

**Path:** `src/modules/loading/screens/`

- Shows app logo and background image
- Checks if first launch (shows Introduction if true)
- Validates stored auth session
- Routes to appropriate screen

### Introduction Screen

**Path:** `src/modules/introduction/screens/`

- Swiper-based onboarding carousel
- Sets `firstLaunch` flag in AsyncStorage
- Navigates to Signin on completion

### Signin Screen

**Path:** `src/modules/auth/screens/Signin/`

- Google Sign-In button (Android + iOS)
- Apple Sign-In button (iOS only)
- Terms & Conditions acceptance (bottom sheet)
- Platform detection for conditional rendering
- Device ID retrieval for push notification registration

### Home Screen

**Path:** `src/modules/home/screens/Home/`

- **UserProgressInfo**: Shows completed tasks count and total points
- **TasksDepartment**: Displays first 3 tasks with "See All" link
- **PollsDepartment**: Displays first 3 polls with "See All" link
- Handles referral deep link processing on mount
- Pulls fresh data on focus

### Tasks Screen

**Path:** `src/modules/tasks/screens/Tasks/`

- FlatList of all user missions
- Pull-to-refresh support
- Each task shows: title, points, completion status
- Tap navigates to TaskDetail

### TaskDetail Screen

**Path:** `src/modules/tasks/screens/TaskDetail/`

- Full task description
- External link to task resource (`target_url`)
- Complete/incomplete toggle button
- Points earned display

### Polls Screen

**Path:** `src/modules/polls/screens/Polls/`

- Tab bar: In Progress / Completed
- FlatList of polls filtered by status
- Each poll shows: title, short description, time remaining, status
- Tap navigates to PollDetails

### PollDetails Screen

**Path:** `src/modules/polls/screens/PollDetails/`

- Full poll description
- **Active polls**: Vote interface
  - Single-choice: radio-style selection
  - Multi-choice: checkbox-style selection
  - Submit vote button
- **Closed polls**: Results view with vote counts
- Delete vote capability

### Profile Screen

**Path:** `src/modules/profile/screens/Profile/`

- User stats (completed missions, total points)
- Profile form (display only)
- Referral link with copy-to-clipboard
- Referral count
- Representative switch toggle (apply/resign as leader)
- Navigate to ProfileEdit and ProfileSettings

### ProfileEdit Screen

**Path:** `src/modules/profile/screens/ProfileEdit/`

- Formik form for first name, last name, email
- Social accounts management (add/delete)
- Save button with validation

### ProfileSettings Screen

**Path:** `src/modules/profile/screens/ProfileSettings/`

- Logout button
- Delete account button (with confirmation modal)

### Representative Screen

**Path:** `src/modules/representative/screens/Representative/`

- Search bar with debounced input
- FlatList of approved leaders
- Each shows: name, votes count, approval badge

### RepresentativeDetails Screen

**Path:** `src/modules/representative/screens/RepresentativeDetails/`

- Leader bio (`about_me`)
- Social accounts list
- Vote/change vote/remove vote buttons
- Vote count display

### Update Screen

**Path:** `src/modules/update/screens/`

- Prompts user to update the app
- Force update or skip option

---

## Components

### Global Components (`src/globalComponents/`)

| Component | Description |
|---|---|
| `SafeAreaBackground` | Screen wrapper for unauthenticated screens (safe area + background) |
| `SafeAreaBackgroundWithHeader` | Screen wrapper for authenticated screens (header + bottom nav + safe area) |
| `Header` | Top bar with user info and navigation |
| `Navigator` | Bottom tab bar (4 tabs: Home, Tasks, Representatives, Polls) |
| `SimpleButton` | Primary button with loading state, icon support, custom colors |
| `SimpleModal` | Alert/confirmation dialog with title, description, primary + secondary buttons |
| `PointIndicator` | Points earned badge with loading state |
| `CountIndicator` | Completion count badge |
| `InfoContainer` | Stats card (icon + title + count) with custom colors |
| `InfoTooltip` | Contextual tooltip popup |
| `LogoWithTitle` | App logo + title branding |
| `ScreenHeader` | Standalone screen header |
| `SimpleIndicator` | Generic indicator component |
| `SocialAccountsContainer` | Renders list of social media links |

### Feature Components

#### Auth

| Component | Description |
|---|---|
| `TACBottomSheet` | Bottom sheet with Terms & Conditions, must accept before signin |

#### Home

| Component | Description |
|---|---|
| `UserProgressInfo` | Displays completed tasks count + total points in two InfoContainers |
| `TasksDepartment` | Featured tasks section (first 3 tasks) + "See All" button |
| `PollsDepartment` | Featured polls section (first 3 polls) + "See All" button |

#### Tasks

| Component | Description |
|---|---|
| `TaskCard` | Task list item: title, points, completion checkbox |
| `TaskDetailCard` | Full task view with external link and complete button |
| `TaskSuggestionCard` | Suggested task display |
| `TaskSuggestionModal` | Modal for suggesting new tasks |

#### Polls

| Component | Description |
|---|---|
| `PollCard` | Poll list item: title, description, time remaining, status indicator |
| `PollDetailsCard` | Full poll with voting interface or results |
| `PollVoteButton` | Individual vote option button (selected/unselected states) |
| `PollVotesSelector` | Multi-vote selection interface |
| `PollResult` | Results display with vote counts per option |
| `PollStatusIndicator` | Active/completed status badge |
| `PollsTabButton` | Tab switcher (In Progress / Completed) |

#### Profile

| Component | Description |
|---|---|
| `ProfileForm` | Read-only profile display |
| `ProfileEditForm` | Editable profile form (Formik + Yup validation) |
| `ReferralInput` | Referral link display + copy button + referral count |
| `SocialsEditForm` | Social media accounts editor (add/remove) |
| `SocialAddModal` | Modal for adding a new social account |
| `RepresentativeSwitch` | Toggle to apply as / resign from leader |

#### Representative

| Component | Description |
|---|---|
| `RepresentativeCard` | Leader list item: name, votes, status |
| `RepresentativeDetailsCard` | Full leader profile with bio |
| `RepresentativeDetailsButtons` | Vote/change/remove vote action buttons |
| `RepresentativeSearchbar` | Debounced search input |

---

## Authentication

### Supported Providers

| Provider | SDK | Platform |
|---|---|---|
| Google | `@react-native-google-signin/google-signin` | iOS + Android |
| Apple | `@invertase/react-native-apple-authentication` | iOS only |
| Facebook | `react-native-fbsdk-next` | iOS + Android |

### Authentication Flow

```
1. User taps "Sign in with Google/Apple"
2. Check T&C acceptance (stored in AsyncStorage)
   └── Not accepted → Show TACBottomSheet → Accept
3. Launch native OAuth SDK
   ├── Google: GoogleSignin.signIn() → get idToken
   └── Apple: appleAuth.performRequest() → get identityToken
4. Dispatch `authentication` thunk
   └── POST /auth/provider/token { provider, token: { id_token, client_id } }
5. Receive { access_token, session_token, user }
6. Store tokens in Redux + AsyncStorage
7. Retrieve device FCM/APNS token
8. Register device: POST /missions/subscribe/gcm or /apns
9. Navigate to Home screen
```

### Session Persistence

On app launch (Loading screen):
1. Read `accessToken` and `sessionToken` from AsyncStorage
2. If found → dispatch `CheckSessionValidation`
3. `GET /auth/session` with stored tokens
4. Valid → populate Redux, navigate to Home
5. Invalid → clear storage, navigate to Signin

### Token Injection

The Axios interceptor (`src/store/interceptors/Base.interceptor.tsx`) automatically:
- Adds `Authorization: Bearer <accessToken>` to every request
- Adds `X-Session-Token: <sessionToken>` header
- On 401 → dispatches `Logout`, shows toast, navigates to Signin

---

## API Integration

### Base Configuration

```typescript
// src/constants/environment.ts
const environment = {
  API_BASE_URL: 'https://solar-bolt-445009-p8.lm.r.appspot.com', // production
  // API_BASE_URL: 'http://192.168.0.101:3000',                  // development
};
```

### Endpoint Map

| Feature | Endpoint | Method |
|---|---|---|
| **Auth** | `/auth/provider/token` | POST |
| | `/auth/session` | GET |
| **User** | `/users/me/` | GET, PATCH, DELETE |
| | `/users/me/points/` | GET |
| | `/users/me/social-account/` | GET, POST |
| | `/users/me/social-account/:id` | DELETE |
| **Referral** | `/users/referral/` | POST |
| | `/users/referral/count/` | GET |
| **Providers** | `/account/providers` | GET, DELETE |
| **Tasks** | `/missions/user/:userId/` | GET |
| | `/missions/:id/` | GET, PUT |
| | `/missions/user/count/` | GET |
| | `/missions/points/` | GET |
| | `/missions/count/:taskId/` | GET |
| | `/missions/subscribe/gcm` | POST |
| | `/missions/subscribe/apns` | POST |
| **Polls** | `/polls/` | GET |
| | `/polls/:id/` | GET |
| | `/polls/votes/` | GET |
| | `/polls/:id/vote/` | GET, POST |
| | `/polls/:id/vote/:votes` | DELETE |
| | `/polls/:id/results/` | GET |
| | `/polls/points/` | GET |
| **Leaders** | `/users/leaders/` | GET |
| | `/users/leader/:id` | GET |
| | `/users/leader/` | POST, PUT, DELETE |
| | `/users/leader/vote/` | GET, POST, PUT, DELETE |

### Error Handling

All thunks follow the same error pattern:

```typescript
export const someThunk = createAsyncThunk(
  'feature/action',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/endpoint`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
```

---

## Push Notifications

### Setup

- **Android**: Firebase Cloud Messaging via `@react-native-firebase/messaging`
- **iOS**: Apple Push Notification Service via Firebase (handles APNS internally)

### Permission Flow

```
1. App launch → request notification permission
2. Permission granted → get FCM token
3. Register token with backend:
   ├── Android: POST /missions/subscribe/gcm
   └── iOS: POST /missions/subscribe/apns
4. Listen for incoming notifications
5. Handle notification tap → navigate to relevant screen
```

### Implementation

- **`notificationPermissions.ts`**: Requests platform-specific notification permissions
- **`notificationHandler.ts`**: Sets up foreground/background notification listeners

---

## Gamification System

### Points

Users earn points through:
- **Completing missions/tasks** — points defined per mission in `MissionPoints`
- **Voting in polls** — points defined per poll in `PollPoints` (first vote only)

Points are displayed in:
- Home screen `UserProgressInfo` component
- Profile screen stats section
- Task cards (individual task points)

### Missions

- All active missions auto-assigned to users on first fetch
- Users mark missions complete via toggle
- Each mission links to an external URL (target_url)
- Completion counts are publicly trackable

### Referral System

- Each user gets a unique referral link (generated via AppsFlyer OneLink)
- Link can be copied to clipboard and shared
- Referral count displayed on Profile screen
- Deep link processing on Home screen mount

---

## Hooks & Utilities

### Custom Hooks

| Hook | Location | Description |
|---|---|---|
| `useSignin` | `modules/auth/screens/Signin/Signin.hook.ts` | Manages sign-in flow, T&C acceptance, platform detection |
| `useTask` | `modules/tasks/components/TaskCard/TaskCard.hook.ts` | Task card logic: points calculation, completion toggle, navigation |
| `useTaskMetrics` | `hooks/useTaskMetrics.ts` | Calculates total points and completion percentage |
| `useDebounce` | `hooks/debounce/` | Debounces rapidly changing values (used in search) |

### Utilities

| Utility | Description |
|---|---|
| `asyncStore.util.ts` | `GetStorageObject`, `SetStorageObjectValue`, `RemoveStorageValue` — AsyncStorage wrappers |
| `fontSizeGenerator.util.ts` | Generates responsive font sizes based on screen dimensions |
| `heightGenerator.util.ts` | Generates responsive heights based on screen dimensions |
| `percentageCalculator.util.ts` | Calculates percentages for UI elements |
| `timeCalculator.util.ts` | Computes remaining time for polls (returns human-readable string) |
| `socialAccounts.util.ts` | Maps social platform type IDs to names/icons |
| `configureNativeComponents.util.ts` | Initializes native components (Reanimated, etc.) |

---

## Styling & Design System

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| Primary | `#E33122` | Main brand color, buttons, accents |
| Primary Alt | `#EB2027` | Secondary brand red |
| Secondary | `#FFC71E` | Gold/yellow, highlights, points |
| Light | `#FFFFFF` | Backgrounds, text on dark |
| Dark | `#000000` | Text, dark backgrounds |
| Gray | `#F3F4F6` | Card backgrounds, dividers |
| Info Background | `#FEECC7` | Info/warning sections |

### Typography

- Custom fonts loaded via `src/assets/fonts/`
- Font families defined in `src/constants/fonts.ts`
- Responsive sizing via `fontSizeGenerator.util.ts`

### Layout System

- Responsive dimensions via `src/constants/layout.ts`
- Height calculations based on screen height
- Width-based spacing and padding

### Component Styling

All styles use React Native `StyleSheet.create()` in dedicated `.styles.ts` files alongside their components.

---

## Analytics & Tracking

### AppsFlyer Integration

- **SDK:** `react-native-appsflyer` v6.15.3
- Tracks user attribution and installs
- Generates OneLink referral URLs
- Handles deep link callbacks
- Custom user ID set on authentication

### Configuration

```
APPSFLYER_DEV_KEY=...
APPSFLYER_APP_ID=...
APPSFLYER_ONE_LINK_ID=...
```

---

## Form Management

### Stack

- **Formik** — form state management
- **Yup** — schema-based validation

### Usage

Used in:
- `ProfileEditForm` — edit first name, last name, email
- `SocialsEditForm` — manage social media accounts
- `SocialAddModal` — add new social account

Example validation schema:
```typescript
const validationSchema = Yup.object({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email'),
});
```

---

## Localization

The app is localized entirely in **Georgian** (ქართული):

| English | Georgian |
|---|---|
| Home | მთავარი |
| Mission/Tasks | მისია |
| Who (Representatives) | ვინ |
| Choice (Polls) | არჩევანი |

All user-facing strings are in Georgian. No i18n library is currently used — strings are hardcoded in components.

---

## Development Tooling

### Linting & Formatting

| Tool | Config File | Description |
|---|---|---|
| ESLint | `.eslintrc.js` | Code quality rules |
| Prettier | `.prettierrc.js` | Code formatting |
| lint-staged | `package.json` | Pre-commit formatting |
| Husky | `.husky/` | Git hooks |
| commitlint | `commitlint.config.js` | Conventional commit messages |

### Build Configuration

| Tool | Config File | Description |
|---|---|---|
| Babel | `babel.config.js` | JS transpilation, module-resolver |
| Metro | `metro.config.js` | Bundler config, SVG transformer |
| TypeScript | `tsconfig.json` | TS compilation options |
| Jest | `jest.config.js` | Testing configuration |

### Scripts

| Script | Description |
|---|---|
| `npm start` | Start Metro bundler |
| `npm run android` | Build & run on Android |
| `npm run ios` | Build & run on iOS |
| `npm test` | Run Jest tests |
| `npm run lint` | Run ESLint |
