/*
 * Override Material's copy button to remove leading '$' from code snippets.
 */

document$.subscribe(() => {
  document.querySelectorAll('.md-clipboard').forEach(button => {
    button.replaceWith(button.cloneNode(true));
  });

  document.querySelectorAll('.md-clipboard').forEach(button => {
    button.addEventListener('click', async event => {
      const code = button.closest('.highlight')?.querySelector('code');
      if (!code) return;

      const textToCopy = code.textContent.replace(/^((\$)\s*)/gm, '');
      await navigator.clipboard.writeText(textToCopy);
      event.stopImmediatePropagation();
    });
  });
});
