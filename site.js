(function(){
  // Mobile menu
  var btn=document.querySelector('header button[aria-label="Open menu"]');
  var desk=document.querySelector('header nav[aria-label="Main"]');
  if(btn&&desk){
    var m=document.createElement('nav');m.setAttribute('aria-label','Mobile');m.hidden=true;
    m.className='lg:hidden border-t bg-background px-5 py-3 flex flex-col';
    desk.querySelectorAll('a').forEach(function(a){m.appendChild(a.cloneNode(true));});
    btn.closest('header').appendChild(m);
    var openSvg=btn.innerHTML, closeSvg='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    btn.addEventListener('click',function(){var o=m.hidden;m.hidden=!o;btn.innerHTML=o?closeSvg:openSvg;btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',o?'Close menu':'Open menu');});
  }
  // Category buttons on Get Involved
  document.querySelectorAll('button[data-pick]').forEach(function(b){b.addEventListener('click',function(){
    var s=document.querySelector('select[name=category]');if(s)s.value=b.getAttribute('data-pick');
    var t=document.getElementById('inquiry-form');if(t)t.scrollIntoView({behavior:'smooth',block:'start'});});});
  // Inquiry form -> Formspree
  var form=document.querySelector('form');if(!form)return;
  var ENDPOINT='https://formspree.io/f/xvkzjqrr';
  var submit=form.querySelector('button[type=submit]'),label=submit.textContent;
  function clear(){form.querySelectorAll('.js-err').forEach(function(e){e.remove();});form.querySelectorAll('[aria-invalid=true]').forEach(function(e){e.setAttribute('aria-invalid','false');});}
  function err(el,msg){el.setAttribute('aria-invalid','true');var p=document.createElement('p');p.className='js-err mt-1 text-xs text-destructive';p.textContent=msg;el.parentNode.appendChild(p);}
  form.addEventListener('submit',function(e){
    e.preventDefault();clear();var bad=false;
    form.querySelectorAll('input,textarea,select').forEach(function(el){
      var v=(el.value||'').trim();var lab=form.querySelector('label[for="'+el.id+'"]');
      var req=lab&&lab.querySelector('.text-destructive');var name=lab?lab.childNodes[0].textContent.trim():el.name;
      if(req&&!v){err(el,name+' is required.');bad=true;}
      else if(el.type==='email'&&v&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){err(el,'Please enter a valid email address.');bad=true;}
      else if(v.length>2000){err(el,'Too long.');bad=true;}
    });
    if(bad)return;
    var data={};new FormData(form).forEach(function(v,k){data[k]=v;});
    submit.disabled=true;submit.textContent='Sending…';
    fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
    .then(function(r){if(!r.ok)throw 0;
      var box=document.createElement('div');box.setAttribute('role','status');box.className='flex items-start gap-3 rounded-lg border border-sage bg-accent p-5';
      box.innerHTML='<svg class="mt-0.5 h-5 w-5 text-olive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg><div><p class="font-medium">Thank you — your message has been sent.</p><p class="text-sm text-muted-foreground">We will get back to you soon.</p><button class="mt-1 text-sm text-primary underline">Back to the form</button></div>';
      form.reset();form.hidden=true;form.parentNode.insertBefore(box,form);
      box.querySelector('button').onclick=function(){box.remove();form.hidden=false;};
    }).catch(function(){var p=document.createElement('p');p.setAttribute('role','alert');p.className='js-err sm:col-span-2 text-sm text-destructive';p.textContent='Something went wrong. Please try again.';submit.parentNode.parentNode.insertBefore(p,submit.parentNode);})
    .finally(function(){submit.disabled=false;submit.textContent=label;});
  });
})();
