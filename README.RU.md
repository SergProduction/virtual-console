язык

> [Русский](https://gist.github.com/SergProduction/)
  [Английский](https://gist.github.com/SergProduction/)

## Виртруальная консоль
предназначена в для отладки кода в мобильных браузерах
### Установка
```npm install virtual-console``` или ```<script src="virtualConsole.js"></script>```

script необходимо подключать отдельно, перед основным кодом.
Если используеться nodejs, то нужно вызовать инициализацию ```requiare('virtual-console')()```

### Опции
* url - если указать url, то консоль появиться при наличии в url соответствующего строки после хэша. Например: 
```requiare('virtual-console')({url: "console=true"})``` yourhost.com#console=true

* inside - если virtualConsole подключена в один фаил вместе с освновным кодом, необходимо указать эту опцию ```requiare('virtual-console')({inside: true})```, иначе виртуальная консоль не будет отображать строку вызова

### Пример
* вывод console. log, warn, info, error

  ![](http://localhost:8080/img/demonstrantInfo.png)

---

* вывод всех типов ошибок, аналогично консоли google chrome

  ![](http://localhost:8080/img/error1.png)