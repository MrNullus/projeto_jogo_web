function start() {
    $("#inicio").hide();
    $("#fundogame").append("<div id='jogador' class='anima1'></div>");
    $("#fundogame").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundogame").append("<div id='amigo' class='anima3'></div>");
    $("#fundogame").append("<div id='placar'></div>");
    $("#fundogame").append("<div id='energia'></div>");

    /*  VARIAVEIS SONS  */
    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameOver = document.getElementById("somGameOver");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");

    /*  VARIAVEIS  */
    var jogo = {};
    var velocidade = 5;
    var posicaoY = parseInt = (Math.random() * 334);
    var fimdejogo = false;
    var energiaAtual = 3;
    var pontos = 0;
    var amigosperdidos = 0;
    var salvos = 0;
    var TECLA = {
        W: 85,
        S: 83,
        D: 68
    }

    jogo.pressionou = [];


    musica.addEventListener("ended", function() {
        musica.currentTime = 0;
        musica.play();
    }, false);
    musica.play();

    jogo.timer = setInterval(loop, 30);
    ss

    $(document).keydown(function(e) {
        jogo.pressionou[e.which] = true;
    });

    $(document).keyup(function(e) {
        jogo.pressionou[e.which] = false;
    });



    function loop() {
        movefundo();
        movejogador();
        moveinimigo1();
        /* moveinimigo2();*/
        moveamigo();
        colisao();
        placar();
        //energia();

    }

    function movefundo() {
        esquerda = parseInt($("#fundogame").css("background-position"));
        $("#fundogame").css("background-position", esquerda - 1);
    }

    function movejogador() {
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt(("#jogador").css("top"));
            $("#jogador").css("top", topo - 10);

            if (topo <= 0) {
                $("#jogador").css("topo", toopo + 10);
            }
        }

        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt(("#jogador").css("top"));
            $("#jogador").css("top", topo + 10);
            if (topo >= 434) {
                $("#jogador").css("top", topo - 10)
            }
        }

        if (jogo.pressionou[TECLA.D]) {
            disparo();
        }
    }

    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", 694);
        $("#inimigo1").css("top", posicaoY)
        if (posicaoX <= 0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
    }

    /*function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left,posicaoX - 3");
        if (posicaoX <= 0) {
            $("#inimigo2").css("left", 775);
        }
    }*/

    function moveamigo() {
        posicaoX = parseInt($("#amigo")("left"));
        $("#amigo").css("left", posicaoX + 1);
        if (posicaoX > 906) {
            $("#amigo").css("left", 0);
        }
    }

    function disparo() {
        if (podeatirar == true) {
            //somDisparo.play(); //QUANTO TIVER O SOM E SÓ TIRAR O COMENTARIO 
            podeatirar == false;
            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt("#jogador").css("left")
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;
            $("#fundogame").append("<div id='disparo'></div>");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempodisparo = window.setInterval(executaDisparo, 30);
        }

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            if (posicaoX > 900) {
                window.clearInterval(tempodisparo);
                tempodisparo = null;
                $("#disparo").remove();
                podeatirar = true;

            }
        }
    }

    function colisao() {
        var colicao1 = ($("#jogador").collision($("#inimigo1")));
        var colicao2 = ($("#jogador").collision($("#inimigo2")));
        var colicao3 = ($("#disparo").collision($("#inimigo1")));
        var colicao4 = ($("#disparo").collision($("#inimigo2")));
        var colicao5 = ($("#jogador").collision($("#amigo")));
        var colicao6 = ($("inimigo2").collision($("#amigo")));

        if (colisao1.length > 0) {
            inimigo1X = parseInt($("#inimigo2").css("left"));
            inimigo1Y = parseInt($("#inimigo2").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

        }

        if (colisao2.length > 0) {
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));

            explosao2(inimigo2X, inimigo2Y);

            $("#inimigo2").remove();
            reposicionaInimigo2();
        }

        if (colisao3.length > 0) {
            pontos = pontos + 100;
            velocidade = velocidade + 0.3;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));

            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").csss("left", 950);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

        }

        if (colisao4.length > 0) {
            pontos = pontos + 59
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();

            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").csss("left", 950);

            reposicionanimigo2();

        }


        if (colisao5.length > 0) {
            //somResgate.play(); //QUANTO TIVER O SOM E SÓ TIRAR O COMENTARIO 
            salvos++;
            reposiionaAmigo();
            $("#amigo").remove();
        }

        if (colisao6.length > 0) {

            perdidos++;
            amigox = parseInt($("#amigo").css("left"));
            amigoy = parseInt($("#amigo").css("top"));
            explosao3(amigox, amigoy);
            $("#amigo").remove();

            reposionaAmigo();
        }

        function explosao1(inimigo1X, inimigo1Y) {
            //somExplosao.play();   //QUANTO TIVER O SOM E SÓ TIRAR O COMENTARIO 
            $("#fundogame").append("<div id='explosao1'></div>");
            $("#explosao1").css("background-image", "url(imagens/explosao.jpg)");
            var div = $("#explosao1");
            div.css("top", inimigo1Y);
            div.css("top", inimigo1X);
            div.animate({ width: 200, opacity: 0 }, "slow");

            var tempoexplosao = window.setInterval(removeExlosao, 1000);

            function removeExlosao() {
                div.remove();
                window;
                clearInterval(tempoexplosao);
                tempoexplosao = null;
            }
        }

        function reposicionaInimigo2() {
            var tempoColisao = window.setInterval(reposiciona4, 5000);

            function reposiciona4() {
                window.clearInterval(tempoColisao4);
                tempoColisao4 = null;
                if (fimdejogo == false) {
                    $("#fundogame").append("<div id='inimigo2'></div>");
                }
            }
        }

        function explosao3(amigox, amigoy) {
            //somExplosao.play();   //QUANTO TIVER O SOM E SÓ TIRAR O COMENTARIO 
            $("#fundogame").append("<div id='explosao3'></div>");
            $("#explosao3").css("top", amigoy);
            $("#explosao3").css("top", amigoy);
            var tempoexplosao3 = window.setInterval(removeExlosao3, 1000);

            function removeExlosao3() {
                $("#explosao3").remove();
                window.clearInterval(tempoexplosao3);
                tempoexplosao3 = null;
            }
        }
    }

    function placar() {
        $("#placar").html("<h2> Pontos: " + pontos + "Salvos" + salvos + "Perdidos" + perdidos + "</h2>");
    }

    function energia() {
        if (energiaAtual === 3) {
            $("#energia").css("backgground-image", "url(imagens/foto_barra_energia)");
        }
        if (energiaAtual === 2) {
            $("#energia").css("backgground-image", "url(imagens/foto_barra_energia)");
        }
        if (energiaAtual === 1) {
            $("#energia").css("backgground-image", "url(imagens/foto_barra_energia)");
        }
        if (energiaAtual === 0) {
            $("#energia").css("backgground-image", "url(imagens/foto_barra_energia)");

            gameover();

        }
    }

    function gameover() {
        fimdejogo = true;
        //musica.pause();
        //somGameOver.play();

        window.clearInterval(jogo.timer);
        jogo.timer = null;

        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();

        $("#fundogame").append("<div id='fim'</div>");

        $("#fim").html("<h1> Game Over </h1><p>Suapontuação foio: " + pontos + "</p>" + "<div id='reinicia' onClick= reiniciaJogo()> <h3>Jogar Novamente</h3> </div>");
    }

}

function reiniciaJogo() {
    //somGameOver.pause();
    $("#fim").remove();
    start();
}