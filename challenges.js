const puppy  = require("puppeteer");


let moderatrors = ["maiya_o", "SAKSHAMVIPER","KingGeneral","sp24174871","praveenthedev ","mithumhetre0001","qkrrbtjd90","davidmcgowan001","fsfsdf5","yashpalsinghdeo1"];
let challenges = ["practice0","practice1","practice2","practice3","practice4","practice5","practice6","practice7","practice8","practice9"];
async function openBrowser(url){
    const browser = await puppy.launch({
        headless: false,   //for visibility of browser
        defaultViewport : false,   // for proper view of content on b.rowser
        args:[
            '--start-maximized'  //for fullscreen of browser
        ]
        //sloMO : 250
        
    })
    //console.log(browser);
   // await browser.newPage();
   // let tabs = await browser.pages();
    //console.log(tabs.length);
   // let currentTab = tabs[0];
   // await currentTab.goto(url);

// browser.pages().then(function(tabs){  //pages array of current tabs
//     tabs[0].goto(url);
// })
//    for(let i=0;i<9;i++){
//        browser.newPage().then( function(tab){
//           tab.goto(url);
//        })
//    }   username text-ellipsis

const tabs = await browser.pages();
const tab = tabs[0];
await tab.goto(url);
let usernameinput = await tab.$("#input-1"); 
let passwordinput = await tab.$("#input-2");
let rememberinput = await tab.$(".checkbox-input");
let loginclick = await tab.$('[data-analytics="LoginPassword"]');
 

                                   await usernameinput.type("detav15900@tinilalo.com");
                                   await passwordinput.type("tempo@123");

                                   await rememberinput.click();
                                   await loginclick.click();


                                   await tab.waitForNavigation({waitUntil : "networkidle2"});
                                  await tab.waitForSelector('[data-analytics="NavBarProfileDropDown"]',{
                                        visible : true
                                   })
                                 let profilebut = await tab.$('[data-analytics="NavBarProfileDropDown"]');
                                await profilebut.click();
                                let adminisclick = await tab.$('[data-analytics="NavBarProfileDropDownAdministration"]');
                                await adminisclick.click();
                                await tab.waitForNavigation({waitUntil : "networkidle2"});
                                await tab.waitForSelector(".admin-tabbed-nav a");
                                let administrationtabs = await tab.$$(".admin-tabbed-nav a");
                                await administrationtabs[1].click();
                                await tab.waitForSelector(".btn.btn-green.backbone.pull-right");
                                let createChallengeButton =  await tab.$(".btn.btn-green.backbone.pull-right");
                                let createChallengeUrl = await tab.evaluate(function(ele){
                                  return ele.getAttribute("href");
                              },createChallengeButton);
                              for(let i = 0; i < challenges.length; i++) {
                                  await createChallenge("https://www.hackerrank.com" + createChallengeUrl,challenges[i],tab)
                              }
                          }


                           async function createChallenge(url,challenge,tab){
                               // await createchallenges.click();
                               await tab.goto(url);
                                await tab.waitForSelector("#input_format-container .CodeMirror-code");
                                let challengesname = await tab.$("#name");
                                let challengespreview = await tab.$("#preview");
                                await challengesname.type(challenge);
                                await challengespreview.type(challenge);

                                let codeTextAreas = await tab.$$(".CodeMirror-code");

                                await tab.evaluate( () => {
                                    window.scrollBy(0, window.innerHeight);
                                });
                                for(let i in codeTextAreas) {
                                    await codeTextAreas[i].click();
                                    await codeTextAreas[i].type(challenge);
                            }

                            await tab.waitForSelector("#tags_tagsinput");
                            let taginput = await tab.$("#tags_tagsinput");
                            await taginput.click();
                            await taginput.type(challenge);
                            await tab.keyboard.press("Enter");
                            await tab.waitForSelector(".save-challenge.btn.btn-green")
                            let saveChangesButton = await tab.$(".save-challenge.btn.btn-green");
                          await saveChangesButton.click();
                          await tab.waitForSelector('[data-tab="moderators"]');
                         let moderatorButton = await tab.$('[data-tab="moderators"]');
                          await moderatorButton.click();
                          await tab.waitForSelector("#moderator")
                          let moderatorTextArea = await tab.$("#moderator");
                          for(let i =0;i<moderatrors.length;i++){
                            await moderatorTextArea.type(moderatrors[i]);
                            await tab.keyboard.press("Enter");
                          }
                          await tab.waitForSelector(".save-challenge.btn.btn-green")
                          let savechangeagain = await tab.$(".save-challenge.btn.btn-green")
                          await savechangeagain.click();
                        



}
openBrowser("https://www.hackerrank.com/auth/login");