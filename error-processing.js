document.addEventListener("DOMContentLoaded", function(){
  const head = document.head;
  const codeNormal = `    <nav>
    <ul class='grandpa'>
        <li class='dad'>
            <a class='logo son' href='http://thegoosesite.github.io/legacy' title='Back to the homepage.'>The Goose Site</a>
        </li>
        <li class="dad">
            <a class="son" title="Play Goose Games..." href="https://thegoosesite.github.io/legacy/interactives">Interactives</a>
        </li>
        <li class='dad'>
            <a class='son' title='The trinity slideshows...' href='https://thegoosesite.github.io/legacy/powerpoint'>Slideshows</a>
        </li>
        <li style="cursor:pointer;" class="dad dropdown">
            <a class="son" title="The unity videos...">Videos</a>
            <ul class="dropdown-content">
                <li class="space"><a title="Subscribe or die..." href="https://thegoosesite.github.io/legacy/youtube">Youtube Channel</a></li>
                <li><a title="Worship, pray, and repent..." href="https://thegoosesite.github.io/legacy/videos">Unity Video Collection</a></li>
            </ul>
        </li>
        <li class='dad'>
            <a class='son' title='Read the Goose Bible...' href='https://thegoosesite.github.io/legacy/bible'>Bible</a>
        </li>
    </ul>
    </nav>
    <main>
        <div class='welcome' style='text-align:center !important;'>
            <img src='https://u.cubeupload.com/coolsnake0008/57185294148a9c54d5ef.jpg' style='border-radius:15px;width:168px;height:154px;'>
            <h1 style='-webkit-text-stroke:1px black;color:green'>404. That isn't goselike</h1>
            <p>404 not found. de gose is redirecting you to the home page.</p>
        </div>
    </main>
    <footer>
        <h1 class='f1'>The Goose Site</h1>
    </footer>`;

const codeNSI = `
      <nav style='background-color:darkorange !important; color:white !important;'>
            <h1 class="f1">The Goose Site</h1>
      <p><i>"May the goose be with you..." - St. Duck, 32 CE</i></p>
      <div class="login-div">
      <ul class="login-ul">
        <li class="login-li">
          <a class="login-a" href="https://thegoosesite.github.io/legacy/pages/welcome">Home</a>
        </li>
        <li class="login-li">
          <a class="login-a" href="https://thegoosesite.github.io/legacy/pages/questions">FAQ</a>
        </li>
        <li class="login-li">
          <a class="login-a" href="https://thegoosesite.github.io/legacy/pages/repository">Repository</a>
        </li>
        <li class="login-li">
          <a class="login-a" href="mailto:worshiptheholygoose@gmail.com">Contact Us</a>
        </li>
      </ul>
        
      </div>
    </nav>
    <main>
        <div class='welcome' style='text-align:center !important;'>
            <img src='https://u.cubeupload.com/coolsnake0008/57185294148a9c54d5ef.jpg' style='border-radius:15px;width:168px;height:154px;'>
            <h1 style='-webkit-text-stroke:1px black;color:green'>Whoops! 404.</h1>
            <p>This page does not exist. Redirecting you to the home page...</p>
        </div>
    </main>
    <footer>
        <h1 class='f1'>The Goose Site</h1>
    </footer>
  `;
  
  function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
  }
  
  // Set up the target redirect URL var
  // Var is depreciated so let
  let redirectUrl = "";

  if (getCookie('site_access') === 'granted') {
    document.body.innerHTML = codeNormal;
    head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="https://thegoosesite.github.io/legacy/cursor.css" />`);
    head.insertAdjacentHTML('beforeend', `<script src="https://thegoosesite.github.io/legacy/login.js"></script>`);
    redirectUrl = "http://thegoosesite.github.io/legacy"; // Gooseling Website
  } else {
    document.body.innerHTML = codeNSI;
    head.insertAdjacentHTML('beforeend', `<link rel="icon" type="image/x-icon" href="https://thegoosesite.github.io/legacy/favicon.ico">`);
    redirectUrl = "https://thegoosesite.github.io/legacy/pages/welcome"; // Guest Website
  }

  // Actual logic to perform the redirect after 3 seconds
  setTimeout(() => {
    window.location.href = redirectUrl;
  }, 3000);
});
