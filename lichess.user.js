// ==UserScript==
// @name         Lichess Gambit Opening
// @version      1
// @description  Show me gambit openings
// @author       Michael
// @match        https://lichess.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lichess.org
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */


(function() {


    //gambits for white
    let white = [
        'e4,e5,bc4,nc6,nf3,bc5,bxf7,kxf7,nxe5,nxe5,qh5,ng6,qd5,ke8,qxc5,d6,qe4,', //jerome gambit
        'e4,e5,bc4,nc6,nf3,bc5,bxf7,kxf7,nxe5,nxe5,qh5,g6,qxe5,qe7,qd5,',
        'e4,e5,bc4,nf6,nf3,nc6,bxf7,kxf7,nxe5,nxe5,d4,nc6,e5,nd5,qf3,',
        'e4,e5,nf3,nc6,bc4,bc5,bxf7,kxf7,nxe5,nxe5,qh5,ng6,qd5,ke8,qxc5,d6,qe4,',
        'e4,e5,nf3,nc6,bc4,bc5,bxf7,kxf7,nxe5,nxe5,qh5,g6,qxe5,qe7,qd5,',
        'e4,e5,nf3,nc6,bc4,nf6,bxf7,kxf7,nxe5,nxe5,d4,nc6,e5,nd5,qf3,',
        'e4,e5,nf3,nc6,d4,exd4,ng5,h6,nxf7,kxf7,bc4,ke8,qh5,ke7,qf7,kd6,e5,nxe5,qd5,ke7,qxe5,', //scotch gambit
        'e4,e5,d4,exd4,c3,dxc3,bc4,cxb2,bxb2,qg5,nf3,qxg2,rg1,qh3,bxf7,kxf7,ng5,', //danish/goring gambit
        'e4,e5,d4,qh4,nf3,qxe4,be2,', //danish/goring gambit fail
        'e4,e5,f4,exf4,nf3,g5,nc3,g4,ne5,qh4,g3,fxg3,qxg4,',
        'e4,e5,f4,exf4,nf3,g5,bc4,g4,o-o,gxf3,qxf3', //musio gambit
        'e4,e5,nc3,nf6,f4,nc6,fxe5,', //vienna
        'e4,e5,nc3,nf6,f4,exf4,e5,ng8,nf3',
        'd4,d5,c4,dxc4,e3,b5,a4,c6,axb5,cxb5,qf3,',
        'e4,e5,bc4,qh4,nc3,nf6,nf3,qg4,bxf7,',
        'e4,d5,nf3,dxe4,ng5,nf6,d3,exd3,bxd3,h6,nxf7,kxf7,bg6,', //tennison gambit
        'e5,d5,nf3,dxe4,ng5,f6,bc5,h6,qg5,kd7,be6,kc6,nf7',
        'e4,c5,b4,cxb4,a3,bxa3,bxa3,', //sicillian wing gambit
        'e4,c5,a3,nc6,b4,cxb4,axb4,nxb4,c3,nf6,d4,d5,exd5,qxd5,na3,nf6,nb5,d5,nxd5,qxd5,qxd5,nc7', //sicillian delayed wing gambit
        'e4,e6,c4,d5,cxd5,exd5,qb3,dxe4,bc4', //ortho-schnapp gambit
        'e4,e5,bc4,nc6,nf3,nf6,ng5,d5,exd5,nxd5,nxf7,kxf7,qf3,ke6,nd4,bxd5,',//fried liver
        'e4,e5,bc4,nc6,nf3,nf6,ng5,bc5,nxf7,bxf2,kxf2,nxe4,kg1,qf6,qe2,nd4,qxe4,o-o,ng5,ne6,qxh7,',
        'e4,e5,bc4,nc6,nf3,nf6,ng5,nxe4,bxf7,ke7,d4',
        'e4,e5,bc4,nc6,nf3,nf6,ng5,d5,exd5,na5,bb5,c6,dxc6,bxc6,qe7',
        'e4,e5,nf3,f6,nxe5,fxe5,qh5,ke7,qxe5,kf7,qd5,ke7,qe5,kf7,bc4,d5,bxd5,kg6,h4,h6,bxb7,bd6,qa5',

        //From Ian
        'e4,Nf6,e5,Nd5,d4,b5,',
        'd4,Nf6,c4,c5,d5,b5,cxb5,a6,Nc3,axb5,e4,b4,Nb5,d6,',
        'f4,e5,fxe5,d6,exd6,Nf6,',
        'f4,d5,Nf3,c5,e4,dxe4,',
        'e4,e5,Bc4,Bc5,c3,d5,',
        'd4,Nf6,c4,e5,dxe5,Ne4,',
        'd4,Nf6,c4,e5,dxe5,Ng4,e4,d6,',
        'e4,c6,d4,d5,exd5,Nf6,',
        'c4,e5,Nc3,Nf6,Nf3,e4,Ng5,b5,',
        'd4,e5,dxe5,Nc6,Nf3,Qe7,Qd5,f6,exf6,Nxf6,',
        'd4,e5,dxe5,Nc6,Nf3,f6,',
        'e4,e5,Nf3,Nc6,Bc4,Bc5,b4,d5,',
        'e4,e6,d4,d5,e5,c5,c3,Nc6,Nf3,Qb6,Bd3,cxd4,cxd4,Bd7,Nc3,Nxd4,Nxd4,Qxd4,',
        'e4,e6,d4,d5,Nc3,Nf6,Bg5,Be7,e5,Nfd7,h4,Bxg5,hxg5,Qxg5,',
        'e4,e6,d4,d5,Nc3,Bb4,Ne2,dxe4,a3,Bxc3,',
        'e4,e6,d4,d5,Nc3,Bb4,Ne2,dxe4,a3,Bxc3,Nxc3,Nc6,',
        'e4,e6,d4,d5,Nc3,Bb4,Ne2,dxe4,a3,Be7,Nxe4,Nf6,N2g3,0-0,Be2,Nc6,',
        'e4,e5,Nf3,Nc6,Bc4,Bc5,Bxf7,Kxf7,',
        'd4,Nf6,c4,c5,d5,b5,',
        'd4,Nf6,c4,g6,Nc3,d5,Bf4,Bg7,e3,0-0,',
        'd4,Nf6,c4,e6,Nf3,c5,d5,b5,',
        'd4,Nf6,c4,g6,d5,b5,',
        'e4,e5,Nf3,Nc6,Bc4,Nd4,',
        'e4,e5,Nf3,Nc6,Bc4,f5,',
        'e4,e5,Nf3,Nc6,Bc4,Bc5,d3,f5,',
        'e4,e5,f4,exf4,Bc4,b5,',
        'e4,e5,f4,exf4,Bc4,Qh4,Kf1,b5,',
        'e4,e5,f4,exf4,Nf3,Be7,',
        'e4,e5,f4,exf4,Nf3,f5,',
        'e4,e5,f4,exf4,Bc4,f5,',
        'e4,e5,f4,exf4,Nf3,g5,d4,g4,',
        'e4,e5,f4,Nc6,Nf3,f5,',
        'e4,e5,f4,d5,exd5,Bc5,',
        'e4,e5,f4,Bc5,Nf3,d6,c3,f5,',
        'e4,e5,f4,Bc5,Nf3,g5,',
        'e4,e5,Nf3,f5,Nxe5,Nf6,Bc4,fxe4,Nf7,Qe7,Nxh8,d5,',
        'e4,e5,Nf3,f5,Bc4,b5,',
        'e4,Nc6,d4,e5,dxe5,d6,',
        'e4,Nc6,d4,d5,Nc3,e5,',
        'e4,b6,d4,c5,dxc5,Nc6,',
        'e4,b6,d4,Bb7,Bd3,f5,',
        'e4,b6,d4,Bb7,f3,e5,',
        'e4,e5,Nf3,Nf6,Bc4,Nxe4,Nc3,Nxc3,dxc3,f6,',
        'e4,e5,Nf3,Nf6,Nxe5,Nc6,',
        'e4,e5,Nf3,Nf6,Nxe5,Nxe4,Qe2,Qe7,Qxe4,d6,',
        'e4,e5,Nf3,d6,Bc4,f5,',
        'e4,e5,Nf3,d6,d4,f5,',
        'e4,e5,Nf3,Nc6,c3,f5,',
        'e4,e5,Nf3,Nc6,c3,Nf6,d4,Nxe4,d5,Bc5,',
        'd4,d5,c4,c5,cxd5,Nf6,',
        'Nf3,d5,c4,d4,b4,c5,',
        'e4,e5,Nf3,Nc6,Bb5,g5,',
        'e4,e5,Nf3,Nc6,Bb5,d5,',
        'e4,e5,Nf3,Nc6,Bb5,b6,',
        'e4,e5,Nf3,Nc6,Bb5,f5,',
        'e4,e5,Nf3,Nc6,Bb5,a6,Bxc6,dxc6,0-0,Bg4,h3,h5,',
        'e4,e5,Nf3,Nc6,Bb5,a6,Ba4,Nf6,0-0,Be7,Re1,b5,Bb3,0-0,c3,d5,',
        'e4,e5,Nf3,Nc6,Bb5,g6,c3,f5,',
        'e4,d5,exd5,e6,dxe6,Bxe6,',
        'e4,d5,exd5,Nf6,c4,e6,',
        'e4,d5,exd5,Nf6,d4,Bg4,',
        'e4,d5,exd5,Nf6,d4,c6,dxc6,e5,',
        'e4,c5,Nf3,Nf6,e5,Nd5,Nc3,e6,Nxd5,exd5,d4,Nc6,',
        'e4,c5,Nf3,e6,d4,cxd4,Nxd4,Nc6,Nb5,d6,c4,Nf6,N1c3,a6,Na3,d5,',
        'e4,c5,Nf3,d6,d4,cxd4,Nxd4,Nf6,Nc3,a6,Bg5,e6,f4,Qb6,Qd2,Qxb2,',
        'd4,d5,c4,c6,Nc3,e5,',
        'Na3,e5,Nc4,Nc6,e4,f5,',
        'd4,d5,c4,e6,Nc3,c5,cxd5,exd5,dxc5,d4,Na4,b5,',
        'd4,d5,c4,e6,Nc3,c5,cxd5,cxd4,',
        'e4,e5,Nf3,Nc6,Bc4,Nf6,Ng5,d5,exd5,Nxd5,Nxf7,Kxf7,',
        'e4,e5,Nf3,Nc6,Bc4,Nf6,Ng5,Nxe4,',
        'e4,e5,Nf3,Nc6,Bc4,Nf6,Ng5,Bc5,',
        'e4,e5,Nf3,Nc6,Bc4,Nf6,Ng5,d5,exd5,b5,',
        'e4,e5,Nf3,Nc6,Bc4,Nf6,Ng5,d5,exd5,Na5,',
        'e4,e5,Nc3,Nf6,Bc4,Nxe4,Qh5,Nd6,Bb3,Nc6,Nb5,g6,Qf3,f5,Qd5,Qe7,Nxc7,Kd8,nxa8,b6,',
        'e4,e5,Nc3,Nc6,f4,Bc5,fxe5,d6,',
    ]

    //gambits for black
    let black = [
        'c4,nf6,d4,e5,dxe5,ng4,qd4,d6,exd6,nc6,qd1,bxd6,ng3,nxf2,kxf2,bg3,',
        'c4,nf6,d4,e5,dxe5,ng4,qd4,d6,exd6,nc6,qd1,bxd6,ng3,nxf2,qb3,nxh1,qe3,be6,c5,bxh2,nxh2,qh4,',
        'd4,d5,c4,e5,dxe5,d4,e3,bb4,bd2,dxe3,bxd4,exf2,ke2,fxg1=n,rxg1,bg4,', //albin counter gambit
        'd4,d5,c4,e5,dxe5,d4,nf3,nc6,e3,bb4,bd2,dxe3,bxd4,exf2,ke2,qxd1,', //albin counter gambit declined
        'd4,e5,dxe5,nc6,nf3,qe7,bf4,qb4,bd2,qxb2,bc3,bb4,qd2,bxc3,qxc3,qc1,',//englund gambit
        'd4,e5,dxe5,bc5,nf3,d6,exd6,ne7,dxe7,bxf2,',
        'e4,e5,nf3,f5,nxe5,bc5,exf5,bxf2,kxf2,qh4,', //latvian gambit
        'e4,e5,nf3,f5,nxe5,bc5,qh5,g6,nxg6,nf6,qh4,rg1,nf4,rg4,', //latvian gambit fail
        'e4,e5,nf3,f5,exf5,e4,nd4,qf3,c3,',
        'e4,e5,nf3,nf6,nxe5,nc6,nxc6,dxe6,d3,bc5,be2,h5,o-o,ng4,h3,qd6,g3,qxg3,', //stafford gambit
        'e4,e5,nf3,nc6,bc4,nd4,nxe5,qg5,nxf7,qxg2,rf1,qxe4,be2,nf3,', //blackburn shilling gambit
        'e4,e5,bc4,nc6,nf3,nd4,nxe5,qg5,nxf7,qxg2,rf1,qxe4,be2,nf3,',
        'e4,e5,qh5,nc6,bc4,g6,qf3,f5,exf5,nd4,qd5,qe7,na3,nf6,qa5,bxd5,b6,qa4,bd7,qc4,nxd5,qxd5,bc6', //Wayward Queen
        'e4,e5,bc4,nc6,qh5,g6,qf3,f5,exf5,nd4,qd5,qe7,na3,nf6,qa5,bxd5,b6,qa4,bd7,qc4,nxd5,qxd5,bc6',
        'e4,e5,qh5,nc6,bc4,g6,qf3,f5,exf5,nd4,qd3,d5,fxg6,dxc4,',
        'e4,e5,bc4,nc6,qh5,g6,qf3,f5,exf5,nd4,qd3,d5,fxg6,dxc4,',
        'e4,e5,qh5,nc6,bc4,g6,qf3,f5,exf5,nd4,qe4,qe7,fxg6,nf6,qd3,d5,bb3,bf5,',
        'e4,e5,bc4,nc6,qh5,g6,qf3,f5,exf5,nd4,qe4,qe7,fxg6,nf6,qd3,d5,bb3,bf5,',
        'e4,e5,qh5,nc6,bc4,g6,qf3,f5,qb3,nd4,bf7,ke7,qd5,nxc2,kd1,nf6,qc5,kxf7,',
        'e4,e5,bc4,nc6,qh5,g6,qf3,f5,qb3,nd4,bf7,ke7,qd5,nxc2,kd1,nf6,qc5,kxf7,',
        'e4,e5,qh5,nc6,bc4,g6,qf3,f5,qb3,nd4,bf7,ke7,qc4,bd5,c6,qc5,ke8',
        'e4,e5,bc4,nc6,qh5,g6,qf3,f5,qb3,nd4,bf7,ke7,qc4,bd5,c6,qc5,ke8',
        'e4,e5,qh5,nc6,bc4,g6,qf3,f5,ne2,nf6,d3,f4,o-o,d5,exd5,bg4,',
        'e4,e5,bc4,nc6,qh5,g6,qf3,f5,ne2,nf6,d3,f4,o-o,d5,exd5,bg4,',
        'e4,e5,qh5,nc6,bc4,g6,qf3,f5,ne2,nf6,d3,f4,o-o,d5,bxd5,bg4,',
        'e4,e5,bc4,nc6,qh5,g6,qf3,f5,ne2,nf6,d3,f4,o-o,d5,bxd5,bg4,',
        'e4,e5,qh5,nc6,bc4,g6,qf3,nf6,qb3,nd4,bxf7,ke7,qc4,b5,',
        'e4,e5,bc4,nc6,qh5,g6,qf3,nf6,qb3,nd4,bxf7,ke7,qc4,b5,',
        'e4,e5,qh5,nc6,bc4,g6,qf3,nf6,g4,d5,nd4,',
        'e4,e5,bc4,nc6,qh5,g6,qf3,nf6,g4,d5,nd4,',
        'e4,e5,qh5,nc6,bc4,g6,qf3,nf6,qb3,nd4,qc3,d5,exd5,bf5,d3,bb4,qxb4,nxc2,',
        'e4,e5,bc4,nc6,qh5,g6,qf3,nf6,qb3,nd4,qc3,d5,exd5,bf5,d3,bb4,qxb4,nxc2,',
        'e4,e5,qh5,nc6,bc4,g6,qf3,nf6,qb3,nd4,qc3,d5,bxd5,nxd5,exd5,bf5,na3,bxa3,bxa3,nxc2,',
        'e4,e5,bc4,nc6,qh5,g6,qf3,nf6,qb3,nd4,qc3,d5,bxd5,nxd5,exd5,bf5,na3,bxa3,bxa3,nxc2,',
        'e4,e5,nf3,nc6,bb5,f5,exf5,e4,ng1,qg5,', //yanish gambit
        'e4,e5,nf3,nc6,bb5,f5,d3,fxe4,dxe4,nf6',
        'e4,e5,nf3,nc6,bb5,f5,bxc6,dxc6,nxe5,qd4,qh5,g6,nxg6,hxg6,qxh8,qxh8',
        'e4,e5,nf3,nc6,bb5,f5,bxc6,dxc6,nxe5,qd4,qh5,g6,nxg6,hxg6,qxg6,kd8,exf5,ne7',
        'e4,e5,nf3,nc6,bb5,f5,bxc6,dxc6,d3,fxe4,nxd5,nf6,',
        'e4,e5,nf3,nc6,bb5,f5,exf5,e4,qe2,qe7,ng1,nd4,qc4,qe5,ba4,b5',
        'e4,e5,nf3,nc6,bb5,f5,exf5,e4,qe2,qe7,ng1,nd4,qc4,qe5,a4,a6',
        'e4,e5,d4,exd4,qxd4,nc6,qa4,bc5,bb5,qh5,nh3,nd4,',

        //From Ian
        'e4,Nf6,e5,Nd5,c4,Nb6,d4,d6,Nf3,Bg4,Be2,dxe5,Nxe5,',
        'e4,Nf6,Bc4,Nxe4,Bxf7,',
        'e4,Nf6,Nc3,d5,e5,Nfd7,e6,',
        'Nh3,d5,g3,e5,f4,Bxh3,Bxh3,exf4,0-0,',
        'Nh3,d5,g3,e5,f4,Bxh3,Bxh3,exf4,0-0,fxg3,hxg3,',
        'g3,e5,Bg2,d5,b4,',
        'f4,e5,fxe5,d6,exd6,Bxd6,Nf3,Nh6,d4,',
        'f4,e5,d4,exd4,Nf3,c5,c3,',
        'f4,f5,e4,fxe4,Nc3,Nf6,g4,',
        'f4,d5,b3,Nf6,Bb2,d4,Nf3,c5,e3,',
        'f4,d5,e4,dxe4,Nc3,Nf6,Nge2,',
        'f4,f5,e4,fxe4,Nc3,Nf6,g4,',
        'e4,e5,Bc4,Bc5,b4,Bxb4,f4,exf4,Nf3,Be7,d4,Bh4,g3,fxg3,0-0,gxh2,Kh1,',
        'e4,e5,Bc4,Bc5,d4,',
        'e4,e5,Bc4,Bc5,Qe2,Nf6,d3,Nc6,c3,Ne7,f4,',
        'e4,e5,Bc4,Bc5,b4,Bxb4,f4,',
        'e4,e5,Bc4,Bc5,Nf3,d6,c3,Qe7,d4,',
        'e4,e5,Bc4,Bc5,b4,',
        'e4,e5,Bc4,Nf6,Nf3,Nxe4,Nc3,',
        'e4,e5,Bc4,Nf6,f4,',
        'e4,e5,Bc4,Nf6,d4,',
        'e4,e5,Bc4,Nf6,d4,exd4,Nf3,',
        'd4,d5,e4,dxe4,f3,',
        'd4,d5,e4,dxe4,Nc3,Nf6,f3,',
        'd4,d5,Nc3,Nf6,e4,dxe4,f3,',
        'd4,d5,e4,dxe4,Nc3,Nf6,f3,exf3,Qxf3,',
        'd4,d5,Nc3,Nf6,e4,Nxe4,Nxe4,dxe4,Bc4,',
        'd4,d5,e4,dxe4,Nc3,Nf6,f3,exf3,Nxf3,e6,Bg5,Be7,Bd3,Nc6,0-0,Nxd4,Kh1,',
        'e4,c6,Bc4,d5,Bb3,',
        'e4,c6,c4,d5,cxd5,cxd5,Qb3,',
        'e4,c6,d4,d5,f3,dxe4,fxe4,e5,Nf3,exd4,Bc4,',
        'e4,c6,d4,d5,e5,Bf5,h4,h5,Bg5,Qb6,Bd3,Bxd3,Qxd3,Qxb2,e6,',
        'e4,c6,d4,d5,Nc3,dxe4,Nxe4,Nf6,Bd3,',
        'e4,c6,d4,d5,Nc3,dxe4,f3,',
        'e4,e5,d4,exd4,c3,',
        'e4,e5,d4,exd4,f4,',
        'd4,f5,h3,Nf6,g4,',
        'd4,f5,Nc3,d5,e4,',
        'd4,f5,Qd3,e6,g4,',
        'd4,f5,Qd3,g6,g4,',
        'd4,f5,Qd3,d6,g4,',
        'd4,f5,Qd3,d5,g4,',
        'd4,f5,Nc3,Nf6,g4,',
        'd4,f5,e4,fxe4,Nc3,Nf6,Bg5,c6,f3,',
        'd4,f5,e4,fxe4,Nc3,Nf6,Bg5,g6,f3,',
        'd4,f5,c4,e6,e4,',
        'c4,f5,Nc3,Nf6,e4,',
        'c4,d5,b3,dxc4,bxc4,Qd4,Nc3,',
        'e4,e5,Nf3,Nc6,Bc4,Bc5,b4,',
        'e4,e5,Nf3,Nc6,Nc3,Nf6,d4,exd4,Nd5,',
        'e4,e5,Nf3,Nc6,Nc3,Nf6,Nxe5,',
        'e4,e6,d4,d5,Be3,',
        'e4,e6,c4,d5,cxd5,exd5,Qb3,',
        'e4,e6,d4,d5,c4,',
        'e4,e6,Nf3,d5,e5,c5,b4,',
        'e4,e6,f4,d5,Nf3,',
        'e4,e6,b3,d5,Bb2,',
        'e4,e6,d4,d5,Nf3,',
        'e4,e6,d4,d5,e5,c5,Qg4,',
        'e4,e6,d4,d5,Nc3,Bb4,Ne2,',
        'e4,e6,d4,d5,Nc3,Bb4,Bd2,',
        'e4,e5,Nf3,Nc6,Bc4,Bc5,0-0,Nf6,d4,',
        'e4,e5,Nf3,Nc6,Bc4,Bc5,d4,',
        'e4,e5,Nf3,Nc6,Bc4,Bc5,c3,Nf6,0-0,',
        'e4,e5,Nf3,Nc6,Bc4,Bc5,c3,Nf6,d4,exd4,cxd4,Bb4,Nc3,Nxe4,0-0,Bxc3,d5,',
        'e4,e5,Nf3,Nc6,Bc4,Nf6,d4,exd4,0-0,Nxe4,Nc3,',
        'e4,e5,f4,exf4,Nf3,g5,h4,g4,Ng5,',
        'e4,e5,f4,exf4,Nf3,g5,Bc4,g4,h4,',
        'e4,e5,f4,exf4,Nf3,Be7,Bc4,Bh4,g3,fxg3,0-0,gxh2,Kh1,',
        'e4,e5,f4,exf4,Bc4,',
        'e4,e5,f4,exf4,Nf3,g5,h4,g4,Ng5,h6,Nxf7,Kxf7,Nc3,',
        'e4,e5,f4,exf4,Qf3,',
        'e4,e5,f4,exf4,Qe2,',
        'e4,e5,f4,exf4,Nf3,g5,Bc4,g4,0-0,gxf3,Qxf3,Qf6,e5,Qxe5,Bxf7,',
        'e4,e5,f4,exf4,g3,',
        'e4,e5,f4,exf4,Nf3,g5,Bc4,g4,d4,',
        'e4,e5,f4,exf4,Nf3,g5,Bc4,Bg7,0-0,',
        'e4,e5,f4,exf4,Nc3,',
        'e4,e5,f4,exf4,Nf3,g5,h4,g4,Ne5,',
        'e4,e5,f4,exf4,Nf3,g5,Bc4,g4,Nc3,',
        'e4,e5,f4,exf4,Nf3,g5,Bc4,g4,0-0,',
        'e4,e5,f4,exf4,b3,',
        'e4,e5,f4,exf4,Ne2,',
        'e4,e5,f4,exf4,Nf3,g5,Bc4,Bg7,h4,',
        'e4,e5,f4,exf4,Nf3,g5,Bc4,',
        'e4,e5,f4,exf4,Nf3,g5,Nc3,',
        'e4,e5,f4,exf4,Nf3,g5,h4,g4,Ne5,Nf6,Bc4,d5,exd5,Bd6,0-0,',
        'e4,e5,f4,exf4,Nf3,g5,Bc4,g4,Ne5,',
        'e4,e5,f4,exf4,Bb5,',
        'e4,e5,f4,exf4,Bd3,',
        'e4,e5,f4,exf4,Nf3,g5,d4,g4,Ne5,',
        'e4,e5,f4,exf4,h4,',
        'e4,e5,f4,exf4,Be2,',
        'e4,e5,f4,exf4,Nf3,g5,Bc4,g4,0-0,gxf3,Qxf3,Qf6,e5,Qxe5,Bxf7,Kxf7,d4,Qxd4,1Be3,',
        'e4,e5,f4,exf4,Kf2,',
        'e4,e5,f4,exf4,d4,',
        'e4,e5,f4,exf4,Nf3,g5,Bc4,g4,Bxf7,',
        'e4,e5,f4,d5,exd5,e4,d3,Nf6,dxe4,Nxe4,Qe2,',
        'e4,e5,Nf3,Nc6,Nxe5,Nxe5,d4,',
        'e4,e5,Nf3,f5,g4,',
        'e4,Nc6,Nf3,f5,e5,d6,d4,dxe5,d5,',
        'd4,c5,Nf3,cxd4,b4,',
        'e4,b6,d4,Bb7,Nf3,',
        'e4,e5,Nf3,Nf6,Nxe5,d6,Nxf7,',
        'e4,e5,Nf3,Nf6,d4,exd4,Bc4,',
        'e4,e5,Nf3,d6,d4,Nf6,Ng5,h6,Nxf7,',
        'e4,e5,Nf3,Nc6,c3,Nf6,Bc4,',
        'Nf3,f5,d3,Nf6,e4,',
        'Nf3,d5,c4,d4,e3,c5,b4,',
        'e4,e5,Nf3,Nc6,Bb5,a6,Ba4,Nf6,0-0,Nxe4,d4,b5,Bb3,d5,c4,',
        'e4,e5,Nf3,Nc6,Bb5,a6,Ba4,Nf6,0-0,Nxe4,d4,b5,Bb3,d5,dxe5,Be6,Nbd2,Nc5,1c3,d4,1Ng5,',
        'e4,e5,Nf3,Nc6,Bb5,a6,Ba4,Nf6,0-0,Be7,d4,exd4,e5,Ne4,c3,',
        'e4,d5,exd5,Qxd5,Nc3,Qa5,b4,',
        'e4,e5,Nf3,Nc6,d4,exd4,c3,',
        'e4,e5,Nf3,Nc6,d4,exd4,Bb5,',
        'e4,e5,Nf3,Nc6,d4,exd4,Bc4,',
        'd4,d5,c4,e6,Nc3,c6,e4,dxe4,Nxe4,Bb4,Bd2,',
        'd4,d5,c4,e6,Nc3,Nf6,Nf3,c6,Bg5,',
        'd4,d5,c4,e6,Nc3,Nf6,Nf3,c6,Bg5,h6,Bh4,g5,Bg3,dxc4,e4,',
        'e4,c5,a3,Nc6,b4,',
        'e4,c5,a3,Ne6,b4,',
        'e4,c5,d4,cxd4,Nf3,e5,c3,',
        'e4,c5,d4,cxd4,Nf3,',
        'e4,c5,d4,cxd4,c3,',
        'e4,c5,Nf3,Nc6,b4,',
        'e4,c5,Nf3,Nc6,d4,cxd4,c3,',
        'e4,c5,Nf3,e6,d4,cxd4,Nxd4,Nf6,Nc3,Nc6,Be2,Bb4,0-0,',
        'e4,c5,Nf3,e6,b4,',
        'e4,c5,Nf3,d6,b4,',
        'e4,c5,Nf3,d6,Bb5,Bd7,Bxd7,Qxd7,0-0,Nc6,c3,Nf6,d4,',
        'e4,c5,Nf3,d6,d4,cxd4,Nxd4,Nf6,Bc4,',
        'e4,c5,Nf3,d6,d4,cxd4,Nxd4,Nf6,Nc3,g6,Be2,Bg7,Be3,Nc6,0-0,0-0,f4,Qb6,1e5,',
        'd4,d5,c4,c6,e4,',
        'd4,d5,c4,c6,Nf3,Nf6,Nc3,dxc4,e4,',
        'd4,d5,c4,c6,Nf3,Nf6,Nc3,dxc4,e4,b5,e5,',
        'b4,e5,Bb2,f6,e4,',
        'd4,d5,c4,e6,Nc3,c5,cxd5,exd5,e4,',
        'd4,Nf6,Nf3,e6,Bg5,c5,e4,',
        'e4,e5,Nf3,Nc6,Bc4,Nf6,Nc3,Nxe4,0-0,',
        'e4,e5,Nc3,Nc6,Bc4,Bc5,Qg4,Qf6,Nd5,',
        'e4,e5,Nc3,Nc6,d4,',
        'e4,e5,Nc3,Nc6,f4,exf4,Nf3,g5,h4,g4,Ng5,',
        'e4,e5,Nc3,Nc6,f4,exf4,Nf3,g5,Bc4,g4,0-0,',
        'e4,e5,Nc3,Nc6,f4,exf4,Nf3,g5,d4,g4,Bc4,',
        'e4,e5,Nc3,Nc6,f4,exf4,d4,',
        'e4,e5,Nc3,Nf6,Bc4,Nxe4,Qh5,Nd6,Bb3,Nc6,d4,',
        'e4,e5,Nc3,Nf6,f4,',
        'a4,e5,a5,d5,e3,f5,a6,',
    ]


    //Don't run in lobby
    if (window.location.href == 'https://lichess.org/'){
        return
    }


    //Add button
    var x = document.createElement('button');
    x.innerText = 'Gambits';
    x.classList.add('fbt');
    x.onclick = function(){
        var move_element = $('kwdb');

        var moves = '';
        for (let i=0;i<move_element.length;i++){
            moves += move_element[i].textContent+','
        }

        console.log(moves);


        var display = $('textarea')[0];
        //clear the previous moves
        display.innerHTML = '';
        let text = ''
        if ($('.cg-wrap')[0].classList[1] == 'orientation-white'){
            for (let i=0;i<white.length;i++){
                if (white[i].toLowerCase().includes(moves.toLowerCase().replaceAll('+',''))){
                    text += white[i].substring(moves.length) + '\n\n';
                }
            }
        } else {
            for (let i=0;i<white.length;i++){
                if (black[i].toLowerCase().includes(moves.toLowerCase().replaceAll('+',''))){
                    text += black[i].substring(moves.length) + '\n\n';
                }
            }
        }
        try{
            $('textarea')[0].value = text;
        } catch {

        }

    }
    $('div .ricons')[0].appendChild(x);


    // Select the element you want to monitor
    const targetElement = $('.time')[0]
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.target.textContent.substring(0,2) === '00' && mutation.target.textContent.substring(3,5) === '01') {
                //Give them more time
                $('.moretime')[0].click()
            }
        }
    });
    const observerConfig = {
        childList: true,
        subtree: true
    };
    observer.observe(targetElement, observerConfig);

    const chatObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.target.children.length==3) {
                console.log(mutation.target);
                $("span[title='Good game']").click();
                $("span[title='Well played']").click();
                if($('.ruser-bottom.ruser.user-link')[0].children[3].tagName == "GOOD"){
                    send("WOO I win! Good game man, and don't feel bad about losing to me, I'm just too good ;)");
                } else {
                    send("Ah damnit I lost. Good game though, and good job. Well-deserved win for you!");
                }
            }
        }
    });
    setTimeout(function(){const chat = $('.mchat.mchat-optional')[0];console.log(chat.children.length);chatObserver.observe(chat, observerConfig);},1000);


    //Send message to chat
    function send(x) {
        var event = new KeyboardEvent('keydown', {
            key: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true,
        });
        $('.mchat__say')[0].value = x;
        var element = $('.mchat__say')[0];
        element.dispatchEvent(event);
    }

    //Say Hello, Good luck
    setTimeout(function(){$('span[title="Hello"]')[0].click();$('span[title="Good luck"]')[0].click();
                         send("Hello, "+$('a.text')[1].textContent+"! Good luck, I'll be using the Jerome gambit if I'm white. And I'll make sure you never run out of time.");
                         },500);


})();
