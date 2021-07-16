const submitBtn = document.querySelector('#submit-button');

submitBtn.addEventListener('click', (e) => e.preventDefault());


$(".js-range-slider").ionRangeSlider();


const closeAllSelects = (exclude) => {
	const selects = document.querySelectorAll('.custom-select');

	selects.forEach((selectElem) => {
		if (selectElem === exclude) return;

		selectElem.classList.remove('custom-select-opened');
	});
}

// Custom selects
const createCustomSelects = () => {
	const selectWrappers = document.querySelectorAll('.custom-select'); 
	
	selectWrappers.forEach((wrapperElem) => {
		const selectElem = wrapperElem.querySelector('select');
		const optionHolder = wrapperElem.querySelector('.custom-select__wrapper');
		const options = selectElem.querySelectorAll('option');
		const selectedItem = wrapperElem.querySelector('.custom-select__item-selected');
		
		selectElem.style.display = "none";

		options.forEach((option, index) => {
			const newNode = document.createElement('div');
			newNode.classList.add('custom-select__item');
			if (selectElem.hasAttribute('data-item-class')) 
				newNode.classList.add(selectElem.getAttribute('data-item-class'));

			newNode.innerText = option.innerText;
			newNode.setAttribute('data-value', option.value);

			if (option.selected) {
				selectedItem.innerText = option.innerText;
				newNode.classList.add('item-selected');
			}

			optionHolder.append(newNode);

			newNode.addEventListener('click', () => {
				const otherItems = optionHolder.querySelectorAll('.custom-select__item');
				otherItems.forEach((other) => {
					other.classList.remove('item-selected');
				});
				
				selectElem.selectedIndex = index;
				selectElem.value = options[index].value;
				selectedItem.innerText = options[index].innerText;
				newNode.classList.add('item-selected');

				selectElem.dispatchEvent(new Event('change'));
			});
		});

		selectedItem.addEventListener('click', (e) => {
			wrapperElem.classList.toggle('custom-select-opened');

			e.stopPropagation();
			closeAllSelects(wrapperElem);
		});
	});
}


document.addEventListener('click', () => closeAllSelects(null));
createCustomSelects();
