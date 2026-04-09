/*
 * Strip leading '$' or '$ ' from code snippets on copy.
 *
 * Three layers cover different ways the copy button may be implemented:
 *   Layer 1 – Clipboard.prototype patch  (direct calls at click time)
 *   Layer 2 – navigator.clipboard instance patch (own-property lookup)
 *   Layer 3 – 'copy' DOM event          (execCommand / Ctrl+C fallback)
 */
(function () {
  'use strict';

  function strip(text) {
    return typeof text === 'string' ? text.replace(/^(\$\s*)/gm, '') : text;
  }

  // Layer 1: prototype patch – intercepts calls that go through the prototype
  // chain regardless of when they are made relative to this script loading.
  if (typeof Clipboard !== 'undefined' && Clipboard.prototype.writeText) {
    const _proto = Clipboard.prototype.writeText;
    Clipboard.prototype.writeText = function (text) {
      console.debug('[extra.js] layer 1 (prototype) intercepted');
      return _proto.call(this, strip(text));
    };
  }

  // Layer 2: instance patch – shadows the prototype on the live object so
  // a direct navigator.clipboard.writeText(…) lookup finds our version first.
  if (navigator.clipboard) {
    const _orig = navigator.clipboard.writeText.bind(navigator.clipboard);
    navigator.clipboard.writeText = function (text) {
      console.debug('[extra.js] layer 2 (instance) intercepted');
      return _orig(strip(text));
    };
  }

  // Layer 3: copy DOM event – handles execCommand-based copies and Ctrl+C.
  document.addEventListener('copy', function (e) {
    if (!e.clipboardData) return;
    const sel = window.getSelection() ? window.getSelection().toString() : '';
    if (!sel) return;
    const stripped = strip(sel);
    if (stripped !== sel) {
      e.clipboardData.setData('text/plain', stripped);
      e.preventDefault();
      console.debug('[extra.js] layer 3 (copy event) intercepted');
    }
  });

  console.log('[extra.js] dollar-strip patch loaded. Layers active: ' +
    (typeof Clipboard !== 'undefined' ? '1 ' : '') +
    (navigator.clipboard ? '2 ' : '') + '3');
}());
