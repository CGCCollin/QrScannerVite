export default function capture(video: HTMLVideoElement, canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    try{
        ctx.drawImage(video,0,0,canvas.width,canvas.height);
        const imageURL: String = canvas.toDataURL('image/jpeg');
        return imageURL
    }catch(e){
        console.error(e)
        return e
    }
}
