// ==UserScript==
// @name         Lichess Funnies
// @version      12
// @description  Lichess Hints
// @author       Michael and Ian
// @match        https://lichess.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lichess.org
// @grant        none
// @updateURL    https://github.com/mchappychen/lichess-funnies/blob/main/lichess.user.js
// @downloadURL  https://github.com/mchappychen/lichess-funnies/blob/main/lichess.user.js
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://raw.githubusercontent.com/mchappychen/lichess-funnies/main/chess.js
// @require      https://raw.githubusercontent.com/mchappychen/lichess-funnies/main/stockfish.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements, Chess, stockfish, lichess */


setTimeout(function() {

    //Don't run in lobby
    if (window.location.href == 'https://lichess.org/'){return}

    //Stockfish engine and FEN generator
    var game = new Chess();

    //Returns xy coord for arrow
    function getArrowCoords(square,color){
        //square is like "a1"
        let bottom = square.substring(0,1).toLowerCase();
        let x = bottom == "a" ? -3.5 :
        (bottom == "b" ? -2.5 :
         (bottom == "c" ? -1.5 :
          (bottom == "d" ? -0.5 :
           (bottom == "e" ? 0.5 :
            (bottom == "f" ? 1.5 :
             (bottom == "g" ? 2.5 : 3.5))))));
        let right = square.substring(1,2);
        let y = right == "1" ? 3.5 :
        (right == "2" ? 2.5 :
         (right == "3" ? 1.5 :
          (right == "4" ? 0.5 :
           (right == "5" ? -0.5 :
            (right == "6" ? -1.5 :
             (right == "7" ? -2.5 : -3.5))))));
        //if you're black, invert them
        if (color == "black"){x = -x;y = -y;}
        return [x,y];
    }

    //For puzzles
    if (window.location.href.startsWith('https://lichess.org/training')){
        window.puzzle = function(){
            let gamePuzzle = new Chess();
            let moves = $('move');
            for(let i=0;i<moves.length;i++){
                gamePuzzle.move(moves[i].textContent.replace('✓',''));
            }
            stockfish.postMessage('position fen '+gamePuzzle.fen());
            let depth = $('#engineDepth')[0].value;
            stockfish.postMessage('go depth '+depth);
            $("#engineStatus")[0].innerText = "Running...";
        }
        stockfish.onmessage = function(event) {
            if(event.data.substring(0,8) == "bestmove"){
                let bestMove = event.data.split(" ")[1];
                $('g')[0].innerHTML = '';
                let arrowCoords1;
                let arrowCoords2;
                if($('.cg-wrap')[0].classList[1] == 'orientation-white' || $('.cg-wrap')[0].classList[2] == 'orientation-white'){
                    arrowCoords1 = getArrowCoords(bestMove.substring(0,2),'white');
                    arrowCoords2 = getArrowCoords(bestMove.substring(2),'white');
                } else {
                    arrowCoords1 = getArrowCoords(bestMove.substring(0,2),'black');
                    arrowCoords2 = getArrowCoords(bestMove.substring(2),'black');
                }
                $('g')[0].innerHTML += '<line stroke="#15781B" stroke-width="0.2" stroke-linecap="round" marker-end="url(#arrowhead-g)" opacity="1" x1="'+arrowCoords1[0]+'" y1="'+arrowCoords1[1]+'" x2="'+arrowCoords2[0]+'" y2="'+arrowCoords2[1]+'"></line>';
                $('g')[0].innerHTML += '<circle stroke="#15781B" stroke-width="0.07" fill="lime" opacity="0.8" cx="'+arrowCoords1[0]+'" cy="'+arrowCoords1[1]+'" r="0.4" ></circle>';
                $('g')[0].innerHTML += '<circle stroke="#15781B" stroke-width="0.07" fill="red" opacity="0.5" cx="'+arrowCoords2[0]+'" cy="'+arrowCoords2[1]+'" r="0.4" ></circle>';
                $('defs')[0].innerHTML += '<marker id="arrowhead-g" orient="auto" markerWidth="4" markerHeight="8" refX="2.05" refY="2" cgKey="g"><path d="M0,0 V4 L3,2 Z" fill="#15781B"></path></marker>';
                if($('div.vote')[0]){
                    $('div.vote')[0].click();
                }
                $("#engineStatus")[0].innerText = "IDLE";
            }
        };
        $(document).on("keydown", function(event) {
            if (event.key == "w") {
                puzzle();
            }
        });
        //Create panel
        let engineStatus = document.createElement('div');
        engineStatus.innerHTML = '<div class="infos puzzle" style="font-size:26px">Engine Status:  <span id="engineStatus">IDLE</span></div>';
        let engineDepth = document.createElement('div');
        engineDepth.innerHTML = '<div class="infos puzzle" style="font-size:26px">Engine Depth:<input id="engineDepth"type="number" min="1" max="99" value="23"></div>'
        let message = document.createElement('div');
        message.innerHTML = '<div class="infos puzzle" style="font-size:18px">Press w to start</div>';
        $('aside div.puzzle__side__metas')[0].prepend(message);
        $('aside div.puzzle__side__metas')[0].prepend(engineStatus);
        $('aside div.puzzle__side__metas')[0].prepend(engineDepth);
        let observer = new MutationObserver(function(mutationsList) {
            for (let mutation of mutationsList) {
                if (mutation.type === "childList" && mutation.addedNodes.length>0) {
                    $('g')[0].innerHTML = '';
                    if(mutation.addedNodes[0].innerText.includes('Continue training')){
                        $('div.vote')[0].click();
                    } else if (mutation.addedNodes[0].innerText.includes('Keep going…')){
                        setTimeout(puzzle,800);
                    } else if (mutation.addedNodes[0].innerText.includes('Your turn')){
                        setTimeout(puzzle,400);
                    }
                }
            }
        });
        observer.observe($('div.puzzle__tools')[0], { childList: true });
        return
    }

    //Update game board
    try {
        let moves = $('kwdb');
        for(let i=0;i<moves.length;i++){
            game.move(moves[i].textContent);
        }
    } catch {
        console.log("No one made a move yet");
    }
    stockfish.postMessage('position fen '+game.fen());

    //sends message to chat
    function send(x) {
        try{
            $(".mchat__tabs")[0].children[0].click();
            var event = new KeyboardEvent('keydown', {key: 'Enter',keyCode: 13,which: 13,bubbles: true,cancelable: true,});
            $('.mchat__say')[0].value = x;
            var element = $('.mchat__say')[0];
            element.dispatchEvent(event);
        } catch {console.log('Error, couldn\'t send message')}
    }
    
    var autoHint = false;
    var lastMove = 0;
    let firstMove = false;
    const moveObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.target.tagName == 'L4X' && mutation.target.children[mutation.target.children.length-1]) {
                //Get the first move here
                if(!firstMove){
                    firstMove = true;
                    game.move($('kwdb')[0].textContent);
                }

                //$('g')[0].innerHTML = ''; //removes board arrows/circles
                //If game is over
                if((lastMove == mutation.target.children[mutation.target.children.length-1] || mutation.target.children[mutation.target.children.length-1].tagName != "KWDB") && $('.cg-wrap')[0].classList[1] == 'orientation-white'){
                    //lichess.socket.send( "rematch-yes" );
                    try{
                        console.log("rematching...");
                        send("Finding new opponent in 8 seconds...");
                        lichess.socket.send( "rematch-yes" );
                        setTimeout(function(){$('a.fbt[href^="/#pool"]')[0].click()},8000);
                    }catch{
                    console.log("Error");
                    }
                    return
                }

                //Get last move
                lastMove = mutation.target.children[mutation.target.children.length-1];
                //console.log(lastMove);

                //Update our game board
                game.move(lastMove.textContent);
                //console.log(game.history());

                //If we're white, only get black moves. Vice versa
                if ($('.cg-wrap')[0].classList[1] == 'orientation-white' && mutation.target.children.length%3!=0){
                    return
                }
                if ($('.cg-wrap')[0].classList[1] == 'orientation-black' && mutation.target.children.length%3==0){
                    return
                }

                if (autoHint){
                    stockfish.postMessage('position fen '+game.fen());
                    var time = $("div.time")[1].innerText.split("\n");
                    if (game.history().length < 12){
                        stockfish.postMessage('go movetime 20');
                    } else if (parseInt(time[0])*60 + parseInt(time[2]) < 1){
                        stockfish.postMessage('go movetime 20');
                    } else if (parseInt(time[0])*60 + parseInt(time[2]) < 3){
                        stockfish.postMessage('go movetime 200');
                    } else {
                        stockfish.postMessage('go movetime 400');
                    }
                }
            }
        }
    });
    moveObserver.observe($('rm6')[0], {childList: true,subtree: true});


    //Returns piece name given its abbreviation
    function piece(p){
        return p=='p' ? 'Pawn' :
        (p=='r' ? 'Rook' :
         (p=='n' ? 'Knight' :
          (p=='b' ? 'Bishop' :
           (p=='q' ? 'Queen' :
            (p=='k' ? 'King' :
             p)))));
    }

    stockfish.onmessage = function(event) {
        if(event.data.substring(0,8) == "bestmove"){
            //console.log(`socket.rep.${Math.round(Date.now() / 1e3 / 3600 / 3)}`,`socket.rep.${Math.round(Date.now() / 1e3 / 3600 / 3)}`.nodeType,D(`socket.rep.${Math.round(Date.now() / 1e3 / 3600 / 3)}`));
            let bestMove = event.data.split(" ")[1];
            //Remove all arrows
            lichess.socket.averageLag = 1200;
            if($('.cg-wrap')[0].classList[1] == 'orientation-white'){
                //let arrowCoords1 = getArrowCoords(bestMove.substring(0,2),'white');
                //let arrowCoords2 = getArrowCoords(bestMove.substring(2),'white');
                //$('g')[0].innerHTML += '<line stroke="#15781B" stroke-width="0.2" stroke-linecap="round" marker-end="url(#arrowhead-g)" opacity="1" x1="'+arrowCoords1[0]+'" y1="'+arrowCoords1[1]+'" x2="'+arrowCoords2[0]+'" y2="'+arrowCoords2[1]+'"></line>';
                //$('g')[0].innerHTML += '<circle stroke="#15781B" stroke-width="0.07" fill="lime" opacity="0.8" cx="'+arrowCoords1[0]+'" cy="'+arrowCoords1[1]+'" r="0.4" ></circle>';
                //$('g')[0].innerHTML += '<circle stroke="#15781B" stroke-width="0.07" fill="red" opacity="0.6" cx="'+arrowCoords2[0]+'" cy="'+arrowCoords2[1]+'" r="0.4" ></circle>';
                //$('defs')[0].innerHTML += '<marker id="arrowhead-g" orient="auto" markerWidth="4" markerHeight="8" refX="2.05" refY="2" cgKey="g"><path d="M0,0 V4 L3,2 Z" fill="#15781B"></path></marker>';

                lichess.socket.send('move', { u: bestMove }, { ackable: true, sign:lichess.socket._sign, withLag:true });

            } else {
                lichess.socket.send('move', { u: bestMove }, { ackable: true, sign:lichess.socket._sign, withLag:true });
            }
            //console.log('averageLag',lichess.socket.averageLag);

        }
    };


    //Add stockfish hint button
    let sfbutton = document.createElement('button');
    sfbutton.innerText = 'Hint';
    sfbutton.classList.add('fbt');
    sfbutton.onclick=function(){
        stockfish.postMessage('position fen '+game.fen());
        stockfish.postMessage('go depth 12');
    }
    $('div .ricons')[0].appendChild(sfbutton);

    //Add button to toggle auto-hints
    let auHintButton = document.createElement('button');
    auHintButton.innerText = 'Auto-OFF';
    auHintButton.classList.add('fbt');
    auHintButton.onclick = function(){
        auHintButton.innerText = auHintButton.innerText == "AUTO-OFF" ? "Auto-ON" : "Auto-OFF";
        autoHint = !autoHint;
        auHintButton.style.backgroundColor = autoHint ? "green" : "";
    }
    $('div .ricons')[0].appendChild(auHintButton);
    auHintButton.click();

    //Make all buttons have a blue border when clicked
    $('.fbt').on('mousedown',function(){
        this.style.border = '6px solid blue';
        setTimeout(function(a){
            a.style.border = '';
        },500,this);
    });

    //Make bongcloud opening
    if($('.cg-wrap')[0].classList[1] == 'orientation-white'){
        setTimeout(function(){lichess.socket.send('move', { u: 'e2e4' }, { ackable: true, sign:lichess.socket._sign, withLag:true });},1000);
    } else {
        setTimeout(function(){lichess.socket.send('move', { from: 'e7', to:'e5' }, { ackable: true, sign:lichess.socket._sign, withLag:true });},4000);
    }


},600);



