function construtorObserver() {

    var observer = {};
    var cont = 0;
	var Observerlist = [];
  
	observer.addListener = function (ob) {
		Observerlist.push(ob);
	};
    function exeEvento() {
        for (var i = 0; i < Observerlist.length; i++) {
            var funcOb = Observerlist[i];
            funcOb();
        }
    }
	
    function contar() {
        cont += 1;
        return cont;
    }

    observer.contar = contar;
    observer.exeEvento = exeEvento;
    return observer;
}

var ob = construtorObserver();

var listener = function () {
    console.log("Listener");
};
var listener2 = function () {
    console.log("Listener 2");
};
var listener3 = function () {
    console.log("Listener 3");
};

ob.addListener(listener);
ob.addListener(listener2);
ob.addListener(listener3);
ob.exeEvento();
