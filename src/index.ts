//dependancies
import QrScanner from 'qr-scanner'
import capture from './capture';
import read from './read';


// Getting html elements
const video: HTMLVideoElement = <HTMLVideoElement>document.getElementById('videoElement');
const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
//optimizing canvas for frequent reads
canvas.setAttribute('willReadFrequently','true')
//hide as to not upset client UX
canvas!!.style.visibility = 'hidden'
canvas.width = 640;
canvas.height = 480;
const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas!!.getContext('2d');
const captureButton:HTMLButtonElement = <HTMLButtonElement> document.getElementById('capture');
const output: HTMLLinkElement = <HTMLLinkElement> document.getElementById('output');
var captureID: any = null


//based on captureID, starts continuous capture over interval of 16ms
captureButton!!.addEventListener('mousedown',async (event) =>{
    console.log('Reading images...');
    if(captureID==null){
        setInterval(read,16,capture(video,canvas,ctx),output);
    }
})

//stops capture if ID is non null
captureButton!!.addEventListener('mouseup',(event) =>{
  if(captureID!=null){
    clearInterval(captureID)
    captureID = null
  }
})

// Check if getUserMedia is supported by the browser
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Request access to the user's webcam
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      // Display the video stream in the video element
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.error('Error accessing the webcam: ', error);
    });
} else {
  console.error('getUserMedia is not supported by your browser');
}

