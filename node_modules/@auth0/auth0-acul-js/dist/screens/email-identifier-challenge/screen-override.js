import{Screen as e}from"../../models/screen.js";class t extends e{constructor(e){super(e),this.data=t.getScreenData(e)}static getScreenData=e=>{const t=e.data;if(!t)return null;const{message_type:s,email:a,...r}=t;return{...r,email:a,messageType:s}}}export{t as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
