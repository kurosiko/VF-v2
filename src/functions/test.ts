const progress = [{ "101": {} }, { "202": {} }];
const pid = 101;
progress.forEach((item) => {
    const test = Object.keys(item).some((sub) => {
        sub == pid.toString();
    });   
    console.log(test)
});
