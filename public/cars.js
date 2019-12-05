document.addEventListener('DOMContentLoaded', () => {


	const colorsTemplateSource = document.querySelector(".colorsTemplate")
	const colorsTemplate = Handlebars.compile(colorsTemplateSource.innerHTML)
	const colorsTemplateInsertPoint = document.querySelector(".colorsTemplateInsertPoint")

	const makesTemplateSource = document.querySelector(".makesTemplate");
	const makesTemplate = Handlebars.compile(makesTemplateSource.innerHTML);
	const makesTemplateInsertPoint = document.querySelector(".makesTemplateInsertPoint")

	const carsTemplate = document.querySelector('.carsTemplate')
	const carsTemplateInstance = Handlebars.compile(carsTemplate.innerHTML)
	const carsTemplateInsertPoint = document.querySelector('.carsTemplateInsertPoint')


	// function toggleLoader() {
	// 	const makesSpinner = document.querySelector(".makesSpinner");
	// 	makesSpinner.classList.toggle("hidden");
	// }


	axios.get('http://api-tutor.herokuapp.com/v1/makes')
		.then(function (res) {
			const makesSpinner = document.querySelector(".makesSpinner");
			makesSpinner.classList.toggle("hidden");
			let cars = res.data
			makesTemplateInsertPoint.innerHTML = makesTemplate({
				makes: cars
			})
			//toggleLoader();
		})

	axios.get('http://api-tutor.herokuapp.com/v1/colors')
		.then(function (res) {
			const colorsSpinner = document.querySelector(".colorsSpinner")
			colorsSpinner.classList.toggle("hidden")
			let colors = res.data
			colorsTemplateInsertPoint.innerHTML = colorsTemplate({
				color: colors
			})
			//toggleLoader();
		})

	axios.get('http://api-tutor.herokuapp.com/v1/cars')
		.then(function (res) {
			const carsSpinner = document.querySelector(".carsSpinner")
			carsSpinner.classList.toggle("hidden")
			let cars = res.data
			carsTemplateInsertPoint.innerHTML = carsTemplateInstance({
				car: cars
			})
		});






});