(function () {

    if (window.__croMobileStickySummary) return;
    window.__croMobileStickySummary = true;

    function init() {

        if (window.innerWidth > 768) return;

        const desktopSummary = document.querySelector(".cgt-header-items");
        const header = document.querySelector(".cgt-common-header");

        if (!desktopSummary || !header) return;
        if (document.querySelector(".cro-mobile-summary")) return;

        const destination =
            desktopSummary.querySelector(".cgt-desination-region-icon")
            ?.nextElementSibling?.innerText.trim() || "";

        const dates =
            desktopSummary.querySelector(".cgt-calendar-icon")
            ?.nextElementSibling?.innerText.trim() || "";

        const travelers =
            desktopSummary.querySelector(".cgt-insured-person-icon")
            ?.nextElementSibling?.innerText.trim() || "";

        const summary = document.createElement("div");
        summary.className = "cro-mobile-summary";

        summary.innerHTML = `
            <div class="cro-item">
                <span class="cgt-header-icon cgt-desination-region-icon"></span>
                <span>${destination}</span>
            </div>

            <div class="cro-item">
                <span class="cgt-header-icon cgt-calendar-icon"></span>
                <span>${dates}</span>
            </div>

            <div class="cro-item">
                <span class="cgt-header-icon cgt-insured-person-icon"></span>
                <span>${travelers}</span>
            </div>
        `;

        header.insertAdjacentElement("afterend", summary);

        const style = document.createElement("style");

        style.innerHTML = `
        @media (max-width:768px){

            .cgt-header-items{
                display:none !important;
            }

            .cro-mobile-summary{

                display:flex;
                align-items:center;
                gap:14px;

                position:sticky;
                top:0;
                z-index:999;

                background:#fff;

                padding:10px 16px;

                border-bottom:1px solid #ECECEC;

                overflow-x:auto;

                white-space:nowrap;

                scrollbar-width:none;

                -webkit-overflow-scrolling:touch;

            }

            .cro-mobile-summary::-webkit-scrollbar{
                display:none;
            }

            .cro-item{

                display:flex;
                align-items:center;
                gap:4px;

                flex-shrink:0;

                font-size:12px;

                font-family:inherit;

                color:#222;

            }

            .cro-item span:last-child{

                max-width:150px;

                overflow:hidden;

                text-overflow:ellipsis;

                white-space:nowrap;

            }

            .cro-item .cgt-header-icon{

                width:16px;
                height:16px;

                background-size:contain;

                background-repeat:no-repeat;

                flex-shrink:0;

            }

        }
        `;

        document.head.appendChild(style);

    }

    new MutationObserver(init).observe(document.body,{
        childList:true,
        subtree:true
    });

    init();

})();
