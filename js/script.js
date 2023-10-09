// ------------------------------------------------------ Toggle icon navbar

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});



// ------------------------------------------------------ Scroll sections active link

const sectionsSelector = document.querySelectorAll('section');
const navbarSelector = document.querySelector('.navbar');
const navbarLinksSelector = document.querySelectorAll('.navbar a');
const menuIconSelector = document.querySelector('#menu-icon');
const headerSelector = document.querySelector("header");
const logoSelector = document.querySelector(".header-logo a");
const whiteLogoSelector = document.querySelector(".logo-white");
const blackLogoSelector = document.querySelector(".logo-black");

let lastScrollPosition = window.scrollY;
let whiteNavbarTheme = false;

const setWhiteNavbarHeader = () => {
    blackLogoSelector.style.display = "block";
    whiteLogoSelector.style.display = "none";
    headerSelector.style.backgroundColor = "#fff";
    headerSelector.style.opacity = "95%";
    logoSelector.style.color = "#000";
    navbarSelector.style.backgroundColor = "#fff";
    menuIconSelector.style.color = "#1f1f1f";
    navbarLinksSelector.forEach(link => { link.style.color = '#1f1f1f'; });
    whiteNavbarTheme = true;
}

const setTransparentNavbarHeader = () => {
    whiteLogoSelector.style.display = "block";
    blackLogoSelector.style.display = "none";
    headerSelector.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
    headerSelector.style.opacity = "100%";
    logoSelector.style.color = "#fff";
    menuIconSelector.style.color = "#fff";
    navbarSelector.style.backgroundColor = "transparent";
  
    const navbarLinksSelector = document.querySelectorAll('.navbar a');
    navbarLinksSelector.forEach(link => {
        link.style.color = '#fff';
    });
  
    whiteNavbarTheme = false;
}

const showNavbar = () => {
    document.querySelector(".header").style.top = "0";
}

const hideNavbar = () => {
    document.querySelector(".header").style.top = "-100px";
}

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const navbarLinksSelector = document.querySelectorAll('header nav a');
    // const scrollDirection = scrollTop < lastScrollPosition ? 'up' : 'down';

    if (scrollTop > 660 && !whiteNavbarTheme) {
        setWhiteNavbarHeader();
    }
    if (scrollTop <= 660 && whiteNavbarTheme) {
        setTransparentNavbarHeader();
    }

    sectionsSelector.forEach(section => {
        const sectionOffset = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollTop >= sectionOffset && scrollTop < sectionOffset + sectionHeight) {
            navbarLinksSelector.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`header nav a[href*=${sectionId}]`).classList.add('active');
        }
    });

    // if (scrollDirection === 'up') {
    //     showNavbar();
    // } else {
    //     hideNavbar();
    // }
    // lastScrollPosition = scrollTop;

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});



// ------------------------------------------------------ Slideshow Gallery

let isTimerActive = true;
let currentSlideIndex = 0;

const slides = document.getElementsByClassName("mySlides");
const slideshowPrevButton = document.querySelector('.slideshow-container .prev');
const slideshowNextButton = document.querySelector('.slideshow-container .next');
const dots = document.getElementsByClassName("dot");
const slideshowDotsButton = document.getElementsByClassName('dot');

slideshowPrevButton.addEventListener('click', function () { changeSlide(-1); });
slideshowNextButton.addEventListener('click', function () { changeSlide(1); });
for (let i = 0; i < 5; i++) { slideshowDotsButton[i].addEventListener('click', function () { goToSlide(i); }); }

function changeSlide(n) {
    isTimerActive = false;
    clearTimeout(sliderTimer);
    showSlides(currentSlideIndex += n);
}

function goToSlide(n) {
    isTimerActive = false;
    clearTimeout(sliderTimer);
    showSlides(currentSlideIndex = n);
}

function startSlideTimer() {
    showSlides(currentSlideIndex += 1);
}

function showSlides(n) {
    if (n > slides.length -1) {currentSlideIndex = 0}
    if (n < 0) {currentSlideIndex = slides.length -1}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", " ");
    }
    slides[currentSlideIndex].style.display = "block";
    dots[currentSlideIndex].className += " active";
    if (isTimerActive == true) {
        sliderTimer = setTimeout("startSlideTimer()", 6000);
    }
}

showSlides(currentSlideIndex);



// ------------------------------------------------------ Scroll Reveal

if (window.innerWidth >= 1024) {
    ScrollReveal({ 
        reset: false,
        distance: '80px',
        duration: 1200,
        delay: 200
    });

    ScrollReveal().reveal('.header, #about-box-L h2, .services-title, .portfolio-title, #box-top, .pricing-title', { origin: 'top' });
    ScrollReveal().reveal('#about-box-L h4, #service-content-L, .videos-images, .interactive-images, #box-left, .container-slider, .container-type, #service1, .contact-info', {origin: 'left'});
    ScrollReveal().reveal('#about-box-R, .photos-images, .i360-images, #box-right, .pricing-example, .container-methods, .contact-form', {origin: 'right'});
    ScrollReveal().reveal('#about-box-M, #service-content-R, #box-bottom, .btn, .container-budget', {origin: 'bottom'});
}

// ------------------------------------------------------ Agrega mas imagenes al Portfolio al hacer click

let currentImageID = 0;
const allImages = ['09.png', '10.png', '11.jpeg', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '20.png', '21.png', '22.png', '23.png', '24.png', '25.png', '26.png', '27.png', '28.png', '29.png', '30.png', '31.png', '32.jpeg', '33.png', '34.jpeg', '35.png', '36.jpeg', '37.png', '38.png'];

const addPicturesButton = document.querySelector('#add-pictures-btn');
addPicturesButton.addEventListener('click', function () { addImages(0, 8); });

function addImages(start, end) {
    const portfolioSection = document.getElementById("PortfolioList");

    const fragmentToAdd = document.createDocumentFragment();

    for (let i = start; i <= end; i++) {
        if (currentImageID + i >= allImages.length) {
            addPicturesButton.style.display = "none";
        } 
        else {
            const image = document.createElement('img');
            image.src = `assets/images/portfolio/${allImages[currentImageID + i]}`;
            image.classList.add('portfolio-picture');
            
            const listItem = document.createElement('li');
            listItem.classList.add('portfolio-box-extension');
            listItem.appendChild(image);

            fragmentToAdd.appendChild(listItem);
            currentImageID++;
        }
    }

    portfolioSection.appendChild(fragmentToAdd);
    const portfolioPictureSelection = Array.from(document.getElementsByClassName('portfolio-picture'));

    portfolioPictureSelection.forEach((picture, index) => {
        picture.addEventListener('click', () => {
        modalAction(index);
        });
    });
}

// ------------------------------------------------------ Agrandar fotos al hacer click
let modal = document.getElementById("myModal");
let lastID = 0;
let modalPrevBtn = document.querySelector('#myModal .prev');
let modalNextBtn = document.querySelector('#myModal .next');

let picture = document.getElementsByClassName('portfolio-picture');
for (let i = 0; i < picture.length; i++) { 
    picture[i].addEventListener('click', function () { modalAction(i); });
}

modalPrevBtn.addEventListener('click', ()=> {
    if (lastID >= 0) { modalAction(lastID - 1); }
    else { modalAction(currentImageID); }
});

modalNextBtn.addEventListener('click', ()=> {
    if (lastID <= currentImageID) { modalAction(lastID + 1); }
    else { modalAction(0); }
});

function modalAction(element) {
    hideNavbar();
    lastID = element;
    let img = picture[element];
    let modalImg = document.getElementById("img01");
    let captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
}

let span = document.getElementsByClassName("close")[0];

span.addEventListener('click', ()=> {
    showNavbar();
    modal.style.display = "none";
});


// ------------------------------------------------------ Calculadora de Precios

// ----------------------------------- Variables: Precios
let priceSize0 = 50;
let priceSize1 = 70;
let priceSize2 = 130;
let priceTypeInterior = 1;
let priceTypeExterior = 1.4;
let priceTypeBoth = 1.7;
let priceImage = 30; 
let priceVideo = 50; // for 15 seconds of video
let pricePanoramic = 70;
let priceInteractive = 150;
let priceEachInteraction = 50;

// ----------------------------------- Variables: Funcionamiento Interno
let priceTotal = 0;
let daysTotal = 0;
let priceSize = 1;
let servicesAdded = 0;
let interactiveON = false;
let interactiveSum = 1;

// ----------------------------------- DOM Query Selectors
let proyectSlider = document.querySelector("input.pricing-slider");
let proyectText = document.querySelector(".pricing-interactive .proyect-size");
let proyectImage = document.querySelector(".pricing-example img");
let proyectType = document.querySelector(".type-slider");
let proyectTypeText = document.querySelector(".proyect-type");
let proyectService = document.getElementsByClassName('pricing-select-service');
let proyectQuantity = document.getElementsByClassName('pricing-quantity');
let serviceText = document.getElementsByClassName('service-text');
let serviceAdd = document.getElementsByClassName('service-box');
let removeBtn = document.getElementsByClassName('bx bx-x-circle');
let interactiveOptions = document.querySelector(".interactive-options");
let addServiceBtn = document.querySelector("#add-service");
let totalArg = document.querySelector(".budget-arg");
let totalUsd = document.querySelector(".budget-usd");
let totalDays = document.querySelector(".budget-time");

// ----------------------------------- Esconde los service-box addicionales.
serviceAdd[1].style.display = 'none';
serviceAdd[2].style.display = 'none';
serviceAdd[3].style.display = 'none';

// ----------------------------------- Boton para Agregar un servicio.
addServiceBtn.addEventListener('click', ()=> { 
    if (servicesAdded == 0) {
        serviceAdd[1].style.display = 'flex';
        proyectService[0].querySelector(".option4").style.display = "none";
    }
    else if (servicesAdded == 1) {
        serviceAdd[2].style.display = 'flex';
        removeBtn[0].style.display = 'none';
    }
    else if (servicesAdded == 2) {
        serviceAdd[3].style.display = 'flex';
        removeBtn[1].style.display = 'none';
        addServiceBtn.style.display = "none";
    }
    servicesAdded++;
    calculatePrice();
});

// ----------------------------------- Botones para remover servicios.
removeBtn[0].addEventListener('click', function () { removeService(); });
removeBtn[1].addEventListener('click', function () { removeService(); });
removeBtn[2].addEventListener('click', function () { removeService(); });

function removeService() {
    if (servicesAdded == 1) {
        serviceAdd[1].style.display = 'none';
        proyectService[0].querySelector(".option4").style.display = "block";
    }
    else if (servicesAdded == 2) {
        serviceAdd[2].style.display = 'none';
        removeBtn[0].style.display = 'block';
    }
    else if (servicesAdded == 3) {
        serviceAdd[3].style.display = 'none';
        removeBtn[1].style.display = 'block';
        addServiceBtn.style.display = "block";
    }
    servicesAdded--;
    calculatePrice();
}


// ----------------------------------- Slider para ajustar tamaño del proyecto.
proyectSlider.oninput = function () {
    if(this.value == 0) {
        priceSize = 1;
        proyectText.textContent = "Chico";
        proyectImage.src = 'assets/images/one.jpg';
    }
    if(this.value == 1) {
        priceSize = 2;
        proyectText.textContent = "Mediano";
        proyectImage.src = 'assets/images/two.jpg';
    }
    if(this.value == 2) {
        priceSize = 3;
        proyectText.textContent = "Grande";
        proyectImage.src = 'assets/images/three.jpg';
    }
    calculatePrice();
}


// ----------------------------------- Slider para ajustar tipo de proyecto.
proyectType.oninput = function () {
    if(this.value == 0) {
        proyectTypeText.textContent = "Interior";
        proyectImage.src = 'assets/images/one.jpg';
    }
    if(this.value == 1) {
        proyectTypeText.textContent = "Exterior";
        proyectImage.src = 'assets/images/two.jpg';
    }
    if(this.value == 2) {
        proyectTypeText.textContent = "Ambos";
        proyectImage.src = 'assets/images/three.jpg';
    }
    calculatePrice();
}


// ----------------------------------- Cambios en los Selectors al cambiar el tipo de servicio.
function changeServiceText(proyectServiceX, serviceTextX, proyectQuantityX) {
    switch (proyectServiceX) {
        case "1":
            serviceTextX.style.display = "block";
            serviceTextX.textContent = "Cantidad:";
            interactiveOptions.style.display = "none";
            proyectQuantityX.style.display = "block";
            if(interactiveON == true) { addServiceBtn.style.display = "block"; interactiveON = false; }
            for(let i = 1; i < 11; i++) { proyectQuantityX.querySelector('.option' + i).textContent = i; }
            break;
        case "2":
            serviceTextX.style.display = "block";
            serviceTextX.textContent = "Segundos:";
            interactiveOptions.style.display = "none";
            proyectQuantityX.style.display = "block";
            if(interactiveON == true) { addServiceBtn.style.display = "block"; interactiveON = false; }
            for(let i = 1; i < 11; i++) { proyectQuantityX.querySelector('.option' + i).textContent = i * 15; }
            break;
        case "3":
            serviceTextX.style.display = "block";
            serviceTextX.textContent = "Cantidad:";
            interactiveOptions.style.display = "none";
            proyectQuantityX.style.display = "block";
            if(interactiveON == true) { addServiceBtn.style.display = "block"; interactiveON = false; }
            for(let i = 1; i < 11; i++) { proyectQuantityX.querySelector('.option' + i).textContent = i; }
            break;
        case "4":
            serviceTextX.style.display = "none";
            interactiveOptions.style.display = "grid";
            proyectQuantityX.style.display = "none";
            interactiveON = true;
            addServiceBtn.style.display = "none";
            break;
    }
}


// ----------------------------------- Actualiza el precio al tocar cualquier ajuste.
proyectService[0].oninput = function () {
    changeServiceText(this.value, serviceText[0], proyectQuantity[0]);
    calculatePrice(); 
}

proyectQuantity[0].oninput = function () { calculatePrice(); }

proyectService[1].oninput = function () { 
    changeServiceText(this.value, serviceText[1], proyectQuantity[1]);
    calculatePrice(); 
}

proyectQuantity[1].oninput = function () { calculatePrice(); }

proyectService[2].oninput = function () { 
    changeServiceText(this.value, serviceText[2], proyectQuantity[2]);
    calculatePrice(); 
}

proyectQuantity[2].oninput = function () { calculatePrice(); }

proyectService[3].oninput = function () { 
    changeServiceText(this.value, serviceText[3], proyectQuantity[3]);
    calculatePrice(); 
}

proyectQuantity[3].oninput = function () { calculatePrice(); }

let checkbox = document.getElementsByClassName('checkbox');
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("click", checkboxSum);
}

function checkboxSum (event) {
    if (event.target.checked) {
        interactiveSum += 1;
    }
    else {
        interactiveSum -= 1;
    }
    calculatePrice();
}


// ----------------------------------- Calcula el precio. 
function calculatePrice () {
    switch (priceSize) {
        case 1:
            priceTotal = priceSize0;
            daysTotal = 2;
            break;
        case 2:
            priceTotal = priceSize1;
            daysTotal = 3;
            break;
        case 3:
            priceTotal = priceSize2;
            daysTotal = 4;
            break;
    }

    priceTotal += serviceQuantityMultiplicator(proyectService[0].value, proyectQuantity[0].value);

    if (servicesAdded >= 1) {
        priceTotal += serviceQuantityMultiplicator(proyectService[1].value, proyectQuantity[1].value); 
    }

    if (servicesAdded >= 2) {
        priceTotal += serviceQuantityMultiplicator(proyectService[2].value, proyectQuantity[2].value); 
    }

    if (servicesAdded >= 3) {
        priceTotal += serviceQuantityMultiplicator(proyectService[3].value, proyectQuantity[3].value); 
    }

    switch (proyectType.value) {
        case '0':
            priceTotal *= priceTypeInterior;
            break;
        case '1':
            priceTotal *= priceTypeExterior;
            break;
        case '2':
            priceTotal *= priceTypeBoth;
            daysTotal += 1;
            break;
    }

    if (daysTotal == 1 ) { totalDays.textContent = "1 día hábil."; }
    else { totalDays.textContent = daysTotal + " días hábiles."; }
    priceTotal = priceTotal.toFixed();
    priceTotal = Math.round(priceTotal / 10) * 10;
    totalUsd.textContent = '$ ' + toCommas(priceTotal) + ' Dolares.';
    priceTotal /= 2; // Cobramos la mitad para la Argentina.
    if (dolarAPI == true) {
        priceTotal = (priceTotal * dolar).toFixed();
        priceTotal = Math.round(priceTotal / 1000) * 1000;
        totalArg.textContent = '$ ' + toCommas(priceTotal) + ' Pesos.';
    } else {
        totalArg.textContent = '$ ' + toCommas(priceTotal) + ' Dolares.';
    }
}


// ----------------------------------- Funcion auxiliar para multiplicar "servicio x cantidad" al calcular el precio.
function serviceQuantityMultiplicator(service, quantity) {
    switch (service) {
        case '1':
            if (quantity > 5) {
                daysTotal += 1;
            } 
            return priceImage * quantity;
            break;
        case '2':
            if (quantity > 2) {
                daysTotal += 1;
            }
            return priceVideo * quantity;
            break;
        case '3':
            daysTotal += 1;
            if (quantity > 3) {
                daysTotal += 1;
            }
            if (quantity > 6) {
                daysTotal += 1;
            }
            return pricePanoramic * quantity;
            break;
        case '4':
            if (interactiveSum > 1) { daysTotal += interactiveSum - 1; }
            daysTotal = Math.floor(daysTotal) + 3;

            return  (priceInteractive * priceSize) + ((priceEachInteraction * priceSize) * interactiveSum);
            break;
    }
}


// ----------------------------------- Agrega los "." entre los 3 digitos de un numero.
function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


// ------------------------------------------------------  API Valor Dolar Blue
let dolar = 483;
let dolarAPI = false;
const checkDolar = async ()=> {
    try {
    let request = await fetch('https://api.bluelytics.com.ar/v2/latest');
    let response = await request.json();
    dolarAPI = true;
    dolar = response.blue.value_sell;
    calculatePrice();
    }
    catch(e) {
        console.error(e);
        dolarAPI = false;
        calculatePrice();
    }
}

checkDolar();
