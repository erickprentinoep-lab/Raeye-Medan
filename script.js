// REVEAL ON SCROLL & STAGGERED PHOTOS
function revealElements(){
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  reveals.forEach((el,i)=>{
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 100){
      setTimeout(()=> el.classList.add('visible'), i*150);
    }
  });
}
window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// MODAL HANDLER
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeModalBtn = document.getElementById('closeModal');
if(modal && closeModalBtn){
  closeModalBtn.addEventListener('click', ()=> modal.classList.remove('active'));
  document.querySelectorAll('#photos img').forEach(img => {
    img.addEventListener('click', ()=>{
      modalContent.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="border-radius:1rem;max-height:80vh;object-fit:contain;">`;
      modal.classList.add('active');
    });
  });
  modal.addEventListener('click', e=>{if(e.target===modal) modal.classList.remove('active');});
}

// PARALLAX HERO
window.addEventListener('scroll', ()=>{
  const heroBg = document.querySelector('.hero-bg');
  heroBg.style.transform = `translateY(${window.scrollY*0.3}px)`;
});

// FORMSPREE INTEGRATION
const form = document.getElementById('bookForm');
const msg = document.getElementById('formMsg');
if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    msg.textContent = 'Mengirim...';
    msg.style.color='#888';
    const formData = new FormData(form);
    try{
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID_HERE', {
        method:'POST',
        body: formData,
        headers:{'Accept':'application/json'}
      });
      if(response.ok){
        msg.textContent='Reservasi berhasil dikirim ✅ Kami akan segera menghubungi Anda.';
        msg.style.color='green';
        form.reset();
      }else{
        msg.textContent='Gagal mengirim, coba lagi.';
        msg.style.color='red';
      }
    }catch(err){
      msg.textContent='Terjadi kesalahan koneksi.';
      msg.style.color='red';
    }
  });
}
