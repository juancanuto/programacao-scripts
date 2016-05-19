$(document).ready(function(){
    

    var $formCategoria = $('#form-categoria');
    var groups = {'dia':$('#dia-group'), 'funcionario':$('#funcionario-group')};
    var helpBlocks = {'dia':$('#dia-help'), 'funcionario':$('#funcionario-help')};
    var $formInputs = $formCategoria.find('input');
    var $listaVisualCategorias = $('#lista-categorias');
    var $listaGrupo = $('#listaGrupo');

    var $fieldsets = $('#fieldset');
    $fieldsets.removeAttr('disabled');

    var $salvarLoader = $('#salva-loader');
    $salvarLoader.hide();   



    $.ajax({
          type: 'GET',
          url: 'http://rest.learncode.academy/api/teste9/friends',
          success: function(categoria){
            $.each(categoria, function(i, item){ 

              var linha1 = '<li class="list-group-item">';
              linha1 += '<b>Dia: </b>';
              linha1+=item.dia;
              linha1+=" ";
              linha1+='<b>Funcionario:</b> ';
              linha1+=item.funcionario;
              linha1+=" "+'<b>';
              linha1+='id: ';
              linha1+= '</b>'+item.id;
              linha1 += '<button title="Remover" class="btn btn-danger btn-sm">';
              linha1 += '<i class="glyphicon glyphicon-remove-circle"></i></<button>';
              linha1 += '</li>';
              $linhaBotao = $(linha1);
              
              
              $linhaBotao.find('.btn-danger').click(function () {                
              
              
               $(this).parent().remove();

               $.ajax({
                type: 'DELETE',
                url: 'http://rest.learncode.academy/api/teste9/friends'+item.id,
                success: function(){                
                }
               });
               



            });

              $listaGrupo.append($linhaBotao);
              //$listaVisualCategorias.append('<li>Dia:'+item.dia+'Funcionario: '+item.funcionario+'</li>');
            });
          },
          error: function(){
          alert('Erro ao carregar!');
            } 
    });



    function mostrarErros(erros) {
        for (var propriedade in erros) {
          var msgDeErro = erros[propriedade];
          groups[propriedade].addClass('has-error');
          helpBlocks[propriedade].text(msgDeErro);
        }
      }

    function limparErros() {
        for (var p in groups) {
          var $g = groups[p];
          $g.removeClass('has-error');
          helpBlocks[p].empty();
        }
      }

    function  mostrarCategorias(categoria){
        var linha = '<li class="list-group-item">';
            linha += '<b>Dia: </b>';
            linha+=categoria.dia;
            linha+=" ";
            linha+='<b>Funcionario:</b> ';
            linha+=categoria.funcionario;
            linha+=" ";
            linha += '<button title="Remover" class="btn btn-danger btn-sm">';
            linha += '<i class="glyphicon glyphicon-remove-circle"></i></<button>';
            linha += '</li>';
            $linhaBotao = $(linha);
              
              
          $linhaBotao.find('.btn-danger').click(function () {          
           $(this).parent().remove();
           $.ajax({
                type: 'DELETE',
                url: 'http://rest.learncode.academy/api/teste9/friends'+categoria.id,
                success: function(){
                  console.log(url);                 
                }
               });



        });

          $listaGrupo.append($linhaBotao);
    }

    $formCategoria.submit(function (evento) {

        evento.preventDefault();
        limparErros();

                

        var categoria = {};
        $formInputs.each(function (i, input) {
          var $input = $(input);
          categoria[$input.attr('name')] = $input.val();
        });

        var erros = {};

        var flagErro = false;
        for (var p in categoria) {
          if (categoria[p] === '') {
            flagErro = true;
            erros[p] = 'Campo obrigatório';
          }
        }
        if (flagErro) {
          mostrarErros(erros);
        } else {
          $fieldsets.attr('disabled','disabled');
          setTimeout(function(){$fieldsets.removeAttr('disabled', 'disabled');} , 1500);
        

          $salvarLoader.fadeIn();
          setTimeout(function() { $salvarLoader.fadeOut(); }, 1500);          

          $.ajax({
          type: 'POST',
          url: 'http://rest.learncode.academy/api/teste9/friends',
          data: categoria,
          success: function(categoria){
            mostrarCategorias(categoria);
            },
          error: function(){
            alert('Erro ao salvar!');
            },          
          });

        }

      });


});