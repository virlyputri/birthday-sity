const pages = [...document.querySelectorAll(".page")];
const dots = document.getElementById("navDots");
const progress = document.getElementById("progressBar");
let current = 0;
let locked = false;

/* =====================================================
   NAVIGATION DOTS
===================================================== */
pages.forEach((_, i) => {
  const b = document.createElement("button");
  b.title = `Page ${i + 1}`;
  b.addEventListener("click", (e) => {
    e.stopPropagation();
    goTo(i);
  });
  dots.appendChild(b);
});

/* =====================================================
   UPDATE UI
===================================================== */
function updateUI() {
  dots.querySelectorAll("button").forEach((b, i) => {
    b.classList.toggle("active", i === current);
  });
  progress.style.width = `${(current / (pages.length - 1)) * 100}%`;
}

/* =====================================================
   RESET ENVELOPE
   Supaya amplop muncul lagi ketika kembali ke halaman 1
===================================================== */
function resetEnvelope() {
  const envelope = document.getElementById("openMail");
  if (!envelope) return;
  // Hapus efek popup
  envelope.classList.remove("popup");
  // Pastikan envelope kembali terlihat
  envelope.style.opacity = "1";
  envelope.style.transform = "";
  // Reset animation supaya bisa dimainkan lagi nanti
  envelope.style.animation = "none";
  // Paksa browser membaca ulang perubahan
  void envelope.offsetWidth;
  // Kembalikan animation ke CSS normal
  envelope.style.animation = "";
}

/* =====================================================
   GO TO PAGE
===================================================== */
function goTo(next) {
  if (locked || next === current || next < 0 || next >= pages.length) {
    return;
  }
  locked = true;
  const old = pages[current];
  const target = pages[next];
  old.classList.remove("active");
  old.classList.add("exit");
  target.classList.remove("exit");
  target.classList.add("active");
  current = next;
  updateUI();

  /* ---------------------------------------------
     Kalau kembali ke halaman pertama,
     reset amplop
  --------------------------------------------- */
  if (current === 0) {
    resetEnvelope();
  }

  /* ---------------------------------------------
     Start video ketika masuk halaman video
  --------------------------------------------- */
  const video = document.getElementById("birthdayVideo");
  if (video) {
    // Kalau meninggalkan halaman video
    if (!target.classList.contains("page-video")) {
      video.pause();
      video.currentTime = 0;
    }
    // Kalau masuk halaman video
    if (target.classList.contains("page-video")) {
      video.currentTime = 0;
      video.muted = false;
      video.play().catch(() => {
        // Jika browser memblokir autoplay bersuara,
        // coba mulai sebagai muted.
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }

  /* ---------------------------------------------
     Selesai animasi halaman
  --------------------------------------------- */
  setTimeout(() => {
    old.classList.remove("exit");
    locked = false;
  }, 900);
}

/* =====================================================
   BUTTON DATA-NEXT
===================================================== */
document.querySelectorAll("[data-next]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    goTo(current + 1);
  });
});

/* =====================================================
   ENVELOPE
   Klik amplop -> popup -> halaman berikutnya
===================================================== */
document.getElementById("openMail").addEventListener("click", (e) => {
  e.stopPropagation();
  const envelope = document.getElementById("openMail");
  // Efek popup
  envelope.classList.add("popup");
  // Pindah ke halaman berikutnya
  setTimeout(() => {
    goTo(1);
  }, 450);
});

/* =====================================================
   CLICK ANYWHERE TO CONTINUE
===================================================== */
pages.forEach((page) => {
  page.addEventListener("click", (e) => {
    // Jangan pindah halaman ketika klik elemen interaktif
    if (
      e.target.closest(".interactive, .photo-slide, .wall-photo, .nav-dots")
    ) {
      return;
    }
    // Kalau sedang berada di halaman tersebut
    if (current === pages.indexOf(page)) {
      goTo(current + 1);
    }
  });
});

/* =====================================================
   PAGE 3
   Klik foto -> foto 1 <-> foto 2 , foto 3, foto 1
===================================================== */
const slider = document.getElementById("memorySlider");
const slides = [...document.querySelectorAll(".photo-slide")];
const slideDots = [...document.querySelectorAll(".slide-dot")];
let slideIndex = 0;
if (slider) {
  slider.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!e.target.closest(".photo-slide")) {
      return;
    }
    slideIndex = (slideIndex + 1) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active-slide", i === slideIndex);
    });

    slideDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === slideIndex);
    });
  });
}

/* =====================================================
   FINAL RESTART
===================================================== */
const restartButton = document.getElementById("restart");
if (restartButton) {
  restartButton.addEventListener("click", (e) => {
    e.stopPropagation();
    // Hapus halaman aktif sekarang
    pages[current].classList.remove("active");
    // Hapus semua exit animation
    pages.forEach((p) => {
      p.classList.remove("exit");
    });
    // Kembali ke halaman pertama
    current = 0;
    pages[0].classList.add("active");
    // Update dots dan progress
    updateUI();
    // Reset amplop
    resetEnvelope();
    // Reset video
    const video = document.getElementById("birthdayVideo");
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
  });
}

/* =====================================================
   KEYBOARD
===================================================== */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " ") {
    e.preventDefault();
    goTo(current + 1);
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    goTo(current - 1);
  }
});

/* =====================================================
   SWIPE ON PHONE
===================================================== */
let startX = 0;
document.addEventListener(
  "touchstart",
  (e) => {
    startX = e.changedTouches[0].clientX;
  },
  { passive: true },
);
document.addEventListener(
  "touchend",
  (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 55) {
      goTo(current + (dx < 0 ? 1 : -1));
    }
  },
  { passive: true },
);

/* =====================================================
   INITIAL UI
===================================================== */
updateUI();
// Pastikan amplop dalam kondisi normal saat website pertama dibuka
resetEnvelope();
