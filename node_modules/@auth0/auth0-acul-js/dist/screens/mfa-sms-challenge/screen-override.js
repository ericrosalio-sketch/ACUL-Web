import{Screen as e}from"../../models/screen.js";class r extends e{constructor(e){super(e),this.data=r.getScreenData(e)}static getScreenData=e=>{const r=e.data;return r?{phoneNumber:r.phone_number,showRememberDevice:r.show_remember_device,showLinkVoice:r.show_link_voice}:null}}export{r as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
