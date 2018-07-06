# dateTime time error repro

## Instructions

1. Execute ```./index.js```, this will start a basic print server up on port
   6310 that only response to ipp request for GetPrinterAttributes.
2. send a test request from ipptool to this printer: ```ipptool -I -t
   ipp://localhost:6310/printer1 -v -t get-printer-attributes.test```

### Sample output from ipptool
```
$ ipptool -I -t ipp://localhost:6310/printer1 -v -t get-printer-attributes.test
"/usr/share/cups/ipptool/get-printer-attributes.test":
    Get-Printer-Attributes:
        attributes-charset (charset) = utf-8
        attributes-natural-language (naturalLanguage) = en
        printer-uri (uri) = ipp://localhost:6310/printer1
    Get printer attributes using Get-Printer-Attributes                  [FAIL]
        RECEIVED: 756 bytes in response
        status-code = successful-ok (successful-ok)
        attributes-charset (charset) = utf8
        attributes-natural-language (naturalLanguage) = en
        charset-configured (charset) = utf8
        charset-supported (charset) = utf8
        compression-supported (keyword) = none
        document-format-default (mimeMediaType) = application/postscript
        document-format-supported (mimeMediaType) = application/postscript
        generated-natural-language-supported (naturalLanguage) = en
        ipp-versions-supported (keyword) = 1.1
        natural-language-configured (naturalLanguage) = en
        operations-supported (enum) = Get-Printer-Attributes
        pdl-override-supported (keyword) = not-attempted
        printer-current-time (dateTime) = 2018-07-06T01:40:42
        printer-is-accepting-jobs (boolean) = true
        printer-name (nameWithoutLanguage) = chris Test Name
        printer-state-reasons (keyword) = none
        printer-state (enum) = idle
        printer-up-time (integer) = 1
        printer-uri-supported (uri) = ipp://localhost:6310/printer1
        queued-job-count (integer) = 0
        uri-authentication-supported (keyword) = none
        uri-security-supported (keyword) = none
        "printer-current-time": Bad dateTime UTC sign '
```

```
# With printer-current-time removed:
$ ipptool -I -t ipp://localhost:6310/printer1 -v -t get-printer-attributes.test
"/usr/share/cups/ipptool/get-printer-attributes.test":
    Get-Printer-Attributes:
        attributes-charset (charset) = utf-8
        attributes-natural-language (naturalLanguage) = en
        printer-uri (uri) = ipp://localhost:6310/printer1
    Get printer attributes using Get-Printer-Attributes                  [PASS]
        RECEIVED: 720 bytes in response
        status-code = successful-ok (successful-ok)
        attributes-charset (charset) = utf8
        attributes-natural-language (naturalLanguage) = en
        charset-configured (charset) = utf8
        charset-supported (charset) = utf8
        compression-supported (keyword) = none
        document-format-default (mimeMediaType) = application/postscript
        document-format-supported (mimeMediaType) = application/postscript
        generated-natural-language-supported (naturalLanguage) = en
        ipp-versions-supported (keyword) = 1.1
        natural-language-configured (naturalLanguage) = en
        operations-supported (enum) = Get-Printer-Attributes
        pdl-override-supported (keyword) = not-attempted
        printer-is-accepting-jobs (boolean) = true
        printer-name (nameWithoutLanguage) = chris Test Name
        printer-state-reasons (keyword) = none
        printer-state (enum) = idle
        printer-up-time (integer) = 1
        printer-uri-supported (uri) = ipp://localhost:6310/printer1
        queued-job-count (integer) = 0
        uri-authentication-supported (keyword) = none
        uri-security-supported (keyword) = none
```
