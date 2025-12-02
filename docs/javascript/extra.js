/*
 * When the copy button is clicked, this script copies the code
 * with leading '$' characters removed, ensuring it works
 * on both versioned builds and the main branch with instant loading.
 */

document$.subscribe(() => {
  document.addEventListener('copy', e => {
    const code = e.target.closest('code');
    if (!code) return;

    // Replace copied text
    const textToCopy = code.textContent.replace(/^((\$)\s*)/gm, '');
    e.clipboardData.setData('text/plain', textToCopy);
    e.preventDefault(); // prevent default copy
  });
});