[jQuery Validation Plugin](https://jqueryvalidation.org/) - Form validation made easy
# jquery-inputcleaner
Плагин для jQuery, реализует в элементе <input type="text"> всплывающую при наведении иконку, нажатие на которую очищает input.
## Начало работы
```html
<form>
	<input type="text" />
</form>
<script src="jquery.js"></script>
<script src="jquery.inputcleaner.js"></script>
<script>
    $("input").inputcleaner();
</script>
```
## Опции
``` js
$("input").inputcleaner({

  symbol: "<символ>",
  // символ иконки, по-умолчанию &#11198; (юникодный крестик в кружочке)
  // символ будет отмасштабирован по высоте под высоту инпута
  
  color: "<цвет>",
  // цвет иконки, по-умолчанию black
  
  afterClean: function(){}
  // колл-бек, будет вызван после нажатия на иконку
  // также колл-бек срабатывает при "ручной" очистке инпута
  // например, клавишей del с клавиатуры
  
});
```
## Демо
Плагин в работе можно посмотреть на https://vklimenkov.ru/code/jquery-inputcleaner

## Лицензия
Свободное распространение
