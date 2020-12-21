let fs=require("fs");
let puppeteer=require("puppeteer");
const { promise } = require("selenium-webdriver");
const challenges = require("./challenges");
let tab;


(async function(){
  try{


    let browser =await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    
    });
    
    let pages= await browser.pages();
    
    tab=pages[0];
    
    await tab.goto("https://www.hackerrank.com/auth/login");
    
    await tab.type("#input-1", "mevawel428@tibui.com");
    
    await tab.type("#input-2", "12345678");
    
 
    await Promise.all(  [ tab.waitForNavigation({waitUntil:"networkidle0"}, tab.click( ".ui-btn.ui-btn-large.ui-btn-primary.auth-button"))]);
    await tab.click(".backbone.nav_link.js-dropdown-toggle.js-link.toggle-wrap");
    await Promise.all(  [ tab.waitForNavigation({waitUntil:"networkidle0"}, tab.click(' a[data-analytics="NavBarProfileDropDownAdministration"]'))]);
     let linksofcontest= await tab.$$(".nav-tabs.nav.admin-tabbed-nav .backbone");
     let ourLink=linksofcontest[1];
     await Promise.all(  [ tab.waitForNavigation({waitUntil:"networkidle0"}, ourLink.click())]);
     let url = await tab.url();
   
     await Promise.all(  [ tab.waitForNavigation({waitUntil:"networkidle0"}, tab.click(".btn.btn-green.backbone.pull-right"))]);
    

     await createChallenge(challenges[0]);

     for(let i=1;i<challenges.length;i++){
       await tab.goto(url);
       await Promise.all([ tab.waitForNavigation({waitUntil:"networkidle0"})   , tab.click(".btn.btn-green.backbone.pull-right")]);
       await createChallenge(challenges[i]);
      

     }
     await tab.goto("https://www.hackerrank.com/dashboard?h_r=logo");





  }  
  catch(error){
    console.log(error);
  }



})();

async function createChallenge(challenge){
try {
        let name = challenge["Challenge Name"];
        let description = challenge["Description"];
        let problem = challenge["Problem Statement"];
        let input = challenge["Input Format"];
        let constraints = challenge["Constraints"];
        let output = challenge["Output Format"];
        let tags = challenge["Tags"];
       
        await tab.waitForSelector("#name",{visible:true});

        await tab.type("#name",name);
        await tab.type("#preview",description)
        await tab.type(".block.span12.profile-input.pull-left .CodeMirror textarea",problem);
        await tab.type("#input_format-container .CodeMirror textarea" , input);
        await tab.type("#constraints-container .CodeMirror textarea"   , constraints);
        await tab.type("#output_format-container .CodeMirror textarea" , output);
        await tab.type("#tags_tag" , tags);
        await tab.keyboard.press("Enter");
        await tab.click(".save-challenge.btn.btn-green");

}
catch(error){
  return error;

}
}