const toggle = document.querySelector('[data-menu-toggle]');
const mobile = document.querySelector('nav[aria-label="Mobile"]');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (mobile) mobile.hidden = !open;
});
document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
  const select = document.getElementById('f-category');
  if (select) select.value = button.dataset.category;
  document.getElementById('inquiry-form')?.scrollIntoView({behavior: 'smooth', block: 'start'});
  select?.focus({preventScroll: true});
}));
const form = document.querySelector('form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelectorAll('[data-validation-error]').forEach(error => error.remove());
  const fields = [...form.querySelectorAll('input,select,textarea')];
  let invalid = false;
  fields.forEach(field => {
    const value = field.value.trim();
    let message = '';
    if (field.dataset.required && !value) message = `${field.dataset.label} is required.`;
    else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = 'Please enter a valid email address.';
    else if (value.length > 2000) message = 'Too long.';
    field.setAttribute('aria-invalid', String(Boolean(message)));
    field.removeAttribute('aria-describedby');
    if (message) {
      invalid = true;
      const error = document.createElement('p');
      error.className = 'mt-1 text-xs text-destructive';
      error.id = `${field.id}-err`;
      error.dataset.validationError = '';
      error.textContent = message;
      field.setAttribute('aria-describedby', error.id);
      field.after(error);
    }
  });
  if (invalid) { fields.find(f => f.getAttribute('aria-invalid') === 'true')?.focus(); return; }
  const values = Object.fromEntries(new FormData(form));
  const subject = `AMWELL inquiry${values.category ? ` — ${values.category}` : ''}${values.subject ? ` — ${values.subject}` : ''}`;
  const body = fields.map(f => `${f.dataset.label}: ${f.value.trim()}`).join('\n');
  const email = 'mahmad26@cougarnet.uh.edu';
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  form.hidden = true;
  const status = document.createElement('div');
  status.setAttribute('role','status');
  status.className = 'rounded-lg border border-sage bg-accent p-5';
  const message = document.createElement('p');
  message.className = 'font-medium';
  message.textContent = 'Your email app has opened with your message. Please press Send there to deliver it.';
  const fallback = document.createElement('p');
  fallback.className = 'text-sm text-muted-foreground';
  fallback.append('If nothing opened, email us directly at ');
  const link = document.createElement('a');
  link.href = `mailto:${email}`; link.textContent = email; link.className = 'text-primary underline'; fallback.append(link,'.');
  const back = document.createElement('button');
  back.type = 'button'; back.textContent = 'Back to the form'; back.className = 'mt-1 text-sm text-primary underline';
  back.addEventListener('click',()=>{status.remove();form.hidden=false;});
  status.append(message,fallback,back);form.after(status);
});
