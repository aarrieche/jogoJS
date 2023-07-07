        let div2 = document.getElementById("div2");
        let div1 = document.getElementById("div1");
        let pulando = false; 
        let contador = 0;
        let ehGalvao = false;
        let m = setInterval("mover()", 15);
        let n = setInterval("colisao()", 5);
        


        function mover() {
            let div2Left = parseInt(getComputedStyle(div2).right);
            let fundoWidth = parseInt(getComputedStyle(fundo).width);
            let div2Width = parseInt(getComputedStyle(div2).width);

            div2.style.right = div2Left + obterVelocidade() + 'px';

            if (div2Left >= fundoWidth - div2Width) {
                div2.style.right = -div2Width + 'px';
                contador++;

                if (contador === 3) {
                    document.getElementById("somContador3").play();
                }

                if (contador === 5) {
                    document.getElementById("somContador5").play();
                }

                if (contador === 9) {
                    document.getElementById("somContador8").play();
                }

                document.querySelector("#contador").textContent = `Driblados: ${contador}`;

                if (contador === 11) {
                    document.getElementById("venceu").textContent = "Venceu";
                    document.getElementById("acabou").play();
                    para2();
                    
                }
            }
        }

        function obterVelocidade() {
            let larguraTela = window.innerWidth;
        
            if (contador >= 0 && contador <= 4) {
                return larguraTela * 0.006;
            } else if (contador >= 5 && contador <= 7) {
                return larguraTela * 0.008;
            } else if (contador >= 8 && contador <= 11) {
                return larguraTela * 0.009;
            } else {
                return 0;
            }
        }
        

        function trocar() {
            reiniciarJogo();
            let currentImage = div1.src;
            let newImage;

            if (currentImage.includes("neymar")) {
                newImage = "futebol-imagem-animada-0093.gif";
                ehGalvao = false;
            } else if (currentImage.includes("futebol-imagem-animada-0093.gif")) {
                newImage = "galvao.gif";
                ehGalvao = true;
            } else {
                newImage = "neymar.png";
                ehGalvao = false;
            }

            div1.src = newImage;
        }

        function pulo() {


            if (pulando) {
                return;
            }
        
            let vel;

            if (window.innerWidth < 600) {
            vel = 2; 
            } else {
             vel = 10; 
            }
            pulando = true;
            let div1Top = parseInt(getComputedStyle(div1).top);
            let alturaPulo;
        
            if (ehGalvao === true) {
                document.getElementById("fisica").play();
                alturaPulo = 0.01 * window.innerWidth;
            } else {
                alturaPulo = 0.12 * window.innerWidth;
                console.log(window.innerWidth);
                
            }
        
            let alturaMaxima = div1Top - alturaPulo;
            let puloInterval = setInterval(() => {
                div1.style.top = div1Top - vel + 'px';
                document.getElementById("somPulo").play();
                div1Top = parseInt(getComputedStyle(div1).top);
        
                if (div1Top <= alturaMaxima) {
                    clearInterval(puloInterval);
                    descer();
                }
            }, 15);
        }
        

        function descer() {
            let vel;
            

            if (window.innerWidth < 600) {
            vel = 3; 
            } else {
             vel = 10; 
            }

            console.log(vel);
            let div1Top = parseInt(getComputedStyle(div1).top);
            let fundoHeight = parseInt(getComputedStyle(fundo).height);
            let div1Height = parseInt(getComputedStyle(div1).height);

            

            let descidaInterval = setInterval(() => {
                div1.style.top = div1Top + vel + 'px';
                div1Top = parseInt(getComputedStyle(div1).top);

                if (div1Top + div1Height >= fundoHeight) {
                    clearInterval(descidaInterval);
                    pulando = false;
                }
            }, 15);
        }

        function reiniciarJogo() {
            document.getElementById("venceu").textContent = "";
            document.getElementById("acabou").pause();
            document.getElementById("acabou").currentTime = 0;
            document.getElementById("somContador3").pause();
            document.getElementById("somContador3").currentTime = 0;
            document.getElementById("somContador5").pause();
            document.getElementById("somContador5").currentTime = 0;
            document.getElementById("somContador8").pause();
            document.getElementById("somContador8").currentTime = 0;

            clearInterval(m);
            clearInterval(n);

            div1.style.top = '15vw';
            div1.style.left = '35vw';
            div1.style.width = '5vw';
            div1.style.height = '5vw';

            div2.style.right = '5vw';

            contador = 0;
            document.querySelector("#contador").textContent = `Driblados: ${contador}`;

            

            m = setInterval(mover, 15);
            n = setInterval(colisao, 5);
        }

        function para2() {
            clearInterval(m);
        }

        function para() {
            clearInterval();
        }

        function colisao() {
            let div1Left = parseInt(getComputedStyle(div1).left);
            let div1Top = parseInt(getComputedStyle(div1).top);
            let div1Height = parseInt(getComputedStyle(div1).height);
            let div1Width = parseInt(getComputedStyle(div1).width);

            let div2Left = parseInt(getComputedStyle(div2).left);
            let div2Top = parseInt(getComputedStyle(div2).top);
            let div2Height = parseInt(getComputedStyle(div2).height);
            let div2Width = parseInt(getComputedStyle(div2).width);

            let fundoHeight = parseInt(getComputedStyle(fundo).height);
            let fundoWidth = parseInt(getComputedStyle(fundo).width);

            if (((div1Left >= div2Left) && (div1Left <= div2Left + div2Width)) &&
                ((div1Top >= div2Top) && (div1Top <= div2Top + div2Height))) {
                para2();
                para();
            }
            if (((div2Left >= div1Left) && (div2Left <= div1Left + div1Width)) &&
                ((div2Top >= div1Top) && (div2Top <= div1Top + div1Height))) {
                para2();
                para();
            }
        }

       
        document.querySelector("#pulo").addEventListener("click", pulo);
        document.querySelector("#reiniciar").addEventListener("click", reiniciarJogo);
        document.querySelector("#trocar").addEventListener("click", trocar);
        
       
    
