# (CHANGELOG) Saturn Chat Mobile

NOTE: The versions here not represents the release versions, check the App Store's for real app version.

## 0.26.4

- Add FlashList in Chat fro better performance
- Fix group count on create new group

## 0.26.3

- Fix chat scroll
- Remove reversed message component

## 0.26.2

- Fix navigation theme
- Fix socket connection on 1st login
- Add socket depends in useEffect

## 0.26.1

- Fix invites manager
- Remove extra zero in friends counter
- Disable button if the number of friends is zero
- Grow tabBar icons

## 0.26.0

- Fix register form fields
- Fix analytics

## 0.25.0

- Upgrade React Navigation
  - Fix deprecated tab bar options
- Fix Expo Vector Icons

## 0.24.0

- Upgrade Expo from SDK 45 to 47
- Fix deprecated features
- Fix chat FlatList
- Remove Perf from Axios Requests *(temp)*
- Add new localhost IP from API

## 0.23.0

- Add React Native Google Mobile Ads
  - Add app.json
  - Fix AndroidManifest.xml
- Uninstall dependencies
  - Expo Ads AdMob
  - Hermes Engine
- Update React Native Firebase App
- Change Banner
- Change Ads Context

## 0.22.3

- Fix Remote Configs Context
- Fix Perf in create group screen

## 0.22.2

- Add Handle Delete Message in chat context

## 0.22.1

- Improve message component performance
- Add Group ID in all sockets emit
- Get sockets in each message component

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

- Fetch remote configs directly in app, using *React Native Firebase Remote Config*
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

- --Add HTTP Metric in Axios requests-- ***Not working now, check the new versions for solutions***
- Add Analytics in invite screen

## 0.3.1

- Add Firebase Crashlytics
- Add Firebase Performance
- Configure Firebase for more performance in Android
- Add new website url
- Add new Deep Linking for website

## 0.3.0

- Add and configure React Native Firebase
- Add more ads

## 0.2.0

- Fix the websocket connection.

## 0.1.0

- Add fields validation
- Add disable option in buttons
- Add error message in register screen
