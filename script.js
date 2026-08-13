/* === GLOBAL VARIABLES === */
console.log("INTRO JS LOADED");

document.body.classList.add("intro-active");


fetch("assets/logo.svg")
.then(response => response.text())
.then(svgText => {


    const container = document.getElementById("introLogo");


    container.innerHTML = svgText;


    const svg = container.querySelector("svg");


    const paths = svg.querySelectorAll("path");


    console.log("PATHS FOUND:", paths.length);



    paths.forEach(path => {

    const length = path.getTotalLength();

    path.style.stroke = "#ffd36a";

    path.style.fill = "transparent";

    path.style.strokeWidth = "2";

    path.style.strokeDasharray = length;

    path.style.strokeDashoffset = length;

    
});


const tl = gsap.timeline();


/* Draw logo */

tl.to(paths, {

    strokeDashoffset:0,

    duration:3,

    stagger:0.005,

    ease:"power2.inOut"

})



/* Glow appears */

.to(".glow",{

    opacity:1,

    scale:1.2,

    duration:1,

    ease:"power2.out"

})

.to(".glow",{

    scale:1,

    duration:1,

    ease:"power2.inOut"

})


/* Logo breathing effect */

.to("#introLogo",{

    scale:1.05,

    duration:1,

    ease:"power2.inOut"

})

.to("#introLogo",{

    scale:1,

    duration:1,

    ease:"power2.inOut"

})



/* Hold the logo */

.to({},{

    duration:1

})



/* Reveal website */

.to("#intro",{

    opacity:0,

    duration:1.2,

    ease:"power2.inOut",

    onComplete:()=>{

        const intro = document.getElementById("intro");

        if(intro){

            intro.remove();

        }

        document.body.classList.remove("intro-active");

    }

});

});

const cards = document.querySelectorAll(".card");
const overlay = document.getElementById("modalOverlay");
const body = document.querySelector("body");
const coursePlayer = new Audio();
coursePlayer.loop = true;
let fadeInterval;

// Lightbox & Gallery Globals
let currentImageIndex = 0;
let activeImages = [];
let gIndex = 0;

/* === 1. AUDIO ENGINE === */
const fadeAudio = (targetVolume, duration, callback) => {
    clearInterval(fadeInterval);
    const step = 0.05; 
    const intervalTime = 50; 

    fadeInterval = setInterval(() => {
        if (targetVolume > coursePlayer.volume) {
            coursePlayer.volume = Math.min(coursePlayer.volume + step, targetVolume);
        } else {
            coursePlayer.volume = Math.max(coursePlayer.volume - step, targetVolume);
        }

        if (Math.abs(coursePlayer.volume - targetVolume) < 0.01) {
            coursePlayer.volume = targetVolume;
            clearInterval(fadeInterval);
            if (callback) callback();
        }
    }, intervalTime);
};

/* === 2. MASTER CLOSING LOGIC (FIXED FOR MOBILE) === */
const closeEverything = () => {
    // FIX: Force stop audio immediately so it doesn't linger on mobile
    coursePlayer.pause();
    coursePlayer.currentTime = 0;
    clearInterval(fadeInterval);

    if (overlay) overlay.classList.remove("active");
    body.classList.remove("no-scroll");
    document.body.style.overflow = 'auto'; 

    cards.forEach(c => {
        c.classList.remove("expanded", "dim");
        c.style.zIndex = ""; 
    });

    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        lightbox.style.display = 'none';
    }

    const backdrop = document.querySelector(".course-backdrop");

if(backdrop){
    backdrop.classList.remove("active");
    console.log("BACKDROP:", backdrop);
console.log("IMAGE:", backdropImage);
}
    
    closeContactModal();
};

/* === 3. COURSE CARDS & BUTTONS === */
cards.forEach(card => {

    const learnBtn = card.querySelector(".learn-btn");

    if (learnBtn) {

        learnBtn.addEventListener("click", () => {
           console.log("Learn button clicked");
           console.log("overlay z-index:", getComputedStyle(overlay).zIndex);
console.log("card z-index:", getComputedStyle(card).zIndex);

            cards.forEach(c => {
                c.classList.remove("expanded");
                c.classList.add("dim");
            });


            card.classList.remove("dim");
            card.classList.add("expanded");


            card.style.zIndex = "2000";


            if (overlay) {
                overlay.classList.add("active");
            }


            body.classList.add("no-scroll");


            // NEW BACKGROUND IMAGE EFFECT

            const backdrop = document.querySelector(".course-backdrop");
            const backdropImage = document.querySelector(".backdrop-image");


            const img = card.querySelector(".card-img");


            const bg = getComputedStyle(img).backgroundImage;
            console.log(bg);


            if (backdrop && backdropImage) {

                    backdropImage.style.backgroundImage = bg;

                    backdrop.classList.add("active");
                    console.log("BACKDROP ACTIVE");
backdrop.style.pointerEvents = "none";

        }


            // AUDIO (keeping your existing system)

            const instrument = card.classList[1];

            coursePlayer.src = `audio/${instrument}.m4a`;

            coursePlayer.volume = 0;

            coursePlayer.play()
            .catch(e => console.log("Audio play blocked"));


            fadeAudio(0.6,500);


        });

    }

});

document.querySelectorAll(".enroll-btn-small").forEach(link => {
    link.addEventListener("click", () => {
        setTimeout(closeEverything, 100); 
    });
});

/*if (overlay) overlay.addEventListener('click', closeEverything);

/* === 4. PHOTO GALLERY LOGIC === */
const galleryData = [
    { src: 'inaug-1.jpg', category: 'inauguration' },
    { src: 'inaug-2.jpg', category: 'inauguration' },
    { src: 'inaug-3.jpg', category: 'inauguration' },
    { src: 'inaug-4.jpg', category: 'inauguration' },
    { src: 'inaug-5.jpg', category: 'inauguration' },
    { src: 'inaug-6.jpg', category: 'inauguration' },
    { src: 'campus-1.jpg', category: 'institute' },
    { src: 'campus-2.jpg', category: 'institute' },
    { src: 'campus-3.jpg', category: 'institute' },
    { src: 'campus-4.jpg', category: 'institute' },
    { src: 'campus-5.jpg', category: 'institute' },
    { src: 'campus-6.jpg', category: 'institute' },
    { src: 'campus-7.jpg', category: 'institute' },
    { src: 'campus-8.jpg', category: 'institute' },
    { src: 'SC-1.jpg', category: 'students-cultural activities' },
    { src: 'SC-2.jpg', category: 'students-cultural activities' },
    { src: 'SC-3.jpg', category: 'students-cultural activities' },
    { src: 'SC-4.jpg', category: 'students-cultural activities' },
    { src: 'SC-5.jpg', category: 'students-cultural activities' },
    { src: 'SC-6.jpg', category: 'students-cultural activities' },
    { src: 'SC-7.jpg', category: 'students-cultural activities' },
    { src: 'SC-8.jpg', category: 'students-cultural activities' },
    { src: 'SC-9.jpg', category: 'students-cultural activities' },
    { src: 'SC-10.jpg', category: 'students-cultural activities' },
    { src: 'SC-11.jpg', category: 'students-cultural activities' },
    { src: 'SC-12.jpg', category: 'students-cultural activities' },
    { src: 'CH-1.jpg', category: 'communal harmony' },
    { src: 'CH-2.jpg', category: 'communal harmony' },
    { src: 'CH-3.jpg', category: 'communal harmony' },
    { src: 'CH-4.jpg', category: 'communal harmony' },
    { src: 'NAAC-1.jpg', category: 'naac cultural program' },
    { src: 'NAAC-2.jpg', category: 'naac cultural program' },
    { src: 'NAAC-3.jpg', category: 'naac cultural program' },
    { src: 'NAAC-4.jpg', category: 'naac cultural program' },
    { src: 'NAAC-5.jpg', category: 'naac cultural program' },
    { src: 'NAAC-6.jpg', category: 'naac cultural program' },
    { src: 'NAAC-7.jpg', category: 'naac cultural program' },
    { src: 'NAAC-8.jpg', category: 'naac cultural program' },
    { src: 'NAAC-9.jpg', category: 'naac cultural program' },
    { src: 'NAAC-10.jpg', category: 'naac cultural program' },
    { src: 'NAAC-11.jpg', category: 'naac cultural program' },
    { src: 'NAAC-12.jpg', category: 'naac cultural program' },
    { src: 'NAAC-13.jpg', category: 'naac cultural program' },
    { src: 'NAAC-14.jpg', category: 'naac cultural program' },
    { src: 'NAAC-15.jpg', category: 'naac cultural program' },
    { src: 'NAAC-16.jpg', category: 'naac cultural program' },
    { src: 'NAAC-17.jpg', category: 'naac cultural program' },
    { src: 'NAAC-18.jpg', category: 'naac cultural program' },
    { src: '75th-1.jpg', category: '75th Azaadi ka Amrit Mahotsav' },
    { src: '75th-2.jpg', category: '75th Azaadi ka Amrit Mahotsav' },
    { src: '75th-3.jpg', category: '75th Azaadi ka Amrit Mahotsav' },
    { src: '75th-4.jpg', category: '75th Azaadi ka Amrit Mahotsav' },
    { src: '75th-5.jpg', category: '75th Azaadi ka Amrit Mahotsav' },
    { src: 'Jan-1.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-2.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-3.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-4.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-5.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-6.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-7.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-8.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-9.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-10.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-11.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-12.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-13.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-14.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-15.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-16.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Jan-17.jpg', category: '26th Jan & 15th August Celebration' },
    { src: 'Kl-1.jpg', category: 'KALARANG' },
    { src: 'Kl-2.jpg', category: 'KALARANG' },
    { src: 'Kl-3.jpg', category: 'KALARANG' },
    { src: 'Kl-4.jpg', category: 'KALARANG' },
    { src: 'Kl-5.jpg', category: 'KALARANG' },
    { src: 'Kl-6.jpg', category: 'KALARANG' },
    { src: 'Kl-7.jpg', category: 'KALARANG' },
    { src: 'Kl-8.jpg', category: 'KALARANG' },
    { src: 'Kl-9.jpg', category: 'KALARANG' },
    { src: 'Kl-10.jpg', category: 'KALARANG' },
    { src: 'Kl-11.jpg', category: 'KALARANG' },
    { src: 'Kl-12.jpg', category: 'KALARANG' },
    { src: 'Kl-13.jpg', category: 'KALARANG' },
    { src: 'Kl-14.jpg', category: 'KALARANG' },
    { src: 'Kl-15.jpg', category: 'KALARANG' },
    { src: 'Kl-16.jpg', category: 'KALARANG' },
    { src: 'Kl-17.jpg', category: 'KALARANG' },
    { src: 'Kl-18.jpg', category: 'KALARANG' },
    { src: 'Kl-19.jpg', category: 'KALARANG' },
    { src: 'Kl-20.jpg', category: 'KALARANG' },
    { src: 'Kl-21.jpg', category: 'KALARANG' },
    { src: 'IC-1.jpg', category: 'Inter-college Band competition' },
    { src: 'IC-2.jpg', category: 'Inter-college Band competition' },
    { src: 'IC-3.jpg', category: 'Inter-college Band competition' },
    { src: 'IC-4.jpg', category: 'Inter-college Band competition' },
    { src: 'IC-5.jpg', category: 'Inter-college Band competition' },
];

function openAlbum(category) {
    const albumContainer = document.getElementById('albumContainer');
    const photoView = document.getElementById('photoView');
    const galleryGrid = document.getElementById('galleryGrid');
    const albumTitle = document.getElementById('activeAlbumTitle');

    if(!albumTitle || !galleryGrid) return;
    
    albumTitle.innerText = category.toUpperCase();
    galleryGrid.innerHTML = ''; 

    const filteredPhotos = galleryData.filter(img => img.category === category);
    activeImages = filteredPhotos.map(data => `images/${data.src}`);

    filteredPhotos.forEach((data, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item visible';
        item.innerHTML = `
            <img src="images/${data.src}" class="clickable-img" onclick="openLightbox('images/${data.src}', ${index})">
            <div class="gallery-overlay"><span>VIEW</span></div>
        `;
        galleryGrid.appendChild(item);
    });

    if(albumContainer) albumContainer.style.display = 'none';
    if(photoView) {
        photoView.classList.add('photo-view-active');
        photoView.classList.remove('photo-view-hidden');
    }
}

function openLightbox(src, index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    currentImageIndex = index;
    if(lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex'; 
        lightbox.classList.add('active'); 
        document.body.style.overflow = 'hidden';
    }
}

function changeImage(step) {
    if (activeImages.length === 0) return;
    currentImageIndex += step;
    if (currentImageIndex >= activeImages.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = activeImages.length - 1;
    document.getElementById('lightboxImg').src = activeImages[currentImageIndex];
}

/* === 5. UI TOGGLES (DROPDOWNS & MODALS) === */
function toggleDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById("moreDropdown");
    if(dropdown) dropdown.classList.toggle("show");
}

function toggleAlbums() {
    const extraAlbums = document.getElementById('extraAlbums');
    const btn = document.getElementById('loadMoreBtn');
    if (!extraAlbums.classList.contains('show')) {
        extraAlbums.classList.add('show');
        btn.innerText = "Show Less";
    } else {
        extraAlbums.classList.remove('show');
        btn.innerText = "Load More Albums";
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    }
}

function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.setProperty('display', 'flex', 'important');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/* === 6. REVEAL ON SCROLL === */
const revealSections = () => {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-section, #alumni-3d-section, #our-alumni');
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
};

/* === 7. ADMISSIONS FORM SUCCESS MODAL === */
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.innerHTML = `
            <div class="success-modal-content">
                <div class="success-icon"><i class="fas fa-check"></i></div>
                <h2>Admission Received!</h2>
                <p>Your musical journey with <strong>MGM Rhythm</strong> is about to begin. Our team will contact you within 24 hours.</p>
                <button class="enroll-btn" onclick="closeModal()" style="margin-top: 20px; width: 100%;">Great!</button>
            </div>
        `;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

/* === 8. 3D ALUMNI HALL OF FAME === */
const alumniData = [
    { name: "Megha Agrawal", info: "MGM Rhythm Cultural Sec. (Batch-2022)", photo: "images/student1.jpg", quote: "MGM Rhythm is not just an institute, it was a family where I found my true passion." },
    { name: "Devanshu Gupta", info: "Vocals (Batch-2022)", photo: "images/student2.jpg", quote: "It transformed me from a shy singer to a confident performer." },
    { name: "Avadh Barot", info: "Vocals (Batch-2022)", photo: "images/student3.jpg", quote: "MGM Rhythm gave me the confidence to express myself through music." },
    { name: "Sneha Banerjee", info: "Vocals (Batch-2022)", photo: "images/student4.jpg", quote: "The bond I formed with my fellow members is something I will treasure forever." },
    { name: "Parth Yadav", info: "Guitar (Batch-2024)", photo: "images/student5.jpg", quote: "Helped me discover my passion for guitar and gave me the platform to showcase it." },
    { name: "Girija Ladva", info: "Vocals (Batch-2024)", photo: "images/student6.jpg", quote: "The support and encouragement made all the difference in my journey." },
    { name: "Shrutik Patil", info: "Flute (Batch-2022)", photo: "images/student7.jpg", quote: "Allowed me to explore different musical genres and grow as a performer." },
    { name: "Jerusha Joeyboy", info: "Classical-Dance (Batch-2024)", photo: "images/student8.jpg", quote: "The perfect blend of music and dance, finding my true calling." },
    { name: "Swayamdeep Sonawane", info: "Piano (Batch-2023)", photo: "images/student9.jpg", quote: "Gave me the opportunity to learn and grow as a musician and as a person" },
    { name: "Gayatri", info: "Classical-Dance (Batch-2023)", photo: "images/student10.jpg", quote: "Performing in MGM Rhythm was transformative for my dance skills." }
];

function initAlumniGallery() {
    const track = document.getElementById('gallery3DTrack');
    if (!track) return;
    track.innerHTML = alumniData.map((person, i) => `
        <div class="alumni-card" id="alumni-${i}">
            <div class="alumni-card-inner">
                <div class="alumni-card-front"><img src="${person.photo}" alt="${person.name}"></div>
                <div class="alumni-card-back">
                    <div class="back-content">
                        <i class="fas fa-quote-left"></i>
                        <p>${person.quote}</p>
                        <span>- ${person.name}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    updateAlumniGallery();
}

function updateAlumniGallery() {
    const total = alumniData.length;
    const caption = document.getElementById('gallery3DCaption');
    alumniData.forEach((_, i) => {
        const card = document.getElementById(`alumni-${i}`);
        if (!card) return;
        card.classList.remove('g-card-active', 'g-card-prev', 'g-card-next');
        const prev = (gIndex - 1 + total) % total;
        const next = (gIndex + 1) % total;
        if (i === gIndex) {
            card.classList.add('g-card-active');
            caption.innerHTML = `<strong>${alumniData[i].name}</strong> | ${alumniData[i].info}`;
        } else if (i === prev) card.classList.add('g-card-prev');
        else if (i === next) card.classList.add('g-card-next');
    });
}

function moveGallery(step) {
    gIndex = (gIndex + step + alumniData.length) % alumniData.length;
    updateAlumniGallery();
}

/* === 9. UNIFIED EVENT LISTENERS & INITIALIZATION === */
document.addEventListener('DOMContentLoaded', () => {
    initAlumniGallery();
    revealSections();

    // Album Navigation
    const backBtn = document.getElementById('backToAlbums');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            document.getElementById('photoView').classList.replace('photo-view-active', 'photo-view-hidden');
            document.getElementById('albumContainer').style.display = 'grid';
        });
    }

    document.querySelectorAll('.album-card').forEach(card => {
        card.addEventListener('click', () => openAlbum(card.getAttribute('data-album')));
    });

    // Form Submit
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'admissionForm') {
            e.preventDefault(); 
            showSuccessModal();
            e.target.reset(); 
        }
    });

    // Global Clicks
    window.addEventListener('click', (e) => {
        const dropdown = document.getElementById("moreDropdown");
        if (dropdown?.classList.contains('show') && !e.target.matches('.dropbtn')) {
            dropdown.classList.remove('show');
        }
        if (e.target.id === 'contactModal') closeContactModal();
    });

    window.addEventListener('scroll', revealSections);
});

document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeEverything();
    });
});

window.onload = () => {

setTimeout(()=>{

const intro = document.getElementById("intro-animation");

if(intro){
    intro.remove();
}

},5000);

}