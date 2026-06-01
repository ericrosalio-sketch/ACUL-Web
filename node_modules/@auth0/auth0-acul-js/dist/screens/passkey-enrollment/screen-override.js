import{Screen as e}from"../../models/screen.js";import{getLoginLink as i,getBackLink as s,getPublicKey as t}from"../../shared/screen.js";class c extends e{loginLink;backLink;publicKey;constructor(e){super(e),this.loginLink=i(e),this.backLink=s(e),this.publicKey=c.getPublicKey(e)}static getPublicKey=e=>t(e)}export{c as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
