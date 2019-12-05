document.addEventListener("DOMContentLoaded", function () {

	const brandsElem = document.querySelector(".brands");
	const brandListTemplateElem = document.querySelector(".brandListTemplate");
	const brandListTemplate = Handlebars.compile(brandListTemplateElem.innerHTML);
	const addBtn = document.querySelector(".addBtn");
	const brandName = document.querySelector(".brandName")
	const clearBtn = document.querySelector(".clear")




	brandsElem.innerHTML = "all working";
	let brandList = []

	// addBtn.addEventListener('click', function () {
	// 	let brand = brandName.value

	// 	brandList.push(brand)
	// 	let html = brandListTemplate({
	// 		brands:brandList
	// 	});

	// 	let brandListHtml = html;
	// 	brandsElem.innerHTML = brandListHtml;
	// });

	addBtn.addEventListener('click', function () {

		let brand_name = brandName.value
		axios.post('/api/brand_add',
			{brand_name
		}).then(function () {
			// brandList.push(theBrand)
			// brandsElem.innerHTML = brandListTemplate({
			// 	brands: brandList
			// })
			//theBrandName = "";
			axios.get('/api/brand_list').then(function (result) {
				const response = result.data
				const brandList = response
				//console.log(response.data)
		
				let html = brandListTemplate({
					brands: brandList
				});
		
				let brandListHtml = html;
				brandsElem.innerHTML = brandListHtml;
			})
		})



		
	});



	axios.get('/api/brand_list').then(function (result) {
		const response = result.data
		const brandList = response
		//console.log(response.data)

		let html = brandListTemplate({
			brands: brandList
		});

		let brandListHtml = html;
		brandsElem.innerHTML = brandListHtml;
	})


	// addBtn.addEventListener('click', function () {



	// });

	clearBtn.addEventListener('click', function () {

		axios.post('/api/brands_delete').then(function () {
			axios.get('/api/brand_list').then(function (result) {
				const response = result.data
				const brandList = response
				//console.log(response.data)
		
				let html = brandListTemplate({
					brands: brandList
				});
		
				let brandListHtml = html;
				brandsElem.innerHTML = brandListHtml;
			})
		});
	})
});







// function displaysBrand(brand) {
// 	shoesService
// 		.getShoes()
// 		.then(function (results) {
// 			let response = results.data;
// 			let data = response.data;
// 			let html = stockTemplateInstance({
// 				shoesEntry: data
// 			});
// 			let stockTableHTML = html;
// 			stockTemplateInsertPoint.innerHTML = stockTableHTML;

// 		});
// }