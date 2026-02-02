document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript is loaded and running!");

    const form = document.querySelector(".form-group");
    const descriptionInput = document.getElementById("description");
    const secaoPreview = document.getElementById("preview-section");
    const codigohtml = document.getElementById("html-code");
    const codigocss = document.getElementById("css-code");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const description = descriptionInput.value.trim();
        if (!description) {
            alert("Por favor, insira uma descrição.");
            return;
        }



        console.log(description);
        showloading(true);

        try {
            const resposta = await fetch("https://enyomorales.app.n8n.cloud/webhook/fundo-magico", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ description }),
            });

            const dados = await resposta.json();
            console.log(dados);


            codigohtml.textContent = dados.html || "";
            codigocss.textContent = dados.css || "";
            secaoPreview.style.display = "block";
            secaoPreview.innerHTML = dados.html || "";



            let tagstyle = document.getElementById("dynamic-style");
            if (tagstyle) {
                tagstyle.remove();
            }

            if (dados.css) {
                tagstyle = document.createElement("style");
                tagstyle.id = "dynamic-style";
                tagstyle.textContent = dados.css;
                document.head.appendChild(tagstyle);
            }

            console.log(resposta);

        } catch (error) {
            console.error("Erro ao gerar o background:", error);
            codigohtml.textContent = "Não foi possível gerar o código HTML :(";
            codigocss.textContent = "Não foi possível gerar o código CSS :(";
            secaoPreview.innerHTML = "";

        } finally {
            showloading(false);
        }

    });

    function showloading() {
        const sendbutton = document.getElementById("generate-btn");
        if (showloading) {
            sendbutton.textContent = "Gerando background...";
        } else {
            sendbutton.textContent = "Gerar";
        }
    }




});