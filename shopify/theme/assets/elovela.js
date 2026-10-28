/* Elovela theme scripts: menus, bag drawer, product form, gallery */
(() => {
  const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
  const cfg = window.Elovela || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const live = (msg) => {
    const el = $('[data-live]');
    if (!el) return;
    el.textContent = '';
    setTimeout(() => { el.textContent = msg; }, 60);
  };

  /* Dialogs */
  let lastFocus = null;
  const focusables = (el) => $$('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])', el)
    .filter((n) => n.offsetParent !== null);
  const openDialog = (id) => {
    const d = document.getElementById(id);
    if (!d) return;
    closeMega();
    clearTimeout(d._hideTimer);
    if (d.hidden) lastFocus = document.activeElement;
    d.hidden = false;
    document.documentElement.classList.add('is-locked');
    void d.offsetWidth;
    d.classList.add('is-open');
    $$('[aria-controls="' + id + '"]').forEach((b) => b.setAttribute('aria-expanded', 'true'));
    setTimeout(() => {
      const f = $('[data-autofocus]', d) || focusables(d)[0];
      if (f) f.focus();
    }, 40);
  };
  const closeDialog = (d) => {
    if (!d || d.hidden) return;
    d.classList.remove('is-open');
    $$('[aria-controls="' + d.id + '"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    document.documentElement.classList.remove('is-locked');
    d._hideTimer = setTimeout(() => { d.hidden = true; }, reduced() ? 0 : 280);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  };
  const openDialogEl = () => $$('.dialog').find((d) => !d.hidden && d.classList.contains('is-open'));

  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open]');
    if (opener) {
      e.preventDefault();
      openDialog(opener.getAttribute('data-open'));
      return;
    }
    const closer = e.target.closest('[data-close]');
    if (closer) {
      const d = closer.closest('.dialog');
      if (closer.tagName !== 'A') e.preventDefault();
      closeDialog(d);
    }
  });

  document.addEventListener('keydown', (e) => {
    const d = openDialogEl();
    if (e.key === 'Escape') {
      if (d) closeDialog(d);
      closeMega();
      return;
    }
    if (e.key === 'Tab' && d) {
      const f = focusables(d);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* Header over photo */
  const hero = document.querySelector('.home-hero, .col-hero');
  if (hero) {
    document.body.classList.add('has-photo-top');
    const onScroll = () => document.body.classList.toggle('is-scrolled', window.scrollY > Math.max(40, hero.offsetHeight - 120));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Mega menu */
  const header = $('[data-header]');
  function closeMega() {
    $$('[data-mega]').forEach((b) => {
      b.setAttribute('aria-expanded', 'false');
      const p = document.getElementById(b.getAttribute('aria-controls'));
      if (p) p.hidden = true;
    });
  }
  $$('[data-mega]').forEach((b) => {
    const panel = document.getElementById(b.getAttribute('aria-controls'));
    if (!panel) return;
    const open = () => {
      if (b.getAttribute('aria-expanded') === 'true') return;
      closeMega();
      b.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
    };
    b.addEventListener('click', () => (b.getAttribute('aria-expanded') === 'true' ? closeMega() : open()));
    if (window.matchMedia('(hover: hover)').matches) b.addEventListener('mouseenter', open);
  });
  if (header) {
    header.addEventListener('mouseleave', closeMega);
    document.addEventListener('focusin', (e) => { if (!header.contains(e.target)) closeMega(); });
  }
  $$('[data-mega-close]').forEach((el) => el.addEventListener('mouseenter', closeMega));
  document.addEventListener('click', (e) => { if (!e.target.closest('[data-mega], .mega')) closeMega(); });

  /* Bag */
  const SECTION = 'cart-drawer';
  const updateCount = (n) => {
    if (n == null) return;
    const count = Number(n);
    $$('[data-cart-count]').forEach((el) => { el.textContent = String(count); el.hidden = count === 0; });
    $$('[data-cart-link]').forEach((el) => el.setAttribute('aria-label', 'Bag, ' + count + (count === 1 ? ' item' : ' items')));
  };
  const renderDrawer = (sections) => {
    const html = sections && sections[SECTION];
    if (!html) return null;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const fresh = $('[data-drawer-inner]', doc);
    const current = $('[data-drawer-inner]');
    if (fresh && current) current.replaceWith(fresh);
    if (fresh) updateCount(fresh.getAttribute('data-count'));
    return fresh;
  };
  const cartPost = async (path, body, isForm) => {
    const res = await fetch(root + path, {
      method: 'POST',
      headers: isForm ? { Accept: 'application/json' } : { 'Content-Type': 'application/json', Accept: 'application/json' },
      body,
    });
    let json = {};
    try { json = await res.json(); } catch (err) { json = {}; }
    if (!res.ok) throw new Error(json.description || json.message || 'Something went wrong. Please try again.');
    return json;
  };
  const drawerOn = () => cfg.cartType === 'drawer' && document.getElementById('CartDrawer');

  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-product-form]');
    if (!form || !drawerOn()) return;
    e.preventDefault();
    const fd = new FormData(form);
    if (!fd.get('id')) return;
    const btn = $('[data-add]', form);
    const err = $('[data-form-error]', form);
    fd.append('sections', SECTION);
    fd.append('sections_url', window.location.pathname);
    if (err) { err.hidden = true; err.textContent = ''; }
    if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
    try {
      const item = await cartPost('cart/add.js', fd, true);
      renderDrawer(item.sections);
      openDialog('CartDrawer');
      live((item.product_title || 'Item') + ' added to your bag');
    } catch (ex) {
      if (err) { err.textContent = ex.message; err.hidden = false; }
    } finally {
      if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); }
    }
  });

  document.addEventListener('click', async (e) => {
    const a = e.target.closest('[data-cart-change]');
    if (!a || !a.closest('#CartDrawer')) return;
    e.preventDefault();
    const inner = a.closest('[data-drawer-inner]');
    const line = a.getAttribute('data-line');
    if (inner) inner.classList.add('is-loading');
    try {
      const cart = await cartPost('cart/change.js', JSON.stringify({ line: Number(line), quantity: Number(a.getAttribute('data-quantity')), sections: [SECTION], sections_url: window.location.pathname }));
      const fresh = renderDrawer(cart.sections);
      live('Bag updated');
      const next = fresh && ($('[data-line-index="' + line + '"] [data-cart-change]', fresh) || $('[data-autofocus]', fresh));
      if (next) next.focus();
    } catch (ex) {
      if (inner) inner.classList.remove('is-loading');
      const msg = $('[data-drawer-error]');
      if (msg) { msg.textContent = ex.message; msg.hidden = false; }
    }
  });

  /* Gallery */
  const scrollToSlide = (g, i) => {
    const track = $('[data-gallery-track]', g);
    const n = track ? track.children.length : 0;
    if (!n) return;
    const idx = ((i % n) + n) % n;
    track.scrollTo({ left: idx * track.clientWidth, behavior: reduced() ? 'auto' : 'smooth' });
  };
  $$('[data-gallery]').forEach((g) => {
    const track = $('[data-gallery-track]', g);
    if (!track) return;
    const count = $('[data-gallery-count]', g);
    const thumbs = $$('[data-thumb]', g);
    const current = () => Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    let t;
    track.addEventListener('scroll', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const i = current();
        if (count) count.textContent = (i + 1) + ' / ' + track.children.length;
        thumbs.forEach((b, j) => b.setAttribute('aria-current', j === i ? 'true' : 'false'));
      }, 60);
    }, { passive: true });
    const prev = $('[data-gallery-prev]', g);
    const next = $('[data-gallery-next]', g);
    if (prev) prev.addEventListener('click', () => scrollToSlide(g, current() - 1));
    if (next) next.addEventListener('click', () => scrollToSlide(g, current() + 1));
    thumbs.forEach((b) => b.addEventListener('click', () => scrollToSlide(g, Number(b.getAttribute('data-thumb')))));
  });

  /* Product form */
  $$('[data-product]').forEach((pdp) => {
    const form = $('[data-product-form]', pdp);
    if (!form) return;
    const price = $('[data-price]', pdp);
    const compare = $('[data-compare]', pdp);
    const save = $('[data-save]', pdp);
    const add = $('[data-add]', pdp);
    const label = $('[data-selected-label]', pdp);
    const need = $('[data-need-size]', pdp);
    const buyNow = $('[data-buy-now]', pdp);
    const sticky = $('[data-sticky-atc]');
    const stickyPrice = sticky ? $('[data-sticky-price]', sticky) : null;
    const gallery = $('[data-gallery]', pdp);

    const choose = (o) => {
      const available = o.available === 'true';
      if (price) price.textContent = o.price;
      if (stickyPrice) stickyPrice.textContent = o.price;
      if (compare) {
        compare.hidden = !o.compare;
        const v = $('[data-compare-value]', compare);
        if (v) v.textContent = o.compare || '';
      }
      if (save) { save.hidden = !o.save; save.textContent = o.save || ''; }
      if (label) label.textContent = o.label;
      if (need) need.hidden = true;
      if (add) {
        add.disabled = !available;
        add.textContent = available ? add.getAttribute('data-label') : add.getAttribute('data-soldout');
      }
      if (buyNow) buyNow.classList.toggle('is-disabled', !available);
      if (o.id) {
        const u = new URL(window.location.href);
        u.searchParams.set('variant', o.id);
        window.history.replaceState(window.history.state, '', u.toString());
      }
      if (o.media && gallery) {
        const slides = $$('[data-media-id]', gallery);
        const i = slides.findIndex((s) => s.getAttribute('data-media-id') === String(o.media));
        if (i > -1) scrollToSlide(gallery, i);
      }
    };
    const fromEl = (el) => ({
      id: el.value,
      price: el.getAttribute('data-price'),
      compare: el.getAttribute('data-compare'),
      save: el.getAttribute('data-save'),
      available: el.getAttribute('data-available'),
      label: el.getAttribute('data-label'),
      media: el.getAttribute('data-media'),
    });
    $$('input[type="radio"][name="id"]', form).forEach((r) => r.addEventListener('change', () => choose(fromEl(r))));
    const sel = $('select[name="id"]', form);
    if (sel) sel.addEventListener('change', () => { const o = sel.options[sel.selectedIndex]; if (o && o.value) choose(fromEl(o)); });

    form.addEventListener('invalid', (e) => {
      e.preventDefault();
      if (need) need.hidden = false;
      const first = $('input[type="radio"][name="id"]:not(:disabled)', form) || sel;
      if (!first) return;
      const box = first.closest('fieldset') || first;
      const y = box.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: reduced() ? 'auto' : 'smooth' });
      first.focus({ preventScroll: true });
    }, true);

    $$('[data-qty]', form).forEach((b) => b.addEventListener('click', () => {
      const input = $('input[name="quantity"]', form);
      if (!input) return;
      const n = (parseInt(input.value, 10) || 1) + Number(b.getAttribute('data-qty'));
      input.value = String(Math.max(1, Math.min(99, n)));
    }));

    if (sticky && add && 'IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        const show = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        sticky.classList.toggle('is-visible', show);
        sticky.inert = !show;
      }).observe(add);
    }
  });

  /* Collection sort */
  $$('[data-sort]').forEach((s) => s.addEventListener('change', () => {
    const u = new URL(window.location.href);
    u.searchParams.set('sort_by', s.value);
    u.searchParams.delete('page');
    window.location.href = u.toString();
  }));

  /* Product recommendations */
  $$('[data-recommendations]').forEach(async (el) => {
    const url = el.getAttribute('data-url');
    if (!url) return;
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
      const fresh = $('[data-recommendations]', doc);
      if (fresh && fresh.innerHTML.trim()) el.innerHTML = fresh.innerHTML;
    } catch (err) { /* recommendations are optional */ }
  });
})();
