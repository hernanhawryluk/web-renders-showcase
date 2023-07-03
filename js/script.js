// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// scroll sections active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let ColorTheme = "#ffffff";


var scrollBefore = 50;
var colorChange = false;
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top > 660 && colorChange == false) {
            document.querySelector("header").style.backgroundColor = "#ffffff";
            document.querySelector(".header-logo a").style.color = "#1f1f1f";
            document.querySelector("header").style.opacity = "95%";
            const item = document.querySelectorAll('.navbar a');
            item.forEach(box => { box.style.color = '#1f1f1f'; });
            colorChange = true;
        }
        if (top <= 660 && colorChange == true) {
            document.querySelector("header").style.backgroundColor = "transparent";
            document.querySelector(".header-logo a").style.color = "#ffffff";
            document.querySelector("header").style.opacity = "100%";
            const item = document.querySelectorAll('.navbar a');
            item.forEach(box => { box.style.color = '#ffffff'; });
            colorChange = false;
        }

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');  
            });
        };
            
    });

    // ------ Remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active'); 
};

// ------------------------------------------------------------------------ Hide NavBar when scrolling down
function showNavbar() {
    document.querySelector(".header").style.top = "0";
}

function hideNavbar () {
    document.querySelector(".header").style.top = "-100px";
}

// ------------------------------------------------------------------------ Slideshow Gallery
let slideIndex = 0;
let timer = true;
showSlides(slideIndex);

let slideshowPrevBtn = document.querySelector('.slideshow-container .prev');
slideshowPrevBtn.addEventListener('click', function () { plusSlides(-1); });

let slideshowNextBtn = document.querySelector('.slideshow-container .next');
slideshowNextBtn.addEventListener('click', function () { plusSlides(1); });

let slideshowDotsBtn = document.getElementsByClassName('dot');
for (let i = 0; i < 5; i++) { slideshowDotsBtn[i].addEventListener('click', function () { currentSlide(i); }); }

function plusSlides(n) {
    timer = false;
    clearTimeout(sliderTimer);
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    timer = false;
    clearTimeout(sliderTimer);
    showSlides(slideIndex = n);
}

function timerSlides() {
    showSlides(slideIndex += 1);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length -1) {slideIndex = 0}
    if (n < 0) {slideIndex = slides.length -1}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", " ");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
    if (timer == true) {
        sliderTimer = setTimeout("timerSlides()", 6000);
    }
}

// ------------------------------------------------------------------------- Scroll Reveal
ScrollReveal({ 
    reset: false,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.header, #about-box-L h2, .services-title, .portfolio-title, #box-top, .pricing-title', { origin: 'top' });
ScrollReveal().reveal('#about-box-L h4, #service-content-L, .videos-images, .interactive-images, #box-left, .container-slider, .container-type, #service1, .contact-info', {origin: 'left'});
ScrollReveal().reveal('#about-box-R, .photos-images, .i360-images, #box-right, .pricing-example, .container-methods, .contact-form', {origin: 'right'});
ScrollReveal().reveal('#about-box-M, #service-content-R, #box-bottom, .btn, .container-budget', {origin: 'bottom'});

// ------------------------------------------------------------------------- Agrega mas imagenes al Portfolio al hacer click
let allImages = ['assets/images/one.jpg', 'assets/images/two.jpg', 'assets/images/three.jpg', 'assets/images/four.jpg', 'assets/images/five.jpg', 'assets/images/six.jpg', 'assets/images/one.jpg', 'assets/images/two.jpg', 'assets/images/three.jpg', 'assets/images/four.jpg'];
let currentImageID = 9;
let rotateAnim = 0;

function addImages(start, end) {
    let myPortfolio = document.getElementById("PortfolioList");
    let rotateAnimClasses = ["portfolio-box-addL", "portfolio-box-addB", "portfolio-box-addR"];

    for (let i = start; i <= end; i++) {
        let image = document.createElement('img');
        image.src = allImages[i];
        image.classList.add('portfolio-picture');

        let listItem = document.createElement('li');
        listItem.classList.add(rotateAnimClasses[rotateAnim]);
        listItem.appendChild(image);
        myPortfolio.appendChild(listItem);

        ScrollReveal().reveal(`.${rotateAnimClasses[rotateAnim]}`, { origin: getAnimationOrigin(rotateAnim) });
        rotateAnim = (rotateAnim + 1) % 3;

        currentImageID++;
    }
    picture = [];
    picture = document.getElementsByClassName('portfolio-picture');
    for (let i = 0; i < picture.length; i++) { 
        picture[i].addEventListener('click', function () { modalAction(i); });
    }
}

function getAnimationOrigin(rotateAnim) {
    const origins = ['left', 'bottom', 'right'];
    return origins[rotateAnim];
}


// ------------------------------------------------------------------------- Agrandar fotos al hacer click
let modal = document.getElementById("myModal");
let lastID = 0;
let modalPrevBtn = document.querySelector('#myModal .prev');
let modalNextBtn = document.querySelector('#myModal .next');

let addPictureBtn = document.querySelector('#add-pictures-btn');
addPictureBtn.addEventListener('click', function () { addImages(0, 8); });

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


// ------------------------------------------------------------------------- API Valor Dolar Blue

let dolar = 483;
let dolarAPI = false;
fetch('https://api.bluelytics.com.ar/v2/latest')
    .then(response => response.json())
    .then(data => {
        dolarAPI = true;
        let dolar = data.blue.value_sell;
    })
    .catch(error => {
        dolarAPI = false;
        console.log("error: can't fetch blue dolar api.");
    });


// ------------------------------------------------------------------------- Calculadora de Precios

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
        proyectTypeText.textContent = "Interior & Exterior";
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
for (let i = 1; i <= checkbox.length; i++) {
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
        totalArg.textContent = '$ ' + toCommas(priceTotal) + ' Pesos Argentinos.';
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

//  ----------------------------------- Calcula el precio inicial al cargar la web.
calculatePrice();