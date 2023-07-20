import { beforeAll,test,describe,expect } from "vitest";
import  capture  from "../capture";
var video: HTMLVideoElement;
var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

function loadResources(){
    video = document.body.appendChild(document.createElement('video'));
    canvas = document.body.appendChild(document.createElement('canvas'))
    ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
    //Preparing video to display thumbnail
    video.setAttribute('visibility','true')
    video.preload='auto'
    video.width = 640;
    video.height = 480;
    video.src=''
    canvas.width = 640;
    canvas.height = 480;


}

beforeAll(async() => {
    console.log('Loading Resources')
    const loadStart = Date.now()
    await loadResources()
    console.log('Resources Loaded in ' + (Date.now() - loadStart) + 'ms')

});

describe('Testing capture function', () => {
    test('Testing with null video element', async() => {
         capture(null,canvas,ctx);
    });
    test('Testing with null canvas element', async() => {
         capture(video,null,ctx);
    });
    test('Testing with null context', async() => {
        capture(video,canvas,null)
    });
    test('All null elements', async() => {      
         capture(null,null,null);
    });
    test('Sourcless video element', async() => {
        expect(typeof capture(video,canvas,ctx) === "string").toEqual(true)
    });
    test('Valid video element', async() => {
        video.src='src\\tests\\WIN_20230719_17_12_05_Pro.mp4'
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(typeof capture(video,canvas,ctx) === "string").toEqual(true)
    });
});