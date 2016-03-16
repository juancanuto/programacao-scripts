//Classe Animal
function Animal(nome) {
}
//barulho qualquer
Animal.prototype.printBarulho = function () {
    return 'Barulho Genérico!';
};
function Gato(nome) {
    Animal.call(this, nome);
}
//miar
Gato.prototype.printBarulho = function () {
    return 'Miau';
};

function Cachorro(nome) {
    Animal.call(this, nome);
}
//latir
Cachorro.prototype.printBarulho = function () {
    return 'Au au!';
};

function Manada() {
    this.animais = [];
    this.adicionandoAnimal = function (animal) {
        this.animais.push(animal);
    };
}

////////////////////////////////////////////////////////////////////////
Gato.prototype = new Animal();
Gato.prototype.constructor = Gato;
Cachorro.prototype = new Animal();
Cachorro.prototype.constructor = Cachorro;
////////////////////////////////////////////////////////////////////////////////
//Separar por #
function ManadaSustenidaDupla() {
    this.printBarulho = function () {
        var animaisSustenido = "";
       for(var i = 0; i < this.animais.lenght; i++) {
            if (i + 1 != this.animais.length) {
                animaisSustenido = animaisSustenido + this.animais[i] +"# ";
            } else {
                animaisSustenido = animaisSustenido + this.animais[i];
            }
        }
        console.log(animaisSustenido);
    };
}
//Separar por virgula
function ManadaVirgula() {
    this.printBarulho = function () {
        var animaisVirgula = "";
        for (var i = 0; i < this.animais.lenght; i++) {
            if (i + 1 != this.animais.length) {
                animaisVirgula = animaisVirgula + this.animais[i] +", ";
            } else {
                animaisVirgula = animaisVirgula + this.animais[i];
            }
        }
        console.log(animaisVirgula);
    };
}

//Herança
ManadaVirgula.prototype = new Manada();
ManadaSustenidaDupla.prototype = new Manada();

var animal = new Animal();
var Gato = new Gato();
var Cachorro = new Cachorro();

var manadaVirgula = new ManadaVirgula();
manadaVirgula.adicionandoAnimal(Cachorro.nome);
manadaVirgula.adicionandoAnimal(Gato.nome);
manadaVirgula.printBarulho()

var ManadaSustenidaDupla = new ManadaSustenidaDupla();
ManadaSustenidaDupla.adicionandoAnimal(Cachorro.nome);
ManadaSustenidaDupla.adicionandoAnimal(Gato.nome);

ManadaSustenidaDupla.printBarulho();
console.log(animal.printBarulho());
console.log(Cachorro.printBarulho());
console.log(Gato.printBarulho());
