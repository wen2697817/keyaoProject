package com.glintech.keyaoProject.wechat;


public class Test {
	public int sendMessage(String userCode,String message) {
		WeChatMsgSend swx = new WeChatMsgSend();
		try {
			String token = swx.getToken("ww764689295b9e3f91", "8KaYFJ7I-XGn17OnFPw4kpu7fT8xZ_fVQQ9-Nph-1aY");
			String postdata = swx.createpostdata("userCode", "text", 1000002, "content", message);
			swx.post("utf-8", WeChatMsgSend.CONTENT_TYPE, (new WeChatUrlData()).getSendMessage_Url(),
						postdata, token);
			return 1;
		} catch (Exception e) {
			e.getStackTrace();
			return 0;
		}
	}
}
