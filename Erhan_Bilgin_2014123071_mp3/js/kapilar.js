class kapilar {//kapılar sınıfı oluşturuldu
    constructor() {//yapıcı method oluştuduldu
        this.image = [];//resimler listesi
        this.kapi = [];//kapılar listesi
        this.loadImages(); //loadimage fonksiyonu

    }
    loadImages() {//bu fonksiyon resimler klasöründeki resimleri özelliklerine ve
                    //ilk çalıştırmada bulundukları konumlar girilir ve image listesine pushlanır
        this.image.push({ image: new Image(), x: 30, y: 50, type: 'and', input: '2' });
        this.image[0].image.src = "resimler/and.png";

        this.image.push({ image: new Image(), x: 120, y: 50, type: 'nand', input: '2' });
        this.image[1].image.src = "resimler/nand.png";

        this.image.push({ image: new Image(), x: 30, y: 120, type: 'or', input: '2' });
        this.image[2].image.src = "resimler/or.png";

        this.image.push({ image: new Image(), x: 120, y: 120, type: 'nor', input: '2' });
        this.image[3].image.src = "resimler/nor.png";

        this.image.push({ image: new Image(), x: 30, y: 190, type: 'xor', input: '2' });
        this.image[4].image.src = "resimler/xor.png";

        this.image.push({ image: new Image(), x: 120, y: 190, type: 'xnor', input: '2' });
        this.image[5].image.src = "resimler/xnor.png";

        this.image.push({ image: new Image(), x: 30, y: 260, type: 'and', input: '3' });
        this.image[6].image.src = "resimler/and.png";

        this.image.push({ image: new Image(), x: 120, y: 260, type: 'nand', input: '3' });
        this.image[7].image.src = "resimler/nand.png";

        this.image.push({ image: new Image(), x: 30, y: 330, type: 'or', input: '3' });
        this.image[8].image.src = "resimler/or.png";

        this.image.push({ image: new Image(), x: 120, y: 330, type: 'nor', input: '3' });
        this.image[9].image.src = "resimler/nor.png";

        this.image.push({ image: new Image(), x: 30, y: 400, type: 'xor', input: '3' });
        this.image[10].image.src = "resimler/xor.png";

        this.image.push({ image: new Image(), x: 120, y: 400, type: 'xnor', input: '3' });
        this.image[11].image.src = "resimler/xnor.png";

        this.image.push({ image: new Image(), x: 30, y: 470, type: 'not', input: '1' });
        this.image[12].image.src = "resimler/not.png";

        this.image.push({ image: new Image(), x: 120, y: 470, type: 'output', input: '1' });
        this.image[13].image.src = "resimler/output.png";

        this.image.push({ image: new Image(), x: 30, y: 540, type: 'input', input: '1' });
        this.image[14].image.src = "resimler/input.png";

        this.image.push({ image: new Image(), x: 120, y: 540, type: 'input1', input: '1' });
        this.image[15].image.src = "resimler/input1.png";
    }
    draw(context, event, nesne) {//draw fonksiyonu 
        //context(canvas nesnesi) event(gelen kapının ilk başlangıçtamı oluştuğu yoksa sonradan eklendiğimi)
        //nesne ise kapı listesinin tutulduğu değişkendir.
        for (var i = 0; i < nesne.length; i++) {//tüm nesneler üzerinde dönülür
            if (nesne[i].input === '2') {//gelen nesne 2 inputluysa

                //çizimlerde canvas nesnesi olan context kullanılmıştır

                context.drawImage(nesne[i].image, nesne[i].x, nesne[i].y);//resimler yüklenir

                //input1 çizimi
                context.beginPath();//çizgi çizdirme
                context.moveTo(nesne[i].x - 10, nesne[i].y + nesne[i].image.height / 5);
                context.lineTo(nesne[i].x + 4, nesne[i].y + nesne[i].image.height / 5);
                context.stroke();

                //input2 çizimi
                context.beginPath();//çizgi çizdirme
                context.moveTo(nesne[i].x - 10, nesne[i].y + nesne[i].image.height / 5 * 4);
                context.lineTo(nesne[i].x + 4, nesne[i].y + nesne[i].image.height / 5 * 4);
                context.stroke();

                //output1 çizimi
                context.beginPath();//çizgi çizdirme
                context.moveTo(nesne[i].x + nesne[i].image.width - 1, nesne[i].y + nesne[i].image.height / 2);
                context.lineTo(nesne[i].x + nesne[i].image.width + 13, nesne[i].y + nesne[i].image.height / 2);
                context.stroke();

                //baglantilar array list
                this.baglanti = [];//çizgiler baglanti listesine bulundukları konum ve özelliklerine göre bağlantı listesine pushlanır
                this.baglanti[0] = { x: nesne[i].x - 10, y: nesne[i].y + nesne[i].image.height / 5, input: '1', output: '' };
                this.baglanti[1] = { x: nesne[i].x - 10, y: nesne[i].y + nesne[i].image.height / 5 * 4, input: '2', output: '' };
                this.baglanti[2] = { x: nesne[i].x + nesne[i].image.width + 13, y: nesne[i].y + nesne[i].image.height / 2, input: '', output: '1' };

                //input1 baglanti
                context.beginPath();//çizgiler üzerine girişiler için yuvarlak daireler çizdirilir
                context.arc(this.baglanti[0].x, this.baglanti[0].y, 4, 0, 2 * Math.PI);
                context.stroke();

                //input2 baglanti
                context.beginPath();//çizgiler üzerine girişiler için yuvarlak daireler çizdirilir
                context.arc(this.baglanti[1].x, this.baglanti[1].y, 4, 0, 2 * Math.PI);
                context.stroke();

                //output1 baglanti
                context.beginPath();//çizgiler üzerine girişiler için yuvarlak daireler çizdirilir
                context.arc(this.baglanti[2].x, this.baglanti[2].y, 4, 0, 2 * Math.PI);
                context.stroke();
                //gelen nesneler event için değilse sayfa ilk açıldığındadır o yüzden kapi listesine pushlanır
                if (event != 'event') {
                    this.kapi.push({ image: nesne[i].image, x: nesne[i].x, y: nesne[i].y, type: nesne[i].type, input: '2', baglanti: this.baglanti });
                } else {//event için geldiyse nesneler 
                    this.kapi[i] = { image: nesne[i].image, x: nesne[i].x, y: nesne[i].y, type: nesne[i].type, input: '2', baglanti: this.baglanti };
                }
            } else if (nesne[i].input === '3') {//gelen nesne 3 inputluysa

                context.drawImage(nesne[i].image, nesne[i].x, nesne[i].y);

                //input1 çizgi çizimi
                context.beginPath();
                context.moveTo(nesne[i].x - 10, nesne[i].y + nesne[i].image.height / 8);
                context.lineTo(nesne[i].x + 4, nesne[i].y + nesne[i].image.height / 8);
                context.stroke();

                //input2 çizgi çizimi
                context.beginPath();
                context.moveTo(nesne[i].x - 10, nesne[i].y + nesne[i].image.height / 8 * 4);
                context.lineTo(nesne[i].x + 6, nesne[i].y + nesne[i].image.height / 8 * 4);
                context.stroke();

                //input3 çizgi çizimi
                context.beginPath();
                context.moveTo(nesne[i].x - 10, nesne[i].y + nesne[i].image.height / 8 * 7);
                context.lineTo(nesne[i].x + 6, nesne[i].y + nesne[i].image.height / 8 * 7);
                context.stroke();

                //output1 çizgi çizimi
                context.beginPath();
                context.moveTo(nesne[i].x + nesne[i].image.width - 1, nesne[i].y + nesne[i].image.height / 2);
                context.lineTo(nesne[i].x + nesne[i].image.width + 13, nesne[i].y + nesne[i].image.height / 2);
                context.stroke();

                //baglantilar array list
                this.baglanti = [];
                this.baglanti[0] = { x: nesne[i].x - 10, y: nesne[i].y + nesne[i].image.height / 8, input: '1', output: '' };
                this.baglanti[1] = { x: nesne[i].x - 10, y: nesne[i].y + nesne[i].image.height / 8 * 4, input: '2', output: '' };
                this.baglanti[2] = { x: nesne[i].x - 10, y: nesne[i].y + nesne[i].image.height / 8 * 7, input: '3', output: '' };
                this.baglanti[3] = { x: nesne[i].x + nesne[i].image.width + 13, y: nesne[i].y + nesne[i].image.height / 2, input: '', output: '1' };

                //input1 baglanti çizimi
                context.beginPath();
                context.arc(this.baglanti[0].x, this.baglanti[0].y, 4, 0, 12 * Math.PI);
                context.stroke();

                //input2 baglanti çizimi
                context.beginPath();
                context.arc(this.baglanti[1].x, this.baglanti[1].y, 4, 0, 2 * Math.PI);
                context.stroke();

                //input3 baglanti çizimi
                context.beginPath();
                context.arc(this.baglanti[2].x, this.baglanti[2].y, 4, 0, 2 * Math.PI);
                context.stroke();
 
                //output1 baglanti çizimi
                context.beginPath();
                context.arc(this.baglanti[3].x, this.baglanti[3].y, 4, 0, 2 * Math.PI);
                context.stroke();
                if (event != 'event') {
                    this.kapi.push({ image: nesne[i].image, x: nesne[i].x, y: nesne[i].y, type: nesne[i].type, input: '3', baglanti: this.baglanti });
                } else {
                    this.kapi[i] = { image: nesne[i].image, x: nesne[i].x, y: nesne[i].y, type: nesne[i].type, input: '3', baglanti: this.baglanti };
                }
            } else if (nesne[i].input === '1') {//gelen nesne 1 inputluysa

                if (nesne[i].type === 'output' || nesne[i].type === 'not') {//nesne tipi output veya not nesnesiyse
                    //input1 çizimi yapılır
                    context.beginPath();
                    context.moveTo(nesne[i].x - 10, nesne[i].y + nesne[i].image.height / 2);
                    context.lineTo(nesne[i].x + 4, nesne[i].y + nesne[i].image.height / 2);
                    context.stroke();
                }
                if (nesne[i].type === 'input' || nesne[i].type === 'not' || nesne[i].type === 'input1') {
                    //gelen nesne input not veya input1(sıfır olan giriş) ise 
                    //output1 çizgilieri çiz
                    context.beginPath();
                    context.moveTo(nesne[i].x + nesne[i].image.width - 1, nesne[i].y + nesne[i].image.height / 2);
                    context.lineTo(nesne[i].x + nesne[i].image.width + 13, nesne[i].y + nesne[i].image.height / 2);
                    context.stroke();
                }
                this.baglanti = [];//baglanti listesini oluştur
                if (i > 15) {//15. elemandan sonraki nesneler için yani çizim ortamına yeni eklenen 
                    //output nesnesinin görünümü sinyaline göre değiştirlir.
                    if (nesne[i].type === 'output' && typeof nesne[i].baglanti != 'undefined') {
                        if (nesne[i].baglanti[0].output === '1')
                        {
                            nesne[i].image = new Image();
                            nesne[i].image.src = "resimler/input.png";
                        }
                        if (nesne[i].baglanti[0].output === '0')
                        {
                            nesne[i].image = new Image();
                            nesne[i].image.src = "resimler/output.png";
                        }   
                    }
                }

                context.drawImage(nesne[i].image, nesne[i].x, nesne[i].y);//nesnenin resmi çizdirilir

                //baglantilar array list
                
                if (nesne[i].type === 'input' || nesne[i].type === 'input1') {
                    this.baglanti[0] = { x: nesne[i].x + nesne[i].image.width + 13, y: nesne[i].y + nesne[i].image.height / 2, input: '', output: '1' };
                }
                if (nesne[i].type === 'output' || nesne[i].type === 'not') {
                    this.baglanti[0] = { x: nesne[i].x - 10, y: nesne[i].y + nesne[i].image.height / 2, input: '1', output: '' };
                }
                if (nesne[i].type === 'not') {
                    this.baglanti[1] = { x: nesne[i].x + nesne[i].image.width + 13, y: nesne[i].y + nesne[i].image.height / 2, input: '', output: '1' };
                    //input1 baglanti
                    context.beginPath();
                    context.arc(this.baglanti[1].x, this.baglanti[1].y, 4, 0, 2 * Math.PI);
                    context.stroke();
                }
                //input1 baglanti
                context.beginPath();
                context.arc(this.baglanti[0].x, this.baglanti[0].y, 4, 0, 2 * Math.PI);
                context.stroke();

                if (event != 'event') {
                    this.kapi.push({ image: nesne[i].image, x: nesne[i].x, y: nesne[i].y, type: nesne[i].type, input: '1', baglanti: this.baglanti });
                } else {
                    this.kapi[i] = { image: nesne[i].image, x: nesne[i].x, y: nesne[i].y, type: nesne[i].type, input: '1', baglanti: this.baglanti };
                }
            }
        }

    }
}