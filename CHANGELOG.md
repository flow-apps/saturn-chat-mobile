# (CHANGELOG) Saturn Chat Mobile

NOTE: The versions here not represents the release versions, check the App Store's for real app version.

## 0.22.0

- Start refactor Websocket system
  - Add Websocket manager in React Context
  - Connect in the WS only signed
  - Auto Reconnect attempt
- Refactor auth context for arrow functions
- Fix file selector types

## 0.21.1

- Add Notification Opened Handler
- Open messages in the chat
- Refactor routes
- Add Notification Types

## 0.21.0

- Add OneSignal Notification
- Remove UserID and Email on logout
- Add new register notification
- Fix toggle notification state
- Disable push notification in OneSignal when disable on app
- Move OneSignal instance to config file

## 0.20.3

- Open app links inside app
- Fix deep links
- Add link utils

## 0.20.2

- Fetch remote configs directly in app, using _React Native Firebase Remote Config_
  - Add default configs
  - Add cache

## 0.20.1

- Fix DFS (Download Files System)
- Fix the PDF Previewer

## 0.20.0

### Fixing bugs

- Add array utils based in "for-loop"
  - Add array utils in components
- Fix header title and extra header buttons
- Add animations
- Padronize video players

## 0.19.4

- Add fullscreen in YouTube Player
- Improve style

## 0.19.3

- Add YouTube IFrame modal in link preview
- Open YouTube Video Player in app
  - Add video controls
    - Play, pause and seek to
    - Auto show/hide controls
    - Animations
  - Add button to open video in the link preview
- Improve link preview performance

## 0.19.2

- Fix bugs
- Add aspect ratio on image in Link Preview
- Open Image Preview on click in image of the Link Preview
- Add title in IN APP BROWSER

## 0.19.1

- Add Link Preview in messages
  - Add website name
  - Add website title
  - Add website icon/favicon
  - Add website description
  - Add website image
- Copy links in your preview
- Switch primary and secondary color in IAB (IN APP BROWSER)

## 0.19.0

- Invites card in message
- Open Saturn Chat links without warnings

## 0.18.0

- Invite friends to groups
- Add cached image with placeholder in all screens
- Improve style

## 0.17.0

- Add direct messages list
- Improve chat for direct messages
- Improve participant menu and group menu for direct messages
- Fix friend button

## 0.16.0

- Upgrade Expo and React Native
- Fix types of Typescript

## 0.15.2

- Stop audios on delete message

## 0.15.1

- Integrate Audio Player Context to Audio Previewer
- Improve unload audios feature

## 0.15.0

- Add Audio Player Context
  - Integrate to Voice Message Player
  - Add Play/Pause feature
  - Add Load/Unload audios
  - Add change current audio position feature
  - Pause an audio when another is requested for play
- Unload all audios on left chat

## 0.14.0

- Add audio previewer
  - Change icon for audio file preview
  - Add audio player in file preview
  - Add memo in audio player
- Fix file usage calc
- Fix many socket connections
- Improve more style in recording audio component
- Change chat input style

## 0.13.0

- Add reply message

## 0.12.1

- Fix styles for light mode
- Add new remote config
- Add new premium vantage
- Fix edit group
- Add warn on reach max message length

## 0.12.0

- Remove emoji picker
- Change role working
- Kick user working
- Change icon on switch theme

## 0.11.0

- Add indicator for sending/sended message

## 0.10.0

- Add Video Previewer with thumbnail
- Add PDF Previewer

## 0.9.0

- Open link in app (IN APP BROWSER)

## 0.8.0

- Add bio in user profile

## 0.7.0

- Add roles and verification for role change and use resources
- Improve more performance in chat

## 0.6.0

- Online/offline system added
- Removed all console.log's

## 0.5.0

- Add toast for indicate request failed
- Enable/disable notifications

## 0.4.1

- Add animations in more components
- Fix duplicates names in users typing
- Remove ad from chat screen

## 0.4.0

- Add Moti
- Add animation in some components
- Fix file selector
  - Fix total files size on remove a file

## 0.3.2

- Add HTTP Metric in Axios requests
- Add Analytics in invite screen

## 0.3.1

- Add Firebase Crashlytics
- Add Firebase Performance
- Configure Firebase for more performance in Android
- Add new website url
- Add new Deep Linking for website

## 0.3.0

- Add and configure React Native Firebase
- Add more ads in many screens

## 0.2.0

- Fix the websocket connection.

## 0.1.0

- Add fields validation in many screens
- Add disable option in buttons
- Add error message in register screen
