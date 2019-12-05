document.addEventListener("DOMContentLoaded", () => {

    const colorTemplate = document.querySelector('.colorTemplate')
    const makeTemplate = document.querySelector('.makeTemplate')
    const carsTemplate = document.querySelector('.carsTemplate')

    const makeListTemplate = Handlebars.compile(makeTemplate.innerHTML);
    const colorListTemplate = Handlebars.compile(colorTemplate.innerHTML);
    const carsTemplateInstance = Handlebars.compile(carsTemplate.innerHTML)

    const colorTemplateInsertPoint = document.querySelector('.colorTemplateInsertPoint')
    const makeTemplateInsertPoint = document.querySelector('.makeTemplateInsertPoint')
    const carsTemplateInsertPoint = document.querySelector('.carsTemplateInsertPoint')
    const filterBtn = document.querySelector('.filterBtn')

    const colorSelect = document.querySelector('.colorSelect')
    const makeSelect = document.querySelector('.makeSelect')

    const allBtn = document.querySelector('.allBtn')

    axios.get('http://api-tutor.herokuapp.com/v1/colors')
        .then(function (res) {
            // handle success
            //console.log(res.data)
            let colors = res.data
            colors.unshift("Select Color");
            colorTemplateInsertPoint.innerHTML = colorListTemplate({
                color: colors
            });

        });

    axios.get('http://api-tutor.herokuapp.com/v1/makes')
        .then(function (res) {
            let makes = res.data
           // console.log(makes)
            makes.unshift("Select Make");
            const makesHtml = makeListTemplate({
                make: makes
            });
            makeTemplateInsertPoint.innerHTML = makesHtml
        });


    axios.get('http://api-tutor.herokuapp.com/v1/cars')
        .then(function (res) {
            let cars = res.data
            carsTemplateInsertPoint.innerHTML = carsTemplateInstance({
                car: cars
            })
        });

        allBtn.addEventListener('click', () => {
            carsTemplateInsertPoint.innerHTML = ""
            axios.get('http://api-tutor.herokuapp.com/v1/cars')
            .then(function (res) {
                let cars = res.data
                carsTemplateInsertPoint.innerHTML = carsTemplateInstance({
                    car: cars
                })
            });
    
        })

    filterBtn.addEventListener('click', () => {
        let color = colorSelect.value
        let make = makeSelect.value
        carsTemplateInsertPoint.innerHTML = ""


        if (color && make == "Select Make") {
            
            axios.get('http://api-tutor.herokuapp.com/v1/cars/color/' + color)
                .then(function (res) {
                    // handle success
                    //console.log(res.data)
                    let selectedColorCars = res.data
                    console.log(selectedColorCars)


                    carsTemplateInsertPoint.innerHTML = carsTemplateInstance({
                        car: selectedColorCars
                    });

                });



        } else if (make && color == "Select Color") {
            carsTemplateInsertPoint.innerHTML = ""
            axios.get('http://api-tutor.herokuapp.com/v1/cars/make/' + make)
                .then(function (res) {
                    // handle success
                    //console.log(res.data)
                    let selectedColorMakes = res.data

                    carsTemplateInsertPoint.innerHTML = carsTemplateInstance({
                        car: selectedColorMakes
                    });

                });
        } else if (color !== "Select Color" && make !== "Select Make"){
            carsTemplateInsertPoint.innerHTML = ""
            axios.get('http://api-tutor.herokuapp.com/v1/cars/make/' + make + '/color/' + color)
                .then(function (res) {
                    // handle success
                    //console.log(res.data)
                    let selectedColorAndMake = res.data


                    carsTemplateInsertPoint.innerHTML = carsTemplateInstance({
                        car: selectedColorAndMake
                    });

                });
        }
    });



   


})