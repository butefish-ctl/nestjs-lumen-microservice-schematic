import { env } from 'process';

export const apiCss = `
#systemVars td {
    background-color: #ddd;
    padding: 8px;
    border: 1px solid #eee;
    text-align: left;
}
#systemVars td:first-child {
    width: 25%;
}
#systemVars th {
    font-size: 1.51em;
    text-transform: uppercase;
    background-color: #bbb;
    padding: 8px;
}
`;

export const apiDesc = `
<h3>App Marketplace API for Servicing Fiber+</h3>
<table id="systemVars">
  <tr>
    <td><b>Build Date/Time</b></td>
    <td>${env.APP_BUILD_DATETIME}</td>
  </tr>
  <tr>
    <td><b>Download Swagger JSON</b></td>
    <td><a href="/swagger-json" target="_blank">Get JSON</a></td>
  </tr>
</table>
`;
