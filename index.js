new Vue({
    el:"#app",
    data:{
        gameIsOn:true,
        gameStart:false,
        showhome:false,
        showdetails:false,
        names:['linas','urshala'],
        selectfrom:['apple','mango','family','dog','cat','black tea','friends','love','hate','money'],
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

       /*  styleObject: {
            color: 'red',
            fontSize: '13px',
            opacity:0
        } */

    },
    methods:{
        changeNamep1(){
            console.log(this.changedPlayerName);
            this.names[0]= this.changedPlayerName;
            this.changedPlayerName= '';
            this.showform=false;
        },
        changeNamep2(){  
            console.log(this.changedPlayerName);
            this.names[1]= this.changedPlayerName;
            this.changedPlayerName= '';
            this.showform2=false;
        },
        startGame(){
            this.gameIsOn= false;
            this.gameStart = true;
            this.showhome=true;
            this.showdetails=true;
            this.p1turn=true;
            this.p1active=true;
            this.showchangename=false;
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
            this.gameIsOn=true;
            this.arr1=[];
            this.arr2=[];
            this.selections=[];
            // this.p1active=false;
            this.p1points=0;
            this.p2points=0;
            this.gameStart=false;
            this.p2turn=false;
            this.startGame();
            // setTimeout(() => {
                // this.startTime();
                // this.startms();
            // }, 100);
        },
        currentTime(){
            var date = new Date();
            this.time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;  
        },
        home(){
            this.gameIsOn=true;
            this.gameStart=false;
            this.showhome=false;
            this.winningScreen=false;
            this.showdetails=false;
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
            // console.log(`the box no ${index} is visible now.`);
            // this.totalclick = 0;

            /* this.selections[index].style= {
                opacity:1
            } */

            var selected = '';
            var clickedvalue=this.selections[index];
            if(this.p2active){
                // console.log(`p2 is active.`);

                if(this.totalclick==2){
                    this.p2selection='';
                    this.totalclick=0;
                }

                this.p1active=false;
                this.p1selection='';
                this.totalclick +=1;
                this.p2selection = clickedvalue;
                this.toremove.push(index);
                // console.log(this.toremove);
                // console.log(`removing index : ${this.toremove}`);

                /* inserting the selected in the array */
                // selected = this.selections[index];

                this.p2array.push(clickedvalue);
                // console.log(this.p2array);

                if(this.p2array[0]===this.p2array[1]){
                    // console.log('increasing points');
                    if(this.validate()){
                        console.log('not accepted.');
                        this.gameStart=false;
                        this.notvalid=true;
                        this.p2array.pop();
                        this.toremove.pop();
                        this.totalclick=1;
                    }else{
                        console.log('it is accepted.');
                        this.p2points += 10;
                        this.removeitems();
                    }
                }
                if(this.selections.length == 0){
                    this.showWinner();
                }
                /* changing the turns */
                if(this.totalclick==2){
                    // console.log('total click is 2 now');
                    this.totalclick=0;
                    this.p2array = [];
                    this.p2selection='';
                    this.p2turn=false;
                    clickedvalue='';
                    this.p1active=true;
                    this.p1turn=true;
                    this.p2active=false;
                    this.toremove=[];
                }
            }  
            else{
                // console.log(`p1 is active.`);
                this.p2active=false;
                this.totalclick +=1;
                this.p1selection=clickedvalue;
            
                /* inserting the selected in the array */
                // selected = this.selections[index];
                this.p1array.push(clickedvalue);
                // console.log(this.p1array);
                this.toremove.push(index);
                // console.log(this.toremove);

                if(this.p1array[0]===this.p1array[1]){
                    // console.log('increasing points');
                    if(this.validate()){
                        console.log('not accepted');
                        this.gameStart=false;
                        this.notvalid= true;
                        this.p1array.pop();
                        this.toremove.pop();
                        this.totalclick = 1 ;
                    }else{
                        console.log('it is accepted.');
                        this.p1points += 10;
                        this.removeitems();
                    }
                }
                if(this.selections.length == 0){
                    this.showWinner();
                }
                /* changing the turns */
                if(this.totalclick==2){
                    console.log('total click is 2 now');
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
        },
        validate(){
            return this.toremove[0]===this.toremove[1];
        },
        removeitems(){
            // console.log(this.toremove);
            this.toremove.sort((a,b)=> b - a);
            console.log(this.toremove);
            for(var i = 0; i<this.toremove.length ; i++){
                console.log(`removing index ${this.toremove[i]}`);
                // console.log(this.selections);
                this.selections.splice(this.toremove[i],1);
                // console.log(this.selections);
            }
        },
        showWinner(){
            this.gameStart=false;
            this.selectbox=false;
            this.winningScreen= true;
            var p1 = this.p1points;
            var p2 = this.p2points;

            console.log(p1);
            console.log(p2);
            if(p1>p2){
                this.winner = this.names[0];
            }else{
                this.winner= this.names[1];
            }
        },
        backToGame(){
            this.notvalid=false;
            this.gameStart=true;
        }
        },
        created(){
            setInterval(() => {
                this.currentTime();
            }, 100);
        }
})