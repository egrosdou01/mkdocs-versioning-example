/*
 * When the copy button is clicked, this script copies the code
 * with leading '$' characters removed, ensuring it works
 * on both versioned builds and the main branch with instant loading.
 */

document$.subscribe(() => {
  document.querySelectorAll('.md-clipboard').forEach(button => {
    button.addEventListener('click', async (event) => {
      const code = button.closest('.highlight')?.querySelector('code');
      if (!code) return;

      const textToCopy = code.textContent.replace(/^((\$)\s*)/gm, '');

      await navigator.clipboard.writeText(textToCopy);

      event.stopImmediatePropagation();
    });
  });
});

