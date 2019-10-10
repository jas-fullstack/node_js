
geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latituce : 1,
            long : 0
        }
        console.log(address);
       callback(data);
    },2000);

    
};

geocode('mohali',(address)=> {
    console.log(address);
})

//now in this function we are able to get value from out of the function...

sum = (one , two , total) => {
    
    setTimeout(()=> {
       total(one + two);
    },2000);

};
sum(1 , 4 , (total) => {
    console.log(total)
});

// function sum(one,two,total){
//     setTimeout(()=> {
//        total(one + two);
//     },2000);

// }

// sum(1 , 4 , (total) => {
//     console.log(total)
// });

