const { test, expect } = require('@playwright/test');
const { beforeEach } = require('node:test');
const SetPageExtenstion = require('../Swaglabs.Automation.Extension/SetPageExtensions');
const ClickPageExtensions = require('../Swaglabs.Automation.Extension/ClickPageExtensions');
const GetPageExtensions = require('../Swaglabs.Automation.Extension/GetPageExtensions');
const HomePageConstants = require('../Swaglabs.Automation.Pom/Constants/HomePageConstants');
const LoginPageConstants = require('../Swaglabs.Automation.Pom/Constants/LoginPageConstants');


test.describe('UI: Checkout Workflow',()=>
{
    //Variable declaration 
    let setPageExtenstion;
    let clickPageExtension;
    let getPageExtension;


  test.beforeEach(async({page})=>
    {

    //Object Creation
    setPageExtenstion =  new SetPageExtenstion(page);
    clickPageExtension = new ClickPageExtensions(page);
    getPageExtension =  new GetPageExtensions(page);

    //go to url
    await page.goto(LoginPageConstants.BaseUrl);
    
    //Enter User Name
    await setPageExtenstion.SetTextBoxValueByPlaceholder(LoginPageConstants.UserNamePlaceholderText,LoginPageConstants.Username);
    
    //Enter Pssword
    await setPageExtenstion.SetTextBoxValueByPlaceholder(LoginPageConstants.PasswordPlaceholderText,LoginPageConstants.Password);
    
    //Click Login button
    await clickPageExtension.ClickButtonByIdAsync(LoginPageConstants.LoginButtonId);    
  });


  test('Checkout process',async({page})=>
    {
      console.log(process.env.url);
      console.log(process.env.name);
      console.log(process.env.password);

        //verify home page url
        let homepageUrl = await page.url();
        console.log(homepageUrl)
        if(homepageUrl != HomePageConstants.HomePageUrl)
        {
            fail("Url Not Matched.");
        }

            //Add to cart : First product
            await clickPageExtension.ClickButtonByIdAsync(HomePageConstants.SauceLabBackPackButtonId);

            //Click on cart icon
            await clickPageExtension.ClickButtonByIdAsync(HomePageConstants.CartIconId);

            //Click on Check out button
            await clickPageExtension.ClickButtonByIdAsync(HomePageConstants.CheckoutButtonId);

            //Enter Information
            await setPageExtenstion.SetTextBoxValueByPlaceholder(HomePageConstants.FirstNameTextBoxPlaceholderText, 'John');
            await setPageExtenstion.SetTextBoxValueByPlaceholder(HomePageConstants.LastNameTextBoxPlaceholderText, 'Doe');
            await setPageExtenstion.SetTextBoxValueByPlaceholder(HomePageConstants.ZipCodeTextBoxPlaceholderText, '123456');
            
            //Click on continue button
            await clickPageExtension.ClickButtonByIdAsync(HomePageConstants.ContinueButtonId);
            
            //Get Payment Information
            var paymentNumber = await getPageExtension.GetInnerTextByLocator(HomePageConstants.PaymentInformationDataTest);
            console.log(paymentNumber);
            
            //Click on finish button
            await clickPageExtension.ClickButtonByIdAsync(HomePageConstants.FinishButtonId);
            //Click on Back home button
            await clickPageExtension.ClickButtonByIdAsync(HomePageConstants.BackHomeButtonId);

    });

  
  

  test.afterEach(async({page})=>
    {

        //Logout

        //Browser Teardown
        await page.close();

    });













});
