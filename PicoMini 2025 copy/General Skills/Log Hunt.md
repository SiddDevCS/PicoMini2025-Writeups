
---

# Information given

#### Description

Our server seems to be leaking pieces of a secret flag in its logs. The parts are scattered and sometimes repeated. Can you reconstruct the original flag?Download the [logs](https://challenge-files.picoctf.net/c_saffron_estate/a4512da3ca8ee01e042dbfe8ea3746d290dc15d63c65ad8a4df3512076a2e0ed/server.log) and figure out the full flag from the fragments.

#### Hints:
You can use `grep` to filter only matching lines from the log.
Some lines are duplicates; ignore extra occurrences.

---

## Log file

As you can see we are given a file with the name:  `server.log`.

![[2025-10-01_10-42.png]]

Let's use the search filter with the content: `FLAGPART`:

![[Screenshot 2025-10-01 at 10.43.37.png]]

The hint stated: Some lines are duplicates; ignore extra occurrences.

That leaves us with:

```
[1990-08-09 10:00:10] INFO FLAGPART: picoCTF{us3_
[1990-08-09 12:23:43] INFO FLAGPART: y0urlinux_
[1990-08-09 12:25:32] INFO FLAGPART: sk1lls_
[1990-08-09 12:28:45] INFO FLAGPART: cedfa5fb}
```

So the flag is: `picoCTF{us3_y0urlinux_sk1lls_cedfa5fb}`.

---
