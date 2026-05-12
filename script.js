
(async function getProducts() {

    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    displayProducts(products);

    const rev = await fetch('reviews.json');
    reviewsData = await rev.json();
    startSlider();
})();


const review_comment = document.getElementById("review-comment");
const review_name = document.getElementById("review-name");
const review_date = document.getElementById("review-date");
const review_count = document.getElementById("review-count");


let curr = 0;
let reviewsData = [];
let intervalId = null;


// render single review
function renderReview(index) {

    const review = reviewsData[index];

    review_count.classList.remove("opacity-100", "translate-y-0");
    review_count.classList.add("opacity-0", "translate-y-4");

    setTimeout(() => {

        review_comment.textContent = `"${review.comment}"`;
        review_name.textContent = review.name;
        review_date.textContent = review.date;

        review_count.classList.remove("opacity-0", "translate-y-4");
        review_count.classList.add("opacity-100", "translate-y-0");
    }, 300);
}


// start slider
function startSlider() {

    renderReview(currentIndex);

    intervalId = setInterval(() => {

        curr++;

        if (curr >= reviewsData.length) {
            curr = 0;
        }

        renderReview(curr);

    }, 3000);

}

// NEXT button
document.getElementById("next-review").addEventListener("click", () => {
    curr++;
    if (curr >= reviewsData.length) {
        curr = 0;
    }

    renderReview(curr);
});

// PREV button
document.getElementById("prev-review").addEventListener("click", () => {

    curr--;
    if (curr < 0) {
        curr = reviewsData.length - 1;
    }
    renderReview(curr);
});

// display products ===>

function displayProducts(products) {
    const container = document.getElementById("product-container");


    products.forEach(product => {

        const card = document.createElement("div");
        card.className = "group flex flex-col bg-white p-4 border border-[#e9ecef] hover:border-[#212529] transition-all animate-fadeInUp";

        card.innerHTML = `

        <div class="relative aspect-square overflow-hidden mb-4 bg-[#f8f9fa]">
        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500">
        <div class="absolute top-2 left-2 px-2 py-1 bg-[#212529] text-white text-[10px] font-bold uppercase tracking-widest">${product.category}</div>
        </div>
        <h3 class="text-sm font-bold text-black line-clamp-1 mb-1">${product.title}</h3>

        <div class="flex items-center gap-1 mb-2">
          <span>★★★★</span>
          <span class="text-gray-300">★</span>
          <span class="text-[10px] text-[#343a40]/40 font-bold">(${product.rating.count})</span>
        </div>

        <div class="mt-auto flex items-center justify-between">
          <span class="text-lg font-bold font-mono">৳${(product.price * 130).toFixed(2)}</span>
          <button onclick="addToCart(${product.id})" class="p-2 border border-[#212529] hover:bg-[#212529] hover:text-white transition-all transform active:scale-95">
          +
          </button>
        </div>
        
        `;

        container.appendChild(card);

    });

}





// code for sliding images ===>>
const slider = document.getElementById("slide_container");

const slides = document.querySelectorAll("#slide_container img");

const nextBtn = document.getElementById("right_btn");

const prevBtn = document.getElementById("left_btn");

const dotsContainer = document.getElementById("banner-dots");


let currentIndex = 0;
const totalSlides = slides.length;


slides.forEach((slide, index) => {

    const dot = document.createElement("button");

    dot.className = "w-3 h-3 rounded-full bg-white/50 transition-all";

    if (index === 0) {
        dot.classList.add("bg-white");
    }

    dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider(currentIndex);
    });

    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("button");

function updateSlider(currentIndex) {
    const imageWidth = slider.parentElement.clientWidth;

    slider.style.transform = `TranslateX(-${currentIndex * imageWidth}px)`;


    dots[currentIndex].classList.add("bg-white");
    dots[currentIndex].classList.remove("bg-white/50");

    dots.forEach((dot, index) => {
        if (index !== currentIndex) {
            dot.classList.remove("bg-white");
            dot.classList.add("bg-white/50");
        }
    });
}

prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }
    updateSlider(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    updateSlider(currentIndex);
});

let direction = 1;
setInterval(() => {
    currentIndex += direction;

    if (currentIndex >= totalSlides - 1) {
        direction = -1;
    }
    if (currentIndex <= 0) {
        direction = 1;
    }

    updateSlider(currentIndex);

}, 2000);

// end of code for sliding images ===>>


// code for cart functionality ===>>
