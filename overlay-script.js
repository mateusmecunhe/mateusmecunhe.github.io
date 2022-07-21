window.addEventListener('load',
  (event) => {

    document.body.insertAdjacentHTML('afterbegin',
      `
    <div class="unhcr-modal" id="unhcr-donation-modal">
    <div class="unhcr-overlay-close-button-container">
        <button id='unhcr-overlay-close-btn' data-close-button class="unhcr-overlay-close-button">close &times;</button>
      </div>
      <div style="display: none;" id='unhcr-overlay-loading'></div>
    <iframe allow="payment" style="display: none; height: 90vh; width: 100%; padding: 5px;" id="unhcr-ifr" src="" frameborder="0"></iframe>
    <div id="unhcr-overlay-internal-content">
    
      <div class="unhcr-modal-header">
        <img class='unhcr-overlay-header-logo' src="https://donate.unhcr.org/themes/custom/donate/white-logo.svg" alt="">
        <div class="unhcr-overlay-title">We're giving up our home page for the millions who've fled their homes in Ukraine.
 
        </div>
      </div>

      <div class="unhcr-modal-body">
      Today, before going through to our website, why not help those in need by clicking below.<br>
      Your donation will help UNHCR, the UN Refugee Agency, ensure that families displaced by the conflict in Ukraine are sheltered and protected. 
      </div>

      <div class="unhcr-overlay-cta">Together, let's support people forced to flee.</div>

      
        <div class="unhcr-donate-btn-container">

          <div class="unhcr-donate-btn" onclick="callIframe()">Donate</div>
        </div>
      
    </div>
  </div>

    <style>
    #unhcr-donation-modal, #unhcr-donation-modal * {
      box-sizing: border-box;
    }
    
    .unhcr-modal {
      position: fixed;
      display: flex;
      flex-direction: column;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: 600ms ease-in-out;
      border-radius: 10px;
      z-index: 10;
      background-color: #0072bc;
      box-shadow: 0 2px 2px 0 #00395e, 0 3px 6px 2px #00395e;
      color: #fff;
      width: 500px;
      max-width: 80%;
      font-family: proximanova,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,liberation sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji;
    }
    
    .unhcr-modal {
      overflow-y: auto;
    }
    
    .unhcr-modal.unhcr-overlay-active {
      transform: translate(-50%, -50%) scale(1);
      height: auto;
      max-height: 90%;
    }
    
    .unhcr-modal-header {
      flex-direction: column;
      padding: 0px 10px 15px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .unhcr-modal-header .unhcr-overlay-title {
      font-size: 1.25rem;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
    }
    
    .unhcr-modal-header .unhcr-overlay-header-logo {
      margin: 30px auto;
    }
    
    .unhcr-overlay-close-button-container{
      text-align: end;
    }
    
    #unhcr-overlay-close-btn {
      cursor: pointer;
      color: white;
      border: none;
      outline: none;
      background: none;
      font-size: 0.6rem;
      font-weight: bold;
      margin-left: auto;
    }
    
    .unhcr-modal-body {
      padding: 10px 15px;
    }
    
    .unhcr-overlay-cta {
      padding: 10px 15px;
      font-weight: bold;
    }
    
    .unhcr-donate-btn-container{
      padding: 15px;
    }
    
    .unhcr-donate-btn{
      cursor: pointer;
      color: #212529;
      border-color: #faeb00;
      background-color: #faeb00;
      border: 2px solid transparent;
      text-align: center;
      vertical-align: middle;
      border-radius: 0.25rem;
      font-size: calc(1.2625rem + 0.15vw);
      line-height: 1.5;
      padding: 0.625rem 2.5rem;
      font-weight: bold;
      transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    
    }
    
    .unhcr-donate-btn:hover {
      color: #212529;
      border-color: #c7bb00;
      background-color: #d4c700;
    }
    
    .unhcr-donate-btn:active{
      color: #212529;
      border-color: #baaf00;
      background-color: #c7bb00;
      outline: #000 solid 2px;
    }
    
        
    .unhcr-modal::-webkit-scrollbar {
      width: 5px;
    }
    
    
    .unhcr-modal::-webkit-scrollbar-track {
      background: #0072bc;        /* color of the tracking area */
    }
    
    .unhcr-modal::-webkit-scrollbar-thumb {
      background-color: #0072bc;    /* color of the scroll thumb */
      border-radius: 20px;       /* roundness of the scroll thumb */
      border: 3px solid #fae900d8;  /* creates padding around scroll thumb */
    }
    
    .unhcr-blur-background-content :not(#unhcr-donation-modal, #unhcr-donation-modal *) {
      filter: blur(1px);
      opacity: .8;
      transition: 1000ms ease-out;
    
    }


    #unhcr-overlay-loading {
      animation: is-rotating 3s infinite;
      width: 50px;
      height: 50px;
      border: 6px solid #e5e5e5;
      border-top-color: #51d;
      border-radius: 50%;
      position: absolute;
      left: calc(50% - 25px);
      bottom: 50%;
      z-index: -1;
    }

    @keyframes is-rotating {
      to {
        transform: rotate(1turn);
      }
    }
    
    </style>

  `)
    const modal = document.getElementById('unhcr-donation-modal')
    const closeButton = document.getElementById('unhcr-overlay-close-btn')
    closeButton.addEventListener('click', () => {
      closeModal(modal)
    })

    detectPrivateBrowsing().then(
      (result)=>{
        if (result.isPrivate){
          return
        }else{
          openModal(modal)
        }
      }
    )
  })
  
  const viewportMetaTag = document.querySelector('meta[name="viewport"]');
  if (!viewportMetaTag) {
    let meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no"
    document.head.insertAdjacentElement('afterend', meta)
  }
  
  function openModal(modal) {    
    if (modal == null) return
    try {
      if (sessionStorage.getItem('donation-overlay') == 'active') return
    }
    catch (error){
      console.log(error)
    }
    document.body.classList.add('unhcr-blur-background-content')
    modal.classList.add('unhcr-overlay-active')
    try{
      //sessionStorage.setItem('donation-overlay', 'active')
    } catch(error){
      console.log(error)
    }
}

function closeModal(modal) {
  document.body.classList.remove('unhcr-blur-background-content')
  modal.classList.remove('unhcr-overlay-active')
}

function callIframe(value) {
  const iframe = document.getElementById('unhcr-ifr')
  const internal = document.getElementById('unhcr-overlay-internal-content')
  const loading = document.getElementById('unhcr-overlay-loading')
  internal.style.display = 'none'
  
  
  iframe.style.display = 'block'
  loading.style.display = 'block'
  iframe.src = 'https://give.unhcr.org/int/payment-confirmation-ukr-ogilvy/'
  iframe.style.height = '100 em'
}

function detectPrivateBrowsing(){
  return new Promise(function(resolve, reject) {
    var browserName = "Unknown";
  
    function __callback(isPrivate) {
      resolve({
        isPrivate: isPrivate,
        browserName: browserName
      });
    }
    
    function identifyChromium() {
      var ua = navigator.userAgent;
      if (ua.match(/Chrome/)) {
        if (navigator.brave !== undefined) {
          return "Brave"
        } else if (ua.match(/Edg/)) {
          return "Edge";
        } else if (ua.match(/OPR/)) {
          return "Opera";
        }
        return "Chrome";
      } else {
        return "Chromium";
      }
    }
    
    function assertEvalToString(value) {
      return value === eval.toString().length;
    }
    
    function isSafari() {
      var v = navigator.vendor;
      return v !== undefined && v.indexOf("Apple") === 0 && assertEvalToString(37);
    }
  
    function isChrome() {
      var v = navigator.vendor;
      return v !== undefined && v.indexOf("Google") === 0 && assertEvalToString(33);
    }
  
    function isFirefox() {
      return document.documentElement !== undefined && document.documentElement.style.MozAppearance !== undefined && assertEvalToString(37);
    }
  
    function isMSIE() {
      return navigator.msSaveBlob !== undefined && assertEvalToString(39);
    }
  
    /**
     * Safari (Safari for iOS & macOS)
     **/
  
    function macOS_safari14() {
      try {
        window.safari.pushNotification.requestPermission("https://example.com", "private", {}, (function() {}));
      } catch (e) {
        return __callback(!new RegExp("gesture").test(e));
      }
      return __callback(false);
    }
  
    function iOS_safari14() {
      var tripped = false;
      var iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);
  
      iframe.contentWindow.applicationCache.addEventListener("error", function() {
        tripped = true;
        return __callback(true);
      });
  
      setTimeout(function() {
        if (!tripped) {
          __callback(false);
        }
      }, 100);
    }
  
    function oldSafariTest() {
      var openDB = window.openDatabase;
      var storage = window.localStorage;
      try {
        openDB(null, null, null, null);
      } catch (e) {
        return __callback(true);
      }
      try {
        storage.setItem("test", "1");
        storage.removeItem("test");
      } catch (e) {
        return __callback(true);
      }
      return __callback(false);
    }
  
    function safariPrivateTest() {
      var w = window;
      if (navigator.maxTouchPoints !== undefined) {
        if (w.safari !== undefined && w.DeviceMotionEvent === undefined) {
          browserName = "Safari for macOS";
          macOS_safari14();
        } else if (w.DeviceMotionEvent !== undefined) {
          browserName = "Safari for iOS";
          iOS_safari14();
        } else {
          reject(new Error("detectIncognito Could not identify this version of Safari"));
        }
      } else {
        browserName = "Safari";
        oldSafariTest();
      }
    }
  
    /**
     * Chrome
     **/
  
    function getQuotaLimit() {
      var w = window;
      if (w.performance !== undefined && w.performance.memory !== undefined && w.performance.memory.jsHeapSizeLimit !== undefined) {
        return performance.memory.jsHeapSizeLimit;
      }
      return 1073741824;
    }
  
    // >= 76
    function storageQuotaChromePrivateTest() {
      navigator.webkitTemporaryStorage.queryUsageAndQuota(
        function(usage, quota) {
          __callback(quota < getQuotaLimit());
        },
        function(e) {
          reject(new Error("detectIncognito somehow failed to query storage quota: " + e.message));
        }
      );
    }
  
    // 50 to 75
    function oldChromePrivateTest() {
      var fs = window.webkitRequestFileSystem;
      var success = function() {
        __callback(false);
      };
      var error = function() {
        __callback(true);
      };
      fs(0, 1, success, error);
    }
  
    function chromePrivateTest() {
      if (Promise !== undefined && Promise.allSettled !== undefined) {
        storageQuotaChromePrivateTest();
      } else {
        oldChromePrivateTest();
      }
    }
  
    /**
     * Firefox
     **/
  
    function firefoxPrivateTest() {
      __callback(navigator.serviceWorker === undefined);
    }
  
    /**
     * MSIE
     **/
  
    function msiePrivateTest() {
      __callback(window.indexedDB === undefined);
    }
  
    function main() {
      if (isSafari()) {
        safariPrivateTest();
      } else if (isChrome()) {
        browserName = identifyChromium();
        chromePrivateTest();
      } else if (isFirefox()) {
        browserName = "Firefox";
        firefoxPrivateTest();
      } else if (isMSIE()) {
        browserName = "Internet Explorer";
        msiePrivateTest();
      } else {
        reject(new Error("detectIncognito cannot determine the browser"));
      }
    }
  
    main();
  });
}
