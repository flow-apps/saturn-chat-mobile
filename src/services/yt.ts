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
        return player.getDuration()
      }
      function getCurrentTime() {
        return player.getCurrentTime()
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

  private buildYouTubeIFrame(videoID: string, width?: number) {
    return `
      <div id="player"></div>
      <script>
        const tag = document.createElement("script");
        const scriptTag = document.getElementsByTagName("script")[0];
        tag.src = "https://www.youtube.com/iframe_api";
        scriptTag.parentNode.insertBefore(tag, scriptTag);

        let player;
        function onYouTubeIframeAPIReady() {
          player = new YT.Player("player", {
            height: "100%",
            width: ${width || "100%"},
            videoId: "${videoID}",
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
    return `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          border: none;
          outline: none;
        }
        html {
          overflow: hidden;
          height: 100%;
        }
        body {
          background: #000;
          width: 100%;
          height: 100%;
        }
      </style>
    `;
  }

  buildYouTubePlayerHTML(videoID: string, width?: number) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          ${this.buildYouTubePlayerStyle()}
          <meta name="viewport" content="initial-scale=1" />
          <title>Saturn Chat YouTube Player</title>
        </head>
        <body>${this.buildYouTubeIFrame(videoID, width)}</body>
      </html>
      `;
  }
}

export { YTService };
