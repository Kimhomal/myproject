import printMe from './print.js';
import '../stylesheets/style.css';

async function getComponent() {
  const element = document.createElement('div');

  const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

getComponent().then(component => {
  document.body.appendChild(component);
});

if (module.hot) {
  module.hot.accept('./print.js', function(){
    console.log('Update accepted...');
    printMe();
  });

  module.hot.accept('../stylesheets/style.css', function(){
    console.log('Update accepted...');
  });
}