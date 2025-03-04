const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}', './node_modules/flyonui/dist/js/*.js', flowbite.content()],
    theme: {
        extend: {},
    },
    plugins: [require('flyonui'), require('flyonui/plugin'), flowbite.plugin()],
};
