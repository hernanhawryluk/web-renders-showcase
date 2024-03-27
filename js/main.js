// ------------------------------------------------------ Toggle icon navbar

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});

// ------------------------------------------------------ Scroll sections active link

const sectionsSelector = document.querySelectorAll("section");
const navbarSelector = document.querySelector(".navbar");
const navbarLinksSelector = document.querySelectorAll(".navbar a");
const menuIconSelector = document.querySelector("#menu-icon");
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
  navbarLinksSelector.forEach((link) => {
    link.style.color = "#1f1f1f";
  });
  whiteNavbarTheme = true;
};

const setTransparentNavbarHeader = () => {
  whiteLogoSelector.style.display = "block";
  blackLogoSelector.style.display = "none";
  headerSelector.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
  headerSelector.style.opacity = "100%";
  logoSelector.style.color = "#fff";
  menuIconSelector.style.color = "#fff";
  navbarSelector.style.backgroundColor = "transparent";

  const navbarLinksSelector = document.querySelectorAll(".navbar a");
  navbarLinksSelector.forEach((link) => {
    link.style.color = "#fff";
  });

  whiteNavbarTheme = false;
};

const showNavbar = () => {
  document.querySelector(".header").style.top = "0";
};

const hideNavbar = () => {
  document.querySelector(".header").style.top = "-100px";
};

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const navbarLinksSelector = document.querySelectorAll("header nav a");

  if (scrollTop > 660 && !whiteNavbarTheme) {
    setWhiteNavbarHeader();
  }
  if (scrollTop <= 660 && whiteNavbarTheme) {
    setTransparentNavbarHeader();
  }

  sectionsSelector.forEach((section) => {
    const sectionOffset = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollTop >= sectionOffset &&
      scrollTop < sectionOffset + sectionHeight
    ) {
      navbarLinksSelector.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `header nav a[href*=${sectionId}]`
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
});

// ------------------------------------------------------ Slideshow Gallery

let isTimerActive = true;
let currentSlideIndex = 0;

const slides = document.getElementsByClassName("mySlides");
const slideshowPrevButton = document.querySelector(
  ".slideshow-container .prev"
);
const slideshowNextButton = document.querySelector(
  ".slideshow-container .next"
);
const dots = document.getElementsByClassName("dot");
const slideshowDotsButton = document.getElementsByClassName("dot");

slideshowPrevButton.addEventListener("click", function () {
  changeSlide(-1);
});
slideshowNextButton.addEventListener("click", function () {
  changeSlide(1);
});
for (let i = 0; i < 5; i++) {
  slideshowDotsButton[i].addEventListener("click", function () {
    goToSlide(i);
  });
}

function changeSlide(n) {
  isTimerActive = false;
  clearTimeout(sliderTimer);
  showSlides((currentSlideIndex += n));
}

function goToSlide(n) {
  isTimerActive = false;
  clearTimeout(sliderTimer);
  showSlides((currentSlideIndex = n));
}

function startSlideTimer() {
  showSlides((currentSlideIndex += 1));
}

function showSlides(n) {
  if (n > slides.length - 1) {
    currentSlideIndex = 0;
  }
  if (n < 0) {
    currentSlideIndex = slides.length - 1;
  }
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
    distance: "80px",
    duration: 1200,
    delay: 200,
  });

  ScrollReveal().reveal(
    ".header, #about-box-L h2, .services-title, .portfolio-title, #box-top, .pricing-title",
    { origin: "top" }
  );
  ScrollReveal().reveal(
    "#about-box-L h4, #service-content-L, .videos-images, .interactive-images, #box-left, .container-slider, .container-type, #service1, .contact-info",
    { origin: "left" }
  );
  ScrollReveal().reveal(
    "#about-box-R, .photos-images, .i360-images, #box-right, .pricing-example, .container-methods, .contact-form",
    { origin: "right" }
  );
  ScrollReveal().reveal(
    "#about-box-M, #service-content-R, #box-bottom, .btn, .container-budget",
    { origin: "bottom" }
  );
}

// ------------------------------------------------------ Add more images to the portfolio by clicking

let currentImageID = 0;
const allImages = [
  "09.png",
  "10.png",
  "11.jpeg",
  "12.png",
  "13.png",
  "14.png",
  "15.png",
  "16.png",
  "17.png",
  "18.png",
  "19.png",
  "20.png",
  "21.png",
  "22.png",
  "23.png",
  "24.png",
  "25.png",
  "26.png",
  "27.png",
  "28.png",
  "29.png",
  "30.png",
  "31.png",
  "32.jpeg",
  "33.png",
  "34.jpeg",
  "35.png",
  "36.jpeg",
  "37.png",
  "38.png",
];

const addPicturesButton = document.querySelector("#add-pictures-btn");
addPicturesButton.addEventListener("click", function () {
  addImages(0, 8);
});

function addImages(start, end) {
  const portfolioSection = document.getElementById("PortfolioList");

  const fragmentToAdd = document.createDocumentFragment();

  for (let i = start; i <= end; i++) {
    if (currentImageID + i >= allImages.length) {
      addPicturesButton.style.display = "none";
    } else {
      const image = document.createElement("img");
      image.src = `assets/images/portfolio/${allImages[currentImageID + i]}`;
      image.classList.add("portfolio-picture");

      const listItem = document.createElement("li");
      listItem.classList.add("portfolio-box-extension");
      listItem.appendChild(image);

      fragmentToAdd.appendChild(listItem);
      currentImageID++;
    }
  }

  portfolioSection.appendChild(fragmentToAdd);
  const portfolioPictureSelection = Array.from(
    document.getElementsByClassName("portfolio-picture")
  );

  portfolioPictureSelection.forEach((picture, index) => {
    picture.addEventListener("click", () => {
      modalAction(index);
    });
  });
}

// ------------------------------------------------------ Enlarge photos by clicking
let lastClickedImageIndex = 0;

const modal = document.getElementById("myModal");

const portfolioImages = document.getElementsByClassName("portfolio-picture");
for (let i = 0; i < portfolioImages.length; i++) {
  portfolioImages[i].addEventListener("click", function () {
    modalAction(i);
  });
}

function modalAction(element) {
  hideNavbar();
  lastClickedImageIndex = element;
  let image = portfolioImages[element];
  let modalImage = document.getElementById("img01");
  let captionText = document.getElementById("caption");
  modal.style.display = "block";
  modalImage.src = image.src;
  captionText.innerHTML = image.alt;
}

const modalBackground = document.getElementById("myModal");

modalBackground.addEventListener("click", () => {
  showNavbar();
  modal.style.display = "none";
});

// ------------------------------------------------------ Price Calculator

// ----------------------------------- Project demo images preloader
const preloadImages = () => {
  const imagesToPreload = [
    "small-interior",
    "small-exterior",
    "small-both",
    "medium-interior",
    "medium-exterior",
    "medium-both",
    "large-interior",
    "large-exterior",
    "large-both",
  ];

  for (let i = 0; i < imagesToPreload.length; i++) {
    const img = new Image();
    img.src = `assets/images/pricing/${imagesToPreload[i]}.png`;
  }
};
preloadImages();

// ----------------------------------- Variables: Prices
let smallSizePrice = 50;
let mediumSizePrice = 70;
let largeSizePrice = 130;
let interiorPriceMultiplier = 0.8;
let exteriorPriceMultiplier = 0.9;
let bothPriceMultiplier = 1;
let imageServicePrice = 30;
let videoServicePrice = 50; // for 15 seconds of video
let panoramicServicePrice = 70;
let interactiveServicePrice = 300;

// ----------------------------------- Internal Variables
let totalProjectPrice = 0;
let totalProjectDays = 0;
let selectedProjectSize = 1;
let addedServicesCount = 0;
let interactiveServiceEnabled = false;
let interactiveServicesSum = 1;
let imageDemoSize = "small";
let imageDemoType = "interior";

// ----------------------------------- DOM Query Selectors
const projectSlider = document.querySelector("input.pricing-slider");
const projectSizeText = document.querySelector(
  ".pricing-interactive .proyect-size"
);
const projectImage = document.querySelector(".pricing-example img");
const projectTypeSlider = document.querySelector(".type-slider");
const projectTypeText = document.querySelector(".proyect-type");
const projectServiceOptions = document.getElementsByClassName(
  "pricing-select-service"
);
const projectQuantityInputs =
  document.getElementsByClassName("pricing-quantity");
const serviceText = document.getElementsByClassName("service-text");
const serviceAddBoxes = document.getElementsByClassName("service-box");
const removeButton = document.getElementsByClassName("bx bx-x-circle");
const addServiceButton = document.querySelector("#add-service");
const totalBudgetArg = document.querySelector(".budget-arg");
const totalBudgetUsd = document.querySelector(".budget-usd");
const totalProjectTime = document.querySelector(".budget-time");

// ----------------------------------- Hide additional services
serviceAddBoxes[1].style.display = "none";
serviceAddBoxes[2].style.display = "none";
serviceAddBoxes[3].style.display = "none";

// ----------------------------------- Button to add new services
addServiceButton.addEventListener("click", () => {
  if (addedServicesCount == 0) {
    serviceAddBoxes[1].style.display = "flex";
  } else if (addedServicesCount == 1) {
    serviceAddBoxes[2].style.display = "flex";
    removeButton[0].style.display = "none";
  } else if (addedServicesCount == 2) {
    serviceAddBoxes[3].style.display = "flex";
    removeButton[1].style.display = "none";
    addServiceButton.style.display = "none";
  }
  addedServicesCount++;
  calculatePrice();
});

// ----------------------------------- Buttons for remove prices
removeButton[0].addEventListener("click", function () {
  removeService();
});
removeButton[1].addEventListener("click", function () {
  removeService();
});
removeButton[2].addEventListener("click", function () {
  removeService();
});

function removeService() {
  if (addedServicesCount == 1) {
    serviceAddBoxes[1].style.display = "none";
  } else if (addedServicesCount == 2) {
    serviceAddBoxes[2].style.display = "none";
    removeButton[0].style.display = "block";
  } else if (addedServicesCount == 3) {
    serviceAddBoxes[3].style.display = "none";
    removeButton[1].style.display = "block";
    addServiceButton.style.display = "block";
  }
  addedServicesCount--;
  calculatePrice();
}

// ----------------------------------- Slider to adjust project size
projectSlider.oninput = function () {
  if (this.value == 0) {
    selectedProjectSize = 1;
    projectSizeText.textContent = "• Chico";
    imageDemoSize = "small";
    imageDemo();
  }
  if (this.value == 1) {
    selectedProjectSize = 2;
    projectSizeText.textContent = "• Mediano";
    imageDemoSize = "medium";
    imageDemo();
  }
  if (this.value == 2) {
    selectedProjectSize = 3;
    projectSizeText.textContent = "• Grande";
    imageDemoSize = "large";
    imageDemo();
  }
  calculatePrice();
};

// ----------------------------------- Slider to adjust project type
projectTypeSlider.oninput = function () {
  if (this.value == 0) {
    projectTypeText.textContent = "• Interior";
    imageDemoType = "interior";
    imageDemo();
  }
  if (this.value == 1) {
    projectTypeText.textContent = "• Exterior";
    imageDemoType = "exterior";
    imageDemo();
  }
  if (this.value == 2) {
    projectTypeText.textContent = "• Ambos";
    imageDemoType = "both";
    imageDemo();
  }
  calculatePrice();
};

// ----------------------------------- Helper for visual representation of the project
const imageDemo = () => {
  projectImage.src = `assets/images/pricing/${imageDemoSize}-${imageDemoType}.png`;
};

imageDemo();

// ----------------------------------- Adjusting text based on service type
function changeServiceText(serviceOption, selectorQuery, quantity) {
  switch (serviceOption) {
    case "1":
      selectorQuery.style.display = "block";
      selectorQuery.textContent = "Cantidad:";
      quantity.style.display = "block";
      if (interactiveServiceEnabled == true) {
        addServiceButton.style.display = "block";
        interactiveServiceEnabled = false;
      }
      for (let i = 1; i < 11; i++) {
        quantity.querySelector(".option" + i).textContent = i;
      }
      break;
    case "2":
      selectorQuery.style.display = "block";
      selectorQuery.textContent = "Segundos:";
      quantity.style.display = "block";
      if (interactiveServiceEnabled == true) {
        addServiceButton.style.display = "block";
        interactiveServiceEnabled = false;
      }
      for (let i = 1; i < 11; i++) {
        quantity.querySelector(".option" + i).textContent = i * 15;
      }
      break;
    case "3":
      selectorQuery.style.display = "block";
      selectorQuery.textContent = "Cantidad:";
      quantity.style.display = "block";
      if (interactiveServiceEnabled == true) {
        addServiceButton.style.display = "block";
        interactiveServiceEnabled = false;
      }
      for (let i = 1; i < 11; i++) {
        quantity.querySelector(".option" + i).textContent = i;
      }
      break;
    case "4":
      selectorQuery.style.display = "block";
      selectorQuery.textContent = "Interactividad:";
      quantity.style.display = "block";
      if (interactiveServiceEnabled == true) {
        addServiceButton.style.display = "block";
        interactiveServiceEnabled = false;
      }
      for (let i = 1; i < 11; i++) {
        quantity.querySelector(".option" + i).textContent = i;
      }
      break;
  }
}

// ----------------------------------- Update the price when any adjustment is made
projectServiceOptions[0].oninput = function () {
  changeServiceText(this.value, serviceText[0], projectQuantityInputs[0]);
  calculatePrice();
};

projectQuantityInputs[0].oninput = function () {
  calculatePrice();
};

projectServiceOptions[1].oninput = function () {
  changeServiceText(this.value, serviceText[1], projectQuantityInputs[1]);
  calculatePrice();
};

projectQuantityInputs[1].oninput = function () {
  calculatePrice();
};

projectServiceOptions[2].oninput = function () {
  changeServiceText(this.value, serviceText[2], projectQuantityInputs[2]);
  calculatePrice();
};

projectQuantityInputs[2].oninput = function () {
  calculatePrice();
};

projectServiceOptions[3].oninput = function () {
  changeServiceText(this.value, serviceText[3], projectQuantityInputs[3]);
  calculatePrice();
};

projectQuantityInputs[3].oninput = function () {
  calculatePrice();
};

let checkbox = document.getElementsByClassName("checkbox");
for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener("click", checkboxSum);
}

function checkboxSum(event) {
  if (event.target.checked) {
    interactiveServicesSum += 1;
  } else {
    interactiveServicesSum -= 1;
  }
  calculatePrice();
}

// ----------------------------------- Calculate the price
function calculatePrice() {
  switch (selectedProjectSize) {
    case 1:
      totalProjectPrice = smallSizePrice;
      totalProjectDays = 3;
      break;
    case 2:
      totalProjectPrice = mediumSizePrice;
      totalProjectDays = 5;
      break;
    case 3:
      totalProjectPrice = largeSizePrice;
      totalProjectDays = 7;
      break;
  }

  totalProjectPrice += serviceQuantityMultiplicator(
    projectServiceOptions[0].value,
    projectQuantityInputs[0].value
  );

  if (addedServicesCount >= 1) {
    totalProjectPrice += serviceQuantityMultiplicator(
      projectServiceOptions[1].value,
      projectQuantityInputs[1].value
    );
  }

  if (addedServicesCount >= 2) {
    totalProjectPrice += serviceQuantityMultiplicator(
      projectServiceOptions[2].value,
      projectQuantityInputs[2].value
    );
  }

  if (addedServicesCount >= 3) {
    totalProjectPrice += serviceQuantityMultiplicator(
      projectServiceOptions[3].value,
      projectQuantityInputs[3].value
    );
  }

  switch (projectTypeSlider.value) {
    case "0":
      totalProjectPrice *= interiorPriceMultiplier;
      break;
    case "1":
      totalProjectPrice *= exteriorPriceMultiplier;
      break;
    case "2":
      totalProjectPrice *= bothPriceMultiplier;
      totalProjectDays += 1;
      break;
  }

  if (totalProjectDays == 1) {
    totalProjectTime.textContent = "1 día hábil";
  } else {
    totalProjectTime.textContent = totalProjectDays + " días hábiles";
  }

  totalProjectPrice = totalProjectPrice.toFixed();
  totalProjectPrice = Math.round(totalProjectPrice / 10) * 10;
  totalBudgetUsd.textContent =
    "$ " + toCommas(totalProjectPrice) + " (dolares)";
  totalProjectPrice /= 2; // cheaper price for Argentina

  if (dollarApiAvailable == true) {
    totalProjectPrice = (totalProjectPrice * dollar).toFixed();
    totalProjectPrice = Math.round(totalProjectPrice / 1000) * 1000;
    totalBudgetArg.textContent =
      "$ " + toCommas(totalProjectPrice) + " (pesos)";
  } else {
    totalBudgetArg.textContent =
      "$ " + toCommas(totalProjectPrice) + " (dolares)";
  }
}

// ----------------------------------- Helper to multiply "service x quantity" when calculating the price
function serviceQuantityMultiplicator(service, quantity) {
  switch (service) {
    case "1":
      if (quantity > 5) {
        totalProjectDays += 1;
      }
      return imageServicePrice * quantity;
      break;
    case "2":
      if (quantity > 2) {
        totalProjectDays += 1;
      }
      return videoServicePrice * quantity;
      break;
    case "3":
      totalProjectDays += 1;
      if (quantity > 3) {
        totalProjectDays += 1;
      }
      if (quantity > 6) {
        totalProjectDays += 1;
      }
      return panoramicServicePrice * quantity;
      break;
    case "4":
      totalProjectDays += 3;
      if (quantity > 2) {
        totalProjectDays += 1;
      }
      if (quantity > 7) {
        totalProjectDays += 1;
      }
      if (quantity > 8) {
        totalProjectDays += 1;
      }
      return interactiveServicePrice * quantity;
      break;
  }
}

// ----------------------------------- Helper to add "." between 3 digits of a number.
function toCommas(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ------------------------------------------------------  Blue Dollar Value API
let dollar = 0;
let dollarApiAvailable = false;

const checkDollarValue = async () => {
  try {
    let request = await fetch("https://api.bluelytics.com.ar/v2/latest");
    let response = await request.json();
    dollarApiAvailable = true;
    dollar = response.blue.value_sell;
    calculatePrice();
  } catch (e) {
    console.error(e);
    dollarApiAvailable = false;
    calculatePrice();
  }
};

checkDollarValue();

// ------------------------------------------------------  Contact Form

const validateEmail = (emailToValidate) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(emailToValidate);
};

const formModal = document.getElementById("form-modal");
const messageInModal = document.getElementById("form-status");
const messageInput = document.getElementById("message");
const modalNotification = (error) => {
  messageInModal.style.color = "#b00";
  messageInModal.textContent = error;
  formModal.style.display = "block";
  messageInput.style.height = "15.2rem";
};

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  if (nameInput.value.length < 1 || nameInput.value.length > 30) {
    nameInput.style.border = "3px solid #b00";
    modalNotification("El nombre debe tener entre 1 y 30 caracteres.");
    return;
  } else {
    nameInput.style.border = "none";
  }

  const emailInput = document.getElementById("email");
  if (!validateEmail(emailInput.value)) {
    emailInput.style.border = "3px solid #b00";
    modalNotification("Ingresa una dirección de correo electrónico válida.");
    return;
  } else {
    emailInput.style.border = "none";
  }

  const mobileInput = document.getElementById("mobile");
  if (
    mobileInput.value.length < 3 ||
    mobileInput.value.length > 16 ||
    isNaN(mobileInput.value)
  ) {
    mobileInput.style.border = "3px solid #b00";
    modalNotification("El número de teléfono debe tener entre 4 y 16 números.");
    return;
  } else {
    mobileInput.style.border = "none";
  }

  const subjectInput = document.getElementById("subject");
  if (subjectInput.value.length < 1 || subjectInput.value.length > 30) {
    subjectInput.style.border = "3px solid #b00";
    modalNotification("El asunto debe tener entre 1 y 30 caracteres.");
  } else {
    subjectInput.style.border = "none";
  }

  if (messageInput.value.length < 1 || messageInput.value.length > 300) {
    messageInput.style.border = "3px solid #b00";
    modalNotification("El mensaje debe tener entre 1 y 300 caracteres.");
    return;
  } else {
    messageInput.style.border = "none";
  }

  formModal.style.display = "block";
  messageInModal.style.color = "#080";
  messageInModal.textContent = "Mensaje enviado con éxito."; //---- This is a fake success message because probably github pages will not be able to use php

  const formData = new FormData(contactForm);

  fetch("../php/contact.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        messageInModal.textContent = "Mensaje enviado con éxito."; //--- This should be the real success message if the page is able to use php
        contactForm.reset();
      } else {
        modalNotification(
          "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo."
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
