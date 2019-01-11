
export const pricing = (data) => {
    if(data >= 0 && data <= 3){
        return 3500
    }else if(data > 3 && data <= 6){
        return 8250
    }else if(data > 6 && data <= 8 ){
        return 16350
    }else if(data > 8 && data <= 10){
        return 21250
    }
}
export const formatRupiah = (angka) => {
    var	number_string = angka.toString(),
	sisa 	= number_string.length % 3,
	rupiah 	= number_string.substr(0, sisa),
	ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
		
    if(ribuan){
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
      
    return rupiah
}