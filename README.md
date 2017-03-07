Languages

> [Russia](/README.RU.md)
  [English](/README.md)

## Virtual cnosole
Is designed for debugging code in mobile browsers
## Installation
```npm install virtual-console``` or ```<script src="virtualConsole.js"></script>```
or
```<script src="virtualConsole.js"></script>```

Script must be connected separately, before the code. If you are using nodejs, you need to refer to the initialization of ```requiare('virtual-console')(options)```


## Options

* url - If you specify url, the console will appear if you have the proper lines in the url after the hash. Example: ```requiare('virtual-console')({url: "console=true"})``` yourhost.com#console=true

* inside - If the virtual Console is connected to the same file with the main code, you must specify this option ```requiare(virtual-console)({inside: true})```, otherwise, the virtual console will not display the call string


## Example
* ##### output console. log, warn, info, error

  ![](/screenshots/virtual-console-example.png)

---

* ##### Output all types of errors, like the google chrome console

  ![](/screenshots/virtual-console-show-errors.png)