const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{const b=await chromium.launch({headless:true,channel:'msedge'});const p=await b.newPage({viewport:{width:1000,height:800}});await p.goto(pathToFileURL(path.resolve('assets/video/nohvo-abertura.mp4')).href);await p.waitForFunction(()=>document.querySelector('video')?.readyState>=2);console.log(await p.locator('video').evaluate(v=>{v.pause();v.currentTime=2;return {width:v.videoWidth,height:v.videoHeight,duration:v.duration}}));await p.waitForTimeout(500);await p.screenshot({path:'docs/video-frame.png'});await b.close()})()
