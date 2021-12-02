/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
/**
 * Define Global Variables
 * 
*/

const scrollBtn = document.getElementsByClassName("backTop")[0];
const navBarList = document.getElementById("navbar__list");
const [...sections] = document.getElementsByTagName("section");
const	navItems = document.getElementsByClassName("navbar__item");

const sectionsIDs = sections.map(sec => sec.id);
const navItemsData = sections.map(sec => sec.getAttribute("data-nav"));


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const scrollTo = (e) => {
	e.preventDefault();
	const target = e.target.getAttribute("data-scroll-to");
	const element = document.querySelector(target);

	element.scrollIntoView({ behavior: "smooth" });
};

const isInViewport = (elem) => {
    const { top, bottom } = elem.getBoundingClientRect();
		const winHeight = window.innerHeight || document.documentElement.clientHeight;

  	return bottom >= 0 && top <= winHeight
};

const showBackToTop = () =>	window.addEventListener("scroll", () => scrollBtn.classList.toggle("backTop--active", window.scrollY > 500));

const btnTop = () => window.scrollTo({ top: 0,	behavior: "smooth" });

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
const buildNav = (nav, items, secIDs) => {
	const fragment = document.createDocumentFragment();

	items.map((item, i) => {
	const listItem = document.createElement("li");

  listItem.textContent = item;
	listItem.classList.add("navbar__item");
	listItem.addEventListener("click", scrollTo);
	listItem.setAttribute("data-scroll-to", `#${secIDs[i]}`);

    fragment.appendChild(listItem);
  });

	nav.appendChild(fragment);
};

// Add class 'active' to section when near top of viewport
const activateSec = () => {
  sections.map((sec) => {
    window.addEventListener("scroll", (event) => {
      isInViewport(sec)
        ? sec.classList.add("sectionActive")
        : sec.classList.remove("sectionActive");
    });
  });
};

/**
 * End Main Functions
 
 * Begin Call Functions 
 * 
*/

// Build menu 
buildNav(navBarList, navItemsData, sectionsIDs);
// Scroll to section on link click
showBackToTop()
btnTop()
// Set sections as active
activateSec()


 
