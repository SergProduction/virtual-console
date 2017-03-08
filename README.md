Languages: [Russian](/README.RU.md), [English](/README.md)

## Virtual cnosole
Is designed for debugging code in mobile browsers

### Installation
- Usage in Node  
```npm install virtual-console```

- Usage in Browser  
```<script src="virtualConsole.js"></script>```

### Initialization
Script must be connected separately, before the code. If you are using nodejs, you need to refer to the initialization of:

- Usage in Node  
```require('virtual-console')(options)```

- Usage in Browser  
```virtualConsoleInit(options)```

### Options
- **url**: If you specify url, the console will appear if you have the proper lines in the url after the hash. Example: ```require('virtual-console')({url: "console=true"})``` yourhost.com#console=true

- **inside**: If the virtual Console is connected to the same file with the main code, you must specify this option ```require(virtual-console)({inside: true})```, otherwise, the virtual console will not display the call string


### Example
- Output console. log, warn, info, error

  ![](/screenshots/virtual-console-example.png)


- Output all types of errors, like the google chrome console

  ![](/screenshots/virtual-console-show-errors.png)