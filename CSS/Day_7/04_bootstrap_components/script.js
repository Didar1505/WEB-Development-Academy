let colorBtn = document.querySelector('.colormode-btn')
let mydoc = document.documentElement

colorBtn.addEventListener('click', () => {
    const currentTheme = mydoc.getAttribute('data-bs-theme')

    if (currentTheme === 'dark') {
        mydoc.setAttribute('data-bs-theme', 'light')
        colorBtn.classList.add('btn-dark')
        colorBtn.classList.remove('btn-light')
    } else {
        mydoc.setAttribute('data-bs-theme', 'dark')
        colorBtn.classList.remove('btn-dark')
        colorBtn.classList.add('btn-light')
    }
})