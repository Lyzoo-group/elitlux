/* Elitlux theme scripts — behaviour ported from the approved prototype */
(() => {
  const cfg = window.Elitlux || {};
  const root = cfg.root || '/';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = () => window.matchMedia('(hover: hover)').matches;
  const smooth = () => (reduced() ? 'auto' : 'smooth');
  const live = (msg) => { const el = $('[data-live]'); if (!el) return; el.textContent = ''; setTimeout(() => { el.textContent = msg; }, 60); };
  const money = (cents) => {
    const n = Number(cents) / 100;
    const two = n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const fmt = cfg.money || '£{{amount}}';
    return fmt.replace(/\{\{\s*(\w+)\s*\}\}/, (m, k) => (k === 'amount_no_decimals' ? Math.round(n).toString() : k === 'amount_with_comma_separator' ? n.toFixed(2).replace('.', ',') : two));
  };
  const scrollToEl = (el, off) => { if (!el) return; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off, behavior: smooth() }); };
  document.addEventListener('error', (e) => { const t = e.target; if (t && t.tagName === 'IMG') t.style.visibility = 'hidden'; }, true);

  /* ---------- Dialogs: mobile menu, bag, quick add ---------- */
  const header = $('[data-header]');
  let lastFocus = null;
  const focusables = (el) => $$('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])', el).filter((n) => n.offsetParent !== null);
  const openDialog = (id) => {
    const d = document.getElementById(id);
    if (!d) return;
    closeMega();
    $$('.dialog').forEach((o) => { if (o !== d && !o.hidden) o.hidden = true; });
    if (d.hidden) lastFocus = document.activeElement;
    d.hidden = false;
    document.documentElement.classList.add('is-locked');
    if (id === 'mobile-nav' && header) header.classList.add('is-nav');
    $$('[aria-controls="' + id + '"]').forEach((b) => b.setAttribute('aria-expanded', 'true'));
    setTimeout(() => { const f = $('[data-autofocus]', d) || focusables(d)[0]; if (f) f.focus(); }, 30);
  };
  const closeDialog = (d) => {
    if (!d || d.hidden) return;
    d.hidden = true;
    if (d.id === 'mobile-nav' && header) header.classList.remove('is-nav');
    $$('[aria-controls="' + d.id + '"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    if (!$$('.dialog').some((o) => !o.hidden)) document.documentElement.classList.remove('is-locked');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  };
  const openDialogEl = () => $$('.dialog').find((d) => !d.hidden);
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open]');
    if (opener) { e.preventDefault(); hideToast(); openDialog(opener.getAttribute('data-open')); return; }
    const closer = e.target.closest('[data-close]');
    if (closer) { if (closer.tagName !== 'A') e.preventDefault(); closeDialog(closer.closest('.dialog')); }
  });
  document.addEventListener('keydown', (e) => {
    const d = openDialogEl();
    if (e.key === 'Escape') { if (d) closeDialog(d); closeMega(); return; }
    if (e.key === 'Tab' && d) {
      const f = focusables(d); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Header: transparent over a photo hero until scrolled ---------- */
  const hero = $('#MainContent > .shopify-section:first-child > [data-photo-hero]');
  const onScroll = () => {
    const sc = window.scrollY > (hero ? hero.offsetHeight - 140 : 40);
    document.body.classList.toggle('is-scrolled', sc);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mega menu ---------- */
  function closeMega() {
    $$('[data-mega]').forEach((b) => { b.setAttribute('aria-expanded', 'false'); const p = document.getElementById(b.getAttribute('aria-controls')); if (p) p.hidden = true; });
    if (header) header.classList.remove('is-mega');
  }
  $$('[data-mega]').forEach((b) => {
    const panel = document.getElementById(b.getAttribute('aria-controls'));
    if (!panel) return;
    const open = () => { if (b.getAttribute('aria-expanded') === 'true') return; b.setAttribute('aria-expanded', 'true'); panel.hidden = false; if (header) header.classList.add('is-mega'); };
    b.addEventListener('click', () => (b.getAttribute('aria-expanded') === 'true' ? closeMega() : open()));
    b.addEventListener('mouseenter', open);
    $$('a', panel).forEach((a) => a.addEventListener('click', closeMega));
  });
  if (header) header.addEventListener('mouseleave', closeMega);
  $$('[data-mega-close]').forEach((el) => el.addEventListener('mouseenter', closeMega));
  document.addEventListener('click', (e) => { if (!e.target.closest('[data-mega], .mega')) closeMega(); });
  document.addEventListener('focusin', (e) => { if (header && !header.contains(e.target)) closeMega(); });

  /* ---------- Scroll links: offer, reviews, grid, guide ---------- */
  const goOffer = () => {
    const el = $('[data-offer]');
    if (el) scrollToEl(el, 72);
    else window.location.href = root + '#offer';
  };
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-go-offer]')) { e.preventDefault(); goOffer(); return; }
    const t = e.target.closest('[data-scroll-to]');
    if (t) { const id = t.getAttribute('data-scroll-to'); const el = document.getElementById(id); if (el) { e.preventDefault(); scrollToEl(el, id === 'reviews' ? 80 : 88); } }
  });
  if (window.location.hash === '#offer' || /customer_posted=true/.test(window.location.search)) setTimeout(() => { const el = $('[data-offer]'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72 }); }, 250);

  /* ---------- Reveal on scroll ---------- */
  if ('IntersectionObserver' in window && !reduced()) {
    const show = (el) => { el.style.opacity = '1'; el.style.transform = 'none'; };
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } }), { rootMargin: '0px 0px -6% 0px' });
    $$('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      el.style.opacity = '0'; el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)';
      io.observe(el);
    });
  }

  /* ---------- Shop by range: hover opens on desktop; first tap opens, second tap goes on touch ---------- */
  $$('[data-ranges]').forEach((list) => {
    const items = $$('[data-range]', list);
    const set = (it) => items.forEach((x) => x.classList.toggle('is-on', x === it));
    items.forEach((it) => {
      const a = $('a', it);
      it.addEventListener('mouseenter', () => { if (canHover()) set(it); });
      if (a) {
        a.addEventListener('focus', () => set(it));
        a.addEventListener('click', (e) => { if (!it.classList.contains('is-on')) { e.preventDefault(); set(it); } });
      }
    });
  });

  /* ---------- Product story accordion: auto-advance every 6s while in view ---------- */
  $$('[data-topper-story]').forEach((wrap) => {
    const sec = wrap.closest('.tp');
    const steps = $$('.tp__step', wrap), imgs = $$('.tp__img', wrap);
    if (!sec || !steps.length) return;
    let cur = 0, mode = reduced() ? 'off' : 'idle', timer = 0;
    const setMode = (m) => { mode = m; sec.setAttribute('data-mode', m); };
    const show = (i) => {
      cur = i;
      steps.forEach((s, k) => {
        const on = k === i;
        s.classList.remove('is-on');
        const btn = $('.tp__btn', s), panel = $('.tp__panel', s);
        if (btn) btn.setAttribute('aria-expanded', on ? 'true' : 'false');
        if (panel) { if (on) panel.removeAttribute('aria-hidden'); else panel.setAttribute('aria-hidden', 'true'); }
      });
      void sec.offsetWidth;
      steps[i].classList.add('is-on');
      imgs.forEach((im, k) => { im.classList.toggle('is-on', k === i); im.setAttribute('alt', k === i ? (steps[k] && steps[k].getAttribute('data-alt')) || '' : ''); });
    };
    const next = () => { clearTimeout(timer); timer = setTimeout(() => { if (mode !== 'run') return; show((cur + 1) % steps.length); next(); }, 6000); };
    setMode(mode);
    steps.forEach((s, i) => { const b = $('.tp__btn', s); if (b) b.addEventListener('click', () => { clearTimeout(timer); setMode('off'); show(i); }); });
    let raf = 0;
    const check = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (mode === 'off') return;
        const r = wrap.getBoundingClientRect(), mid = window.innerHeight / 2;
        const vis = r.top < mid && r.bottom > mid;
        if (vis && mode === 'idle') { setMode('run'); show(cur); next(); }
        else if (!vis && mode === 'run') { clearTimeout(timer); setMode('idle'); }
      });
    };
    window.addEventListener('scroll', check, { passive: true });
    setTimeout(check, 400);
  });

  /* ---------- Best sellers tabs ---------- */
  $$('[data-tabs]').forEach((sec) => {
    const tabs = $$('[role="tab"]', sec);
    const list = $('[data-tablist]', sec);
    const vertical = () => window.matchMedia('(min-width: 1000px)').matches;
    const orient = () => { if (list) list.setAttribute('aria-orientation', vertical() ? 'vertical' : 'horizontal'); };
    orient(); window.addEventListener('resize', orient);
    const select = (i, focus) => {
      tabs.forEach((t, k) => {
        const on = k === i, pid = t.getAttribute('aria-controls');
        t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
        const p = document.getElementById(pid); if (p) p.hidden = !on;
        $$('[data-tab-for="' + pid + '"]', sec).forEach((a) => { a.hidden = !on; });
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        const L = tabs.length, k = e.key, v = vertical();
        const n = k === 'ArrowRight' || (v && k === 'ArrowDown') ? (i + 1) % L : k === 'ArrowLeft' || (v && k === 'ArrowUp') ? (i + L - 1) % L : k === 'Home' ? 0 : k === 'End' ? L - 1 : -1;
        if (n < 0) return; e.preventDefault(); select(n, true);
      });
    });
  });

  /* ---------- Bag ---------- */
  const SECTION = 'cart-drawer';
  const updateCount = (n) => {
    if (n == null) return;
    const c = Number(n);
    $$('[data-cart-count]').forEach((el) => { el.textContent = String(c); el.hidden = c === 0; });
    $$('[data-cart-link]').forEach((el) => el.setAttribute('aria-label', 'Bag, ' + c + (c === 1 ? ' item' : ' items')));
  };
  const renderDrawer = (sections) => {
    const html = sections && sections[SECTION];
    if (!html) return null;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const fresh = $('[data-drawer-inner]', doc), current = $('[data-drawer-inner]');
    if (fresh && current) current.replaceWith(fresh);
    if (fresh) updateCount(fresh.getAttribute('data-count'));
    return fresh;
  };
  const post = async (path, body, isForm) => {
    const res = await fetch(root + path, { method: 'POST', headers: isForm ? { Accept: 'application/json' } : { 'Content-Type': 'application/json', Accept: 'application/json' }, body });
    let json = {}; try { json = await res.json(); } catch (err) { json = {}; }
    if (!res.ok) throw new Error(json.description || json.message || 'Something went wrong. Please try again.');
    return json;
  };
  let toastT = 0;
  function hideToast() { const t = $('[data-toast]'); if (t) t.hidden = true; clearTimeout(toastT); }
  const afterAdd = (json, msg) => {
    renderDrawer(json.sections);
    live(msg);
    if (cfg.openCartOnAdd === false) {
      const t = $('[data-toast]'), tx = $('[data-toast-text]');
      if (t && tx) { tx.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 4000); }
    } else openDialog('CartDrawer');
  };
  const addItems = async (items, msg) => {
    const json = await post('cart/add.js', JSON.stringify({ items, sections: SECTION, sections_url: window.location.pathname }));
    afterAdd(json, msg);
    return json;
  };
  document.addEventListener('click', async (e) => {
    const a = e.target.closest('[data-cart-change]');
    if (!a || !a.closest('#CartDrawer')) return;
    e.preventDefault();
    const inner = a.closest('[data-drawer-inner]'), line = a.getAttribute('data-line');
    if (inner) inner.classList.add('is-loading');
    try {
      const cart = await post('cart/change.js', JSON.stringify({ line: Number(line), quantity: Number(a.getAttribute('data-quantity')), sections: [SECTION], sections_url: window.location.pathname }));
      const fresh = renderDrawer(cart.sections);
      live('Bag updated');
      const nx = fresh && ($('[data-line-index="' + line + '"] [data-cart-change]', fresh) || $('[data-autofocus]', fresh));
      if (nx) nx.focus();
    } catch (ex) {
      if (inner) inner.classList.remove('is-loading');
      const m = $('[data-drawer-error]'); if (m) { m.textContent = ex.message; m.hidden = false; }
    }
  });
  /* Single-variant adds and size buttons on collection rows */
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-add-id]');
    if (!b) return;
    e.preventDefault();
    b.disabled = true;
    try { await addItems([{ id: Number(b.getAttribute('data-add-id')), quantity: 1 }], '1 item added to your bag'); }
    catch (ex) { live(ex.message); }
    finally { b.disabled = false; }
  });

  /* ---------- Quick add sheet ---------- */
  const qk = document.getElementById('QuickAdd');
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-quick]');
    if (!b || !qk) return;
    e.preventDefault();
    const handle = b.getAttribute('data-quick');
    try {
      const res = await fetch(root + 'products/' + handle + '.js');
      const p = await res.json();
      $('[data-qk-title]', qk).textContent = p.title;
      $('[data-qk-range]', qk).textContent = b.getAttribute('data-range') || '';
      $('[data-qk-opt]', qk).textContent = b.getAttribute('data-option') || 'size';
      const img = $('[data-qk-img]', qk);
      if (img && p.featured_image) { img.src = p.featured_image + (p.featured_image.indexOf('?') > -1 ? '&' : '?') + 'width=200'; img.style.visibility = ''; }
      $('[data-qk-link]', qk).setAttribute('href', root + 'products/' + handle);
      const ul = $('[data-qk-opts]', qk);
      ul.innerHTML = '';
      p.variants.forEach((v) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'qk__opt'; btn.disabled = !v.available;
        btn.innerHTML = '<span class="qk__opt-l"></span><span class="qk__opt-p"></span>';
        btn.firstChild.textContent = v.title; btn.lastChild.textContent = money(v.price);
        btn.addEventListener('click', async () => {
          btn.disabled = true;
          try { closeDialog(qk); await addItems([{ id: v.id, quantity: 1 }], p.title + ' added to your bag'); }
          catch (ex) { const er = $('[data-qk-error]', qk); if (er) { er.textContent = ex.message; er.hidden = false; } openDialog('QuickAdd'); }
          finally { btn.disabled = false; }
        });
        li.appendChild(btn); ul.appendChild(li);
      });
      const er = $('[data-qk-error]', qk); if (er) er.hidden = true;
      openDialog('QuickAdd');
    } catch (ex) { window.location.href = root + 'products/' + handle; }
  });

  /* ---------- Product page ---------- */
  $$('[data-product]').forEach((pdp) => {
    const form = $('.pdp__form', pdp);
    if (!form) return;
    const price = $('[data-price]', pdp), label = $('[data-selected-label]', pdp), need = $('[data-need-size]', pdp);
    const add = $('[data-add]', pdp), qtyIn = $('[data-qty-input]', form), err = $('[data-form-error]', form);
    const sticky = $('[data-sticky-atc]', pdp), stickyPrice = $('[data-sticky-price]', pdp);
    const radios = $$('input[type="radio"][name="id"]', form);
    const chosen = () => radios.find((r) => r.checked) || $('input[type="hidden"][name="id"]', form);
    const qty = () => Math.max(1, Math.min(20, parseInt(qtyIn && qtyIn.value, 10) || 1));
    const refresh = () => {
      const c = chosen();
      const base = add ? add.getAttribute('data-label') : 'Add to bed';
      if (c && c.getAttribute('data-price')) {
        const pr = Number(c.getAttribute('data-price'));
        if (price) price.textContent = money(pr);
        if (stickyPrice) stickyPrice.textContent = money(pr);
        if (add) add.textContent = base + ' · ' + money(pr * qty());
      } else {
        if (price) price.textContent = price.getAttribute('data-range');
        if (add) add.textContent = base;
      }
      if (label && c && c.getAttribute('data-label')) label.textContent = c.getAttribute('data-label');
    };
    radios.forEach((r) => r.addEventListener('change', () => {
      if (need) need.hidden = true;
      const u = new URL(window.location.href); u.searchParams.set('variant', r.value);
      window.history.replaceState(window.history.state, '', u.toString());
      refresh();
    }));
    const askSize = () => {
      if (need) need.hidden = false;
      const box = $('[data-options]', form);
      if (box) { window.scrollTo({ top: box.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' }); const f = radios.find((r) => !r.disabled); if (f) f.focus({ preventScroll: true }); }
    };
    form.addEventListener('invalid', (e) => { e.preventDefault(); askSize(); }, true);
    $$('[data-qty]', form).forEach((b) => b.addEventListener('click', () => { if (!qtyIn) return; qtyIn.value = String(Math.max(1, Math.min(20, qty() + Number(b.getAttribute('data-qty'))))); refresh(); }));
    if (qtyIn) qtyIn.addEventListener('input', refresh);
    const submitAdd = async (goCart) => {
      const c = chosen();
      if (!c || !c.value) { askSize(); return; }
      if (err) err.hidden = true;
      if (add) add.disabled = true;
      try {
        if (goCart) { await post('cart/add.js', JSON.stringify({ items: [{ id: Number(c.value), quantity: qty() }] })); window.location.href = cfg.cartUrl || root + 'cart'; return; }
        const title = ($('#pdp-title', pdp) || {}).textContent || 'Item';
        await addItems([{ id: Number(c.value), quantity: qty() }], title.trim() + ' added to your bag');
      } catch (ex) { if (err) { err.textContent = ex.message; err.hidden = false; } }
      finally { if (add) add.disabled = false; }
    };
    form.addEventListener('submit', (e) => { e.preventDefault(); submitAdd(false); });
    const now = $('[data-buy-now]', pdp); if (now) now.addEventListener('click', () => submitAdd(true));
    const sAdd = $('[data-sticky-add]', pdp); if (sAdd) sAdd.addEventListener('click', () => submitAdd(false));
    refresh();
    /* Gallery */
    const g = $('[data-gallery]', pdp);
    if (g) {
      const slides = $$('[data-slide]', g), thumbs = $$('[data-thumb]', g), count = $('[data-gallery-count]', g);
      let i = 0;
      const go = (n) => {
        const L = slides.length; if (!L) return; i = ((n % L) + L) % L;
        slides.forEach((s, k) => { s.hidden = k !== i; });
        thumbs.forEach((t, k) => t.setAttribute('aria-current', k === i ? 'true' : 'false'));
        if (count) count.textContent = (i + 1) + ' / ' + L;
      };
      const pv = $('[data-gallery-prev]', g), nx = $('[data-gallery-next]', g);
      if (pv) pv.addEventListener('click', () => go(i - 1));
      if (nx) nx.addEventListener('click', () => go(i + 1));
      thumbs.forEach((t) => t.addEventListener('click', () => go(Number(t.getAttribute('data-thumb')))));
    }
  });
  /* Accordions */
  $$('[data-acc]').forEach((b) => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    const p = document.getElementById(b.getAttribute('aria-controls')); if (p) p.hidden = !open;
  }));

  /* ---------- Build your bed ---------- */
  $$('[data-bundle]').forEach((sec) => {
    const rows = $$('[data-row]', sec), spots = $$('[data-spot]', sec), copy = $('[data-copy]', sec);
    const wording = sec.getAttribute('data-wording') === 'true';
    const C = (k) => (copy ? copy.getAttribute('data-' + k) || '' : '');
    const state = rows.map((r) => ({ on: true, prod: Number(r.getAttribute('data-default-tog')) || 0, size: -1 }));
    let act = -1;
    const prodEl = (i) => { const ps = $$('[data-prod]', rows[i]); return ps.length === 1 ? ps[0] : ps[state[i].prod] || ps[0]; };
    const sizeBtns = (i) => $$('[data-v]', prodEl(i));
    const selected = (i) => sizeBtns(i).find((b) => b.getAttribute('aria-pressed') === 'true') || sizeBtns(i)[0];
    rows.forEach((r, i) => { const btns = sizeBtns(i); const sel = selected(i); state[i].size = Math.max(0, btns.indexOf(sel)); });
    const render = () => {
      let full = 0, n = 0;
      rows.forEach((r, i) => {
        const st = state[i];
        $$('[data-prod]', r).forEach((p, k, all) => { p.hidden = all.length > 1 && k !== st.prod; });
        $$('[data-tog]', prodEl(i)).forEach((t) => t.setAttribute('aria-pressed', Number(t.getAttribute('data-tog')) === st.prod ? 'true' : 'false'));
        const btns = sizeBtns(i), k = Math.min(st.size, btns.length - 1);
        btns.forEach((b, j) => b.setAttribute('aria-pressed', j === k ? 'true' : 'false'));
        const b = btns[k], pr = b ? Number(b.getAttribute('data-price')) : 0;
        const pe = $('[data-row-price]', prodEl(i)); if (pe) pe.textContent = money(pr);
        const cb = $('[data-check]', r); if (cb) cb.checked = st.on;
        r.classList.toggle('is-on', st.on); r.classList.toggle('is-act', act === i);
        if (st.on) { full += pr; n += 1; }
        const sp = spots[i];
        if (sp) {
          const p = prodEl(i), link = $('[data-b-link]', sp), tp = $('[data-b-price]', sp), dot = $('[data-dot]', sp), tip = $('[data-tip]', sp);
          if (link && p) { link.textContent = p.getAttribute('data-title'); link.setAttribute('href', p.getAttribute('data-url')); }
          if (tp) tp.textContent = money(pr);
          if (dot && p) { const lay = (dot.getAttribute('aria-label') || '').split(':')[0]; dot.setAttribute('aria-label', lay + ': ' + p.getAttribute('data-title')); dot.setAttribute('aria-expanded', act === i ? 'true' : 'false'); }
          if (tip) tip.hidden = act !== i;
          sp.classList.toggle('is-act', act === i);
        }
      });
      const all = rows.length === 3 && n === 3;
      const off = all && wording ? Math.round(full * 0.1) : 0;
      const pay = $('[data-pay]', sec), fullEl = $('[data-full]', sec), note = $('[data-note]', sec), lab = $('[data-total-label]', sec), cta = $('[data-cta]', sec), btn = $('[data-bundle-add]', sec);
      if (pay) pay.textContent = money(full - off);
      if (fullEl) { fullEl.hidden = !(all && wording); fullEl.textContent = money(full); }
      if (lab) lab.textContent = all && wording ? C('bundle-label') : C('total');
      if (note) { note.hidden = !wording; note.textContent = all ? C('save') + ' ' + money(off) : C('hint'); }
      if (cta) cta.textContent = all ? C('cta-all') : n > 1 ? C('cta-some').replace('[n]', n) : n === 1 ? C('cta-one') : C('cta-none');
      if (btn) btn.disabled = n === 0;
    };
    rows.forEach((r, i) => {
      r.addEventListener('mouseenter', () => { if (canHover()) { act = i; render(); } });
      const cb = $('[data-check]', r); if (cb) cb.addEventListener('change', () => { state[i].on = cb.checked; render(); });
      r.addEventListener('click', (e) => {
        const t = e.target.closest('[data-tog]'); if (t) { state[i].prod = Number(t.getAttribute('data-tog')); render(); return; }
        const v = e.target.closest('[data-v]'); if (v) { state[i].size = sizeBtns(i).indexOf(v); render(); }
      });
    });
    spots.forEach((sp, i) => {
      const dot = $('[data-dot]', sp);
      if (!dot) return;
      dot.addEventListener('click', () => { act = act === i ? -1 : i; render(); });
      dot.addEventListener('mouseenter', () => { if (canHover()) { act = i; render(); } });
    });
    const btn = $('[data-bundle-add]', sec);
    if (btn) btn.addEventListener('click', async () => {
      const items = [];
      rows.forEach((r, i) => { if (!state[i].on) return; const b = sizeBtns(i)[Math.min(state[i].size, sizeBtns(i).length - 1)]; if (b) items.push({ id: Number(b.getAttribute('data-v')), quantity: 1 }); });
      if (!items.length) return;
      btn.disabled = true;
      const er = $('[data-bundle-error]', sec); if (er) er.hidden = true;
      try { await addItems(items, items.length + (items.length === 1 ? ' item' : ' items') + ' added to your bag'); }
      catch (ex) { if (er) { er.textContent = ex.message; er.hidden = false; } }
      finally { btn.disabled = false; }
    });
    render();
  });

  /* ---------- Collection sort ---------- */
  $$('[data-sort]').forEach((s) => s.addEventListener('change', () => { const u = new URL(window.location.href); u.searchParams.set('sort_by', s.value); u.searchParams.delete('page'); window.location.href = u.toString(); }));

  /* ---------- Offer sign-up ---------- */
  const emailOk = (x) => /^\S+@\S+\.\S+$/.test(String(x || '').trim());
  $$('.offer__form').forEach((f) => {
    f.noValidate = true;
    f.addEventListener('submit', (e) => {
      const inp = $('input[type="email"]', f), er = $('[data-offer-err]', f);
      if (!inp) return;
      if (!emailOk(inp.value)) { e.preventDefault(); if (er) er.hidden = false; inp.setAttribute('aria-invalid', 'true'); inp.focus(); return; }
      try { sessionStorage.setItem('elitlux-offer-email', inp.value.trim()); } catch (ex) {}
    });
    const inp = $('input[type="email"]', f);
    if (inp) inp.addEventListener('input', () => { const er = $('[data-offer-err]', f); if (er) er.hidden = true; inp.setAttribute('aria-invalid', 'false'); });
  });
  try { const em = sessionStorage.getItem('elitlux-offer-email'); if (em) $$('[data-offer-email]').forEach((s) => { s.textContent = em; }); } catch (ex) {}

  /* ---------- Contact form ---------- */
  const cf = document.getElementById('ContactForm');
  if (cf) {
    const fields = { name: $('[data-req="name"]', cf), email: $('[data-req="email"]', cf), message: $('[data-req="message"]', cf) };
    if (fields.name) {
      cf.noValidate = true;
      const setErr = (k, bad) => { const el = fields[k]; if (!el) return; el.setAttribute('aria-invalid', bad ? 'true' : 'false'); const m = document.getElementById(el.id + '-err'); if (m) m.hidden = !bad; };
      Object.keys(fields).forEach((k) => fields[k] && fields[k].addEventListener('input', () => setErr(k, false)));
      cf.addEventListener('submit', (e) => {
        const bad = [];
        if (!fields.name.value.trim()) bad.push('name');
        if (!emailOk(fields.email.value)) bad.push('email');
        if (fields.message.value.trim().length < 10) bad.push('message');
        Object.keys(fields).forEach((k) => setErr(k, bad.indexOf(k) > -1));
        if (bad.length) { e.preventDefault(); fields[bad[0]].focus(); return; }
        try { sessionStorage.setItem('elitlux-cf', JSON.stringify({ name: fields.name.value.trim(), email: fields.email.value.trim() })); } catch (ex) {}
        const b = $('button[type="submit"]', cf); if (b) { b.textContent = 'Sending…'; }
      });
    }
    try { const v = JSON.parse(sessionStorage.getItem('elitlux-cf') || 'null'); if (v) { $$('[data-cf-name]').forEach((s) => { s.textContent = v.name ? ', ' + v.name : ''; }); $$('[data-cf-email]').forEach((s) => { s.textContent = ' ' + v.email; }); } } catch (ex) {}
  }

  /* ---------- Search page: focus the field ---------- */
  const sq = $('[data-autofocus-search]'); if (sq && !sq.value) sq.focus({ preventScroll: true });
})();
