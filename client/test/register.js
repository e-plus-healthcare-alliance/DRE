
var path = require('path');
var common = require(path.join(__dirname, '../../test/common/common.js'));


describe('register user', function() {
    var registerLink = element.all(by.css('.navbar-right a')).first();
    

    function registerTest() {
    	registerLink.click();

        var username = element(by.model('inputLogin'));
        var email = element(by.model('inputEmail'));
        var password = element(by.model('inputPassword'));
        var repeatPassword = element(by.model('inputRepeatPassword'));

        username.sendKeys('protractor_test');
        email.sendKeys('isabella@gmail.com');
        password.sendKeys('Protractor');
        repeatPassword.sendKeys('Protractor');
        element(by.id('next1')).click();

        var firstname = element(by.model('inputFirst'));
        var middlename = element(by.model('inputMiddle'));
        var lastname = element(by.model('inputLast'));
        var dob = element(by.model('inputDOB'));
        var gender = element(by.model('inputGender'));

        firstname.sendKeys('Isabella');
        middlename.sendKeys('M');
        lastname.sendKeys('Jones');
        dob.sendKeys('05011975');
        gender.sendKeys('f');

        element(by.id('next2')).click();
        element(by.id('next3')).click();


    }

    beforeEach(function() {
        browser.get('http://localhost:3000/');
        browser.driver.manage().window().setSize(1280, 1024);
    });

    afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
        var errors = 0
        browserLog.forEach(function (log) {
            if (log.level.value >= 1000) {
                errors++;
            };
        })
      expect(errors).toEqual(0);
      // Uncomment to actually see the log.
      console.log('log: ' + require('util').inspect(browserLog));
    });
  });

    it('register test', function() {
        
    	common.removeAll(function () {
            return;
        });
        registerTest();
        
        //browser.pause();

        expect(browser.getLocationAbsUrl()).toContain('home');

    });
});