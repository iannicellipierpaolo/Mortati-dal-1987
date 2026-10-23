(function () {
  /* --- 1. Rotazione Video Background Hero (Loop + Crossfade) --- */
  const heroVideos = [...document.querySelectorAll('.hero-video')];
  if (heroVideos.length) {
    let currentIdx = 0;

    function playVideoAt(index) {
      heroVideos.forEach((v, i) => {
        v.classList.toggle('is-active', i === index);
      });

      const currentVideo = heroVideos[index];
      currentVideo.currentTime = 0;
      const playPromise = currentVideo.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }

      const nextVideo = heroVideos[(index + 1) % heroVideos.length];
      nextVideo.preload = 'auto';
    }

    heroVideos.forEach((v, i) => {
      v.addEventListener('ended', () => {
        currentIdx = (i + 1) % heroVideos.length;
        playVideoAt(currentIdx);
      });
    });

    playVideoAt(0);
  }

  /* --- 2. Riquadro attivo nello slider in base allo scroll --- */
  const items = [...document.querySelectorAll('.slider-item')];
  const sections = items
    .map(li => document.getElementById(li.dataset.target))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        items.forEach(li =>
          li.classList.toggle('is-active', li.dataset.target === entry.target.id)
        );
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(s => io.observe(s));
  }

  /* --- 3. Form di prenotazione dimostrativo --- */
  const form = document.getElementById('prenota');
  const msg = document.getElementById('form-msg');
  if (form) {
    const dateInput = form.querySelector('[name=data]');
    if (dateInput) {
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        msg.className = 'form-msg is-error';
        msg.textContent = 'Compila tutti i campi obbligatori.';
        return;
      }
      msg.className = 'form-msg';
      msg.textContent = 'Richiesta dimostrativa ricevuta (nessun dato inviato).';
      form.reset();
    });
  }
})();

  /* --- 4. Modale "Scopri la proposta" --- */
  const btnOpenProposal = document.getElementById('btn-open-proposal');
  const btnCloseProposal = document.getElementById('btn-close-proposal');
  const modalProposal = document.getElementById('demo-modal');
  const btnModalContact = document.getElementById('btn-modal-contact');

  if (btnOpenProposal && modalProposal) {
    function openModal() {
      modalProposal.classList.add('is-open');
      modalProposal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalProposal.classList.remove('is-open');
      modalProposal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    btnOpenProposal.addEventListener('click', openModal);
    
    if (btnCloseProposal) {
      btnCloseProposal.addEventListener('click', closeModal);
    }

    modalProposal.addEventListener('click', (e) => {
      if (e.target === modalProposal) closeModal();
    });

    if (btnModalContact) {
      btnModalContact.addEventListener('click', closeModal);
    }
  }
    /* --- 5. Modale "Fonti, immagini e note sulla demo" --- */
  const btnOpenNotes = document.getElementById('btn-open-notes');
  const btnCloseNotes = document.getElementById('btn-close-notes');
  const modalNotes = document.getElementById('notes-modal');

  if (btnOpenNotes && modalNotes) {
    function openNotesModal() {
      modalNotes.classList.add('is-open');
      modalNotes.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeNotesModal() {
      modalNotes.classList.remove('is-open');
      modalNotes.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    btnOpenNotes.addEventListener('click', openNotesModal);

    if (btnCloseNotes) {
      btnCloseNotes.addEventListener('click', closeNotesModal);
    }

    modalNotes.addEventListener('click', (e) => {
      if (e.target === modalNotes) closeNotesModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalNotes.classList.contains('is-open')) {
        closeNotesModal();
      }
    });
  }