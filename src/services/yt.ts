import { css } from "styled-components";

class YTService {
  private buildYouTubePlayerControllersScript() {
    return `
      function play() {
        player.playVideo()
      }
      function pause() {
        player.pauseVideo()
      }
      function seekTo(time) {
        player.seekTo(time, true)
      }
      function getDuration() {
        const duration = player.getDuration()
        return duration
      }
      function getCurrentTime() {
        return player.getCurrentTime()
      }

      function onVideoReady(event) {        
        const data = {
          type: "VIDEO_DURATION",
          duration: getDuration()
        }
        window.ReactNativeWebView.postMessage(JSON.stringify(data))
      }

      setInterval(() => {
        const data = {
          type: "VIDEO_TIME_UPDATE",
          currentTime: getCurrentTime()
        }
        window.ReactNativeWebView.postMessage(JSON.stringify(data))
      }, 1000)
    `;
  }

  private buildYouTubeIFrame(videoID: string) {
    return `
      <div id="player"></div>
      <script>
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const scriptTag = document.getElementsByTagName("script")[0];
        scriptTag.parentNode.insertBefore(tag, scriptTag);

        let player;
        function onYouTubeIframeAPIReady() {
          player = new YT.Player("player", {
            width: '100%',
            videoId: "${videoID}",
            events: {
              'onReady': onVideoReady
            },
            playerVars: {
              "playsinline": 1,
              "modestbranding": 1,
              "controls": 0,
              "rel": 0,
              "loop": 1
            }
          })
          MessageInvoker.postMessage("YouTube has loaded")
        }

        ${this.buildYouTubePlayerControllersScript()}
      </script>
      `;
  }

  private buildYouTubePlayerStyle() {
    const style = css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border: none;
        outline: none;
      }
      html {
        overflow-x: hidden;
        overflow-y: hidden;
        height: 100%;
      }
      body {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        background: transparent;
        width: 100%;
        height: 100%;
      }
      #player {
      }
    `;

    return style;
  }

  buildYouTubePlayerHTML(videoID: string) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${this.buildYouTubePlayerStyle()}
          </style>
          <meta name="viewport" content="initial-scale=1" />
          <title>Saturn Chat YouTube Player</title>
        </head>
        <body>${this.buildYouTubeIFrame(videoID)}</body>
      </html>
      `;
  }
}

export { YTService };
