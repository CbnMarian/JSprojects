const videoElement = document.getElementById("video");
const button = document.getElementById("button");

//promt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log("we have a problem", error);
  }
}

button.addEventListener("click", async () => {
  //DISABLE BUTTON
  button.disabled = true;
  //start pic
  await videoElement.requestPictureInPicture();
  //reset button
  button.disabled = false;
});

//on Load
selectMediaStream();
