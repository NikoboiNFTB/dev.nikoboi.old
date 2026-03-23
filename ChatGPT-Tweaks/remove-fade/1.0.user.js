// ==UserScript==
// @name         ChatGPT - Remove Fade
// @namespace    https://github.com/NikoboiNFTB/ChatGPT-Tweaks/
// @version      1.0
// @description  Removes 'content-fade' from the bottom on chatgpt.com. This is for the niche use case of using LibreWolf + DarkReader, which leaves a white fade at the bottom.
// @author       Nikoboi
// @match        https://chatgpt.com/*
// @grant        none
// @icon         https://cdn.oaistatic.com/assets/favicon-eex17e9e.ico
// ==/UserScript==

(function() {
    'use strict';

    // Original class string
    const originalClass = "group/thread-bottom-container relative isolate z-10 w-full basis-auto has-data-has-thread-error:pt-2 has-data-has-thread-error:[box-shadow:var(--sharp-edge-bottom-shadow)] md:border-transparent md:pt-0 dark:border-white/20 md:dark:border-transparent content-fade flex flex-col";

    // New class string without 'content-fade'
    const newClass = "group/thread-bottom-container relative isolate z-10 w-full basis-auto has-data-has-thread-error:pt-2 has-data-has-thread-error:[box-shadow:var(--sharp-edge-bottom-shadow)] md:border-transparent md:pt-0 dark:border-white/20 md:dark:border-transparent flex flex-col";

    function replaceClass() {
        // Get all elements on the page
        const allElements = document.querySelectorAll('*');

        allElements.forEach(el => {
            if(el.className === originalClass) {
                el.className = newClass;
                console.log('Replaced class on element:', el);
            }
        });
    }

    // Run once on page load
    replaceClass();

    // Observe for DOM changes (if content loads dynamically)
    const observer = new MutationObserver(() => {
        replaceClass();
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();
