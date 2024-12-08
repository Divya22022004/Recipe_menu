document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const recipeContainer = document.getElementById('recipe-container');
    const filterCheckboxes = document.querySelectorAll('input[name="filter"]');

    // Check if elements are found
    if (!searchButton || !searchInput || !recipeContainer) {
        console.error('Required elements not found in the DOM');
        console.error('searchButton:', searchButton);
        console.error('searchInput:', searchInput);
        console.error('recipeContainer:', recipeContainer);
        return;
    }

    const recipes = recipeContainer.getElementsByClassName('recipe-thumbnail');
    const noRecipeMessage = document.createElement('p');
    noRecipeMessage.textContent = 'No recipes found.';
    noRecipeMessage.id = 'no-recipe-message';
    noRecipeMessage.style.display = 'none';
    recipeContainer.appendChild(noRecipeMessage);

    const filterRecipes = () => {
        const searchText = searchInput.value.toLowerCase();
        const selectedFilters = Array.from(filterCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        let anyVisible = false;

        for (let recipe of recipes) {
            const title = recipe.getElementsByTagName('h3')[0].innerText.toLowerCase();
            const description = recipe.getElementsByTagName('p')[0].innerText.toLowerCase();
            const isVegetarian = recipe.classList.contains('vegetarian');
            const isNonVegetarian = recipe.classList.contains('non-vegetarian');
            const matchesSearch = title.includes(searchText) || description.includes(searchText);
            const matchesFilter = selectedFilters.length === 0 ||
                                  (selectedFilters.includes('vegetarian') && isVegetarian) ||
                                  (selectedFilters.includes('non-vegetarian') && isNonVegetarian);

            if (matchesSearch && matchesFilter) {
                recipe.style.display = 'flex';
                anyVisible = true;
            } else {
                recipe.style.display = 'none';
            }
        }

        if (!anyVisible) {
            noRecipeMessage.style.display = 'block';
        } else {
            noRecipeMessage.style.display = 'none';
        }
    };

    searchButton.addEventListener('click', filterRecipes);
    searchInput.addEventListener('input', filterRecipes);
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterRecipes);
    });

    // Contact form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log('Contact Form Submitted');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            alert('Thank you for your message!');
            contactForm.reset();
        });
    }
});
