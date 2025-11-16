document.addEventListener('DOMContentLoaded', function(){
  const popup = document.getElementById('popup');
  const panel = document.getElementById('panel');
  const titleEl = document.getElementById('panelTitle');
  const bodyEl = document.getElementById('panelBody');
  const closeBtn = document.getElementById('closeBtn');

  document.querySelectorAll('[data-popup]').forEach(node => {
    node.addEventListener('click', function(e){
      e.preventDefault();
      const raw = node.getAttribute('data-popup');
      let meta;
      try { meta = JSON.parse(raw); } catch(e){ console.warn('Invalid popup json', raw); return; }

      if(meta.type === 'external' && meta.url){
        window.open(meta.url, '_blank', 'noopener');
        return;
      }

      titleEl.textContent = meta.title || '';
      bodyEl.innerHTML = meta.content || '';

      const step = node.closest('.step');
      const idx = parseInt(step?.getAttribute('data-index') || '1', 10);
      const leftSide = idx >= 4;

      popup.setAttribute('aria-hidden', 'false');
      panel.classList.remove('left');

      if(window.innerWidth > 900){
        if(leftSide){
          popup.style.justifyContent = 'flex-start';
          panel.classList.add('left');
        } else {
          popup.style.justifyContent = 'flex-end';
          panel.classList.remove('left');
        }
      } else {
        popup.style.justifyContent = 'center';
        panel.classList.remove('left');
      }
      closeBtn.focus();
    });
  });

  function closePanel(){
    popup.setAttribute('aria-hidden', 'true');
    titleEl.textContent = '';
    bodyEl.innerHTML = '';
  }
  closeBtn.addEventListener('click', closePanel);
  popup.addEventListener('click', function(e){
    if(e.target === popup) closePanel();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && popup.getAttribute('aria-hidden') === 'false') closePanel();
  });
});
