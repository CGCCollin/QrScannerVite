
import { test, describe,expect, beforeAll } from "vitest";
import read from '../read'
import capture from '../capture'

//intializing DOM element variables
var video:HTMLVideoElement;
var canvas:HTMLCanvasElement;
var ctx:CanvasRenderingContext2D;
var dataURL:string;

//define sleep function to stop flow of code to allow for loading of resources
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setupResources(){
    //initializing variables
    video = document.body.appendChild(document.createElement('video'));
    canvas = document.body.appendChild(document.createElement('canvas'))
    ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
    //Preparing video to display thumbnail
    video.setAttribute('visibility','true')
    //Preload tag is very important. Loads video before it is displayed providing something for the canvas to draw.
    video.preload='auto'
    video.width = 640;
    video.height = 480;
    video.src=''
    //Preparing canvas to capture video
    canvas.style.visibility = 'visiblee'
    canvas.width = 640;
    canvas.height = 480;
    //Draw empty video to create empty canvas
    ctx.drawImage(video, 0, 0,canvas.width,canvas.height)
    dataURL = canvas.toDataURL('image/png');
}

beforeAll(async() => {
    console.log('Loading Resources')
    const loadStart = Date.now()
    await setupResources()
    const loadfinish = Date.now()
    console.log('Resources Loaded in ' + (loadfinish - loadStart) + 'ms')

})

describe('Testing read function, and capture + read integration', () => {
    test('Testing with empty canvas', async() => {
        const output = await read(dataURL);
        expect(output).toEqual('No QR code found');
    });

    test('Testing with vdeio containing no QR code', async() => {
        ctx.drawImage(video, 0, 0,canvas.width,canvas.height);
        const output = await read(dataURL);
        expect(output).toEqual('No QR code found');
    });

    test('Testing with image containing valid QR-code', async() => {
        video.src='{VIDEO HERE}'
        console.log(video.src)
        await sleep(1000)
        ctx.drawImage(video, 0, 0,canvas.width,canvas.height);
        
        const output = await read(canvas.toDataURL('image/jpeg'))
        console.log(output)
        expect(output).toEqual('https://youtu.be/BBGEG21CGo0');
    });

    test('Testing with image with null string (Should cause an error)', async() => {
        read('')
    });

    test('Testing with capture function', async() => {
        const imageURL = capture(video,canvas,ctx)
        const output = await read(imageURL)
        expect(output).toEqual('https://youtu.be/BBGEG21CGo0');
    });

});

