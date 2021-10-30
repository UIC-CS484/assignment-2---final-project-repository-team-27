const { passwordCheck, emailCheck, mobileNumberCheck } = require('./validation');

//normal usage

test('Checks if password is valid', () => {
    expect(passwordCheck('random!Secret123').length).toBe(0)         //the validation function returns an array of criterion not met
})

test('Checks if email is valid', () => {
    expect(emailCheck('waldenschmidt@gmail.com').length).toBe(0)    //so if the array length is 0, it implies all criterion were met
})

test('Checks if mobile number is valid', () => {
    expect(mobileNumberCheck(8722184050).length).toBe(0)          //hence this test checks for normal usage
})

//erroneous input

test('Checks if password is valid', () => {
    expect(passwordCheck('weakpassword').length).toBeGreaterThan(0)         //the validation function returns an
})                                                                              //array of criterion that were not met

test('Checks if email is valid', () => {
    expect(emailCheck('waldenschmidt.com').length).toBeGreaterThan(0)    //so if the array length is greater than 0
})                                                                       //it returns all the criterion that were not met

test('Checks if mobile number is valid', () => {
    expect(mobileNumberCheck(872218405092).length).toBeGreaterThan(0)    //Phone number has to be exactly 10 digits, no more, no less
})                                                                      //hence this checks for erroneous input