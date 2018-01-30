// from https://github.com/JayChase/ngx-express-universal/blob/master/server/server.js

require('zone.js/dist/zone-node');
const renderModuleFactory = require('@angular/platform-server').renderModuleFactory;
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist-server/main.bundle.js');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const path = require('path');
const index = require('fs').readFileSync(path.join(__dirname, '..', 'dist/index.html'), 'utf8'); // for server to client transition
const express = require('express');

const app = express();
const port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, '..', 'dist'), {
    index: false
}));

app.use('*', function (req, res, next) {
    renderModuleFactory(AppServerModuleNgFactory, { 
        document: index, 
        url: req.baseUrl,
        // extraProviders needed for lazy loading w/ universal
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    }).then(html => {
        res.send(html);
    });
});

app.listen(port, function () {
    console.log('Listening on http://localhost:' + port);
});
