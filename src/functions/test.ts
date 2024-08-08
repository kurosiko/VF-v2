const test_obj = {
    test: {
        t1: 1,
        t2: 2,
        t3:3
    },
    test2: {
        t1: 1,
        t2: 2,
        t3:3
    }
}

console.log({
    ...test_obj, ...{
        test: {
    t1:2
}}})
