class hesapla {//hesapla sınıfımız
    constructor(context) 
    {//gelen canvas nesnesi sınfın bi değişkenine atılır
    	this.context = context;
    }
    hesap(kapilar, kablo) {//hesap fonksiyonu gelen kapı ve kablolar üzerinde hesaplama yapar
        for (var i = 16; i < kapilar.kapi.length; i++) {//kapılar üzerinde gez
            if (kapilar.kapi[i].type === "input") { //input kapıyı bul 1 sinyali
                for (var j = 0; j < kablo.kablolar.length; j++) {//kablolar üzerinde döner
                    if (kablo.kablolar[j].kapi === i) { //bağlı olduğu kabloları bul ve kablo sinyali 1 yap
                        kablo.kablolar[j].sinyal = 1;//kablonun sinyali 1 yapılır
                        this.kabloSinyalleri(j, kapilar, kablo);//bağlı olduğu kapi ve kapılar ve kablololar yollanır
                    }
                }
            }else if(kapilar.kapi[i].type === "input1"){//input1 0 sinyal girişi
            	for (var j = 0; j < kablo.kablolar.length; j++) {//kablolar üzerinde döner
                    if (kablo.kablolar[j].kapi === i) { //bağlı olduğu kabloları bul ve kablo sinyali 1 yap
                        kablo.kablolar[j].sinyal = 0;//kablonun sinyali 0 yapılır
                        this.kabloSinyalleri(j, kapilar, kablo);//kablonun bağlı olduğu kapi indexi kapi ve kablolar
                        //fonksiyona yollanır
                    }
                }
            }
        }
    }
    kabloSinyalleri(kabloindex, kapilar, kablo) { //kablonun bağlı olduğu kapı indexi kapilar ve kablolar yollanır
        this.bkapiindex = kablo.kablolar[kabloindex].kapi1;//gelen kablo indexinden baplı olduğu kapı indexi bulunur
        switch (kapilar.kapi[this.bkapiindex].type) {//switch case yapısında o kapı indexine bağlı 
            										//olduğu kapilar ve kablolar yollanır
            case "or"://or kapısı hesaplama fonksiyonu
                this.hesapOr(this.bkapiindex, kapilar, kablo);
                break;
            case "nor"://nor kapısı hesaplama fonksiyonu
                this.hesapOr(this.bkapiindex, kapilar, kablo);
                break;
            case "and"://and kapısı hesaplama fonksiyonu
                this.hesapAnd(this.bkapiindex, kapilar, kablo);
                break;
            case "nand"://nand kapısı hesaplmama fonksiyonu
                this.hesapAnd(this.bkapiindex, kapilar, kablo);
                break;
            case "xor"://xor kapısı hesapalama fonksiyonu
                this.hesapXor(this.bkapiindex, kapilar, kablo);
                break;
            case "xnor"://xnor kapısı hesaplama fonksiyonu
                this.hesapXor(this.bkapiindex, kapilar, kablo);
                break;
            case "not"://not kapısı hesaplama fonksiyonu
                this.hesapNot(this.bkapiindex, kapilar, kablo);
                break;
            case "output"://output çıkışı hesaplama
                this.hesapOutput(this.bkapiindex, kapilar, kablo);
                break;
            default:

        }
    }
    hesapOr(kapiin, kapilar, kablo) { //or ve nor girişi hesaplaması
        this.hesaplama = 0;
        this.sonuc = 0;
        for (var i = 0; i < kablo.kablolar.length; i++) {//kablolar üzerinde dönüşür
            if (kablo.kablolar[i].kapi1 === kapiin) {//kapıya ait kablo üzerindeyse
                if (kapilar.kapi[kapiin].input === '2') {
                    this.hesaplama += kablo.kablolar[i].sinyal;//toplama yapılır
                }
                if (kapilar.kapi[kapiin].input === '3') {
                    this.hesaplama += kablo.kablolar[i].sinyal;
                }
            }
        }
        if (this.hesaplama >= 1) {//eğer toplam 1 den büyük eşit ise
            for (var i = 0; i < kablo.kablolar.length; i++) {
                if (kablo.kablolar[i].kapi == kapiin) {
                    if (kapilar.kapi[kapiin].type === 'nor') {
                        kablo.kablolar[i].sinyal = 0;//nor kapısının çıkışındaki kabloya 0 
                        this.kabloSinyalleri(i, kapilar, kablo);
                    } else if (kapilar.kapi[kapiin].type === 'or') {
                        kablo.kablolar[i].sinyal = 1;//or kapısının çıkışındaki kabloya 1 verilir 
                        this.kabloSinyalleri(i, kapilar, kablo);
                    }

                }
            }
        } else {//hesaplama 1 den küçük ise 
            for (var i = 0; i < kablo.kablolar.length; i++) {//kablo üstünde dön
                if (kablo.kablolar[i].kapi == kapiin) {//kapı ya bak kabloya bağlımı ? 
                    if (kapilar.kapi[kapiin].type === 'nor') {
                        kablo.kablolar[i].sinyal = 1;//nor girişinin çıkışındaki kablo 1 
                        this.kabloSinyalleri(i, kapilar, kablo);
                    } else if (kapilar.kapi[kapiin].type === 'or') {
                        kablo.kablolar[i].sinyal = 0;//or girişinin çıkışındaki kablo 0 
                        this.kabloSinyalleri(i, kapilar, kablo);
                    }

                }
            }
        }

    }
    //kablonun bağlu olduğu kapiya ait output hesaplaması
    hesapAnd(kapiin, kapilar, kablo) { //and ve nand girişi hesaplaması
        this.hesaplama = 1;
        this.sonuc = 0;
        for (var i = 0; i < kablo.kablolar.length; i++) {
            if (kablo.kablolar[i].kapi1 === kapiin) {
                if (kapilar.kapi[kapiin].input === '2') {
                    this.hesaplama *= kablo.kablolar[i].sinyal;//burda çaprma ile çözüm sonucu bulunur
                }
                if (kapilar.kapi[kapiin].input === '3') {
                    this.hesaplama *= kablo.kablolar[i].sinyal;
                }
            }
        }
        if (this.hesaplama === 1) {//sonuc 1 ise 
            for (var i = 0; i < kablo.kablolar.length; i++) {
                if (kablo.kablolar[i].kapi == kapiin) {
                    if (kapilar.kapi[kapiin].type === 'nand') {
                        kablo.kablolar[i].sinyal = 0; //nandın kablosuna  0 yollanır
                        this.kabloSinyalleri(i, kapilar, kablo);
                    } else if (kapilar.kapi[kapiin].type === 'and') {
                        kablo.kablolar[i].sinyal = 1;//andın kablosuna 1 yollanır
                        this.kabloSinyalleri(i, kapilar, kablo);
                    }

                }
            }
        } else {//hesaplama 0 ise
            for (var i = 0; i < kablo.kablolar.length; i++) {
                if (kablo.kablolar[i].kapi == kapiin) {
                    if (kapilar.kapi[kapiin].type === 'nand') {
                        kablo.kablolar[i].sinyal = 1; //nande 1 
                        this.kabloSinyalleri(i, kapilar, kablo);
                    } else if (kapilar.kapi[kapiin].type === 'and') {
                        kablo.kablolar[i].sinyal = 0; //and e 0
                        this.kabloSinyalleri(i, kapilar, kablo);
                    }

                }
            }
        }

    }
    hesapXor(kapiin, kapilar, kablo) { //xor girişi hesaplaması
        this.hesaplama = 0;
        this.sonuc = 0;
        for (var i = 0; i < kablo.kablolar.length; i++) {
            if (kablo.kablolar[i].kapi1 === kapiin) {
                if (kapilar.kapi[kapiin].input === '2') {
                    this.hesaplama += kablo.kablolar[i].sinyal;//sinyalleri toplama ile işleme 
                }
                if (kapilar.kapi[kapiin].input === '3') {
                    this.hesaplama += kablo.kablolar[i].sinyal;
                }
            }
        }
        if (kapilar.kapi[kapiin].input == '2') {//xor veya xnor 2 girişli ise
            if (this.hesaplama === 1) {//ve hesapşama 1 ,se
                for (var i = 0; i < kablo.kablolar.length; i++) {
                    if (kablo.kablolar[i].kapi == kapiin) {
                        if (kapilar.kapi[kapiin].type === 'xnor') {
                            kablo.kablolar[i].sinyal = 0;//xnor çıkışı 0
                            this.kabloSinyalleri(i, kapilar, kablo);
                        } else if (kapilar.kapi[kapiin].type === 'xor') {
                            kablo.kablolar[i].sinyal = 1;//xor çıkışı 1 
                            this.kabloSinyalleri(i, kapilar, kablo);
                        }

                    }
                }
            } else {//hesaplama 1 den farklı ise
                for (var i = 0; i < kablo.kablolar.length; i++) {
                    if (kablo.kablolar[i].kapi == kapiin) {
                        if (kapilar.kapi[kapiin].type === 'xnor') {
                            kablo.kablolar[i].sinyal = 1;//xnor çıkışı 1
                            this.kabloSinyalleri(i, kapilar, kablo);
                        } else if (kapilar.kapi[kapiin].type === 'xor') {
                            kablo.kablolar[i].sinyal = 0;//xor çıkışı 0 
                            this.kabloSinyalleri(i, kapilar, kablo);
                        }

                    }
                }

            }
        }
        if (kapilar.kapi[kapiin].input == '3') {//xor veya xnor 3 girişili ise
            if (this.hesaplama === 1 || this.hesaplama === 3) {
                for (var i = 0; i < kablo.kablolar.length; i++) {
                    if (kablo.kablolar[i].kapi == kapiin) {
                        if (kapilar.kapi[kapiin].type === 'xnor') {
                            kablo.kablolar[i].sinyal = 0;
                            this.kabloSinyalleri(i, kapilar, kablo);
                        } else if (kapilar.kapi[kapiin].type === 'xor') {
                            kablo.kablolar[i].sinyal = 1;
                            this.kabloSinyalleri(i, kapilar, kablo);
                        }

                    }
                }
            } else {
                for (var i = 0; i < kablo.kablolar.length; i++) {
                    if (kablo.kablolar[i].kapi == kapiin) {
                        if (kapilar.kapi[kapiin].type === 'xnor') {
                            kablo.kablolar[i].sinyal = 1;
                            this.kabloSinyalleri(i, kapilar, kablo);
                        } else if (kapilar.kapi[kapiin].type === 'xor') {
                            kablo.kablolar[i].sinyal = 0;
                            this.kabloSinyalleri(i, kapilar, kablo);
                        }

                    }
                }
            }
        }
    }
    hesapNot(kapiin, kapilar, kablo) { //not girişi hesaplamaso
    	this.hesaplama = 0;//not kapısı hesaplama
        for (var i = 0; i < kablo.kablolar.length; i++) {
            if (kablo.kablolar[i].kapi1 == kapiin) 
            {
            	if (kablo.kablolar[i].sinyal === 0) 
            	{//sinyali tersine çevir
            		this.hesaplama = 1;
            	}else{
            		this.hesaplama = 0;
            	}	
            }
        }
        for(var i = 0; i<kablo.kablolar.length ; i++){
        	if(kablo.kablolar[i].kapi == kapiin){//kapı çıkışına yansıt
        		kablo.kablolar[i].sinyal = this.hesaplama;
        		this.kabloSinyalleri(i, kapilar, kablo);
        	}
        }
    }
    hesapOutput(kapiin, kapilar, kablo) { //output girişi hesaplaması
    	for (var i = 0; i < kablo.kablolar.length; i++) {
            if (kablo.kablolar[i].kapi1 == kapiin) 
            {//output çıkışı hesaplamnır
            	if (kablo.kablolar[i].sinyal === 1) 
            	{//kablo sinyaline göre output değeri değiştirilir
            		kapilar.kapi[kapiin].baglanti[0].output = '1';
            	}else{
            		kapilar.kapi[kapiin].baglanti[0].output = '';
            	}	
            }
        }
    }
}