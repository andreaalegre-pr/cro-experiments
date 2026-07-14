(function () {

    if (window.__croCoverageCategories) return;
    window.__croCoverageCategories = true;

    /* ===========================
       ESTILOS
    =========================== */

    const style = document.createElement("style");

    style.innerHTML = `

    .cro-category{
        border:1px solid #e6e6e6;
        border-radius:8px;
        overflow:hidden;
        margin-bottom:16px;
        background:#fff;
    }

    .cro-category-title{
        display:flex;
        align-items:center;
        gap:10px;
        padding:14px 18px;
        background:#f7f8fa;
        border-bottom:1px solid #e6e6e6;
        color:#222;
        font-size:15px;
        font-weight:600;
    }

    .cro-icon{
        display:flex;
        align-items:center;
        justify-content:center;
        width:18px;
        min-width:18px;
        color:#222;
        font-size:18px;
        font-weight:600;
        line-height:1;
        font-family:Arial, Helvetica, sans-serif;
    }

    .cro-category .cgt-benefits-content{
        margin:0 !important;
        padding:12px 18px;
        border-bottom:1px solid #f2f2f2;
    }

    .cro-category .cgt-benefits-content:last-child{
        border-bottom:none;
    }

    .cro-category .cgt-benefit-desc{
        font-weight:500;
    }

    `;

    document.head.appendChild(style);

    document.querySelectorAll(".cgt-benefits-wrapper").forEach(wrapper=>{

        if(wrapper.dataset.croGrouped) return;
        wrapper.dataset.croGrouped="true";

        const medical=[];
        const travel=[];
        const protection=[];

        [...wrapper.querySelectorAll(".cgt-benefits-content")].forEach(item=>{

            const text=(item.querySelector(".cgt-benefit-desc")?.textContent || "").toLowerCase();

            if(

                text.includes("gastos médicos") ||
                text.includes("gastos medicos") ||
                text.includes("medicamentos") ||
                text.includes("odontológica") ||
                text.includes("odontologica") ||
                text.includes("traslados médicos") ||
                text.includes("traslados medicos") ||
                text.includes("hotel") ||
                text.includes("emergencia médica") ||
                text.includes("emergencia medica") ||
                text.includes("familiar directo")

            ){

                medical.push(item);

            }else if(

                text.includes("equipaje") ||
                text.includes("cancelación") ||
                text.includes("cancelacion") ||
                text.includes("interrupción") ||
                text.includes("interrupcion") ||
                text.includes("demora") ||
                text.includes("documentos") ||
                text.includes("viaje") ||
                text.includes("regreso")

            ){

                travel.push(item);

            }else{

                protection.push(item);

            }

        });

        wrapper.innerHTML="";

        function createGroup(title, symbol, elements){

            if(!elements.length) return;

            const group=document.createElement("div");
            group.className="cro-category";

            const header=document.createElement("div");
            header.className="cro-category-title";

            const icon=document.createElement("span");
            icon.className="cro-icon";
            icon.textContent=symbol;

            const text=document.createElement("span");
            text.textContent=title;

            header.appendChild(icon);
            header.appendChild(text);

            group.appendChild(header);

            elements.forEach(el=>group.appendChild(el));

            wrapper.appendChild(group);

        }

        createGroup(
            "Atención médica",
            "✚",
            medical
        );

        createGroup(
            "Viaje y equipaje",
            "✈",
            travel
        );

        createGroup(
            "Protección adicional",
            "✓",
            protection
        );

    });

})();
