const regex = /\bp(age)?(=|\/)\d+\b/;
const regexNum = /\d+/;

function onSuccess( tabs ) {
  for ( let tab of tabs ) {
    let oldPage = regex.exec( tab.url )[ 0 ];
    let number = parseInt( regexNum.exec( oldPage )[ 0 ] );
    let newPage = oldPage.replace( number, number + 1 );
    let newUrl = tab.url.replace( oldPage, newPage );
    browser.pageAction.hide( tab.id );
    browser.tabs.update( {
      url: newUrl
    } );
  }
}

function onError( error ) {
  console.log( `Error: ${error}` );
}

browser.tabs.onUpdated.addListener( ( tabId, changeInfo, tab ) => {
  if ( tab.url.match( regex ) ) {
    browser.pageAction.show( tab.id );
  }
} );

browser.pageAction.onClicked.addListener( ( tab ) => {
  var querying = browser.tabs.query( {
    active: true,
    lastFocusedWindow: true
  } );
  querying.then( onSuccess, onError );
} );