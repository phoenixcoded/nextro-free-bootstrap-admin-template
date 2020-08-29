"use strict";
// =========================================================
// ==================    ui kit model code   ===============
// =========================================================
$('body').append('<div class="pc-example-modal"><a href="javascript:void(0)" class="md-pc-example-modal-copy"><span data-feather="clipboard"> <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></span></a><a href="javascript:void(0)" class="pc-example-modal-close"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a><div class="scroll-div"><div class="pc-example-modal-content"></div></div></div>');
(function() {
    function hasClass(el, cls) {
        return el.className.split(' ').indexOf(cls) !== -1;
    }

    function dattacodbnd(source, blacklist) {
        source = source
            .replace(/\r/g, '')
            .replace(/\t/g, '  ')
            .replace(/^ *\n+/, '\n')
            .replace(/[\s\n]+$/, '');

        source = source.replace(new RegExp('\\n' + source.match(/^\n( *)/)[1], 'g'), '\n');

        if (blacklist) {
            source = source.replace(/class="([^"]+)"/g, function(m, clsStr) {
                var clsArr = clsStr.replace(/^\s+|\s+$/, '').replace(/\s+/g, ' ').split(' ');

                for (var i = 0, l = blacklist.length, clsInd; i < l; i++) {
                    if ((clsInd = clsArr.indexOf(blacklist[i])) !== -1) {
                        clsArr.splice(clsInd, 1);
                    }
                }

                return 'class="' + clsArr.join(' ') + '"';
            });
        }

        return source
            .replace(/\s+class=""/ig, '')
            .replace(/([a-z]+)=""/ig, '$1')
            .replace(/javascript:void\(0\)/g, '#')
            .replace(/^\n/, '');
    }

    function Dattaclp(el, src) {
        return new ClipboardJS(el, {
            text: function() {
                return src;
            }
        });
    }

    function Dattaopnmdl(src, formattedSrc) {
        document.querySelector('.pc-example-modal-content').innerHTML = '<pre><code class="hljs html xml">' + formattedSrc + '</code></pre>';

        var btn_copy = document.querySelector('.md-pc-example-modal-copy');
        var closeBtn = document.querySelector('.pc-example-modal-close');

        var btn_copyTimeout = null;
        var ClipboardJS = Dattaclp(btn_copy, src);

        ClipboardJS.on('success', function(e) {
            if (btn_copyTimeout) {
                clearTimeout(btn_copyTimeout);
                btn_copyTimeout = null;
            }

            btn_copy.className = btn_copy.className.replace(' copied', '');
            btn_copy.className += ' copied';

            btn_copyTimeout = setTimeout(function() {
                btn_copy.className = btn_copy.className.replace(' copied', '');
            }, 1000);
        });

        var closeListener = function() {
            document.querySelector('.pc-example-modal-content').innerHTML = '';
            document.querySelector('.pc-example-modal').scrollTop = 0;
            closeBtn.removeEventListener('click', closeListener);
            ClipboardJS.destroy();
            document.documentElement.className = document.documentElement.className.replace(' pc-example-modal-opened', '');
        };
        closeBtn.addEventListener('click', closeListener);
        document.documentElement.className += ' pc-example-modal-opened';
    }
    Array.prototype.slice.call(document.querySelectorAll('.pc-example')).forEach(function(parentEl) {
        var btnsWrapper = document.createElement('div');
        btnsWrapper.className = 'pc-example-btns';

        var btn_copy = document.createElement('a');
        btn_copy.href = 'javascript:void(0)';
        btn_copy.className = 'pc-example-btn copy';

        var btn_md_open = document.createElement('a');
        btn_md_open.href = 'javascript:void(0)';
        btn_md_open.className = 'pc-example-btn';
        btn_md_open.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>'

        // btnsWrapper.appendChild(btn_copy);
        btnsWrapper.appendChild(btn_md_open);

        var blacklistStr = (parentEl.getAttribute('pc-blacklist') || null);
        var blacklist = (blacklistStr && blacklistStr.split(',')) || null;
        var src = dattacodbnd(parentEl.innerHTML, blacklist);
        var formattedSrc = hljs.highlight('html', src).value;

        parentEl.appendChild(btnsWrapper);

        var btn_copyTimeout = null;
        Dattaclp(btn_copy, src).on('success', function(e) {
            if (btn_copyTimeout) {
                clearTimeout(btn_copyTimeout);
                btn_copyTimeout = null;
            }
            btn_copy.className = btn_copy.className.replace(' copied', '');
            btn_copy.className += ' copied';

            btn_copyTimeout = setTimeout(function() {
                btn_copy.className = btn_copy.className.replace(' copied', '');
            }, 1000);
        });
        btn_md_open.addEventListener('click', function(e) {
            Dattaopnmdl(src, formattedSrc);
        });
    });
})();
