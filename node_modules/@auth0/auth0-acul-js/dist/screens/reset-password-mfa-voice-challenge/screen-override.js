import{Screen as e}from"../../models/screen.js";class t extends e{data;constructor(e){super(e),this.data=t.getScreenData(e)}static getScreenData=e=>{const t=e.data;return t?{phoneNumber:"string"==typeof t.phone_number?t.phone_number:"",showLinkSms:t.show_link_sms}:null}}export{t as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
