/*!
 * Puppeteer Spoofer, http://tpkn.me/
 */

function pptrSpoofer(req, spoofs_list){
   if(typeof req !== 'object'){
      return;
   }

   if(!Array.isArray(spoofs_list)){
      req.continue();
      return;
   }

   let request_url = req.url();
   let spoofed_request;

   for(let i = 0, len = spoofs_list.length; i < len; i++){
      let { 
         rule = {}, 
         body = '', 
         status = 200, 
         contentType = 'text/plain'
      } = spoofs_list[i];

      // Rule could a simple string or an RegExp
      if((rule.constructor === RegExp && rule.test(request_url)) || request_url.indexOf(rule) > -1){
         spoofed_request = { body, status, contentType };
         break;
      }
   }

   if(spoofed_request){
      req.respond(spoofed_request);
   }else{
      req.continue();
   }
}

module.exports = pptrSpoofer;
