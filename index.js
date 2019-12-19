new Vue({
    el:"#app",
    data:{
        gameIsOn:true,
        gameStart:false,
        showhome:false,
        showdetails:false,
        names:['linas','urshala'],
        selectfrom:['Newton','Ellen','Einstien','pink floyd','luffy','rez','friends','love','hate','life'],
        arr1:[],
        arr2:[],
        selections:[],
        selectbox:true,
        showform:false,
        showform2:false,
        changedPlayerName:'',
        time:'',
        min:'',
        sec:'',
        ms:'',
        p1active:false,
        p2active:false,
        p1selection:'',
        p2selection:'',
        totalclick:0,
        p1array:[],
        p2array:[],
        p1points:0,
        p2points:0,
        p1turn:false,
        p2turn:false,
        toremove:[],
        winningScreen:false,
        winner:'',
        showchangename:true,
        notvalid:false,
        remainingBoxes:20,
        music:{},
        musicfile:'https://www.televisiontunes.com/uploads/audio/Game%20of%20Thrones.mp3',
        clicksoundsrc:'audio/click.mp3',
        GOT:true,
        sounds:['/audio/1.mp3','/audio/2.mp3','','','/audio/3.mp3','/audio/4.mp3','/audio/5.mp3','/audio/6.mp3','/audio/7.mp3','/audio/8.mp3'], 
        conversation:{},
        wrong:{},
        thatswrong:'audio/thatswrong.mp3',
        right:{},
        thatsright:'audio/thatsright.mp3',
        startaftergamefinish:false,
        // visible:true,
        list:[],
        bindingStyle:{
            'opacity':''
        },
        boxes:[],
        thisisdead:false,
        gameisdraw:false,
        playonemoretime:'audio/onemoretime.mp3',
        newAudio:{},
       /*  styleObject: {
            color: 'red',
            fontSize: '13px',
            opacity:0
        } */

    },
    methods:{
        form1(){
            this.showform = ! this.showform;
            this.clickaudio();
        },
        form2(){
            this.showform2 = ! this.showform2;
            this.clickaudio();
        },
        changeNamep1(){
            console.log(this.changedPlayerName);
            this.clickaudio();
            this.names[0]= this.changedPlayerName;
            this.showform=false;

            if(this.changedPlayerName.length==0){
                this.names[0]='linas';
            }

            this.changedPlayerName= '';
        },
        changeNamep2(){  
            console.log(this.changedPlayerName);
            this.clickaudio();
            this.names[1]= this.changedPlayerName;
            this.showform2=false;

            if(this.changedPlayerName.length==0){
                this.names[1]='urshala';
            }

            this.changedPlayerName= '';
        },
        startGame(){
            this.clickaudio();
            this.hideall();
            this.gameIsOn= false;
            this.gameStart = true;
            this.showhome=true;
            this.showdetails=true;
            this.p1turn=true;
            this.p1active=true;
            this.showchangename=false;
            this.gameisdraw=false;
            this.startTime();
            this.startms();
            // console.log('game started');
            // console.log(this.arr1);

            for(var i = 0 ; this.arr1.length < this.selectfrom.length ; i++){
                var random = this.selectfrom[Math.floor(Math.random()*this.selectfrom.length)];
                if(!this.arr1.includes(random)){
                    this.arr1.push(random);
                }
            }
            // console.log('array 1 is coming');
            // console.log(this.arr1);
            // console.log(this.arr2);
            for(var i=0 ; this.arr2.length < this.selectfrom.length ; i++){
                var random = this.selectfrom[Math.floor(Math.random()*this.selectfrom.length)];
                if(!this.arr2.includes(random)){
                    this.arr2.push(random);
                }
            }
            // console.log('array 2 is coming')
            // console.log(this.arr2);
            // console.log(this.selections);
            this.selections = [...this.arr1,...this.arr2];
            // console.log('selections are coming');
            // console.log(this.selections);
        },
        restartGame(){
            this.clickaudio();
            this.gameIsOn=true;
            this.arr1=[];
            this.arr2=[];
            this.selections=[];
            this.p1points=0;
            this.p2points=0;
            this.gameStart=false;
            this.p2turn=false;
            this.remainingBoxes=20;
            this.showdetails=true;
            this.selectbox=true;
            this.startGame();
        },
        currentTime(){
            var date = new Date();
            this.time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;  
        },
        home(){
            this.clickaudio();
            this.gameIsOn=true;
            this.gameStart=false;
            this.showhome=false;
            this.winningScreen=false;
            this.showdetails=false;
            this.showchangename=true;
            this.p1points=0;
            this.p2points=0;
            this.p1turn=false;
            this.p2turn=false;
        },
        startTime(){
            this.sec=0;
            this.min=0;
            setInterval(() => {
                this.sec += 1;
                if(this.sec>60){
                    this.min += 1;
                    this.sec=0;
                }
             }, 1000);
        },
        startms(){
            setInterval(() => {
                this.ms += 1;
                if(this.ms>99){
                    this.ms=0;
                }
            }, 50);
        },
        selected(index){
            this.clickaudio();
            this.makeitvisible(index);
            var clickedvalue=this.selections[index];
            this.totalclick +=1;
            if(this.p2active){
                    // console.log(`p2 is active.`);
                    if(this.selections[index]==' '){
                        this.gameStart=false;
                        this.thisisdead=true;
                        this.totalclick -= 1;
                        this.right.src='';
                        this.wrong.src='';
                    }
                    else{
                        
                    /* if(this.totalclick==2){
                        this.p2selection='';
                        this.totalclick=0;
                    } */

                    this.p1active=false;
                    this.p1selection='';
                    this.p2selection = clickedvalue;
                    this.toremove.push(index);
                    this.p2array.push(clickedvalue);

                    if(this.p2array.length==2){
                        if(this.p2array[0]!=this.p2array[1]){
                            this.wrong = new Audio();
                            this.wrong.src=this.thatswrong;
                            this.wrong.play();
                            // if both the selection are different
                            console.log('hiding stuffs');
                            this.hideAgain(this.toremove);
                        }
                    }

                    if(this.p2array[0]===this.p2array[1]){
                        // both the selections are same
                        if(this.validate()){
                            //if the player has cheated
                            console.log('not accepted.');
                            this.gameStart=false;
                            this.notvalid=true;
                            this.p2array.pop();
                            this.toremove.pop();
                            this.totalclick -= 1;
                        }else{
                            //finally accepted
                            console.log('it is accepted.');
                            this.rightaudio();
                            this.remainingBoxes -= 2;
                            this.p2points += 10;
                            this.removeitems(this.toremove);
                            this.hideforever(this.toremove);
                        }
                    }
                        
                    

                    this.gamefinish();
                    /* changing the turns */
                    if(this.totalclick==2){
                        // console.log('total click is 2 now');
                        this.totalclick=0;
                        this.p2array = [];
                        this.p2selection='';
                        this.p2turn=false;
                        this.clickedvalue='';
                        this.p1active=true;
                        this.p1turn=true;
                        this.p2active=false;
                        this.toremove=[];
                    }
                }   
            }  
            else{
                
                if(this.selections[index]==' '){
                    this.gameStart=false;
                    this.thisisdead=true;
                    this.totalclick -= 1;
                    this.right.src='';
                    this.wrong.src='';
                }
                else{
                    // this.totalclick +=1;

                    this.p2active=false;
                    this.p1selection=clickedvalue;
                    /* if(this.totalclick==2){
                        this.p1selection='';
                        this.totalclick=0;
                    } */
                    this.p1array.push(clickedvalue);
                    this.toremove.push(index);

                    if(this.p1array.length==2){
                        if(this.p1array[0]!=this.p1array[1]){
                            this.wrong = new Audio();
                            this.wrong.src=this.thatswrong;
                            this.wrong.play();
                            // if both the selection are different
                            // console.log('hiding stuffs');
                            this.hideAgain(this.toremove);
                        }
                    }

                    if(this.p1array[0]===this.p1array[1]){
                        if(this.validate()){
                            console.log('not accepted');
                            this.gameStart=false;
                            this.notvalid= true;
                            this.p1array.pop();
                            this.toremove.pop();
                            this.totalclick -= 1 ;
                        }else{
                            console.log('it is accepted.');
                            this.rightaudio();
                            this.remainingBoxes -=2;
                            this.p1points += 10;
                            this.removeitems(this.toremove);
                            this.hideforever(this.toremove);
                        }
                    }
                    
                    
                    this.gamefinish();
                    /* changing the turns */
                    if(this.totalclick==2){
                        // console.log('total click is 2 now');
                        // checking whether both selection are equal or not
                        // console.log('it never reached here.');
                        this.totalclick=0;
                        this.p1array=[];
                        this.p1selection='';
                        clickedvalue='';
                        this.p1turn=false;
                        this.p2active=true;
                        this.p2turn=true;
                        this.p1active=false;
                        this.toremove=[];
                    }
                }
            }
        },
        validate(){
            return this.toremove[0]===this.toremove[1];
        },
        removeitems(indexes){
            // console.log(this.toremove);
            Array.from(indexes).sort((a,b)=> b - a);
            // console.log(this.indexes);
            for(var i = 0; i<indexes.length ; i++){
                // console.log(`removing index ${this.toremove[i]}`);
                // console.log(this.selections);
                // this.selections.splice(this.toremove[i],1);
                this.selections[indexes[i]]= ' ';
                // console.log(this.selections);
                console.log(`removing${indexes[i]}`);
            }

        },
        showWinner(){
            var p1 = this.p1points;
            var p2 = this.p2points;

            if(p1==p2){
                this.gameisdraw=true;
                this.gameStart=false;
                this.selectbox=false;
                this.playonemoretimeaudio();
            }else{
                this.gameisdraw=false;
                this.gameStart=false;
                this.selectbox=false;
                this.winningScreen= true;

                if(p1>p2){
                    this.winner = this.names[0];
                }else{
                    this.winner= this.names[1];
                }
                
                this.startaftergamefinish=true;
                    
                
                this.conversations();
            }
        },
        backToGame(){
            this.clickaudio();
            this.gameStart=true;
            this.notvalid=false;
            this.thisisdead=false;
            // this.gameisdraw=false;
            // this.winningScreen=false;
        },
        gamefinish(){
            if(this.remainingBoxes == 0){
                this.showWinner();
            }
        },
        startmusic(){
            this.music = new Audio();
            this.music.src=this.musicfile;
            this.music.volume=0.23;
            console.log(this.music);
        },
        clickaudio(){
            var click= new Audio();
            click.src=this.clicksoundsrc;
            click.play();
        },
        turnoff(){
            this.GOT = !this.GOT;
            this.music.pause();
            console.log('music is off');
        },
        turnon(){
            this.startmusic();
            this.GOT = !this.GOT;
            // this.music.play();
            this.music.loop=true;
            this.music.autoplay=true;
            console.log('music is on');
        },
        conversations(){
            console.log('conversation should begin now.');
            var i = 0;
                setInterval(() => {       
                        if(i<this.sounds.length){
                            this.conversation= new Audio();
                            this.conversation.src=this.sounds[i];
                            this.conversation.autoplay=true;
                            console.log(this.conversation.src);
                            console.log(i);
                        }  
                        i++;
                    }, 2500);
            },
        rightaudio(){
            // that's right audio
            this.right=new Audio();
            this.right.src=this.thatsright;
            this.right.play();
        },
        playonemoretimeaudio(){
            this.newAudio= new Audio();
            this.newAudio.src= this.playonemoretime;
            setTimeout(()=>{
                this.newAudio.play();
            },1200);
        },
        hideall(){
            console.log('hiding all');
            this.bindingStyle.opacity=0.2;
            // console.log(this.bindingStyle);
        },
        makeitvisible(index){
            /* console.log('making the box visible');
            console.log('visible innertext'); */
            /* Array.from(boxes).forEach(element=>{
                console.log(element);
            }); */
            this.boxes = document.getElementsByClassName('box');
            // console.log(this.boxes);
            // Array.from(this.boxes)[index].style="background:black";

            this.list = document.getElementsByTagName('li');
            // console.log(this.list);
            Array.from(this.list)[index].style="opacity:1";

        },
        hideforever(toremove){
            /* console.log(toremove);
            console.log(this.list);
            console.log(this.boxes); */
            Array.from(toremove).forEach(element => {
                this.boxes[element].style="background:blue";
                this.list[element].style="opacity:0";
                });
        },
        hideAgain(toremove){
            // console.log(toremove);
            Array.from(toremove).forEach(el=>{
                this.boxes[el].style="background:green";
                this.list[el].style="opacity:0";
            });
        }
        },
        created(){
            setInterval(() => {
                this.currentTime();
            }, 100);
        }    
    })