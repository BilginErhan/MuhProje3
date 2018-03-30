class MainClass {
    constructor() { //sınıfdan nesne oluşunca ilk çalışacak fonksiyon
        this.toolbar = document.getElementById('canvas');//canvas idli etiket alınır
        this.tool = this.toolbar.getContext('2d');//tuval oluşturulur
        document.addEventListener("mousedown", this.mouseDown.bind(this));//mouse tıklama eventi
        document.addEventListener("mouseup", this.mouseUp.bind(this));//mouse tıklama bırakma eventi
        document.addEventListener("mousemove", this.mouseMove.bind(this));//mouse hareketei eventi
        document.addEventListener("click", this.mouseClick.bind(this));//mouse tıklayıp bırakma eventi
        this.click = 0;
        this.index = -1;//kapı index
        this.indexkablo = -1;//kablo index
        this.kapilar = [];//kapılar listesi
        this.kapilarim = new kapilar();//kapılarım nesnesi
        this.kablo = new kablo();//kablo nesnesi
        this.hesapla = new hesapla(this.tool);//hesaplama nesnesi
    }

    init() { //başlangıç
        this.drawtoolbar(this.tool);
    }
    drawtoolbar(context) { //canvas içerisi çizimi
        context.fillStyle = 'White';
        context.fillRect(0, 0, this.toolbar.width, this.toolbar.height);
        context.font = "30px Arial";
        context.fillStyle = 'Black';
        context.fillText("ToolBox", 50, 30);
        context.fillText("Devre Tasarım Ortamı", 500, 30);
        context.beginPath();
        context.moveTo(200, 0);//sınır çizgilerinin çizimi
        context.lineTo(200, 850);
        context.stroke();
        context.beginPath();
        context.moveTo(0, 40);
        context.lineTo(1300, 40);
        context.stroke();

        if (this.kapilarim.kapi.length < 16) {//16 dan fazla nesne yoksa init dir
            this.kapilarim.draw(context, 'init', this.kapilarim.image);
        } else {//16 dan fazla nesne varsa event dir .
            this.kapilarim.draw(context, 'event', this.kapilarim.kapi);
        }//kapilarim sınıfının draw fonksiyonu yardımıyla kapılar çizdirilir
        this.kablo.draw(context, this.kablo.kablolar);//kablo sınıfdanki draw fonksiyonu yardımıyla kablolar çizdirilir
    }
    mouseDown(e) { //kapi ve kabloların çizimi için ilk tıklama

        this.bounds = e.target.getBoundingClientRect();
        this.mouse = { x: e.pageX - this.bounds.left - scrollX, y: e.pageY - this.bounds.top - scrollY };
        //tıklanınlan yerin tam x,y koordinatları için gerekli hesaplamalar

        for (var i = 0; i < this.kapilarim.kapi.length; i++) {//tıklandıktan sonra kapılar üzerinde gezilir
            if (e.pageX > this.kapilarim.kapi[i].x + 15 && e.pageX < this.kapilarim.kapi[i].x + 40 && e.pageY > this.kapilarim.kapi[i].y + 20 && e.pageY < this.kapilarim.kapi[i].y + 60) {
                this.click = 1;//eğer tıklanınlan yer bir kapıyı kapsıyorsa click 1 yapılır
                this.index = i;//kapı indexi alınır
                if (e.pageX < 240 && e.pageX > 0) {
                	//ve kapı toolbox içerisindeyse listeye pushlanır
                    this.kapi = { image: this.kapilarim.kapi[i].image, x: this.kapilarim.kapi[i].x, y: this.kapilarim.kapi[i].y, type: this.kapilarim.kapi[i].type, input: this.kapilarim.kapi[i].input, baglanti: this.cbaglanti };
                    this.kapilarim.kapi.push(this.kapi);
                    this.index = this.kapilarim.kapi.length - 1;//kapı indexi tutulur
                }
                break;
            }
            for (var j = 0; j < this.kapilarim.kapi[i].baglanti.length; j++) { //kablo çizimi
                if (this.mouse.x > this.kapilarim.kapi[i].baglanti[j].x && this.mouse.x < this.kapilarim.kapi[i].baglanti[j].x + 5 && this.mouse.y > this.kapilarim.kapi[i].baglanti[j].y && this.mouse.y < this.kapilarim.kapi[i].baglanti[j].y + 5) {
                    //tıklanan yer lojik kapı üzerindeki yuvarlak daireler ise
                    //kabloalr nesnesine pushlanır
                    this.kablo.kablolar.push({ x1: this.kapilarim.kapi[i].baglanti[j].x, y1: this.kapilarim.kapi[i].baglanti[j].y, x2: null, y2: null, kapi: i, baglanti: j, kapi1: null, baglanti1: null, sinyal: 0 });
                    this.indexkablo = this.kablo.kablolar.length - 1;
                    if (this.kapilarim.kapi[i].type === "input") {
                        this.kablo.kablolar[this.indexkablo].sinyal = 1;//input ise sinyali 1 yapılır
                    }
                    this.click = 2;//kablo clicki
                }
            }


        }

    }
    mouseUp(e) { //kapi ve kablo tıklamalarını bırakılması
        this.bounds = e.target.getBoundingClientRect();
        this.mouse = { x: e.pageX - this.bounds.left - scrollX, y: e.pageY - this.bounds.top - scrollY };
        if (this.click === 1) {

            if (e.pageX < 240 && e.pageX > 0) {//eğer toolbox üzerindeyse diziden silinir.
                this.kapilarim.kapi.splice(this.index, 1);
            }
            this.init();//init ile tüm nesneler tekrardan çizdirilir.
            this.click = 0;//click sıfırlanır
        }
        if (this.click === 2) {//kablo çizme işlemi bittiğinde
            this.sonuc = 1;
            if (e.pageX < 160 && e.pageX > 0) {//toolbox üzerindeyse silinir.
                this.kablo.kablolar.splice(this.indexkablo, 1);
            }
            for (var i = 16; i < this.kapilarim.kapi.length; i++) {//eğer bi kapının inputuna bırakmak isteniyorsa
                for (var j = 0; j < this.kapilarim.kapi[i].baglanti.length; j++) {
                    if (this.mouse.x > this.kapilarim.kapi[i].baglanti[j].x - 5 && this.mouse.x < this.kapilarim.kapi[i].baglanti[j].x + 5 && this.mouse.y > this.kapilarim.kapi[i].baglanti[j].y - 5 && this.mouse.y < this.kapilarim.kapi[i].baglanti[j].y + 5 && this.kapilarim.kapi[i].baglanti[j].input != "") {
                        //bıraktığı yer kapının input yuvarlağısa x,y değişkenleri kabloya aktarılır
                        this.kablo.kablolar[this.indexkablo].x2 = this.kapilarim.kapi[i].baglanti[j].x;
                        this.kablo.kablolar[this.indexkablo].y2 = this.kapilarim.kapi[i].baglanti[j].y;
                        this.kablo.kablolar[this.indexkablo].kapi1 = i;//bağlandığı kapı ve hangi inputa bağlandığı bilgilerini alır
                        this.kablo.kablolar[this.indexkablo].baglanti1 = j;
                        this.sonuc = 1;
                        break;
                    } else {
                        this.sonuc = 0;
                    }
                }
                if (this.sonuc === 1) { break; }
            }
            if (this.sonuc === 0) {//sonuc 0 ise kablo silinir
                this.kablo.kablolar.splice(this.indexkablo, 1);
            }
            this.init();//tüm nesneler çizdirilir.
            this.click = 0;//click sıfırlanır
        }

    }
    mouseMove(e) { //kapi ve kablo haraketleri
        this.bounds = e.target.getBoundingClientRect();
        this.mouse = { x: e.pageX - this.bounds.left - scrollX, y: e.pageY - this.bounds.top - scrollY };
        if (this.click === 1) {//lojik kapı hareket halindeyse
            this.kapilarim.kapi[this.index].x = e.pageX - 30;
            this.kapilarim.kapi[this.index].y = e.pageY - 45;
            //kapıyı oynatmada kapının koordinatları sürekli değişir o yüzden move eventinden gelen mouse x,y
            //koordinatları kullanılır
        }
        if (this.click === 2) {//kablo hareket halindeyse
        	//aynı işlemler yapılır
            this.kablo.kablolar[this.indexkablo].x2 = this.mouse.x;
            this.kablo.kablolar[this.indexkablo].y2 = this.mouse.y;
        }
        this.init();//tüm nesneler tekrardan çizdirilir.

    }
    mouseClick(e) { //simulate butonu
        if (e.path[0].nodeName === "BUTTON") {//tıklanılan buton simulate ise
            this.hesapla.hesap(this.kapilarim, this.kablo);//hesapla sınıfındaki hesap fonksiyonu çalışır
            this.init();//tüm nesneler tekrardan çizdirlir
        }
    }
}

const erhan = new MainClass();//MainClassdan erhan nesnesi oluşturulur

window.onload = () => erhan.init();//sayfa yüklendiğinde erhan nesnesinin init fonksiyonu çalışır.