/*
 * When the copy button is clicked, this script temporarily modifies
 * the displayed text to remove leading '$' characters from code snippets.
 * The modification is applied at click time to ensure compatibility
 * with Material’s instant-loading main site, then restored after 10ms.
 */

document$.subscribe(() => {
  const buttons = document.querySelectorAll('.md-clipboard');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const code = button.closest('.highlight')?.querySelector('code');
      if (!code) return;

      const original = code.textContent;
      const modified = original.replace(/^((\$)\s*)/gm, '');

      code.textContent = modified;

      setTimeout(() => {
        code.textContent = original;
      }, 10);
    });
  });
});