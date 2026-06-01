import{Screen as e}from"../../models/screen.js";class s extends e{data;constructor(e){super(e),this.data=s.getScreenData(e)}static getScreenData=e=>{const s=e.data;return s?{phoneNumber:s.phone_number,showRememberDevice:s.show_remember_device,showLinkSms:!!s.show_link_sms}:null}}export{s as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
