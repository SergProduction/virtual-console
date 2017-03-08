Язык: [Русский](/README.RU.md), [Английский](/README.md)

## Виртруальная консоль
Предназначена в для отладки кода в мобильных браузерах

### Установка
- использование в node js

  ```npm install virtual-console```

- использование в браузере

  ```<script src="virtualConsole.js"></script>```

### Инициализация
Script необходимо подключать отдельно, перед основным кодом.
Если используеться nodejs, то нужно вызовать инициализацию:

- использование в node js

  ```require('virtual-console')(options)```

- использование в браузере

  ```virtualConsoleInit(options)```

### Опции
- **url**: если указать url, то консоль появиться при наличии в url соответствующего строки после хэша. Например: 
```require('virtual-console')({url: "console=true"})``` yourhost.com#console=true

- **inside**: если virtualConsole подключена в один фаил вместе с освновным кодом, необходимо указать эту опцию ```require('virtual-console')({inside: true})```, иначе виртуальная консоль не будет отображать строку вызова

### Пример
- Вывод console. log, warn, info, error

  ![](/screenshots/virtual-console-example.png)


- Вывод всех типов ошибок, аналогично консоли google chrome

  ![](/screenshots/virtual-console-show-errors.png)