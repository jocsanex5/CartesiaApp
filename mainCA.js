(function(){ //Cartesian App -By jocsanex5

    //CARGA
        let contenedor = document.getElementById('contenedor_carga'), cont=0;;

        let carga = setInterval(function(){

            cont++;

            if( cont == 1 ){

                clearInterval(carga);
            }

            contenedor.style.visibility = 'hidden';
            contenedor.style.opacity = '0';

        }, 5000)
    

		//globales()
    let lienzo = document.getElementById('lienzo');
    	p = lienzo.getContext('2d');

    	let punto1 = {

    		x : document.getElementById('x1'),
    		y : document.getElementById('y1')
    	}

    	let punto2 = {

    		x : document.getElementById('x2'),
            y : document.getElementById('y2')
    	}

            punto1.x.onclick = function(){ punto1.x.style.border = '1px solid rgb(253, 255, 255)'; }
            punto1.y.onclick = function(){ punto1.y.style.border = '1px solid rgb(253, 255, 255)'; }
            punto2.x.onclick = function(){ punto2.x.style.border = '1px solid rgb(253, 255, 255)'; }
            punto2.y.onclick = function(){ punto2.y.style.border = '1px solid rgb(253, 255, 255)'; }

            //Definir rango
        let rang;

        document.getElementById('num').onclick = function(){ document.getElementById('num').style.border = '1px solid #000'; }

        let colors = ['rgb(255, 58, 58)', 'rgb(255, 58, 58)', 'rgb(255, 58, 58)', 'rgb(251, 255, 22)', 'rgb(255, 154, 22)'];

        let datos_vec = document.getElementById('datos_vec'),
            btn_limpiar = document.getElementById('btn_limpiar'),
            btn_def_num = document.getElementById('btn_def_num'),
            btn_graficar = document.getElementById('btn_graficar'),
            btnRas_si_no = document.getElementById('btnRas_si_no'),
            btnCuadrantes = document.getElementById('btnCua');

        //Var determinar si se dibuja rastro
        let Rastro = true;

        //ERROR
        let error = false;

        let error_pos = false;

        //Cantidad de vetores graficadps
        let cantVect=0;

    	//functions()
        class vector{

                constructor(x1, y1, x2, y2){

                    this.x1 = x1;
                    this.y1 = y1;

                    this.x2 = x2;
                    this.y2 = y2;
                }

            confirRang = () =>{

                let posiciones = [this.x1, this.y1, this.x2, this.y2], pos; //arrs posisciones

                    let rango = parseInt(document.getElementById('num').value);

                        if(  posiciones[0].value > rango || posiciones[0].value < (rango*-1) || posiciones[0].value == '' ){ //this.x1

                            error_pos = true;
                            pos = 0;

                        } else if( posiciones[1].value > rango || posiciones[1].value < (rango*-1) || posiciones[1].value == '' ){ //this.y1

                            error_pos = true;
                            pos = 1;

                        } else if( posiciones[2].value > rango || posiciones[2].value < (rango*-1) || posiciones[2].value == '' ){ //this.x2

                            error_pos = true;
                            pos = 2;

                        } else if( posiciones[3].value > rango || posiciones[3].value < (rango*-1) || posiciones[3].value == '' ){ //this.y2

                            error_pos = true;
                            pos = 3;

                        } else{

                            error_pos = false;
                        }

                    if( error_pos == true ){

                        for( let i=0; i<4; i++ ){

                            posiciones[i].style.border = '2px solid red'; 
                        }
                    }
                }

            graficar = (color) =>{

                cantVect++;

                let punt_x1 = parseInt(this.x1.value),
                    punt_x2 = parseInt(this.x2.value), 
                    punt_y1 = parseInt(this.y1.value), 
                    punt_y2 = parseInt(this.y2.value);


                const calcPuntos = () =>{
                                         //punto1
                    if( punt_x1 > 0 ){

                        punt_x1 = 250 + ( punt_x1 * rang); 
                    } 
    
                    else{

                        punt_x1 = 250 - (-punt_x1* rang); 
                    }


                    if( punt_y1 > 0 ){

                        punt_y1 = 250 - (punt_y1 * rang); 
                    } 

                    else{

                        punt_y1 = 250 + (-punt_y1 * rang); 
                    }

                                        //punto2
                    if( punt_x2 > 0 ){

                        punt_x2 = 250 + (punt_x2 * rang); 
                    } 

                    else{

                        punt_x2 = 250 - (-punt_x2 * rang); 
                    }


                    if( punt_y2 > 0 ){

                        punt_y2 = 250 - (punt_y2 * rang); 
                    } 

                    else{

                        punt_y2 = 250 + (-punt_y2 * rang);
                    }
                }

            //Establecer los rastros de los puntos  


            const rastroDePuntos = (x, y, posX, posY) =>{

                if( x > 0 && y > 0 ){

                    for( let i=245; i-5>posY; i-=7 ){ //y

                        p.beginPath();
                            p.lineWidth = 3;
                            p.strokeStyle = 'rgb(199, 228, 225)';
                                p.moveTo(posX, i);
                                p.lineTo(posX, i-5);
                        p.stroke();
                    }

                    for( let i=273; i+5<posX; i+=7 ){ //x

                        p.beginPath();
                            p.lineWidth = 3;
                            p.strokeStyle = 'rgb(199, 228, 225)';
                                p.moveTo(i, posY);
                                p.lineTo(i-5, posY);
                        p.stroke();
                    }
                }

                else if( x < 0 && y < 0 ){
                    
                    for( let i=275; i+5<posY; i+=7 ){ //-y

                        p.beginPath();
                            p.lineWidth = 3;
                            p.strokeStyle = 'rgb(199, 228, 225)';
                                p.moveTo(posX, i);
                                p.lineTo(posX, i-5);
                        p.stroke();
                    } 

                    for( let i=235; i-5>posX; i-=7 ){ //-x

                        p.beginPath();
                            p.lineWidth = 3;
                            p.strokeStyle = 'rgb(199, 228, 225)';
                                p.moveTo(i, posY);
                                p.lineTo(i+5, posY);
                        p.stroke();
                    } 
                }

                else if( x < 0 && y > 0 ){

                    for( let i=245; i-5>posY; i-=7 ){ //y

                        p.beginPath();
                            p.lineWidth = 3;
                            p.strokeStyle = 'rgb(199, 228, 225)';
                                p.moveTo(posX, i);
                                p.lineTo(posX, i-5);
                        p.stroke();
                    }

                    for( let i=235; i-5>posX; i-=7 ){ //-x

                        p.beginPath();
                            p.lineWidth = 3;
                            p.strokeStyle = 'rgb(199, 228, 225)';
                                p.moveTo(i, posY);
                                p.lineTo(i+5, posY);
                        p.stroke();
                    } 
                }

                else if( x > 0 && y < 0 ){

                    for( let i=275; i+5<posY; i+=7 ){ //-y

                        p.beginPath();
                            p.lineWidth = 3;
                            p.strokeStyle = 'rgb(199, 228, 225)';
                                p.moveTo(posX, i);
                                p.lineTo(posX, i-5);
                        p.stroke();
                    } 

                    for( let i=273; i+5<posX; i+=7 ){ //x

                        p.beginPath();
                            p.lineWidth = 3;
                            p.strokeStyle = 'rgb(199, 228, 225)';
                                p.moveTo(i, posY);
                                p.lineTo(i-5, posY);
                        p.stroke();
                    }
                }
            }
            
            calcPuntos();

                //Dibujar el rastro de donde se ubican los puntos
                if( Rastro == true ){

                    rastroDePuntos( this.x1.value, this.y1.value, punt_x1, punt_y1 ); 
                    rastroDePuntos( this.x2.value, this.y2.value, punt_x2, punt_y2 ); 
                }

                        //----Dibujar el vector en el plano cartesiano----
                p.beginPath();
                    p.moveTo(punt_x1, punt_y1);  
                    p.lineTo(punt_x2, punt_y2);
                    p.strokeStyle = `${color}`;
                    p.lineWidth = 4;
                p.stroke();

                p.beginPath(); //----puntos----
                    p.arc(punt_x1, punt_y1, 5, 0, Math.PI*2, false);
                    p.arc(punt_x2, punt_y2, 5, 0, Math.PI*2, false);
                p.fill();
            }
        }

            const def_ejes = () =>{

                rang = parseFloat(document.getElementById('num').value);

                if( rang > 11  || rang <= 0){

                    error = true; 

                } else{

                    error = false;
                }

                    rang = 230/rang;
            }

    		const dibujarPlano = () =>{

    				//eje X
    			p.beginPath();
                    p.lineWidth = 3;
                    strokeStyle = '#000';
        				p.moveTo(0, 250);
        				p.lineTo(500, 250);
    			p.stroke();

                    for( let i=250-rang; i>0; i-=rang ){

                            p.beginPath();
                            p.moveTo(i, 243);
                            p.lineTo(i, 258);
                            p.lineWidth = 3;
                        p.stroke();
                    }

                    for( let i=250+rang; i<=500; i+=rang ){

                            p.beginPath();
                            p.moveTo(i, 243);
                            p.lineTo(i, 258);
                            p.lineWidth = 3;
                        p.stroke();
                    }

                        //nums positivos

                        let contposx = 0;

                        for( let i=250+rang; i<=500; i+=rang ){

                            contposx++;

                            p.beginPath();
                                p.font = "12px bool Arial";
                            p.fillText(contposx, i, 270);
                        }

                        //nums negativos

                        let contnegx = 0;

                        for( let i=250-rang; i>0; i-=rang ){ 

                            contnegx++;

                            p.beginPath();
                                p.font = "12px bool Arial";
                            p.fillText(`-${contnegx}`, i, 270);
                        }

                    p.beginPath();
                        p.lineWidth = 3;
                        p.strokeStyle = 'rgb(70, 226, 206)';
                                //--/\
                            p.moveTo(15, 250-20);
                            p.lineTo(0, 250);

                            p.moveTo(0,250);
                            p.lineTo(15, 250+20);

                            //------------------
                                //--\/
                            p.moveTo(500-15, 250-20);
                            p.lineTo(500, 250);

                            p.moveTo(500, 250);
                            p.lineTo(500-15, 250+20);

                    p.stroke();

    				//eje Y
    			p.beginPath();
                    p.lineWidth = 3;
                    p.strokeStyle = '#000';
        				p.moveTo(250, 0);
        				p.lineTo(250, 600);
    			p.stroke();

                        //----------------------------
                    for( let i=250-rang; i>0; i-=rang ){

                        p.beginPath();
                            p.moveTo(243, i);
                            p.lineTo(258, i);
                            p.lineWidth = 4;
                        p.stroke();
                    }

                    for( let i=250+rang; i<=500; i+=rang ){

                        p.beginPath();
                            p.moveTo(243, i);
                            p.lineTo(258, i);
                            p.lineWidth = 3;
                        p.stroke();
                    }

                    //nums positivos

                    let contposy = 0;

                        for( let i=250-rang; i>0; i-=rang ){

                            contposy++;

                            p.beginPath();
                                p.font = "12px bool Arial";
                            p.fillText(`${contposy}`,260, i+2);
                        }

                    //nums negativos

                    let contnegy = 0;   

                        for( let i=250+rang; i<=500; i+=rang ){

                            contnegy++;

                            p.beginPath();
                                p.font = "12px bool Arial";
                            p.fillText(`-${contnegy}`, 260, i+2);
                        }

                p.beginPath();
                    p.lineWidth = 3;
                    p.strokeStyle = 'rgb(255, 20, 177)';

                        //--/\
                        p.moveTo(230, 15);
                        p.lineTo(250, 0);

                        p.moveTo(250,0);
                        p.lineTo(270, 15);

                    //---------------------
                        //--\/
                        p.moveTo(230, 500-15);
                        p.lineTo(250, 500);

                        p.moveTo(250, 500);
                        p.lineTo(270, 500-15);

                p.stroke();
    		}

            const sectoresDelPlano = () =>{

                p.beginPath();
                    p.font = '40px bool Arial, Helvetica, sans-serif';
                    p.fillText('I', 400, 100);    
                    p.fillText('II', 100, 100);       
                    p.fillText('III', 100, 400);  
                    p.fillText('IV', 400, 400);  
            }

            //---btn Limpiar el lienzo

            let ancho = 500, alto = 500;

            const limpiar = () =>{

                lienzo.width = ancho;
                lienzo.height = alto;
            }

            //generar color aleatoreo
            const numColor = () =>{

                let color = Math.floor(Math.random() * colors.length + 1);

                return parseInt(color);
            }

            //Alertas o mensajes de cartesian app
            const msg = (img, tittle, content, typeMsg) =>{

                switch(typeMsg){

                    case 'msg': //Alertas normales de informacion

                        document.getElementById('msg').className = 'msg_visible'; //mostrar visibilidad de msg

                            //Imagen 
                            document.querySelector('#msg div:nth-child(2) img').src = `recursos/${img}.png`; 

                                //Titulo
                                document.querySelector('#msg div:nth-child(3)').innerHTML = `${tittle}`;

                            //Contenido de mensaje
                            document.querySelector('#msg div:nth-child(4)').innerHTML = `${content}`;


                    //Btn quitar msg
                    document.getElementById('btnNo').onclick = function(){

                        if( document.getElementById('msg').className == 'msg_noVisible' ){

                            document.getElementById('msg').className = 'msg_visible';

                        } else{

                            document.getElementById('msg').className = 'msg_noVisible';
                        }
                    }  

                        break;
 
                    case 'mgs_time': //Alertas con tiempo

                    document.getElementById('msg_time').className = 'msgTime_Visible';

                        //Imagen 
                        document.querySelector('#msg_time div:nth-child(1) img').src = `recursos/${img}.png`; 

                            //Titulo
                            document.querySelector('#msg_time div:nth-child(2)').innerHTML = `${tittle}`;

                        let cont=0, Time = setInterval(function(){

                            cont++;

                                if( cont==3 ){ clearInterval(Time); document.getElementById('msg_time').className = 'msgTime_noVisible'; }

                        }, 500);

                        break;
                }
            }

            //-----Opciones del header
            const CuadroOps = (opcion) =>{

                opciones.className = 'ops_V';

                let cuadro = document.getElementById('opciones'),
                    button = document.querySelector('#opciones #quitarOpcion'),
                    img = document.querySelector('#opciones img'),
                    h1 = document.querySelector('#opciones h1');

                    //F()
                    const btns = ( h2, p, img, titulo, texto, src)=>{
                        
                        h2.innerHTML = titulo;
                        p.innerHTML = texto;
                        img.src = `recursos/${src}.png`;
                    }


                switch(opcion){

                    case 'ayuda': 

                    let ayuda1 = document.createElement('div'),
                        ayuda2 = document.createElement('div');

                    ayuda1.style.padding = '10px';
                    ayuda1.style.border = '2px solid #000';
                    ayuda1.margin = '10px';

                    ayuda2.style.padding = '10px';
                    ayuda2.style.border = '2px solid #000';
                    ayuda2.style.margin = '10px';

                        let button1 = document.createElement('button'),
                            button2 = document.createElement('button'),
                            button3 = document.createElement('button');

                        button1.appendChild(document.createTextNode('1'));
                        button2.appendChild(document.createTextNode('2'));
                        button3.appendChild(document.createTextNode('3'));

                        
                        //-----------------\\
                        
                        let h2_1 = document.createElement('h2'),
                            p_1 = document.createElement('p'),
                            img_1 = document.createElement('img');

                            img_1.style.width = '200px';
                            img_1.style.height = '200px';
                            img_1.style.borderRadius = '10px';

                        btns(h2_1, p_1, img_1, 'Para graficar...', '', 

                                                    'AyuDA'); //scr
 
                        //buttons carrucel
                        button1.onclick = function(){

                            btns(h2_1, p_1, img_1, '1. Debes de elegir un rango', 

                                    'Elige un rango de lineas para el plano cartesiano el cual ' +
                                                'debe de estar entre 1-11',     

                                                    'ayuda_rango'); //scr
                        }

                        button2.onclick = function(){

                            btns(h2_1, p_1, img_1, '2. Define los puntos', 

                                'En el siguinte recuadro rellena los puntos del vector a graficar',

                                                    'ayuda_puntos'); //src
                        }

                        button3.onclick = function(){

                            btns(h2_1, p_1, img_1, '3. listo!!!',

                                'Observa como se grafica automaticamente el vector en el plano '+ 
                                        ' cartesiano, vamos sigamos dibujando vectores!!!',

                                                    'ayuda_plano'); //src
                        }

                            let titulo = 'Que es CartesianApp?',
                                contenido = 'Es una aplicacion web desarrollada con el proposito de ayudar ' +
                                            'a poder graficar vectores directamente en el plano cartesiano ' +
                                            'haciendolo de la manera mas simple posible para que cualquiera aprenda ' +
                                            'y pueda divertirse en su desarrollo de aprendisaje demostrando que el graficar '+
                                            'es una tarea censilla y facil de aprender!!!',
                                imgA2 = document.createElement('img');

                            imgA2.style.width = '200px';
                            imgA2.src = 'recursos/favicon.png';
                            imgA2.style.borderRadius = '10px';

                        ayuda2.appendChild(document.createElement('h2')).innerHTML = titulo;
                        ayuda2.appendChild(document.createElement('p')).innerHTML = contenido;
                        ayuda2.appendChild(imgA2);

                            cuadro.appendChild(ayuda2);

                        img.src = 'recursos/AyudaOPs.png';
                        h1.innerHTML = 'Necesitas Ayuda';

                        ayuda1.appendChild(h2_1);
                        ayuda1.appendChild(p_1);
                        ayuda1.appendChild(img_1);

                        ayuda1.appendChild(document.createElement('br'));

                        ayuda1.appendChild(button1);
                        ayuda1.appendChild(button2);
                        ayuda1.appendChild(button3);

                            cuadro.appendChild(ayuda1);

                        button.onclick = function(){

                            if( cuadro.className == 'ops_V' ){
        
                                cuadro.removeChild(ayuda1);
                                cuadro.removeChild(ayuda2);
                                cuadro.className = 'ops_NV';
                            }
                        }

                        break;
                    
                    case 'referencias':

                        let referencias = document.createElement('div');

                        referencias.style.padding = '10px';
                        referencias.style.border = '2px solid #000';

                        let h2R = document.createElement('h2'),
                            pR = document.createElement('p'),
                            imgR = document.createElement('img'),
                            link = document.createElement('a');

                        link.target = '_blank';

                        imgR.style.width = '200px';
                        imgR.style.height = '200px';
                        imgR.style.borderRadius = '10px';

                        let button1R = document.createElement('button'),
                            button2R = document.createElement('button'),
                            button3R = document.createElement('button');

                        button1R.appendChild(document.createTextNode('1'));
                        button2R.appendChild(document.createTextNode('2'));
                        button3R.appendChild(document.createTextNode('3'));


                        btns(h2R, pR, imgR, 'CircleGame',

                            'Imagina que eres un circulo; tus enemigos son los '+
                            'cuadrados y debes de evitarlos!!! tu principal objetivo ' +
                            'es ganar puntos con otro circulo, facil no, crees poder ganar? ',

                                            'cG'); 

                            link.href = 'https://jocsanex5.github.io/Circle_game/index.html';
                            link.innerHTML = 'https://jocsanex5.github.io/Circle_game/index.html';

                        button1R.onclick = function(){
                            btns(h2R, pR, imgR, 'CircleGame',

                                    'Imagina que eres un circulo; tus enemigos son los '+
                                'cuadrados y debes de evitarlos!!! tu principal objetivo ' +
                                'es ganar puntos con otro circulo, facil no, crees poder ganar?',

                                                'cG'); 

                            link.href = 'https://jocsanex5.github.io/Circle_game/index.html';
                            link.innerHTML = 'https://jocsanex5.github.io/Circle_game/index.html';
                        }

                        button2R.onclick = function(){
                            btns(h2R, pR, imgR, 'DADA',

                        'DADA, o dia actual del año; es una app web desarrollada para mostrar el ' +
                            'dia exacto de una fecha. Es decir un contador de dias!!!',

                                                'DADA'); 

                            link.href = 'https://jocsanex5.github.io/DADA/';
                            link.innerHTML = 'https://jocsanex5.github.io/DADA/';
                        }

                        button3R.onclick = function(){
                            btns(h2R, pR, imgR, 'AcorPi',

                        'Aqui en esta pagina web encontraras todo lo referente a los acordes en ' +
                            'piano para que aprendas a como formularlos y tocarlos en el piano!!!',

                                                'AcorPi'); 

                            link.href = 'https://jocsanex5.github.io/Acorpi/';
                            link.innerHTML = 'https://jocsanex5.github.io/Acorpi/';
                        }

                        img.src = 'recursos/referenciasOPs.png';
                        h1.innerHTML = 'Tambien puedes ver:';

                        referencias.appendChild(h2R);
                        referencias.appendChild(link);
                        referencias.appendChild(pR);
                        referencias.appendChild(imgR);

                        referencias.appendChild(document.createElement('br'));

                        referencias.appendChild(button1R);
                        referencias.appendChild(button2R);
                        referencias.appendChild(button3R);

                        cuadro.appendChild(referencias);

                        button.onclick = function(){

                            if( cuadro.className == 'ops_V' ){
        
                                cuadro.removeChild(referencias);
                                cuadro.className = 'ops_NV';
                            }
                        }
                        
                        break;
                        
                    case 'autor': 

                        let autor = document.createElement('div');

                        autor.style.padding = '10px';
                        autor.style.border = '2px solid #000';

                        let h2A = document.createElement('h2'),
                            pA = document.createElement('p'),
                            imgA = document.createElement('img');

                        imgA.style.width = '250px';
                        imgA.style.borderRadius = '10px';

                        btns(h2A, pA, imgA, 'CartesianApp',

                                'Creada y desarrollada por Jocsanex5; '+
                                'Mi correo para consultas o sugerencias ' +
                                '-jocsanex5@gmail.com',

                                            'logo'); 

                        img.src = 'recursos/autorOPs.png';
                        h1.innerHTML = 'Autor';

                        autor.appendChild(h2A);
                        autor.appendChild(pA);
                        autor.appendChild(imgA);

                        cuadro.appendChild(autor);

                        button.onclick = function(){

                            if( cuadro.className == 'ops_V' ){
        
                                cuadro.removeChild(autor);
                                cuadro.className = 'ops_NV';
                            }
                        }
                        
                        break;
                }
            } 


//-------------------------------Main CartesianApp-------------------------------

        const principal = () =>{ 

            const ops = () =>{ //Opciones del header para el usuario
                
                document.querySelector('#ayuda').onclick = function(){ CuadroOps('ayuda'); }   

                document.querySelector('#referencias').onclick = function(){ CuadroOps('referencias'); }   

                document.querySelector('#autor').onclick = function(){ CuadroOps('autor'); }
            }

            ops();

            let Vector = new vector(punto1.x, punto1.y, punto2.x, punto2.y); //inicializar un obj

            dibujarPlano();

            btn_def_num.onclick = function(){ 

                def_ejes();

                if( error == true ){

                    document.getElementById('num').style.border = '2px solid red';

                    msg('error', 'Error!!!', 'Rango fuera de los limites', 'msg');

                } else{

                    limpiar();  dibujarPlano(); 
                }      
            };

            //---------------------------------------------------------
            const inputsOnclick = (punto) =>{ //devover su estado a los input de las pos

                punto.style.border = '2px solid rgb(253, 255, 255)'; 
            }

            btn_graficar.onclick = function(){ 

                Vector.confirRang();

                if( error == true || error_pos == true ){

                    msg('error', 'Error en los puntos', 'Verifica el valor de los puntos del vector', 'msg');

                } else{

                    document.getElementById('msg').className = 'msg_noVisible';
                    datos_vec.className = 'datos_vec';
                    btn_limpiar.className = 'btn_limpiar';
                    btnRas_si_no.className = 'btnRas_si_no';   
                    btnCuadrantes.className = 'btnCua_noVisible';   
                    inputsOnclick(punto1.x);
                    inputsOnclick(punto1.y);
                    inputsOnclick(punto2.x);
                    inputsOnclick(punto2.y);
                    Vector.graficar(colors[numColor()]); 
                }

                if( document.getElementById('num').value == '' ){

                    msg('error', 'Define un rango', 'Ten en cuenta en definir un rango de lineas en el plano', 'msg');
                }
            };

            //-------------------------------------------------
            btn_limpiar.onclick = function(){ 

                limpiar(); dibujarPlano(); 
                    datos_vec.className = 'datos_vec';
                    btn_limpiar.className = 'btn_limpiar';
                    btnRas_si_no.className = 'btnRas_si_no';   
                    btnCuadrantes.className = 'btnCua_noVisible';   

                cont = 0;

                    msg('limpiar', 'limpiar plano cartesiano', 'Has borrado los vectores graficados', 'mgs_time');
            };

            //----------------------------------------------------
            document.getElementById('btn_herramientas').onclick = function(){

                if(datos_vec.className == 'datos_vec' && btn_limpiar.className == 'btn_limpiar' && btnRas_si_no.className == 'btnRas_si_no'){

                    datos_vec.className = 'datos_vec_visible';
                    btn_limpiar.className = 'btn_limpiar_visible';
                    btnRas_si_no.className = 'btnRas_si_noVisible';

                        btn_def_num.style.transform = 'rotate(180deg)';
                }

                else{

                    datos_vec.className = 'datos_vec';
                    btn_limpiar.className = 'btn_limpiar';
                    btnRas_si_no.className = 'btnRas_si_no';

                    btn_def_num.style.transform = 'rotate(-180deg)';
                }

                if( btnCuadrantes.className == 'btnCua_noVisible' ){

                    btnCuadrantes.className = 'btnCua_visible';

                } else{

                    btnCuadrantes.className = 'btnCua_noVisible';
                }
            }

            //-------------------------------------------------------
                let btnRastro = false;

            btnRas_si_no.onclick = function(){


                if( btnRastro == false ){

                    Rastro = false;
                    btnRastro = true;

                    limpiar();
                    dibujarPlano(); 
                    def_ejes();   

                    document.getElementById('img_btnRastro').src = 'recursos/img_btn_rastroNO.png';

                   msg('img_btn_rastroNO', 'Rastro desactivado','Has desactivado el rastro de puntos', 'mgs_time');
                }

                else{

                    Rastro = true;
                    btnRastro = false;

                    limpiar();
                    dibujarPlano(); 
                    def_ejes();  

                    document.getElementById('img_btnRastro').src = 'recursos/img_btn_rastroSI.png'; 

                    msg('img_btn_rastroSI', 'Rastro activado','Has activado el rastro de puntos', 'mgs_time');
                }
            }

            //----------------------------------------------------
            document.querySelector('#btnCua').onclick = function(){

                cont = 0;

                let time = setInterval(function(){

                    sectoresDelPlano();
                    datos_vec.className = 'datos_vec';
                    btn_limpiar.className = 'btn_limpiar';
                    btnRas_si_no.className = 'btnRas_si_no';   
                    btnCuadrantes.className = 'btnCua_noVisible';      

                    cont++;

                        if( cont == 35 ){

                            clearInterval(time);
                            limpiar();
                            dibujarPlano();
                            document.getElementById('msg').className = 'msg_noVisible';
                        }

                }, 100);
            }
        }

    	window.onload = principal(); //fin_continuara...
}())