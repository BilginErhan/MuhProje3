class kablo{//kablo sınıfı
	constructor() {
		this.kablolar = []; //kablolar listemiz
	}
	draw(context,nesne) {//gelen canvas nesnesi ve kabloların tutulduğu liste
    	for(var i =0; i<nesne.length;i++){
    		context.beginPath();//tüm nesneler üzerinde dönerek kablo çizimleri yapılır.
			context.moveTo(nesne[i].x1,nesne[i].y1);
			context.lineTo(nesne[i].x2,nesne[i].y2);
			context.stroke();

			//sınıf içerisindeki kablo listesi güncellenir.
			this.kablolar[i].x2 = nesne[i].x2;
			this.kablolar[i].y2 = nesne[i].y2;
    	}
    }
	
}