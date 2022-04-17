/*
Author: Vitaly Klimenkov, 
GitHub: https://github.com/vklimenkov/jquery-inputcleaner
HomePage and Demo: https://vklimenkov.ru
*/


(function( $ ){

	var methods = {
		init : function( options ) {

			var opt = $.extend( {
				'symbol' : '&#11198;',
				'color'  : 'black'
		  },  options);

			return this.each(function(){
				var $this = $(this),
				data = $this.data('inputcleaner');

				/* в этой переменной будет 1, если мышь над инпутом ИЛИ над иконкой
				 и 0, если мышь вне инпута
				 дело в том, что когда мышь перемещается на иконку
				 генерируется событие ухода мыши с инпута (хотя "формально"
				 мышь ещё над инпутом, т.к. иконка в его границах)
				 поэтому нужно следить за этим и иконку НЕ скрывать в момент 
				 события ухода мыши с инпута
				 а чтобы иконка не мерцала в момент появления мыши на границе иконки
				 скрытие иконки мы делаем через небольшой таймаут (см. ниже) */
				var hovercounter = 0; 

				// Если плагин ещё не проинициализирован
				if ( !data ) {
					// создаём для него иконку закрытия
					var i = $('<div>'+opt.symbol+'</div>').css({
						cursor: 'pointer',
						display: 'none',
						fontSize: $this.height()+'px',
						lineHeight: $this.height()+'px',
						padding: 0,
						fontWeight: 'bold',
						color: opt.color,
					});
					$this.after(i);

					// запоминаем опции
					// хотя реально понадобится из них только колбек-функция, если есть
					$(this).data('inputcleaner', {
						opt: opt,
					});

					// привязываем событие клика по иконке
					i.click(function(){
						$this.inputcleaner('clean');
						$(this).hide();
					});

					i.hover(
						function(){
							hovercounter++;
						},
						function(){
							hovercounter--;
							setTimeout($.proxy(function(){
								if(!hovercounter){
									i.hide();
								}
							}, $this), 20);
						}
					);

					// при движении мыши над полем показываем или скрываем иконку
					$this.hover(
						function(){
							hovercounter++;
							// показываем только при условии, что поле не пустое
							if($(this).val()){
								/* позиционируем иконку
									TODO чтобы не делать это каждый раз,
									можно сделать это только при первом показе
									но тогда нужно следить за ресайзом или смещением инпута
									и обновлять позиционирование 

									вычисление позиционирования нетривиально
									т.к. offset() не учитывает border и padding, 
									для их вычисления берётся разница между outerHeight и height
								*/
								i.css({
									position: 'absolute',
									top: ($(this).offset().top + ($(this).outerHeight()-$(this).height())/2) + 'px',
									left: ($(this).offset().left + $(this).outerWidth() - i.outerWidth()-3) + 'px'
								}).show();
							}
						},
						function(){
							hovercounter--;
							setTimeout($.proxy(function(){
								if(!hovercounter){
									i.hide();
								}
							}, $this), 20);
						}
					);

					// также реагируем на ввод с клавиатуры
					$this.bind('input', function(e){
						// если в поле пустое значение (стёрли с клавиатуры) 
						// иконку скрываем, иначе, наоборот, показываем
						if(!$(this).val()){
							$(this).inputcleaner('clean');
							i.hide();
						} else if(hovercounter){
							i.show();
						}
					});
				}
			});
		},

		clean : function() {
			// очищаем само поле
			$(this).val('');
			if($(this).data('inputcleaner').opt.afterClean){
				// если прописан колбэк, то вызвали его
				$(this).data('inputcleaner').opt.afterClean();
			}
		},

	};

	$.fn.inputcleaner = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.inputcleaner' );
		}
	};
})( jQuery );
