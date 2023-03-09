const blocos = document.querySelectorAll('.bloco');
        const currentPlayer = document.querySelector('.currentPlayer');
        const resetButton = document.querySelector('button');
        let jogadas = 0;

        let player = 'X';
        let posicoes = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7],
        ];

        blocos.forEach((bloco) => {
            bloco.addEventListener('click', handleClick, { once: true });
        });

        resetButton.addEventListener('click', reset);

        
        function handleClick(event) {
            const bloco = event.target;
            bloco.textContent = player;
            if(player == 'X'){
                bloco.style.color = "#B22222";
                bloco.style.background = "#FDB137";
            }else {
                bloco.style.color = "#0000CD";
                bloco.style.background = "#FDB137";
            }
            player = player === 'X' ? 'O' : 'X';

            currentPlayer.innerText = `Vez do jogador ${player}`;
            jogadas++

            const selected = {};
            blocos.forEach((bloco, index) => {
                selected[index] = bloco.textContent;
            });

            for (let i = 0; i < posicoes.length; i++) {
                const [a, b, c] = posicoes[i];
                if (selected[a-1] && selected[a-1] === selected[b-1] && selected[a-1] === selected[c-1]) {
                    currentPlayer.innerText = `O jogador ${selected[a-1]} ganhou!`;
                    
                    blocos.forEach((bloco) => {
                    bloco.removeEventListener('click', handleClick);
                    });
                    return;
                }   
            }
            console.log(jogadas)
            if (jogadas == 9) {
                currentPlayer.innerText = 'Deu empate!'
            }
        }

        function verificarJogoAcabou() {
        let jogoAcabou = true;
        blocos.forEach((bloco) => {
            if (bloco.textContent === '') {
            jogoAcabou = false;
            }
        });
        return jogoAcabou;
        }

        function reset() {
            blocos.forEach((bloco) => {
                bloco.textContent = '';
                bloco.style.background = "#F7DC67";
            });
            currentPlayer.innerText = 'Vez do jogador X';
            player = 'X';
            blocos.forEach((bloco) => {
                bloco.addEventListener('click', handleClick, { once: true });
            });
            jogadas = 0;
            
        }