#!/usr/bin/env node

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const ipp = require('ipp');
const app = express();
const startDate = Date.now();

const PORT = 6310;

const server = http.createServer(app);

app.use(bodyParser.raw({ type: 'application/ipp' }))
app.use(decodeIppRequest);
app.post('/*', handleIppOperation);
app.use(errorHandler);

server.listen(PORT, () =>
    console.log(`Print Server listening on port ${PORT}!`),
);

function errorHandler(error, req, res, next) {
    console.log('error caught: %s ', error);
}

function handleIppOperation(req, res, next) {
    const { ippRequest } = req;
    const {id, version} = ippRequest;

    const ippResponse = {
        statusCode: 'successful-ok',
        id,
        version,
        'printer-attributes-tag': {
            'charset-configured': 'utf8',
            'charset-supported': 'utf8',
            'compression-supported': 'none',
            'document-format-default': 'application/postscript',
            'document-format-supported': ['application/postscript'],
            'generated-natural-language-supported': 'en',
            'ipp-versions-supported': ['1.1'],
            'natural-language-configured': 'en',
            'operations-supported': ['Get-Printer-Attributes'],
            'pdl-override-supported': 'not-attempted',
            'printer-current-time': new Date(),
            'printer-is-accepting-jobs': true,
            'printer-name': 'chris Test Name',
            'printer-state-reasons': 'none',
            'printer-state': 'idle',
            'printer-up-time': Math.floor((Date.now() - startDate) / 1000),
            'printer-uri-supported': 'ipp://localhost:6310/printer1',
            'queued-job-count': 0,
            'uri-authentication-supported': 'none',
            'uri-security-supported': 'none',
        },
        'operation-attributes-tag': {
            'attributes-charset': 'utf8',
            'attributes-natural-language': 'en',
        },
    };

    console.log('ippResponse: ', ippResponse);
    res.send(ipp.serialize(ippResponse));
}

function decodeIppRequest(req, res, next) {
    req.ippRequest = ipp.parse(req.body);
    next();
}
