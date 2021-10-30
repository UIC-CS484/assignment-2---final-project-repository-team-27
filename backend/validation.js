const passwordValidator = require('password-validator');

passwordCheck = (secret) => {
    const schema = new passwordValidator();
    schema
        .is().min(8)                                                         //    Minimum length 8     \\
        .is().max(20)                                                       //     Maximum length 20     \\
        .has().uppercase()                                                 // Must have uppercase letters \\
        .has().lowercase()                                                //  Must have lowercase letters  \\
        .has().symbols()                                                 //        Must have symbols        \\
        .has().digits()                                                 //         Must have digits          \\
        .has().not().spaces()                                          //       Should not have spaces        \\
        .is().not().oneOf(['Password123', '12345678', 'abcdefgh']);   //        Blacklist these values         \\

    return schema.validate(secret, { list: true });

}

emailCheck = (email) => {
    const schema = new passwordValidator();
    schema
        .is().max(30)
        .has().not().spaces()
        .has('([@])')
        .has('([.])')

    return schema.validate(email, { list: true });

}

mobileNumberCheck = (mobile) => {
    const schema = new passwordValidator();
    schema
        .is().min(10)
        .is().max(10)
        .has().digits()
        .has().not().letters()
        .has().not().spaces()

    return schema.validate(mobile, { list: true });
}

module.exports = {
    passwordCheck: passwordCheck,
    emailCheck: emailCheck,
    mobileNumberCheck: mobileNumberCheck
}