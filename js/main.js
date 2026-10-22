const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contact-form');
if (form) {
  const extra = form.querySelector('.new-patient-fields');
  const phone = form.querySelector('#phone');
  const setType = (isNew) => {
    form.querySelector(`[name="form_type"][value="${isNew ? 'New patient request' : 'General question'}"]`).checked = true;
    extra.hidden = !isNew;
    extra.querySelectorAll('input, select').forEach((el) => { el.disabled = !isNew; });
    phone.required = isNew;
    form.querySelector('.phone-label').textContent = isNew ? 'Phone' : 'Phone (optional)';
    form.querySelector('.message-label').textContent = isNew ? 'What brings you in?' : 'How can we help?';
    form.querySelector('[name="_subject"]').value = isNew ? 'New patient request' : 'Website message';
    form.querySelector('button[type="submit"]').textContent = isNew ? 'Request my first visit' : 'Send message';
  };
  form.querySelectorAll('[name="form_type"]').forEach((radio) => {
    radio.addEventListener('change', () => setType(radio.value === 'New patient request'));
  });
  const fromHash = () => { if (location.hash === '#new-patient') setType(true); };
  window.addEventListener('hashchange', fromHash);
  fromHash();
}
