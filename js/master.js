// Check IF Theres Local Storage Color Option

let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove ctive From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");

    // Add Class Active On Element With Data Color === Local Storage item
    if (ele.dataset.color === mainColors) {
      ele.classList.add("active");
    }
  });
}

// Toggle Spin Class On Icon
let settingsBox = document.querySelector(".settings-box");
let settingIcon = document.querySelector(".setting-icon");
let optionBox = document.querySelectorAll(".option-box");
settingIcon.addEventListener("click", () => {
  // Toggle Class FA-spin For Rotation on Self
  settingIcon.classList.toggle("fa-spin");
  settingsBox.classList.toggle("box-shadow-settings-box");

  // Toggle Class Open On Main Settings Box
  settingsBox.classList.toggle("open");
});

settingsBox.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target !== settingsBox && e.target !== optionBox) {
    if (settingsBox.classList.contains("open")) {
      settingsBox.classList.toggle("open");
    }
  }
});

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop
colorsLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    //  Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    addClassActive(e);
  });
});

// Switch Random BAckground Option
const randomBackele = document.querySelectorAll(".random-background span");

// Random Background Option
let backgroundOption = true;

// Variable To Control To Intrval
let backgroundInterval;

// Check IF There's Local Srorage Random BackGround Item
let backgroundLocalItem = localStorage.getItem("background_option");

//Check If Random Background Local Not Empty
if (backgroundLocalItem !== null) {
  randomBackele.forEach((e) => e.classList.remove("active"));
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-background .no").classList.add("active");
  }

  // Remove Active For All Spans
}

// Loop On Spans
randomBackele.forEach((ele) => {
  // Click On Every Span
  ele.addEventListener("click", (e) => {
    addClassActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomize();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});
// Select Landing Page Element

let landingPage = document.querySelector(".landing-page");

// Get Arry OF Imgs

let imgsArry = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Change BackGround Image Url
landingPage.style.backgroundImage = `url(imgs/01.jpg)`;

// Function To Randomize Imgs
function randomize() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArry.length);
      landingPage.style.backgroundImage = `url(imgs/${imgsArry[randomNumber]})`;
    }, 5000);
  }
}

randomize();

// Select Skills Selctor
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScroolTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = 0;
    });
  }
};

// Start Gallery == Creat Pipup With The Image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay ELement
    let overlay = document.createElement("div");

    //Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append OverLay To The Body
    document.body.appendChild(overlay);

    // Create The Popup
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";
    // Add Alt Text
    if (img.alt !== null) {
      // First One Creat Heading
      let imgHeding = document.createElement("h3");

      //Creat Text For Hedaing
      let imgText = document.createTextNode(img.alt);

      // Append Text To Heding
      imgHeding.appendChild(imgText);

      // Appen The Heding To The Imge Popup
      popupBox.appendChild(imgHeding);
    }
    // Create The Image
    let popupImage = document.createElement("img");

    // Add Src To Imge
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To Body
    document.body.appendChild(popupBox);

    // Creat The Close Span
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let textCloseButton = document.createTextNode("X");

    // Append Text To Close Button
    closeButton.appendChild(textCloseButton);

    // Add Class To Vlose Button
    closeButton.className = "close-button";

    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove The current Popup
    e.target.parentNode.remove();
    //Remove The Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Sellect All Bollets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");

function scrollToSection(elements) {
  elements.forEach((e) => {
    e.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(allBullets);
scrollToSection(allLinks);

// Add And Remove Class Avtive
function addClassActive(ele) {
  // Remove Class Active For All Childerns
  ele.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  // Add Class Active For Target
  ele.target.classList.add("active");
}

let bulletSpan = document.querySelectorAll(".bullets-option span");

let bulletsContiner = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  bulletSpan.forEach((e) => {
    e.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContiner.style.display = bulletLocalItem;
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContiner.style.display = bulletLocalItem;

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContiner.style.display = e.target.dataset.display;

      localStorage.setItem("bullets-option", e.target.dataset.display);
    } else {
      bulletsContiner.style.display = e.target.dataset.display;
      localStorage.setItem("bullets-option", e.target.dataset.display);
    }
    addClassActive(e);
  });
});
// Reset Button In Settings Box

document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
let linksMenu = document.querySelector(".links");
let toggleMenu = document.querySelector(".links-container .toggle-menu");

toggleMenu.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  linksMenu.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== linksMenu) {
    if (linksMenu.classList.contains("open")) {
      toggleMenu.classList.toggle("menu-active");
      linksMenu.classList.toggle("open");
    }
  }
});

linksMenu.onclick = function (e) {
  e.stopPropagation();
};
